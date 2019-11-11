import SoundManager from "../../../gamescripts/SoundManager";

export default class WeaponHouseControl extends PaoYa.Component {
    constructor() {
        super();
        WeaponHouseControl.ins = this
        this.myUserList = []
        this.isUsingWeapon = {}
        this.currentMyUserIdx = 0
        this.currentMyUserWeapDetail = ``
    }

    onAwake() {
        let onwer = this.owner
        this.isGuide = onwer.params.isGuide
        onwer.params = onwer.params.detail
        this.params = onwer.params
        //武器数据
        this.lightList = this.getNewListF(this.params.lightList, 1)
        this.heavyList = this.getNewListF(this.params.heavyList, 2)
        this.middleList = this.getNewListF(this.params.middleList, 3)
        this.allList = this.lightList.concat(this.heavyList, this.middleList)
        this.addWpList = []
        //新武器处理
        this.params.newWeapon && this.chioceNewWp()
        // //我的武器数据
        let arr = this.params.userWeapons.split(`,`)
        arr.forEach(element => {
            let obj = {
                name: element.split(`-`)[0],
                lv: element.split(`-`)[1]
            }
            this.myUserList.push(obj)
        });
        this.getMyUserDetailList(0)
        onwer.userWeaponList.renderHandler = new Laya.Handler(this, this.userWeaponUpdateItem);
        onwer.userWeaponList.array = this.myUserDetailList
        onwer.warehouseList.vScrollBarSkin = ""
        this.isWareChoiceWp = null
        onwer.warehouseList.renderHandler = new Laya.Handler(this, this.wareWeaponUpdateItem);
    }

    onThrottleClick(e) {
        if (!this.owner) {
            return
        }
        let owner = this.owner
        switch (e.target.name) {
            case `light`:
                SoundManager.ins.btn()
                owner.getWareBtnSkin(`light`)
                owner.lightNew.visible = false
                this.nowuseList=this.lightList
                owner.warehouseList.array = this.lightList
                // this.showWareList(this.lightList)
                break;
            case `middle`:
                SoundManager.ins.btn()
                owner.getWareBtnSkin(`middle`)
                owner.middleNew.visible = false
                // this.showWareList(this.middleList)
                this.nowuseList=this.middleList
                owner.warehouseList.array = this.middleList
                break;
            case `large`:
                SoundManager.ins.btn()
                owner.getWareBtnSkin(`large`)
                owner.largeNew.visible = false
                // this.showWareList(this.heavyList)
                this.nowuseList=this.heavyList
                owner.warehouseList.array = this.heavyList
                break;
            case `benBack`:
                if (this.isGuide) {
                    return
                }
                SoundManager.ins.btn()
                this.navigator.pop()
                break;
            case `equip`:
                if (this.isGuide) {
                    return
                }
                SoundManager.ins.btn()
                this.chargeWeapon()
                break;
            case `upGrade`:
                if (this.isGuide) {
                    return
                }
                this.upgradeWeapon()
                break;
        }
    }

