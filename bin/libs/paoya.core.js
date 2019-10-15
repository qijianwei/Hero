/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _paoya__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _export__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);


function inject() {
    for (const key in _export__WEBPACK_IMPORTED_MODULE_1__) {
        _paoya__WEBPACK_IMPORTED_MODULE_0__["default"][key] = _export__WEBPACK_IMPORTED_MODULE_1__[key];
    }
}
inject();
window['PaoYa'] = window['PaoYa'] || _paoya__WEBPACK_IMPORTED_MODULE_0__["default"];


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class PaoYa {
}
const paoya = new PaoYa();
/* harmony default export */ __webpack_exports__["default"] = (paoya);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_navigator_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return _core_navigator_Component__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _core_navigator_View__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "View", function() { return _core_navigator_View__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _core_navigator_Dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Dialog", function() { return _core_navigator_Dialog__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _core_navigator_Navigator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Navigator", function() { return _core_navigator_Navigator__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _core_network_Request__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Request", function() { return _core_network_Request__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _core_network_Client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(20);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Client", function() { return _core_network_Client__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _core_NotificationCenter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NotificationCenter", function() { return _core_NotificationCenter__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NotificationName", function() { return _core_NotificationCenter__WEBPACK_IMPORTED_MODULE_6__["NotificationName"]; });

/* harmony import */ var _core_Observer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(13);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Observer", function() { return _core_Observer__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _dataTrack_dataTrack__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataTrack", function() { return _dataTrack_dataTrack__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataTrackType", function() { return _dataTrack_dataTrack__WEBPACK_IMPORTED_MODULE_8__["DataTrackType"]; });

/* harmony import */ var _game_enums__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(12);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PrizeType", function() { return _game_enums__WEBPACK_IMPORTED_MODULE_9__["PrizeType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ShareType", function() { return _game_enums__WEBPACK_IMPORTED_MODULE_9__["ShareType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RectCorner", function() { return _game_enums__WEBPACK_IMPORTED_MODULE_9__["RectCorner"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GameEntryType", function() { return _game_enums__WEBPACK_IMPORTED_MODULE_9__["GameEntryType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SocketURLType", function() { return _game_enums__WEBPACK_IMPORTED_MODULE_9__["SocketURLType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RankingType", function() { return _game_enums__WEBPACK_IMPORTED_MODULE_9__["RankingType"]; });

/* harmony import */ var _game_main_main__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(22);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Main", function() { return _game_main_main__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _game_DataCenter__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(10);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataCenter", function() { return _game_DataCenter__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _game_service_LoginService__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(9);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LoginService", function() { return _game_service_LoginService__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _game_service_TimerService__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(31);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimerService", function() { return _game_service_TimerService__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _game_view_LaunchScreenView__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(25);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LaunchScreenView", function() { return _game_view_LaunchScreenView__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony import */ var _game_view_LoginMaskView__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(32);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LoginMaskView", function() { return _game_view_LoginMaskView__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony import */ var _game_view_RoundImageView__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(33);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RoundImageView", function() { return _game_view_RoundImageView__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony import */ var _laya_sound__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(29);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SoundManager", function() { return _laya_sound__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony import */ var _wx_manager_AuthManager__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(34);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthManager", function() { return _wx_manager_AuthManager__WEBPACK_IMPORTED_MODULE_18__["default"]; });

/* harmony import */ var _wx_manager_PayManager__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(28);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PayManager", function() { return _wx_manager_PayManager__WEBPACK_IMPORTED_MODULE_19__["default"]; });

/* harmony import */ var _wx_manager_ShareManager__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(7);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ShareManager", function() { return _wx_manager_ShareManager__WEBPACK_IMPORTED_MODULE_20__["default"]; });

/* harmony import */ var _wx_monitor_LifeCircleMonitor__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(27);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LifeCircleMonitor", function() { return _wx_monitor_LifeCircleMonitor__WEBPACK_IMPORTED_MODULE_21__["default"]; });

/* harmony import */ var _wx_monitor_NetworkMonitor__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(26);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NetworkMonitor", function() { return _wx_monitor_NetworkMonitor__WEBPACK_IMPORTED_MODULE_22__["default"]; });

/* harmony import */ var _wx_Toast__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(14);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Toast", function() { return _wx_Toast__WEBPACK_IMPORTED_MODULE_23__["default"]; });

/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(11);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Utils", function() { return _utils_utils__WEBPACK_IMPORTED_MODULE_24__["default"]; });

/* harmony import */ var _wx_ad_rewardedVideoAd__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(15);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RewardedVideoAd", function() { return _wx_ad_rewardedVideoAd__WEBPACK_IMPORTED_MODULE_25__["default"]; });

/* harmony import */ var _wx_ad_bannerAd__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(16);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BannerAd", function() { return _wx_ad_bannerAd__WEBPACK_IMPORTED_MODULE_26__["default"]; });

/* harmony import */ var _wx_ad_interstitialAd__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(36);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InterstitialAd", function() { return _wx_ad_interstitialAd__WEBPACK_IMPORTED_MODULE_27__["default"]; });

/* harmony import */ var _wx_manager_AuthUserInfoDialog__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(35);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthUserInfoDialog", function() { return _wx_manager_AuthUserInfoDialog__WEBPACK_IMPORTED_MODULE_28__["default"]; });

/* harmony import */ var _utils_Array__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(37);
/* harmony import */ var _utils_Array__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(_utils_Array__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var _utils_Date__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(38);
/* harmony import */ var _utils_Date__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(_utils_Date__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var _utils_Number__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(39);
/* harmony import */ var _utils_Number__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(_utils_Number__WEBPACK_IMPORTED_MODULE_31__);
/* harmony import */ var _laya_laya__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(40);



































/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Component; });
/* harmony import */ var _network_Request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _wx_manager_ShareManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _NotificationCenter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _paoya__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);
/* harmony import */ var _wx_ad_rewardedVideoAd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15);
/* harmony import */ var _wx_ad_bannerAd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(16);
/* harmony import */ var _game_DataCenter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);







class Component extends Laya.Script {
    constructor() {
        super(...arguments);
        this._requests = [];
        this.socket = _paoya__WEBPACK_IMPORTED_MODULE_3__["default"].socket;
        this.dialogs = [];
        this.bannerAds = [];
        this.navigator = _paoya__WEBPACK_IMPORTED_MODULE_3__["default"].navigator;
    }
    _onEnable() {
        super._onEnable();
        this.owner.addClickListener(this, this.onThrottleClick, true);
    }
    _onViewClick(e) {
        switch (e.target.name) {
            case 'pop':
                this.navigator.pop();
                break;
            case 'popToRoot':
                this.navigator.popToRootScene();
                break;
        }
        this.onThrottleClick(e);
    }
    /**有节制的点击，防止用户点击频率过快，默认间隔500ms */
    onThrottleClick(e) {
    }
    _onLoad() {
        this.onLoad();
    }
    onLoad() {
    }
    _onAppear() {
        this.showAllBannerAd();
        this.onAppear();
    }
    onAppear() {
    }
    _onDisappear() {
        this.hideAllBannerAd();
        this.onDisappear();
    }
    onDisappear() {
    }
    _destroy() {
        this.offMessageListener();
        this.offNotificationListener();
        this.destroyXMR();
        this.destroyBannerAd();
        super._destroy();
    }
    _onReceiveMessage(cmd, value) {
        if (!this.enabled)
            return;
        this.onReceiveMessage(cmd, value);
    }
    _onReceiveSocketError(cmd, code, message) {
        this.onReceiveSocketError(cmd, code, message);
    }
    /**当前 scene 收到服务器 socket 命令时触发，虚方法 */
    onReceiveMessage(cmd, value) {
    }
    /**当前 scene 收到服务器socket命令错误时触发，虚方法 */
    onReceiveSocketError(cmd, code, message) {
    }
    /**添加socket事件监听 */
    onMessage(name, caller, listener, args) {
        this.socket.on(name, caller, listener, args);
    }
    /**移除socket的事件监听 */
    offMessageListener() {
        this.socket && this.socket.offAllCaller(this);
    }
    /**向socket发送消息 */
    sendMessage(cmd, params) {
        this.socket.sendMessage(cmd, params);
    }
    /**向通知中心注册消息，以便接收回调 */
    onNotification(name, caller, listener, args) {
        _NotificationCenter__WEBPACK_IMPORTED_MODULE_2__["default"].on(name, caller, listener, args);
    }
    /**移除通知中心的当前对象监听 */
    offNotificationListener() {
        _NotificationCenter__WEBPACK_IMPORTED_MODULE_2__["default"].offAllCaller(this);
    }
    /**向通知中心发送消息，以便触发相关通知 */
    postNotification(name, params) {
        _NotificationCenter__WEBPACK_IMPORTED_MODULE_2__["default"].postNotification(name, params);
    }
    /**接收通知中心发送过来的消息，以便处理相关逻辑，虚方法 */
    onReceiveNotification(name, params) {
    }
    _onReceiveNotification(name, params) {
        if (!this.enabled)
            return;
        this.onReceiveNotification(name, params);
    }
    /** ================ Request ================ **/
    GET(path, params, success, fail) {
        //TODO:
        //1、支持动态参数
        if (params instanceof Function) {
            success = params;
            params = {};
            fail = success;
        }
        let xmr = _network_Request__WEBPACK_IMPORTED_MODULE_0__["default"].GET(path, params, (value) => {
            success.call(this, value);
        }, (msg, code) => {
            fail.call(this, msg, code);
        });
        this._requests.push(xmr);
    }
    POST(path, params, success, fail) {
        //1、支持动态参数
        if (params instanceof Function) {
            success = params;
            params = {};
            fail = success;
        }
        let xmr = _network_Request__WEBPACK_IMPORTED_MODULE_0__["default"].POST(path, params, (res) => {
            success.call(this, res);
        }, (msg, code) => {
            fail.call(this, msg, code);
        });
        this._requests.push(xmr);
    }
    destroyXMR() {
        for (let i = this._requests.length - 1; i >= 0; i--) {
            let xmr = this._requests.pop();
            if (xmr.http.readyState != XMLHttpRequest.DONE) {
                xmr.http.abort && xmr.http.abort();
            }
        }
    }
    /** ================ Share ================ **/
    /**分享主要方法，需要传入所有参数 */
    share(title, image, query, success, fail) {
        if (query instanceof Function) {
            fail = success;
            success = query;
            query = {};
        }
        //TODO: 
        //1、支持动态参数
        //2、支持新版本回掉
        _wx_manager_ShareManager__WEBPACK_IMPORTED_MODULE_1__["default"].share(title, image, query, (res) => {
            success && success.call(this, res);
        }, fail && fail.bind(this));
    }
    /**分享方法，可以不用传入图片，图片将从 ShareManager.imageURL 获取 */
    shareTitle(title, query, success, fail) {
        _wx_manager_ShareManager__WEBPACK_IMPORTED_MODULE_1__["default"].shareTitle(title, query, success, fail);
    }
    shareDefault(query = {}, success, fail) {
        if (typeof query == 'function') {
            success = query;
            fail = success;
            query = {};
        }
        let title = _game_DataCenter__WEBPACK_IMPORTED_MODULE_6__["default"].config.game.share_list.randomItem;
        this.shareTitle(title, query, success, fail);
    }
    showRewardedVideoAd(params) {
        _wx_ad_rewardedVideoAd__WEBPACK_IMPORTED_MODULE_4__["default"].show(params);
    }
    showBannerAd(params) {
        let ad = _wx_ad_bannerAd__WEBPACK_IMPORTED_MODULE_5__["default"].show(params);
        this.bannerAds.push(ad);
        return ad;
    }
    /**显示当前Component中所有的banner广告 */
    showAllBannerAd() {
        for (let i = 0, length = this.bannerAds.length; i < length; i++) {
            let ad = this.bannerAds[i];
            ad.show();
        }
    }
    hideAllBannerAd() {
        for (let i = 0, length = this.bannerAds.length; i < length; i++) {
            let ad = this.bannerAds[i];
            ad.hide();
        }
    }
    destroyBannerAd() {
        for (let i = 0, length = this.bannerAds.length; i < length; i++) {
            let ad = this.bannerAds[i];
            ad.hide();
            ad.destroy();
        }
    }
    /** ================ 微信方法分发 ================ **/
    _onShow(res) {
        this.onShow(res);
    }
    /**进入前台时执行，由游戏事件分发主动调用 */
    onShow(res) {
    }
    _onHide(res) {
        this.onHide(res);
    }
    /**进入后台时执行，由游戏事件分发主动调用 */
    onHide(res) {
    }
    popup(dialog) {
        if (dialog instanceof Laya.Dialog) {
            dialog.popup();
            this.dialogs.push(dialog);
        }
        else {
            console.error('当前popup的不是Dialog实例');
        }
    }
    closeDialogs() {
        for (let i = 0, length = this.dialogs.length; i < length; i++) {
            let dialog = this.dialogs[i];
            dialog.destroy();
        }
    }
    /**点击右上角转发时触发 */
    onShareAppMessage() {
        return null;
    }
    /**当网络变化时调用 */
    onNetworkChange(e) {
    }
    /**当socket断开时调用 */
    onSocketClose() {
    }
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestConfig", function() { return RequestConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Request; });
/* harmony import */ var _dataTrack_dataTrack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

class RequestConfig {
}
RequestConfig.baseURL = "";
RequestConfig.token = "";
RequestConfig.headers = ["Content-Type", "application/x-www-form-urlencoded"];
RequestConfig.maxRetryTimes = 3;
class Request extends Laya.HttpRequest {
    constructor() {
        super();
        this._retryTimes = 0;
        let _this = this;
        this.http.ontimeout = function (e) {
            _this.timeout(e);
        };
    }
    sendRequest(path, params, method) {
        if (!RequestConfig.baseURL) {
            console.error("请指定baseURL");
            return;
        }
        this._path = path;
        if (RequestConfig.makeParamsHandler) {
            params = RequestConfig.makeParamsHandler(params);
        }
        console.log(`R >>> | ${path} | ${params['wxparams'] || JSON.stringify(params)}`);
        let items = [];
        for (var key in params) {
            items.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
        }
        let result = items.join("&");
        let url = RequestConfig.baseURL + path;
        if (method == 'get') {
            url += "?" + result;
            result = null;
        }
        this.$url = url;
        this.$query = result;
        this.$method = method;
        this.send(url, result, method, null, RequestConfig.headers);
    }
    /**发送GET请求 */
    GET(path, params) {
        this.sendRequest(path, params, 'get');
    }
    /**发送POST请求 */
    POST(path, params) {
        this.sendRequest(path, params, 'post');
    }
    /**重写父类的complete方法 */
    complete() {
        console.log(`R <<< | ${this._path} | ${this.http.responseText}`);
        super.complete();
    }
    /**重写父类的complete方法 */
    error(message) {
        super.error(message);
        // let status = this.http.status
        // if (this._retryTimes < RequestConfig.maxRetryTimes) {
        //     this._retryTimes++
        //     DataTrack.track(DataTrackType.HTTPRetry,{c:this.$url,t:this._retryTimes})
        //     setTimeout(function () {
        //         this.send(this.$url, this.$query, this.$method, null, RequestConfig.headers);
        //     }.bind(this), 500)
        // } else {
        //     super.error(message)
        // }
    }
    timeout(message) {
        if (this._retryTimes < RequestConfig.maxRetryTimes) {
            this._retryTimes++;
            _dataTrack_dataTrack__WEBPACK_IMPORTED_MODULE_0__["default"].track(_dataTrack_dataTrack__WEBPACK_IMPORTED_MODULE_0__["DataTrackType"].HTTPRetry, { c: this.$url, t: this._retryTimes });
            setTimeout(function () {
                this.send(this.$url, this.$query, this.$method, null, RequestConfig.headers);
            }.bind(this), 500);
        }
        else {
            this.error(message);
        }
    }
    /**类方法进行GET请求 */
    static GET(path, params, suc, fail = null) {
        var xmr = new Request();
        xmr.on(Laya.Event.COMPLETE, this, (data) => {
            this.handleError(data, suc, fail);
        });
        xmr.on(Laya.Event.ERROR, this, (res) => {
            fail && fail.call(this, res || "连接服务器失败");
        });
        xmr.GET(path, params);
        return xmr;
    }
    /**类方法进行POST请求 */
    static POST(path, params, suc, fail = null) {
        var xmr = new Request();
        xmr.on(Laya.Event.COMPLETE, this, (data) => {
            this.handleError(data, suc, fail);
        });
        xmr.on(Laya.Event.ERROR, this, (res) => {
            fail && fail.call(this, res || "连接服务器失败");
        });
        xmr.POST(path, params);
        return xmr;
    }
    static handleError(data, suc, fail) {
        data = JSON.parse(data);
        var code = data.code;
        if (code == 200) {
            suc && suc.call(this, data.value);
        }
        else {
            fail && fail.call(this, data.message || "请求出现错误", (data.errorcode ? data.errorcode : code));
        }
    }
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DataTrack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataTrackType", function() { return DataTrackType; });
/* harmony import */ var _mta_analysis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _core_network_Request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _paoya__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);



class DataTrack {
    static setup(appID = "500624773", eventID = "500624774", options) {
        _mta_analysis__WEBPACK_IMPORTED_MODULE_0__["default"].App.init({
            "appID": appID,
            "eventID": eventID,
            "lauchOpts": options
        });
    }
    static track(type, params) {
        if (!params.gameId && _paoya__WEBPACK_IMPORTED_MODULE_2__["default"].game.gameId) {
            params.gameId = _paoya__WEBPACK_IMPORTED_MODULE_2__["default"].game.gameId;
        }
        if (params.data) {
            let value = JSON.parse(params.data);
            value.T = _paoya__WEBPACK_IMPORTED_MODULE_2__["default"].networkMonitor.type;
            params.data = JSON.stringify(value);
        }
        console.log(`T | upload | ${JSON.stringify(params)}`);
        _mta_analysis__WEBPACK_IMPORTED_MODULE_0__["default"].Event.stat(type + '', params);
    }
    static trackType(type) {
        _core_network_Request__WEBPACK_IMPORTED_MODULE_1__["default"].POST('userStatistics', { type: type }, null);
    }
    static now() {
        return new Date().valueOf();
    }
    static startTrackTime(id) {
        this.loginCostTime[id] = DataTrack.now();
    }
    static stopTrackTime(id) {
        let time = this.loginCostTime[id];
        let delta = DataTrack.now() - time;
        this.loginCostTime[id] = delta;
        console.warn(`T | ${id} | cost | ${delta} ms`);
    }
    static startSocketTime() {
        this.socketCostTime = DataTrack.now();
    }
    static stopSocketTime() {
        let time = DataTrack.now() - this.socketCostTime;
        console.warn(`T | Socket | cost | ${time}ms`);
        this.track(DataTrackType.SocketTimeCost, {
            data: JSON.stringify({
                t: time
            })
        });
    }
    static startSocketLogin() {
        this.socketLoginTime = DataTrack.now();
    }
    static stopSocketLogin() {
        let time = DataTrack.now() - this.socketLoginTime;
        console.warn(`T | Socket login | cost | ${time}ms`);
        this.track(DataTrackType.SocketLoginTimeCost, { data: JSON.stringify({ t: time }) });
    }
    static uploadLoginCostTime() {
        let upload = JSON.stringify(this.loginCostTime);
        console.log(`T | login | upload | ${upload}`);
        this.track(DataTrackType.LoginTimeCost, { data: upload });
    }
}
DataTrack.loginCostTime = {};
DataTrack.socketCostTime = 0;
DataTrack.socketLoginTime = 0;
var DataTrackType;
(function (DataTrackType) {
    DataTrackType[DataTrackType["LoginTimeCost"] = 3001] = "LoginTimeCost";
    DataTrackType[DataTrackType["SocketTimeCost"] = 3002] = "SocketTimeCost";
    DataTrackType[DataTrackType["SocketLoginTimeCost"] = 3003] = "SocketLoginTimeCost";
    DataTrackType[DataTrackType["SocketRetry"] = 3004] = "SocketRetry";
    DataTrackType[DataTrackType["HTTPRetry"] = 3005] = "HTTPRetry";
    DataTrackType[DataTrackType["Ladder"] = 1001] = "Ladder";
    DataTrackType[DataTrackType["FriendBattle"] = 1002] = "FriendBattle";
    DataTrackType[DataTrackType["RedPacket"] = 1003] = "RedPacket";
    DataTrackType[DataTrackType["PlayOffline"] = 1004] = "PlayOffline";
    DataTrackType[DataTrackType["Rank"] = 1004] = "Rank";
    DataTrackType[DataTrackType["HallBack"] = 1006] = "HallBack";
    DataTrackType[DataTrackType["WithDraw"] = 1007] = "WithDraw";
    DataTrackType[DataTrackType["Jump"] = 1008] = "Jump";
    DataTrackType[DataTrackType["Change"] = 1009] = "Change"; //换换手气
})(DataTrackType || (DataTrackType = {}));


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var MTA_CONFIG = {
  app_id: "",
  event_id: "",
  api_base: "https://pingtas.qq.com/pingd",
  prefix: "_mta_",
  version: "1.3.5",
  stat_share_app: !1,
  stat_pull_down_fresh: !1,
  stat_reach_bottom: !1
};

function getNetworkType(a) {
  wx.getNetworkType({
    success: function (b) {
      a(b.networkType)
    }
  })
}

function getSystemInfo() {
  var a = wx.getSystemInfoSync();
  return {
    adt: encodeURIComponent(a.model),
    scl: a.pixelRatio,
    scr: a.windowWidth + "x" + a.windowHeight,
    lg: a.language,
    fl: a.version,
    jv: encodeURIComponent(a.system),
    tz: encodeURIComponent(a.platform)
  }
}

function getUID() {
  try {
    return wx.getStorageSync(MTA_CONFIG.prefix + "auid")
  } catch (a) {}
}

function setUID() {
  try {
    var a = getRandom();
    wx.setStorageSync(MTA_CONFIG.prefix + "auid", a);
    return a
  } catch (b) {}
}

function getSID() {
  try {
    return wx.getStorageSync(MTA_CONFIG.prefix + "ssid")
  } catch (a) {}
}

function setSID() {
  try {
    var a = "s" + getRandom();
    wx.setStorageSync(MTA_CONFIG.prefix + "ssid", a);
    return a
  } catch (b) {}
}

function getRandom(a) {
  for (var b = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], c = 10; 1 < c; c--) {
    var d = Math.floor(10 * Math.random()),
      e = b[d];
    b[d] = b[c - 1];
    b[c - 1] = e
  }
  for (c = d = 0; 5 > c; c++) d = 10 * d + b[c];
  return (a || "") + (d + "" + +new Date)
}

function getPagePath() {
  try {
    var a = getCurrentPages(),
      b = "/";
    0 < a.length && (b = a.pop().__route__);
    return b
  } catch (c) {
    console.log("get current page path error:" + c)
  }
}

function getMainInfo() {
  var a = {
    dm: "wechat.apps.xx",
    url: getPagePath(),
    pvi: "",
    si: "",
    ty: 0
  };
  a.pvi = function () {
    var b = getUID();
    b || (b = setUID(), a.ty = 1);
    return b
  }();
  a.si = function () {
    var a = getSID();
    a || (a = setSID());
    return a
  }();
  return a
}

function getBasicInfo() {
  var a = getSystemInfo();
  getNetworkType(function (a) {
    try {
      wx.setStorageSync(MTA_CONFIG.prefix + "ntdata", a)
    } catch (c) {}
  });
  a.ct = wx.getStorageSync(MTA_CONFIG.prefix + "ntdata") || "4g";
  return a
}

function getExtentInfo() {
  var a = MTA.Data.userInfo;
  var b = [],
    c;
  for (c in a) a.hasOwnProperty(c) && b.push(c + "=" + a[c]);
  a = b.join(";");
  return {
    r2: MTA_CONFIG.app_id,
    r4: "wx",
    ext: "v=" + MTA_CONFIG.version + (null !== a && "" !== a ? ";ui=" + encodeURIComponent(a) : "")
  }
}
var MTA = {
  App: {
    init: function (a) {
      "appID" in a && (MTA_CONFIG.app_id = a.appID);
      "eventID" in a && (MTA_CONFIG.event_id = a.eventID);
      "statShareApp" in a && (MTA_CONFIG.stat_share_app = a.statShareApp);
      "statPullDownFresh" in a && (MTA_CONFIG.stat_pull_down_fresh = a.statPullDownFresh);
      "statReachBottom" in a && (MTA_CONFIG.stat_reach_bottom = a.statReachBottom);
      setSID();
      "lauchOpts" in a && (MTA.Data.lanchInfo = a.lauchOpts, MTA.Data.lanchInfo.landing = 1)
    }
  },
  Page: {
    init: function () {
      var a = getCurrentPages()[getCurrentPages().length - 1];
      a.onShow &&
        ! function () {
          var b = a.onShow;
          a.onShow = function () {
            MTA.Page.stat();
            b.call(this, arguments)
          }
        }();
      MTA_CONFIG.stat_pull_down_fresh && a.onPullDownRefresh && ! function () {
        var b = a.onPullDownRefresh;
        a.onPullDownRefresh = function () {
          MTA.Event.stat(MTA_CONFIG.prefix + "pulldownfresh", {
            url: a.__route__
          });
          b.call(this, arguments)
        }
      }();
      MTA_CONFIG.stat_reach_bottom && a.onReachBottom && ! function () {
        var b = a.onReachBottom;
        a.onReachBottom = function () {
          MTA.Event.stat(MTA_CONFIG.prefix + "reachbottom", {
            url: a.__route__
          });
          b.call(this, arguments)
        }
      }();
      MTA_CONFIG.stat_share_app && a.onShareAppMessage && ! function () {
        var b = a.onShareAppMessage;
        a.onShareAppMessage = function () {
          MTA.Event.stat(MTA_CONFIG.prefix + "shareapp", {
            url: a.__route__
          });
          return b.call(this, arguments)
        }
      }()
    },
    stat: function () {
      if ("" != MTA_CONFIG.app_id) {
        var a = [],
          b = getExtentInfo(),
          c = [getMainInfo(), b, getBasicInfo()];
        MTA.Data.lanchInfo && (c.push({
            ht: MTA.Data.lanchInfo.scene,
            rdm: "/",
            rurl: MTA.Data.lanchInfo.path
          }), MTA.Data.lanchInfo.query && MTA.Data.lanchInfo.query._mta_ref_id && c.push({
            rarg: MTA.Data.lanchInfo.query._mta_ref_id
          }),
          1 == MTA.Data.lanchInfo.landing && (b.ext += ";lp=1", MTA.Data.lanchInfo.landing = 0));
        c.push({
          rand: +new Date
        });
        b = 0;
        for (var d = c.length; b < d; b++)
          for (var e in c[b]) c[b].hasOwnProperty(e) && a.push(e + "=" + ("undefined" == typeof c[b][e] ? "" : c[b][e]));
        wx.request({
          url: MTA_CONFIG.api_base + "?" + a.join("&").toLowerCase()
        })
      }
    }
  },
  Event: {
    stat: function (a, b) {
      if ("" != MTA_CONFIG.event_id) {
        var c = [],
          d = getMainInfo(),
          e = getExtentInfo();
        d.dm = "wxapps.click";
        d.url = a;
        e.r2 = MTA_CONFIG.event_id;
        var f = "undefined" === typeof b ? {} : b;
        var k = [],
          g;
        for (g in f) f.hasOwnProperty(g) &&
          k.push(encodeURIComponent(g) + "=" + encodeURIComponent(f[g]));
        f = k.join(";");
        e.r5 = f;
        f = 0;
        d = [d, e, getBasicInfo(), {
          rand: +new Date
        }];
        for (e = d.length; f < e; f++)
          for (var h in d[f]) d[f].hasOwnProperty(h) && c.push(h + "=" + ("undefined" == typeof d[f][h] ? "" : d[f][h]));
        wx.request({
          url: MTA_CONFIG.api_base + "?" + c.join("&").toLowerCase()
        })
      }
    }
  },
  Data: {
    userInfo: null,
    lanchInfo: null
  }
};
/* harmony default export */ __webpack_exports__["default"] = (MTA);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShareManager; });
/* harmony import */ var _core_NotificationCenter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);

class ShareService {
    constructor() {
        this.successHandler = null;
        this.failHandler = null;
        this.inShare = false;
        this.shareTime = 0;
        _core_NotificationCenter__WEBPACK_IMPORTED_MODULE_0__["default"].on(_core_NotificationCenter__WEBPACK_IMPORTED_MODULE_0__["NotificationName"].ApplicationShow, this, this.onShow);
    }
    onShow(res) {
        if (!this.successHandler)
            return;
        if (Date.now() - this.shareTime < 3000) {
            this.shareTime = 0;
            if (this.failHandler) {
                this.failHandler('分享到群才可以哦');
                this.stopObserve();
                return;
            }
        }
        let random = Math.floor(Math.random() * 3);
        random = 0;
        if (random == 0) {
            this.successHandler(res);
            this.successHandler = null;
        }
        else {
            if (this.failHandler) {
                this.failHandler('请分享至群');
                this.failHandler = null;
            }
        }
        this.stopObserve();
    }
    startObserve(suc, fail) {
        this.shareTime = Date.now();
        this.successHandler = suc;
        this.failHandler = fail;
    }
    stopObserve() {
        this.successHandler = null;
        this.failHandler = null;
    }
}
class ShareManager {
    /**组织分享 */
    static makeShareInfo(title, image = this.imageURL, query, success, fail = null) {
        if (this.makeQueryHandler) {
            query = this.makeQueryHandler(query);
        }
        console.warn(`分享出去的参数为${JSON.stringify(query)}`);
        return {
            title: title,
            imageUrl: image,
            query: toQueryString(query),
            success: success,
            fail() {
                fail && fail();
            }
        };
    }
    /**分享主要方法，需要传入所有参数 */
    static share(title, image, query, success, fail = null) {
        let imageURL = image;
        if (!imageURL) {
            imageURL = this.getShareImageURL();
        }
        if (!imageURL) {
            console.error("必须指定分享图片地址，建议使用ShareManager.imageURL全局设置统一分享图片");
            return;
        }
        this.isShare = true;
        this._shareService || (this._shareService = new ShareService());
        let shareService = this._shareService;
        if (window['wx']) { //只有在没有回调的平台中，才会去伪造分享成功返回
            shareService.startObserve(success, fail);
        }
        py.shareAppMessage(this.makeShareInfo(title, image, query, (res) => {
            shareService.stopObserve();
            console.warn("SHARE | " + JSON.stringify(res));
            success && success(res);
            // let isGroup = res.shareTickets && res.shareTickets.length > 0
            // if (isGroup && this.checkGroup) {
            //     let shareTicket = res.shareTickets[0];
            //     this.getShareInfo(shareTicket, (encryptedData, iv) => {
            //         success && success(isGroup, encryptedData, iv)
            //     }, () => {
            //         fail && fail()
            //     })
            // } else {
            //     success && success(isGroup)
            // }
        }, (res) => {
            shareService.stopObserve();
            fail && fail(res);
        }));
    }
    /**分享方法，可以不用传入图片，图片将从 ShareManager.imageURL 获取 */
    static shareTitle(title, query, success, fail = null) {
        let imageURL = this.getShareImageURL();
        if (!imageURL) {
            console.error("必须指定 ShareManager.imageURL 才可执行此方法");
            return;
        }
        this.share(title, imageURL, query, success, fail);
    }
    /**获取分享内容 */
    static getShareInfo(shareTicket, suc, fail) {
        py.getShareInfo({
            shareTicket: shareTicket,
            timeout: 60000,
            success(res) {
                console.log("SHARE | getShareInfo | " + JSON.stringify(res));
                suc && suc(res);
            },
            fail: fail
        });
    }
    static getShareImageURL() {
        let imageURL = null;
        if (this.makeShareImageURLHandler) {
            imageURL = this.makeShareImageURLHandler();
        }
        if (typeof imageURL !== 'string') {
            imageURL = this.imageURL;
            console.warn('ShareManager.makeShareImageURLHandler 必须返回 string 类型的图片地址');
        }
        return imageURL;
    }
}
/**是否验证群ID */
ShareManager.checkGroup = false;
/**记录分享状态 */
ShareManager.isShare = false;
ShareManager._shareService = null;
function toQueryString(params) {
    var items = [], queryStr = "";
    for (var key in params) {
        items.push(key + "=" + params[key]);
    }
    if (items.length) {
        queryStr = items.join("&");
    }
    return queryStr;
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NotificationCenter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationName", function() { return NotificationName; });
/* harmony import */ var _game_service_LoginService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);

class NotificationCenter {
    /**监听通知中心的消息 */
    static on(type, caller, listener, args) {
        return this.defaultCenter.on(type, caller, listener, args);
    }
    static addLoginNotification(caller, listener) {
        if (_game_service_LoginService__WEBPACK_IMPORTED_MODULE_0__["default"].isLogined) {
            listener.call(caller);
        }
        else {
            NotificationCenter.once(NotificationName.LoginSuccess, caller, listener);
        }
    }
    /**监听通知中心的消息，只监听一次 */
    static once(type, caller, listener, args) {
        return this.defaultCenter.once(type, caller, listener, args);
    }
    /**向通知中心发送Notification */
    static event(type, data) {
        return this.defaultCenter.event(type, data);
    }
    /**取消监听通知中心消息 */
    static off(type, caller, listener, onceOnly) {
        return this.defaultCenter.off(type, caller, listener, onceOnly);
    }
    /**取消通知中心某种类型的消息 */
    static offAll(type) {
        return this.defaultCenter.offAll(type);
    }
    /**取消通知中心所有类型的消息 */
    static offAllCaller(caller) {
        return this.defaultCenter.offAllCaller(caller);
    }
    /**向通知中心发送Notification */
    static postNotification(type, data) {
        return this.defaultCenter.event(type, data);
    }
}
NotificationCenter.defaultCenter = new Laya.EventDispatcher();
//要扩展NotificationName，请在const.js 中重点标明
class NotificationName {
}
NotificationName.ApplicationShow = 'app-show';
NotificationName.ApplicationHide = 'app-hide';
NotificationName.GameShow = 'game-show';
NotificationName.NetworkChanged = 'network-changed';
NotificationName.LoginSuccess = 'login-success';
NotificationName.GOLD_CHANGE = 'CHANGE_GOLD';
NotificationName.RMB_CHANGE = 'rmb-change';
NotificationName.START_GAME = 'start-game';


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginConfig", function() { return LoginConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LoginService; });
/* harmony import */ var _DataCenter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _wx_Toast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var _dataTrack_dataTrack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _core_network_Request__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _core_NotificationCenter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);





const LAST_GET_USERINFO_TIME_KEY = 'lastGetUserInfoTime';
const USER_TOKEN_KEY = 'userTokenKey';
class LoginConfig {
}
//用于浏览器端登录
LoginConfig.userId = 123456;
LoginConfig.gameId = 1004;
LoginConfig.version = '1.0';
LoginConfig.release = 1;
LoginConfig.requestConfig = 1;
class LoginService {
    static login(suc, fail) {
        if (!this.token) {
            this.lastGetUserInfoTime = 0;
        }
        let beginTime = Date.now();
        let day7 = 7 * 24 * 60 * 60 * 1000;
        let params = {
            requestUserInfo: ((beginTime - this.lastGetUserInfoTime) > day7)
        };
        py.login(params, (res) => {
            if (!window['wx'] && !window['BK'] && !res['js_code']) {
                res['js_code'] = `app,${LoginConfig.userId}`;
            }
            this.loginWith(res, suc, fail);
        });
    }
    /**
     *
     * @param params 登录我们服务器需要传的参数
     * @param code   通过wx.login获取到的code，如果是网页登录，则格式为 app,123456
     * @param userInfo 通过wx.getUserInfo获取到的信息，如果是网页登录，则为null
     * @param deviceInfo 通过wx.getSystemInfo获取到的信息，如果是网页登录，则为null
     * @param launchInfo 通过wx.getLaunchOption获取到的信息，如果是网页登录，则为null
     */
    static loginWith(res, success, fail) {
        let params = {
            game_id: LoginConfig.gameId,
            game_app_id: LoginConfig.gameId,
            version: LoginConfig.version,
            release: LoginConfig.release,
            is_config: LoginConfig.requestConfig
        };
        for (let key in res) {
            params[key] = res[key];
        }
        params['user_token'] = this.token || '';
        params = LoginConfig.makeLoginParamsHandler(params);
        _dataTrack_dataTrack__WEBPACK_IMPORTED_MODULE_2__["default"].startTrackTime('l');
        _wx_Toast__WEBPACK_IMPORTED_MODULE_1__["default"].showLoading('', false);
        _core_network_Request__WEBPACK_IMPORTED_MODULE_3__["default"].POST('user_login', params, (res) => {
            this.isLogined = true;
            _dataTrack_dataTrack__WEBPACK_IMPORTED_MODULE_2__["default"].stopTrackTime('l');
            _dataTrack_dataTrack__WEBPACK_IMPORTED_MODULE_2__["default"].uploadLoginCostTime();
            _DataCenter__WEBPACK_IMPORTED_MODULE_0__["default"].loginData = res;
            _DataCenter__WEBPACK_IMPORTED_MODULE_0__["default"].user = res;
            _DataCenter__WEBPACK_IMPORTED_MODULE_0__["default"].config = res.config_list;
            _DataCenter__WEBPACK_IMPORTED_MODULE_0__["default"].gold.value = _DataCenter__WEBPACK_IMPORTED_MODULE_0__["default"].user.gold = res.member_gold;
            _DataCenter__WEBPACK_IMPORTED_MODULE_0__["default"].rmb.value = _DataCenter__WEBPACK_IMPORTED_MODULE_0__["default"].user.rmb = res.member_rmb;
            _DataCenter__WEBPACK_IMPORTED_MODULE_0__["default"].integral.value = _DataCenter__WEBPACK_IMPORTED_MODULE_0__["default"].user.integral = res.member_integral;
            let token = res.token;
            _core_network_Request__WEBPACK_IMPORTED_MODULE_3__["RequestConfig"].token = this.token = token;
            localStorage.setItem(USER_TOKEN_KEY, token);
            localStorage.setItem(LAST_GET_USERINFO_TIME_KEY, Date.now() + '');
            _wx_Toast__WEBPACK_IMPORTED_MODULE_1__["default"].hideLoading();
            _DataCenter__WEBPACK_IMPORTED_MODULE_0__["default"].refreshUserInfo();
            _core_NotificationCenter__WEBPACK_IMPORTED_MODULE_4__["default"].postNotification(_core_NotificationCenter__WEBPACK_IMPORTED_MODULE_4__["NotificationName"].LoginSuccess);
            success && success(res);
        }, (msg, code) => {
            /**
             * {"code":401,"time":1525849533,"message":"您的账号在另一个设备上登录了, 需要重新登录","errorcode":2004}
             */
            if (code == 2004) { //token不对
                _core_network_Request__WEBPACK_IMPORTED_MODULE_3__["RequestConfig"].token = "";
                this.token = '';
                this.loginWith(res, success, fail);
            }
            else {
                _wx_Toast__WEBPACK_IMPORTED_MODULE_1__["default"].hideLoading();
                _wx_Toast__WEBPACK_IMPORTED_MODULE_1__["default"].showModal('登录失败', msg);
            }
        });
    }
}
LoginService.isAuthed = false;
LoginService.isLogined = false;
LoginService.lastGetUserInfoTime = Number(localStorage.getItem(LAST_GET_USERINFO_TIME_KEY) || ''); //上一次获取用户信息时间
LoginService.token = localStorage.getItem(USER_TOKEN_KEY) || '';


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DataCenter; });
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _core_Observer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _core_network_Request__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _paoya__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);




