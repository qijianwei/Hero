/**
 * 设置LayaNative屏幕方向，可设置以下值
 * landscape           横屏
 * portrait            竖屏
 * sensor_landscape    横屏(双方向)
 * sensor_portrait     竖屏(双方向)
 */
window.screenOrientation = "landscape";

//-----libs-begin-----
loadLib("libs/laya.core.js")
loadLib("libs/laya.ani.js")
loadLib("libs/laya.ui.js")
//-----libs-end-------
if(window.qq){
    loadLib("libs/platform.qq.js")
}else if(window.wx){
    loadLib("libs/platform.wx.js")
}else{
    loadLib("libs/platform.browser.js")
}
loadLib("libs/paoya.core.js")
loadLib("js/bundle.js"); 
