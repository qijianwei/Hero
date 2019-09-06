import HomeControl from "../../common/HomeControl";
import SoundManager from "../../../gamescripts/SoundManager";

export default class DiamondLack extends PaoYa.Dialog {

    constructor() {
        super();
    }

    onEnable() {
        // this.maskBg.on(Laya.Event.CLICK, this, () => {
        //     this.close()
        // })
        this.tipTxt.font = `weaponDFont`
        this.tipTxt.scale(0.7, 0.7)
        this.tipTxt.pos(45, 12)

        this.btn.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            this.close()
            HomeControl.ins.GET("martial_task_list", {}, res => {
                //console.log(res)
                if (!res) {
                    return
                }
                HomeControl.ins.navigator.popup("common/Task", res);
            })
        })
    }

    onDisable() {
    }
}