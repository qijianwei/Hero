import Weapon from './prefab/Weapon';
import WeaponBar from './prefab/WeaponBar';
import Player from './prefab/Player';
import MPBar from './prefab/MPBar';
import HPBar from './prefab/HPBar';
import WeaponManager from './WeaponManager';
import Skill from './prefab/Skill';
import Dodge from './prefab/Dodge';
import PlayerState from './prefab/PlayerState';
import PlayerSkill from './prefab/PlayerSkill';
import WeaponSkill from './prefab/WeaponSkill';
import GameBanner from './prefab/GameBanner';
import SoundManager from './SoundManager';
export default class GameControl extends PaoYa.Component {
    /** @prop {name:weapon,tips:"武器预制体对象",type:Prefab}*/
    /** @prop {name:weaponBar,tips:"武器预制体对象",type:Prefab}*/
    /** @prop {name:player,tips:"人物预制体对象",type:Prefab} */
    /** @prop {name:weaponSkill,tips:"兵器技能名称预制体对象",type:Prefab} */
    /** @prop {name:selfHP,tips:'自己的血条',type:Node}*/
    /** @prop {name:selfMP,tips:'自己的体力',type:Node}*/
    /** @prop {name:otherHP,tips:'对方的血条',type:Node}*/
    /** @prop {name:otherMP,tips:'对方的体力',type:Node}*/
    /** @prop {name:playerState,tips:'人物状态',type:Node}*/
    /** @prop {name:boxGameBanner,tips:'游戏类型Banner',type:Node}*/

    constructor() {
        super();
        GameControl.instance = this;
        Laya.MouseManager.multiTouchEnabled = false;
        this.closeRobot=false;
    }
    onDisappear() {
        Laya.MouseManager.enabled = true;
    }
    onAwake() { 
        Laya.Pool.clearBySign('weapon');
        Laya.Pool.clearBySign('player');
        Laya.MouseManager.enabled = true;

        this.params = this.owner.params;
        //暂定
        this.gameType = this.params.gameType;

        this.restart(); //重置相关信息

        this.dodgeComp = this.owner.dodge.getComponent(Dodge);
        this.dodgeOwner = this.dodgeComp.owner;
        this.playerStateComp = this.playerState.getComponent(PlayerState);

        this.selfSkillText = this.owner.selfSkillText;
        this.otherSkillText = this.owner.otherSkillText;
        this.selfSkillTextComp = this.selfSkillText.getComponent(PlayerSkill);
        this.otherSkillTextComp = this.otherSkillText.getComponent(PlayerSkill);
        this.weaponsBarArr = []; //存放兵器操作Bar;提供全局暂停和恢复CD功能；还有置灰功能
        this.initWeaponsBar();
    }
    onEnable() {
        this.onNotification(WeaponBar.CLICK, this, this.weaponBarClickHandler)
        this.onNotification(Skill.CLICK, this, this.skillClickHandler);
        this.gameState = 'start';
        this.fillPlayerInfo();
        this.initSkill();
    }
    //游戏重新开始
    restart() {
        this.gameState = 'start';
        this.selfMultiMP = 1; //兵器造成的内力消耗倍数
        this.otherMultiMP = 1; //兵器造成的内力消耗倍数
        this.selfWeapons = [];
        this.otherWeapons = [];
        this.selfPlayer && this.selfPlayer.node && this.selfPlayer.node.removeSelf();
        this.otherPlayer && this.otherPlayer.node && this.otherPlayer.node.removeSelf();
        this.weaponList = this.params.weaponList;
        this.robotWeaponList = JSON.parse(JSON.stringify(this.params.robotWeaponList));
       
        this.role = JSON.parse(JSON.stringify(this.params.role))
        this.robotRole = JSON.parse(JSON.stringify(this.params.robotRole))
        this.dealParams(this.weaponList);
        this.dealParams(this.robotWeaponList);
       
        if (this.gameType == "pass") {
            this.initGameBanner();
            SoundManager.ins.passBg();
        }else{
            SoundManager.ins.battleBg();
            this.boxGameBanner.getComponent(GameBanner).changeStyle({
                gameType:this.gameType
            })
        }
        this.resetPlayerInfo();
        //要加机器人定时器
        if(!this.closeRobot){
            Laya.timer.once(3000, this, this.firstWeaponSelect);
        }
    }
    fillPlayerInfo(){
        this.initPlayer(true);
        this.initPlayer(false);
    }
    resetPlayerInfo() {
        this.owner.setInfo({
            name: this.role.roleName,
            icon: `local/common/${this.role.roleDress}.png`
        }, true);
        this.owner.setInfo({
            name: this.robotRole.roleName,
            icon: `local/common/${this.robotRole.roleDress}.png`
        }, false);
    }
    initGameBanner() {
        this.monsterNum = this.params.monsterList.length;
        this.killNum = 0;
        this.battleIndex = 1;
        this.curNum = this.params.stageId;
        this.boxGameBanner.getComponent(GameBanner).changeStyle({
            gameType: 'pass',
            curNum: this.curNum,
            battleIndex: this.battleIndex,
            monsterNum: this.monsterNum
        })
    }
  
