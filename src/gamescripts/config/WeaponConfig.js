var weaponConfig=[
    {
  
      "weaponType":1,//武器类型:重型（高空），中型（中空），轻型（低空）
      "weaponId":"d001_1",
      "weaponIcon":"",
      "weaponName":"",
      "weaponAttack": 10, //攻击力
      weaponDurable:22, //耐久
      weaponConsume:33,//消耗玩家的体力值  
    /* 武器技能 
       weaponNum :发出的武器数目, 
       posion:使对手中毒   6-50(60秒损失50点生命)
       hurt:造成对手几倍伤害  
       mabi:使对手麻痹 单位秒  对方在这个时间内不能发技能只能受伤害
       way:向指定路径发射兵器 1：低空 2:中空 3:高空
       stealHp:吸取对方生命值
       stealMp:吸取对方内力值
       recoverDown:减缓对方体力恢复速率 5-0.4 (5秒速率百分之40)
       cd:使对手的兵器冷却时间是原来的多少倍   5-2 
       durable:对方兵器耐久是原来百分之多少  5-0.4(持续5秒,对方的兵器耐久是原来的百分之40)；
       fixation:造成对手百分比的伤害 （固定伤害）

       
        skillProb:触发概率
    */
      skills :[{
          skillType:1,
          skillProb:10,
          skillDesc:"",
          skillConfig:{
             weaponNum:2
            
          },  
      },{
        skillType:1,
        skillProb:10,
        skillDesc:"",
        skillConfig:{
           weaponNum:2
          
        },  
    }]
    
    },

]
export default weaponConfig;
