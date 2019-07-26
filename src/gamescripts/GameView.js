import MPBar from "./prefab/MPBar";
import HPBar from "./prefab/HPBar";

export default class GameView extends PaoYa.View{
    constructor(){
        super();
    }
    onAwake(){
      this.selfMPBarScr=this.boxSelfInfo.getChildByName('boxMPBar').getComponent(MPBar);
      this.selfHPBarScr=this.boxSelfInfo.getChildByName('boxHPBar').getComponent(HPBar);

      this.otherMPBarScr=this.boxOtherInfo.getChildByName('boxMPBar').getComponent(MPBar);  
      this.otherHPBarScr=this.boxOtherInfo.getChildByName('boxHPBar').getComponent(HPBar);
    }

    onEnable(){
        
    }
    setInfo(data,isSelf){
      let boxInfo=isSelf?this.boxSelfInfo:this.boxOtherInfo;
      let imgIcon=boxInfo.getChildByName('imgIcon');
      let lblName=boxInfo.getChildByName("lblName");
      imgIcon.skin=data.icon;
      lblName.text=data.name;
   /*    console.log(this.boxSelfInfo.getChildByName("boxMPBar"));
      console.log(this.boxOtherInfo.getChildByName('boxHPBar')); */
    }
    
    setHPbar(value,isSelf){
       let HPBarScr=isSelf?this.selfHPBarScr:this.otherHPBarScr;
      
    }
    setMPBar(value,isSelf){
       let MPBarScr=isSelf?this.selfMPBarScr:this.otherMPBarScr;
    }
    onDestroy(){
        
    }
}