    drawParabola() {
        let space = 5;
        let pathArr = [];
        this.startPos = {
            x: 180,
            y: 450
        }
        this.endPos = {
            x: 1150,
            y: 450
        }
        pathArr.push(["moveTo", 0, 0]);


        // X轴Y轴的偏移总量
        this.driftX = this.endPos.x - this.startPos.x;
        this.driftY = this.endPos.y - this.startPos.y;
        this.b = (this.driftY - this.curvature * this.driftX * this.driftX) / this.driftX;
        for (let i = 5; i <= this.driftX; i += space) {
            let x = i;
            let y = Math.floor(this.curvature * x * x + this.b * x);
            pathArr.push(["lineTo", x, y]);
        }
        pathArr.push(["closePath"]);
        // this.owner.spDraw.graphics.clear();
        this.owner.spDraw.graphics.drawPath(this.startPos.x, this.startPos.y, pathArr, null, {
            strokeStyle: "#ff0000",
            lineWidth: 2,
            lineCap: "round"
        })
        //this.owner.spDraw.graphics.drawPath(340,450,)

    }
    dealParams(weaponList) {
        for (var i = 0; i < weaponList.length; i++) {
            let weapon = weaponList[i];
            let weaponSkills = weapon['skills'];
            for (var j = 0; j < weaponSkills.length; j++) {
                if (weaponSkills[j].skillType == 1) {
                    weapon.activeSkill = JSON.parse(JSON.stringify(weaponSkills[j]))
                }
            }
        }
    }


