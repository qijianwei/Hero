import SwordsmanControl from "./SwordsmanControl";

export default class Swordsman extends PaoYa.View {
    constructor() {
        super();
    }

    onAwake() {

    }

    onEnable() {
        this.params.roleList.forEach(element => {
            if (element.roleId == this.params.defaultRole) {
                this.showDetail = element
            }
        });

        this.benBack.on(Laya.Event.CLICK, this, () => {
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
            SwordsmanControl.ins.changeRole()
        })

        this.buyBtn.on(Laya.Event.CLICK, this, () => {
            // SwordsmanControl.ins.navigator.popup("figure/BuyHero",this.showDetail);
        })

        this.signGet.on(Laya.Event.CLICK, this, () => {
            // SwordsmanControl.ins.navigator.popup("figure/BuyHero",this.showDetail);
        })
    }

    initInfo() {
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

        this.heroname.text = `${this.showDetail.roleName}LV.${this.showDetail.roleLevel}/${this.showDetail.roleTopLevel}`
        this.heroname.font = `weaponNFontT`
        this.heroname.scale(0.8, 0.8)

        this.hp.text = `生命 ${this.showDetail.roleHp-this.showDetail.roleUpHp}`
        this.additionHp.text = `+${this.showDetail.roleUpHp}`

        this.force.text = `内力 ${this.showDetail.roleMp-this.showDetail.roleUpMp}`
        this.adddtionForce.text = `+${this.showDetail.roleUpMp}`

        this.muscle.text = `臂力 ${this.showDetail.roleStrength-this.showDetail.roleUpStrength}`
        this.additionMuscle.text = `+${this.showDetail.roleUpStrength}`

        this.bone.text = `根骨 ${this.showDetail.roleBone-this.showDetail.roleUpBone}`
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
            } else {
                this.already.visible = false
            }
        } else {
            if(this.showDetail.rolePrice){
                this.buyBtn.visible = true
                this.needDiamon.text = this.showDetail.rolePrice
                this.needDiamon.font = `weaponDFont`
                this.needDiamon.scale(0.8, 0.8)
                this.needDiamon.y = 10
            }else{
                this.signGet.visible = true
            }

        }
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

    figureRender(cell, idx) {
        cell.offAll()
        cell.on(Laya.Event.CLICK, this, () => {
            this.showDetail = cell.dataSource
            this.initInfo()
        })
    }

    onDisable() {

    }
}