import WeaponBar from "../prefab/WeaponBar";

export default class AdventDialog extends PaoYa.Dialog{
    constructor(){
        super();
        this.adventType=[{
            type:1,
            target:`击杀2个匪徒`,
            detail:`远处一落魄女子抱着包袱跌跌撞撞地冲你跑来，后面跟着一群拿到的韩非，那女子向你喊到:"救命啊！路上偶遇狂徒，不胜其扰，恳请大侠救救小女子"`,
            agreeText:`放开那个女孩`,
            rejectText:`多一事不如少一事`
        },{
            type:2,
            target:`尽可能地打败守擂人`,
            detail:`城外擂台边人头攒动，原是告示牌上新张贴了一张英雄榜。因这次守擂之人蝉联了四次擂主之位，奖励史无前例的丰厚。很多习武之人都跃跃欲试，要不去看看？`,
            agreeText:`狭路相逢勇者胜`,
            rejectText:`小命要紧溜了溜了`
        }]
    }
    onAwake(){
        this.autoDestroyAtClosed=true;
        let _this=this;
        this.params={
            "gold":100,
            "diamond":100,
            "weaponList":[
                {"exp":0,"num":0,"skills":[{"skillCd":0.0,"skillConfig":{"hp":50},"skillDesc":"生命+50 ","skillId":75,"skillLevel":1,"skillName":"健康","skillProb":100,"skillType":0,"skillUnlock":0,"status":0},{"skillCd":0.0,"skillConfig":{"addRecoverHp":20},"skillDesc":"每5秒自动恢复20点生命","skillId":79,"skillLevel":1,"skillName":"萃精","skillProb":100,"skillType":0,"skillUnlock":0,"status":0}],"upgradeCost":150,"weaponAttack":44.0,"weaponCd":2.0,"weaponConsume":32.0,"weaponDownConsume":0,"weaponDurable":12,"weaponIcon":"羊角做的匕首，最大限度地保留了羊角的形状，兼顾了实用性和观赏性。","weaponId":"d004_2","weaponLevel":1,"weaponName":"羊角匕首","weaponPrice":4000,"weaponSalePrice":800,"weaponSkills":"75,79","weaponStar":2,"weaponTopLevel":10,"weaponType":1,"weaponUpAttack":0,"weaponUpDurable":0}
            ],
            "dailyTaskStatus":1,
            "weaponNew":0,
            "refinerNew":0,
            "roleNew":0
        }
        let type=1;
        let advent=this.findAdventByType(type);
        let lbls=this.boxDetail._children;
        lbls[0].text=advent.target;
        lbls[1].text=advent.detail;
        this.initFont(advent);
        let weaponBarPromise=new Promise((resolve,reject)=>{
            Laya.loader.create('gamescenes/prefab/weaponBar.json',Laya.Handler.create(this,(json)=>{
                resolve(json);
            }))
        })
        let rewardPromise=new Promise((resolve,reject)=>{
            Laya.loader.create('gamescenes/prefab/Reward.json',Laya.Handler.create(this,(json)=>{
                resolve(json);
            }))
        })
        Promise.all([weaponBarPromise,rewardPromise]).then(jsons=>{
            _this.initReward(jsons);
        })
        this.on(Laya.Event.CLICK,this,this.clickHandler);
       /*  this.btnAgree.on(Laya.Event.CLICK,this,agreeHandler);
        this.btnReject.on(Laya.Event.CLICK,this,rejectHandler); */
    }
    clickHandler(e){
        switch(e.target.name){
            case `btnAgree`:
                this.agreeHandler();
                break;
            case `btnReject`:
                this.rejectHandler();
                break;
        }
    }
    initReward(jsons){
        let weaponList=this.params.weaponList;
        let len=weaponList.length;
        for(let i=0;i<len;i++){  
            let weaponView=new Laya.Prefab();  
            weaponView.json=jsons[0];
            let view=Laya.Pool.getItemByCreateFun('WeaponView',weaponView.create,weaponView);
            let weaponBarsComp=view.getComponent(WeaponBar);
            weaponBarsComp.params=weaponList[i];
            view.scale(0.6,0.6);
            view.off(Laya.Event.CLICK, weaponBarsComp) 
            this.hboxReward.addChild(view);         
        } 
        if(this.params.diamond){
           let diamondView=this.createRewardBox(jsons[1]);
           console.log(diamondView.getChildByName("lblNum").text)
           diamondView.getChildByName(`lblNum`).scale(0.4,0.4);
           diamondView.getChildByName(`lblNum`).text=`× ${this.params.diamond}`;
           diamondView.getChildByName(`lblNum`).font=`weaponNFontT`;
           this.hboxReward.addChild(diamondView);
        }
        if(this.params.gold){
           let goldView=this.createRewardBox(jsons[1]);
           goldView.getChildByName('lblNum').scale(0.4,0.4);
           goldView.getChildByName('lblNum').text=`× ${this.params.gold}`;
           goldView.getChildByName('lblNum').font=`weaponNFontT`;
           goldView.getChildByName(`spReward`).texture=`local/common/icon.png`;
           this.hboxReward.addChild(goldView);
        }
    }
    createRewardBox(json){
        let rewardView=new Laya.Prefab();
        rewardView.json=json;
        let view=Laya.Pool.getItemByCreateFun(`RewardView`,rewardView.create,rewardView);
        return view;
    }
    initFont(advent){
        let len=this.boxLbls._children.length;
        for(let i=0;i<len;i++){
            this.boxLbls._children[i].font=`adventure`;
        }
        this.lblAgree.text=advent.agreeText;
        this.lblReject.text=advent.rejectText;
        this.lblAgree.font=`adventure`;
        this.lblReject.font=`adventure`;
    }
    findAdventByType(type){
       return this.adventType.filter((item)=>{
            return item.type==type
        })[0]
    }
    agreeHandler(){
      console.log(`进入奇遇`)
    }
    rejectHandler(){
      console.log(`少一事`)
    }
}
