import SwordsmanControl from "./SwordsmanControl";
import HeroConfig from "../../../gamescripts/config/HeroConfig";
import SoundManager from "../../../gamescripts/SoundManager";
import { Global } from "../tool/Global";

export default class Swordsman extends PaoYa.View {
    constructor() {
        super();
    }

    onAwake() {

    }

    onEnable() {
        this.isGuide = this.params.isGuide
        this.guideBack = false
        this.params = this.params.detail
        if (this.isGuide) {
            this.guide1.visible = true
            PaoYa.Request.POST(`martial_change_new_hand`, { type: `roleNew` })
            this.guideContainer = new Laya.Sprite();
            Laya.stage.addChild(this.guideContainer);
            Laya.stage.addChild(this.guide1)
            this.guide1.x = this.guide1.x + Global.AdaptiveWidth
            this.guideContainer.cacheAs = "bitmap";

            let spmask = new Laya.Sprite()
            spmask.alpha = 0.5
            this.guideContainer.addChild(spmask)
            spmask.graphics.drawRect(-150 + Global.AdaptiveWidth, 0, 1634, 750, "#000");

            this.sp = new Laya.Sprite();
            this.guideContainer.addChild(this.sp);
            // 设置叠加模式
            this.sp.blendMode = "destination-out";
            this.graR(this.guide1.x + 143, this.guide1.y, 90)

            this.guide1f(1)
        }
        this.params.roleList.forEach(element => {
            if (element.roleId == this.params.defaultRole) {
                this.showDetail = element
            }
        });

        this.benBack.on(Laya.Event.CLICK, this, () => {
            if (this.isGuide && !this.guideBack) {
                return
            }
            SoundManager.ins.btn()
            SwordsmanControl.ins.postNotification(`roleIdChanged`, this.params.defaultRole);
            SwordsmanControl.ins.navigator.pop()
        })

        this.herolist.renderHandler = new Laya.Handler(this, this.figureRender);
        this.herolist.array = this.params.roleList

        this.lvupbtnTxt.font = `weaponDFont`
        this.lvupbtnTxt.scale(0.8, 0.8)
        this.lvupbtnTxt.pos(60, 10)
        this.equipbtnTxt.font = `weaponDFont`
        this.equipbtnTxt.scale(0.8, 0.8)
        this.equipbtnTxt.pos(60, 10)
        this.signGetTxt.font = `weaponDFont`
        this.signGetTxt.scale(0.8, 0.8)
        this.signGetTxt.pos(60, 10)
        this.alreadyTxt.font = `weaponDFont`
        this.alreadyTxt.scale(0.8, 0.8)
        this.alreadyTxt.pos(35, 10)

        this.initInfo()
        this.changeGold()

        this.lvupbtn.on(Laya.Event.CLICK, this, () => {
            SwordsmanControl.ins.roleLevelUp()
        })

        this.equipbtn.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            SwordsmanControl.ins.changeRole()
        })

        this.buyBtn.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            SwordsmanControl.ins.navigator.popup("figure/BuyHero", this.showDetail);
        })

        this.signGet.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            PaoYa.Request.GET("martial_login_bonus_list", {}, res => {
                //console.log(res)
                if (!res) {
                    return
                }
                this.navigator.push("Sign", res);
            })
        })

        this.skill1.on(Laya.Event.CLICK, this, () => {
            if (this.isGuide) {
                return
            }
            SoundManager.ins.btn()
            SwordsmanControl.ins.showSkillDetail(0)
        })

        this.skill2.on(Laya.Event.CLICK, this, () => {
            if (this.isGuide) {
                return
            }
            SoundManager.ins.btn()
            SwordsmanControl.ins.showSkillDetail(1)
        })

        this.skill3.on(Laya.Event.CLICK, this, () => {
            if (this.isGuide) {
                return
            }
            SoundManager.ins.btn()
            SwordsmanControl.ins.showSkillDetail(2)
        })
    }
    //初始化展示信息
    initInfo() {
        this.skbox.y = 370
        this.skbox.x = 370
        if (this.heroSkin) {
            this.heroSkin.stop()
            this.heroSkin.destroy()
            this.heroSkin = null
        }

        this.heroSkin = HeroConfig.getSkeleton(this.showDetail.roleDress)
        this.skbox.addChild(this.heroSkin)
        this.heroSkin.pos(100, 400)
        this.heroSkin.scale(1.5, 1.5)
        this.heroSkin.play(`stand`, true)

        if (this.showDetail.roleId == this.params.defaultRole) {
            this.isUse.visible = true
        } else {
            this.isUse.visible = false
        }
        this.speciality.font = `weaponDFont`
        this.speciality.text = this.showDetail.roleDesc
        switch (this.speciality.text.length) {
            case 2:
                this.speciality.y = 60
                this.speciality.scale(1, 1)
                this.speciality.x = 20
                break
            case 3:
                this.speciality.y = 50
                this.speciality.scale(0.8, 0.8)
                this.speciality.x = 25
                break
            case 4:
                this.speciality.y = 35
                this.speciality.scale(0.7, 0.7)
                this.speciality.x = 30
                break
        }

        for (let i = 0; i < 5; i++) {
            this[`lv${i + 1}`].visible = false
            if (i < this.showDetail.roleStar) {
                this[`lv${i + 1}`].visible = true
            }
        }

        this.showDetail.skills.forEach((element, index) => {
            this[`skill${index + 1}`].skin = `local/common/${element.skillId}.png`
            if (element.status) {
                this[`skill${index + 1}`].gray = false
                this[`skill${index + 1}Txt`].visible = false
            } else {
                this[`skill${index + 1}`].gray = true
                this[`skill${index + 1}Txt`].visible = true
                this[`skill${index + 1}Txt`].text = `LV.${element.skillUnlock}解锁`
                this[`skill${index + 1}Txt`].font = `weaponNFontT`
                this[`skill${index + 1}Txt`].scale(0.4, 0.4)
                this[`skill${index + 1}Txt`].pos(15, 40)
            }
        });

        this.heroname.text = `${this.showDetail.roleName}LV.${this.showDetail.roleLevel}/${this.showDetail.roleTopLevel}`
        this.heroname.font = `weaponNFontT`
        this.heroname.scale(0.8, 0.8)

        this.hp.text = `生命 ${this.showDetail.roleHp - this.showDetail.roleUpHp}`
        this.additionHp.text = `+${this.showDetail.roleUpHp}`

        this.force.text = `内力 ${this.showDetail.roleMp - this.showDetail.roleUpMp}`
        this.adddtionForce.text = `+${this.showDetail.roleUpMp}`

        this.muscle.text = `臂力 ${this.showDetail.roleStrength - this.showDetail.roleUpStrength}`
        this.additionMuscle.text = `+${this.showDetail.roleUpStrength}`

        this.bone.text = `根骨 ${this.showDetail.roleBone - this.showDetail.roleUpBone}`
        this.additionBone.text = `+${this.showDetail.roleUpBone}`

        this.critical.text = `暴击 ${this.showDetail.roleCritProb}%`

        this.hurt.text = `爆伤 ${this.showDetail.roleCritHarm}`

        this.needGoldNum.font = `weaponNFontT`
        this.needGoldNum.text = this.showDetail.upgradeCost
        this.needGoldNum.scale(0.8, 0.8)

        this.equipbtn.visible = false
        this.already.visible = false
        this.lvupbtn.visible = false
        this.buyBtn.visible = false
        this.signGet.visible = false

        if (this.showDetail.roleStatus) {
            this.lvupbtn.visible = true
            if (this.showDetail.roleId == this.params.defaultRole) {
                this.already.visible = true
                this.equipbtn.visible = false
            } else {
                this.already.visible = false
                this.equipbtn.visible = true
            }
        } else {
            if (this.showDetail.rolePrice) {
                this.buyBtn.visible = true
                this.needDiamon.text = this.showDetail.rolePrice
                this.needDiamon.font = `weaponDFont`
                this.needDiamon.scale(0.8, 0.8)
                this.needDiamon.y = 10
            } else {
                this.signGet.visible = true
            }

        }

        this.lvupbtn.disabled = this.showDetail.roleLevel >= this.showDetail.roleTopLevel ? true : false
    }

    changeGold() {
        this.goldNum.text = PaoYa.DataCenter.user.gold
        this.goldNum.font = `weaponNFontT`
        this.goldNum.scale(0.7, 0.7)
        this.goldNum.pos(381, 20)
        this.diamondNum.text = PaoYa.DataCenter.user.diamond
        this.diamondNum.font = `weaponNFontT`
        this.diamondNum.scale(0.7, 0.7)
        this.diamondNum.pos(622, 20)
    }
    //人物列表渲染
    figureRender(cell, idx) {
        console.log(cell.dataSource)
        cell.getChildByName(`icon`).skin = `local/common/${cell.dataSource.roleDress}.png`
        cell.getChildByName(`bgwarp`).visible = this.showDetail.roleId == cell.dataSource.roleId ? true : false
        if (this.showDetail.roleId == cell.dataSource.roleId) {
            this.prole = cell
        }
        cell.offAll()
        cell.on(Laya.Event.CLICK, this, () => {
            if (this.isGuide) {
                return
            }
            SoundManager.ins.btn()
            this.prole.getChildByName(`bgwarp`).visible = false
            this.prole = cell
            this.showDetail = cell.dataSource
            this.initInfo()
            cell.getChildByName(`bgwarp`).visible = true
        })
    }

    onDisable() {
        Laya.stage.removeChild(this.guideContainer)
    }

    guide1f(e) {
        if (this.guideBack) {
            this.guide1.visible = false
            return
        }
        let n = e == 1 ? -1 : 1
        Laya.Tween.to(this.guide1, { x: this.guide1.x + 15 * n }, 300, null, Laya.Handler.create(this, () => {
            this.guide1f(n)
        }))
    }

    guide2f(e) {
        let n = e == 1 ? -1 : 1
        Laya.Tween.to(this.guide2, { y: this.guide2.y + 15 * n }, 300, null, Laya.Handler.create(this, () => {
            this.guide2f(n)
        }))
    }

    graR(x, y, r) {
        this.sp.graphics.clear();
        this.sp.graphics.drawCircle(x, y, r, "#000000");
    }
}