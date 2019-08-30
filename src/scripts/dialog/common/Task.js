import SoundManager from "../../../gamescripts/SoundManager";

export default class Task extends PaoYa.Dialog {

    constructor() {
        super();
    }

    onEnable() {
        this.goldNum.text = PaoYa.DataCenter.user.gold
        this.goldNum.font = `weaponNFontT`
        this.goldNum.scale(0.7, 0.7)
        this.goldNum.pos(381, 20)
        this.diamondNum.text = PaoYa.DataCenter.user.diamond
        this.diamondNum.font = `weaponNFontT`
        this.diamondNum.scale(0.7, 0.7)
        this.diamondNum.pos(622, 20)

        this.btnClose.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            this.close()
        })

        this.title.font = `weaponDFont`
        this.title.scale(0.6, 0.6)
        this.title.pos(515, 78)

        this.taskList.vScrollBarSkin = ""
        this.taskList.renderHandler = new Laya.Handler(this, this.taskListItem);
        this.taskList.array = this.params
    }

    taskListItem(cell, index) {
        console.log(cell.dataSource, index)
        let bg = cell.getChildByName(`bg`)
        let num = cell.getChildByName(`num`)
        let detail2 = cell.getChildByName(`detail2`)
        let detail = cell.getChildByName(`detail`)
        let img = cell.getChildByName(`img`)
        let diamondNum = cell.getChildByName(`diamondNum`)
        let btn = cell.getChildByName(`btn`)
        let noThankTxt = cell.getChildByName(`noThankTxt`)

        bg.visible = cell.dataSource.finish >= cell.dataSource.num
        img.width = (cell.dataSource.finish / cell.dataSource.num) >= 1 ? 144 : (cell.dataSource.finish / cell.dataSource.num) * 144
        diamondNum.text = cell.dataSource.diamond
        diamondNum.font = `weaponDFont`
        diamondNum.scale(0.65, 0.65)
        diamondNum.pos(598, 24)

        btn.skin = (cell.dataSource.finish / cell.dataSource.num) >= 1 ? `local/common/btn_1.png` : `local/common/btn_2.png`
        noThankTxt.text = (cell.dataSource.finish / cell.dataSource.num) >= 1 ? `领取` : `去完成`
        noThankTxt.font = `weaponDFont`
        noThankTxt.scale(0.65, 0.65)
        noThankTxt.pos(751 + (172 - noThankTxt.width * 0.65) / 2, 15)

        btn.offAll()
        if (cell.dataSource.status == 2) {
            noThankTxt.text = `已领取`
            noThankTxt.font = `weaponDFont`
            noThankTxt.scale(0.65, 0.65)
            noThankTxt.pos(751 + (172 - noThankTxt.width * 0.65) / 2, 15)
            btn.disabled = true
        } else {
            if ((cell.dataSource.finish / cell.dataSource.num) >= 1) {
                btn.on(Laya.Event.CLICK, this, () => {
                    PaoYa.Request.POST(`martial_task_receive`, { taskKey: cell.dataSource.task }, res => {
                        SoundManager.ins.gold()
                        PaoYa.DataCenter.user.diamond += cell.dataSource.diamond
                        this.diamondNum.text = PaoYa.DataCenter.user.diamond
                        this.params.forEach(element => {
                            if (element.task == cell.dataSource.task) {
                                for (const key in res) {
                                    element[key] = res[key]
                                }
                            }
                        });

                        this.taskList.array = this.params
                    })
                })
            } else {
                btn.on(Laya.Event.CLICK, this, () => {
                    SoundManager.ins.btn()
                    this.close()
                })
            }
        }

        switch (cell.dataSource.task) {
            case "taskMonster":
                detail.text = `击败了`
                num.text = cell.dataSource.finish
                num.x = detail.width + detail.x
                num.color = cell.dataSource.finish >= cell.dataSource.num ? "#000000" : '#d10000'
                detail2.text = `/${cell.dataSource.num}个敌人`
                detail2.x = num.width + num.x
                break;
            case "taskBoss":
                detail.text = `击败`
                num.text = cell.dataSource.finish
                num.x = detail.width + detail.x
                num.color = cell.dataSource.finish >= cell.dataSource.num ? "#000000" : '#d10000'
                detail2.text = `/${cell.dataSource.num}个BOSS`
                detail2.x = num.width + num.x
                break;
            case "taskWin":
                detail.text = `对局胜利`
                num.text = cell.dataSource.finish
                num.x = detail.width + detail.x
                num.color = cell.dataSource.finish >= cell.dataSource.num ? "#000000" : '#d10000'
                detail2.text = `/${cell.dataSource.num}局`
                detail2.x = num.width + num.x
                break;
            case "taskEncounter":
                detail.text = `完成`
                num.text = cell.dataSource.finish
                num.x = detail.width + detail.x
                num.color = cell.dataSource.finish >= cell.dataSource.num ? "#000000" : '#d10000'
                detail2.text = `/${cell.dataSource.num}次奇遇`
                detail2.x = num.width + num.x
                break;
            case "taskUpWeapon":
                detail.text = `升级`
                num.text = cell.dataSource.finish
                num.x = detail.width + detail.x
                num.color = cell.dataSource.finish >= cell.dataSource.num ? "#000000" : '#d10000'
                detail2.text = `/${cell.dataSource.num}次兵器`
                detail2.x = num.width + num.x
                break;
            case "taskGetWeapon":
                detail.text = `获得`
                num.text = cell.dataSource.finish
                num.x = detail.width + detail.x
                num.color = cell.dataSource.finish >= cell.dataSource.num ? "#000000" : '#d10000'
                detail2.text = `/${cell.dataSource.num}个兵器`
                detail2.x = num.width + num.x
                break;
            case "taskShare":
                detail.text = `分享`
                num.text = cell.dataSource.finish
                num.x = detail.width + detail.x
                num.color = cell.dataSource.finish >= cell.dataSource.num ? "#000000" : '#d10000'
                detail2.text = `/${cell.dataSource.num}次`
                detail2.x = num.width + num.x
                break;
            case "taskRefresh":
                detail.text = `刷新`
                num.text = cell.dataSource.finish
                num.x = detail.width + detail.x
                num.color = cell.dataSource.finish >= cell.dataSource.num ? "#000000" : '#d10000'
                detail2.text = `/${cell.dataSource.num}次商店`
                detail2.x = num.width + num.x
                break;
            case "taskInvite":
                detail.text = `邀请`
                num.text = cell.dataSource.finish
                num.x = detail.width + detail.x
                num.color = cell.dataSource.finish >= cell.dataSource.num ? "#000000" : '#d10000'
                detail2.text = `/${cell.dataSource.num}个好友`
                detail2.x = num.width + num.x
                break;
        }
    }
}