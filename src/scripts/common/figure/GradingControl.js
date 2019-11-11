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
                    success(res){
                        PaoYa.DataCenter.userInfoAuth=true;
                        PaoYa.DataCenter.user.avstar=res.userInfo.avatarUrl;
                        PaoYa.DataCenter.user.nickname=res.userInfo.nickName;
                        PaoYa.NotificationCenter.postNotification(`AuthOK`);
                        PaoYa.Request.POST('update_profile', { icon_big: res.userInfo.avatarUrl, name: res.userInfo.nickName }, () => {
                            _this.gameRole(_this.owner.showDetail.roleId)
                         })
                    },
                    next() {
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