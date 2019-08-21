export default class BattleResultDialog extends PaoYa.Dialog{
    constructor(){
        super();
    }
    onAwake(){
        console.log(this.params);
        let result=this.params.result;
        this.result=result;
        if(result==-1){
            this.spPanel.text="remote/pass_result/imgLose.png";
        }else{
            this.spPanel.text="remote/pass_result/imgWin.png";
        }
        this.lblPrize.text=this.params.diamond;
        this.spBtn.on(Laya.Event.CLICK,this,this.matchHandler);
        this.btnBack.on(Laya.Event.CLICK,this,this.backHandler);
        this.btnHeroHouse.on(Laya.Event.CLICK,this,this.goHeroHouse);

        
    }
    
    //
    goHeroHouse(){
        console.log("进入英雄库")
    }
    //重新匹配
    matchHandler(){
      console.log('重新匹配');
    }
    backHandler(){
        this.close();
        PaoYa.navigator.popToRootScene();
    }
}