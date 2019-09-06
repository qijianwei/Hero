import RefiningControl from "./RefiningControl";
import SoundManager from "../../../gamescripts/SoundManager";
import Devour from "./Devour";
import DevourControl from "./DevourControl";
import { Global } from "../tool/Global";

export default class Refining extends PaoYa.View {
    constructor() {
        super();
        Refining.ins = this
    }

    onAwake() {
        this.isGuide = this.params.isGuide
        this.params = this.params.detail
    }

    onEnable() {
        if (this.isGuide) {
            this.getMask()
            PaoYa.Request.POST(`martial_change_new_hand`, { type: `refinerNew` })
        }
        this.benBack.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            RefiningControl.ins.navigator.pop()
        })

        this.figure.on(Laya.Event.CLICK, this, () => {
            if (this.figureD.visible) {
                return
            }
            SoundManager.ins.btn()
            this.figure.skin = `remote/refining/4.png`
            this.weopon.skin = `remote/refining/5.png`

            this.figureD.visible = true
            this.weoponD.visible = false
        })

        this.weopon.on(Laya.Event.CLICK, this, () => {
            if (this.weoponD.visible) {
                return
            }
            SoundManager.ins.btn()
            this.figure.skin = `remote/refining/2.png`
            this.weopon.skin = `remote/refining/3.png`

            this.figureD.visible = false
            this.weoponD.visible = true
        })


    }

    onAppear() {
        if (!this.isGuide) {
            this.guide1.visible = false
        }
        this.params.refiner_list.forEach((element, index) => {
            this[`${element.id}Txt`].text = element.refinerName
            this[`${element.id}Txt`].font = `weaponDFont`
            this[`${element.id}Txt`].scale(0.60, 0.60)
            this[`${element.id}Txt`].pos(35, 12)

            this[`${element.id}Lv`].text = `LV.${element.refinerLevel}`
            this[`${element.id}Lv`].font = `weaponNFontT`
            this[`${element.id}Lv`].scale(0.5, 0.5)
            this[`${element.id}Lv`].pos(26, 93)

            this[`${element.id}`].gray = element.status ? false : true
            this[`${element.id}`].offAll()
            this[`${element.id}`].on(Laya.Event.CLICK, this, () => {
                SoundManager.ins.btn()
                this.ReIndex = index
                RefiningControl.ins.addLv(element)
            })
        });
    }

    getMask() {
        this.guide1.visible = true

        this.guideStep = 0
        this.guideSteps = [{ x: 120, y: 3, radius: 53 },
        { x: 153, y: 0, radius: 90 },
        { x: 153, y: 0, radius: 90 }]

        const Sprite = Laya.Sprite;

        // 绘制底图
        this.gameContainer = new Sprite();
        this.gameContainer.size(1634, 750)
        this.gameContainer.pos(-150, 0)
        this.gameContainer.mouseEnabled = true;
        Laya.stage.addChild(this.gameContainer);
        this.gameContainer.on(Laya.Event.CLICK, this, () => {
            switch (this.guideStep) {
                case 0:
                    RefiningControl.ins.addLv(this.params.refiner_list[0])
                    break;
                case 1:
                    Devour.ins.nextP()
                    SoundManager.ins.btn()
                    this.guideStep = 2
                    DevourControl.ins.chiocethreeWp()
                    this.nextStep(Devour.ins.guide3);
                    break;
                case 2:
                    SoundManager.ins.btn()
                    DevourControl.ins.eatWp()
                    this.guideStep = 3
                    this.isGuide = false
                    this.nextStep();
                    Devour.ins.guide3.visible = false
                    break;
            }
        })

        // 引导所在容器
        this.guideContainer = new Sprite();
        Laya.stage.addChild(this.guideContainer);
        Laya.stage.addChild(this.guide1);
        this.guide1.x = this.guide1.x + Global.AdaptiveWidth
        this.guide1f(1)
        this.guideContainer.cacheAs = "bitmap";

        // 绘制遮罩区，含透明度，可见游戏背景
        this.maskArea = new Sprite();
        this.guideContainer.addChild(this.maskArea);
        this.maskArea.alpha = 0.5;
        this.maskArea.graphics.drawRect(-150 + Global.AdaptiveWidth, 0, 1634, 750, "#000");

        // 绘制一个圆形区域，利用叠加模式，从遮罩区域抠出可交互区
        this.interactionArea = new Sprite();
        this.guideContainer.addChild(this.interactionArea);
        // 设置叠加模式
        this.interactionArea.blendMode = "destination-out";

        // 设置点击区域
        this.hitArea = new Laya.HitArea();
        this.hitArea.hit.drawRect(-150 + Global.AdaptiveWidth, 0, 1634, 750, "#000");
        this.guideContainer.hitArea = this.hitArea;
        this.guideContainer.mouseEnabled = true;


        this.nextStep(this.guide1);
    }

    sceondStep() {
        this.guide1.visible = false
        SoundManager.ins.btn()
        this.guideStep = 1
        this.nextStep(Devour.ins.guide2);
    }

    nextStep(obj) {
        if (this.guideStep === this.guideSteps.length) {
            Laya.stage.removeChild(this.guideContainer);
            Laya.stage.removeChild(this.gameContainer);
            Laya.stage.removeChild(this.guide1);
            Laya.stage.removeChild(Devour.ins.guide2);
            Laya.stage.removeChild(Devour.ins.guide3);
            return;
        }
        let step = this.guideSteps[this.guideStep];

        this.hitArea.unHit.clear();
        this.hitArea.unHit.drawCircle(obj.x + step.x, obj.y + step.y, step.radius, "#000000");

        this.interactionArea.graphics.clear();
        this.interactionArea.graphics.drawCircle(obj.x + step.x, obj.y + step.y, step.radius, "#000000");
    }

    guide1f(e) {
        let n = e == 1 ? -1 : 1
        Laya.Tween.to(this.guide1, { x: this.guide1.x + 15 * n }, 300, null, Laya.Handler.create(this, () => {
            this.guide1f(n)
        }))
    }
}