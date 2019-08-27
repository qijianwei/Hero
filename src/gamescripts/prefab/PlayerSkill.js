export default class PlayerSkill extends PaoYa.Component{
        /** @prop {name:imgBg,tips:"背景图",type:Node} */
       /** @prop {name:lblState,tips:"人物状态",type:Node} */
    constructor(){
        super();
    }
    onAwake(){
       this.tweenText = new Laya.Tween();
       this.tweenImg = new Laya.Tween();
       this.lblState.font="playerSkill";
     }
     setSkillText(value){
        this.owner.visible=true;
        this.imgBg.alpha=0;
       /*  console.log(this.imgBg) */
        this.owner.alpha=1;
        this.lblState.text=value;
        //this.owner.scale(5,5);
        this.lblState.scale(5,5);
        this.tweenImg.complete();
        this.tweenImg.to(this.imgBg,{alpha:1},500);
        this.tweenText.to(this.lblState,{scaleX:1.5,scaleY:1.5},500,Laya.Ease.backOut,Laya.Handler.create(this,()=>{
            this.tweenText.to(this.owner,{alpha:0},300,null,Laya.Handler.create(this,()=>{
                this.owner.visible=false;
           }),800); 
        }))  
     }
     onDisable(){
 
     }
     onDestroy(){
         this.tween&&this.tween.destroy();
         this.tween=null; 
     }
}

//武林高高手项目：小游戏库做了横竖版适配库,统一的资源版本管理,为小游戏开发制定规范的开发流程和项目结构，加快了小游戏模块化的协作开发。
//武林高高手游戏，完成游戏核心逻辑玩法，包括闯关模式，对战模式，新手引导等。英雄技能，兵器技能，机器人策略,游戏动效逻辑均已完成。
//