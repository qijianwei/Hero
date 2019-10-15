import GameControl from "../GameControl";
import SoundManager from "../SoundManager";
var WeaponAniType;
(function (WeaponAniType) {
  WeaponAniType[WeaponAniType["aniRepeat1"] = 43] = "aniRepeat1";
  WeaponAniType[WeaponAniType["aniRepeat2"] = 44] = "aniRepeat2";
  WeaponAniType[WeaponAniType["aniPoison1"] = 45] = "aniPoison1";
  WeaponAniType[WeaponAniType["aniPoison2"] = 46] = "aniPoison2";
  WeaponAniType[WeaponAniType["aniCrit1"] = 47] = "aniCrit1";
  WeaponAniType[WeaponAniType["aniCrit2"] = 48] = "aniCrit2";
  WeaponAniType[WeaponAniType["aniBlood"] = 53] = "aniBlood";
  WeaponAniType[WeaponAniType["aniBlue"] = 54] = "aniBlue";
  WeaponAniType[WeaponAniType["aniReduce"] = 55] = "aniReduce";
  WeaponAniType[WeaponAniType["aniThump1"] = 56] = "aniThump1";
  WeaponAniType[WeaponAniType["aniThump2"] = 57] = "aniThump2";
  WeaponAniType[WeaponAniType["aniFreeze"] = 59] = "aniFreeze";
  WeaponAniType[WeaponAniType["aniThump3"] = 61] = "aniThump3";
  WeaponAniType[WeaponAniType["aniPetrifie"] = 62] = "aniPetrifie";
  WeaponAniType[WeaponAniType["aniHero1"] = 88] = "aniHero1";
  WeaponAniType[WeaponAniType["aniHero2"] = 89] = "aniHero2";
  WeaponAniType[WeaponAniType["aniHero3"] = 90] = "aniHero3";
})(WeaponAniType || (WeaponAniType = {}));
export default class Weapon extends PaoYa.Component {
  /** @prop {name:imgWeapon,tips:"四个点",type:Node}*/
  /** @prop {name:boxAniWeapon,tips:"武器碰撞动效Box",type:Node}*/
  /** @prop {name:boxAniCollision,tips:"武器碰撞动效",type:Node}*/
  /** @prop {name:boxHpWeapon,tips:"武器的血条",type:Node}*/
  /** @prop {name:imgHpMask,tips:"武器血条mask",type:Node}*/
  /** @prop {name:imgHp,tips:"武器血条图片",type:Node}*/
  /** @prop {name:aniCrit1,tips:"致命特效",type:Node}*/
  /** @prop {name:aniCrit2,tips:"诛心特效",type:Node}*/
  /** @prop {name:aniPoison1,tips:"浸毒特效",type:Node}*/
  /** @prop {name:aniPoison2,tips:"奇毒特效",type:Node}*/
  /** @prop {name:aniRepeat1,tips:"双刃特效",type:Node}*/
  /** @prop {name:aniRepeat2,tips:"影刃特效",type:Node}*/
  /** @prop {name:aniBlood,tips:"嗜血特效",type:Node}*/
  /** @prop {name:aniBlue,tips:"嗜魔特效",type:Node}*/
  /** @prop {name:aniReduce,tips:"气绝特效",type:Node}*/

  /** @prop {name:aniThump1,tips:"重击特效",type:Node}*/
  /** @prop {name:aniThump2,tips:"碎石特效",type:Node}*/
  /** @prop {name:aniThump3,tips:"斩皇特效",type:Node}*/
  /** @prop {name:aniFreeze,tips:"冰心特效",type:Node}*/
  /** @prop {name:aniPetrifie,tips:"石化特效",type:Node}*/
  /** @prop {name:aniHero1,tips:"人物1技能2特效",type:Node}*/
  /** @prop {name:aniHero2,tips:"人物2技能2特效",type:Node}*/
  /** @prop {name:aniHero3,tips:"人物3技能2特效",type:Node}*/

