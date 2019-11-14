import Tool from "../../scripts/common/tool/Tool";

export default class Cross extends PaoYa.Component {
    /* @prop {name:imgCross,tips:"小游戏精灵图",type:Node} */
    constructor(){
        super();
    }
    onAwake(){
        this.imgCross.skin=this.params.skin;
        if(this.params.isScale){
            this.owner.scale(0.7,0.7);
        }
        this.owner.on(Laya.Event.CLICK,this,this.crossGame);
        Tool.showGameNums(this.params);
        if(this.params.ani){
            this.shakeEffect();
        }
    }
    crossGame(){
        console.log(`跳转游戏`);    
        Tool.goToNewGame(this.params);
    }
    shakeEffect(){
        this.owner.anchorX=0.5;
        this.owner.anchorY=0.5;
       let shakeTimeLine=new Laya.TimeLine()
       shakeTimeLine.to(this.owner, {
          rotation:-15
       }, 250, Laya.Ease.quadInOut, 500).to(this.owner, {
           rotation:0
       }, 250, Laya.Ease.quadInOut, 0).to(this.owner, {
          rotation:15
       }, 250, Laya.Ease.quadInOut, 0).to(this.owner, {
          rotation:0
       }, 250, Laya.Ease.quadInOut, 0)
      shakeTimeLine.play(0, true);
      this.shakeTimeLine=shakeTimeLine;
    }
    onDestroy(){
        this.shakeTimeLine&&this.shakeTimeLine.destroy();
        this.shakeTimeLine=null;
    }
}