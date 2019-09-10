import SoundManager from "../../../gamescripts/SoundManager";

export default class Task extends PaoYa.Dialog {

    constructor() {
        super();
    }

    onEnable() {
        this.btnClose.on(Laya.Event.CLICK, this, () => {
            this.close()
            SoundManager.ins.btn()
        })

        this.title.font = `weaponDFont`
        this.title.scale(0.6, 0.6)
        this.title.pos(480, 78)

        this.params.list.forEach((element, index) => {
            element.ranking = index
        });
        this.rankList.vScrollBarSkin = ""
        this.rankList.renderHandler = new Laya.Handler(this, this.rankListItem);
        this.rankList.array = this.params.list
        console.log(this.params.list)
        this.myRank.dataSource = {}
        this.myRank.dataSource.member_avstar = this.params.member_avstar
        this.myRank.dataSource.member_nick = this.params.member_nick
        this.myRank.dataSource.ranking = this.params.ranking == -1 ? -1 : Number(this.params.ranking) - 1
        this.myRank.dataSource.score = this.params.score
        this.rankListItem(this.myRank, this.myRank.dataSource.ranking)
    }

    rankListItem(cell, index) {
        console.log(cell.dataSource.ranking)
        let rankicon = cell.getChildByName(`rankicon`)
        let ranknum = cell.getChildByName(`ranknum`)
        let usericon = cell.getChildByName(`usericon`)
        let name = cell.getChildByName(`name`)
        let rankdetail = cell.getChildByName(`rankdetail`)
        let award1 = cell.getChildByName(`award1`)
        let award2 = cell.getChildByName(`award2`)

        name.text = cell.dataSource.member_nick
        let num1 = cell.dataSource.score % 1000
        let num2 = cell.dataSource.score / 1000 | 0
        rankdetail.text = `${PaoYa.DataCenter.user.config_list.hero.ladderList[num2 - 1].ladderName}×${num1}`
        name.visible = true
        rankdetail.visible = true
        usericon.skin = cell.dataSource.member_avstar;
        usericon.visible = true

        if (cell.dataSource.ranking < 3 && cell.dataSource.ranking != -1) {
            rankicon.skin = `remote/task/100${cell.dataSource.ranking + 1}.png`
            rankicon.visible = true
            ranknum.visible = false
        } else {
            rankicon.visible = false
            if (cell.dataSource.ranking == -1) {
                ranknum.text = `榜外`
                ranknum.scale(0.8, 0.8)
                ranknum.x = 37
                ranknum.y = 27
                ranknum.visible = true
                ranknum.font = `weaponDFont`
            } else {
                ranknum.text = cell.dataSource.ranking + 1
                ranknum.visible = true
                ranknum.font = `weaponDFont`
            }
        }
    }
}