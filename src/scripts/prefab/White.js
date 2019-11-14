import Tool from "../common/tool/Tool";
import { Global } from "../common/tool/Global";

export default class White extends PaoYa.Component {

    constructor() {
        super();
        White.ins = this
        this.gameList = [
            { name: "开心消方块", icon: "remote/icon/9.png", appId: "wx169e4a2b116bdab6", sizeNum: 8 },
            { name: "采油小怪", icon: "remote/icon/8.png", appId: "wxee32187228632dc8", sizeNum: 7 },
            { name: "熄灭火花", icon: "remote/icon/1.png", appId: "wxe01f9f77ddb96b19", sizeNum: 0 },
            { name: "跳一跳", icon: "remote/icon/2.png", appId: "wx79a2296d151ac183", sizeNum: 1 },
            { name: "建筑反应堆", icon: "remote/icon/3.png", appId: "wxb4ac0c02cd5bbd13", sizeNum: 2 },
            { name: "木兰射箭", icon: "remote/icon/4.png", appId: "wx84dbcda70a6e5385", sizeNum: 3 },
            { name: "决战地牢", icon: "remote/icon/5.png", appId: "wx325b44b8ed5ef472", sizeNum: 4 },
            { name: "飞刀大师", icon: "remote/icon/6.png", appId: "wxbc263a31f4a052e7", sizeNum: 5 },
            { name: "火力飙车", icon: "remote/icon/7.png", appId: "wxed5a853eb6f8c194", sizeNum: 6 }
        ]

        this.iconSpList = []
    }

    onEnable() {
        this.container = this.owner.getChildByName(`container`)
        this.owner.on(Laya.Event.MOUSE_DOWN, this, this.iconDown)
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.iconUp)
        this.owner.on(Laya.Event.MOUSE_MOVE, this, this.iconMove)
        this.gameList.forEach((element, idx) => {
            this.createdImage(idx, element)
        });
        if (!this.isFirst) {
            this.isFirst = true
            this.startTurn()
        }
    }

    onDisable() {
        console.log("关闭")
        this.finishTurn()
    }

    startTurn() {
        Laya.timer.loop(2500, this, this.iconAutoMove)
    }

    finishTurn() {
        Laya.timer.clear(this, this.iconAutoMove)
    }

    createdImage(number, obj) {
        Tool.showGameNums(obj)
        let num = number - 2
        let icon = new Laya.Image()
        icon.size(150, 150)
        icon.skin = `${obj.icon}`
        icon.pos(num * 178 + 75, 30)
        this.container.addChild(icon)
        icon.idx = num
        icon.name = obj.name
        this.iconSpList.push(icon)

        let iconBg = new Laya.Image()
        // icon.anchorX = 0.5
        // icon.anchorY = 0.5
        iconBg.size(164, 164)
        iconBg.skin = "remote/icon/iconBg.png"
        iconBg.pos(-7, -7)
        iconBg.mouseEnabled = true
        icon.addChild(iconBg)

        // this.shake(icon, 15, 0, 250)
        iconBg.on(Laya.Event.CLICK, this, () => {
            Tool.goToNewGame(obj)
        })
    }

    iconMove(e) {
        if (this.iconIsMoving) {
            this.isMoving = e.stageX
            return
        }
        if (!this.isMoving) {
            return
        }
        let moveNum = 0

        this.iconSpList.forEach((element, idex) => {
            element.x = element.x + e.stageX - this.isMoving
            if (element.x < -461) {
                element.idx = 7
                element.x = 6 * 178 + 75
                moveNum = -1
            }
            if (element.x > 1321) {
                moveNum = 1
                element.idx = -3
                element.x = -2 * 178 + 75
            }
            let num = null
        });

        this.iconSpList.forEach(element => {
            element.idx = element.idx + moveNum
        });

        this.isMoving = e.stageX
        this.moveX = e.stageX
    }

    iconDown(e) {
        this.finishTurn()
        this.dwonX = e.stageX
        this.isMoving = e.stageX
    }

    iconUp(e) {
        if (!this.moveX) {
            this.isMoving = null
            return
        }
        // let addNum = this.dwonX - this.moveX > 0 ? 1 : -1
        this.iconSpList.forEach(element => {
            // let num = null
            // num = Math.floor((element.x) / 178) + 1
            // element.idx = num
            console.log(element.x, element.idx)
            Laya.Tween.to(element, { x: element.idx * 178 + 75 }, 400, null, Laya.Handler.create(this, () => {
                this.isMoving = null
                this.dwonX = null
                this.moveX = null
                this.startTurn()
            }))
        });
    }

    /**
     * 
     * @param {*} obj 对象
     * @param {*} num 角度 传15
     * @param {*} count 第几次  传0
     * @param {*} timeNum  时间 传：250
     */
    shake(obj, num, count, timeNum) {
        if (this.pageDis) { //页面销毁 设为ture
            return
        }
        Laya.Tween.to(obj, { rotation: num }, timeNum, Laya.Ease.quadInOut, Laya.Handler.create(this, () => {
            switch (count) {
                case 0:
                    this.shake(obj, -15, 1, 500)
                    break;
                case 1:
                    this.shake(obj, 0, 2, 250)
                    break;
                case 2:
                    Laya.timer.once(500, this, () => {
                        this.shake(obj, 15, 0, 250)
                    })
                    break;
            }
        }))
    }

    iconAutoMove() {
        this.iconIsMoving = true
        this.iconSpList.forEach(element => {
            let num = element.idx - 1
            Laya.Tween.to(element, { x: num * 178 + 75 }, 1000, null, Laya.Handler.create(this, () => {
                this.iconIsMoving = false
                if (num < -2) {
                    element.idx = 6
                    element.x = 6 * 178 + 75
                } else {
                    element.idx = num
                }
            }))
        });
    }
}