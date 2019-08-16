import HeroConfig from "../../../gamescripts/config/HeroConfig";

export default class SwordsmanControl extends PaoYa.Component {
    constructor() {
        super();
        SwordsmanControl.ins = this
    }

    onAwake() {
        this.params = this.owner.params
        this.heroSkin = HeroConfig.getSkeleton(`npc_7`)
        this.owner.skbox.addChild(this.heroSkin)
        this.heroSkin.pos(100, 400)
        this.heroSkin.scale(1.5, 1.5)
        this.heroSkin.play(0, true)
    }

    onEnable() {

    }

    roleLevelUp() {
        if (Number(this.owner.needGoldNum.text) > Number(this.owner.goldNum.text)) {
            this.navigator.popup("weapon/GoldLack");
            return
        } else {
            PaoYa.DataCenter.user.gold -= Number(this.owner.needGoldNum.text)
            this.owner.goldNum.text = PaoYa.DataCenter.user.gold
        }
        PaoYa.Request.POST(`martial_update_role`, { roleId: this.owner.showDetail.roleId }, res => {
            this.owner.params.roleList.forEach(element => {
                if (element.roleId == res.role.roleId) {
                    for (const key in element) {
                        this.owner.showDetail[key] = res.role[key]
                    }
                }
            });
            this.owner.initInfo()
        })
    }

    changeRole() {
        PaoYa.Request.POST(`martial_change_role`, { roleId: this.owner.showDetail.roleId }, res => {
            this.owner.params.defaultRole = res.roleId
            this.owner.initInfo()
        })
    }
}