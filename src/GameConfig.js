/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import AdventDialog from "./gamescripts/dialog/AdventDialog"
import AdventDialog5 from "./gamescripts/dialog/AdventDialog5"
import AdventResultDialog from "./gamescripts/dialog/AdventResultDialog"
import AdventResultDialog5 from "./gamescripts/dialog/AdventResultDialog5"
import BattleResultDialog from "./gamescripts/dialog/BattleResultDialog"
import White from "./scripts/prefab/White"
import PassResultDialog from "./gamescripts/dialog/PassResultDialog"
import WeaponBar from "./gamescripts/prefab/WeaponBar"
import PassResultDialogLoseOne from "./gamescripts/dialog/PassResultDialogLoseOne"
import GameGuide from "./gamescripts/GameGuide/GameGuide"
import MPBar from "./gamescripts/prefab/MPBar"
import HPBar from "./gamescripts/prefab/HPBar"
import Dodge from "./gamescripts/prefab/Dodge"
import GameBanner from "./gamescripts/prefab/GameBanner"
import PlayerState from "./gamescripts/prefab/PlayerState"
import PlayerSkill from "./gamescripts/prefab/PlayerSkill"
import Skill from "./gamescripts/prefab/Skill"
import GameGuideControl from "./gamescripts/gameGuide/GameGuideControl"
import GameView from "./gamescripts/GameView"
import GameControl from "./gamescripts/GameControl"
import Devour from "./scripts/common/refiner/Devour"
import DevourControl from "./scripts/common/refiner/DevourControl"
import Grading from "./scripts/common/figure/Grading"
import GradingControl from "./scripts/common/figure/GradingControl"
import LoadingView from "./scripts/common/Loading/LoadingView"
import LoadingControl from "./scripts/common/Loading/LoadingControl"
import MatchView from "./scripts/common/Match/MatchView"
import MatchControl from "./scripts/common/Match/MatchControl"
import Refining from "./scripts/common/refiner/Refining"
import RefiningControl from "./scripts/common/refiner/RefiningControl"
import Sign from "./scripts/common/sign/Sign"
import SignControl from "./scripts/common/sign/SignControl"
import Swordsman from "./scripts/common/figure/Swordsman"
import SwordsmanControl from "./scripts/common/figure/SwordsmanControl"
import WeaponList from "./scripts/common/task/WeaponList"
import WeaponListControl from "./scripts/common/task/WeaponListControl"
import WeaponHouse from "./scripts/common/weapon/WeaponHouse"
import WeaponHouseControl from "./scripts/common/weapon/WeaponHouseControl"
import WeaponStore from "./scripts/common/weapon/WeaponStore"
import WeaponStoreControl from "./scripts/common/weapon/WeaponStoreControl"
import Wheel from "./scripts/common/wheel/Wheel"
import WheelControl from "./scripts/common/wheel/WheelControl"
import BuyWp from "./scripts/dialog/adventure/BuyWp"
import ChangeWp from "./scripts/dialog/adventure/ChangeWp"
import GetAward from "./scripts/dialog/adventure/GetAward"
import Award from "./scripts/dialog/common/Award"
import BuyWheelTimes from "./scripts/dialog/common/BuyWheelTimes"
import Rank from "./scripts/dialog/common/Rank"
import Task from "./scripts/dialog/common/Task"
import BuyHero from "./scripts/dialog/figure/BuyHero"
import GetNewSkill from "./scripts/dialog/figure/GetNewSkill"
import SkillDetail from "./scripts/dialog/figure/SkillDetail"
import Canlock from "./scripts/dialog/refiner/Canlock"
import DiamondLack from "./scripts/dialog/weapon/DiamondLack"
import GoldLack from "./scripts/dialog/weapon/GoldLack"
import StoreSure from "./scripts/dialog/weapon/StoreSure"
import UnlockFifth from "./scripts/dialog/weapon/UnlockFifth"
import UnlockFour from "./scripts/dialog/weapon/UnlockFour"
import UnlockTips from "./scripts/dialog/weapon/UnlockTips"
import BeanBox from "./scripts/prefab/BeanBox"
import HomeControl from "./scripts/common/HomeControl"
import Cross from "./gamescripts/prefab/Cross"
import SpeakMan from "./gamescripts/gameGuide/SpeakMan"
import Player from "./gamescripts/prefab/Player"
import PreOpenView from "./gamescripts/preOpen/PreOpenView"
import Weapon from "./gamescripts/prefab/Weapon"
import WeaponSkill from "./gamescripts/prefab/WeaponSkill"

