let instance

/**
 * 游戏开场前管理类
 */
export default class PreOpenManager {
  constructor() {
    if ( instance )
      return instance

    instance = this

    this.bgmAudio = new Audio()
    this.bgmAudio.loop = true
    this.bgmAudio.src  = 'audio/bgm.mp3'

    this.shootAudio     = new Audio()
    this.shootAudio.src = 'audio/bullet.mp3'

    this.boomAudio     = new Audio()
    this.boomAudio.src = 'audio/boom.mp3'

    
  }

  
}

/* 先声明一个预设变量
{Laya.loader.create("prefab/预设名字.json",Handler.create(this,onComplete));
}
private function onComplete(obj:Object):Void{
  一个预设变量.json = ojb
  一个sprite = Pool.getItemByCreateFun("自己起一个名字", this.一个预设变量.create, this.一个预设变量);
} */