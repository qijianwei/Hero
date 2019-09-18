import WeaponBar from "../prefab/WeaponBar";

export default class AdventResultDialog extends PaoYa.Dialog {
    constructor() {
        super();
    }
    onAwake() {
        this.autoDestroyAtClosed = true;
        this.params={
            result:-1,
            type:1,
            "gold":5600,
            "weaponList":[
                {"exp":0,"num":0,"skills":[{"skillCd":0.0,"skillConfig":{"freeze":5},"skillDesc":"冰冻对手5秒","skillId":59,"skillLevel":1,"skillName":"冰心","skillProb":12,"skillType":1,"skillUnlock":0,"status":0},
                {"skillCd":0.0,"skillConfig":{"hp":90},"skillDesc":"生命+90 ","skillId":76,"skillLevel":1,"skillName":"健硕","skillProb":100,"skillType":0,"skillUnlock":0,"status":0}
              ],
             "upgradeCost":150,
             "weaponAttack":98.0,
             "weaponCd":3.5,
             "weaponConsume":44.0,
             "weaponDownConsume":0,
             "weaponDurable":6,
             "weaponIcon":"来源不明。相传为北极万年冰晶所炼，通体泛蓝白色光辉，寒冰中暗藏杀机。",
             "weaponId":"z007_2",
             "weaponLevel":1,
             "weaponName":"寒冰剑",
             "weaponPrice":7500,
             "weaponSalePrice":1500,
             "weaponSkills":"59,76",
             "weaponStar":2,
             "weaponTopLevel":10,
             "weaponType":2,
             "weaponUpAttack":0,
             "weaponUpDurable":0
            },
             {"exp":0,"num":0,"skills":[{"skillCd":0.0,"skillConfig":{"way":"1-2"},"skillDesc":"向上中路各发出1件兵器","skillId":51,"skillLevel":1,"skillName":"剑舞","skillProb":12,"skillType":1,"skillUnlock":0,"status":0},{"skillCd":0.0,"skillConfig":{"critHarm":10,"critProb":3},"skillDesc":"暴击+3%，爆伤+10%","skillId":64,"skillLevel":1,"skillName":"灵敏","skillProb":100,"skillType":0,"skillUnlock":0,"status":0}],"upgradeCost":150,"weaponAttack":85.0,"weaponCd":3.3,"weaponConsume":51.0,"weaponDownConsume":0,"weaponDurable":12,"weaponIcon":"与君子剑大小长短，全无二致，具有极强的磁性，如果双剑放的距离较近，会自动吸在一起。","weaponId":"z010_2","weaponLevel":1,"weaponName":"淑女剑","weaponPrice":8000,"weaponSalePrice":1600,"weaponSkills":"51,64","weaponStar":2,"weaponTopLevel":10,"weaponType":2,"weaponUpAttack":0,"weaponUpDurable":0},
             {"exp":0,"num":0,"skills":[{"skillCd":0.0,"skillConfig":{"poison":"6-210"},"skillDesc":"使对手中剧毒，6秒损失210点生命","skillId":46,"skillLevel":1,"skillName":"奇毒","skillProb":18,"skillType":1,"skillUnlock":0,"status":0},{"skillCd":0.0,"skillConfig":{"notPoison":1},"skillDesc":"免疫中毒","skillId":83,"skillLevel":1,"skillName":"药师","skillProb":100,"skillType":0,"skillUnlock":0,"status":0}],"upgradeCost":150,"weaponAttack":84.0,"weaponCd":2.0,"weaponConsume":65.0,"weaponDownConsume":0,"weaponDurable":15,"weaponIcon":"听闻江湖没有人见过这把匕首，因为见过的人都已经死了，故而得名绝命。","weaponId":"d014_3","weaponLevel":1,"weaponName":"绝命","weaponPrice":25000,"weaponSalePrice":5000,"weaponSkills":"46,83","weaponStar":3,"weaponTopLevel":15,"weaponType":1,"weaponUpAttack":0,"weaponUpDurable":0}],"dailyTaskStatus":1,"weaponNew":0,"refinerNew":0,"roleNew":0}
        let params = this.params;
        let result = this.params.result;
        let type = this.params.type;
        if(type==1){
           this.dealType1(result);
        }else if(type==2){
           this.dealType2(result);
        }
        this.showReward();
        this.on(Laya.Event.CLICK,this,this.clickHandler);
    }
    clickHandler(e){
        let name=e.target.name;
        switch(name){
            case `btnSure`:
                this.sureHandler();
                break;
            case `btnReject`:
                this.rejectHandler();
                break;
            case `btnShare`:
                this.shareHandler();
                break;
            case `btnVideo`:
                this.videoHandler();
                break;
        }
    }
    sureHandler(){
        console.log(`确认....`)
        this.close();
    }
    rejectHandler(){
        console.log(`走人撒`);
        this.close();
    }
    shareHandler(){
        console.log(`分享复活`);
    }
    videoHandler(){
        console.log(`看广告复活`);
    }
    dealType1(result){
       if(result==1){
           this.boxWin.visible=true;
           this.img.skin=`remote/adventure/winText1.png`;
           this.btnSure.getChildByName(`lbl`).font=`adventure`;
           this.btnSure.getChildByName(`lbl`).text=`举手之劳，不足挂齿`;
       }else{
           this.boxWeapons.visible=false;
           this.boxLose1.visible=true;
           this.img.skin=`remote/adventure/loseText1.png`;
           this.btnShare.getChildByName(`lbl`).font=`adventure`;
           this.boxLose1.getChildByName(`btnReject`).getChildByName(`lbl`).font=`adventure`;     
       }
    }
    dealType2(result){
        if(result==1){
            this.boxWin.visible=true;
            this.img.skin=`remote/adventure/winText2.png`;
            this.btnSure.getChildByName(`lbl`).font=`adventure`;
            this.btnSure.getChildByName(`lbl`).text=`欣然收下赏金`;
        }else{
            this.boxLose2.visible=true;
            this.img.skin=`remote/adventure/loseText2.png`;
            this.btnVideo.getChildByName(`lbl`).font=`adventure`;
            this.btnReject.getChildByName(`lbl`).font=`adventure`;
            this.btnReject.getChildByName(`lbl`).scale(0.86,0.86);
        }
    }
    showReward() {
        let weaponList = this.params.weaponList;
        let len = weaponList.length;
        if (len) {
            let weaponBarsArr = this.boxWeapons._children;
            for (let i = 0; i < len; i++) {
                weaponBarsArr[i].visible = true;
                let weaponBarsComp = weaponBarsArr[i].getComponent(WeaponBar);
                weaponBarsComp.params = weaponList[i];
                weaponBarsComp.initView();
                weaponBarsArr[i].off(Laya.Event.CLICK, weaponBarsComp)
            }
        }
    }
    
}