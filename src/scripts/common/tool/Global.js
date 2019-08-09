var Global = {
    baseUrl: "https://xgamejuedixiaomie.goxiaochengxu.cn/1005/",
    remoteUrl: '',
    skTemplate: {},
    shareNum: 0,
    shareNumSuc: 0,
    shareNumFail: 0,
    skBank: {
    },
    getTemplate(cb) {
        for (var key in this.skBank) {
            if (this.skTemplate[key]) {

            } else {
                skLoading.call(this, key)
            }
        }

        function skLoading(key) {
            let mFactory = new Laya.Templet();
            mFactory.on(Laya.Event.COMPLETE, this, () => {
                parseComplete.call(this, mFactory, key)
            });
            mFactory.loadAni(this.skBank[key]);
        }

        function parseComplete(mFactory, key) {
            this.skTemplate[key] = mFactory
            if (key == "getheroY") {
                cb && cb()
            }
        }
    },
    /**
     * 
     * @param {*} key String SK名
     * @param {*} cb 回调
     */
    appointSk(caller, key, cb) {
        if (this.skTemplate[key]) {
            cb && cb.call(caller, this.skTemplate[key])
        } else {
            let mFactory = new Laya.Templet();
            mFactory.on(Laya.Event.COMPLETE, this, () => {
                parseComplete.call(this, mFactory, key)
            });
            mFactory.loadAni(this.skBank[key]);

            function parseComplete(mFactory, key) {
                this.skTemplate[key] = mFactory
                cb && cb.call(caller, this.skTemplate[key])
            }
        }
    },

    regFont() {
        var weaponDFont = new Laya.BitmapFont();
        weaponDFont.loadFont('font/weapon/detailfont.fnt', Laya.Handler.create(this, function () {
            Laya.Text.registerBitmapFont('weaponDFont', weaponDFont);
        }))


        var weaponNFontT = new Laya.BitmapFont();
        weaponNFontT.loadFont('font/weapon/lvfont.fnt', Laya.Handler.create(this, function () {
            Laya.Text.registerBitmapFont('weaponNFontT', weaponNFontT);
        }))
    },

    dataPoints(data, obj)
    //data汉字说明比如  点击数
    //obj  比如  { points: "39,40" }
    {
        if (obj) {
            PaoYa.Request.POST("game_point", obj)
        }
        // wx.aldSendEvent(data, obj)

        if (typeof wx == 'undefined') {
            return;
        }
        wx.aldSendEvent(data)
    },

    gameStartStat(num) {
        if (typeof wx == 'undefined') {
            return;
        }
        wx.aldStage.onStart({
            stageId: `${num}`,
            stageName: `第${num}关`,
        })
    },

    gameEndStat(num, obj) {
        if (typeof wx == 'undefined') {
            return;
        }
        wx.aldStage.onEnd({
            stageId: `${num}`,
            stageName: `第${num}关`,
            event: obj.static,
            params: {
                desc: obj.zhstatic
            }
        })
    },

    gameUsePropStat(num) {
        if (typeof wx == 'undefined') {
            return;
        }
        wx.aldStage.onRunning({
            stageId: `${num}`,
            stageName: `第${num}关`,
            event: `tools`,
            params: {
                itemName: `电灯泡`
            }
        })
    }
}



export { Global }

