import SoundManager from "../../../gamescripts/SoundManager";

export default class SwordsmanControl extends PaoYa.Component {
    constructor() {
        super();
        SwordsmanControl.ins = this
    }

    onAwake() {

    }

    onEnable() {

    }

    roleLevelUp() {
        let numNew = 0
        if (this.owner.isGuide) {
            this.owner.guideBack = true
            this.owner.isGuide = false
            Laya.stage.removeChild(this.owner.guideContainer)
            numNew = 1
        } else {
            if (this.owner.showDetail.roleLevel >= this.owner.showDetail.roleTopLevel) {
                return
            }
            if (Number(this.owner.needGoldNum.text) > Number(this.owner.goldNum.text)) {
                this.navigator.popup("weapon/GoldLack");
                return
            } else {
                PaoYa.DataCenter.user.gold -= Number(this.owner.needGoldNum.text)
                this.owner.goldNum.text = PaoYa.DataCenter.user.gold
            }
        }
        PaoYa.Request.POST(`martial_update_role`, { roleId: this.owner.showDetail.roleId, newHand: numNew }, res => {
            SoundManager.ins.upgrade()
            this.owner.heroLvup.visible = true
            this.owner.heroLvup.play(0, false)
            this.owner.params.roleList.forEach(element => {
                if (element.roleId == res.role.roleId) {
                    for (const key in element) {
                        element[key] = res.role[key]
                    }
                    this.owner.showDetail = element
                }
            });
            this.owner.initInfo()

            if (res.unlock) {
                let detail = null
                this.owner.showDetail.skills.forEach(element => {
                    if (element.status) {
                        detail = element
                    }
                });

                this.navigator.popup("figure/GetNewSkill", detail);
            }
        })
    }

    changeRole() {
        PaoYa.Request.POST(`martial_change_role`, { roleId: this.owner.showDetail.roleId }, res => {
            this.owner.params.defaultRole = res.roleId
            this.owner.initInfo()
        })
    }

    showSkillDetail(num) {
        let detail = this.owner.showDetail.skills[num]
        if (!detail) {
            return
        }
        if (detail.status) {
            this.navigator.popup("figure/SkillDetail", detail);
        } else {
            this.navigator.popup("figure/SkillDetail", detail);
        }
    }

    openGetD() {
       this.navigator.popup("weapon/DiamondLack");
    }
}