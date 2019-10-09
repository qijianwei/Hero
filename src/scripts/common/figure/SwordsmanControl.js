import SoundManager from "../../../gamescripts/SoundManager";
import { Global } from "../tool/Global";

export default class SwordsmanControl extends PaoYa.Component {
    constructor() {
        super();
        SwordsmanControl.ins = this
    }

    onAwake() {

    }

    onEnable() {

    }

    onThrottleClick(e) {
        if(!this.owner){
            return
        }
        switch (e.target.name) {
            case `benBack`:
                if (this.owner.isGuide) {
                    Global.dataPoints('用户点击人物升级')
                }
                if (this.owner.isGuide && !this.owner.guideBack) {
                    return
                }
                SoundManager.ins.btn()
                this.postNotification(`roleIdChanged`, this.owner.params.defaultRole);
                this.navigator.pop()
                break;
            case `lvupbtn`:
                this.roleLevelUp()
                break;
            case `equipbtn`:
                SoundManager.ins.btn()
                this.changeRole()
                break;
            case `buyBtn`:
                SoundManager.ins.btn()
                this.navigator.popup("figure/BuyHero", this.owner.showDetail);
                break;
            case `signGet`:
                SoundManager.ins.btn()
                PaoYa.Request.GET("martial_login_bonus_list", {}, res => {
                    //console.log(res)
                    res.isFromSw = true
                    if (!res) {
                        return
                    }
                    this.navigator.push("Sign", res);
                })
                break;
            case `skill1`:
                if (this.owner.isGuide) {
                    return
                }
                SoundManager.ins.btn()
                this.showSkillDetail(0)
                break;
            case `skill2`:
                if (this.owner.isGuide) {
                    return
                }
                SoundManager.ins.btn()
                this.showSkillDetail(1)
                break;
            case `skill3`:
                if (this.owner.isGuide) {
                    return
                }
                SoundManager.ins.btn()
                this.showSkillDetail(2)
                break;
        }
    }

    roleLevelUp() {
        let numNew = 0
        if (this.owner.isGuide) {
            this.owner.guideBack = true
            this.owner.isGuide = false
            this.owner.removeChild(this.owner.guideContainer)
            numNew = 1
        } else {
            if (this.owner.showDetail.roleLevel >= this.owner.showDetail.roleTopLevel) {
                return
            }
            if (Number(this.owner.needGoldNum.text) > Number(this.owner.goldNum.text)) {
                this.navigator.popup("weapon/GoldLack");
                return
            } else {
                this.owner.changeGold()
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