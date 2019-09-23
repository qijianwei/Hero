import SoundManager from "../../../gamescripts/SoundManager";

export default class WeaponStoreControl extends PaoYa.Component {

    constructor() {
        super();
        WeaponStoreControl.ins = this
    }

    onAwake() {
        //获取数据列表
        this.params = this.owner.params
        this.sellList = this.params.sellList
        this.buyList = this.params.buyList.weaponList
        this.sellList.newWeapon && this.chioceNewWp()
        //我的武器数据
        this.wpdType = `buy`
        this.myUserList = []
        this.isUsingWeapon = {}
        this.currentMyUserIdx = 0
        this.currentMyUserWeapDetail = ``
        let arr = this.sellList.userWeapons.split(`,`)
        arr.forEach(element => {
            let obj = {
                name: element.split(`-`)[0],
                lv: element.split(`-`)[1]
            }
            this.myUserList.push(obj)
        });
        this.owner.buyList.vScrollBarSkin = ""
        this.owner.warehouseList.vScrollBarSkin = ""
        this.owner.buyList.renderHandler = new Laya.Handler(this, this.buyWpUpdateItem);
        this.owner.warehouseList.renderHandler = new Laya.Handler(this, this.sellWpUpdateItem);
        this.getWareHouseList()
        this.buyPresentIdx = 0
        this.sellPresentIdx = 0
        if (this.buyList.length > 0) {
            this.owner.weapon.visible = true
            this.owner.buyBtn.visible = true
            this.owner.sellBtn.visible = true
        } else {
            this.owner.weapon.visible = false
            this.owner.buyBtn.visible = false
            this.owner.sellBtn.visible = false
        }
        this.owner.buyList.array = this.buyList
        this.downTimeStartF(this.params.buyList.refreshTime)
    }

    onEnable() {
    }

