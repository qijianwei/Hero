export default class RobotSkill{
    constructor(skillConfig){
        console.log('机器人技能1111:',skillConfig)
      this._id=0;
      this.limit=0;
      this.lifeValue=0;
      this.cdTime=0;
     
     // this.perTime=0;

      this.timeOK=true;
      this.perTimeOK=true;
      /* this.lefeOK=true;  */

      this.initSkill(skillConfig);
    }
    initSkill(skillConfig){
        console.log(`初始化机器人技能`);
        this.freezeing = false;
        this.skillId=skillConfig.skillId;
        if(skillConfig.life!=undefined){
           this.lifeValue=skillConfig.life*skillConfig.roleHp;
        }
        if(skillConfig.limit!=undefined){
            this.limit=skillConfig.limit;
        }
        if(skillConfig.cd!=undefined){
            this.cdTime=skillConfig.cd*1000;
        }
        if(skillConfig.btime!=undefined){
            this.timeOK=false;
            Laya.timer.once(skillConfig.btime*1000,this,this.changeTimeStatus)
        }
        if(skillConfig.perTime!=undefined){
            //this.perTime=skillConfig.perTime  
            this.perTimeOK=false;
            Laya.timer.loop(skillConfig.perTime*1000,this,this.changePerTimeStatus);
        }
        if(skillConfig.name!=undefined){
            //this.perTime=skillConfig.perTime  
            this.name=skillConfig.name;       
        }
      //  this.lifeValue=null;/* 生命限制条件 */
        return this;
    }
    getSkill(){
      if(this.freezeing){
          return false;
      }
      return true;
    }
    setCdTime(cdTime) {
        if(cdTime==0){
            console.log(`技能无cd状态`);
        }else{
            console.warn('修改机器人cd时间:', cdTime);
        }    //cd 时间
        this.cdTime = cdTime;
    }
    startCd(){
        if(this.cdTime!=0){
            this.freezeing=true;
        }
       Laya.timer.once(this.cdTime,this,this.changeSkillStatus)
    }
    changeSkillStatus(){
        this.freezeing=true;
    }
    changeTimeStatus(){
        this.timeOK=true;
    }
    changePerTimeStatus(){
        this.perTimeOK=true;
        Laya.timer.once(1000,this,()=>{
            this.perTimeOK=false;
        })
    }
    clear(){
      
    }
  static create(skillConfig){
     if(RobotSkill._pool.length)return RobotSkill._pool.pop().initSkill(skillConfig);
     return new RobotSkill(skillConfig);
  }
}
RobotSkill._pool=[];
RobotSkill._gid=1;

/*  */