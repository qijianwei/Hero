import GameControl from "../GameControl";
import SpeakMan from "./SpeakMan";
import HomeControl from "../../scripts/common/HomeControl";
import WeaponManager from "../WeaponManager";
let guideSteps = 
	[
		{ x: 100, y: 617, w:150, h:110 ,tip:"res/guide/help6.png", fingerX:200, fingerY:250 },
		{ x: 883, y: 620, radius:100, tip:"res/guide/help4.png", tipx:730, tipy:380 },
		{ x: 1128, y: 583, radius:110, tip:"res/guide/help3.png", tipx:900, tipy:300 }
	],
	guideContainer,
	maskArea,
	interactionArea,
	hitArea,
    selfSpeakMan,
    otherSpeakMan,
    selfSpeakManComp,
    otherSpeakManComp,
    nextLabel,
	guideStep = 0;
export default class GameGuideControl extends GameControl{
    /** @prop {name:weapon,tips:"武器预制体对象",type:Prefab}*/
    /** @prop {name:weaponBar,tips:"武器预制体对象",type:Prefab}*/
    /** @prop {name:player,tips:"人物预制体对象",type:Prefab} */
    /** @prop {name:weaponSkill,tips:"兵器技能名称预制体对象",type:Prefab} */
    /** @prop {name:selfHP,tips:'自己的血条',type:Node}*/
    /** @prop {name:selfMP,tips:'自己的体力',type:Node}*/
    /** @prop {name:otherHP,tips:'对方的血条',type:Node}*/
    /** @prop {name:otherMP,tips:'对方的体力',type:Node}*/
    /** @prop {name:playerState,tips:'人物状态',type:Node}*/
    /** @prop {name:boxGameBanner,tips:'游戏类型Banner',type:Node}*/
     /** @prop {name:selfSpeakMan,tips:"我方解说预制体对象",type:Prefab}*/
     /** @prop {name:otherSpeakMan,tips:"对方解说预制体对象",type:Prefab}*/
     /** @prop {name:spriteBg,tips:"游戏底图",type:node}*/
      /** @prop {name:aniFinger,tips:"手指动画",type:node}*/
    constructor(){
        super();
        this.closeRobot=true;
    }
  /*    onAwake(){
        super();
    }  */
    onClick(e){
        switch(e.target.name){
            case 'next':
                 e.stopPropagation()
                console.log('跳过')
                break;
            case 'mask':
                console.log('全局')
                break;
        }

    }
    onAwake(){
        super.onAwake();
        this.aniFinger.zOrder=1200;
         this.owner.on(Laya.Event.CLICK,this,(e)=>{
             if(this.noCount){return;}
            guideStep+=1;
           switch(guideStep){
               case 1:
               case 2:
               case 3:
               case 5:
             /*   case 6: */
               case 7:
               case 8:
               case 9:
               case 11:
               case 12:
                  this['step'+guideStep]();
                  break;    
           }
        }) 
       
    }
    arrowAni(){
        this.target.visible=true;
        this.timeLine.play(0, true); 
     }
     stopArrowAni(){
        this.timeLine.pause();
    }
    resumeArrowAni(){
        this.target.visible=true;
        this.timeLine.resume();
    }
    step1(){
        selfSpeakMan.visible=false;
        otherSpeakMan.visible=true;
        otherSpeakManComp.showWord('小哥哥谦虚了，出招把。'); 
    }
    step2(){
        selfSpeakMan.visible=true;
        otherSpeakMan.visible=false;
        selfSpeakManComp.showWord('那我就不客气了！');     
    }
    step3(){
        selfSpeakMan.visible=false;
        nextLabel.visible=false;
        interactionArea.graphics.clear();
        interactionArea.graphics.drawRect(100,617,110,110,'#000');
        this.noCount=true;
        hitArea.unHit.clear();
        hitArea.unHit.drawRect(100,617,110,110,'#000');
        this.aniFinger.visible=true;
        this.aniFinger.pos(150,667);
        this.aniFinger.play(0,true);
    }
    step4(){
        this.noCount=false;
        this.aniFinger.visible=false;
        this.aniFinger.stop();
        maskArea.visible=false;
        Laya.MouseManager.enabled = false;
        interactionArea.graphics.clear();
    }
    step5(){
        nextLabel.visible=false;
        maskArea.visible=false;
        otherSpeakMan.visible=false;
        this.weaponManager = new WeaponManager(this.robotWeaponList);
        this.sWeapon = this.weaponManager.seletedWeapon(0);
        this.sWeapon.isSelf = false;
       
        this.weaponBarClickHandler(this.sWeapon);
        Laya.timer.once(1200,this,()=>{
            this.setPause();
           /*  Laya.timer.scale=0; */
            this.aniFinger.visible=true;
            this.aniFinger.pos(310,672);
            this.aniFinger.play(0,true);
            maskArea.visible=true;
            Laya.MouseManager.enabled = true;
          //  nextLabel.visible=true;
            interactionArea.graphics.clear();
            interactionArea.graphics.drawRect(260,617,110,110,'#000');
            this.noCount=true;
            hitArea.unHit.clear();
            hitArea.unHit.drawRect(260,617,110,110,'#000');
        })
    }

