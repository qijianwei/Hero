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

  /** @prop {name:boxAniSkill,tips:"兵器技能触发动效box",type:Node} */
  /** @prop {name:aniSkill,tips:"兵器技能动效节点",type:Node} */
  /** @prop {name:boxAniUp,tips:"英雄升级动效box",type:Node} */
  /** @prop {name:aniUp,tips:"英雄升级动效节点",type:Node} */
  /** @prop {name:boxAniPoison,tips:"中毒动效box",type:Node} */
  /** @prop {name:aniPoison,tips:"中毒动效节点",type:Node} */
  /** @prop {name:boxAniSkill2,tips:"人物技能2box",type:Node} */
  /** @prop {name:aniSkill2,tips:"人物技能2动效节点",type:Node} */
  constructor() {
    super();
  }
  onAwake() {
    //this.params=this.owner.params;
    let owner = this.owner;
    this.typeAniName = ["", "Bot", "Mid", "Top", "Top"]; //对应轨迹的动画名称

    let width = owner.width,
      height = owner.height;

    let skeleton = new Laya.Skeleton();
    let posX = Math.floor(width / 2),
      posY = height;
    this.centerX = posX;
    skeleton.pos(posX, posY - 10);
    this.skeleton = skeleton;
    this.sectionAni = 0; //分段动画
    //不管什么状态播放完，都继续播放待机状态
    this.skeleton.on(Laya.Event.STOPPED, this, () => {
      Laya.MouseManager.enabled = true;
      if(GameControl.instance.gameState=='over'){
        return;
      }
      if (this.sectionAni == 1) {
        this.sectionAni += 1;
        this.skeleton.play('dodge2', false)
        return;
      }
      if (this.sectionAni == 2) {
        this.sectionAni += 1;
        this.skeleton.play('dodge3', false)
        return;
      }
      if (this.sectionAni == 3) {
        this.removeDodge();
        return;
      }
      this.skeleton.play('stand', true)
    })

    owner.addChild(skeleton);

    let freeze = HeroConfig.getSkeleton('freeze');
    freeze.pos(posX, posY)
    this.owner.addChild(freeze);
    this.freeze = freeze;

    this.canAction = true;
    this.initDress();
    this.onSkeletonLabel();
  }
  /* 监听事件帧 */
  onSkeletonLabel(){
    this.skeleton.on(Laya.Event.LABEL,this,(e)=>{
      switch(e.name){
        case 'skill1':
          GameControl.instance.allResume(this.isSelf)
           this.skillCallback(); 
          break;
        case 'stop':
           GameControl.instance.allPause(this.isSelf)
          break;
        case 'skill2':
            GameControl.instance.allResume(this.isSelf)
            this.boxAniSkill2.visible=true; 
            this.aniSkill2.play(0,true);
          break;
        case 'launch':
          this.attackCallback();
          break;
      }
     
    })
  }
  //动态注册技能回调
  skillCallback(){

  }
  //动态注册攻击回调
  attackCallback(){

  }
  onEnable() {

  }
  initDress() {
    let url = "spine/hero/hero_1.sk";
    this.skeleton.load(url, Laya.Handler.create(this, () => {
        this.skeleton.play('stand', true)
    }))
  }
  //人物触发技能1
  showSkill1(){
    this.skeleton.play("skill1",false);
  }
  removeSkill1(){
    this.aniSkill1.stop();
  }
  //人物触发技能2
  showSkill2(){ 
     this.skeleton.play("skill2",false);
  }
  removeSkill2(){
     this.boxAniSkill2.visible=false;
     this.aniSkill2.stop();
  }
  //人物触发兵器技能特效
  skillEffect() {
    this.boxAniSkill.visible = true;
    this.aniSkill.play(0, false);
  }
  removeSkillEffect(){
    this.aniSkill.stop();
    this.boxAniPoison.visible=false;
  }
  //攻击
  attackEffect(weaponSkillEffect) {
    // this.skeleton.playbackRate(1)
    this.skeleton.play("attack", false);
    if(weaponSkillEffect){
      this.skillEffect();
    }
  }
  //受击打,所有武器碰到都有这效果
  injuredEffect(posType, value, isCrit, cb) {
   // this.canAction = false;
    if (this.isSelf) {
      Laya.MouseManager.enabled = false;
    }
    this.HPComp.changeHP(value);
    if (isCrit) {
      this.showFontEffect("暴击" + value, "crit")
    } else {
      this.showFontEffect(value, "hurt")
    }

    if (this.HPComp.curHP <= 0) {
      console.error('死亡结束')
      this.skeleton.play("death", false);
      GameControl.instance.gameOver(this.isSelf);
      return;
    }
    let aniName = this.typeAniName[posType];
    this.skeleton.play("injured", false);
    this['boxAni' + aniName].visible = true;
    this['ani' + aniName].play(0, false);
    cb && this.skeleton.once(Laya.Event.LABEL, this, (e) => {
      if(e.name==="injuredEnd"){ cb()} 
    })
  }
  //恢复生命
  hpRecoverEffect(value) {
    this.boxAniHp.visible = true;
    this.aniHp.play(0, false);
    this.HPComp.changeHP(value);
    this.showFontEffect("+" + value, "recoverHP")
  }
  //恢复内力
  mpRecoverEffect(value) {
    this.boxAniMp.visible = true;
    this.aniMp.play(0, false);
    this.MPComp.changeMP(value);
    this.showFontEffect("+" + value, "recoverMP")
  }
  //中毒
  poisonEffect(poisonTime, hpValue) {
    if(this.attr.notPoison==1){
      this.showPlayerState("免疫")
      return;
    }
 /*    this.canAction = false;
    if (this.isSelf) {
      Laya.MouseManager.enabled = false;
      GameControl.instance.allBtnsLock();
    } */
    this.boxAniPoison.visible = true;
    this.aniPoison.play(0, true);
    let startTime = new Date().getTime();
    let endTime = startTime + poisonTime + 1000;
    // this.HPComp.changeHP(hpValue);
    this.showPlayerState("中毒")
    // let showText=hpValue>0?"中毒+"+hpValue:"中毒"+hpValue;
    // this.showFontEffect(showText,"poision")
    Laya.timer.loop(1000, this, this.minusHp, [endTime, hpValue])

  }
  minusHp(endTime, hpValue) {
    if (new Date().getTime() > endTime) {
      this.removePoison();
      Laya.timer.clear(this, this.minusHp);
      return;
    }
    let showText = hpValue > 0 ? "中毒+" + hpValue : "中毒" + hpValue;
    this.showFontEffect(showText, "poision")
    this.HPComp.changeHP(hpValue);
  }
  removePoison() {
  /*   this.canAction = true;
    if (this.isSelf) {
      Laya.MouseManager.enabled = true;
      GameControl.instance.allBtnsUnlock();
    } */
    this.boxAniPoison.visible = false;
    this.aniPoison.stop();
  }
  //x眩晕
  dizzyEffect(dizzyTime) {
    if(this.attr.notDizzy==1){
      this.showPlayerState("免疫")
      return;
    }
    this.canAction = false;
    if (this.isSelf) {
      Laya.MouseManager.enabled = false;
      GameControl.instance.allBtnsLock();
    }
    this.boxAniDizzy.visible=true;
    this.aniDizzy.play(0,true);
    this.skeleton.play('dizzy', true);
    this.showPlayerState("晕眩")
    Laya.timer.once(dizzyTime, this, this.removeDizzy)
  }
  removeDizzy() {
    this.canAction = true;
    if (this.isSelf) {
      Laya.MouseManager.enabled = true;
      GameControl.instance.allBtnsUnlock();
    }
    this.skeleton.play('stand', true);
    this.boxAniDizzy.visible=false;
    this.aniDizzy.stop();
  }
  //麻痹
  palsyEffect(palsyTime){
    if(this.attr.notPalsy==1){
      this.showPlayerState("免疫")
      return;
    }
    this.canAction=false;
    if (this.isSelf) {
      Laya.MouseManager.enabled = false;
      GameControl.instance.allBtnsLock();
    }
    this.boxAniPalsy.visible=true;
    this.aniPalsy.play(0,true);
    this.skeleton.play('freeze',true);
    this.showPlayerState("麻痹");
    Laya.timer.once(palsyTime, this, this.removePalsy)
  }
  removePalsy(){
    this.canAction = true;
    if (this.isSelf) {
      Laya.MouseManager.enabled = true;
      GameControl.instance.allBtnsUnlock();
    }
    this.skeleton.play('stand', true);
    this.boxAniPalsy.visible=false;
    this.aniPalsy.stop();  
  }
  //冰冻
  freezedEffect(freezeTime = 3000) {
    if(this.attr.notFrozen==1){
      this.showPlayerState("免疫")
      return;
    }
    this.canAction = false;
    if (this.isSelf) {
      Laya.MouseManager.enabled = false;
      GameControl.instance.allBtnsLock();
    }
    this.freeze.visible = true;
    this.skeleton.play('freeze', true)
    this.freeze.play('freeze', false)
    this.showPlayerState("冰冻")
    Laya.timer.once(freezeTime, this, this.removeFreeze)
  }
  removeFreeze() {
    this.canAction = true;
    if (this.isSelf) {
      Laya.MouseManager.enabled = true;
      GameControl.instance.allBtnsUnlock();
    }
    this.freeze.visible = false;
    this.skeleton.play('stand', true);
  }
  //闪避技能
  dodgeEffect() {
    this.sectionAni = true;
    this.dodge = true; //闪避无敌状态
    this.owner.zOrder = 100;
    this.skeleton.play('dodge1', false);
    if(this.isSelf){
      GameControl.instance.allBtnsLock();
    }  
  }
  removeDodge() {
    this.owner.zOrder = 20;
    this.sectionAni = 0;
    this.dodge = false;
    if(this.isSelf){
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
      hurt.scaleX = 2;
      targetScaleX = 1;
    } else {
      hurt.scaleX = -2;
      targetScaleX = -1;
    }
    hurt.scaleY = 2;
    endPos = {
      y: -60
    }
    hurt.y = 40;
    hurt.pivot(hurt.width / 2, hurt.height / 2);
    hurt.x = this.centerX;
    this.owner.addChild(hurt);

    var tween = new Laya.Tween();
    tween.to(hurt, {
      y: endPos.y,
      scaleX: targetScaleX,
      scaleY: 1
    }, 600, Laya.Ease.linearIn, Laya.Handler.create(this, function (item) {
      item.removeSelf();
      Laya.Pool.recover('effectLabel', item);
    }, [hurt]));
  }
  onDisable() {

  }
  onDestroy() {

  }
}