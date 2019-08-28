export default class SoundManager{
    static get ins(){
        if(!this._ins)
            this._ins=new SoundManager();
        return this._ins;
    }

    constructor(){
        this.url=PaoYa.DataCenter.RESURL+'remote/sound/';
        this.suffix=Laya.Render.isConchApp?'.wav':'.mp3';
        if (localStorage.getItem("musicSwitchState") || localStorage.getItem("musicSwitchState") == 'true') {
            Laya.SoundManager.musicMuted = true;
        }
        if (localStorage.getItem("effectSwitchState") || localStorage.getItem("effectSwitchState") == 'true') {
            Laya.SoundManager.soundMuted = true;
        }
    }

    playMusic(fileName){
        if(!Laya.SoundManager.musicMuted){
            var url=this.url+fileName+this.suffix;
            this.currentChannel=Laya.SoundManager.playMusic(url, 0);
        }
    }

    playSound(fileName,loop,cb){
        (loop===void 0)&&(loop=1);
        (cb===void 0)&&(cb=null);
        if(!Laya.SoundManager.soundMuted){
            var url=this.url+fileName+this.suffix;
            Laya.SoundManager.playSound(url, loop);
            Laya.SoundManager.setSoundVolume(1);
        }
    }

    homeBg(){
        this.curBg='homeBg';
        this.playMusic('homeBg');
    }
   /* 对战战斗音乐 */
    battleBg(){
        this.curBg='battleBg';
        this.playMusic('battleBg');
    }
     /* 闯关战斗音乐 */
    passBg(){
        this.curBg='passBg';
        this.playMusic('passBg');
    }
    /* 兵器撞击 */
    collide(){
        this.playMusic('collide');
    }
    /* 受伤 */
    injured(){
        this.playSound('injured');
    }
    /* 英雄技能触发 */
    heroSkill(){
        this.playSound('heroSkill');  
    }
    /* 兵器技能触发 */
    weaponSkill(){
        this.playSound('weaponSkill');
    }
    /* 升级音效 */
    upgrade(){
        this.playSound('upgrade');
    }
   /* 获取gold */
   gold(){
       this.playSound('gold');
   }

    win(){
        this.playSound('win');
    }

    lose(){
        this.playSound('lose');
    }
}
SoundManager._ins;