class DataCenter {
    /**通过天梯ID获取天梯 */
    static findLadderById(id) {
        let result = this.loginData.config_list.game.ladder_config.filter((item) => {
            return item.id == id;
        });
        return result[0];
    }
    /**获取天梯的段位icon */
    static makeLadderIconById(id) {
        let ladder = "";
        let ladderItem = this.findLadderById(id);
        if (ladderItem) {
            ladder = _utils_utils__WEBPACK_IMPORTED_MODULE_0__["default"].makeIcon(ladderItem.icon);
        }
        return ladder;
    }
    static formatPrize(prize) {
        let allPrize = prize.split(",");
        if (allPrize.length == 0) {
            return;
        }
        let prizes = [];
        allPrize.forEach((item, index) => {
            let prizeInfo = item.split("-");
            if (prizeInfo && prizeInfo.length == 2) {
                prizes.push({
                    type: prizeInfo[0],
                    value: prizeInfo[1]
                });
            }
        });
        return prizes;
    }
    /**更新用户信息，包括豆子、红包等 */
    static refreshUserInfo() {
        if (!_paoya__WEBPACK_IMPORTED_MODULE_3__["default"].lifeCircleMonitor.inForeground)
            return;
        _core_network_Request__WEBPACK_IMPORTED_MODULE_2__["default"].GET('update_chips', {}, (res) => {
            if (res.pao_gold != undefined) {
                this.gold.value = res.pao_gold;
                this.user.gold = res.pao_gold;
            }
            if (res.rmb != undefined) {
                this.rmb.value = res.rmb;
                this.user.rmb = res.rmb;
            }
            if (res.integral != undefined) {
                this.integral.value = res.integral;
                this.user.integral = res.integral;
            }
            if (res.gold != undefined) {
                this.gold.value = res.gold;
                this.user.gold = res.gold;
            }
            if (res.diamond != undefined) {
                this.diamond.value = res.diamond;
                this.user.diamond = res.diamond;
            }
        }, (res) => {
            console.warn('更新用户信息失败');
        });
    }
}
/**CDN资源地址 */
DataCenter.CDNURL = 'https://xgamejuedixiaomie.goxiaochengxu.cn/';
DataCenter.RESURL = 'https://xgamejuedixiaomie.goxiaochengxu.cn/';
DataCenter.showBannerAdWhenDialogPopup = true;
/**用户金币数变更监听 */
DataCenter.gold = new _core_Observer__WEBPACK_IMPORTED_MODULE_1__["default"]();
/**用户提现变更监听 */
DataCenter.rmb = new _core_Observer__WEBPACK_IMPORTED_MODULE_1__["default"]();
/**用户积分变更监听 */
DataCenter.integral = new _core_Observer__WEBPACK_IMPORTED_MODULE_1__["default"]();
/**用户钻石变更监听 */
DataCenter.diamond = new _core_Observer__WEBPACK_IMPORTED_MODULE_1__["default"]();
/**
{
    "code": 200,
    "time": 1543495809,
    "message": "",
    "value": {
        "gender": "男",
        "member_province": "",
        "member_city": "",
        "resurrection_card": 1,
        "timing_url": "wss://lobby.xingqiu123.com/",
        "ladder_id": 0,
        "login_bonus": 0,
        "lobby_daily_first_login": false,
        "nickname": "渡",
        "mobile_bind_status": 0,
        "id": 108125,
        "is_first_game": 0,
        "member_country": "冰岛",
        "member_gold": 16041,
        "wx_bind_status": 1,
        "isProduction": 1,
        "is_new": false,
        "is_show": 1,
        "token": "ud0Hhhv+4Ek0mn3G+2vpWelog+aifGxzX0wNnbWRG2w=",
        "game_url": "wss://websocket.xingqiu123.com/",
        "app_game_url": "ws://websocket.xingqiu123.com:8443/",
        "member_rmb": "206.00",
        "member_integral": 934,
        "is_review": 0,
        "config_list": {
            "game": {
                "match_cost": 10,
                "introduce_time": 0,
                "ladder_config": [ ],
                "share_list": [
                    "我用三副同花顺碾压对家，快来赢红包领好礼！",
                    "99%的智慧+1%的运气，这！就是伯恩
"
                ],
                "game_time": 180,
                "name": "伯恩扑克",
                "match_type": [
                    {
                        "cost": 5,
                        "name": "新手场",
                        "limit": "7-100",
                        "reward_integral": 10,
                        "quick_limit": "0-50",
                        "id": 94,
                        "entry_fee": 2,
                        "status": 1
                    },
                    {
                        "cost": 20,
                        "name": "初级场",
                        "limit": "25-500",
                        "reward_integral": 10,
                        "quick_limit": "50-300",
                        "id": 95,
                        "entry_fee": 5,
                        "status": 1
                    },
                    {
                        "cost": 50,
                        "name": "中级场",
                        "limit": "60",
                        "reward_integral": 10,
                        "quick_limit": "300",
                        "id": 96,
                        "entry_fee": 10,
                        "status": 1
                    }
                ],
                "share_img": [
                    "game/share/1019_2.png",
                    "game/share/1019_1.png"
                ],
                "id": 1019,
                "jsonconfig": {
                    "match_info": {
                        "ladder": 0,
                        "pass": 0,
                        "ordinary": 1,
                        "share": 1,
                        "is_jump": 1,
                        "promotion": 0
                    },
                    "match_info_app": {
                        "ladder": 0,
                        "pass": 0,
                        "ordinary": 1,
                        "share": 1,
                        "is_jump": 1,
                        "promotion": 0
                    },
                    "share_task": "5;1&1-10#3&1-10#5&1-15",
                    "round_limit_count": "30",
                    "game_reward": "10-50;15-100"
                },
                "strategy": "当一方血量减为0时，则游戏结束;当轮到你操作的时候，一定要尽快操作，停留时间越长，扣血越多;使用小策略来消除多的道具砖块，来获得增益buff吧"
            },
            "common_config": {
                "share_info": [
                    {
                        "img": "wxgame/qrcode/hitmouse.png",
                        "spine_url": "https://res.xingqiu123.com/wxgame/intro/da_di_shu.sk",
                        "appId": "wx17e66e26685ed5d0",
                        "game_id": 1004
                    },
                    {
                        "img": "wxgame/qrcode/petgo.png",
                        "spine_url": "https://res.xingqiu123.com/wxgame/intro/men_chong.sk",
                        "appId": "wx28a78997b4784ef1",
                        "game_id": 1005
                    },
                    {
                        "img": "wxgame/qrcode/food.png",
                        "spine_url": "https://res.xingqiu123.com/wxgame/intro/mei_shi_jia.sk",
                        "appId": "wx405ee3ea1e491440",
                        "game_id": 1006
                    },
                    {
                        "img": "wxgame/qrcode/reversi.png",
                        "spine_url": "https://res.xingqiu123.com/wxgame/intro/fan_fan_le.sk",
                        "appId": "wx786d0c5f03d1c2fc",
                        "game_id": 1007
                    },
                    {
                        "img": "wxgame/qrcode/xiaoxl.png",
                        "spine_url": "https://res.xingqiu123.com/wxgame/intro/xiao_xiao_le.sk",
                        "appId": "wx1fa0ca658a9a0ce6",
                        "game_id": 1008
                    },
                    {
                        "img": "wxgame/qrcode/jump.png",
                        "spine_url": "https://res.xingqiu123.com/wxgame/intro/tiao_yi_tiao.sk",
                        "appId": "wxff74aa65beb1ba7e",
                        "game_id": 1009
                    },
                    {
                        "img": "wxgame/qrcode/onlyme.png",
                        "spine_url": "https://res.xingqiu123.com/wxgame/intro/bi_wu_chang.sk",
                        "appId": "wxcaae4fff0e46aead",
                        "game_id": 1011
                    },
                    {
                        "img": "wxgame/qrcode/coupling.png",
                        "spine_url": "https://res.xingqiu123.com/wxgame/intro/chai_san_qing_lv.sk",
                        "appId": "wxa163f2723eef4ea3",
                        "game_id": 1012
                    }
                ],
                "hall_img": "wxgame/qrcode/hall.png"
            },
            "item_list": [
                {
                    "pao_gold": 100,
                    "price": 1,
                    "free_gold": 0,
                    "id": 13
                },
                {
                    "pao_gold": 600,
                    "price": 6,
                    "free_gold": 10,
                    "id": 14
                },
                {
                    "pao_gold": 1800,
                    "price": 18,
                    "free_gold": 50,
                    "id": 15
                },
                {
                    "pao_gold": 3000,
                    "price": 30,
                    "free_gold": 100,
                    "id": 16
                },
                {
                    "pao_gold": 9800,
                    "price": 98,
                    "free_gold": 388,
                    "id": 17
                },
                {
                    "pao_gold": 19800,
                    "price": 198,
                    "free_gold": 1288,
                    "id": 18
                }
            ]
        },
        "avstar": "https://wx.qlogo.cn/mmopen/vi_32/ECOJ2KphCSiajao15elMo77txvPhpMqhLFsF2MOPM1FJxmVYRlSQCdv8icicPCPic69ibOQFIewKibMmgkQtokAEibrxA/132",
        "age": 18,
        "is_receive_boy": 0,
        "app_timing_url": "ws://lobby.xingqiu123.com:8443/"
    }
}
 */ 


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Utils; });
/* harmony import */ var _game_DataCenter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _game_enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);


