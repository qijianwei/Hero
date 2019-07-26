import GameControl from "../GameControl";

export default class Weapon extends PaoYa.Component {
  /** @prop {name:imgWeapon,tips:"四个点",type:Node}*/
  /** @prop {name:boxAniWeapon,tips:"武器碰撞动效Box",type:Node}*/
  /** @prop {name:boxAniCollision,tips:"武器碰撞动效",type:Node}*/
  /** @prop {name:boxHpWeapon,tips:"武器的血条",type:Node}*/
  /** @prop {name:imgHpMask,tips:"武器血条mask",type:Node}*/
  /** @prop {name:imgHp,tips:"武器血条图片",type:Node}*/
  constructor() {
    super();
    this.pathsCurvature = [0, 0, 0.0012, 0.002,0.004];
  }
  onAwake() {
    // console.error("进来几次")
    this.tween = new Laya.Tween();
    this.boxAniCollision.on(Laya.Event.COMPLETE, this, () => {
      console.warn('碰撞效果完成', new Date().getTime());

    })
    console.log('当前的动画帧数:', this.boxAniCollision.count)
    //添加碰撞体
    let collideSp = new Laya.Sprite();
    this.collideSp = collideSp;
    this.imgWeapon.addChild(collideSp)
  }


  //可能执行多次
  onEnable() {
    this.params = this.owner.params;
    this.initBar();
    this.rotate = true;
    if (this.params.weaponType != 1) {
      this.rotateAngle = 360
    }
    this.firstAngle = undefined;
    //初始化
    this.imgWeapon.alpha = 1;
    this.imgWeapon.scaleX = 1;
    this.imgWeapon.scaleY = 1;

    this.effectAni = false;
    this.boxAniWeapon.visible = false;
    //this.boxAniCollision.interval=30;
    //this.boxAniCollision.play(0,true);
    //武器图片 
    this.imgWeapon.skin = `remote/weapons/${this.params.weaponId}.png`;
    this.weaponAttack = this.params.weaponAttack; //武器攻击力
    this.weaponDurable = this.params.weaponDurable;
    this.owner.zOrder = 100 - this.weaponDurable;
    let imgW = this.imgWeapon.width,
      imgH = this.imgWeapon.height;
    this.imgWeapon.pivot(imgW / 2, imgH / 2);
    //this.imgWeapon.pivot(imgW/2,imgH/2)
    //  this.imgWeapon.skin=`remote/game/weapon.png`
    this.boxAniWeapon.pos(this.imgWeapon.x, this.imgWeapon.y);

    this.collideSp.size(Math.floor(imgW * 0.2), imgH);
    let collideW = this.collideSp.width,
      collideH = this.collideSp.height;
    this.collideW = collideW;
    this.collideH = collideH;

    this.collideSp.pivot(collideW / 2, collideH / 2);
    this.collideSp.pos(imgW / 2, imgH / 2);
    this.collideSp.graphics.clear();
    this.collideSp.graphics.drawRect(0, 0, collideW, collideH, '#ff0000');

    this.newX = 0;
    this.newY = 0;
    this.startPos = {
      x: 340,
      y: 450
    }
    this.endPos = {
      x: 1100,
      y: 450
    }
  
    this.speed = 680 / 100; //代表 像素/帧
    //暂时这么写  
    if (this.isSelf) {
      this.selfPlayerComp = GameControl.instance.selfPlayer.comp;
      this.otherPlayerComp = GameControl.instance.otherPlayer.comp;
      this.owner.scaleX = 1;
      this.originX = 340;
      this.originY = 450;
    } else {
      this.selfPlayerComp = GameControl.instance.otherPlayer.comp;
      this.otherPlayerComp = GameControl.instance.selfPlayer.comp;
      this.owner.scaleX = -1;
      this.originX = 950;
      this.originY = 450;
    }

    this.weaponPoint = [{
      x: Math.floor(this.originX - collideW / 2),
      y: Math.floor(this.originY - collideH / 2)
    }, {
      x: Math.floor(this.originX + collideW / 2),
      y: Math.floor(this.originY - collideH / 2)
    }, {
      x: Math.floor(this.originX + collideW / 2),
      y: Math.floor(this.originY + collideH / 2)
    }, {
      x: Math.floor(this.originX - collideW / 2),
      y: Math.floor(this.originY + collideH / 2)
    }]
    //根据weaponType不同，运动轨迹不同,造成curvature
   this.curvature = this.pathsCurvature[this.params.weaponType];
   //this.curvature=0.004
    // X轴Y轴的偏移总量
    this.driftX = this.endPos.x - this.startPos.x;
    this.driftY = this.endPos.y - this.startPos.y;
    //this.duration = 1000;

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

    this.beginTime = (new Date()).valueOf();

    Laya.timer.frameLoop(1, this, this.startParabola);
  }
  initBar() {
    this.originHpW = this.imgHp.width;
    this.originHP = this.curHP = this.params.weaponDurable;
    this.boxHpWeapon.visible = false;
  }
  changeHP(value) {
    // if(this.curHP<=0){console.log("已经死亡");return;}
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
  startParabola() {
    let now = (new Date()).valueOf();
    let x, y, curAngle;

    x = Math.floor((now - this.beginTime) * 0.06 * this.speed);
    y = Math.floor(this.curvature * x * x + this.b * x);
    curAngle = Math.floor(x / this.driftX * 360)
    this.doMove(x, y, curAngle);
  }
  stopParabola() {
    console.log("清除定时器");
    Laya.timer.clear(this, this.startParabola);
  }
  //运动
  doMove(x, y, curAngle) {
    if (this.isSelf) {
      this.newX = this.originX + x;
    } else {
      this.newX = this.originX - x;
    }

    this.newY = this.originY + y;

    this.owner.x = this.newX;
    this.owner.y = this.newY;
    if (this.firstAngle == undefined) {
      this.firstAngle = this.getDegreeByPos(x, y, this.newX, this.newY);
      //this.owner.rotation=this.firstAngle;
    }
    if (this.params.weaponType != 1) {
      this.imgWeapon.rotation = this.firstAngle + curAngle;

    } else {
      this.imgWeapon.rotation = this.getDegreeByPos(x, y, this.newX, this.newY);
    }

    // 
    this.refreshWeaponPoint(this.newX, this.newY)
    if (this.newX > 1334 || this.newY > 750 || this.newX < 0) {
      this.endMove();
      return;
    }
    if (this.doPolygonsIntersect(this.weaponPoint, this.otherPlayerComp.collidePoint)) {
      // console.error(this.weaponPoint, this.otherPlayerComp.collidePoint)
      /*     let sprite=new Laya.Sprite();
          GameControl.instance.owner.addChild(sprite);
          sprite.pos(this.weaponPoint[0].x,this.weaponPoint[0].y)
          sprite.size(this.collideW,this.collideH)
          sprite.graphics.clear();
          sprite.graphics.drawRect(0,0,this.collideW,this.collideH,"yellow")
          sprite.zOrder=10000;
          sprite.rotation=this.imgWeapon.rotation */

      // return
      this.endMove();
      let skill = this.params.activeSkill;
      let skillConfig=skill.skillConfig;
      let skillId = skill.skillId;
      let skillEffect=this.params.skillEffect;
      if (skillEffect) {
        switch (skillId) {
          case 45 || 46:
            let arr=skillConfig.poison.split('-').map(Number);
            let time=arr[0];
            this.otherPlayerComp.poisonEffect(time*1000,-arr[1]/time,-this.weaponAttack)
            break;
          case 49||50:
            this.otherPlayerComp.palsyEffect(skillConfig.mabi*1000,-this.weaponAttack);
            break;
          case 53:
            let stealHp=skillConfig.stealHp;
            this.selfPlayerComp.hpRecoverEffect(this.weaponAttack*stealHp);//数值暂定，要算
            break;
          case 54:
            let stealMp=skillConfig.stealMp;
            this.selfPlayerComp.mpRecoverEffect(this.weaponAttack*stealMp)
            break;
          case 55:      
            let recoverDown=skillConfig.recoverDown.split('-').map(Number);
            let recoverDownT=recoverDown[0],recoverDownPer=recoverDown[1];
            this.otherPlayerComp.changePerMp(recoverDownT*1000,recoverDownPer)
            break;
          case 59:
            let freezeTime=skillConfig.freeze*1000
            this.otherPlayerComp.freezedEffect(freezeTime);
            break;
          default:
            console.error('触发技能，但是普通伤害')
            this.otherPlayerComp.injuredEffect(this.params.weaponType,-this.weaponAttack);
            break;
        }
      }else{
        this.otherPlayerComp.injuredEffect(this.params.weaponType,-this.weaponAttack);
      }
    }
    if (this.isSelf) {
      this.collideWithWeapon();
    }
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
      if (!this.effectAni && !otherWeapon.effectAni) {
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

          // alert('碰撞到了')
        }
      }
      /* let ani=new Laya.Animation()
      ani.play() */
    }
    //})
  }
  playWeaponCollideEffect() {
    this.boxAniWeapon.visible = true;
    this.effectAni = true;
    // this.imgWeapon.visible=false;
    this.stopParabola();
    this.tween.to(this.imgWeapon, {
      scaleX: 1.5,
      scaleY: 1.5,
      alpha: 0.3
    }, 500, Laya.Ease.linearIn, Laya.Handler.create(this, () => {
      console.log('变大效果播放完', new Date().getTime());
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