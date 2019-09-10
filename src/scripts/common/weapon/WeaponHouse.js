import WeaponHouseControl from "./WeaponHouseControl";
import SoundManager from "../../../gamescripts/SoundManager";
import { Global } from "../tool/Global";

export default class WeaponHouse extends PaoYa.View {
    constructor() {
        super();
    }

    onAwake() {

    }

    onAppear() {
        PaoYa.Request.GET('update_chips', {}, res => {
            this.changeHB(res)
        })
    }

    changeHB(res){
        this.goldNum.width = null

        if (res.gold) {
            PaoYa.DataCenter.user.gold = res.gold
            let goldnum = addNumberUnit(PaoYa.DataCenter.user.gold)
            this.goldNum.text = goldnum
            this.goldNum.font = `weaponNFontT`
            this.goldNum.scale(0.6, 0.6)
            this.goldNum.pos(365 + (149 - this.goldNum.width * 0.6) / 2, 25)
        }

        if (res.diamond) {
            let diamondnum = addNumberUnit(PaoYa.DataCenter.user.diamond)
            PaoYa.DataCenter.user.diamond = res.diamond
            this.diamondNum.text = diamondnum
            this.diamondNum.font = `weaponNFontT`
            this.diamondNum.scale(0.6, 0.6)
            this.diamondNum.pos(600 + (149 - this.goldNum.width * 0.6) / 2, 25)
        }

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
    }

    onEnable() {
        // this.getComponent()
        if (WeaponHouseControl.ins.isGuide) {
            this.startGuide()
            PaoYa.Request.POST(`martial_change_new_hand`, { type: `weaponNew` })
        }

        this.light.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            this.getWareBtnSkin(`light`)
            this.lightNew.visible = false
            WeaponHouseControl.ins.showWareList(WeaponHouseControl.ins.lightList)
        })

        this.middle.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            this.getWareBtnSkin(`middle`)
            this.middleNew.visible = false
            WeaponHouseControl.ins.showWareList(WeaponHouseControl.ins.middleList)
        })

        this.large.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            this.getWareBtnSkin(`large`)
            this.largeNew.visible = false
            WeaponHouseControl.ins.showWareList(WeaponHouseControl.ins.heavyList)
        })

        this.benBack.on(Laya.Event.CLICK, this, () => {
            if (WeaponHouseControl.ins.isGuide) {
                return
            }
            SoundManager.ins.btn()
            WeaponHouseControl.ins.navigator.pop()
        })

        this.equip.on(Laya.Event.CLICK, this, () => {
            if (WeaponHouseControl.ins.isGuide) {
                return
            }
            SoundManager.ins.btn()
            WeaponHouseControl.ins.chargeWeapon()
        })

        this.upGrade.on(Laya.Event.CLICK, this, () => {
            if (WeaponHouseControl.ins.isGuide) {
                return
            }
            WeaponHouseControl.ins.upgradeWeapon()
        })

        this.Wp_1.font = `weaponDFont`
        this.Wp_2.font = `weaponDFont`
        this.Wp_3.font = `weaponDFont`
        this.Wp_4.font = `weaponDFont`
        this.Wp_5.font = `weaponDFont`
    }

    getWareBtnSkin(name) {
        let arr = [`light`, `middle`, `large`]
        arr.forEach(element => {
            this[element].skin = `remote/weaponhouse/14.png`
        });
        this[name].skin = `remote/weaponhouse/13.png`
    }

    startGuide() {
        const Sprite = Laya.Sprite;

        // 绘制底图
        let gameContainer = new Sprite();
        gameContainer.size(1634, 750)
        gameContainer.pos(-150, 0)
        gameContainer.mouseEnabled = true;
        Laya.stage.addChild(gameContainer);

        // 引导所在容器
        let guideContainer = new Sprite();
        Laya.stage.addChild(guideContainer);
        guideContainer.cacheAs = "bitmap";

        // 绘制遮罩区，含透明度，可见游戏背景
        let maskArea = new Sprite();
        guideContainer.addChild(maskArea);
        maskArea.alpha = 0.5;
        maskArea.graphics.drawRect(0, 0, 1634, 750, "#000");
        console.log(13465)
        // 绘制一个圆形区域，利用叠加模式，从遮罩区域抠出可交互区
        let interactionArea = new Sprite();
        guideContainer.addChild(interactionArea);
        // 设置叠加模式
        interactionArea.blendMode = "destination-out";

        // 设置点击区域
        let hitArea = new Laya.HitArea();
        hitArea.hit.drawRect(-150 + Global.AdaptiveWidth, 0, 1634, 750, "#000");
        guideContainer.hitArea = hitArea;
        guideContainer.mouseEnabled = true;

        this.equip.x = this.equip.x + Global.AdaptiveWidth
        this.equip.visible = true
        Laya.stage.addChild(this.equip);
        this.equipTips.x = this.equipTips.x + Global.AdaptiveWidth
        this.equipTips.visible = true
        Laya.stage.addChild(this.equipTips);
        //第一步装备
        this.equip.on(Laya.Event.CLICK, this, () => {
            this.equip.x = this.equip.x - Global.AdaptiveWidth
            this.addChild(this.equip)
            Laya.stage.removeChild(this.equip);
            Laya.stage.removeChild(this.equipTips);
            SoundManager.ins.btn()
            WeaponHouseControl.ins.chargeWeapon()

            this.upGrade.x = this.upGrade.x + Global.AdaptiveWidth
            this.upGrade.visible = true
            Laya.stage.addChild(this.upGrade);
            this.upGradeTips.x = this.upGradeTips.x + Global.AdaptiveWidth
            this.upGradeTips.visible = true
            Laya.stage.addChild(this.upGradeTips);
            //第二步升级
            this.upGrade.on(Laya.Event.CLICK, this, () => {
                this.upGrade.x = this.upGrade.x - Global.AdaptiveWidth
                this.addChild(this.upGrade)
                Laya.stage.removeChild(this.upGrade);
                Laya.stage.removeChild(this.upGradeTips);
                WeaponHouseControl.ins.upgradeWeapon()

                this.benBack.x = this.benBack.x + Global.AdaptiveWidth
                this.benBack.visible = true
                Laya.stage.addChild(this.benBack);
                this.benBackTips.x = this.benBackTips.x + Global.AdaptiveWidth
                this.benBackTips.visible = true
                Laya.stage.addChild(this.benBackTips);
                //第三步 返回
                this.benBack.on(Laya.Event.CLICK, this, () => {
                    Laya.stage.removeChild(guideContainer);
                    Laya.stage.removeChild(gameContainer);
                    Laya.stage.removeChild(this.benBack);
                    Laya.stage.removeChild(this.benBackTips);
                    WeaponHouseControl.ins.isGuide = false
                    SoundManager.ins.btn()
                    WeaponHouseControl.ins.navigator.pop()
                })
            })
        })

        // gameContainer.on(Laya.Event.CLICK, this, () => {
        //     Laya.stage.removeChild(this.upGrade);
        //     Laya.stage.removeChild(this.upGradeTips);
        //     Laya.stage.removeChild(gameContainer);
        // })
    }

    onDisable() {

    }
}