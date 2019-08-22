import GameControl from "../GameControl";
import SpeakMan from "./SpeakMan";

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
        this.owner.on(Laya.Event.CLICK,this,(e)=>{
           // console.log('....')
        })
    }
    onEnable(){
        super.onEnable();
        let maskArea = new Laya.Sprite();
		/* guideContainer.addChild(maskArea); */
		maskArea.alpha = 0.5;
        maskArea.graphics.drawRect(0, 0, Laya.Browser.width, Laya.Browser.height, "#000");
        maskArea.pos(-150,0);
        maskArea.mouseEnabled=true;
        this.owner.addChild(maskArea);

        let nextLabel=new Laya.Label();
        nextLabel.text='跳过';
        nextLabel.font='figureDetail'; 
        nextLabel.pos(1100,30);
        nextLabel.name='next';
        nextLabel.mouseEnabled=true;
        console.log(nextLabel.width)
        this.owner.addChild(nextLabel);


        let selfSpeakMan= this.selfSpeakMan.create.call(this.selfSpeakMan);
        let selfSpeakManComp=selfSpeakMan.getComponent(SpeakMan);
        selfSpeakManComp.showWord('没想到对手竟然是乔大侠，失敬失敬。');
        selfSpeakMan.y=225;
        this.owner.addChild(selfSpeakMan);
    }
}