  constructor() {
    super();
    this.pathsCurvature = [0, 0, 0.0008, 0.0015, 0.0025];
    this.speedsArr = [0, 680 / 100, 680 / 80, 680 / 100, 680 / 80]
  }
  onAwake() {
    this.tween = new Laya.Tween();

    //添加碰撞体
    let collideSp = new Laya.Sprite();
    this.collideSp = collideSp;
    this.imgWeapon.addChild(collideSp)

    /* 抛物线公式 */
    this.startPos = {
      x: 180,
      y: 450
    }
    this.endPos = {
      x: 1150,
      y: 450
    }
    // X轴Y轴的偏移总量
    this.driftX = this.endPos.x - this.startPos.x;
    this.driftY = this.endPos.y - this.startPos.y;
  }


  //可能执行多次
  onEnable() {

    this.params = this.owner.params;

    if (this.params.weaponType != 1) {
      this.rotateAngle = 360
    }
    this.firstAngle = undefined;
    //初始化
    this.imgWeapon.alpha = 1;
    this.imgWeapon.scaleX = 1;
    this.imgWeapon.scaleY = 1;

    this.effectAni = false; //兵器是否在做碰撞动效
    this.boxAniWeapon.visible = false;

    //武器图片 
    this.imgWeapon.skin = `remote/weapons/${this.params.weaponId}.png`;
    this.weaponAttack = this.params.weaponAttack; //武器攻击力
    this.weaponDurable = this.params.weaponDurable;
    this.owner.zOrder = 100 - this.weaponDurable;
    let imgW = this.imgWeapon.width,
      imgH = this.imgWeapon.height;

    this.imgWeapon.pivot(imgW / 2, imgH / 2); //图片的位置
    let x = this.imgWeapon.x,
      y = this.imgWeapon.y,
      skillX = -Math.floor(imgW / 2);
    this.boxAniWeapon.pos(x, y); //碰撞动效的位置
    this.aniPoison1.pos(x, y);
    this.aniPoison2.pos(skillX, y);
    //  this.boxAniCrit1.pos(x,y);
    this.aniCrit1.pos(x, y);
    this.aniCrit2.pos(skillX + 5, y);
    this.aniRepeat1.pos(skillX + 5, y);
    this.aniRepeat2.pos(skillX + 5, y);

    this.aniBlood.pos(x, y);
    this.aniBlue.pos(x, y);
    this.aniReduce.pos(x, y);
    this.aniThump1.pos(x, y);
    this.aniThump2.pos(x, y);
    this.aniThump3.pos(x, y);
    this.aniPetrifie.pos(x, y);
    this.aniHero1.pos(0, y);
    this.aniHero2.pos(0, y);
    this.aniHero3.pos(0, y);
    /* this.aniPoison1.play(0,true); */
    this.collideSp.size(Math.floor(imgW * 0.2), imgH);
    let collideW = this.collideSp.width,
      collideH = this.collideSp.height;
    this.collideW = collideW;
    this.collideH = collideH;

    this.collideSp.pivot(collideW / 2, collideH / 2);
    this.collideSp.pos(imgW / 2, imgH / 2);
    //碰撞区域画图显示
    /* this.collideSp.graphics.clear();
    this.collideSp.graphics.drawRect(0, 0, collideW, collideH, '#ff0000'); */

    this.newX = 0;
    this.newY = 0;

    let speed = this.speedsArr[this.params.weaponType]; //代表 像素/帧
    this.speed = speed;
    //根据weaponType不同，运动轨迹不同,造成curvature
    this.curvature = this.pathsCurvature[this.params.weaponType];
    /*
     * 因为经过(0, 0), 因此c = 0
     * 于是：
     * y = a * x*x + b*x;
     * y1 = a * x1*x1 + b*x1;
     * y2 = a * x2*x2 + b*x2;
     * 利用第二个坐标：
     * b = (y2+ a*x2*x2) / x2
     */
    this.b = (this.driftY - this.curvature * this.driftX * this.driftX) / this.driftX;
    this.currentAni = null; //暂存当前的animation
    this.initWeaponInfo();
    //初始化血条状态
    this.initBar();
    this.initSkillEffect(); //兵器技能特效
    Laya.timer.frameLoop(1, this, this.startParabola, [speed]);
  }
  initBar() {
    this.originHpW = this.imgHp.width;
    this.originHP = this.curHP = this.weaponDurable;
    this.boxHpWeapon.visible = false;
    this.imgHpMask.width = this.originHpW;
  }
  initSkillEffect() {
    if (this.params.skillEffect) {
      let skillId = this.params.activeSkill.skillId;
      if (WeaponAniType[skillId]) {
        this[WeaponAniType[skillId]].visible = true;
        this[WeaponAniType[skillId]].play(0, true);
        this.currentAni = this[WeaponAniType[skillId]];
      }
    }
  }
  stopSkillEffect() {
    if (this.params.skillEffect) {
      let skillId = this.params.activeSkill.skillId;
      if (WeaponAniType[skillId]) {
        this[WeaponAniType[skillId]].visible = false;
        this[WeaponAniType[skillId]].stop();
        this.currentAni = null;
      }
    }
  }
  initWeaponInfo() {
    //暂时这么写  
    if (this.isSelf) {
      this.selfPlayerComp = GameControl.instance.selfPlayer.comp;
      this.otherPlayerComp = GameControl.instance.otherPlayer.comp;
      this.owner.scaleX = 1;
      this.startPos = {
        x: 180,
        y: 450
      }
      this.endPos = {
        x: 1150,
        y: 450
      }

    } else {
      this.selfPlayerComp = GameControl.instance.otherPlayer.comp;
      this.otherPlayerComp = GameControl.instance.selfPlayer.comp;
      this.owner.scaleX = -1;
      this.startPos = {
        x: 1150,
        y: 450
      }
      this.endPos = {
        x: 180,
        y: 450
      }
    }
    //这个是武器发射的坐标
    this.originX = this.owner.x;
    this.originY = this.owner.y;
    this.diffX = Math.abs(this.originX - this.startPos.x);
    this.beginTime = (new Date()).valueOf();

    this.weaponPoint = [{
      x: Math.floor(this.originX - this.collideW / 2),
      y: Math.floor(this.originY - this.collideH / 2)
    }, {
      x: Math.floor(this.originX + this.collideW / 2),
      y: Math.floor(this.originY - this.collideH / 2)
    }, {
      x: Math.floor(this.originX + this.collideW / 2),
      y: Math.floor(this.originY + this.collideH / 2)
    }, {
      x: Math.floor(this.originX - this.collideW / 2),
      y: Math.floor(this.originY + this.collideH / 2)
    }]
  }
  changeHP(value) {
    this.boxHpWeapon.visible = true;

    this.curHP += value;
    if (this.curHP <= 0) {
      this.curHP = 0;
      this.imgMask.width = 0;
      return;
    } else if (this.curHP > this.originHP) {
      this.curHP = this.originHP;
    }
    let w = Math.floor(this.curHP / this.originHP * this.originHpW);
    this.imgHpMask.width = w;
  }

