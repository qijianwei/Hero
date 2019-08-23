export default class SkillDetail extends PaoYa.Dialog {

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
        this.mask.on(Laya.Event.CLICK,this,this.close)
        this.skillName.text = this.params.skillName
        this.skillName.font = `figureDetail`
        this.skillName.scale(0.75, 0.75)
        this.skillName.x = (450 - this.skillName.width*0.75) / 2

        this.unlock.text = `${this.params.skillUnlock}级解锁`
        this.skilldetail.text = `    ${this.params.skillDesc}`
        this.skilldetail.letterSpacing = 4
        this.cd.text = `冷却：${this.params.skillCd}`
        this.cost.text = `消耗：${this.params.skillConsume}内力`
    }

    onDisable() {
    }
}