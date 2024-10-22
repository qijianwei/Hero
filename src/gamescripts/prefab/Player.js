import HeroConfig from "../config/HeroConfig";
import GameControl from "../GameControl";

export default class Player extends PaoYa.Component {
  /** @prop {name:boxAniBot,tips:"受击动效box",type:Node} */
  /** @prop {name:aniBot,tips:"受击动效节点",type:Node} */
  /** @prop {name:boxAniMid,tips:"中间受击动效box",type:Node} */
  /** @prop {name:aniMid,tips:"受击动效节点",type:Node} */
  /** @prop {name:boxAniTop,tips:"顶部动效box",type:Node} */
  /** @prop {name:aniTop,tips:"受击动效节点",type:Node} */
  /** @prop {name:boxAniPalsy,tips:"麻痹动效box",type:Node} */
  /** @prop {name:aniPalsy,tips:"麻痹动效节点",type:Node} */
  /** @prop {name:boxAniDizzy,tips:"眩晕动效box",type:Node} */
  /** @prop {name:aniDizzy,tips:"眩晕动效节点",type:Node} */
  /** @prop {name:boxAniHp,tips:"回血动效box",type:Node} */
  /** @prop {name:aniHp,tips:"回血动效节点",type:Node} */
  /** @prop {name:boxAniMp,tips:"回蓝动效box",type:Node} */
  /** @prop {name:aniMp,tips:"回蓝动效节点",type:Node} */
  /** @prop {name:boxAniPoison,tips:"中毒动效box",type:Node} */
  /** @prop {name:aniPoison,tips:"中毒动效节点",type:Node} */
  /** @prop {name:aniSkillCommon,tips:"兵器技能动效节点",type:Node} */
  /** @prop {name:aniSkill2Hero1,tips:"1号英雄技能2动效节点",type:Node} */
  /** @prop {name:aniSkill2Hero2,tips:"2号英雄技能2动效节点",type:Node} */
   /** @prop {name:aniSkill2Hero3,tips:"3号英雄技能2动效节点",type:Node} */
  constructor() {
    super();
  }
  onAwake() {
    let owner = this.owner;

    let width = owner.width,
      height = owner.height;
    let posX = Math.floor(width / 2),
      posY = height;
    this.centerX = posX;

    //console.error('角色服装:', this.attr.roleDress);
    let dressIcon = this.attr.roleDress;
    this.dressIcon = dressIcon;
   // this.roleId = this.attr.roleId;
    let skeleton = HeroConfig.getSkeleton(dressIcon);
    skeleton.play('stand', true);
    skeleton.pos(posX, posY - 10);
    //不管什么状态播放完，都继续播放待机状态
    skeleton.on(Laya.Event.STOPPED, this, this.stopHandler);
    skeleton.on(Laya.Event.LABEL, this, this.labelHandler);
    this.skeleton = skeleton;

    this.owner.addChild(skeleton);
    this.typeAniName = ["", "Bot", "Mid", "Top", "Top"]; //对应轨迹的动画名称
    let freeze = HeroConfig.getSkeleton('freeze');
    freeze.pos(posX, posY)
    this.owner.addChild(freeze);
    this.freeze = freeze;
    this.index = 0;
  }
  //执行两次，找原因(因为player在GameControl的onAwake创建)
  onEnable() {
    this.killed = false;
    this.index += 1;
    this.roleId = this.attr.roleId;//重新获取 对象池复用 roleId也许有变
    if (this.dressIcon != this.attr.roleDress) {
      this.dressIcon = this.attr.roleDress
      let templet = HeroConfig.spineMap[this.dressIcon].templet;
      this.skeleton.init(templet, 0);
      this.skeleton.play('stand', true)
    }else{
      this.skeleton.play('stand',true);
    }
    this.canAction = true;
    this.bounceSkill=false;
    this.stealHPSkill=false;
    this.sectionAni = 0; //分段动画
    //状态清零 以免影响下一个
    this.plasyState=false;
    this.freezeState=false;
    this.dizzyState=false;
  }
  /* 监听事件帧 */
  labelHandler(e) {
    // this.skeleton.on(Laya.Event.LABEL, this, (e) => {
    switch (e.name) {
      case 'skill1':
       /* 防止技能1和技能2触发太密集 */
       Laya.timer.once(500,this,()=>{
         if(!this.plasyState&&!this.freezeState&&!this.dizzyState){
           this.canAction = true;
         }
      })
        GameControl.instance.allResume(this.isSelf)
        this.skillCallback();
        break;
      case 'stop':
        console.log(`------stop-------`)
        this.canAction = false;
        GameControl.instance.allPause(this.isSelf)

        break;
      case 'skill2':
         /* 防止技能1和技能2触发太密集 */
        Laya.timer.once(500,this,()=>{
          console.log(`冰冻状态`,this.freezeState)
          if(!this.plasyState&&!this.freezeState&&!this.dizzyState){
            this.canAction = true;
          }
        })
        GameControl.instance.allResume(this.isSelf);
        this.skillCallback();
        if (this['aniSkill2Hero' + this.roleId]) {
          this['aniSkill2Hero' + this.roleId].visible = true;
          this['aniSkill2Hero' + this.roleId].play(0, true);
        }
        break;
      case 'launch':
        this.attackCallback();
        break;
    }

    // })
  }
  //监听动画停止；
  stopHandler() {
    let time = 0;
    //Laya.MouseManager.enabled = true;
    if (this.killed) {
      this.owner.removeSelf();
      return;
    }
    if (this.sectionAni == 1) {
      this.sectionAni += 1;
      this.skeleton.play('dodge2', true);
      if (this.roleId == 1) {
        time = 800;
      } else if(this.roleId==2){
        time = 200;
      }else if(this.roleId==4){
        time = 1000;
      }else if(this.roleId==3){
        time=1000;
      }
       Laya.timer.once(time, this, () => {
        this.sectionAni += 1;
        this.skeleton.play('dodge3', false)
      }) 
      return;
    }   
    if (this.sectionAni == 3) {
      this.removeDodge();
      // return;
    }
    if (this.plasyState || this.freezeState) {
      console.log(`------freeze still-------`)
      this.skeleton.play('freeze', true);
      return;
    }
    if (this.dizzyState) {
      console.log(`------dizzy still-------`)
      this.skeleton.play('dizzy', true);
      return;
    }
    //skeleton被打断，解除机器人不能动 机器人在受伤过程中不能动
    if (!this.isSelf) {
          this.canAction = true;
    } 
    this.skeleton.play('stand', true)
  }
  //动态注册技能回调
  skillCallback() {

  }
  //动态注册攻击回调
  attackCallback() {

  }


