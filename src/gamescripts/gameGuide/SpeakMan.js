export default class SpeakMan extends PaoYa.Component{
    /** @prop {name:lblSpeakName,tips:'人物名字',type:Node}*/
    /** @prop {name:lblIntroduct,tips:'介绍文字',type:Node}*/
    /** @prop {name:imgArrow,tips:'箭头图片',type:Node}*/
     /** @prop {name:imgRole,tips:'人物形象图片',type:Node}*/
    constructor(){
        super();
    }
    onAwake(){
        this.lblSpeakName.font="figureDetail";
        this.target=this.imgArrow;
        this.curY=this.target.y;
        let timeLine=new Laya.TimeLine();
        this.timeLine=timeLine;
        this.lblSpeakName.scale(0.8,0.8);
    }
    onEnable(){
       
    }
    modify(value){
        this.lblSpeakName.text=value;
        this.imgRole.visible=false;
    }
    refresh(obj){
        this.lblSpeakName.text=obj.name;
        this.imgRole.texture=`remote/guide/${obj.dress}.png`;
    }
    showWord(value){
        this.str=value;
        let len=this.str.length;
        this.index=0;
        this.lblIntroduct.text='';
        Laya.timer.loop(60,this,this.wordAni,[len]);
    }
    wordAni(len){
        this.lblIntroduct.text+=this.str.substring(this.index,this.index+1);
        this.index+=1;
        if(this.index==len){
            Laya.timer.clear(this,this.wordAni);
            this.arrowAni();
        }
    }
    arrowAni(){
       this.imgArrow.visible=true;
       let originY =this.curY;
       this.timeLine.to(this.target,{
           y:originY+20
       },400,null,0).to(this.target, {
           y:originY
       }, 400, null, 1)
       this.timeLine.play(0, true);
      
    }
    stopTimeLine(){
        this.timeLine.pause();
    }
    onDestroy(){
        console.log(`销毁对话`)
        this.timeLine.destroy();
        this.timeLine=null;
    }
}