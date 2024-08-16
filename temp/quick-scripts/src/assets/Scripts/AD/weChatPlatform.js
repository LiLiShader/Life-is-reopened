"use strict";
cc._RF.push(module, '1679f/MVX1FuY+QCToPI/HY', 'weChatPlatform');
// Scripts/AD/weChatPlatform.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var UserModel_1 = require("../Other/UserModel");
var Global_1 = require("./Global");
var PlatformBase_1 = require("./PlatformBase");
/**
 * 微信平台广告类
 */
var weChatPlatform = /** @class */ (function (_super) {
    __extends(weChatPlatform, _super);
    function weChatPlatform() {
        var _this = _super.call(this) || this;
        _this.bannerAd = null; //banner广告
        _this.bannerAd1 = null; //banner广告
        _this.rewardVideoAd = null; //激励视频
        _this.interstitialAd = null; //插屏广告
        _this.customAd = null;
        _this.gameBtn = null;
        //WX广告参数
        _this.WX_BANNERId = 'adunit-03ad30b2a00adc60';
        _this.WX_VIDEOId = 'adunit-6fbcc6a34b05eddb';
        _this.WX_TITIALADId = 'adunit-62eea9bfd001a4ea';
        _this.bannerBoool = false;
        _this.bannerBoool1 = false;
        _this.bannerId = 0;
        _this.useId = 0;
        _this.errBool = false;
        _this.adNum = 0;
        _this.lastClickTime = 0;
        _this.m_SDK = window.wx;
        _this.SHOW_MENU();
        _this.onShow();
        return _this;
    }
    weChatPlatform.prototype.onShow = function () {
        var self = this;
        this.m_SDK.onShow(function (res) {
            console.log("收到 onShow 回调:\n" + JSON.stringify(res));
            if (self.shareCallback) {
                self.shareCallback();
            }
        });
    };
    weChatPlatform.prototype.onHide = function () {
        var self = this;
        this.m_SDK.onHide(function (res) {
            console.log("收到 onShow 回调:\n" + JSON.stringify(res));
            if (self.shareCallback1) {
                self.shareCallback1();
            }
        });
    };
    weChatPlatform.prototype.SHOW_BANNER = function () {
        if (UserModel_1.default.instance.adCd)
            return;
        this.DESTROY_BANNER();
        if (this.bannerId == 0) {
            this.bannerId++;
            if (!this.bannerBoool) {
                this.useId = 0;
                this.bannerAd.show();
            }
            else {
                this.useId = 1;
                this.bannerAd1.show();
            }
        }
        else {
            this.bannerId++;
            if (this.bannerId > 1) {
                this.bannerId = 0;
            }
            if (!this.bannerBoool1) {
                this.useId = 1;
                this.bannerAd1.show();
            }
            else {
                this.useId = 0;
                this.bannerAd.show();
            }
        }
        return;
    };
    weChatPlatform.prototype.LOAD_BANNER = function () {
        var _this = this;
        //创建广告
        console.log('创建banner');
        var winSize = this.m_SDK.getSystemInfoSync();
        var bannerHeight = 60; //80
        var bannerWidth = 320;
        this.bannerBoool = false;
        this.bannerAd = this.m_SDK.createBannerAd({
            adUnitId: this.WX_BANNERId,
            // adIntervals: 40,
            style: {
                left: (winSize.windowWidth - bannerWidth) / 2,
                top: bannerHeight,
                width: bannerWidth,
            }
        });
        this.bannerAd.onResize(function (res) {
            //@ts-ignore
            _this.bannerAd.style.top = winSize.windowHeight - _this.bannerAd.style.realHeight + 0.1;
        });
        this.bannerAd.onError(function (err) {
            console.log("BANNER报错", err);
            _this.bannerBoool = true;
        });
        //加载广告
        console.log("加载banner广告");
        this.bannerAd.onLoad(function () {
        });
    };
    weChatPlatform.prototype.LOAD_BANNER1 = function () {
        var _this = this;
        //创建广告
        console.log('创建banner1');
        var winSize = this.m_SDK.getSystemInfoSync();
        var bannerHeight = 60; //80
        var bannerWidth = 320;
        this.bannerBoool1 = false;
        this.bannerAd1 = this.m_SDK.createBannerAd({
            adUnitId: 'adunit-500247929c5984a6',
            // adIntervals: 40,
            style: {
                left: (winSize.windowWidth - bannerWidth) / 2,
                top: bannerHeight,
                width: bannerWidth,
            }
        });
        this.bannerAd1.onResize(function (res) {
            //@ts-ignore
            _this.bannerAd1.style.top = winSize.windowHeight - _this.bannerAd1.style.realHeight + 0.1;
        });
        this.bannerAd1.onError(function (err) {
            console.log("BANNER报错1", err);
            _this.bannerBoool1 = true;
        });
        //加载广告
        console.log("加载banner广告1");
        this.bannerAd1.onLoad(function () {
        });
    };
    weChatPlatform.prototype.showBannerad = function () {
        this.bannerAd.show();
    };
    weChatPlatform.prototype.HIDE_BANNER = function () {
        this.bannerAd.hide();
    };
    weChatPlatform.prototype.showCreateCustomAd = function () {
        var _this = this;
        if (this.customAd) {
            this.customAd.destroy();
            this.customAd = null;
        }
        this.customAd.onError(function (err) {
            console.log("模板报错", err);
        });
        //加载广告
        console.log("加载模板广告");
        this.customAd.onLoad(function () {
            console.log('模板广告加载成功');
        });
        this.customAd.onClose(function () {
            console.log('模板广告关闭');
            _this.scheduleOnce(function () {
                if (cc.director.getScene().name == 'bundle_menu') {
                    _this.showCreateCustomAd();
                }
            }, 30);
        });
        this.customAd.show();
    };
    weChatPlatform.prototype.hideCreateCustomAd = function () {
        if (this.customAd) {
            this.customAd.destroy();
            this.customAd = null;
        }
    };
    weChatPlatform.prototype.trackEvent = function (type, param) {
        if (param) {
            window["wx"].uma.trackEvent(type, param);
        }
        else {
            window["wx"].uma.trackEvent(type);
        }
    };
    weChatPlatform.prototype.DESTROY_BANNER = function () {
        if (this.bannerId == 1) {
            console.log('销毁广告');
            if (!this.bannerAd)
                return;
            this.bannerAd.destroy();
            this.bannerAd = null;
            this.LOAD_BANNER();
            if (this.useId == 1) {
                if (!this.bannerAd1)
                    return;
                this.bannerAd1.destroy();
                this.bannerAd1 = null;
                this.LOAD_BANNER1();
            }
        }
        else {
            console.log('销毁广告');
            if (!this.bannerAd1)
                return;
            this.bannerAd1.destroy();
            this.bannerAd1 = null;
            this.LOAD_BANNER1();
            if (this.useId == 0) {
                if (!this.bannerAd)
                    return;
                this.bannerAd.destroy();
                this.bannerAd = null;
                this.LOAD_BANNER();
            }
        }
    };
    //微信打点上报
    weChatPlatform.prototype.reportUserBehaviorBranchAnalytics = function (uid, type) {
        this.m_SDK.reportUserBehaviorBranchAnalytics({
            branchId: uid,
            eventType: type // 1：曝光； 2：点击
        });
    };
    /***************************   WX 激励视频   *******************/
    //销毁激励视频
    weChatPlatform.prototype.DESTROY_VIDEO = function () {
        if (!this.rewardVideoAd)
            return;
        this.rewardVideoAd.destroy(); // 销毁组件，释放资源
    };
    weChatPlatform.prototype.LOAD_VIDEO = function () {
        var self = this;
        console.log("---------------------watchAd");
        self.errBool = false;
        console.log('视频', self.rewardVideoAd);
        if (self.rewardVideoAd) {
            console.log('视频0000', self.rewardVideoAd);
        }
        else {
            console.log('视频0');
            self.rewardVideoAd = this.m_SDK.createRewardedVideoAd({
                //以下所有 API 需支持最低平台版本号'1051' (minPlatformVersion>='1051')
                adUnitId: this.WX_VIDEOId
            });
            console.log('视频1', self.rewardVideoAd);
            self.rewardVideoAd.onClose(function (data) {
                console.log('ad close.');
                self.LOAD_VIDEO();
                // 用户点击了【关闭广告】按钮
                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                setTimeout(function () {
                    if (data && data.isEnded || data === undefined) {
                        self._adcb();
                    }
                    else {
                        self._adcb1();
                    }
                }, .1);
            });
            self.rewardVideoAd.onError(function (err) {
                self.errBool = true;
                console.log("视频ONERROR", JSON.stringify(err));
            });
            // self.pauseAll();
            self.rewardVideoAd.onLoad(function () {
                console.log('ad loaded.');
                // self.rewardVideoAd.offLoad();
                self.errBool = false;
            });
        }
        this.rewardVideoAd.load();
    };
    /**
     * 关闭视频回调
     * @param goodVideo 看完视频
     * @param errorVideo 未看完视频
     * @param index  额外参数
     */
    weChatPlatform.prototype.CLOSE_VIDEO = function (goodVideo, errorVideo, unLoadVideo, ID) {
        //创建激励视频    
        // console.log(`创建激励视频广告, adUnitId:：`, this.WX_VIDEOId)
        var _this = this;
        var CLICK_INTERVAL = 2000;
        console.log('时间0', new Date().getTime() - this.lastClickTime);
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
            unLoadVideo();
            // TipMgr.showTip('暂无广告')
            this.LOAD_VIDEO();
        }
        else {
            if (!this.rewardVideoAd) {
                // setTimeout(() => {
                this.LOAD_VIDEO();
                // }, 1000);
                unLoadVideo();
            }
            else {
                this.rewardVideoAd.show().then(function () {
                    _this.adNum = 0;
                    Global_1.default.platform.trackEvent(ID);
                }).catch(function (err) {
                    _this.adNum++;
                    unLoadVideo();
                    if (_this.adNum > 3) {
                        // this.rewardVideoAd.offLoad();
                        // this.rewardVideoAd.offError();
                        // this.rewardVideoAd.offClose();
                        // this.rewardVideoAd.destroy();
                        // this.rewardVideoAd = null
                    }
                    // setTimeout(() => {
                    _this.LOAD_VIDEO();
                    // }, 1000);
                    console.log("视频ONERROR报错中");
                    // self.share(callback);
                });
            }
        }
    };
    /***************************   WX 插屏   *******************/
    weChatPlatform.prototype.CREATE_TITIALAD = function () {
        return;
    };
    weChatPlatform.prototype.LOAD_TITIALAD = function () {
        return;
    };
    weChatPlatform.prototype.SHOW_TITIALAD = function () {
        //创建
        this.interstitialAd = this.m_SDK.createInterstitialAd({
            adUnitId: this.WX_TITIALADId
        });
        this.interstitialAd.onError(function (err) {
            console.log(err);
        });
        //加载
        this.interstitialAd.onLoad(function () {
            console.log('插屏 广告加载成功');
        });
        //显示
        this.interstitialAd.show().catch(function (err) {
            console.error(err);
        });
    };
    weChatPlatform.prototype.CLOSE_TITIALAD = function () {
        var _this = this;
        this.interstitialAd.onClose(function (res) {
            console.log('插屏 广告关闭');
            _this.SHOW_BANNER();
        });
    };
    /*******************************************微信手机震动***********************************************/
    /**
     * 手机震动
     * @param type 震动强度类型，有效值为：heavy、medium、light
     * @param success 接口调用成功的回调函数
     * @param fail 接口调用失败的回调函数
     * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    weChatPlatform.prototype.VibrateShort = function (type, success, fail, complete) {
        this.m_SDK.vibrateShort(type, success, fail, complete);
        if (success) {
            success();
        }
        else if (fail) {
            fail();
        }
    };
    weChatPlatform.prototype.VibrateLong = function (success, fail, complete) {
        this.m_SDK.vibrateLong(success, fail, complete);
    };
    /**************************************微信分享转发功能***************************************/
    //展示转发菜单
    weChatPlatform.prototype.SHOW_MENU = function () {
        // let random = Common.getRandom(0, 1)
        this.m_SDK.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        });
        var id = ['CzvqimV+SsSP23PrZAkFxA=='];
        var url = ['https://mmocgame.qpic.cn/wechatgame/9m9eQRfGLrNWy8fDjeicdtoLOIIZEAfZ7P6zFBVfc2aOQve49WcvNicFtT91aCcQIB/0'];
        this.m_SDK.onShareAppMessage(function () {
            return {
                title: '人生重开模拟器',
                imageUrlId: id[0],
                imageUrl: url[0]
            };
        });
        // 朋友圈
        this.m_SDK.onShareTimeline(function () {
            return {
                title: '人生重开模拟器',
            };
        });
    };
    //主动分享
    weChatPlatform.prototype.Share = function (callback) {
        // let random = Common.getRandom(0, 1)
        var id = ['CzvqimV+SsSP23PrZAkFxA=='];
        var url = ['https://mmocgame.qpic.cn/wechatgame/9m9eQRfGLrNWy8fDjeicdtoLOIIZEAfZ7P6zFBVfc2aOQve49WcvNicFtT91aCcQIB/0'];
        this.m_SDK.shareAppMessage({
            title: "人生重开模拟器",
            imageUrl: url[0],
        });
    };
    weChatPlatform.prototype.GameClubButton = function () {
        if (this.gameBtn) {
            this.gameBtn.destroy();
            this.gameBtn = null;
        }
        var winSize1 = this.m_SDK.getSystemInfoSync();
        this.gameBtn = this.m_SDK.createGameClubButton({
            // icon: 'green',
            image: 'https://byhcdn.333666999.club/icon/1/Btn_youxiquan.png',
            style: {
                left: winSize1.windowWidth - 100,
                top: winSize1.windowHeight / 2 - 120,
                width: 76 * 0.5,
                height: 75 * 0.5,
            }
        });
        this.gameClubHiding();
    };
    weChatPlatform.prototype.gameClubSHow = function () {
        if (this.gameBtn)
            this.gameBtn.show();
    };
    weChatPlatform.prototype.gameClubHiding = function () {
        if (this.gameBtn)
            this.gameBtn.hide();
    };
    weChatPlatform.prototype.gameClubHide = function () {
        if (this.gameBtn) {
            this.gameBtn.destroy();
            this.gameBtn = null;
        }
    };
    //隐藏按钮
    weChatPlatform.prototype.HIDE_MENU = function () {
        this.m_SDK.hideShareMenu();
    };
    weChatPlatform.prototype.PlatformName = function () {
        return 'weChatPlatform';
    };
    return weChatPlatform;
}(PlatformBase_1.default));
exports.default = weChatPlatform;

cc._RF.pop();