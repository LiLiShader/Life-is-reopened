import UserModel from "../Other/UserModel";
import Global from "./Global";
import PlatformBase, { IBannerAd, IRewardVideoAd } from "./PlatformBase";
/**
 * 微信平台广告类
 */
export default class weChatPlatform extends PlatformBase {

    bannerAd: IBannerAd = null //banner广告
    bannerAd1: IBannerAd = null //banner广告
    rewardVideoAd: IRewardVideoAd = null //激励视频
    interstitialAd: IRewardVideoAd = null //插屏广告
    customAd: any = null;
    gameBtn: any = null;

    private m_SDK: any;

    //WX广告参数
    private readonly WX_BANNERId: string = 'adunit-03ad30b2a00adc60'
    private readonly WX_VIDEOId: string = 'adunit-6fbcc6a34b05eddb'
    private readonly WX_TITIALADId: string = 'adunit-62eea9bfd001a4ea'

    constructor() {
        super();
        this.m_SDK = (window as any).wx;
        this.SHOW_MENU()
        this.onShow();
    }

    protected onShow() {
        var self = this;
        this.m_SDK.onShow((res) => {
            console.log("收到 onShow 回调:\n" + JSON.stringify(res));
            if (self.shareCallback) {
                self.shareCallback();
            }
        });

    }

    protected onHide() {
        var self = this;
        this.m_SDK.onHide((res) => {
            console.log("收到 onShow 回调:\n" + JSON.stringify(res));
            if (self.shareCallback1) {
                self.shareCallback1();
            }
        });

    }
    bannerBoool: boolean = false;
    bannerBoool1: boolean = false;
    bannerId: number = 0;
    useId: number = 0;

    SHOW_BANNER() {

        if (UserModel.instance.adCd) return;

        this.DESTROY_BANNER()

        if (this.bannerId == 0) {
            this.bannerId++;
            if (!this.bannerBoool) {
                this.useId = 0
                this.bannerAd.show();
            } else {
                this.useId = 1
                this.bannerAd1.show();
            }
        } else {
            this.bannerId++;
            if (this.bannerId > 1) {
                this.bannerId = 0;
            }
            if (!this.bannerBoool1) {
                this.useId = 1
                this.bannerAd1.show();
            } else {
                this.useId = 0
                this.bannerAd.show();
            }
        }
        return;
    }

    LOAD_BANNER() {
        //创建广告
        console.log('创建banner')
        let winSize = this.m_SDK.getSystemInfoSync();
        let bannerHeight = 60; //80
        let bannerWidth = 320;
        this.bannerBoool = false;
        this.bannerAd = this.m_SDK.createBannerAd({
            adUnitId: this.WX_BANNERId,
            // adIntervals: 40,
            style: {
                left: (winSize.windowWidth - bannerWidth) / 2,
                top: bannerHeight,//winSize.windowHeight - bannerHeight-20,
                width: bannerWidth,
            }
        })

        this.bannerAd.onResize(res => {
            //@ts-ignore
            this.bannerAd.style.top = winSize.windowHeight - this.bannerAd.style.realHeight + 0.1;
        })

        this.bannerAd.onError(err => {
            console.log("BANNER报错", err)
            this.bannerBoool = true;
        })

        //加载广告
        console.log("加载banner广告");
        this.bannerAd.onLoad(() => {
        })
    }

    LOAD_BANNER1() {
        //创建广告
        console.log('创建banner1')
        let winSize = this.m_SDK.getSystemInfoSync();
        let bannerHeight = 60; //80
        let bannerWidth = 320;
        this.bannerBoool1 = false;
        this.bannerAd1 = this.m_SDK.createBannerAd({
            adUnitId: 'adunit-500247929c5984a6',
            // adIntervals: 40,
            style: {
                left: (winSize.windowWidth - bannerWidth) / 2,
                top: bannerHeight,//winSize.windowHeight - bannerHeight-20,
                width: bannerWidth,
            }
        })

        this.bannerAd1.onResize(res => {
            //@ts-ignore
            this.bannerAd1.style.top = winSize.windowHeight - this.bannerAd1.style.realHeight + 0.1;
        })

        this.bannerAd1.onError(err => {
            console.log("BANNER报错1", err)
            this.bannerBoool1 = true;
        })

        //加载广告
        console.log("加载banner广告1");
        this.bannerAd1.onLoad(() => {
        })
    }


    showBannerad() {
        this.bannerAd.show()
    }

    HIDE_BANNER() {

        this.bannerAd.hide()
    }