  //开始抛物线运动
  startParabola(speed) {
    let now = (new Date()).valueOf();
    let x, y, curAngle;

    x = Math.floor((now - this.beginTime) * 0.06 * speed) + this.diffX;
    y = Math.floor(this.curvature * x * x + this.b * x);
    curAngle = Math.floor(x / this.driftX * 720)
    this.doMove(x, y, curAngle);
  }
  stopParabola() {
    //console.error(`-------关闭抛物线定时器1-------`)
    Laya.timer.clear(this, this.startParabola);
  }
  //暂停动画
  pause() {
    //console.error(`--------关闭抛物线定时器2-------`)
    Laya.timer.clear(this, this.startParabola);
    this.pauseTime = (new Date()).valueOf();
    this.playedTime = this.pauseTime - this.beginTime;
    this.currentAni && this.currentAni.stop();
  }
  //恢复动画
  resume() {
    let speed = this.speed;
    this.beginTime = (new Date()).valueOf() - this.playedTime;
    Laya.timer.frameLoop(1, this, this.startParabola, [speed]);
    this.currentAni && this.currentAni.play(0, true);
  }
  //运动
  doMove(x, y, curAngle) {
    if (this.isSelf) {
      this.newX = this.startPos.x + x;
    } else {
      this.newX = this.startPos.x - x;
    }

    this.newY = this.originY + y;

    this.owner.x = this.newX;
    this.owner.y = this.newY;
    if (this.firstAngle == undefined) {
      this.firstAngle = this.getDegreeByPos(x, y, this.newX, this.newY);
    }
    if (this.params.weaponType != 1) {
      this.imgWeapon.rotation = this.firstAngle + curAngle;
    } else {
      this.imgWeapon.rotation = this.getDegreeByPos(x, y, this.newX, this.newY);
    }

    // 
    this.refreshWeaponPoint(this.newX, this.newY)
    if (this.newX > 1334 || this.newY > 750 || this.newX < 0 || this.selfPlayerComp.killed || this.otherPlayerComp.killed) {
      this.endMove();
      return;
    }
    if (this.doPolygonsIntersect(this.weaponPoint, this.otherPlayerComp.collidePoint)) {
      /*     let sprite=new Laya.Sprite();
          GameControl.instance.owner.addChild(sprite);
          sprite.pos(this.weaponPoint[0].x,this.weaponPoint[0].y)
          sprite.size(this.collideW,this.collideH)
          sprite.graphics.clear();
          sprite.graphics.drawRect(0,0,this.collideW,this.collideH,"yellow")
          sprite.zOrder=10000;
          sprite.rotation=this.imgWeapon.rotation */

      this.postNotification('collide');
      //如果对方闪避状态，无敌
      if (this.otherPlayerComp.dodge) {
        console.log('------无敌状态或者一方已经死亡------')
        return;
      }
      //如果roleId=4,会20%反弹兵器。不会受到暴击。
      //let targetName=this.isSelf?'other':'self';
      if (this.otherPlayerComp.attr.roleId == 4) {
        let random = Math.ceil(Math.random() * 100);
        let reboundRate = this.otherPlayerComp.attr.skills[1].skillConfig.reboundRate;
        if (random <= reboundRate) {
          //反弹提示
          GameControl.instance.showSkillText(true,"游龙入水");
          this.goBack();
          return;
        }
      }
      //如果是roleId是2
      if (this.selfPlayerComp.attr.roleId == 2) {
        console.warn('------我是龙儿------')
        if (this.selfPlayerComp.attr.skills[1].skillType == 1) {
          let addHitRecoverMp = this.selfPlayerComp.attr.skills[1].skillConfig.addHitRecoverMp;
          this.selfPlayerComp.MPComp.changeMP(addHitRecoverMp)
        }
      }
      SoundManager.ins.injured();
      this.endMove();
      let skill = this.params.activeSkill;
      let skillEffect = this.params.skillEffect;
      let {
        attackNum,
        isCrit
      } = this.calcAttackNum(skillEffect);
      
      this.effectRefiner(this.selfPlayerComp.attr);//计算炼器效果
      if (skillEffect) {
        let skillConfig = skill.skillConfig,
          skillId = skill.skillId;
        //this.otherPlayerComp.injuredEffect(this.params.weaponType,-attackNum);
        switch (skillId) {
          case 45:
          case 46:
            let arr = skillConfig.poison.split('-').map(Number);
            let time = arr[0];
            this.otherPlayerComp.injuredEffect(this.params.weaponType, -attackNum, isCrit, () => {
              this.otherPlayerComp.poisonEffect(time * 1000, -arr[1] / time)
            });

            break;
            //麻痹和冰冻一个效果 指的是skeleton
          case 49:
          case 50:
            this.otherPlayerComp.injuredEffect(this.params.weaponType, -attackNum, isCrit, () => {
              this.otherPlayerComp.palsyEffect(skillConfig.mabi * 1000);
            });
            break;
          case 53:
            let stealHp = skillConfig.stealHp;
            this.otherPlayerComp.injuredEffect(this.params.weaponType, -attackNum, isCrit, () => {
              this.selfPlayerComp.hpRecoverEffect(attackNum * stealHp); //数值暂定，要算
            });
            break;
          case 54:
            let stealMp = skillConfig.stealMp;
            this.otherPlayerComp.injuredEffect(this.params.weaponType, -attackNum, isCrit, () => {
              this.selfPlayerComp.mpRecoverEffect(Math.ceil(attackNum * stealMp))
            });
            break;
          case 55:
            let recoverDown = skillConfig.recoverDown.split('-').map(Number);
            let recoverDownT = recoverDown[0],
              recoverDownPer = recoverDown[1];
            this.otherPlayerComp.injuredEffect(this.params.weaponType, -attackNum, isCrit, null);
            this.otherPlayerComp.changePerMp(recoverDownT * 1000, recoverDownPer)
            break;
          case 59:
            let freezeTime = skillConfig.freeze * 1000
            this.otherPlayerComp.injuredEffect(this.params.weaponType, -attackNum, isCrit, () => {
              this.otherPlayerComp.freezedEffect(freezeTime);
            });
            break;
          case 89:
            console.warn('--------释放人物技能89,让对方内力减少100点--------');
            let downMP = skillConfig.downMp;
            this.otherPlayerComp.injuredEffect(this.params.weaponType, -attackNum, isCrit, null);
            this.otherPlayerComp.MPComp.changeMP(-downMP);
            break;
            //命中后对手晕眩2秒
          case 90:
            let dizzyT = skillConfig.dizziness * 1000;
            this.otherPlayerComp.injuredEffect(this.params.weaponType, -attackNum, isCrit, () => {
              this.otherPlayerComp.dizzyEffect(dizzyT);
            });
            break;
          default:
            this.otherPlayerComp.injuredEffect(this.params.weaponType, -attackNum, isCrit);
            break;
        }

      } else {
        this.otherPlayerComp.injuredEffect(this.params.weaponType, -attackNum, isCrit);
      }
    }

    if (this.isSelf) {
      this.collideWithWeapon();
    }
  }
  /* 
      伤害公式=兵器攻击力*（攻击方臂力-防御方根骨）/攻击方臂力*[暴伤百分比]*[1+兵器炼器伤害加成百分比]*[1+英雄技能伤害加成百分比]*（1-防御方炼器减伤百分比）*兵器技能伤害百分比
[暴伤百分比]=角色自身暴伤百分比+兵器技能附加暴伤百分比+兵器炼器暴伤百分比
[1+英雄技能伤害加成百分比]//不用管
  */
  calcAttackNum(skillEffect) {
    let randomNum = Math.floor(Math.random() * 100 + 1);
    let selfAttr = this.selfPlayerComp.attr,
      otherAttr = this.otherPlayerComp.attr,
      selfStrength = selfAttr.roleStrength, //臂力
      roleCritHarm = selfAttr.calcCritProb,
      selfCritHarm = (randomNum < roleCritHarm) ? selfAttr.roleCritHarm / 100 : 1,
      otherBone = otherAttr.roleBone,
      //otherStrength=otherAttr.roleStrength,
      //兵器炼器伤害加成百分比
      refinerHurt = this.calcRefinerHurt(selfAttr),
      //减伤百分比
      otherReduceHurt = this.calcReduceHurt(otherAttr),
      hurtPer = selfStrength - otherBone < 0 ? 1 : (selfStrength - otherBone) / selfStrength,
      skillHurtMulti = 1;
    if (skillEffect) {
      console.warn('--------触发技能伤害，有莫有伤害倍数不知道--------'); //技能伤害百分比
      skillHurtMulti = (this.params.activeSkill.skillConfig.hurt) ? this.params.activeSkill.skillConfig.hurt : 1;
    }
    let attackNum = Math.floor(this.weaponAttack * hurtPer * selfCritHarm * refinerHurt * (1 - otherReduceHurt) * skillHurtMulti);
    if(this.selfPlayerComp.attr.roleId==3&&GameControl.instance.heroSkill2){ //杨过 九圣真经触发
      console.log(`-----伤害加30%---------`)
      attackNum=attackNum*1.3;
    }
    return {
      attackNum: attackNum,
      isCrit: randomNum < roleCritHarm
    };
  }
  effectRefiner(selfAttr){
    if (!selfAttr.refiners) {
      return ;
    }
    let len = selfAttr.refiners.length;
    let refiners = selfAttr.refiners;
    for (let i = 0; i < len; i++) {
      if(this.weaponType==refiners[i].refinerBasics.weaponType){
        if (refiners[i].id==`refiner_12`) {
          let hitRecoveHp=refiners[i].refinerBasics.hitRecoveHp;
          this.selfPlayerComp.hpRecoverEffect(hitRecoveHp);
        }else if(refiners[i].id==`refiner_13`){
          let hitRivalDownMp=refiners[i].refinerBasics.hitRivalDownMp;
          this.otherPlayerComp.mpRecoverEffect(-hitRivalDownMp);
        }else if(refiners[i].id==`refiner_14`){ //有几率晕眩三秒
          let random=Math.round(Math.random()*100);
          if(random<=refiners[i].refinerBasics.dizzinessRate){
            console.log(`----------使对手晕眩三秒----------`)
           // this.otherPlayerComp.dizzyEffect(3000);
          }     
        }
      }    
    }
  }
  calcRefinerHurt(selfAttr) {
    console.log(`------计算炼器伤害百分比------`)
    let refinerHurt = 1;
    if (!selfAttr.refiners) {
      return refinerHurt;
    }
    let len = selfAttr.refiners.length;
    let refiners = selfAttr.refiners;
    for (let i = 0; i < len; i++) {
      if (refiners[i].refinerBasics.hurt) {
        if (this.weaponType == refiners[i].refinerBasics.weaponType) {
          return refiners[i].refinerBasics.hurt
        }

      }
    }
    return refinerHurt;
  }
  calcReduceHurt(otherAttr) {
    let otherReduceHurt = 0;
    if (!otherAttr.refiners) {
      return otherReduceHurt;
    }
    let len = otherAttr.refiners.length;
    let refiners = otherAttr.refiners;
    for (let i = 0; i < len; i++) {
      if (refiners[i].refinerBasics.reduceHurt) {
        console.warn(`------防御方炼器减伤百分比------`, refiners[i].refinerBasics.reduceHurt);
        return refiners[i].refinerBasics.reduceHurt
      }
    }
    return otherReduceHurt;
  }
  //兵器反弹
  goBack() {
    GameControl.instance.removeWeapon(this);
    this.isSelf = !this.isSelf;
    GameControl.instance.selfWeapons.push(this);
    this.owner.pos(280, 450);//重置成初始发射位置
    this.initWeaponInfo();
  }
  //根据抛物线的点求角度和计算矩形四个位置
  getDegreeByPos(x, y, newX, newY) {
    let ratio = 2 * this.curvature * x + this.b;
    let degree = Math.round(180 * Math.atan(ratio) / Math.PI);
    return degree;
  }
  refreshWeaponPoint(newX, newY) {
    let ratio = this.imgWeapon.rotation * Math.PI / 360;;
    this.weaponPoint = this.CalcCoord(newX, newY, this.collideW, this.collideH, ratio);
  }