  //人物触发兵器技能,人物通用技能
  showSkill1() {
    this.skeleton.play("skill1", false);
  }
  /* removeSkill1() {
    this.aniSkillCommon.stop();
  } */
  //人物触发技能2
  showSkill2() {
    this.skeleton.play("skill2", false);
  }
  removeSkill2() {
    if (this['aniSkill2Hero' + this.roleId]) {
      this['aniSkill2Hero' + this.roleId].visible = false;
      this['aniSkill2Hero' + this.roleId].stop();
    }
  }
  //人物触发兵器技能特效
  skillEffect() {
    this.aniSkillCommon.visible = true;
    this.aniSkillCommon.play(0, false);
  }
  removeSkillEffect() {
    this.aniSkillCommon.stop();
    this.boxAniPoison.visible = false;
  }
  //攻击
  attackEffect(weaponSkillEffect) {
    // this.skeleton.playbackRate(1)
    this.skeleton.play("attack", false);
    if (weaponSkillEffect) {
      this.skillEffect();
    }
  }
  //受击打,所有武器碰到都有这效果
  injuredEffect(posType, value, isCrit, cb) {
    if(this.killed){
      return;
   }
    //机器人用 以防机器人选兵器打断受伤从而打断其他效果,比如中毒回调不执行
    if (!this.isSelf) {
      this.canAction = false;
    } 
    value=Math.round(value);
    this.HPComp.changeHP(value);
    if (isCrit) {
      this.showFontEffect("暴击" + value, "crit")
    } else {
      this.showFontEffect(value, "hurt")
    }

    if (this.HPComp.curHP <= 0) {
      console.warn(`---------------死亡结束---------------`)
      Laya.timer.clearAll(this);
      this.removeAllAni();
      GameControl.instance.deathHandler(this.isSelf);
      this.killed = true;
      this.skeleton.play("death", false);
      return;
    }
    let aniName = this.typeAniName[posType];
    this.skeleton.play("injured", false);
    this['boxAni' + aniName].visible = true;
    this['ani' + aniName].play(0, false);
    this.skeleton.once(Laya.Event.LABEL, this, (e) => {
      if (e.name === "injuredEnd") {
        cb && cb();
      }
    })
  }
  /* 受击打但是没有受伤特效 */
  injuredWithoutEffect(value, isCrit) {
    if(this.killed){
      return;
   }
    //机器人用 以防机器人选兵器打断受伤从而打断其他效果,比如中毒回调不执行
    if (!this.isSelf) {
      this.canAction = false;
    } 
    value=Math.round(value);
    this.HPComp.changeHP(value);
    if (isCrit) {
      this.showFontEffect("暴击" + value, "crit")
    } else {
      this.showFontEffect(value, "hurt")
    }

    if (this.HPComp.curHP <= 0) {
      console.warn(`---------------死亡结束---------------`)
      Laya.timer.clearAll(this);
      this.removeAllAni();
      GameControl.instance.deathHandler(this.isSelf);
      this.killed = true;
      this.skeleton.play("death", false);
      return;
    }
  }
  //死亡时候移除所有动效
  removeAllAni() {
    this.boxAniPoison.visible = false;
    this.aniPoison.stop();

    this.freeze.visible = false;

    this.boxAniPalsy.visible = false;
    this.aniPalsy.stop();

    this.boxAniDizzy.visible = false;
    this.aniDizzy.stop();
  }
  //恢复生命
  hpRecoverEffect(value) {
    value=Math.round(value);
    this.boxAniHp.visible = true;
    this.aniHp.play(0, false);
    this.HPComp.changeHP(value);
    this.showFontEffect("+" + value, "recoverHP")
  }
  //恢复或燃烧内力
  mpRecoverEffect(value) {
    value=Math.round(value);
    this.boxAniMp.visible = true;
    this.aniMp.play(0, false);
    this.MPComp.changeMP(value);
    if(value>0){
      this.showFontEffect("+" + value, "recoverMP")
    }else{
      this.showFontEffect(value, "recoverMP")
    }  
  }
  //中毒
  poisonEffect(poisonTime, hpValue) {
    if (this.attr.notPoison == 1) {
      this.showPlayerState("免疫")
      return;
    }
    this.boxAniPoison.visible = true;
    this.aniPoison.play(0, true);
    let startTime = new Date().getTime();
    let endTime = startTime + poisonTime + 1000;
    this.showPlayerState("中毒")
    Laya.timer.loop(1000, this, this.minusHp, [endTime, hpValue])

  }
  minusHp(endTime, hpValue) {
    if (new Date().getTime() > endTime||GameControl.instance.gameState==`over`) {//游戏结束时候去除毒
      this.removePoison();
      return;
    }
    let showText = hpValue > 0 ? "中毒+" + hpValue : "中毒" + hpValue;
    this.showFontEffect(showText, "poision")
    this.HPComp.changeHP(hpValue);
    if (this.HPComp.curHP <= 0&&!this.killed) {
      console.error('--------中毒死亡结束--------')
      //关掉所有定时器，比如中毒
      this.removePoison();
      this.killed = true;
      this.skeleton.play("death", false);
      GameControl.instance.deathHandler(this.isSelf);
      return;
    }
  }
  /*  */
  becomeDevil(hpValue){
    this.HPComp.changeHP(hpValue);
    if (this.HPComp.curHP <= 0&&!this.killed) {
      console.error('--------走火入魔结束--------');   
      this.killed = true;
      this.skeleton.play("death", false);
      GameControl.instance.deathHandler(this.isSelf);
    }
  }
  halfHP(){
    this.HPComp.halfHP();
  }
  
