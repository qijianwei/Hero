import MPBar from "./prefab/MPBar";
import HPBar from "./prefab/HPBar";
import GameBanner from "./prefab/GameBanner";
import HeroConfig from "./config/HeroConfig";
import GameControl from "./GameControl";


export default class GameView extends PaoYa.View{
    constructor(){
        super();
    }
    onAwake(){
      this.selfMPBarScr=this.boxSelfInfo.getChildByName('boxMPBar').getComponent(MPBar);
      this.selfHPBarScr=this.boxSelfInfo.getChildByName('boxHPBar').getComponent(HPBar);

      this.otherMPBarScr=this.boxOtherInfo.getChildByName('boxMPBar').getComponent(MPBar);  
      this.otherHPBarScr=this.boxOtherInfo.getChildByName('boxHPBar').getComponent(HPBar);

      let sceneSK=new Laya.Skeleton();
      let sceneURL='';
      let baseUrl='https://xgamejuedixiaomie.goxiaochengxu.cn/1006/';
      if(GameControl.instance.closeRobot){
        sceneURL=`remote/spine/scene/scene1.sk`;
        this.sceneBg.texture=`remote/game/scene1.jpg`;
      }
      if(this.params.gameType==`pass`||this.params.gameType==`adventure`){
        if(this.params.stageId<15){
          sceneURL=`remote/spine/scene/scene1.sk`;
          this.sceneBg.texture=`remote/game/scene1.jpg`;
        }else if(this.params.stageId>=15&&this.params.stageId<=29){
          sceneURL=`remote/spine/scene/scene3.sk`;
          this.sceneBg.texture=`remote/game/scene3.jpg`;
        }else{
          sceneURL=`remote/spine/scene/scene1.sk`;
          this.sceneBg.texture=`remote/game/scene1.jpg`;
        }
      
      }else if(this.params.gameType==`battle`){
        sceneURL=`remote/spine/scene/scene2.sk`;
        this.sceneBg.texture=`remote/game/scene2.jpg`;
      }
      sceneSK.load(sceneURL,Laya.Handler.create(this,(res)=>{
        sceneSK.play('stand', true);
      //  console.log(sceneSK._templet) 
      }))
      this.sceneSK=sceneSK;
      this.scenePoint.addChild(sceneSK);  
    }

    onEnable(){
        
    }
    initView(){
     
    }
   
    setInfo(data,isSelf){
      let boxInfo=isSelf?this.boxSelfInfo:this.boxOtherInfo;
      let imgIcon=boxInfo.getChildByName(`imgIcon`);
      let lblName=boxInfo.getChildByName(`lblName`);
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
    /*   console.log(this.sceneSK._templet)
      ///场景动画怎么处置
       this.sceneSK&&this.sceneSK.destroy();
      this.sceneSK=null;   */
    }
    
}