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

        let arr = this.params.refiner.refinerEffect.split("+")
        this.pd.text = arr[0]
        this.add.x = this.pd.width + 35
        this.add.text = `+${this.params.refiner.refinerBasics.show}`

        if (this.params.nextRefiner) {
            let arrr = this.params.nextRefiner.refinerEffect.split("+")
            this.pnd.text = arrr[0]
            this.pnadd.x = this.pnd.width + 35
            this.pnadd.text = `+${this.params.nextRefiner.refinerBasics.show}`
        } else {
            this.eatBtn.disabled = true
            this.choiceBtn.disabled = true
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
    }
}