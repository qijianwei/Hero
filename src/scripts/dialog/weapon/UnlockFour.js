import WeaponHouseControl from "../../common/weapon/WeaponHouseControl";
import SoundManager from "../../../gamescripts/SoundManager";
import HomeControl from "../../common/HomeControl";


export default class UnlockFour extends PaoYa.Dialog {

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
        this.maskBg.on(Laya.Event.CLICK, this, ()=>{
            SoundManager.ins.btn()
            this.close()
        })
        this.btn.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            PaoYa.Request.POST(`martial_buy_grid`,{},res=>{
                WeaponHouseControl.ins.owner.diamondNum.text = res.diamond
                WeaponHouseControl.ins.params.weaponGridNum += 1
                WeaponHouseControl.ins.getMyUserDetailList()
                WeaponHouseControl.ins.owner.userWeaponList.array = WeaponHouseControl.ins.myUserDetailList
                this.close()
            },()=>{
                this.close()
                HomeControl.ins.navigator.popup("weapon/DiamondLack");
            })
           
          
        })
    }

    onDisable() {
    }
}