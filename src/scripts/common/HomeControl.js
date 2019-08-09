export default class HomeControl extends PaoYa.Component {
    onAwake() { }
    onAppear() { }
    onClick(e) {
        switch (e.target.name) {
            //兵器库
            case "btnWeaponHouse":
                console.log("进入兵器库")
                this.GET("martial_user_weapon_list", {}, res => {
                    //console.log(res)
                    this.navigator.push("WeaponHouse", res);
                })
                break;
            //兵器商店
            case "btnWeaponStore":
                console.log("进入兵器商店")
                this.POST("martial_shop_list", { refresh: 0 }, res => {
                    //console.log(res)
                    this.navigator.push("WeaponStore", res);
                })
                break;
            //兵器谱
            case "btnWeaponSpectrum":
                console.log("进入兵器谱")
                break;
            //英雄库
            case "btnHerosHouse":
                console.log("进入英雄库")
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
            case "btnSet":
                console.log("设置")
                break;

        }
    }
    onDisappear() { }
    onEnable() { }
    onDisable() { }
    onDestroy() { }
}