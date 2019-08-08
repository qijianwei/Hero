export default class PlayerSkill extends PaoYa.Component{
       /** @prop {name:lblState,tips:"人物状态",type:Node} */
    constructor(){
        super();
    }
    onAwake(){
     this.tween = new Laya.Tween();
     
     }
     setSkillText(value){
        this.owner.visible=true;
        this.owner.alpha=1;
        this.lblState.text=value;
        this.lblState.scale(5,5);
        this.lblState.font="playerSkill";
     
        this.tween.to(this.lblState,{scaleX:1,scaleY:1},300,Laya.Ease.backIn,Laya.Handler.create(this,()=>{
            this.tween.to(this.owner,{alpha:0},300,null,Laya.Handler.create(this,()=>{
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