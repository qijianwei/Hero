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
                type:`sign`,
                detail:res
            }
            this.navigator.popup("common/Award", obj);
        })
    }
}