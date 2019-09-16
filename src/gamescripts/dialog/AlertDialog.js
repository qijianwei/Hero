export default class AlertDialog extends PaoYa.Dialog {
    constructor(params){
        super()
        this.autoDestroyAtClosed=true;
        params.confirmText = params.confirmText || '知道了'
        this.params = params
        this.addSubviews()
    }
    addSubviews(){
        let imgBg = new Laya.Image('local/common/bg2.png')
        imgBg.sizeGrid = '150,130,100,120'
        imgBg.size(500,400)
        this.addChild(imgBg)

        let lblTitle = new Laya.Label(this.params.title||'')
        lblTitle.fontSize = 40
        lblTitle.color = '#ffffff'
        lblTitle.bold = true
        lblTitle.centerX = 0
        lblTitle.y = 30
        this.addChild(lblTitle)

        let lblMsg = new Laya.Label(this.params.message||'')
        lblMsg.fontSize = 28
        lblMsg.leading = 15
        lblMsg.color = '#4d4d4d'
        lblMsg.wordWrap = true
        lblMsg.align = 'center'
        lblMsg.pos(40,150)
        lblMsg.size(420,30)
        this.addChild(lblMsg)

        this.size = imgBg.size

        let hBox = new Laya.HBox
        hBox.centerX = 0
        hBox.y = 300
        hBox.space = 15
        this.addChild(hBox)

        if (this.params.cancelText){
            hBox.addChild(this._makeButton(this.params.cancelText,Laya.Dialog.NO))
        }
        hBox.addChild(this._makeButton(this.params.confirmText,Laya.Dialog.YES))
    }
    _makeButton(label,name){
        let btn = new Laya.Button('local/common/btn_1.png')
        btn.size(200,64)
        btn.name = name
        btn.stateNum = 1
        
        let labelF=new Laya.Label(); 
        labelF.font=`weaponDFont`;
        labelF.centerX=0;
        labelF.centerY=0;
        labelF.scale(0.7,0.7);
        labelF.text=label;
        btn.addChild(labelF);
        return btn
    }
    onClosed(type){
        if (type == Laya.Dialog.YES){
            this.params.confirmHandler&&this.params.confirmHandler()
        } else if (type == Laya.Dialog.NO){
            this.params.cancelHandler&&this.params.cancelHandler()
        }
    }
}