    //测试内力够不够
    onUpdate() {
        if (!this.weaponsBarArr.length || !this.selfPlayer) {
            return;
        }
        if (this.selfPlayer.comp.dodge) {

            return;
        }
        let curMP = this.selfPlayer.comp.MPComp.curMP;
        let originMP = this.selfPlayer.comp.MPComp.originMP;
        this.weaponsBarArr.forEach((weaponBarComp) => {
            if (weaponBarComp.weaponConsume > curMP) {
                if (!weaponBarComp.freezeing) {
                    weaponBarComp.owner.gray = true;
                }
            } else {
                weaponBarComp.owner.gray = false;
            }
        })

        if (curMP < originMP * 0.2) {
            if (!this.dodgeComp.freezeing) {
                this.dodgeOwner.gray = true;
            }
        } else {
            this.dodgeOwner.gray = false;
        }
        if (!this.skillOwner1.disabled) {
            if (curMP < this.selfSkills[0].skillConsume * originMP) {
                if (!this.skillScr1.freezeing) {
                    this.skillOwner1.gray = true;
                }
            } else {
                this.skillOwner1.gray = false;
            }
        }
        if (!this.skillOwner2.disabled) {
            if (curMP < this.selfSkills[2].skillConsume * originMP) {
                if (!this.skillScr1.freezeing) {
                    this.skillOwner2.gray = true;
                }
            } else {
                this.skillOwner2.gray = false;
            }
        }
    }
    //初始化双方兵器库
    initWeaponsBar() {
        let owner = this.owner,
            boxWeapon = owner.boxWeapon;

        for (let i = 0, len = this.weaponList.length; i < len; i++) {
            //暂时
            // if()
            let weaponBar = this.weaponBar.create.call(this.weaponBar);
            let weaponBarComp = weaponBar.getComponent(WeaponBar);
            weaponBarComp.params = this.weaponList[i];
            weaponBarComp.isSelf = true;
            weaponBarComp.index = i;
            this.weaponsBarArr.push(weaponBarComp);
            boxWeapon.addChild(weaponBar)
        }
        //初始化机器人的兵器
    //     this.weaponManager = new WeaponManager(this.robotWeaponList);
    }
    initPlayer(isSelf) {
        let name = isSelf ? 'self' : 'other';
        let role = isSelf ? 'role' : 'robotRole';
        let player = Laya.Pool.getItemByCreateFun('player', this.player.create, this.player);

        //let player=this.player.create();
        let spCollide = this.owner[name + 'Collide'];
        let spX = spCollide.x,
            spY = spCollide.y,
            spW = spCollide.width,
            spH = spCollide.height;

        //let playerScr=player.getComponent(Player)
        let component = player.getComponent(Player);
        component.isSelf = isSelf;
        component.attr = this[role];
        if (isSelf) {
            this.selfSkills = this[role].skills
        }
        component.activeSkills = [];
        //把人物主动技能挑选出来
        for (let i = 0, len = this[role].skills.length; i < len; i++) {
            if (this[role].skills[i].skillType == 1) {
                component.activeSkills.push(this[role].skills[i]);
            }
        }
       /*  console.error('人物技能');
        console.error(component.activeSkills) */

        //component.attr.skillWeapon.params={};
        if (component.attr.skillWeapon) {
            component.attr.skillWeapon.activeSkill = component.attr.skillWeapon.skills[0];
        }
        // console.error(component.attr.skillWeapon)
        component.MPComp = this[name + 'MP'].getComponent(MPBar);
        component.HPComp = this[name + 'HP'].getComponent(HPBar);
        component.MPComp.initBar(this[role].roleMp);
        component.HPComp.initBar(this[role].roleHp);
        component.isSelf = isSelf;
        if (isSelf) {
            player.pos(220, 560);
            player.scaleX = 1;
        } else {
            player.pos(1120, 560);
            player.scaleX = -1;
        }
        component.collidePoint = [{
            x: spX,
            y: spY
        }, {
            x: spX + spW,
            y: spY
        }, {
            x: spX + spW,
            y: spY + spH
        }, {
            x: spX,
            y: spY + spH
        }]

        this.owner.addChild(player);
        this[name + 'Player'] = {
            node: player,
            comp: component
        }
    }
    /* 人物技能 */
    initSkill() {
        let owner = this.owner;
        let activeSkills = this.selfPlayer.comp.activeSkills;
        for (let i = 1; i < 3; i++) {
            this['skillScr' + i] = owner['skill' + i].getComponent(Skill);
            this['skillScr' + i].params = activeSkills[i - 1];
            this['skillScr' + i].init(activeSkills[i - 1]);
            this['skillOwner' + i] = this['skillScr' + i].owner;
        }
    }
    skillClickHandler(name) {
       /*  SoundManager.ins.heroSkill(); */
        if (name == "skill1") {
            /*    this.allPause();
               return; */
            SoundManager.ins.heroSkill1();    
            this.skillWithWeapon(true);
        } else if (name == "skill2") {
            /*  this.allResume();
             return; */
             SoundManager.ins.heroSkill2();    
            this.skillWithoutWeapon(true);
        }
 
    }
    skillWithWeapon(isSelf) {
        let name = isSelf ? 'self' : 'other';
        let roleComp = this[name + 'Player'].comp,
            skillWeapon = JSON.parse(JSON.stringify(roleComp.attr.skillWeapon));
        let skillInfo = this[name + 'Player'].comp.activeSkills[0];
        let originMP = roleComp.MPComp.originMP;
        let consumeMP = skillInfo.skillConsume * originMP;
        if (this[name + 'Player'].comp.MPComp.curMP < consumeMP) {
            console.warn(name + 'Player' + "__体力不足");
            if (isSelf) {
                this.showTips("内力不足")
            }
            return;
        }
        if (isSelf) {
            this.skillScr1.startT()
        }
        this.showSkillText(isSelf, skillInfo.skillName);
        skillWeapon.isSelf = isSelf;
        this[name + 'Player'].comp.MPComp.changeMP(-consumeMP);
        skillWeapon.skillEffect = true;
        switch (skillWeapon.activeSkill.skillId) {
            case 88:
                let addCritProb = skillWeapon.activeSkill.skillConfig.critProb;
                this[name + 'Player'].comp.attr.calcCritProb = this[name + 'Player'].comp.attr.roleCritProb + addCritProb;
                break;
                //雪女剑法
            case 89:
                break;
                //铸铁剑法 造成臂力*0.32倍伤害
            case 90:
                break;
                //打出一条小金龙，是否写在这里待定
            case 91:
                break;
        }
        //先展示技能，再展示攻击，再发射兵器
        this[name + 'Player'].comp.showSkill1();
        this[name + 'Player'].comp.skillCallback = () => {
            this.weaponLaunch(skillWeapon);
        }
    }
    skillWithoutWeapon(isSelf) {
        let name = isSelf ? 'self' : 'other';
        let skillInfo = this[name + 'Player'].comp.activeSkills[1];
        let originMP = this[name + 'Player'].comp.MPComp.originMP;
        let consumeMP = skillInfo.skillConsume * originMP;
        if (this[name + 'Player'].comp.MPComp.curMP < consumeMP) {
            console.warn(name + 'Player' + "__体力不足");
            if (isSelf) {
                this.showTips("内力不足")
            }
            return;
        }
        if (isSelf) {
            this.skillScr2.startT()
        }
        this[name + 'Player'].comp.MPComp.changeMP(-consumeMP);
        this[name + 'Player'].comp.showSkill2(); //人物技能2展示
        this.showSkillText(isSelf, skillInfo.skillName);
        switch (skillInfo.skillId) {
            case 33:
                this.allWeaponsUnfreeze(name, skillInfo);
                break;
            case 36:
                let t = skillInfo.skillConfig.time,
                    perMP = skillInfo.skillConfig.recoverMp,
                    originHP = this[name + 'Player'].comp.HPComp.originHP,
                    resumeHP = skillInfo.skillConfig.recoverHp;
                this[name + 'Player'].comp.changePerMp(t * 1000, perMP);
                this[name + 'Player'].comp.HPComp.changeHP(originHP * resumeHP);
                Laya.timer.once(t * 1000, this, () => {
                    this[name + 'Player'].comp.removeSkill2();
                })
                break;
            case 39:
                /* this[name+'Player'].comp.changePerMp(); */
                this[name + 'MultiMP'] = skillInfo.skillConfig.consumeMp;
                console.error('内力消耗倍数:', skillInfo.skillConfig.consumeMp)
                Laya.timer.once(skillInfo.skillConfig.time * 1000, this, () => {
                    console.error('内力消耗倍数恢复:')
                    this[name + 'MultiMP'] = 1;
                    this[name + 'Player'].comp.removeSkill2();
                })
                break;
            case 45:
                break;
        }

    }
    allWeaponsUnfreeze(name, skillInfo) {
        let time = skillInfo.skillConfig.time * 1000;
        this.weaponsBarArr.forEach((weaponBarComp) => {
            weaponBarComp.endCD(); //探讨要不要
            weaponBarComp.setCdTime(0)
        })

        Laya.timer.once(time, this, () => {
            this.weaponsBarArr.forEach((weaponBarComp) => {
                weaponBarComp.setCdTime(weaponBarComp.originCdTime)
            })
            this[name + 'Player'].comp.removeSkill2();
        })
    }
    //所有兵器选择框和技能框置灰
    allBtnsLock() {
        this.weaponsBarArr.forEach((weaponBarComp) => {
            weaponBarComp.owner.gray = true;
        })
        this.dodgeOwner.gray = true;
        this.skillOwner1.gray = true;
        this.skillOwner2.gray = true;
    }
    //所有兵器选择框和技能框置灰
    allBtnsUnlock() {
        this.weaponsBarArr.forEach((weaponBarComp) => {
            weaponBarComp.owner.gray = false;
        })
        this.dodgeOwner.gray = false;
        this.skillOwner1.gray = false;
        this.skillOwner2.gray = false;
    }
    //所有暂停，除了出技能的人
    allPause(isSelf) {
        this.selfWeapons.forEach((weapon) => {
            weapon.pause();
        })
        this.otherWeapons.forEach((weapon) => {
            weapon.pause();
        })
        this.weaponsBarArr.forEach((weaponBarComp) => {
            weaponBarComp.pause();
        })
        if (isSelf) {
            this.otherPlayer.comp.skeleton.paused()
            this.otherPlayer.node.zOrder = 100;
            this.selfPlayer.node.zOrder = 101;
            this.selfSkillText.zOrder = 103;
        } else {
            this.selfPlayer.comp.skeleton.paused();
            this.otherPlayer.node.zOrder = 101;
            this.selfPlayer.node.zOrder = 100;
        }
        Laya.timer.clear(this, this.startSelect);
        this.selfPlayer.comp.MPComp.pause();
        this.otherPlayer.comp.MPComp.pause();
        this.skillScr1.pause();
        this.skillScr2.pause();
        this.dodgeComp.pause();
    }
    allResume(isSelf) {
        this.selfWeapons.forEach((weapon) => {
            weapon.resume();
        })
        this.otherWeapons.forEach((weapon) => {
            weapon.resume();
        })
        this.weaponsBarArr.forEach((weaponBarComp) => {
            weaponBarComp.resume();
        })
        if (isSelf) {
            this.otherPlayer.comp.skeleton.resume()
            this.selfSkillText.zOrder = 1;
        } else {
            this.selfPlayer.comp.skeleton.resume()
        }
        /* Laya.timer.once(1000, this, this.startSelect); */
        if(!this.closeRobot){
            this.firstWeaponSelect();
        } 
        this.selfPlayer.comp.MPComp.resume();
        this.otherPlayer.comp.MPComp.resume();
        this.skillScr1.resume();
        this.skillScr2.resume();
        this.dodgeComp.resume();
    }
    firstWeaponSelect() {
        console.error('..............................')
        this.weaponManager = null;
        this.weaponManager = new WeaponManager(this.robotWeaponList);
        this.sWeapon = this.weaponManager.seletedWeapon();
        Laya.timer.once(1000, this, this.startSelect);
    }
    startSelect() {
       /*  if(!this.sWeapon||this.gameState=='over'){
            return;
        } */  
        //如果选中的已经发射了，才可以重新选
        if (this.seletedLaunch) {
            this.sWeapon = this.weaponManager.seletedWeapon();
            if(!this.sWeapon){ //啥兵器都没有选中,都在冷却当中
                Laya.timer.once(1000, this, this.startSelect);
                return;
            }
        }
        let curMp = this.otherPlayer.comp.MPComp.curMP;
        
        if (curMp >= this.sWeapon.params.weaponConsume) {
            this.seletedLaunch = true;
            if (this.otherPlayer.comp.canAction) {
                this.sWeapon.isSelf = false;
                this.sWeapon.selectedHandler();
                console.error(`鬼................... `)
                this.weaponBarClickHandler(this.sWeapon);
            } else {
                console.error("无法动弹")
            }
            Laya.timer.once(5000, this, this.startSelect);
        } else {
            this.seletedLaunch = false;
            Laya.timer.once(500, this, this.startSelect);
        }
    }
    showTips(value) {
        this.playerStateComp.setStateText(value);
    }
    showSkillText(isSelf, value) {
        let name = isSelf ? 'self' : 'other';
        this[name + 'SkillTextComp'].setSkillText(value);
    }
    //兵器点击后我方表现
    weaponBarClickHandler(targetComp) {
        //体力不够
        let name = targetComp.isSelf ? 'self' : 'other';
        let consumeMP = targetComp.weaponConsume;
        if (this[name + 'Player'].comp.MPComp.curMP < consumeMP) {

            if (targetComp.isSelf) {
                console.warn(name + 'Player' + "__体力不足");
                this.playerStateComp.setStateText("内力不足")
            }
            return;
        }
       
        //人物表现
        if (this.isSelf) {
            console.error('用户发射武器........')
        }

        this[name + 'Player'].comp.attr.calcCritProb = this[name + 'Player'].comp.attr.roleCritProb;

        let params = JSON.parse(JSON.stringify(targetComp.params)); //深拷贝,便于修改
        params.skillEffect = false;
        params.isSelf = targetComp.isSelf;
        //判断是否触发兵器技能
        //前提是有主动技能
        if (targetComp.params.activeSkill) {
            let skill = targetComp.params.activeSkill;
            let skillType = skill.skillType,
                status = skill.status,
                skillId = skill.skillId,
                prob = skill.skillProb;

            if (skillType == 1 && status == 1) {
                let random = Math.floor(Math.random() * 100 + 1);
                if (random <= prob) {
                    /* 区分哪些是影响自身表现的，哪些是影响对手伤害的 */
                    params.skillEffect = true;
                    this[name + 'Player'].comp.attackEffect(params.skillEffect); //兵器技能是否触发
                    this[name + 'Player'].comp.attackCallback = () => {
                        SoundManager.ins.weaponSkill();
                        this.weaponWithSkills(params, skillId);
                        this[name + 'Player'].comp.MPComp.changeMP(-consumeMP * this[name + 'MultiMP']);
                        if (skillId == 58) {
                            targetComp.startT(200); //快速冷却     
                        } else {
                            //正常开始技能冷却
                            targetComp.startT();
                        }
                    }
                    return;
                } else {
                    console.warn('不好意思,没有触发技能')
                }
            }
        }
        this[name + 'Player'].comp.attackEffect(false);
        this[name + 'Player'].comp.attackCallback = () => {
            SoundManager.ins.weaponLaunch();
            this.weaponLaunch(params);
            targetComp.startT();
            this[name + 'Player'].comp.MPComp.changeMP(-consumeMP * this[name + 'MultiMP']);
        }
        //正常开始技能冷却

    }
    weaponLaunch(params, deltaT) {
        let name = params.isSelf ? 'self' : 'other';
        let weapon = Laya.Pool.getItemByCreateFun("weapon", this.weapon.create, this.weapon);
        let weaponComp = weapon.getComponent(Weapon);
        weaponComp.weaponType = params.weaponType;
        weapon.params = params;
        /*    console.log(weapon);
           console.log(weaponComp)
           */
        weaponComp.isSelf = params.isSelf;
        if (params.isSelf) {
            weapon.pos(280, 450)
        } else {
            weapon.pos(1050, 450);
        }

        //暂定
        if (deltaT) {
            Laya.timer.once(deltaT, this, () => {
                this.owner.addChild(weapon);
                this[name + 'Weapons'].push(weaponComp);
            });
        } else {
            this.owner.addChild(weapon);
            this[name + 'Weapons'].push(weaponComp);
        }
    }

