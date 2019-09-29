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
        this.owner.lisenClick(e)
    }
    
    gameRole(e) {
        this.POST("hero_match_game_start", { roleId: e }, (res) => {
            res.gameType = "battle";
            this.navigator.push('MatchView', res);
        })
    }
}