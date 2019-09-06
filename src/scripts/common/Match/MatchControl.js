import GameBanner from "../../../gamescripts/prefab/GameBanner";
export default class MatchControl extends PaoYa.Component{
     /** @prop {name:boxGameBanner,tips:'游戏类型Banner',type:Node}*/
    constructor(){
        super();
        MatchControl.ins=this;
    }
    onAwake(){
        this.params=this.owner.params
        this.gameBannerComp=this.boxGameBanner.getComponent(GameBanner);
    }
    onAppear(){
        let timerService=new PaoYa.TimerService(1000,1,true);
        timerService.on(PaoYa.TimerService.PROGRESS, this, (time) => {
             this.gameBannerComp.setTimeText(`等待时间:${time}`);
        })
        timerService.on(PaoYa.TimerService.STOP, this, () => {
             console.log('停止计时器')
        })  
        timerService.start();
        this.timerService=timerService; 
        this.owner.startAni();
        let randomTime=(Math.ceil(Math.random()*3)+3)*1000;
        Laya.timer.once(randomTime,this,this.matchOK);
    }
    onClick(e){
       switch(e.target.name){
           case 'btnBack':
               this.timerService.stop();
               Laya.timer.clearAll(this);
               this.navigator.pop();
               break;
       }
    } 
    //匹配成功
    matchOK(){
        this.owner.matchOK();
        this.timerService.stop();
        Laya.timer.once(500,this,()=>{
            this.navigator.push("GameView",this.params);
        })
    }
    onDisappear(){
       this.timerService.stop();
       this.timerService=null;
       this.owner.stopAni();
    }
}