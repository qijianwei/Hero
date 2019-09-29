export default class MPBar extends PaoYa.Component{
    /** @prop {name:imgMP,tips:"内力条图片",type:Node} */
    /** @prop {name:imgMask,tips:"内力条mask",type:Node} */
      /** @prop {name:lblMpPct,tips:"mp百分比",type:Node} */
    constructor(){
        super();
    }
    onAwake(){
       
      this.originW=this.owner.width;
      this.imgMP.mask=this.imgMask;
      this.loopTime=320;
    }
    onEnable(){

    }
    initBar(MPValue){
        console.log('初始的体力值:',MPValue);
        this.originMP=this.curMP=MPValue;
        this.imgMask.width=this.owner.width;
        this.perAddMP=Math.ceil(((this.originMP/600)*20));
        this.originPerAddMP=this.perAddMP;
        this.lblMpPct.text=`${this.curMP}/${this.originMP}`;
        this.startBar()
    }
    startBar(){
     Laya.timer.loop(this.loopTime,this,this.autoIncreaseBar);
    }
    autoIncreaseBar(){
        if(this.curMP>=this.originMP){
           // console.warn("内力已经满了")
           return 
        }
        let addedValue=Number((this.curMP+this.perAddMP).toFixed(1));
        this.curMP=addedValue>this.originMP?this.originMP:addedValue;
        this.lblMpPct.text=`${this.curMP}/${this.originMP}`;
        this.imgMask.width=Math.floor(this.curMP/this.originMP*this.originW);
    }
    changeMP(value){
        this.curMP+=value;
        if(this.curMP<0){
            this.curMP=0;
        }else if(this.curMP>this.originMP){
            this.curMP=this.originMP;
        }
        this.imgMask.width=Math.floor(this.curMP/this.originMP*this.originW);
        this.lblMpPct.text=`${this.curMP}/${this.originMP}`;
    }
    changePerMP(value){

       this.perAddMP=value
    }
    
    updateBar(){
        
        
    }
    stopIncrease(){
        Laya.timer.clear(this,this.autoIncreaseBar);
    }
    pause(){
        Laya.timer.clear(this,this.autoIncreaseBar);
    }
    resume(){
        Laya.timer.loop(this.loopTime,this,this.autoIncreaseBar);
    }
    onDisable(){
       Laya.timer.clear(this,this.autoIncreaseBar);
    }
    onDestroy(){

    }
}