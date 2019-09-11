import Refining from "./Refining";
import RefiningControl from "./RefiningControl";
import SoundManager from "../../../gamescripts/SoundManager";

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
        this.idList = []
        this.owner.warehouseList.array = arr
    }

    //单个兵器图签
    singleWeapon(cell, idx) {
        this.childList.push(cell)

        cell.skin = `local/common/frameBg.png`

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

        if (cell._dataSource.willBeEat) {
            cell.getChildByName(`beChioce`).visible = true
        } else {
            cell.getChildByName(`beChioce`).visible = false
        }
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
        let allnum = 0
        this.childList.forEach((element, index) => {
            if (allnum > 2) {
                return
            }
            if (element._dataSource.willBeEat) {
                allnum++
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
            if (res.refiner) {
                this.owner.params.refiner = res.refiner
                this.owner.params.nextRefiner = res.nextRefiner
                Refining.ins.params.refiner_list[Refining.ins.ReIndex] = this.owner.params.refiner
            } else {
                this.owner.params.refiner.currentExp = res.totalExp
            }
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
            if (element.ischiocedd) {
                this.chioceWp(element, index)
            }
        });

        this.owner.warehouseList.tweenTo(0, 200, Laya.Handler.create(this, () => {
            for (let i = 0; i < 3; i++) {
                if (this.childList[i]) {
                    this.chioceWp(this.childList[i], i)
                }
            }
        }))
    }

    getMask() {
        this.guideStep = 1
        this.guideSteps = [{ x: 120, y: 3, radius: 53 },
        { x: 143, y: 0, radius: 90 },
        { x: 143, y: 0, radius: 90 }]

        const Sprite = Laya.Sprite;

        this.owner.guide2.zOrder = 2
        this.owner.guide2.visible = true
        this.owner.guide2f(1)

        RefiningControl.ins.sceondStep()
        // 绘制底图
        this.gameContainer = new Sprite();
        this.gameContainer.size(1634, 750)
        this.gameContainer.pos(-150, 0)
        this.gameContainer.mouseEnabled = true;
        this.owner.addChild(this.gameContainer);
        this.gameContainer.on(Laya.Event.CLICK, this, () => {
            switch (this.guideStep) {
                case 0:
                    RefiningControl.ins.addLv(this.owner.params.refiner_list[0])
                    break;
                case 1:
                    this.owner.nextP()
                    SoundManager.ins.btn()
                    this.guideStep = 2
                    this.chiocethreeWp()
                    this.nextStep(this.owner.guide3);
                    break;
                case 2:
                    SoundManager.ins.btn()
                    this.eatWp()
                    this.guideStep = 3
                    this.isGuide = false
                    this.nextStep();
                    this.owner.guide3.visible = false
                    break;
            }
        })

        // 引导所在容器
        this.guideContainer = new Sprite();
        this.owner.addChild(this.guideContainer);
        this.guideContainer.cacheAs = "bitmap";

        // 绘制遮罩区，含透明度，可见游戏背景
        this.maskArea = new Sprite();
        this.guideContainer.addChild(this.maskArea);
        this.maskArea.alpha = 0.5;
        this.maskArea.graphics.drawRect(-150, 0, 1634, 750, "#000");

        // 绘制一个圆形区域，利用叠加模式，从遮罩区域抠出可交互区
        this.interactionArea = new Sprite();
        this.guideContainer.addChild(this.interactionArea);
        // 设置叠加模式
        this.interactionArea.blendMode = "destination-out";

        // 设置点击区域
        this.hitArea = new Laya.HitArea();
        this.hitArea.hit.drawRect(-150, 0, 1634, 750, "#000");
        this.guideContainer.hitArea = this.hitArea;
        this.guideContainer.mouseEnabled = true;


        this.nextStep(this.owner.guide2);
    }

    sceondStep() {
        this.owner.guide1.visible = false
        SoundManager.ins.btn()
        this.guideStep = 1
        this.nextStep(Devour.ins.guide2);
    }

    nextStep(obj) {
        if (this.guideStep === this.guideSteps.length) {
            this.owner.removeChild(this.guideContainer);
            this.owner.removeChild(this.gameContainer);
            this.owner.guide2.visible = false
            this.owner.guide3.visible = false
            return;
        }
        let step = this.guideSteps[this.guideStep];

        this.hitArea.unHit.clear();
        this.hitArea.unHit.drawCircle(obj.x + step.x, obj.y + step.y, step.radius, "#000000");

        this.interactionArea.graphics.clear();
        this.interactionArea.graphics.drawCircle(obj.x + step.x, obj.y + step.y, step.radius, "#000000");
    }

}
