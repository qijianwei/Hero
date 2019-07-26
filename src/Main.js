import GameConfig from "./GameConfig";
import config from './Config'
import GameMain from "./scripts/common/GameMain";
import HeroConfig from "./gamescripts/config/HeroConfig";
export class Main extends GameMain {
	constructor() {
		var params = {
			gameId: 1006,
			// baseURL: "https://wxapi.xingqiu123.com/ServiceCore/",
			baseURL: "https://juedi001test.goxiaochengxu.cn/ServiceCore/",
		//	baseURL:"https://juedi001test.goxiaochengxu.cn/ServiceCore/",
			zone: "cate",
			showStat: false,
			showDebugTool: true,
			userId: 11012, //151693, 109638
			offerId: "1450014295",
			version: config.version,
			rankingType: PaoYa.RankingType.WIN,
			release: config.release,
			//ignoreCmds: [],
			debug: true,
			ignoreCmds:['defeated','message'],
			showBannerAdWhenDialogPopup:false,
			adUnitId:'adunit-7860aaf8ed04aeb2',
			bannerUnitId: 'adunit-4bec7f17587df319',//bannerID
			portrait:"landscape",
			is_config:0
		};
		super(params)
		
	}
	setupConfig() {
		//Laya.MouseManager.enabled=false;
		Laya.MouseManager.multiTouchEnabled = false;//关闭多点触控
		super.setupConfig();
		//分享地址
		PaoYa.ShareManager.imageURL = "https://res.xingqiu123.com/1028/share/share.jpg";
		PaoYa.DataCenter.GAMEPREPARE = null;
	
		if(typeof wx!='undefined' || Laya.Render.isConchApp){
			// console.log=function(){};
			wx.onMemoryWarning(function() {
				console.error('内存不足')
			})
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
		HeroConfig.loadAllSpine();
	}
	/**此处返回游戏需要提前加载的资源，必须返回一个数组 */
	setupGameRes() {
		let list = [
			'res/atlas/remote/game.atlas',
			'res/atlas/remote/weapons.atlas',
			'spine/npc/npc_7.png',
			'spine/npc/npc_7.sk',
			'spine/freeze/freeze.png',
			'spine/freeze/freeze.sk',
			/* 动效animation资源 */
			'res/atlas/remote/debuff_dizzy.atlas',
			'res/atlas/remote/debuff_palsy.atlas',
			'res/atlas/remote/debuff_poison.atlas',
			'res/atlas/remote/injured.atlas',
			'res/atlas/remote/recover_blood.atlas',
			'res/atlas/remote/recover_power.atlas',
			'res/atlas/remote/trigger_skill.atlas',
			'res/atlas/remote/warn_arms.atlas'//cd发光效果
		];		
		return list
	}
	onShareAppMessage() {
		return {
			title: PaoYa.DataCenter.config.game.share_list.randomItem,
			imageUrl: PaoYa.DataCenter.CDNURL + PaoYa.DataCenter.config.game.share_img.randomItem,
			query: ""
		}
	}
}
//激活启动类
new Main();