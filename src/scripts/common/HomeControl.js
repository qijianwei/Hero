import HeroConfig from "../../gamescripts/config/HeroConfig";
import AlertDialog from "../../gamescripts/dialog/AlertDialog";
import SoundManager from "../../gamescripts/SoundManager";
import GameGuideData from "../../gamescripts/gameGuide/GameGuideData";

import {
    Global
} from "./tool/Global";
import SpeakMan from "../../gamescripts/gameGuide/SpeakMan";
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
        this.rolesName = ['', '小虾米', '龙女', '过儿', '乔帮主'];
        let name = PaoYa.DataCenter.user.defaultRoleId;
        let ladder = PaoYa.DataCenter.user.ladder;

        let player = new Laya.Skeleton();
        player.load(`spine/hero/hero_${name}.sk`, Laya.Handler.create(this, (res) => {
            player.play('stand', true);
        }))
        player.pos(371, 590);
        player.scale(1.5, 1.5)
        this.owner.addChild(player);
        this.player = player;

        this.lblName.text = PaoYa.DataCenter.user.nickname;
        this.lblLadder.font = "weaponNFontT";
        this.lblLadder.scale(0.8, 0.8);
        this.lblLadder.text = HeroConfig.ladderArr[ladder];
        PaoYa.DataCenter.user.ladderName = HeroConfig.ladderArr[ladder];
        this.owner.imgAvstar.skin = PaoYa.DataCenter.user.avstar;
        this.onNotification('roleIdChanged', this, roleId => {
            if (name != roleId) {
                name = roleId;
                PaoYa.DataCenter.user.defaultRoleId = roleId;
                let templet = HeroConfig.spineMap[`hero_` + name].templet;
                this.player.init(templet, 0);
                if (!PaoYa.DataCenter.userInfoAuth) { //未授权换装 修改名字和默认头像
                    this.owner.imgAvstar.skin = `local/common/avstar${roleId}.png`;
                    this.lblName.text = this.rolesName[roleId];
                }
            }
        });
        this.onNotification('AuthOK', this, () => {
            this.lblName.text = PaoYa.DataCenter.user.nickname;
            this.owner.imgAvstar.skin = PaoYa.DataCenter.user.avstar;
        })
        this.adventBox = new Laya.Box();
        this.adventBox.size(152, 145);
        this.adventBox.pos(500, 500)
        this.adventBox.visible = true;
        this.owner.addChild(this.adventBox);
        let spIcon = new Laya.Sprite();
        this.spIcon = spIcon;
        this.adventBox.addChild(spIcon);
        let adventAni = new Laya.Animation();
        adventAni.pos(this.adventBox.width / 2, this.adventBox.height / 2)
        this.adventAni = adventAni;
        this.adventBox.addChild(this.adventAni);
        this.originAdventType = 0;
        this.adventAni.blendMode = `lighter`;

        this.adventBox.on(Laya.Event.CLICK, this, this.adventIconClick);
        this.onNotification('adventCancel', this, () => {
            if (PaoYa.navigator.scenes.length == 1) {
                this.onAppear();
            }
        });
        this.onNotification('adventComplete', this, () => {
            if (PaoYa.navigator.scenes.length == 1) {
                this.onAppear();
            }
        });
        /*  Laya.loader.create('gamescenes/prefab/WeaponBar.json', Laya.Handler.create(this, (json) => {
             console.log(json)
             Laya.loader.create('gamescenes/prefab/WeaponBar.json', Laya.Handler.create(this, (json) => {
                 console.log(json)
             }))
         })) */
    }
    onEnable() {
        this.getLock(179, 72, `lock2`)

        this.owner.lock.visible = PaoYa.DataCenter.user.current > 5 ? false : true
        if (this.owner.lock.visible) {
            this.getLock(179, 72, `lock`)
        }

        if (PaoYa.DataCenter.user.is_first_game == 1) {
            this.navigator.push('GameGuide', GameGuideData);
        }
        // this.guideF(`btn3`)
        this.showRankList();
    }
    onAppear() {
        // SoundManager.ins.homeBg();

        if (this.first) {
            this.player.play('stand', true);
        } else {
            this.first = true;
        }
        this.lblLadder.text = PaoYa.DataCenter.user.ladderName;
        this.owner.taskDot.visible = PaoYa.DataCenter.user.dailyTaskStatus ? true : false;
        this.owner.signDot.visible = PaoYa.DataCenter.user.loginBonusStatus ? true : false;
        this.GET(`martial_encounter_detail`, {}, (res) => {
            this.adventParams = res;
            if (JSON.stringify(res) != '{}') {
                this.adventBox.visible = true;
                if (this.originAdventType != res.type) {
                    this.originAdventType = res.type;
                    this.spIcon.texture = `remote/adventure/advent${res.type}.png`
                    this.adventAni.loadAnimation(`gamescenes/animations/advent_effect${res.type}.ani`, Laya.Handler.create(this, () => {
                        this.adventAni.play(0, true);
                    }))
                } else {
                    this.adventAni.play(0, true);
                }
            } else {
                this.adventBox.visible = false;
            }
        })
    }
    adventIconClick() {
        let res = this.adventParams;
        switch (this.originAdventType) {
            case 1:
            case 2:
                this.navigator.popup(`/dialog/AdventDialog`, res)
                break;
            case 3:
                this.navigator.popup(`adventure/ChangeWp`, res)
                break;
            case 4:
                this.navigator.popup(`adventure/GetAward`, res)
                break;
            case 5:
                if (res.time * 1000 > 0) {
                    if (res.time * 1000 - new Date().valueOf() < 0) {
                        res.state = `get`;
                        this.navigator.popup(`/dialog/AdventResultDialog5`, res)
                    } else {
                        res.state = `wait`
                        this.navigator.popup(`/dialog/AdventResultDialog5`, res)
                    }
                } else {
                    this.navigator.popup(`/dialog/AdventDialog5`, res)
                }

                break;
            case 6:
                this.navigator.popup(`adventure/BuyWp`, res)

                break;
        }
        res = null;
    }
    onDisappear() {
        this.player._templet && this.player.stop();
        this.adventAni && this.adventAni.stop();
    }
    onThrottleClick(e) {
        if (Global.isShowGrading) {
            return
        }
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
                py.showToast({
                    title: '敬请期待'
                })
                console.log("决战")
                break;
            //排行榜
            case "rank":
                let _this = this;
                SoundManager.ins.btn()
                PaoYa.AuthManager.auth({
                    scope: PaoYa.AuthManager.scope.userInfo,
                    isNecessary: true, //是否强制授权
                    next() {
                        _this.GET("ranking_list", {
                            type: 1
                        }, res => {
                            //console.log(res)
                            if (!res) {
                                return
                            }
                            _this.navigator.popup("common/Rank", res);
                        })
                        console.log("进入排行榜")
                    },
                });
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
                // this.GET(`martial_encounter_detail`, {}, (res) => {
                //     this.navigator.popup('adventure/ChangeWp', res);
                // })
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
        if (this.firstGoGame) {
            this.firstGoGame = false;
            this.step4();
        }
        let _this = this;
        this.POST("hero_game_start", {}, (res) => {
            res.gameType = `pass`;
            Global.gameStartStat(res.stageId)
            this.navigator.push("GameView", res);
        }, (msg, code) => {
            let errorDialog;
            if (code == 3018) { //通关
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
        this.firstGoGame = true;
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
        /*     this.spriteBg.on(Laya.Event.CLICK, this, (e) => {
                guideStep += 1;
                switch (guideStep) {
                    case 4:
                        e.stopPropagation();
                        this.step4();
                        break;
                }
                console.log(`接收到点击`)
            }) */
        nextLabel.on(Laya.Event.CLICK, this, this.nextTick);
    }
    step1() {
        console.log(`---第1步----`)
        selfSpeakMan.visible = false;
        otherSpeakMan.visible = true;
        otherSpeakManComp.showWord(`救命！救命啊！`);
    }
    step2() {
        console.log(`---第2步----`)
        selfSpeakMan.visible = true;
        otherSpeakMan.visible = false;
        selfSpeakManComp.showWord(`大白天的谁在喊救命？去看看再说。`);

    }
    step3() {
        console.log(`---第3步----`)
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
        console.log(`---第4步----`)
        if (this.aniFinger) {
            this.aniFinger.visible = false;
            this.aniFinger.stop();
        }
        interactionArea.graphics.clear();
        guideContainer.removeSelf();
        /*   this.aniFinger.destroy(); */
        Global.dataPoints('点击开始游戏')
        // this.goPassGame();
        console.error(`------首页新手引导删除------`)
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
        this.owner.addChild(gameContainer);

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
            this.owner.removeChild(guideContainer);
            this.owner.removeChild(gameContainer);
            this.aniFinger.visible = false
            // this.owner.removeChild(this.aniFinger);
        })

        // 引导所在容器
        let guideContainer = new Laya.Sprite();
        guideContainer.zOrder = 1000;
        this.owner.addChild(guideContainer);
        guideContainer.cacheAs = 'bitmap';

        // 绘制遮罩区，含透明度，可见游戏背景
        let maskArea = new Sprite();
        guideContainer.addChild(maskArea);
        maskArea.alpha = 0.5;
        maskArea.graphics.drawRect(0, 0, 1634, 750, "#000");
        maskArea.pos(-150, 0);

        // 绘制一个圆形区域，利用叠加模式，从遮罩区域抠出可交互区
        let interactionArea = new Sprite();
        guideContainer.addChild(interactionArea);
        // 设置叠加模式
        interactionArea.blendMode = "destination-out";

        // 设置点击区域
        let hitArea = new Laya.HitArea();
        hitArea.hit.drawRect(-150, 0, 1634, 750, "#000");
        guideContainer.hitArea = hitArea;
        guideContainer.mouseEnabled = true;


        this.aniFinger.visible = true;
        this.aniFinger.pos(step.x + step.width / 2 - 150, step.height / 2 + step.y);
        this.aniFinger.play(0, true);

        hitArea.unHit.clear();
        hitArea.unHit.drawCircle(step.x + step.width / 2 - 150, step.height / 2 + step.y, 65, "#000000");

        interactionArea.graphics.clear();
        interactionArea.graphics.drawCircle(step.width / 2 + step.x - 150, step.height / 2 + step.y, 65, "#000000");
    }

    lockBattle() {
        this.owner.tips.visible = true

        Laya.Tween.to(this.owner.tips, { y: this.owner.tips.y - 100, alpha: 0 }, 1500, Laya.Ease.quadInOut, Laya.Handler.create(this, () => {
            this.lockAni.play(0, false)
            this.owner.tips.visible = false
            Global.isShowGrading = false
        }))
    }

    getLock(x, y, name) {
        let dragonAni = new Laya.Animation();
        this.owner[name].addChild(dragonAni)
        dragonAni.pos(x, y)
        dragonAni.loadAnimation(`gamescenes/animations/lock.ani`, Laya.Handler.create(this, (ani) => {
            this[`${name}Ani`] = dragonAni
        }), `res/atlas/remote/lock.atlas`)
    }

    onDisappear() { }

    onDisable() { }
    onDestroy() { }
}