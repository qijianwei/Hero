export default class WeaponSkill extends PaoYa.Component{
      /** @prop {name:lblWeaponSkill,tips:"兵器技能",type:Node} */
    constructor(){
        super();
    }
    onAwake(){
        this.timeLine = new Laya.TimeLine();
        this.lblWeaponSkill.font="weaponSkill";
        this.timeLine.on(Laya.Event.COMPLETE,this,this.removeSelf);
    }
    onEnable(){
        let params=this.owner.params;
        let skillName=params.skillName;
        this.lblWeaponSkill.text=skillName;
      
        let owner=this.owner;
        owner.alpha=1;
        let targetX=params.isSelf?0:1170;
        this.timeLine.to(owner,{
            x:targetX
        },500,Laya.Ease.backOut,0).to(owner,{
          alpha:0
        },500)
        this.timeLine.play();
    }
    removeSelf(){
        this.timeLine.reset();
        this.owner.removeSelf();
    }
    onDisable(){
    //对象池回收
      Laya.Pool.recover('weaponSkillBox',this.owner);
    }
    onDestroy(){
        this.timeLine&&this.timeLine.destroy();
        this.timeLine=null;
    }
}