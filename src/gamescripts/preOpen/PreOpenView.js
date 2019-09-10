import SpeakMan from "../gameGuide/SpeakMan";

export default class PreOpenView extends PaoYa.View{
    constructor(){
        super();
    }
    onAwake(){
        console.log(this);
       /*  console.log(this.selfSpeakMan);
        console.log(this.selfSpeakMan.getComponent(SpeakMan)); */
        this.selfSpeakMan=this.getChildByName('selfSpeakMan');
        this.otherSpeakMan=this.getChildByName('otherSpeakMan');
        console.log(this.selfSpeakMan.getComponent(SpeakMan));
        this.selfSpeakManComp=this.selfSpeakMan.getComponent(SpeakMan);
        this.otherSpeakManComp=this.otherSpeakMan.getComponent(SpeakMan);
        
        this.selfSpeakMan.visible=false;
        this.otherSpeakMan.visible=false;

        this.on(Laya.Event.CLICK,this,this.clickHandler);
    }
    clickHandler(){
       this.indexId+=1;
       if(this.indexId>this.dialogues.length-1){
           console.log(`没有内容展示了`);
           this.event(`end`)
       }else{
           this.refresh(this.dialogues[this.indexId]);
       }
    }
    start(res){
        this.indexId=0;
        this.stageInfo=JSON.parse(JSON.stringify(res))
        this.selfDress=this.stageInfo.selfDress;
        this.otherDress=this.stageInfo.otherDress;
        this.dialogues=this.stageInfo.dialogues;
        this.selfSpeakManComp.refresh({dress:res.selfDress,name:res.selfName});
        this.otherSpeakManComp.refresh({dress:res.otherDress,name:res.otherName});
        this.refresh(this.dialogues[this.indexId]);
    }
    refresh(item){
       if(item.o){
        this.selfSpeakMan.visible=false;
        this.otherSpeakMan.visible=true;
        this.otherSpeakManComp.showWord(item.o);
       }else if(item.s){
          this.otherSpeakMan.visible=false;
          this.selfSpeakMan.visible=true;
          this.selfSpeakManComp.showWord(item.s);
       }
    }
}
PreOpenView.END=`end`;


/* 
 */