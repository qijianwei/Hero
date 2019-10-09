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
                SoundManager.ins.btn()
                this.gameRole(this.owner.showDetail.roleId)
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