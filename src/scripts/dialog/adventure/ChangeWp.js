import { Global } from "../../common/tool/Global";
import HomeControl from "../../common/HomeControl";
import Tool from "../../common/tool/Tool";

export default class ChangeWp extends PaoYa.Dialog {

    constructor() {
        super();
        ChangeWp.ins = this
    }

    onEnable() {

        this.tips.font = `adventure`
        let name = "八卦斧"
        this.label2.text = `年轻人，请问你有没有一把${name}。如果你能把它让给我的话，谢某定当重谢`

        this.buyBtnText.font = `adventure`
        this.buyBtnText.pos(40, 10)

        this.closeBtnText.font = `adventure`
        this.closeBtnText.pos(60, 10)

        this.getWp.font = `adventure`

        this.infoDetail()

        this.closeBtn.on(Laya.Event.CLICK, this, () => {
            PaoYa.Request.POST("martial_encounter_cancel", {}, res => {
                this.close()
            })
        })

        this.closeBtn2.on(Laya.Event.CLICK, this, () => {
            this.close()
        })

        this.buyBtn.on(Laya.Event.CLICK, this, () => {
            if (this.params.weaponId) {
                this.sellyWp()
            } else {
                Tool.showVideoAD(() => {
                this.params.weaponId = `video`
                },null,null,1)
                this.infoDetail()
            }
        })
    }

    infoDetail() {
        let hhnum = this.params.weaponId ? 1 : 0
        if (!hhnum) {
            this.buyBtnText.visible = false
            this.tips2.visible = true
            this.getWp.visible = true
            this.get.visible = true
        } else {
            this.buyBtnText.visible = true
            this.tips2.visible = false
            this.getWp.visible = false
            this.get.visible = false
        }
        this.num.font = `weaponNFontT`
        this.wpnum.text = `${hhnum}/1`
        this.wpnum.font = `weaponNFontT`
        this.num.scale(0.7, 0.7)
        this.wpnum.scale(0.7, 0.7)
    }

    sellyWp() {
        // PaoYa.Request.POST("martial_encounter_finish", { result: 1, complete: 1, weaponId: this.params.weaponId }, res => { 
            this.close()
        // })
    }
}