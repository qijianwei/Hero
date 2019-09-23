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

      let sceneSK=new Laya.Skeleton();
      sceneSK.load(`spine/scene/scene1.sk`,Laya.Handler.create(this,(res)=>{
        
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