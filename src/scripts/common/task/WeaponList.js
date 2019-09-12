import WeaponListControl from "./WeaponListControl";
import SoundManager from "../../../gamescripts/SoundManager";

export default class WeaponList extends PaoYa.View {
    constructor() {
        super();
    }

    onAwake() {

    }

    onEnable() {
        PaoYa.Request.GET('update_chips', {}, res => {
            this.goldNum.width = null

            PaoYa.DataCenter.user.gold = res.gold
            PaoYa.DataCenter.user.diamond = res.diamond
            let goldnum = addNumberUnit(PaoYa.DataCenter.user.gold)
            let diamondnum = addNumberUnit(PaoYa.DataCenter.user.diamond)

            this.goldNum.text = goldnum
            this.goldNum.font = `weaponNFontT`
            this.goldNum.scale(0.6, 0.6)
            this.goldNum.pos(365 + (149 - this.goldNum.width * 0.6) / 2, 25)
            this.diamondNum.text = diamondnum
            this.diamondNum.font = `weaponNFontT`
            this.diamondNum.scale(0.6, 0.6)
            this.diamondNum.pos(600 + (149 - this.diamondNum.width * 0.6) / 2, 25)

            function addNumberUnit(num) {
                switch (true) {
                    case num >= 10000 && num < 100000000:
                        let integ = num / 10000
                        return Math.floor(integ * 100) / 100 + '万'
                        break
                    case num >= 100000000:
                        let integ1 = num / 100000000
                        return Math.floor(integ1 * 100) / 100 + '亿'
                        break
                    default:
                        return num + ''
                        break
                }
            };
        })

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