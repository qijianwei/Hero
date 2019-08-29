import SignControl from "./SignControl";

export default class Sign extends PaoYa.View {
    constructor() {
        super();
        Sign.ins = this
    }

    onAwake() {

    }

    onEnable() {
        this.benBack.on(Laya.Event.CLICK, this, () => {
            SignControl.ins.navigator.pop()
        })
        this.initInfo()
    }

    initInfo() {
        let arr = this.params.list.slice(0, 6)
        let arr1 = this.params.list.slice(6, 7)
        this.signList.vScrollBarSkin = ""
        this.signList.renderHandler = new Laya.Handler(this, this.signListItem);
        this.signList.array = arr
        this.sevenDay.dataSource = arr1[0]
        this.signListItem(this.sevenDay, 6)

        if (this.params.status) {
            this.showtips.visible = true
            this.showBtn.visible = false

            this.tips.font = `figureDetail`
            this.tips.scale(0.8, 0.8)
        } else {
            this.showtips.visible = false
            this.showBtn.visible = true

            this.eatTxt.font = `weaponDFont`
            this.eatTxt.scale(0.6, 0.6)
            this.eatTxt.pos(35, 13)

            this.eatTxt.on(Laya.Event.CLICK, this, () => {
                if (typeof wx == 'undefined') {
                    SignControl.ins.getAward()
                    return
                }
                let title = PaoYa.DataCenter.config.game.share_list.randomItem;
                PaoYa.ShareManager.shareTitle(title, {}, () => {
                    SignControl.ins.getAward()
                })
            })
        }
    }

    signListItem(cell, index) {
        let arr = cell.dataSource.split(`-`)
        let wp = cell.getChildByName(`wp`)
        let icon = cell.getChildByName(`icon`)
        let awardImage = cell.getChildByName(`awardImage`)
        let num = cell.getChildByName(`num`)
        let day = cell.getChildByName(`day`)
        let choice = cell.getChildByName(`choice`)
        let mask = cell.getChildByName(`mask1`)
        let already = cell.getChildByName(`already`)

        if (index + 1 > this.params.login_days) {
            mask.visible = false
        } else {
            mask.visible = true
            already.visible = true
        }

        if (index == this.params.login_days && !this.params.status) {
            choice.visible = true
        }

        day.text = `第${index + 1}天`
        day.font = `weaponNFontT`
        day.scale(0.75, 0.75)
        day.pos(31, 235)

        switch (arr[0]) {
            case `1`:
                wp.getChildByName(`wp`).skin = `local/common/wp.png`
                wp.visible = true
                break;
            case `2`:
                icon.visible = true
                break;
            case `3`:
                wp.getChildByName(`wp`).skin = `local/common/wp.png`
                wp.visible = true
                break;
            case `8`:
                awardImage.visible = true
                num.visible = true
                awardImage.skin = `local/common/icon.png`
                num.text = `×${arr[1]}`
                num.font = `weaponNFontT`
                num.scale(0.65, 0.65)
                num.pos(28, 175)
                break;
            case `9`:
                awardImage.visible = true
                num.visible = true
                awardImage.skin = `local/common/diamond.png`
                num.text = `×${arr[1]}`
                num.font = `weaponNFontT`
                num.scale(0.65, 0.65)
                num.pos(28, 175)
                break;
        }
    }
}