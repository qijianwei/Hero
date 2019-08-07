export default class PlayerState extends PaoYa.Component{
     /** @prop {name:lblState,tips:"人物状态",type:Node} */
    constructor(){
        super();
    }
    onAwake(){
        this.tween = new Laya.Tween();
    }
    setStateText(value){
       this.owner.visible=true;
       this.lblState.text=value;
       this.lblState.font="playerState";
       this.owner.alpha=0.5;
       this.tween.complete();
       this.tween.to(this.owner,{alpha:1},1000,null,Laya.Handler.create(this,()=>{
          this.owner.visible=false;
       }));
    }
    onDisable(){

    }
    onDestroy(){
        this.tween&&this.tween.destroy();
        this.tween=null;
    }
}