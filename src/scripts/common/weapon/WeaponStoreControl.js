export default class WeaponStoreControl extends PaoYa.Component {

    constructor() {
        super();
        WeaponStoreControl.ins = this
    }

    onAwake() {
        this.params = this.owner.params
        this.sellList = this.owner.params.weaponList
        this.owner.buyList.renderHandler = new Laya.Handler(this, this.buyWpUpdateItem);
        this.owner.buyList.array = this.sellList
        this.buyPresentIdx = 0
        this.downTimeStartF()
    }

    onEnable() {
    }

    onDisable() {
    }

    buyWpUpdateItem(cell, idx) {
        this.singleWeapon(cell, idx)
        cell.offAll()
        cell.on(Laya.Event.CLICK, this, () => {
            this.isWareChoiceWp.skin = `local/common/frameBg.png`
            this.isWareChoiceWp.getChildByName(`beChioce`).visible = false

            cell.skin = `local/common/currutFrameBg.png`
            cell.getChildByName(`beChioce`).visible = true
            this.currentMyUserWeapDetail = cell._dataSource
            this.isWareChoiceWp = cell
            this.renderCenterData()
        })
    }

    //单个兵器图签
    singleWeapon(cell, idx, isUser) {
        cell.skin = `local/common/frameBg.png`
        cell.getChildByName(`beChioce`).visible = false
        if (idx == this.buyPresentIdx) {
            cell.skin = `local/common/currutFrameBg.png`
            cell.getChildByName(`beChioce`).visible = true
            //当前详情
            this.currentMyUserWeapDetail = cell._dataSource
            //当前列表
            this.isWareChoiceWp = cell
            this.renderCenterData()
        }

        cell.getChildByName(`wp`).skin = `remote/small_weapons/s_${cell._dataSource.weaponId}.png`
        cell.getChildByName(`lv`).text = `LV.${cell._dataSource.weaponLevel}`
        cell.getChildByName(`lv`).font = `weaponNFontT`
        cell.getChildByName(`lv`).scale(0.7, 0.7)

        cell.getChildByName(`bg`).getChildByName(`txt`).text = `${cell._dataSource.weaponPrice}`
        cell.getChildByName(`bg`).getChildByName(`txt`).font = `weaponNFontT`
        cell.getChildByName(`bg`).getChildByName(`txt`).scale(0.75, 0.75)


        let skinq = ``
        let skint = ``
        switch (cell._dataSource.weaponStar) {
            case 1:
                skinq = `local/common/quality_1.png`
                break
            case 2:
                skinq = `local/common/quality_2.png`
                break
            case 3:
                skinq = `local/common/quality_3.png`
                break
        }
        switch (cell._dataSource.weaponType) {
            case 3:
                skint = `local/common/type_1.png`
                break
            case 2:
                skint = `local/common/type_2.png`
                break
            case 1:
                skint = `local/common/type_3.png`
                break
        }
        cell.getChildByName(`bgwrap`).skin = skinq
        cell.getChildByName(`mark`).skin = skint
    }
    //渲染详情部分
    renderCenterData() {
        this.owner[`skillImg_1`].visible = false
        this.owner[`skillImg_2`].visible = false
        let detail = this.currentMyUserWeapDetail
        this.owner.showWeapon.skin = `remote/small_weapons/s_${detail.weaponId}.png`
        // this.owner.currtWeaponLevel.text = `LV.${detail.weaponLevel}`
        // this.owner.currtWeaponLevel.font = `weaponNFontT`
        // this.owner.currtWeaponLevel.scale(0.7, 0.7)
        //选择重置
        let arr = [`light`, `middle`, `large`]
        arr.forEach(element => {
            this.owner[element].skin = `remote/weaponhouse/14.png`
        });
        //兵器展示
        let skinq = ``
        let skint = ``
        switch (detail.weaponStar) {
            case 1:
                skinq = `local/common/quality_1.png`
                break
            case 2:
                skinq = `local/common/quality_2.png`
                break
            case 3:
                skinq = `local/common/quality_3.png`
                break
        }
        switch (detail.weaponType) {
            case 3:
                skint = `local/common/type_1.png`
                this.owner.large.skin = `remote/weaponhouse/13.png`
                break
            case 2:
                skint = `local/common/type_2.png`
                this.owner.middle.skin = `remote/weaponhouse/13.png`
                break
            case 1:
                skint = `local/common/type_3.png`
                this.owner.light.skin = `remote/weaponhouse/13.png`
                break
        }
        this.owner.showWrap.skin = skinq
        this.owner.showMark.skin = skint
        //兵器属性
        this.owner.currutWeapon.text = detail.weaponName
        this.owner.currutWeapon.font = `weaponDFont`
        this.owner.currutWeapon.scale(0.8, 0.8)

        this.owner.CDTime.text = `LV.${detail.weaponLevel}/${detail.weaponTopLevel}`
        this.owner.CDTime.font = `weaponNFontT`
        this.owner.CDTime.scale(0.7, 0.7)

        this.owner.attackNum.text = `攻击： ${detail.weaponAttack}`
        this.owner.addattackNum.text = `+${detail.weaponUpAttack}`
        this.owner.enduranceNum.text = `耐久： ${detail.weaponDurable}`
        this.owner.addenduranceNum.text = `+${detail.weaponUpDurable}`
        this.owner.consumeNum.text = `消耗： ${detail.weaponConsume}`
        this.owner.addconsumeNum.text = `+${detail.weaponDownConsume}`
        this.owner.wpcdNum.text = `冷却： ${detail.weaponCd}秒`

        if (!detail.weaponUpAttack && !detail.weaponDownConsume && !detail.weaponUpDurable) {
            this.owner.addattackNum.visible = false
            this.owner.addenduranceNum.visible = false
            this.owner.addconsumeNum.visible = false
        }
        //兵器技能
        this.owner[`skillName_1`].text = ``
        this.owner[`skillGl_1`].text = ``
        this.owner[`skillDetail_1`].text = ``
        this.owner[`skillImg_1`].visible = false
        this.owner[`skillName_2`].text = ``
        this.owner[`skillGl_2`].text = ``
        this.owner[`skillDetail_2`].text = ``
        this.owner[`skillImg_2`].visible = false
        if (detail.skills.length > 0) {
            detail.skills.forEach((element, index) => {
                this.owner[`skillName_${index + 1}`].color = `#4a4948`
                this.owner[`skillGl_${index + 1}`].color = `#4a4948`
                this.owner[`skillDetail_${index + 1}`].color = `#4a4948`
                this.owner[`skillName_${index + 1}`].text = element.skillName
                this.owner[`skillGl_${index + 1}`].text = `几率${element.skillProb}`
                this.owner[`skillDetail_${index + 1}`].text = element.skillDesc
                this.owner[`skillImg_${index + 1}`].visible = true
                if (element.status) {
                    this.owner[`skillName_${index + 1}`].color = `#004418`
                    this.owner[`skillGl_${index + 1}`].color = `#004418`
                    this.owner[`skillDetail_${index + 1}`].color = `#004418`
                }
            });
        }
    }

    downTimeStartF() {
        let nowtime = new Date().getTime()
        let Stime = (this.params.refreshTime - nowtime / 1000) | 0
        this.getPowerTimeDown(Stime)
    }

    getPowerTimeDown(Stime) {
        let Ntime = Stime % 3600 | 0
        let h = Stime / 3600 | 0
        let m = Ntime / 60 | 0
        let s = Ntime % 60 | 0

        let hhh = h > 9 ? h : `0${h}`
        let mmm = m > 9 ? m : `0${m}`
        let sss = s > 9 ? s : `0${s}`
        this.owner.refreshTimeNum.text = `${hhh}:${mmm}:${sss}`
        let NewT = Stime - 1
        if (NewT < 1) {
            this.isReadyRefrensh = true
            return
        }
        Laya.timer.once(1000, this, () => {
            this.getPowerTimeDown(NewT)
        })
    }
}