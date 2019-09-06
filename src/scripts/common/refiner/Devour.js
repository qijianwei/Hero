import DevourControl from "./DevourControl";
import SoundManager from "../../../gamescripts/SoundManager";
import Refining from "./Refining";
import { Global } from "../tool/Global";

export default class Devour extends PaoYa.View {
    constructor() {
        super();
        Devour.ins = this
    }

    onAwake() {

    }

    onEnable() {
        if (this.params.isGuide) {
            Laya.stage.addChild(this.guide2)
            this.guide2.x = this.guide2.x + Global.AdaptiveWidth
            this.guide2.visible = true
            this.guide2f(1)
            Refining.ins.sceondStep()
        }
        this.benBack.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            DevourControl.ins.navigator.pop()
        })

        this.eatBtn.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            DevourControl.ins.eatWp()
        })

        this.choiceBtn.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            DevourControl.ins.chiocethreeWp()
        })

        this.warehouseList.vScrollBarSkin = ""
        this.warehouseList.renderHandler = new Laya.Handler(this, this.wareWeaponUpdateItem);

        this.goldNum.text = PaoYa.DataCenter.user.gold
        this.goldNum.font = `weaponNFontT`
        this.goldNum.scale(0.7, 0.7)
        this.goldNum.pos(381, 20)
        this.diamondNum.text = PaoYa.DataCenter.user.diamond
        this.diamondNum.font = `weaponNFontT`
        this.diamondNum.scale(0.7, 0.7)
        this.diamondNum.pos(622, 20)

        this.title.text = this.params.refiner.refinerName
        this.title.font = `weaponDFont`
        this.title.scale(0.8, 0.8)
        this.title.x = (411 - this.title.width) / 2

        this.detail.text = this.params.refiner.refinerDesc

        this.next.font = `weaponDFont`
        this.next.scale(0.6, 0.6)

        this.choiceTxt.font = `weaponDFont`
        this.choiceTxt.scale(0.6, 0.6)
        this.choiceTxt.pos(40, 13)

        this.eatTxt.font = `weaponDFont`
        this.eatTxt.scale(0.6, 0.6)
        this.eatTxt.pos(40, 13)

        DevourControl.ins.getWareList()
        this.initInfo()
    }

    onAppear() {
        if (!Refining.ins.isGuide) {
            this.guide2.visible = false
            this.guide3.visible = false
        }
    }

    initInfo() {
        this.pLv.text = `LV.${this.params.refiner.refinerLevel}`
        this.pLv.font = `weaponDFont`
        this.pLv.scale(0.55, 0.55)
        this.pLv.pos(28, 20)

        // this.pd.fontSize = 20
        // this.add.fontSize = 20
        // this.pd2.fontSize = 20
        // this.pnd.fontSize = 20
        // this.pnd2.fontSize = 20
        // this.pnadd.fontSize = 20

        let nowaddtext = null
        let arr = []
        if (this.params.refiner.refinerEffect.indexOf("+") != -1) {
            if (this.params.refiner.refinerEffect.indexOf("%") != -1) {
                arr = this.params.refiner.refinerEffect.split("+d%")
                nowaddtext = `+${this.params.refiner.refinerBasics.show | 0}%`
            } else {
                arr = this.params.refiner.refinerEffect.split("+d")
                nowaddtext = `+${this.params.refiner.refinerBasics.show | 0}`
            }
        } else {
            if (this.params.refiner.refinerEffect.indexOf("%") != -1) {
                arr = this.params.refiner.refinerEffect.split("d%")
                nowaddtext = `${this.params.refiner.refinerBasics.show | 0}%`
            } else {
                arr = this.params.refiner.refinerEffect.split("d")
                nowaddtext = `${this.params.refiner.refinerBasics.show | 0}`
            }
        }
        this.pd.text = arr[0]
        this.pd.x = 28
        this.add.x = this.pd.width + this.pd.x
        this.add.text = nowaddtext
        this.pd2.text = arr[1]
        this.pd2.x = this.add.width + this.add.x

        if (this.params.nextRefiner) {
            let nowaddtext2 = null
            let arrr = []
            if (this.params.nextRefiner.refinerEffect.indexOf("+") != -1) {
                if (this.params.nextRefiner.refinerEffect.indexOf("%") != -1) {
                    arrr = this.params.nextRefiner.refinerEffect.split("+d%")
                    nowaddtext2 = `+${this.params.nextRefiner.refinerBasics.show | 0}%`
                } else {
                    arrr = this.params.nextRefiner.refinerEffect.split("+d")
                    nowaddtext2 = `+${this.params.nextRefiner.refinerBasics.show | 0}`
                }
            } else {
                if (this.params.nextRefiner.refinerEffect.indexOf("%") != -1) {
                    arrr = this.params.nextRefiner.refinerEffect.split("d%")
                    nowaddtext2 = `${this.params.nextRefiner.refinerBasics.show | 0}%`
                } else {
                    arrr = this.params.nextRefiner.refinerEffect.split("d")
                    nowaddtext2 = `${this.params.nextRefiner.refinerBasics.show | 0}`
                }
            }
            this.pnd.text = arrr[0]
            this.pnd.x = 28
            this.pnadd.x = this.pnd.width + this.pnd.x
            this.pnadd.text = nowaddtext2
            this.pnd2.text = arr[1]
            this.pnd2.x = this.pnadd.width + this.pnadd.x
        } else {
            this.eatBtn.disabled = true
            this.choiceBtn.disabled = true
            this.pnd.text=``
            this.pnadd.text=``
            this.pnd2.text=``
        }

        this.curryExp.width = (this.params.refiner.currentExp / this.params.refiner.currentFullExp) * 224
        this.nextExp.width = (this.params.refiner.currentExp / this.params.refiner.currentFullExp) * 224
    }

    wareWeaponUpdateItem(cell, index) {
        DevourControl.ins.childList.push(cell)
        DevourControl.ins.singleWeapon(cell, index)
        cell.offAll()
        cell.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            DevourControl.ins.chioceWp(cell, index)
        })
    }

    guide2f(e) {
        let n = e == 1 ? -1 : 1
        Laya.Tween.to(this.guide2, { x: this.guide2.x + 15 * n }, 300, null, Laya.Handler.create(this, () => {
            this.guide2f(n)
        }))
    }

    guide3f(e) {
        let n = e == 1 ? -1 : 1
        Laya.Tween.to(this.guide3, { x: this.guide3.x + 15 * n }, 300, null, Laya.Handler.create(this, () => {
            this.guide3f(n)
        }))
    }

    nextP() {
        this.guide2.visible = false
        this.guide3.visible = true
        Laya.stage.addChild(this.guide3)
        this.guide3.x = this.guide3.x + Global.AdaptiveWidth
        this.guide3f(1)
    }

    onDisable() {
        Laya.stage.removeChild(Devour.ins.guide2);
        Laya.stage.removeChild(Devour.ins.guide3);

        PaoYa.Request.GET("martial_refiner_list", {}, res => {
            //console.log(res)
            if (!res) {
                return
            }
            Refining.ins.params.refiner_list = res.refiner_list
            Refining.ins.changeData()
        })
    }
}