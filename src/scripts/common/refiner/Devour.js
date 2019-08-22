export default class Devour extends PaoYa.View {
    constructor() {
        super();
    }

    onAwake() {

    }

    onEnable() {
        this.benBack.on(Laya.Event.CLICK, this, () => {
            RefiningControl.ins.navigator.pop()
        })

        this.title.text=this.params.refinerName
        this.title.font = `weaponDFont`
        this.title.scale(0.8, 0.8)
        this.title.x = (411 - this.title.width) / 2

        this.detail.text = this.params.refinerDesc

        this.title.text=`LV.${this.params.refinerLevel}`
        this.title.font = `weaponDFont`
        this.title.scale(0.8, 0.8)

        this.choiceTxt.font = `weaponDFont`
        this.choiceTxt.scale(0.6, 0.6)
        this.choiceTxt.pos(40, 13)
        
        this.eatTxt.font = `weaponDFont`
        this.eatTxt.scale(0.6, 0.6)
        this.eatTxt.pos(40, 13)
    }
}