class Utils {
    /**
    * 便捷生成图片数组，主要用于名称连续的图片
    * @param {用来组织图片的格式,用%i占位} format
    * @param {开始索引} start
    * @param {结束索引} end
    */
    static makeImagesWithFormat(format, start, end) {
        var images = [];
        for (var i = start; i < end; i++) {
            images.push(format.replace("%i", String(i)));
        }
        return images;
    }
    static toQueryString(params) {
        let items = [], queryStr = "";
        for (var key in params) {
            items.push(key + "=" + params[key]);
        }
        if (items.length) {
            queryStr = items.join("&");
        }
        return queryStr;
    }
    static makeGenderIcon(gender) {
        let icon = "local/common/gay-white.png";
        if (gender == "男") {
            icon = "local/common/boy-white.png";
        }
        else if (gender == "女") {
            icon = "local/common/girl-white.png";
        }
        // switch (gender) {
        //     case "男":
        //         icon = "wxlocal/Common/boy-white.png"
        //         break
        //     case "女":
        //         icon = "wxlocal/Common/boy-white.png"
        //         break
        //     default:
        //         icon = "wxlocal/Common/gay-white.png"
        //         break
        // }
        return icon;
    }
    static findUserByID(users, id) {
        let result = users.filter((user, index) => {
            return user.user_id && (user.user_id == id);
        });
        if (result.length) {
            return result[0];
        }
        console.error('');
        return null;
    }
    //圆角矩形
    static makeRoundRectPath(width, height, r, corner) {
        let path = [];
        if (corner & _game_enums__WEBPACK_IMPORTED_MODULE_1__["RectCorner"].RectCornerTopLeft) {
            path.push(["moveTo", r, 0]);
        }
        else {
            path.push(["moveTo", 0, 0]);
        }
        if (corner & _game_enums__WEBPACK_IMPORTED_MODULE_1__["RectCorner"].RectCornerTopRight) {
            path.push(["lineTo", width - r, 0]);
            path.push(["arcTo", width, 0, width, r, r]);
        }
        else {
            path.push(["lineTo", width, 0]);
        }
        if (corner & _game_enums__WEBPACK_IMPORTED_MODULE_1__["RectCorner"].RectCornerBottomRight) {
            path.push(["lineTo", width, height - r]);
            path.push(["arcTo", width, height, width - r, height, r]);
        }
        else {
            path.push(["lineTo", width, height]);
        }
        if (corner & _game_enums__WEBPACK_IMPORTED_MODULE_1__["RectCorner"].RectCornerBottomLeft) {
            path.push(["lineTo", r, height]);
            path.push(["arcTo", 0, height, 0, height - r, r]);
        }
        else {
            path.push(["lineTo", 0, height]);
        }
        if (corner & _game_enums__WEBPACK_IMPORTED_MODULE_1__["RectCorner"].RectCornerTopLeft) {
            path.push(["lineTo", 0, r]);
            path.push(["arcTo", 0, 0, r, 0, r]);
        }
        else {
            path.push(["lineTo", 0, 0]);
        }
        path.push(["closePath"]);
        return path;
    }
    static makeAllCornerRoundRectPath(w, h, r) {
        return this.makeRoundRectPath(w, h, r, _game_enums__WEBPACK_IMPORTED_MODULE_1__["RectCorner"].RectCornerAllCorners);
    }
    /**用于保留指定长度的字符串，其余用...表示 */
    static formatName(name, length = 10) {
        let r = /[^\x00-\xff]/g;
        if (name.replace(r, "mm").length <= length) {
            return name + "";
        }
        let m = Math.floor(length / 2);
        for (let i = m; i < name.length; i++) {
            if (name.substring(0, i).replace(r, "mm").length >= length) {
                return name.substring(0, i) + "...";
            }
        }
        return name + "";
    }
    /**只用于显示用户头像 */
    static makeIcon(icon, width = 96) {
        if (icon == "") {
            return "local/common/avstar.png";
        }
        if (icon.indexOf('Game') == 0) { //GameRes 或 GameSandBox
            if (window['BK']) {
                return icon;
            }
            else {
                return '';
            }
        }
        if (icon.indexOf('http') === 0) {
            var items = icon.split("/") || [];
            if (items.length > 1) {
                var str = items[items.length - 1];
                if (str === "0") {
                    items[items.length - 1] = width > 100 ? "132" : "96";
                }
                return items.join('/');
            }
            return icon + "";
        }
        else {
            if (!_game_DataCenter__WEBPACK_IMPORTED_MODULE_0__["default"].CDNURL) {
                console.error('you must assign value to [PaoYa.DataCenter.CDNURL]');
                return;
            }
            return _game_DataCenter__WEBPACK_IMPORTED_MODULE_0__["default"].CDNURL + icon + "?imageView2/0/w/" + width;
        }
    }
    /**用于完全拼接用户的头像地址 */
    static makeResourceURL(url) {
        if (url == "") {
            return "local/common/avstar.png";
        }
        if (url.indexOf('https') === 0) {
            return url + "";
        }
        else {
            if (!_game_DataCenter__WEBPACK_IMPORTED_MODULE_0__["default"].CDNURL) {
                console.error('you must assign value to [PaoYa.DataCenter.CDNURL]');
                return;
            }
            return _game_DataCenter__WEBPACK_IMPORTED_MODULE_0__["default"].CDNURL + url;
        }
    }
    /** 计算文字宽度 */
    static measureWidth(text) {
        let measureResult = Laya.Utils.measureText(text, 'Arial');
        return measureResult.width;
    }
}


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrizeType", function() { return PrizeType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShareType", function() { return ShareType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RectCorner", function() { return RectCorner; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameEntryType", function() { return GameEntryType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocketURLType", function() { return SocketURLType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RankingType", function() { return RankingType; });
var PrizeType;
(function (PrizeType) {
    PrizeType[PrizeType["Gold"] = 1] = "Gold";
    PrizeType[PrizeType["Money"] = 2] = "Money";
})(PrizeType || (PrizeType = {}));
var ShareType;
(function (ShareType) {
    ShareType[ShareType["InviteFriend"] = 1] = "InviteFriend";
    ShareType[ShareType["GroupPK"] = 2] = "GroupPK";
    ShareType[ShareType["GroupRank"] = 3] = "GroupRank";
})(ShareType || (ShareType = {}));
var RectCorner;
(function (RectCorner) {
    RectCorner[RectCorner["RectCornerTopLeft"] = 1] = "RectCornerTopLeft";
    RectCorner[RectCorner["RectCornerTopRight"] = 2] = "RectCornerTopRight";
    RectCorner[RectCorner["RectCornerBottomLeft"] = 4] = "RectCornerBottomLeft";
    RectCorner[RectCorner["RectCornerBottomRight"] = 8] = "RectCornerBottomRight";
    RectCorner[RectCorner["RectCornerAllCorners"] = 15] = "RectCornerAllCorners";
})(RectCorner || (RectCorner = {}));
var GameEntryType;
(function (GameEntryType) {
    /**好友对战 */
    GameEntryType[GameEntryType["Friend"] = 1] = "Friend";
    /**匹配场次 */
    GameEntryType[GameEntryType["Match"] = 2] = "Match";
    /**天梯赛 */
    GameEntryType[GameEntryType["Ladder"] = 3] = "Ladder";
    /**红包赛 */
    GameEntryType[GameEntryType["Arena"] = 4] = "Arena";
    /**人满开赛 */
    GameEntryType[GameEntryType["Full"] = 5] = "Full";
})(GameEntryType || (GameEntryType = {}));
var SocketURLType;
(function (SocketURLType) {
    SocketURLType["TIMING"] = "timing_url";
    SocketURLType["GAME"] = "game_url";
})(SocketURLType || (SocketURLType = {}));
var RankingType;
(function (RankingType) {
    /**高分榜 */
    RankingType[RankingType["Score"] = 1] = "Score";
    /**天梯榜 */
    RankingType[RankingType["Ladder"] = 2] = "Ladder";
    /**胜局榜 */
    RankingType[RankingType["WIN"] = 8] = "WIN";
})(RankingType || (RankingType = {}));


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Observer; });
class Observer extends Laya.EventDispatcher {
    set value(newValue) {
        this._value = newValue;
        this.event(Laya.Event.CHANGED, newValue);
    }
    get value() {
        return this._value;
    }
    addObserver(caller, method) {
        method.call(caller, this._value);
        this.on(Laya.Event.CHANGED, caller, method);
    }
    removeObserver(caller, method) {
        this.off(Laya.Event.CHANGED, caller, method);
    }
}


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Toast; });
class Toast {
    /**
    * 1. icon默认是"success"
    * 2. icon 和 image 同时存在只会有一个生效，image的优先级高于icon，不管什么情况下都会有图片的，这个是取消不了的
    * 3. icon为null、undefined、""或者任何字符串，结果都为"success"
    * 4. duration是毫秒级
    * 5. 多次重复调用，只有最新调用的生效
    */
    static show(title, icon, image = null, duration = 1500) {
        var params = {
            title: title,
            icon: icon,
            image: image,
            duration: duration,
            mask: false,
            success() { },
            fail() { },
        };
        py.showToast(params);
    }
    static hide() {
        py.hideToast();
    }
    static showSuccess(title, duration = 1500) {
        this.show(title, null, 'https://res.xingqiu123.com/wxgame/common/success.png', duration);
    }
    static showError(title, duration = 1500) {
        this.show(title, null, 'https://res.xingqiu123.com/wxgame/common/error.png', duration);
    }
    static showWarn(title, duration = 1500) {
        this.show(title, null, 'https://res.xingqiu123.com/wxgame/common/warning.png', duration);
    }
    static showImage(image, duration = 1500) {
        this.show(null, null, image, duration);
    }
    /**
     * 显示loading提示层
     * @param  title
     * @param  mask 是否显示透明蒙层，也就是避免用户点击
     */
    static showLoading(title = '', mask = true) {
        py.showLoading({
            title: title,
            mask: mask,
            success() { },
            fail() { }
        });
    }
    static hideLoading() {
        py.hideLoading();
    }
    static showModal(title = '提示', content = '', confirmText = '知道了', confirmCallback = null, cancelText = "", cancelCallback = null) {
        var params = {
            title: title,
            content: content,
            showCancel: cancelText ? true : false,
            cancelColor: '#000000',
            confirmColor: '#3cc51f',
            cancelText: cancelText,
            confirmText: confirmText,
            success: function (res) {
                if (res.confirm) {
                    confirmCallback && confirmCallback();
                }
                if (res.cancel) {
                    cancelCallback && cancelCallback();
                }
            },
            fail() { }
        };
        py.showModal(params);
    }
}


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RewardedVideoAd; });
/* harmony import */ var _export__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

