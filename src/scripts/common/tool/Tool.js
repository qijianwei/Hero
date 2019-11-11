import { Global } from "./Global";

export default class Tool {
    /**数字太大格式化成K */
    static numFormat(num) {
        if (num >= 10000) {
            num = Math.floor(num / 1000) + 'K';
        }
        return num;
    }

    /**增加用户金币 */
    static addGold(num) {
        PaoYa.DataCenter.user.gold += num;
    }

    /**获取格式化后的用户金币 */
    static getGold(num) {
        return this.numFormat(PaoYa.DataCenter.user.gold);
    }

    /**增加用户宝石 */
    static addDiamond(num) {
        PaoYa.DataCenter.user.diamond += num;
    }

    /**设置用户宝石 */
    static setDiamond(num) {
        PaoYa.DataCenter.user.diamond = num;
    }

    /**更新用户金币，体力，宝石，道具，积分 */
    static updataUserInfo(data) {
        var user = PaoYa.DataCenter.user.user_info;
        user.member_gold = data.gold;
        user.member_power = data.power;
        user.member_diamond = data.diamond;
        user.member_prop = data.prop;
        user.member_integral = data.integral;
    }

    static get hasVideoAD() {
        return PaoYa.game.params.adUnitId ? true : false;
    }

    static showVideoAD(callBack, cancel, err, isAdventure, num) {
        if (Laya.Browser.onPC) {
            callBack && callBack()
            return
        }

        // Global.dataPoints(`点击观看视频次数`, { points: "103" })
        var p = {
            onLoad: function () {
                console.log(`视频弹出`)
                // PaoYa.Request.POST(`manage_data`, { code: num })
            },
            onError() {
                Tool.noADshare(callBack)
                err && err()
            },
            onClose(res) {
                if (res.isEnded) {
                    // Global.dataPoints(`广告看完次数`, { points: "105" })
                    callBack && callBack();
                } else {
                    cancel && cancel();
                    // let alert = new AlertDialog({ title: '提示', message: '请看完广告才能复活哦' })
                    // alert.popup()
                }
            }
        }
        PaoYa.RewardedVideoAd.show(p, isAdventure);
    }

    /**设置用户领钻石小红点值 */
    static setUserCanGetJewel(state) {
        PaoYa.DataCenter.user.can_receive = state;
    }

    static inviteFriend(e, num) {
        if (Laya.Browser.onPC) {
            return
        }
        // PaoYa.Request.POST(`manage_data`, { code: num })

        let title = PaoYa.DataCenter.config.game.share_list.randomItem;
        PaoYa.ShareManager.shareTitle(title, {}, () => {

        })
    }

    static noADshare(suc) {
        if (Laya.Browser.onPC) {
            suc && suc()
            return
        }

        // let probability = GameDataCenter.gameData.shareNum ? 100 : 70
        let startTime = new Date().getTime()
        let title = PaoYa.DataCenter.config.game.share_list.randomItem;
        PaoYa.ShareManager.shareTitle(title, {}, () => {

            if (Global.shareNumFail > 1 && Global.shareNum < 5) {
                Global.shareNumFail = 0
                suc && suc()
                Global.shareNum++
                return
            }

            if (Global.shareNum < 1) {
                Global.shareNumFail++
                py.showToast({
                    title: '分享失败',
                    icon: 'fail',
                    duration: 2000
                })
            }

            if (Global.shareNum >= 1 && Global.shareNum <= 4) {
                let shareNumD = Math.random() * 100 < 50 ? true : false
                if (new Date().getTime() - startTime > 2000 && shareNumD) {
                    Global.shareNumSuc++
                    suc && suc()
                } else {
                    Global.shareNumFail++
                    py.showToast({
                        title: '分享失败',
                        icon: 'fail',
                        duration: 2000
                    })
                }
            }

            if (Global.shareNum > 4) {
                let shareNumD = Math.random() * 100 < 10 ? true : false
                if (new Date().getTime() - startTime > 2000 && shareNumD) {
                    Global.shareNumSuc++
                    suc && suc()
                } else {
                    Global.shareNumFail++
                    py.showToast({
                        title: '分享失败',
                        icon: 'fail',
                        duration: 2000
                    })
                }
            }
            Global.shareNum++
        })
    }

    static wxShowFriendRank(num) {
        var uerInfo = {
            "wxgame": {
                "score": num,
                // "ladder_id": e.ladder_id,
                "update_time": Date.parse(new Date)
            }
            // "city": PaoYa.DataCenter.rawData.member_city,
            // "ladder_name": e.ladder_name
        };
        if (typeof wx == 'undefined') {
            return
        } else {
            wx.setUserCloudStorage({
                KVDataList: [{ key: 'score', value: JSON.stringify(uerInfo) }]
            });
        }
    }

    static showBanner() {
        if (typeof wx == 'undefined') {
            return
        }
        let bannerAd = wx.createBannerAd({
            adUnitId: 'adunit-1dbbf544daf9456a',
            style: {
                left: (wx.getSystemInfoSync().windowWidth - 300) / 2,
                top: wx.getSystemInfoSync().screenHeight - 90,
                width: 300,
            }
        })

        bannerAd.onLoad(() => {
            // Global.dataPoints(`banner曝光量`, { points: "104" })
            console.log('banner 广告加载成功')
        })

        bannerAd.onError(err => {
            console.log(err)
        })

        bannerAd.onResize(res => {
            console.log(res.width, res.height)
            console.log(bannerAd.style.realWidth, bannerAd.style.realHeight)
            bannerAd.style.top = wx.getSystemInfoSync().screenHeight - bannerAd.style.realHeight
        })

        // 在适合的场景显示 Banner 广告
        return bannerAd
    }
}