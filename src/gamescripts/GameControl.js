import Weapon from './prefab/Weapon';
import WeaponBar from './prefab/WeaponBar';
import Player from './prefab/Player';
import MPBar from './prefab/MPBar';
import HPBar from './prefab/HPBar';
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

        this.weaponList = this.params.weaponList;
        this.robotWeaponList = this.params.robotWeaponList;
        this.dealParams(this.weaponList)
        this.dealParams(this.robotWeaponList)
        console.error(this.weaponList)
        console.error(this.robotWeaponList)
        //17855823812
        /*   this.spSelfCollide=this.owner.spSelfCollide;
          this.spOtherCollide=this.owner.spOtherCollide; */

        this.weaponsBarArr = []; //存放兵器操作Bar;提供全局暂停和恢复CD功能；

        //暂时这么用;可能要用全局状态管理器
        this.selfWeapons = [];
        this.otherWeapons = [];

        this.initWeaponsBar();
        this.initPlayer(true);
        this.initPlayer(false);
        this.owner.setInfo({
            name: '阿强',
            icon: 'remote/game/avstar_1.png'
        }, true);
        this.owner.setInfo({
            name: '阿强',
            icon: 'remote/game/avstar_1.png'
        }, false);

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
            case 'btnDoudge':
                console.warn('使用闪避技能')
                break;

        }
    }
    onEnable() {
        /*   Laya.timer.once(2000,this,()=>{
              this.owner.aniBot.play(0,false);
          }) */

        this.onNotification(WeaponBar.CLICK, this, this.weaponBarClickHandler)
    }
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
            this.weaponsBarArr.push(weaponBar);
            boxWeapon.addChild(weaponBar)
        }
        console.log(this.weaponsBarArr);
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
        component.attr = this.params[role];
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
    //兵器点击后我方表现
    weaponBarClickHandler(targetComp) {
        //体力不够
        let name = targetComp.isSelf ? 'self' : 'other';
        let consumeMP = targetComp.weaponConsume;
        if (this[name + 'Player'].comp.attr.roleMp < consumeMP) {
            console.warn(name + 'Player' + "__体力不足");
            return;
        }

        this[name + 'Player'].comp.MPComp.changeMP(-consumeMP);
        //人物表现
        this.selfPlayer.comp.attackEffect();

        //判断是否触发兵器技能
        let skill = targetComp.params.activeSkill;
        let skillType = skill.skillType,
            status = skill.status,
            skillId = skill.skillId,
            prob = skill.skillProb;

        let params = JSON.parse(JSON.stringify(targetComp.params)); //深拷贝,便于修改
        params.skillEffect = false;
        if (skillType == 1 && status == 1) {
            let random = Math.floor(Math.random() * 100 + 1);
            if (random <= 100) {
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
        this.weaponBySelf(params);


        //暂时对方这么发射
        for (var i = 0; i < this.params.robotWeaponList.length; i++) {
            if (targetComp.params.weaponType == this.params.robotWeaponList[i].weaponType) {
                this.weaponByOther(this.params.robotWeaponList[i])
            }
        }


        // this.weaponByOther(target);
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
    //带着技能发射

    weaponWithSkills(params, skillId) {
        let skillConfig = params.activeSkill.skillConfig;
        let hurt = skillConfig.hurt;
        let durable = skillConfig.durable;
        params.skillEffect = true; //代表技能是触发的
        switch (skillId) {
            case 43 || 44:
                let weaponNum = skillConfig.weaponNum;

                console.error("修改后的值:", params.weaponAttack)
                this.weaponBySelf(params);
                for (var i = 0; i < weaponNum - 1; i++) {
                    this.weaponBySelf(params, 350);
                }
                break;
                //造成几倍伤害 兵器前方加气流
            case 47 || 48:
                params.weaponAttack = params.weaponAttack * hurt;
                this.weaponBySelf(params);
                break;
                //向上中路各发出1件兵器 几率12%
            case 51:
                params.weaponType = 2;
                this.weaponBySelf(params);
                params.weaponType = 3;
                this.weaponBySelf(params);
                break;
                // 向上中下路各发出1件兵器 几率8%
            case 52:
                params.weaponType = 1;
                this.weaponBySelf(params);
                params.weaponType = 2;
                this.weaponBySelf(params);
                params.weaponType = 3;
                this.weaponBySelf(params);
                break;
                //100%伤害转化为生命 几率18%
            case 45||46||49||50||53||54||55||59:
                this.weaponBySelf(params);   
                break;
            case 60:
                params.weaponType = 4;
                params.weaponBySelf(params);
                break;
                //造成几倍伤害 兵器上加刀刃特效
            case 56 || 57 || 61:
                params.weaponAttack = params.weaponAttack * hurt;
                this.weaponBySelf(params);
                break;
                //兵器耐久提升100%
            case 62:
                params.weaponDurable = params.weaponDurable * durable;
                this.weaponBySelf(params);
                break;

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
    // 全局碰撞检测
    collisionDetection() {


    }
    gameOver() {
        console.error('游戏结束');
    }
}