class RewardedVideoAd extends Laya.EventDispatcher {
    constructor(params) {
        super();
        this.isLoaded = false;
        this.createAd(params);
    }
    createAd(params) {
        let _this = this;
        let videoAd = py.createRewardedVideoAd({ adUnitId: params.adUnitId });
        videoAd.onLoad(function (res) {
            _this.isLoaded = true;
            _this.event(RewardedVideoAd.LOAD, res);
        });
        videoAd.onError(function (res) {
            _this.isLoaded = false;
            if (window['BK']) {
                res = {
                    errMsg: res.msg,
                    errCode: res.code
                };
            }
            _this.event(RewardedVideoAd.ERROR, res);
        });
        videoAd.onClose(function (res) {
            _this.isLoaded = false;
            /**兼容微信低版本 */
            if (!res) {
                res = { isEnded: true };
            }
            _this.event(RewardedVideoAd.CLOSE, res);
            _export__WEBPACK_IMPORTED_MODULE_0__["SoundManager"].onAudioInterruptionEnd();
        });
        this.videoAd = videoAd;
    }
    show() {
        if (window['BK']) {
            this.videoAd.show();
        }
        else {
            if (this.isLoaded) {
                this.videoAd.show();
            }
            else {
                this.videoAd.load();
                this.once(RewardedVideoAd.LOAD, this, function () {
                    this.videoAd.show();
                });
            }
        }
    }
    static show(params, isLong) {
        if (window['wx'] && !_export__WEBPACK_IMPORTED_MODULE_0__["DataCenter"].adUnitId) {
            console.error('请在Main中设置adUnitId之后再观看广告');
            return;
        }
        if (isLong == undefined || !isLong) {
            if (!this.ad) {
                this.ad = new RewardedVideoAd({ adUnitId: _export__WEBPACK_IMPORTED_MODULE_0__["DataCenter"].adUnitId });
            }
        }
        else {
            if (!this.ad) {
                this.ad = new RewardedVideoAd({ adUnitId: _export__WEBPACK_IMPORTED_MODULE_0__["DataCenter"].adUnitIdLong });
            }
        }
        let ad = this.ad;
        ad.offAllCaller(this);
        ad.on(this.LOAD, this, params.onLoad);
        ad.on(this.ERROR, this, params.onError);
        ad.on(this.CLOSE, this, params.onClose);
        _export__WEBPACK_IMPORTED_MODULE_0__["SoundManager"].onAudioInterruptionBegin();
        ad.show();
    }
}
RewardedVideoAd.LOAD = 'load_ad';
RewardedVideoAd.ERROR = 'error_ad';
RewardedVideoAd.CLOSE = 'close_ad';
RewardedVideoAd.ad = null;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BannerAd; });
/* harmony import */ var _export__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

class BannerAd extends Laya.EventDispatcher {
    constructor(params = {}) {
        super();
        params.adUnitId = params.adUnitId || _export__WEBPACK_IMPORTED_MODULE_0__["DataCenter"].bannerUnitId;
        params.viewId = params.qqViewId || _export__WEBPACK_IMPORTED_MODULE_0__["DataCenter"].qqViewId;
        if (!params.style) {
            let style = {};
            if (window['wx']) {
                style.top = style.left = 0;
                style.width = Laya.Browser.clientWidth || 300;
            }
            else if (window['BK']) {
                style.x = 0;
                style.y = 0;
            }
            params.style = style;
        }
        let ad = py.createBannerAd(params), _this = this;
        ad.onLoad(function (res) {
            _this.event(BannerAd.LOAD, res);
        });
        ad.onError(function (res) {
            _this.event(BannerAd.ERROR, res);
        });
        if (window['wx']) {
            let screenWidth = Laya.Browser.clientWidth, screenHeight = Laya.Browser.clientHeight;
            ad.onResize((res) => {
                let bannerAd = ad['bannerAd'];
                bannerAd.style.left = (screenWidth - res.width) / 2;
                if (!params.style.top) {
                    bannerAd.style.top = screenHeight - res.height;
                }
                _this.event(BannerAd.RESIZE, [bannerAd, res, screenWidth, screenHeight]);
            });
        }
        this.ad = ad;
    }
    show() {
        this.ad.show();
    }
    hide() {
        this.ad.hide();
    }
    destroy() {
        this.ad.destroy();
        this.offAllCaller(BannerAd);
    }
    static show(params) {
        let ad = new BannerAd(params);
        ad.on(BannerAd.LOAD, this, params.onLoad);
        ad.on(BannerAd.ERROR, this, params.onError);
        ad.on(BannerAd.RESIZE, this, params.onResize);
        ad.show();
        return ad;
    }
    static hide(bannerAd) {
        bannerAd.hide();
    }
    static destroy(bannerAd) {
        bannerAd.destroy();
    }
}
BannerAd.LOAD = 'load_ad';
BannerAd.ERROR = 'error_ad';
BannerAd.RESIZE = 're-size';


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return View; });
/**为View添加了JSONView变量，用于记录该View的创建JSON，方便从JSON创建view */
class View extends Laya.View {
    constructor() {
        super();
        /**用于记录打开当前scene时，从外部传进来的数据 */
        this.params = null;
        this.sceneName = '';
        this.setupJSONView();
        this.createJSONView();
        this._addClickListener();
    }
    /**为当前View的子View设置JSONView，方便统一进行处理，虚方法 */
    setupJSONView() {
    }
    createJSONView() {
        let json = this.constructor['JSONView'];
        json && this.createView(json);
    }
    /**添加点击事件监听，以便进行简单处理 */
    _addClickListener() {
        let prototype = View.prototype;
        if (this.onClick !== prototype.onClick) {
            this.on(Laya.Event.CLICK, this, this._onClick);
        }
    }
    _onClick(e) {
        this.onClick(e);
    }
    /**当前Scene被点击时调用，虚方法 */
    onClick(e) {
    }
    _onAppear() {
        this.onAppear();
    }
    onAppear() {
    }
    _onDisappear() {
        this.onDisappear();
    }
    onDisappear() {
    }
    _onAdded() {
        super._onAdded();
        this.onAdded();
    }
    _onRemoved() {
        super._onRemoved();
        this.onRemoved();
    }
    onAdded() {
    }
    onRemoved() {
    }
    open(closeOther = false, param) {
        this.params = param;
        super.open(closeOther, param);
    }
}


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Dialog; });
/* harmony import */ var _export__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _wx_ad_bannerAd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);


class Dialog extends Laya.Dialog {
    constructor() {
        super();
        this.showBannerAdWhenDialogPopup = true;
        this.createJSONView();
    }
    createJSONView() {
        let json = this.constructor['JSONView'];
        json && this.createView(json);
    }
    _onAdded() {
        super._onAdded();
        this.onAdded();
        this._showBannerAd();
    }
    onAdded() {
    }
    _onRemoved() {
        super._onRemoved();
        this.onRemoved();
        this._hideBannerAd();
    }
    onRemoved() {
    }
    _showBannerAd() {
        if (this.showBannerAdWhenDialogPopup && _export__WEBPACK_IMPORTED_MODULE_0__["DataCenter"].showBannerAdWhenDialogPopup) {
            this['bannerAd'] = _wx_ad_bannerAd__WEBPACK_IMPORTED_MODULE_1__["default"].show({});
        }
    }
    _hideBannerAd() {
        if (this['bannerAd']) {
            let bannerAd = this['bannerAd'];
            _wx_ad_bannerAd__WEBPACK_IMPORTED_MODULE_1__["default"].hide(bannerAd);
            _wx_ad_bannerAd__WEBPACK_IMPORTED_MODULE_1__["default"].destroy(bannerAd);
        }
    }
}


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Navigator; });
/* harmony import */ var _game_DataCenter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);

const commonScenes = {
    TurnTableView: "common/GameResult/TurnTableView",
    GameResultView: 'common/GameResult/GameResultView',
    IFHostView: 'common/InviteFriend/IFHostView',
    IFMemberView: 'common/InviteFriend/IFMemberView',
    IntegralMallView: "common/Mall/IntegralMallView",
    MatchView: 'common/Match/MatchView',
    MatchGradeView: 'common/Match/MatchGradeView',
    RankView: 'common/Rank/RankView',
    RankGroupView: 'common/Rank/RankGroupView',
    QTRoomView: 'common/QTRoom/QTRoomView',
    HomeView: 'HomeView',
    FBView: 'common/InviteFriend/FBView'
};
class Navigator extends Laya.EventDispatcher {
    constructor() {
        super();
        this.scenes = [];
    }
    popup(sceneName, params, complete, progress, closeOther = true) {
        Laya.Scene.load(this.makeDialogName(sceneName), Laya.Handler.create(null, function (dialog) {
            dialog.isModal = true;
            dialog.isShowEffect = false;
            dialog["params"] = params;
            dialog.open(closeOther, params);
            complete && complete.runWith(dialog);
        }), progress);
    }
    push(sceneName, params, resURL, complete, progress, prepare) {
        this._open(sceneName, params, resURL, complete, progress, prepare, true);
    }
    pop() {
        _game_DataCenter__WEBPACK_IMPORTED_MODULE_0__["default"].refreshUserInfo();
        this.scenes.pop().close('pop');
        let scene = this.scenes[this.scenes.length - 1];
        this.activeScene(scene);
    }
    popToLastScene(sceneName) {
    }
    findSceneByName(sceneName) {
        let desScene = null;
        for (let i = this.scenes.length - 1; i >= 0; i--) {
            let scene = this.scenes[i];
            if (scene.sceneName.indexOf(sceneName) != -1) {
                desScene = scene;
                break;
            }
        }
        return desScene;
    }
    popToScene(sceneName) {
        _game_DataCenter__WEBPACK_IMPORTED_MODULE_0__["default"].refreshUserInfo();
        for (let i = this.scenes.length; i--; i >= 0) {
            let scene = this.scenes[i];
            if (scene.sceneName === sceneName) {
                this.activeScene(scene);
                break;
            }
            else {
                this.scenes.pop().close('pop');
            }
        }
    }
    activeScene(scene) {
        !scene.visible && (scene.visible = true);
        this.visibleScene = scene;
        this._onAppear();
    }
    popToRootScene() {
        _game_DataCenter__WEBPACK_IMPORTED_MODULE_0__["default"].refreshUserInfo();
        if (this.scenes.length == 1)
            return;
        while (this.scenes.length > 1) {
            this.scenes.pop().close('pop');
        }
        let scene = this.scenes[this.scenes.length - 1];
        this.activeScene(scene);
    }
    present(sceneName, params, resURL, complete, progress, prepare) {
        this._open(sceneName, params, resURL, complete, progress, prepare, false);
    }
    dismiss() {
        this.pop();
    }
    replace(sceneName, params) {
        var scene;
        for (var i = this.scenes.length - 1; i >= 0; i--) {
            scene = this.scenes[i];
            scene.destroy();
            this.scenes.pop();
            if (scene.sceneName == sceneName) {
                this.visibleScene = null;
                this.push(sceneName, params);
                return;
            }
        }
        console.error('错误的:' + sceneName);
    }
    /**在视图栈中动态替换指定的scene，实现逻辑为
     * 1、找到指定的oldScene所在的位置，并pop到她所在的位置
     * 2、用newScene替换掉它
     *
     */
    replaceSceneWith(oldScene, newSceneName, params) {
        var scene;
        var index = this.scenes.indexOf(oldScene);
        if (index < 0) {
            console.error("指定的scene未包含在navigator中");
            return;
        }
        for (var i = this.scenes.length - 1; i >= index; i--) {
            scene = this.scenes[i];
            scene.destroy();
            this.scenes.pop();
        }
        this.visibleScene = null;
        this.push(newSceneName, params);
    }
    visibleSceneIs(sceneName) {
        return this.visibleScene.sceneName.indexOf(sceneName) > -1;
    }
    makeSceneName(name) {
        if (commonScenes[name]) {
            return `scenes/${commonScenes[name]}.scene`;
        }
        if (Navigator.scenesMap[name]) {
            return `${Navigator.scenesMap[name]}.scene`;
        }
        return `gamescenes/${name}.scene`;
    }
    makeDialogName(name) {
        if (name.indexOf('/') == 0) {
            return `gamescenes${name}.scene`;
        }
        return `scenes/dialog/${name}.scene`;
    }
    _open(sceneName, params, resURL, complete, progress, prepare, hidePre = true) {
        let urls = [];
        if (resURL instanceof Array) {
            urls = urls.concat(resURL);
        }
        else if (typeof resURL == 'string') {
            urls.push(resURL);
        }
        else if (resURL instanceof Laya.Handler) {
            complete = resURL;
            progress = complete;
            prepare = progress;
        }
        urls.push(this.makeSceneName(sceneName));
        Laya.Scene['_prepareHandler'] = prepare;
        Laya.Scene.open(urls, false, params, Laya.Handler.create(this, function (scene) {
            //handle pre scene
            if (this.scenes.length > 0) {
                let preScene = this.scenes[this.scenes.length - 1];
                preScene.visible = !hidePre;
                this._onDisappear();
            }
            scene.autoDestroyAtClosed = true;
            scene.sceneName = sceneName;
            this.visibleScene = scene;
            this.scenes.push(scene);
            this._onLoad();
            this._onAppear();
            complete && complete.runWith(scene);
        }), progress);
    }
    static setupLoadingPage(isFirstScene, cb) {
        let url = isFirstScene ? 'scenes/common/Loading/LoadingView.scene' : 'scenes/common/Loading/LoadWaitingView.scene';
        let page = Laya.Scene['_loadPage'];
        if (page && page.url == url)
            return;
        Laya.Scene.load(url, Laya.Handler.create(this, function (scene) {
            var stage = Laya.stage;
            var screenWidth = Laya.Browser.width;
            var screenHeight = Laya.Browser.height;
            var width = stage.designWidth;
            var height = stage.designHeight;
            var scaleX = screenWidth / width;
            var y = (screenHeight - height * scaleX >> 1) / scaleX;
            scene.y = Math.floor(y);
            Laya.Scene.setLoadingPage(scene);
            cb && cb();
        }));
    }
    static adjustViewPosition(view, portrait) {
        var stage = Laya.stage;
        var screenWidth = Laya.Browser.width;
        var screenHeight = Laya.Browser.height;
        var width = stage.designWidth;
        var height = stage.designHeight;
        if (portrait == undefined || portrait) {
            var scaleX = screenWidth / width;
            var y = (screenHeight - height * scaleX >> 1) / scaleX;
            view.y = Math.floor(y);
        }
        else {
            var scaleY = screenHeight / height;
            var x = (screenWidth - width * scaleY >> 1) / scaleY;
            view.x = Math.floor(x);
        }
    }
    /**================= dispatch system event =================**/
    _onReceiveMessage(cmd, value, code, message) {
        this._dispatchEvent('_onReceiveMessage', cmd, value);
    }
    _onReceiveSocketError(cmd, code, message) {
        this._dispatchEvent('_onReceiveMessage', cmd, code, message);
    }
    _onReceiveNotification(name, params) {
        this._dispatchEvent('_onReceiveNotification', name, params);
    }
    _onReceiveSocketClose() {
        if (!this.visibleScene)
            return;
        let components = this.visibleScene['_components'] || [], shareMsg = null;
        components.forEach((item) => {
            if (item.onSocketClose) {
                item.onSocketClose();
            }
        });
    }
    _onReceiveNetworkChange(res) {
        this._dispatchEvent('onNetworkChange', res);
    }
    onShareAppMessage() {
        if (!this.visibleScene)
            return;
        let components = this.visibleScene['_components'] || [], shareMsg = null;
        components.forEach((item) => {
            if (item.onShareAppMessage) {
                shareMsg = item.onShareAppMessage();
            }
        });
        return shareMsg;
    }
    _onShow(res) {
        this._dispatchEvent('_onShow', res);
    }
    _onHide(res) {
        this._dispatchEvent('_onHide', res);
    }
    _onLoad() {
        this._dispatchEvent('_onLoad');
    }
    _onAppear() {
        this._dispatchEvent('_onAppear');
    }
    _onDisappear() {
        this._dispatchEvent('_onDisappear');
    }
    _dispatchEvent(method, p1, p2, p3, p4, p5) {
        if (!this.visibleScene)
            return;
        this.visibleScene.dispatchLifeCycleEvent(method, p1, p2, p3, p4, p5);
    }
}
/**所有场景的map数据 */
Navigator.scenesMap = {};


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientConfig", function() { return ClientConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Client; });
/* harmony import */ var _Socket__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _wx_Toast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var _dataTrack_dataTrack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _paoya__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);




