import GameControl from "../GameControl";

export default class WeaponBar extends PaoYa.Component {
    /** @prop {name:spWeapon,tips:"武器图片",type:Node} */
    /** @prop {name:imgQuality,tips:"代表武器品质的背景",type:Node} */
    /** @prop {name:spShadow,tips:"阴影遮罩",type:Node} */
    /** @prop {name:imgType,tips:"武器类型图片",type:Node} */
    /** @prop {name:lblGrade,tips:"武器等级",type:Node} */
    /** @prop {name:boxAniWarn,tips:"animation box",type:Node} */
    /** @prop {name:aniWarn,tips:"冷却完发光animation",type:Node} */
    constructor() {
        super();
    }
    onAwake() {
      /*   console.log("WeaponBar awake.....")
        console.log(this.owner.params); */
       // this.params=this.owner.params;
        
        //初始化数值。冷却时间
        let owner = this.owner;
        this.ownW = owner.width;
        this.ownH = owner.height;
        this.boxAniWarn.pos(this.ownW/2,this.ownH/2)
       // this.aniWarn.play(0,true)
      //  owner.on(Laya.Event.CLICK, this, this.clickHandler);

        this.spMask = new Laya.Sprite();
        this.maskArea = new Laya.Sprite();

        this.maskArea.texture="remote/game/frameBg.png";
        
        owner.addChild(this.maskArea);
        this.maskArea.mask = this.spMask;
        this.maskArea.visible=false;

        this.maxAngle = 270; 
        this.endAngle = -90;
        this.startAngle = -90;
        this.freezeing=false;
       
        
    }
    //预防连续多次点击,来不及cd
    onThrottleClick(){
        this.clickHandler();
    }
    onEnable() {
        this.cdTime=this.params.weaponCd*1000;
        this.originCdTime=this.cdTime;

        this.weaponConsume=this.params.weaponConsume;//使用一次要消耗的体力值

        this.initView();
    }
    //根据武器参数，初始化视图
    initView(){
        let skin=`remote/small_weapons/s_${this.params.weaponId}.png`;
        this.spWeapon.texture=skin; 
        this.maskArea.graphics.drawTexture(Laya.loader.getRes(skin), 0, 0, this.ownW, this.ownH);
        this.imgQuality.skin=`remote/game/quality_${this.params.weaponStar}.png`;
        this.imgType.skin=`remote/game/type_${this.params.weaponType}.png`;
        if(this.params.weaponLevel){
            this.lblGrade.text=`LV.${this.params.weaponLevel}`;
        } 
    }
    onDisable(){

    }
    clickHandler(e) {
        if(!GameControl.instance.selfPlayer.comp.canAction||GameControl.instance.selfPlayer.comp.dodge){
            GameControl.instance.showTips("无法行动");
            return;
        }
        if(this.freezeing){
            GameControl.instance.showTips("技能未冷却");
          return; 
        }
        console.error('传出去的武器攻击值:',this.params.weaponAttack)
        this.postNotification(WeaponBar.CLICK,[this]);
    }
    setCdTime(cdTime) {
        console.warn('修改cd时间:',cdTime);
        //cd 时间
        this.cdTime = cdTime;   
    }
    drawTexture(skin){
        this.maskArea.graphics.drawTexture(Laya.loader.getRes(skin), 0, 0, this.ownW, this.ownH);
    }
    //所谓冷却是一种障眼法
    startT(time) {
        if(this.cdTime==0){
            console.error('冷却免疫');
            return;
        }
        this.spShadow.visible=true;
        this.maskArea.visible=true;
        this.freezeing=true;

  
        this.beiginTime=new Date().getTime();
        
        this.spMask.graphics.clear();
        this.spMask.graphics.drawPie(this.ownW / 2, this.ownH / 2, this.ownW, this.startAngle, this.endAngle, "#000000");
        let cdT=(time==undefined)?this.cdTime:time;
       
        Laya.timer.frameLoop(1,this,this.startCd,[cdT]);
    }
    startCd(time) {
      //  console.log("时间间隔：",this.frameCd);
        if (this.endAngle >= this.maxAngle) {
            this.endCD()
            this.aniWarn.play(0,false);
            return;
        }
        this.endAngle+=Laya.timer.delta*360/time;
        this.spMask.graphics.clear();
        this.spMask.graphics.drawPie(this.ownW / 2, this.ownH / 2, this.ownW,
            this.startAngle, this.endAngle, "#000000");
    }
    //暂停cd
    pause(){
       this.freezeing&&Laya.timer.clear(this,this.startCd);
    }
    //恢复cd
    resume(){
        this.freezeing&&Laya.timer.frameLoop(1,this,this.startCd,[this.cdTime]);
    }
    endCD() {
        Laya.timer.clearAll(this);
        this.maskArea.visible=false;
        this.spShadow.visible=false;
        this.freezeing=false;
        this.endAngle = -90;
    }
//
    onDestroy(){

    }

}
WeaponBar.CLICK="weanponBarClick";