    showCreateCustomAd() {

        if (this.customAd) {
            this.customAd.destroy()
            this.customAd = null;
        }



        this.customAd.onError(err => {
            console.log("模板报错", err)
        })

        //加载广告
        console.log("加载模板广告");
        this.customAd.onLoad(() => {
            console.log('模板广告加载成功');
        })

        this.customAd.onClose(() => {
            console.log('模板广告关闭');
            this.scheduleOnce(() => {
                if (cc.director.getScene().name == 'bundle_menu') {
                    this.showCreateCustomAd()
                }
            }, 30)
        })

        this.customAd.show()
    }

    hideCreateCustomAd() {
        if (this.customAd) {
            this.customAd.destroy()
            this.customAd = null;
        }
    }

    public trackEvent(type: string, param?: object) {
        if (param) {
            window["wx"].uma.trackEvent(type, param)
        } else {
            window["wx"].uma.trackEvent(type)
        }

    }


    DESTROY_BANNER() {
        if (this.bannerId == 1) {
            console.log('销毁广告');
            if (!this.bannerAd) return
            this.bannerAd.destroy()
            this.bannerAd = null;
            this.LOAD_BANNER();
            if (this.useId == 1) {
                if (!this.bannerAd1) return
                this.bannerAd1.destroy()
                this.bannerAd1 = null;
                this.LOAD_BANNER1();
            }
        } else {
            console.log('销毁广告');
            if (!this.bannerAd1) return
            this.bannerAd1.destroy()
            this.bannerAd1 = null;
            this.LOAD_BANNER1();
            if (this.useId == 0) {
                if (!this.bannerAd) return
                this.bannerAd.destroy()
                this.bannerAd = null;
                this.LOAD_BANNER();
            }
        }
    }

    //微信打点上报
    reportUserBehaviorBranchAnalytics(uid, type) {
        this.m_SDK.reportUserBehaviorBranchAnalytics({
            branchId: uid,
            eventType: type // 1：曝光； 2：点击
        });
    }

    /***************************   WX 激励视频   *******************/

    //销毁激励视频
    DESTROY_VIDEO() {
        if (!this.rewardVideoAd) return
        this.rewardVideoAd.destroy() // 销毁组件，释放资源
    }

    private errBool = false;
    public _adcb1: any;
    public _adcb: any;
    adNum: number = 0;
    LOAD_VIDEO() {
        var self = this;
        console.log("---------------------watchAd")
        self.errBool = false;
        console.log('视频',self.rewardVideoAd)
        if (self.rewardVideoAd) {
            console.log('视频0000',self.rewardVideoAd)
        } else {
            console.log('视频0',)
            self.rewardVideoAd = this.m_SDK.createRewardedVideoAd({
                //以下所有 API 需支持最低平台版本号'1051' (minPlatformVersion>='1051')
                adUnitId: this.WX_VIDEOId
            });
            console.log('视频1',self.rewardVideoAd)
            self.rewardVideoAd.onClose((data) => {
                console.log('ad close.');
                self.LOAD_VIDEO();
                // 用户点击了【关闭广告】按钮
                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                setTimeout(() => {
                    if (data && data.isEnded || data === undefined) {
                        self._adcb();
                    } else {
                        self._adcb1();
                    }
                }, .1);
            });
            self.rewardVideoAd.onError(function (err) {
                self.errBool = true;
                console.log("视频ONERROR", JSON.stringify(err));
            });
            // self.pauseAll();
            self.rewardVideoAd.onLoad(() => {
                console.log('ad loaded.');
                // self.rewardVideoAd.offLoad();
                self.errBool = false;
            })
        }
        this.rewardVideoAd.load();
    }


    lastClickTime: number = 0;
    /**
     * 关闭视频回调
     * @param goodVideo 看完视频
     * @param errorVideo 未看完视频
     * @param index  额外参数
     */
    CLOSE_VIDEO(goodVideo: Function, errorVideo: Function, unLoadVideo: Function, ID?: string) {
        //创建激励视频    
        // console.log(`创建激励视频广告, adUnitId:：`, this.WX_VIDEOId)

        let CLICK_INTERVAL = 2000
        console.log('时间0', new Date().getTime() - this.lastClickTime)
        if (this.lastClickTime != 0 && new Date().getTime() - this.lastClickTime < CLICK_INTERVAL) {
            // TipMgr.showTip('暂无广告')
            return;
        }
        this.lastClickTime = new Date().getTime();

        this._adcb = goodVideo;
        this._adcb1 = errorVideo;
        console.log("视频正确", this.errBool);
        if (this.errBool) {
            console.log("错误ing");
            // console.log("视频ONERROR", JSON.stringify(err));
            unLoadVideo()
            // TipMgr.showTip('暂无广告')
            this.LOAD_VIDEO();
        } else {
            if (!this.rewardVideoAd) {
                // setTimeout(() => {
                    this.LOAD_VIDEO();
                // }, 1000);
                unLoadVideo()
            } else {
                this.rewardVideoAd.show().then(() => {
                    this.adNum = 0;
                    Global.platform.trackEvent(ID)
                }).catch((err) => {
                    this.adNum++;
                    unLoadVideo()
                    if (this.adNum > 3) {
                        // this.rewardVideoAd.offLoad();
                        // this.rewardVideoAd.offError();
                        // this.rewardVideoAd.offClose();
                        // this.rewardVideoAd.destroy();
                        // this.rewardVideoAd = null
                    }
                    // setTimeout(() => {
                        this.LOAD_VIDEO();
                    // }, 1000);
                    console.log("视频ONERROR报错中");
                    // self.share(callback);
                })
            }
        }


    }