class ClientConfig {
}
ClientConfig.watchDogTime = 5;
ClientConfig.maxRetryTime = 3;
class Client extends _Socket__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(url = null) {
        super(url);
        this.msgsSending = [];
        this.msgsSent = [];
        this.map = {};
    }
    /**发送socket消息 */
    sendMessage(cmd, params) {
        if (!params.game_id && _paoya__WEBPACK_IMPORTED_MODULE_3__["default"].game) {
            params.game_id = _paoya__WEBPACK_IMPORTED_MODULE_3__["default"].game.gameId;
        }
        params.command = cmd;
        let time = (new Date()).valueOf();
        params.m_id = time;
        if (this.map[time] == undefined) {
            this.map[time] = 0;
        }
        else {
            this.map[time] = this.map[time]++;
        }
        var msg = JSON.stringify(params);
        if (this.connected) {
            if (cmd !== 'heartbeat') {
                console.log(`S >>> | ${cmd} | ${JSON.stringify(params)}`);
            }
            this.send(msg);
            let shouldCheck = true;
            let cmds = Client.ignoreCmds;
            for (let i = 0; i < cmds.length; i++) {
                let command = cmds[i];
                if (cmd === command) {
                    shouldCheck = false;
                    break;
                }
            }
            cmds = Client._ignoreCmds;
            for (let i = 0; i < cmds.length; i++) {
                let command = cmds[i];
                if (cmd === command) {
                    shouldCheck = false;
                    break;
                }
            }
            if (shouldCheck) {
                this.msgsSent.push(msg);
            }
        }
        else {
            this.msgsSending.push({ cmd: cmd, params: params });
            if (!this.isReconnecting && this.url) {
                this._startReconnect();
            }
            console.warn("缓存socket命令，等待连接成功后再次发送");
        }
    }
    /**处理socket消息 */
    handleMessage(msg) {
        super.handleMessage(msg);
        var obj = JSON.parse(msg);
        var cmd = obj.command;
        var value = obj.value;
        var code = obj.code;
        var message = obj.message || "请求出错";
        if (cmd !== 'heartbeat') {
            console.log(`S <<< | ${cmd} | ${JSON.stringify(value)}`);
        }
        if (cmd == Client.LOGIN) {
            this.onLogin();
        }
        this.event(cmd, [value, code, message]);
        this.dispatchResultToNavigator(cmd, value, code, message, obj.errorcode);
        //remove item
        this.removeMsg(obj);
    }
    dispatchResultToNavigator(cmd, value, code, message, errorcode) {
        if (code != 200) {
            _paoya__WEBPACK_IMPORTED_MODULE_3__["default"].navigator._onReceiveSocketError(cmd, errorcode, message);
            console.error(`S <<< | ${cmd} | ${errorcode} | ${message}`);
        }
        else {
            if (Client.ignorePathThroughCmds.indexOf(cmd) < 0) {
                _paoya__WEBPACK_IMPORTED_MODULE_3__["default"].navigator._onReceiveMessage(cmd, value);
            }
        }
    }
    onLogin() {
        console.log('WebSocket登录成功');
        console.log(`S: | sending | msgs: ${this.msgsSending.length}个`);
        this.msgsSending.forEach(msg => {
            this.sendMessage(msg.cmd, msg.params);
        });
        // let msg = this.msgsSending.shift()
        // msg && this.send(msg)
        this.msgsSending.length = 0;
        this.startWatchDog();
        this.startHeartBeat();
    }
    startWatchDog() {
        Laya.timer.loop(ClientConfig.watchDogTime, this, this.checkCmd);
    }
    stopWatchDog() {
        //测试是否需要清空历史命令
        this.msgsSent.length = 0;
        Laya.timer.clear(this, this.checkCmd);
    }
    checkCmd() {
        let currentTimestamp = (new Date()).valueOf();
        this.msgsSent.forEach((item, index) => {
            let msg = JSON.parse(item);
            if (msg.m_id && (currentTimestamp - msg.m_id > 5 * 1000)) {
                if (msg.retryTime < ClientConfig.maxRetryTime) {
                    //resend msg
                    _dataTrack_dataTrack__WEBPACK_IMPORTED_MODULE_2__["default"].track(_dataTrack_dataTrack__WEBPACK_IMPORTED_MODULE_2__["DataTrackType"].SocketRetry, { c: msg.command, t: msg.retryTime });
                    this.sendMessage(msg.command, msg);
                }
                else {
                    this.event(msg.command, [{}, -1, '请求超时']);
                    console.error(`命令 ${msg.command} 请求超时，如有误报，请在Main中添加ignoreCmds参数`);
                }
                //remove item
                this.removeMsg(msg);
            }
        });
    }
    removeMsg(msg) {
        for (let i = 0; i < this.msgsSent.length; i++) {
            let item = JSON.parse(this.msgsSent[i]);
            if (item.m_id == msg.m_id) {
                this.msgsSent.splice(i, 1);
                delete this.map[item.m_id];
            }
        }
    }
    _onClose(e) {
        super._onClose(e);
        _paoya__WEBPACK_IMPORTED_MODULE_3__["default"].navigator._onReceiveSocketClose();
        this.stopHeartBeat();
        this.stopWatchDog();
    }
    startHeartBeat() {
        Laya.timer.loop(15000, this, this.handleHeartBeat);
    }
    stopHeartBeat() {
        Laya.timer.clear(this, this.handleHeartBeat);
    }
    handleHeartBeat() {
        this.sendMessage(Client.HEART_BEAT, {});
    }
    /**子类重写 */
    onReconnecting(cur, total) {
        super.onReconnecting(cur, total);
        _wx_Toast__WEBPACK_IMPORTED_MODULE_1__["default"].showLoading(`连接中(${cur}/${total})`, true);
    }
    onReconnectStart() {
        super.onReconnectStart();
        this.stopHeartBeat();
        _wx_Toast__WEBPACK_IMPORTED_MODULE_1__["default"].showLoading("正在连接...");
    }
    onReconnectEnd() {
        super.onReconnectEnd();
        _wx_Toast__WEBPACK_IMPORTED_MODULE_1__["default"].hideLoading();
        _wx_Toast__WEBPACK_IMPORTED_MODULE_1__["default"].showSuccess("连接成功", 1500);
    }
    onReconnectFail() {
        super.onReconnectFail();
        _wx_Toast__WEBPACK_IMPORTED_MODULE_1__["default"].hideLoading();
        _wx_Toast__WEBPACK_IMPORTED_MODULE_1__["default"].showSuccess("连接失败", 1500);
    }
}
Client.ignoreCmds = [];
Client._ignoreCmds = [
    'betpk', 'startmatch', 'joinmatch', 'cancelmatch', 'matchagain',
    'cancelagain', 'promotionenroll', 'cancelenroll', 'laddermatch', 'cancelladdermatch',
    'demandpk', 'matchreject', 'sharestartgame', 'wheel_index', 'qq_join_room', 'receive_invite'
];
Client.ignorePathThroughCmds = ['heartbeat'];
//通用命令
Client.HEART_BEAT = "heartbeat";
Client.DISCONNECT = "disconnect";
Client.LEAVE_ROOM = 'leave_room';
Client.LOGIN = 'login';
//匹配
Client.MATCH_SUCCESS = "matchsuccess";
Client.MATCH_FAIL = "matchfail";
Client.MATCH_JOIN = "joinmatch";
Client.MATCH_CANCEL = "cancelmatch";
//天梯
Client.LADDER_MATCH_JOIN = "laddermatch";
Client.LADDER_MATCH_CANCEL = "cancelladdermatch";
//游戏阶段
Client.GAME_START_MATCH = 'startmatch';
Client.GAME_START_GAME = 'startpkgame';
Client.GAME_START_PK = 'startpk';
Client.GAME_BET = 'betpk';
Client.GAME_END_PK = 'endpk';
Client.GAME_END_PKGAME = 'endpkgame';
//再来一局
Client.AGIAN_SEND = 'matchagain';
Client.AGAIN_REJECT = 'matchreject';
Client.AGAIN_CANCAL = 'cancelagain';
//赛事
Client.CHAMPIONSHIP_JION = 'promotionenroll';
Client.CHAMPIONSHIP_CANCEL = 'cancelenroll';
Client.CHAMPIONSHIP_UPDATE_ROOM_COUNT = 'updateCount';
Client.CHAMPIONSHIP_UPDATE_TOTAL_COUNT = 'updatecurUserCount';
//分享
Client.SHARE_START_GAME = "sharestartgame";
Client.SHARE_INVITE_FRIEND = "invite_friend";
Client.SHARE_RECEIVE_INVITE = "receive_invite";
// static SHARE_LEAVE_ROOM = "shareleaveroom"
//群约战pk
Client.GROUP_JOIN_ROOM = "groupjoinroom";
Client.GROUP_ROOM_STATUS = "grouproomStatus";


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocketConfig", function() { return SocketConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Socket; });
/* harmony import */ var _dataTrack_dataTrack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _paoya__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);


class SocketConfig {
}
SocketConfig.zone = "";
class Socket extends Laya.Socket {
    constructor(url) {
        super();
        this.url = url;
        /**当前是否在重连 */
        this.isReconnecting = false;
        /**当前重连次数 */
        this.reconnectTimes = 0;
        // this.addObserver()
    }
    get canReconnect() {
        let networkMonitor = _paoya__WEBPACK_IMPORTED_MODULE_1__["default"].networkMonitor;
        let lifeCircleMonitor = _paoya__WEBPACK_IMPORTED_MODULE_1__["default"].lifeCircleMonitor;
        console.log(`SOCKET是否连接:    ${this.connected ? "是" : "否"}`);
        console.log(`是否在前台:        ${lifeCircleMonitor.inForeground ? "是" : "否"}`);
        console.log(`网络是否连接:      ${networkMonitor.isConnected ? "是" : "否"}`);
        console.log(`是否正在重连:      ${this.isReconnecting ? "是" : "否"}`);
        return !this.connected && lifeCircleMonitor.inForeground && networkMonitor.isConnected && !this.isReconnecting;
    }
    addObserver() {
        // NotificationCenter.on(NotificationName.NetworkChanged, this, this._startReconnect)
    }
    /**切换服务器 */
    changeUrl(url) {
        if (url != this.url) {
            this.url = url;
            if (this.isReconnecting) {
                this._stopReconnect();
            }
            if (this.connected) {
                this['_connected'] = false;
                this.close();
            }
            Laya.timer.once(500, this, () => {
                this.connect();
            });
        }
    }
    /**重写父类方法 */
    _onOpen(e) {
        super._onOpen(e);
        console.log(`S | OPEN: | ${JSON.stringify(e)}`);
        if (this.isReconnecting) {
            this._stopReconnect();
            this.onReconnectEnd();
        }
    }
    //{code:1006,reason:"abnormal closure"}服务器主动断开连接
    //{code:1000} 用户主动断开连接
    _onClose(e) {
        super._onClose(e);
        console.log(`S | CLOSE: | ${JSON.stringify(e)}`);
        // if (e.code == 1000) {
        //     return
        // }
        // if (e.code && e.code == 1006) { //网络原因导致的
        //     this._startReconnect(Socket.reconnectConfig.duration);
        // } else {
        //     this._startReconnect(Socket.reconnectConfig.interval);
        // }
    }
    /**重写父类方法 */
    _onMessage(msg) {
        super._onMessage(msg);
        if (!msg || !msg.data)
            return;
        let data = msg.data;
        this.handleMessage(data);
    }
    /**重写父类方法 */
    _onError(e) {
        super._onError(e);
        console.log(`S | Error: | ${JSON.stringify(e)}`);
    }
    /**处理消息返回内容，子类需重写 */
    handleMessage(msg) { }
    /**自定义方法，便于快速执行 */
    connect() {
        if (this.isReconnecting || this.connected)
            return;
        this.connectByUrl(this.url);
    }
    /**重写父类方法 */
    connectByUrl(url) {
        _dataTrack_dataTrack__WEBPACK_IMPORTED_MODULE_0__["default"].startSocketTime();
        this.url = url;
        super.connectByUrl(url);
    }
    startWatchDog() {
        Laya.timer.loop(5000, this, this.handleWatchDog);
    }
    handleWatchDog() {
        if (this.connected) {
            this.stopWatchDog();
        }
        else {
            this._startReconnect();
        }
    }
    stopWatchDog() {
        Laya.timer.clear(this, this.handleWatchDog);
    }
    /**开始重连 */
    _startReconnect(interval = Socket.reconnectConfig.interval) {
        if (!this.canReconnect)
            return;
        this.reconnectTimes = 0;
        this._reconnect();
        this.onReconnectStart();
        this.isReconnecting = true;
        Laya.timer.loop(interval * 1000, this, this._reconnect);
    }
    /**停止重连 */
    _stopReconnect() {
        if (!this.isReconnecting)
            return;
        this.isReconnecting = false;
        this.reconnectTimes = 0;
        Laya.timer.clear(this, this._reconnect);
    }
    /**执行重连方法 */
    _reconnect() {
        if (this.connected) {
            this._stopReconnect();
            this.onReconnectEnd();
            return;
        }
        let config = Socket.reconnectConfig;
        if (this.reconnectTimes < config.total) {
            this.connect();
            this.reconnectTimes++;
            this.onReconnecting(this.reconnectTimes, config.total);
            if (this.reconnectTimes > config.total / 2) {
                Laya.timer.clear(this, this._reconnect);
                Laya.timer.loop(config.duration * 1000, this, this._reconnect);
            }
        }
        else {
            this._stopReconnect();
            this.onReconnectFail();
        }
    }
    /**子类重写 */
    onReconnecting(times, total) {
        this.event(Socket.RECONNECT_PROGRESS, [times, total]);
    }
    onReconnectStart() {
        this.event(Socket.RECONNECT_START, [this.reconnectTimes, Socket.reconnectConfig.total]);
    }
    onReconnectEnd() {
        this.event(Socket.RECONNECT_END);
    }
    onReconnectFail() {
        this.event(Socket.RECONNECT_FAIL);
    }
}
/**重连配置 */
Socket.reconnectConfig = {
    total: 3,
    interval: 3,
    duration: 8 //后续重连间隔
};
Socket.RECONNECT_START = "socket.reconnect.start";
Socket.RECONNECT_END = 'socket.reconnect.end';
Socket.RECONNECT_FAIL = 'socket.reconnect.fail';
Socket.RECONNECT_PROGRESS = 'socket.reconnect.progress';


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Main; });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
/* harmony import */ var _wx_Toast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var _core_network_Request__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _wx_monitor_NetworkMonitor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(26);
/* harmony import */ var _wx_monitor_LifeCircleMonitor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(27);
/* harmony import */ var _core_network_Socket__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(21);
/* harmony import */ var _DataCenter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);
/* harmony import */ var _dataTrack_dataTrack__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5);
/* harmony import */ var _wx_manager_PayManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(28);
/* harmony import */ var _core_NotificationCenter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8);
/* harmony import */ var _core_network_Client__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(20);
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(12);
/* harmony import */ var _paoya__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(1);
/* harmony import */ var _service_LoginService__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(9);
/* harmony import */ var _wx_manager_ShareManager__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(7);
/* harmony import */ var _laya_sound__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(29);
/* harmony import */ var _service_Loader__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(30);
/* harmony import */ var _view_LaunchScreenView__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(25);


