    //仓库武器渲染
    wareWeaponUpdateItem(cell, idx) {
        console.log(cell._dataSource.weaponName, cell._dataSource.isUseringWeapon)
        cell.offAll()
        cell.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            if (this.isWareChoiceWp) {
                if(this.nowuseList){
                    this.nowuseList.forEach(element => {
                        element.isUserWeapon = false
                        element.isUseringWeapon = false
                    });
                }
                this.isWareChoiceWp.getChildByName(`beChioce`).visible = false
                this.isWareChoiceWp.isUseringWeapon = false
                this.isWareChoiceWp.skin = `local/common/frameBg.png`
                // this.isWareChoiceWp._dataSource.isShowing = false
                this.isWareChoiceWp = cell
                this.isWareChoiceWp._dataSource.isShowing = true
            } else {
                this.isWareChoiceWp = cell
            }
            cell.getChildByName(`beChioce`).visible = true
            cell.skin = `local/common/currutFrameBg.png`
            cell._dataSource.isUseringWeapon = true
            this.currentMyUserWeapDetail = cell._dataSource
            this.renderCenterData()
            if (cell._dataSource.isNew) {
                cell._dataSource.isNew = false
                cell.getChildByName(`new`).visible = false
                this.newWpList[cell._dataSource.idIdx].isOdd = true
                // let arr = newWpList
            }
        })
        this.singleWeapon(cell, idx)
    }
    //正在使用武器渲染
    userWeaponUpdateItem(cell, idx) {
        //点击重新渲染
        cell.offAll()
        let owner = this.owner
        if (!cell._dataSource.weaponId) {
            cell.getChildByName(`bgwrap`).visible = false
            cell.getChildByName(`mark`).visible = false
            cell.getChildByName(`wp`).visible = false
            cell.getChildByName(`lv`).visible = false
            cell.getChildByName(`add`).visible = false
            cell.getChildByName(`invite`).visible = false
            switch (cell._dataSource.type) {
                case 3:
                    cell.getChildByName(`add`).visible = true
                    this.addWpList.push(cell)
                    cell.on(Laya.Event.CLICK, this, () => {
                        SoundManager.ins.btn()
                        for (let i = 0; i < 5; i++) {
                            owner[`wpBg_${i + 1}`].skin = `remote/weaponhouse/25.png`
                        }
                        // let newIndx = this.currentMyUserIdx
                        this.currentMyUserIdx = idx
                        cell.getChildByName(`beChioce`).visible = true
                        owner[`wpBg_${this.currentMyUserIdx + 1}`].skin = `remote/weaponhouse/26.png`
                        // this.myUserList[this.currentMyUserIdx] = this.myUserList[newIndx]
                        this.getMyUserDetailList(this.currentMyUserIdx)
                        this.addWpList = []
                        owner.userWeaponList.array = this.myUserDetailList
                    })
                    break;
                case 4:
                    cell.getChildByName(`invite`).visible = true
                    cell.on(Laya.Event.CLICK, this, () => {
                        SoundManager.ins.btn()
                        this.navigator.popup("weapon/UnlockFour");
                    })
                    break;
                case 5:
                    cell.getChildByName(`invite`).visible = true
                    cell.on(Laya.Event.CLICK, this, () => {
                        SoundManager.ins.btn()
                        this.navigator.popup("weapon/UnlockFifth");
                    })
                    break;
            }
            return
        }

        cell.getChildByName(`bgwrap`).visible = true
        cell.getChildByName(`mark`).visible = true
        cell.getChildByName(`wp`).visible = true
        cell.getChildByName(`lv`).visible = true
        cell.getChildByName(`add`).visible = false
        cell.getChildByName(`invite`).visible = false
        cell.getChildByName(`beChioce`).visible = false

        cell.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            this.addWpList.forEach(element => {
                element.getChildByName(`beChioce`).visible = false
            });
            for (let i = 0; i < 5; i++) {
                owner[`wpBg_${i + 1}`].skin = `remote/weaponhouse/25.png`
            }
            this.currentMyUserIdx = idx
            owner[`wpBg_${this.currentMyUserIdx + 1}`].skin = `remote/weaponhouse/26.png`
            this.getMyUserDetailList(this.currentMyUserIdx)
            this.addWpList = []
            owner.userWeaponList.array = this.myUserDetailList
        })

        this.singleWeapon(cell, idx, 1)
    }

    //新武器属性赋予
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

        let al = this.allList.length
        let ml = this.newWpList.length
        getNewList: for (let j = 0; j < ml; j++) {
            for (let i = 0; i < al; i++) {
                if (this.allList[i].weaponId == this.newWpList[j].name && this.allList[i].weaponLevel == this.newWpList[j].lv && !this.allList[i].isUserWeapon && !this.newWpList[j].isOdd) {
                    this.allList[i].isNew = true
                    this.allList[i].idIdx = j
                    continue getNewList;
                }
            }
        }
    }

    //获取装备武器详情
    getMyUserDetailList(number) {
        this.allList.forEach(element => {
            element.isUseringWeapon = false
            element.isUserWeapon = false
        });
        switch (this.params.weaponGridNum) {
            case 3:
                this.myUserDetailList = [{ type: 3 }, { type: 3 }, { type: 3 }, { type: 4 }, { type: 5 }]
                break;
            case 4:
                if (this.params.shareGrid > 0) {
                    this.myUserDetailList = [{ type: 3 }, { type: 3 }, { type: 3 }, { type: 3 }, { type: 4 }]
                } else {
                    this.myUserDetailList = [{ type: 3 }, { type: 3 }, { type: 3 }, { type: 3 }, { type: 5 }]
                }
                break;
            case 5:
                this.myUserDetailList = [{ type: 3 }, { type: 3 }, { type: 3 }, { type: 3 }, { type: 3 }]
                break;
        }
        let al = this.allList.length
        let ml = this.myUserList.length
        let num = 0
        getNowWare: for (let j = 0; j < ml; j++) {
            if (!this.myUserList[j]) {
                return
            }
            for (let i = 0; i < al; i++) {
                if (this.allList[i].weaponId == this.myUserList[j].name && this.allList[i].weaponLevel == this.myUserList[j].lv && !this.allList[i].isUseringWeapon && !this.allList[i].isUserWeapon) {
                    if (num == number) {
                        this.allList[i].isUseringWeapon = true
                    }
                    this.allList[i].isUserWeapon = true

                    this.myUserDetailList[num] = JSON.parse(JSON.stringify(this.allList[i]))
                    num++
                    continue getNowWare;
                }
            }
        }
    }

    getNewListF(list, num) {
        let showList = JSON.parse(JSON.stringify(list))
        let arr = []
        //筛选仓库武器
        showList.forEach((element, index) => {
            for (let i = 0; i < element.num; i++) {
                element.WpGrade = element.weaponStar * 100 + element.weaponLevel
                element.wpId = `${num}${index}${i}`
                arr.push(JSON.parse(JSON.stringify(element)))
            }
        });

        if (this.newWpList) {
            let al = arr.length
            let ml = this.newWpList.length
            getNewList: for (let j = 0; j < ml; j++) {
                for (let i = 0; i < al; i++) {
                    if (arr[i].weaponId == this.newWpList[j].name && arr[i].weaponLevel == this.newWpList[j].lv && !arr[i].isUserWeapon && !this.newWpList[j].isOdd) {
                        arr[i].isNew = true
                        arr[i].idIdx = j
                        continue getNewList;
                    }
                }
            }
        }

        arr.sort(function (a, b) {
            return b.WpGrade - a.WpGrade
        })

        return arr
    }

    //单个兵器图签
    singleWeapon(cell, idx, isUser) {
        cell.skin = `local/common/frameBg.png`
        cell.getChildByName(`beChioce`).visible = false
        if (!isUser) {
            if (this.isGuide) {
                if (cell._dataSource.willBeUse) {
                    cell.getChildByName(`beChioce`).visible = true
                    this.isWareChoiceWp = cell
                    cell.skin = `local/common/currutFrameBg.png`
                    this.currentMyUserWeapDetail = cell._dataSource
                    this.renderCenterData(isUser)
                }
            } else {
                cell.getChildByName(`using`).visible = false
                cell.getChildByName(`new`).visible = false
                if (cell._dataSource.isUserWeapon) {
                    cell.getChildByName(`using`).visible = true
                }

                if (cell._dataSource.isNew) {
                    cell.getChildByName(`new`).visible = true
                }
                if (cell._dataSource.isUseringWeapon) {
                    if (cell._dataSource.isUserWeapon) {
                        cell.getChildByName(`using`).visible = true
                    }
                    cell.skin = `local/common/currutFrameBg.png`
                    cell.getChildByName(`beChioce`).visible = true
                    this.isWareChoiceWp = cell
                    this.currentMyUserWeapDetail = cell._dataSource
                    this.renderCenterData(isUser)
                }
            }
        } else {
            if (cell._dataSource.isUseringWeapon) {
                cell.getChildByName(`beChioce`).visible = true
                this.isWareChoiceWp = cell
                this.currentMyUserWeapDetail = cell._dataSource
                this.renderCenterData(isUser)
            }
        }
        //选定渲染

        // if (!this.isGuide) {
        // } else {

        // }

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
    renderCenterData(isUser) {
        let owner = this.owner
        owner[`skillImg_1`].visible = false
        owner[`skillImg_2`].visible = false
        let detail = null
        if (this.isWareChoiceWp) {
            detail = this.isWareChoiceWp._dataSource
        } else {
            detail = this.currentMyUserWeapDetail
        }


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
                wareList = JSON.parse(JSON.stringify(this.heavyList))
                owner.large.skin = `remote/weaponhouse/13.png`
                break
            case 2:
                skint = `local/common/type_2.png`
                wareList = JSON.parse(JSON.stringify(this.middleList))
                owner.middle.skin = `remote/weaponhouse/13.png`
                break
            case 1:
                skint = `local/common/type_3.png`
                wareList = JSON.parse(JSON.stringify(this.lightList))
                owner.light.skin = `remote/weaponhouse/13.png`
                break
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

        owner.needGoldNum.text = detail.upgradeCost
        owner.needGoldNum.font = `weaponNFontT`
        owner.needGoldNum.scale(0.7, 0.7)

        owner.upGrade.disabled = detail.weaponLevel >= detail.weaponTopLevel ? true : false
        owner.equip.skin = detail.isUserWeapon ? `remote/weaponhouse/20.png` : `remote/weaponhouse/10.png`

        //否是为已装备武器
        if (isUser) {
            this.showWareList(wareList)
        }
    }


    showWareList(wareList) {
        this.nowuseList = wareList
        this.owner.warehouseList.array = wareList
    }

    //升级武器
    upgradeWeapon() {
        let owner = this.owner
        let numNew = 0
        if (!this.isGuide) {
            if (this.isRequesting) {
                return
            }
            if (Number(owner.needGoldNum.text) > Number(PaoYa.DataCenter.user.gold)) {
                this.navigator.popup("weapon/GoldLack");
                return
            }
        } else {
            numNew = 1
        }

        let detail = this.isWareChoiceWp && this.isWareChoiceWp._dataSource ? this.isWareChoiceWp._dataSource : this.currentMyUserWeapDetail
        let isusing = detail.isUserWeapon ? 1 : 0
        this.isRequesting = true
        Laya.timer.once(500, this, () => {
            this.isRequesting = false
        })

        PaoYa.Request.POST(`martial_update_weapon`, { weaponId: `${detail.weaponId}-${detail.weaponLevel}`, newHand: numNew, default: isusing, index: this.currentMyUserIdx, time: new Date().getTime() }, res => {
            SoundManager.ins.upgrade()

            let obj = {
                gold: PaoYa.DataCenter.user.gold - Number(owner.needGoldNum.text),
                diamond: PaoYa.DataCenter.user.diamond
            }
            owner.changeHB(obj)

            let newDetail = null
            owner.upeffects.visible = true
            owner.upeffects.play(0, false)
            //修改原數組
            switch (detail.weaponType) {
                case 3:
                    // this.heavyList[detail.originalIndex].num--
                    // res.weapon.num = 1
                    // this.heavyList.push(res.weapon)
                    newDetail = `heavyList`
                    break
                case 2:
                    // this.middleList[detail.originalIndex].num--
                    // res.weapon.num = 1
                    // this.middleList.push(res.weapon)
                    newDetail = `middleList`
                    break
                case 1:
                    // this.lightList[detail.originalIndex].num--
                    // res.weapon.num = 1
                    // this.lightList.push(res.weapon)
                    newDetail = `lightList`
                    break
            }

            let al = this[newDetail].length
            let isNew = true
            res.weapon.num = 1
            let oldNum = 1, newNum = 1
            this[newDetail].forEach(element => {
                if (detail.wpId == element.wpId) {
                    for (const key in res.weapon) {
                        element[key] = res.weapon[key]
                    }
                    element.isUseringWeapon = true
                    this.isWareChoiceWp._dataSource = element
                }
            });

            this.allList = []
            this.allList = this.lightList.concat(this.heavyList, this.middleList)
            if (res.userWeapons) {
                this.myUserList = []
                let arr = res.userWeapons.split(`,`)
                arr.forEach(element => {
                    let obj = {
                        name: element.split(`-`)[0],
                        lv: element.split(`-`)[1]
                    }
                    this.myUserList.push(obj)
                });
                this.getMyUserDetailList(this.currentMyUserIdx)
                this.addWpList = []
                owner.userWeaponList.array = this.myUserDetailList
            } else {
                if (this.isWareChoiceWp) {
                    this.singleWeapon(this.isWareChoiceWp, -1)
                }
                this.renderCenterData()
            }
        })
    }

    //更换武器
    chargeWeapon() {
        if (this.isRequesting) {
            return
        }
        let detail = this.currentMyUserWeapDetail
        let oldDetail = this.myUserDetailList[this.currentMyUserIdx]
        if (detail.isUserWeapon) {
            return
        }
        let wpType = 0
        if (!this.myUserList[this.currentMyUserIdx]) {
            wpType = 1
        }
        this.isRequesting = true
        Laya.timer.once(500, this, () => {
            this.isRequesting = false
        })
        PaoYa.Request.POST(`martial_change_weapon`, { oldWeaponId: `${oldDetail.weaponId}-${oldDetail.weaponLevel}`, newWeaponId: `${detail.weaponId}-${detail.weaponLevel}`, type: wpType, index: this.currentMyUserIdx }, res => {
            this.myUserList = []
            this.isEqWp = true
            let arr = res.userWeapons.split(`,`)
            // this.currentMyUserWeapDetail.isUsingWp = true
            arr.forEach(element => {
                let obj = {
                    name: element.split(`-`)[0],
                    lv: element.split(`-`)[1]
                }
                this.myUserList.push(obj)
            });
            this.getMyUserDetailList(this.currentMyUserIdx)
            this.addWpList = []
            this.owner.userWeaponList.array = this.myUserDetailList
        })
    }
}