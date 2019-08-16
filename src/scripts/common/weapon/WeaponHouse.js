import WeaponHouseControl from "./WeaponHouseControl";

export default class WeaponHouse extends PaoYa.View {
    constructor() {
        super();
    }

    onAwake() {

    }

    onEnable() {
        // this.getComponent()
        this.goldNum.text = PaoYa.DataCenter.user.gold
        this.goldNum.font = `weaponNFontT`
        this.goldNum.scale(0.7,0.7)
        this.goldNum.pos(381,20)
        this.diamondNum.text = PaoYa.DataCenter.user.diamond
        this.diamondNum.font = `weaponNFontT`
        this.diamondNum.scale(0.7,0.7)
        this.diamondNum.pos(622,20)
        
        this.light.on(Laya.Event.CLICK, this, () => {
            this.getWareBtnSkin(`light`)
            this.lightNew.visible = false
            WeaponHouseControl.ins.showWareList(WeaponHouseControl.ins.lightList)
        })

        this.middle.on(Laya.Event.CLICK, this, () => {
            this.getWareBtnSkin(`middle`)
            this.middleNew.visible = false
            WeaponHouseControl.ins.showWareList(WeaponHouseControl.ins.middleList)
        })

        this.large.on(Laya.Event.CLICK, this, () => {
            this.getWareBtnSkin(`large`)
            this.largeNew.visible = false
            WeaponHouseControl.ins.showWareList(WeaponHouseControl.ins.heavyList)
        })

        this.benBack.on(Laya.Event.CLICK, this, () => {
            WeaponHouseControl.ins.navigator.pop()
        })

        this.equip.on(Laya.Event.CLICK, this, () => {
            WeaponHouseControl.ins.chargeWeapon()
        })

        this.upGrade.on(Laya.Event.CLICK, this, () => {
            WeaponHouseControl.ins.upgradeWeapon()
        })

        this.Wp_1.font = `weaponDFont`
        this.Wp_2.font = `weaponDFont`
        this.Wp_3.font = `weaponDFont`
        this.Wp_4.font = `weaponDFont`
        this.Wp_5.font = `weaponDFont`
    }

    getWareBtnSkin(name) {
        let arr = [`light`, `middle`, `large`]
        arr.forEach(element => {
            this[element].skin = `remote/weaponhouse/14.png`
        });
        this[name].skin = `remote/weaponhouse/13.png`
    }

    onDisable() {

    }
}