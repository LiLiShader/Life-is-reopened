
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/AD/weChatPlatform.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQURcXHdlQ2hhdFBsYXRmb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUEyQztBQUMzQyxtQ0FBOEI7QUFDOUIsK0NBQXlFO0FBQ3pFOztHQUVHO0FBQ0g7SUFBNEMsa0NBQVk7SUFnQnBEO1FBQUEsWUFDSSxpQkFBTyxTQUlWO1FBbkJELGNBQVEsR0FBYyxJQUFJLENBQUEsQ0FBQyxVQUFVO1FBQ3JDLGVBQVMsR0FBYyxJQUFJLENBQUEsQ0FBQyxVQUFVO1FBQ3RDLG1CQUFhLEdBQW1CLElBQUksQ0FBQSxDQUFDLE1BQU07UUFDM0Msb0JBQWMsR0FBbUIsSUFBSSxDQUFBLENBQUMsTUFBTTtRQUM1QyxjQUFRLEdBQVEsSUFBSSxDQUFDO1FBQ3JCLGFBQU8sR0FBUSxJQUFJLENBQUM7UUFJcEIsUUFBUTtRQUNTLGlCQUFXLEdBQVcseUJBQXlCLENBQUE7UUFDL0MsZ0JBQVUsR0FBVyx5QkFBeUIsQ0FBQTtRQUM5QyxtQkFBYSxHQUFXLHlCQUF5QixDQUFBO1FBOEJsRSxpQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixrQkFBWSxHQUFZLEtBQUssQ0FBQztRQUM5QixjQUFRLEdBQVcsQ0FBQyxDQUFDO1FBQ3JCLFdBQUssR0FBVyxDQUFDLENBQUM7UUEyTVYsYUFBTyxHQUFHLEtBQUssQ0FBQztRQUd4QixXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBMkNsQixtQkFBYSxHQUFXLENBQUMsQ0FBQztRQXRSdEIsS0FBSSxDQUFDLEtBQUssR0FBSSxNQUFjLENBQUMsRUFBRSxDQUFDO1FBQ2hDLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUNoQixLQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7O0lBQ2xCLENBQUM7SUFFUywrQkFBTSxHQUFoQjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FB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LE9BQU8sRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO0lBRUwsQ0FBQztJQUVELE1BQU07SUFDTixrQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQTtJQUM5QixDQUFDO0lBRUQscUNBQVksR0FBWjtRQUNJLE9BQU8sZ0JBQWdCLENBQUM7SUFDNUIsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0ExZkEsQUEwZkMsQ0ExZjJDLHNCQUFZLEdBMGZ2RCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVc2VyTW9kZWwgZnJvbSBcIi4uL090aGVyL1VzZXJNb2RlbFwiO1xyXG5pbXBvcnQgR2xvYmFsIGZyb20gXCIuL0dsb2JhbFwiO1xyXG5pbXBvcnQgUGxhdGZvcm1CYXNlLCB7IElCYW5uZXJBZCwgSVJld2FyZFZpZGVvQWQgfSBmcm9tIFwiLi9QbGF0Zm9ybUJhc2VcIjtcclxuLyoqXHJcbiAqIOW+ruS/oeW5s+WPsOW5v+WRiuexu1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgd2VDaGF0UGxhdGZvcm0gZXh0ZW5kcyBQbGF0Zm9ybUJhc2Uge1xyXG5cclxuICAgIGJhbm5lckFkOiBJQmFubmVyQWQgPSBudWxsIC8vYmFubmVy5bm/5ZGKXHJcbiAgICBiYW5uZXJBZDE6IElCYW5uZXJBZCA9IG51bGwgLy9iYW5uZXLlub/lkYpcclxuICAgIHJld2FyZFZpZGVvQWQ6IElSZXdhcmRWaWRlb0FkID0gbnVsbCAvL+a/gOWKseinhumikVxyXG4gICAgaW50ZXJzdGl0aWFsQWQ6IElSZXdhcmRWaWRlb0FkID0gbnVsbCAvL+aPkuWxj+W5v+WRilxyXG4gICAgY3VzdG9tQWQ6IGFueSA9IG51bGw7XHJcbiAgICBnYW1lQnRuOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgbV9TREs6IGFueTtcclxuXHJcbiAgICAvL1dY5bm/5ZGK5Y+C5pWwXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IFdYX0JBTk5FUklkOiBzdHJpbmcgPSAnYWR1bml0LTAzYWQzMGIyYTAwYWRjNjAnXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IFdYX1ZJREVPSWQ6IHN0cmluZyA9ICdhZHVuaXQtNmZiY2M2YTM0YjA1ZWRkYidcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgV1hfVElUSUFMQURJZDogc3RyaW5nID0gJ2FkdW5pdC02MmVlYTliZmQwMDFhNGVhJ1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5tX1NESyA9ICh3aW5kb3cgYXMgYW55KS53eDtcclxuICAgICAgICB0aGlzLlNIT1dfTUVOVSgpXHJcbiAgICAgICAgdGhpcy5vblNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25TaG93KCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLm1fU0RLLm9uU2hvdygocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5pS25YiwIG9uU2hvdyDlm57osIM6XFxuXCIgKyBKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgaWYgKHNlbGYuc2hhcmVDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zaGFyZUNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uSGlkZSgpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5tX1NESy5vbkhpZGUoKHJlcykgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaUtuWIsCBvblNob3cg5Zue6LCDOlxcblwiICsgSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLnNoYXJlQ2FsbGJhY2sxKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNoYXJlQ2FsbGJhY2sxKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbiAgICBiYW5uZXJCb29vbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgYmFubmVyQm9vb2wxOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBiYW5uZXJJZDogbnVtYmVyID0gMDtcclxuICAgIHVzZUlkOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIFNIT1dfQkFOTkVSKCkge1xyXG5cclxuICAgICAgICBpZiAoVXNlck1vZGVsLmluc3RhbmNlLmFkQ2QpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5ERVNUUk9ZX0JBTk5FUigpXHJcblxyXG4gICAgICAgIGlmICh0aGlzLmJhbm5lcklkID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5iYW5uZXJJZCsrO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYmFubmVyQm9vb2wpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlSWQgPSAwXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhbm5lckFkLnNob3coKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlSWQgPSAxXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhbm5lckFkMS5zaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmJhbm5lcklkKys7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJhbm5lcklkID4gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYW5uZXJJZCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmJhbm5lckJvb29sMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VJZCA9IDFcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFubmVyQWQxLnNob3coKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlSWQgPSAwXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhbm5lckFkLnNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgTE9BRF9CQU5ORVIoKSB7XHJcbiAgICAgICAgLy/liJvlu7rlub/lkYpcclxuICAgICAgICBjb25zb2xlLmxvZygn5Yib5bu6YmFubmVyJylcclxuICAgICAgICBsZXQgd2luU2l6ZSA9IHRoaXMubV9TREsuZ2V0U3lzdGVtSW5mb1N5bmMoKTtcclxuICAgICAgICBsZXQgYmFubmVySGVpZ2h0ID0gNjA7IC8vODBcclxuICAgICAgICBsZXQgYmFubmVyV2lkdGggPSAzMjA7XHJcbiAgICAgICAgdGhpcy5iYW5uZXJCb29vbCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYmFubmVyQWQgPSB0aGlzLm1fU0RLLmNyZWF0ZUJhbm5lckFkKHtcclxuICAgICAgICAgICAgYWRVbml0SWQ6IHRoaXMuV1hfQkFOTkVSSWQsXHJcbiAgICAgICAgICAgIC8vIGFkSW50ZXJ2YWxzOiA0MCxcclxuICAgICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgICAgIGxlZnQ6ICh3aW5TaXplLndpbmRvd1dpZHRoIC0gYmFubmVyV2lkdGgpIC8gMixcclxuICAgICAgICAgICAgICAgIHRvcDogYmFubmVySGVpZ2h0LC8vd2luU2l6ZS53aW5kb3dIZWlnaHQgLSBiYW5uZXJIZWlnaHQtMjAsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogYmFubmVyV2lkdGgsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLmJhbm5lckFkLm9uUmVzaXplKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICB0aGlzLmJhbm5lckFkLnN0eWxlLnRvcCA9IHdpblNpemUud2luZG93SGVpZ2h0IC0gdGhpcy5iYW5uZXJBZC5zdHlsZS5yZWFsSGVpZ2h0ICsgMC4xO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHRoaXMuYmFubmVyQWQub25FcnJvcihlcnIgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJBTk5FUuaKpemUmVwiLCBlcnIpXHJcbiAgICAgICAgICAgIHRoaXMuYmFubmVyQm9vb2wgPSB0cnVlO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8v5Yqg6L295bm/5ZGKXHJcbiAgICAgICAgY29uc29sZS5sb2coXCLliqDovb1iYW5uZXLlub/lkYpcIik7XHJcbiAgICAgICAgdGhpcy5iYW5uZXJBZC5vbkxvYWQoKCkgPT4ge1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgTE9BRF9CQU5ORVIxKCkge1xyXG4gICAgICAgIC8v5Yib5bu65bm/5ZGKXHJcbiAgICAgICAgY29uc29sZS5sb2coJ+WIm+W7umJhbm5lcjEnKVxyXG4gICAgICAgIGxldCB3aW5TaXplID0gdGhpcy5tX1NESy5nZXRTeXN0ZW1JbmZvU3luYygpO1xyXG4gICAgICAgIGxldCBiYW5uZXJIZWlnaHQgPSA2MDsgLy84MFxyXG4gICAgICAgIGxldCBiYW5uZXJXaWR0aCA9IDMyMDtcclxuICAgICAgICB0aGlzLmJhbm5lckJvb29sMSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYmFubmVyQWQxID0gdGhpcy5tX1NESy5jcmVhdGVCYW5uZXJBZCh7XHJcbiAgICAgICAgICAgIGFkVW5pdElkOiAnYWR1bml0LTUwMDI0NzkyOWM1OTg0YTYnLFxyXG4gICAgICAgICAgICAvLyBhZEludGVydmFsczogNDAsXHJcbiAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0OiAod2luU2l6ZS53aW5kb3dXaWR0aCAtIGJhbm5lcldpZHRoKSAvIDIsXHJcbiAgICAgICAgICAgICAgICB0b3A6IGJhbm5lckhlaWdodCwvL3dpblNpemUud2luZG93SGVpZ2h0IC0gYmFubmVySGVpZ2h0LTIwLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IGJhbm5lcldpZHRoLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGhpcy5iYW5uZXJBZDEub25SZXNpemUocmVzID0+IHtcclxuICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHRoaXMuYmFubmVyQWQxLnN0eWxlLnRvcCA9IHdpblNpemUud2luZG93SGVpZ2h0IC0gdGhpcy5iYW5uZXJBZDEuc3R5bGUucmVhbEhlaWdodCArIDAuMTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLmJhbm5lckFkMS5vbkVycm9yKGVyciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQkFOTkVS5oql6ZSZMVwiLCBlcnIpXHJcbiAgICAgICAgICAgIHRoaXMuYmFubmVyQm9vb2wxID0gdHJ1ZTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvL+WKoOi9veW5v+WRilxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5Yqg6L29YmFubmVy5bm/5ZGKMVwiKTtcclxuICAgICAgICB0aGlzLmJhbm5lckFkMS5vbkxvYWQoKCkgPT4ge1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHNob3dCYW5uZXJhZCgpIHtcclxuICAgICAgICB0aGlzLmJhbm5lckFkLnNob3coKVxyXG4gICAgfVxyXG5cclxuICAgIEhJREVfQkFOTkVSKCkge1xyXG5cclxuICAgICAgICB0aGlzLmJhbm5lckFkLmhpZGUoKVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgc2hvd0NyZWF0ZUN1c3RvbUFkKCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jdXN0b21BZCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbUFkLmRlc3Ryb3koKVxyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbUFkID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5jdXN0b21BZC5vbkVycm9yKGVyciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5qih5p2/5oql6ZSZXCIsIGVycilcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvL+WKoOi9veW5v+WRilxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5Yqg6L295qih5p2/5bm/5ZGKXCIpO1xyXG4gICAgICAgIHRoaXMuY3VzdG9tQWQub25Mb2FkKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+aooeadv+W5v+WRiuWKoOi9veaIkOWKnycpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHRoaXMuY3VzdG9tQWQub25DbG9zZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmqKHmnb/lub/lkYrlhbPpl60nKTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNjLmRpcmVjdG9yLmdldFNjZW5lKCkubmFtZSA9PSAnYnVuZGxlX21lbnUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93Q3JlYXRlQ3VzdG9tQWQoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAzMClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLmN1c3RvbUFkLnNob3coKVxyXG4gICAgfVxyXG5cclxuICAgIGhpZGVDcmVhdGVDdXN0b21BZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXN0b21BZCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbUFkLmRlc3Ryb3koKVxyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbUFkID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRyYWNrRXZlbnQodHlwZTogc3RyaW5nLCBwYXJhbT86IG9iamVjdCkge1xyXG4gICAgICAgIGlmIChwYXJhbSkge1xyXG4gICAgICAgICAgICB3aW5kb3dbXCJ3eFwiXS51bWEudHJhY2tFdmVudCh0eXBlLCBwYXJhbSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3aW5kb3dbXCJ3eFwiXS51bWEudHJhY2tFdmVudCh0eXBlKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIERFU1RST1lfQkFOTkVSKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmJhbm5lcklkID09IDEpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+mUgOavgeW5v+WRiicpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYmFubmVyQWQpIHJldHVyblxyXG4gICAgICAgICAgICB0aGlzLmJhbm5lckFkLmRlc3Ryb3koKVxyXG4gICAgICAgICAgICB0aGlzLmJhbm5lckFkID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5MT0FEX0JBTk5FUigpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy51c2VJZCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYmFubmVyQWQxKSByZXR1cm5cclxuICAgICAgICAgICAgICAgIHRoaXMuYmFubmVyQWQxLmRlc3Ryb3koKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5iYW5uZXJBZDEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5MT0FEX0JBTk5FUjEoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfplIDmr4Hlub/lkYonKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmJhbm5lckFkMSkgcmV0dXJuXHJcbiAgICAgICAgICAgIHRoaXMuYmFubmVyQWQxLmRlc3Ryb3koKVxyXG4gICAgICAgICAgICB0aGlzLmJhbm5lckFkMSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuTE9BRF9CQU5ORVIxKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnVzZUlkID09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5iYW5uZXJBZCkgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhbm5lckFkLmRlc3Ryb3koKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5iYW5uZXJBZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxPQURfQkFOTkVSKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/lvq7kv6HmiZPngrnkuIrmiqVcclxuICAgIHJlcG9ydFVzZXJCZWhhdmlvckJyYW5jaEFuYWx5dGljcyh1aWQsIHR5cGUpIHtcclxuICAgICAgICB0aGlzLm1fU0RLLnJlcG9ydFVzZXJCZWhhdmlvckJyYW5jaEFuYWx5dGljcyh7XHJcbiAgICAgICAgICAgIGJyYW5jaElkOiB1aWQsXHJcbiAgICAgICAgICAgIGV2ZW50VHlwZTogdHlwZSAvLyAx77ya5pud5YWJ77ybIDLvvJrngrnlh7tcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqICAgV1gg5r+A5Yqx6KeG6aKRICAgKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbiAgICAvL+mUgOavgea/gOWKseinhumikVxyXG4gICAgREVTVFJPWV9WSURFTygpIHtcclxuICAgICAgICBpZiAoIXRoaXMucmV3YXJkVmlkZW9BZCkgcmV0dXJuXHJcbiAgICAgICAgdGhpcy5yZXdhcmRWaWRlb0FkLmRlc3Ryb3koKSAvLyDplIDmr4Hnu4Tku7bvvIzph4rmlL7otYTmupBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVyckJvb2wgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBfYWRjYjE6IGFueTtcclxuICAgIHB1YmxpYyBfYWRjYjogYW55O1xyXG4gICAgYWROdW06IG51bWJlciA9IDA7XHJcbiAgICBMT0FEX1ZJREVPKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLXdhdGNoQWRcIilcclxuICAgICAgICBzZWxmLmVyckJvb2wgPSBmYWxzZTtcclxuICAgICAgICBjb25zb2xlLmxvZygn6KeG6aKRJyxzZWxmLnJld2FyZFZpZGVvQWQpXHJcbiAgICAgICAgaWYgKHNlbGYucmV3YXJkVmlkZW9BZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn6KeG6aKRMDAwMCcsc2VsZi5yZXdhcmRWaWRlb0FkKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfop4bpopEwJywpXHJcbiAgICAgICAgICAgIHNlbGYucmV3YXJkVmlkZW9BZCA9IHRoaXMubV9TREsuY3JlYXRlUmV3YXJkZWRWaWRlb0FkKHtcclxuICAgICAgICAgICAgICAgIC8v5Lul5LiL5omA5pyJIEFQSSDpnIDmlK/mjIHmnIDkvY7lubPlj7DniYjmnKzlj7cnMTA1MScgKG1pblBsYXRmb3JtVmVyc2lvbj49JzEwNTEnKVxyXG4gICAgICAgICAgICAgICAgYWRVbml0SWQ6IHRoaXMuV1hfVklERU9JZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+inhumikTEnLHNlbGYucmV3YXJkVmlkZW9BZClcclxuICAgICAgICAgICAgc2VsZi5yZXdhcmRWaWRlb0FkLm9uQ2xvc2UoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhZCBjbG9zZS4nKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuTE9BRF9WSURFTygpO1xyXG4gICAgICAgICAgICAgICAgLy8g55So5oi354K55Ye75LqG44CQ5YWz6Zet5bm/5ZGK44CR5oyJ6ZKuXHJcbiAgICAgICAgICAgICAgICAvLyDlsI/kuo4gMi4xLjAg55qE5Z+656GA5bqT54mI5pys77yMcmVzIOaYr+S4gOS4qiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEuaXNFbmRlZCB8fCBkYXRhID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fYWRjYigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX2FkY2IxKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgLjEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2VsZi5yZXdhcmRWaWRlb0FkLm9uRXJyb3IoZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5lcnJCb29sID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6KeG6aKRT05FUlJPUlwiLCBKU09OLnN0cmluZ2lmeShlcnIpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIHNlbGYucGF1c2VBbGwoKTtcclxuICAgICAgICAgICAgc2VsZi5yZXdhcmRWaWRlb0FkLm9uTG9hZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnYWQgbG9hZGVkLicpO1xyXG4gICAgICAgICAgICAgICAgLy8gc2VsZi5yZXdhcmRWaWRlb0FkLm9mZkxvYWQoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuZXJyQm9vbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJld2FyZFZpZGVvQWQubG9hZCgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBsYXN0Q2xpY2tUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgLyoqXHJcbiAgICAgKiDlhbPpl63op4bpopHlm57osINcclxuICAgICAqIEBwYXJhbSBnb29kVmlkZW8g55yL5a6M6KeG6aKRXHJcbiAgICAgKiBAcGFyYW0gZXJyb3JWaWRlbyDmnKrnnIvlrozop4bpopFcclxuICAgICAqIEBwYXJhbSBpbmRleCAg6aKd5aSW5Y+C5pWwXHJcbiAgICAgKi9cclxuICAgIENMT1NFX1ZJREVPKGdvb2RWaWRlbzogRnVuY3Rpb24sIGVycm9yVmlkZW86IEZ1bmN0aW9uLCB1bkxvYWRWaWRlbzogRnVuY3Rpb24sIElEPzogc3RyaW5nKSB7XHJcbiAgICAgICAgLy/liJvlu7rmv4DlirHop4bpopEgICAgXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYOWIm+W7uua/gOWKseinhumikeW5v+WRiiwgYWRVbml0SWQ677yaYCwgdGhpcy5XWF9WSURFT0lkKVxyXG5cclxuICAgICAgICBsZXQgQ0xJQ0tfSU5URVJWQUwgPSAyMDAwXHJcbiAgICAgICAgY29uc29sZS5sb2coJ+aXtumXtDAnLCBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHRoaXMubGFzdENsaWNrVGltZSlcclxuICAgICAgICBpZiAodGhpcy5sYXN0Q2xpY2tUaW1lICE9IDAgJiYgbmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0aGlzLmxhc3RDbGlja1RpbWUgPCBDTElDS19JTlRFUlZBTCkge1xyXG4gICAgICAgICAgICAvLyBUaXBNZ3Iuc2hvd1RpcCgn5pqC5peg5bm/5ZGKJylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxhc3RDbGlja1RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fYWRjYiA9IGdvb2RWaWRlbztcclxuICAgICAgICB0aGlzLl9hZGNiMSA9IGVycm9yVmlkZW87XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLop4bpopHmraPnoa5cIiwgdGhpcy5lcnJCb29sKTtcclxuICAgICAgICBpZiAodGhpcy5lcnJCb29sKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6ZSZ6K+vaW5nXCIpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuinhumikU9ORVJST1JcIiwgSlNPTi5zdHJpbmdpZnkoZXJyKSk7XHJcbiAgICAgICAgICAgIHVuTG9hZFZpZGVvKClcclxuICAgICAgICAgICAgLy8gVGlwTWdyLnNob3dUaXAoJ+aaguaXoOW5v+WRiicpXHJcbiAgICAgICAgICAgIHRoaXMuTE9BRF9WSURFTygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5yZXdhcmRWaWRlb0FkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkxPQURfVklERU8oKTtcclxuICAgICAgICAgICAgICAgIC8vIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgdW5Mb2FkVmlkZW8oKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRWaWRlb0FkLnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkTnVtID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwucGxhdGZvcm0udHJhY2tFdmVudChJRClcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkTnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgdW5Mb2FkVmlkZW8oKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFkTnVtID4gMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnJld2FyZFZpZGVvQWQub2ZmTG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnJld2FyZFZpZGVvQWQub2ZmRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5yZXdhcmRWaWRlb0FkLm9mZkNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMucmV3YXJkVmlkZW9BZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMucmV3YXJkVmlkZW9BZCA9IG51bGxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTE9BRF9WSURFTygpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6KeG6aKRT05FUlJPUuaKpemUmeS4rVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzZWxmLnNoYXJlKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqICAgV1gg5o+S5bGPICAgKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbiAgICBDUkVBVEVfVElUSUFMQUQoKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgTE9BRF9USVRJQUxBRCgpIHtcclxuICAgICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICBTSE9XX1RJVElBTEFEKCkge1xyXG4gICAgICAgIC8v5Yib5bu6XHJcbiAgICAgICAgdGhpcy5pbnRlcnN0aXRpYWxBZCA9IHRoaXMubV9TREsuY3JlYXRlSW50ZXJzdGl0aWFsQWQoe1xyXG4gICAgICAgICAgICBhZFVuaXRJZDogdGhpcy5XWF9USVRJQUxBRElkXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGhpcy5pbnRlcnN0aXRpYWxBZC5vbkVycm9yKGVyciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8v5Yqg6L29XHJcbiAgICAgICAgdGhpcy5pbnRlcnN0aXRpYWxBZC5vbkxvYWQoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5o+S5bGPIOW5v+WRiuWKoOi9veaIkOWKnycpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvL+aYvuekulxyXG4gICAgICAgIHRoaXMuaW50ZXJzdGl0aWFsQWQuc2hvdygpLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBDTE9TRV9USVRJQUxBRCgpIHtcclxuICAgICAgICB0aGlzLmludGVyc3RpdGlhbEFkLm9uQ2xvc2UocmVzID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+aPkuWxjyDlub/lkYrlhbPpl60nKVxyXG4gICAgICAgICAgICB0aGlzLlNIT1dfQkFOTkVSKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq5b6u5L+h5omL5py66ZyH5YqoKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmiYvmnLrpnIfliqhcclxuICAgICAqIEBwYXJhbSB0eXBlIOmch+WKqOW8uuW6puexu+Wei++8jOacieaViOWAvOS4uu+8mmhlYXZ544CBbWVkaXVt44CBbGlnaHRcclxuICAgICAqIEBwYXJhbSBzdWNjZXNzIOaOpeWPo+iwg+eUqOaIkOWKn+eahOWbnuiwg+WHveaVsFxyXG4gICAgICogQHBhcmFtIGZhaWwg5o6l5Y+j6LCD55So5aSx6LSl55qE5Zue6LCD5Ye95pWwXHJcbiAgICAgKiBAcGFyYW0gY29tcGxldGUg5o6l5Y+j6LCD55So57uT5p2f55qE5Zue6LCD5Ye95pWw77yI6LCD55So5oiQ5Yqf44CB5aSx6LSl6YO95Lya5omn6KGM77yJXHRcclxuICAgICAqL1xyXG4gICAgVmlicmF0ZVNob3J0KHR5cGU6IHN0cmluZywgc3VjY2Vzcz86IEZ1bmN0aW9uLCBmYWlsPzogRnVuY3Rpb24sIGNvbXBsZXRlPzogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLm1fU0RLLnZpYnJhdGVTaG9ydCh0eXBlLCBzdWNjZXNzLCBmYWlsLCBjb21wbGV0ZSlcclxuXHJcbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgc3VjY2VzcygpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGZhaWwpIHtcclxuICAgICAgICAgICAgZmFpbCgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFZpYnJhdGVMb25nKHN1Y2Nlc3M/OiBGdW5jdGlvbiwgZmFpbD86IEZ1bmN0aW9uLCBjb21wbGV0ZT86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5tX1NESy52aWJyYXRlTG9uZyhzdWNjZXNzLCBmYWlsLCBjb21wbGV0ZSlcclxuICAgIH1cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirlvq7kv6HliIbkuqvovazlj5Hlip/og70qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAvL+Wxleekuui9rOWPkeiPnOWNlVxyXG4gICAgU0hPV19NRU5VKCkge1xyXG5cclxuICAgICAgICAvLyBsZXQgcmFuZG9tID0gQ29tbW9uLmdldFJhbmRvbSgwLCAxKVxyXG5cclxuICAgICAgICB0aGlzLm1fU0RLLnNob3dTaGFyZU1lbnUoe1xyXG4gICAgICAgICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWUsXHJcbiAgICAgICAgICAgIG1lbnVzOiBbJ3NoYXJlQXBwTWVzc2FnZScsICdzaGFyZVRpbWVsaW5lJ11cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBjb25zdCBpZDogc3RyaW5nW10gPSBbJ0N6dnFpbVYrU3NTUDIzUHJaQWtGeEE9PSddXHJcbiAgICAgICAgY29uc3QgdXJsOiBzdHJpbmdbXSA9IFsnaHR0cHM6Ly9tbW9jZ2FtZS5xcGljLmNuL3dlY2hhdGdhbWUvOW05ZVFSZkdMck5XeThmRGplaWNkdG9MT0lJWkVBZlo3UDZ6RkJWZmMyYU9RdmU0OVdjdk5pY0Z0VDkxYUNjUUlCLzAnXVxyXG5cclxuICAgICAgICB0aGlzLm1fU0RLLm9uU2hhcmVBcHBNZXNzYWdlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn5Lq655Sf6YeN5byA5qih5ouf5ZmoJyxcclxuICAgICAgICAgICAgICAgIGltYWdlVXJsSWQ6IGlkWzBdLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2VVcmw6IHVybFswXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8g5pyL5Y+L5ZyIXHJcbiAgICAgICAgdGhpcy5tX1NESy5vblNoYXJlVGltZWxpbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfkurrnlJ/ph43lvIDmqKHmi5/lmagnLFxyXG4gICAgICAgICAgICAgICAgLy8gaW1hZ2VVcmw6ICcnLCAvLyDlm77niYcgVVJMXHJcbiAgICAgICAgICAgICAgICAvLyBxdWVyeTogJ2E9MSZiPTInXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8v5Li75Yqo5YiG5LqrXHJcbiAgICBTaGFyZShjYWxsYmFjazogKHN1Y2Nlc3M6IGJvb2xlYW4pID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICAvLyBsZXQgcmFuZG9tID0gQ29tbW9uLmdldFJhbmRvbSgwLCAxKVxyXG4gICAgICAgIGNvbnN0IGlkOiBzdHJpbmdbXSA9IFsnQ3p2cWltVitTc1NQMjNQclpBa0Z4QT09J11cclxuICAgICAgICBjb25zdCB1cmw6IHN0cmluZ1tdID0gWydodHRwczovL21tb2NnYW1lLnFwaWMuY24vd2VjaGF0Z2FtZS85bTllUVJmR0xyTld5OGZEamVpY2R0b0xPSUlaRUFmWjdQNnpGQlZmYzJhT1F2ZTQ5V2N2TmljRnRUOTFhQ2NRSUIvMCddXHJcblxyXG4gICAgICAgIHRoaXMubV9TREsuc2hhcmVBcHBNZXNzYWdlKHtcclxuICAgICAgICAgICAgdGl0bGU6IFwi5Lq655Sf6YeN5byA5qih5ouf5ZmoXCIsXHJcbiAgICAgICAgICAgIGltYWdlVXJsOiB1cmxbMF0sXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBHYW1lQ2x1YkJ1dHRvbigpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZUJ0bikge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVCdG4uZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVCdG4gPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHdpblNpemUxID0gdGhpcy5tX1NESy5nZXRTeXN0ZW1JbmZvU3luYygpO1xyXG4gICAgICAgIHRoaXMuZ2FtZUJ0biA9IHRoaXMubV9TREsuY3JlYXRlR2FtZUNsdWJCdXR0b24oe1xyXG4gICAgICAgICAgICAvLyBpY29uOiAnZ3JlZW4nLFxyXG4gICAgICAgICAgICBpbWFnZTogJ2h0dHBzOi8vYnloY2RuLjMzMzY2Njk5OS5jbHViL2ljb24vMS9CdG5feW91eGlxdWFuLnBuZycsXHJcbiAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0OiB3aW5TaXplMS53aW5kb3dXaWR0aCAtIDEwMCxcclxuICAgICAgICAgICAgICAgIHRvcDogd2luU2l6ZTEud2luZG93SGVpZ2h0IC8gMiAtIDEyMCxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA3NiAqIDAuNSxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogNzUgKiAwLjUsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuZ2FtZUNsdWJIaWRpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBnYW1lQ2x1YlNIb3coKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZUJ0bikgdGhpcy5nYW1lQnRuLnNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICBnYW1lQ2x1YkhpZGluZygpIHtcclxuICAgICAgICBpZiAodGhpcy5nYW1lQnRuKSB0aGlzLmdhbWVCdG4uaGlkZSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnYW1lQ2x1YkhpZGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZUJ0bikge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVCdG4uZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVCdG4gPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy/pmpDol4/mjInpkq5cclxuICAgIEhJREVfTUVOVSgpIHtcclxuICAgICAgICB0aGlzLm1fU0RLLmhpZGVTaGFyZU1lbnUoKVxyXG4gICAgfVxyXG5cclxuICAgIFBsYXRmb3JtTmFtZSgpIHtcclxuICAgICAgICByZXR1cm4gJ3dlQ2hhdFBsYXRmb3JtJztcclxuICAgIH1cclxufVxyXG4iXX0=