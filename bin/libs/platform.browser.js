! function (e) {
    var o = {};

    function n(r) {
        if (o[r]) return o[r].exports;
        var t = o[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(t.exports, t, t.exports, n), t.l = !0, t.exports
    }
    n.m = e, n.c = o, n.d = function (e, o, r) {
        n.o(e, o) || Object.defineProperty(e, o, {
            enumerable: !0,
            get: r
        })
    }, n.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function (e, o) {
        if (1 & o && (e = n(e)), 8 & o) return e;
        if (4 & o && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & o && "string" != typeof e)
            for (var t in e) n.d(r, t, function (o) {
                return e[o]
            }.bind(null, t));
        return r
    }, n.n = function (e) {
        var o = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return n.d(o, "a", o), o
    }, n.o = function (e, o) {
        return Object.prototype.hasOwnProperty.call(e, o)
    }, n.p = "", n(n.s = 0)
}([function (e, o, n) {
    "use strict";
    n.r(o);
    class r {
        constructor() {}
        onCheckForUpdate(e) {}
        onUpdateReady(e) {}
        onUpdateFailed(e) {}
        applyUpdate() {}
    }
    class t {
        constructor(e) {}
        show() {
            return new Promise((e, o) => {
                o("当前版本不支持广告")
            })
        }
        hide() {
            return new Promise((e, o) => {
                o("当前版本不支持广告")
            })
        }
        destroy() {}
        onResize(e) {}
        offResize(e) {}
        onLoad(e) {}
        offLoad(e) {}
        onError(e) {}
        offError(e) {}
    }
    class a {
        constructor(e) {}
        load() {
            return new Promise((e, o) => {
                o("当前版本不支持广告")
            })
        }
        show() {
            return new Promise((e, o) => {
                o("当前版本不支持广告")
            })
        }
        onLoad(e) {}
        offLoad(e) {}
        onError(e) {}
        offError(e) {}
        onClose(e) {}
        offClose(e) {}
    }
    n.d(o, "default", function () {
        return s
    });
    class s {
        init() {}
        getLaunchOptionsSync() {
            return {
                scene: 1044,
                query: {
                    id: "186100"
                },
                path: "",
                shareTicket: "9089bcad-b1c8-4d01-8932-9e6a3736aebf"
            }
        }
        login(e, o) {
            o({
                type: 5,
                platform: 5
            })
        }
        auth(e) {
            e.success && e.success()
        }
        isMiniGame() {
            return !1
        }
        onShow(e) {}
        offShow() {}
        onHide(e) {}
        offHide() {}
        onShareAppMessage(e) {}
        shareAppMessage(e) {
            console.warn("")
        }
        getShareInfo(e) {}
        setKeepScreenOn() {}
        getSystemInfoSync() {
            return null
        }
        getUpdateManager() {
            return new r
        }
        navigateToMiniProgram(e) {
            console.warn("打开小程序")
        }
        exit(e) {}
        onAudioInterruptionBegin(e) {}
        onAudioInterruptionEnd(e) {}
        onNetworkStatusChange(e) {}
        offNetworkStatusChange(e) {}
        getNetworkType(e) {}
        requestPayment(e) {
            console.warn("浏览器不支持充值")
        }
        showLoading(e) {
            console.warn("showLoading")
        }
        hideLoading(e) {
            console.warn("hideLoading")
        }
        showToast(e) {
            console.warn("showToast")
        }
        hideToast(e) {
            console.warn("hideToast")
        }
        showModal(e) {
            console.warn("showModal")
        }
        showActionSheet(e) {
            console.warn("showActionSheet")
        }
        createBannerAd(e) {
            return new t(e)
        }
        createRewardedVideoAd(e) {
            return new a(e)
        }
        setUserCloudStorage(e) {}
        openCustomerServiceConversation() {
            console.warn("打开微信客服消息")
        }
        previewImage(e) {
            console.warn("预览图片")
        }
        setClipboardData(e) {}
    }
    window.py = new s
}]);