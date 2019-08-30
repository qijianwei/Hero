import SoundManager from "../../../gamescripts/SoundManager";

export default class GoldLack extends PaoYa.Dialog {

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
        this.btn.on(Laya.Event.CLICK, this, ()=>{
            this.close()
            SoundManager.ins.btn()
        })
        this.skillName.text = this.params.skillName
        this.skillName.font = `figureDetail`
        this.skillName.scale(0.75, 0.75)
        this.skillName.x = (450 - this.skillName.width * 0.75) / 2
        this.skillName.y = 130

        this.skilldetail.text = `    ${this.params.skillDesc}`
        this.skilldetail.letterSpacing = 4

        this.sure.font = `weaponDFont`
        this.sure.scale(0.8, 0.8)
        this.sure.pos(55, 10)
    }

    onDisable() {
    }
}