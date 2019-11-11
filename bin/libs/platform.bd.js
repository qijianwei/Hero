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
/* harmony import */ var _AuthManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _LoginManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _BannerAd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _RewardedVideoAd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var _InterstitialAd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);






var Platform = /** @class */ (function () {
    function Platform() {
    }
    Platform.prototype.init = function () {
        swan.showShareMenu({
            withShareTicket: true,
            success: function () { },
            fail: function () { }
        });
    };
    Platform.prototype.getLaunchOptionsSync = function () {
        return swan.getLaunchOptionsSync();
    };
    Platform.prototype.login = function (params, cb) {
        _LoginManager__WEBPACK_IMPORTED_MODULE_2__["default"].login(params, cb);
    };
    Platform.prototype.auth = function (params) {
        _AuthManager__WEBPACK_IMPORTED_MODULE_1__["default"].auth(params);
    };
    Platform.prototype.isMiniGame = function () {
        return true;
    };
    Platform.prototype.getUserInfo = function (p) {
        swan.getUserInfo(p);
    };
    /**生命周期 */
    Platform.prototype.onShow = function (cb) {
        /**@warn 这里可能需要针对第一次进行过滤 */
        swan.onShow(cb);
    };
    Platform.prototype.offShow = function () {
        swan.offShow();
    };
    Platform.prototype.onHide = function (cb) {
        swan.onHide(cb);
    };
    Platform.prototype.offHide = function () {
        swan.offHide();
    };
    /**分享 */
    Platform.prototype.onShareAppMessage = function (listener) {
        swan.onShareAppMessage(listener);
    };
    Platform.prototype.shareAppMessage = function (params) {
        swan.shareAppMessage(params);
    };
    Platform.prototype.getShareInfo = function (params) {
        swan.getShareInfo(params);
    };
    Platform.prototype.setKeepScreenOn = function () {
        swan.setKeepScreenOn({
            keepScreenOn: true,
            success: function () { },
            fail: function () { }
        });
    };
    Platform.prototype.getSystemInfoSync = function () {
        return swan.getSystemInfoSync();
    };
    Platform.prototype.getUpdateManager = function () {
        return new _updateManager__WEBPACK_IMPORTED_MODULE_0__["default"]();
    };
    /**小程序跳转 */
    Platform.prototype.navigateToMiniProgram = function (params) {
        swan.navigateToMiniProgram(params);
    };
    Platform.prototype.exit = function (params) {
        swan.exit({});
    };
    /**声音 */
    Platform.prototype.onAudioInterruptionBegin = function (listener) {
        swan.onAudioInterruptionBegin(listener);
    };
    Platform.prototype.onAudioInterruptionEnd = function (listener) {
        swan.onAudioInterruptionEnd(listener);
    };
    /**network */
    Platform.prototype.onNetworkStatusChange = function (listener) {
        swan.onNetworkStatusChange(listener);
    };
    Platform.prototype.offNetworkStatusChange = function (listener) {
        swan.offNetworkStatusChange(listener);
    };
    Platform.prototype.getNetworkType = function (params) {
        swan.getNetworkType(params);
    };
    /**支付 */
    Platform.prototype.requestPayment = function (params) {
        swan.requestMidasPayment({
            mode: "game",
            env: 0,
            offerId: params.offerId,
            currencyType: "CNY",
            buyQuantity: params.buyQuantity,
            platform: 'android',
            zoneId: "1",
            success: function (res) {
                console.log("PAY | suc | " + JSON.stringify(res));
                params.success && params.success();
            },
            fail: function (res) {
                console.log("PAY | fail | " + JSON.stringify(res));
                var msg = res.errMsg;
                var code = res.errCode;
                switch (code) {
                    case -1:
                        break;
                    case -2:
                        break;
                    case -15001:
                        break;
                    case -15002:
                        break;
                    case -15003:
                        break;
                    case -15004:
                        break;
                    case -15005:
                        break;
                    case -15006:
                        break;
                    case -15007:
                        break;
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                    case 4:
                        break;
                    case 5:
                        break;
                    case 6:
                        break;
                    case 1000:
                        break;
                    case 1003:
                        break;
                }
                params.fail && params.fail(code);
            }
        });
    };
    /**Toast */
    Platform.prototype.showLoading = function (params) {
        swan.showLoading(params);
    };
    Platform.prototype.hideLoading = function (params) {
        swan.hideLoading();
    };
    Platform.prototype.showToast = function (params) {
        swan.showToast(params);
    };
    Platform.prototype.hideToast = function (params) {
        swan.hideToast();
    };
    Platform.prototype.showModal = function (params) {
        swan.showModal(params);
    };
    Platform.prototype.showActionSheet = function (params) {
        swan.showActionSheet(params);
    };
    /**广告 */
    Platform.prototype.createBannerAd = function (params) {
        return new _BannerAd__WEBPACK_IMPORTED_MODULE_3__["default"](params);
    };
    Platform.prototype.createRewardedVideoAd = function (params) {
        return new _RewardedVideoAd__WEBPACK_IMPORTED_MODULE_4__["default"](params);
    };
    Platform.prototype.createInterstitialAd = function (params) {
        return new _InterstitialAd__WEBPACK_IMPORTED_MODULE_5__["default"](params);
    };
    /**微信特有方法 */
    Platform.prototype.setUserCloudStorage = function (params) {
        swan.setUserCloudStorage(params);
    };
    Platform.prototype.openCustomerServiceConversation = function () {
        swan.openCustomerServiceConversation();
    };
    Platform.prototype.previewImage = function (params) {
        swan.previewImage(params);
    };
    Platform.prototype.setClipboardData = function (params) {
        swan.setClipboardData(params);
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
/* harmony import */ var _APIEnable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

var UpdateManager = /** @class */ (function () {
    function UpdateManager() {
        if (!Object(_APIEnable__WEBPACK_IMPORTED_MODULE_0__["default"])('getUpdateManager'))
            return this;
        var update = swan.getUpdateManager();
        this.updateManager = update;
    }
    UpdateManager.prototype.onCheckForUpdate = function (cb) {
        if (!this.updateManager)
            return;
        this.updateManager.onCheckForUpdate(cb);
    };
    UpdateManager.prototype.onUpdateReady = function (cb) {
        if (!this.updateManager)
            return;
        this.updateManager.onUpdateReady(cb);
    };
    UpdateManager.prototype.onUpdateFailed = function (cb) {
        if (!this.updateManager)
            return;
        this.updateManager.onUpdateFailed(cb);
    };
    UpdateManager.prototype.applyUpdate = function () {
        if (!this.updateManager)
            return;
        this.updateManager.applyUpdate();
    };
    return UpdateManager;
}());
/* harmony default export */ __webpack_exports__["default"] = (UpdateManager);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function APIEnable(method) {
    if (typeof swan == 'undefined') {
        return false;
    }
    if (method)
        return swan[method];
    return true;
}
/* harmony default export */ __webpack_exports__["default"] = (APIEnable);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AuthUserInfoDialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);

var AuthManager = /** @class */ (function () {
    function AuthManager() {
    }
    /**
     *
     * @param scope 想要获取授权的标识，可以使用上面已经列举出来的权限
     * @param suc   授权成功回调
     * @param fail  授权失败回调
     * @param alert 当需要打开用户设置界面时，用于可以修改弹窗内容，方便用户确认操作
     */
    AuthManager.auth = function (params) {
        var _this = this;
        params.alert = function (alertCb) {
            _this.showModal('提示', '需要您的授权才能正常使用', '去设置', function () {
                alertCb();
            });
        };
        params.fail = function () {
            Laya.Dialog.manager = null;
            UIConfig.closeDialogOnSide = false;
            var alert = new _AuthUserInfoDialog__WEBPACK_IMPORTED_MODULE_0__["default"](params.isNecessary);
            alert.onReceiveUserInfo = function (res) {
                if (res.userInfo.nickName == '百度网友') {
                    return;
                }
                if (res.userInfo) {
                    params.success && params.success(res);
                }
                if (!params.isNecessary && !res.userInfo) {
                    params.next && params.next();
                }
            };
            alert.popup(true, false);
        };
        var okHandler = function () {
            swan.openSetting({
                success: function (res) {
                    var result = res.authSetting[params.scope];
                    //params.next && params.next();
                    if (!params.isNecessary && !result) {
                        params.next && params.next();
                        return;
                    }
                    if (result) {
                        AuthManager.getUserInfo(function (res) {
                            params.success && params.success(res);
                        });
                    }
                    else {
                        params.alert && params.alert(okHandler);
                    }
                },
                fail: function () {
                    params.fail && params.fail();
                }
            });
        };
        swan.getSetting({
            success: function (res) {
                console.error(res);
                var result = res.authSetting[params.scope];
                if (result == undefined) { //没有获取过权限
                    /**如果请求用户权限失败，则直接return */
                    if (params.scope == AuthManager.scope.userInfo) {
                        params.fail && params.fail();
                        return;
                    }
                    swan.authorize({
                        scope: params.scope,
                        success: function (res) {
                            params.next && params.next();
                        },
                        fail: function () {
                            params.alert && params.alert(okHandler);
                        },
                        complete: function () { }
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
    };
    /**调用微信获取用户信息接口 */
    AuthManager.getUserInfo = function (cb) {
        swan.getUserInfo({
            withCredentials: true,
            lang: "zh_CN",
            success: function (res) {
                cb && cb(res);
            },
            fail: function () { }
        });
    };
    AuthManager.showModal = function (title, content, confirmText, confirmCallback, cancelText, cancelCallback) {
        if (title === void 0) { title = '提示'; }
        if (content === void 0) { content = ''; }
        if (confirmText === void 0) { confirmText = '知道了'; }
        if (confirmCallback === void 0) { confirmCallback = null; }
        if (cancelText === void 0) { cancelText = ""; }
        if (cancelCallback === void 0) { cancelCallback = null; }
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
            fail: function () { }
        };
        swan.showModal(params);
    };
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
    return AuthManager;
}());
/* harmony default export */ __webpack_exports__["default"] = (AuthManager);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AuthUserInfoDialog = /** @class */ (function (_super) {
    __extends(AuthUserInfoDialog, _super);
    function AuthUserInfoDialog(isNecessary) {
        var _this = _super.call(this) || this;
        if (isNecessary != undefined) {
            _this.isNecessary = isNecessary;
        }
        else {
            _this.isNecessary = false;
        }
        _this.size(636, 508);
        var image = new Laya.Image('local/auth/bg.png');
        _this.addChild(image);
        return _this;
    }
    AuthUserInfoDialog.prototype.onOpened = function () {
        var frame = {
            x: 26,
            y: 400,
            width: 588,
            height: 85
        };
        var pos = this.localToGlobal(new Laya.Point(frame.x, frame.y));
        this.showUserInfoButton({
            x: pos.x,
            y: pos.y,
            width: frame.width,
            height: frame.height
        });
    };
    AuthUserInfoDialog.prototype.showUserInfoButton = function (rect) {
        var _this = this;
        var stage = Laya.stage;
        var screenWidth = Laya.Browser.width;
        var screenHeight = Laya.Browser.height;
        var width = stage.designWidth;
        var height = stage.designHeight;
        /* 这是竖版 */
        /*  var scaleX = screenWidth / width; */
        var scaleX = screenHeight / height;
        var scale = scaleX / Laya.Browser.pixelRatio;
        var style = {
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
        var button = swan.createUserInfoButton({
            type: 'image',
            image: 'local/auth/button.png',
            style: style,
            withCredentials: true,
            lang: 'zh_CN'
        });
        button.onTap(function (res) {
            if (res.userInfo || !_this.isNecessary) {
                _this.onReceiveUserInfo && _this.onReceiveUserInfo(res);
            }
            _this.close();
            button.destroy();
        });
    };
    return AuthUserInfoDialog;
}(Laya.Dialog));
/* harmony default export */ __webpack_exports__["default"] = (AuthUserInfoDialog);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var LoginManager = /** @class */ (function () {
    function LoginManager() {
    }
    LoginManager.login = function (params, cb) {
        //获取微信code，这是必须操作
        this.getCode(function (res) {
            var code = res.code;
            //获取授权信息，必须经过用户授权才可以获取到用户个人信息
            cb({
                type: 5,
                platform: 6,
                js_code: code,
                device_info: swan.getSystemInfoSync(),
            });
        });
    };
    /**
    * 调用百度登录,和微信不同
    */
    LoginManager.getCode = function (cb) {
        swan.login({
            success: function (res) {
                cb && cb(res);
            },
            fail: function () {
                swan.showModal({
                    title: "登录失败",
                    content: "是否重新登录？",
                    cancelText: "退出游戏",
                    success: function (res) {
                        if (res.confirm) {
                            LoginManager.getCode(cb);
                        }
                        else if (res.cancel) {
                            swan.exit({});
                        }
                    }
                });
            }
        });
    };
    LoginManager.checkSession = function (o) {
        swan.checkSession({
            success: function () {
                o.success && o.success();
            },
            fail: function () {
                o.fail && o.fail();
            }
        });
    };
    /**调用微信获取用户信息接口 */
    LoginManager.getUserInfo = function (cb) {
        swan.getUserInfo({
            withCredentials: true,
            lang: "zh_CN",
            success: function (res) {
                cb && cb(res);
            },
            fail: function () { }
        });
    };
    LoginManager.getUserInfoWithoutCredentials = function (cb) {
        swan.getUserInfo({
            lang: "zh_CN",
            withCredentials: false,
            success: function (res) {
                cb && cb(res);
            },
            fail: function () { }
        });
    };
    LoginManager.showModal = function (title, content, confirmText, confirmCallback, cancelText, cancelCallback) {
        if (title === void 0) { title = '提示'; }
        if (content === void 0) { content = ''; }
        if (confirmText === void 0) { confirmText = '知道了'; }
        if (confirmCallback === void 0) { confirmCallback = null; }
        if (cancelText === void 0) { cancelText = ""; }
        if (cancelCallback === void 0) { cancelCallback = null; }
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
            fail: function () { }
        };
        swan.showModal(params);
    };
    return LoginManager;
}());
/* harmony default export */ __webpack_exports__["default"] = (LoginManager);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _APIEnable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

var BannerAd = /** @class */ (function () {
    function BannerAd(params) {
        if (!Object(_APIEnable__WEBPACK_IMPORTED_MODULE_0__["default"])('createBannerAd'))
            return this;
        params.style.top = params.style.top || params.style.y;
        params.style.left = params.style.left || params.style.x;
        var bannerAd = swan.createBannerAd(params);
        this.bannerAd = bannerAd;
    }
    /**显示 banner 广告 */
    BannerAd.prototype.show = function () {
        if (!this.bannerAd) {
            console.error('当前版本不支持广告');
            return;
        }
        return this.bannerAd.show();
    };
    /**隐藏 banner 广告 */
    BannerAd.prototype.hide = function () {
        if (!this.bannerAd) {
            console.error('当前版本不支持广告');
            return;
        }
        return this.bannerAd.hide();
    };
    /**销毁 banner 广告 */
    BannerAd.prototype.destroy = function () {
        if (!this.bannerAd)
            return;
        this.bannerAd.destroy();
    };
    /**监听 banner 广告尺寸变化事件 */
    BannerAd.prototype.onResize = function (listener) {
        if (!this.bannerAd)
            return;
        this.bannerAd.onResize(listener);
    };
    /**取消监听 banner 广告尺寸变化事件 */
    BannerAd.prototype.offResize = function (listener) {
        if (!this.bannerAd)
            return;
        this.bannerAd.offResize(listener);
    };
    /**监听 banner 广告加载事件 */
    BannerAd.prototype.onLoad = function (listener) {
        if (!this.bannerAd)
            return;
        this.bannerAd.onLoad(listener);
    };
    /**取消监听 banner 广告加载事件 */
    BannerAd.prototype.offLoad = function (listener) {
        if (!this.bannerAd)
            return;
        this.bannerAd.offLoad(listener);
    };
    /**监听 banner 广告错误事件 */
    BannerAd.prototype.onError = function (listener) {
        if (!this.bannerAd)
            return;
        this.bannerAd.onError(listener);
    };
    /**取消监听 banner 广告错误事件 */
    BannerAd.prototype.offError = function (listener) {
        if (!this.bannerAd)
            return;
        this.bannerAd.offError(listener);
    };
    return BannerAd;
}());
/* harmony default export */ __webpack_exports__["default"] = (BannerAd);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _APIEnable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

var RewardedVideoAd = /** @class */ (function () {
    function RewardedVideoAd(params) {
        if (!Object(_APIEnable__WEBPACK_IMPORTED_MODULE_0__["default"])('createRewardedVideoAd'))
            return this;
        var videoAd = swan.createRewardedVideoAd(params);
        this.videoAd = videoAd;
    }
    /**隐藏激励视频广告 */
    RewardedVideoAd.prototype.load = function () {
        if (!this.videoAd) {
            console.error('当前版本不支持广告');
            return;
        }
        return this.videoAd.load();
    };
    /**显示激励视频广告。激励视频广告将从屏幕下方推入 */
    RewardedVideoAd.prototype.show = function () {
        if (!this.videoAd) {
            console.error('当前版本不支持广告');
            return;
        }
        return this.videoAd.show();
    };
    /**监听激励视频广告加载事件 */
    RewardedVideoAd.prototype.onLoad = function (listener) {
        if (!this.videoAd)
            return;
        this.videoAd.onLoad(listener);
    };
    /**取消监听激励视频广告加载事件 */
    RewardedVideoAd.prototype.offLoad = function (listener) {
        if (!this.videoAd)
            return;
        this.videoAd.offLoad(listener);
    };
    /**监听激励视频错误事件 */
    RewardedVideoAd.prototype.onError = function (listener) {
        if (!this.videoAd)
            return;
        this.videoAd.onError(listener);
    };
    /**取消监听激励视频错误事件 */
    RewardedVideoAd.prototype.offError = function (listener) {
        if (!this.videoAd)
            return;
        this.videoAd.offError(listener);
    };
    /**监听用户点击 关闭广告 按钮的事件 */
    RewardedVideoAd.prototype.onClose = function (listener) {
        if (!this.videoAd)
            return;
        this.videoAd.onClose(listener);
    };
    /**取消监听用户点击 关闭广告 按钮的事件 */
    RewardedVideoAd.prototype.offClose = function (listener) {
        if (!this.videoAd)
            return;
        this.videoAd.offClose(listener);
    };
    return RewardedVideoAd;
}());
/* harmony default export */ __webpack_exports__["default"] = (RewardedVideoAd);


/***/ }),
/* 8 */
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