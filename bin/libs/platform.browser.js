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
/* harmony import */ var _updateManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _BannerAd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _RewardedVideoAd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _InterstitialAd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);




var Platform = /** @class */ (function () {
    function Platform() {
    }
    Platform.prototype.init = function () {
    };
    Platform.prototype.getLaunchOptionsSync = function () {
        return {
            scene: 1044,
            query: {
                id: "186100"
            },
            path: "",
            shareTicket: "9089bcad-b1c8-4d01-8932-9e6a3736aebf"
        };
    };
    Platform.prototype.login = function (params, cb) {
        cb({
            type: 5,
            platform: 5
        });
    };
    Platform.prototype.auth = function (params) {
        params.next && params.next();
    };
    Platform.prototype.isMiniGame = function () {
        return !1;
    };
    Platform.prototype.getUserInfo = function (p) {
    };
    /**生命周期 */
    Platform.prototype.onShow = function (cb) {
        /**@warn 这里可能需要针对第一次进行过滤 */
    };
    Platform.prototype.offShow = function () {
    };
    Platform.prototype.onHide = function (cb) {
    };
    Platform.prototype.offHide = function () {
    };
    /**分享 */
    Platform.prototype.onShareAppMessage = function (listener) {
    };
    Platform.prototype.shareAppMessage = function (params) {
    };
    Platform.prototype.getShareInfo = function (params) {
    };
    Platform.prototype.setKeepScreenOn = function () {
    };
    Platform.prototype.getSystemInfoSync = function () {
        return null;
    };
    Platform.prototype.getUpdateManager = function () {
        return new _updateManager__WEBPACK_IMPORTED_MODULE_0__["default"]();
    };
    /**小程序跳转 */
    Platform.prototype.navigateToMiniProgram = function (params) {
        console.warn("\u6253\u5f00\u5c0f\u7a0b\u5e8f");
    };
    Platform.prototype.exit = function (params) {
    };
    /**声音 */
    Platform.prototype.onAudioInterruptionBegin = function (listener) {
    };
    Platform.prototype.onAudioInterruptionEnd = function (listener) {
    };
    /**network */
    Platform.prototype.onNetworkStatusChange = function (listener) {
    };
    Platform.prototype.offNetworkStatusChange = function (listener) {
    };
    Platform.prototype.getNetworkType = function (params) {
    };
    /**支付 */
    Platform.prototype.requestPayment = function (params) {
        console.warn("浏览器不支持充值");
    };
    /**Toast */
    Platform.prototype.showLoading = function (params) {
        console.warn("showLoading");
    };
    Platform.prototype.hideLoading = function (params) {
        console.warn("hideLoading");
    };
    Platform.prototype.showToast = function (params) {
        console.warn("showToast");
    };
    Platform.prototype.hideToast = function (params) {
        console.warn("hideToast");
    };
    Platform.prototype.showModal = function (params) {
        console.warn("showModal");
    };
    Platform.prototype.showActionSheet = function (params) {
        console.warn("showActionSheet");
    };
    /**广告 */
    Platform.prototype.createBannerAd = function (params) {
        return new _BannerAd__WEBPACK_IMPORTED_MODULE_1__["default"](params);
    };
    Platform.prototype.createRewardedVideoAd = function (params) {
        return new _RewardedVideoAd__WEBPACK_IMPORTED_MODULE_2__["default"](params);
    };
    Platform.prototype.createInterstitialAd = function (params) {
        return new _InterstitialAd__WEBPACK_IMPORTED_MODULE_3__["default"](params);
    };
    /**微信特有方法 */
    Platform.prototype.setUserCloudStorage = function (params) {
    };
    Platform.prototype.openCustomerServiceConversation = function () {
        console.warn("\u6253\u5F00\u5FAE\u4FE1\u5BA2\u670D\u6D88\u606F");
    };
    Platform.prototype.previewImage = function (params) {
        console.warn('预览图片');
    };
    Platform.prototype.setClipboardData = function (params) {
    };
    return Platform;
}());
/* harmony default export */ __webpack_exports__["default"] = (Platform);
window['py'] = new Platform();


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var UpdateManager = /** @class */ (function () {
    function UpdateManager() {
    }
    UpdateManager.prototype.onCheckForUpdate = function (cb) {
    };
    UpdateManager.prototype.onUpdateReady = function (cb) {
    };
    UpdateManager.prototype.onUpdateFailed = function (cb) {
    };
    UpdateManager.prototype.applyUpdate = function () {
    };
    return UpdateManager;
}());
/* harmony default export */ __webpack_exports__["default"] = (UpdateManager);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var BannerAd = /** @class */ (function () {
    function BannerAd(params) {
    }
    /**显示 banner 广告 */
    BannerAd.prototype.show = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.listenerError();
            reject("\u5F53\u524D\u7248\u672C\u4E0D\u652F\u6301\u5E7F\u544A");
        });
    };
    /**隐藏 banner 广告 */
    BannerAd.prototype.hide = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.listenerError();
            reject("\u5F53\u524D\u7248\u672C\u4E0D\u652F\u6301\u5E7F\u544A");
        });
    };
    /**销毁 banner 广告 */
    BannerAd.prototype.destroy = function () {
    };
    /**监听 banner 广告尺寸变化事件 */
    BannerAd.prototype.onResize = function (listener) {
    };
    /**取消监听 banner 广告尺寸变化事件 */
    BannerAd.prototype.offResize = function (listener) {
    };
    /**监听 banner 广告加载事件 */
    BannerAd.prototype.onLoad = function (listener) {
    };
    /**取消监听 banner 广告加载事件 */
    BannerAd.prototype.offLoad = function (listener) {
    };
    /**监听 banner 广告错误事件 */
    BannerAd.prototype.onError = function (listener) {
        this.listenerError = listener;
    };
    /**取消监听 banner 广告错误事件 */
    BannerAd.prototype.offError = function (listener) {
    };
    BannerAd.prototype.listenerError = function () {
    };
    return BannerAd;
}());
/* harmony default export */ __webpack_exports__["default"] = (BannerAd);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var RewardedVideoAd = /** @class */ (function () {
    function RewardedVideoAd(params) {
    }
    /**隐藏激励视频广告 */
    RewardedVideoAd.prototype.load = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.listenerError();
            reject("\u5F53\u524D\u7248\u672C\u4E0D\u652F\u6301\u5E7F\u544A");
        });
    };
    /**显示激励视频广告。激励视频广告将从屏幕下方推入 */
    RewardedVideoAd.prototype.show = function () {
        return new Promise(function (resolve, reject) {
            reject("\u5F53\u524D\u7248\u672C\u4E0D\u652F\u6301\u5E7F\u544A");
        });
    };
    /**监听激励视频广告加载事件 */
    RewardedVideoAd.prototype.onLoad = function (listener) {
    };
    /**取消监听激励视频广告加载事件 */
    RewardedVideoAd.prototype.offLoad = function (listener) {
    };
    /**监听激励视频错误事件 */
    RewardedVideoAd.prototype.onError = function (listener) {
    };
    /**取消监听激励视频错误事件 */
    RewardedVideoAd.prototype.offError = function (listener) {
        this.listenerError = listener;
    };
    /**监听用户点击 关闭广告 按钮的事件 */
    RewardedVideoAd.prototype.onClose = function (listener) {
    };
    /**取消监听用户点击 关闭广告 按钮的事件 */
    RewardedVideoAd.prototype.offClose = function (listener) {
    };
    RewardedVideoAd.prototype.listenerError = function () {
    };
    return RewardedVideoAd;
}());
/* harmony default export */ __webpack_exports__["default"] = (RewardedVideoAd);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var InterstitialAd = /** @class */ (function () {
    function InterstitialAd(params) {
    }
    /**隐藏激励视频广告 */
    InterstitialAd.prototype.load = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.listenerError();
            reject("\u5F53\u524D\u7248\u672C\u4E0D\u652F\u6301\u5E7F\u544A");
        });
    };
    /**显示激励视频广告。激励视频广告将从屏幕下方推入 */
    InterstitialAd.prototype.show = function () {
        return new Promise(function (resolve, reject) {
            reject("\u5F53\u524D\u7248\u672C\u4E0D\u652F\u6301\u5E7F\u544A");
        });
    };
    /**监听激励视频广告加载事件 */
    InterstitialAd.prototype.onLoad = function (listener) {
    };
    /**取消监听激励视频广告加载事件 */
    InterstitialAd.prototype.offLoad = function (listener) {
    };
    /**监听激励视频错误事件 */
    InterstitialAd.prototype.onError = function (listener) {
        this.listenerError = listener;
    };
    /**取消监听激励视频错误事件 */
    InterstitialAd.prototype.offError = function (listener) {
    };
    /**监听用户点击 关闭广告 按钮的事件 */
    InterstitialAd.prototype.onClose = function (listener) {
    };
    /**取消监听用户点击 关闭广告 按钮的事件 */
    InterstitialAd.prototype.offClose = function (listener) {
    };
    InterstitialAd.prototype.listenerError = function () {
    };
    return InterstitialAd;
}());
/* harmony default export */ __webpack_exports__["default"] = (InterstitialAd);


/***/ })
/******/ ]);