import SoundManager from "../../../gamescripts/SoundManager";

export default class WeaponListControl extends PaoYa.Component {
    constructor() {
        super();
        WeaponListControl.ins = this
    }

    onAwake() {
        this.currentMyUserIdx = 0
        this.currentMyUserWeapDetail = null
    }

    onEnable() {

    }

    showWareList(list) {
        let showList = JSON.parse(JSON.stringify(list))
        let arr = []
        showList.forEach(element => {
            if (element.weaponStar < 4) {
                arr.push(element)
            }
        });
        this.owner.warehouseList.array = arr
    }

    //仓库武器渲染
    wareWeaponUpdateItem(cell, idx) {
        // console.log(cell, idx)
        cell.offAll()
        cell.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            if (this.isWareChoiceWp) {
                this.isWareChoiceWp.getChildByName(`beChioce`).visible = false
                this.isWareChoiceWp.skin = `local/common/frameBg.png`
                this.isWareChoiceWp = cell
            }
            cell.getChildByName(`beChioce`).visible = true
            // console.log(cell.getChildByName(`beChioce`),123)
            cell.skin = `local/common/currutFrameBg.png`
            this.currentMyUserWeapDetail = cell._dataSource
            this.renderCenterData()
        })
        this.singleWeapon(cell, idx)
    }

    //单个兵器图签
    singleWeapon(cell, idx) {
        cell.skin = `local/common/frameBg.png`
        cell.getChildByName(`beChioce`).visible = false
        //选定渲染

        if (idx == this.currentMyUserIdx) {
            this.currentMyUserWeapDetail = cell._dataSource
            this.isWareChoiceWp = cell
            cell.skin = `local/common/currutFrameBg.png`
            cell.getChildByName(`beChioce`).visible = true
            this.renderCenterData()
        }

        cell.getChildByName(`wp`).skin = `remote/small_weapons/s_${cell._dataSource.weaponId}.png`

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
        let wareList = []
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

        this.owner.wpinfo.text = detail.weaponIcon
        //兵器属性
        this.owner.currutWeapon.text = detail.weaponName
        this.owner.currutWeapon.font = `weaponDFont`
        this.owner.currutWeapon.scale(0.8, 0.8)

        this.owner.CDTime.text = `LV.${detail.weaponLevel}/${detail.weaponTopLevel}`
        this.owner.CDTime.font = `weaponNFontT`
        this.owner.CDTime.scale(0.7, 0.7)

        this.owner.attackNum.text = `攻击： ${detail.weaponAttack}`
        this.owner.addattackNum.visible = detail.weaponUpAttack ? true : false
        this.owner.addattackNum.text = `+${detail.weaponUpAttack}`
        this.owner.enduranceNum.text = `耐久： ${detail.weaponDurable}`
        this.owner.addenduranceNum.visible = detail.weaponUpDurable ? true : false
        this.owner.addenduranceNum.text = `+${detail.weaponUpDurable}`
        this.owner.consumeNum.text = `消耗： ${detail.weaponConsume}`
        this.owner.addconsumeNum.visible = detail.weaponDownConsume ? true : false
        this.owner.addconsumeNum.text = `-${detail.weaponDownConsume}`
        this.owner.wpcdNum.text = `冷却： ${detail.weaponCd}秒`
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
                this.owner[`skillGl_${index + 1}`].text = `几率${element.skillProb}%`
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

}