export default class GameConfig {
    static init() {
        //注册Script或者Runtime引用
        let reg = Laya.ClassUtils.regClass;
		reg("gamescripts/dialog/AdventDialog.js",AdventDialog);
		reg("gamescripts/dialog/AdventDialog5.js",AdventDialog5);
		reg("gamescripts/dialog/AdventResultDialog.js",AdventResultDialog);
		reg("gamescripts/dialog/AdventResultDialog5.js",AdventResultDialog5);
		reg("gamescripts/dialog/BattleResultDialog.js",BattleResultDialog);
		reg("scripts/prefab/White.js",White);
		reg("gamescripts/dialog/PassResultDialog.js",PassResultDialog);
		reg("gamescripts/prefab/WeaponBar.js",WeaponBar);
		reg("gamescripts/dialog/PassResultDialogLoseOne.js",PassResultDialogLoseOne);
		reg("gamescripts/GameGuide/GameGuide.js",GameGuide);
		reg("gamescripts/prefab/MPBar.js",MPBar);
		reg("gamescripts/prefab/HPBar.js",HPBar);
		reg("gamescripts/prefab/Dodge.js",Dodge);
		reg("gamescripts/prefab/GameBanner.js",GameBanner);
		reg("gamescripts/prefab/PlayerState.js",PlayerState);
		reg("gamescripts/prefab/PlayerSkill.js",PlayerSkill);
		reg("gamescripts/prefab/Skill.js",Skill);
		reg("gamescripts/gameGuide/GameGuideControl.js",GameGuideControl);
		reg("gamescripts/GameView.js",GameView);
		reg("gamescripts/GameControl.js",GameControl);
		reg("scripts/common/refiner/Devour.js",Devour);
		reg("scripts/common/refiner/DevourControl.js",DevourControl);
		reg("scripts/common/figure/Grading.js",Grading);
		reg("scripts/common/figure/GradingControl.js",GradingControl);
		reg("scripts/common/Loading/LoadingView.js",LoadingView);
		reg("scripts/common/Loading/LoadingControl.js",LoadingControl);
		reg("scripts/common/Match/MatchView.js",MatchView);
		reg("scripts/common/Match/MatchControl.js",MatchControl);
		reg("scripts/common/refiner/Refining.js",Refining);
		reg("scripts/common/refiner/RefiningControl.js",RefiningControl);
		reg("scripts/common/sign/Sign.js",Sign);
		reg("scripts/common/sign/SignControl.js",SignControl);
		reg("scripts/common/figure/Swordsman.js",Swordsman);
		reg("scripts/common/figure/SwordsmanControl.js",SwordsmanControl);
		reg("scripts/common/task/WeaponList.js",WeaponList);
		reg("scripts/common/task/WeaponListControl.js",WeaponListControl);
		reg("scripts/common/weapon/WeaponHouse.js",WeaponHouse);
		reg("scripts/common/weapon/WeaponHouseControl.js",WeaponHouseControl);
		reg("scripts/common/weapon/WeaponStore.js",WeaponStore);
		reg("scripts/common/weapon/WeaponStoreControl.js",WeaponStoreControl);
		reg("scripts/common/wheel/Wheel.js",Wheel);
		reg("scripts/common/wheel/WheelControl.js",WheelControl);
		reg("scripts/dialog/adventure/BuyWp.js",BuyWp);
		reg("scripts/dialog/adventure/ChangeWp.js",ChangeWp);
		reg("scripts/dialog/adventure/GetAward.js",GetAward);
		reg("scripts/dialog/common/Award.js",Award);
		reg("scripts/dialog/common/BuyWheelTimes.js",BuyWheelTimes);
		reg("scripts/dialog/common/Rank.js",Rank);
		reg("scripts/dialog/common/Task.js",Task);
		reg("scripts/dialog/figure/BuyHero.js",BuyHero);
		reg("scripts/dialog/figure/GetNewSkill.js",GetNewSkill);
		reg("scripts/dialog/figure/SkillDetail.js",SkillDetail);
		reg("scripts/dialog/refiner/Canlock.js",Canlock);
		reg("scripts/dialog/weapon/DiamondLack.js",DiamondLack);
		reg("scripts/dialog/weapon/GoldLack.js",GoldLack);
		reg("scripts/dialog/weapon/StoreSure.js",StoreSure);
		reg("scripts/dialog/weapon/UnlockFifth.js",UnlockFifth);
		reg("scripts/dialog/weapon/UnlockFour.js",UnlockFour);
		reg("scripts/dialog/weapon/UnlockTips.js",UnlockTips);
		reg("scripts/prefab/BeanBox.js",BeanBox);
		reg("scripts/common/HomeControl.js",HomeControl);
		reg("gamescripts/prefab/Cross.js",Cross);
		reg("gamescripts/gameGuide/SpeakMan.js",SpeakMan);
		reg("gamescripts/prefab/Player.js",Player);
		reg("gamescripts/preOpen/PreOpenView.js",PreOpenView);
		reg("gamescripts/prefab/Weapon.js",Weapon);
		reg("gamescripts/prefab/WeaponSkill.js",WeaponSkill);
    }
}
GameConfig.width = 1134;
GameConfig.height = 750;
GameConfig.scaleMode ="fixedwidth";
GameConfig.screenMode = "horizontal";
GameConfig.alignV = "top";
GameConfig.alignH = "left";
GameConfig.startScene = "gamescenes/dialog/PassResultDialogLose2.scene";
GameConfig.sceneRoot = "";
GameConfig.debug = false;
GameConfig.stat = false;
GameConfig.physicsDebug = false;
GameConfig.exportSceneToJson = true;

GameConfig.init();