  /* 
  x2 = x0+(x-x0)*cos(theta)+(y-y0)*sin(theta)
  y2 = y0-(x-x0)*sin(theta)+(y-y0)*cos(theta)
  (x0,y0) is the center around which you are rotating
  */
  //根据旋转角度求   
  CalcCoord(centerX, centerY, rw, rh, radians) {
    var x1 = -rw / 2 + centerX,
      x2 = rw / 2 + centerX,
      x3 = rw / 2 + centerX,
      x4 = -rw / 2 + centerX,
      y1 = -rh / 2 + centerY,
      y2 = -rh / 2 + centerY,
      y3 = rh / 2 + centerY,
      y4 = rh / 2 + centerY;

    var x11 = (x1 - centerX) * Math.cos(radians) - (y1 - centerY) * Math.sin(radians) + centerX,
      y11 = (x1 - centerX) * Math.sin(radians) + (y1 - centerY) * Math.cos(radians) + centerY,
      x21 = (x2 - centerX) * Math.cos(radians) - (y2 - centerY) * Math.sin(radians) + centerX,
      y21 = (x2 - centerX) * Math.sin(radians) + (y2 - centerY) * Math.cos(radians) + centerY,
      x31 = (x3 - centerX) * Math.cos(radians) - (y3 - centerY) * Math.sin(radians) + centerX,
      y31 = (x3 - centerX) * Math.sin(radians) + (y3 - centerY) * Math.cos(radians) + centerY,
      x41 = (x4 - centerX) * Math.cos(radians) - (y4 - centerY) * Math.sin(radians) + centerX,
      y41 = (x4 - centerX) * Math.sin(radians) + (y4 - centerY) * Math.cos(radians) + centerY;
    return [{
      x: Math.round(x11),
      y: Math.round(y11)
    }, {
      x: Math.round(x21),
      y: Math.round(y21)
    }, {
      x: Math.round(x31),
      y: Math.round(y31)
    }, {
      x: Math.round(x41),
      y: Math.round(y41)
    }]
  }

