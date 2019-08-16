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

    constructor() {
        super();
        GameControl.instance = this;
        Laya.MouseManager.multiTouchEnabled = false;
    }
    onDisappear() {
        Laya.MouseManager.enabled = true;
    }
    onAwake() {
        Laya.Pool.clearBySign('weapon');
        Laya.MouseManager.enabled = true;

        this.params = this.owner.params;
        //暂定
        this.gameType = "pass";
        this.passNum = 1;

        this.weaponList = this.params.weaponList;
        this.robotWeaponList = this.params.robotWeaponList;
        this.dealParams(this.weaponList)
        this.dealParams(this.robotWeaponList)


        this.selfMultiMP = 1; //兵器造成的内力消耗倍数
        this.otherMultiMP = 1; //兵器造成的内力消耗倍数
        this.weaponsBarArr = []; //存放兵器操作Bar;提供全局暂停和恢复CD功能；还有置灰功能

        //暂时这么用;可能要用全局状态管理器
        this.selfWeapons = [];
        this.otherWeapons = [];
        this.dodgeComp = this.owner.dodge.getComponent(Dodge);
        this.dodgeOwner = this.dodgeComp.owner;
        this.playerStateComp = this.playerState.getComponent(PlayerState);
        this.initWeaponsBar();
        this.initPlayer(true);
        this.initPlayer(false);
        this.initSkill();
        this.owner.setInfo({
            name: '阿强',
            icon: 'remote/game/avstar_1.png'
        }, true);
        this.owner.setInfo({
            name: '阿强',
            icon: 'remote/game/avstar_1.png'
        }, false);
        this.selfSkillText = this.owner.selfSkillText;
        this.otherSkillText = this.owner.otherSkillText;
        this.selfSkillTextComp = this.selfSkillText.getComponent(PlayerSkill);
        this.otherSkillTextComp = this.otherSkillText.getComponent(PlayerSkill);
        Laya.timer.once(5000, this, () => {
            Laya.timer.once(1000, this, this.startSelect);
            //this.owner.selfSkillText.getComponent(PlayerSkill).setSkillText("三仙剑")
        })
        //机器人开始

        //画出三条运动轨迹，便于调试
        /*    this.curvature = 0.0008;
           this.drawParabola();
           this.curvature = 0.0015;
           this.drawParabola();
           this.curvature = 0.0025;
           this.drawParabola(); */

    }
    //游戏重新开始
    restart() {

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

    onEnable() {
        this.onNotification(WeaponBar.CLICK, this, this.weaponBarClickHandler)
        this.onNotification(Skill.CLICK, this, this.skillClickHandler);
        this.gameState='start';
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
        //console.log(this.weaponsBarArr);
        this.weaponManager = new WeaponManager(this.robotWeaponList);
    }
    initPlayer(isSelf) {
        let name = isSelf ? 'self' : 'other';
        let role = isSelf ? 'role' : 'robotRole';
        let player = Laya.Pool.getItemByCreateFun('player', this.player.create, this.player);
        let spCollide = this.owner[name + 'Collide'];
        let spX = spCollide.x,
            spY = spCollide.y,
            spW = spCollide.width,
            spH = spCollide.height;

        //let playerScr=player.getComponent(Player)
        let component = player.getComponent(Player);
        component.isSelf = isSelf;
        component.attr = this.params[role];
        if (isSelf) {
            this.selfSkills = this.params[role].skills
        }
        component.activeSkills = [];
        //把人物主动技能挑选出来
        for (let i = 0, len = this.params[role].skills.length; i < len; i++) {
            if (this.params[role].skills[i].skillType == 1) {
                component.activeSkills.push(this.params[role].skills[i]);
            }
        }
        console.error('人物技能');
        console.error(component.activeSkills)

        //component.attr.skillWeapon.params={};
        if (component.attr.skillWeapon) {
            component.attr.skillWeapon.activeSkill = component.attr.skillWeapon.skills[0];
        }
       // console.error(component.attr.skillWeapon)
        component.MPComp = this[name + 'MP'].getComponent(MPBar);
        component.HPComp = this[name + 'HP'].getComponent(HPBar);
        component.MPComp.initBar(this.params[role].roleMp);
        component.HPComp.initBar(this.params[role].roleHp);
        component.isSelf = isSelf;
        if (isSelf) {
            player.pos(220, 560);
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
    initSkill() {
        let owner = this.owner;
        let activeSkills = this.selfPlayer.comp.activeSkills;
        for (let i = 1; i < 3; i++) {
            this['skillScr' + i] = owner['skill' + i].getComponent(Skill);
            this['skillScr' + i].init(activeSkills[i - 1]);
            this['skillOwner' + i] = this['skillScr' + i].owner;
        }
    }
    skillClickHandler(name) {
        if (name == "skill1") {
            /*    this.allPause();
               return; */
            this.skillWithWeapon(true);
        } else if (name == "skill2") {
            /*  this.allResume();
             return; */
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
        //this[name + 'Player'].comp.showSkill1();
        skillWeapon.skillEffect = true;
        switch (skillWeapon.activeSkill.skillId) {
            case 88:
                let addCritProb = skillWeapon.activeSkill.skillConfig.critProb;
                this[name + 'Player'].comp.attr.calcCritProb = this[name + 'Player'].comp.attr.roleCritProb + addCritProb;
                break;
            case 89:
                break;
            case 90:
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
        Laya.timer.once(1000, this, this.startSelect);
        this.selfPlayer.comp.MPComp.resume();
        this.otherPlayer.comp.MPComp.resume();
        this.skillScr1.resume();
        this.skillScr2.resume();
        this.dodgeComp.resume();
    }
    startSelect() {
        let sWeapon = this.weaponManager.seletedWeapon();
        let curMp = this.otherPlayer.comp.MPComp.curMP;
        if (curMp >= sWeapon.params.weaponConsume) {
            if (this.otherPlayer.comp.canAction) {
                sWeapon.isSelf = false;
                sWeapon.selectedHandler();
                this.weaponBarClickHandler(sWeapon);
            }else{
                console.error("无法动弹")
            }
            Laya.timer.once(5000, this, this.startSelect);
        } else {
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
        this[name + 'Player'].comp.MPComp.changeMP(-consumeMP * this[name + 'MultiMP']);
        //人物表现
        if (this.isSelf) {
            console.error('用户发射武器........')
        }

        this[name + 'Player'].comp.attr.calcCritProb = this[name + 'Player'].comp.attr.roleCritProb;
        //判断是否触发兵器技能
        let skill = targetComp.params.activeSkill;
        let skillType = skill.skillType,
            status = skill.status,
            skillId = skill.skillId,
            prob = skill.skillProb;
        /*<---------- 测试用例start  */
        /*   if (targetComp.isSelf && targetComp.params.weaponType == 1) {
             let testId = 43;

             let tempArr = [{
                 skillId: 43,
                 weaponId: ['d001_1', "d005_2", "d007_2", "d008_2", "d009_2", "d011_2", "d012_2"].randomItem
             }, {
                 skillId: 44,
                 weaponId: "d013_3"
             }, {
                 skillId: 45,
                 weaponId: "d009_2"
             }, {
                 skillId: 46,
                 weaponId: "d014_3"
             }, {
                 skillId: 47,
                 weaponId: "d006_2"
             }, {
                 skillId: 48,
                 weaponId: "d006_2"
             }, {
                 skillId: 49,
                 weaponId: "z009_2"
             }, {
                 skillId: 53,
                 weaponId: ["z001_1", "z006_2", "z011_2"].randomItem
             }, {
                 skillId: 54,
                 weaponId: ["z004_2", "z008_2"].randomItem
             }, {
                 skillId: 55,
                 weaponId: "z015_3"
             }, {
                 skillId: 60,
                 weaponId: 'g014_3'
             }, {
                 skillId: 56,
                 weaponId: ["g001_1", "g007_2", "g008_2", "g011_2"].randomItem
             }, {
                 skillId: 57,
                 weaponId: "g010_2"
             }, {
                 skillId: 59,
                 weaponId: ["z007_2", "g009_2"].randomItem
             }, {
                 skillId: 61,
                 weaponId: "g013_3"
             }, {
                 skillId: 62,
                 weaponId: ["d002_1", "d010_2", "z003_1", "g005_2", "g012_2"].randomItem
             }];
             let tempWeaponInfo = {};
             for (let i = 0; i < tempArr.length; i++) {
                 if (testId == tempArr[i].skillId) {
                     tempWeaponInfo = tempArr[i];
                     break;
                 }
             };

             let {
                 skillId,
                 weaponId
             } = tempWeaponInfo;
             skill.skillId = skillId;
             targetComp.params.weaponId = weaponId;
             console.error('释放特技:', skill.skillId)
             switch (skill.skillId) {
                 case 43:
                     skill.skillConfig = {
                         weaponNum: 2
                     }
                     break;
                 case 44:
                     skill.skillConfig = {
                         weaponNum: 3
                     }
                     break;
                 case 45:
                     skill.skillConfig = {
                         poison: "6-60"
                     };
                     break;
                 case 46:
                     skill.skillConfig = {
                         poison: "6-210"
                     };
                     break;
                 case 47:
                     skill.skillConfig = {
                         hurt: 3
                     };
                     break;
                 case 48:
                     skill.skillConfig = {
                         poison: 5
                     };
                     break;
                 case 53:
                     skill.skillConfig = {
                         stealHp: 1
                     }
                     break;
                 case 54:
                     skill.skillConfig = {
                         stealMp: 0.4
                     }
                     break;
                 case 55:
                     skill.skillConfig = {
                         recoverDown: "5-0.4"
                     }
                     break;
                 case 56:
                     skill.skillConfig = {
                         hurt: 1.5
                     }
                     break;
                 case 57:
                     skill.skillConfig = {
                         hurt: 2.5
                     }
                     break;
                 case 60:
                     skill.skillConfig = {
                         way: 4
                     }
                     break;
                 case 61:
                     skill.skillConfig = {
                         hurt: 3.5
                     }
                     break;
                 case 62:
                     skill.skillConfig = {
                         durable: 2
                     }
                     break;
             }
         }  */
        /*<---------- 测试用例end----------> */
        let params = JSON.parse(JSON.stringify(targetComp.params)); //深拷贝,便于修改
        params.skillEffect = false;
        params.isSelf = targetComp.isSelf;
        if (skillType == 1 && status == 1) {
            let random = Math.floor(Math.random() * 100 + 1);
            if (random <= prob) {
                /* 区分哪些是影响自身表现的，哪些是影响对手伤害的 */
                if (skillId == 58) {
                    targetComp.startT(200); //快速冷却     
                } else {
                    //正常开始技能冷却
                    targetComp.startT();
                }
                params.skillEffect = true;
                this[name + 'Player'].comp.attackEffect(params.skillEffect); //兵器技能是否触发
                this[name + 'Player'].comp.attackCallback = () => {
                    this.weaponWithSkills(params, skillId);
                }
                return;
            } else {
                console.warn('不好意思,没有触发技能')
            }
        }

        this[name + 'Player'].comp.attackEffect(false);
        this[name + 'Player'].comp.attackCallback = () => {
            this.weaponLaunch(params);
        }
        //正常开始技能冷却
        targetComp.startT();

    }
    weaponLaunch(params, deltaT) {
        let name = params.isSelf ? 'self' : 'other';
        let weapon = Laya.Pool.getItemByCreateFun("weapon", this.weapon.create, this.weapon);
        let weaponComp = weapon.getComponent(Weapon);
        weaponComp.weaponType=params.weaponType;
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
        let targetWeapons = target.isSelf ? this.selfWeapons : this.otherWeapons;
        for (let i = 0, len = targetWeapons.length; i < len; i++) {
            if (targetWeapons[i] == target) {
                targetWeapons.splice(i, 1);
                //console.log("删除自己")
                break;
            }
        }
        console.log('删除后数组' + target.isSelf, targetWeapons)
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
    //关卡结束
    passOver() {

    }
    gameOver(loserIsSelf) {
        this.gameState='over';
        Laya.MouseManager.enabled = false;
        if (!loserIsSelf) {
            this.selfPlayer.comp.skeleton.play('win', true);
        }else{
            this.otherPlayer.comp.skeleton.play('win',true);
        }
        Laya.timer.clearAll(this);
        console.error('游戏结束');

        this.selfPlayer.comp.MPComp.stopIncrease();
        this.otherPlayer.comp.MPComp.stopIncrease();
       
        //删除界面上兵器
        this.selfWeapons.forEach((weapon) => {
            weapon.endMove();
        })
        this.otherWeapons.forEach((weapon) => {
            weapon.endMove();
        })
        Laya.timer.once(3000,this,()=>{
            this.navigator.pop();
        })
          
    }
    onDestroy() {
        console.error('destroy111');
        this.selfWeapons = null;
        this.otherWeapons = null;
        Laya.timer.clearAll(this);
        Laya.MouseManager.enabled = true;
    }
}