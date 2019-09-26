import Sign from "../../common/sign/Sign";
import WheelControl from "../../common/wheel/WheelControl";
import SoundManager from "../../../gamescripts/SoundManager";
import Wheel from "../../common/wheel/Wheel";
import Tool from "../../common/tool/Tool";
import { Global } from "../../common/tool/Global";

export default class Award extends PaoYa.Dialog {

    constructor() {
        super();
    }

    onEnable() {
        this.autoDestroyAtClosed = true;
        this.tips.font = `weaponDFont`
        this.tips.scale(0.7, 0.7)
        // this.tips.pos(45, 12)

        switch (this.params.type) {
            case `sign`:
                this.sign.visible = true
                this.btnClose.visible = true

                this.sure.font = `weaponDFont`
                this.sure.scale(0.6, 0.6)
                this.sure.pos(60, 13)

                this.btnClose.on(Laya.Event.CLICK, this, () => {
                    SoundManager.ins.btn()
                    this.close()
                })
                break;
            case `wheel`:
                this.wheel.visible = true
                this.noThank.visible = true
                this.again.visible = true

                this.noThankTxt.font = `weaponDFont`
                this.noThankTxt.scale(0.6, 0.6)
                this.noThankTxt.pos(75, 15)

                this.againTxt.font = `weaponDFont`
                this.againTxt.scale(0.6, 0.6)
                this.againTxt.pos(100, 15)

                this.again.on(Laya.Event.CLICK, this, () => {
                    SoundManager.ins.btn()
                    Global.dataPoints('转盘倍数领取激励广告')
                    Tool.showVideoAD(() => {
                        PaoYa.Request.POST('martial_adv_receive', { exchangeId: this.params.detail.wheel.id }, () => {
                            Wheel.ins.changeDG()
                            this.close()
                        })
                    })
                })

                this.noThank.on(Laya.Event.CLICK, this, () => {
                    SoundManager.ins.btn()
                    this.close()
                })
                break;
        }


        for (const key in this.params.detail) {
            switch (key) {
                case `weaponId`:
                    this.again.visible = false
                    if (this.params.detail.weaponId.indexOf(`g`) != -1) {
                        this.mark.skin = `local/common/type_1.png`
                    }
                    if (this.params.detail.weaponId.indexOf(`z`) != -1) {
                        this.mark.skin = `local/common/type_2.png`
                    }
                    if (this.params.detail.weaponId.indexOf(`d`) != -1) {
                        this.mark.skin = `local/common/type_3.png`
                    }

                    let arr4 = this.params.detail.weaponId.split("-")
                    this.wpimage.skin = `remote/small_weapons/s_${arr4[0]}.png`
                    this.wp.visible = true

                    break;
                case `roleId`:
                    this.icon.visible = true
                    this.iconnum.skin = `local/common/hero_${this.params.detail.roleId}.png`
                    break;
                case `gold`:
                    SoundManager.ins.gold()
                    this.awardImage.visible = true
                    this.num.visible = true
                    this.awardImage.skin = `local/common/icon.png`
                    this.num.text = `×${this.params.detail.gold}`
                    this.num.font = `weaponNFontT`
                    this.num.scale(0.65, 0.65)
                    switch (this.params.type) {
                        case `sign`:
                            break;
                        case `wheel`:
                            PaoYa.DataCenter.user.gold += this.params.detail.gold
                            WheelControl.ins.owner.goldNum.text = PaoYa.DataCenter.user.gold
                            break;
                    }
                    // this.num.pos(28, 175)
                    break;
                case `diamond`:
                    SoundManager.ins.gold()
                    this.awardImage.visible = true
                    this.num.visible = true
                    this.awardImage.skin = `local/common/diamond.png`
                    this.num.text = `×${this.params.detail.diamond}`
                    this.num.font = `weaponNFontT`
                    this.num.scale(0.65, 0.65)
                    switch (this.params.type) {
                        case `sign`:
                            break;
                        case `wheel`:
                            PaoYa.DataCenter.user.diamond += this.params.detail.diamond
                            WheelControl.ins.owner.diamondNum.text = PaoYa.DataCenter.user.gold
                            break;
                    }
                    // this.num.pos(28, 175)
                    break;
            }
        }
    }

    onDisable() {
    }

    onClosed() {
        switch (this.params.type) {
            case `sign`:
                if (this.params.detail.isclose) {
                    return
                }
                Sign.ins.params.status++
                Sign.ins.params.login_days++
                Sign.ins.initInfo()
                break;
            case `wheel`:
                Wheel.ins.changeDG()
                break;
        }
    }
}