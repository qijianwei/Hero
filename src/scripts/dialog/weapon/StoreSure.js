import WeaponStoreControl from "../../common/weapon/WeaponStoreControl";
import DevourControl from "../../common/refiner/DevourControl";
import SoundManager from "../../../gamescripts/SoundManager";

export default class StoreSure extends PaoYa.Dialog {

    constructor() {
        super();
        // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
    }

    onEnable() {
        // this.mask.on(Laya.Event.CLICK, this, this.close)
        this.btn1.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            this.close()
        })

        this.btn4.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            this.close()
        })

        this.btn2.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            this.close()
            WeaponStoreControl.ins.refresF()
        })

        this.btn3.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            this.close()
            WeaponStoreControl.ins.sellWp(1)
        })

        this.btn5.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            this.close()
            DevourControl.ins.eatWp(1)
        })

        this.closeBtn.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            this.close()
        })

        if (this.params.type == `buy`) {
            this.title.skin = `remote/weaponstore/6.png`
            this.title.x = (543 - this.title.width) / 2
            this.btn1.visible = true
            this.btn2.visible = true
            this.btn3.visible = false
            this.btn4.visible = false
        } else {
            this.title.skin = `remote/weaponstore/7.png`
            this.title.x = (543 - this.title.width) / 2
            this.btn1.visible = false
            this.btn2.visible = false
            if (this.params.type == `refining`) {
                this.btn3.visible = false
                this.btn5.visible = true
            } else {
                this.btn3.visible = true
                this.btn5.visible = false
            }

            this.btn4.visible = true
        }

        this.btn1Txt.font = `weaponDFont`
        this.btn1Txt.scale(0.45, 0.45)
        this.btn4Txt.font = `weaponDFont`
        this.btn4Txt.scale(0.45, 0.45)
        this.btn2Txt.font = `weaponDFont`
        this.btn2Txt.scale(0.45, 0.45)
        this.btn3Txt.font = `weaponDFont`
        this.btn3Txt.scale(0.45, 0.45)
        this.btn5Txt.font = `weaponDFont`
        this.btn5Txt.scale(0.45, 0.45)
   

        let showMarkUrl = null
        switch (this.params.detail.weaponType) {
            case 3:
                showMarkUrl = `local/common/type_1.png`
                break
            case 2:
                showMarkUrl = `local/common/type_2.png`
                break
            case 1:
                showMarkUrl = `local/common/type_3.png`
                break
        }
        this.showWeapon.skin = `remote/small_weapons/s_${this.params.detail.weaponId}.png`
        this.showMark.skin = showMarkUrl
        this.currtWeaponLevel.text = `LV.${this.params.detail.weaponLevel}`
        this.currtWeaponLevel.font = `weaponNFontT`
        this.currtWeaponLevel.scale(0.6, 0.6)
    }

    onDisable() {
    }
}