class Main extends _game__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(params) {
        super(params);
        this.params = params;
        if (!params.gameId) {
            console.error("初始化时必须传入gameId");
        }
        if (!params.baseURL) {
            console.error("初始化时必须传入baseURL");
        }
        if (!params.zone) {
            console.error("初始化时必须传入zone");
        }
        if (params.useSocket == undefined) {
            params.useSocket = false;
        }
        this.gameId = params.gameId;
        this.params.rankingType = this.params.rankingType || _enums__WEBPACK_IMPORTED_MODULE_11__["RankingType"].Score;
        if (this.params.showBannerAdWhenDialogPopup != undefined) {
            _DataCenter__WEBPACK_IMPORTED_MODULE_6__["default"].showBannerAdWhenDialogPopup = this.params.showBannerAdWhenDialogPopup;
        }
        //对全局单例进行赋值
        _paoya__WEBPACK_IMPORTED_MODULE_12__["default"].game = this;
        _core_network_Socket__WEBPACK_IMPORTED_MODULE_5__["SocketConfig"].zone = params.zone;
        _wx_manager_PayManager__WEBPACK_IMPORTED_MODULE_8__["default"].offerId = params.offerId;
        this.init();
    }
    init() {
        _paoya__WEBPACK_IMPORTED_MODULE_12__["default"].networkMonitor = this.networkMonitor = new _wx_monitor_NetworkMonitor__WEBPACK_IMPORTED_MODULE_3__["default"]();
        _paoya__WEBPACK_IMPORTED_MODULE_12__["default"].lifeCircleMonitor = this.lifeCircleMonitor = new _wx_monitor_LifeCircleMonitor__WEBPACK_IMPORTED_MODULE_4__["default"]();
        this._addNotificationCenterListener();
        this._configHTTP();
        this._configLogin();
        this._configShareManager();
        this._configSoundManager();
        /**只有在小程序中才能启动事件统计功能 */
        if (Laya.Browser.onMiniGame) {
            _dataTrack_dataTrack__WEBPACK_IMPORTED_MODULE_7__["default"].setup(this.params.mtaID, this.params.mtaEventID, this.launchOption);
        }
        this.setupOthers();
    }
    loadRes() {
        let _this = this, connectWebsocket = null;
        if (!this.params.useSocket) {
            connectWebsocket = function () {
                _view_LaunchScreenView__WEBPACK_IMPORTED_MODULE_17__["default"].setTips('准备就绪');
                _this.setupLoadingView(() => {
                    _this.initRootScene(_this.launchOption, _this.isFirstLaunch);
                    _view_LaunchScreenView__WEBPACK_IMPORTED_MODULE_17__["default"].hide();
                });
            };
        }
        else {
            connectWebsocket = function () {
                _view_LaunchScreenView__WEBPACK_IMPORTED_MODULE_17__["default"].setTips('正在连接...');
                _this._initClient(function () {
                    _view_LaunchScreenView__WEBPACK_IMPORTED_MODULE_17__["default"].setTips('准备就绪');
                    _this.setupLoadingView(() => {
                        _this.initRootScene(_this.launchOption, _this.isFirstLaunch);
                        _view_LaunchScreenView__WEBPACK_IMPORTED_MODULE_17__["default"].hide();
                    });
                }, function () {
                    _wx_Toast__WEBPACK_IMPORTED_MODULE_1__["default"].showModal('提示', '连接服务器失败', '重试', function () {
                        _this.socket.connect();
                    });
                });
            };
        }
        let login = function (suc) {
            _view_LaunchScreenView__WEBPACK_IMPORTED_MODULE_17__["default"].setTips('正在登录...');
            _view_LaunchScreenView__WEBPACK_IMPORTED_MODULE_17__["default"].hideProgress();
            _service_LoginService__WEBPACK_IMPORTED_MODULE_13__["default"].login(suc, function () {
                _wx_Toast__WEBPACK_IMPORTED_MODULE_1__["default"].showModal('提示', '登录失败', '重试', function () {
                    login(suc);
                });
            });
        };
        let complete = function () {
            login(function () {
                connectWebsocket();
            });
        };
        _service_Loader__WEBPACK_IMPORTED_MODULE_16__["default"].preload(Laya.Handler.create(this, () => {
            if (_DataCenter__WEBPACK_IMPORTED_MODULE_6__["default"].GAMEPREPARE) {
                let prepare = _DataCenter__WEBPACK_IMPORTED_MODULE_6__["default"].GAMEPREPARE;
                if (typeof prepare == 'function') {
                    prepare();
                    complete();
                }
                else if (typeof prepare == 'object') {
                    if (prepare['async']) {
                        prepare['async'](function () {
                            complete();
                        });
                    }
                    else {
                        prepare['sync']();
                        complete();
                    }
                }
            }
            else {
                complete();
            }
        }), Laya.Handler.create(this, (progress) => {
            _view_LaunchScreenView__WEBPACK_IMPORTED_MODULE_17__["default"].setProgress(progress);
        }, null, false));
    }
    _addNotificationCenterListener() {
        _core_NotificationCenter__WEBPACK_IMPORTED_MODULE_9__["default"].on(_core_NotificationCenter__WEBPACK_IMPORTED_MODULE_9__["NotificationName"].ApplicationShow, this, this._onShow);
        _core_NotificationCenter__WEBPACK_IMPORTED_MODULE_9__["default"].on(_core_NotificationCenter__WEBPACK_IMPORTED_MODULE_9__["NotificationName"].ApplicationHide, this, this._onHide);
        _core_NotificationCenter__WEBPACK_IMPORTED_MODULE_9__["default"].on(_core_NotificationCenter__WEBPACK_IMPORTED_MODULE_9__["NotificationName"].NetworkChanged, this, this._handleNetworkChange);
    }
    _configHTTP() {
        _core_network_Client__WEBPACK_IMPORTED_MODULE_10__["default"].ignoreCmds = this.params.ignoreCmds || [];
        _core_network_Request__WEBPACK_IMPORTED_MODULE_2__["RequestConfig"].baseURL = this.params.baseURL;
        if (this.launchOption && this.launchOption.referrerInfo && this.launchOption.referrerInfo.extraData) {
            let referrerInfo = this.launchOption.referrerInfo, extraData = referrerInfo.extraData, token = extraData.token, baseURL = extraData.baseURL;
            baseURL && (_core_network_Request__WEBPACK_IMPORTED_MODULE_2__["RequestConfig"].baseURL = baseURL);
        }
        let _this = this;
        _core_network_Request__WEBPACK_IMPORTED_MODULE_2__["RequestConfig"].makeParamsHandler = function (params) {
            if (!params['user_token'] && _core_network_Request__WEBPACK_IMPORTED_MODULE_2__["RequestConfig"].token) {
                params['user_token'] = _core_network_Request__WEBPACK_IMPORTED_MODULE_2__["RequestConfig"].token;
            }
            if (!params['game_id'] && _this.gameId) {
                params['game_id'] = _this.gameId;
            }
            return { wxparams: JSON.stringify(params) };
        };
    }
    _configLogin() {
        let params = this.params;
        _service_LoginService__WEBPACK_IMPORTED_MODULE_13__["LoginConfig"].userId = params.userId;
        _service_LoginService__WEBPACK_IMPORTED_MODULE_13__["LoginConfig"].gameId = params.gameId;
        _service_LoginService__WEBPACK_IMPORTED_MODULE_13__["LoginConfig"].version = params.version;
        _service_LoginService__WEBPACK_IMPORTED_MODULE_13__["LoginConfig"].release = params.release;
        // LoginConfig.requestConfig = 
        let _this = this;
        _service_LoginService__WEBPACK_IMPORTED_MODULE_13__["LoginConfig"].makeLoginParamsHandler = function (params) {
            if (_this.launchOption && _this.launchOption['query']) {
                params['share_id'] = _this.launchOption['query']['id'] || 0;
                params['share_type'] = _this.launchOption['query']['type'] || 0;
                params['launch_info'] = _this.launchOption || '';
            }
            if (_this.launchOption && _this.launchOption.referrerInfo && _this.launchOption.referrerInfo.extraData) {
                let extraData = _this.launchOption.referrerInfo.extraData;
                params['from_game_id'] = extraData.fid || 0;
                params['from_game_id_type'] = extraData.jType || '';
            }
            return params;
        };
        if (this.launchOption && this.launchOption.referrerInfo && this.launchOption.referrerInfo.extraData) {
            let referrerInfo = this.launchOption.referrerInfo, extraData = referrerInfo.extraData, token = extraData.token;
            token && (_service_LoginService__WEBPACK_IMPORTED_MODULE_13__["default"].token = token);
        }
    }
    _configShareManager() {
        _wx_manager_ShareManager__WEBPACK_IMPORTED_MODULE_14__["default"].makeQueryHandler = function (query) {
            query.id = _DataCenter__WEBPACK_IMPORTED_MODULE_6__["default"].user.id;
            return query;
        };
    }
    _configSoundManager() {
        py.onAudioInterruptionBegin(() => {
            console.log(`Audio | interrupt | begin`);
            if (window['wx']) {
                this.lifeCircleMonitor.inForeground = false;
            }
            _laya_sound__WEBPACK_IMPORTED_MODULE_15__["default"].onAudioInterruptionBegin();
        });
        py.onAudioInterruptionEnd(() => {
            console.log(`Audio | interrupt | end`);
            if (window['wx']) {
                this.lifeCircleMonitor.inForeground = true;
            }
            _laya_sound__WEBPACK_IMPORTED_MODULE_15__["default"].onAudioInterruptionEnd();
        });
    }
    /**初始化websocket */
    _initClient(suc, fail) {
        console.warn('初始化WebSocket');
        let url = _DataCenter__WEBPACK_IMPORTED_MODULE_6__["default"].loginData.game_url;
        if (!url) {
            console.error("请验证game_url是否正确");
        }
        if (Laya.Render.isConchApp) {
            url = _DataCenter__WEBPACK_IMPORTED_MODULE_6__["default"].loginData['app_game_url'];
        }
        let socket = _paoya__WEBPACK_IMPORTED_MODULE_12__["default"].socket = this.socket = new _core_network_Client__WEBPACK_IMPORTED_MODULE_10__["default"](url + this.params.zone);
        socket.on(Laya.Event.OPEN, this, () => {
            _dataTrack_dataTrack__WEBPACK_IMPORTED_MODULE_7__["default"].stopSocketTime();
            let userId = _DataCenter__WEBPACK_IMPORTED_MODULE_6__["default"].user.id;
            if (!userId) {
                console.error("user_id不存在，请检查错误");
            }
            _dataTrack_dataTrack__WEBPACK_IMPORTED_MODULE_7__["default"].startSocketLogin();
            console.log('开始WebSocket登录');
            socket.sendMessage("login", { user_id: userId });
        });
        socket.once(_core_network_Client__WEBPACK_IMPORTED_MODULE_10__["default"].LOGIN, this, function () {
            Laya.timer.clear(this, timerHandler);
            _wx_Toast__WEBPACK_IMPORTED_MODULE_1__["default"].hideLoading();
            suc && suc();
            _dataTrack_dataTrack__WEBPACK_IMPORTED_MODULE_7__["default"].stopSocketLogin();
        });
        _wx_Toast__WEBPACK_IMPORTED_MODULE_1__["default"].showLoading('', false);
        socket.connect();
        let timerHandler = function () {
            socket.close();
            fail && fail();
        };
        /**20s后自动超时 */
        Laya.timer.once(15000, this, timerHandler);
    }
    _changeClientURL(type = _enums__WEBPACK_IMPORTED_MODULE_11__["SocketURLType"].GAME) {
        let baseURL = _DataCenter__WEBPACK_IMPORTED_MODULE_6__["default"].loginData[type];
        if (Laya.Render.isConchApp) {
            baseURL = _DataCenter__WEBPACK_IMPORTED_MODULE_6__["default"].loginData[`app_${type}`];
        }
        let url = baseURL + this.params.zone;
        if (url != this.socket.url) {
            console.warn(`开始切换服务器地址，旧地址为${this.socket.url} | 新地址为${url}`);
            this.socket.changeUrl(url);
        }
    }
    _onShow(res) {
        _laya_sound__WEBPACK_IMPORTED_MODULE_15__["default"].onShow();
        if (!this.socket)
            return;
        this.isFirstLaunch = false;
        this.launchOption = res;
        //当通过好友邀请进入游戏时，需要再次调用登录，以获取好友所在的服务器
        let query = res.query;
        let type = query.type;
        let _this = this;
        let onShowHandler = function () {
            _this.initRootScene(_this.launchOption, _this.isFirstLaunch);
        };
        if (type == _enums__WEBPACK_IMPORTED_MODULE_11__["ShareType"].InviteFriend || type == _enums__WEBPACK_IMPORTED_MODULE_11__["ShareType"].GroupPK) {
            _service_LoginService__WEBPACK_IMPORTED_MODULE_13__["default"].login(function () {
                _this._changeClientURL();
                onShowHandler();
            }, null);
        }
        else {
            onShowHandler();
            this.socket._startReconnect();
        }
        this.navigator._onShow(res);
        this.onShow(res);
    }
    _onHide(res) {
        _laya_sound__WEBPACK_IMPORTED_MODULE_15__["default"].onHide();
        this.navigator._onHide(res);
        if (!this.socket)
            return;
        this.onHide(res);
    }
    /**当游戏进入前台时触发 */
    onShow(res) {
    }
    /**当游戏进入后台时触发 */
    onHide(res) {
    }
    /**设置界面加载时的Loading界面 */
    setupLoadingView(cb) {
        cb();
    }
    setupOthers() {
    }
    _handleNetworkChange(res) {
        this.navigator._onReceiveNetworkChange(res);
        this.handleNetworkChange(res);
    }
    /**监听网络状态变化 */
    handleNetworkChange(res) {
    }
}


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Game; });
/* harmony import */ var _DataCenter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _wx_manager_UpdateManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/* harmony import */ var _paoya__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _wx_Toast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
/* harmony import */ var _core_navigator_Navigator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(19);
/* harmony import */ var _view_LaunchScreenView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(25);






