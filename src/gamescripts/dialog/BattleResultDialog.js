import HomeControl from "../../scripts/common/HomeControl";
import SoundManager from "../SoundManager";
import HeroConfig from "../config/HeroConfig";
import Cross from "../prefab/Cross";
export default class BattleResultDialog extends PaoYa.Dialog {
    constructor() {
        super();
    }
    onAwake() {
        console.log(this.params);
        this.autoDestroyAtClosed = true;
        let result = this.params.result;
        this.result = result;
        if (result == -1) {
            this.spPanel.texture = "remote/pass_result/imgLose.png";
            this.spIcon.texture = `remote/pass_result/lose.png`;
        } else {
            this.spPanel.texture = "remote/pass_result/imgWin.png";
        }
        this.lblPrize.text = this.params.diamond;
        this.spBtn.on(Laya.Event.CLICK, this, this.matchHandler);
        this.btnBack.on(Laya.Event.CLICK, this, this.backHandler);
        this.btnHeroHouse.on(Laya.Event.CLICK, this, this.goHeroHouse);
        this.fillInfo(this.params); //补全双方信息
        PaoYa.DataCenter.user.ladderName = HeroConfig.ladderArr[this.params.ladder];
        this.addBanners();
    }
    addBanners() {
        let crossPromise = new Promise((resolve, reject) => {
            Laya.loader.create('gamescenes/prefab/Cross.json', Laya.Handler.create(this, (json) => {
                // console.log(json);
                if (json instanceof Laya.Prefab) {
                    resolve(json.json)
                } else {
                    resolve(json);
                }

            }))
        });
        crossPromise.then((json) => {
            this.initCrossIcon(json)
        })
    }
    initCrossIcon(json) {
        let posArr=[{x:0+120,y:241},{x:0+120,y:541},{x:1334-120,y:241},{x:1334-120,y:541}]
        let crossInfo = PaoYa.Utils.selectRandom(HeroConfig.crossIcons, 4);
        for (let i = 0; i < 4; i++) {
            let crossView = new Laya.Prefab();
            crossView.json = json;
            this.crossView = crossView;
            let view = Laya.Pool.getItemByCreateFun('CrossView', crossView.create, crossView);
            let crossViewComp = view.getComponent(Cross);
            crossViewComp.params = crossInfo[i];
            crossViewComp.params.ani = true;
            view.pos(posArr[i].x,posArr[i].y);
            this.addChild(view);

        }
    }
    fillInfo(params) {
        this.selfName.text = params.nickName;
        this.otherName.text = params.robotNickName;
        this.selfAvstar.texture = `local/common/hero_${params.roleId}.png`;
        this.otherAvstar.texture = `local/common/hero_${params.robotRoleId}.png`;
    }
    //
    goHeroHouse() {
        console.log("进入英雄库")
        this.close();
        PaoYa.navigator.popToRootScene();
        PaoYa.navigator.visibleScene.getComponent(HomeControl).goHerosHouse();
    }
    //重新匹配
    matchHandler() {
        console.log('重新匹配');
        SoundManager.ins.btn();
        this.close();
        PaoYa.navigator.popToScene("Grading");
        PaoYa.Request.POST("hero_match_game_start", {
            roleId: this.params.roleId
        }, (res) => {
            res.gameType = "battle";
            PaoYa.navigator.push('MatchView', res);
        })
    }
    backHandler() {
        SoundManager.ins.btn();
        this.close();
        PaoYa.navigator.popToRootScene();
    }
}