import WeaponStoreControl from "./WeaponStoreControl";

export default class WeaponStore extends PaoYa.View {

    constructor() {
        super();
        WeaponStore.ins = this
    }

    onEnable() {
        this.goldNum.text = PaoYa.DataCenter.user.user_info.member_gold
        this.goldNum.font = `weaponNFontT`
        this.diamondNum.text = PaoYa.DataCenter.user.user_info.member_diamond
        this.diamondNum.font = `weaponNFontT`

        this.sellText.font = `weaponDFont`
        this.buyText.font = `weaponDFont`
        this.needDiamon.text = 999
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
            WeaponStoreControl.ins.navigator.pop()
        })

        this.refreshBtn.on(Laya.Event.CLICK, this, () => { 

        })

        this.buyBtn.on(Laya.Event.CLICK, this, () => { 

        })
    }

    onDisable() {
    }
}