import GameControl from "../GameControl";
import AlertDialog from "./AlertDialog";
export default class PassResultDialogLoseOne extends PaoYa.Dialog {
    constructor(){
        super();
    }
    onAwake(){
        this.showBannerAd({
            style: {
                align: 'middle',
                width: 300
            }
        });
        this.btnAvenge.on(Laya.Event.CLICK,this,this.avenge);
        this.btnGiveUp.on(Laya.Event.CLICK,this,this.giveUp);
    }
    avenge(){
        let _this=this;
        var params = {
            onClose: function onClose(res) {
                if (res.isEnded) {
                   _this.close();
                   GameControl.instance.revive()

                } else {
                    var errorDialog = new AlertDialog({
                        title: `温馨提示`,
                        message: '看完广告才可复活哦~'
                    });
                    errorDialog.popup();
                }
            },
            onError: function onError(res) {
                /*  var errorDialog = new AlertDialog({
                     title: "温馨提示",
                     message: `广告拉取失败`
                 });
                 errorDialog.popup(); */
                console.warn(`------拉取广告失败------`)
            }
        };
        PaoYa.RewardedVideoAd.show(params);
    }
    giveUp(){
        this.close();
        PaoYa.navigator.popup('/dialog/PassResultDialogLose2', this.params);
    }
}