  collideWithWeapon() {
    //GameControl.instance.selfWeapons.forEach((weaponComp,index)=>{
    for (let i = 0; i < GameControl.instance.otherWeapons.length; i++) {
      let otherWeapon = GameControl.instance.otherWeapons[i];
      if (!this.effectAni && !otherWeapon.effectAni && this.weaponType == otherWeapon.weaponType) {
        if (this.doPolygonsIntersect(this.weaponPoint, otherWeapon.weaponPoint)) {
          /*   console.log(this.owner.x);
            console.log(this.weaponPoint,otherWeapon.weaponPoint)
            let sprite=new Laya.Sprite();
            GameControl.instance.owner.addChild(sprite);
            sprite.pos(this.weaponPoint[0].x,this.weaponPoint[0].y)
            sprite.size(this.collideW,this.collideH)
            sprite.graphics.clear();
            sprite.graphics.drawRect(0,0,this.collideW,this.collideH,"yellow")
            this.stopParabola();
            otherWeapon.stopParabola()
            return; */
          SoundManager.ins.collide();
          this.postNotification('weaponsCollide');
          if (this.weaponDurable > otherWeapon.weaponDurable) {
            otherWeapon.playWeaponCollideEffect();
            this.weaponDurable -= otherWeapon.weaponDurable;
            this.owner.zOrder = 100 - this.weaponDurable;
            this.changeHP(-otherWeapon.weaponDurable);
            i -= 1;
          } else if (this.weaponDurable < otherWeapon.weaponDurable) {
            this.playWeaponCollideEffect();
            otherWeapon.weaponDurable -= this.weaponDurable;
            otherWeapon.owner.zOrder = 100 - this.weaponDurable;
            otherWeapon.changeHP(-this.weaponDurable);
            break;
            // i-=1;
          } else {
            this.playWeaponCollideEffect();
            otherWeapon.endMove();
            break;
          }
        }
      }
    }
  }
  playWeaponCollideEffect() {
    this.boxAniWeapon.visible = true;
    this.boxHpWeapon.visible = false;
    this.effectAni = true;
    // this.imgWeapon.visible=false;
    //兵器上带技能的隐藏
    this.stopSkillEffect();
    this.stopParabola();
    this.tween.to(this.imgWeapon, {
      scaleX: 1.5,
      scaleY: 1.5,
      alpha: 0.3
    }, 500, Laya.Ease.linearIn, Laya.Handler.create(this, () => {
      // console.log('变大效果播放完', new Date().getTime());
      this.endMove();
    }))
    this.boxAniCollision.play(0, false);
  }
  doPolygonsIntersect(a, b) {
    var polygons = [a, b];
    var minA, maxA, projected, i, i1, j, minB, maxB;

    for (i = 0; i < polygons.length; i++) {

      // for each polygon, look at each edge of the polygon, and determine if it separates
      // the two shapes
      var polygon = polygons[i];
      for (i1 = 0; i1 < polygon.length; i1++) {

        // grab 2 vertices to create an edge
        var i2 = (i1 + 1) % polygon.length;
        var p1 = polygon[i1];
        var p2 = polygon[i2];

        // find the line perpendicular to this edge
        var normal = {
          x: p2.y - p1.y,
          y: p1.x - p2.x
        };

        minA = maxA = undefined;
        // for each vertex in the first shape, project it onto the line perpendicular to the edge
        // and keep track of the min and max of these values
        for (j = 0; j < a.length; j++) {
          projected = normal.x * a[j].x + normal.y * a[j].y;
          if (!(minA) || projected < minA) {
            minA = projected;
          }
          if (!(maxA) || projected > maxA) {
            maxA = projected;
          }
        }

        // for each vertex in the second shape, project it onto the line perpendicular to the edge
        // and keep track of the min and max of these values
        minB = maxB = undefined;
        for (j = 0; j < b.length; j++) {
          projected = normal.x * b[j].x + normal.y * b[j].y;
          if (!(minB) || projected < minB) {
            minB = projected;
          }
          if (!(maxB) || projected > maxB) {
            maxB = projected;
          }
        }

        // if there is no overlap between the projects, the edge we are looking at separates the two
        // polygons, and we know there is no overlap
        if (maxA < minB || maxB < minA) {
          //   console.log("polygons don't intersect!");
          return false;
        }
      }
    }
    return true;
  }
  endMove() {
    this.stopSkillEffect();
    this.stopParabola();
    this.owner.removeSelf();
    GameControl.instance.removeWeapon(this);
  }


  onDisable() {
    Laya.Pool.recover("weapon", this.owner);
  }
  onDestroy() {

  }
}