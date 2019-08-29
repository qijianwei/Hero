export default class PlayerSkill extends PaoYa.Component {
    /** @prop {name:imgBg,tips:"背景图",type:Node} */
    /** @prop {name:lblState,tips:"人物状态",type:Node} */
    constructor() {
        super();
    }
    onAwake() {
        //this.tweenText = new Laya.Tween();
        this.tweenImg = new Laya.Tween();
        this.timeLine = new Laya.TimeLine();
        this.lblState.font = "playerSkill";
        this.timeLine.to(this.lblState, {
            scaleX: 1.5,
            scaleY: 1.5
        }, 500, Laya.Ease.backOut, null).to(this.owner, {
            alpha: 0
        }, 300, null, 800);
        this.timeLine.on('complete',this,()=>{
            this.owner.visible=false;
        })
    }
    setSkillText(value) {
        this.owner.visible = true;
        this.imgBg.alpha = 0;
        /*  console.log(this.imgBg) */
        this.owner.alpha = 1;
        this.lblState.text = value;
        //this.owner.scale(5,5);
        this.lblState.scale(5, 5);
        this.tweenImg.complete();
        /*   this.tweenText.complete(); */
        this.tweenImg.to(this.imgBg, {
            alpha: 1
        }, 500);
        /*    this.tweenText.to(this.lblState,{scaleX:1.5,scaleY:1.5},500,Laya.Ease.backOut,Laya.Handler.create(this,()=>{
               this.tweenText.to(this.owner,{alpha:0},300,null,Laya.Handler.create(this,()=>{
                   this.owner.visible=false;
              }),800); 
           }))   */
         //  this.timeLine._complete();
        this.timeLine.play(0,false);
    }
    onDisable() {

    }
    onDestroy() {
        this.tweenImg && this.tweenImg.clear();
        this.tweenImg = null;
        this.timeLine&&this.timeLine.destroy();
        this.timeLine=null;
    }
}