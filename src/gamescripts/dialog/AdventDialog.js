import WeaponBar from "../prefab/WeaponBar";
import HomeControl from "../../scripts/common/HomeControl";
import AlertDialog from "./AlertDialog";

export default class AdventDialog extends PaoYa.Dialog {
    constructor() {
        super();
       
    }
    onAwake() {
        this.autoDestroyAtClosed = true;
        let _this = this;
        this.resultParams=JSON.parse(JSON.stringify(this.params));
        if(this.params.encounter){
            this.params=this.params.encounter;
        }  
        console.log(this.params)
        let type = this.params.type;
        this.spRole.texture=`remote/guide/${this.params.dress}.png`;
        if(this.params.dress==`npc_3`){
            this.spRole.y=177
        }
        this.adventType = [{
            type: 1,
            target: `击杀${this.params.num}个匪徒`,
            detail: `远处一落魄女子抱着包袱跌跌撞撞地冲你跑来，后面跟着一群拿到的韩非，那女子向你喊到:"救命啊！路上偶遇狂徒，不胜其扰，恳请大侠救救小女子"`,
            agreeText: `放开那个女孩`,
            rejectText: `多一事不如少一事`
        }, {
            type: 2,
            target: `尽可能地打败守擂人`,
            detail: `城外擂台边人头攒动，原是告示牌上新张贴了一张英雄榜。因这次守擂之人蝉联了四次擂主之位，奖励史无前例的丰厚。很多习武之人都跃跃欲试，要不去看看？`,
            agreeText: `狭路相逢勇者胜`,
            rejectText: `小命要紧溜了溜了`
        }]
        let advent = this.findAdventByType(type);
        let lbls = this.boxDetail._children;
        lbls[0].text = advent.target;
        lbls[1].text = advent.detail;
        this.initFont(advent);
        let weaponBarPromise = new Promise((resolve, reject) => {
            Laya.loader.create('gamescenes/prefab/WeaponBar.json', Laya.Handler.create(this, (json) => {
               // console.log(json);
                if(json instanceof Laya.Prefab){
                    resolve(json.json)
                }else{
                    resolve(json);
                }
                
            }))
        })
        let rewardPromise = new Promise((resolve, reject) => {
            Laya.loader.create('gamescenes/prefab/Reward.json', Laya.Handler.create(this, (json) => {
                resolve(json);
            }))
        })
        Promise.all([weaponBarPromise, rewardPromise]).then(jsons => {
            _this.initReward(jsons);
        })
        this.on(Laya.Event.CLICK, this, this.clickHandler);
        /*  this.btnAgree.on(Laya.Event.CLICK,this,agreeHandler);
         this.btnReject.on(Laya.Event.CLICK,this,rejectHandler); */
    }
    clickHandler(e) {
        switch (e.target.name) {
            case `btnAgree`:
                this.agreeHandler();
                break;
            case `btnReject`:
                this.rejectHandler();
                break;
            case `closeT`:
                this.hangUp();
                break;
        }
    }
    hangUp(){
        this.close();
        if(PaoYa.navigator.scenes.length>1){
            PaoYa.navigator.popup('/dialog/PassResultDialog', this.resultParams)
        }
    }
    initReward(jsons) {
      //  console.log(jsons)
        let weaponList = this.params.weaponList;
        let len = weaponList.length;
        for (let i = 0; i < len; i++) {
            let weaponView = new Laya.Prefab();
            weaponView.json = jsons[0];
            this.weaponView=weaponView;
            let view = Laya.Pool.getItemByCreateFun('WeaponView', weaponView.create, weaponView);
            let weaponBarsComp = view.getComponent(WeaponBar);
            weaponBarsComp.params = weaponList[i];
            view.scale(0.6, 0.6);
            view.off(Laya.Event.CLICK, weaponBarsComp)
            this.hboxReward.addChild(view);
        }
        if (this.params.diamond) {
            let diamondView = this.createRewardBox(jsons[1]);
            console.log(diamondView.getChildByName("lblNum").text)
            diamondView.getChildByName(`lblNum`).scale(0.4, 0.4);
            diamondView.getChildByName(`lblNum`).text = `× ${this.params.diamond}`;
            diamondView.getChildByName(`lblNum`).font = `weaponNFontT`;
            this.hboxReward.addChild(diamondView);
        }
        if (this.params.gold) {
            let goldView = this.createRewardBox(jsons[1]);
            goldView.getChildByName('lblNum').scale(0.4, 0.4);
            goldView.getChildByName('lblNum').text = `× ${this.params.gold}`;
            goldView.getChildByName('lblNum').font = `weaponNFontT`;
            goldView.getChildByName(`spReward`).texture = `local/common/icon.png`;
            this.hboxReward.addChild(goldView);
        }
    }
    createRewardBox(json) {
        let rewardView = new Laya.Prefab();
        rewardView.json = json;
        let view = Laya.Pool.getItemByCreateFun(`RewardView`, rewardView.create, rewardView);
        return view;
    }
    initFont(advent) {
        let len = this.boxLbls._children.length;
        for (let i = 0; i < len; i++) {
            this.boxLbls._children[i].font = `adventure`;
        }
        this.lblAgree.text = advent.agreeText;
        this.lblReject.text = advent.rejectText;
        this.lblAgree.font = `adventure`;
        this.lblReject.font = `adventure`;
    }
    findAdventByType(type) {
        return this.adventType.filter((item) => {
            return item.type == type
        })[0]
    }
    agreeHandler() {
        let _this=this;
        console.log(`进入奇遇`)
        PaoYa.Request.POST("hero_game_start", {
            stageId: this.params.id
        }, (res) => {
            // 绘制遮罩区，含透明度，
            if(PaoYa.navigator.scenes.length>1){
                let maskArea = new Laya.Sprite();
                maskArea.alpha = 0.5;
                maskArea.graphics.drawRect(0, 0, Laya.Browser.width, Laya.Browser.height, "#000");
                // maskArea.pos(-150,0);
                maskArea.mouseEnabled = true;
                maskArea.zOrder = 2000;
                Laya.stage.addChild(maskArea);
                let tween = new Laya.Tween();
                tween.to(maskArea, {
                    alpha: 1
                }, 600, null, Laya.Handler.create(this, () => {
                    res.gameType = "adventure";
                    PaoYa.navigator.replace("GameView", res);
                    this.close();
                    tween.clear();
                    Laya.stage.removeChild(maskArea);
                }));
            }else{
                this.close();
              /*  delete `gamescenes/prefab/WeaponBar.json` */
           /*    this.weaponView=null; */
                res.gameType = 'adventure';
                PaoYa.navigator.push("GameView", res);
            }
          
        },(msg)=>{
            var errorDialog = new AlertDialog({
                title: `温馨提示`,
                message: msg,
                confirmHandler:()=>{
                     _this.close();
                     PaoYa.navigator.popToRootScene();
                     PaoYa.navigator.visibleScene.getComponent(HomeControl).goRefiner();
                 }
            });
            errorDialog.popup(); 
        })
    }
    rejectHandler() {
        console.log(`放弃奇遇`)
        PaoYa.Request.POST(`martial_encounter_cancel`,{},()=>{
            this.close();
            PaoYa.NotificationCenter.postNotification(`adventCancel`)
            if(PaoYa.navigator.scenes.length>1){
                PaoYa.navigator.popup('/dialog/PassResultDialog', this.resultParams)
            }       
        })
    }
}