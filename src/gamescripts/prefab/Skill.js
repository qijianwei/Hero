import GameControl from "../GameControl";

export default class Skill extends PaoYa.Component{
    /* @prop {name:spShadow,tips:"阴影遮罩",type:Node} */
    /* @prop {name:lblLockTips,tips:"解锁等级提示",type:Node} */
    constructor(){
        super();
    }
    onAwake(){
      let owner=this.owner;
      this.ownW = owner.width;
      this.ownH = owner.height;
      this.centerX=Math.floor(this.ownW/2);
      this.centerY=Math.floor(this.ownH/2);
      this.maskArea=new Laya.Sprite();
      this.maskArea.texture="remote/game/skill.png";
      owner.addChild(this.maskArea);
     
      this.spMask=new Laya.Sprite();
      this.maskArea.mask=this.spMask;
      
      this.freezeing=false;
      this.maxAngle=270;
      this.startAngle=-90;
      this.endAngle=-90;
      owner.on(Laya.Event.CLICK,this,this.clickHandler);
    }
    clickHandler(){
        if(!GameControl.instance.selfPlayer.comp.canAction||GameControl.instance.selfPlayer.comp.dodge){
            GameControl.instance.showTips("无法行动");
            return;
        }
        if(this.freezeing){
            GameControl.instance.showTips("技能未冷却");
            return;
        }    
        this.postNotification(Skill.CLICK,[this.owner.name]);
    }
    init(params){
      this.cdTime=params.skillCd*1000;
      if(!params.status){
          this.lblLockTips.visible=true;
          this.lblLockTips.font='weaponNFontT';
          this.lblLockTips.text=`LV.${params.skillUnlock}解锁`;
          this.spShadow.visible=true;
          this.lblLockTips.scale(0.5,0.5)
          this.owner.disabled=true;
      }else{
          this.spShadow.visible=false;
          this.lblLockTips.visible=false;
      }
    }
    setCdTime(cdTime) {
        console.warn('修改cd时间:',cdTime);
        //cd 时间
        this.cdTime = cdTime;   
    }
    startT(time) {
       
        this.spShadow.visible=true;
        this.maskArea.visible=true;
        this.freezeing=true;

        this.beiginTime=new Date().getTime();
      
        this.spMask.graphics.clear();
        this.spMask.graphics.drawPie(this.centerX, this.centerY, this.ownW, this.startAngle, this.endAngle, "#000000");
        let cdT=(time==undefined)?this.cdTime:time;
        Laya.timer.frameLoop(1,this,this.startCd,[cdT]);
    }
    
    startCd(time) {
      //  console.log("时间间隔：",this.frameCd);
        if (this.endAngle >= this.maxAngle) {
            this.endCD()
            return;
        }
        this.endAngle+=Laya.timer.delta*360/time;
        this.spMask.graphics.clear();
        this.spMask.graphics.drawPie(this.centerX, this.centerY, this.ownW,
            this.startAngle, this.endAngle, "#000000");
    }
    endCD() {
        Laya.timer.clearAll(this);
        this.maskArea.visible=false;
        this.spShadow.visible=false;
        this.freezeing=false;
        this.endAngle = -90;
    }
   
}
Skill.CLICK="skillClick";