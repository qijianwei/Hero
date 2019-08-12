var HeroConfig = {

  roleName: '独孤九剑',
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
  spineMap: {
    freeze: {
        path: "spine/freeze/freeze.sk",
        name: ['continue','freeze'],
        ready_go: 1,
        templet: null
    },
    npc_7: {
        path: "spine/npc/npc_7.sk",
        name: ['bomb'],
        bomb: 0,
        templet: null
    },
    scene1:{
       path:"spine/scene/scene1.sk",
       templet:null,
    }
  },
  /* 提供给外部获取动画的接口，输入动画名字即可 */
  getSkeleton: function (spineName, index = 0) {
    var skeleton;
    if (this.spineMap[spineName].templet) {
      skeleton = this.spineMap[spineName].templet.buildArmature(index)
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