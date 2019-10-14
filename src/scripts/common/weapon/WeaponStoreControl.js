import SoundManager from "../../../gamescripts/SoundManager";
import WeaponStore from "./WeaponStore";

export default class WeaponStoreControl extends PaoYa.Component {

    constructor() {
        super();
        WeaponStoreControl.ins = this
    }

    onAwake() {
        //获取数据列表
        let owner = this.owner
        this.params = owner.params
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
        owner.buyList.vScrollBarSkin = ""
        owner.warehouseList.vScrollBarSkin = ""
        owner.buyList.renderHandler = new Laya.Handler(this, this.buyWpUpdateItem);
        owner.warehouseList.renderHandler = new Laya.Handler(this, this.sellWpUpdateItem);
        this.getWareHouseList()
        this.buyPresentIdx = 0
        this.sellPresentIdx = 0
        if (this.buyList.length > 0) {
            owner.weapon.visible = true
            owner.buyBtn.visible = true
            owner.sellBtn.visible = true
        } else {
            owner.weapon.visible = false
            owner.buyBtn.visible = false
            owner.sellBtn.visible = false
        }
        owner.buyList.array = this.buyList
        this.downTimeStartF(this.params.buyList.refreshTime)
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
                SoundManager.ins.btn()
                this.navigator.pop()
                break;
            case `sellBtn`:
                SoundManager.ins.btn()
                this.sellWp()
                break;
            case `refreshBtn`:
                SoundManager.ins.btn()
                if (WeaponStore.ins.isRefrshing) {
                    true
                }
                let isHigh = false, highDeatil
                this.buyList.forEach(element => {
                    if (element.weaponStar == 3) {
                        isHigh = true
                        highDeatil = element
                    }
                });
                if (isHigh) {
                    let obj = {
                        detail: highDeatil,
                        type: `buy`
                    }
                    this.navigator.popup("weapon/StoreSure", obj);
                } else {
                    this.refresF()
                }
                break;
            case `sell`:
                SoundManager.ins.btn()
                this.wpdType = `sell`
                owner.sell.skin = `remote/weaponstore/3.png`
                owner.buy.skin = `remote/weaponstore/2.png`
                owner.sellPage.visible = true
                owner.buyPage.visible = false
                owner.getWareBtnSkin(`light`)
                owner.lightNew.visible = false
                this.sellPresentIdx = 0
                this.showWareList(this.lightList)
                break;
            case `buy`:
                SoundManager.ins.btn()
                this.wpdType = `buy`
                owner.sell.skin = `remote/weaponstore/2.png`
                owner.buy.skin = `remote/weaponstore/3.png`
                owner.sellPage.visible = false
                owner.buyPage.visible = true
                this.buyPresentIdx = 0
                if (this.buyList.length > 0) {
                    owner.weapon.visible = true
                    owner.sellBtn.visible = true
                    owner.buyBtn.visible = true
                } else {
                    owner.weapon.visible = false
                    owner.buyBtn.visible = false
                    owner.sellBtn.visible = false
                }
                owner.buyList.array = this.buyList
                break;
            case `light`:
                SoundManager.ins.btn()
                owner.getWareBtnSkin(`light`)
                owner.lightNew.visible = false
                this.showWareList(this.lightList)
                break;
            case `middle`:
                SoundManager.ins.btn()
                owner.getWareBtnSkin(`middle`)
                owner.middleNew.visible = false
                this.showWareList(this.middleList)
                break;
            case `large`:
                SoundManager.ins.btn()
                owner.getWareBtnSkin(`large`)
                owner.largeNew.visible = false
                this.showWareList(this.heavyList)
                break;
            case `buyBtn`:
                SoundManager.ins.btn()
                let detail = this.currentBuyWeapDetail
                if (!detail) {
                    return
                }
                if (Number(detail.weaponPrice) > PaoYa.DataCenter.user.gold) {
                    this.navigator.popup("weapon/GoldLack");
                    return
                } else {
                    // PaoYa.DataCenter.user.gold -= Number(detail.weaponPrice)
                    // owner.goldNum.text = PaoYa.DataCenter.user.gold
                    this.buyWp()
                }
                break;
        }
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
        let owner = this.owner
        owner[`skillImg_1`].visible = false
        owner[`skillImg_2`].visible = false
        let detail = data
        owner.showWeapon.skin = `remote/small_weapons/s_${detail.weaponId}.png`
        // owner.currtWeaponLevel.text = `LV.${detail.weaponLevel}`
        // owner.currtWeaponLevel.font = `weaponNFontT`
        // owner.currtWeaponLevel.scale(0.7, 0.7)
        //选择重置
        let arr = [`light`, `middle`, `large`]
        arr.forEach(element => {
            owner[element].skin = `remote/weaponhouse/14.png`
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
                owner.large.skin = `remote/weaponhouse/13.png`
                break
            case 2:
                skint = `local/common/type_2.png`
                owner.middle.skin = `remote/weaponhouse/13.png`
                break
            case 1:
                skint = `local/common/type_3.png`
                owner.light.skin = `remote/weaponhouse/13.png`
                break
        }

        if (detail.weaponSalePrice) {
            owner.needGoldNum.text = detail.weaponSalePrice
            owner.needGoldNum.font = `weaponNFontT`
            owner.needGoldNum.scale(0.8, 0.8)
        }

        owner.showWrap.skin = skinq
        owner.showMark.skin = skint
        //兵器属性
        owner.currutWeapon.text = detail.weaponName
        owner.currutWeapon.font = `weaponDFont`
        owner.currutWeapon.scale(0.8, 0.8)

        owner.CDTime.text = `LV.${detail.weaponLevel}/${detail.weaponTopLevel}`
        owner.CDTime.font = `weaponNFontT`
        owner.CDTime.scale(0.7, 0.7)

        owner.attackNum.text = `攻击： ${detail.weaponAttack}`
        owner.addattackNum.visible = detail.weaponUpAttack ? true : false
        owner.addattackNum.text = `+${detail.weaponUpAttack}`
        owner.enduranceNum.text = `耐久： ${detail.weaponDurable}`
        owner.addenduranceNum.visible = detail.weaponUpDurable ? true : false
        owner.addenduranceNum.text = `+${detail.weaponUpDurable}`
        owner.consumeNum.text = `消耗： ${detail.weaponConsume}`
        owner.addconsumeNum.visible = detail.weaponDownConsume ? true : false
        owner.addconsumeNum.text = `-${detail.weaponDownConsume}`
        owner.wpcdNum.text = `冷却： ${detail.weaponCd}秒`

        //兵器技能
        owner[`skillName_1`].text = ``
        owner[`skillGl_1`].text = ``
        owner[`skillDetail_1`].text = ``
        owner[`skillImg_1`].visible = false
        owner[`skillName_2`].text = ``
        owner[`skillGl_2`].text = ``
        owner[`skillDetail_2`].text = ``
        owner[`skillImg_2`].visible = false
        if (detail.skills.length > 0) {
            detail.skills.forEach((element, index) => {
                owner[`skillName_${index + 1}`].color = `#4a4948`
                owner[`skillGl_${index + 1}`].color = `#4a4948`
                owner[`skillDetail_${index + 1}`].color = `#4a4948`
                owner[`skillName_${index + 1}`].text = element.skillName
                owner[`skillGl_${index + 1}`].text = `几率${element.skillProb}%`
                owner[`skillDetail_${index + 1}`].text = element.skillDesc
                owner[`skillImg_${index + 1}`].visible = true
                if (element.status) {
                    owner[`skillName_${index + 1}`].color = `#004418`
                    owner[`skillGl_${index + 1}`].color = `#004418`
                    owner[`skillDetail_${index + 1}`].color = `#004418`
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
        let owner = this.owner
        if (this.isRefrshing) {
            owner.refreshTimeNum.visible = false
            return
        }
        let Ntime = Stime % 3600 | 0
        let h = Stime / 3600 | 0
        let m = Ntime / 60 | 0
        let s = Ntime % 60 | 0

        let hhh = h > 9 ? h : `0${h}`
        let mmm = m > 9 ? m : `0${m}`
        let sss = s > 9 ? s : `0${s}`
        owner.refreshTimeNum.text = `${hhh}:${mmm}:${sss}`
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
        let owner = this.owner
        this.newWpList = []
        owner.lightNew.visible = this.params.newWeapon.indexOf(`d`) != -1 ? true : false
        owner.middleNew.visible = this.params.newWeapon.indexOf(`z`) != -1 ? true : false
        owner.largeNew.visible = this.params.newWeapon.indexOf(`g`) != -1 ? true : false
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
        let owner = this.owner
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
            owner.weapon.visible = true
            owner.buyBtn.visible = true
            owner.sellBtn.visible = true
        } else {
            owner.weapon.visible = false
            owner.buyBtn.visible = false
            owner.sellBtn.visible = false
        }
        owner.warehouseList.array = arr
    }
    //购买武器
    buyWp() {
        let owner = this.owner
        let detail = this.currentBuyWeapDetail
        PaoYa.Request.POST(`martial_shop_buy`, { weaponId: detail.weaponId }, res => {
            owner.changeHB(res)
        })


        owner.showaniC.skin = this.isBuyChoiceWp.getChildByName(`wp`)._skin
        owner.showaniType.skin = this.isBuyChoiceWp.getChildByName(`mark`)._skin
        owner.showaniWrap.skin = this.isBuyChoiceWp.getChildByName(`bgwrap`)._skin
        owner.showani.visible = true
        owner.showani.x = 722 + this.isBuyChoiceWp.x + 71
        owner.showani.y = this.isBuyChoiceWp.y + 116 + 71
        owner.ware.visible = true
        Laya.Tween.to(owner.showani, { x: 296, y: 652, scaleX: 0, scaleY: 0 }, 800, Laya.Ease.quintIn, Laya.Handler.create(this, () => {
            owner.showani.visible = false
            owner.showani.scale(1, 1)
            Laya.Tween.to(owner.ware, { alpha: 0 }, 400, Laya.Ease.quintIn, Laya.Handler.create(this, () => {
                owner.ware.visible = false
                owner.ware.alpha = 1
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
                owner.weapon.visible = true
                owner.buyBtn.visible = true
                owner.sellBtn.visible = true
            } else {
                owner.weapon.visible = false
                owner.buyBtn.visible = false
                owner.sellBtn.visible = false
            }
            owner.buyList.array = this.buyList
        })
    }
    //出售武装
    sellWp(choice) {
        let owner = this.owner
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
            // owner.goldNum.text = res.gold
            owner.changeHB(res)
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
        let owner = this.owner
        num = this.isReadyRefrensh ? 0 : 1
        if (PaoYa.DataCenter.user.diamond < Number(owner.needDiamon.text)) {
            this.navigator.popup("weapon/DiamondLack", 1);
            return
        }
        // PaoYa.DataCenter.user.diamond -= Number(owner.needDiamon.text)
        // owner.diamondNum.text = PaoYa.DataCenter.user.diamond
        let obj = {
            diamond: PaoYa.DataCenter.user.diamond -= Number(owner.needDiamon.text),
        }
        owner.changeHB(obj)
        this.isRefrshing = true

        PaoYa.Request.POST(`martial_shop_list`, { refresh: num }, res => {
            Laya.timer.once(1000, this, () => {
                this.isRefrshing = false
                owner.refreshTimeNum.visible = true
                this.downTimeStartF(res.refreshTime)
            })
            this.buyList = res.weaponList
            this.buyPresentIdx = 0
            if (this.buyList.length > 0) {
                owner.weapon.visible = true
                owner.buyBtn.visible = true
                owner.sellBtn.visible = true
            } else {
                owner.weapon.visible = false
                owner.buyBtn.visible = false
                owner.sellBtn.visible = false
            }
            owner.buyList.array = this.buyList
        })
    }
}