class Game extends Laya.EventDispatcher {
    constructor(params) {
        super();
        this.params = params;
        /**当前游戏的ID */
        this.gameId = 1001;
        /**是否已登录 */
        this.isLogined = false;
        /**已经授权访问用户信息，只在登录之前有用，登录之后该值不再起作用 */
        this.isAuthed = false;
        this.loadNetworkRes = false;
        /**是否是第一次启动 */
        this.isFirstLaunch = true;
        this.params.debug = this.params.debug || false;
        this.gameId = params.gameId;
        //只在限制游戏包体的runtime中才去网上下载资源
        if (this.isMiniGame) {
            this.loadNetworkRes = this.params.loadNetworkRes == undefined ? true : this.params.loadNetworkRes;
        }
        this.initLaya();
        //初始化导航控制器
        _DataCenter__WEBPACK_IMPORTED_MODULE_0__["default"].RESURL = `https://xgamejuedixiaomie.goxiaochengxu.cn/${this.gameId}/`;
        _DataCenter__WEBPACK_IMPORTED_MODULE_0__["default"].adUnitId = params.adUnitId;
        _DataCenter__WEBPACK_IMPORTED_MODULE_0__["default"].bannerUnitId = params.bannerUnitId;
        _DataCenter__WEBPACK_IMPORTED_MODULE_0__["default"].interstitialUnitId = params.interstitialUnitId;
        _DataCenter__WEBPACK_IMPORTED_MODULE_0__["default"].adUnitIdLong = params.adUnitIdLong;
        _DataCenter__WEBPACK_IMPORTED_MODULE_0__["default"].qqViewId = params.qqViewId || 1003;
        this.configNavigator();
        this.setupConfig();
        this.initLaunchOption();
        this.checkUpdate();
        Laya.timer.callLater(this, this.initPlatform);
    }
    get isMiniGame() {
        return py.isMiniGame() && !Laya.Render.isConchApp;
    }
    /**初始化Laya引擎，子类可重写此方法，实现自己的界面展示 */
    initLaya() {
        let width = 0, height = 0;
        if (this.params.portrait == undefined || this.params.portrait) {
            width = this.params.width || 750;
            height = this.params.height || 1334;
        }
        else {
            width = this.params.width || 1334;
            height = this.params.height || 750;
        }
        let config = this.params;
        if (window['Laya3D']) {
            Laya3D.init(width, height);
        }
        else {
            Laya.init(width, height, config.webGL || Laya.WebGL);
        }
        Laya["Physics"] && Laya["Physics"].enable();
        //显示当前调试状态
        if (this.params.debug) {
            config.showStat && Laya.Stat.show();
            (config.showDebugTool || Laya.Utils.getQueryString('debug') == 'true') && Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya["PhysicsDebugDraw"] && Laya["PhysicsDebugDraw"].enable();
            // Laya.alertGlobalError = true
        }
        //屏幕适配相关
        let stage = Laya.stage;
        let Stage = Laya.Stage;
        stage.alignH = config.alignH || Stage.ALIGN_CENTER;
        stage.alignV = config.alignV || Stage.ALIGN_MIDDLE;
        if (config.portrait == undefined || config.portrait) {
            stage.screenMode = Stage.SCREEN_VERTICAL;
            stage.scaleMode = config.scaleMode || Stage.SCALE_FIXED_WIDTH;
        }
        else {
            stage.screenMode = Stage.SCREEN_HORIZONTAL;
            stage.scaleMode = config.scaleMode || Stage.SCALE_FIXED_HEIGHT;
        }
        // stage.frameRate = Stage.FRAME_MOUSE;
        let sprite = new Laya.Sprite();
        let Browser = Laya.Browser;
        sprite.graphics.drawRect(0, 0, Browser.width, Browser.height, "#000000");
        stage.addChild(sprite);
        this._setupResLoadConfig();
        //激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
        Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, function () {
            _view_LaunchScreenView__WEBPACK_IMPORTED_MODULE_5__["default"].show(this.params.portrait);
            Laya.AtlasInfoManager.enable('fileconfig.json', Laya.Handler.create(this, this.loadRes));
        }), Laya.ResourceVersion.FILENAME_VERSION);
    }
    initLaunchOption() {
        let launchOption = py.getLaunchOptionsSync();
        launchOption.referrerInfo = launchOption.referrerInfo || { extraData: {} };
        launchOption.referrerInfo.extraData = launchOption.referrerInfo.extraData || {};
        console.warn(`LAUNCH | ${JSON.stringify(launchOption)}`);
        this.launchOption = launchOption;
    }
    configNavigator() {
        _paoya__WEBPACK_IMPORTED_MODULE_2__["default"].navigator = this.navigator = new _core_navigator_Navigator__WEBPACK_IMPORTED_MODULE_4__["default"]();
        let view = Laya.Scene.root, portrait = true;
        if (this.params.portrait == undefined || this.params.portrait) {
            portrait = true;
        }
        else {
            portrait = false;
        }
        if (view) {
            let resize = function () {
                _core_navigator_Navigator__WEBPACK_IMPORTED_MODULE_4__["default"].adjustViewPosition(this, portrait);
            };
            view.on(Laya.Event.RESIZE, view, resize);
            resize.call(view);
        }
    }
    _setupResLoadConfig() {
        Laya.loader.retryNum = 3;
        Laya.loader.retryDelay = 2000;
        Laya.loader.maxLoader = 5;
        if (Laya["MiniAdpter"]) {
            let files = Laya.MiniAdpter.nativefiles || [];
            files.push('local');
            Laya.MiniAdpter.nativefiles = files;
        }
        if (Laya.URL.formatURL) {
            Laya.URL['formatURLCopy'] = Laya.URL.formatURL;
        }
        Laya.URL.formatURL = (url) => {
            if (Laya.URL['formatURLCopy']) {
                url = Laya.URL['formatURLCopy'](url);
            }
            if (this.loadNetworkRes && (url.indexOf('remote/') >= 0 || url.indexOf('font/') >= 0) && url.indexOf('http') < 0) {
                url = _DataCenter__WEBPACK_IMPORTED_MODULE_0__["default"].RESURL + url;
            }
            return url;
            // if (!url) return 'null path'
            // if (url.indexOf('http') >= 0) return url
            // if (!this.loadNetworkRes) {
            //     if (Laya.URL['formatURLCopy']) {
            //         return Laya.URL['formatURLCopy'](url)
            //     } else {
            //         return url
            //     }
            // }
            // if (url.indexOf('remote/') >= 0) {
            //     if (Laya.URL['formatURLCopy']) {
            //         url = Laya.URL['formatURLCopy'](url)
            //     }
            //     return DataCenter.RESURL + url
            // }
            // if (Laya.URL['formatURLCopy']) {
            //     return Laya.URL['formatURLCopy'](url)
            // }
            // return url
        };
        //兼容微信不支持加载scene后缀场景
        Laya.URL.exportSceneToJson = true;
    }
    initPlatform() {
        py.init();
        /**转发 */
        py.onShareAppMessage(() => {
            let msg = _paoya__WEBPACK_IMPORTED_MODULE_2__["default"].navigator.onShareAppMessage();
            if (msg) {
                return msg;
            }
            else {
                return this.onShareAppMessage();
            }
        });
    }
    checkUpdate() {
        let manager = new _wx_manager_UpdateManager__WEBPACK_IMPORTED_MODULE_1__["default"]();
        manager.on(_wx_manager_UpdateManager__WEBPACK_IMPORTED_MODULE_1__["default"].HAS_UPDATE, this, function () {
        });
        manager.on(_wx_manager_UpdateManager__WEBPACK_IMPORTED_MODULE_1__["default"].UPDATE_READY, this, function (cb) {
            _wx_Toast__WEBPACK_IMPORTED_MODULE_3__["default"].showModal("提示", "新版本下载成功", "重启", function () {
                cb && cb();
            });
        });
        manager.on(_wx_manager_UpdateManager__WEBPACK_IMPORTED_MODULE_1__["default"].UPDATE_FAIL, this, function () {
        });
    }
    /**返回用户【转发】消息 */
    onShareAppMessage() {
        return null;
    }
    /**退出当前小游戏 */
    exit() {
        py.exit();
    }
    /**初始化首屏界面 */
    initRootScene(launchOption, isFirstLaunch) {
    }
    /**必要的初始化操作放在该方法中 */
    setupConfig() {
    }
}


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UpdateManager; });
class UpdateManager extends Laya.EventDispatcher {
    constructor() {
        super();
        let updateManager = py.getUpdateManager();
        updateManager.onCheckForUpdate((res) => {
            // 请求完新版本信息的回调
            console.warn(`当前 | ${res.hasUpdate ? "有" : "无"} | 新版本`);
            if (res.hasUpdate) {
                this.event(UpdateManager.HAS_UPDATE);
            }
        });
        updateManager.onUpdateReady(() => {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            function cb() {
                updateManager.applyUpdate();
            }
            this.event(UpdateManager.UPDATE_READY, cb);
        });
        updateManager.onUpdateFailed(() => {
            // 新的版本下载失败
            this.event(UpdateManager.UPDATE_FAIL);
        });
    }
}
UpdateManager.HAS_UPDATE = "HAS_UPDATE";
UpdateManager.UPDATE_READY = "UPDATE_READY";
UpdateManager.UPDATE_FAIL = "UPDATE_FAIL";


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LaunchScreenView; });
/* harmony import */ var _core_navigator_Navigator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);

/**
 * 游戏启动时的加载页面
 */
class LaunchScreenView extends Laya.View {
    constructor() {
        super();
        this.setup();
    }
    setup() {
        let box = new Laya.Box();
        if (this._portrait) {
            this.size(750, 1334);
            box.size(750, 1334);
        }
        else {
            this.size(1334, 750);
            box.size(1334, 750);
        }
        box.cacheAs = 'normal';
        this.addChild(box);
        let imgBg = new Laya.Image('local/loading/bg.jpg');
        imgBg.x = -150;
        box.addChild(imgBg);
        let imgLogo = new Laya.Image('local/loading/logo.png');
        imgLogo.centerX = 0;
        imgLogo.top = 100;
        box.addChild(imgLogo);
        let imgProgressBg = new Laya.Image('local/loading/progress-bg.png');
        imgProgressBg.centerX = 0;
        imgProgressBg.bottom = 60;
        box.addChild(imgProgressBg);
        this._imgProgressBg = imgProgressBg;
        /*   let lblTips = new Laya.Label('玩游戏享乐趣,好友都在玩的小游戏乐园')
          lblTips.color = '#227fb3'
          lblTips.fontSize = 28
          lblTips.centerX = 0
          lblTips.bottom = 70
          box.addChild(lblTips) */
        let imgProgress = new Laya.Image('local/loading/progress-bar.png');
        imgProgress.centerX = 0;
        imgProgress.bottom = 80;
        this.addChild(imgProgress);
        this._imgProgress = imgProgress;
        let mask = new Laya.Sprite();
        mask.graphics.drawRect(0, 0, 0, 77, '#ff0000');
        imgProgress.mask = mask;
        this._imgProgressMask = mask;
        let lblProgress = new Laya.Label('0%');
        lblProgress.color = '#ffffff';
        lblProgress.fontSize = 30;
        lblProgress.centerX = 0;
        lblProgress.bottom = 76;
        this.addChild(lblProgress);
        this._lblProgress = lblProgress;
    }
    set progress(newValue) {
        if (newValue != this._progress) {
            this._progress = newValue;
            this._imgProgressMask.graphics.clear();
            this._imgProgressMask.graphics.drawRect(0, 0, newValue * this._imgProgress.width, this._imgProgress.height, '#ff0000');
        }
    }
    get progress() {
        return this._progress;
    }
    static setProgress(progress) {
        if (!this.ins)
            return;
        this.ins.progress = progress;
        this.setTips(`${Math.ceil(progress * 100)}%`);
    }
    static setTips(tip) {
        this.ins._lblProgress.text = tip;
    }
    static show(portrait) {
        let view = new LaunchScreenView();
        _core_navigator_Navigator__WEBPACK_IMPORTED_MODULE_0__["default"].adjustViewPosition(view, portrait);
        view.zOrder = 999;
        Laya.stage.addChild(view);
        this.ins = view;
        if (portrait == undefined || portrait) {
            this.ins._portrait = true;
        }
        else {
            this.ins._portrait = false;
        }
    }
    static hide() {
        if (this.ins) {
            this.ins.destroy();
        }
    }
    static hideProgress() {
        if (this.ins) {
            this.ins._imgProgressBg.visible = false;
            this.ins._imgProgress.visible = false;
            this.ins._lblProgress.visible = false;
        }
    }
}


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NetworkMonitor; });
/* harmony import */ var _core_NotificationCenter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);

class NetworkMonitor {
    constructor() {
        /**当前网络是否连接 */
        this.isConnected = true;
        this.isWIFI = true;
        this.type = '';
        this.getCurrentType((type) => {
            this.isConnected = (type != 'unknown' || type != 'none');
            this.isWIFI = type === 'wifi';
            this.type = type;
        });
        this.startMonitor();
    }
    /**启用网络监听 */
    startMonitor() {
        py.onNetworkStatusChange((res) => {
            this.handleNetworkChange(res);
        });
    }
    handleNetworkChange(res) {
        this.isWIFI = res.networkType === 'wifi';
        this.type = res.networkType;
        this.isConnected = res.isConnected;
        console.log(`NETWORK | change :\n`);
        console.log(JSON.stringify(res));
        _core_NotificationCenter__WEBPACK_IMPORTED_MODULE_0__["default"].defaultCenter.event(_core_NotificationCenter__WEBPACK_IMPORTED_MODULE_0__["NotificationName"].NetworkChanged, res);
    }
    /**停止网络监听 */
    stopMonitor() {
        py.offNetworkStatusChange(this.handleNetworkChange);
    }
    /**获取当前网络状态 */
    getCurrentType(cb) {
        py.getNetworkType({
            success: function (res) {
                console.log(`NETWORK | type :\n`);
                console.log(JSON.stringify(res));
                cb && cb(res.networkType);
            },
            fail() { }
        });
    }
}
NetworkMonitor.NETWORK_CHANGE = 'NetworkMonitor.network.change';


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LifeCircleMonitor; });
/* harmony import */ var _core_NotificationCenter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);

class LifeCircleMonitor {
    constructor() {
        /**是否在前台 */
        this.inForeground = true;
        this.ignoreFirstTime = window['wx'] ? true : false;
        this.startMonitor();
    }
    /**生命周期监听开始 */
    startMonitor() {
        py.onShow((res) => {
            if (this.ignoreFirstTime) {
                this.ignoreFirstTime = false;
                return;
            }
            console.warn('SHOW :\n');
            console.warn(JSON.stringify(res));
            this.inForeground = true;
            _core_NotificationCenter__WEBPACK_IMPORTED_MODULE_0__["default"].defaultCenter.event(_core_NotificationCenter__WEBPACK_IMPORTED_MODULE_0__["NotificationName"].ApplicationShow, res);
        });
        py.onHide((res) => {
            //{mode:back}  {mode:close}
            console.warn("HIDE :\n");
            console.warn(JSON.stringify(res));
            this.inForeground = false;
            _core_NotificationCenter__WEBPACK_IMPORTED_MODULE_0__["default"].defaultCenter.event(_core_NotificationCenter__WEBPACK_IMPORTED_MODULE_0__["NotificationName"].ApplicationHide, res);
        });
    }
    /**生命周期监听结束 */
    stopMonitor() {
        py.offShow({});
        py.offHide({});
    }
}
LifeCircleMonitor.SHOW = 'app.on.show';
LifeCircleMonitor.HIDE = 'app.on.hide';
LifeCircleMonitor.OFF_SHOW = 'app.off.show';
LifeCircleMonitor.OFF_HIDE = 'app.off.hide';


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PayManager; });
class PayManager {
    static pay(buyQuantity, success, fail) {
        py.requestPayment({
            env: this.env,
            offerId: this.offerId,
            currencyType: "CNY",
            buyQuantity: buyQuantity,
            success(res) {
                console.log(`PAY | suc | ${JSON.stringify(res)}`);
                success && success();
            },
            fail(res) {
                console.log(`PAY | fail | ${JSON.stringify(res)}`);
                var msg = res.errMsg;
                var code = res.errCode;
                fail && fail(code);
            }
        });
    }
}
PayManager.env = 0; // 0 正式版，1 沙箱环境
PayManager.platform = 'android';


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SoundManager; });
class SoundManager extends Laya.SoundManager {
    static onShow() {
        // this._windowFocus()
        this.onShowHandler && this.onShowHandler();
    }
    static onHide() {
        // this._windowBlur()
        this.onHideHandler && this.onHideHandler();
    }
    static onAudioInterruptionBegin() {
        // this._windowBlur()
        this.onAudioInterruptionBeginHandler && this.onAudioInterruptionBeginHandler();
    }
    static onAudioInterruptionEnd() {
        // this._windowFocus()
        this.onAudioInterruptionEndHandler && this.onAudioInterruptionEndHandler();
    }
    static _windowFocus() {
        Laya.stage['_isFocused'] = true;
        Laya.stage.event(/*laya.events.Event.FOCUS*/ "focus");
        Laya.stage.event(/*laya.events.Event.FOCUS_CHANGE*/ "focuschange");
    }
    static _windowBlur() {
        Laya.stage['_isFocused'] = false;
        Laya.stage.event(/*laya.events.Event.BLUR*/ "blur");
        Laya.stage.event(/*laya.events.Event.FOCUS_CHANGE*/ "focuschange");
    }
}


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Loader; });
/* harmony import */ var _export__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

class Loader {
    constructor() { }
    static load(url, caller, completion, p = null) {
        let completeHandler = Laya.Handler.create(this, function () {
            completion && completion.call(caller);
        });
        let progressHandler = Laya.Handler.create(this, function (progress) {
            console.log("loading progress" + progress);
            p && p.call(caller, progress);
        }, null, false);
        Laya.loader.load(url, completeHandler, progressHandler);
    }
    /**
     * 预加载资源
     */
    static preload(complete, progress) {
        Laya.loader.load(_export__WEBPACK_IMPORTED_MODULE_0__["DataCenter"].GAMERES, complete, progress);
    }
}


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TimerService; });
class TimerService extends Laya.EventDispatcher {
    /**
     *
     * @param duration 如果为倒计时，则为最大可倒计时；如果为正计时，则为最大可正计时
     * @param interval 步进时间
     * @param up 是否为正计时，默认为倒计时
     */
    constructor(duration, interval = 1, up = false) {
        super();
        this.duration = duration;
        this.interval = interval;
        this.up = up;
        this.curTime = 0;
    }
    start() {
        this.curTime = this.up ? 0 : this.duration;
        this.update();
        Laya.timer.loop(this.interval * 1000, this, this.update);
        this.event(TimerService.START, "");
    }
    stop() {
        this.curTime = 0;
        Laya.timer.clear(this, this.update);
        this.event(TimerService.STOP, "");
    }
    update() {
        if (this.up) {
            this.curTime++;
            if (this.curTime >= this.duration) {
                this.stop();
            }
            else {
                this.event(TimerService.PROGRESS, this.curTime);
            }
        }
        else {
            if (this.curTime > 0) {
                this.curTime--;
                this.event(TimerService.PROGRESS, this.curTime);
            }
            else {
                this.stop();
            }
        }
    }
}
TimerService.START = "start_";
TimerService.STOP = "stop_";
TimerService.TIMEOUT = "timeout_";
TimerService.PROGRESS = "progress_";


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LoginMaskView; });
/* harmony import */ var _core_NotificationCenter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _service_LoginService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);


class LoginMaskView extends Laya.View {
    constructor() {
        super();
        this.size(750, 1334);
        _core_NotificationCenter__WEBPACK_IMPORTED_MODULE_0__["default"].defaultCenter.on(_core_NotificationCenter__WEBPACK_IMPORTED_MODULE_0__["NotificationName"].LoginSuccess, this, this.destroy);
        this.on(Laya.Event.CLICK, this, function () {
            if (!PaoYa.game.isAuthed) {
                console.warn('此时用户还没有完成授权');
                return;
            }
            if (!_service_LoginService__WEBPACK_IMPORTED_MODULE_1__["default"].isLogined) {
                console.warn('此时用户还没有登录成功');
                return;
            }
            this.destroy();
        });
    }
    static showInView(view) {
        if (_service_LoginService__WEBPACK_IMPORTED_MODULE_1__["default"].isLogined) {
            return;
        }
        let maskView = new LoginMaskView();
        this.view = maskView;
        view.addChild(maskView);
    }
    static hide() {
        this.view.destroy();
    }
    destroy() {
        _core_NotificationCenter__WEBPACK_IMPORTED_MODULE_0__["default"].defaultCenter.off(_core_NotificationCenter__WEBPACK_IMPORTED_MODULE_0__["NotificationName"].LoginSuccess, this, this.destroy);
        this.removeSelf();
        super.destroy(true);
    }
}


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RoundImageView; });
/**专门用于设定圆形头像，有个前提条件是必须给该图片指定width及height */
class RoundImageView extends Laya.Image {
    constructor(skin) {
        super(skin);
        this.__init_$();
    }
    __init_$() {
        let mask = new Laya.Sprite();
        this.mask = mask;
        this.on(Laya.Event.RESIZE, this, () => {
            if (!this.mask) {
                return;
            }
            this.mask.graphics.clear();
            let width = this.width, height = this.height;
            let r = Math.ceil(Math.min(width, height) / 2);
            this.mask.graphics.drawCircle(r, r, r, '#ff0000');
        });
    }
}
Laya.ClassUtils.regClass('PaoYa.RoundImageView', RoundImageView);


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AuthManager; });
/* harmony import */ var _AuthUserInfoDialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35);
/* harmony import */ var _export__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _core_NotificationCenter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);