    //遮罩消失后,全局不能点击
    step6(){
        this.noCount=false;
        this.aniFinger.visible=false;
        this.aniFinger.stop();
        maskArea.visible=false; 
        Laya.MouseManager.enabled = false;
        nextLabel.visible=false; 
        this.setResume();
       /*  Laya.timer.scale=1;  */
        interactionArea.graphics.clear();
        //这个定时器不靠谱
        Laya.timer.once(550,this,()=>{
            this.setPause();
             Laya.MouseManager.enabled = true;
             maskArea.visible=true;
             nextLabel.visible=true;
             this.addTips();
        })
        
    }
    step7(){
       this.target.visible=false;
     // this.imgTip.visible=false;
       this.imgTip.skin=`remote/guide/8.png`;
       this.imgTip.y=300;
       Laya.timer.callLater(this,()=>{
           this.imgTip.visible=true;
           this.resumeArrowAni();
       })
    }
    step8(){
        this.target.visible=false;
        this.imgTip.visible=false;
        this.stopArrowAni();
        maskArea.visible=false;
        Laya.MouseManager.enabled = false;
        nextLabel.visible=false;
        this.setResume();
        Laya.timer.scale=1;
        Laya.timer.once(100,this,()=>{
            maskArea.visible=true;
            Laya.MouseManager.enabled = true;
            nextLabel.visible=true;
            otherSpeakMan.visible=true;
            otherSpeakManComp.showWord('没想到你的武功那么厉害，看来我要动真格了。');
        })
        
    }
    step9(){
        //扔出一把武器
        maskArea.visible=false;
        nextLabel.visible=false;
        Laya.MouseManager.enabled = false;
        otherSpeakMan.visible=false;
       /*  this.sWeapon = this.weaponManager.seletedWeapon(1);
        this.sWeapon.isSelf = false;
      
        this.weaponBarClickHandler(this.sWeapon);  */
        //释放技能1 雪女剑法
        this.skillWithWeapon(false);
        Laya.timer.once(1500,this,()=>{
        this.setPause();
        maskArea.visible=true;   
        Laya.MouseManager.enabled = true;   
        this.dodgeOwner.zOrder=1010;
        this.aniFinger.visible=true;
        this.aniFinger.pos(1240,660);
        this.aniFinger.play(0,true);
        this.noCount=true;
        hitArea.unHit.clear();
        hitArea.unHit.drawRect(1160,580,160,160,'#000');
        this.dodgeOwner.once(Laya.Event.CLICK,this,(e)=>{
            e.stopPropagation();
            guideStep+=1;
            this.setResume();
            this.step10();
        })
       })
    }
    //呼，还好闪得快，不然够我喝一壶。
    step10(){
        this.noCount=false;
        this.aniFinger.visible=false;
        this.aniFinger.stop();
        this.dodgeOwner.zOrder=10;
        maskArea.visible=false;
        Laya.MouseManager.enabled = false;
        console.log('hha,点击1000') 
        Laya.timer.once(1500,this,()=>{
            maskArea.visible=true;
            Laya.MouseManager.enabled = true;
            nextLabel.visible=true;
            selfSpeakMan.visible=true;
            selfSpeakManComp.showWord(`呼，还好闪得快，不然够我喝一壶。`)
        })
    }
    step11(){
        let tween=new Laya.Tween();
        tween.to(maskArea,{
            alpha:1
        },2000,null,Laya.Handler.create(this,()=>{
           
        }));
        selfSpeakManComp.showWord(`唉？龙儿姑娘去哪儿了？`);
        this.otherPlayer.node.removeSelf();
        //对手消失，跳转主界面
    
    }
    step12(){
        this.navigator.popToRootScene();
        PaoYa.navigator.visibleScene.getComponent(HomeControl).setGuide();
    }
    setPause(){
        this.selfWeapons.forEach((weapon) => {
            weapon.pause();
        })
        this.otherWeapons.forEach((weapon) => {
            weapon.pause();
        })
    }  
    setResume(){
        this.selfWeapons.forEach((weapon) => {
            weapon.resume();
        })
        this.otherWeapons.forEach((weapon) => {
            weapon.resume();
        })
    }
    addTips(){
       let imgTip=new Laya.Image();
       imgTip.skin=`remote/guide/imgRoute.png`;
       imgTip.y=100;
       imgTip.centerX=0;
       imgTip.zOrder=1200;
       this.imgTip=imgTip; 
       this.owner.addChild(imgTip);
       this.arrowAni();
    }
    onEnable(){
        super.onEnable();
        this.spriteBg.on(Laya.Event.CLICK,this,(e)=>{
            guideStep+=1;
            switch(guideStep){
              case 4:
                  e.stopPropagation();
                  this.step4();
                  break;
                case 6:
                  e.stopPropagation();
                  this.step6();
                  break;  
            }
            
            console.log(`接收到点击`)
        })
        //this.own
       this.onNotification('collide',this,()=>{
           if(this._first){return;}
            Laya.timer.once(500,this,()=>{
                this._first=true;
                maskArea.visible=true;
                Laya.MouseManager.enabled = true;
                nextLabel.visible=true;
                otherSpeakMan.visible=true; 
                otherSpeakManComp.showWord(`好痛。我生气了！吃我一剑。`);
               // this.offNotificationListener('collide');
            })
       })
        //引导所在容器
        guideContainer=new Laya.Sprite();
        guideContainer.zOrder=1000;
        this.owner.addChild(guideContainer);
        guideContainer.cacheAs='bitmap';

        // 绘制遮罩区，含透明度，
        maskArea = new Laya.Sprite();
		maskArea.alpha = 0.5;
        maskArea.graphics.drawRect(0, 0, 1634, 750, "#000");
        maskArea.pos(-150,0);
        maskArea.mouseEnabled=true;
        //maskArea.zOrder=1000;
        guideContainer.addChild(maskArea);

        //绘制可点击区域
        interactionArea=new Laya.Sprite();
        interactionArea.blendMode='destination-out';
       // interactionArea.zOrder=1001;
        guideContainer.addChild(interactionArea);


        //可点击区域
        hitArea=new Laya.HitArea();
        hitArea.hit.drawRect(0,0,1634,750,'#000');
        guideContainer.hitArea=hitArea;
        guideContainer.mouseEnabled=true;
        
        //添加箭头
        let target =new Laya.Sprite();
        target.pos(885,565);
        target.texture=`remote/guide/arrow.png`;
        target.visible=false;
        this.target=target;
        this.curY=target.y;
        let timeLine=new Laya.TimeLine();
        this.timeLine=timeLine;
        let originY =this.curY;
        this.timeLine.to(this.target,{
            y:originY+20
        },400,null,0).to(this.target, {
            y:originY
        }, 400, null, 1)
        guideContainer.addChild(target);
        
        nextLabel=new Laya.Label();
        nextLabel.text='跳过';
        nextLabel.font='figureDetail'; 
        nextLabel.pos(1100,30);
        nextLabel.name='next';
        nextLabel.mouseEnabled=true;
        nextLabel.zOrder=1300;
        console.log(nextLabel.width)
        guideContainer.addChild(nextLabel);
       
        nextLabel.on(Laya.Event.CLICK,this,this.nextTick);

        selfSpeakMan= this.selfSpeakMan.create.call(this.selfSpeakMan);
        selfSpeakManComp=selfSpeakMan.getComponent(SpeakMan);
        selfSpeakManComp.showWord('还请龙儿姑娘手下留情啊。');
        selfSpeakMan.y=225;
        selfSpeakMan.zOrder=1003;
        this.owner.addChild(selfSpeakMan);

        otherSpeakMan=this.otherSpeakMan.create.call(this.otherSpeakMan);
        otherSpeakManComp=otherSpeakMan.getComponent(SpeakMan);
        otherSpeakMan.pos(50,255);
        otherSpeakMan.zOrder=1003;
        this.owner.addChild(otherSpeakMan);
        otherSpeakMan.visible=false;
 
       

    }
    nextTick(e){
        e.stopPropagation();
        guideStep+=1;
        this['step'+guideStep]();
    }
 
}