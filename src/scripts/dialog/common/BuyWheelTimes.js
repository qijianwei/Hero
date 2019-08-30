import WheelControl from "../../common/wheel/WheelControl";
import SoundManager from "../../../gamescripts/SoundManager";


export default class BuyWheelTimes extends PaoYa.Dialog {

    constructor() {
        super();
    }

    onEnable() {
        this.buybtnTxt.font = `weaponDFont`
        this.buybtnTxt.scale(0.8, 0.8)
        this.buybtnTxt.pos(55, 10)

        this.title.font = `figureDetail`
        this.title.scale(0.75, 0.75)
        this.title.x = (544 - this.title.width * 0.75) / 2

        this.buy.on(Laya.Event.CLICK,this,()=>{
            SoundManager.ins.btn()
            WheelControl.ins.addTimesD()
            this.close()
        })

        this.closeBtn.on(Laya.Event.CLICK,this,()=>{
            SoundManager.ins.btn()
            this.close()
        })
    }
}