export default class Skill extends PaoYa.Component{
    /* @prop {name:spShadow,tips:"阴影遮罩",type:Node} */
    constructor(){
        super();
    }
    onAwake(){
     let owner=this.owner;
      this.ownW = owner.width;
      this.ownH = owner.height;
      this.centerX=Math.floor(this.ownW/2);
      this.centerY=Math.floor(this.ownH/2);
      this.spShadow.visible=false;
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
        if(this.freezeing){
            console.warn("冷却中不接受点击");
            return;
        }    
      
        this.startT();
    }
    initCdTime(cdTime){
        console.warn('初始化cd时间:',cdTime);
        //cd 时间
        this.cdTime = cdTime;   
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