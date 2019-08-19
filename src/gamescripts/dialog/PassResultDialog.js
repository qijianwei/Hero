import WeaponBar from "../prefab/WeaponBar";

export default class PassResultDialog extends PaoYa.Dialog{
    constructor(){
        super();
    }
    onAwake(){
        console.log(this.params);
        let result=this.params.result;
        this.result=result;
        if(result==-1){
            this.spIcon.texture="remote/pass_result/lose.png";
            this.spBtn.texture="remote/pass_result/btnAgain.png";
            this.boxWeapons.visible=false;
            this.spPanel.texture="remote/pass_result/losePanel.png";
            this.boxPrize.y=460;      
        }else{
            this.spIcon.texture="remote/pass_result/win.png";
            this.spBtn.texture="remote/pass_result/btnNext.png";
            this.boxWeapons.visible=true;
            this.spPanel.texture="remote/pass_result/winPanel.png";
            this.boxPrize.y=379;
            let weaponBarsArr=this.boxWeapons._children;
            let weaponList=this.params.weaponList;
            let len=weaponList.length;
            for(let i=0;i<len;i++){
                weaponBarsArr[i].visible=true;
                weaponBarsArr[i].getComponent(WeaponBar).params=weaponList[i];
                weaponBarsArr[i].getComponent(WeaponBar).initView();         
            } 
        }
        this.lblPrize.text=this.params.gold;
        this.spBtn.on(Laya.Event.CLICK,this,this.clickHandler);
        this.btnBack.on(Laya.Event.CLICK,this,this.backHandler);
        
    }
    clickHandler(){
       if(this.result==-1){
           console.log("再试一次")
       }else{
           console.log("继续闯关")
       }
    }
    backHandler(){
        PaoYa.navigator.popToRootScene();
    }
}