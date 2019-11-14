import SoundManager from "../../../gamescripts/SoundManager";
import Tool from "../tool/Tool";
import { Global } from "../tool/Global";
import HeroConfig from "../../../gamescripts/config/HeroConfig";
import Cross from "../../../gamescripts/prefab/Cross";

export default class WheelControl extends PaoYa.Component {
    constructor() {
        super();
        WheelControl.ins = this
        this.showBannerAd({
            style: {
                width: 300,
                align: 'right'  //广告位位置：middle ,left,right
            }
        })
        this.notGetLegendWp = localStorage.getItem(`wheelTime`) ? Number(localStorage.getItem(`wheelTime`)) : 0

        this.awardArr = [{ id: 18, weight: 200 },
        { id: 19, weight: 120 },
        { id: 20, weight: 50 },
        { id: 21, weight: 30 },
        { id: 22, weight: 40 },
        { id: 23, weight: 10 },
        { id: 24, weight: 4 },
        { id: 25, weight: 4 }]
    }

    onAwake() {

    }

    onEnable() {
        let crossPromise = new Promise((resolve, reject) => {
            Laya.loader.create('gamescenes/prefab/Cross.json', Laya.Handler.create(this, (json) => {
                // console.log(json);
                if (json instanceof Laya.Prefab) {
                    resolve(json.json)
                } else {
                    resolve(json);
                }

            }))
        });
        crossPromise.then((json) => {
            this.initCrossIcon(json)
        })
    }

    initCrossIcon(json) {
        let crossInfo = PaoYa.Utils.selectRandom(HeroConfig.crossIcons, 1);

        let crossView = new Laya.Prefab();
        crossView.json = json;
        this.crossView = crossView;
        let view = Laya.Pool.getItemByCreateFun('CrossView', crossView.create, crossView);
        let crossViewComp = view.getComponent(Cross);
        crossViewComp.params = crossInfo[0];
        crossViewComp.params.ani = true;
        view.pos(1200, 220);
        view.scale(0.7,0.7)
        this.owner.addChild(view);
    }

    onThrottleClick(e) {
        if (!this.owner) {
            return
        }
        let owner = this.owner
        switch (e.target.name) {
            case `benBack`:
                SoundManager.ins.btn()
                this.navigator.pop()
                break;
            case `addbtn`:
                if (owner.isRunning) {
                    return
                }
                // if (PaoYa.DataCenter.user.diamond < 500) {
                //     SoundManager.ins.btn()
                //     this.navigator.popup("weapon/DiamondLack");
                //     return
                // }
                SoundManager.ins.btn()
                this.addTimes()
                break;
            case `startWheel`:
                if (owner.isRunning) {
                    return
                }
                this.wheelTurn()
                break;
        }
    }

    addTimes() {
        this.navigator.popup("common/BuyWheelTimes");
    }

    addTimesD(num) {
        let owner = this.owner
        if (PaoYa.DataCenter.user.diamond < Number(owner.num.text) && !num) {
            this.navigator.popup("common/BuyWheelTimes", 1);
            return
        }

        this.POST("martial_wheel_times_buy", { adv: num }, res => {
            if (!res) {
                return
            }
            owner.video.visible = false
            owner.startWheelTxt.font = `weaponDFont`
            owner.startWheelTxt.scale(0.8, 0.8)
            owner.startWheelTxt.pos(60, 10)

            PaoYa.DataCenter.user.wheelTimes = res
            owner.num.text = res
            owner.changeDG()
        })
    }

