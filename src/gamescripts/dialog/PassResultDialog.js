import WeaponBar from "../prefab/WeaponBar";
import GameControl from "../GameControl";


export default class PassResultDialog extends PaoYa.Dialog{
    constructor(){
        super();
    }
    onAwake(){
        console.log(this.params);
        let result=this.params.result;
        this.result=result;
        if(result==-1){
            this.spIcon.texture="remote/pass_result/lose.png";
            this.spBtn.texture="remote/pass_result/btnAgain.png";
            this.boxWeapons.visible=false;
            this.spPanel.texture="remote/pass_result/losePanel.png";
            this.boxPrize.y=460;      
        }else{
            this.spIcon.texture="remote/pass_result/win.png";
            this.spBtn.texture="remote/pass_result/btnNext.png";
            this.boxWeapons.visible=true;
            this.spPanel.texture="remote/pass_result/winPanel.png";
            this.boxPrize.y=379;
            let weaponBarsArr=this.boxWeapons._children;
            let weaponList=this.params.weaponList;
            let len=weaponList.length;
            for(let i=0;i<len;i++){
                weaponBarsArr[i].visible=true;
                let weaponBarsComp=weaponBarsArr[i].getComponent(WeaponBar);
                weaponBarsComp.params=weaponList[i];
                weaponBarsComp.initView();   
                weaponBarsArr[i].off(Laya.Event.CLICK, weaponBarsComp)      
            } 
        }
        this.lblPrize.text=this.params.gold;
        this.spBtn.on(Laya.Event.CLICK,this,this.clickHandler);
        this.btnBack.on(Laya.Event.CLICK,this,this.backHandler);
        
    }
    clickHandler(){
       if(this.result==-1){
           //console.log("再试一次")
           this.close();   
           GameControl.instance.restart();
           GameControl.instance.fillPlayerInfo();
       }else{
           console.log("继续闯关")
           PaoYa.Request.POST("hero_game_start", { stageId: 1 }, (res) => {
            
            res.gameType="pass";
            PaoYa.navigator.replace("GameView", res);
            this.close();
        },(msg,code)=>{
            let errorDialog;
            if(code==3018){
                errorDialog = new AlertDialog({
                    title: "",
                    message: msg
                })  
            }else{
                errorDialog = new AlertDialog({
                    title: "",
                    message: msg
                })
            }
            errorDialog.popup();   
        })
          
       }
    }
    backHandler(){
        this.close();
        PaoYa.navigator.popToRootScene();
    }
}