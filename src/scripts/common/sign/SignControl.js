import Swordsman from "../figure/Swordsman";
import HomeControl from "../HomeControl";
import SoundManager from "../../../gamescripts/SoundManager";

import Tool from "../tool/Tool";
import { Global } from "../tool/Global";

export default class SignControl extends PaoYa.Component {
    constructor() {
        super();
        SignControl.ins = this
    }

    onAwake() {

    }

    onEnable() {

    }

    onThrottleClick(e) {
        switch (e.target.name) {
            case `benBack`:
                SoundManager.ins.btn()
                this.navigator.pop()
                break;
            case `eatTxt`:
                Global.dataPoints('签到激励广告')
                Tool.showVideoAD(() => {
                    this.getAward()
                })
                break;
        }
    }

    getAward() {
        PaoYa.Request.POST(`martial_login_bonus_receive`, { adv: 0 }, res => {
            PaoYa.DataCenter.user.loginBonusStatus = false
            let obj = {
                type: `sign`,
                detail: res
            }
            this.navigator.popup("common/Award", obj);
        })
    }

    onDisable() {
        if (this.owner.params.isFromSw) {
            this.GET("martial_role_list", {}, res => {
                Swordsman.ins.params.roleList = res.roleList
                // Swordsman.ins.params.roleList.splice(2, 1)
                Swordsman.ins.herolist.array = Swordsman.ins.params.roleList
            })
        }
    }
}