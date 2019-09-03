import WeaponListControl from "./WeaponListControl";
import SoundManager from "../../../gamescripts/SoundManager";

export default class WeaponList extends PaoYa.View {
    constructor() {
        super();
    }

    onAwake() {

    }

    onEnable() {
        this.warehouseList.vScrollBarSkin = ""
        this.warehouseList.renderHandler = new Laya.Handler(this, this.wareWeaponUpdateItem);
        this.getWareBtnSkin(`light`)
        WeaponListControl.ins.showWareList(this.params.lightList)
        
        this.benBack.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            WeaponListControl.ins.navigator.pop()
        })

        this.light.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            this.getWareBtnSkin(`light`)
            WeaponListControl.ins.showWareList(this.params.lightList)
        })

        this.middle.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            this.getWareBtnSkin(`middle`)
            WeaponListControl.ins.showWareList(this.params.middleList)
        })

        this.large.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            this.getWareBtnSkin(`large`)
            WeaponListControl.ins.showWareList(this.params.heavyList)
        })
    }

    getWareBtnSkin(name) {
        let arr = [`light`, `middle`, `large`]
        arr.forEach(element => {
            this[element].skin = `remote/weaponhouse/14.png`
        });
        this[name].skin = `remote/weaponhouse/13.png`
    }

    wareWeaponUpdateItem(cell, index) {
        WeaponListControl.ins.wareWeaponUpdateItem(cell, index)
    }
}