import WheelControl from "./WheelControl";
import SoundManager from "../../../gamescripts/SoundManager";

export default class Wheel extends PaoYa.View {
    constructor() {
        super();
        Wheel.ins = this
    }

    onAwake() {

    }

    onEnable() {
        this.tip.font = `weaponNFontT`
        this.tip.scale(0.6, 0.6)

        this.num.text = PaoYa.DataCenter.user.wheelTimes
        this.num.font = `recoverHP`
        this.num.pos(363, 508)
        this.num.scale(1.2, 1.2)

        this.startWheelTxt.font = `weaponDFont`
        this.startWheelTxt.scale(0.8, 0.8)
        this.startWheelTxt.pos(60, 10)

        this.benBack.on(Laya.Event.CLICK, this, () => {
            if (this.isRunning) {
                return
            }
            SoundManager.ins.btn()
            WheelControl.ins.navigator.pop()
        })

        this.addbtn.on(Laya.Event.CLICK, this, () => {
            if (this.isRunning) {
                return
            }
            if (PaoYa.DataCenter.user.diamond < 500) {
                SoundManager.ins.btn()
                WheelControl.ins.navigator.popup("weapon/DiamondLack");
                return
            }
            SoundManager.ins.btn()
            WheelControl.ins.addTimes()
        })

        this.startWheel.on(Laya.Event.CLICK, this, () => {
            if (this.isRunning) {
                return
            }
            WheelControl.ins.wheelTurn()
        })

        PaoYa.DataCenter.user.config_list.hero.wheelList.forEach((element, index) => {
            this.showList(this[`award${index + 1}`], element, index)
        });
    }

    onAppear() {
        this.changeDG()
    }

    changeDG() {
        PaoYa.Request.GET('update_chips', {}, res => {
            this.goldNum.width = null

            PaoYa.DataCenter.user.gold = res.gold
            PaoYa.DataCenter.user.diamond = res.diamond
            let goldnum = addNumberUnit(PaoYa.DataCenter.user.gold)
            let diamondnum = addNumberUnit(PaoYa.DataCenter.user.diamond)

            this.goldNum.text = goldnum
            this.goldNum.font = `weaponNFontT`
            this.goldNum.scale(0.6, 0.6)
            this.goldNum.pos(365 + (149 - this.goldNum.width * 0.6) / 2, 25)
            this.diamondNum.text = diamondnum
            this.diamondNum.font = `weaponNFontT`
            this.diamondNum.scale(0.6, 0.6)
            this.diamondNum.pos(600 + (149 - this.goldNum.width * 0.6) / 2, 25)

            function addNumberUnit(num) {
                switch (true) {
                    case num >= 10000 && num < 100000000:
                        let integ = num / 10000
                        return Math.floor(integ * 100) / 100 + '万'
                        break
                    case num >= 100000000:
                        let integ1 = num / 100000000
                        return Math.floor(integ1 * 100) / 100 + '亿'
                        break
                    default:
                        return num + ''
                        break
                }
            };
        })
    }

    showList(cell, data, index) {
        let role = cell.getChildByName(`role`)
        let wp = cell.getChildByName(`wp`)
        let godo = cell.getChildByName(`godo`)
        let awardImage = godo.getChildByName(`icon`)
        let num = godo.getChildByName(`num`)

        switch (data.propId) {
            case 1:
                wp.visible = true
                wp.getChildByName(`wp`).skin = `local/common/wp.png`
                wp.getChildByName(`bgwrap`).skin = `local/common/quality_3.png`
                break;
            case 2:
                role.visible = true
                break;
            case 3:
                wp.visible = true
                break;
            case 8:
                godo.visible = true
                awardImage.visible = true
                awardImage.skin = `local/common/icon.png`
                num.visible = true
                num.text = data.propNum
                num.font = `weaponNFontT`
                num.scale(0.65, 0.65)
                // num.pos(28, 175)
                break;
            case 9:
                godo.visible = true
                awardImage.visible = true
                num.visible = true
                awardImage.skin = `local/common/diamond.png`
                num.text = data.propNum
                num.font = `weaponNFontT`
                num.scale(0.65, 0.65)
                // num.pos(28, 175)
                break;
        }
    }
}