export default class AdventureDialog5 extends PaoYa.Dialog{
    constructor(){
        super();
    }
    onAwake() {
        this.autoDestroyAtClosed = true;
        this.isPlaying=false;
        let _this = this;
      
        let type = this.params.type;
        this.spRole.texture=`remote/guide/${this.params.dress}.png`;
        if(this.params.dress==`npc_3`){
            this.spRole.y=177
        }
        let advent ={
            type: 5,
            detail: `相传真神应龙曾蛰居在后山，并在此留下了许多珍宝，不如有空的时候去看看，说不定ji`,
            agreeText: `开始寻宝`,
            rejectText: `任性离开`
        }
       
        this.lblDetail.text = advent.detail;
        this.initFont(advent);
        this.on(Laya.Event.CLICK, this, this.clickHandler);
    }
    clickHandler(e) {
        if(this.isPlaying){
            return;
        }
        switch (e.target.name) {
            case `btnAgree`:
                this.agreeHandler();
                break;
            case `btnReject`:
                this.rejectHandler();
                break;
            case `closeT`:
                this.hangUp();
                break;
        }
    }
    hangUp(){
        this.close();
        if(PaoYa.navigator.scenes.length>1){
            PaoYa.navigator.popup('/dialog/PassResultDialog', this.params)
        }
    }
    agreeHandler() {
        this.isPlaying=true;
        let _this=this;
        console.log(`进入奇遇`)
        let huntSK=new Laya.Skeleton();
        
        huntSK.load(`spine/hunt/hunt.sk`, Laya.Handler.create(this, (res) => {
            this.spHunt.visible=false;
            huntSK.playbackRate(1.5)
            huntSK.play('hunt',false);
        }))
        huntSK.pos(0,0);
        huntSK.on(Laya.Event.STOPPED, this, this.stopHandler);
        this.map.addChild(huntSK);
    }
    rejectHandler() {
        PaoYa.Request.POST(`martial_encounter_cancel`,{},()=>{
            this.close();
            if(PaoYa.navigator.scenes.length>1){
                PaoYa.navigator.popup('/dialog/PassResultDialog', this.params) 
            }
        })
    }
    stopHandler(){
       Laya.timer.once(200,this,()=>{
        this.isPlaying=false;    
        PaoYa.Request.POST(`martial_encounter_start`,{},(res)=>{
            this.params.state=`wait`;
            this.params.time=res.time;
            PaoYa.navigator.popup(`/dialog/AdventResultDialog5`,this.params)
        })
       })
       
    }
    initFont(advent) {
        this.detailTxt.font=`adventure`;
        this.lblAgree.text = advent.agreeText;
        this.lblReject.text = advent.rejectText;
        this.lblAgree.font = `adventure`;
        this.lblReject.font = `adventure`;
    }
}