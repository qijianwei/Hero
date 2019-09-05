var Global = {
    baseUrl: "https://xgamejuedixiaomie.goxiaochengxu.cn/1005/",
    remoteUrl: '',
    skTemplate: {},
    shareNum: 0,
    shareNumSuc: 0,
    shareNumFail: 0,
    AdaptiveWidth: 0,
    gameHeight: null,
    wpGuide: {
        userWeapons: `d001_1-1,z001_1-1,g001_1-1`,
        lightList: [{
            "exp": 0,
            "num": 1,
            "skills": [
                {
                    "skillCd": 0.0,
                    "skillConfig": {
                        "weaponNum": 2
                    },
                    "skillDesc": "发出2件兵器",
                    "skillId": 43,
                    "skillLevel": 1,
                    "skillName": "双刃",
                    "skillProb": 18,
                    "skillType": 1,
                    "skillUnlock": 0,
                    "status": 0
                }
            ],
            "upgradeCost": 150,
            "weaponAttack": 20.0,
            "weaponCd": 2.0,
            "weaponConsume": 25.0,
            "weaponDownConsume": 0,
            "weaponDurable": 10,
            "weaponIcon": "一把极其普通的铜匕首，布满斑驳的铜锈，村口后山随手都可以捡到。",
            "weaponId": "d001_1",
            "weaponLevel": 1,
            "weaponName": "铜匕首",
            "weaponPrice": 1000,
            "weaponSalePrice": 200,
            "weaponSkills": "43",
            "weaponStar": 1,
            "weaponTopLevel": 5,
            "weaponType": 1,
            "weaponUpAttack": 0,
            "weaponUpDurable": 0
        }, {
            "exp": 0,
            "num": 1,
            "skills": [
                {
                    "skillCd": 0.0,
                    "skillConfig": {
                        "critHarm": 5,
                        "critProb": 1
                    },
                    "skillDesc": "暴击+1%，爆伤+5%",
                    "skillId": 63,
                    "skillLevel": 1,
                    "skillName": "灵巧",
                    "skillProb": 100,
                    "skillType": 0,
                    "skillUnlock": 0,
                    "status": 0
                }
            ],
            "upgradeCost": 0,
            "weaponAttack": 23.0,
            "weaponCd": 1.8,
            "weaponConsume": 16.0,
            "weaponDownConsume": 0,
            "weaponDurable": 10,
            "weaponIcon": "一把用黄金打造的匕首，想必原主人一定十分阔气。",
            "weaponId": "d003_1",
            "weaponLevel": 1,
            "weaponName": "黄金匕首",
            "weaponPrice": 0,
            "weaponSalePrice": 300,
            "weaponSkills": "63",
            "weaponStar": 1,
            "weaponTopLevel": 5,
            "weaponType": 1,
            "weaponUpAttack": 0,
            "weaponUpDurable": 0,
            "willBeUse": 1
        }],
        middleList: [{
            "exp": 0,
            "num": 1,
            "skills": [
                {
                    "skillCd": 0.0,
                    "skillConfig": {
                        "stealHp": 1
                    },
                    "skillDesc": "100%伤害转化为生命",
                    "skillId": 53,
                    "skillLevel": 1,
                    "skillName": "嗜血",
                    "skillProb": 18,
                    "skillType": 1,
                    "skillUnlock": 0,
                    "status": 0
                }
            ],
            "upgradeCost": 150,
            "weaponAttack": 38.0,
            "weaponCd": 3.0,
            "weaponConsume": 25.0,
            "weaponDownConsume": 0,
            "weaponDurable": 10,
            "weaponIcon": "一把极其普通的铁剑，布满斑驳的铁锈，习武之人的入门兵器。",
            "weaponId": "z001_1",
            "weaponLevel": 1,
            "weaponName": "铁剑",
            "weaponPrice": 1000,
            "weaponSalePrice": 200,
            "weaponSkills": "53",
            "weaponStar": 1,
            "weaponTopLevel": 5,
            "weaponType": 2,
            "weaponUpAttack": 0,
            "weaponUpDurable": 0
        }],
        heavyList: [{
            "exp": 0,
            "num": 1,
            "skills": [
                {
                    "skillCd": 0.0,
                    "skillConfig": {
                        "hurt": 1.5
                    },
                    "skillDesc": "造成1.5倍伤害",
                    "skillId": 56,
                    "skillLevel": 1,
                    "skillName": "重击",
                    "skillProb": 15,
                    "skillType": 1,
                    "skillUnlock": 0,
                    "status": 0
                }
            ],
            "upgradeCost": 150,
            "weaponAttack": 57.0,
            "weaponCd": 4.0,
            "weaponConsume": 39.0,
            "weaponDownConsume": 0,
            "weaponDurable": 10,
            "weaponIcon": "砍树常用的斧子，当然也可以用来砍人。",
            "weaponId": "g001_1",
            "weaponLevel": 1,
            "weaponName": "铁斧",
            "weaponPrice": 1000,
            "weaponSalePrice": 200,
            "weaponSkills": "56",
            "weaponStar": 1,
            "weaponTopLevel": 5,
            "weaponType": 3,
            "weaponUpAttack": 0,
            "weaponUpDurable": 0
        }],
        shareGrid: 0,
        weaponGridNum: 3,
        buyGrid: 0
    },
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

