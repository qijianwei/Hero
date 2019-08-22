export default class RefiningControl extends PaoYa.Component {
    constructor() {
        super();
        RefiningControl.ins = this
    }

    onAwake() {

    }

    onEnable() {

    }

    addLv(e) {
        if (e.status) {
            this.POST("martial_user_weapon_list", {refinerId:e.id}, data => {
                let obj = {
                    wp: data,
                    skill: e
                }
                this.navigator.push(`Devour`, obj)
            })
        } else {
            this.navigator.popup(`refiner/Canlock`, e)
        }
    }
}