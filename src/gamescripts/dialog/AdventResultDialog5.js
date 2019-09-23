import AlertDialog from "./AlertDialog";

export default class AdventResultDialog5 extends PaoYa.Dialog {
    constructor() {
        super();
    }
    onAwake() {
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
        }
    }

    sureHandler() {
        //分情况，在游戏结果促发后展示结果界面
        this.close();
        if (PaoYa.navigator.scenes.length > 1) {
            PaoYa.navigator.popup('/dialog/PassResultDialog', this.params)
        }

    }
    videoHandler() {
        let _this = this;       
        if(!window['wx']){
            this.showGetState();
            return;
        }
        //看视频
        var params = {
            onClose: function onClose(res) {
                if (res.isEnded) {
                    console.log(`看完广告`)
                    _this.showGetState();
                    PaoYa.Request.POST(`martial_encounter_finish`, {
                        result: 1,
                        complete: 1
                    }, () => {
                        console.log(`奇遇完成`)
                    })
                } else {
                    var errorDialog = new AlertDialog({
                        title: `温馨提示`,
                        message: '看完广告才可拥有哦~'
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
}