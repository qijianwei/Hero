import SoundManager from "../../../gamescripts/SoundManager";

export default class GradingControl extends PaoYa.Component {
    constructor() {
        super();
        GradingControl.ins = this
    }

    onAwake() {

    }

    onEnable() {

    }

    onThrottleClick(e) {
        if (!this.owner) {
            return
        }
        switch (e.target.name) {
            case `benBack`:
                SoundManager.ins.btn()
                this.navigator.pop()
                break;
            case `gameStart`:
                let _this=this;
                SoundManager.ins.btn()
                PaoYa.AuthManager.auth({
                    scope: PaoYa.AuthManager.scope.userInfo,
                    isNecessary:false, //是否强制授权
                    next() {
                      console.log(`授权成功`)
                      _this.gameRole(_this.owner.showDetail.roleId)
                    },
                  });
                
                break;
        }
    }

    gameRole(e) {
        this.POST("hero_match_game_start", { roleId: e }, (res) => {
            res.gameType = "battle";
            this.navigator.push('MatchView', res);
        })
    }
}