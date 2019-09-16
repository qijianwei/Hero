import HomeControl from "../../scripts/common/HomeControl";
import SoundManager from "../SoundManager";
import HeroConfig from "../config/HeroConfig";

export default class BattleResultDialog extends PaoYa.Dialog{
    constructor(){
        super();
    }
    onAwake(){
        console.log(this.params);
        this.autoDestroyAtClosed=true;
        let result=this.params.result;
        this.result=result;
        if(result==-1){
            this.spPanel.texture="remote/pass_result/imgLose.png";
            this.spIcon.texture=`remote/pass_result/lose.png`;
        }else{
            this.spPanel.texture="remote/pass_result/imgWin.png";
        }
        this.lblPrize.text=this.params.diamond;
        this.spBtn.on(Laya.Event.CLICK,this,this.matchHandler);
        this.btnBack.on(Laya.Event.CLICK,this,this.backHandler);
        this.btnHeroHouse.on(Laya.Event.CLICK,this,this.goHeroHouse);
        this.fillInfo(this.params);//补全双方信息
        PaoYa.DataCenter.user.ladderName= HeroConfig.ladderArr[this.params.ladder];
    }
    fillInfo(params){
        this.selfName.text=params.nickName;
        this.otherName.text=params.robotNickName;
        this.selfAvstar.texture=`local/common/hero_${params.roleId}.png`;
        this.otherAvstar.texture=`local/common/hero_${params.robotRoleId}.png`;
    }
    //
    goHeroHouse(){
        console.log("进入英雄库")
        this.close();
        PaoYa.navigator.popToRootScene();
        PaoYa.navigator.visibleScene.getComponent(HomeControl).goHerosHouse();
    }
    //重新匹配
    matchHandler(){
      console.log('重新匹配');
      SoundManager.ins.btn();
      this.close();
      PaoYa.navigator.popToScene("Grading");
      PaoYa.Request.POST("hero_match_game_start",{roleId:this.params.roleId},(res)=>{
        res.gameType="battle";
        PaoYa.navigator.push('MatchView',res);
      })
    }
    backHandler(){
        SoundManager.ins.btn();
        this.close();
        PaoYa.navigator.popToRootScene();
    }
}