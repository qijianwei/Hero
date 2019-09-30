import GradingControl from "./GradingControl";
import HeroConfig from "../../../gamescripts/config/HeroConfig";
import SoundManager from "../../../gamescripts/SoundManager";
import { Global } from "../tool/Global";

export default class Grading extends PaoYa.View {
    constructor() {
        super();
    }

    onAwake() {

    }

    onEnable() {
        Global.dataPoints('进入华山论剑')
        // this.benBack.on(Laya.Event.CLICK, this, () => {
        //     SoundManager.ins.btn()
        //     GradingControl.ins.navigator.pop()
        // })

        // this.gameStart.on(Laya.Event.CLICK, this, () => {
        //     SoundManager.ins.btn()
        //     GradingControl.ins.gameRole(this.showDetail.roleId)
        // })


        this.gameStartTxt.font = `weaponDFont`
        this.gameStartTxt.scale(0.7, 0.7)
        this.gameStartTxt.pos(22, 15)

        this.gradingNum.skin = `local/common/badge_${this.params.ladder}.png`

        this.canUseList = []
        this.params.roleList.forEach(element => {
            if (element.roleStatus) {
                this.canUseList.push(element)
            }
        });

        this.canUseList.forEach(element => {
            if (element.roleId == this.params.defaultRole) {
                this.showDetail = element
            }
        });
        if (this.canUseList.length > 3) {
            this.canUseList.splice(2, 1)
        }
        // this.canUseList = this.canUseList.slice(0, 2)
        this.herolist.renderHandler = new Laya.Handler(this, this.figureRender);
        this.herolist.array = this.canUseList

        if (this.params.ladder == 9) {
            this.starNum.visible = false
            this.starNum2.visible = true
            this.starNumTxt.text = `×${this.params.ladderStar}`
            this.starNumTxt.font = `weaponNFontT`
            this.starNumTxt.scale(0.8, 0.8)
        } else {
            this.starNum.visible = true
            this.starNum2.visible = false
            var arr = new Array(this.params.ladderFullStar);
            this.starNum.renderHandler = new Laya.Handler(this, this.starNumRender);
            this.starNum.array = arr

            this.starNum.x = (224 / 7 * (7 - this.params.ladderFullStar)) + 121
        }


        PaoYa.DataCenter.user.config_list.hero.ladderList.forEach(element => {
            if (this.params.ladder == element.ladderId) {
                this.gradingNum.skin = `local/common/badge_${element.ladderId}.png`
                this.gradingname.text = element.ladderName
                this.gradingname.font = `weaponNFontT`
                this.gradingname.scale(0.8, 0.8)
                this.gradingname.pos(258.5, 470)
            }
        });

        this.initInfo()
    }

    lisenClick(e) {
        switch (e.target.name) {
            case `benBack`:
                SoundManager.ins.btn()
                GradingControl.ins.navigator.pop()
                break;
            case `gameStart`:
                SoundManager.ins.btn()
                GradingControl.ins.gameRole(this.showDetail.roleId)
                break;
        }
    }

    changeGold() {

    }
    //人物列表渲染
    figureRender(cell, idx) {
        cell.getChildByName(`icon`).skin = `local/common/${cell.dataSource.roleDress}.png`
        cell.getChildByName(`bgwarp`).visible = this.showDetail.roleId == cell.dataSource.roleId ? true : false
        if (this.showDetail.roleId == cell.dataSource.roleId) {
            this.prole = cell
        }
        cell.offAll()
        cell.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            this.prole.getChildByName(`bgwarp`).visible = false
            this.prole = cell
            this.showDetail = cell.dataSource
            this.initInfo()
            cell.getChildByName(`bgwarp`).visible = true
        })
    }

    starNumRender(cell, idx) {
        cell.skin = idx + 1 > this.params.ladderStar ? `remote/grading/5.png` : `remote/grading/4.png`
    }

    onDisable() {

    }
    //初始化展示信息
    initInfo() {
        this.skbox.y = 390
        this.skbox.x = 370
        if (this.heroSkin) {
            this.heroSkin.stop()
            this.heroSkin.destroy()
            this.heroSkin = null
        }

        this.heroSkin = HeroConfig.getSkeleton(this.showDetail.roleDress)
        this.skbox.addChild(this.heroSkin)
        this.heroSkin.pos(100, 400)
        this.heroSkin.scale(1.5, 1.5)
        this.heroSkin.play(`stand`, true)

        for (let i = 0; i < 5; i++) {
            this[`lv${i + 1}`].visible = false
            if (i < this.showDetail.roleStar) {
                this[`lv${i + 1}`].visible = true
            }
        }

        this.heroname.text = `${this.showDetail.roleName}LV.${this.showDetail.roleLevel}/${this.showDetail.roleTopLevel}`
        this.heroname.font = `weaponNFontT`
        this.heroname.scale(0.8, 0.8)
    }
}