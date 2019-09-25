import { Global } from "../../common/tool/Global";
import Tool from "../../common/tool/Tool";

export default class GetAward extends PaoYa.Dialog {

    constructor() {
        super();
        GetAward.ins = this
    }

    onEnable() {
        this.autoDestroyAtClosed = true;
        this.resultParams=JSON.parse(JSON.stringify(this.params)); 

        if (this.params.encounter) {
            this.params = this.params.encounter;
        }

        this.tips.font = `adventure`
        this.closeBtnText.font = `adventure`
        this.closeBtnText.scale(0.9, 0.9)
        this.closeBtnText.pos(10, 15)

        this.getWp.font = `adventure`

        this.closeBtn.on(Laya.Event.CLICK, this, () => {
            PaoYa.Request.POST("martial_encounter_cancel", {}, res => {
                PaoYa.NotificationCenter.postNotification(`adventCancel`)
                this.close()
            })
        })

        this.closeBtn2.on(Laya.Event.CLICK, this, () => {
            this.close()
        })

        this.buyBtn.on(Laya.Event.CLICK, this, () => {
            Global.dataPoints('奇遇c激励广告')
            Tool.showVideoAD(() => {
                PaoYa.Request.POST("martial_encounter_finish", { result: 1, complete: 1 }, res => {
                    PaoYa.NotificationCenter.postNotification(`adventComplete`)
                    this.close()
                    let obj = {
                        type: `sign`,
                        detail: { gold: res.gold, isclose: 1 }
                    }
                    PaoYa.navigator.popup("common/Award", obj);
                })
            }, null, null, 1)
        })
    }

    onClosed() {
        if (PaoYa.navigator.scenes.length > 1) {
            PaoYa.navigator.popup('/dialog/PassResultDialog', this.resultParams)
        }
    }
}