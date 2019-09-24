import RefiningControl from "../../common/refiner/RefiningControl";
import SoundManager from "../../../gamescripts/SoundManager";

export default class Canlock extends PaoYa.Dialog {

    constructor() {
        super()
    }

    onEnable() {
        this.autoDestroyAtClosed = true;
        this.title.font = `figureDetail`
        this.title.scale(0.8, 0.8)
        this.title.x = (543 - this.title.width) / 2

        this.btn2Txt.font = `weaponDFont`
        this.btn2Txt.scale(0.7, 0.7)
        this.btn2Txt.pos(42, 15)

        this.btn2.on(Laya.Event.CLICK, this, () => {
            SoundManager.ins.btn()
            this.close()
        })

        let arr = this.params.refinerId.split(`,`)

        let ll = RefiningControl.ins.owner.params.refiner_list.length
        let showList = []
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < ll; j++) {
                if (RefiningControl.ins.owner.params.refiner_list[j].id == arr[i]) {
                    showList.push(RefiningControl.ins.owner.params.refiner_list[j])
                }
            }
        }
        this.skillList.x = arr.length == 2 ? 75 : 152
        switch (arr.length) {
            case 1:
                this.skillList.x = 152
                break
            case 2:
                this.skillList.x = 75
                break
            case 3:
                this.skillList.x = 0
                break
        }
        this.skillList.renderHandler = new Laya.Handler(this, this.skillRender);
        this.skillList.array = showList
    }

    onDisable() {
    }

    skillRender(cell, idx) {
        console.log(cell._dataSource)
        cell.skin = cell._dataSource.type ? `remote/refining/6.png` : `remote/refining/7.png`
        cell.getChildByName(`refinerTxt`).text = cell._dataSource.refinerName
        cell.getChildByName(`refinerTxt`).font = `weaponDFont`
        cell.getChildByName(`refinerTxt`).scale(0.60, 0.60)
        cell.getChildByName(`refinerTxt`).pos(35, 12)

        cell.getChildByName(`refinerLv`).text = `LV.${this.params.refinerUnlock}`
        cell.getChildByName(`refinerLv`).font = `weaponNFontT`
        cell.getChildByName(`refinerLv`).scale(0.5, 0.5)
        cell.getChildByName(`refinerLv`).pos(20, 93)
    }
}