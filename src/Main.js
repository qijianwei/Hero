import GameConfig from "./GameConfig";
import config from './Config'
import GameMain from "./scripts/common/GameMain";
import HeroConfig from "./gamescripts/config/HeroConfig";
import { Global } from "./scripts/common/tool/Global";
import SoundManager from "./gamescripts/SoundManager";
export class Main extends GameMain {
	constructor() {
		var params = {
			gameId: 1006,
			baseURL: config.debug ? "https://juedi001test.goxiaochengxu.cn/ServiceCore/" : "https://juedi001.goxiaochengxu.cn/ServiceCore/",
			zone: "cate",
			showStat: false,
			showDebugTool: true,
			userId: 11120, //151693, 109638
			offerId: "1450014295",
			version: config.version,
			rankingType: PaoYa.RankingType.WIN,
			release: config.release,
			//ignoreCmds: [],
			debug: config.debug,
			ignoreCmds: ['defeated', 'message'],
			showBannerAdWhenDialogPopup: false,
			adUnitId: 'adunit-f54386c29a35dd95',
			interstitialUnitId: 'adunit-92a0cb233fbbaacb',
			bannerUnitId: 'adunit-4bec7f17587df319', //bannerID
			adUnitIdLong: 'adunit-e2f9bd1a37b91681',
			portrait: false,
			loadNetworkRes: true,
			is_config: 0
		};
		super(params)

	}
	setupConfig() {
		let _this = this;
		//Laya.MouseManager.enabled=false;
		Laya.MouseManager.multiTouchEnabled = false; //关闭多点触控
		super.setupConfig();
		if (typeof wx != 'undefined') {
			Global.gameHeight = wx.getSystemInfoSync().windowWidth
			Global.AdaptiveWidth = Global.gameHeight > 800 ? 142 : 0
		}
		PaoYa.Navigator.scenesMap = {
			WeaponHouse: `scenes/common/WeaponHouse`,
			WeaponStore: `scenes/common/WeaponStore`,
			Swordsman: `scenes/common/Swordsman`,
			Swordsman: `scenes/common/Swordsman`,
			MatchView: 'scenes/common/Match/MatchView',
			Grading: 'scenes/common/Grading',
			Devour: 'scenes/common/Devour',
			Refining: 'scenes/common/Refining',
			Sign: 'scenes/common/Sign',
			Wheel: 'scenes/common/Wheel',
			WeapList: 'scenes/common/WeapList',

		}
		//分享地址
		//PaoYa.ShareManager.imageURL = "https://res.xingqiu123.com/1028/share/share.jpg";

		PaoYa.DataCenter.GAMEPREPARE = {
			sync() {
				_this.loadFontFnt(0);
				console.log('【同步】准备工作已完成')
			}
		};

		if (typeof wx != 'undefined' || Laya.Render.isConchApp) {
			// console.log=function(){};
			wx.onMemoryWarning(function () {
				console.error('内存不足')
			})
		}
		PaoYa.SoundManager.onShowHandler = function () {
			SoundManager.ins.playMusic(SoundManager.curBg);
		}
		/* 	
			PaoYa.SoundManager.onHideHandler = function () {
				Laya.SoundManager.stopAll();
			}
			PaoYa.SoundManager.onShowHandler = function () {
				SoundManager.playMusic("mainBgm");
			}
			PaoYa.SoundManager.onAudioInterruptionBeginHandler = function () {
				Laya.SoundManager.stopAll();
			}
			PaoYa.SoundManager.onAudioInterruptionEndHandler = function () {
				Laya.SoundManager.playMusic(SoundManager.currentUrl, 0);
			}
			SoundManager.playMusic("mainBgm"); */

		this.arrayFont = [
			{
				fontUrl: "font/weapon/lvfont.fnt",
				fontAni: "weaponNFontT"
			}, 
			{
				fontUrl: "font/figure/msz.fnt",
				fontAni: "figureDetail"
			},{
				fontUrl: "font/recMP.fnt",
				fontAni: "recoverMP"
			},
			{
				fontUrl: "font/recHP.fnt",
				fontAni: "recoverHP"
			},
			{
				fontUrl: "font/hurt.fnt",
				fontAni: "hurt"
			},
			{
				fontUrl: "font/crit.fnt",
				fontAni: "crit"
			},
			{
				fontUrl: "font/poision.fnt",
				fontAni: "poision"
			},
			{
				fontUrl: "font/playerState.fnt",
				fontAni: "playerState"
			},
			{
				fontUrl: "font/playerSkill.fnt",
				fontAni: "playerSkill"
			},
			{
				fontUrl: "font/weaponSkill.fnt",
				fontAni: "weaponSkill"
			},
			{
				fontUrl: "font/weapon/detailfont.fnt",
				fontAni: "weaponDFont"
			},
			{
				fontUrl: "font/adventure.fnt",
				fontAni: "adventure"
			}
		]

		HeroConfig.loadAllSpine();
	}
	setupAsyncRes() {
		let prepareList = [
			/* 武器上的动效 */
			'res/atlas/remote/weapon_effect/weapon_blood.atlas',
			'res/atlas/remote/weapon_effect/weapon_blue.atlas',
			'res/atlas/remote/weapon_effect/weapon_crits.atlas',
			'res/atlas/remote/weapon_effect/weapon_freeze.atlas',
			'res/atlas/remote/weapon_effect/weapon_palsy.atlas',
			'res/atlas/remote/weapon_effect/weapon_poison.atlas',
			'res/atlas/remote/weapon_effect/weapon_reduce.atlas',
			'res/atlas/remote/weapon_effect/weapon_repeat.atlas',
			'res/atlas/remote/weapon_effect/weapon_thump.atlas',
			/*触发技能动效  */
			'res/atlas/remote/trigger_skill.atlas',
			'res/atlas/remote/debuff_dizzy.atlas',
			'res/atlas/remote/debuff_palsy.atlas',
			'res/atlas/remote/debuff_poison.atlas',
			'res/atlas/remote/injured.atlas',
			'res/atlas/remote/recover_blood.atlas',
			'res/atlas/remote/recover_power.atlas',
			'res/atlas/remote/trigger_skill.atlas',
			'res/atlas/remote/warn_arms.atlas', //cd发光效果
			'res/atlas/remote/collision.atlas',
		];
		return prepareList;
	}
	loadFontFnt(index) {
		if (index < this.arrayFont.length) {
			var font = new Laya.BitmapFont();
			var itemFont = this.arrayFont[index];
			var _this = this
			font.loadFont(itemFont.fontUrl, Laya.Handler.create(_this, function () {
				Laya.Text.registerBitmapFont(itemFont.fontAni, font);
				index++;
				_this.loadFontFnt(index);
			}))
		}
	}
	/**此处返回游戏需要提前加载的资源，必须返回一个数组 */
	setupGameRes() {
		let list = [
			/* 首屏资源和公共资源 */
			'scenes/HomeView.scene',
			'local/home/homeNewBg.jpg',
			'local/home/homeBg.jpg',
			'res/atlas/local/common.atlas',
			'res/atlas/local/home.atlas',
			'res/atlas/remote/guide.atlas',
			'res/atlas/remote/grading.atlas',
			'res/atlas/remote/adventure.atlas',

			'remote/game/scene1.jpg',
			'remote/guide/textBg.png',
			/* 动效animation资源 */
			'res/atlas/remote/debuff_dizzy.atlas',
			'res/atlas/remote/debuff_palsy.atlas',
			'res/atlas/remote/debuff_poison.atlas',
			'res/atlas/remote/injured.atlas',
			'res/atlas/remote/recover_blood.atlas',
			'res/atlas/remote/recover_power.atlas',
			'res/atlas/remote/trigger_skill.atlas',
			'res/atlas/remote/warn_arms.atlas',//cd发光效果
			'res/atlas/remote/collision.atlas',

			/* 武器上的动效 */
			'res/atlas/remote/weapon_effect/weapon_blood.atlas',
			'res/atlas/remote/weapon_effect/weapon_blue.atlas',
			'res/atlas/remote/weapon_effect/weapon_crits.atlas',
			'res/atlas/remote/weapon_effect/weapon_freeze.atlas',
			'res/atlas/remote/weapon_effect/weapon_palsy.atlas',
			'res/atlas/remote/weapon_effect/weapon_poison.atlas',
			'res/atlas/remote/weapon_effect/weapon_reduce.atlas',
			'res/atlas/remote/weapon_effect/weapon_repeat.atlas',
			'res/atlas/remote/weapon_effect/weapon_thump.atlas',

			/* 技能 */
			'res/atlas/remote/hero_skill/hero1_skill1.atlas',
			'res/atlas/remote/hero_skill/hero1_skill2.atlas',
			'res/atlas/remote/hero_skill/hero2_skill1.atlas',
			'res/atlas/remote/hero_skill/hero2_skill2.atlas',

			'res/atlas/remote/recover_blood.atlas',
			'res/atlas/remote/recover_power.atlas',

			/* 武器图标 */
			'res/atlas/remote/weapons.atlas',
			'res/atlas/remote/small_weapons.atlas',
			'res/atlas/remote/game.atlas'
		];
		return list
	}
	onShareAppMessage() {
		let random = Math.round(Math.random() * (PaoYa.DataCenter.config.game.share_list.length - 1))
		return {
			title: PaoYa.DataCenter.config.game.share_list[random],
			imageUrl: PaoYa.DataCenter.CDNURL + PaoYa.DataCenter.config.game.share_img[random],
			query: ""
		}
	}
}
//激活启动类
new Main();
Laya.UIConfig.closeDialogOnSide = false;

if (!config.debug) {
 	console.log = function () { };
	console.warn = function () { };
	 console.error = function () { };  
} else {
 	if(window[`wx`]){
		console.log = function () { };
	console.warn = function () { };
	console.error = function () { };
	} 
	//console.log = function () { };
	Laya.Stat.show();
}

