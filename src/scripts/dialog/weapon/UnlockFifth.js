import Tool from "../../common/tool/Tool";
import SoundManager from "../../../gamescripts/SoundManager";
import { Global } from "../../common/tool/Global";


export default class UnlockFifth extends PaoYa.Dialog {

    constructor() { 
        super(); 
        /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
        let intType = 1000;
        /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
        let numType = 1000;
        /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
        let strType = "hello laya";
        /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
        let boolType = true;
        // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
    }
    
    onEnable() {
        this.autoDestroyAtClosed = true;
        this.maskBg.on(Laya.Event.CLICK,this,()=>{
            SoundManager.ins.btn()
            this.close()
        })
        this.btn.on(Laya.Event.CLICK,this,()=>{
            Global.dataPoints('五号兵器格分享')
            SoundManager.ins.btn()
            Tool.inviteFriend()
        })
    }

    onDisable() {
    }
}