import WeaponStoreControl from "./WeaponStoreControl";
import SoundManager from "../../../gamescripts/SoundManager";

export default class WeaponStore extends PaoYa.View {

    constructor() {
        super();
        WeaponStore.ins = this
    }

    onAppear() {
        this.goldNum.text = PaoYa.DataCenter.user.gold
        this.goldNum.font = `weaponNFontT`
        this.goldNum.scale(0.7, 0.7)
        this.goldNum.pos(381, 20)
        this.diamondNum.text = PaoYa.DataCenter.user.diamond
        this.diamondNum.font = `weaponNFontT`
        this.diamondNum.scale(0.7, 0.7)
        this.diamondNum.pos(622, 20)
    }
    onAppear(){
        this.goldNum.text = PaoYa.DataCenter.user.gold
        this.goldNum.font = `weaponNFontT`
        this.goldNum.scale(0.7, 0.7)
        this.goldNum.pos(381, 20)
        this.diamondNum.text = PaoYa.DataCenter.user.diamond
        this.diamondNum.font = `weaponNFontT`
        this.diamondNum.scale(0.7, 0.7)
        this.diamondNum.pos(622, 20) 
    }

    onEnable() {

        this.sellText.font = `weaponDFont`
        this.buyText.font = `weaponDFont`
        this.needDiamon.text = 20
        this.needDiamon.font = `weaponNFontT`
        this.needDiamon.scale(0.5, 0.5)
        this.refreshTxt.font = `weaponDFont`
        this.refreshTxt.scale(0.7, 0.7)
        this.buyBtnTxt.font = `weaponDFont`
        this.buyBtnTxt.scale(0.7, 0.7)
        this.sellBtnTxt.font = `weaponDFont`
        this.sellBtnTxt.scale(0.7, 0.7)

        this.refreshTimeNum.font = `weaponDFont`
        this.refreshTimeNum.scale(0.4, 0.4)

        this.benBack.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            WeaponStoreControl.ins.navigator.pop()
        })

        this.sellBtn.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            WeaponStoreControl.ins.sellWp()
        })

        this.refreshBtn.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            if (WeaponStore.ins.isRefrshing) {
                true
            }
            let isHigh = false, highDeatil
            WeaponStoreControl.ins.buyList.forEach(element => {
                if (element.weaponStar == 3) {
                    isHigh = true
                    highDeatil = element
                }
            });
            if (isHigh) {
                let obj = {
                    detail: highDeatil,
                    type: `buy`
                }
                WeaponStoreControl.ins.navigator.popup("weapon/StoreSure", obj);
            } else {
                WeaponStoreControl.ins.refresF()
            }
        })

        this.sell.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            WeaponStoreControl.ins.wpdType = `sell`
            this.sell.skin = `remote/weaponstore/3.png`
            this.buy.skin = `remote/weaponstore/2.png`
            this.sellPage.visible = true
            this.buyPage.visible = false
            this.getWareBtnSkin(`light`)
            this.lightNew.visible = false
            WeaponStoreControl.ins.sellPresentIdx = 0
            WeaponStoreControl.ins.showWareList(WeaponStoreControl.ins.lightList)
        })

        this.buy.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            WeaponStoreControl.ins.wpdType = `buy`
            this.sell.skin = `remote/weaponstore/2.png`
            this.buy.skin = `remote/weaponstore/3.png`
            this.sellPage.visible = false
            this.buyPage.visible = true
            WeaponStoreControl.ins.buyPresentIdx = 0
            if (WeaponStoreControl.ins.buyList.length > 0) {
                this.weapon.visible = true
                this.sellBtn.visible = true
                this.buyBtn.visible = true
            } else {
                this.weapon.visible = false
                this.buyBtn.visible = false
                this.sellBtn.visible = false
            }
            this.buyList.array = WeaponStoreControl.ins.buyList
        })

        this.light.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            this.getWareBtnSkin(`light`)
            this.lightNew.visible = false
            WeaponStoreControl.ins.showWareList(WeaponStoreControl.ins.lightList)
        })

        this.middle.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            this.getWareBtnSkin(`middle`)
            this.middleNew.visible = false
            WeaponStoreControl.ins.showWareList(WeaponStoreControl.ins.middleList)
        })

        this.large.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            this.getWareBtnSkin(`large`)
            this.largeNew.visible = false
            WeaponStoreControl.ins.showWareList(WeaponStoreControl.ins.heavyList)
        })

        this.buyBtn.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            let detail = WeaponStoreControl.ins.currentBuyWeapDetail
            if (!detail) {
                return
            }
            if (Number(detail.weaponPrice) > Number(this.goldNum.text)) {
                WeaponStoreControl.ins.navigator.popup("weapon/GoldLack");
                return
            } else {
                PaoYa.DataCenter.user.gold -= Number(detail.weaponPrice)
                this.goldNum.text = PaoYa.DataCenter.user.gold
                WeaponStoreControl.ins.buyWp()
            }
        })
    }

    getWareBtnSkin(name) {
        WeaponStoreControl.ins.sellPresentIdx = 0
        let arr = [`light`, `middle`, `large`]
        arr.forEach(element => {
            this[element].skin = `remote/weaponhouse/14.png`
        });
        this[name].skin = `remote/weaponhouse/13.png`
    }

    onDisable() {
    }
}