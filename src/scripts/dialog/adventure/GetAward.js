import { Global } from "../../common/tool/Global";
import HomeControl from "../../common/HomeControl";
import Tool from "../../common/tool/Tool";

export default class GetAward extends PaoYa.Dialog {

    constructor() {
        super();
        GetAward.ins = this
    }

    onEnable() {
        this.tips.font = `adventure`
        this.closeBtnText.font = `adventure`
        this.closeBtnText.scale(0.9, 0.9)
        this.closeBtnText.pos(10, 15)

        this.getWp.font = `adventure`

        this.closeBtn.on(Laya.Event.CLICK, this, () => {
            PaoYa.Request.POST("martial_encounter_cancel", {}, res => {
                this.close()
            })
        })

        this.closeBtn2.on(Laya.Event.CLICK, this, () => {
            this.close()
        })

        this.buyBtn.on(Laya.Event.CLICK, this, () => {
            Tool.showVideoAD(() => {
                PaoYa.Request.POST("martial_encounter_finish", { result: 1, complete: 1 }, res => {
                    this.close()
                    let obj = {
                        type: `sign`,
                        detail: { gold: res.gold, isclose: 1 }
                    }
                    HomeControl.ins.navigator.popup("common/Award", obj);
                })
            }, null, null, 1)
        })
    }
}