    //带着技能发射

    weaponWithSkills(params, skillId) {
        let skillConfig = params.activeSkill.skillConfig;
        let skillName = params.activeSkill.skillName;
        let hurt = skillConfig.hurt;
        let durable = skillConfig.durable;
        params.skillEffect = true; //代表技能是触发的
        let weaponSkillBox = Laya.Pool.getItemByCreateFun('weaponSkillBox', this.weaponSkill.create, this.weaponSkill);
        weaponSkillBox.params = {
            skillName: skillName,
            isSelf: params.isSelf
        }
        if (params.isSelf) {
            weaponSkillBox.pos(-164, 189)
        } else {
            weaponSkillBox.pos(1498, 189)
        }
        this.owner.addChild(weaponSkillBox);
        switch (skillId) {
            case 43:
            case 44:
                let weaponNum = skillConfig.weaponNum;

                console.error("修改后的值:", params.weaponAttack)
                this.weaponLaunch(params);
                for (var i = 0; i < weaponNum - 1; i++) {
                    this.weaponLaunch(params, 350);
                }
                break;
                //造成几倍伤害 兵器前方加气流
            case 47:
            case 48:
                // params.weaponAttack = params.weaponAttack * hurt;
                this.weaponLaunch(params);
                break;
                //向上中路各发出1件兵器 几率12%
            case 51:
                params.weaponType = 2;
                this.weaponLaunch(params);
                params.weaponType = 3;
                this.weaponLaunch(params);
                break;
                // 向上中下路各发出1件兵器 几率8%
            case 52:
                params.weaponType = 1;
                this.weaponLaunch(params);
                params.weaponType = 2;
                this.weaponLaunch(params);
                params.weaponType = 3;
                this.weaponLaunch(params);
                break;
                //100%伤害转化为生命 几率18%
            case 45:
            case 46:
            case 49:
            case 50:
            case 53:
            case 54:
            case 55:
            case 59:
            case 58:
                this.weaponLaunch(params);
                break;
            case 60:
                params.weaponType = 4;
                this.weaponLaunch(params);
                break;
                //造成几倍伤害 兵器上加刀刃特效
            case 56:
            case 57:
            case 61:
                // params.weaponAttack = params.weaponAttack * hurt;
                this.weaponLaunch(params);
                break;
                //兵器耐久提升100%
            case 62:
                params.weaponDurable = params.weaponDurable * durable;
                this.weaponLaunch(params);
                break;

        }
    }

