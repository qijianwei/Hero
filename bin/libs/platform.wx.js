var $jscomp={scope:{}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(e,c,d){if(d.get||d.set)throw new TypeError("ES3 does not support getters and setters.");e!=Array.prototype&&e!=Object.prototype&&(e[c]=d.value)};$jscomp.getGlobal=function(e){return"undefined"!=typeof window&&window===e?e:"undefined"!=typeof global?global:e};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(e){return $jscomp.SYMBOL_PREFIX+(e||"")+$jscomp.symbolCounter_++};$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var e=$jscomp.global.Symbol.iterator;e||(e=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[e]&&$jscomp.defineProperty(Array.prototype,e,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(e){var c=0;return $jscomp.iteratorPrototype(function(){return c<e.length?{done:!1,value:e[c++]}:{done:!0}})};$jscomp.iteratorPrototype=function(e){$jscomp.initSymbolIterator();e={next:e};e[$jscomp.global.Symbol.iterator]=function(){return this};return e};$jscomp.inherits=function(e,c){function d(){}d.prototype=c.prototype;e.prototype=new d;e.prototype.constructor=e;for(var b in c)if(Object.defineProperties){var a=Object.getOwnPropertyDescriptor(c,b);a&&Object.defineProperty(e,b,a)}else e[b]=c[b]};(function(e){function c(b){if(d[b])return d[b].exports;var a=d[b]={i:b,l:!1,exports:{}};e[b].call(a.exports,a,a.exports,c);a.l=!0;return a.exports}var d={};c.m=e;c.c=d;c.d=function(b,a,g){c.o(b,a)||Object.defineProperty(b,a,{enumerable:!0,get:g})};c.r=function(b){$jscomp.initSymbol();$jscomp.initSymbol();"undefined"!==typeof Symbol&&Symbol.toStringTag&&($jscomp.initSymbol(),Object.defineProperty(b,Symbol.toStringTag,{value:"Module"}));Object.defineProperty(b,"__esModule",{value:!0})};c.t=function(b,a){a&1&&(b=c(b));if(a&8||a&4&&"object"===typeof b&&b&&b.__esModule)return b;var g=Object.create(null);c.r(g);Object.defineProperty(g,"default",{enumerable:!0,value:b});if(a&2&&"string"!=typeof b)for(var d in b)c.d(g,d,function(a){return b[a]}.bind(null,d));return g};c.n=function(b){var a=b&&b.__esModule?function(){return b["default"]}:function(){return b};c.d(a,"a",a);return a};c.o=function(b,a){return Object.prototype.hasOwnProperty.call(b,a)};c.p="";return c(c.s=0)})([function(e,c,d){d.r(c);d.d(c,"default",function(){return f});var b=d(1),a=d(3),g=d(4),k=d(6),l=d(7),f=function(){};f.prototype.init=function(){wx.updateShareMenu({withShareTicket:!0,success:function(){},fail:function(){}});wx.showShareMenu({withShareTicket:!0,success:function(){},fail:function(){}})};f.prototype.getLaunchOptionsSync=function(){return wx.getLaunchOptionsSync()};f.prototype.login=function(a,b){g["default"].login(a,b)};f.prototype.auth=function(g){a["default"].auth(g)};f.prototype.isMiniGame=function(){return!0};f.prototype.getUserInfo=function(a){wx.getUserInfo(a)};f.prototype.onShow=function(a){wx.onShow(a)};f.prototype.offShow=function(){wx.offShow()};f.prototype.onHide=function(a){wx.onHide(a)};f.prototype.offHide=function(){wx.offHide()};f.prototype.onShareAppMessage=function(a){wx.aldOnShareAppMessage(a)};f.prototype.shareAppMessage=function(a){wx.aldShareAppMessage(a)};f.prototype.getShareInfo=function(a){wx.getShareInfo(a)};f.prototype.setKeepScreenOn=function(){wx.setKeepScreenOn({keepScreenOn:!0,success:function(){},fail:function(){}})};f.prototype.getSystemInfoSync=function(){return wx.getSystemInfoSync()};f.prototype.getUpdateManager=function(){return new b["default"]};f.prototype.navigateToMiniProgram=function(a){wx.navigateToMiniProgram(a)};f.prototype.exit=function(a){wx.exitMiniProgram({})};f.prototype.onAudioInterruptionBegin=function(a){wx.onAudioInterruptionBegin(a)};f.prototype.onAudioInterruptionEnd=function(a){wx.onAudioInterruptionEnd(a)};f.prototype.onNetworkStatusChange=function(a){wx.onNetworkStatusChange(a)};f.prototype.offNetworkStatusChange=function(a){wx.offNetworkStatusChange(a)};f.prototype.getNetworkType=function(a){wx.getNetworkType(a)};f.prototype.requestPayment=function(a){wx.requestMidasPayment({mode:"game",env:0,offerId:a.offerId,currencyType:"CNY",buyQuantity:a.buyQuantity,platform:"android",zoneId:"1",success:function(g){console.log("PAY | suc | "+JSON.stringify(g));a.success&&a.success()},fail:function(g){console.log("PAY | fail | "+JSON.stringify(g));g=g.errCode;a.fail&&a.fail(g)}})};f.prototype.showLoading=function(a){wx.showLoading(a)};f.prototype.hideLoading=function(a){wx.hideLoading()};f.prototype.showToast=function(a){wx.showToast(a)};f.prototype.hideToast=function(a){wx.hideToast()};f.prototype.showModal=function(a){wx.showModal(a)};f.prototype.showActionSheet=function(a){wx.showActionSheet(a)};f.prototype.createBannerAd=function(a){return new k["default"](a)};f.prototype.createRewardedVideoAd=function(a){return new l["default"](a)};f.prototype.setUserCloudStorage=function(a){wx.setUserCloudStorage(a)};f.prototype.openCustomerServiceConversation=function(){wx.openCustomerServiceConversation()};f.prototype.previewImage=function(a){wx.previewImage(a)};f.prototype.setClipboardData=function(a){wx.setClipboardData(a)};window.py=new f},function(e,c,d){d.r(c);d.d(c,"default",function(){return a});var b=d(2),a=function(){if(!Object(b["default"])("getUpdateManager"))return this;this.updateManager=wx.getUpdateManager()};a.prototype.onCheckForUpdate=function(a){if(this.updateManager)this.updateManager.onCheckForUpdate(a)};a.prototype.onUpdateReady=function(a){if(this.updateManager)this.updateManager.onUpdateReady(a)};a.prototype.onUpdateFailed=function(a){if(this.updateManager)this.updateManager.onUpdateFailed(a)};a.prototype.applyUpdate=function(){this.updateManager&&this.updateManager.applyUpdate()}},function(e,c,d){d.r(c);c["default"]=function(b){return"undefined"==typeof wx?!1:b?wx[b]:!0}},function(e,c,d){d.r(c);d.d(c,"default",function(){return b});var b=function(){};b.auth=function(a){var g=function(){wx.openSetting({success:function(b){b.authSetting[a.scope]?a.success&&a.success():a.alert&&a.alert(g)},fail:function(){a.fail&&a.fail()}})};wx.getSetting({success:function(c){c=c.authSetting[a.scope];void 0==c?a.scope==b.scope.userInfo?a.fail&&a.fail():wx.authorize({scope:a.scope,success:function(g){a.success&&a.success()},fail:function(){a.alert&&a.alert(g)},complete:function(){}}):c?a.success&&a.success():a.alert&&a.alert(g)}})};b.scope={userInfo:"scope.userInfo",userLocation:"scope.userLocation",address:"scope.address",invoiceTitle:"scope.invoiceTitle",werun:"scope.werun",record:"scope.record",writePhotosAlbum:"scope.writePhotosAlbum",camera:"scope.camera"}},function(e,c,d){d.r(c);d.d(c,"default",function(){return a});var b=d(3);d(5);var a=function(){};a.login=function(a,b){this.getCode(function(a){b({type:5,platform:5,js_code:a.code,device_info:wx.getSystemInfoSync()})})};a.getCode=function(a){wx.login({success:function(g){a&&a(g)},fail:function(){}})};a.auth=function(a){var g=this;b["default"].auth({scope:b["default"].scope.userInfo,success:function(){a.success&&a.success()},fail:function(){a.fail&&a.fail()},alert:function(a){g.showModal("\u63d0\u793a","\u9700\u8981\u60a8\u7684\u6388\u6743\u624d\u80fd\u6b63\u5e38\u4f7f\u7528","\u53bb\u8bbe\u7f6e",function(){a()})}})};a.checkSession=function(a){wx.checkSession({success:function(){a.success&&a.success()},fail:function(){a.fail&&a.fail()}})};a.getUserInfo=function(a){wx.getUserInfo({withCredentials:!0,lang:"zh_CN",success:function(g){a&&a(g)},fail:function(){}})};a.getUserInfoWithoutCredentials=function(a){wx.getUserInfo({lang:"zh_CN",withCredentials:!1,success:function(g){a&&a(g)},fail:function(){}})};a.showModal=function(a,b,c,d,e,h){d=void 0===d?null:d;e=void 0===e?"":e;h=void 0===h?null:h;wx.showModal({title:void 0===a?"\u63d0\u793a":a,content:void 0===b?"":b,showCancel:e?!0:!1,cancelColor:"#000000",confirmColor:"#3cc51f",cancelText:e,confirmText:void 0===c?"\u77e5\u9053\u4e86":c,success:function(a){a.confirm&&d&&d();a.cancel&&h&&h()},fail:function(){}})}},function(e,c,d){d.r(c);d.d(c,"default",function(){return b});var b=function(){Laya.Dialog.call(this);this.size(636,508);var a=new Laya.Image("local/auth/bg.png");this.addChild(a)};$jscomp.inherits(b,Laya.Dialog);b.prototype.onOpened=function(){var a=this,g=this.localToGlobal(new Laya.Point(26,400));this.showUserInfoButton({x:g.x,y:g.y,width:588,height:85},function(g){a.onReceiveUserInfo&&a.onReceiveUserInfo(g);a.close()})};b.prototype.showUserInfoButton=function(a,g){var b=Laya.Browser.width/Laya.stage.designWidth/Laya.Browser.pixelRatio,c=wx.createUserInfoButton({type:"image",image:"local/auth/button.png",style:{top:a.y*b,left:a.x*b,width:a.width*b,height:a.height*b,backgroundColor:"#ffffff",borderColor:"#ffffff",borderRadius:10,borderWidth:0,textAlign:"center",fontSize:24,lineHeight:10},withCredentials:!0,lang:"zh_CN"});c.onTap(function(a){a.userInfo&&(g(a),c.destroy())})}},function(e,c,d){d.r(c);d.d(c,"default",function(){return a});var b=d(2),a=function(a){if(!Object(b["default"])("createBannerAd"))return this;a.style.top=a.style.top||a.style.y;a.style.left=a.style.left||a.style.x;this.bannerAd=wx.createBannerAd(a)};a.prototype.show=function(){if(this.bannerAd)return this.bannerAd.show();console.error("\u5f53\u524d\u7248\u672c\u4e0d\u652f\u6301\u5e7f\u544a")};a.prototype.hide=function(){if(this.bannerAd)return this.bannerAd.hide();console.error("\u5f53\u524d\u7248\u672c\u4e0d\u652f\u6301\u5e7f\u544a")};a.prototype.destroy=function(){this.bannerAd&&this.bannerAd.destroy()};a.prototype.onResize=function(a){if(this.bannerAd)this.bannerAd.onResize(a)};a.prototype.offResize=function(a){this.bannerAd&&this.bannerAd.offResize(a)};a.prototype.onLoad=function(a){if(this.bannerAd)this.bannerAd.onLoad(a)};a.prototype.offLoad=function(a){this.bannerAd&&this.bannerAd.offLoad(a)};a.prototype.onError=function(a){if(this.bannerAd)this.bannerAd.onError(a)};a.prototype.offError=function(a){this.bannerAd&&this.bannerAd.offError(a)}},function(e,c,d){d.r(c);d.d(c,"default",function(){return a});var b=d(2),a=function(a){if(!Object(b["default"])("createRewardedVideoAd"))return this;this.videoAd=wx.createRewardedVideoAd(a)};a.prototype.load=function(){if(this.videoAd)return this.videoAd.load();console.error("\u5f53\u524d\u7248\u672c\u4e0d\u652f\u6301\u5e7f\u544a")};a.prototype.show=function(){if(this.videoAd)return this.videoAd.show();console.error("\u5f53\u524d\u7248\u672c\u4e0d\u652f\u6301\u5e7f\u544a")};a.prototype.onLoad=function(a){if(this.videoAd)this.videoAd.onLoad(a)};a.prototype.offLoad=function(a){this.videoAd&&this.videoAd.offLoad(a)};a.prototype.onError=function(a){if(this.videoAd)this.videoAd.onError(a)};a.prototype.offError=function(a){this.videoAd&&this.videoAd.offError(a)};a.prototype.onClose=function(a){if(this.videoAd)this.videoAd.onClose(a)};a.prototype.offClose=function(a){this.videoAd&&this.videoAd.offClose(a)}}]);