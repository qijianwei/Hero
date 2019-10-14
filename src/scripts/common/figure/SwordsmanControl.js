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
        if (!this.owner) {
            return
        }
        let owner = this.owner
        switch (e.target.name) {
            case `benBack`:
                if (owner.isGuide && !owner.guideBack) {
                    return
                }
                SoundManager.ins.btn()
                this.postNotification(`roleIdChanged`, owner.params.defaultRole);
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
                this.navigator.popup("figure/BuyHero", owner.showDetail);
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
                if (owner.isGuide) {
                    return
                }
                SoundManager.ins.btn()
                this.showSkillDetail(0)
                break;
            case `skill2`:
                if (owner.isGuide) {
                    return
                }
                SoundManager.ins.btn()
                this.showSkillDetail(1)
                break;
            case `skill3`:
                if (owner.isGuide) {
                    return
                }
                SoundManager.ins.btn()
                this.showSkillDetail(2)
                break;
        }
    }

    roleLevelUp() {
        let owner = this.owner
        let numNew = 0
        if (owner.isGuide) {
            owner.guideBack = true
            owner.isGuide = false
            owner.removeChild(owner.guideContainer)
            Global.dataPoints('用户点击人物升级')
            numNew = 1
        } else {
            if (owner.showDetail.roleLevel >= owner.showDetail.roleTopLevel) {
                return
            }
            if (Number(owner.needGoldNum.text) > PaoYa.DataCenter.user.gold) {
                this.navigator.popup("weapon/GoldLack");
                return
            } else {
                let obj = {
                    gold: PaoYa.DataCenter.user.gold - Number(owner.needGoldNum.text),
                    diamond: PaoYa.DataCenter.user.diamond
                }
                owner.changeHB(obj)
            }
        }
        PaoYa.Request.POST(`martial_update_role`, { roleId: owner.showDetail.roleId, newHand: numNew }, res => {
            SoundManager.ins.upgrade()
            owner.heroLvup.visible = true
            owner.heroLvup.play(0, false)
            owner.params.roleList.forEach(element => {
                if (element.roleId == res.role.roleId) {
                    for (const key in element) {
                        element[key] = res.role[key]
                    }
                    owner.showDetail = element
                }
            });
            owner.initInfo()

            if (res.unlock) {
                let detail = null
                owner.showDetail.skills.forEach(element => {
                    if (element.status) {
                        detail = element
                    }
                });

                this.navigator.popup("figure/GetNewSkill", detail);
            }
        })
    }

    changeRole() {
        let owner = this.owner
        PaoYa.Request.POST(`martial_change_role`, { roleId: owner.showDetail.roleId }, res => {
            owner.params.defaultRole = res.roleId
            owner.initInfo()
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