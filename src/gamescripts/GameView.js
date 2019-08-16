import MPBar from "./prefab/MPBar";
import HPBar from "./prefab/HPBar";
import GameBanner from "./prefab/GameBanner";
import HeroConfig from "./config/HeroConfig";


export default class GameView extends PaoYa.View{
    constructor(){
        super();
    }
    onAwake(){
      this.selfMPBarScr=this.boxSelfInfo.getChildByName('boxMPBar').getComponent(MPBar);
      this.selfHPBarScr=this.boxSelfInfo.getChildByName('boxHPBar').getComponent(HPBar);

      this.otherMPBarScr=this.boxOtherInfo.getChildByName('boxMPBar').getComponent(MPBar);  
      this.otherHPBarScr=this.boxOtherInfo.getChildByName('boxHPBar').getComponent(HPBar);

      this.gameBannerScr=this.boxGameBanner.getComponent(GameBanner);
      this.gameBannerScr.changeStyle({gameStyle:'battle'});
      let scene=HeroConfig.getSkeleton('scene1');
      this.scenePoint.addChild(scene);
      scene.play('stand',true);
    }

    onEnable(){
        
    }
    initView(){
     
    }
   
    setInfo(data,isSelf){
      let boxInfo=isSelf?this.boxSelfInfo:this.boxOtherInfo;
      let imgIcon=boxInfo.getChildByName('imgIcon');
      let lblName=boxInfo.getChildByName("lblName");
      imgIcon.skin=data.icon;
      lblName.text=data.name;
    }
    
    setHPbar(value,isSelf){
       let HPBarScr=isSelf?this.selfHPBarScr:this.otherHPBarScr;
      
    }
    setMPBar(value,isSelf){
       let MPBarScr=isSelf?this.selfMPBarScr:this.otherMPBarScr;
    }
    onDestroy(){
      //场景动画怎么处置
    }
    
}