const baseUrl='https://xgamejuedixiaomie.goxiaochengxu.cn/1006/'
var HeroConfig = {
  ladderArr:["","无名小卒",'初出茅庐','后起之秀','江湖少侠','武林高手','名震江湖','独步武林','一代宗师','独孤求败'],
  roleName: '',
  roleIcon: '',
  roleHp: 100, //HP:hit point 生命值,roleUp为0,game over
  roleMp: 100, //MP:magic point 内力，体力  内力恢复公式：每30帧内力恢复量=roleUp/390*30。
  /*  */
  roleStrength: 2, //arm strength ,臂力值决定兵器基础伤害值。兵器基础伤害=兵器攻击力*（roleStrength-对方根骨）/roleStrength
  roleBone: 2, //根骨  .值越大收到兵器攻击受到的伤害越小
  roleCritProb: 20, //暴击几率 ,
  roleCritHarm: 100, //暴伤百分比，兵器造成伤害=兵器基础伤害*roleCritHarm
  roleSkills: [{
    skillConfig: {

    },
    skillDesc: ""
  }, {

  }],
  crossIcons:[
    {
      name:'熄灭火花',
      skin:'remote/icon/1.png',
      appId:'wxe01f9f77ddb96b19'
    },
    {
      name:'跳一跳',
      skin:'remote/icon/2.png',
      appId:'wx79a2296d151ac183'
    },{
      name:'建筑反应堆',
      skin:'remote/icon/3.png',
      appId:'wxb4ac0c02cd5bbd13'
    },{
      name:'木兰射箭',
      skin:'remote/icon/4.png',
      appId:'wx84dbcda70a6e5385'
    },
    {
      name:'决战地牢',
      skin:'remote/icon/5.png',
      appId:'wx325b44b8ed5ef472'
    },
    {
      name:'飞刀大师',
      skin:'remote/icon/6.png',
      appId:'wxbc263a31f4a052e7'
    },
    {
      name:'火力飙车',
      skin:'remote/icon/7.png',
      appId:'wxed5a853eb6f8c194'
    },
    {
      name:'采油小怪',
      skin:'remote/icon/8.png',
      appId:'wxee32187228632dc8'
    },
    {
      name:'开心消方块',
      skin:'remote/icon/9.png',
      appId:'wx169e4a2b116bdab6'
    }
  ],
  spineMap: {
    freeze: {
      path: "spine/freeze/freeze.sk",
      name: ['continue', 'freeze'],
      ready_go: 1,
      templet: null
    },
    hero_1: {
      path: 'spine/hero/hero_1.sk',
      name: ['dodge1', 'dodge2', 'dodge3', 'stand', "attack", "injured", "dizzy", "freeze"],
      templet: null
    },
    hero_2: {
      path: 'spine/hero/hero_2.sk',
      name: ['dodge1', 'dodge2', 'dodge3', 'stand', "attack", "injured", "dizzy", "freeze"],
      templet: null
    },
    hero_3: {
      path: 'remote/spine/hero/hero_3.sk',
      name: ['dodge1', 'dodge2', 'dodge3', 'stand', "attack", "injured", "dizzy", "freeze"],
      templet: null
    },
    hero_4: {
      path: 'spine/hero/hero_4.sk',
      name: ['dodge1', 'dodge2', 'dodge3', 'stand', "attack", "injured", "dizzy", "freeze"],
      templet: null
    },
    npc_1: {
      path: "remote/spine/npc/npc_1.sk",
      name: ['bomb'],
      bomb: 0,
      templet: null
    },
    npc_2: {
      path: "remote/spine/npc/npc_2.sk",
      name: ['bomb'],
      bomb: 0,
      templet: null
    },
    npc_3: {
      path: "remote/spine/npc/npc_3.sk",
      name: ['bomb'],
      bomb: 0,
      templet: null
    },
    npc_4: {
      path: "remote/spine/npc/npc_4.sk",
      name: ['bomb'],
      bomb: 0,
      templet: null
    },
    npc_5: {
      path: "remote/spine/npc/npc_5.sk",
      name: ['bomb'],
      bomb: 0,
      templet: null
    },
    npc_6: {
      path: "remote/spine/npc/npc_6.sk",
      name: ['bomb'],
      bomb: 0,
      templet: null
    },
    npc_7: {
      path:"remote/spine/npc/npc_7.sk",
      name: ['bomb'],
      bomb: 0,
      templet: null
    },
    npc_8: {
      path:"remote/spine/npc/npc_8.sk",
      name: ['bomb'],
      bomb: 0,
      templet: null
    },
    npc_9: {
      path:"remote/spine/npc/npc_9.sk",
      name: ['bomb'],
      bomb: 0,
      templet: null
    },
    scene1: {
      path: "remote/spine/scene/scene1.sk",
      templet: null,
    },
    scene2: {
      path:  "remote/spine/scene/scene2.sk",
      templet: null,
    },
    scene3: {
      path: "remote/spine/scene/scene3.sk",
      templet: null,
    }
  },

  /* 提供给外部获取动画的接口，输入动画名字即可 */
  getSkeleton:function (spineName, index ,cb) {
    if(index==undefined){index=0;}
    var skeleton;
    if (this.spineMap[spineName].templet) {
      skeleton = this.spineMap[spineName].templet.buildArmature(index);
    } else {
      skeleton = new Laya.Skeleton();
      skeleton.load(this.spineMap[spineName].path);
    }
    return skeleton;
  },
  loadAllSpine: function () {
    this.loadIndex = 0;
    let spines = Object.keys(this.spineMap);
    this.preload(spines);
  },
  preload: function (spines) {
    var _this = this
    var spine = this.spineMap[spines[this.loadIndex]];
    this.loadSpine(spine.path, function (templet) {
      spine.templet = templet
      if (_this.loadIndex == spines.length - 1) {
        return;
      } else {
        _this.loadIndex++
        _this.preload(spines)
      }
    }, function () {
      if (_this.loadIndex == spines.length - 1) {
        return;
      } else {
        _this.loadIndex++
        _this.preload(spines)
      }
    })
  },
  loadSpine: function (url, completion, error) {
    var templet = new Laya.Templet()
    templet.on(Laya.Event.COMPLETE, this, function () {
      completion && completion(templet)
    })
    templet.on(Laya.Event.ERROR, this, function () {
      console.error("E: Load spine, skin:" + url)
      error && error()
    })
    templet.loadAni(url)
  }
}
//英雄携带的兵器
//每个英雄对应的技能，和技能对应的动画效果
export default HeroConfig