    /***************************   WX 插屏   *******************/

    CREATE_TITIALAD() {
        return
    }

    LOAD_TITIALAD() {
        return
    }

    SHOW_TITIALAD() {
        //创建
        this.interstitialAd = this.m_SDK.createInterstitialAd({
            adUnitId: this.WX_TITIALADId
        })

        this.interstitialAd.onError(err => {
            console.log(err)
        })
        //加载
        this.interstitialAd.onLoad(() => {
            console.log('插屏 广告加载成功')
        })
        //显示
        this.interstitialAd.show().catch((err) => {
            console.error(err)
        })
    }

    CLOSE_TITIALAD() {
        this.interstitialAd.onClose(res => {
            console.log('插屏 广告关闭')
            this.SHOW_BANNER()
        })
    }

    /*******************************************微信手机震动***********************************************/

    /**
     * 手机震动
     * @param type 震动强度类型，有效值为：heavy、medium、light
     * @param success 接口调用成功的回调函数
     * @param fail 接口调用失败的回调函数
     * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）	
     */
    VibrateShort(type: string, success?: Function, fail?: Function, complete?: Function) {
        this.m_SDK.vibrateShort(type, success, fail, complete)

        if (success) {
            success()
        }
        else if (fail) {
            fail()
        }
    }

    VibrateLong(success?: Function, fail?: Function, complete?: Function) {
        this.m_SDK.vibrateLong(success, fail, complete)
    }

    /**************************************微信分享转发功能***************************************/
    //展示转发菜单
    SHOW_MENU() {

        // let random = Common.getRandom(0, 1)

        this.m_SDK.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        })

        const id: string[] = ['CzvqimV+SsSP23PrZAkFxA==']
        const url: string[] = ['https://mmocgame.qpic.cn/wechatgame/9m9eQRfGLrNWy8fDjeicdtoLOIIZEAfZ7P6zFBVfc2aOQve49WcvNicFtT91aCcQIB/0']

        this.m_SDK.onShareAppMessage(function () {
            return {
                title: '人生重开模拟器',
                imageUrlId: id[0],
                imageUrl: url[0]
            }
        })

        // 朋友圈
        this.m_SDK.onShareTimeline(() => {
            return {
                title: '人生重开模拟器',
                // imageUrl: '', // 图片 URL
                // query: 'a=1&b=2'
            }
        })
    }

    //主动分享
    Share(callback: (success: boolean) => void): void {
        // let random = Common.getRandom(0, 1)
        const id: string[] = ['CzvqimV+SsSP23PrZAkFxA==']
        const url: string[] = ['https://mmocgame.qpic.cn/wechatgame/9m9eQRfGLrNWy8fDjeicdtoLOIIZEAfZ7P6zFBVfc2aOQve49WcvNicFtT91aCcQIB/0']

        this.m_SDK.shareAppMessage({
            title: "人生重开模拟器",
            imageUrl: url[0],
        })
    }

    GameClubButton() {

        if (this.gameBtn) {
            this.gameBtn.destroy();
            this.gameBtn = null;
        }

        let winSize1 = this.m_SDK.getSystemInfoSync();
        this.gameBtn = this.m_SDK.createGameClubButton({
            // icon: 'green',
            image: 'https://byhcdn.333666999.club/icon/1/Btn_youxiquan.png',
            style: {
                left: winSize1.windowWidth - 100,
                top: winSize1.windowHeight / 2 - 120,
                width: 76 * 0.5,
                height: 75 * 0.5,
            }
        })
        this.gameClubHiding();
    }

    gameClubSHow() {
        if (this.gameBtn) this.gameBtn.show();
    }

    gameClubHiding() {
        if (this.gameBtn) this.gameBtn.hide();

    }

    gameClubHide() {
        if (this.gameBtn) {
            this.gameBtn.destroy();
            this.gameBtn = null;
        }

    }

    //隐藏按钮
    HIDE_MENU() {
        this.m_SDK.hideShareMenu()
    }

    PlatformName() {
        return 'weChatPlatform';
    }
}
