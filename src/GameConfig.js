/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import PassResultDialog from "./gamescripts/dialog/PassResultDialog"
import GameView from "./gamescripts/GameView"
import MPBar from "./gamescripts/prefab/MPBar"
import HPBar from "./gamescripts/prefab/HPBar"
import Dodge from "./gamescripts/prefab/Dodge"
import GameBanner from "./gamescripts/prefab/GameBanner"
import Skill from "./gamescripts/prefab/Skill"
import PlayerState from "./gamescripts/prefab/PlayerState"
import GameControl from "./gamescripts/GameControl"
import PlayerSkill from "./gamescripts/prefab/PlayerSkill"
import Player from "./gamescripts/prefab/Player"
import LoadingView from "./scripts/common/Loading/LoadingView"
import LoadingControl from "./scripts/common/Loading/LoadingControl"
import HomeControl from "./scripts/common/HomeControl"
import Weapon from "./gamescripts/prefab/Weapon"
import WeaponBar from "./gamescripts/prefab/WeaponBar"

export default class GameConfig {
    static init() {
        //注册Script或者Runtime引用
        let reg = Laya.ClassUtils.regClass;
		reg("gamescripts/dialog/PassResultDialog.js",PassResultDialog);
		reg("gamescripts/GameView.js",GameView);
		reg("gamescripts/prefab/MPBar.js",MPBar);
		reg("gamescripts/prefab/HPBar.js",HPBar);
		reg("gamescripts/prefab/Dodge.js",Dodge);
		reg("gamescripts/prefab/GameBanner.js",GameBanner);
		reg("gamescripts/prefab/Skill.js",Skill);
		reg("gamescripts/prefab/PlayerState.js",PlayerState);
		reg("gamescripts/GameControl.js",GameControl);
		reg("gamescripts/prefab/PlayerSkill.js",PlayerSkill);
		reg("gamescripts/prefab/Player.js",Player);
		reg("scripts/common/Loading/LoadingView.js",LoadingView);
		reg("scripts/common/Loading/LoadingControl.js",LoadingControl);
		reg("scripts/common/HomeControl.js",HomeControl);
		reg("gamescripts/prefab/Weapon.js",Weapon);
		reg("gamescripts/prefab/WeaponBar.js",WeaponBar);
    }
}
GameConfig.width = 1134;
GameConfig.height = 750;
GameConfig.scaleMode ="fixedwidth";
GameConfig.screenMode = "horizontal";
GameConfig.alignV = "top";
GameConfig.alignH = "left";
GameConfig.startScene = "gamescenes/GameView.scene";
GameConfig.sceneRoot = "";
GameConfig.debug = false;
GameConfig.stat = false;
GameConfig.physicsDebug = false;
GameConfig.exportSceneToJson = true;

GameConfig.init();
