import LoadingView from "./Loading/LoadingView";
export default class GameMain extends PaoYa.Main {

	setupOthers() {
	
	}

	setupConfig() {
		let resList = [];
		/**添加必要网络资源 */
		/* [
		].forEach(url => {
			resList.push(`${PaoYa.DataCenter.CDNURL}${url}`)
		}) */

		/**加载必要首屏界面资源 */
	/* 	let scenes = [
			
		]
		resList = resList.concat(scenes) */
		/**加载游戏界面所需资源 */
		//resList = resList.concat(this.setupGameRes())

		PaoYa.DataCenter.GAMERES = this.setupGameRes();
		//分享地址
		PaoYa.ShareManager.makeShareImageURLHandler = function () {
			return PaoYa.DataCenter.CDNURL + PaoYa.DataCenter.config.game.share_img.randomItem;
		};
	}

	setupLoadingView(cb) {
		Laya.Scene.load('scenes/common/Loading/LoadWaitingView.scene', Laya.Handler.create(this, function (scene) {
		 	PaoYa.Navigator.adjustViewPosition(scene)
			Laya.Scene.setLoadingPage(scene) 
			Laya.AtlasInfoManager.enable('fileconfig.json', Laya.Handler.create(this, cb))
		}))
	}

	initRootScene(launchInfo, isFirstLaunch) {
		PaoYa.ShareManager.isShare=false;
		this.navigator.push("HomeView", {}, null, Laya.Handler.create(this, () => {
			PaoYa.LaunchScreenView.hide();
		}), null);
	}
	onHide(res) {
		if (PaoYa.ShareManager.isShare) {
			return;
		}
		if (PaoYa.navigator.visibleScene.url.indexOf('FBView') >= 0) {
			console.warn("在邀请界面");
			return;
		}
		if (res && res.mode != undefined && res.targetAction != undefined && !(res.mode == "hide" && res.targetAction == 8)) {
			this.socket.sendMessage(PaoYa.Client.LEAVE_ROOM, {})
			Laya.Dialog.manager.closeAll()
			this.navigator.popToRootScene()
		}
	}
}