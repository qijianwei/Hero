import Weapon from './prefab/Weapon';
import WeaponBar from './prefab/WeaponBar';
import Player from './prefab/Player';
import MPBar from './prefab/MPBar';
import HPBar from './prefab/HPBar';
import WeaponManager from './WeaponManager';
import Skill from './prefab/Skill';
import Dodge from './prefab/Dodge';
export default class GameControl extends PaoYa.Component {
    /** @prop {name:weapon,tips:"武器预制体对象",type:Prefab}*/
    /** @prop {name:weaponBar,tips:"武器预制体对象",type:Prefab}*/
    /** @prop {name:player,tips:"人物预制体对象",type:Prefab} */
    /** @prop {name:selfHP,tips:'自己的血条',type:Node}*/
    /** @prop {name:selfMP,tips:'自己的体力',type:Node}*/
    /** @prop {name:otherHP,tips:'对方的血条',type:Node}*/
    /** @prop {name:otherMP,tips:'对方的体力',type:Node}*/

    constructor() {
        super();
        GameControl.instance = this;
        Laya.MouseManager.multiTouchEnabled = false;
    }
    onAwake() {
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
        this.weaponsBarArr = []; //存放兵器操作Bar;提供全局暂停和恢复CD功能；

        //暂时这么用;可能要用全局状态管理器
        this.selfWeapons = [];
        this.otherWeapons = [];
        this.dodgeComp = this.owner.dodge.getComponent(Dodge);
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
        Laya.timer.once(5000, this, () => {
             Laya.timer.once(1000,this,this.startSelect); 

        })
        //机器人开始

       //画出三条运动轨迹，便于调试
       this.curvature = 0.0008;
       this.drawParabola();
       this.curvature=0.0015;
       this.drawParabola();
        
    }
    drawParabola(){ 
        let space=5;
        let pathArr=[];
        this.startPos = {
            x: 180,
            y: 450
          }
          this.endPos = {
            x: 1150,
            y: 450
          }
           pathArr.push(["moveTo",0,0]);
          
 
    // X轴Y轴的偏移总量
       this.driftX = this.endPos.x - this.startPos.x;
       this.driftY = this.endPos.y - this.startPos.y;
       this.b = (this.driftY - this.curvature * this.driftX * this.driftX) / this.driftX;
       for(let i=5;i<=this.driftX;i+=space){
         let x=i;
         let y=Math.floor(this.curvature * x * x + this.b * x);
         pathArr.push(["lineTo",x,y]);
       }
       pathArr.push(["closePath"]);
      // this.owner.spDraw.graphics.clear();
       this.owner.spDraw.graphics.drawPath(this.startPos.x,this.startPos.y,pathArr,null,{
            strokeStyle:"#ff0000",
            lineWidth:2,
            lineCap:"round"
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
    onClick(e) {
        switch (e.target.name) {

            case 'skill1':
                this.skillWithWeapon(true);
                break;
            case 'skill2':
                this.skillWithoutWeapon(true);
                break;

        }
    }
    onEnable() {
        /*   Laya.timer.once(2000,this,()=>{
              this.owner.aniBot.play(0,false);
          }) */

        this.onNotification(WeaponBar.CLICK, this, this.weaponBarClickHandler)
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
        console.error(component.attr.skillWeapon)
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
        let time1 = this.selfPlayer.comp.activeSkills[0].skillCd * 1000;
        let time2 = this.selfPlayer.comp.activeSkills[1].skillCd * 1000;
        this.skillScrO = owner.skill1.getComponent(Skill);
        this.skillScrT = owner.skill2.getComponent(Skill);
        this.skillScrO.initCdTime(time1);
        this.skillScrT.initCdTime(time2);
        /* owenr.skill1.index=1;
        owenr.skill2.index=2; */
        // this.skillScrO.
    }
    skillWithWeapon(isSelf) {
        let name = isSelf ? 'self' : 'other';
        let roleComp = this[name + 'Player'].comp,
            skillWeapon = JSON.parse(JSON.stringify(roleComp.attr.skillWeapon));
        let originMP = roleComp.MPComp.originMP;
        let consumeMP = skillWeapon.weaponConsume * originMP;
        if (this[name + 'Player'].comp.MPComp.curMP < consumeMP) {
            console.warn(name + 'Player' + "__体力不足");
            return;
        }

        skillWeapon.isSelf = isSelf;
        this[name + 'Player'].comp.MPComp.changeMP(-consumeMP);
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

        this.weaponLaunch(skillWeapon);

    }
    skillWithoutWeapon(isSelf) {
        let name = isSelf ? 'self' : 'other';
        let skillInfo = this[name + 'Player'].comp.activeSkills[1];
        switch (skillInfo.skillId) {
            case 33:
                this.allWeaponsUnfreeze(skillInfo);
                break;
            case 36:
                let t = skillInfo.skillConfig.time,
                    perMP = skillInfo.skillConfig.recoverMp,
                    originHP = this[name + 'Player'].comp.HPComp.originHP,
                    resumeHP = skillInfo.skillConfig.recoverHp;
                this[name + 'Player'].comp.changePerMp(t, perMP);
                this[name + 'Player'].comp.HPComp.changeHP(originHP * resumeHP);
                break;
            case 39:
                /* this[name+'Player'].comp.changePerMp(); */
                this[name + 'MultiMP'] = skillInfo.skillConfig.consumeMp;
                console.error('内力消耗倍数:', skillInfo.skillConfig.consumeMp)
                Laya.timer.once(skillInfo.skillConfig.time * 1000, this, () => {
                    console.error('内力消耗倍数恢复:')
                    this[name + 'MultiMP'] = 1;
                })
                break;
            case 45:
                break;
        }

    }
    allWeaponsUnfreeze(skillInfo) {
        let time = skillInfo.skillConfig.time * 1000;
        this.weaponsBarArr.forEach((weaponBarComp) => {
            weaponBarComp.endCD(); //探讨要不要
            weaponBarComp.setCdTime(0)
        })

        Laya.timer.once(time, this, () => {
            this.weaponsBarArr.forEach((weaponBarComp) => {
                weaponBarComp.setCdTime(weaponBarComp.originCdTime)
            })
        })
    }
    startSelect() {
        let sWeapon = this.weaponManager.seletedWeapon();
        let curMp = this.otherPlayer.comp.MPComp.curMP;
        if (curMp >= sWeapon.params.weaponConsume) {
            sWeapon.isSelf = false;
            sWeapon.selectedHandler();
            this.weaponBarClickHandler(sWeapon);
            Laya.timer.once(5000, this, this.startSelect);
        } else {
            Laya.timer.once(500, this, this.startSelect);
        }
    }
    //兵器点击后我方表现
    weaponBarClickHandler(targetComp) {
        //体力不够
        let name = targetComp.isSelf ? 'self' : 'other';
        let consumeMP = targetComp.weaponConsume;
        if (this[name + 'Player'].comp.MPComp.curMP < consumeMP) {
            console.warn(name + 'Player' + "__体力不足");
            return;
        }

        this[name + 'Player'].comp.MPComp.changeMP(-consumeMP * this[name + 'MultiMP']);
        //人物表现
        if (this.isSelf) {
            console.error('用户发射武器........')
        }
        this[name + 'Player'].comp.attackEffect();
        this[name + 'Player'].comp.attr.calcCritProb = this[name + 'Player'].comp.attr.roleCritProb;
        //判断是否触发兵器技能
        let skill = targetComp.params.activeSkill;
        let skillType = skill.skillType,
            status = skill.status,
            skillId = skill.skillId,
            prob = skill.skillProb;
        //测试用例
        if (targetComp.isSelf && targetComp.params.weaponType == 2) {
            let testId=48;
            let tempArr=[{
                skillId:43,
                weaponId:['d001_1',"d005_2","d007_2","d008_2","d009_2","d011_2","d012_2"].randomItem
            },{
                skillId:44,
                weaponId:"d013_3"
            },{
                skillId:45,
                weaponId:"d009_2"
            },{
               skillId:46,
               weaponId:"d014_3"
            },{
               skillId:47,
               weaponId:"d006_2"
            },{
              skillId:48,
              weaponId:"d006_2"
            },{
                skillId:49,
                weaponId:"z009_2"
            }];
            let tempWeaponInfo={};
            for(let i=0;i<tempArr.length;i++){
                if(testId==tempArr[i].skillId){
                    tempWeaponInfo=tempArr[i];
                    break;
                }
            };
            /* skill.skillId = [43, 44, 45, 46, 47, 48].randomItem;
            skill.skillId=47;
            targetComp.params.weaponId="d015_3" 48
            targetComp.params.weaponId= "d006_2"; */
           let {skillId,weaponId}=tempWeaponInfo;
            skill.skillId=skillId;
            targetComp.params.weaponId=weaponId;
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
                    
            }
        }
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
                this.weaponWithSkills(params, skillId);
                return;
            } else {
                console.warn('不好意思,没有触发技能')
            }
        }
        //正常开始技能冷却
        targetComp.startT();
        this.weaponLaunch(params);
    }
    weaponLaunch(params, deltaT) {
        let name = params.isSelf ? 'self' : 'other';
        let weapon = Laya.Pool.getItemByCreateFun("weapon", this.weapon.create, this.weapon);
        let weaponComp = weapon.getComponent(Weapon);
        weapon.params = params;
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
    //以下下是正常点击发射
    weaponBySelf(params, deltaT) {
        let weapon = Laya.Pool.getItemByCreateFun("weapon", this.weapon.create, this.weapon);
        let weaponComp = weapon.getComponent(Weapon);
        weapon.params = params;
        weaponComp.isSelf = true;
        /*  this.owner.addChild(weapon); */
        weapon.pos(340, 450)
        //暂定
        if (deltaT) {
            Laya.timer.once(deltaT, this, () => {
                this.owner.addChild(weapon);
                this.selfWeapons.push(weaponComp);
            });
        } else {
            this.owner.addChild(weapon);
            this.selfWeapons.push(weaponComp);
        }
    }
    weaponByOther(target) {
        let weapon = Laya.Pool.getItemByCreateFun("weapon", this.weapon.create, this.weapon);
        let weaponComp = weapon.getComponent(Weapon);
        weapon.params = target;
        weaponComp.isSelf = false;
        // weapon.isSelf=true;
        this.owner.addChild(weapon);
        weapon.pos(953, 450);

        //暂定
        this.otherWeapons.push(weaponComp);
    }
    //带着技能发射

    weaponWithSkills(params, skillId) {
        let skillConfig = params.activeSkill.skillConfig;
        let hurt = skillConfig.hurt;
        let durable = skillConfig.durable;
        params.skillEffect = true; //代表技能是触发的
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
    //闪避技能
    dodgeSkillShow(isSelf) {
        let name = isSelf ? 'self' : 'other';
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
        if (!loserIsSelf) {
            this.selfPlayer.comp.skeleton.play('win', true);
        }
        Laya.timer.clearAll(this);
        console.error('游戏结束');
    }
    onDestroy() {
        Laya.timer.clearAll(this);
    }
}