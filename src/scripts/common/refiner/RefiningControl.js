import SoundManager from "../../../gamescripts/SoundManager";
import Devour from "./Devour";

export default class RefiningControl extends PaoYa.Component {
    constructor() {
        super();
        RefiningControl.ins = this
    }

    onAwake() {

    }

    onEnable() {

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
        this.owner.guide1.visible = true

        this.guideStep = 0
        this.guideSteps = [{ x: 120, y: 3, radius: 53 }]

        const Sprite = Laya.Sprite;

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
        this.owner.addChild(this.guideContainer);
        this.guideContainer.cacheAs = "bitmap";

        this.owner.guide1.zOrder = 2
        this.owner.guide1f(1)

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


        this.nextStep(this.owner.guide1);
    }

    sceondStep() {
        this.owner.guide1.visible = false
        this.guideStep = 1
        this.nextStep(Devour.ins.guide2);
    }

    nextStep(obj) {
        if (this.guideStep === this.guideSteps.length) {
            this.owner.removeChild(this.guideContainer);
            this.owner.removeChild(this.gameContainer);
            this.owner.guide1.visible = false
            return;
        }
        let step = this.guideSteps[this.guideStep];

        this.hitArea.unHit.clear();
        this.hitArea.unHit.drawCircle(obj.x + step.x, obj.y + step.y, step.radius, "#000000");

        this.interactionArea.graphics.clear();
        this.interactionArea.graphics.drawCircle(obj.x + step.x, obj.y + step.y, step.radius, "#000000");
    }
}