    removeWeapon(target) {
        let targetWeapons = target.isSelf ? this.selfWeapons:this.otherWeapons;
        for (let i = 0, len = targetWeapons.length; i < len; i++) {
            if (targetWeapons[i] == target) {
                targetWeapons.splice(i, 1);
                //console.log("删除自己")
                break;
            }
        }
        console.log('删除后数组' + target.isSelf, targetWeapons.length)
    }
    //闪避技能 可能双方都要用
    dodgeSkillShow(isSelf) {
        let name = isSelf ? 'self' : 'other';
        let originMP = this[name + 'Player'].comp.MPComp.originMP;
        let consumeMP = 0 * originMP;
        if (this[name + 'Player'].comp.MPComp.curMP < consumeMP) {
            if (isSelf) {
                this.playerStateComp.setStateText("内力不足")
            }
            return;
        }
        if (isSelf) {
            this.dodgeComp.startT()
        }
        this.showSkillText(isSelf, "闪避")
        this[name + "Player"].comp.MPComp.changeMP(-consumeMP)
        console.error('闪避技能使用')
        this[name + 'Player'].comp.dodgeEffect();
    }
    // 全局碰撞检测
    collisionDetection() {


    }
    //所有有cd的
    allCdEnd(){
        this.weaponsBarArr.forEach((weaponBarComp) => {
            weaponBarComp.endCD(); 
        });
        this.skillScr1.endCD();
        this.skillScr2.endCD();
        this.dodgeComp.endCD();
    }
    deathHandler(loserIsSelf) {
        Laya.MouseManager.enabled = false;
        Laya.timer.clearAll(this);
        this.gameState = 'over'; 
        this.removeAllWeapons();
        this.allCdEnd();
        switch (this.gameType) {
            case 'pass':
                this.dealPass(loserIsSelf);
                break;
            case 'battle':
              //  SoundManager.ins.homeBg();
                this.dealBattle(loserIsSelf);
                break;
        }

    }
    dealPass(loserIsSelf) { 
        if (loserIsSelf) {
            this.passOver(loserIsSelf);
        } else {
            this.killNum += 1;
            if (this.killNum == this.monsterNum) {
                this.passOver(loserIsSelf);
            } else {       
                Laya.timer.once(1500,this,this.replacePlayer)
            }
        }
    }
    dealBattle(loserIsSelf) {
        this.gameOver(loserIsSelf);
        let win = loserIsSelf ? 0 : 1;
        Laya.timer.callLater(this,()=>{
            this.POST('martial_match_end', {
                win: win
            }, (res) => {
                Laya.MouseManager.enabled = true;
                res.result = loserIsSelf ? -1 : 1;
                res.roleId=this.params.roleId,
                res.robotRoleId=this.params.robotRoleId;
                res.nickName=this.params.nickName;
                res.robotNickName=this.params.robotNickName;
                this.navigator.popup('/dialog/BattleResultDialog', res);
            })
        })
    }
    //换角色
    replacePlayer() {
        Laya.MouseManager.enabled = true;
        this.selfWeapons=[]; //以防万一没清理干净
        this.otherWeapons=[];
        this.robotRole = JSON.parse(JSON.stringify(this.params.monsterList[this.killNum].robotRole));
        this.robotWeaponList = JSON.parse(JSON.stringify(this.params.monsterList[this.killNum].robotWeaponList));
        this.resetPlayerInfo(); //主要是重置对方的名字信息
        this.initPlayer(false);
        this.battleIndex = this.killNum + 1;
        this.boxGameBanner.getComponent(GameBanner).changeStyle({
            gameType: 'pass',
            curNum: this.curNum,
            battleIndex: this.battleIndex,
            monsterNum: this.monsterNum
        })
        console.error('换角色');
        this.gameState = 'start';
        this.firstWeaponSelect();
    }
    //关卡结束
    passOver(loserIsSelf) {
      //  SoundManager.ins.homeBg();
        if (!loserIsSelf) {
            SoundManager.ins.win();
            this.selfPlayer.comp.skeleton.play('win', true);
        } else {
            SoundManager.ins.lose();
            this.otherPlayer.comp.skeleton.play('win', true);
        }
       
        console.error('闯关');

        this.selfPlayer.comp.MPComp.stopIncrease();
        this.otherPlayer.comp.MPComp.stopIncrease();

        Laya.timer.once(1000, this, () => {
            this.POST('martial_game_end', {
                killNum: this.killNum
            }, (res) => {
                Laya.MouseManager.enabled = true;
                res.result = loserIsSelf ? -1 : 1;
                this.navigator.popup('/dialog/PassResultDialog', res);
            })
        })
    }
    removeAllWeapons(){
        console.error(`移除所有兵器`)
        //删除界面上兵器
        this.selfWeapons.forEach((weapon) => {
            weapon.endMove();
        })
        this.otherWeapons.forEach((weapon) => {
            weapon.endMove();
        })
    }
    gameOver(loserIsSelf) {
        if (!loserIsSelf) {
            SoundManager.ins.win();
            this.selfPlayer.comp.skeleton.play('win', true);
        } else {
            SoundManager.ins.lose();
            this.otherPlayer.comp.skeleton.play('win', true);
        }
       
        console.error('游戏结束');

        this.selfPlayer.comp.MPComp.stopIncrease();
        this.otherPlayer.comp.MPComp.stopIncrease();
        //this.removeAllWeapons();
        this.boxGameBanner.getComponent(GameBanner)
    }
    onDestroy() {
        console.error('destroy111');
        this.selfWeapons = null;
        this.otherWeapons = null;
        Laya.timer.clearAll(this);
        Laya.MouseManager.enabled = true;
    }
}
