export default class WheelControl extends PaoYa.Component {
    constructor() {
        super();
        WheelControl.ins = this
    }

    onAwake() {

    }

    onEnable() {

    }

    addTimes() {
        this.navigator.popup("common/BuyWheelTimes");
    }

    addTimesD() {
        if (PaoYa.DataCenter.user.diamond < Number(this.owner.num.text)) {
            this.navigator.popup("weapon/DiamondLack", 1);
            return
        }

        this.POST("martial_wheel_times_buy", {}, res => {
            //console.log(res)
            if (!res) {
                return
            }
            this.owner.num.text = res
        })
    }

    wheelTurn() {
        if (this.owner.num.text < 1) {
            this.navigator.popup("common/BuyWheelTimes");
            return
        }

        this.POST("martial_wheel", {}, res => {
            //console.log(res)
            if (!res) {
                return
            }
            this.owner.num.text = res.wheelTimes
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

                Laya.timer.once(500, this, () => {
                    this.owner.pointer.rotation = 0
                    this.owner.isRunning = false
                })
            }))
        })
    }
}