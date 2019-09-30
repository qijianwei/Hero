import AlertDialog from "./AlertDialog";
import { Global } from "../../scripts/common/tool/Global";
import Tool from "../../scripts/common/tool/Tool";

export default class AdventResultDialog5 extends PaoYa.Dialog {
    constructor() {
        super();
    }
    onAwake() {
        //Laya.Scene.unDestroyedScenes 可以查看未销毁场景
        this.autoDestroyAtClosed = true;
        let state = this.params.state;
        let time = this.params.time;
        if (state == `wait`) {
            this.boxWait.visible = true;
            this.lbl1.font = `adventure`;
            this.lbl2.font = `adventure`;
            this.lbl3.font = `adventure`;
            this.startCount(time);
        } else if (state == `get`) {
            this.boxGet.visible = true;
            this.showGetState()
            this.lbl3.font = `adventure`;
        }

        this.on(Laya.Event.CLICK, this, this.clickHandler);
    }
    clickHandler(e) {
        switch (e.target.name) {
            case `btnSure`:
                this.sureHandler();
                break;
            case `btnVideo`:
                this.videoHandler();
                break;
            case `btnGet`:

                this.getHandler();
                break;
        }
    }

    sureHandler() {
        //分情况，在游戏结果促发后展示结果界面
        this.timerService&&this.timerService.stop();
        this.close();
        if (PaoYa.navigator.scenes.length > 1) {
            PaoYa.navigator.popup('/dialog/PassResultDialog', this.params)
        }
    }
    getHandler(){
        this.timerService&&this.timerService.stop()
        PaoYa.Request.POST(`martial_encounter_finish`, {
            result: 1,
            complete: 1
        }, () => {   
            PaoYa.Request.POST(`martial_encounter_finish`, {
                result: 1,
                complete: 1
            }, () => {
                PaoYa.NotificationCenter.postNotification(`adventComplete`)
                this.close();
                if (PaoYa.navigator.scenes.length > 1) {
                    PaoYa.navigator.popup('/dialog/PassResultDialog', this.params)
                }
            })
            
            console.log(`奇遇5完成`)
        })
    }
    videoHandler() {
        let _this = this;       
        if(!window['wx']){
            this.showGetState();
            return;
        }
        Global.dataPoints('奇遇d激励广告')
        //看视频
        var params = {
            onClose: function onClose(res) {
                if (res.isEnded) {
                    console.log(`看完广告`)
                    _this.showGetState();
                } else {
                    var errorDialog = new AlertDialog({
                        title: `温馨提示`,
                        message: '看完广告才可拥有哦~'
                    });
                    errorDialog.popup();
                }
            },
            onError: function onError(res) {
            /*     var errorDialog = new AlertDialog({
                    title: "温馨提示",
                    message: res.message
                });
                errorDialog.popup(); */
                Tool.noADshare(()=>{
                    console.log(`没广告,分享成功`)
                    _this.showGetState();
                })
            }
        };
        PaoYa.RewardedVideoAd.show(params,true);
    }
    startCount(time) {
        let timeStamp = (time * 1000 - (new Date()).valueOf()) / 1000;
        console.log(timeStamp)
        let timerService = new PaoYa.TimerService(timeStamp, 1, false);
        timerService.on(PaoYa.TimerService.PROGRESS, this, (time) => {

            this.lblTime.text = time.formatTime('M:S') + ""
        })
        timerService.on(PaoYa.TimerService.STOP, this, () => {

        })
        timerService.start();
        this.timerService = timerService;
    }
    showGetState() {
        let _this = this;
        this.boxWait.visible = false;
        this.boxGet.visible = true;
        let rewardPromise = new Promise((resolve, reject) => {
            Laya.loader.create('gamescenes/prefab/RewardBig.json', Laya.Handler.create(this, (json) => {
                resolve(json);
            }))
        })
        rewardPromise.then(json => {
            _this.initReward(json);
        })
    }
    initReward(json) {
        if (this.params.diamond) {
            let diamondView = this.createRewardBox(json);
            diamondView.getChildByName('lblNum').scale(0.6, 0.6);
            diamondView.getChildByName(`lblNum`).text = `× ${this.params.diamond}`;
            diamondView.getChildByName(`lblNum`).font = `weaponNFontT`;
            diamondView.getChildByName(`spBg`).scale(1,1);
            this.hboxReward.addChild(diamondView);
        }
        if (this.params.gold) {
            let goldView = this.createRewardBox(json);
            goldView.getChildByName('lblNum').scale(0.6, 0.6);
            goldView.getChildByName('lblNum').text = `× ${this.params.gold}`;
            goldView.getChildByName('lblNum').font = `weaponNFontT`;
            goldView.getChildByName(`spBg`).scale(1,1);
            goldView.getChildByName(`spReward`).texture = `local/common/icon.png`;
            this.hboxReward.addChild(goldView);
        }
    }
    createRewardBox(json) {
        let rewardView = new Laya.Prefab();
        rewardView.json = json;
        let view = Laya.Pool.getItemByCreateFun(`RewardViewBig`, rewardView.create, rewardView);
        return view;
    }
    onDestroy(){
        this.timerService&&this.timerService.stop();
        this.timerService=null;
    }
}