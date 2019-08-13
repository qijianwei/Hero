import GameControl from "../GameControl";

export default class GameBanner extends PaoYa.Component{
     /** @prop {name:spGameStyle,tips:'比赛类型精灵图',type:Node}*/
    /** @prop {name:lblTime,tips:'时间label',type:Node}*/
    constructor(){
        super();     
    }
    onAwake(){
        this.startCount();
    }
    changeStyle(params){
      if(params.gameStyle=="macth"){
          this.spGameStyle.texture="remote/game/23.png";
      }else{
         this.spGameStyle.texture="remote/game/23.png"; 
      }
    }
    startCount(){
     /*    console.log(this.spGameStyle)
        console.log(this.lblTime) */
        let timerService=new PaoYa.TimerService(1000,1,true);
        timerService.on(PaoYa.TimerService.PROGRESS, this, (time) => {
            
            this.lblTime.text = time.formatTime('M:S') + ""
        })
        timerService.on(PaoYa.TimerService.STOP, this, () => {
          
        })  
       // GameControl.instance.timerService=timerService;
        timerService.start();
        this.timerService=timerService;
    }
    pause(){

    }
    resume(){
        //this.timerService.
    }
    onDestroy(){
       this.timerService.stop();
    }
}