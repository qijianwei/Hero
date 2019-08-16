import HeroConfig from "../../gamescripts/config/HeroConfig";

export default class HomeControl extends PaoYa.Component {
      /** @prop {name:lblLadder,tips:"用户段位",type:Node} */
       /** @prop {name:lblName,tips:"用户名字",type:Node} */
    onAwake() { 
        let name=PaoYa.DataCenter.user.defaultRoleId;
        let ladder=PaoYa.DataCenter.user.ladder;
        let player=HeroConfig.getSkeleton('hero_'+name);
        player.pos(371,570);
        player.scale(1.5,1.5)
        this.owner.addChild(player);
        this.player=player;
        
        this.lblName.text=PaoYa.DataCenter.user.nickname;
        this.lblLadder.font="weaponNFontT";
        this.lblLadder.scale(0.8,0.8);
        this.lblLadder.text=HeroConfig.ladderArr[ladder];

        this.owner.imgAvstar.skin=PaoYa.DataCenter.user.avstar;
    }
    onAppear() { 
       this.player.play('stand',true);
    }
    onDisappear(){
        this.player.stop();
    }
    onClick(e) {
        switch (e.target.name) {
            //兵器库
            case "btnWeaponHouse":
                console.log("进入兵器库")
                this.GET("martial_user_weapon_list", {}, res => {
                    //console.log(res)
                    if (!res) {
                        return
                    }
                    this.navigator.push("WeaponHouse", res);
                })
                break;
            //兵器商店
            case "btnWeaponStore":
                console.log("进入兵器商店")
                this.POST("martial_shop_list", { refresh: 0 }, res => {
                    if (!res) {
                        return
                    }
                    //console.log(res)
                    this.GET("martial_user_weapon_list", {}, data => {
                        if (!data) {
                            return
                        }
                        let obj = {
                            buyList: res,
                            sellList: data
                        }
                        this.navigator.push("WeaponStore", obj);
                    })

                })
                break;
                //炼器
            case "btnRefiner":
            console.log("进入炼器")
            break;
            //兵器谱
            case "btnWeaponSpectrum":
                console.log("进入兵器谱")
                break;
            //英雄库
            case "btnHerosHouse":
                console.log("进入英雄库")
                this.GET("martial_role_list", {}, res => {
                    //console.log(res)
                    if (!res) {
                        return
                    }
                    this.navigator.push("Swordsman", res);
                })
                break;

            //签到
            case "btnRegister":
                console.log("打开签到")
                break;
            //抽奖转盘
            case "btnRoulette":
                console.log("去抽奖")
                break;
            //开始游戏：
            case "btnStartGame":
                console.log("开始游戏请求的数据......")
                this.POST("hero_game_start", { stageId: 1 }, (res) => {
                    //console.log(res)
                    this.navigator.push("GameView", res);
                })
                // this.navigator.push("GameView",PaoYa.DataCenter.config)
                break;
            //华山论剑
            case "btnBattle":
                console.log("华山论剑")
                break;
            //决战紫禁城之巅
            case "btnBoss":
                console.log("决战")
                break;
            //排行榜
            case "rank":
                console.log("进入排行榜")
                break;
            //玩法
            case "btnPlayRule":
                console.log("玩法介绍")
                break;
            //设置
            case "btnTask":
                console.log("任务")
                break;

        }
    }
    onDisappear() { }
    onEnable() { }
    onDisable() { }
    onDestroy() { }
}