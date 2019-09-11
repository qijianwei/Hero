import WeaponBar from "../prefab/WeaponBar";
import GameControl from "../GameControl";
import SoundManager from "../SoundManager";
import AlertDialog from "./AlertDialog";
import HomeControl from "../../scripts/common/HomeControl";


export default class PassResultDialog extends PaoYa.Dialog{
    constructor(){
        super();
    }
    onAwake(){
        console.log(this.params);
        this.autoDestroyAtClosed=true;
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
        let warnDialog;
        if(this.params.refinerNew==1){
           warnDialog=new AlertDialog({
               message:'提高武器属性，去炼器室试试',
               confirmText:'前往',
               confirmHandler:()=>{
                  this.close();
                   PaoYa.navigator.popToRootScene();
                   PaoYa.navigator.visibleScene.getComponent(HomeControl).guideF('btn3');
               }
           })
           warnDialog.popup();
        }else if(this.params.roleNew==1){
            warnDialog=new AlertDialog({
                message:'胜不骄败不馁，尝试升级英雄！',
                confirmText:'前往',
                confirmHandler:()=>{
                    this.close();
                    PaoYa.navigator.popToRootScene();
                   PaoYa.navigator.visibleScene.getComponent(HomeControl).guideF('btn1');
                }
            })
            warnDialog.popup();

        }else if(this.params.weaponNew==1){
            warnDialog=new AlertDialog({
                message:'想要神兵相助，去兵器库逛逛！',
                confirmText:'前往',
                confirmHandler:()=>{
                    this.close();
                    PaoYa.navigator.popToRootScene();
                    PaoYa.navigator.visibleScene.getComponent(HomeControl).guideF('btn2');
                }
            })
            warnDialog.popup();
        }
        
    }
    clickHandler(){
        SoundManager.ins.btn();
       if(this.result==-1){
           //console.log("再试一次")
           this.close();   
           GameControl.instance.restart();
           GameControl.instance.fillPlayerInfo();
       }else{
           console.log("继续闯关")
           PaoYa.Request.POST("hero_game_start", { stageId: 1 }, (res) => {
             // 绘制遮罩区，含透明度，
           let  maskArea = new Laya.Sprite();
		        maskArea.alpha = 0.5;
                maskArea.graphics.drawRect(0, 0, Laya.Browser.width, Laya.Browser.height, "#000");
               // maskArea.pos(-150,0);
                maskArea.mouseEnabled=true;
                maskArea.zOrder=2000;
                Laya.stage.addChild(maskArea);
                let tween=new Laya.Tween();
                tween.to(maskArea,{
                    alpha:1
                },1000,null,Laya.Handler.create(this,()=>{
                    res.gameType="pass";
                    PaoYa.navigator.replace("GameView", res);
                     this.close();
                     tween.clear();
                     Laya.stage.removeChild(maskArea);
                })); 
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
                    message: msg,
                    confirmText:'前往',
                    confirmHandler:()=>{
                        this.close();
                       PaoYa.navigator.popToRootScene();
                       PaoYa.navigator.visibleScene.getComponent(HomeControl).goRefiner();
                    }
                })
            }
            errorDialog.popup();   
        })
          
       }
    }
    backHandler(){
        SoundManager.ins.btn();
        this.close();
        PaoYa.navigator.popToRootScene();
    }
}