import { Global } from "../../common/tool/Global";
import HomeControl from "../../common/HomeControl";

export default class BuyWp extends PaoYa.Dialog {

    constructor() {
        super();
        BuyWp.ins = this
    }

    onEnable() {
        this.heroImage.skin = `remote/guide/hero_${PaoYa.DataCenter.user.defaultRoleId}.png`

        this.tips.font = `adventure`

        this.buyBtnText.font = `adventure`
        this.buyBtnText.pos(10, 10)

        this.closeBtnText.font = `adventure`
        this.closeBtnText.pos(25, 10)
        this.closeBtn.on(Laya.Event.CLICK, this, () => {
            PaoYa.Request.POST("martial_encounter_cancel", {}, res => {
                this.close()
            })
        })

        this.closeBtn2.on(Laya.Event.CLICK, this, () => {
            this.close()
        })

        this.buyBtn.on(Laya.Event.CLICK, this, () => {
            this.buyWp()
        })

        this.warehouseList.vScrollBarSkin = ""
        this.warehouseList.renderHandler = new Laya.Handler(this, this.wareWeaponUpdateItem);
        this.showlist = this.params.weaponList
        this.cellList = []
        this.warehouseList.array = this.showlist

        // Laya.stage.on(Laya.Event.MOUSE_UP, this, () => {
        //     this.changeStatus()
        // })
    }

    wareWeaponUpdateItem(cell, idx) {
        this.cellList.push(cell)
        cell.getChildByName(`beChioce`).visible = false
        if (cell._dataSource.isChioced) {
            cell.getChildByName(`beChioce`).visible = true
        }
        cell.getChildByName(`bg`).getChildByName(`txt`).text = `${cell._dataSource.weaponPrice}`
        cell.getChildByName(`bg`).getChildByName(`txt`).font = `weaponNFontT`
        cell.getChildByName(`bg`).getChildByName(`txt`).scale(0.75, 0.75)
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

        cell.offAll()

        cell.on(Laya.Event.MOUSE_DOWN, this, () => {
            this.count = 0
            this.pressIdx = idx
            Laya.timer.loop(100, this, this.addTime)
        })

        cell.on(Laya.Event.MOUSE_UP, this, () => {
            if (this.count <= 5) {
                if (this.showlist[idx].isChioced) {
                    this.showlist[idx].isChioced = false
                } else {
                    this.showlist[idx].isChioced = true
                }
                this.cellList = []
                this.warehouseList.array = this.showlist
            }
            this.changeStatus()
        })
    }

    addTime() {
        if (this.count > 5) {
            Laya.timer.clear(this, this.addTime)
            this.renderDetail()
        } else {
            this.count++
        }
    }

    changeStatus() {
        if (this.wpInfo.visible) {
            this.wpInfo.visible = false
        }
        this.pressIdx = -1
        Laya.timer.clear(this, this.addTime)
    }

    buyWp() {
        let moveArr = [], wpString = ``, num = 0
        this.showlist.forEach((element, index) => {
            if (element.isChioced) {
                wpString = `${wpString},${element.weaponId}`
                num += Number(element.weaponPrice)
                let obj = {
                    idx: index,
                    detail: this.cellList[index]
                }
                moveArr.push(obj)
            }
        });

        if (moveArr.length == 0) {
            return
        }

        if (num > PaoYa.DataCenter.user.diamond) {
            this.close()
            HomeControl.ins.navigator.popup("weapon/DiamondLack", 1);
            return
        }

        PaoYa.Request.POST("martial_encounter_finish", { result: 1, complete: 1, weaponId: wpString }, res => {
            this.ware.visible = true

            moveArr.forEach((element) => {
                this[`showani${element.idx}`].x = 749.5 + 128 * element.idx
                this[`showani${element.idx}`].y = 391
                this[`showani${element.idx}`].visible = true
                this[`bgwrap${element.idx}`].skin = element.detail.getChildByName(`bgwrap`).skin
                this[`mark${element.idx}`].skin = element.detail.getChildByName(`mark`).skin
                this[`wp${element.idx}`].skin = element.detail.getChildByName(`wp`).skin

                Laya.Tween.to(this[`showani${element.idx}`], { x: 296, y: 652, scaleX: 0, scaleY: 0 }, 800, Laya.Ease.quintIn, Laya.Handler.create(this, () => {
                    this[`showani${element.idx}`].visible = false
                    Laya.Tween.to(this.ware, { alpha: 0 }, 400, Laya.Ease.quintIn, Laya.Handler.create(this, () => {
                        this.ware.visible = false
                        this.ware.alpha = 1
                        this.close()
                    }));
                }));
            });
        })
    }

    renderDetail() {
        this.wpInfo.visible = true

        this.wpInfo.x = 698 + 120 * this.pressIdx

        let detail = this.showlist[this.pressIdx]

        this.currutWeapon.text = detail.weaponName
        this.currutWeapon.font = `weaponDFont`
        this.currutWeapon.scale(0.5, 0.5)

        this.currtWeaponLevel.text = `LV.${detail.weaponLevel}/${detail.weaponTopLevel}`
        this.currtWeaponLevel.font = `weaponNFontT`
        this.currtWeaponLevel.scale(0.6, 0.6)

        this.attackNum.text = `攻击： ${detail.weaponAttack}`
        this.enduranceNum.text = `耐久： ${detail.weaponDurable}`
        this.consumeNum.text = `消耗： ${detail.weaponConsume}`
        this.wpcdNum.text = `冷却： ${detail.weaponCd}秒`

        //兵器技能
        this[`skillName_1`].text = ``
        this[`skillGl_1`].text = ``
        this[`skillDetail_1`].text = ``
        this[`skillImg_1`].visible = false
        this[`skillName_2`].text = ``
        this[`skillGl_2`].text = ``
        this[`skillDetail_2`].text = ``
        this[`skillImg_2`].visible = false
        if (detail.skills.length > 0) {
            detail.skills.forEach((element, index) => {
                this[`skillName_${index + 1}`].color = `#4a4948`
                this[`skillGl_${index + 1}`].color = `#4a4948`
                this[`skillDetail_${index + 1}`].color = `#4a4948`
                this[`skillName_${index + 1}`].text = element.skillName
                this[`skillGl_${index + 1}`].text = `几率${element.skillProb}%`
                this[`skillDetail_${index + 1}`].text = element.skillDesc
                this[`skillImg_${index + 1}`].visible = true
                if (element.status) {
                    this[`skillName_${index + 1}`].color = `#004418`
                    this[`skillGl_${index + 1}`].color = `#004418`
                    this[`skillDetail_${index + 1}`].color = `#004418`
                }
            });
        }
    }

    onDisable() {

    }
}