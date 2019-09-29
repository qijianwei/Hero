import RefiningControl from "./RefiningControl";
import SoundManager from "../../../gamescripts/SoundManager";
import Devour from "./Devour";
import DevourControl from "./DevourControl";
import { Global } from "../tool/Global";

export default class Refining extends PaoYa.View {
    constructor() {
        super();
        Refining.ins = this
    }

    onAwake() {
        this.isGuide = this.params.isGuide
        this.params = this.params.detail
    }

    onEnable() {
        Global.dataPoints('进入炼器页面')
        this.changeData()
        if (this.isGuide) {
            RefiningControl.ins.getMask()
            PaoYa.Request.POST(`martial_change_new_hand`, { type: `refinerNew` })
        }
        // this.benBack.on(Laya.Event.CLICK, this, () => {
        //     SoundManager.ins.btn()
        //     RefiningControl.ins.navigator.pop()
        // })

        // this.figure.on(Laya.Event.CLICK, this, () => {
        //     if (this.figureD.visible) {
        //         return
        //     }
        //     SoundManager.ins.btn()
        //     this.figure.skin = `remote/refining/4.png`
        //     this.weopon.skin = `remote/refining/5.png`

        //     this.figureD.visible = true
        //     this.weoponD.visible = false
        // })

        // this.weopon.on(Laya.Event.CLICK, this, () => {
        //     if (this.weoponD.visible) {
        //         return
        //     }
        //     SoundManager.ins.btn()
        //     this.figure.skin = `remote/refining/2.png`
        //     this.weopon.skin = `remote/refining/3.png`

        //     this.figureD.visible = false
        //     this.weoponD.visible = true
        // })
    }

    lisenClick(e) {
        switch (e.target.name) {
            case `benBack`:
                SoundManager.ins.btn()
                RefiningControl.ins.navigator.pop()
                break;
            case `figure`:
                if (this.figureD.visible) {
                    return
                }
                SoundManager.ins.btn()
                this.figure.skin = `remote/refining/4.png`
                this.weopon.skin = `remote/refining/5.png`

                this.figureD.visible = true
                this.weoponD.visible = false
                break;
            case `weopon`:
                if (this.weoponD.visible) {
                    return
                }
                SoundManager.ins.btn()
                this.figure.skin = `remote/refining/2.png`
                this.weopon.skin = `remote/refining/3.png`

                this.figureD.visible = false
                this.weoponD.visible = true
                break;
        }
    }

    changeData() {
        if (!this.isGuide) {
            this.guide1.visible = false
        }
        this.params.refiner_list.forEach((element, index) => {
            this[`${element.id}Txt`].text = element.refinerName
            this[`${element.id}Txt`].font = `weaponDFont`
            this[`${element.id}Txt`].scale(0.60, 0.60)
            this[`${element.id}Txt`].pos(35, 12)

            this[`${element.id}Lv`].text = element.refinerLevel ? `LV.${element.refinerLevel}` : `LV.1`
            this[`${element.id}Lv`].font = `weaponNFontT`
            this[`${element.id}Lv`].scale(0.5, 0.5)
            this[`${element.id}Lv`].pos(26, 93)

            this[`${element.id}`].gray = element.status ? false : true
            this[`${element.id}`].offAll()
            this[`${element.id}`].on(Laya.Event.CLICK, this, () => {
                SoundManager.ins.btn()
                this.ReIndex = index
                RefiningControl.ins.addLv(element)
            })
        });
    }

    guide1f(e) {
        let n = e == 1 ? -1 : 1
        Laya.Tween.to(this.guide1, { x: this.guide1.x + 15 * n }, 300, null, Laya.Handler.create(this, () => {
            this.guide1f(n)
        }))
    }
}