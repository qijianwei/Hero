import WeaponBar from "../prefab/WeaponBar";
import GameControl from "../GameControl";
import AlertDialog from "./AlertDialog";
import { Global } from "../../scripts/common/tool/Global";

export default class AdventResultDialog extends PaoYa.Dialog {
    constructor() {
        super();
    }
    onAwake() {
        this.autoDestroyAtClosed = true;
       /*  */
        let params = this.params;
        let result = this.params.result;
        let type = this.params.type;
        if(result==-1){
            this.spIcon.texture=`remote/pass_result/lose.png`;
        }
        if(type==1){
           this.dealType1(result);
        }else if(type==2){
           this.dealType2(result);
        }
        this.showReward();
        this.on(Laya.Event.CLICK,this,this.clickHandler);
    }
    clickHandler(e){
        let name=e.target.name;
        switch(name){
            case `btnSure`:
                this.sureHandler();
                break;
            case `btnReject`:
                this.rejectHandler();
                break;
            case `btnShare`:
                this.shareHandler();
                break;
            case `btnVideo`:
                this.videoHandler();
                break;
        }
    }
    sureHandler(){
        console.log(`确认....`)
        PaoYa.Request.POST('martial_encounter_finish', {
            result:this.params.result,
            complete:1
        }, (res) => {
           PaoYa.NotificationCenter.postNotification(`adventComplate`);
           this.close();
           PaoYa.navigator.popToRootScene();
        })
        
    }
    rejectHandler(){
        console.log(`走人撒`);
        PaoYa.Request.POST('martial_encounter_finish', {
            result:this.params.result,
            complete:1
        }, (res) => {
           this.close();
           PaoYa.navigator.popToRootScene();
           PaoYa.NotificationCenter.postNotification(`adventComplate`);
        })
        
    }
    shareHandler(){
        console.log(`分享复活`);
        let _this=this;
        let random=Math.round(Math.random()*(PaoYa.DataCenter.config.game.share_list.length-1))
        let title = PaoYa.DataCenter.config.game.share_list[random];
        PaoYa.ShareManager.imageURL=PaoYa.DataCenter.CDNURL + PaoYa.DataCenter.config.game.share_img[random];
        if(window['wx']){
            PaoYa.ShareManager.shareTitle(title, {}, () => {
               Global.dataPoints('奇遇a1失败复活')
                _this.close();
               GameControl.instance.revive(); //复活
            })  
        }else{
            _this.close();
            GameControl.instance.revive(); //复活
        }  
    }
    videoHandler(){
        console.log(`看广告复活`);
        Global.dataPoints('奇遇a激励广告')
        let _this=this;
        var params = {
            onClose: function onClose(res) {
                if (res.isEnded) {
                    console.log(`看完广告`)
                    _this.close();
                    GameControl.instance.revive(); //复活
                } else {
                    var errorDialog = new AlertDialog({
                        title: `温馨提示`,
                        message: '看完广告才可复活哦~'
                    });
                    errorDialog.popup();
                }
            },
            onError: function onError(res) {
                var errorDialog = new AlertDialog({
                    title: "温馨提示",
                    message: res.message
                });
                errorDialog.popup();
            }
        };
        PaoYa.RewardedVideoAd.show(params,true);
    }
    dealType1(result){
       if(result==1){
           this.boxWin.visible=true;
           this.img.skin=`remote/adventure/winText1.png`;
           this.btnSure.getChildByName(`lbl`).font=`adventure`;
           this.btnSure.getChildByName(`lbl`).text=`举手之劳，不足挂齿`;
       }else{
           this.boxWeapons.visible=false;
           this.boxLose1.visible=true;
           this.img.skin=`remote/adventure/loseText1.png`;
           this.btnShare.getChildByName(`lbl`).font=`adventure`;
           this.boxLose1.getChildByName(`btnReject`).getChildByName(`lbl`).font=`adventure`;     
       }
    }
    dealType2(result){
        if(result==1){
            this.boxWin.visible=true;
            this.img.skin=`remote/adventure/winText2.png`;
            this.btnSure.getChildByName(`lbl`).font=`adventure`;
            this.btnSure.getChildByName(`lbl`).text=`欣然收下赏金`;
        }else{
            this.boxLose2.visible=true;
            this.img.skin=`remote/adventure/loseText2.png`;
            this.btnVideo.getChildByName(`lbl`).font=`adventure`;
            this.btnReject.getChildByName(`lbl`).font=`adventure`;
            this.btnReject.getChildByName(`lbl`).scale(0.86,0.86);
        }
    }
    showReward() {
        let weaponList = this.params.weaponList;
        let len = weaponList.length;
        if (len) {
            let weaponBarsArr = this.boxWeapons._children;
            for (let i = 0; i < len; i++) {
                weaponBarsArr[i].visible = true;
                let weaponBarsComp = weaponBarsArr[i].getComponent(WeaponBar);
                weaponBarsComp.params = weaponList[i];
                weaponBarsComp.initView();
                weaponBarsArr[i].off(Laya.Event.CLICK, weaponBarsComp)
            }
        }
    }
    
}