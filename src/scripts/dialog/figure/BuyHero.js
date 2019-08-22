import Swordsman from "../../common/figure/Swordsman";
import SwordsmanControl from "../../common/figure/SwordsmanControl";

export default class BuyHero extends PaoYa.Dialog {

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
        this.closeBtn.on(Laya.Event.CLICK, this, this.close)
        this.buybtnTxt.font = `weaponDFont`
        this.buybtnTxt.scale(0.8, 0.8)
        this.buybtnTxt.pos(55, 10)


        this.needNum.text = this.params.rolePrice
        this.needNum.font = `figureDetail`
        this.needNum.scale(1.5, 1.5)
        this.needNum.pos(755, 167)

        this.roleImg.skin=`remote/figure/role_${this.params.roleId}.png`

        this.buy.on(Laya.Event.CLICK, this, () => {
            if (PaoYa.DataCenter.user.gold < this.params.rolePrice) {
                this.close()
                SwordsmanControl.ins.popup("weapon/DiamondLack");
                return
            }
            PaoYa.Request.POST(`martial_role_buy`, { roleId: this.params.roleId }, res => {
                SwordsmanControl.ins.owner.params.roleList.forEach(element => {
                    if (element.roleId == res.role.roleId) {
                        for (const key in element) {
                            element[key] = res.role[key]
                        }
                        SwordsmanControl.ins.owner.showDetail = element
                    }
                });
                SwordsmanControl.ins.owner.initInfo()
                this.close()
            })
        })
    }

    onDisable() {
    }
}