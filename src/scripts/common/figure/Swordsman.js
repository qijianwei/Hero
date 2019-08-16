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
    }

    initInfo() {
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
     
       
        this.heroname.text = `${this.showDetail.roleName}LV.${this.showDetail.roleLevel}/${this.showDetail.roleTopLevel}`
        this.heroname.font = `weaponNFontT`
        this.heroname.scale(0.8, 0.8)

        this.hp.text = `生命 ${this.showDetail.roleHp}`
        this.additionHp.text = `+${this.showDetail.roleUpHp}`

        this.force.text = `内力 ${this.showDetail.roleMp}`
        this.adddtionForce.text = `+${this.showDetail.roleUpMp}`

        this.muscle.text = `臂力 ${this.showDetail.roleStrength}`
        this.additionMuscle.text = `+${this.showDetail.roleUpStrength}`

        this.bone.text = `根骨 ${this.showDetail.roleBone}`
        this.additionBone.text = `+${this.showDetail.roleUpBone}`

        this.critical.text = `暴击 ${this.showDetail.roleCritProb}%`

        this.hurt.text = `爆伤 ${this.showDetail.roleCritHarm}`

        this.needGoldNum.font = `weaponNFontT`
        this.needGoldNum.text = this.showDetail.upgradeCost
        this.needGoldNum.scale(0.8, 0.8)

        if (this.showDetail.roleId == this.params.defaultRole) {
            this.equipbtn.visible = false
            this.already.visible = true
        } else {
            this.equipbtn.visible = false
            this.already.visible = true
        }
    }

    changeGold() {
        this.goldNum.text = PaoYa.DataCenter.user.user_info.member_gold
        this.goldNum.font = `weaponNFontT`
        this.goldNum.scale(0.7, 0.7)
        this.goldNum.pos(381, 20)
        this.diamondNum.text = PaoYa.DataCenter.user.user_info.member_diamond
        this.diamondNum.font = `weaponNFontT`
        this.diamondNum.scale(0.7, 0.7)
        this.diamondNum.pos(622, 20)
    }

    figureRender(cell, idx) {
        cell.offAll()
        cell.on(Laya.Event.CLICK, this, () => {
            console.log(123)
            this.showDetail = cell.dataSource
            this.initInfo()
        })
    }

    onDisable() {

    }
}