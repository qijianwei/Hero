import GameControl from "../GameControl";

export default class GameBanner extends PaoYa.Component{
     /** @prop {name:lblGameType,tips:'比赛类型',type:Node}*/
    /** @prop {name:lblTime,tips:'时间label或者闯关数字',type:Node}*/
    constructor(){
        super();     
    }
    onAwake(){
        this.lblGameType.font="weaponNFontT"; 
    }
    changeStyle(params){
        
      if(params.gameType=="battle"){  
        this.lblGameType.text="匹配赛";
        this.startCount();
      }else if(params.gameType=="pass"){
        this.lblGameType.text=`第${params.curNum}关`;
        this.lblTime.text=`${params.battleIndex}/${params.monsterNum}`
      }
    }
    setTimeText(value){
       this.lblTime.text=value;
    }
    startCount(){
        let timerService=new PaoYa.TimerService(1000,1,true);
        timerService.on(PaoYa.TimerService.PROGRESS, this, (time) => {
            
            this.lblTime.text = time.formatTime('M:S') + ""
        })
        timerService.on(PaoYa.TimerService.STOP, this, () => {
          
        })  
        timerService.start();
        this.timerService=timerService;
    }
    pause(){

    }
    resume(){
        //this.timerService.
    }
    stop(){
        this.timerService.stop();
    }
    onDestroy(){
        this.timerService&& this.timerService.stop();
        this.timerService=null;
    }
}