let instance

/**
 * 游戏开场前管理类
 */
export default class PreOpenManager extends Laya.EventDispatcher {
  constructor(cb) {
    super();
    if ( instance ){
     // cb();
     Laya.timer.callLater(this,cb);
      return instance
    }
    instance = this;
    this.cb=cb;
    Laya.loader.create('gamescenes/prefab/PreOpenView.json',Laya.Handler.create(this,this.onComplete))
    
  }
  onComplete(obj){
    let preOpenView=new Laya.Prefab();  
     preOpenView.json=obj;
    let view=Laya.Pool.getItemByCreateFun('PreOpenView',preOpenView.create,preOpenView);
    Laya.stage.addChild(view);
    view.width=Laya.stage.width;
    this.view=view;
    this.view.on(`end`,this,this.endHandler);
    this.cb();
  }
  init(){

  }
  start(data){
    this.view.visible=true;
    this.view.start(data);
  }
  endHandler(){
      this.view.visible=false;
      this.event(PreOpenManager.TALKEND)
  }
}
PreOpenManager.TALKEND=`talkend`;

/* 先声明一个预设变量
{Laya.loader.create("prefab/预设名字.json",Handler.create(this,onComplete));
}
private function onComplete(obj:Object):Void{
  一个预设变量.json = ojb
  一个sprite = Pool.getItemByCreateFun("自己起一个名字", this.一个预设变量.create, this.一个预设变量);
} */