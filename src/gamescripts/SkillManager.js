import RobotSkill from "./prefab/RobotSkill";
import GameControl from "./GameControl";

export default class SkillManager extends Laya.Script{
    constructor(skillList){
       super();
       this.skillList=[];
       for(let i=0,len=skillList.length;i<len;i++){
           let skill=RobotSkill.create(skillList[i].skillConfig);
           this.skillList.push(skill);
       }
    }
    seletedSkill(){
      let skills=[];
      let curHp=0;
      for(let i=0,len=this.skillList.length;i<len;i++){
          if(!GameControl.instance.otherPlayer.comp.canAction){/* 机器人不能动弹的时候技能不会触发 */
            return null;
          }
          if(!this.skillList[i].freezeing&&this.skillList[i].limit){
              if(this.skillList[i].lifeValue){
                curHp=GameControl.instance.otherPlayer.comp.HPComp.curHP;
                if(curHp<=this.skillList[i].lifeValue&&this.skillList[i].perTimeOK&&this.skillList[i].timeOK&&!GameControl.instance.robotSkill){
                  skills.push(this.skillList[i])
                }
              }else if(this.skillList[i].perTimeOK&&this.skillList[i].timeOK&&!GameControl.instance.robotSkill){
                skills.push(this.skillList[i])
              }
            
          }
      }
      let random=Math.floor(Math.random()*skills.length);
      if(skills[random]){
        skills[random].startCd()
        skills[random].limit-=1;
        return skills[random];
      }
      return null;
      
    }
 }