    wheelTurn() {
        let owner = this.owner
        if (owner.num.text < 1) {
            SoundManager.ins.btn()
            // this.navigator.popup("common/BuyWheelTimes");
            Global.dataPoints('增加转盘次数激励广告')
            Tool.showVideoAD(() => {
                this.addTimesD(1)
            })
            return
        }
        let obj = this.getWheelAward()
        this.whellRun(obj)
        // this.POST("martial_wheel", {}, res => {
        //     //console.log(res)
        //     if (!res) {
        //         return
        //     }
        //     SoundManager.ins.round()
        //     this.owner.num.text = res.wheelTimes
        //     if (res.wheelTimes == 0) {
        //         this.owner.video.visible = true
        //         this.owner.startWheelTxt.font = `weaponDFont`
        //         this.owner.startWheelTxt.scale(0.8, 0.8)
        //         this.owner.startWheelTxt.pos(90, 10)
        //     }
        //     PaoYa.DataCenter.user.wheelTimes = res.wheelTimes
        //     let rat = 0
        //     PaoYa.DataCenter.user.config_list.hero.wheelList.forEach((element, index) => {
        //         if (element.id == res.wheel.id) {
        //             let num = Math.random() > 0.5 ? 1 : -1
        //             rat = index * 45 + 22.5 + 2160 + (Math.random() * 20 | 0) * num
        //         }
        //     });
        //     this.owner.isRunning = true
        //     Laya.Tween.to(this.owner.pointer, { rotation: rat }, 4000, Laya.Ease.circOut, Laya.Handler.create(this, () => {
        //         let obj = {
        //             type: `wheel`,
        //             detail: res
        //         }
        //         this.navigator.popup("common/Award", obj);

        //         Laya.timer.once(600, this, () => {
        //             this.owner.pointer.rotation = 0
        //             this.owner.isRunning = false
        //         })
        //     }))
        // })
    }

    getWheelAward() {
        let arrNum = 0
        this.awardArr.forEach(element => {
            let weightNum = element.weight
            if (element.id == 24 || element.id == 25) {
                weightNum += 2 * this.notGetLegendWp
            }
            arrNum += weightNum
        });


        let randomNum = arrNum * Math.random()
        let countNum = 0
        let isFisrt = true
        let selectObj = null
        this.awardArr.forEach(element => {
            let countWeightNum = element.weight
            if (element.id == 24 || element.id == 25) {
                countWeightNum += 2 * this.notGetLegendWp
            }
            countNum += countWeightNum
            if (isFisrt && randomNum - countNum < 0) {
                selectObj = element
                isFisrt = false
                if (element.id == 24 || element.id == 25) {
                    localStorage.setItem(`wheelTime`, 0)
                } else {
                    localStorage.setItem(`wheelTime`, this.notGetLegendWp + 1)
                }
                this.notGetLegendWp = Number(localStorage.getItem(`wheelTime`))
            }
        });

        return selectObj
    }

    whellRun(res) {
        let owner = this.owner
        this.getWheelAwardHttp(res)
        let rat = 0
        PaoYa.DataCenter.user.config_list.hero.wheelList.forEach((element, index) => {
            if (element.id == res.id) {
                let num = Math.random() > 0.5 ? 1 : -1
                rat = index * 45 + 22.5 + 2160 + (Math.random() * 20 | 0) * num
                res.wheel = element
                switch (element.propId) {
                    case 8:
                        res.gold
                }
            }
        });
        owner.isRunning = true
        SoundManager.ins.round()
        Laya.Tween.to(owner.pointer, { rotation: rat }, 4000, Laya.Ease.circOut, Laya.Handler.create(this, () => {
            this.isRunFinish = true
            if (this.awardDetail) {
                this.dialogPopup(this.awardDetail)
                this.awardDetail = null
            }
        }))
    }

    getWheelAwardHttp(obj) {
        let owner = this.owner
        PaoYa.Request.POST('martial_adv_receive', { exchangeId: obj.id, adv: 0 }, res => {
            owner.num.text = res.wheelTimes
            if (res.wheelTimes == 0) {
                owner.video.visible = true
                owner.startWheelTxt.font = `weaponDFont`
                owner.startWheelTxt.scale(0.8, 0.8)
                owner.startWheelTxt.pos(90, 10)
            }
            PaoYa.DataCenter.user.wheelTimes = res.wheelTimes

            this.awardDetail = res
            res.wheel = res.wheel ? res.wheel : obj
            if (this.isRunFinish) {
                this.isRunFinish = null
                this.dialogPopup(res)
            }
        })
    }

    dialogPopup(res) {
        let owner = this.owner
        let obj = {
            type: `wheel`,
            detail: res
        }
        this.navigator.popup("common/Award", obj, Laya.Handler.create(this, () => {
            this.awardDetail = null
            this.isRunFinish = null
            owner.pointer.rotation = 0
            owner.isRunning = false
        }));
    }
}