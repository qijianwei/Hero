import RefiningControl from "./RefiningControl";

export default class Refining extends PaoYa.View {
    constructor() {
        super();
    }

    onAwake() {

    }

    onEnable() {
        this.benBack.on(Laya.Event.CLICK, this, () => {
            RefiningControl.ins.navigator.pop()
        })

        this.figure.on(Laya.Event.CLICK, this, () => {
            if (this.figureD.visible) {
                return
            }
            this.figure.skin = `remote/refining/4.png`
            this.weopon.skin = `remote/refining/5.png`

            this.figureD.visible = true
            this.weoponD.visible = false
        })

        this.weopon.on(Laya.Event.CLICK, this, () => {
            if (this.weoponD.visible) {
                return
            }
            this.figure.skin = `remote/refining/2.png`
            this.weopon.skin = `remote/refining/3.png`

            this.figureD.visible = false
            this.weoponD.visible = true
        })

        this.params.refiner_list.forEach(element => {
            this[`${element.id}Txt`].text = element.refinerName
            this[`${element.id}Txt`].font=`weaponDFont`
            this[`${element.id}Txt`].scale(0.60,0.60)
            this[`${element.id}Txt`].pos(35,12)

            this[`${element.id}Lv`].text = `LV.${element.refinerLevel}`
            this[`${element.id}Lv`].font=`weaponNFontT`
            this[`${element.id}Lv`].scale(0.5,0.5)
            this[`${element.id}Lv`].pos(26,93)

            this[`${element.id}`].gray = element.status ? false : true

            this[`${element.id}`].on(Laya.Event.CLICK,this,()=>{
                RefiningControl.ins.addLv(element)
            })
        });
    }
}