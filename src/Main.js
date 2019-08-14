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
			userId: 11058, //151693, 109638
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
			loadNetworkRes:true,
			is_config:0
		};
		super(params)
		
	}
	setupConfig() {
		//Laya.MouseManager.enabled=false;
		Laya.MouseManager.multiTouchEnabled = false;//关闭多点触控
		super.setupConfig();

		PaoYa.Navigator.scenesMap={
			WeaponHouse:`scenes/common/WeaponHouse`,
			WeaponStore:`scenes/common/WeaponStore`
		}

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
		this.arrayFont = [
            { fontUrl: "font/recMP.fnt", fontAni: "recoverMP" },
            { fontUrl: "font/recHP.fnt", fontAni: "recoverHP" },
            { fontUrl: "font/hurt.fnt", fontAni: "hurt" },
			{ fontUrl: "font/crit.fnt", fontAni: "crit" },
			{fontUrl:"font/poision.fnt",fontAni:"poision"},
			{fontUrl:"font/playerState.fnt",fontAni:"playerState"},
			{fontUrl:"font/playerSkill.fnt",fontAni:"playerSkill"},
			{fontUrl:"font/weapon/detailfont.fnt",fontAni:"weaponDFont"},
			{fontUrl:"font/weapon/lvfont.fnt",fontAni:"weaponNFontT"},
			/* {} */
        ]
		this.loadFontFnt(0);
	}
	loadFontFnt(index) {
		if (index < this.arrayFont.length) {
			var font = new Laya.BitmapFont();
			var itemFont = this.arrayFont[index];
			var _this = this
			font.loadFont(PaoYa.DataCenter.RESURL+itemFont.fontUrl, Laya.Handler.create(_this, function () {
				Laya.Text.registerBitmapFont(itemFont.fontAni, font);
				index++;
				_this.loadFontFnt(index);
			}))
		}
	}
	/**此处返回游戏需要提前加载的资源，必须返回一个数组 */
	setupGameRes() {
		let list = [
			'res/atlas/remote/game.atlas',
			'res/atlas/remote/weapons.atlas',

			'spine/npc/npc_7.png',
			'spine/npc/npc_7.sk',
			'spine/hero/hero_1.png',
			'spine/hero/hero_1.sk',
			/* 动效animation资源 */
			'res/atlas/remote/debuff_dizzy.atlas',
			'res/atlas/remote/debuff_palsy.atlas',
			'res/atlas/remote/debuff_poison.atlas',
			'res/atlas/remote/injured.atlas',
			'res/atlas/remote/recover_blood.atlas',
			'res/atlas/remote/recover_power.atlas',
			'res/atlas/remote/trigger_skill.atlas',
			'res/atlas/remote/warn_arms.atlas',//cd发光效果
			'res/atlas/remote/hero_skill/hero1_skill2.atlas',
			'res/atlas/remote/collision.atlas',
			'res/atlas/remote/debuff_dizzy.atlas',
		
			'res/atlas/remote/hero_skill/hero1_skill2.atlas',
			'res/atlas/remote/recover_blood.atlas',
			'res/atlas/remote/recover_power.atlas',
			'res/atlas/remote/small_weapons.atlas',
			'res/atlas/remote/trigger_skill.atlas',

			'res/atlas/remote/weapon_effect/weapon_blood.atlas',
			'res/atlas/remote/weapon_effect/weapon_blue.atlas',
			'res/atlas/remote/weapon_effect/weapon_crits.atlas',
			'res/atlas/remote/weapon_effect/weapon_freeze.atlas',
			'res/atlas/remote/weapon_effect/weapon_palsy.atlas',
			'res/atlas/remote/weapon_effect/weapon_poison.atlas',
			'res/atlas/remote/weapon_effect/weapon_reduce.atlas',
			'res/atlas/remote/weapon_effect/weapon_repeat.atlas',
			'res/atlas/remote/weapon_effect/weapon_thump.atlas',
			
	
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
 /*   console.log=function(){};
console.warn=function(){};
console.error=function(){};  */ 