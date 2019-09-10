import HeroConfig from "../../gamescripts/config/HeroConfig";
import AlertDialog from "../../gamescripts/dialog/AlertDialog";
import SoundManager from "../../gamescripts/SoundManager";
import GameGuideData from "../../gamescripts/gameGuide/GameGuideData";

import { Global } from "./tool/Global";
import SpeakMan from "../../gamescripts/gameGuide/SpeakMan";
import PreOpenManager from "../../gamescripts/preOpen/preOpenManager";
let guideContainer,
    maskArea,
    interactionArea,
    hitArea,
    selfSpeakMan,
    otherSpeakMan,
    selfSpeakManComp,
    otherSpeakManComp,
    nextLabel,
    guideStep = 0;
export default class HomeControl extends PaoYa.Component {
    /** @prop {name:lblLadder,tips:"用户段位",type:Node} */
    /** @prop {name:lblName,tips:"用户名字",type:Node} */
    /** @prop {name:selfSpeakMan,tips:"我方解说预制体对象",type:Prefab}*/
    /** @prop {name:otherSpeakMan,tips:"对方解说预制体对象",type:Prefab}*/
    /** @prop {name:aniFinger,tips:"手指动画",type:node}*/
    /** @prop {name:spriteBg,tips:"游戏底图",type:node}*/
    onAwake() {
        HomeControl.ins = this
        let name = PaoYa.DataCenter.user.defaultRoleId;
        let ladder = PaoYa.DataCenter.user.ladder;

        let player = new Laya.Skeleton();
        player.load(`spine/hero/hero_${name}.sk`, Laya.Handler.create(this, (res) => {
            player.play('stand', true);
        }))
        player.pos(371, 570);
        player.scale(1.5, 1.5)
        this.owner.addChild(player);
        this.player = player;

        this.lblName.text = PaoYa.DataCenter.user.nickname;
        this.lblLadder.font = "weaponNFontT";
        this.lblLadder.scale(0.8, 0.8);
        this.lblLadder.text = HeroConfig.ladderArr[ladder];

        this.owner.imgAvstar.skin = PaoYa.DataCenter.user.avstar;
        this.onNotification('roleIdChanged', this, roleId => {
            if (name != roleId) {
                name = roleId;
                let templet = HeroConfig.spineMap[`hero_` + name].templet;
                this.player.init(templet, 0);
            }
        });
    }
    onEnable() {
        if (PaoYa.DataCenter.user.is_first_game == 1) {
            this.navigator.push('GameGuide', GameGuideData);
        }
        // this.guideF(`btn2`)
        this.showRankList();
    }
    onAppear() {
        SoundManager.ins.homeBg();
        if (this.first) {
            this.player.play('stand', true);
        } else {
            this.first = true;
        }
        this.owner.taskDot.visible = PaoYa.DataCenter.user.dailyTaskStatus ? true : false;
        this.owner.signDot.visible = PaoYa.DataCenter.user.loginBonusStatus ? true : false;
    }
    onDisappear() {
        this.player._templet && this.player.stop();
    }
    onClick(e) {
        if (e.target instanceof Laya.Button) {
            SoundManager.ins.btn();
        }
        switch (e.target.name) {
            //兵器库
            case "btnWeaponHouse":
                console.log("进入兵器库")
                this.goWeaponHouse()
                break;
            //兵器商店
            case "btnWeaponStore":
                console.log("进入兵器商店")
                this.POST("martial_shop_list", {
                    refresh: 0
                }, res => {
                    if (!res) {
                        return
                    }
                    //console.log(res)
                    this.POST("martial_user_weapon_list", {}, data => {
                        if (!data) {
                            return
                        }
                        let obj = {
                            buyList: res,
                            sellList: data
                        }
                        this.navigator.push("WeaponStore", obj);
                    })

                })
                break;
            //炼器
            case "btnRefiner":
                console.log("进入炼器")
                this.goRefiner();
                break;
            //兵器谱
            case "btnWeaponSpectrum":
                this.GET("martial_weapon_list", {}, res => {
                    //console.log(res)
                    if (!res) {
                        return
                    }
                    this.navigator.push("WeapList", res);
                })
                console.log("进入兵器谱")
                break;
            //英雄库
            case "btnHerosHouse":
                console.log("进入英雄库")
                this.goHerosHouse();
                break;

            //签到
            case "btnRegister":
                this.GET("martial_login_bonus_list", {}, res => {
                    //console.log(res)
                    if (!res) {
                        return
                    }
                    this.navigator.push("Sign", res);
                })
                console.log("打开签到")
                break;
            //抽奖转盘
            case "btnRoulette":
                this.navigator.push("Wheel");
                console.log("去抽奖")
                break;
            //开始游戏：
            case "btnStartGame":
                console.log("开始游戏请求的数据......")
                this.goPassGame();
                break;
            //华山论剑
            case "btnBattle":
                console.log("华山论剑")
                if (PaoYa.DataCenter.user.current <= 5) {
                    py.showToast({
                        title: '过5关解锁'
                    })
                    return;
                }
                this.GET("martial_role_list", {}, res => {
                    //console.log(res)
                    if (!res) {
                        return
                    }
                    this.navigator.push("Grading", res);
                })
                break;
            //决战紫禁城之巅
            case "btnBoss":
                if (PaoYa.DataCenter.user.current <= 10) {
                    py.showToast({
                        title: '过10关解锁'
                    })
                    return;
                }
                console.log("决战")
                break;
            //排行榜
            case "rank":
                this.GET("ranking_list", { type: 1 }, res => {
                    //console.log(res)
                    if (!res) {
                        return
                    }
                    this.navigator.popup("common/Rank", res);
                })
                console.log("进入排行榜")
                break;
            //玩法
            case "btnPlayRule":
                console.log("玩法介绍")
                break;
            //设置
            case "btnTask":
                this.GET("martial_task_list", {}, res => {
                    //console.log(res)
                    if (!res) {
                        return
                    }
                    this.navigator.popup("common/Task", res);
                })
                console.log("任务")
                break;

        }
    }
    goRefiner(num) {
        this.GET("martial_refiner_list", {}, res => {
            //console.log(res)
            if (!res) {
                return
            }
            let obj = {
                isGuide: num,
                detail: res
            }
            this.navigator.push("Refining", obj);
        })
    }
    goHerosHouse(num) {
        this.GET("martial_role_list", {}, res => {
            //console.log(res)
            if (!res) {
                return
            }
            let obj = {
                isGuide: num,
                detail: res
            }
            this.navigator.push("Swordsman", obj);
        })
    }
    goWeaponHouse(num) {
        this.POST("martial_user_weapon_list", {}, res => {
            //console.log(res)
            if (!res) {
                return
            }

            let obj = {
                isGuide: num,
                detail: num ? Global.wpGuide : res
            }
            this.navigator.push("WeaponHouse", obj);
        })
    }
    goPassGame() {
        let _this = this;
        this.POST("hero_game_start", {
            stageId: 1
        }, (res) => {
            res.gameType = 'pass';
            this.navigator.push("GameView", res);
        }, (msg, code) => {
            let errorDialog;
            if (code == 3018) {//通关
                errorDialog = new AlertDialog({
                    title: "",
                    message: msg
                })
            } else {
                errorDialog = new AlertDialog({
                    title: "",
                    message: msg,
                    confirmText: '前往',
                    confirmHandler: function () {
                        _this.goRefiner()
                    }
                })
            }
            errorDialog.popup();
        })
    }
    setGuide() {
        //引导所在容器
        guideContainer = new Laya.Sprite();
        guideContainer.zOrder = 1000;
        this.owner.addChild(guideContainer);
        guideContainer.cacheAs = 'bitmap';

        // 绘制遮罩区，含透明度，
        maskArea = new Laya.Sprite();
        maskArea.alpha = 1;
        maskArea.graphics.drawRect(0, 0, 1634, 750, "#000");
        maskArea.pos(-150, 0);
        maskArea.mouseEnabled = true;
        //maskArea.zOrder=1000;
        guideContainer.addChild(maskArea);
        //透明度变化
        let tween = new Laya.Tween();
        tween.to(maskArea, {
            alpha: 0.5
        }, 2000, null, Laya.Handler.create(this, () => {

        }));
        //绘制可点击区域
        interactionArea = new Laya.Sprite();
        interactionArea.blendMode = 'destination-out';
        // interactionArea.zOrder=1001;
        guideContainer.addChild(interactionArea);


        //可点击区域
        hitArea = new Laya.HitArea();
        hitArea.hit.drawRect(0, 0, 1634, 750, '#000');
        guideContainer.hitArea = hitArea;
        guideContainer.mouseEnabled = true;

        nextLabel = new Laya.Label();
        nextLabel.text = '跳过';
        nextLabel.font = 'figureDetail';
        nextLabel.pos(1100, 30);
        nextLabel.name = 'next';
        nextLabel.mouseEnabled = true;
        console.log(nextLabel.width)
        guideContainer.addChild(nextLabel);

        selfSpeakMan = this.selfSpeakMan.create.call(this.selfSpeakMan);
        selfSpeakManComp = selfSpeakMan.getComponent(SpeakMan);
        selfSpeakManComp.showWord('阿嚏~~~刚。。刚才是做梦？');
        selfSpeakMan.y = 225;
        selfSpeakMan.zOrder = 1003;
        this.owner.addChild(selfSpeakMan);

        otherSpeakMan = this.otherSpeakMan.create.call(this.otherSpeakMan);
        otherSpeakManComp = otherSpeakMan.getComponent(SpeakMan);
        otherSpeakMan.pos(315, 225);
        otherSpeakMan.zOrder = 1003;
        this.owner.addChild(otherSpeakMan);
        otherSpeakManComp.modify(`陌生女子`);
        otherSpeakMan.visible = false;

        this.owner.on(Laya.Event.CLICK, this, (e) => {
            guideStep += 1;
            switch (guideStep) {
                case 1:
                case 2:
                case 3:
                    this['step' + guideStep]();
                    break;
            }
        })
        this.spriteBg.on(Laya.Event.CLICK, this, (e) => {
            guideStep += 1;
            switch (guideStep) {
                case 4:
                    e.stopPropagation();
                    this.step4();
                    break;
            }
            console.log(`接收到点击`)
        })
        nextLabel.on(Laya.Event.CLICK, this, this.nextTick);
    }
    step1() {
        selfSpeakMan.visible = false;
        otherSpeakMan.visible = true;
        otherSpeakManComp.showWord(`救命！救命啊！`);
    }
    step2() {
        selfSpeakMan.visible = true;
        otherSpeakMan.visible = false;
        selfSpeakManComp.showWord(`大白天的谁在喊救命？去看看再说。`);

    }
    step3() {
        nextLabel.visible = false;
        selfSpeakMan.visible = false;
        this.aniFinger.visible = true;
        this.aniFinger.play(0, true);
        interactionArea.graphics.clear();
        interactionArea.graphics.drawRect(730, 103, 370, 165, '#000');
        hitArea.unHit.clear();
        hitArea.unHit.drawRect(730, 103, 370, 165, '#000');
    }
    step4() {
        this.aniFinger.visible = false;
        this.aniFinger.stop();
        interactionArea.graphics.clear();
        guideContainer.removeSelf();
        /*   this.aniFinger.destroy(); */
        this.goPassGame();
    }
    nextTick(e) {
        e.stopPropagation();
        guideStep += 1;
        this['step' + guideStep]();
    }

