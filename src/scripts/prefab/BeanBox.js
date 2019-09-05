
export default class BeanBox extends PaoYa.Component {
    /** @prop {name:boxType,tips:"1-金币，2-钻石",type:Option,option:"1,2",default:1}*/
    onAwake() {
        this.boxType = this.boxType || '1'
        this.integBg = this.owner.getChildByName('beanBg')
        this.labelBg = this.owner.getChildByName('labelBgCircle')
        this.skinLeft = this.owner.getChildByName("imgLeft");
        this.label = this.owner.getChildByName("label");
        this.label.font=`weaponNFontT`;
    //    / this.label.pivot(75,25);
        this.label.scale(0.6,0.6);
        this.changeBox()
    }
    changeBox() {
        switch (this.boxType) {
            case '1':
                PaoYa.DataCenter.gold.addObserver(this, this.handleGoldChange)
                break
            case '2':
                this.skinLeft.skin = 'local/common/diamond.png'
                this.skinLeft.y = -5
                this.skinLeft.size(60, 60)
                PaoYa.DataCenter.diamond.addObserver(this, this.handleDiamondChange)
                break
          
        }
    }
    onClick() {
        switch (this.boxType) {
            case '1':
                console.log('点击金币')
                break
            case '2':
                console.log('点击砖石')
                break
        }
    }
    handleDiamondChange(value) {
        addNumberUnit(value) == 'undefined' ? this.label.text = '' : this.label.text =addNumberUnit(value)
    }
    handleGoldChange(value) {
        addNumberUnit(value) == 'undefined' ? this.label.text = '' : this.label.text = addNumberUnit(value)
    }
  
    onDestroy() {
        PaoYa.DataCenter.diamond.removeObserver(this, this.handleIntegralChange)
        PaoYa.DataCenter.gold.removeObserver(this, this.handleGoldChange)  
    }
}
function addNumberUnit(num) {
    switch (true) {
        case num >= 10000 && num < 100000000:
            let integ = num / 10000
            return Math.floor(integ * 100) / 100 + '万'
            break
        case num >= 100000000:
            let integ1 = num / 100000000
            return Math.floor(integ1 * 100) / 100 + '亿'
            break
        default:
            return num + ''
            break
    }
};