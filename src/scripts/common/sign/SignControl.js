import Swordsman from "../figure/Swordsman";

export default class SignControl extends PaoYa.Component {
    constructor() {
        super();
        SignControl.ins = this
    }

    onAwake() {

    }

    onEnable() {

    }

    getAward() {
        PaoYa.Request.POST(`martial_login_bonus_receive`, { adv: 0 }, res => {
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
                Swordsman.ins.params.roleList = res.roleList.slice(0, 2)
                Swordsman.ins.herolist.array = Swordsman.ins.params.roleList
            })
        }
    }
}