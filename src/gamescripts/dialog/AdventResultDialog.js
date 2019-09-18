export default class AdventResultDialog extends PaoYa.Dialog {
    constructor() {
        super();
    }
    onAwake() {
        this.autoDestroyAtClosed = true;
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
    }
    rejectHandler(){
        console.log(`走人撒`);
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
           this.btnSure.getChildByName(`lbl`).font=`adventure`;
           this.btnSure.getChildByName(`lbl`).text=`举手之劳，不足挂齿`;
       }else{
           this.boxLose1.visible=true;
           this.btnShare.getChildByName(`lbl`).font=`adventure`;
           this.boxLose1.getChildByName(`btnReject`).getChildByName(`lbl`).font=`adventure`;     
       }
    }
    dealType2(result){
        if(result==1){
            this.boxWin.visible=true;
            this.btnSure.getChildByName(`lbl`).font=`adventure`;
            this.btnSure.getChildByName(`lbl`).text=`欣然收下赏金`;
        }else{
            this.boxLose2.visible=true;
            this.btnVideo.getChildByName(`lbl`).font=`adventure`;
            this.btnReject.getChildByName(`lbl`).font=`adventure`;
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