class AuthManager {
    /**
     *
     * @param scope 想要获取授权的标识，可以使用上面已经列举出来的权限
     * @param suc   授权成功回调
     * @param fail  授权失败回调
     * @param alert 当需要打开用户设置界面时，用于可以修改弹窗内容，方便用户确认操作
     */
    static auth(params) {
        let _this = this;
        if (!window['wx']) {
            params.next && params.next();
            return;
        }
        params.alert = (alertCb) => {
            this.showModal('提示', '需要您的授权才能正常使用', '去设置', () => {
                alertCb();
            });
        };
        params.fail = () => {
            Laya.Dialog.manager = null;
            UIConfig.closeDialogOnSide = false;
            let alert = new _AuthUserInfoDialog__WEBPACK_IMPORTED_MODULE_0__["default"](params.isNecessary);
            alert.onReceiveUserInfo = function (res) {
                if (res.userInfo) {
                    _export__WEBPACK_IMPORTED_MODULE_1__["DataCenter"].userInfoAuth = true;
                    _export__WEBPACK_IMPORTED_MODULE_1__["DataCenter"].user.avstar = res.userInfo.avatarUrl;
                    _export__WEBPACK_IMPORTED_MODULE_1__["DataCenter"].user.nickname = res.userInfo.nickName;
                    _core_NotificationCenter__WEBPACK_IMPORTED_MODULE_2__["default"].postNotification(`AuthOK`);
                    PaoYa.Request.POST('update_profile', { icon_big: res.userInfo.avatarUrl, name: res.userInfo.nickName }, () => {
                        params.next && params.next();
                    });
                }
                if (!params.isNecessary && !res.userInfo) {
                    params.next && params.next();
                }
            };
            alert.popup(true, false);
        };
        let okHandler = function () {
            wx.openSetting({
                success(res) {
                    let result = res.authSetting[params.scope];
                    //params.next && params.next();
                    if (!params.isNecessary && !result) {
                        params.next && params.next();
                        return;
                    }
                    if (result) {
                        _this.getUserInfo((res) => {
                            _export__WEBPACK_IMPORTED_MODULE_1__["DataCenter"].userInfoAuth = true;
                            _export__WEBPACK_IMPORTED_MODULE_1__["DataCenter"].user.avstar = res.userInfo.avatarUrl;
                            _export__WEBPACK_IMPORTED_MODULE_1__["DataCenter"].user.nickname = res.userInfo.nickName;
                            _core_NotificationCenter__WEBPACK_IMPORTED_MODULE_2__["default"].postNotification(`AuthOK`);
                            PaoYa.Request.POST('update_profile', { icon_big: res.userInfo.avatarUrl, name: res.userInfo.nickName }, () => {
                                params.next && params.next();
                            });
                        });
                    }
                    else {
                        params.alert && params.alert(okHandler);
                    }
                },
                fail() {
                    params.fail && params.fail();
                }
            });
        };
        wx.getSetting({
            success(res) {
                let result = res.authSetting[params.scope];
                if (result == undefined) { //没有获取过权限
                    /**如果请求用户权限失败，则直接return */
                    if (params.scope == AuthManager.scope.userInfo) {
                        params.fail && params.fail();
                        return;
                    }
                    wx.authorize({
                        scope: params.scope,
                        success(res) {
                            params.next && params.next();
                        },
                        fail() {
                            params.alert && params.alert(okHandler);
                        },
                        complete() { }
                    });
                }
                else if (!result) { //当前权限为否
                    params.alert && params.alert(okHandler);
                }
                else {
                    params.next && params.next();
                }
            }
        });
    }
    /**调用微信获取用户信息接口 */
    static getUserInfo(cb) {
        wx.getUserInfo({
            withCredentials: true,
            lang: "zh_CN",
            success(res) {
                cb && cb(res);
            },
            fail() { }
        });
    }
    static getUserInfoWithoutCredentials(cb) {
        wx.getUserInfo({
            lang: "zh_CN",
            withCredentials: false,
            success(res) {
                cb && cb(res);
            },
            fail() { }
        });
    }
    static showModal(title = '提示', content = '', confirmText = '知道了', confirmCallback = null, cancelText = "", cancelCallback = null) {
        var params = {
            title: title,
            content: content,
            showCancel: cancelText ? true : false,
            cancelColor: '#000000',
            confirmColor: '#3cc51f',
            cancelText: cancelText,
            confirmText: confirmText,
            success: function (res) {
                if (res.confirm) {
                    confirmCallback && confirmCallback();
                }
                if (res.cancel) {
                    cancelCallback && cancelCallback();
                }
            },
            fail() { }
        };
        wx.showModal(params);
    }
}
AuthManager.scope = {
    userInfo: "scope.userInfo",
    userLocation: "scope.userLocation",
    address: "scope.address",
    invoiceTitle: "scope.invoiceTitle",
    werun: "scope.werun",
    record: "scope.record",
    writePhotosAlbum: "scope.writePhotosAlbum",
    camera: "scope.camera"
};


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AuthUserInfoDialog; });
class AuthUserInfoDialog extends Laya.Dialog {
    constructor(isNecessary) {
        super();
        if (isNecessary != undefined) {
            this.isNecessary = isNecessary;
        }
        else {
            this.isNecessary = false;
        }
        this.size(636, 508);
        let image = new Laya.Image('local/auth/bg.png');
        this.addChild(image);
    }
    onOpened() {
        let frame = {
            x: 26,
            y: 400,
            width: 588,
            height: 85
        };
        let pos = this.localToGlobal(new Laya.Point(frame.x, frame.y));
        this.showUserInfoButton({
            x: pos.x,
            y: pos.y,
            width: frame.width,
            height: frame.height
        });
    }
    showUserInfoButton(rect) {
        var stage = Laya.stage;
        var screenWidth = Laya.Browser.width;
        var screenHeight = Laya.Browser.height;
        var width = stage.designWidth;
        var height = stage.designHeight;
        /* 这是竖版 */
        /*  var scaleX = screenWidth / width; */
        var scaleX = screenHeight / height;
        let scale = scaleX / Laya.Browser.pixelRatio;
        let style = {
            top: rect.y * scale,
            left: rect.x * scale,
            width: rect.width * scale,
            height: rect.height * scale,
            backgroundColor: '#ffffff',
            borderColor: '#ffffff',
            borderRadius: 10,
            borderWidth: 0,
            textAlign: 'center',
            fontSize: 24,
            lineHeight: 10
        };
        let button = wx.createUserInfoButton({
            type: 'image',
            image: 'local/auth/button.png',
            style: style,
            withCredentials: true,
            lang: 'zh_CN'
        });
        button.onTap((res) => {
            if (res.userInfo || !this.isNecessary) {
                this.onReceiveUserInfo && this.onReceiveUserInfo(res);
            }
            this.close();
            button.destroy();
        });
    }
}


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return InterstitialAd; });
/* harmony import */ var _export__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

class InterstitialAd extends Laya.EventDispatcher {
    constructor(params) {
        super();
        this.isLoaded = false;
        this.createAd(params);
    }
    createAd(params) {
        let _this = this;
        let interstitialAd = wx.createInterstitialAd({ adUnitId: params.adUnitId });
        interstitialAd.onLoad(function (res) {
            _this.isLoaded = true;
            _this.event(InterstitialAd.LOAD, res);
        });
        interstitialAd.onError(function (res) {
            _this.isLoaded = false;
            if (window['BK']) {
                res = {
                    errMsg: res.msg,
                    errCode: res.code
                };
            }
            _this.event(InterstitialAd.ERROR, res);
        });
        interstitialAd.onClose(function (res) {
            _this.isLoaded = false;
            /**兼容微信低版本 */
            if (!res) {
                res = { isEnded: true };
            }
            _this.event(InterstitialAd.CLOSE, res);
            _export__WEBPACK_IMPORTED_MODULE_0__["SoundManager"].onAudioInterruptionEnd();
        });
        this.interstitialAd = interstitialAd;
    }
    show() {
        if (window['BK']) {
            this.interstitialAd.show();
        }
        else {
            if (this.isLoaded) {
                this.interstitialAd.show().then(null, res => {
                    this.event(InterstitialAd.ERROR, res);
                });
            }
            else {
                this.interstitialAd.load();
                this.once(InterstitialAd.LOAD, this, function () {
                    this.interstitialAd.show().then(null, res => {
                        this.event(InterstitialAd.ERROR, res);
                    });
                });
            }
        }
    }
    static show(params) {
        if (!window['wx']) {
            params.onError && params.onError();
            return;
        }
        if (window['wx'] && !_export__WEBPACK_IMPORTED_MODULE_0__["DataCenter"].interstitialUnitId) {
            console.error('请在Main中设置interstitialUnitId之后再观看广告');
            return;
        }
        if (!this.ad) {
            this.ad = new InterstitialAd({ adUnitId: _export__WEBPACK_IMPORTED_MODULE_0__["DataCenter"].interstitialUnitId });
        }
        let ad = this.ad;
        ad.offAllCaller(this);
        ad.on(this.LOAD, this, params.onLoad);
        ad.on(this.ERROR, this, params.onError);
        ad.on(this.CLOSE, this, params.onClose);
        _export__WEBPACK_IMPORTED_MODULE_0__["SoundManager"].onAudioInterruptionBegin();
        ad.show();
    }
}
InterstitialAd.LOAD = 'load_ad';
InterstitialAd.ERROR = 'error_ad';
InterstitialAd.CLOSE = 'close_ad';
InterstitialAd.ad = null;


/***/ }),
/* 37 */
/***/ (function(module, exports) {

/**返回数组中最后一个元素，如果数组为空，返回null */
Object.defineProperty(Array.prototype, "lastObject", {
    configurable: false,
    enumerable: false,
    get: function () {
        if (!this.length) {
            return null;
        }
        return this[this.length - 1];
    }
});
/**随机返回数组中一个元素，如果数组为空，返回null */
Object.defineProperty(Array.prototype, "randomItem", {
    configurable: false,
    enumerable: false,
    get: function () {
        if (!this.length) {
            return null;
        }
        var index = Math.floor(Math.random() * this.length);
        return this[index];
    }
});


/***/ }),
/* 38 */
/***/ (function(module, exports) {

/**
 *
 * @param {时间格式，如“yyyy-mm-dd hh:mm:ss”} format
 */
Date.prototype.formatWithStyle = function (format) {
    let y = this.getFullYear();
    let m = this.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = this.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = this.getHours();
    h = h < 10 ? ('0' + h) : h;
    let minute = this.getMinutes();
    let second = this.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    format = format.replace("yyyy", y + "");
    format = format.replace("mm", m + '');
    format = format.replace("dd", d + '');
    format = format.replace('hh', h + '');
    format = format.replace('mm', minute + '');
    format = format.replace('ss', second + '');
    return format;
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

/**
 * 格式化秒数，如 1000s = 00:16:40
 */
Number.prototype.formatTime = function (format = 'H:M:S') {
    let seconds = this;
    seconds = Math.floor(seconds);
    let hour = Math.floor(seconds / 3600);
    let hourStr = hour < 10 ? ("0" + hour) : hour + '';
    var balance = seconds % 3600;
    let minute = Math.floor(balance / 60);
    let minuteStr = minute < 10 ? ("0" + minute) : minute + '';
    let second = balance % 60;
    let secondStr = second < 10 ? ("0" + second) : second + '';
    if (format.indexOf('H') != -1) {
        format = format.replace(/H/, hourStr);
    }
    if (format.indexOf('M') != -1) {
        format = format.replace(/M/, minuteStr);
    }
    if (format.indexOf('S') != -1) {
        format = format.replace(/S/, secondStr);
    }
    return format;
};


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);

Laya.View.prototype.createViewFromJSON = function (url, complete) {
    if (!url)
        return;
    let type = Laya.Utils.getFileExtension(url);
    type || (url += '.json');
    Laya.loader.resetProgress();
    let loader = new Laya.SceneLoader();
    loader.on(Laya.Event.COMPLETE, null, () => {
        let obj = Laya.Loader.getRes(url);
        if (!obj)
            throw "Can not find scene:" + url;
        if (!this._getBit(/*laya.Const.NOT_READY*/ 0x08)) {
            console.warn('Scene has been Ready!!!');
            this.event(Laya.Event.READY, this);
            complete && complete.runWith(null);
        }
        else {
            this.on('onViewCreated', null, () => {
                this.event(Laya.Event.READY, this);
                complete && complete.runWith(null);
            });
            this.createView(obj);
        }
    });
    loader.load(url);
};
const LAST_CLICK_TIME = '_last_click_time';
Laya.Node.prototype.addClickListener = function (caller, method, throttle = false, fail) {
    caller || (caller = {});
    return this.on(Laya.Event.CLICK, this, function (args) {
        if (!throttle) {
            method.call(caller, args);
            return;
        }
        let now = Date.now(), time = caller[LAST_CLICK_TIME] || 0, delta = now - time;
        if (delta < 300) {
            fail && fail.call(caller, '操作速度过快');
            console.warn('操作点击过快');
        }
        else {
            caller[LAST_CLICK_TIME] = now;
            method.call(caller, args);
        }
    });
};
Laya.Node.prototype.dispatchLifeCycleEvent = function (method, p1, p2, p3, p4, p5) {
    this.dispatchComponentEvent(method, p1, p2, p3, p4, p5);
    if (!this.destroyed) {
        for (let i = 0, length = this.numChildren; i < length; i++) {
            let child = this.getChildAt(i);
            child.dispatchComponentEvent(method, p1, p2, p3, p4, p5);
        }
    }
    if (this[method]) {
        this[method](p1, p2, p3, p4, p5);
    }
};
Laya.Node.prototype.dispatchComponentEvent = function (method, p1, p2, p3, p4, p5) {
    let components = this['_components'] || [];
    components.forEach((item) => {
        if (item[method] && item.enabled) {
            item[method](p1, p2, p3, p4, p5);
        }
    });
};
Laya.Sprite.prototype.drawBackground = function () {
    this.graphics.clear();
    this.graphics.drawPath(0, 0, _utils_utils__WEBPACK_IMPORTED_MODULE_0__["default"].makeRoundRectPath(this.width, this.height, this._cornerRadius || 0, PaoYa.RectCorner.RectCornerAllCorners), {
        fillStyle: this._backgroundColor
    });
};
Laya.Scene.load = function (url, complete, progress) {
    Laya.loader.resetProgress();
    var loader = new Laya.SceneLoader();
    loader.on(/*laya.events.Event.PROGRESS*/ "progress", null, onProgress);
    loader.once(/*laya.events.Event.COMPLETE*/ "complete", null, done);
    loader.load(url);
    function onProgress(value) {
        if (Laya.Scene['_loadPage'])
            Laya.Scene['_loadPage'].event("progress", value);
        progress && progress.runWith(value);
    }
    function done() {
        if (Laya.Scene['_prepareHandler']) {
            let prepare = Laya.Scene['_prepareHandler'];
            if (typeof prepare == 'function') {
                prepare();
                create();
            }
            else if (typeof prepare == 'object') {
                if (prepare['async']) {
                    prepare['async'](function () {
                        create();
                    });
                }
                else {
                    prepare['sync']();
                    create();
                }
            }
        }
        else {
            create();
        }
    }
    function create() {
        Laya.Scene['_prepareHandler'] = null;
        loader.off(/*laya.events.Event.PROGRESS*/ "progress", null, onProgress);
        let p = url;
        if (p instanceof Array) {
            url = p[p.length - 1];
        }
        var obj = Laya.Loader.getRes(url);
        if (!obj)
            throw "Can not find scene:" + url;
        if (!obj.props)
            throw "Scene data is error:" + url;
        var runtime = obj.props.runtime ? obj.props.runtime : obj.type;
        var clas = Laya.ClassUtils.getClass(runtime);
        if (obj.props.renderType == "instance") {
            var scene = clas.instance || (clas.instance = new clas());
        }
        else {
            scene = new clas();
        }
        if (scene && (scene instanceof Laya.Node)) {
            scene.url = url;
            if (!scene._getBit(/*laya.Const.NOT_READY*/ 0x08)) {
                complete && complete.runWith(scene);
                Laya.Scene.hideLoadingPage();
            }
            else {
                scene.on("onViewCreated", null, function () {
                    Laya.Scene.hideLoadingPage();
                    complete && complete.runWith(scene);
                });
                scene.createView(obj);
            }
        }
        else {
            throw "Can not find scene:" + runtime;
        }
    }
};
/**为指定的Sprite添加背景色，使用时需要先确定该Sprite的宽高 */
Object.defineProperty(Laya.Sprite.prototype, "backgroundColor", {
    configurable: false,
    enumerable: false,
    get: function () {
        return this._backgroundColor || null;
    },
    set: function (color) {
        if (!color || (color == this._backgroundColor))
            return;
        this._backgroundColor = color;
        // this._bgSprite = this._bgSprite || this.addChildAt(new Laya.Sprite(),0)
        Laya.timer.callLater(this, this.drawBackground);
    }
});
/**为指定的Sprite添加圆角，使用时需要先确定该Sprite的宽高，一般配合backgroundColor一起使用 */
Object.defineProperty(Laya.Sprite.prototype, "cornerRadius", {
    configurable: false,
    enumerable: false,
    get: function () {
        return this._cornerRadius || 0;
    },
    set: function (radius) {
        if (!radius || (this._cornerRadius == radius))
            return;
        this._cornerRadius = radius;
        // this._bgSprite = this._bgSprite || this.addChildAt(new Laya.Sprite(),0)
        Laya.timer.callLater(this, this.drawBackground);
    }
});


/***/ })
/******/ ]);