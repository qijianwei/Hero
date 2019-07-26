import HeroConfig from "../config/HeroConfig";

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

  /** @prop {name:boxAniSkill,tips:"技能触发动效box",type:Node} */
  /** @prop {name:aniSkill,tips:"技能动效节点",type:Node} */
  /** @prop {name:boxAniUp,tips:"英雄升级动效box",type:Node} */
  /** @prop {name:aniUp,tips:"英雄升级动效节点",type:Node} */
  /** @prop {name:boxAniPoison,tips:"中毒动效box",type:Node} */
  /** @prop {name:aniPoison,tips:"中毒动效节点",type:Node} */


  constructor() {
    super();
  }
  onAwake() {
    //this.params=this.owner.params;
    let owner = this.owner;
    this.typeAniName = ["", "Bot", "Mid", "Top"]; //对应轨迹的动画名称

    let width = owner.width,
      height = owner.height;

    let skeleton = new Laya.Skeleton();
    let posX = Math.floor(width / 2),
      posY = height;
    skeleton.pos(posX, posY - 10);
    this.skeleton = skeleton;

    //不管什么状态播放完，都继续播放待机状态
    this.skeleton.on(Laya.Event.STOPPED, this, () => {
      Laya.MouseManager.enabled = true;
      if (this.HPComp.curHP <= 0) {
        return;
      }
      this.skeleton.playbackRate(1)
      this.skeleton.play("stand", true);
    })
    owner.addChild(skeleton);

    let freeze = HeroConfig.getSkeleton('freeze');
    freeze.pos(posX, posY)
    this.owner.addChild(freeze);
    this.freeze = freeze;

    this.canAction = true;
    this.initDress();
  }

  onEnable() {

  }
  initDress() {
    let url = "spine/npc/npc_7.sk";
    this.skeleton.load(url, Laya.Handler.create(this, () => {
     // this.skeleton.play('freeze', true)
        this.skeleton.play('stand', true)
    }))
  }
  attackEffect() {
    this.skeleton.playbackRate(3)
    this.skeleton.play("attack", false)
  }

  injuredEffect(type, value) {
    this.canAction = false;
    if(this.isSelf){
      Laya.MouseManager.enabled = false;
    } 
    this.HPComp.changeHP(value);
    if (this.HPComp.curHP <= 0) {
      console.error('死亡结束')
      this.skeleton.play("death", false);
      return;
    }
    let aniName = this.typeAniName[type];
    this.skeleton.play("injured", false);
    this['boxAni' + aniName].visible = true;
    this['ani' + aniName].play(0, false);
  }

  hpRecoverEffect(value) {
    this.boxAniHp.visible = true;
    this.aniHp.play(0, false);
    this.HPComp.changeHP(value);
  }
  //恢复内力
  mpRecoverEffect(value) {
    this.boxAniMp.visible = true;
    this.aniMp.play(0, false);
    this.MPComp.changeHP(value);
  }
  //中毒
  poisonEffect(poisonTime, hpValue) {
    this.canAction = false;
    if(this.isSelf){
      Laya.MouseManager.enabled=false;
    }
    this.boxAniPoison.visible = true;
    this.aniPoison.play(0,true);
    let startTime = new Date().getTime();
    let endTime = startTime + poisonTime;
    this.HPComp.changeHP(hpValue);
    Laya.timer.loop(1000, this, this.minusHp, [endTime, hpValue])

  }
  minusHp(endTime, hpValue) {
    if (new Date().getTime() > endTime) {
      this.removePoison();
      Laya.timer.clear(this, this.minusHp);
      return;
    }
    this.HPComp.changeHP(hpValue);
  }
  removePoison() {
    this.canAction = true;
    if(this.isSelf){
      Laya.MouseManager.enabled=true;
    }
    this.boxAniPoison.visible = false;
    this.aniPoison.stop();
  }
  //麻痹
  palsyEffect(palsyTime,value) {
    this.canAction = false;
    this.boxAniPalsy.visible = true;
    this.HPComp.changeHP(value)
    this.aniPalsy.play(0, true);
    this.skeleton.play('dizzy', true);
    Laya.timer.once(palsyTime, this, this.removePalsy)
  }
  removePalsy() {
    this.canAction = true;
    if(this.isSelf){
      Laya.MouseManager.enabled=true;
    }
    this.skeleton.stop();
    this.boxAniPalsy.visible = false;
    this.aniPalsy.stop();
  }
  //人物触发兵器技能特效
  skillEffect() {
    this.boxAniSkill.visible = true;
    this.aniSkill.play(0, false);
  }
  //冰冻
  freezedEffect(freezeTime = 3000) {
    this.canAction=false;
    if(this.isSelf){
      Laya.MouseManager.enabled=false;
    }
    this.freeze.visible = true;
    this.skeleton.play('freeze', true)
    this.freeze.play('freeze', false)
    Laya.timer.once(freezeTime, this, this.removeFreeze)
  }
  removeFreeze() {
    this.canAction=true;
    if(this.isSelf){
      Laya.MouseManager.enabled=true;
    }
    this.freeze.visible = false;
    this.skeleton.stop();
  }
 changePerMp(time,valuePer){
   this.MPComp.changePerMp(this.MPComp.perAddMP*valuePer);
   Laya.timer.once(time,this,this.recoverPerMp);
 }
 recoverPerMp(){
  this.MPComp.changePerMp(this.MPComp.originPerAddMP);
 }
  onDisable() {

  }
  onDestroy() {

  }
}