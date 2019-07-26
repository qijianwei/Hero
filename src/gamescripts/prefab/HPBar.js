export default class HPBar extends PaoYa.Component{
    /** @prop {name:imgHp,tips:"血条图片",type:Node} */
    /** @prop {name:imgMask,tips:"血条mask",type:Node} */
     /** @prop {name:lblHpPct,tips:"hp百分比",type:Node} */
    constructor(){
        super();
    }
    onAwake(){
      
    }
    onEnable(){
    
    }
    initBar(HPValue){
      this.originW=this.owner.width;
      console.log('初始的血量值:',HPValue);
      this.originHP=this.curHP=HPValue;
      this.lblHpPct.text=`${this.curHP}/${this.originHP}`
    }
    /* increaseHP(value){
      this.curHP=this.curHP+value>this.originHP?this.originHP:this.curHP+value;
      this.imgMask.width=Math.floor(this.curHP/this.originHP*this.originW);
    }
    decreaseHP(value){
      if(this.curHP<=0){console.log("宣告死亡");return;}
      this.curHP-=value;
      if(this.curHP<=0){this.curHP=0}
      let w=Math.floor(this.curHP/this.originHP*this.originW);
      this.imgMask.width=w;
    } */
    changeHP(value){
      if(this.curHP<=0){console.log("已经死亡");return;}
      this.curHP+=value;
      if(this.curHP<=0){
        this.curHP=0;
        this.imgMask.width=0;
       //('游戏结束了')
        return;
      }else if(this.curHP>this.originHP){
        this.curHP=this.originHP;
      }
      this.lblHpPct.text=`${this.curHP}/${this.originHP}`
      let w=Math.floor(this.curHP/this.originHP*this.originW);
      this.imgMask.width=w;
    }
    onDisable(){

    }
    onDestroy(){

    }
}