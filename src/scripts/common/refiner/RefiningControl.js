import SoundManager from "../../../gamescripts/SoundManager";
import Devour from "./Devour";
import { Global } from "../tool/Global";
import HomeControl from "../HomeControl";

export default class RefiningControl extends PaoYa.Component {
    constructor() {
        super();
        RefiningControl.ins = this
    }

    onAwake() {

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
            case `figure`:
                if (owner.figureD.visible) {
                    return
                }
                SoundManager.ins.btn()
                owner.figure.skin = `remote/refining/4.png`
                owner.weopon.skin = `remote/refining/5.png`

                owner.figureD.visible = true
                owner.weoponD.visible = false
                break;
            case `weopon`:
                if (owner.weoponD.visible) {
                    return
                }
                SoundManager.ins.btn()
                owner.figure.skin = `remote/refining/2.png`
                owner.weopon.skin = `remote/refining/3.png`

                owner.figureD.visible = false
                owner.weoponD.visible = true
                break;
        }
    }

    addLv(e) {
        if (e.status) {
            this.POST("martial_user_weapon_list", { refinerId: e.id }, data => {
                data.isGuide = this.owner.isGuide
                this.navigator.push(`Devour`, data)
            })
        } else {
            this.navigator.popup(`refiner/Canlock`, e)
        }
    }

    getMask() {
        let owner = this.owner
        owner.guide1.visible = true
        Global.dataPoints('进入炼器引导')
        this.guideStep = 0
        this.guideSteps = [{ x: 120, y: 3, radius: 53 }]

        const Sprite = Laya.Sprite;

        // 绘制底图
        this.gameContainer = new Sprite();
        this.gameContainer.size(1634, 750)
        this.gameContainer.pos(-150, 0)
        this.gameContainer.mouseEnabled = true;
        owner.addChild(this.gameContainer);
        this.gameContainer.on(Laya.Event.CLICK, this, () => {
            switch (this.guideStep) {
                case 0:
                    this.addLv(owner.params.refiner_list[0])
                    Global.dataPoints('点击淬体')
                    break;
                case 1:
                    Global.dataPoints('点击一键选中')
                    Devour.ins.nextP()
                    SoundManager.ins.btn()
                    this.guideStep = 2
                    DevourControl.ins.chiocethreeWp()
                    this.nextStep(Devour.ins.guide3);
                    break;
                case 2:
                    Global.dataPoints('点击吞噬升级')
                    SoundManager.ins.btn()
                    DevourControl.ins.eatWp()
                    this.guideStep = 3
                    this.isGuide = false
                    this.nextStep();
                    Devour.ins.guide3.visible = false
                    Global.isShowGrading = true
                    break;
            }
        })

        // 引导所在容器
        this.guideContainer = new Sprite();
        owner.addChild(this.guideContainer);
        this.guideContainer.cacheAs = "bitmap";

        owner.guide1.zOrder = 2
        owner.guide1f(1)

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


        this.nextStep(owner.guide1);
    }

    sceondStep() {
        this.owner.guide1.visible = false
        this.guideStep = 1
        this.nextStep(Devour.ins.guide2);
    }

    nextStep(obj) {
        let owner = this.owner
        if (this.guideStep === this.guideSteps.length) {
            owner.removeChild(this.guideContainer);
            owner.removeChild(this.gameContainer);
            owner.guide1.visible = false
            return;
        }
        let step = this.guideSteps[this.guideStep];

        this.hitArea.unHit.clear();
        this.hitArea.unHit.drawCircle(obj.x + step.x, obj.y + step.y, step.radius, "#000000");

        this.interactionArea.graphics.clear();
        this.interactionArea.graphics.drawCircle(obj.x + step.x, obj.y + step.y, step.radius, "#000000");
    }

    onDisable() {
        if (Global.isShowGrading) {
            HomeControl.ins.lockBattle()
        }
    }
}