import SoundManager from "../../../gamescripts/SoundManager";
import Tool from "../tool/Tool";
import { Global } from "../tool/Global";

export default class WheelControl extends PaoYa.Component {
    constructor() {
        super();
        WheelControl.ins = this
    }

    onAwake() {

    }

    onEnable() {

    }

    onThrottleClick(e) {
        this.owner.lisenClick(e)
    }

    addTimes() {
        this.navigator.popup("common/BuyWheelTimes");
    }

    addTimesD(num) {
        if (PaoYa.DataCenter.user.diamond < Number(this.owner.num.text) && !num) {
            this.navigator.popup("common/BuyWheelTimes", 1);
            return
        }

        this.POST("martial_wheel_times_buy", { adv: num }, res => {
            if (!res) {
                return
            }
            PaoYa.DataCenter.user.wheelTimes = res
            this.owner.num.text = res
            this.owner.changeDG()
        })
    }

    wheelTurn() {
        if (this.owner.num.text < 1) {
            SoundManager.ins.btn()
            // this.navigator.popup("common/BuyWheelTimes");
            Global.dataPoints('增加转盘次数激励广告')
            Tool.showVideoAD(() => {
                this.addTimesD(1)
                this.owner.video.visible = false
                this.owner.startWheelTxt.font = `weaponDFont`
                this.owner.startWheelTxt.scale(0.8, 0.8)
                this.owner.startWheelTxt.pos(60, 10)
            })
            return
        }

        this.POST("martial_wheel", {}, res => {
            //console.log(res)
            if (!res) {
                return
            }
            SoundManager.ins.round()
            this.owner.num.text = res.wheelTimes
            if (res.wheelTimes == 0) {
                this.owner.video.visible = true
                this.owner.startWheelTxt.font = `weaponDFont`
                this.owner.startWheelTxt.scale(0.8, 0.8)
                this.owner.startWheelTxt.pos(90, 10)
            }
            PaoYa.DataCenter.user.wheelTimes = res.wheelTimes
            let rat = 0
            PaoYa.DataCenter.user.config_list.hero.wheelList.forEach((element, index) => {
                if (element.id == res.wheel.id) {
                    let num = Math.random() > 0.5 ? 1 : -1
                    rat = index * 45 + 22.5 + 2160 + (Math.random() * 20 | 0) * num
                }
            });
            this.owner.isRunning = true
            Laya.Tween.to(this.owner.pointer, { rotation: rat }, 4000, Laya.Ease.circOut, Laya.Handler.create(this, () => {
                let obj = {
                    type: `wheel`,
                    detail: res
                }
                this.navigator.popup("common/Award", obj);

                Laya.timer.once(600, this, () => {
                    this.owner.pointer.rotation = 0
                    this.owner.isRunning = false
                })
            }))
        })
    }
}