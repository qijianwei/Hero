import GameBanner from "../../../gamescripts/prefab/GameBanner";
export default class MatchControl extends PaoYa.Component{
     /** @prop {name:boxGameBanner,tips:'游戏类型Banner',type:Node}*/
    constructor(){
        super();
    }
    onAwake(){
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
        let randomTime=(Math.ceil(Math.random()*5)+5)*1000;
        Laya.timer.once(randomTime,this.owner,this.owner.matchOK);
    }
    onClick(e){
       switch(e.target.name){
           case 'btnBack':
               this.timerService.stop();
               this.navigator.pop();
               break;
       }
    } 
    onDisappear(){
       this.timerService=null;
       this.owner.stopAni();
    }
}