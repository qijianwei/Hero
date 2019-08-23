export default class DevourControl extends PaoYa.Component {
    constructor() {
        super();
        DevourControl.ins = this
        this.willBeEatList = []
    }

    onAwake() {

    }

    onEnable() {

    }

    getWareList() {
        this.lightList = this.owner.params.lightList
        this.heavyList = this.owner.params.heavyList
        this.middleList = this.owner.params.middleList
        this.allList = this.lightList.concat(this.heavyList, this.middleList)

        this.myUserList = []
        let arr = this.owner.params.userWeapons.split(`,`)
        arr.forEach(element => {
            let obj = {
                name: element.split(`-`)[0],
                lv: element.split(`-`)[1]
            }
            this.myUserList.push(obj)
        });

        this.showWareList(this.allList)
    }

    //仓库展示列表
    showWareList(list) {
        let showList = JSON.parse(JSON.stringify(list))
        let arr = []
        let unShowWeap = JSON.parse(JSON.stringify(this.myUserList))
        //筛选仓库武器
        showList.forEach((element, index) => {
            for (let i = 0; i < unShowWeap.length; i++) {
                if (element.weaponId == unShowWeap[i].name && element.weaponLevel == unShowWeap[i].lv) {
                    element.num -= 1
                }
            }

            for (let i = 0; i < element.num; i++) {
                let obj = JSON.parse(JSON.stringify(element))
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
        arr.sort(function (a, b) {
            return a.WpGrade - b.WpGrade
        })
        this.isWareChoiceWp = null
        this.newAllArr = arr
        this.childList = []
        this.owner.warehouseList.array = arr
    }

    //单个兵器图签
    singleWeapon(cell, idx) {
        cell.skin = `local/common/frameBg.png`
        cell.getChildByName(`beChioce`).visible = false

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
    //是否选中操作
    chioceWp(cell, index) {
        if (cell._dataSource.willBeEat) {
            let num = null
            this.newAllArr[index].ischiocedd = false
            this.willBeEatList.forEach((element, idx) => {
                if (element == index) {
                    num = idx
                }
            });
            this.willBeEatList.splice(num, 1)
            cell._dataSource.willBeEat = false
            cell.getChildByName(`beChioce`).visible = false
        } else {
            if (this.willBeEatList.length > 2) {
                return
            }
            this.newAllArr[index].ischiocedd = true
            this.willBeEatList.push(index)
            cell._dataSource.willBeEat = true
            cell.getChildByName(`beChioce`).visible = true
        }

        let num = 0
        this.childList.forEach((element, index) => {
            if (element._dataSource.willBeEat) {
                num += element._dataSource.exp
            }
        });

        this.owner.curryExp.width = this.owner.nextExp.width + (num / this.owner.params.refiner.currentFullExp) * 224 > 224 ? 224 : this.owner.nextExp.width + (num / this.owner.params.refiner.currentFullExp) * 224
    }
    //吞噬
    eatWp(e) {
        if (this.willBeEatList.length < 1) {
            return
        }

        let idlist = ``
        let isHigh = false, highDeatil
        let addexp = 0
        this.willBeEatList.forEach(element => {
            if (this.newAllArr[element].weaponStar == 3 && !e) {
                isHigh = true
                highDeatil = this.newAllArr[element]
            }
            addexp += this.newAllArr[element].exp
            idlist = `${idlist}${this.newAllArr[element].weaponId}-${this.newAllArr[element].weaponLevel},`
        });

        if (isHigh) {
            let obj = {
                detail: highDeatil,
                type: `refining`
            }
            this.navigator.popup("weapon/StoreSure", obj);
            return
        }

        PaoYa.Request.POST(`martial_update_refiner`, { weaponId: idlist, refinerId: this.owner.params.refiner.id, addExp: addexp }, res => {
            this.owner.params.refiner = res.refiner
            this.owner.params.nextRefiner = res.nextRefiner
            this.owner.initInfo()
            let arr2 = []
            this.newAllArr.forEach((element, idx) => {
                if (!element.ischiocedd) {
                    arr2.push(element)
                }
            });
            this.willBeEatList = []
            this.childList = []
            this.newAllArr = arr2
            this.owner.warehouseList.array = arr2
        })
    }
    //一键选中
    chiocethreeWp() {
        this.childList.forEach((element, index) => {
            if (element._dataSource.willBeEat) {
                this.chioceWp(element, index)
            }
        });

        for (let i = 0; i < 3; i++) {
            if (this.childList[i]) {
                this.chioceWp(this.childList[i], i)
            }
        }
    }
}
