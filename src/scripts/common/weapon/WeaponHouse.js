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

    changeHB(res) {
        this.goldNum.width = null

        if (res.gold || res.gold == 0) {
            PaoYa.DataCenter.user.gold = res.gold
            let goldnum = addNumberUnit(PaoYa.DataCenter.user.gold)
            this.goldNum.text = goldnum
            this.goldNum.font = `weaponNFontT`
            this.goldNum.scale(0.6, 0.6)
            this.goldNum.pos(365 + (149 - this.goldNum.width * 0.6) / 2, 25)
        }

        if (res.diamond || res.diamond == 0) {
            PaoYa.DataCenter.user.diamond = res.diamond
            let diamondnum = addNumberUnit(PaoYa.DataCenter.user.diamond)

            this.diamondNum.text = diamondnum
            this.diamondNum.font = `weaponNFontT`
            this.diamondNum.scale(0.6, 0.6)
            this.diamondNum.pos(600 + (149 - this.diamondNum.width * 0.6) / 2, 25)
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

        // this.light.on(Laya.Event.CLICK, this, () => {
        //     SoundManager.ins.btn()
        //     this.getWareBtnSkin(`light`)
        //     this.lightNew.visible = false
        //     WeaponHouseControl.ins.showWareList(WeaponHouseControl.ins.lightList)
        // })

        // this.middle.on(Laya.Event.CLICK, this, () => {
        //     SoundManager.ins.btn()
        //     this.getWareBtnSkin(`middle`)
        //     this.middleNew.visible = false
        //     WeaponHouseControl.ins.showWareList(WeaponHouseControl.ins.middleList)
        // })

        // this.large.on(Laya.Event.CLICK, this, () => {
        //     SoundManager.ins.btn()
        //     this.getWareBtnSkin(`large`)
        //     this.largeNew.visible = false
        //     WeaponHouseControl.ins.showWareList(WeaponHouseControl.ins.heavyList)
        // })

        // this.benBack.on(Laya.Event.CLICK, this, () => {
        //     if (WeaponHouseControl.ins.isGuide) {
        //         return
        //     }
        //     SoundManager.ins.btn()
        //     WeaponHouseControl.ins.navigator.pop()
        // })

        // this.equip.on(Laya.Event.CLICK, this, () => {
        //     if (WeaponHouseControl.ins.isGuide) {
        //         return
        //     }
        //     SoundManager.ins.btn()
        //     WeaponHouseControl.ins.chargeWeapon()
        // })

        // this.upGrade.on(Laya.Event.CLICK, this, () => {
        //     if (WeaponHouseControl.ins.isGuide) {
        //         return
        //     }
        //     WeaponHouseControl.ins.upgradeWeapon()
        // })

        this.Wp_1.font = `weaponDFont`
        this.Wp_2.font = `weaponDFont`
        this.Wp_3.font = `weaponDFont`
        this.Wp_4.font = `weaponDFont`
        this.Wp_5.font = `weaponDFont`
    }

    lisenClick(e) {
      
    }

    getWareBtnSkin(name) {
        let arr = [`light`, `middle`, `large`]
        arr.forEach(element => {
            this[element].skin = `remote/weaponhouse/14.png`
        });
        this[name].skin = `remote/weaponhouse/13.png`
    }

    startGuide() {
        Global.dataPoints('进入兵器引导')
        const Sprite = Laya.Sprite;

        // 绘制底图
        let gameContainer = new Sprite();
        gameContainer.size(1634, 750)
        gameContainer.pos(-150, 0)
        gameContainer.mouseEnabled = true;
        this.addChild(gameContainer);

        // 引导所在容器
        let guideContainer = new Sprite();
        this.addChild(guideContainer);
        guideContainer.cacheAs = "bitmap";
        guideContainer.zOrder = 10

        // 绘制遮罩区，含透明度，可见游戏背景
        let maskArea = new Sprite();
        guideContainer.addChild(maskArea);
        maskArea.alpha = 0.5;
        maskArea.graphics.drawRect(0, 0, 1634, 750, "#000");
        maskArea.zOrder = 10

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

        this.equip.visible = true
        this.equip.zOrder = 20
        this.equipTips.x = this.equipTips.x
        this.equipTips.visible = true
        this.equipTips.zOrder = 20
        //第一步装备
        this.equip.on(Laya.Event.CLICK, this, () => {
            this.equip.zOrder = 0
            this.equipTips.visible = false
            SoundManager.ins.btn()
            WeaponHouseControl.ins.chargeWeapon()
            Global.dataPoints('点击装备')
            this.upGrade.visible = true
            this.upGrade.zOrder = 20
            this.upGradeTips.x = this.upGradeTips.x
            this.upGradeTips.visible = true
            this.upGradeTips.zOrder = 20
            //第二步升级
            this.upGrade.on(Laya.Event.CLICK, this, () => {
                this.upGrade.zOrder = 0
                this.upGradeTips.visible = false
                WeaponHouseControl.ins.upgradeWeapon()
                Global.dataPoints('点击升级')
                this.benBack.visible = true
                this.benBack.zOrder = 20
                this.benBackTips.x = this.benBackTips.x
                this.benBackTips.visible = true
                this.benBackTips.zOrder = 20
                //第三步 返回
                this.benBack.on(Laya.Event.CLICK, this, () => {
                    Global.dataPoints('点击返回')
                    Laya.stage.removeChild(guideContainer);
                    Laya.stage.removeChild(gameContainer);
                    this.benBack.zOrder = 0
                    this.benBackTips.visible = false
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