    onDisable() {
    }
    //获得仓库列表
    getWareHouseList() {
        this.lightList = this.sellList.lightList
        this.heavyList = this.sellList.heavyList
        this.middleList = this.sellList.middleList
        this.allList = this.lightList.concat(this.heavyList, this.middleList)
    }
    //渲染购买页
    buyWpUpdateItem(cell, idx) {
        this.singleWeapon(cell, idx)
        cell.offAll()
        cell.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            this.buyPresentIdx = idx
            this.isBuyChoiceWp.skin = `local/common/frameBg.png`
            this.isBuyChoiceWp.getChildByName(`beChioce`).visible = false

            cell.skin = `local/common/currutFrameBg.png`
            cell.getChildByName(`beChioce`).visible = true
            this.currentBuyWeapDetail = cell._dataSource
            this.isBuyChoiceWp = cell
            this.renderCenterData(this.currentBuyWeapDetail)
        })
    }
    //渲染仓库页
    sellWpUpdateItem(cell, idx) {
        this.singleWeapon(cell, idx, 1)
        cell.offAll()
        cell.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            this.isSellWareChoiceWp.skin = `local/common/frameBg.png`
            this.isSellWareChoiceWp.getChildByName(`beChioce`).visible = false

            cell.skin = `local/common/currutFrameBg.png`
            cell.getChildByName(`beChioce`).visible = true
            this.currentSellWeapDetail = cell._dataSource
            this.isSellWareChoiceWp = cell
            this.renderCenterData(this.currentSellWeapDetail)
        })
    }

    //单个兵器图签
    singleWeapon(cell, idx, isSell) {
        cell.skin = `local/common/frameBg.png`
        cell.getChildByName(`beChioce`).visible = false
        if (!isSell) {
            if (idx == this.buyPresentIdx) {
                cell.skin = `local/common/currutFrameBg.png`
                cell.getChildByName(`beChioce`).visible = true
                //当前详情
                this.currentBuyWeapDetail = cell._dataSource
                //当前列表
                this.isBuyChoiceWp = cell
                if (this.wpdType == `buy`) {
                    this.renderCenterData(this.currentBuyWeapDetail)
                }
            }
            cell.getChildByName(`bg`).getChildByName(`txt`).text = `${cell._dataSource.weaponPrice}`
            cell.getChildByName(`bg`).getChildByName(`txt`).font = `weaponNFontT`
            cell.getChildByName(`bg`).getChildByName(`txt`).scale(0.75, 0.75)
        } else {
            if (idx == this.sellPresentIdx) {
                cell.skin = `local/common/currutFrameBg.png`
                cell.getChildByName(`beChioce`).visible = true
                //当前详情
                this.currentSellWeapDetail = cell._dataSource
                //当前列表
                this.isSellWareChoiceWp = cell
                if (this.wpdType == `sell`) {
                    this.renderCenterData(this.currentSellWeapDetail)
                }
            }
        }

        cell.getChildByName(`wp`).skin = `remote/small_weapons/s_${cell._dataSource.weaponId}.png`
        cell.getChildByName(`lv`).text = `LV.${cell._dataSource.weaponLevel}`
        cell.getChildByName(`lv`).font = `weaponNFontT`
        cell.getChildByName(`lv`).scale(0.7, 0.7)

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
    renderCenterData(data) {
        this.owner[`skillImg_1`].visible = false
        this.owner[`skillImg_2`].visible = false
        let detail = data
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

        if (detail.weaponSalePrice) {
            this.owner.needGoldNum.text = detail.weaponSalePrice
            this.owner.needGoldNum.font = `weaponNFontT`
            this.owner.needGoldNum.scale(0.8, 0.8)
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
    //商城刷新倒计时
    downTimeStartF(timeNum) {
        let nowtime = new Date().getTime()
        let Stime = (timeNum - nowtime / 1000) | 0
        this.getPowerTimeDown(Stime)
    }

    getPowerTimeDown(Stime) {
        if (this.isRefrshing) {
            this.owner.refreshTimeNum.visible = false
            return
        }
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

    chioceNewWp() {
        this.newWpList = []
        this.owner.lightNew.visible = this.params.newWeapon.indexOf(`d`) != -1 ? true : false
        this.owner.middleNew.visible = this.params.newWeapon.indexOf(`z`) != -1 ? true : false
        this.owner.largeNew.visible = this.params.newWeapon.indexOf(`g`) != -1 ? true : false
        if (this.params.newWeapon) {
            let newaparr = this.params.newWeapon.split(`,`)
            newaparr.forEach(element => {
                let obj = {
                    name: element.split(`-`)[0],
                    lv: element.split(`-`)[1]
                }
                this.newWpList.push(obj)
            });
        }
    }
    //仓库列表给处理
    showWareList(list) {
        let showList = JSON.parse(JSON.stringify(list))
        let arr = []
        let unShowWeap = JSON.parse(JSON.stringify(this.myUserList))
        //筛选仓库武器
        showList.forEach((element, index) => {
            for (let i = 0; i < unShowWeap.length; i++) {
                if (element.weaponId == unShowWeap[i].name && element.weaponLevel == unShowWeap[i].lv) {
                    element.num -= 1
                    element.isUsing = true
                }
            }
            //选出已装备武器
            let isChoice = false
            for (let i = 0; i < element.num; i++) {
                let obj = JSON.parse(JSON.stringify(element))
                obj.originalIndex = index
                obj.isUsingWp = false
                if (obj.weaponId == this.myUserList[this.currentMyUserIdx].name && obj.weaponLevel == this.myUserList[this.currentMyUserIdx].lv && !isChoice) {
                    obj.isUsingWp = true
                    obj.isShowing = true
                    isChoice = true
                }
                obj.WpGrade = obj.weaponStar * 100 + obj.weaponLevel
                arr.push(obj)
            }
        });

        if (this.newWpList) {
            let al = arr.length
            let ml = this.newWpList.length
            getNewList: for (let j = 0; j < ml; j++) {
                for (let i = 0; i < al; i++) {
                    if (arr[i].weaponId == this.newWpList[j].name && arr[i].weaponLevel == this.newWpList[j].lv && !arr[i].isUsingWp && !this.newWpList[j].isOdd) {
                        arr[i].isNew = true
                        arr[i].idIdx = j
                        continue getNewList;
                    }
                }
            }
        }

        arr.sort(function (b, a) {
            return b.WpGrade - a.WpGrade
        })
        this.isWareChoiceWp = null
        if (arr.length > 0) {
            this.owner.weapon.visible = true
            this.owner.buyBtn.visible = true
            this.owner.sellBtn.visible = true
        } else {
            this.owner.weapon.visible = false
            this.owner.buyBtn.visible = false
            this.owner.sellBtn.visible = false
        }
        this.owner.warehouseList.array = arr
    }
    //购买武器
    buyWp() {
        let detail = this.currentBuyWeapDetail
        PaoYa.Request.POST(`martial_shop_buy`, { weaponId: detail.weaponId }, res => {
            this.owner.changeHB(res)
        })


        this.owner.showaniC.skin = this.isBuyChoiceWp.getChildByName(`wp`)._skin
        this.owner.showaniType.skin = this.isBuyChoiceWp.getChildByName(`mark`)._skin
        this.owner.showaniWrap.skin = this.isBuyChoiceWp.getChildByName(`bgwrap`)._skin
        this.owner.showani.visible = true
        this.owner.showani.x = 722 + this.isBuyChoiceWp.x + 71
        this.owner.showani.y = this.isBuyChoiceWp.y + 116 + 71
        this.owner.ware.visible = true
        Laya.Tween.to(this.owner.showani, { x: 296, y: 652, scaleX: 0, scaleY: 0 }, 800, Laya.Ease.quintIn, Laya.Handler.create(this, () => {
            this.owner.showani.visible = false
            this.owner.showani.scale(1, 1)
            Laya.Tween.to(this.owner.ware, { alpha: 0 }, 400, Laya.Ease.quintIn, Laya.Handler.create(this, () => {
                this.owner.ware.visible = false
                this.owner.ware.alpha = 1
            }));
        }));

        Laya.timer.once(100, this, () => {
            this.buyList.splice(this.buyPresentIdx, 1)
            this.buyPresentIdx = 0
            let newDetail = null
            switch (detail.weaponType) {
                case 3:
                    newDetail = `heavyList`
                    break
                case 2:
                    newDetail = `middleList`
                    break
                case 1:
                    newDetail = `lightList`
                    break
            }
            let isNew = true
            this[newDetail].forEach(element => {
                if (element.weaponId == detail.weaponId && element.weaponLevel == detail.weaponLevel) {
                    element.num++
                    isNew = false
                }
            });
            if (isNew) {
                detail.num = 1
                this[newDetail].push(detail)
            }
            if (this.buyList.length > 0) {
                this.owner.weapon.visible = true
                this.owner.buyBtn.visible = true
                this.owner.sellBtn.visible = true
            } else {
                this.owner.weapon.visible = false
                this.owner.buyBtn.visible = false
                this.owner.sellBtn.visible = false
            }
            this.owner.buyList.array = this.buyList
        })
    }
    //出售武装
    sellWp(choice) {
        let detail = this.currentSellWeapDetail
        if (detail.weaponStar == 3 && !choice) {
            let obj = {
                detail: this.currentSellWeapDetail,
                type: `sell`
            }
            this.navigator.popup("weapon/StoreSure", obj);
            return
        }
        PaoYa.Request.POST(`martial_weapon_sale`, { weaponId: `${detail.weaponId}-${detail.weaponLevel}` }, res => {
            // PaoYa.DataCenter.user.gold = res.gold
            // this.owner.goldNum.text = res.gold
            this.owner.changeHB(res)
        })

        let newDetail = null
        switch (detail.weaponType) {
            case 3:
                newDetail = `heavyList`
                break
            case 2:
                newDetail = `middleList`
                break
            case 1:
                newDetail = `lightList`
                break
        }
        let orderCarryOut = false
        this[newDetail].forEach(element => {
            if (element.weaponId == detail.weaponId && element.weaponLevel == detail.weaponLevel && detail.num > 0 && !orderCarryOut) {
                element.num--
                orderCarryOut = true
            }
        });
        this.showWareList(this[newDetail])
    }
    //刷新武器
    refresF() {
        let num = null
        num = this.isReadyRefrensh ? 0 : 1
        if (PaoYa.DataCenter.user.diamond < Number(this.owner.needDiamon.text)) {
            this.navigator.popup("weapon/DiamondLack", 1);
            return
        }
        // PaoYa.DataCenter.user.diamond -= Number(this.owner.needDiamon.text)
        // this.owner.diamondNum.text = PaoYa.DataCenter.user.diamond
        let obj = {
            diamond: PaoYa.DataCenter.user.diamond -= Number(this.owner.needDiamon.text),
        }
        this.owner.changeHB(obj)
        this.isRefrshing = true

        PaoYa.Request.POST(`martial_shop_list`, { refresh: num }, res => {
            Laya.timer.once(1000, this, () => {
                this.isRefrshing = false
                this.owner.refreshTimeNum.visible = true
                this.downTimeStartF(res.refreshTime)
            })
            this.buyList = res.weaponList
            this.buyPresentIdx = 0
            if (this.buyList.length > 0) {
                this.owner.weapon.visible = true
                this.owner.buyBtn.visible = true
                this.owner.sellBtn.visible = true
            } else {
                this.owner.weapon.visible = false
                this.owner.buyBtn.visible = false
                this.owner.sellBtn.visible = false
            }
            this.owner.buyList.array = this.buyList
        })
    }
}