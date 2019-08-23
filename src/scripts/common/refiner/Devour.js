import DevourControl from "./DevourControl";

export default class Devour extends PaoYa.View {
    constructor() {
        super();
    }

    onAwake() {

    }

    onEnable() {
        this.benBack.on(Laya.Event.CLICK, this, () => {
            DevourControl.ins.navigator.pop()
        })

        this.eatBtn.on(Laya.Event.CLICK, this, () => {
            DevourControl.ins.eatWp()
        })

        this.choiceBtn.on(Laya.Event.CLICK, this, () => {
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

    initInfo() {
        this.pLv.text = `LV.${this.params.refiner.refinerLevel}`
        this.pLv.font = `weaponDFont`
        this.pLv.scale(0.55, 0.55)
        this.pLv.pos(28, 20)

        let arr = this.params.refiner.refinerEffect.split("+")
        this.pd.text = arr[0]
        this.add.x = this.pd.width + 35
        this.add.text = `+${this.params.refiner.refinerBasics.show}`

        let arrr = this.params.nextRefiner.refinerEffect.split("+")
        this.pnd.text = arrr[0]
        this.pnadd.x = this.pnd.width + 35
        this.pnadd.text = `+${this.params.nextRefiner.refinerBasics.show}`

        this.curryExp.width = (this.params.refiner.currentExp / this.params.refiner.currentFullExp) * 224
        this.nextExp.width = (this.params.refiner.currentExp / this.params.refiner.currentFullExp) * 224
    }

    wareWeaponUpdateItem(cell, index) {
        DevourControl.ins.childList.push(cell)
        DevourControl.ins.singleWeapon(cell, index)
        cell.offAll()
        cell.on(Laya.Event.CLICK, this, () => {
            DevourControl.ins.chioceWp(cell, index)
        })
    }
}