    showRankList() {
        let rlist = PaoYa.DataCenter.user.list.slice(0, 3)

        this.owner.rankList.vScrollBarSkin = ""
        this.owner.rankList.renderHandler = new Laya.Handler(this, this.rankListItem);
        this.owner.rankList.array = rlist
    }

    rankListItem(cell, index) {
        cell.y = 108 * index
        let rankicon = cell.getChildByName(`rankicon`)
        let usericon = cell.getChildByName(`usericon`)
        /*    Laya.loader.load(cell.dataSource.member_avstar, Laya.Handler.create(this, res => {
               usericon.skin = cell.dataSource.member_avstar
           }))  */
        usericon.skin = cell.dataSource.member_avstar;
        //use
        rankicon.skin = `local/home/${index + 1}.png`
    }

    guideF(name) {
        const Sprite = Laya.Sprite;

        // 绘制底图
        let gameContainer = new Sprite();
        gameContainer.size(1634, 750)
        gameContainer.pos(-150, 0)
        gameContainer.mouseEnabled = true;
        Laya.stage.addChild(gameContainer);

        let step = null

        switch (name) {
            case `btn1`:
                step = this.owner.btnHerosHouse
                break;
            case `btn2`:
                step = this.owner.btnWeaponHouse
                break;
            case `btn3`:
                step = this.owner.btnRefiner
                break;
        }

        gameContainer.on(Laya.Event.CLICK, this, () => {
            switch (name) {
                case `btn1`:
                    this.goHerosHouse(1)
                    break;
                case `btn2`:
                    this.goWeaponHouse(1)
                    break;
                case `btn3`:
                    this.goRefiner(1)
                    break;
            }
            this.aniFinger.visible = false
            Laya.stage.removeChild(guideContainer);
            Laya.stage.removeChild(gameContainer);
            Laya.stage.removeChild(this.aniFinger);
        })

        // 引导所在容器
        let guideContainer = new Sprite();
        Laya.stage.addChild(guideContainer);
        guideContainer.cacheAs = "bitmap";

        // 绘制遮罩区，含透明度，可见游戏背景
        let maskArea = new Sprite();
        guideContainer.addChild(maskArea);
        maskArea.alpha = 0.5;
        maskArea.graphics.drawRect(-150 + Global.AdaptiveWidth, 0, 1634, 750, "#000");

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


        this.aniFinger.visible = true;
        this.aniFinger.pos(step.x + step.width / 2 - 150 + Global.AdaptiveWidth, step.height / 2 + step.y);
        this.aniFinger.play(0, true);
        Laya.stage.addChild(this.aniFinger);

        hitArea.unHit.clear();
        hitArea.unHit.drawCircle(step.x + step.width / 2 - 150 + Global.AdaptiveWidth, step.height / 2 + step.y, 65, "#000000");

        interactionArea.graphics.clear();
        interactionArea.graphics.drawCircle(step.width / 2 + step.x - 150 + Global.AdaptiveWidth, step.height / 2 + step.y, 65, "#000000");
    }

    onDisappear() { }

    onDisable() { }
    onDestroy() { }
}