  removePoison() {
    Laya.timer.clear(this, this.minusHp);
    this.boxAniPoison.visible = false;
    this.aniPoison.stop();
  }
  //x眩晕
  dizzyEffect(dizzyTime) {
    if (this.attr.notDizzy == 1) {
      this.showPlayerState("免疫")
      return;
    }
    console.log(`------dizzy-------`)
    this.canAction = false;
    this.dizzyState = true;
    if (this.isSelf) {
      GameControl.instance.allBtnsLock();
    }
    this.boxAniDizzy.visible = true;
    this.aniDizzy.play(0, true);
    this.skeleton.play('dizzy', true);
    this.showPlayerState("晕眩")
    Laya.timer.once(dizzyTime, this, this.removeDizzy)
  }
  removeDizzy() {
    console.log(`------remove dizzy-------`)
    if(!this.freezeState&&!this.plasyState){
      this.canAction = true;
      this.skeleton.play('stand', true);
    }
    this.dizzyState = false;
    if (this.isSelf) {
      //  Laya.MouseManager.enabled = true;
      GameControl.instance.allBtnsUnlock();
    }
    this.boxAniDizzy.visible = false;
    this.aniDizzy.stop();
  }
  //麻痹
  palsyEffect(palsyTime) {
    if (this.attr.notPalsy == 1) {
      this.showPlayerState("免疫")
      return;
    }
    console.log(`------palsy-------`)
    this.plasyState = true;
    this.canAction = false;
    if (this.isSelf) {
      // Laya.MouseManager.enabled = false;
      GameControl.instance.allBtnsLock();
    }
    this.boxAniPalsy.visible = true;
    this.aniPalsy.play(0, true);
    this.skeleton.play('freeze', true);
    this.showPlayerState("麻痹");
    Laya.timer.once(palsyTime, this, this.removePalsy)
  }
  removePalsy() {
    console.log(`------remove palsy-------`)
    if(!this.freezeState&&!this.dizzyState){
      this.canAction = true;
      this.skeleton.play('stand', true);
    }
    this.plasyState = false;
    if (this.isSelf) {
      //  Laya.MouseManager.enabled = true;
      GameControl.instance.allBtnsUnlock();
    }
    this.boxAniPalsy.visible = false;
    this.aniPalsy.stop();
  }
  //冰冻
  freezedEffect(freezeTime = 3000) {
    if (this.attr.notFrozen == 1) {
      this.showPlayerState("免疫")
      return;
    }
    console.log(`------freeze-------`)
    this.canAction = false;
    this.freezeState = true;
    if (this.isSelf) {
      // Laya.MouseManager.enabled = false;
      GameControl.instance.allBtnsLock();
    }
    this.freeze.visible = true;
    this.skeleton.play('freeze', true)
    this.freeze.play('freeze', false)
    this.showPlayerState("冰冻")
    Laya.timer.once(freezeTime, this, this.removeFreeze)
  }
  removeFreeze() {
    console.log(`------remove freeze-------`)
    if(!this.plasyState&&!this.dizzyState){
      this.canAction = true;
      this.skeleton.play('stand', true);
    }
    this.freezeState = false;
    if (this.isSelf) {
      // Laya.MouseManager.enabled = true;
      GameControl.instance.allBtnsUnlock();
    }
    this.freeze.visible = false;
    
  }
  //龙的效果
  dragonEffect(freezeTime = 3000) {
    this.canAction = false;
    this.freezeStateDragon = true;
    if (this.isSelf) {
      // Laya.MouseManager.enabled = false;
      GameControl.instance.allBtnsLock();
    }
    this.skeleton.play('freeze', true)
    Laya.timer.once(freezeTime, this, this.removeDragonEffect)
  }
  removeDragonEffect() {
    console.log(`------remove freeze-------`) 
    this.freezeStateDragon = false;
    if (this.isSelf) {
      GameControl.instance.allBtnsUnlock();
    }
    if(!this.plasyState&&!this.freezeState&&!this.dizzyState&&!this.killed){
      this.canAction = true;
      this.skeleton.play('stand', true);
    }  
  }
  //闪避技能
  dodgeEffect() {
    this.sectionAni = 1;
    this.dodge = true; //闪避无敌状态
    this.owner.zOrder = 100;
    this.skeleton.play('dodge1', false);
    if (this.isSelf) {
      GameControl.instance.allBtnsLock();
    }
  }
  removeDodge() {
    this.owner.zOrder = 20;
    this.sectionAni = 0;
    this.dodge = false;
    if (this.isSelf) {
      GameControl.instance.allBtnsUnlock();
    }
  }
  changePerMp(time, valuePer) {
    this.MPComp.changePerMP(this.MPComp.perAddMP * valuePer);
    Laya.timer.once(time, this, this.recoverPerMp);
  }
  recoverPerMp() {
    this.MPComp.changePerMP(this.MPComp.originPerAddMP);
  }
  showPlayerState(value) {
    let lblState = Laya.Pool.getItemByClass('effectState', Laya.Label);
    this.lblState = lblState;
    lblState.text = value;
    /*   hurt.fontSize = 100;  */
    lblState.font = "playerState";
    lblState.alpha = 1;
    lblState.leading = 30;
    let endPos;
    let targetScaleX;
    if (this.isSelf) {
      lblState.scaleX = 1.5;
      targetScaleX = 1;
    } else {
      lblState.scaleX = -1.5;
      targetScaleX = -1;
    }
    lblState.scaleY = 1.5;
    endPos = {
      y: -60
    }
    lblState.y = 60;
    lblState.pivot(lblState.width / 2, lblState.height / 2);
    lblState.x = this.centerX;
    this.owner.addChild(lblState);

    var tween = new Laya.Tween();
    tween.to(lblState, {
      y: endPos.y
    }, 500, Laya.Ease.linearIn, Laya.Handler.create(this, function (item) {
      item.removeSelf();
      Laya.Pool.recover('effectLabel', item);
    }, [lblState]));
  }
  /* value 有可能是文字或者數字 注意*/
  showFontEffect(value, type) {
    let hurt = Laya.Pool.getItemByClass('effectLabel', Laya.Label);
    this.hurt = hurt;
    hurt.text = value;
    /*   hurt.fontSize = 100;  */
    hurt.font = type;
    hurt.alpha = 1;
    hurt.leading = 30;
    let endPos;
    let targetScaleX;
    if (this.isSelf) {
      hurt.scaleX = 2.5;
      targetScaleX = 1;
    } else {
      hurt.scaleX = -2.5;
      targetScaleX = -1;
    }
    hurt.scaleY = 2.5;
    endPos = {
      y: -60
    }
    hurt.y = 40;
    hurt.pivot(hurt.width / 2, hurt.height / 2);
    hurt.x = this.centerX;
    this.owner.addChild(hurt);
    
    let duration=600;
    if(type==`recoverMP`){
      duration=1000;
      endPos.y=-100;
    }else if(type==`recoverHP`){
      duration=800;
      endPos.y=-140;
    }
    var tween = new Laya.Tween();
    tween.to(hurt, {
      y: endPos.y,
      scaleX: targetScaleX,
      scaleY: 1
    }, duration, Laya.Ease.linearIn, Laya.Handler.create(this, function (item) {
      item.removeSelf();
      Laya.Pool.recover('effectLabel', item);
    }, [hurt]));
  }
  onDisable() {
     //对象回收的时候把冰冻效果去除
     if(this.freezeState){
       this.removeFreeze();
     }
    Laya.Pool.recover("player", this.owner);
  }
  onDestroy() {
    this.skeleton.off(Laya.Event.STOPPED, this);
    this.skeleton.off(Laya.Event.LABEL, this);
  }
}