

export default class MatchView extends PaoYa.View{
    constructor(){
        super();
    }
    onAwake(){
        this.lblTip.font='weaponNFontT';
        this.selfLadderName.font="weaponNFontT";
        this.otherLadderName.font='weaponNFontT';
        this.lblTip.scale(0.8,0.8);
        this.ladderNameArr=['无名小卒','初出茅庐','后起之秀','江湖少侠','武林高手','名震江湖','独步武林','一代宗师','独孤求败'];
        this.initView();
    }
    initView(){
        let params=this.params;
        this.selfLadderId=params.ladder;
        this.otherLadderId=params.robotLadder;
        this.selfName.text=params.nickName;
        this.selfLadderInfo=this.findLadderById(this.selfLadderId);
        this.otherLadderInfo=this.findLadderById(this.otherLadderId);
        this.selfLadderInfo.texture=`local/common/badge_${this.selfLadderInfo.ladderId}`;
        this.selfLadderName.text=this.selfLadderInfo.ladderName;
       
        this.resetStar(true);
        this.resetStar(false);
        this.otherStars.visible=false;
    }
    resetStar(isSelf){
        let name=isSelf?'self':'other';
        let ladder=isSelf?'ladder':'robotLadder';
        if(this.params[ladder]>8){
            let sprite=new Laya.Sprite();
            sprite.texture=`local/common/starLight.png`;
            this[name+'Stars'].addChild(sprite);
            let label=new Laya.Label();
            label.text='×'+this.params.ladderStar;
            label.fontSize=30;
            label.height=56;
            label.valign='middle';
            label.color="#ffffff";
            this[name+'Stars'].addChild(label);
        }else{
            let star=this.params[ladder+'Star'];
            let numStar=this[name+'LadderInfo'].ladderStar; 
            for(let i=0;i<numStar;i++){
                let sprite=new Laya.Sprite();
                if(i<star){         
                    sprite.texture=`local/common/starLight.png`;
                }else{
                    sprite.texture=`local/common/starDark.png`;
                }
                  this[name+'Stars'].addChild(sprite);
                  console.warn('hbox宽度：'+name,this[name+'Stars'].width)
            }         
        }
       // this[name+'Stars'].centerX=0;
    }
    startAni(){
        let point="...";
        let index=1;
        let ladderIndex=1;
        let nameIndex=0;
        Laya.timer.loop(300,this,()=>{  
            index=(index==4)?1:index+1;
            ladderIndex=(ladderIndex==9)?1:ladderIndex+1;
            nameIndex=(nameIndex==this.ladderNameArr.length-1)?0:nameIndex+1;
            point = (point == '...') ? '.': (point + '.');
            this.lblTip.text=`匹配成功,发便当中${point}`;        
            this.otherAvstar.texture=`local/common/hero_${index}.png`;
            this.otherLadderName.text=this.ladderNameArr[nameIndex];
            this.otherLadder.texture=`local/common/badge_${ladderIndex}.png`;
        })
       
    }
    matchOK(){
        this.stopAni();
        this.otherStars.visible=true;
        this.otherName.text=this.params.robotNickName;
        this.otherLadderInfo.texture=`local/common/badge_${this.otherLadderInfo.ladderId}.png`;
        this.otherLadderName.text=this.otherLadderInfo.ladderName;  
    }
    stopAni(){
        Laya.timer.clearAll(this);
    }
    findLadderById(id) {
        var result = PaoYa.DataCenter.config.hero.ladderList.filter(function (item) {
            return item.id == id;
        });
        return result[0];
    };
}