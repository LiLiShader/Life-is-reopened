
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/Scripts/AD/AD_ROOT');
require('./assets/Scripts/AD/Global');
require('./assets/Scripts/AD/PlatformBase');
require('./assets/Scripts/AD/weChatPlatform');
require('./assets/Scripts/Main/Entry');
require('./assets/Scripts/Main/Load');
require('./assets/Scripts/Main/Main');
require('./assets/Scripts/Main/ResMgr');
require('./assets/Scripts/Main/achievement');
require('./assets/Scripts/Main/condition');
require('./assets/Scripts/Main/evenList');
require('./assets/Scripts/Main/summary');
require('./assets/Scripts/Other/Box');
require('./assets/Scripts/Other/DataBase');
require('./assets/Scripts/Other/GlobalDefine');
require('./assets/Scripts/Other/SaveUtils');
require('./assets/Scripts/Other/ScrollviewMgr');
require('./assets/Scripts/Other/UserModel');

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
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/AD/PlatformBase.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '68cdb3MNg1Deq1KV1V3dMzo', 'PlatformBase');
// Scripts/AD/PlatformBase.ts

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
/**
 * 广告类基类
 */
var PlatformBase = /** @class */ (function (_super) {
    __extends(PlatformBase, _super);
    function PlatformBase() {
        var _this = _super.call(this) || this;
        _this._audioIDs = {};
        _this._enabledBgm = true;
        _this._enabledShock = true;
        _this._enableMusic = true;
        _this.platformName = 'H';
        _this.adTime = 0;
        var sound = cc.sys.localStorage.getItem("escapesoundset");
        // var shock = cc.sys.localStorage.getItem('escapeshockset');
        if (sound && sound.length > 0) {
            sound = sound.split(":");
            _this.enabledBgm = sound[0] == "1";
            _this.enabledShock = sound[1] == "1";
        }
        return _this;
        // this.innerAudioContext = wx.createInnerAudioContext();
    }
    PlatformBase.prototype.saveSetting = function () {
        try {
            cc.sys.localStorage.setItem("escapesoundset", (this.enabledBgm ? 1 : 0) + ":" + (this.enabledShock ? 1 : 0));
            // cc.sys.localStorage.setItem("escapeshockset",(this.enableMusic?1:0));
        }
        catch (err) {
        }
    };
    PlatformBase.prototype.setupDB = function () {
    };
    /**
  * 登录
  * @param callback  回调
  */
    PlatformBase.prototype.login = function (callback) {
    };
    /**
     * 分享
     * @param callback 分享回调 返回是否成功
     */
    PlatformBase.prototype.Share = function (callback) {
    };
    // /**
    //  * 看广告
    //  * @param callback 回调 返回是否成功
    //  */
    // public watchAd(callback: Function, errorVideo: Function): void {
    // }
    /**
     * 广告优先于分享
     * @param callback 回调 返回是否成功
     */
    PlatformBase.prototype.adShare = function (callback) {
    };
    PlatformBase.prototype.showBannerad = function (id) {
        // MsgMgr.emit(MsgEnums.UPDATE_ICON, true)
    };
    PlatformBase.prototype.hideBanner = function () {
        // MsgMgr.emit(MsgEnums.UPDATE_ICON, false)
    };
    PlatformBase.prototype.showBannerad1 = function () {
    };
    PlatformBase.prototype.gameClubHiding = function () {
    };
    /**
     * 检查是否关注抖音号
     */
    PlatformBase.prototype.checkFollowAwemeState = function (callback) {
    };
    /**
     * 创建抖音桌面快捷方式
     */
    PlatformBase.prototype.addShortcut = function () {
    };
    /**
     * 播放背景音乐
     */
    PlatformBase.prototype.playBGM = function (url) {
        this._bgm = url;
        // console.log("playBGM", url, this._bgmaudioID)
        if (this._bgmaudioID != undefined) {
            cc.audioEngine.stop(this._bgmaudioID);
        }
        cc.resources.load("sounds/" + url, cc.AudioClip, function (err, clip) {
            if (err || this._bgm != url) {
                return;
            }
            if (this._enabledBgm) {
                this._bgmaudioID = cc.audioEngine.play(clip, true, 1);
            }
        }.bind(this));
    };
    Object.defineProperty(PlatformBase.prototype, "enabledBgm", {
        get: function () {
            return this._enabledBgm;
        },
        set: function (value) {
            this._enabledBgm = value;
            this.saveSetting();
            if (this._enabledBgm) {
                this.playBGM(this._bgm);
            }
            else {
                if (this._bgmaudioID != undefined) {
                    cc.audioEngine.stop(this._bgmaudioID);
                }
                this._bgmaudioID = undefined;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlatformBase.prototype, "enabledShock", {
        get: function () {
            return this._enabledShock;
        },
        set: function (value) {
            this._enabledShock = value;
            this.saveSetting();
        },
        enumerable: false,
        configurable: true
    });
    PlatformBase.prototype.pause = function () {
        if (this._bgmaudioID != undefined) {
            cc.audioEngine.pause(this._bgmaudioID);
        }
    };
    PlatformBase.prototype.debugOn = function () {
    };
    PlatformBase.prototype.showCreateCustomAd = function () {
    };
    PlatformBase.prototype.hideCreateCustomAd = function () {
    };
    /**
     * 关注抖音号
     */
    PlatformBase.prototype.awemeUser = function () {
    };
    PlatformBase.prototype.LOAD_BANNER1 = function () {
    };
    /**
     * 游戏圈
     */
    PlatformBase.prototype.GameClubButton = function () {
    };
    /**
     * 跳转视频播放页
     */
    PlatformBase.prototype.navigateToVideoView = function (id) {
    };
    PlatformBase.prototype.gameClubSHow = function () {
    };
    PlatformBase.prototype.gameClubHide = function () {
    };
    PlatformBase.prototype.LOAD_BANNER2 = function () {
    };
    PlatformBase.prototype.goto = function (appId, path, id, num, callback) {
        // var names = {};
        // let ss = id.name
        // names['ss'] = 1
        // console.log(names)
    };
    PlatformBase.prototype.subscribe = function (callback) {
    };
    PlatformBase.prototype.resume = function () {
        if (this._bgmaudioID != undefined) {
            cc.audioEngine.resume(this._bgmaudioID);
        }
    };
    PlatformBase.prototype.ShowWechatAppBox = function () {
    };
    PlatformBase.prototype.SHOW_NATIVE_BANNER = function (loadImage) {
    };
    PlatformBase.prototype.CLICK_NATIVE_INTER = function () {
    };
    PlatformBase.prototype.showInterstitialAd = function () {
    };
    PlatformBase.prototype.hideInterstitialAd = function () {
    };
    PlatformBase.prototype.CLICK_NATIVE_BANNER = function () {
    };
    PlatformBase.prototype.LOAD_BANNER = function () {
    };
    /**
     * @param  callback 录屏回调 返回是否成功
    */
    PlatformBase.prototype.shareViode = function (callback) {
    };
    /**
     * 开始录屏
     */
    PlatformBase.prototype.StartRecorder = function () {
    };
    /**
     * 停止录屏
     */
    PlatformBase.prototype.stopRecorder = function () {
    };
    /**
     * 安卓接口调用
     */
    PlatformBase.prototype.AndroidAPK = function (index) {
    };
    /*******************************广告********************************** */
    /**
     * 创建banner
     */
    PlatformBase.prototype.CREATE_BANNER = function () {
    };
    /**
      * 加载banner
      */
    PlatformBase.prototype.ONLOAD_BANNER = function () {
    };
    /**
      * 展示banner
      */
    PlatformBase.prototype.SHOW_BANNER = function () {
    };
    /**
      * 隐藏banner
      */
    PlatformBase.prototype.HIDE_BANNER = function () {
    };
    /**
      * 销毁banner
      */
    PlatformBase.prototype.DESTROY_BANNER = function () {
    };
    /**
      * 创建激励视频
      */
    PlatformBase.prototype.CREATE_VIDEO = function (uuId) {
    };
    /**
     * 加载激励视频
     */
    PlatformBase.prototype.LOAD_VIDEO = function () {
    };
    /**
     * 展示激励视频
     */
    PlatformBase.prototype.SHOW_VIDEO = function (index) {
    };
    /**
       * 看广告
       * @param goodVideo 回调 返回成功
       * @param errorVideo 回调 返回失败
       * @param unLoadVideo 回调 无法加载视频
    */
    PlatformBase.prototype.CLOSE_VIDEO = function (goodVideo, errorVideo, unLoadVideo, ID) {
    };
    /**
     * 销毁广告
     */
    PlatformBase.prototype.DESTROY_VIDEO = function () {
    };
    /**
       * 创建插屏
    */
    PlatformBase.prototype.CREATE_TITIALAD = function (uuId) {
    };
    /**
       * 加载插屏
    */
    PlatformBase.prototype.LOAD_TITIALAD = function () {
    };
    /**
     * 展示插屏
    */
    PlatformBase.prototype.SHOW_TITIALAD = function () {
    };
    PlatformBase.prototype.SHOW_TITIALAD1 = function () {
    };
    /**
    * 关闭插屏
    */
    PlatformBase.prototype.CLOSE_TITIALAD = function () {
    };
    PlatformBase.prototype.SHOW_NATIVE_INTER = function (image) {
    };
    /**
     * 展示原生
     * @param loadImage
     */
    PlatformBase.prototype.SHOW_NATIVE = function (loadImage) {
    };
    /**
     * 点击原生
     */
    PlatformBase.prototype.CLICK_NATIVE = function (adId) {
    };
    /**
     * 销毁原生
     */
    PlatformBase.prototype.DESTROY_NATIVE = function () {
    };
    /**
    * 微信点击曝光
    */
    PlatformBase.prototype.reportUserBehaviorBranchAnalytics = function (uid, Type) {
    };
    /**
     * 友盟自定义事件上报
     * @param type 事件id
     * @param param 属性
     */
    PlatformBase.prototype.trackEvent = function (type, param) {
    };
    /**
     * 手机短震动
     */
    PlatformBase.prototype.VibrateShort = function (type, success, fail, complete) {
    };
    /**
     * 手机长震动
     */
    PlatformBase.prototype.VibrateLong = function (success, fail, complete) {
    };
    /**
     * 渠道名字
     */
    PlatformBase.prototype.PlatformName = function () {
        return "PlatformBase";
    };
    return PlatformBase;
}(cc.Component));
exports.default = PlatformBase;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQURcXFBsYXRmb3JtQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpRUE7O0dBRUc7QUFFSDtJQUEwQyxnQ0FBWTtJQWFwRDtRQUFBLFlBQ0UsaUJBQU8sU0FTUjtRQXJCUyxlQUFTLEdBQVEsRUFBRSxDQUFDO1FBR3BCLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBQzVCLG1CQUFhLEdBQVksSUFBSSxDQUFDO1FBQzlCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBQ2hDLGtCQUFZLEdBQUcsR0FBRyxDQUFBO1FBRWxCLFlBQU0sR0FBVyxDQUFDLENBQUM7UUFLeEIsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDMUQsNkRBQTZEO1FBQzdELElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzdCLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQztZQUNsQyxLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUM7U0FDckM7O1FBQ0QseURBQXlEO0lBQzNELENBQUM7SUFFUyxrQ0FBVyxHQUFyQjtRQUNFLElBQUk7WUFDRixFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FB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RUQ7O09BRUc7SUFDSSxxQ0FBYyxHQUFyQjtJQUVBLENBQUM7SUFFRDs7TUFFRTtJQUNLLHdEQUFpQyxHQUF4QyxVQUF5QyxHQUFHLEVBQUUsSUFBSTtJQUVsRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLGlDQUFVLEdBQWpCLFVBQWtCLElBQVksRUFBRSxLQUFjO0lBRTlDLENBQUM7SUFFRDs7T0FFRztJQUNJLG1DQUFZLEdBQW5CLFVBQW9CLElBQVksRUFBRSxPQUFrQixFQUFFLElBQWUsRUFBRSxRQUFtQjtJQUUxRixDQUFDO0lBRUQ7O09BRUc7SUFDSSxrQ0FBVyxHQUFsQixVQUFtQixPQUFrQixFQUFFLElBQWUsRUFBRSxRQUFtQjtJQUUzRSxDQUFDO0lBRUQ7O09BRUc7SUFDSSxtQ0FBWSxHQUFuQjtRQUNFLE9BQU8sY0FBYyxDQUFBO0lBQ3ZCLENBQUM7SUFDSCxtQkFBQztBQUFELENBN2FBLEFBNmFDLENBN2F5QyxFQUFFLENBQUMsU0FBUyxHQTZhckQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLyoqXHJcbiAqIOW5v+WRiuaOpeWPo+exu1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJQmFubmVyQWQge1xyXG4gIHNob3c6IEZ1bmN0aW9uXHJcbiAgaGlkZTogRnVuY3Rpb25cclxuICBvZmZSZXNpemU6IEZ1bmN0aW9uXHJcbiAgc3R5bGU6IG9iamVjdFxyXG4gIG9uTG9hZDogRnVuY3Rpb25cclxuICBvZmZMb2FkOiBGdW5jdGlvblxyXG4gIG9mZkNsb3NlOiBGdW5jdGlvblxyXG4gIG9uRXJyb3I6IEZ1bmN0aW9uXHJcbiAgb2ZmRXJyb3I6IEZ1bmN0aW9uXHJcbiAgb25SZXNpemU6IEZ1bmN0aW9uXHJcbiAgZGVzdHJveTogRnVuY3Rpb25cclxuXHJcbiAgLyoqXHJcbiAgICog5omL5Yqo5YWz6Zet5bm/5ZGKXHJcbiAgICovXHJcbiAgb25IaWRlOiBGdW5jdGlvblxyXG4gIG9uQ2xvc2U6IEZ1bmN0aW9uXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJld2FyZFZpZGVvQWQge1xyXG4gIGxvYWQ6IEZ1bmN0aW9uXHJcbiAgc2hvdzogRnVuY3Rpb25cclxuICBoaWRlOiBGdW5jdGlvblxyXG4gIG9mZlJlc2l6ZTogRnVuY3Rpb25cclxuICBzdHlsZTogb2JqZWN0XHJcbiAgb25Mb2FkOiBGdW5jdGlvblxyXG4gIG9mZkxvYWQ6IEZ1bmN0aW9uXHJcbiAgb25FcnJvcjogRnVuY3Rpb25cclxuICBvZmZFcnJvcjogRnVuY3Rpb25cclxuICBvblJlc2l6ZTogRnVuY3Rpb25cclxuICBkZXN0cm95OiBGdW5jdGlvblxyXG4gIG9uQ2xvc2U6IEZ1bmN0aW9uXHJcbiAgb2ZmQ2xvc2U6IEZ1bmN0aW9uXHJcbiAgb25TaG93OiBGdW5jdGlvblxyXG4gIG9mZlNob3c6IEZ1bmN0aW9uXHJcbn1cclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElOYXRpdmVBZCB7XHJcblxyXG4gIGxvYWQ6IEZ1bmN0aW9uXHJcbiAgc2hvdzogRnVuY3Rpb25cclxuICBoaWRlOiBGdW5jdGlvblxyXG4gIG9mZlJlc2l6ZTogRnVuY3Rpb25cclxuICBzdHlsZTogb2JqZWN0XHJcbiAgb25Mb2FkOiBGdW5jdGlvblxyXG4gIG9mZkxvYWQ6IEZ1bmN0aW9uXHJcbiAgb25FcnJvcjogRnVuY3Rpb25cclxuICBvZmZFcnJvcjogRnVuY3Rpb25cclxuICBvblJlc2l6ZTogRnVuY3Rpb25cclxuICBkZXN0cm95OiBGdW5jdGlvblxyXG4gIG9uQ2xvc2U6IEZ1bmN0aW9uXHJcbiAgb2ZmQ2xvc2U6IEZ1bmN0aW9uXHJcbiAgb25TaG93OiBGdW5jdGlvblxyXG4gIG9mZlNob3c6IEZ1bmN0aW9uXHJcbiAgcmVwb3J0QWRTaG93OiBGdW5jdGlvblxyXG4gIHJlcG9ydEFkQ2xpY2s6IEZ1bmN0aW9uXHJcbn1cclxuXHJcblxyXG4vKipcclxuICog5bm/5ZGK57G75Z+657G7XHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxhdGZvcm1CYXNlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgcHJvdGVjdGVkIF9hdWRpb0lEczogYW55ID0ge307XHJcbiAgcHJvdGVjdGVkIF9iZ21hdWRpb0lEOiBudW1iZXI7XHJcbiAgcHJvdGVjdGVkIF9iZ206IHN0cmluZztcclxuICBwcm90ZWN0ZWQgX2VuYWJsZWRCZ206IGJvb2xlYW4gPSB0cnVlO1xyXG4gIHByb3RlY3RlZCBfZW5hYmxlZFNob2NrOiBib29sZWFuID0gdHJ1ZTtcclxuICBwcm90ZWN0ZWQgX2VuYWJsZU11c2ljOiBib29sZWFuID0gdHJ1ZTtcclxuICBwdWJsaWMgcGxhdGZvcm1OYW1lID0gJ0gnXHJcbiAgcHJvdGVjdGVkIGlubmVyQXVkaW9Db250ZXh0O1xyXG4gIHB1YmxpYyBhZFRpbWU6IG51bWJlciA9IDA7XHJcbiAgcHVibGljIHNoYXJlQ2FsbGJhY2s6IEZ1bmN0aW9uO1xyXG4gIHB1YmxpYyBzaGFyZUNhbGxiYWNrMTogRnVuY3Rpb247XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdmFyIHNvdW5kID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiZXNjYXBlc291bmRzZXRcIik7XHJcbiAgICAvLyB2YXIgc2hvY2sgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2VzY2FwZXNob2Nrc2V0Jyk7XHJcbiAgICBpZiAoc291bmQgJiYgc291bmQubGVuZ3RoID4gMCkge1xyXG4gICAgICBzb3VuZCA9IHNvdW5kLnNwbGl0KFwiOlwiKTtcclxuICAgICAgdGhpcy5lbmFibGVkQmdtID0gc291bmRbMF0gPT0gXCIxXCI7XHJcbiAgICAgIHRoaXMuZW5hYmxlZFNob2NrID0gc291bmRbMV0gPT0gXCIxXCI7XHJcbiAgICB9XHJcbiAgICAvLyB0aGlzLmlubmVyQXVkaW9Db250ZXh0ID0gd3guY3JlYXRlSW5uZXJBdWRpb0NvbnRleHQoKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBzYXZlU2V0dGluZygpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImVzY2FwZXNvdW5kc2V0XCIsICh0aGlzLmVuYWJsZWRCZ20gPyAxIDogMCkgKyBcIjpcIiArICh0aGlzLmVuYWJsZWRTaG9jayA/IDEgOiAwKSk7XHJcbiAgICAgIC8vIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImVzY2FwZXNob2Nrc2V0XCIsKHRoaXMuZW5hYmxlTXVzaWM/MTowKSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgcHVibGljIHNldHVwREIoKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiog55m75b2VXHJcbiogQHBhcmFtIGNhbGxiYWNrICDlm57osINcclxuKi9cclxuICBwdWJsaWMgbG9naW4oY2FsbGJhY2s6IChkYXRhOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcclxuXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIOWIhuS6q1xyXG4gICAqIEBwYXJhbSBjYWxsYmFjayDliIbkuqvlm57osIMg6L+U5Zue5piv5ZCm5oiQ5YqfXHJcbiAgICovXHJcbiAgcHVibGljIFNoYXJlKGNhbGxiYWNrOiAoc3VjY2VzczogYm9vbGVhbikgPT4gdm9pZCk6IHZvaWQge1xyXG5cclxuICB9XHJcbiAgLy8gLyoqXHJcbiAgLy8gICog55yL5bm/5ZGKXHJcbiAgLy8gICogQHBhcmFtIGNhbGxiYWNrIOWbnuiwgyDov5Tlm57mmK/lkKbmiJDlip9cclxuICAvLyAgKi9cclxuICAvLyBwdWJsaWMgd2F0Y2hBZChjYWxsYmFjazogRnVuY3Rpb24sIGVycm9yVmlkZW86IEZ1bmN0aW9uKTogdm9pZCB7XHJcblxyXG4gIC8vIH1cclxuICAvKipcclxuICAgKiDlub/lkYrkvJjlhYjkuo7liIbkuqtcclxuICAgKiBAcGFyYW0gY2FsbGJhY2sg5Zue6LCDIOi/lOWbnuaYr+WQpuaIkOWKn1xyXG4gICAqL1xyXG4gIHB1YmxpYyBhZFNoYXJlKGNhbGxiYWNrOiAoc3VjY2VzczogYm9vbGVhbikgPT4gdm9pZCk6IHZvaWQge1xyXG5cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzaG93QmFubmVyYWQoaWQ/OiBzdHJpbmcpIHtcclxuICAgIC8vIE1zZ01nci5lbWl0KE1zZ0VudW1zLlVQREFURV9JQ09OLCB0cnVlKVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGhpZGVCYW5uZXIoKSB7XHJcbiAgICAvLyBNc2dNZ3IuZW1pdChNc2dFbnVtcy5VUERBVEVfSUNPTiwgZmFsc2UpXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2hvd0Jhbm5lcmFkMSgpIHtcclxuXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2FtZUNsdWJIaWRpbmcoKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5qOA5p+l5piv5ZCm5YWz5rOo5oqW6Z+z5Y+3XHJcbiAgICovXHJcbiAgY2hlY2tGb2xsb3dBd2VtZVN0YXRlKGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG5cclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiDliJvlu7rmipbpn7PmoYzpnaLlv6vmjbfmlrnlvI9cclxuICAgKi9cclxuICBhZGRTaG9ydGN1dCgpIHtcclxuXHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIOaSreaUvuiDjOaZr+mfs+S5kFxyXG4gICAqL1xyXG4gIHB1YmxpYyBwbGF5QkdNKHVybDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9iZ20gPSB1cmw7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcInBsYXlCR01cIiwgdXJsLCB0aGlzLl9iZ21hdWRpb0lEKVxyXG4gICAgaWYgKHRoaXMuX2JnbWF1ZGlvSUQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3AodGhpcy5fYmdtYXVkaW9JRCk7XHJcbiAgICB9XHJcbiAgICBjYy5yZXNvdXJjZXMubG9hZChcInNvdW5kcy9cIiArIHVybCwgY2MuQXVkaW9DbGlwLCBmdW5jdGlvbiAoZXJyLCBjbGlwKSB7XHJcbiAgICAgIGlmIChlcnIgfHwgdGhpcy5fYmdtICE9IHVybCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5fZW5hYmxlZEJnbSkge1xyXG4gICAgICAgIHRoaXMuX2JnbWF1ZGlvSUQgPSBjYy5hdWRpb0VuZ2luZS5wbGF5KGNsaXAsIHRydWUsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9LmJpbmQodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCBlbmFibGVkQmdtKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9lbmFibGVkQmdtID0gdmFsdWU7XHJcbiAgICB0aGlzLnNhdmVTZXR0aW5nKCk7XHJcbiAgICBpZiAodGhpcy5fZW5hYmxlZEJnbSkge1xyXG4gICAgICB0aGlzLnBsYXlCR00odGhpcy5fYmdtKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuX2JnbWF1ZGlvSUQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcCh0aGlzLl9iZ21hdWRpb0lEKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLl9iZ21hdWRpb0lEID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBlbmFibGVkQmdtKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2VuYWJsZWRCZ207XHJcbiAgfVxyXG5cclxuXHJcbiAgcHVibGljIHNldCBlbmFibGVkU2hvY2sodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2VuYWJsZWRTaG9jayA9IHZhbHVlO1xyXG4gICAgdGhpcy5zYXZlU2V0dGluZygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBlbmFibGVkU2hvY2soKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZW5hYmxlZFNob2NrO1xyXG4gIH1cclxuXHJcblxyXG4gIHB1YmxpYyBwYXVzZSgpIHtcclxuICAgIGlmICh0aGlzLl9iZ21hdWRpb0lEICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZSh0aGlzLl9iZ21hdWRpb0lEKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBkZWJ1Z09uKCkge1xyXG5cclxuICB9XHJcblxyXG4gIHNob3dDcmVhdGVDdXN0b21BZCgpIHtcclxuICB9XHJcblxyXG4gIGhpZGVDcmVhdGVDdXN0b21BZCgpIHtcclxuICB9XHJcbiAgLyoqXHJcbiAgICog5YWz5rOo5oqW6Z+z5Y+3XHJcbiAgICovXHJcbiAgcHVibGljIGF3ZW1lVXNlcigpIHtcclxuXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgTE9BRF9CQU5ORVIxKCkge1xyXG5cclxuICB9XHJcbiAgLyoqXHJcbiAgICog5ri45oiP5ZyIXHJcbiAgICovXHJcbiAgR2FtZUNsdWJCdXR0b24oKSB7XHJcblxyXG4gIH1cclxuICAvKipcclxuICAgKiDot7Povazop4bpopHmkq3mlL7pobVcclxuICAgKi9cclxuICBwdWJsaWMgbmF2aWdhdGVUb1ZpZGVvVmlldyhpZCkge1xyXG5cclxuICB9XHJcblxyXG4gIGdhbWVDbHViU0hvdygpIHtcclxuXHJcbiAgfVxyXG5cclxuICBnYW1lQ2x1YkhpZGUoKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgcHVibGljIExPQURfQkFOTkVSMigpIHtcclxuXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ290byhhcHBJZDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIGlkOiBzdHJpbmcsIG51bTogbnVtYmVyLCBjYWxsYmFjazogKCkgPT4gdm9pZCkge1xyXG4gICAgLy8gdmFyIG5hbWVzID0ge307XHJcbiAgICAvLyBsZXQgc3MgPSBpZC5uYW1lXHJcbiAgICAvLyBuYW1lc1snc3MnXSA9IDFcclxuICAgIC8vIGNvbnNvbGUubG9nKG5hbWVzKVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHN1YnNjcmliZShjYWxsYmFjazogKCkgPT4gdm9pZCkge1xyXG5cclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXN1bWUoKSB7XHJcbiAgICBpZiAodGhpcy5fYmdtYXVkaW9JRCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgY2MuYXVkaW9FbmdpbmUucmVzdW1lKHRoaXMuX2JnbWF1ZGlvSUQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIHB1YmxpYyBTaG93V2VjaGF0QXBwQm94KCkge1xyXG5cclxuICB9XHJcblxyXG5cclxuICBwdWJsaWMgU0hPV19OQVRJVkVfQkFOTkVSKGxvYWRJbWFnZTogRnVuY3Rpb24pIHtcclxuXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQ0xJQ0tfTkFUSVZFX0lOVEVSKCkge1xyXG5cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzaG93SW50ZXJzdGl0aWFsQWQoKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgcHVibGljIGhpZGVJbnRlcnN0aXRpYWxBZCgpIHtcclxuXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQ0xJQ0tfTkFUSVZFX0JBTk5FUigpIHtcclxuXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgTE9BRF9CQU5ORVIoKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtICBjYWxsYmFjayDlvZXlsY/lm57osIMg6L+U5Zue5piv5ZCm5oiQ5YqfIFxyXG4gICovXHJcbiAgcHVibGljIHNoYXJlVmlvZGUoY2FsbGJhY2s6IChzdWNjZXNzOiBib29sZWFuKSA9PiB2b2lkKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5byA5aeL5b2V5bGPXHJcbiAgICovXHJcbiAgcHVibGljIFN0YXJ0UmVjb3JkZXIoKSB7XHJcblxyXG4gIH1cclxuICAvKipcclxuICAgKiDlgZzmraLlvZXlsY9cclxuICAgKi9cclxuICBwdWJsaWMgc3RvcFJlY29yZGVyKCkge1xyXG5cclxuICB9XHJcbiAgLyoqXHJcbiAgICog5a6J5Y2T5o6l5Y+j6LCD55SoXHJcbiAgICovXHJcbiAgcHVibGljIEFuZHJvaWRBUEsoaW5kZXg/OiBzdHJpbmcpIHtcclxuICB9XHJcblxyXG5cclxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuW5v+WRiioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIOWIm+W7umJhbm5lclxyXG4gICAqL1xyXG4gIHB1YmxpYyBDUkVBVEVfQkFOTkVSKCkge1xyXG5cclxuICB9XHJcbiAgLyoqXHJcbiAgICAqIOWKoOi9vWJhbm5lclxyXG4gICAgKi9cclxuICBwdWJsaWMgT05MT0FEX0JBTk5FUigpIHtcclxuXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAgKiDlsZXnpLpiYW5uZXJcclxuICAgICovXHJcbiAgcHVibGljIFNIT1dfQkFOTkVSKCkge1xyXG5cclxuICB9XHJcbiAgLyoqXHJcbiAgICAqIOmakOiXj2Jhbm5lclxyXG4gICAgKi9cclxuICBwdWJsaWMgSElERV9CQU5ORVIoKSB7XHJcblxyXG4gIH1cclxuICAvKipcclxuICAgICog6ZSA5q+BYmFubmVyXHJcbiAgICAqL1xyXG4gIHB1YmxpYyBERVNUUk9ZX0JBTk5FUigpIHtcclxuXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAgKiDliJvlu7rmv4DlirHop4bpopFcclxuICAgICovXHJcbiAgcHVibGljIENSRUFURV9WSURFTyh1dUlkOiBzdHJpbmcpIHtcclxuXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIOWKoOi9vea/gOWKseinhumikVxyXG4gICAqL1xyXG4gIHB1YmxpYyBMT0FEX1ZJREVPKCkge1xyXG5cclxuICB9XHJcbiAgLyoqXHJcbiAgICog5bGV56S65r+A5Yqx6KeG6aKRXHJcbiAgICovXHJcbiAgcHVibGljIFNIT1dfVklERU8oaW5kZXg/OiBzdHJpbmcpIHtcclxuXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAgICog55yL5bm/5ZGKXHJcbiAgICAgKiBAcGFyYW0gZ29vZFZpZGVvIOWbnuiwgyDov5Tlm57miJDlip9cclxuICAgICAqIEBwYXJhbSBlcnJvclZpZGVvIOWbnuiwgyDov5Tlm57lpLHotKVcclxuICAgICAqIEBwYXJhbSB1bkxvYWRWaWRlbyDlm57osIMg5peg5rOV5Yqg6L296KeG6aKRXHJcbiAgKi9cclxuICBwdWJsaWMgQ0xPU0VfVklERU8oZ29vZFZpZGVvOiBGdW5jdGlvbiwgZXJyb3JWaWRlbz86IEZ1bmN0aW9uLCB1bkxvYWRWaWRlbz86IEZ1bmN0aW9uLCBJRD86IHN0cmluZykge1xyXG5cclxuICB9XHJcbiAgLyoqXHJcbiAgICog6ZSA5q+B5bm/5ZGKXHJcbiAgICovXHJcbiAgcHVibGljIERFU1RST1lfVklERU8oKSB7XHJcblxyXG4gIH1cclxuICAvKipcclxuICAgICAqIOWIm+W7uuaPkuWxj1xyXG4gICovXHJcbiAgcHVibGljIENSRUFURV9USVRJQUxBRCh1dUlkOiBzdHJpbmcpIHtcclxuXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAgICog5Yqg6L295o+S5bGPXHJcbiAgKi9cclxuICBwdWJsaWMgTE9BRF9USVRJQUxBRCgpIHtcclxuXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIOWxleekuuaPkuWxj1xyXG4gICovXHJcbiAgcHVibGljIFNIT1dfVElUSUFMQUQoKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgcHVibGljIFNIT1dfVElUSUFMQUQxKCkge1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICog5YWz6Zet5o+S5bGPXHJcbiAgKi9cclxuICBwdWJsaWMgQ0xPU0VfVElUSUFMQUQoKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgcHVibGljIFNIT1dfTkFUSVZFX0lOVEVSKGltYWdlOiBGdW5jdGlvbikge1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWxleekuuWOn+eUn1xyXG4gICAqIEBwYXJhbSBsb2FkSW1hZ2UgXHJcbiAgICovXHJcbiAgcHVibGljIFNIT1dfTkFUSVZFKGxvYWRJbWFnZTogRnVuY3Rpb24pIHtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDngrnlh7vljp/nlJ9cclxuICAgKi9cclxuICBwdWJsaWMgQ0xJQ0tfTkFUSVZFKGFkSWQ6IHN0cmluZykge1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOmUgOavgeWOn+eUn1xyXG4gICAqL1xyXG4gIHB1YmxpYyBERVNUUk9ZX05BVElWRSgpIHtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIOW+ruS/oeeCueWHu+abneWFiVxyXG4gICovXHJcbiAgcHVibGljIHJlcG9ydFVzZXJCZWhhdmlvckJyYW5jaEFuYWx5dGljcyh1aWQsIFR5cGUpIHtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlj4vnm5/oh6rlrprkuYnkuovku7bkuIrmiqVcclxuICAgKiBAcGFyYW0gdHlwZSDkuovku7ZpZFxyXG4gICAqIEBwYXJhbSBwYXJhbSDlsZ7mgKdcclxuICAgKi9cclxuICBwdWJsaWMgdHJhY2tFdmVudCh0eXBlOiBzdHJpbmcsIHBhcmFtPzogb2JqZWN0KSB7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5omL5py655+t6ZyH5YqoXHJcbiAgICovXHJcbiAgcHVibGljIFZpYnJhdGVTaG9ydCh0eXBlOiBzdHJpbmcsIHN1Y2Nlc3M/OiBGdW5jdGlvbiwgZmFpbD86IEZ1bmN0aW9uLCBjb21wbGV0ZT86IEZ1bmN0aW9uKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5omL5py66ZW/6ZyH5YqoXHJcbiAgICovXHJcbiAgcHVibGljIFZpYnJhdGVMb25nKHN1Y2Nlc3M/OiBGdW5jdGlvbiwgZmFpbD86IEZ1bmN0aW9uLCBjb21wbGV0ZT86IEZ1bmN0aW9uKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5rig6YGT5ZCN5a2XXHJcbiAgICovXHJcbiAgcHVibGljIFBsYXRmb3JtTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIFwiUGxhdGZvcm1CYXNlXCJcclxuICB9XHJcbn0iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Main/Load.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a2584wLSlJFirFj84oKYr4L', 'Load');
// Scripts/Main/Load.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var SaveUtils_1 = require("../Other/SaveUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Load = /** @class */ (function (_super) {
    __extends(Load, _super);
    function Load() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.progressBar = null;
        _this.time = 0;
        _this.flag = true;
        return _this;
    }
    Load.prototype.onLoad = function () {
        SaveUtils_1.default.inst.getLocalData();
    };
    Load.prototype.update = function (dt) {
        this.time += 1 / 60;
        if (this.time >= 2 && this.flag) {
            cc.director.loadScene('LifeRebirth', function () {
            });
            this.flag = false;
        }
        var num;
        if (this.time / 2 >= 1) {
            num = 1;
        }
        else {
            num = this.time / 2;
        }
        this.progressBar.node.children[0].width = 562 * num;
    };
    __decorate([
        property(cc.ProgressBar)
    ], Load.prototype, "progressBar", void 0);
    Load = __decorate([
        ccclass
    ], Load);
    return Load;
}(cc.Component));
exports.default = Load;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWFpblxcTG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBMkM7QUFFckMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBa0Msd0JBQVk7SUFBOUM7UUFBQSxxRUE2QkM7UUExQkcsaUJBQVcsR0FBbUIsSUFBSSxDQUFDO1FBRTNCLFVBQUksR0FBVyxDQUFDLENBQUE7UUFDaEIsVUFBSSxHQUFZLElBQUksQ0FBQTs7SUF1QmhDLENBQUM7SUFwQkcscUJBQU0sR0FBTjtRQUNJLG1CQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFBO0lBQ2pDLENBQUM7SUFFRCxxQkFBTSxHQUFOLFVBQU8sRUFBRTtRQUNMLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtRQUNuQixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDN0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFO1lBRXJDLENBQUMsQ0FBQyxDQUFBO1lBQ0YsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUE7U0FDcEI7UUFDRCxJQUFJLEdBQUcsQ0FBQztRQUNSLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3BCLEdBQUcsR0FBRyxDQUFDLENBQUE7U0FDVjthQUFNO1lBQ0gsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFBO1NBQ3RCO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFBO0lBQ3ZELENBQUM7SUF6QkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzs2Q0FDVTtJQUhsQixJQUFJO1FBRHhCLE9BQU87T0FDYSxJQUFJLENBNkJ4QjtJQUFELFdBQUM7Q0E3QkQsQUE2QkMsQ0E3QmlDLEVBQUUsQ0FBQyxTQUFTLEdBNkI3QztrQkE3Qm9CLElBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2F2ZVV0aWxzIGZyb20gXCIuLi9PdGhlci9TYXZlVXRpbHNcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJvZ3Jlc3NCYXIpXHJcbiAgICBwcm9ncmVzc0JhcjogY2MuUHJvZ3Jlc3NCYXIgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgdGltZTogbnVtYmVyID0gMFxyXG4gICAgcHJpdmF0ZSBmbGFnOiBib29sZWFuID0gdHJ1ZVxyXG4gICAgcHJvdG9jb2w6IGNjLk5vZGU7XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIFNhdmVVdGlscy5pbnN0LmdldExvY2FsRGF0YSgpXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgdGhpcy50aW1lICs9IDEgLyA2MFxyXG4gICAgICAgIGlmICh0aGlzLnRpbWUgPj0gMiAmJiB0aGlzLmZsYWcpIHtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdMaWZlUmViaXJ0aCcsICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMuZmxhZyA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBudW07XHJcbiAgICAgICAgaWYgKHRoaXMudGltZSAvIDIgPj0gMSkge1xyXG4gICAgICAgICAgICBudW0gPSAxXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbnVtID0gdGhpcy50aW1lIC8gMlxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnByb2dyZXNzQmFyLm5vZGUuY2hpbGRyZW5bMF0ud2lkdGggPSA1NjIgKiBudW1cclxuICAgIH1cclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Other/DataBase.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a4ce0af4LhKk7SyTdWDJlQF', 'DataBase');
// Scripts/Other/DataBase.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataBase = /** @class */ (function () {
    function DataBase(saveKey) {
        this._delaytime = 0;
        this.saveDelay = 5000;
        this._saveKey = saveKey;
    }
    /**
     * 读取数据
     */
    DataBase.prototype.decode = function (json) {
        if (!json)
            json = cc.sys.localStorage.getItem(this._saveKey);
        if (json) {
            json = JSON.parse(json);
            for (var key in json) {
                this[key] = json[key];
            }
        }
        ;
    };
    Object.defineProperty(DataBase.prototype, "te", {
        get: function () {
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 转化
     */
    DataBase.prototype.encode = function () {
        var data = {};
        var user = JSON.parse(JSON.stringify(this));
        for (var key in user) {
            if (key == "_saveKey" || key == "saveDelay" || key == "_delaytime" || key == "instance")
                continue;
            data[key] = user[key];
        }
        return data;
    };
    /**
     * 延时保存
     */
    DataBase.prototype.delaySave = function () {
        if (this._delaytime == 0) {
            this._delaytime = setTimeout(this.save.bind(this), this.saveDelay);
        }
    };
    /**
     * 保存
     */
    DataBase.prototype.save = function () {
        this._delaytime = 0;
        var data = this.encode();
        cc.sys.localStorage.setItem(this._saveKey, JSON.stringify(data));
    };
    /**
     * 全部清除
     */
    DataBase.prototype.clear = function () {
        cc.sys.localStorage.clear();
    };
    /**
     * 清除一个
     */
    DataBase.prototype.removeItem = function () {
        cc.sys.localStorage.removeItem(this._saveKey);
    };
    return DataBase;
}());
exports.default = DataBase;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcT3RoZXJcXERhdGFCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7SUFJSSxrQkFBWSxPQUFjO1FBRmxCLGVBQVUsR0FBUSxDQUFDLENBQUM7UUFDckIsY0FBUyxHQUFVLElBQUksQ0FBQztRQUczQixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUM1QixDQUFDO0lBR0Q7O09BRUc7SUFDSSx5QkFBTSxHQUFiLFVBQWMsSUFBSztRQUVmLElBQUksQ0FBQyxJQUFJO1lBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0QsSUFBSSxJQUFJLEVBQ1I7WUFDSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUN2QixLQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFDbkI7Z0JBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN6QjtTQUNKO1FBQUEsQ0FBQztJQUNOLENBQUM7SUFHRCxzQkFBVyx3QkFBRTthQUFiO1lBRUksT0FBTyxDQUFDLENBQUM7UUFDYixDQUFDOzs7T0FBQTtJQUdEOztPQUVHO0lBQ0kseUJBQU0sR0FBYjtRQUVJLElBQUksSUFBSSxHQUFRLEVBQUUsQ0FBQztRQUVuQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM1QyxLQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFDbkI7WUFDSSxJQUFHLEdBQUcsSUFBRSxVQUFVLElBQUUsR0FBRyxJQUFFLFdBQVcsSUFBRSxHQUFHLElBQUUsWUFBWSxJQUFFLEdBQUcsSUFBRSxVQUFVO2dCQUFDLFNBQVM7WUFDbEYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7T0FFRztJQUNJLDRCQUFTLEdBQWhCO1FBRUksSUFBRyxJQUFJLENBQUMsVUFBVSxJQUFFLENBQUMsRUFDckI7WUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDckU7SUFDTCxDQUFDO0lBR0Q7O09BRUc7SUFDSSx1QkFBSSxHQUFYO1FBRUksSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3pCLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQ7O09BRUc7SUFDSSx3QkFBSyxHQUFaO1FBQ0ksRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDL0IsQ0FBQztJQUVEOztPQUVHO0lBQ0ksNkJBQVUsR0FBakI7UUFDSSxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2pELENBQUM7SUFDTCxlQUFDO0FBQUQsQ0FwRkEsQUFvRkMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhQmFzZXtcclxuICAgIHByaXZhdGUgX3NhdmVLZXk6c3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfZGVsYXl0aW1lOm51bWJlcj0wO1xyXG4gICAgcHVibGljIHNhdmVEZWxheTpudW1iZXIgPSA1MDAwO1xyXG4gICAgY29uc3RydWN0b3Ioc2F2ZUtleTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fc2F2ZUtleSA9IHNhdmVLZXk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOivu+WPluaVsOaNrlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVjb2RlKGpzb24/KVxyXG4gICAge1xyXG4gICAgICAgIGlmICghanNvbikganNvbiA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLl9zYXZlS2V5KTtcclxuICAgICAgICBpZiAoanNvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGpzb24gPSBKU09OLnBhcnNlKGpzb24pXHJcbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIGpzb24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IGpzb25ba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IHRlKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L2s5YyWXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbmNvZGUoKTphbnlcclxuICAgIHtcclxuICAgICAgICB2YXIgZGF0YTogYW55ID0ge307XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHVzZXIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKTtcclxuICAgICAgICBmb3IodmFyIGtleSBpbiB1c2VyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoa2V5PT1cIl9zYXZlS2V5XCJ8fGtleT09XCJzYXZlRGVsYXlcInx8a2V5PT1cIl9kZWxheXRpbWVcInx8a2V5PT1cImluc3RhbmNlXCIpY29udGludWU7XHJcbiAgICAgICAgICAgIGRhdGFba2V5XSA9IHVzZXJba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlu7bml7bkv53lrZhcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRlbGF5U2F2ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5fZGVsYXl0aW1lPT0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fZGVsYXl0aW1lID0gc2V0VGltZW91dCh0aGlzLnNhdmUuYmluZCh0aGlzKSx0aGlzLnNhdmVEZWxheSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDkv53lrZhcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNhdmUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX2RlbGF5dGltZSA9IDA7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmVuY29kZSgpO1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLl9zYXZlS2V5LEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFqOmDqOa4hemZpFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xlYXIgKCkge1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2UuY2xlYXIoKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5riF6Zmk5LiA5LiqXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZW1vdmVJdGVtICgpIHtcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5fc2F2ZUtleSlcclxuICAgIH1cclxufSJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Main/ResMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd4183tPNSlEhbxgFZuo+hlH', 'ResMgr');
// Scripts/Main/ResMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResMgr = /** @class */ (function () {
    function ResMgr() {
    }
    /**
    * 加载预制体
    * @param url
    * @param callback
    */
    ResMgr.loadPrefab = function (url, callback) {
        cc.resources.load(url, cc.Prefab, function (err, prefab) {
            if (!err) {
                if (callback != null) {
                    callback(prefab);
                }
            }
        });
    };
    /**
     * 加载spine
     * @param url
     * @param skt
     * @param callback
     */
    ResMgr.loadSpine = function (url, skt, callback) {
        cc.resources.load(url, sp.SkeletonData, function (err, spData) {
            if (!err) {
                if (skt != null) {
                    skt.skeletonData = spData;
                }
                if (callback != null) {
                    callback(spData);
                }
            }
            else {
                console.log('报错；1', err);
            }
        });
    };
    /**
    * 加载text
    * @param url
    * @param callback
    */
    ResMgr.loadText = function (url, callback) {
        cc.resources.load(url, cc.JsonAsset, function (err, texData) {
            if (!err) {
                if (callback != null) {
                    callback(texData);
                }
            }
        });
    };
    /**
    * 加载dragon
    * @param url
    * @param skt
    * @param callback
    */
    ResMgr.loadDragon = function (url, skt, callback) {
        cc.resources.load(url, cc.Asset, function (err, spData) {
            if (!err) {
                if (skt != null) {
                    skt.dragonAsset = spData;
                }
                if (callback != null) {
                    callback(spData);
                }
            }
        });
    };
    ResMgr.getSpineAttachment = function (skinName, callback) {
        if (!callback) {
            return;
        }
        cc.resources.load('spine/hero/sp_wuqi', sp.SkeletonData, function (err, spData) {
            if (!err) {
                var skeletonData = spData.getRuntimeData();
                var slotIndex = skeletonData.findSlotIndex('knife1');
                var skin = skeletonData.findSkin(skinName);
                var atta = skin.getAttachment(slotIndex, 'knife1');
                callback(atta);
            }
        });
    };
    /**
     * 加载图集中的图片
     * @param url
     * @param sub
     * @param sp
     * @param callback
     */
    ResMgr.loadSpriteFrame = function (url, sub, sp, callback) {
        if (ResMgr.getCache(url)) {
            var sf = ResMgr.getCache(url).getSpriteFrame(sub);
            sp.spriteFrame = sf;
            if (callback) {
                callback(sp.spriteFrame);
            }
        }
        else {
            cc.resources.load(url, cc.SpriteAtlas, function (err, atlas) {
                if (err || !sp || !sp.isValid)
                    return;
                if (atlas) {
                    var sf = atlas.getSpriteFrame(sub);
                    if (sf) {
                        sp.spriteFrame = sf;
                        if (callback) {
                            callback(sp.spriteFrame);
                        }
                    }
                }
            }.bind(this));
        }
    };
    /**
     * 加载远程图片（微信头像）
     * @param url
     * @param sp
     * @param callback
     */
    ResMgr.loadUrl = function (url, sp, callback) {
        console.log("loadUrl~", url);
        cc.assetManager.loadRemote(url, function (err, data) {
            if (err || !data || !sp || !sp.isValid)
                return;
            sp.spriteFrame = new cc.SpriteFrame(data);
            if (callback) {
                callback(sp.spriteFrame);
            }
        }.bind(this));
    };
    /**
     * 加载图片
     * @param url
     * @param sp
     * @param callback
     */
    ResMgr.loadImage = function (url, sp, callback) {
        cc.resources.load(url, cc.SpriteFrame, function (err, lsp) {
            if (err || !lsp || !sp || !sp.isValid)
                return;
            sp.spriteFrame = lsp;
            if (callback) {
                callback(sp.spriteFrame);
            }
        }.bind(this));
    };
    /**
     * 加载图片并返回
     * @param url
     * @param callback
     */
    ResMgr.loadImageRet = function (url, callback) {
        cc.resources.load(url, cc.SpriteFrame, function (err, lsp) {
            if (err || !lsp)
                return;
            if (callback)
                callback(lsp);
        }.bind(this));
    };
    /**
     * 加载图片
     * @param url
     * @param sp
     * @param callback
     */
    ResMgr.loadImageArr = function (url, node) {
        cc.resources.load(url, cc.SpriteFrame, function (err, lsp) {
            if (err || !lsp || !node)
                return;
            node.children.forEach(function (element) {
                element.getComponent(cc.Sprite).spriteFrame = lsp;
            });
        }.bind(this));
    };
    /**
     * 加载Texture
     * @param url
     * @param sp
     * @param callback
     */
    ResMgr.loadTexture = function (url, sp, callback) {
        cc.resources.load(url, function (err, texture) {
            if (err || !texture || !sp || !sp.isValid)
                return;
            sp.texture = texture;
            if (callback) {
                callback(sp.texture);
            }
        }.bind(this));
    };
    ResMgr.loadRes = function (url, completeCallback) {
        cc.resources.load(url, completeCallback);
    };
    ResMgr.loadTypeRes = function (url, type, completeCallback) {
        cc.resources.load(url, type, completeCallback);
    };
    ResMgr.loadResArray = function (url, progressCallback, completeCallback) {
        cc.resources.load(url, progressCallback, completeCallback);
    };
    ResMgr.loadResArrayTypes = function (assets, progressCallback, completeCallback) {
        cc.assetManager.loadAny(assets, { bundle: 'resources' }, progressCallback, completeCallback);
    };
    ResMgr.load = function (resources, progressCallback, completeCallback) {
        cc.assetManager.loadRemote(resources, progressCallback, completeCallback);
    };
    ResMgr.getRes = function (url, type) {
        return cc.loader.getRes(url, type);
    };
    ResMgr.preloadResArray = function (url, type, completeCallback) {
        cc.resources.load(url[0], type[0], function () {
            var u = url.indexOf(url[0]);
            url.splice(u, 1);
            var t = type.indexOf(type[0]);
            type.splice(t, 1);
            if (type.length > 1 && url.length > 1) {
                ResMgr.preloadResArray(url, type, completeCallback);
            }
            else {
                completeCallback();
            }
        });
    };
    /**
     * 缓存资源，不释放，持有Asset引用
     * @param url
     * @param type
     */
    ResMgr.cacheRes = function (url, type) {
        this.loadTypeRes(url, type, function (err, res) {
            if (err)
                return;
            this._cache[url] = res;
        }.bind(this));
    };
    ResMgr.addCache = function (url, res) {
        this._cache[url] = res;
    };
    ResMgr.getCache = function (url) {
        return this._cache[url];
    };
    ResMgr.loadAssetsArray = function (urlArray, progressCallback, completeCallback) {
        cc.assetManager.loadAny(urlArray, { bundle: 'resources' }, progressCallback, completeCallback);
    };
    ResMgr._cache = {};
    return ResMgr;
}());
exports.default = ResMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWFpblxcUmVzTWdyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFBQTtJQThQQSxDQUFDO0lBN1BHOzs7O01BSUU7SUFDWSxpQkFBVSxHQUF4QixVQUF5QixHQUFXLEVBQUUsUUFBa0I7UUFDcEQsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxHQUFHLEVBQUUsTUFBTTtZQUNuRCxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNOLElBQUksUUFBUSxJQUFJLElBQUksRUFBRTtvQkFDbEIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNwQjthQUNKO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVyxnQkFBUyxHQUF2QixVQUF3QixHQUFXLEVBQUUsR0FBZ0IsRUFBRSxRQUFtQjtRQUN0RSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLEdBQVEsRUFBRSxNQUFXO1lBQ25FLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ04sSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO29CQUNiLEdBQUcsQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO2lCQUM3QjtnQkFDRCxJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUU7b0JBQ2xCLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDcEI7YUFDSjtpQkFBTTtnQkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQTthQUMzQjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUdEOzs7O01BSUU7SUFDWSxlQUFRLEdBQXRCLFVBQXVCLEdBQVcsRUFBRSxRQUFtQjtRQUNuRCxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFH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O0lBQ2EsZUFBUSxHQUF0QixVQUF1QixHQUFXO1FBQzlCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRWEsc0JBQWUsR0FBN0IsVUFBOEIsUUFBUSxFQUFFLGdCQUFpRixFQUFFLGdCQUFnRTtRQUN2TCxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUNuRyxDQUFDO0lBckJjLGFBQU0sR0FBVyxFQUFFLENBQUM7SUFzQnZDLGFBQUM7Q0E5UEQsQUE4UEMsSUFBQTtrQkE5UG9CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNNZ3Ige1xyXG4gICAgLyoqXHJcbiAgICAqIOWKoOi9vemihOWItuS9k1xyXG4gICAgKiBAcGFyYW0gdXJsIFxyXG4gICAgKiBAcGFyYW0gY2FsbGJhY2sgXHJcbiAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBsb2FkUHJlZmFiKHVybDogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCh1cmwsIGNjLlByZWZhYiwgZnVuY3Rpb24gKGVyciwgcHJlZmFiKSB7XHJcbiAgICAgICAgICAgIGlmICghZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHByZWZhYik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9vXNwaW5lXHJcbiAgICAgKiBAcGFyYW0gdXJsIFxyXG4gICAgICogQHBhcmFtIHNrdCBcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBsb2FkU3BpbmUodXJsOiBzdHJpbmcsIHNrdDogc3AuU2tlbGV0b24sIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCh1cmwsIHNwLlNrZWxldG9uRGF0YSwgZnVuY3Rpb24gKGVycjogYW55LCBzcERhdGE6IGFueSkge1xyXG4gICAgICAgICAgICBpZiAoIWVycikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNrdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2t0LnNrZWxldG9uRGF0YSA9IHNwRGF0YTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soc3BEYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmiqXplJnvvJsxJywgZXJyKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDliqDovb10ZXh0XHJcbiAgICAqIEBwYXJhbSB1cmwgXHJcbiAgICAqIEBwYXJhbSBjYWxsYmFjayBcclxuICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWRUZXh0KHVybDogc3RyaW5nLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQodXJsLCBjYy5Kc29uQXNzZXQsIGZ1bmN0aW9uIChlcnI6IGFueSwgdGV4RGF0YTogYW55KSB7XHJcbiAgICAgICAgICAgIGlmICghZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRleERhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOWKoOi9vWRyYWdvblxyXG4gICAgKiBAcGFyYW0gdXJsIFxyXG4gICAgKiBAcGFyYW0gc2t0IFxyXG4gICAgKiBAcGFyYW0gY2FsbGJhY2sgXHJcbiAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBsb2FkRHJhZ29uKHVybDogc3RyaW5nLCBza3Q6IGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSwgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkKHVybCwgY2MuQXNzZXQsIGZ1bmN0aW9uIChlcnI6IGFueSwgc3BEYXRhOiBhbnkpIHtcclxuICAgICAgICAgICAgaWYgKCFlcnIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChza3QgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNrdC5kcmFnb25Bc3NldCA9IHNwRGF0YTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soc3BEYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFNwaW5lQXR0YWNobWVudChza2luTmFtZTogc3RyaW5nLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKCFjYWxsYmFjaykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCdzcGluZS9oZXJvL3NwX3d1cWknLCBzcC5Ta2VsZXRvbkRhdGEsIGZ1bmN0aW9uIChlcnI6IGFueSwgc3BEYXRhOiBhbnkpIHtcclxuICAgICAgICAgICAgaWYgKCFlcnIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBza2VsZXRvbkRhdGEgPSBzcERhdGEuZ2V0UnVudGltZURhdGEoKTtcclxuICAgICAgICAgICAgICAgIGxldCBzbG90SW5kZXggPSBza2VsZXRvbkRhdGEuZmluZFNsb3RJbmRleCgna25pZmUxJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2tpbiA9IHNrZWxldG9uRGF0YS5maW5kU2tpbihza2luTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXR0YSA9IHNraW4uZ2V0QXR0YWNobWVudChzbG90SW5kZXgsICdrbmlmZTEnKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGF0dGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9veWbvumbhuS4reeahOWbvueJh1xyXG4gICAgICogQHBhcmFtIHVybCBcclxuICAgICAqIEBwYXJhbSBzdWIgXHJcbiAgICAgKiBAcGFyYW0gc3AgXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9hZFNwcml0ZUZyYW1lKHVybDogc3RyaW5nLCBzdWI6IHN0cmluZywgc3A6IGNjLlNwcml0ZSwgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmIChSZXNNZ3IuZ2V0Q2FjaGUodXJsKSkge1xyXG4gICAgICAgICAgICB2YXIgc2YgPSBSZXNNZ3IuZ2V0Q2FjaGUodXJsKS5nZXRTcHJpdGVGcmFtZShzdWIpO1xyXG4gICAgICAgICAgICBzcC5zcHJpdGVGcmFtZSA9IHNmO1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHNwLnNwcml0ZUZyYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLnJlc291cmNlcy5sb2FkKHVybCwgY2MuU3ByaXRlQXRsYXMsIGZ1bmN0aW9uIChlcnIsIGF0bGFzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyIHx8ICFzcCB8fCAhc3AuaXNWYWxpZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgaWYgKGF0bGFzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNmID0gYXRsYXMuZ2V0U3ByaXRlRnJhbWUoc3ViKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2YpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3Auc3ByaXRlRnJhbWUgPSBzZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhzcC5zcHJpdGVGcmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDliqDovb3ov5znqIvlm77niYfvvIjlvq7kv6HlpLTlg4/vvIlcclxuICAgICAqIEBwYXJhbSB1cmwgXHJcbiAgICAgKiBAcGFyYW0gc3AgXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9hZFVybCh1cmw6IHN0cmluZywgc3A6IGNjLlNwcml0ZSwgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibG9hZFVybH5cIiwgdXJsKVxyXG4gICAgICAgIGNjLmFzc2V0TWFuYWdlci5sb2FkUmVtb3RlKHVybCwgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZXJyIHx8ICFkYXRhIHx8ICFzcCB8fCAhc3AuaXNWYWxpZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBzcC5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZShkYXRhKTtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhzcC5zcHJpdGVGcmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDliqDovb3lm77niYdcclxuICAgICAqIEBwYXJhbSB1cmwgXHJcbiAgICAgKiBAcGFyYW0gc3AgXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9hZEltYWdlKHVybDogc3RyaW5nLCBzcDogY2MuU3ByaXRlLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQodXJsLCBjYy5TcHJpdGVGcmFtZSwgZnVuY3Rpb24gKGVyciwgbHNwKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIgfHwgIWxzcCB8fCAhc3AgfHwgIXNwLmlzVmFsaWQpIHJldHVybjtcclxuICAgICAgICAgICAgc3Auc3ByaXRlRnJhbWUgPSBsc3A7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhzcC5zcHJpdGVGcmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L295Zu+54mH5bm26L+U5ZueXHJcbiAgICAgKiBAcGFyYW0gdXJsIFxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWRJbWFnZVJldCh1cmw6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQodXJsLCBjYy5TcHJpdGVGcmFtZSwgZnVuY3Rpb24gKGVyciwgbHNwKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIgfHwgIWxzcCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGxzcCk7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9veWbvueJh1xyXG4gICAgICogQHBhcmFtIHVybCBcclxuICAgICAqIEBwYXJhbSBzcCBcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBsb2FkSW1hZ2VBcnIodXJsOiBzdHJpbmcsIG5vZGU6IGNjLk5vZGUpIHtcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCh1cmwsIGNjLlNwcml0ZUZyYW1lLCBmdW5jdGlvbiAoZXJyLCBsc3ApIHtcclxuICAgICAgICAgICAgaWYgKGVyciB8fCAhbHNwIHx8ICFub2RlKSByZXR1cm47XHJcbiAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBsc3A7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliqDovb1UZXh0dXJlXHJcbiAgICAgKiBAcGFyYW0gdXJsIFxyXG4gICAgICogQHBhcmFtIHNwIFxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWRUZXh0dXJlKHVybDogc3RyaW5nLCBzcDogYW55LCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQodXJsLCBmdW5jdGlvbiAoZXJyLCB0ZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIgfHwgIXRleHR1cmUgfHwgIXNwIHx8ICFzcC5pc1ZhbGlkKSByZXR1cm47XHJcbiAgICAgICAgICAgIHNwLnRleHR1cmUgPSB0ZXh0dXJlO1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHNwLnRleHR1cmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWRSZXModXJsOiBzdHJpbmcsIGNvbXBsZXRlQ2FsbGJhY2s6IChlcnJvcjogRXJyb3IsIHJlc291cmNlOiBhbnkpID0+IHZvaWQpIHtcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCh1cmwsIGNvbXBsZXRlQ2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9hZFR5cGVSZXModXJsOiBzdHJpbmcsIHR5cGU6IHR5cGVvZiBjYy5Bc3NldCwgY29tcGxldGVDYWxsYmFjaz86IChlcnJvcjogRXJyb3IsIHJlc291cmNlOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCh1cmwsIHR5cGUsIGNvbXBsZXRlQ2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9hZFJlc0FycmF5KHVybDogc3RyaW5nW10sIHByb2dyZXNzQ2FsbGJhY2s6IChjb21wbGV0ZWRDb3VudDogbnVtYmVyLCB0b3RhbENvdW50OiBudW1iZXIsIGl0ZW06IGFueSkgPT4gdm9pZCwgY29tcGxldGVDYWxsYmFjazogKChlcnJvcjogRXJyb3IsIHJlc291cmNlOiBhbnlbXSkgPT4gdm9pZCkgfCBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQodXJsLCBwcm9ncmVzc0NhbGxiYWNrLCBjb21wbGV0ZUNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBsb2FkUmVzQXJyYXlUeXBlcyhhc3NldHM6IGFueSwgcHJvZ3Jlc3NDYWxsYmFjazogKGNvbXBsZXRlZENvdW50OiBudW1iZXIsIHRvdGFsQ291bnQ6IG51bWJlciwgaXRlbTogYW55KSA9PiB2b2lkLCBjb21wbGV0ZUNhbGxiYWNrOiAoKGVycm9yOiBFcnJvciwgcmVzb3VyY2U6IGFueVtdKSA9PiB2b2lkKSB8IG51bGwpOiB2b2lkIHtcclxuICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZEFueShhc3NldHMsIHsgYnVuZGxlOiAncmVzb3VyY2VzJyB9LCBwcm9ncmVzc0NhbGxiYWNrLCBjb21wbGV0ZUNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWQocmVzb3VyY2VzOiBzdHJpbmcsIHByb2dyZXNzQ2FsbGJhY2s6IChjb21wbGV0ZWRDb3VudDogbnVtYmVyLCB0b3RhbENvdW50OiBudW1iZXIsIGl0ZW06IGFueSkgPT4gdm9pZCwgY29tcGxldGVDYWxsYmFjazogKGVycjogRXJyb3IsIGFzc2V0OiBjYy5Bc3NldCkgPT4gdm9pZCkge1xyXG4gICAgICAgIGNjLmFzc2V0TWFuYWdlci5sb2FkUmVtb3RlKHJlc291cmNlcywgcHJvZ3Jlc3NDYWxsYmFjaywgY29tcGxldGVDYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRSZXModXJsOiBzdHJpbmcsIHR5cGU/OiBGdW5jdGlvbik6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIGNjLmxvYWRlci5nZXRSZXModXJsLCB0eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHByZWxvYWRSZXNBcnJheSh1cmw6IHN0cmluZ1tdLCB0eXBlOiBBcnJheTxhbnk+LCBjb21wbGV0ZUNhbGxiYWNrOiAoKCkgPT4gdm9pZCkgfCBudWxsKSB7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQodXJsWzBdLCB0eXBlWzBdLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB1ID0gdXJsLmluZGV4T2YodXJsWzBdKTtcclxuICAgICAgICAgICAgdXJsLnNwbGljZSh1LCAxKTtcclxuICAgICAgICAgICAgbGV0IHQgPSB0eXBlLmluZGV4T2YodHlwZVswXSk7XHJcbiAgICAgICAgICAgIHR5cGUuc3BsaWNlKHQsIDEpO1xyXG4gICAgICAgICAgICBpZiAodHlwZS5sZW5ndGggPiAxICYmIHVybC5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBSZXNNZ3IucHJlbG9hZFJlc0FycmF5KHVybCwgdHlwZSwgY29tcGxldGVDYWxsYmFjayk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZUNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfY2FjaGU6IE9iamVjdCA9IHt9O1xyXG4gICAgLyoqXHJcbiAgICAgKiDnvJPlrZjotYTmupDvvIzkuI3ph4rmlL7vvIzmjIHmnIlBc3NldOW8leeUqFxyXG4gICAgICogQHBhcmFtIHVybCBcclxuICAgICAqIEBwYXJhbSB0eXBlIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNhY2hlUmVzKHVybDogc3RyaW5nLCB0eXBlOiB0eXBlb2YgY2MuQXNzZXQpIHtcclxuICAgICAgICB0aGlzLmxvYWRUeXBlUmVzKHVybCwgdHlwZSwgZnVuY3Rpb24gKGVyciwgcmVzKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5fY2FjaGVbdXJsXSA9IHJlcztcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBhZGRDYWNoZSh1cmw6IHN0cmluZywgcmVzKSB7XHJcbiAgICAgICAgdGhpcy5fY2FjaGVbdXJsXSA9IHJlcztcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q2FjaGUodXJsOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2FjaGVbdXJsXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWRBc3NldHNBcnJheSh1cmxBcnJheSwgcHJvZ3Jlc3NDYWxsYmFjazogKGNvbXBsZXRlZENvdW50OiBudW1iZXIsIHRvdGFsQ291bnQ6IG51bWJlciwgaXRlbTogYW55KSA9PiB2b2lkLCBjb21wbGV0ZUNhbGxiYWNrOiAoKGVycm9yOiBFcnJvciwgcmVzb3VyY2U6IGFueSkgPT4gdm9pZCkgfCBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRBbnkodXJsQXJyYXksIHsgYnVuZGxlOiAncmVzb3VyY2VzJyB9LCBwcm9ncmVzc0NhbGxiYWNrLCBjb21wbGV0ZUNhbGxiYWNrKTtcclxuICAgIH1cclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Main/Main.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '36179zc4vZH4IduzVoqkCLS', 'Main');
// Scripts/Main/Main.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("../AD/Global");
var weChatPlatform_1 = require("../AD/weChatPlatform");
var GlobalDefine_1 = require("../Other/GlobalDefine");
var SaveUtils_1 = require("../Other/SaveUtils");
var UserModel_1 = require("../Other/UserModel");
var achievement_1 = require("./achievement");
var condition_1 = require("./condition");
var Entry_1 = require("./Entry");
var ResMgr_1 = require("./ResMgr");
var summary_1 = require("./summary");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.wgnb = false;
        _this.branchline = null;
        _this.Age = null;
        _this.Events = null;
        _this.Talents = null;
        _this.Achievement = null;
        _this.IndexOfEvent = 0;
        _this.AgeJson = null; //当前的age表
        _this.EventsJson = null; //当前的event表
        //UI
        _this.TenCPShow = null;
        _this.TenCPButton = null;
        _this.Tips = null;
        _this.Entry = null;
        _this.Box = null;
        _this.normalLabel = null;
        _this.MyzzBox = null;
        //选择天赋判断
        _this.NowSelectTalentNum = 0; //当前选择天赋数量
        _this.MaxSelectTalentNum = 150; //最大选择天赋数量
        _this.AlreadyTalentButton = []; //已经选择的天赋按钮
        _this.AllShowTalent = []; //所有可以选择的天赋，index就是按钮的顺序（从上到下）
        _this.ConTalent = []; //每年检测的天赋
        //计时器
        _this.TipsIsOpen = false; //tips面板是否打开
        _this.TipsTimer = 0; //tips计时器
        //数值
        _this.MaxpropertyNum = 10; //各个属性最大值
        _this.MaxUseNum = 20; //最大可用点数
        _this.StarUseNum = _this.MaxUseNum; //初始可用点数
        _this.NowAge = 0; //当前年龄
        _this.isDeath = false;
        _this.isBool = false;
        _this.listArr = []; //事件列表数据
        _this.adTime = 0;
        _this.timmerCDauto = 0; //自动播放按钮广告CD
        _this.istimmerCDauto = false; //自动播放按钮广告CD
        _this.completely = 0; //加载完全
        _this.TXCS = 0; //天选次数
        _this._lastPosX = 0; //坐标转换之后的X值
        _this.cont = "";
        _this.contZhujia = "";
        _this.tichu = [];
        _this.isOpenXY = false;
        _this.group_4_lal = '#000000';
        _this.group_4_lal1 = '#000000';
        _this.tex_4_lal = '#000000';
        _this.tex_4_lal1 = '#000000';
        _this.isMyzzShow = false; //是否是主线剧情
        _this.skinPrefab = null;
        _this.is1or2 = 1;
        //背景图颜色
        _this.quality = null;
        _this.quality1 = null;
        _this.quality2 = null;
        _this.quality3 = null;
        //存储自传图片按钮
        _this.experienceSp = null;
        _this.RamTF = 10; //天赋数量
        _this.isWUDI = true; //是否是无敌模式
        _this.choice = false; //仙人指路选择完成
        _this.skinCd = false;
        _this.maozizizi = false; //第几次开始人生
        _this.rebuild = false; //是否转世重修
        _this.rebuildAge = 0; //从多少岁转世重修
        return _this;
    }
    Main.prototype.onLoad = function () {
        var _this = this;
        Global_1.default.platform = new weChatPlatform_1.default();
        this.replaceAll();
        //测试
        condition_1.DEFAULT_PROP["CHR"] = 0;
        condition_1.DEFAULT_PROP["INT"] = 0;
        condition_1.DEFAULT_PROP["LIF"] = 1;
        condition_1.DEFAULT_PROP["MNY"] = 0;
        condition_1.DEFAULT_PROP["SPR"] = 0;
        condition_1.DEFAULT_PROP["STR"] = 0;
        condition_1.DEFAULT_PROP["TLT"] = [];
        condition_1.DEFAULT_PROP["EVT"] = [];
        this.Tips.on(cc.Node.EventType.TOUCH_START, this.moveStart, this);
        this.Tips.on(cc.Node.EventType.TOUCH_MOVE, this.moveIng, this);
        //读表
        ResMgr_1.default.loadText("Json/branchline", function (branchline) { _this.branchline = branchline; });
        ResMgr_1.default.loadText("Json/0/age", function (age) { _this.Age = age, _this.Onloadtimer(); });
        ResMgr_1.default.loadText("Json/0/events", function (events) { _this.Events = events, _this.Onloadtimer(); });
        ResMgr_1.default.loadText("Json/0/talents", function (talents) { _this.Talents = talents, _this.Onloadtimer(); });
        ResMgr_1.default.loadText("Json/0/achievement", function (achievement) { _this.Achievement = achievement, _this.Onloadtimer(); });
        if (!GlobalDefine_1.SaveData.isAutoAD) {
            cc.find("Canvas/Group_4/Auto/Background/Icon").active = true;
        }
        if (!GlobalDefine_1.SaveData.isAutoAD2) {
            cc.find("Canvas/Group_4/Auto2/Background/Icon").active = true;
        }
        if (GlobalDefine_1.SaveData.isAuto) {
            cc.find("Canvas/Group_4/Auto/Background/ZD1").active = false;
            cc.find("Canvas/Group_4/Auto/Background/ZD2").active = true;
        }
        else {
            cc.find("Canvas/Group_4/Auto/Background/ZD1").active = true;
            cc.find("Canvas/Group_4/Auto/Background/ZD2").active = false;
        }
        if (GlobalDefine_1.SaveData.isAuto2) {
            cc.find("Canvas/Group_4/Auto2/Background/ZD1").active = false;
            cc.find("Canvas/Group_4/Auto2/Background/ZD2").active = true;
        }
        else {
            cc.find("Canvas/Group_4/Auto2/Background/ZD1").active = true;
            cc.find("Canvas/Group_4/Auto2/Background/ZD2").active = false;
        }
        //数据应用
        this.CanUse(0);
        if (condition_1.DEFAULT_CJ.TMS < 1) {
            cc.find("Canvas/Group_1/achievement").active = false;
        }
        this.eventScrollView = cc.find("Canvas/Group_4/ScrollView");
        this._content = cc.find("Canvas/Group_4/ScrollView/view/Layout");
        this.tongji();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onNeiGua, this);
    };
    Main.prototype.onNeiGua = function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.MaxUseNum += 20;
                this.CanUse(20);
                break;
            case cc.macro.KEY.b:
                this.wgnb = true;
                break;
        }
    };
    Main.prototype.Onloadtimer = function () {
        this.completely++;
        if (this.completely == 4) {
            this.tongji();
            cc.find('Group_1/achievement', this.node).active = true;
        }
    };
    //主线选择
    Main.prototype.SelectStory = function (event, customEventData) {
        this.AgeJson = this.Age;
        this.EventsJson = this.Events;
        this.IndexOfEvent = 0;
    };
    //不选天赋直接进入下一级
    Main.prototype.EnterNext = function (event, customEventData) {
        if (GlobalDefine_1.SaveData.Myzz[Number(customEventData) - 1] == 1) {
            cc.find("Canvas/Group_2").active = false;
            cc.find("Canvas/Group_7").active = false;
            cc.find("Canvas/BG").active = true;
            cc.find("Canvas/Group_3").active = true;
        }
        else {
            for (var p = 0; p < Object.keys(this.branchline.json).length; p++) {
                if (this.branchline.json[p + 1]["id"] == customEventData) {
                    this.TipsOpen(true, cc.color(128, 223, 239), "完成成就 【" + this.Achievement.json[this.branchline.json[p + 1]["achievementID"]]["name"] + "】 解锁");
                }
            }
        }
    };
    Main.prototype.update = function (dt) {
        if (this.TipsIsOpen) {
            this.TipsTimer += dt;
            if (this.TipsTimer >= 1.5) {
                this.TipsOpen(false, cc.color(128, 223, 239));
            }
        }
        if (this.istimmerCDauto) {
            this.timmerCDauto += 1;
            if (this.timmerCDauto >= 15) {
                this.timmerCDauto = 0;
                this.istimmerCDauto = false;
            }
        }
        if (GlobalDefine_1.SaveData.isAuto && this.isBool) {
            this.adTime += dt;
            if (this.adTime >= 1.5) {
                this.adTime = 0;
                this.Continue();
            }
        }
        if (GlobalDefine_1.SaveData.isAuto2 && this.isBool) {
            this.adTime += dt;
            if (this.adTime >= 0.75) {
                this.adTime = 0;
                this.Continue();
            }
        }
        //广告倒计时
        if (GlobalDefine_1.SaveData.isAutoAD2) {
            var all = Math.round(new Date().getTime()) / 1000 - GlobalDefine_1.SaveData.LastTime;
            var have = summary_1.ADtime - all;
            if (all > summary_1.ADtime) {
                //超时了
                GlobalDefine_1.SaveData.isAutoAD2 = false;
                GlobalDefine_1.SaveData.isAuto2 = false;
                cc.find("Canvas/Group_4/Auto2/Background/Icon").active = true;
                cc.find("Canvas/Group_4/Auto2/Background/Label").getComponent(cc.Label).string = "观看广告即可立即使用24小时";
            }
            else {
                //没超时
                var shi = void 0;
                var fen = void 0;
                shi = Math.floor(have / 3600);
                fen = Math.floor((have - shi * 3600) / 60);
                if (fen < 1) {
                    fen = 1;
                }
                cc.find("Canvas/Group_4/Auto2/Background/Label").getComponent(cc.Label).string = '剩余 ' + shi + " 小时 " + fen + " 分钟";
            }
        }
    };
    Main.prototype.startGame = function () {
        cc.find("Canvas/Group_1").active = false;
        cc.find("Canvas/BG").active = true;
        cc.find("Canvas/Group_2").active = true;
        cc.find("Canvas/Group_1/Num_Reopen_Box/Label_1").getComponent(cc.Label).string = "已重开" + condition_1.DEFAULT_CJ.TMS + "次";
        if (cc.sys.platform == cc.sys.VIVO_GAME || cc.sys.platform == cc.sys.XIAOMI_GAME || window['uc']) {
            Global_1.default.platform.SHOW_TITIALAD1();
        }
        //成就检查
        this.check_cj("opportunity");
    };
    //替换所有皮肤
    Main.prototype.replaceAll = function () {
        var _this = this;
        //天赋选择背景图颜色
        ResMgr_1.default.loadImageRet("skin/" + UserModel_1.default.instance.using + "/tfxz/Box_White_f9fcff", function (sp) {
            _this.quality = null;
            _this.quality = sp;
        });
        ResMgr_1.default.loadImageRet("skin/" + UserModel_1.default.instance.using + "/tfxz/Box_Blue_67cfff", function (sp) {
            _this.quality1 = null;
            _this.quality1 = sp;
        });
        ResMgr_1.default.loadImageRet("skin/" + UserModel_1.default.instance.using + "/tfxz/Box_Purple_c67cff", function (sp) {
            _this.quality2 = null;
            _this.quality2 = sp;
        });
        ResMgr_1.default.loadImageRet("skin/" + UserModel_1.default.instance.using + "/tfxz/Box_Orange_ff8e49", function (sp) {
            _this.quality3 = null;
            _this.quality3 = sp;
        });
        ResMgr_1.default.loadImageRet("skin/" + UserModel_1.default.instance.using + "/wdzz/Btn_EXP", function (sp) {
            _this.experienceSp = null;
            _this.experienceSp = sp;
        });
        this.group_4_lal = '#000000';
        this.group_4_lal1 = '#000000';
        this.tex_4_lal = '#000000';
        this.tex_4_lal1 = '#FFB859';
    };
    Main.prototype.Rank = function () {
        this.TipsOpen(true, cc.color(128, 223, 239), "还没有");
    };
    Main.prototype.returnGroup1 = function () {
        cc.find("Canvas/Group_1").active = true;
        cc.find("Canvas/BG").active = false;
        cc.find("Canvas/Group_2").active = false;
    };
    Main.prototype.JudgeColor = function (node, color) {
        if (color.toString() == cc.color(255, 255, 255).toString()) {
            node.getChildByName('Sp').getComponent(cc.Sprite).spriteFrame = this.quality;
        }
        else if (color.toString() == cc.color(103, 197, 230).toString()) {
            node.getChildByName('Sp').getComponent(cc.Sprite).spriteFrame = this.quality1;
        }
        else if (color.toString() == cc.color(237, 120, 239).toString()) {
            node.getChildByName('Sp').getComponent(cc.Sprite).spriteFrame = this.quality2;
        }
        else if (color.toString() == cc.color(247, 140, 75).toString()) {
            node.getChildByName('Sp').getComponent(cc.Sprite).spriteFrame = this.quality3;
        }
    };
    Main.prototype.updateNromalLable = function (j, color) {
        if (UserModel_1.default.instance.using == 'skin0') {
            j.getChildByName('Label').color = cc.color(0, 0, 0);
        }
        ResMgr_1.default.loadImage("skin/" + UserModel_1.default.instance.using + "/tfxz/Hook", j.getChildByName('Box_Selected').children[0].getComponent(cc.Sprite));
        if (color) {
            this.JudgeColor(j, color);
        }
    };
    //十连抽
    Main.prototype.TenCP = function () {
        var _this = this;
        //定义剔除数组（由已选天赋和互斥天赋组成）
        this.tichu = [];
        var index = 0;
        var islun = false;
        var tianfu = [];
        //轮回天赋
        // SaveData.LunHuiTalent = 1134
        if (GlobalDefine_1.SaveData.LunHuiTalent != 0) {
            index = GlobalDefine_1.SaveData.LunHuiTalent;
            islun = true;
            GlobalDefine_1.SaveData.LunHuiTalent = 0;
            SaveUtils_1.default.inst.SaveData();
        }
        if (islun) {
            this.tichu.push(index);
            tianfu.push(index);
            islun = false;
        }
        var len = Object.keys(this.Talents.json).length;
        for (var s = 0; s < len; s++) {
            //判断有没有轮回天赋需要先生成
            if (1001 + s == index)
                continue;
            tianfu.push(1001 + s);
        }
        tianfu.sort(function (x, y) {
            return _this.Talents.json[y]['grade'] - _this.Talents.json[x]['grade'];
        });
        //生成/销毁节点
        var c = this.TenCPShow.childrenCount;
        for (var i = 0; i < len - c; i++) {
            var j = cc.instantiate(this.normalLabel);
            j.parent = this.TenCPShow;
            this.AutoAddClickEvent(this.node, "Main", "SelectTalent", (i + 1).toString(), j);
        }
        //UI交互
        this.TenCPButton.active = false;
        this.TenCPShow.active = true;
        cc.find("Canvas/Group_2/Select_2").active = true;
        cc.find("Canvas/Group_2/Reopen").active = true;
        var index1;
        for (var m = 0; m < len; m++) {
            index1 = tianfu[m];
            //拿到不重复不互斥的天赋ID：index，表现出来
            this.TenCPShow.children[m].getChildByName("Label").getComponent(cc.Label).string = this.Talents.json[index1]["name"] + "(" + this.Talents.json[index1]["description"] + ")";
            //稀有度UI表现
            this.updateNromalLable(this.TenCPShow.children[m], summary_1.grades[this.Talents.json[index1]["grade"]]);
            //放到所有可以选择的天赋数组里
            this.AllShowTalent.push(index1);
            //重置表现
            this.TenCPShow.children[m].getChildByName("Box_Selected").active = false;
            //判断这个天赋有没有互斥天赋并且删除所有互斥天赋
        }
        cc.find("Canvas/Group_2/ScrollView").getComponent(cc.ScrollView).scrollToTop(0);
    };
    Main.prototype.TenCP_digui = function (_index, _tichu) {
        //从Talents随机出一个天赋ID
        _index = 1000 + Math.ceil(Math.random() * Object.keys(this.Talents.json).length);
        //判断a是否在剔除数组，在就递归
        var sjs = Math.random();
        var grade = 0;
        //if(sjs>0.111){grade=0}else if(sjs>0.011){grade=1}else if(sjs>0.001){grade=2}else{grade=3}
        var ram = 0.2 * (condition_1.DEFAULT_CJ.AEVT.length / Object.keys(this.Events.json).length) + 0.2 * (condition_1.DEFAULT_CJ.ATLT.length / Object.keys(this.Talents.json).length);
        if (sjs > 0.4 + ram) {
            grade = 0;
        }
        else if (sjs > 0.3 + ram) {
            grade = 1;
        }
        else if (sjs > 0.2 + ram) {
            grade = 2;
        }
        else {
            grade = 3;
        }
        if (_tichu.includes(_index) || this.Talents.json[_index]["grade"] != grade) {
            return this.TenCP_digui(_index, _tichu);
        }
        else {
            //本天赋加入剔除数组,并返回
            _tichu.push(_index);
            return _index;
        }
    };
    Main.prototype.SelectTalent = function (event, customEventData) {
        var bool = this.mutex(this.AllShowTalent[Number(customEventData) - 1]);
        if (bool[0]) {
            this.TipsOpen(true, cc.color(128, 223, 239), "与已选择的天赋【" + bool[1].name + "】冲突");
            return;
        }
        if (this.NowSelectTalentNum < this.MaxSelectTalentNum && !this.AlreadyTalentButton.includes(customEventData)) {
            this.NowSelectTalentNum += 1;
            if (this.NowSelectTalentNum == this.MaxSelectTalentNum) {
                // cc.find("Canvas/Group_2/Select_2/Background/Label").getComponent(cc.Label).string = "开始新人生"
                // cc.find("Canvas/Group_2/Select_2/Background/Label").color = OtherGrades[1]
                // cc.find("Canvas/Group_2/Select_2/Background/OKBG").color = OtherGrades[0]
            }
            this.AlreadyTalentButton.push(customEventData);
            this.TenCPShow.children[Number(customEventData) - 1].getChildByName("Box_Selected").active = true;
        }
        else if (this.NowSelectTalentNum >= this.MaxSelectTalentNum && !this.AlreadyTalentButton.includes(customEventData)) {
            //已经选够了
            this.TipsOpen(true, cc.color(128, 223, 239), "只能选" + this.MaxSelectTalentNum + "个天赋");
        }
        else if (this.AlreadyTalentButton.includes(customEventData)) {
            //取消选择
            this.NowSelectTalentNum -= 1;
            var index = this.AlreadyTalentButton.indexOf(customEventData);
            if (index > -1) {
                this.AlreadyTalentButton.splice(index, 1);
            }
            this.TenCPShow.children[Number(customEventData) - 1].getChildByName("Box_Selected").active = false;
        }
    };
    Main.prototype.mutex = function (id) {
        var bool = [false];
        for (var i = 0; i < this.AlreadyTalentButton.length; i++) {
            var id1 = this.AllShowTalent[Number(this.AlreadyTalentButton[i]) - 1];
            if (!this.Talents.json[id1].exclusive)
                continue;
            for (var y = 0; y < this.Talents.json[id1]["exclusive"].length; y++) {
                // console.log('表格', Number(this.Talents.json[id1]["exclusive"][y]), id)
                if (Number(this.Talents.json[id1]["exclusive"][y]) == id) {
                    bool = [true, this.Talents.json[id1]];
                }
            }
        }
        return bool;
    };
    Main.prototype.road = function () {
        var bool = false;
        if (!this.isOpenXY) {
            this.group3In();
            bool = true;
        }
        return bool;
    };
    //天赋选完了进入下一级
    Main.prototype.TalentSelectOver = function () {
        if (this.NowSelectTalentNum <= this.MaxSelectTalentNum) {
            if (this.choice) {
                this.group3In();
            }
            else {
                if (!this.maozizizi) {
                    var bool = this.road();
                    this.maozizizi = true;
                    if (!bool)
                        return;
                }
            }
        }
        else if (this.NowSelectTalentNum < this.MaxSelectTalentNum) {
            this.TipsOpen(true, cc.color(128, 223, 239), "请选择" + this.MaxSelectTalentNum + "个天赋");
            return;
        }
        var allttalent = [];
        for (var i = 0; i < this.AlreadyTalentButton.length; i++) {
            //实装天赋
            allttalent.push(this.AllShowTalent[Number(this.AlreadyTalentButton[i]) - 1]);
        }
        if (allttalent.includes(1019)) {
            this.MaxUseNum += 4;
            this.StarUseNum = this.MaxUseNum;
        }
        if (allttalent.includes(1064)) {
            this.MaxUseNum += 8;
            this.StarUseNum = this.MaxUseNum;
        }
        if (allttalent.includes(1007)) {
            this.MaxUseNum += 2;
            this.StarUseNum = this.MaxUseNum;
        }
        if (allttalent.includes(1122)) {
            this.MaxUseNum = 0;
            this.StarUseNum = this.MaxUseNum;
        }
        if (allttalent.includes(1086)) {
            this.MaxUseNum -= 10;
            this.StarUseNum = this.MaxUseNum;
        }
        if (allttalent.includes(1085)) {
            this.MaxUseNum -= 3;
            this.StarUseNum = this.MaxUseNum;
        }
        if (allttalent.includes(1084)) {
            this.MaxUseNum -= 2;
            this.StarUseNum = this.MaxUseNum;
        }
        if (allttalent.includes(1063)) {
            this.MaxUseNum += 1;
            this.StarUseNum = this.MaxUseNum;
        }
        if (this.MaxUseNum < 0) {
            this.MaxUseNum = 0;
            this.StarUseNum = this.MaxUseNum;
        }
        if (GlobalDefine_1.SaveData.isPPDY && GlobalDefine_1.SaveData.isPPDY2) {
            GlobalDefine_1.SaveData.isPPDY2 = false;
            SaveUtils_1.default.inst.SaveData();
            condition_1.DEFAULT_PROP["CHR"] += 1;
            cc.find("Canvas/Group_3/Layout/CHR/Sprite/Label").getComponent(cc.Label).string = "1";
            condition_1.DEFAULT_PROP["INT"] += 1;
            cc.find("Canvas/Group_3/Layout/INT/Sprite/Label").getComponent(cc.Label).string = "1";
            condition_1.DEFAULT_PROP["STR"] += 1;
            cc.find("Canvas/Group_3/Layout/STR/Sprite/Label").getComponent(cc.Label).string = "1";
            condition_1.DEFAULT_PROP["MNY"] += 1;
            cc.find("Canvas/Group_3/Layout/MNY/Sprite/Label").getComponent(cc.Label).string = "1";
            this.MaxUseNum += 4;
        }
        this.CanUse(0);
        //下辈子三选一天赋
        for (var i = 0; i < this.AlreadyTalentButton.length; i++) {
            console.log("打开label");
            //打开label
            cc.find("Canvas/Group_3/ScrollView2/Label").active = true;
            var index = this.AllShowTalent[Number(this.AlreadyTalentButton[i]) - 1];
            var j = cc.instantiate(this.normalLabel);
            this.updateNromalLable(j, summary_1.grades[this.Talents.json[index]["grade"]]);
            // setTimeout(() => {
            j.parent = cc.find("Canvas/Group_3/ScrollView2/view/Layout");
            // }, 0);
            j.getComponent(cc.Button).enabled = false;
            condition_1.DEFAULT_PROP["TLT"].push(index);
            if (this.Talents.json[index]["show"] != 0) {
                this.ConTalent.push(index);
            }
            if (!condition_1.DEFAULT_CJ["ATLT"].includes(index)) {
                condition_1.DEFAULT_CJ["ATLT"].push(index);
            }
            //重置表现
            j.getChildByName("Box_Selected").active = true;
            //天赋确定成功增加天赋
            j.getChildByName("Label").getComponent(cc.Label).string = this.Talents.json[index]["name"] + "(" + this.Talents.json[index]["description"] + ")";
            // j.getChildByName("grade").color = grades[this.Talents.json[index]["grade"]]
            // j.getChildByName("grade").active = true
        }
        SaveUtils_1.default.inst.SaveData();
    };
    //144 238 144
    Main.prototype.TipsOpen = function (isOpen, color, content) {
        this.Tips.color = color;
        //分辨率获取
        // let h = cc.winSize.height;
        if (isOpen) {
            this.Tips.getChildByName("Label").getComponent(cc.Label).string = content;
            cc.tween(this.Tips).to(0.12, { position: cc.v3(0, (cc.winSize.height / 2)) }).to(0.06, { position: cc.v3(0, (cc.winSize.height / 2) - 50) }).to(0.06, { position: cc.v3(0, (cc.winSize.height / 2)) }).start();
            this.Tips.active = true;
            this.TipsTimer = 0;
            this.TipsIsOpen = true;
        }
        else {
            this.Tips.setPosition(0, (cc.winSize.height + this.Tips.getContentSize().height) / 2); //tips归位
            this.Tips.active = false;
            this.TipsTimer = 0;
            this.TipsIsOpen = false;
        }
    };
    //Group_3
    Main.prototype.Add = function (event, customEventData) {
        if (this.StarUseNum >= 1) {
            switch (customEventData) {
                case "CHR":
                    if (condition_1.DEFAULT_PROP["CHR"] < this.MaxpropertyNum || this.MaxUseNum > 0) {
                        condition_1.DEFAULT_PROP["CHR"] += 1;
                        this.CanUse(-1);
                        cc.find("Canvas/Group_3/Layout/CHR/Sprite/Label").getComponent(cc.Label).string = condition_1.DEFAULT_PROP["CHR"].toString();
                    }
                    break;
                case "INT":
                    if (condition_1.DEFAULT_PROP["INT"] < this.MaxpropertyNum || this.MaxUseNum > 0) {
                        condition_1.DEFAULT_PROP["INT"] += 1;
                        this.CanUse(-1);
                        cc.find("Canvas/Group_3/Layout/INT/Sprite/Label").getComponent(cc.Label).string = condition_1.DEFAULT_PROP["INT"].toString();
                    }
                    break;
                case "STR":
                    if (condition_1.DEFAULT_PROP["STR"] < this.MaxpropertyNum || this.MaxUseNum > 0) {
                        condition_1.DEFAULT_PROP["STR"] += 1;
                        this.CanUse(-1);
                        cc.find("Canvas/Group_3/Layout/STR/Sprite/Label").getComponent(cc.Label).string = condition_1.DEFAULT_PROP["STR"].toString();
                    }
                    break;
                case "MNY":
                    if (condition_1.DEFAULT_PROP["MNY"] < this.MaxpropertyNum || this.MaxUseNum > 0) {
                        condition_1.DEFAULT_PROP["MNY"] += 1;
                        this.CanUse(-1);
                        cc.find("Canvas/Group_3/Layout/MNY/Sprite/Label").getComponent(cc.Label).string = condition_1.DEFAULT_PROP["MNY"].toString();
                    }
                    break;
                default:
                    break;
            }
        }
        else {
            this.TipsOpen(true, cc.color(128, 223, 239), "没有可分配的点数了");
        }
    };
    Main.prototype.Reduce = function (event, customEventData) {
        switch (customEventData) {
            case "CHR":
                if (condition_1.DEFAULT_PROP["CHR"] > 0) {
                    condition_1.DEFAULT_PROP["CHR"] -= 1;
                    this.CanUse(1);
                    cc.find("Canvas/Group_3/Layout/CHR/Sprite/Label").getComponent(cc.Label).string = condition_1.DEFAULT_PROP["CHR"].toString();
                }
                break;
            case "INT":
                if (condition_1.DEFAULT_PROP["INT"] > 0) {
                    condition_1.DEFAULT_PROP["INT"] -= 1;
                    this.CanUse(1);
                    cc.find("Canvas/Group_3/Layout/INT/Sprite/Label").getComponent(cc.Label).string = condition_1.DEFAULT_PROP["INT"].toString();
                }
                break;
            case "STR":
                if (condition_1.DEFAULT_PROP["STR"] > 0) {
                    condition_1.DEFAULT_PROP["STR"] -= 1;
                    this.CanUse(1);
                    cc.find("Canvas/Group_3/Layout/STR/Sprite/Label").getComponent(cc.Label).string = condition_1.DEFAULT_PROP["STR"].toString();
                }
                break;
            case "MNY":
                if (condition_1.DEFAULT_PROP["MNY"] > 0) {
                    condition_1.DEFAULT_PROP["MNY"] -= 1;
                    this.CanUse(1);
                    cc.find("Canvas/Group_3/Layout/MNY/Sprite/Label").getComponent(cc.Label).string = condition_1.DEFAULT_PROP["MNY"].toString();
                }
                break;
            default:
                break;
        }
    };
    Main.prototype.CanUse = function (trans) {
        var a = this.StarUseNum + trans;
        this.StarUseNum = a;
        cc.find("Canvas/Group_3/Label_2").getComponent(cc.Label).string = "可用属性点:" + this.StarUseNum;
    };
    Main.prototype.Random = function () {
        this.StarUseNum = this.MaxUseNum;
        condition_1.DEFAULT_PROP["CHR"] = 0;
        condition_1.DEFAULT_PROP["INT"] = 0;
        condition_1.DEFAULT_PROP["STR"] = 0;
        condition_1.DEFAULT_PROP["MNY"] = 0;
        var a;
        for (a = 0; a < this.MaxUseNum; a++) {
            var b = Math.ceil(Math.random() * 4);
            switch (b) {
                case 1:
                    if (condition_1.DEFAULT_PROP["CHR"] < this.MaxpropertyNum || this.MaxUseNum > 40) {
                        condition_1.DEFAULT_PROP["CHR"] += 1;
                        cc.find("Canvas/Group_3/Layout/CHR/Sprite/Label").getComponent(cc.Label).string = condition_1.DEFAULT_PROP["CHR"].toString();
                        this.CanUse(-1);
                    }
                    else {
                        a -= 1;
                    }
                    break;
                case 2:
                    if (condition_1.DEFAULT_PROP["INT"] < this.MaxpropertyNum || this.MaxUseNum > 40) {
                        condition_1.DEFAULT_PROP["INT"] += 1;
                        cc.find("Canvas/Group_3/Layout/INT/Sprite/Label").getComponent(cc.Label).string = condition_1.DEFAULT_PROP["INT"].toString();
                        this.CanUse(-1);
                    }
                    else {
                        a -= 1;
                    }
                    break;
                case 3:
                    if (condition_1.DEFAULT_PROP["STR"] < this.MaxpropertyNum || this.MaxUseNum > 40) {
                        condition_1.DEFAULT_PROP["STR"] += 1;
                        cc.find("Canvas/Group_3/Layout/STR/Sprite/Label").getComponent(cc.Label).string = condition_1.DEFAULT_PROP["STR"].toString();
                        this.CanUse(-1);
                    }
                    else {
                        a -= 1;
                    }
                    break;
                case 4:
                    if (condition_1.DEFAULT_PROP["MNY"] < this.MaxpropertyNum || this.MaxUseNum > 40) {
                        condition_1.DEFAULT_PROP["MNY"] += 1;
                        cc.find("Canvas/Group_3/Layout/MNY/Sprite/Label").getComponent(cc.Label).string = condition_1.DEFAULT_PROP["MNY"].toString();
                        this.CanUse(-1);
                    }
                    else {
                        a -= 1;
                    }
                    break;
                default:
                    break;
            }
        }
    };
    //方向往下
    Main.prototype.scrollDownHandler = function () {
        for (var i = 0, len = this._content.childrenCount; i < len; i++) {
        }
    };
    //方向往上
    Main.prototype.scrollUpHandler = function () {
        for (var i = 0, len = this._content.childrenCount; i < len; i++) {
            var item = this._content.children[i];
            var finalY = item.y + this._content.y;
            if (finalY < (this._content.parent.height / 2 + item.height) && finalY > -(this._content.parent.height / 2 + item.height)) {
                item.opacity = 255;
            }
            else {
                item.opacity = 0;
            }
        }
    };
    Main.prototype.starnewlife = function () {
        //外挂
        if (this.wgnb || (condition_1.DEFAULT_PROP["CHR"] == 7 && condition_1.DEFAULT_PROP["INT"] == 3 && condition_1.DEFAULT_PROP["STR"] == 9 && condition_1.DEFAULT_PROP["MNY"] == 1)) {
            if (this.isWUDI) {
                this.NowAge = 99;
                condition_1.DEFAULT_PROP["TLT"].push(1048);
                condition_1.DEFAULT_PROP["TLT"].push(1065);
                condition_1.DEFAULT_PROP["TLT"].push(1135);
            }
        }
        if (this.StarUseNum == 0) {
            cc.find("Canvas/Group_3").active = false;
            cc.find("Canvas/Group_4").active = true;
            this._lastPosX = this.eventScrollView.children[0].children[0].y;
            cc.find("Canvas/Group_4/ScrollView/view/Layout").on("position-changed", this.scrollUpHandler, this);
            this.Continue();
            //关闭天赋选择面板
            this.isBool = true;
            // })
        }
        else {
            this.TipsOpen(true, cc.color(128, 223, 239), "你还有" + this.StarUseNum + "属性点没有分配");
        }
        //属性变化
        cc.find("Canvas/Group_4/Layout/CHR/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u989C\u503C </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["CHR"] + "</color>";
        cc.find("Canvas/Group_4/Layout/INT/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u667A\u529B </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["INT"] + "</color>";
        cc.find("Canvas/Group_4/Layout/STR/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u4F53\u8D28 </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["STR"] + "</color>";
        cc.find("Canvas/Group_4/Layout/MNY/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u5BB6\u5883 </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["MNY"] + "</color>";
        cc.find("Canvas/Group_4/Layout/SPR/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u5FEB\u4E50 </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["SPR"] + "</color>";
        //成就检查
        this.check_cj("START");
    };
    //成就检查
    Main.prototype.check_cj = function (index) {
        //成就检查
        for (var i = 0; i < Object.keys(this.Achievement.json).length; i++) {
            if (!condition_1.DEFAULT_CJ.ACJ.includes(101 + i) && this.Achievement.json[101 + i]["opportunity"] == index && condition_1.check(this.Achievement.json[101 + i]["condition"]) && (this.Achievement.json[101 + i]["evtlimit"] == -1 || this.Achievement.json[101 + i]["evtlimit"] == this.IndexOfEvent)) {
                this.TipsOpen(true, cc.color(144, 238, 144), "解锁成就【" + this.Achievement.json[101 + i]["name"] + "】");
                //完成的成就添加本地
                condition_1.DEFAULT_CJ.ACJ.push(101 + i);
                //自传解锁检查
                for (var j = 0; j < Object.keys(this.branchline.json).length; j++) {
                    if (this.branchline.json[j + 1]["achievementID"] == (101 + i)) {
                        //解锁
                        GlobalDefine_1.SaveData.Myzz[this.branchline.json[j + 1]["id"] - 1] = 1;
                    }
                }
            }
        }
        SaveUtils_1.default.inst.SaveData();
    };
    //Group_4
    Main.prototype.Continue = function () {
        if (this.isDeath)
            return;
        var baba = cc.find("Canvas/Group_4/ScrollView/view/Layout");
        var entry = cc.instantiate(this.Entry);
        entry.on(cc.Node.EventType.TOUCH_END, this.Continue, this);
        var node = entry.getComponent(Entry_1.default);
        entry.getChildByName('Sprite').getComponent(cc.Sprite).spriteFrame = node.sp[UserModel_1.default.instance.useId];
        if (UserModel_1.default.instance.using == 'skin0') {
            entry.getChildByName("LabelAge").color = cc.color(0, 0, 0);
            entry.getChildByName("LabelAge").children[0].color = cc.color(0, 0, 0);
        }
        else if (UserModel_1.default.instance.using == 'skin1') {
            entry.getChildByName("LabelAge").color = cc.color(255, 255, 255);
            entry.getChildByName("LabelAge").children[0].color = cc.color(255, 255, 255);
        }
        else if (UserModel_1.default.instance.using == 'skin2') {
            entry.getChildByName("LabelAge").color = cc.color(0, 0, 0);
            entry.getChildByName("LabelAge").children[0].color = cc.color(0, 0, 0);
        }
        else if (UserModel_1.default.instance.using == 'skin3') {
            entry.getChildByName("LabelAge").color = cc.color(41, 40, 61);
            entry.getChildByName("LabelAge").children[0].color = cc.color(41, 40, 61);
        }
        else if (UserModel_1.default.instance.using == 'skin4') {
            entry.getChildByName("LabelAge").color = cc.color(255, 255, 255);
            entry.getChildByName("LabelAge").children[0].color = cc.color(255, 255, 255);
        }
        //检查天赋
        var tfcon = "";
        for (var i = 0; i < this.ConTalent.length; i++) {
            if (this.ConTalent[i] != 0 && condition_1.check(this.Talents.json[this.ConTalent[i]]["condition"], "include")) {
                // let str: string = "<color=#fff1aa>"+ this.attributeTrans(this.Talents.json[this.ConTalent[i]], this.ConTalent[i])+"</c>"
                var str = this.attributeTrans(this.Talents.json[this.ConTalent[i]], entry, this.ConTalent[i]);
                if (str != "") {
                    tfcon = str + "\n";
                }
                else {
                    tfcon += "天赋【" + this.Talents.json[this.ConTalent[i]]["name"] + "】发动成功！" + this.Talents.json[this.ConTalent[i]]["description"] + "!\n";
                }
                var index_1 = this.ConTalent.indexOf(this.ConTalent[i]);
                if (index_1 > -1) {
                    //this.ConTalent.splice(index, 1);
                    this.ConTalent[index_1] = 0;
                }
            }
        }
        //内容：
        //所有当前年龄包含的事件拿出来
        var AllEvents = [];
        for (var i = 0; i < this.AgeJson.json[this.NowAge]["event"].length; i++) {
            AllEvents.push(this.AgeJson.json[this.NowAge]["event"][i].toString().split("*"));
        }
        var CanEvents = []; //从Events选择能发生的事情
        var CanEventsweight = []; //所有能发生的事情的权重
        //cc.log(AllEvents)
        for (var i = 0; i < AllEvents.length; i++) {
            if (!condition_1.check(this.EventsJson.json[AllEvents[i][0]]["exclude"], "exclude") && condition_1.check(this.EventsJson.json[AllEvents[i][0]]["include"], "include")) {
                //!exclude有某事件时一定随机不到为true&&有某事件时才能被随机到为true
                CanEvents.push(AllEvents[i][0]);
                if (AllEvents[i].length > 1) {
                    CanEventsweight.push(AllEvents[i][1]);
                }
                else {
                    CanEventsweight.push("1");
                }
            }
        }
        //cc.log(CanEvents)
        //cc.log(CanEventsweight)
        var Maxweight = 0; //最大权重
        var CanEventsweight2 = []; //所有能发生的事情的权重2
        for (var i = 0; i < CanEventsweight.length; i++) {
            Maxweight += Number(CanEventsweight[i]);
            CanEventsweight2.push(Maxweight);
        }
        //cc.log(CanEventsweight2)
        var targetWeight = Math.random() * Maxweight;
        //cc.log(targetWeight)
        //最终通关谁大于targetWeight确定事件
        var index;
        for (index = 0; index < CanEventsweight2.length; index++) {
            if (CanEventsweight2[index] > targetWeight) {
                break;
            }
        }
        //cc.log(index)
        //cc.log(CanEvents[index])
        //加入事件池
        condition_1.DEFAULT_PROP["EVT"].push(Number(CanEvents[index]));
        if (!condition_1.DEFAULT_CJ["AEVT"].includes(Number(CanEvents[index]))) {
            condition_1.DEFAULT_CJ["AEVT"].push(Number(CanEvents[index]));
        }
        //cc.log(DEFAULT_PROP["EVT"])
        var e = this.EventsJson.json[Number(CanEvents[index])];
        if (e == undefined) {
            e = this.EventsJson.json["10000"];
        }
        //追加事件
        this.cont = e["event"];
        this.contZhujia = "";
        if (this.NowAge == 500)
            console.log('数据111', e);
        if (e["branch"]) {
            if (this.NowAge == 500) {
                entry.getChildByName("Label").getComponent(cc.RichText).string = "<color=" + this.tex_4_lal + ">" + this.cont + "</c>";
                this.Brach(e, this.contZhujia, entry);
            }
            else {
                var isHave = false;
                for (var i = 0; i < e["branch"].length; i++) {
                    if (condition_1.check(e["branch"][i].split(":")[0])) {
                        //加入事件池
                        condition_1.DEFAULT_PROP["EVT"].push(Number(e["branch"][i].split(":")[1]));
                        var dx = this.EventsJson.json[Number(e["branch"][i].split(":")[1])];
                        //属性变化
                        this.attributeTrans(dx, entry);
                        //追加描述
                        this.contZhujia += "\n" + dx["event"]; //内容
                        isHave = true;
                        if (dx["postEvent"]) {
                            this.contZhujia += "\n" + dx["postEvent"];
                        }
                        if (dx["effect"]) {
                            if (dx["effect"]["CHR"]) {
                                var num = dx["effect"]["CHR"] > 0 ? "+" + dx["effect"]["CHR"] : dx["effect"]["CHR"];
                                this.contZhujia += "\n<color=" + this.tex_4_lal1 + ">颜值" + num + "</color>";
                            }
                            if (dx["effect"]["INT"]) {
                                var num = dx["effect"]["INT"] > 0 ? "+" + dx["effect"]["INT"] : dx["effect"]["INT"];
                                this.contZhujia += "\n<color=" + this.tex_4_lal1 + ">智力" + num + "</color>";
                            }
                            if (dx["effect"]["STR"]) {
                                var num = dx["effect"]["STR"] > 0 ? "+" + dx["effect"]["STR"] : dx["effect"]["STR"];
                                this.contZhujia += "\n<color=" + this.tex_4_lal1 + ">体质" + num + "</color>";
                            }
                            if (dx["effect"]["MNY"]) {
                                var num = dx["effect"]["MNY"] > 0 ? "+" + dx["effect"]["MNY"] : dx["effect"]["MNY"];
                                this.contZhujia += "\n<color=" + this.tex_4_lal1 + ">家境" + num + "</color>";
                            }
                            if (dx["effect"]["SPR"]) {
                                var num = dx["effect"]["SPR"] > 0 ? "+" + dx["effect"]["SPR"] : dx["effect"]["SPR"];
                                this.contZhujia += "\n<color=" + this.tex_4_lal1 + ">快乐" + num + "</color>";
                            }
                        }
                        break;
                    }
                }
                //追加描述
                if (!isHave) {
                    if (e["postEvent"]) {
                        this.contZhujia = "\n" + e["postEvent"];
                    }
                }
            }
        }
        else {
            //追加描述
            if (e["postEvent"]) {
                this.contZhujia = "\n" + e["postEvent"];
            }
        }
        //let str;
        if (this.NowAge != 500) {
            if (this.contZhujia != "") {
                entry.getChildByName("Label").getComponent(cc.RichText).string =
                    "<color=" + this.tex_4_lal1 + ">" + tfcon + "</c>" +
                        "<color=" + this.tex_4_lal + ">" + this.cont + "</c>" +
                        "<color=" + this.tex_4_lal1 + ">" + this.contZhujia + "</c>";
                //str = this.cont + '\n' + this.contZhujia
            }
            else {
                entry.getChildByName("Label").getComponent(cc.RichText).string =
                    "<color=" + this.tex_4_lal1 + ">" + tfcon + "</c>" +
                        "<color=" + this.tex_4_lal + ">" + this.cont + "</c>";
                //str = this.cont
            }
        }
        // if (this.NowAge == 500) console.log('500岁年龄', this.NowAge)
        entry.getChildByName("LabelAge").getComponent(cc.Label).string = this.NowAge.toString();
        //属性变化
        this.attributeTrans(e, entry);
        //判断死亡
        if (condition_1.DEFAULT_PROP["LIF"] <= 0) {
            this.isDeath = true;
            cc.find("Canvas/Group_4/Start").active = true;
            cc.find("Canvas/Group_4/Auto").active = false;
            cc.find("Canvas/Group_4/Auto2").active = false;
        }
        entry.parent = cc.find("Canvas");
        var duh = entry.getChildByName("Label").getContentSize().height - 50.4;
        //entry.parent = baba
        var bs = Math.floor(duh / 39); //多行倍率
        // if(this.NowAge==500){bs+=19}
        entry.setContentSize(cc.size(780, 65 + 40 * bs));
        entry.getChildByName("LabelAge").y += 20 * bs;
        entry.getChildByName("Sprite").setContentSize(cc.size(780, 52 + 40 * bs));
        entry.getChildByName("BG").setContentSize(cc.size(600, 80 + 40 * bs));
        //排版
        var pb = entry.getContentSize().height;
        //cc.log(entry.getChildByName("Label").getContentSize().height)
        entry.parent = baba;
        // if (this.NowAge == 500) console.log('500岁年龄', entry.getChildByName("LabelAge").getComponent(cc.Label).string, entry.getChildByName("Label").getComponent(cc.RichText).string)
        cc.find("Canvas/Group_4/ScrollView").getComponent(cc.ScrollView).scrollToBottom(0.1);
        //年龄加一
        if (this.rebuild) {
            this.NowAge += this.rebuildAge;
            this.rebuild = false;
        }
        else {
            this.NowAge += 1;
        }
        condition_1.DEFAULT_PROP.AGE = this.NowAge;
        //成就检查
        this.check_cj("TRAJECTORY");
    };
    Main.prototype.Brach = function (e, contZhujia, entry) {
        var isHave = false;
        for (var i = 0; i < e["branch"].length; i++) {
            // cc.log(i)
            if (condition_1.check(e["branch"][i].split(":")[0])) {
                // cc.log(Number(e["branch"][i].split(":")[1]))
                var dx = this.EventsJson.json[Number(e["branch"][i].split(":")[1])];
                //追加描述
                contZhujia = '\n' + dx["event"]; //内容
                // console.log('内容', contZhujia)
                isHave = true;
                entry.getChildByName("Label").getComponent(cc.RichText).string += "<color=" + this.tex_4_lal + ">" + contZhujia + "</c>";
                if (dx["postEvent"]) {
                    entry.getChildByName("Label").getComponent(cc.RichText).string += "<color=" + this.tex_4_lal1 + ">" + '\n' + dx["postEvent"] + "</c>";
                }
                //属性变化
                this.attributeTrans(dx, entry);
                if (dx["branch"]) {
                    this.Brach(dx, contZhujia, entry);
                }
                break;
            }
        }
        //追加描述
        if (isHave) {
            if (e["postEvent"]) {
                contZhujia += e["postEvent"];
            }
            return contZhujia;
        }
    };
    Main.prototype.STRadd = function (event, customEventData) {
        // {
        condition_1.DEFAULT_PROP["STR"] += Number(customEventData);
        cc.find("Canvas/Group_4/Layout/STR/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u4F53\u8D28 </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["STR"] + "</color>";
        condition_1.DEFAULT_CJ["HSTR"] = condition_1.DEFAULT_PROP["STR"] > condition_1.DEFAULT_CJ["HSTR"] ? condition_1.DEFAULT_PROP["STR"] : condition_1.DEFAULT_CJ["HSTR"];
        condition_1.DEFAULT_CJ["LSTR"] = condition_1.DEFAULT_PROP["STR"] < condition_1.DEFAULT_CJ["LSTR"] ? condition_1.DEFAULT_PROP["STR"] : condition_1.DEFAULT_CJ["LSTR"];
        // }
    };
    //属性变化
    Main.prototype.attributeTrans = function (e, entry, index) {
        //DEFAULT_PROP["STR"] +=100
        if (e["effect"]) {
            if (e["effect"]["CHR"]) {
                condition_1.DEFAULT_PROP["CHR"] += e["effect"]["CHR"];
                cc.find("Canvas/Group_4/Layout/CHR/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u989C\u503C </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["CHR"] + "</color>";
                condition_1.DEFAULT_CJ["HCHR"] = condition_1.DEFAULT_PROP["CHR"] > condition_1.DEFAULT_CJ["HCHR"] ? condition_1.DEFAULT_PROP["CHR"] : condition_1.DEFAULT_CJ["HCHR"];
                condition_1.DEFAULT_CJ["LCHR"] = condition_1.DEFAULT_PROP["CHR"] < condition_1.DEFAULT_CJ["LCHR"] ? condition_1.DEFAULT_PROP["CHR"] : condition_1.DEFAULT_CJ["LCHR"];
                var num = e["effect"]["CHR"] > 0 ? "+" + e["effect"]["CHR"] : e["effect"]["CHR"];
                entry.getChildByName("Label").getComponent(cc.RichText).string += "\n<color=" + this.tex_4_lal1 + ">颜值" + num + "</color>";
            }
            if (e["effect"]["INT"]) {
                condition_1.DEFAULT_PROP["INT"] += e["effect"]["INT"];
                cc.find("Canvas/Group_4/Layout/INT/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u667A\u529B </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["INT"] + "</color>";
                condition_1.DEFAULT_CJ["HINT"] = condition_1.DEFAULT_PROP["INT"] > condition_1.DEFAULT_CJ["HINT"] ? condition_1.DEFAULT_PROP["INT"] : condition_1.DEFAULT_CJ["HINT"];
                condition_1.DEFAULT_CJ["LINT"] = condition_1.DEFAULT_PROP["INT"] < condition_1.DEFAULT_CJ["LINT"] ? condition_1.DEFAULT_PROP["INT"] : condition_1.DEFAULT_CJ["LINT"];
                var num = e["effect"]["INT"] > 0 ? "+" + e["effect"]["INT"] : e["effect"]["INT"];
                entry.getChildByName("Label").getComponent(cc.RichText).string += "\n<color=" + this.tex_4_lal1 + ">智力" + num + "</color>";
            }
            if (e["effect"]["STR"]) {
                condition_1.DEFAULT_PROP["STR"] += e["effect"]["STR"];
                cc.find("Canvas/Group_4/Layout/STR/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u4F53\u8D28 </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["STR"] + "</color>";
                condition_1.DEFAULT_CJ["HSTR"] = condition_1.DEFAULT_PROP["STR"] > condition_1.DEFAULT_CJ["HSTR"] ? condition_1.DEFAULT_PROP["STR"] : condition_1.DEFAULT_CJ["HSTR"];
                condition_1.DEFAULT_CJ["LSTR"] = condition_1.DEFAULT_PROP["STR"] < condition_1.DEFAULT_CJ["LSTR"] ? condition_1.DEFAULT_PROP["STR"] : condition_1.DEFAULT_CJ["LSTR"];
                var num = e["effect"]["STR"] > 0 ? "+" + e["effect"]["STR"] : e["effect"]["STR"];
                entry.getChildByName("Label").getComponent(cc.RichText).string += "\n<color=" + this.tex_4_lal1 + ">体质" + num + "</color>";
            }
            if (e["effect"]["MNY"]) {
                condition_1.DEFAULT_PROP["MNY"] += e["effect"]["MNY"];
                cc.find("Canvas/Group_4/Layout/MNY/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u5BB6\u5883 </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["MNY"] + "</color>";
                condition_1.DEFAULT_CJ["HMNY"] = condition_1.DEFAULT_PROP["MNY"] > condition_1.DEFAULT_CJ["HMNY"] ? condition_1.DEFAULT_PROP["MNY"] : condition_1.DEFAULT_CJ["HMNY"];
                condition_1.DEFAULT_CJ["LMNY"] = condition_1.DEFAULT_PROP["MNY"] < condition_1.DEFAULT_CJ["LMNY"] ? condition_1.DEFAULT_PROP["MNY"] : condition_1.DEFAULT_CJ["LMNY"];
                var num = e["effect"]["MNY"] > 0 ? "+" + e["effect"]["MNY"] : e["effect"]["MNY"];
                entry.getChildByName("Label").getComponent(cc.RichText).string += "\n<color=" + this.tex_4_lal1 + ">家境" + num + "</color>";
            }
            if (e["effect"]["SPR"]) {
                condition_1.DEFAULT_PROP["SPR"] += e["effect"]["SPR"];
                cc.find("Canvas/Group_4/Layout/SPR/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u5FEB\u4E50 </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["SPR"] + "</color>";
                condition_1.DEFAULT_CJ["HSPR"] = condition_1.DEFAULT_PROP["SPR"] > condition_1.DEFAULT_CJ["HSPR"] ? condition_1.DEFAULT_PROP["SPR"] : condition_1.DEFAULT_CJ["HSPR"];
                condition_1.DEFAULT_CJ["LSPR"] = condition_1.DEFAULT_PROP["SPR"] < condition_1.DEFAULT_CJ["LSPR"] ? condition_1.DEFAULT_PROP["SPR"] : condition_1.DEFAULT_CJ["LSPR"];
                var num = e["effect"]["SPR"] > 0 ? "+" + e["effect"]["SPR"] : e["effect"]["SPR"];
                entry.getChildByName("Label").getComponent(cc.RichText).string += "\n<color=" + this.tex_4_lal1 + ">快乐" + num + "</color>";
            }
            if (e["effect"]["LIF"]) {
                condition_1.DEFAULT_PROP["LIF"] += e["effect"]["LIF"];
            }
            if (e["effect"]["AGE"]) {
                if (e['id'] == 20409) {
                    this.rebuild = true;
                    this.rebuildAge = Number(e["effect"]["AGE"]);
                }
                else {
                    this.NowAge += Number(e["effect"]["AGE"]);
                }
                condition_1.DEFAULT_CJ["HAGE"] = this.NowAge > condition_1.DEFAULT_CJ["HAGE"] ? this.NowAge : condition_1.DEFAULT_CJ["HAGE"];
            }
            if (e["effect"]["RDM"]) {
                //随机属性增加
                var i = e["effect"]["RDM"];
                for (var a = 0; a < i; a++) {
                    switch (Math.ceil(Math.random() * 5)) {
                        case 1:
                            condition_1.DEFAULT_PROP["CHR"] += 1;
                            cc.find("Canvas/Group_4/Layout/CHR/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u989C\u503C </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["CHR"] + "</color>";
                            break;
                        case 2:
                            condition_1.DEFAULT_PROP["INT"] += 1;
                            cc.find("Canvas/Group_4/Layout/INT/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u667A\u529B </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["INT"] + "</color>";
                            break;
                        case 3:
                            condition_1.DEFAULT_PROP["STR"] += 1;
                            cc.find("Canvas/Group_4/Layout/STR/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u4F53\u8D28 </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["STR"] + "</color>";
                            break;
                        case 4:
                            condition_1.DEFAULT_PROP["MNY"] += 1;
                            cc.find("Canvas/Group_4/Layout/MNY/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u5BB6\u5883 </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["MNY"] + "</color>";
                            break;
                        case 5:
                            condition_1.DEFAULT_PROP["SPR"] += 1;
                            cc.find("Canvas/Group_4/Layout/SPR/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u5FEB\u4E50 </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["SPR"] + "</color>";
                            break;
                    }
                }
            }
        }
        SaveUtils_1.default.inst.SaveData();
        if (e["replacement"]) {
            if (e["replacement"]["grade"]) {
                console.log('数据', e["replacement"]["grade"], e);
                var grade = e["replacement"]["grade"][0]; //稀有度
                var grades_1 = [];
                // console.log('数组',grades)
                for (var i = 0; i < Object.keys(this.Talents.json).length; i++) {
                    // console.log('条件', !this.tichu.includes(1001 + i), this.Talents.json[1001 + i]["show"], this.Talents.json[1001 + i]["grade"], grade)
                    if (!this.tichu.includes(1001 + i) && this.Talents.json[1001 + i]["show"] != 0 && this.Talents.json[1001 + i]["grade"] == grade) { //剔除数组里没有，并且稀有度符合
                        grades_1.push(1001 + i);
                    }
                }
                // console.log('数组',grades)
                var j = Math.floor(Math.random() * grades_1.length);
                grades_1[j]; //最终随出来的
                var h = condition_1.DEFAULT_PROP.TLT.indexOf(index); //要被替换的天赋的角标
                condition_1.DEFAULT_PROP.TLT[h] = grades_1[j]; //替换
                this.ConTalent.push(grades_1[j]); //替换
                //this.TipsOpen(true, "天赋【" + this.Talents.json[index]["name"] + "】发动成功！替换成【" + this.Talents.json[grades[j]]["name"] + "】")
                return "天赋【" + this.Talents.json[index]["name"] + "】发动成功！替换成【" + this.Talents.json[grades_1[j]]["name"] + "】";
            }
            else if (e["replacement"]["talent"]) {
                //console.log('数据1', e["replacement"]["talent"], e)
                var grades_2 = [];
                for (var i = 0; i < e["replacement"]["talent"].length; i++) {
                    grades_2.push(e["replacement"]["talent"][i].toString().split('*')[0]);
                }
                var j = Math.floor(Math.random() * grades_2.length);
                grades_2[j]; //最终随出来的
                var h = condition_1.DEFAULT_PROP.TLT.indexOf(index); //要被替换的天赋的角标
                condition_1.DEFAULT_PROP.TLT[h] = grades_2[j]; //替换
                this.ConTalent.push(grades_2[j]); //替换
                //this.TipsOpen(true, "天赋【" + this.Talents.json[index]["name"] + "】发动成功！替换成【" + this.Talents.json[grades[j]]["name"] + "】")
                return "天赋【" + this.Talents.json[index]["name"] + "】发动成功！替换成【" + this.Talents.json[grades_2[j]]["name"] + "】";
            }
        }
        else {
            return "";
        }
    };
    //自动添加点击事件
    Main.prototype.AutoAddClickEvent = function (node, componentName, handlerName, parameter, button) {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = componentName;
        clickEventHandler.handler = handlerName;
        clickEventHandler.customEventData = parameter;
        button.getComponent(cc.Button).clickEvents.push(clickEventHandler);
    };
    Main.prototype.Zongjie = function () {
        //数据持久化
        condition_1.DEFAULT_CJ.TMS += 1;
        SaveUtils_1.default.inst.SaveData();
        if (UserModel_1.default.instance.adCd) {
            UserModel_1.default.instance.adCd = false;
            UserModel_1.default.instance.save();
        }
        //界面切换
        cc.find("Canvas/Group_4").active = false;
        cc.find("Canvas/Group_5").active = true;
        //评分
        cc.find("Canvas/Group_5/Box/Layout/CHR/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u989C\u503C </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["CHR"] + "</color>";
        cc.find("Canvas/Group_5/Box/Layout/INT/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u667A\u529B </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["INT"] + "</color>";
        cc.find("Canvas/Group_5/Box/Layout/STR/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u4F53\u8D28 </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["STR"] + "</color>";
        cc.find("Canvas/Group_5/Box/Layout/MNY/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u5BB6\u5883 </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["MNY"] + "</color>";
        cc.find("Canvas/Group_5/Box/Layout/SPR/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u5FEB\u4E50 </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["SPR"] + "</color>";
        cc.find("Canvas/Group_5/Box/AGE/Label").getComponent(cc.Label).string = "第" + condition_1.DEFAULT_CJ["TMS"] + "世，享年" + this.NowAge + "岁";
        var sum = condition_1.DEFAULT_PROP["CHR"] + condition_1.DEFAULT_PROP["INT"] + condition_1.DEFAULT_PROP["STR"] + condition_1.DEFAULT_PROP["MNY"] + condition_1.DEFAULT_PROP["SPR"] + this.NowAge; //总分计算公式
        condition_1.DEFAULT_CJ["SUM"] = sum > condition_1.DEFAULT_CJ["SUM"] ? sum : condition_1.DEFAULT_CJ["SUM"];
        cc.find("Canvas/Group_5/Box/SUM/Label").getComponent(cc.Label).string = sum.toString();
        cc.find("Canvas/Group_5/Box/Legend/" + summary_1.summary("SUM", sum)["judge"]).active = true;
        //下辈子三选一天赋
        for (var i = 0; i < condition_1.DEFAULT_PROP["TLT"].length; i++) {
            //打开label
            cc.find("Canvas/Group_5/Box/Label2").active = true;
            var index = condition_1.DEFAULT_PROP["TLT"][i];
            var j = cc.instantiate(this.normalLabel);
            this.updateNromalLable(j, summary_1.grades[this.Talents.json[index]["grade"]]);
            j.parent = cc.find("Canvas/Group_5/Box/ScrollView2/view/Layout");
            this.AutoAddClickEvent(this.node, "Main", "SelectLunTalent", (i + 1).toString(), j);
            j.getChildByName("Label").getComponent(cc.Label).string = this.Talents.json[index]["name"] + "(" + this.Talents.json[index]["description"] + ")";
        }
        //插屏
        if (cc.sys.platform == cc.sys.VIVO_GAME || cc.sys.platform == cc.sys.XIAOMI_GAME || window['uc']) {
            // console.log('请选择')
            Global_1.default.platform.SHOW_TITIALAD1();
        }
        //特效销毁
        this.scheduleOnce(function () {
            cc.find("Canvas/Group_5/Box/Anim").active = false;
            cc.find("Canvas/Group_5/Box/Legend").active = true;
        }, 1.5);
        //成就检查
        this.check_cj("SUMMARY");
    };
    Main.prototype.isAutoPlay = function () {
        var _this = this;
        if (!this.istimmerCDauto) {
            this.istimmerCDauto = true;
        }
        else {
            return;
        }
        if (!GlobalDefine_1.SaveData.isAutoAD) {
            if (window["tt"]) {
                //垃圾抖音得先弹窗
                this.is1or2 = 1;
                cc.find("Canvas/Group_4/DYLJ").active = true;
                return;
            }
            Global_1.default.platform.CLOSE_VIDEO(function () {
                GlobalDefine_1.SaveData.isAuto = true;
                GlobalDefine_1.SaveData.isAutoAD = true;
                GlobalDefine_1.SaveData.isAuto2 = false;
                cc.find("Canvas/Group_4/Auto2/Background/ZD1").active = true;
                cc.find("Canvas/Group_4/Auto2/Background/ZD2").active = false;
                SaveUtils_1.default.inst.SaveData();
                cc.find("Canvas/Group_4/Auto/Background/Icon").active = false;
                cc.find("Canvas/Group_4/Auto/Background/ZD1").active = false;
                cc.find("Canvas/Group_4/Auto/Background/ZD2").active = true;
                cc.find("Canvas/Group_4/DYLJ").active = false;
            }, function () {
                _this.TipsOpen(true, cc.color(128, 223, 239), "广告未播放完成");
            }, function () {
                _this.TipsOpen(true, cc.color(128, 223, 239), "暂无广告，请稍后再试");
            }, "18");
        }
        else {
            GlobalDefine_1.SaveData.isAuto2 = false;
            cc.find("Canvas/Group_4/Auto2/Background/ZD1").active = true;
            cc.find("Canvas/Group_4/Auto2/Background/ZD2").active = false;
            if (GlobalDefine_1.SaveData.isAuto) {
                GlobalDefine_1.SaveData.isAuto = false;
                cc.find("Canvas/Group_4/Auto/Background/ZD1").active = true;
                cc.find("Canvas/Group_4/Auto/Background/ZD2").active = false;
            }
            else {
                GlobalDefine_1.SaveData.isAuto = true;
                cc.find("Canvas/Group_4/Auto/Background/ZD1").active = false;
                cc.find("Canvas/Group_4/Auto/Background/ZD2").active = true;
            }
            SaveUtils_1.default.inst.SaveData();
        }
    };
    Main.prototype.isAutoPlay2 = function () {
        var _this = this;
        if (!this.istimmerCDauto) {
            this.istimmerCDauto = true;
        }
        else {
            return;
        }
        if (GlobalDefine_1.SaveData.isAutoAD2 && Math.round(new Date().getTime()) / 1000 - GlobalDefine_1.SaveData.LastTime > summary_1.ADtime) {
            //超时了
            GlobalDefine_1.SaveData.isAutoAD2 = false;
            GlobalDefine_1.SaveData.isAuto2 = false;
        }
        if (!GlobalDefine_1.SaveData.isAutoAD2) {
            if (window["tt"]) {
                //垃圾抖音得先弹窗
                this.is1or2 = 2;
                cc.find("Canvas/Group_4/autobiography").active = true;
                return;
            }
            Global_1.default.platform.CLOSE_VIDEO(function () {
                GlobalDefine_1.SaveData.LastTime = Math.round(new Date().getTime()) / 1000;
                GlobalDefine_1.SaveData.isAuto2 = true;
                GlobalDefine_1.SaveData.isAutoAD2 = true;
                GlobalDefine_1.SaveData.isAuto = false;
                cc.find("Canvas/Group_4/Auto/Background/ZD1").active = true;
                cc.find("Canvas/Group_4/Auto/Background/ZD2").active = false;
                SaveUtils_1.default.inst.SaveData();
                cc.find("Canvas/Group_4/Auto2/Background/Icon").active = false;
                cc.find("Canvas/Group_4/Auto2/Background/ZD1").active = false;
                cc.find("Canvas/Group_4/Auto2/Background/ZD2").active = true;
                cc.find("Canvas/Group_4/DYLJ").active = false;
            }, function () {
                _this.TipsOpen(true, cc.color(128, 223, 239), "广告未播放完成");
            }, function () {
                _this.TipsOpen(true, cc.color(128, 223, 239), "暂无广告，请稍后再试");
            }, '62');
        }
        else {
            GlobalDefine_1.SaveData.isAuto = false;
            cc.find("Canvas/Group_4/Auto/Background/ZD1").active = true;
            cc.find("Canvas/Group_4/Auto/Background/ZD2").active = false;
            if (GlobalDefine_1.SaveData.isAuto2) {
                GlobalDefine_1.SaveData.isAuto2 = false;
                cc.find("Canvas/Group_4/Auto2/Background/ZD1").active = true;
                cc.find("Canvas/Group_4/Auto2/Background/ZD2").active = false;
            }
            else {
                GlobalDefine_1.SaveData.isAuto2 = true;
                cc.find("Canvas/Group_4/Auto2/Background/ZD1").active = false;
                cc.find("Canvas/Group_4/Auto2/Background/ZD2").active = true;
            }
            SaveUtils_1.default.inst.SaveData();
        }
    };
    Main.prototype.closeAutoPlay2 = function () {
        cc.find("Canvas/Group_4/autobiography").active = false;
    };
    Main.prototype.watchAutoPlay2 = function () {
        var _this = this;
        Global_1.default.platform.CLOSE_VIDEO(function () {
            cc.find("Canvas/Group_4/autobiography").active = false;
            GlobalDefine_1.SaveData.LastTime = Math.round(new Date().getTime()) / 1000;
            GlobalDefine_1.SaveData.isAuto2 = true;
            GlobalDefine_1.SaveData.isAutoAD2 = true;
            GlobalDefine_1.SaveData.isAuto = false;
            cc.find("Canvas/Group_4/Auto/Background/ZD1").active = true;
            cc.find("Canvas/Group_4/Auto/Background/ZD2").active = false;
            SaveUtils_1.default.inst.SaveData();
            cc.find("Canvas/Group_4/Auto2/Background/Icon").active = false;
            cc.find("Canvas/Group_4/Auto2/Background/ZD1").active = false;
            cc.find("Canvas/Group_4/Auto2/Background/ZD2").active = true;
            cc.find("Canvas/Group_4/DYLJ").active = false;
        }, function () {
            _this.TipsOpen(true, cc.color(128, 223, 239), "广告未播放完成");
        }, function () {
            _this.TipsOpen(true, cc.color(128, 223, 239), "暂无广告，请稍后再试");
        }, '62');
    };
    Main.prototype.AutoFuc = function () {
        var _this = this;
        Global_1.default.platform.CLOSE_VIDEO(function () {
            if (_this.is1or2) {
                GlobalDefine_1.SaveData.isAuto = true;
                GlobalDefine_1.SaveData.isAutoAD = true;
            }
            else {
                GlobalDefine_1.SaveData.isAuto2 = true;
                GlobalDefine_1.SaveData.isAutoAD2 = true;
            }
            SaveUtils_1.default.inst.SaveData();
            cc.find("Canvas/Group_4/Auto/Background/Icon").active = false;
            cc.find("Canvas/Group_4/Auto/Background/ZD1").active = false;
            cc.find("Canvas/Group_4/Auto/Background/ZD2").active = true;
            cc.find("Canvas/Group_4/DYLJ").active = false;
        }, function () {
            _this.TipsOpen(true, cc.color(128, 223, 239), "广告未播放完成");
        }, function () {
            _this.TipsOpen(true, cc.color(128, 223, 239), "暂无广告，请稍后再试");
        }, "18");
    };
    //Groud_5
    Main.prototype.rerere = function () {
        Global_1.default.isFirstEnterCJ = true;
        cc.director.loadScene('LifeRebirth');
    };
    Main.prototype.WXShare = function () {
        //微信手动分享
        Global_1.default.platform.Share(function () { });
    };
    //选择轮回天赋
    Main.prototype.SelectLunTalent = function (event, customEventData) {
        GlobalDefine_1.SaveData.LunHuiTalent = Number(condition_1.DEFAULT_PROP["TLT"][customEventData - 1]);
        SaveUtils_1.default.inst.SaveData();
        for (var i = 0; i < cc.find("Canvas/Group_5/Box/ScrollView2/view/Layout").childrenCount; i++) {
            if (Number(customEventData) === (i + 1)) {
                cc.find("Canvas/Group_5/Box/ScrollView2/view/Layout").children[i].getChildByName("Box_Selected").active = true;
            }
            else {
                cc.find("Canvas/Group_5/Box/ScrollView2/view/Layout").children[i].getChildByName("Box_Selected").active = false;
            }
        }
    };
    //广告（天选之人）
    Main.prototype.addAttribute = function (event, customEventData) {
        var _this = this;
        Global_1.default.platform.CLOSE_VIDEO(function () {
            var num = Number(customEventData);
            _this.MaxUseNum += num;
            _this.CanUse(num);
            if (_this.TXCS >= 2) {
                cc.find("Canvas/Group_3/ADD").active = false;
                cc.find("Canvas/Group_3/Random").x = 0;
            }
            console.log("成功");
        }, function () {
            console.log("失败");
        }, function () {
            _this.TipsOpen(true, cc.color(128, 223, 239), "暂无广告，请稍后再试");
        }, "15");
    };
    //从新抽天赋(逆天改命)
    Main.prototype.Reopen = function (event, customEventData) {
        var _this = this;
        Global_1.default.platform.CLOSE_VIDEO(function () {
            //重置逻辑
            condition_1.DEFAULT_PROP["TLT"] = [];
            _this.AlreadyTalentButton = [];
            _this.AllShowTalent = [];
            _this.NowSelectTalentNum = 0;
            //奖励一个稀有度为2的天赋
            var twe = [1005, 1014, 1018, 1019, 1024, 1025, 1083, 1104, 1112, 1128, 1129, 1131];
            var zs = twe[Math.floor(Math.random() * twe.length)];
            GlobalDefine_1.SaveData.LunHuiTalent = zs;
            SaveUtils_1.default.inst.SaveData();
            _this.TenCP();
            console.log("成功");
        }, function () {
            console.log("失败");
        }, function () {
            _this.TipsOpen(true, cc.color(128, 223, 239), "暂无广告，请稍后再试");
        }, "12");
    };
    Main.prototype.moveStart = function (e) {
        this.startPos = null;
        this.startPos = e.getLocation();
    };
    Main.prototype.moveIng = function (e) {
        if (e.getLocation().y - this.startPos.y >= 15) {
            this.TipsOpen(false, cc.color(128, 223, 239));
        }
    };
    //Group_6返回按钮
    Main.prototype.Group_6_Return = function () {
        if (this.achievement) {
            this.achievement.destroy();
            this.achievement = null;
        }
        cc.find("Canvas/Group_1").active = true;
        cc.find("Canvas/Group_6").active = false;
        Global_1.default.gapTime = 0;
        Global_1.default.isShow = true;
    };
    //打开成就界面
    Main.prototype.Open_chengjiu = function () {
        this.Gentalent();
        cc.find("Canvas/Group_1").active = false;
        cc.find("Canvas/Group_6").active = true;
        Global_1.default.gapTime = 0;
        Global_1.default.isShow = false;
    };
    //生成天赋
    Main.prototype.Gentalent = function () {
        var _this = this;
        var mao = [];
        var mao1 = [];
        for (var i in this.Achievement.json) {
            if (condition_1.DEFAULT_CJ.ACJ.includes(this.Achievement.json[i].id)) {
                mao.push(this.Achievement.json[i]);
            }
            else {
                mao1.push(this.Achievement.json[i]);
            }
        }
        for (var i = 0; i < mao1.length; i++) {
            mao.push(mao1[i]);
        }
        var mao2 = []; //
        var num = Math.ceil(Object.keys(this.Achievement.json).length * 0.5);
        for (var k = 0, index = 0; k < num; k++) {
            mao2.push(mao.slice(index, index += 2));
        }
        ResMgr_1.default.loadPrefab('prefab/achievement', function (pre) {
            var prefab = cc.instantiate(pre);
            prefab.parent = _this.node.getChildByName('Group_6');
            var hight = (cc.winSize.height - 1280) / 2;
            prefab.y = -220;
            prefab.getComponent(achievement_1.default).data = mao2;
            prefab.getComponent(achievement_1.default).init();
            _this.achievement = prefab;
        });
    };
    //统计
    Main.prototype.tongji = function () {
        cc.find("Canvas/Group_6/Layout/1/Title").getComponent(cc.Label).string = "已重开" + condition_1.DEFAULT_CJ.TMS + "次";
        cc.find("Canvas/Group_6/Layout/2/Title").getComponent(cc.Label).string = "成就达成" + condition_1.DEFAULT_CJ.ACJ.length + "个";
        cc.find("Canvas/Group_6/Layout/1/Con").getComponent(cc.Label).string = "抽到紫色概率" + summary_1.summary("CK", condition_1.DEFAULT_CJ.TMS).judge;
        cc.find("Canvas/Group_6/Layout/2/Con").getComponent(cc.Label).string = "抽到橙色概率" + summary_1.summary("CJ", condition_1.DEFAULT_CJ.ACJ.length).judge;
        cc.find("Canvas/Group_6/Layout/3/Con").getComponent(cc.Label).string = Math.ceil(condition_1.DEFAULT_CJ.AEVT.length * 100 / Object.keys(this.Events.json).length) + "%";
        cc.find("Canvas/Group_6/Layout/4/Con").getComponent(cc.Label).string = Math.ceil(condition_1.DEFAULT_CJ.ATLT.length * 100 / Object.keys(this.Talents.json).length) + "%";
    };
    Main.prototype.group3In = function () {
        //关闭天赋选择面板
        cc.find("Canvas/Group_2").active = false;
        cc.find("Canvas/Group_3").active = true;
    };
    //关闭小友
    Main.prototype.CloseXY = function () {
        cc.find("Canvas/Group_2/AddTalent").active = false;
        this.group3In();
    };
    Main.prototype.openVideo = function () {
        var _this = this;
        ResMgr_1.default.loadPrefab('prefab/rankingList', function (pre) {
            var prefab = cc.instantiate(pre);
            prefab.parent = _this.node;
        });
    };
    Main.prototype.openGameBox = function () {
        var _this = this;
        ResMgr_1.default.loadPrefab('prefab/gameBox', function (pre) {
            var prefab = cc.instantiate(pre);
            prefab.parent = _this.node;
        });
    };
    __decorate([
        property(cc.JsonAsset)
    ], Main.prototype, "branchline", void 0);
    __decorate([
        property(cc.JsonAsset)
    ], Main.prototype, "Age", void 0);
    __decorate([
        property(cc.JsonAsset)
    ], Main.prototype, "Events", void 0);
    __decorate([
        property(cc.JsonAsset)
    ], Main.prototype, "Talents", void 0);
    __decorate([
        property(cc.JsonAsset)
    ], Main.prototype, "Achievement", void 0);
    __decorate([
        property(cc.Node)
    ], Main.prototype, "TenCPShow", void 0);
    __decorate([
        property(cc.Node)
    ], Main.prototype, "TenCPButton", void 0);
    __decorate([
        property(cc.Node)
    ], Main.prototype, "Tips", void 0);
    __decorate([
        property(cc.Prefab)
    ], Main.prototype, "Entry", void 0);
    __decorate([
        property(cc.Prefab)
    ], Main.prototype, "Box", void 0);
    __decorate([
        property(cc.Prefab)
    ], Main.prototype, "normalLabel", void 0);
    __decorate([
        property(cc.Prefab)
    ], Main.prototype, "MyzzBox", void 0);
    Main = __decorate([
        ccclass
    ], Main);
    return Main;
}(cc.Component));
exports.default = Main;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWFpblxcTWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBa0M7QUFDbEMsdURBQWtEO0FBQ2xELHNEQUFpRDtBQUNqRCxnREFBMkM7QUFDM0MsZ0RBQTJDO0FBQzNDLDZDQUF3QztBQUN4Qyx5Q0FBOEQ7QUFDOUQsaUNBQTRCO0FBQzVCLG1DQUE4QjtBQUM5QixxQ0FBMEU7QUFFcEUsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBa0Msd0JBQVk7SUFBOUM7UUFBQSxxRUF1NkNDO1FBcjZDRyxVQUFJLEdBQVksS0FBSyxDQUFBO1FBRXJCLGdCQUFVLEdBQWlCLElBQUksQ0FBQTtRQUcvQixTQUFHLEdBQWlCLElBQUksQ0FBQTtRQUV4QixZQUFNLEdBQWlCLElBQUksQ0FBQTtRQUUzQixhQUFPLEdBQWlCLElBQUksQ0FBQTtRQUU1QixpQkFBVyxHQUFpQixJQUFJLENBQUE7UUFFaEMsa0JBQVksR0FBVyxDQUFDLENBQUE7UUFFeEIsYUFBTyxHQUFpQixJQUFJLENBQUEsQ0FBQSxTQUFTO1FBQ3JDLGdCQUFVLEdBQWlCLElBQUksQ0FBQSxDQUFBLFdBQVc7UUFDMUMsSUFBSTtRQUVKLGVBQVMsR0FBWSxJQUFJLENBQUE7UUFFekIsaUJBQVcsR0FBWSxJQUFJLENBQUE7UUFFM0IsVUFBSSxHQUFZLElBQUksQ0FBQTtRQUVwQixXQUFLLEdBQWMsSUFBSSxDQUFBO1FBRXZCLFNBQUcsR0FBYyxJQUFJLENBQUE7UUFFckIsaUJBQVcsR0FBYyxJQUFJLENBQUE7UUFHN0IsYUFBTyxHQUFjLElBQUksQ0FBQTtRQUd6QixRQUFRO1FBQ1Isd0JBQWtCLEdBQVcsQ0FBQyxDQUFDLENBQUEsVUFBVTtRQUN6Qyx3QkFBa0IsR0FBVyxHQUFHLENBQUMsQ0FBQSxVQUFVO1FB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RTtZQUNyQyxLQUFLLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDMUQsS0FBSyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtTQUN6RTthQUFNLElBQUksbUJBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLE9BQU8sRUFBRTtZQUM1QyxLQUFLLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUE7WUFDaEUsS0FBSyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtTQUMvRTthQUFNLElBQUksbUJBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLE9BQU8sRUFBRTtZQUM1QyxLQUFLLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDMUQsS0FBSyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtTQUN6RTthQUFNLElBQUksbUJBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLE9BQU8sRUFBRTtZQUM1QyxLQUFLLENBQUMs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LENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Z0NBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBQTs2QkFBRTs0QkFDck0sSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0NBQUUsSUFBSSxHQUFHLEdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxVQUFVLENBQUE7NkJBQUU7NEJBQ3JNLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dDQUFFLElBQUksR0FBRyxHQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsVUFBVSxDQUFBOzZCQUFFOzRC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QyxDQUFDLHdCQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLHNCQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQUMsc0JBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyx3QkFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLHNCQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLHdCQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLHNCQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQUMsSUFBSSxHQUFHLEdBQVcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxVQUFVLENBQUE7YUFBRTtZQUM3cUIsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQUUsd0JBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxHQUFHLFlBQVUsSUFBSSxDQUFDLFdBQVcsaUNBQWtCLElBQUksQ0FBQyxZQUFZLE1BQUcsR0FBRyx3QkFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLFVBQVUsQ0FBQztnQkFBQyxzQkFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLHdCQUFZLENBQUMs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QUFJLENBQUMsQ0FBQzs0QkFBQyxFQUFFLENBQUMsSUFBSSxDQUFDLDRDQUE0QyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUcsWUFBVSxJQUFJLENBQUMsV0FBVyxpQ0FBa0IsSUFBSSxDQUFDLFlBQVksTUFBRyxHQUFHLHdCQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsVUFBVSxDQUFDOzRCQUFDLE1BQU07d0JBQ3RPLEtBQUssQ0FBQzs0QkFBRSx3QkFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFBQyxFQUFFLENBQUMsSUFBSSxDQUFDLDRDQUE0QyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUcsWUFBVSxJQUFJLENBQUMsV0FBVyxpQ0FBa0IsSUFBSSxDQUFDLFlBQVksTUFBRyxHQUFHLHdCQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsVUFBVSxDQUFDOzRCQUFDLE1BQU07d0JBQ3RPLEtBQUssQ0FBQzs0QkFBRSx3QkFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFBQyxFQUFFLENBQUMsSUFBSSxDQUFDLDRDQUE0QyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUcsWUFBVSxJQUFJLENBQUMsV0FBVyxpQ0FBa0IsSUFBSSxDQUFDLFlBQVksTUFBRyxHQUFHLHdCQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsVUFBVSxDQUFDOzRCQUFDLE1BQU07d0JBQ3RPLEtBQUssQ0FBQzs0QkFBRSx3QkFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFBQyxFQUFFLENBQUMsSUFBSSxDQUFDLDRDQUE0QyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUcsWUFBVSxJQUFJLENBQUMsV0FBVyxpQ0FBa0IsSUFBSSxDQUFDLFlBQVksTUFBRyxHQUFHLHdCQUFZLENB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RUFBRSxDQUFDLE1BQU0sQ0FBQzt1Q0FDRztJQUV2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3FDQUNDO0lBRXJCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7NkNBQ1M7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt5Q0FDSztJQWxDUixJQUFJO1FBRHhCLE9BQU87T0FDYSxJQUFJLENBdTZDeEI7SUFBRCxXQUFDO0NBdjZDRCxBQXU2Q0MsQ0F2NkNpQyxFQUFFLENBQUMsU0FBUyxHQXU2QzdDO2tCQXY2Q29CLElBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2xvYmFsIGZyb20gXCIuLi9BRC9HbG9iYWxcIjtcclxuaW1wb3J0IHdlQ2hhdFBsYXRmb3JtIGZyb20gXCIuLi9BRC93ZUNoYXRQbGF0Zm9ybVwiO1xyXG5pbXBvcnQgeyBTYXZlRGF0YSB9IGZyb20gXCIuLi9PdGhlci9HbG9iYWxEZWZpbmVcIjtcclxuaW1wb3J0IFNhdmVVdGlscyBmcm9tIFwiLi4vT3RoZXIvU2F2ZVV0aWxzXCI7XHJcbmltcG9ydCBVc2VyTW9kZWwgZnJvbSBcIi4uL090aGVyL1VzZXJNb2RlbFwiO1xyXG5pbXBvcnQgQWNoaWV2ZW1lbnQgZnJvbSBcIi4vYWNoaWV2ZW1lbnRcIjtcclxuaW1wb3J0IHsgY2hlY2ssIERFRkFVTFRfQ0osIERFRkFVTFRfUFJPUCB9IGZyb20gXCIuL2NvbmRpdGlvblwiO1xyXG5pbXBvcnQgRW50cnkgZnJvbSBcIi4vRW50cnlcIjtcclxuaW1wb3J0IFJlc01nciBmcm9tIFwiLi9SZXNNZ3JcIjtcclxuaW1wb3J0IHsgQUR0aW1lLCBncmFkZXMsIGdyYWRlc0gsIE90aGVyR3JhZGVzLCBzdW1tYXJ5IH0gZnJvbSBcIi4vc3VtbWFyeVwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW4gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHdnbmI6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICAgQHByb3BlcnR5KGNjLkpzb25Bc3NldClcclxuICAgIGJyYW5jaGxpbmU6IGNjLkpzb25Bc3NldCA9IG51bGxcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuSnNvbkFzc2V0KVxyXG4gICAgQWdlOiBjYy5Kc29uQXNzZXQgPSBudWxsXHJcbiAgICBAcHJvcGVydHkoY2MuSnNvbkFzc2V0KVxyXG4gICAgRXZlbnRzOiBjYy5Kc29uQXNzZXQgPSBudWxsXHJcbiAgICBAcHJvcGVydHkoY2MuSnNvbkFzc2V0KVxyXG4gICAgVGFsZW50czogY2MuSnNvbkFzc2V0ID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLkpzb25Bc3NldClcclxuICAgIEFjaGlldmVtZW50OiBjYy5Kc29uQXNzZXQgPSBudWxsXHJcblxyXG4gICAgSW5kZXhPZkV2ZW50OiBudW1iZXIgPSAwXHJcblxyXG4gICAgQWdlSnNvbjogY2MuSnNvbkFzc2V0ID0gbnVsbC8v5b2T5YmN55qEYWdl6KGoXHJcbiAgICBFdmVudHNKc29uOiBjYy5Kc29uQXNzZXQgPSBudWxsLy/lvZPliY3nmoRldmVudOihqFxyXG4gICAgLy9VSVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBUZW5DUFNob3c6IGNjLk5vZGUgPSBudWxsXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFRlbkNQQnV0dG9uOiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBUaXBzOiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIEVudHJ5OiBjYy5QcmVmYWIgPSBudWxsXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgQm94OiBjYy5QcmVmYWIgPSBudWxsXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgbm9ybWFsTGFiZWw6IGNjLlByZWZhYiA9IG51bGxcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgTXl6ekJveDogY2MuUHJlZmFiID0gbnVsbFxyXG5cclxuXHJcbiAgICAvL+mAieaLqeWkqei1i+WIpOaWrVxyXG4gICAgTm93U2VsZWN0VGFsZW50TnVtOiBudW1iZXIgPSAwOy8v5b2T5YmN6YCJ5oup5aSp6LWL5pWw6YePXHJcbiAgICBNYXhTZWxlY3RUYWxlbnROdW06IG51bWJlciA9IDE1MDsvL+acgOWkp+mAieaLqeWkqei1i+aVsOmHj1xyXG4gICAgQWxyZWFkeVRhbGVudEJ1dHRvbjogc3RyaW5nW10gPSBbXS8v5bey57uP6YCJ5oup55qE5aSp6LWL5oyJ6ZKuXHJcbiAgICBBbGxTaG93VGFsZW50OiBudW1iZXJbXSA9IFtdLy/miYDmnInlj6/ku6XpgInmi6nnmoTlpKnotYvvvIxpbmRleOWwseaYr+aMiemSrueahOmhuuW6j++8iOS7juS4iuWIsOS4i++8iVxyXG4gICAgQ29uVGFsZW50OiBudW1iZXJbXSA9IFtdLy/mr4/lubTmo4DmtYvnmoTlpKnotYtcclxuICAgIC8v6K6h5pe25ZmoXHJcbiAgICBUaXBzSXNPcGVuOiBib29sZWFuID0gZmFsc2UvL3RpcHPpnaLmnb/mmK/lkKbmiZPlvIBcclxuICAgIFRpcHNUaW1lcjogbnVtYmVyID0gMDsvL3RpcHPorqHml7blmahcclxuICAgIC8v5pWw5YC8XHJcbiAgICBNYXhwcm9wZXJ0eU51bTogbnVtYmVyID0gMTAvL+WQhOS4quWxnuaAp+acgOWkp+WAvFxyXG4gICAgTWF4VXNlTnVtOiBudW1iZXIgPSAyMC8v5pyA5aSn5Y+v55So54K55pWwXHJcbiAgICBTdGFyVXNlTnVtOiBudW1iZXIgPSB0aGlzLk1heFVzZU51bS8v5Yid5aeL5Y+v55So54K55pWwXHJcbiAgICBOb3dBZ2U6IG51bWJlciA9IDA7Ly/lvZPliY3lubTpvoRcclxuXHJcbiAgICBpc0RlYXRoOiBib29sZWFuID0gZmFsc2VcclxuXHJcbiAgICBpc0Jvb2w6IGJvb2xlYW4gPSBmYWxzZVxyXG5cclxuICAgIGFjaGlldmVtZW50OiBjYy5Ob2RlOy8v5oiQ5bCx5YiX6KGo54i26IqC54K5XHJcbiAgICBldmVuTGlzdE1ncjogY2MuTm9kZTtcclxuICAgIF9jb250ZW50OiBjYy5Ob2RlO1xyXG4gICAgbGlzdEFycjogQXJyYXk8YW55PiA9IFtdICAgICAvL+S6i+S7tuWIl+ihqOaVsOaNrlxyXG5cclxuICAgIGFkVGltZTogbnVtYmVyID0gMFxyXG4gICAgc3RhcnRQb3M6IGNjLlZlYzI7XHJcbiAgICB0aW1tZXJDRGF1dG86IG51bWJlciA9IDAvL+iHquWKqOaSreaUvuaMiemSruW5v+WRikNEXHJcbiAgICBpc3RpbW1lckNEYXV0bzogYm9vbGVhbiA9IGZhbHNlLy/oh6rliqjmkq3mlL7mjInpkq7lub/lkYpDRFxyXG4gICAgY29tcGxldGVseTogbnVtYmVyID0gMC8v5Yqg6L295a6M5YWoXHJcbiAgICBUWENTOiBudW1iZXIgPSAwLy/lpKnpgInmrKHmlbBcclxuXHJcbiAgICBldmVudFNjcm9sbFZpZXc6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIF9sYXN0UG9zWDogbnVtYmVyID0gMDsvL+WdkOagh+i9rOaNouS5i+WQjueahFjlgLxcclxuXHJcbiAgICBjb250OiBzdHJpbmcgPSBcIlwiXHJcbiAgICBjb250Wmh1amlhOiBzdHJpbmcgPSBcIlwiXHJcbiAgICB0aWNodTogbnVtYmVyW10gPSBbXVxyXG4gICAgaXNPcGVuWFk6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICAgZ3JvdXBfNF9sYWw6IHN0cmluZyA9ICcjMDAwMDAwJ1xyXG4gICAgZ3JvdXBfNF9sYWwxOiBzdHJpbmcgPSAnIzAwMDAwMCdcclxuICAgIHRleF80X2xhbDogc3RyaW5nID0gJyMwMDAwMDAnXHJcbiAgICB0ZXhfNF9sYWwxOiBzdHJpbmcgPSAnIzAwMDAwMCdcclxuICAgIGlzTXl6elNob3c6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuaYr+S4u+e6v+WJp+aDhVxyXG4gICAgY3VzdG9tRGF0YTogYW55O1xyXG4gICAgc2tpblByZWZhYjogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgaXMxb3IyOiBudW1iZXIgPSAxXHJcbiAgICAvL+iDjOaZr+WbvuminOiJslxyXG4gICAgcXVhbGl0eTogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgcXVhbGl0eTE6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcclxuICAgIHF1YWxpdHkyOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XHJcbiAgICBxdWFsaXR5MzogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xyXG5cclxuICAgIC8v5a2Y5YKo6Ieq5Lyg5Zu+54mH5oyJ6ZKuXHJcbiAgICBleHBlcmllbmNlU3A6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcclxuXHJcbiAgICBSYW1URjogbnVtYmVyID0gMTAvL+Wkqei1i+aVsOmHj1xyXG4gICAgaXNXVURJOiBib29sZWFuID0gdHJ1ZS8v5piv5ZCm5piv5peg5pWM5qih5byPXHJcblxyXG4gICAgY2hvaWNlOiBib29sZWFuID0gZmFsc2UvL+S7meS6uuaMh+i3r+mAieaLqeWujOaIkFxyXG5cclxuICAgIHNraW5DZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIG1hb3ppeml6aTogYm9vbGVhbiA9IGZhbHNlOy8v56ys5Yeg5qyh5byA5aeL5Lq655SfXHJcblxyXG4gICAgcmVidWlsZDogYm9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm6L2s5LiW6YeN5L+uXHJcblxyXG4gICAgcmVidWlsZEFnZTogbnVtYmVyID0gMDsvL+S7juWkmuWwkeWygei9rOS4lumHjeS/rlxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIEdsb2JhbC5wbGF0Zm9ybT1uZXcgd2VDaGF0UGxhdGZvcm0oKVxyXG4gICAgICAgIHRoaXMucmVwbGFjZUFsbCgpXHJcblxyXG4gICAgICAgIC8v5rWL6K+VXHJcbiAgICAgICAgREVGQVVMVF9QUk9QW1wiQ0hSXCJdID0gMFxyXG4gICAgICAgIERFRkFVTFRfUFJPUFtcIklOVFwiXSA9IDBcclxuICAgICAgICBERUZBVUxUX1BST1BbXCJMSUZcIl0gPSAxXHJcbiAgICAgICAgREVGQVVMVF9QUk9QW1wiTU5ZXCJdID0gMFxyXG4gICAgICAgIERFRkFVTFRfUFJPUFtcIlNQUlwiXSA9IDBcclxuICAgICAgICBERUZBVUxUX1BST1BbXCJTVFJcIl0gPSAwXHJcbiAgICAgICAgREVGQVVMVF9QUk9QW1wiVExUXCJdID0gW11cclxuICAgICAgICBERUZBVUxUX1BST1BbXCJFVlRcIl0gPSBbXVxyXG4gICAgICAgIHRoaXMuVGlwcy5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5tb3ZlU3RhcnQsIHRoaXMpXHJcbiAgICAgICAgdGhpcy5UaXBzLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMubW92ZUluZywgdGhpcylcclxuICAgICAgICAvL+ivu+ihqFxyXG5cclxuICAgICAgICBSZXNNZ3IubG9hZFRleHQoXCJKc29uL2JyYW5jaGxpbmVcIiwgKGJyYW5jaGxpbmU6IGNjLkpzb25Bc3NldCkgPT4geyB0aGlzLmJyYW5jaGxpbmUgPSBicmFuY2hsaW5lIH0pXHJcbiAgICAgICAgUmVzTWdyLmxvYWRUZXh0KFwiSnNvbi8wL2FnZVwiLCAoYWdlOiBjYy5Kc29uQXNzZXQpID0+IHsgdGhpcy5BZ2UgPSBhZ2UsIHRoaXMuT25sb2FkdGltZXIoKSB9KVxyXG4gICAgICAgIFJlc01nci5sb2FkVGV4dChcIkpzb24vMC9ldmVudHNcIiwgKGV2ZW50czogY2MuSnNvbkFzc2V0KSA9PiB7IHRoaXMuRXZlbnRzID0gZXZlbnRzLCB0aGlzLk9ubG9hZHRpbWVyKCkgfSlcclxuICAgICAgICBSZXNNZ3IubG9hZFRleHQoXCJKc29uLzAvdGFsZW50c1wiLCAodGFsZW50czogY2MuSnNvbkFzc2V0KSA9PiB7IHRoaXMuVGFsZW50cyA9IHRhbGVudHMsIHRoaXMuT25sb2FkdGltZXIoKSB9KVxyXG4gICAgICAgIFJlc01nci5sb2FkVGV4dChcIkpzb24vMC9hY2hpZXZlbWVudFwiLCAoYWNoaWV2ZW1lbnQ6IGNjLkpzb25Bc3NldCkgPT4geyB0aGlzLkFjaGlldmVtZW50ID0gYWNoaWV2ZW1lbnQsIHRoaXMuT25sb2FkdGltZXIoKSB9KVxyXG4gICAgICAgIGlmICghU2F2ZURhdGEuaXNBdXRvQUQpIHtcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8vQmFja2dyb3VuZC9JY29uXCIpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFTYXZlRGF0YS5pc0F1dG9BRDIpIHtcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8yL0JhY2tncm91bmQvSWNvblwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoU2F2ZURhdGEuaXNBdXRvKSB7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9BdXRvL0JhY2tncm91bmQvWkQxXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9BdXRvL0JhY2tncm91bmQvWkQyXCIpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvQXV0by9CYWNrZ3JvdW5kL1pEMVwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9BdXRvL0JhY2tncm91bmQvWkQyXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoU2F2ZURhdGEuaXNBdXRvMikge1xyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvQXV0bzIvQmFja2dyb3VuZC9aRDFcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8yL0JhY2tncm91bmQvWkQyXCIpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvQXV0bzIvQmFja2dyb3VuZC9aRDFcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvQXV0bzIvQmFja2dyb3VuZC9aRDJcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mlbDmja7lupTnlKhcclxuICAgICAgICB0aGlzLkNhblVzZSgwKVxyXG5cclxuICAgICAgICBpZiAoREVGQVVMVF9DSi5UTVMgPCAxKSB7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfMS9hY2hpZXZlbWVudFwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmV2ZW50U2Nyb2xsVmlldyA9IGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9TY3JvbGxWaWV3XCIpXHJcbiAgICAgICAgdGhpcy5fY29udGVudCA9IGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9TY3JvbGxWaWV3L3ZpZXcvTGF5b3V0XCIpXHJcbiAgICAgICAgdGhpcy50b25namkoKVxyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9uKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5LRVlfRE9XTiwgdGhpcy5vbk5laUd1YSwgdGhpcyk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBvbk5laUd1YShldmVudCkge1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xyXG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5hOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5NYXhVc2VOdW0gKz0gMjBcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2FuVXNlKDIwKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLndnbmIgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBPbmxvYWR0aW1lcigpIHtcclxuICAgICAgICB0aGlzLmNvbXBsZXRlbHkrKztcclxuICAgICAgICBpZiAodGhpcy5jb21wbGV0ZWx5ID09IDQpIHtcclxuICAgICAgICAgICAgdGhpcy50b25namkoKVxyXG4gICAgICAgICAgICBjYy5maW5kKCdHcm91cF8xL2FjaGlldmVtZW50JywgdGhpcy5ub2RlKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Li757q/6YCJ5oupXHJcbiAgICBTZWxlY3RTdG9yeShldmVudCwgY3VzdG9tRXZlbnREYXRhKSB7XHJcbiAgICAgICAgdGhpcy5BZ2VKc29uID0gdGhpcy5BZ2U7IHRoaXMuRXZlbnRzSnNvbiA9IHRoaXMuRXZlbnRzO3RoaXMuSW5kZXhPZkV2ZW50ID0gMDtcclxuICAgIH1cclxuICAgIC8v5LiN6YCJ5aSp6LWL55u05o6l6L+b5YWl5LiL5LiA57qnXHJcbiAgICBFbnRlck5leHQoZXZlbnQsIGN1c3RvbUV2ZW50RGF0YSkge1xyXG4gICAgICAgIGlmIChTYXZlRGF0YS5NeXp6W051bWJlcihjdXN0b21FdmVudERhdGEpIC0gMV0gPT0gMSkge1xyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzJcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF83XCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvQkdcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzNcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHAgPSAwOyBwIDwgT2JqZWN0LmtleXModGhpcy5icmFuY2hsaW5lLmpzb24pLmxlbmd0aDsgcCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5icmFuY2hsaW5lLmpzb25bcCArIDFdW1wiaWRcIl0gPT0gY3VzdG9tRXZlbnREYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVGlwc09wZW4odHJ1ZSwgY2MuY29sb3IoMTI4LCAyMjMsIDIzOSksIFwi5a6M5oiQ5oiQ5bCxIOOAkFwiICsgdGhpcy5BY2hpZXZlbWVudC5qc29uW3RoaXMuYnJhbmNobGluZS5qc29uW3AgKyAxXVtcImFjaGlldmVtZW50SURcIl1dW1wibmFtZVwiXSArIFwi44CRIOino+mUgVwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuVGlwc0lzT3Blbikge1xyXG4gICAgICAgICAgICB0aGlzLlRpcHNUaW1lciArPSBkdFxyXG4gICAgICAgICAgICBpZiAodGhpcy5UaXBzVGltZXIgPj0gMS41KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRpcHNPcGVuKGZhbHNlLCBjYy5jb2xvcigxMjgsIDIyMywgMjM5KSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXN0aW1tZXJDRGF1dG8pIHtcclxuICAgICAgICAgICAgdGhpcy50aW1tZXJDRGF1dG8gKz0gMVxyXG4gICAgICAgICAgICBpZiAodGhpcy50aW1tZXJDRGF1dG8gPj0gMTUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGltbWVyQ0RhdXRvID0gMFxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc3RpbW1lckNEYXV0byA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKFNhdmVEYXRhLmlzQXV0byAmJiB0aGlzLmlzQm9vbCkge1xyXG4gICAgICAgICAgICB0aGlzLmFkVGltZSArPSBkdFxyXG4gICAgICAgICAgICBpZiAodGhpcy5hZFRpbWUgPj0gMS41KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkVGltZSA9IDBcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29udGludWUoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChTYXZlRGF0YS5pc0F1dG8yICYmIHRoaXMuaXNCb29sKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRUaW1lICs9IGR0XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFkVGltZSA+PSAwLjc1KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkVGltZSA9IDBcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29udGludWUoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5bm/5ZGK5YCS6K6h5pe2XHJcbiAgICAgICAgaWYgKFNhdmVEYXRhLmlzQXV0b0FEMikge1xyXG4gICAgICAgICAgICBsZXQgYWxsID0gTWF0aC5yb3VuZChuZXcgRGF0ZSgpLmdldFRpbWUoKSkgLyAxMDAwIC0gU2F2ZURhdGEuTGFzdFRpbWVcclxuICAgICAgICAgICAgbGV0IGhhdmUgPSBBRHRpbWUgLSBhbGxcclxuICAgICAgICAgICAgaWYgKGFsbCA+IEFEdGltZSkge1xyXG4gICAgICAgICAgICAgICAgLy/otoXml7bkuoZcclxuICAgICAgICAgICAgICAgIFNhdmVEYXRhLmlzQXV0b0FEMiA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBTYXZlRGF0YS5pc0F1dG8yID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9BdXRvMi9CYWNrZ3JvdW5kL0ljb25cIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8yL0JhY2tncm91bmQvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuingueci+W5v+WRiuWNs+WPr+eri+WNs+S9v+eUqDI05bCP5pe2XCJcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8v5rKh6LaF5pe2XHJcbiAgICAgICAgICAgICAgICBsZXQgc2hpXHJcbiAgICAgICAgICAgICAgICBsZXQgZmVuXHJcbiAgICAgICAgICAgICAgICBzaGkgPSBNYXRoLmZsb29yKGhhdmUgLyAzNjAwKVxyXG4gICAgICAgICAgICAgICAgZmVuID0gTWF0aC5mbG9vcigoaGF2ZSAtIHNoaSAqIDM2MDApIC8gNjApXHJcbiAgICAgICAgICAgICAgICBpZiAoZmVuIDwgMSkgeyBmZW4gPSAxIH1cclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9BdXRvMi9CYWNrZ3JvdW5kL0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gJ+WJqeS9mSAnICsgc2hpICsgXCIg5bCP5pe2IFwiICsgZmVuICsgXCIg5YiG6ZKfXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHN0YXJ0R2FtZSgpIHtcclxuXHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF8xXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9CR1wiKS5hY3RpdmUgPSB0cnVlXHJcblxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfMlwiKS5hY3RpdmUgPSB0cnVlXHJcblxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfMS9OdW1fUmVvcGVuX0JveC9MYWJlbF8xXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCLlt7Lph43lvIBcIiArIERFRkFVTFRfQ0ouVE1TICsgXCLmrKFcIlxyXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLlZJVk9fR0FNRSB8fCBjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLlhJQU9NSV9HQU1FIHx8IHdpbmRvd1sndWMnXSkge1xyXG4gICAgICAgICAgICBHbG9iYWwucGxhdGZvcm0uU0hPV19USVRJQUxBRDEoKVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aIkOWwseajgOafpVxyXG4gICAgICAgIHRoaXMuY2hlY2tfY2ooXCJvcHBvcnR1bml0eVwiKVxyXG4gICAgfVxyXG5cclxuICAgIC8v5pu/5o2i5omA5pyJ55qu6IKkXHJcbiAgICByZXBsYWNlQWxsKCkge1xyXG4gICAgICAgIC8v5aSp6LWL6YCJ5oup6IOM5pmv5Zu+6aKc6ImyXHJcbiAgICAgICAgUmVzTWdyLmxvYWRJbWFnZVJldChgc2tpbi8ke1VzZXJNb2RlbC5pbnN0YW5jZS51c2luZ30vdGZ4ei9Cb3hfV2hpdGVfZjlmY2ZmYCwgKHNwOiBjYy5TcHJpdGVGcmFtZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnF1YWxpdHkgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnF1YWxpdHkgPSBzcDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIFJlc01nci5sb2FkSW1hZ2VSZXQoYHNraW4vJHtVc2VyTW9kZWwuaW5zdGFuY2UudXNpbmd9L3RmeHovQm94X0JsdWVfNjdjZmZmYCwgKHNwOiBjYy5TcHJpdGVGcmFtZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnF1YWxpdHkxID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5xdWFsaXR5MSA9IHNwO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgUmVzTWdyLmxvYWRJbWFnZVJldChgc2tpbi8ke1VzZXJNb2RlbC5pbnN0YW5jZS51c2luZ30vdGZ4ei9Cb3hfUHVycGxlX2M2N2NmZmAsIChzcDogY2MuU3ByaXRlRnJhbWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5xdWFsaXR5MiA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMucXVhbGl0eTIgPSBzcDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIFJlc01nci5sb2FkSW1hZ2VSZXQoYHNraW4vJHtVc2VyTW9kZWwuaW5zdGFuY2UudXNpbmd9L3RmeHovQm94X09yYW5nZV9mZjhlNDlgLCAoc3A6IGNjLlNwcml0ZUZyYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucXVhbGl0eTMgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnF1YWxpdHkzID0gc3A7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBSZXNNZ3IubG9hZEltYWdlUmV0KGBza2luLyR7VXNlck1vZGVsLmluc3RhbmNlLnVzaW5nfS93ZHp6L0J0bl9FWFBgLCAoc3ApID0+IHtcclxuICAgICAgICAgICAgdGhpcy5leHBlcmllbmNlU3AgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmV4cGVyaWVuY2VTcCA9IHNwO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5ncm91cF80X2xhbCA9ICcjMDAwMDAwJ1xyXG4gICAgICAgIHRoaXMuZ3JvdXBfNF9sYWwxID0gJyMwMDAwMDAnXHJcbiAgICAgICAgdGhpcy50ZXhfNF9sYWwgPSAnIzAwMDAwMCdcclxuICAgICAgICB0aGlzLnRleF80X2xhbDEgPSAnI0ZGQjg1OSdcclxuICAgIH1cclxuXHJcbiAgICBSYW5rKCkge1xyXG4gICAgICAgIHRoaXMuVGlwc09wZW4odHJ1ZSwgY2MuY29sb3IoMTI4LCAyMjMsIDIzOSksIFwi6L+Y5rKh5pyJXCIpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuR3JvdXAxKCkge1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfMVwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9CR1wiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfMlwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIEp1ZGdlQ29sb3Iobm9kZTogY2MuTm9kZSwgY29sb3I6IGFueSkge1xyXG4gICAgICAgIGlmIChjb2xvci50b1N0cmluZygpID09IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUpLnRvU3RyaW5nKCkpIHtcclxuICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnU3AnKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucXVhbGl0eTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNvbG9yLnRvU3RyaW5nKCkgPT0gY2MuY29sb3IoMTAzLCAxOTcsIDIzMCkudG9TdHJpbmcoKSkge1xyXG4gICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdTcCcpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5xdWFsaXR5MTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNvbG9yLnRvU3RyaW5nKCkgPT0gY2MuY29sb3IoMjM3LCAxMjAsIDIzOSkudG9TdHJpbmcoKSkge1xyXG4gICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdTcCcpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5xdWFsaXR5MjtcclxuICAgICAgICB9IGVsc2UgaWYgKGNvbG9yLnRvU3RyaW5nKCkgPT0gY2MuY29sb3IoMjQ3LCAxNDAsIDc1KS50b1N0cmluZygpKSB7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ1NwJykuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnF1YWxpdHkzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHVwZGF0ZU5yb21hbExhYmxlKGo6IGNjLk5vZGUsIGNvbG9yPzogYW55KSB7XHJcbiAgICAgICAgaWYgKFVzZXJNb2RlbC5pbnN0YW5jZS51c2luZyA9PSAnc2tpbjAnKSB7XHJcbiAgICAgICAgICAgIGouZ2V0Q2hpbGRCeU5hbWUoJ0xhYmVsJykuY29sb3IgPSBjYy5jb2xvcigwLCAwLCAwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBSZXNNZ3IubG9hZEltYWdlKGBza2luLyR7VXNlck1vZGVsLmluc3RhbmNlLnVzaW5nfS90Znh6L0hvb2tgLCBqLmdldENoaWxkQnlOYW1lKCdCb3hfU2VsZWN0ZWQnKS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKSlcclxuICAgICAgICBpZiAoY29sb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5KdWRnZUNvbG9yKGosIGNvbG9yKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Y2B6L+e5oq9XHJcbiAgICBUZW5DUCgpIHtcclxuICAgICAgICAvL+WumuS5ieWJlOmZpOaVsOe7hO+8iOeUseW3sumAieWkqei1i+WSjOS6kuaWpeWkqei1i+e7hOaIkO+8iVxyXG4gICAgICAgIHRoaXMudGljaHUgPSBbXVxyXG4gICAgICAgIGxldCBpbmRleCA9IDBcclxuICAgICAgICBsZXQgaXNsdW4gPSBmYWxzZVxyXG4gICAgICAgIGxldCB0aWFuZnUgPSBbXTtcclxuICAgICAgICAvL+i9ruWbnuWkqei1i1xyXG4gICAgICAgIC8vIFNhdmVEYXRhLkx1bkh1aVRhbGVudCA9IDExMzRcclxuICAgICAgICBpZiAoU2F2ZURhdGEuTHVuSHVpVGFsZW50ICE9IDApIHtcclxuICAgICAgICAgICAgaW5kZXggPSBTYXZlRGF0YS5MdW5IdWlUYWxlbnRcclxuICAgICAgICAgICAgaXNsdW4gPSB0cnVlXHJcbiAgICAgICAgICAgIFNhdmVEYXRhLkx1bkh1aVRhbGVudCA9IDBcclxuICAgICAgICAgICAgU2F2ZVV0aWxzLmluc3QuU2F2ZURhdGEoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlzbHVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGljaHUucHVzaChpbmRleClcclxuICAgICAgICAgICAgdGlhbmZ1LnB1c2goaW5kZXgpXHJcbiAgICAgICAgICAgIGlzbHVuID0gZmFsc2VcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBsZW4gPSBPYmplY3Qua2V5cyh0aGlzLlRhbGVudHMuanNvbikubGVuZ3RoXHJcbiAgICAgICAgZm9yIChsZXQgcyA9IDA7IHMgPCBsZW47IHMrKykge1xyXG4gICAgICAgICAgICAvL+WIpOaWreacieayoeaciei9ruWbnuWkqei1i+mcgOimgeWFiOeUn+aIkFxyXG4gICAgICAgICAgICBpZiAoMTAwMSArIHMgPT0gaW5kZXgpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB0aWFuZnUucHVzaCgxMDAxICsgcylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRpYW5mdS5zb3J0KCh4LCB5KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLlRhbGVudHMuanNvblt5XVsnZ3JhZGUnXSAtIHRoaXMuVGFsZW50cy5qc29uW3hdWydncmFkZSddXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvL+eUn+aIkC/plIDmr4HoioLngrlcclxuICAgICAgICBsZXQgYyA9IHRoaXMuVGVuQ1BTaG93LmNoaWxkcmVuQ291bnRcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbiAtIGM7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaiA9IGNjLmluc3RhbnRpYXRlKHRoaXMubm9ybWFsTGFiZWwpXHJcbiAgICAgICAgICAgIGoucGFyZW50ID0gdGhpcy5UZW5DUFNob3dcclxuICAgICAgICAgICAgdGhpcy5BdXRvQWRkQ2xpY2tFdmVudCh0aGlzLm5vZGUsIFwiTWFpblwiLCBcIlNlbGVjdFRhbGVudFwiLCAoaSArIDEpLnRvU3RyaW5nKCksIGopXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vVUnkuqTkupJcclxuICAgICAgICB0aGlzLlRlbkNQQnV0dG9uLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5UZW5DUFNob3cuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfMi9TZWxlY3RfMlwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF8yL1Jlb3BlblwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgbGV0IGluZGV4MTtcclxuICAgICAgICBmb3IgKGxldCBtID0gMDsgbSA8IGxlbjsgbSsrKSB7XHJcbiAgICAgICAgICAgIGluZGV4MSA9IHRpYW5mdVttXVxyXG4gICAgICAgICAgICAvL+aLv+WIsOS4jemHjeWkjeS4jeS6kuaWpeeahOWkqei1i0lE77yaaW5kZXjvvIzooajnjrDlh7rmnaVcclxuICAgICAgICAgICAgdGhpcy5UZW5DUFNob3cuY2hpbGRyZW5bbV0uZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuVGFsZW50cy5qc29uW2luZGV4MV1bXCJuYW1lXCJdICsgXCIoXCIgKyB0aGlzLlRhbGVudHMuanNvbltpbmRleDFdW1wiZGVzY3JpcHRpb25cIl0gKyBcIilcIlxyXG4gICAgICAgICAgICAvL+eogOacieW6plVJ6KGo546wXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTnJvbWFsTGFibGUodGhpcy5UZW5DUFNob3cuY2hpbGRyZW5bbV0sIGdyYWRlc1t0aGlzLlRhbGVudHMuanNvbltpbmRleDFdW1wiZ3JhZGVcIl1dKVxyXG4gICAgICAgICAgICAvL+aUvuWIsOaJgOacieWPr+S7pemAieaLqeeahOWkqei1i+aVsOe7hOmHjFxyXG4gICAgICAgICAgICB0aGlzLkFsbFNob3dUYWxlbnQucHVzaChpbmRleDEpXHJcbiAgICAgICAgICAgIC8v6YeN572u6KGo546wXHJcbiAgICAgICAgICAgIHRoaXMuVGVuQ1BTaG93LmNoaWxkcmVuW21dLmdldENoaWxkQnlOYW1lKFwiQm94X1NlbGVjdGVkXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIC8v5Yik5pat6L+Z5Liq5aSp6LWL5pyJ5rKh5pyJ5LqS5pal5aSp6LWL5bm25LiU5Yig6Zmk5omA5pyJ5LqS5pal5aSp6LWLXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfMi9TY3JvbGxWaWV3XCIpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5zY3JvbGxUb1RvcCgwKVxyXG4gICAgfVxyXG4gICAgVGVuQ1BfZGlndWkoX2luZGV4OiBudW1iZXIsIF90aWNodTogbnVtYmVyW10pIHtcclxuICAgICAgICAvL+S7jlRhbGVudHPpmo/mnLrlh7rkuIDkuKrlpKnotYtJRFxyXG4gICAgICAgIF9pbmRleCA9IDEwMDAgKyBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIE9iamVjdC5rZXlzKHRoaXMuVGFsZW50cy5qc29uKS5sZW5ndGgpXHJcbiAgICAgICAgLy/liKTmlq1h5piv5ZCm5Zyo5YmU6Zmk5pWw57uE77yM5Zyo5bCx6YCS5b2SXHJcbiAgICAgICAgY29uc3Qgc2pzID0gTWF0aC5yYW5kb20oKTsgbGV0IGdyYWRlID0gMFxyXG4gICAgICAgIC8vaWYoc2pzPjAuMTExKXtncmFkZT0wfWVsc2UgaWYoc2pzPjAuMDExKXtncmFkZT0xfWVsc2UgaWYoc2pzPjAuMDAxKXtncmFkZT0yfWVsc2V7Z3JhZGU9M31cclxuICAgICAgICBsZXQgcmFtID0gMC4yICogKERFRkFVTFRfQ0ouQUVWVC5sZW5ndGggLyBPYmplY3Qua2V5cyh0aGlzLkV2ZW50cy5qc29uKS5sZW5ndGgpICsgMC4yICogKERFRkFVTFRfQ0ouQVRMVC5sZW5ndGggLyBPYmplY3Qua2V5cyh0aGlzLlRhbGVudHMuanNvbikubGVuZ3RoKVxyXG4gICAgICAgIGlmIChzanMgPiAwLjQgKyByYW0pIHsgZ3JhZGUgPSAwIH0gZWxzZSBpZiAoc2pzID4gMC4zICsgcmFtKSB7IGdyYWRlID0gMSB9IGVsc2UgaWYgKHNqcyA+IDAuMiArIHJhbSkgeyBncmFkZSA9IDIgfSBlbHNlIHsgZ3JhZGUgPSAzIH1cclxuICAgICAgICBpZiAoX3RpY2h1LmluY2x1ZGVzKF9pbmRleCkgfHwgdGhpcy5UYWxlbnRzLmpzb25bX2luZGV4XVtcImdyYWRlXCJdICE9IGdyYWRlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLlRlbkNQX2RpZ3VpKF9pbmRleCwgX3RpY2h1KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8v5pys5aSp6LWL5Yqg5YWl5YmU6Zmk5pWw57uELOW5tui/lOWbnlxyXG4gICAgICAgICAgICBfdGljaHUucHVzaChfaW5kZXgpXHJcbiAgICAgICAgICAgIHJldHVybiBfaW5kZXhcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgU2VsZWN0VGFsZW50KGV2ZW50LCBjdXN0b21FdmVudERhdGEpIHtcclxuICAgICAgICBsZXQgYm9vbCA9IHRoaXMubXV0ZXgodGhpcy5BbGxTaG93VGFsZW50W051bWJlcihjdXN0b21FdmVudERhdGEpIC0gMV0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGJvb2xbMF0pIHtcclxuICAgICAgICAgICAgdGhpcy5UaXBzT3Blbih0cnVlLCBjYy5jb2xvcigxMjgsIDIyMywgMjM5KSwgXCLkuI7lt7LpgInmi6nnmoTlpKnotYvjgJBcIiArIGJvb2xbMV0ubmFtZSArIFwi44CR5Yay56qBXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLk5vd1NlbGVjdFRhbGVudE51bSA8IHRoaXMuTWF4U2VsZWN0VGFsZW50TnVtICYmICF0aGlzLkFscmVhZHlUYWxlbnRCdXR0b24uaW5jbHVkZXMoY3VzdG9tRXZlbnREYXRhKSkge1xyXG4gICAgICAgICAgICB0aGlzLk5vd1NlbGVjdFRhbGVudE51bSArPSAxXHJcbiAgICAgICAgICAgIGlmICh0aGlzLk5vd1NlbGVjdFRhbGVudE51bSA9PSB0aGlzLk1heFNlbGVjdFRhbGVudE51bSkge1xyXG4gICAgICAgICAgICAgICAgLy8gY2MuZmluZChcIkNhbnZhcy9Hcm91cF8yL1NlbGVjdF8yL0JhY2tncm91bmQvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuW8gOWni+aWsOS6uueUn1wiXHJcbiAgICAgICAgICAgICAgICAvLyBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzIvU2VsZWN0XzIvQmFja2dyb3VuZC9MYWJlbFwiKS5jb2xvciA9IE90aGVyR3JhZGVzWzFdXHJcbiAgICAgICAgICAgICAgICAvLyBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzIvU2VsZWN0XzIvQmFja2dyb3VuZC9PS0JHXCIpLmNvbG9yID0gT3RoZXJHcmFkZXNbMF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLkFscmVhZHlUYWxlbnRCdXR0b24ucHVzaChjdXN0b21FdmVudERhdGEpXHJcbiAgICAgICAgICAgIHRoaXMuVGVuQ1BTaG93LmNoaWxkcmVuW051bWJlcihjdXN0b21FdmVudERhdGEpIC0gMV0uZ2V0Q2hpbGRCeU5hbWUoXCJCb3hfU2VsZWN0ZWRcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5Ob3dTZWxlY3RUYWxlbnROdW0gPj0gdGhpcy5NYXhTZWxlY3RUYWxlbnROdW0gJiYgIXRoaXMuQWxyZWFkeVRhbGVudEJ1dHRvbi5pbmNsdWRlcyhjdXN0b21FdmVudERhdGEpKSB7XHJcbiAgICAgICAgICAgIC8v5bey57uP6YCJ5aSf5LqGXHJcbiAgICAgICAgICAgIHRoaXMuVGlwc09wZW4odHJ1ZSwgY2MuY29sb3IoMTI4LCAyMjMsIDIzOSksIFwi5Y+q6IO96YCJXCIgKyB0aGlzLk1heFNlbGVjdFRhbGVudE51bSArIFwi5Liq5aSp6LWLXCIpXHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLkFscmVhZHlUYWxlbnRCdXR0b24uaW5jbHVkZXMoY3VzdG9tRXZlbnREYXRhKSkge1xyXG4gICAgICAgICAgICAvL+WPlua2iOmAieaLqVxyXG4gICAgICAgICAgICB0aGlzLk5vd1NlbGVjdFRhbGVudE51bSAtPSAxXHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuQWxyZWFkeVRhbGVudEJ1dHRvbi5pbmRleE9mKGN1c3RvbUV2ZW50RGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7IHRoaXMuQWxyZWFkeVRhbGVudEJ1dHRvbi5zcGxpY2UoaW5kZXgsIDEpOyB9XHJcbiAgICAgICAgICAgIHRoaXMuVGVuQ1BTaG93LmNoaWxkcmVuW051bWJlcihjdXN0b21FdmVudERhdGEpIC0gMV0uZ2V0Q2hpbGRCeU5hbWUoXCJCb3hfU2VsZWN0ZWRcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbXV0ZXgoaWQpOiBhbnlbXSB7XHJcbiAgICAgICAgbGV0IGJvb2wgPSBbZmFsc2VdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5BbHJlYWR5VGFsZW50QnV0dG9uLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpZDEgPSB0aGlzLkFsbFNob3dUYWxlbnRbTnVtYmVyKHRoaXMuQWxyZWFkeVRhbGVudEJ1dHRvbltpXSkgLSAxXVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuVGFsZW50cy5qc29uW2lkMV0uZXhjbHVzaXZlKSBjb250aW51ZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLlRhbGVudHMuanNvbltpZDFdW1wiZXhjbHVzaXZlXCJdLmxlbmd0aDsgeSsrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygn6KGo5qC8JywgTnVtYmVyKHRoaXMuVGFsZW50cy5qc29uW2lkMV1bXCJleGNsdXNpdmVcIl1beV0pLCBpZClcclxuICAgICAgICAgICAgICAgIGlmIChOdW1iZXIodGhpcy5UYWxlbnRzLmpzb25baWQxXVtcImV4Y2x1c2l2ZVwiXVt5XSkgPT0gaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBib29sID0gW3RydWUsIHRoaXMuVGFsZW50cy5qc29uW2lkMV1dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYm9vbFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICByb2FkKCk6IGJvb2xlYW4ge1xyXG5cclxuICAgICAgICBsZXQgYm9vbCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaXNPcGVuWFkpIHtcclxuICAgICAgICAgICAgdGhpcy5ncm91cDNJbigpXHJcbiAgICAgICAgICAgIGJvb2wgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYm9vbDtcclxuICAgIH1cclxuXHJcbiAgICAvL+Wkqei1i+mAieWujOS6hui/m+WFpeS4i+S4gOe6p1xyXG4gICAgVGFsZW50U2VsZWN0T3ZlcigpIHtcclxuICAgICAgICBpZiAodGhpcy5Ob3dTZWxlY3RUYWxlbnROdW0gPD0gdGhpcy5NYXhTZWxlY3RUYWxlbnROdW0pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2hvaWNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwM0luKClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tYW96aXppemkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYm9vbCA9IHRoaXMucm9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFveml6aXppID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYm9vbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLk5vd1NlbGVjdFRhbGVudE51bSA8IHRoaXMuTWF4U2VsZWN0VGFsZW50TnVtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVGlwc09wZW4odHJ1ZSwgY2MuY29sb3IoMTI4LCAyMjMsIDIzOSksIFwi6K+36YCJ5oupXCIgKyB0aGlzLk1heFNlbGVjdFRhbGVudE51bSArIFwi5Liq5aSp6LWLXCIpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFsbHR0YWxlbnQgPSBbXVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5BbHJlYWR5VGFsZW50QnV0dG9uLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8v5a6e6KOF5aSp6LWLXHJcbiAgICAgICAgICAgIGFsbHR0YWxlbnQucHVzaCh0aGlzLkFsbFNob3dUYWxlbnRbTnVtYmVyKHRoaXMuQWxyZWFkeVRhbGVudEJ1dHRvbltpXSkgLSAxXSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhbGx0dGFsZW50LmluY2x1ZGVzKDEwMTkpKSB7IHRoaXMuTWF4VXNlTnVtICs9IDQ7IHRoaXMuU3RhclVzZU51bSA9IHRoaXMuTWF4VXNlTnVtIH1cclxuICAgICAgICBpZiAoYWxsdHRhbGVudC5pbmNsdWRlcygxMDY0KSkgeyB0aGlzLk1heFVzZU51bSArPSA4OyB0aGlzLlN0YXJVc2VOdW0gPSB0aGlzLk1heFVzZU51bSB9XHJcbiAgICAgICAgaWYgKGFsbHR0YWxlbnQuaW5jbHVkZXMoMTAwNykpIHsgdGhpcy5NYXhVc2VOdW0gKz0gMjsgdGhpcy5TdGFyVXNlTnVtID0gdGhpcy5NYXhVc2VOdW0gfVxyXG4gICAgICAgIGlmIChhbGx0dGFsZW50LmluY2x1ZGVzKDExMjIpKSB7IHRoaXMuTWF4VXNlTnVtID0gMDsgdGhpcy5TdGFyVXNlTnVtID0gdGhpcy5NYXhVc2VOdW0gfVxyXG4gICAgICAgIGlmIChhbGx0dGFsZW50LmluY2x1ZGVzKDEwODYpKSB7IHRoaXMuTWF4VXNlTnVtIC09IDEwOyB0aGlzLlN0YXJVc2VOdW0gPSB0aGlzLk1heFVzZU51bSB9XHJcbiAgICAgICAgaWYgKGFsbHR0YWxlbnQuaW5jbHVkZXMoMTA4NSkpIHsgdGhpcy5NYXhVc2VOdW0gLT0gMzsgdGhpcy5TdGFyVXNlTnVtID0gdGhpcy5NYXhVc2VOdW0gfVxyXG4gICAgICAgIGlmIChhbGx0dGFsZW50LmluY2x1ZGVzKDEwODQpKSB7IHRoaXMuTWF4VXNlTnVtIC09IDI7IHRoaXMuU3RhclVzZU51bSA9IHRoaXMuTWF4VXNlTnVtIH1cclxuICAgICAgICBpZiAoYWxsdHRhbGVudC5pbmNsdWRlcygxMDYzKSkgeyB0aGlzLk1heFVzZU51bSArPSAxOyB0aGlzLlN0YXJVc2VOdW0gPSB0aGlzLk1heFVzZU51bSB9XHJcbiAgICAgICAgaWYgKHRoaXMuTWF4VXNlTnVtIDwgMCkgeyB0aGlzLk1heFVzZU51bSA9IDA7IHRoaXMuU3RhclVzZU51bSA9IHRoaXMuTWF4VXNlTnVtIH1cclxuICAgICAgICBpZiAoU2F2ZURhdGEuaXNQUERZICYmIFNhdmVEYXRhLmlzUFBEWTIpIHtcclxuICAgICAgICAgICAgU2F2ZURhdGEuaXNQUERZMiA9IGZhbHNlXHJcbiAgICAgICAgICAgIFNhdmVVdGlscy5pbnN0LlNhdmVEYXRhKClcclxuICAgICAgICAgICAgREVGQVVMVF9QUk9QW1wiQ0hSXCJdICs9IDE7IGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfMy9MYXlvdXQvQ0hSL1Nwcml0ZS9MYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiMVwiXHJcbiAgICAgICAgICAgIERFRkFVTFRfUFJPUFtcIklOVFwiXSArPSAxOyBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzMvTGF5b3V0L0lOVC9TcHJpdGUvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIjFcIlxyXG4gICAgICAgICAgICBERUZBVUxUX1BST1BbXCJTVFJcIl0gKz0gMTsgY2MuZmluZChcIkNhbnZhcy9Hcm91cF8zL0xheW91dC9TVFIvU3ByaXRlL0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCIxXCJcclxuICAgICAgICAgICAgREVGQVVMVF9QUk9QW1wiTU5ZXCJdICs9IDE7IGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfMy9MYXlvdXQvTU5ZL1Nwcml0ZS9MYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiMVwiXHJcbiAgICAgICAgICAgIHRoaXMuTWF4VXNlTnVtICs9IDRcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5DYW5Vc2UoMClcclxuXHJcblxyXG4gICAgICAgIC8v5LiL6L6I5a2Q5LiJ6YCJ5LiA5aSp6LWLXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLkFscmVhZHlUYWxlbnRCdXR0b24ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmiZPlvIBsYWJlbFwiKVxyXG4gICAgICAgICAgICAvL+aJk+W8gGxhYmVsXHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfMy9TY3JvbGxWaWV3Mi9MYWJlbFwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuQWxsU2hvd1RhbGVudFtOdW1iZXIodGhpcy5BbHJlYWR5VGFsZW50QnV0dG9uW2ldKSAtIDFdXHJcbiAgICAgICAgICAgIGxldCBqID0gY2MuaW5zdGFudGlhdGUodGhpcy5ub3JtYWxMYWJlbClcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVOcm9tYWxMYWJsZShqLCBncmFkZXNbdGhpcy5UYWxlbnRzLmpzb25baW5kZXhdW1wiZ3JhZGVcIl1dKVxyXG4gICAgICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgai5wYXJlbnQgPSBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzMvU2Nyb2xsVmlldzIvdmlldy9MYXlvdXRcIilcclxuICAgICAgICAgICAgLy8gfSwgMCk7XHJcbiAgICAgICAgICAgIGouZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuZW5hYmxlZCA9IGZhbHNlXHJcblxyXG4gICAgICAgICAgICBERUZBVUxUX1BST1BbXCJUTFRcIl0ucHVzaChpbmRleClcclxuICAgICAgICAgICAgaWYgKHRoaXMuVGFsZW50cy5qc29uW2luZGV4XVtcInNob3dcIl0gIT0gMCkgeyB0aGlzLkNvblRhbGVudC5wdXNoKGluZGV4KSB9XHJcbiAgICAgICAgICAgIGlmICghREVGQVVMVF9DSltcIkFUTFRcIl0uaW5jbHVkZXMoaW5kZXgpKSB7IERFRkFVTFRfQ0pbXCJBVExUXCJdLnB1c2goaW5kZXgpIH1cclxuXHJcbiAgICAgICAgICAgIC8v6YeN572u6KGo546wXHJcbiAgICAgICAgICAgIGouZ2V0Q2hpbGRCeU5hbWUoXCJCb3hfU2VsZWN0ZWRcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAvL+Wkqei1i+ehruWumuaIkOWKn+WinuWKoOWkqei1i1xyXG4gICAgICAgICAgICBqLmdldENoaWxkQnlOYW1lKFwiTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLlRhbGVudHMuanNvbltpbmRleF1bXCJuYW1lXCJdICsgXCIoXCIgKyB0aGlzLlRhbGVudHMuanNvbltpbmRleF1bXCJkZXNjcmlwdGlvblwiXSArIFwiKVwiXHJcbiAgICAgICAgICAgIC8vIGouZ2V0Q2hpbGRCeU5hbWUoXCJncmFkZVwiKS5jb2xvciA9IGdyYWRlc1t0aGlzLlRhbGVudHMuanNvbltpbmRleF1bXCJncmFkZVwiXV1cclxuICAgICAgICAgICAgLy8gai5nZXRDaGlsZEJ5TmFtZShcImdyYWRlXCIpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgU2F2ZVV0aWxzLmluc3QuU2F2ZURhdGEoKVxyXG4gICAgfVxyXG4gICAgLy8xNDQgMjM4IDE0NFxyXG4gICAgVGlwc09wZW4oaXNPcGVuOiBib29sZWFuLCBjb2xvcjogY2MuQ29sb3IsIGNvbnRlbnQ/OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLlRpcHMuY29sb3IgPSBjb2xvclxyXG4gICAgICAgIC8v5YiG6L6o546H6I635Y+WXHJcbiAgICAgICAgLy8gbGV0IGggPSBjYy53aW5TaXplLmhlaWdodDtcclxuICAgICAgICBpZiAoaXNPcGVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVGlwcy5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gY29udGVudFxyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLlRpcHMpLnRvKDAuMTIsIHsgcG9zaXRpb246IGNjLnYzKDAsIChjYy53aW5TaXplLmhlaWdodCAvIDIpKSB9KS50bygwLjA2LCB7IHBvc2l0aW9uOiBjYy52MygwLCAoY2Mud2luU2l6ZS5oZWlnaHQgLyAyKSAtIDUwKSB9KS50bygwLjA2LCB7IHBvc2l0aW9uOiBjYy52MygwLCAoY2Mud2luU2l6ZS5oZWlnaHQgLyAyKSkgfSkuc3RhcnQoKVxyXG4gICAgICAgICAgICB0aGlzLlRpcHMuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLlRpcHNUaW1lciA9IDBcclxuICAgICAgICAgICAgdGhpcy5UaXBzSXNPcGVuID0gdHJ1ZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuVGlwcy5zZXRQb3NpdGlvbigwLCAoY2Mud2luU2l6ZS5oZWlnaHQgKyB0aGlzLlRpcHMuZ2V0Q29udGVudFNpemUoKS5oZWlnaHQpIC8gMikvL3RpcHPlvZLkvY1cclxuICAgICAgICAgICAgdGhpcy5UaXBzLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuVGlwc1RpbWVyID0gMFxyXG4gICAgICAgICAgICB0aGlzLlRpcHNJc09wZW4gPSBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICAvL0dyb3VwXzNcclxuICAgIEFkZChldmVudCwgY3VzdG9tRXZlbnREYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuU3RhclVzZU51bSA+PSAxKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoY3VzdG9tRXZlbnREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiQ0hSXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKERFRkFVTFRfUFJPUFtcIkNIUlwiXSA8IHRoaXMuTWF4cHJvcGVydHlOdW0gfHwgdGhpcy5NYXhVc2VOdW0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERFRkFVTFRfUFJPUFtcIkNIUlwiXSArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNhblVzZSgtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF8zL0xheW91dC9DSFIvU3ByaXRlL0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gREVGQVVMVF9QUk9QW1wiQ0hSXCJdLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiSU5UXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKERFRkFVTFRfUFJPUFtcIklOVFwiXSA8IHRoaXMuTWF4cHJvcGVydHlOdW0gfHwgdGhpcy5NYXhVc2VOdW0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERFRkFVTFRfUFJPUFtcIklOVFwiXSArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNhblVzZSgtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF8zL0xheW91dC9JTlQvU3ByaXRlL0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gREVGQVVMVF9QUk9QW1wiSU5UXCJdLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiU1RSXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKERFRkFVTFRfUFJPUFtcIlNUUlwiXSA8IHRoaXMuTWF4cHJvcGVydHlOdW0gfHwgdGhpcy5NYXhVc2VOdW0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERFRkFVTFRfUFJPUFtcIlNUUlwiXSArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNhblVzZSgtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF8zL0xheW91dC9TVFIvU3ByaXRlL0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gREVGQVVMVF9QUk9QW1wiU1RSXCJdLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiTU5ZXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKERFRkFVTFRfUFJPUFtcIk1OWVwiXSA8IHRoaXMuTWF4cHJvcGVydHlOdW0gfHwgdGhpcy5NYXhVc2VOdW0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERFRkFVTFRfUFJPUFtcIk1OWVwiXSArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNhblVzZSgtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF8zL0xheW91dC9NTlkvU3ByaXRlL0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gREVGQVVMVF9QUk9QW1wiTU5ZXCJdLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5UaXBzT3Blbih0cnVlLCBjYy5jb2xvcigxMjgsIDIyMywgMjM5KSwgXCLmsqHmnInlj6/liIbphY3nmoTngrnmlbDkuoZcIilcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSZWR1Y2UoZXZlbnQsIGN1c3RvbUV2ZW50RGF0YSkge1xyXG4gICAgICAgIHN3aXRjaCAoY3VzdG9tRXZlbnREYXRhKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJDSFJcIjpcclxuICAgICAgICAgICAgICAgIGlmIChERUZBVUxUX1BST1BbXCJDSFJcIl0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgREVGQVVMVF9QUk9QW1wiQ0hSXCJdIC09IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DYW5Vc2UoMSlcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzMvTGF5b3V0L0NIUi9TcHJpdGUvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBERUZBVUxUX1BST1BbXCJDSFJcIl0udG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJJTlRcIjpcclxuICAgICAgICAgICAgICAgIGlmIChERUZBVUxUX1BST1BbXCJJTlRcIl0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgREVGQVVMVF9QUk9QW1wiSU5UXCJdIC09IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DYW5Vc2UoMSlcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzMvTGF5b3V0L0lOVC9TcHJpdGUvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBERUZBVUxUX1BST1BbXCJJTlRcIl0udG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJTVFJcIjpcclxuICAgICAgICAgICAgICAgIGlmIChERUZBVUxUX1BST1BbXCJTVFJcIl0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgREVGQVVMVF9QUk9QW1wiU1RSXCJdIC09IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DYW5Vc2UoMSlcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzMvTGF5b3V0L1NUUi9TcHJpdGUvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBERUZBVUxUX1BST1BbXCJTVFJcIl0udG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNTllcIjpcclxuICAgICAgICAgICAgICAgIGlmIChERUZBVUxUX1BST1BbXCJNTllcIl0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgREVGQVVMVF9QUk9QW1wiTU5ZXCJdIC09IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DYW5Vc2UoMSlcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzMvTGF5b3V0L01OWS9TcHJpdGUvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBERUZBVUxUX1BST1BbXCJNTllcIl0udG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBDYW5Vc2UodHJhbnM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBhID0gdGhpcy5TdGFyVXNlTnVtICsgdHJhbnNcclxuICAgICAgICB0aGlzLlN0YXJVc2VOdW0gPSBhXHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF8zL0xhYmVsXzJcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuWPr+eUqOWxnuaAp+eCuTpcIiArIHRoaXMuU3RhclVzZU51bVxyXG4gICAgfVxyXG4gICAgUmFuZG9tKCkge1xyXG4gICAgICAgIHRoaXMuU3RhclVzZU51bSA9IHRoaXMuTWF4VXNlTnVtXHJcbiAgICAgICAgREVGQVVMVF9QUk9QW1wiQ0hSXCJdID0gMDsgREVGQVVMVF9QUk9QW1wiSU5UXCJdID0gMDsgREVGQVVMVF9QUk9QW1wiU1RSXCJdID0gMDsgREVGQVVMVF9QUk9QW1wiTU5ZXCJdID0gMDtcclxuICAgICAgICBsZXQgYVxyXG4gICAgICAgIGZvciAoYSA9IDA7IGEgPCB0aGlzLk1heFVzZU51bTsgYSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBiID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiA0KVxyXG4gICAgICAgICAgICBzd2l0Y2ggKGIpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoREVGQVVMVF9QUk9QW1wiQ0hSXCJdIDwgdGhpcy5NYXhwcm9wZXJ0eU51bSB8fCB0aGlzLk1heFVzZU51bSA+IDQwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERFRkFVTFRfUFJPUFtcIkNIUlwiXSArPSAxOyBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzMvTGF5b3V0L0NIUi9TcHJpdGUvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBERUZBVUxUX1BST1BbXCJDSFJcIl0udG9TdHJpbmcoKTsgdGhpcy5DYW5Vc2UoLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgYSAtPSAxIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoREVGQVVMVF9QUk9QW1wiSU5UXCJdIDwgdGhpcy5NYXhwcm9wZXJ0eU51bSB8fCB0aGlzLk1heFVzZU51bSA+IDQwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERFRkFVTFRfUFJPUFtcIklOVFwiXSArPSAxOyBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzMvTGF5b3V0L0lOVC9TcHJpdGUvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBERUZBVUxUX1BST1BbXCJJTlRcIl0udG9TdHJpbmcoKTsgdGhpcy5DYW5Vc2UoLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgYSAtPSAxIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChERUZBVUxUX1BST1BbXCJTVFJcIl0gPCB0aGlzLk1heHByb3BlcnR5TnVtIHx8IHRoaXMuTWF4VXNlTnVtID4gNDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgREVGQVVMVF9QUk9QW1wiU1RSXCJdICs9IDE7IGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfMy9MYXlvdXQvU1RSL1Nwcml0ZS9MYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IERFRkFVTFRfUFJPUFtcIlNUUlwiXS50b1N0cmluZygpOyB0aGlzLkNhblVzZSgtMSlcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgeyBhIC09IDEgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKERFRkFVTFRfUFJPUFtcIk1OWVwiXSA8IHRoaXMuTWF4cHJvcGVydHlOdW0gfHwgdGhpcy5NYXhVc2VOdW0gPiA0MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBERUZBVUxUX1BST1BbXCJNTllcIl0gKz0gMTsgY2MuZmluZChcIkNhbnZhcy9Hcm91cF8zL0xheW91dC9NTlkvU3ByaXRlL0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gREVGQVVMVF9QUk9QW1wiTU5ZXCJdLnRvU3RyaW5nKCk7IHRoaXMuQ2FuVXNlKC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7IGEgLT0gMSB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+aWueWQkeW+gOS4i1xyXG4gICAgc2Nyb2xsRG93bkhhbmRsZXIoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuX2NvbnRlbnQuY2hpbGRyZW5Db3VudDsgaSA8IGxlbjsgaSsrKSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5pa55ZCR5b6A5LiKXHJcbiAgICBzY3JvbGxVcEhhbmRsZXIoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuX2NvbnRlbnQuY2hpbGRyZW5Db3VudDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5fY29udGVudC5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgbGV0IGZpbmFsWSA9IGl0ZW0ueSArIHRoaXMuX2NvbnRlbnQueTtcclxuICAgICAgICAgICAgaWYgKGZpbmFsWSA8ICh0aGlzLl9jb250ZW50LnBhcmVudC5oZWlnaHQgLyAyICsgaXRlbS5oZWlnaHQpICYmIGZpbmFsWSA+IC0odGhpcy5fY29udGVudC5wYXJlbnQuaGVpZ2h0IC8gMiArIGl0ZW0uaGVpZ2h0KSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5vcGFjaXR5ID0gMjU1XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLm9wYWNpdHkgPSAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgc3Rhcm5ld2xpZmUoKSB7XHJcbiAgICAgICAgLy/lpJbmjIJcclxuICAgICAgICBpZiAodGhpcy53Z25iIHx8IChERUZBVUxUX1BST1BbXCJDSFJcIl0gPT0gNyAmJiBERUZBVUxUX1BST1BbXCJJTlRcIl0gPT0gMyAmJiBERUZBVUxUX1BST1BbXCJTVFJcIl0gPT0gOSAmJiBERUZBVUxUX1BST1BbXCJNTllcIl0gPT0gMSkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNXVURJKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk5vd0FnZSA9IDk5XHJcbiAgICAgICAgICAgICAgICBERUZBVUxUX1BST1BbXCJUTFRcIl0ucHVzaCgxMDQ4KVxyXG4gICAgICAgICAgICAgICAgREVGQVVMVF9QUk9QW1wiVExUXCJdLnB1c2goMTA2NSlcclxuICAgICAgICAgICAgICAgIERFRkFVTFRfUFJPUFtcIlRMVFwiXS5wdXNoKDExMzUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuU3RhclVzZU51bSA9PSAwKSB7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfM1wiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzRcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLl9sYXN0UG9zWCA9IHRoaXMuZXZlbnRTY3JvbGxWaWV3LmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLnlcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L1Njcm9sbFZpZXcvdmlldy9MYXlvdXRcIikub24oXCJwb3NpdGlvbi1jaGFuZ2VkXCIsIHRoaXMuc2Nyb2xsVXBIYW5kbGVyLCB0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5Db250aW51ZSgpXHJcbiAgICAgICAgICAgIC8v5YWz6Zet5aSp6LWL6YCJ5oup6Z2i5p2/XHJcbiAgICAgICAgICAgIHRoaXMuaXNCb29sID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLlRpcHNPcGVuKHRydWUsIGNjLmNvbG9yKDEyOCwgMjIzLCAyMzkpLCBcIuS9oOi/mOaciVwiICsgdGhpcy5TdGFyVXNlTnVtICsgXCLlsZ7mgKfngrnmsqHmnInliIbphY1cIilcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lsZ7mgKflj5jljJZcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvTGF5b3V0L0NIUi9CYWNrZ3JvdW5kL0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gYDxjb2xvcj0ke3RoaXMuZ3JvdXBfNF9sYWx9PuminOWAvCA8L2M+PGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbDF9PmAgKyBERUZBVUxUX1BST1BbXCJDSFJcIl0gKyBcIjwvY29sb3I+XCJcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvTGF5b3V0L0lOVC9CYWNrZ3JvdW5kL0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gYDxjb2xvcj0ke3RoaXMuZ3JvdXBfNF9sYWx9PuaZuuWKmyA8L2M+PGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbDF9PmAgKyBERUZBVUxUX1BST1BbXCJJTlRcIl0gKyBcIjwvY29sb3I+XCJcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvTGF5b3V0L1NUUi9CYWNrZ3JvdW5kL0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gYDxjb2xvcj0ke3RoaXMuZ3JvdXBfNF9sYWx9PuS9k+i0qCA8L2M+PGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbDF9PmAgKyBERUZBVUxUX1BST1BbXCJTVFJcIl0gKyBcIjwvY29sb3I+XCJcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvTGF5b3V0L01OWS9CYWNrZ3JvdW5kL0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gYDxjb2xvcj0ke3RoaXMuZ3JvdXBfNF9sYWx9PuWutuWigyA8L2M+PGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbDF9PmAgKyBERUZBVUxUX1BST1BbXCJNTllcIl0gKyBcIjwvY29sb3I+XCJcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvTGF5b3V0L1NQUi9CYWNrZ3JvdW5kL0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gYDxjb2xvcj0ke3RoaXMuZ3JvdXBfNF9sYWx9PuW/q+S5kCA8L2M+PGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbDF9PmAgKyBERUZBVUxUX1BST1BbXCJTUFJcIl0gKyBcIjwvY29sb3I+XCJcclxuXHJcbiAgICAgICAgLy/miJDlsLHmo4Dmn6VcclxuICAgICAgICB0aGlzLmNoZWNrX2NqKFwiU1RBUlRcIilcclxuICAgIH1cclxuICAgIC8v5oiQ5bCx5qOA5p+lXHJcbiAgICBjaGVja19jaihpbmRleDogc3RyaW5nKSB7XHJcbiAgICAgICAgLy/miJDlsLHmo4Dmn6VcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE9iamVjdC5rZXlzKHRoaXMuQWNoaWV2ZW1lbnQuanNvbikubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCFERUZBVUxUX0NKLkFDSi5pbmNsdWRlcygxMDEgKyBpKSAmJiB0aGlzLkFjaGlldmVtZW50Lmpzb25bMTAxICsgaV1bXCJvcHBvcnR1bml0eVwiXSA9PSBpbmRleCAmJiBjaGVjayh0aGlzLkFjaGlldmVtZW50Lmpzb25bMTAxICsgaV1bXCJjb25kaXRpb25cIl0pICYmICh0aGlzLkFjaGlldmVtZW50Lmpzb25bMTAxICsgaV1bXCJldnRsaW1pdFwiXSA9PSAtMSB8fCB0aGlzLkFjaGlldmVtZW50Lmpzb25bMTAxICsgaV1bXCJldnRsaW1pdFwiXSA9PSB0aGlzLkluZGV4T2ZFdmVudCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVGlwc09wZW4odHJ1ZSwgY2MuY29sb3IoMTQ0LCAyMzgsIDE0NCksIFwi6Kej6ZSB5oiQ5bCx44CQXCIgKyB0aGlzLkFjaGlldmVtZW50Lmpzb25bMTAxICsgaV1bXCJuYW1lXCJdICsgXCLjgJFcIilcclxuICAgICAgICAgICAgICAgIC8v5a6M5oiQ55qE5oiQ5bCx5re75Yqg5pys5ZywXHJcbiAgICAgICAgICAgICAgICBERUZBVUxUX0NKLkFDSi5wdXNoKDEwMSArIGkpXHJcbiAgICAgICAgICAgICAgICAvL+iHquS8oOino+mUgeajgOafpVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBPYmplY3Qua2V5cyh0aGlzLmJyYW5jaGxpbmUuanNvbikubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5icmFuY2hsaW5lLmpzb25baiArIDFdW1wiYWNoaWV2ZW1lbnRJRFwiXSA9PSAoMTAxICsgaSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/op6PplIFcclxuICAgICAgICAgICAgICAgICAgICAgICAgU2F2ZURhdGEuTXl6elt0aGlzLmJyYW5jaGxpbmUuanNvbltqICsgMV1bXCJpZFwiXSAtIDFdID0gMVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBTYXZlVXRpbHMuaW5zdC5TYXZlRGF0YSgpXHJcbiAgICB9XHJcbiAgICAvL0dyb3VwXzRcclxuICAgIENvbnRpbnVlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRGVhdGgpIHJldHVyblxyXG4gICAgICAgIGxldCBiYWJhID0gY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L1Njcm9sbFZpZXcvdmlldy9MYXlvdXRcIilcclxuICAgICAgICBsZXQgZW50cnkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLkVudHJ5KVxyXG4gICAgICAgIGVudHJ5Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5Db250aW51ZSwgdGhpcylcclxuICAgICAgICBsZXQgbm9kZSA9IGVudHJ5LmdldENvbXBvbmVudChFbnRyeSk7XHJcbiAgICAgICAgZW50cnkuZ2V0Q2hpbGRCeU5hbWUoJ1Nwcml0ZScpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gbm9kZS5zcFtVc2VyTW9kZWwuaW5zdGFuY2UudXNlSWRdXHJcblxyXG4gICAgICAgIGlmIChVc2VyTW9kZWwuaW5zdGFuY2UudXNpbmcgPT0gJ3NraW4wJykge1xyXG4gICAgICAgICAgICBlbnRyeS5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsQWdlXCIpLmNvbG9yID0gY2MuY29sb3IoMCwgMCwgMClcclxuICAgICAgICAgICAgZW50cnkuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbEFnZVwiKS5jaGlsZHJlblswXS5jb2xvciA9IGNjLmNvbG9yKDAsIDAsIDApXHJcbiAgICAgICAgfSBlbHNlIGlmIChVc2VyTW9kZWwuaW5zdGFuY2UudXNpbmcgPT0gJ3NraW4xJykge1xyXG4gICAgICAgICAgICBlbnRyeS5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsQWdlXCIpLmNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSlcclxuICAgICAgICAgICAgZW50cnkuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbEFnZVwiKS5jaGlsZHJlblswXS5jb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUpXHJcbiAgICAgICAgfSBlbHNlIGlmIChVc2VyTW9kZWwuaW5zdGFuY2UudXNpbmcgPT0gJ3NraW4yJykge1xyXG4gICAgICAgICAgICBlbnRyeS5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsQWdlXCIpLmNvbG9yID0gY2MuY29sb3IoMCwgMCwgMClcclxuICAgICAgICAgICAgZW50cnkuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbEFnZVwiKS5jaGlsZHJlblswXS5jb2xvciA9IGNjLmNvbG9yKDAsIDAsIDApXHJcbiAgICAgICAgfSBlbHNlIGlmIChVc2VyTW9kZWwuaW5zdGFuY2UudXNpbmcgPT0gJ3NraW4zJykge1xyXG4gICAgICAgICAgICBlbnRyeS5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsQWdlXCIpLmNvbG9yID0gY2MuY29sb3IoNDEsIDQwLCA2MSlcclxuICAgICAgICAgICAgZW50cnkuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbEFnZVwiKS5jaGlsZHJlblswXS5jb2xvciA9IGNjLmNvbG9yKDQxLCA0MCwgNjEpXHJcbiAgICAgICAgfSBlbHNlIGlmIChVc2VyTW9kZWwuaW5zdGFuY2UudXNpbmcgPT0gJ3NraW40Jykge1xyXG4gICAgICAgICAgICBlbnRyeS5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsQWdlXCIpLmNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSlcclxuICAgICAgICAgICAgZW50cnkuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbEFnZVwiKS5jaGlsZHJlblswXS5jb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+ajgOafpeWkqei1i1xyXG4gICAgICAgIGxldCB0ZmNvbjogc3RyaW5nID0gXCJcIlxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5Db25UYWxlbnQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuQ29uVGFsZW50W2ldICE9IDAgJiYgY2hlY2sodGhpcy5UYWxlbnRzLmpzb25bdGhpcy5Db25UYWxlbnRbaV1dW1wiY29uZGl0aW9uXCJdLCBcImluY2x1ZGVcIikpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgc3RyOiBzdHJpbmcgPSBcIjxjb2xvcj0jZmZmMWFhPlwiKyB0aGlzLmF0dHJpYnV0ZVRyYW5zKHRoaXMuVGFsZW50cy5qc29uW3RoaXMuQ29uVGFsZW50W2ldXSwgdGhpcy5Db25UYWxlbnRbaV0pK1wiPC9jPlwiXHJcbiAgICAgICAgICAgICAgICBsZXQgc3RyOiBzdHJpbmcgPSB0aGlzLmF0dHJpYnV0ZVRyYW5zKHRoaXMuVGFsZW50cy5qc29uW3RoaXMuQ29uVGFsZW50W2ldXSwgZW50cnksIHRoaXMuQ29uVGFsZW50W2ldKVxyXG4gICAgICAgICAgICAgICAgaWYgKHN0ciAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGZjb24gPSBzdHIgKyBcIlxcblwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRmY29uICs9IFwi5aSp6LWL44CQXCIgKyB0aGlzLlRhbGVudHMuanNvblt0aGlzLkNvblRhbGVudFtpXV1bXCJuYW1lXCJdICsgXCLjgJHlj5HliqjmiJDlip/vvIFcIiArIHRoaXMuVGFsZW50cy5qc29uW3RoaXMuQ29uVGFsZW50W2ldXVtcImRlc2NyaXB0aW9uXCJdICsgXCIhXFxuXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuQ29uVGFsZW50LmluZGV4T2YodGhpcy5Db25UYWxlbnRbaV0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuQ29uVGFsZW50LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db25UYWxlbnRbaW5kZXhdID0gMFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WGheWuue+8mlxyXG5cclxuICAgICAgICAvL+aJgOacieW9k+WJjeW5tOm+hOWMheWQq+eahOS6i+S7tuaLv+WHuuadpVxyXG4gICAgICAgIGxldCBBbGxFdmVudHMgPSBbXVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5BZ2VKc29uLmpzb25bdGhpcy5Ob3dBZ2VdW1wiZXZlbnRcIl0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgQWxsRXZlbnRzLnB1c2godGhpcy5BZ2VKc29uLmpzb25bdGhpcy5Ob3dBZ2VdW1wiZXZlbnRcIl1baV0udG9TdHJpbmcoKS5zcGxpdChcIipcIikpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgQ2FuRXZlbnRzID0gW10vL+S7jkV2ZW50c+mAieaLqeiDveWPkeeUn+eahOS6i+aDhVxyXG4gICAgICAgIGxldCBDYW5FdmVudHN3ZWlnaHQgPSBbXS8v5omA5pyJ6IO95Y+R55Sf55qE5LqL5oOF55qE5p2D6YeNXHJcbiAgICAgICAgLy9jYy5sb2coQWxsRXZlbnRzKVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEFsbEV2ZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIWNoZWNrKHRoaXMuRXZlbnRzSnNvbi5qc29uW0FsbEV2ZW50c1tpXVswXV1bXCJleGNsdWRlXCJdLCBcImV4Y2x1ZGVcIikgJiYgY2hlY2sodGhpcy5FdmVudHNKc29uLmpzb25bQWxsRXZlbnRzW2ldWzBdXVtcImluY2x1ZGVcIl0sIFwiaW5jbHVkZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgLy8hZXhjbHVkZeacieafkOS6i+S7tuaXtuS4gOWumumaj+acuuS4jeWIsOS4unRydWUmJuacieafkOS6i+S7tuaXtuaJjeiDveiiq+maj+acuuWIsOS4unRydWVcclxuICAgICAgICAgICAgICAgIENhbkV2ZW50cy5wdXNoKEFsbEV2ZW50c1tpXVswXSlcclxuICAgICAgICAgICAgICAgIGlmIChBbGxFdmVudHNbaV0ubGVuZ3RoID4gMSkgeyBDYW5FdmVudHN3ZWlnaHQucHVzaChBbGxFdmVudHNbaV1bMV0pIH0gZWxzZSB7IENhbkV2ZW50c3dlaWdodC5wdXNoKFwiMVwiKSB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jYy5sb2coQ2FuRXZlbnRzKVxyXG4gICAgICAgIC8vY2MubG9nKENhbkV2ZW50c3dlaWdodClcclxuICAgICAgICBsZXQgTWF4d2VpZ2h0ID0gMC8v5pyA5aSn5p2D6YeNXHJcbiAgICAgICAgbGV0IENhbkV2ZW50c3dlaWdodDIgPSBbXS8v5omA5pyJ6IO95Y+R55Sf55qE5LqL5oOF55qE5p2D6YeNMlxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgQ2FuRXZlbnRzd2VpZ2h0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIE1heHdlaWdodCArPSBOdW1iZXIoQ2FuRXZlbnRzd2VpZ2h0W2ldKVxyXG4gICAgICAgICAgICBDYW5FdmVudHN3ZWlnaHQyLnB1c2goTWF4d2VpZ2h0KVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NjLmxvZyhDYW5FdmVudHN3ZWlnaHQyKVxyXG4gICAgICAgIGxldCB0YXJnZXRXZWlnaHQgPSBNYXRoLnJhbmRvbSgpICogTWF4d2VpZ2h0XHJcbiAgICAgICAgLy9jYy5sb2codGFyZ2V0V2VpZ2h0KVxyXG4gICAgICAgIC8v5pyA57uI6YCa5YWz6LCB5aSn5LqOdGFyZ2V0V2VpZ2h056Gu5a6a5LqL5Lu2XHJcbiAgICAgICAgbGV0IGluZGV4XHJcbiAgICAgICAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgQ2FuRXZlbnRzd2VpZ2h0Mi5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKENhbkV2ZW50c3dlaWdodDJbaW5kZXhdID4gdGFyZ2V0V2VpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY2MubG9nKGluZGV4KVxyXG4gICAgICAgIC8vY2MubG9nKENhbkV2ZW50c1tpbmRleF0pXHJcbiAgICAgICAgLy/liqDlhaXkuovku7bmsaBcclxuICAgICAgICBERUZBVUxUX1BST1BbXCJFVlRcIl0ucHVzaChOdW1iZXIoQ2FuRXZlbnRzW2luZGV4XSkpXHJcbiAgICAgICAgaWYgKCFERUZBVUxUX0NKW1wiQUVWVFwiXS5pbmNsdWRlcyhOdW1iZXIoQ2FuRXZlbnRzW2luZGV4XSkpKSB7IERFRkFVTFRfQ0pbXCJBRVZUXCJdLnB1c2goTnVtYmVyKENhbkV2ZW50c1tpbmRleF0pKSB9XHJcbiAgICAgICAgLy9jYy5sb2coREVGQVVMVF9QUk9QW1wiRVZUXCJdKVxyXG5cclxuICAgICAgICBsZXQgZSA9IHRoaXMuRXZlbnRzSnNvbi5qc29uW051bWJlcihDYW5FdmVudHNbaW5kZXhdKV1cclxuICAgICAgICBpZiAoZSA9PSB1bmRlZmluZWQpIHsgZSA9IHRoaXMuRXZlbnRzSnNvbi5qc29uW1wiMTAwMDBcIl0gfVxyXG4gICAgICAgIC8v6L+95Yqg5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5jb250ID0gZVtcImV2ZW50XCJdXHJcbiAgICAgICAgdGhpcy5jb250Wmh1amlhID0gXCJcIlxyXG5cclxuICAgICAgICBpZiAodGhpcy5Ob3dBZ2UgPT0gNTAwKSBjb25zb2xlLmxvZygn5pWw5o2uMTExJywgZSlcclxuXHJcbiAgICAgICAgaWYgKGVbXCJicmFuY2hcIl0pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuTm93QWdlID09IDUwMCkge1xyXG4gICAgICAgICAgICAgICAgZW50cnkuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IFwiPGNvbG9yPVwiICsgdGhpcy50ZXhfNF9sYWwgKyBcIj5cIiArIHRoaXMuY29udCArIFwiPC9jPlwiXHJcbiAgICAgICAgICAgICAgICB0aGlzLkJyYWNoKGUsIHRoaXMuY29udFpodWppYSwgZW50cnkpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXNIYXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZVtcImJyYW5jaFwiXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGVjayhlW1wiYnJhbmNoXCJdW2ldLnNwbGl0KFwiOlwiKVswXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/liqDlhaXkuovku7bmsaBcclxuICAgICAgICAgICAgICAgICAgICAgICAgREVGQVVMVF9QUk9QW1wiRVZUXCJdLnB1c2goTnVtYmVyKGVbXCJicmFuY2hcIl1baV0uc3BsaXQoXCI6XCIpWzFdKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGR4ID0gdGhpcy5FdmVudHNKc29uLmpzb25bTnVtYmVyKGVbXCJicmFuY2hcIl1baV0uc3BsaXQoXCI6XCIpWzFdKV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/lsZ7mgKflj5jljJZcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRyaWJ1dGVUcmFucyhkeCwgZW50cnkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6L+95Yqg5o+P6L+wXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udFpodWppYSArPSBcIlxcblwiICsgZHhbXCJldmVudFwiXS8v5YaF5a65XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzSGF2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGR4W1wicG9zdEV2ZW50XCJdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRaaHVqaWEgKz0gXCJcXG5cIiArIGR4W1wicG9zdEV2ZW50XCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkeFtcImVmZmVjdFwiXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGR4W1wiZWZmZWN0XCJdW1wiQ0hSXCJdKSB7IGxldCBudW06IHN0cmluZyA9IGR4W1wiZWZmZWN0XCJdW1wiQ0hSXCJdID4gMCA/IFwiK1wiICsgZHhbXCJlZmZlY3RcIl1bXCJDSFJcIl0gOiBkeFtcImVmZmVjdFwiXVtcIkNIUlwiXTsgdGhpcy5jb250Wmh1amlhICs9IFwiXFxuPGNvbG9yPVwiICsgdGhpcy50ZXhfNF9sYWwxICsgXCI+6aKc5YC8XCIgKyBudW0gKyBcIjwvY29sb3I+XCIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGR4W1wiZWZmZWN0XCJdW1wiSU5UXCJdKSB7IGxldCBudW06IHN0cmluZyA9IGR4W1wiZWZmZWN0XCJdW1wiSU5UXCJdID4gMCA/IFwiK1wiICsgZHhbXCJlZmZlY3RcIl1bXCJJTlRcIl0gOiBkeFtcImVmZmVjdFwiXVtcIklOVFwiXTsgdGhpcy5jb250Wmh1amlhICs9IFwiXFxuPGNvbG9yPVwiICsgdGhpcy50ZXhfNF9sYWwxICsgXCI+5pm65YqbXCIgKyBudW0gKyBcIjwvY29sb3I+XCIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGR4W1wiZWZmZWN0XCJdW1wiU1RSXCJdKSB7IGxldCBudW06IHN0cmluZyA9IGR4W1wiZWZmZWN0XCJdW1wiU1RSXCJdID4gMCA/IFwiK1wiICsgZHhbXCJlZmZlY3RcIl1bXCJTVFJcIl0gOiBkeFtcImVmZmVjdFwiXVtcIlNUUlwiXTsgdGhpcy5jb250Wmh1amlhICs9IFwiXFxuPGNvbG9yPVwiICsgdGhpcy50ZXhfNF9sYWwxICsgXCI+5L2T6LSoXCIgKyBudW0gKyBcIjwvY29sb3I+XCIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGR4W1wiZWZmZWN0XCJdW1wiTU5ZXCJdKSB7IGxldCBudW06IHN0cmluZyA9IGR4W1wiZWZmZWN0XCJdW1wiTU5ZXCJdID4gMCA/IFwiK1wiICsgZHhbXCJlZmZlY3RcIl1bXCJNTllcIl0gOiBkeFtcImVmZmVjdFwiXVtcIk1OWVwiXTsgdGhpcy5jb250Wmh1amlhICs9IFwiXFxuPGNvbG9yPVwiICsgdGhpcy50ZXhfNF9sYWwxICsgXCI+5a625aKDXCIgKyBudW0gKyBcIjwvY29sb3I+XCIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGR4W1wiZWZmZWN0XCJdW1wiU1BSXCJdKSB7IGxldCBudW06IHN0cmluZyA9IGR4W1wiZWZmZWN0XCJdW1wiU1BSXCJdID4gMCA/IFwiK1wiICsgZHhbXCJlZmZlY3RcIl1bXCJTUFJcIl0gOiBkeFtcImVmZmVjdFwiXVtcIlNQUlwiXTsgdGhpcy5jb250Wmh1amlhICs9IFwiXFxuPGNvbG9yPVwiICsgdGhpcy50ZXhfNF9sYWwxICsgXCI+5b+r5LmQXCIgKyBudW0gKyBcIjwvY29sb3I+XCIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL+i/veWKoOaPj+i/sFxyXG4gICAgICAgICAgICAgICAgaWYgKCFpc0hhdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZVtcInBvc3RFdmVudFwiXSkgeyB0aGlzLmNvbnRaaHVqaWEgPSBcIlxcblwiICsgZVtcInBvc3RFdmVudFwiXSB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL+i/veWKoOaPj+i/sFxyXG4gICAgICAgICAgICBpZiAoZVtcInBvc3RFdmVudFwiXSkgeyB0aGlzLmNvbnRaaHVqaWEgPSBcIlxcblwiICsgZVtcInBvc3RFdmVudFwiXSB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vbGV0IHN0cjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuTm93QWdlICE9IDUwMCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udFpodWppYSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBlbnRyeS5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID1cclxuICAgICAgICAgICAgICAgICAgICBcIjxjb2xvcj1cIiArIHRoaXMudGV4XzRfbGFsMSArIFwiPlwiICsgdGZjb24gKyBcIjwvYz5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgXCI8Y29sb3I9XCIgKyB0aGlzLnRleF80X2xhbCArIFwiPlwiICsgdGhpcy5jb250ICsgXCI8L2M+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiPGNvbG9yPVwiICsgdGhpcy50ZXhfNF9sYWwxICsgXCI+XCIgKyB0aGlzLmNvbnRaaHVqaWEgKyBcIjwvYz5cIlxyXG5cclxuICAgICAgICAgICAgICAgIC8vc3RyID0gdGhpcy5jb250ICsgJ1xcbicgKyB0aGlzLmNvbnRaaHVqaWFcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGVudHJ5LmdldENoaWxkQnlOYW1lKFwiTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPVxyXG4gICAgICAgICAgICAgICAgICAgIFwiPGNvbG9yPVwiICsgdGhpcy50ZXhfNF9sYWwxICsgXCI+XCIgKyB0ZmNvbiArIFwiPC9jPlwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIjxjb2xvcj1cIiArIHRoaXMudGV4XzRfbGFsICsgXCI+XCIgKyB0aGlzLmNvbnQgKyBcIjwvYz5cIlxyXG5cclxuICAgICAgICAgICAgICAgIC8vc3RyID0gdGhpcy5jb250XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuTm93QWdlID09IDUwMCkgY29uc29sZS5sb2coJzUwMOWygeW5tOm+hCcsIHRoaXMuTm93QWdlKVxyXG4gICAgICAgIGVudHJ5LmdldENoaWxkQnlOYW1lKFwiTGFiZWxBZ2VcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLk5vd0FnZS50b1N0cmluZygpXHJcblxyXG5cclxuICAgICAgICAvL+WxnuaAp+WPmOWMllxyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVHJhbnMoZSwgZW50cnkpXHJcblxyXG4gICAgICAgIC8v5Yik5pat5q275LqhXHJcbiAgICAgICAgaWYgKERFRkFVTFRfUFJPUFtcIkxJRlwiXSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNEZWF0aCA9IHRydWU7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9TdGFydFwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9BdXRvXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9BdXRvMlwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZW50cnkucGFyZW50ID0gY2MuZmluZChcIkNhbnZhc1wiKVxyXG4gICAgICAgIGxldCBkdWggPSBlbnRyeS5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsXCIpLmdldENvbnRlbnRTaXplKCkuaGVpZ2h0IC0gNTAuNFxyXG4gICAgICAgIC8vZW50cnkucGFyZW50ID0gYmFiYVxyXG4gICAgICAgIGxldCBicyA9IE1hdGguZmxvb3IoZHVoIC8gMzkpLy/lpJrooYzlgI3njodcclxuXHJcbiAgICAgICAgLy8gaWYodGhpcy5Ob3dBZ2U9PTUwMCl7YnMrPTE5fVxyXG4gICAgICAgIGVudHJ5LnNldENvbnRlbnRTaXplKGNjLnNpemUoNzgwLCA2NSArIDQwICogYnMpKVxyXG4gICAgICAgIGVudHJ5LmdldENoaWxkQnlOYW1lKFwiTGFiZWxBZ2VcIikueSArPSAyMCAqIGJzXHJcbiAgICAgICAgZW50cnkuZ2V0Q2hpbGRCeU5hbWUoXCJTcHJpdGVcIikuc2V0Q29udGVudFNpemUoY2Muc2l6ZSg3ODAsIDUyICsgNDAgKiBicykpXHJcbiAgICAgICAgZW50cnkuZ2V0Q2hpbGRCeU5hbWUoXCJCR1wiKS5zZXRDb250ZW50U2l6ZShjYy5zaXplKDYwMCwgODAgKyA0MCAqIGJzKSlcclxuICAgICAgICAvL+aOkueJiFxyXG4gICAgICAgIGxldCBwYiA9IGVudHJ5LmdldENvbnRlbnRTaXplKCkuaGVpZ2h0XHJcbiAgICAgICAgLy9jYy5sb2coZW50cnkuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbFwiKS5nZXRDb250ZW50U2l6ZSgpLmhlaWdodClcclxuICAgICAgICBlbnRyeS5wYXJlbnQgPSBiYWJhXHJcbiAgICAgICAgLy8gaWYgKHRoaXMuTm93QWdlID09IDUwMCkgY29uc29sZS5sb2coJzUwMOWygeW5tOm+hCcsIGVudHJ5LmdldENoaWxkQnlOYW1lKFwiTGFiZWxBZ2VcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcsIGVudHJ5LmdldENoaWxkQnlOYW1lKFwiTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcpXHJcblxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9TY3JvbGxWaWV3XCIpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5zY3JvbGxUb0JvdHRvbSgwLjEpXHJcblxyXG4gICAgICAgIC8v5bm06b6E5Yqg5LiAXHJcblxyXG4gICAgICAgIGlmICh0aGlzLnJlYnVpbGQpIHtcclxuICAgICAgICAgICAgdGhpcy5Ob3dBZ2UgKz0gdGhpcy5yZWJ1aWxkQWdlO1xyXG4gICAgICAgICAgICB0aGlzLnJlYnVpbGQgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLk5vd0FnZSArPSAxXHJcbiAgICAgICAgfVxyXG4gICAgICAgIERFRkFVTFRfUFJPUC5BR0UgPSB0aGlzLk5vd0FnZVxyXG4gICAgICAgIC8v5oiQ5bCx5qOA5p+lXHJcbiAgICAgICAgdGhpcy5jaGVja19jaihcIlRSQUpFQ1RPUllcIilcclxuICAgIH1cclxuXHJcbiAgICBCcmFjaChlOiBhbnksIGNvbnRaaHVqaWE6IGFueSwgZW50cnk6IGFueSkge1xyXG4gICAgICAgIGxldCBpc0hhdmUgPSBmYWxzZVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZVtcImJyYW5jaFwiXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBjYy5sb2coaSlcclxuICAgICAgICAgICAgaWYgKGNoZWNrKGVbXCJicmFuY2hcIl1baV0uc3BsaXQoXCI6XCIpWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gY2MubG9nKE51bWJlcihlW1wiYnJhbmNoXCJdW2ldLnNwbGl0KFwiOlwiKVsxXSkpXHJcbiAgICAgICAgICAgICAgICBsZXQgZHggPSB0aGlzLkV2ZW50c0pzb24uanNvbltOdW1iZXIoZVtcImJyYW5jaFwiXVtpXS5zcGxpdChcIjpcIilbMV0pXVxyXG4gICAgICAgICAgICAgICAgLy/ov73liqDmj4/ov7BcclxuICAgICAgICAgICAgICAgIGNvbnRaaHVqaWEgPSAnXFxuJyArIGR4W1wiZXZlbnRcIl0vL+WGheWuuVxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ+WGheWuuScsIGNvbnRaaHVqaWEpXHJcbiAgICAgICAgICAgICAgICBpc0hhdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBlbnRyeS5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nICs9IFwiPGNvbG9yPVwiICsgdGhpcy50ZXhfNF9sYWwgKyBcIj5cIiArIGNvbnRaaHVqaWEgKyBcIjwvYz5cIlxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkeFtcInBvc3RFdmVudFwiXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVudHJ5LmdldENoaWxkQnlOYW1lKFwiTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgKz0gXCI8Y29sb3I9XCIgKyB0aGlzLnRleF80X2xhbDEgKyBcIj5cIiArICdcXG4nICsgZHhbXCJwb3N0RXZlbnRcIl0gKyBcIjwvYz5cIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy/lsZ7mgKflj5jljJZcclxuICAgICAgICAgICAgICAgIHRoaXMuYXR0cmlidXRlVHJhbnMoZHgsIGVudHJ5KVxyXG4gICAgICAgICAgICAgICAgaWYgKGR4W1wiYnJhbmNoXCJdKSB7IHRoaXMuQnJhY2goZHgsIGNvbnRaaHVqaWEsIGVudHJ5KSB9XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6L+95Yqg5o+P6L+wXHJcbiAgICAgICAgaWYgKGlzSGF2ZSkge1xyXG4gICAgICAgICAgICBpZiAoZVtcInBvc3RFdmVudFwiXSkgeyBjb250Wmh1amlhICs9IGVbXCJwb3N0RXZlbnRcIl0gfVxyXG4gICAgICAgICAgICByZXR1cm4gY29udFpodWppYVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFNUUmFkZChldmVudCwgY3VzdG9tRXZlbnREYXRhKSB7XHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIERFRkFVTFRfUFJPUFtcIlNUUlwiXSArPSBOdW1iZXIoY3VzdG9tRXZlbnREYXRhKTtcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvTGF5b3V0L1NUUi9CYWNrZ3JvdW5kL0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gYDxjb2xvcj0ke3RoaXMuZ3JvdXBfNF9sYWx9PuS9k+i0qCA8L2M+PGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbDF9PmAgKyBERUZBVUxUX1BST1BbXCJTVFJcIl0gKyBcIjwvY29sb3I+XCI7IERFRkFVTFRfQ0pbXCJIU1RSXCJdID0gREVGQVVMVF9QUk9QW1wiU1RSXCJdID4gREVGQVVMVF9DSltcIkhTVFJcIl0gPyBERUZBVUxUX1BST1BbXCJTVFJcIl0gOiBERUZBVUxUX0NKW1wiSFNUUlwiXTsgREVGQVVMVF9DSltcIkxTVFJcIl0gPSBERUZBVUxUX1BST1BbXCJTVFJcIl0gPCBERUZBVUxUX0NKW1wiTFNUUlwiXSA/IERFRkFVTFRfUFJPUFtcIlNUUlwiXSA6IERFRkFVTFRfQ0pbXCJMU1RSXCJdO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuICAgIC8v5bGe5oCn5Y+Y5YyWXHJcbiAgICBhdHRyaWJ1dGVUcmFucyhlOiBhbnksIGVudHJ5OiBjYy5Ob2RlLCBpbmRleD86IG51bWJlcikge1xyXG4gICAgICAgIC8vREVGQVVMVF9QUk9QW1wiU1RSXCJdICs9MTAwXHJcbiAgICAgICAgaWYgKGVbXCJlZmZlY3RcIl0pIHtcclxuICAgICAgICAgICAgaWYgKGVbXCJlZmZlY3RcIl1bXCJDSFJcIl0pIHsgREVGQVVMVF9QUk9QW1wiQ0hSXCJdICs9IGVbXCJlZmZlY3RcIl1bXCJDSFJcIl07IGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9MYXlvdXQvQ0hSL0JhY2tncm91bmQvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBgPGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbH0+6aKc5YC8IDwvYz48Y29sb3I9JHt0aGlzLmdyb3VwXzRfbGFsMX0+YCArIERFRkFVTFRfUFJPUFtcIkNIUlwiXSArIFwiPC9jb2xvcj5cIjsgREVGQVVMVF9DSltcIkhDSFJcIl0gPSBERUZBVUxUX1BST1BbXCJDSFJcIl0gPiBERUZBVUxUX0NKW1wiSENIUlwiXSA/IERFRkFVTFRfUFJPUFtcIkNIUlwiXSA6IERFRkFVTFRfQ0pbXCJIQ0hSXCJdOyBERUZBVUxUX0NKW1wiTENIUlwiXSA9IERFRkFVTFRfUFJPUFtcIkNIUlwiXSA8IERFRkFVTFRfQ0pbXCJMQ0hSXCJdID8gREVGQVVMVF9QUk9QW1wiQ0hSXCJdIDogREVGQVVMVF9DSltcIkxDSFJcIl07IGxldCBudW06IHN0cmluZyA9IGVbXCJlZmZlY3RcIl1bXCJDSFJcIl0gPiAwID8gXCIrXCIgKyBlW1wiZWZmZWN0XCJdW1wiQ0hSXCJdIDogZVtcImVmZmVjdFwiXVtcIkNIUlwiXTsgZW50cnkuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyArPSBcIlxcbjxjb2xvcj1cIiArIHRoaXMudGV4XzRfbGFsMSArIFwiPuminOWAvFwiICsgbnVtICsgXCI8L2NvbG9yPlwiIH1cclxuICAgICAgICAgICAgaWYgKGVbXCJlZmZlY3RcIl1bXCJJTlRcIl0pIHsgREVGQVVMVF9QUk9QW1wiSU5UXCJdICs9IGVbXCJlZmZlY3RcIl1bXCJJTlRcIl07IGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9MYXlvdXQvSU5UL0JhY2tncm91bmQvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBgPGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbH0+5pm65YqbIDwvYz48Y29sb3I9JHt0aGlzLmdyb3VwXzRfbGFsMX0+YCArIERFRkFVTFRfUFJPUFtcIklOVFwiXSArIFwiPC9jb2xvcj5cIjsgREVGQVVMVF9DSltcIkhJTlRcIl0gPSBERUZBVUxUX1BST1BbXCJJTlRcIl0gPiBERUZBVUxUX0NKW1wiSElOVFwiXSA/IERFRkFVTFRfUFJPUFtcIklOVFwiXSA6IERFRkFVTFRfQ0pbXCJISU5UXCJdOyBERUZBVUxUX0NKW1wiTElOVFwiXSA9IERFRkFVTFRfUFJPUFtcIklOVFwiXSA8IERFRkFVTFRfQ0pbXCJMSU5UXCJdID8gREVGQVVMVF9QUk9QW1wiSU5UXCJdIDogREVGQVVMVF9DSltcIkxJTlRcIl07IGxldCBudW06IHN0cmluZyA9IGVbXCJlZmZlY3RcIl1bXCJJTlRcIl0gPiAwID8gXCIrXCIgKyBlW1wiZWZmZWN0XCJdW1wiSU5UXCJdIDogZVtcImVmZmVjdFwiXVtcIklOVFwiXTsgZW50cnkuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyArPSBcIlxcbjxjb2xvcj1cIiArIHRoaXMudGV4XzRfbGFsMSArIFwiPuaZuuWKm1wiICsgbnVtICsgXCI8L2NvbG9yPlwiIH1cclxuICAgICAgICAgICAgaWYgKGVbXCJlZmZlY3RcIl1bXCJTVFJcIl0pIHsgREVGQVVMVF9QUk9QW1wiU1RSXCJdICs9IGVbXCJlZmZlY3RcIl1bXCJTVFJcIl07IGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9MYXlvdXQvU1RSL0JhY2tncm91bmQvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBgPGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbH0+5L2T6LSoIDwvYz48Y29sb3I9JHt0aGlzLmdyb3VwXzRfbGFsMX0+YCArIERFRkFVTFRfUFJPUFtcIlNUUlwiXSArIFwiPC9jb2xvcj5cIjsgREVGQVVMVF9DSltcIkhTVFJcIl0gPSBERUZBVUxUX1BST1BbXCJTVFJcIl0gPiBERUZBVUxUX0NKW1wiSFNUUlwiXSA/IERFRkFVTFRfUFJPUFtcIlNUUlwiXSA6IERFRkFVTFRfQ0pbXCJIU1RSXCJdOyBERUZBVUxUX0NKW1wiTFNUUlwiXSA9IERFRkFVTFRfUFJPUFtcIlNUUlwiXSA8IERFRkFVTFRfQ0pbXCJMU1RSXCJdID8gREVGQVVMVF9QUk9QW1wiU1RSXCJdIDogREVGQVVMVF9DSltcIkxTVFJcIl07IGxldCBudW06IHN0cmluZyA9IGVbXCJlZmZlY3RcIl1bXCJTVFJcIl0gPiAwID8gXCIrXCIgKyBlW1wiZWZmZWN0XCJdW1wiU1RSXCJdIDogZVtcImVmZmVjdFwiXVtcIlNUUlwiXTsgZW50cnkuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyArPSBcIlxcbjxjb2xvcj1cIiArIHRoaXMudGV4XzRfbGFsMSArIFwiPuS9k+i0qFwiICsgbnVtICsgXCI8L2NvbG9yPlwiIH1cclxuICAgICAgICAgICAgaWYgKGVbXCJlZmZlY3RcIl1bXCJNTllcIl0pIHsgREVGQVVMVF9QUk9QW1wiTU5ZXCJdICs9IGVbXCJlZmZlY3RcIl1bXCJNTllcIl07IGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9MYXlvdXQvTU5ZL0JhY2tncm91bmQvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBgPGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbH0+5a625aKDIDwvYz48Y29sb3I9JHt0aGlzLmdyb3VwXzRfbGFsMX0+YCArIERFRkFVTFRfUFJPUFtcIk1OWVwiXSArIFwiPC9jb2xvcj5cIjsgREVGQVVMVF9DSltcIkhNTllcIl0gPSBERUZBVUxUX1BST1BbXCJNTllcIl0gPiBERUZBVUxUX0NKW1wiSE1OWVwiXSA/IERFRkFVTFRfUFJPUFtcIk1OWVwiXSA6IERFRkFVTFRfQ0pbXCJITU5ZXCJdOyBERUZBVUxUX0NKW1wiTE1OWVwiXSA9IERFRkFVTFRfUFJPUFtcIk1OWVwiXSA8IERFRkFVTFRfQ0pbXCJMTU5ZXCJdID8gREVGQVVMVF9QUk9QW1wiTU5ZXCJdIDogREVGQVVMVF9DSltcIkxNTllcIl07IGxldCBudW06IHN0cmluZyA9IGVbXCJlZmZlY3RcIl1bXCJNTllcIl0gPiAwID8gXCIrXCIgKyBlW1wiZWZmZWN0XCJdW1wiTU5ZXCJdIDogZVtcImVmZmVjdFwiXVtcIk1OWVwiXTsgZW50cnkuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyArPSBcIlxcbjxjb2xvcj1cIiArIHRoaXMudGV4XzRfbGFsMSArIFwiPuWutuWig1wiICsgbnVtICsgXCI8L2NvbG9yPlwiIH1cclxuICAgICAgICAgICAgaWYgKGVbXCJlZmZlY3RcIl1bXCJTUFJcIl0pIHsgREVGQVVMVF9QUk9QW1wiU1BSXCJdICs9IGVbXCJlZmZlY3RcIl1bXCJTUFJcIl07IGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9MYXlvdXQvU1BSL0JhY2tncm91bmQvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBgPGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbH0+5b+r5LmQIDwvYz48Y29sb3I9JHt0aGlzLmdyb3VwXzRfbGFsMX0+YCArIERFRkFVTFRfUFJPUFtcIlNQUlwiXSArIFwiPC9jb2xvcj5cIjsgREVGQVVMVF9DSltcIkhTUFJcIl0gPSBERUZBVUxUX1BST1BbXCJTUFJcIl0gPiBERUZBVUxUX0NKW1wiSFNQUlwiXSA/IERFRkFVTFRfUFJPUFtcIlNQUlwiXSA6IERFRkFVTFRfQ0pbXCJIU1BSXCJdOyBERUZBVUxUX0NKW1wiTFNQUlwiXSA9IERFRkFVTFRfUFJPUFtcIlNQUlwiXSA8IERFRkFVTFRfQ0pbXCJMU1BSXCJdID8gREVGQVVMVF9QUk9QW1wiU1BSXCJdIDogREVGQVVMVF9DSltcIkxTUFJcIl07IGxldCBudW06IHN0cmluZyA9IGVbXCJlZmZlY3RcIl1bXCJTUFJcIl0gPiAwID8gXCIrXCIgKyBlW1wiZWZmZWN0XCJdW1wiU1BSXCJdIDogZVtcImVmZmVjdFwiXVtcIlNQUlwiXTsgZW50cnkuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyArPSBcIlxcbjxjb2xvcj1cIiArIHRoaXMudGV4XzRfbGFsMSArIFwiPuW/q+S5kFwiICsgbnVtICsgXCI8L2NvbG9yPlwiIH1cclxuICAgICAgICAgICAgaWYgKGVbXCJlZmZlY3RcIl1bXCJMSUZcIl0pIHsgREVGQVVMVF9QUk9QW1wiTElGXCJdICs9IGVbXCJlZmZlY3RcIl1bXCJMSUZcIl07IH1cclxuICAgICAgICAgICAgaWYgKGVbXCJlZmZlY3RcIl1bXCJBR0VcIl0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChlWydpZCddID09IDIwNDA5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWJ1aWxkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlYnVpbGRBZ2UgPSBOdW1iZXIoZVtcImVmZmVjdFwiXVtcIkFHRVwiXSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Ob3dBZ2UgKz0gTnVtYmVyKGVbXCJlZmZlY3RcIl1bXCJBR0VcIl0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgREVGQVVMVF9DSltcIkhBR0VcIl0gPSB0aGlzLk5vd0FnZSA+IERFRkFVTFRfQ0pbXCJIQUdFXCJdID8gdGhpcy5Ob3dBZ2UgOiBERUZBVUxUX0NKW1wiSEFHRVwiXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlW1wiZWZmZWN0XCJdW1wiUkRNXCJdKSB7XHJcbiAgICAgICAgICAgICAgICAvL+maj+acuuWxnuaAp+WinuWKoFxyXG4gICAgICAgICAgICAgICAgbGV0IGk6IG51bWJlciA9IGVbXCJlZmZlY3RcIl1bXCJSRE1cIl1cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGEgPSAwOyBhIDwgaTsgYSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTogREVGQVVMVF9QUk9QW1wiQ0hSXCJdICs9IDE7IGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9MYXlvdXQvQ0hSL0JhY2tncm91bmQvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBgPGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbH0+6aKc5YC8IDwvYz48Y29sb3I9JHt0aGlzLmdyb3VwXzRfbGFsMX0+YCArIERFRkFVTFRfUFJPUFtcIkNIUlwiXSArIFwiPC9jb2xvcj5cIjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjogREVGQVVMVF9QUk9QW1wiSU5UXCJdICs9IDE7IGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9MYXlvdXQvSU5UL0JhY2tncm91bmQvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBgPGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbH0+5pm65YqbIDwvYz48Y29sb3I9JHt0aGlzLmdyb3VwXzRfbGFsMX0+YCArIERFRkFVTFRfUFJPUFtcIklOVFwiXSArIFwiPC9jb2xvcj5cIjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzogREVGQVVMVF9QUk9QW1wiU1RSXCJdICs9IDE7IGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9MYXlvdXQvU1RSL0JhY2tncm91bmQvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBgPGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbH0+5L2T6LSoIDwvYz48Y29sb3I9JHt0aGlzLmdyb3VwXzRfbGFsMX0+YCArIERFRkFVTFRfUFJPUFtcIlNUUlwiXSArIFwiPC9jb2xvcj5cIjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDogREVGQVVMVF9QUk9QW1wiTU5ZXCJdICs9IDE7IGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9MYXlvdXQvTU5ZL0JhY2tncm91bmQvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBgPGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbH0+5a625aKDIDwvYz48Y29sb3I9JHt0aGlzLmdyb3VwXzRfbGFsMX0+YCArIERFRkFVTFRfUFJPUFtcIk1OWVwiXSArIFwiPC9jb2xvcj5cIjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTogREVGQVVMVF9QUk9QW1wiU1BSXCJdICs9IDE7IGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9MYXlvdXQvU1BSL0JhY2tncm91bmQvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBgPGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbH0+5b+r5LmQIDwvYz48Y29sb3I9JHt0aGlzLmdyb3VwXzRfbGFsMX0+YCArIERFRkFVTFRfUFJPUFtcIlNQUlwiXSArIFwiPC9jb2xvcj5cIjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFNhdmVVdGlscy5pbnN0LlNhdmVEYXRhKClcclxuICAgICAgICBpZiAoZVtcInJlcGxhY2VtZW50XCJdKSB7XHJcbiAgICAgICAgICAgIGlmIChlW1wicmVwbGFjZW1lbnRcIl1bXCJncmFkZVwiXSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+aVsOaNricsIGVbXCJyZXBsYWNlbWVudFwiXVtcImdyYWRlXCJdLCBlKVxyXG4gICAgICAgICAgICAgICAgbGV0IGdyYWRlID0gZVtcInJlcGxhY2VtZW50XCJdW1wiZ3JhZGVcIl1bMF0vL+eogOacieW6plxyXG4gICAgICAgICAgICAgICAgbGV0IGdyYWRlcyA9IFtdXHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygn5pWw57uEJyxncmFkZXMpXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE9iamVjdC5rZXlzKHRoaXMuVGFsZW50cy5qc29uKS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfmnaHku7YnLCAhdGhpcy50aWNodS5pbmNsdWRlcygxMDAxICsgaSksIHRoaXMuVGFsZW50cy5qc29uWzEwMDEgKyBpXVtcInNob3dcIl0sIHRoaXMuVGFsZW50cy5qc29uWzEwMDEgKyBpXVtcImdyYWRlXCJdLCBncmFkZSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMudGljaHUuaW5jbHVkZXMoMTAwMSArIGkpICYmIHRoaXMuVGFsZW50cy5qc29uWzEwMDEgKyBpXVtcInNob3dcIl0gIT0gMCAmJiB0aGlzLlRhbGVudHMuanNvblsxMDAxICsgaV1bXCJncmFkZVwiXSA9PSBncmFkZSkgey8v5YmU6Zmk5pWw57uE6YeM5rKh5pyJ77yM5bm25LiU56iA5pyJ5bqm56ym5ZCIXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyYWRlcy5wdXNoKDEwMDEgKyBpKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfmlbDnu4QnLGdyYWRlcylcclxuICAgICAgICAgICAgICAgIGxldCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZ3JhZGVzLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIGdyYWRlc1tqXS8v5pyA57uI6ZqP5Ye65p2l55qEXHJcbiAgICAgICAgICAgICAgICBsZXQgaCA9IERFRkFVTFRfUFJPUC5UTFQuaW5kZXhPZihpbmRleCkvL+imgeiiq+abv+aNoueahOWkqei1i+eahOinkuagh1xyXG4gICAgICAgICAgICAgICAgREVGQVVMVF9QUk9QLlRMVFtoXSA9IGdyYWRlc1tqXS8v5pu/5o2iXHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvblRhbGVudC5wdXNoKGdyYWRlc1tqXSkvL+abv+aNolxyXG4gICAgICAgICAgICAgICAgLy90aGlzLlRpcHNPcGVuKHRydWUsIFwi5aSp6LWL44CQXCIgKyB0aGlzLlRhbGVudHMuanNvbltpbmRleF1bXCJuYW1lXCJdICsgXCLjgJHlj5HliqjmiJDlip/vvIHmm7/mjaLmiJDjgJBcIiArIHRoaXMuVGFsZW50cy5qc29uW2dyYWRlc1tqXV1bXCJuYW1lXCJdICsgXCLjgJFcIilcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIuWkqei1i+OAkFwiICsgdGhpcy5UYWxlbnRzLmpzb25baW5kZXhdW1wibmFtZVwiXSArIFwi44CR5Y+R5Yqo5oiQ5Yqf77yB5pu/5o2i5oiQ44CQXCIgKyB0aGlzLlRhbGVudHMuanNvbltncmFkZXNbal1dW1wibmFtZVwiXSArIFwi44CRXCJcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlW1wicmVwbGFjZW1lbnRcIl1bXCJ0YWxlbnRcIl0pIHtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ+aVsOaNrjEnLCBlW1wicmVwbGFjZW1lbnRcIl1bXCJ0YWxlbnRcIl0sIGUpXHJcbiAgICAgICAgICAgICAgICBsZXQgZ3JhZGVzID0gW11cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZVtcInJlcGxhY2VtZW50XCJdW1widGFsZW50XCJdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JhZGVzLnB1c2goZVtcInJlcGxhY2VtZW50XCJdW1widGFsZW50XCJdW2ldLnRvU3RyaW5nKCkuc3BsaXQoJyonKVswXSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZ3JhZGVzLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIGdyYWRlc1tqXS8v5pyA57uI6ZqP5Ye65p2l55qEXHJcbiAgICAgICAgICAgICAgICBsZXQgaCA9IERFRkFVTFRfUFJPUC5UTFQuaW5kZXhPZihpbmRleCkvL+imgeiiq+abv+aNoueahOWkqei1i+eahOinkuagh1xyXG4gICAgICAgICAgICAgICAgREVGQVVMVF9QUk9QLlRMVFtoXSA9IGdyYWRlc1tqXS8v5pu/5o2iXHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvblRhbGVudC5wdXNoKGdyYWRlc1tqXSkvL+abv+aNolxyXG4gICAgICAgICAgICAgICAgLy90aGlzLlRpcHNPcGVuKHRydWUsIFwi5aSp6LWL44CQXCIgKyB0aGlzLlRhbGVudHMuanNvbltpbmRleF1bXCJuYW1lXCJdICsgXCLjgJHlj5HliqjmiJDlip/vvIHmm7/mjaLmiJDjgJBcIiArIHRoaXMuVGFsZW50cy5qc29uW2dyYWRlc1tqXV1bXCJuYW1lXCJdICsgXCLjgJFcIilcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIuWkqei1i+OAkFwiICsgdGhpcy5UYWxlbnRzLmpzb25baW5kZXhdW1wibmFtZVwiXSArIFwi44CR5Y+R5Yqo5oiQ5Yqf77yB5pu/5o2i5oiQ44CQXCIgKyB0aGlzLlRhbGVudHMuanNvbltncmFkZXNbal1dW1wibmFtZVwiXSArIFwi44CRXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/oh6rliqjmt7vliqDngrnlh7vkuovku7ZcclxuICAgIEF1dG9BZGRDbGlja0V2ZW50KG5vZGU6IGNjLk5vZGUsIGNvbXBvbmVudE5hbWU6IHN0cmluZywgaGFuZGxlck5hbWU6IHN0cmluZywgcGFyYW1ldGVyOiBzdHJpbmcsIGJ1dHRvbjogY2MuTm9kZSkge1xyXG4gICAgICAgIGxldCBjbGlja0V2ZW50SGFuZGxlciA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgICAgY2xpY2tFdmVudEhhbmRsZXIudGFyZ2V0ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGNsaWNrRXZlbnRIYW5kbGVyLmNvbXBvbmVudCA9IGNvbXBvbmVudE5hbWU7XHJcbiAgICAgICAgY2xpY2tFdmVudEhhbmRsZXIuaGFuZGxlciA9IGhhbmRsZXJOYW1lO1xyXG4gICAgICAgIGNsaWNrRXZlbnRIYW5kbGVyLmN1c3RvbUV2ZW50RGF0YSA9IHBhcmFtZXRlcjtcclxuICAgICAgICBidXR0b24uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuY2xpY2tFdmVudHMucHVzaChjbGlja0V2ZW50SGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIFpvbmdqaWUoKSB7XHJcbiAgICAgICAgLy/mlbDmja7mjIHkuYXljJZcclxuICAgICAgICBERUZBVUxUX0NKLlRNUyArPSAxXHJcbiAgICAgICAgU2F2ZVV0aWxzLmluc3QuU2F2ZURhdGEoKVxyXG4gICAgICAgIGlmIChVc2VyTW9kZWwuaW5zdGFuY2UuYWRDZCkge1xyXG4gICAgICAgICAgICBVc2VyTW9kZWwuaW5zdGFuY2UuYWRDZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBVc2VyTW9kZWwuaW5zdGFuY2Uuc2F2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eVjOmdouWIh+aNolxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNFwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNVwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgLy/or4TliIZcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzUvQm94L0xheW91dC9DSFIvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBgPGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbH0+6aKc5YC8IDwvYz48Y29sb3I9JHt0aGlzLmdyb3VwXzRfbGFsMX0+YCArIERFRkFVTFRfUFJPUFtcIkNIUlwiXSArIFwiPC9jb2xvcj5cIlxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNS9Cb3gvTGF5b3V0L0lOVC9MYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IGA8Y29sb3I9JHt0aGlzLmdyb3VwXzRfbGFsfT7mmbrlipsgPC9jPjxjb2xvcj0ke3RoaXMuZ3JvdXBfNF9sYWwxfT5gICsgREVGQVVMVF9QUk9QW1wiSU5UXCJdICsgXCI8L2NvbG9yPlwiXHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF81L0JveC9MYXlvdXQvU1RSL0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gYDxjb2xvcj0ke3RoaXMuZ3JvdXBfNF9sYWx9PuS9k+i0qCA8L2M+PGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbDF9PmAgKyBERUZBVUxUX1BST1BbXCJTVFJcIl0gKyBcIjwvY29sb3I+XCJcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzUvQm94L0xheW91dC9NTlkvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBgPGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbH0+5a625aKDIDwvYz48Y29sb3I9JHt0aGlzLmdyb3VwXzRfbGFsMX0+YCArIERFRkFVTFRfUFJPUFtcIk1OWVwiXSArIFwiPC9jb2xvcj5cIlxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNS9Cb3gvTGF5b3V0L1NQUi9MYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IGA8Y29sb3I9JHt0aGlzLmdyb3VwXzRfbGFsfT7lv6vkuZAgPC9jPjxjb2xvcj0ke3RoaXMuZ3JvdXBfNF9sYWwxfT5gICsgREVGQVVMVF9QUk9QW1wiU1BSXCJdICsgXCI8L2NvbG9yPlwiXHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF81L0JveC9BR0UvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuesrFwiICsgREVGQVVMVF9DSltcIlRNU1wiXSArIFwi5LiW77yM5Lqr5bm0XCIgKyB0aGlzLk5vd0FnZSArIFwi5bKBXCJcclxuICAgICAgICBsZXQgc3VtID0gREVGQVVMVF9QUk9QW1wiQ0hSXCJdICsgREVGQVVMVF9QUk9QW1wiSU5UXCJdICsgREVGQVVMVF9QUk9QW1wiU1RSXCJdICsgREVGQVVMVF9QUk9QW1wiTU5ZXCJdICsgREVGQVVMVF9QUk9QW1wiU1BSXCJdICsgdGhpcy5Ob3dBZ2UvL+aAu+WIhuiuoeeul+WFrOW8j1xyXG4gICAgICAgIERFRkFVTFRfQ0pbXCJTVU1cIl0gPSBzdW0gPiBERUZBVUxUX0NKW1wiU1VNXCJdID8gc3VtIDogREVGQVVMVF9DSltcIlNVTVwiXTtcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzUvQm94L1NVTS9MYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHN1bS50b1N0cmluZygpXHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF81L0JveC9MZWdlbmQvXCIgKyBzdW1tYXJ5KFwiU1VNXCIsIHN1bSlbXCJqdWRnZVwiXSkuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIC8v5LiL6L6I5a2Q5LiJ6YCJ5LiA5aSp6LWLXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBERUZBVUxUX1BST1BbXCJUTFRcIl0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy/miZPlvIBsYWJlbFxyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzUvQm94L0xhYmVsMlwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IERFRkFVTFRfUFJPUFtcIlRMVFwiXVtpXVxyXG4gICAgICAgICAgICBsZXQgaiA9IGNjLmluc3RhbnRpYXRlKHRoaXMubm9ybWFsTGFiZWwpXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTnJvbWFsTGFibGUoaiwgZ3JhZGVzW3RoaXMuVGFsZW50cy5qc29uW2luZGV4XVtcImdyYWRlXCJdXSlcclxuICAgICAgICAgICAgai5wYXJlbnQgPSBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzUvQm94L1Njcm9sbFZpZXcyL3ZpZXcvTGF5b3V0XCIpXHJcbiAgICAgICAgICAgIHRoaXMuQXV0b0FkZENsaWNrRXZlbnQodGhpcy5ub2RlLCBcIk1haW5cIiwgXCJTZWxlY3RMdW5UYWxlbnRcIiwgKGkgKyAxKS50b1N0cmluZygpLCBqKVxyXG4gICAgICAgICAgICBqLmdldENoaWxkQnlOYW1lKFwiTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLlRhbGVudHMuanNvbltpbmRleF1bXCJuYW1lXCJdICsgXCIoXCIgKyB0aGlzLlRhbGVudHMuanNvbltpbmRleF1bXCJkZXNjcmlwdGlvblwiXSArIFwiKVwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5o+S5bGPXHJcblxyXG5cclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5WSVZPX0dBTUUgfHwgY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5YSUFPTUlfR0FNRSB8fCB3aW5kb3dbJ3VjJ10pIHtcclxuICAgICAgICAgICAgLy/CoGNvbnNvbGUubG9nKCfor7fpgInmi6knKVxyXG4gICAgICAgICAgICBHbG9iYWwucGxhdGZvcm0uU0hPV19USVRJQUxBRDEoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/nibnmlYjplIDmr4FcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzUvQm94L0FuaW1cIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF81L0JveC9MZWdlbmRcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIH0sIDEuNSlcclxuXHJcblxyXG4gICAgICAgIC8v5oiQ5bCx5qOA5p+lXHJcbiAgICAgICAgdGhpcy5jaGVja19jaihcIlNVTU1BUllcIilcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaXNBdXRvUGxheSgpIHtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzdGltbWVyQ0RhdXRvKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXN0aW1tZXJDRGF1dG8gPSB0cnVlXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFTYXZlRGF0YS5pc0F1dG9BRCkge1xyXG4gICAgICAgICAgICBpZiAod2luZG93W1widHRcIl0pIHtcclxuICAgICAgICAgICAgICAgIC8v5Z6D5Zy+5oqW6Z+z5b6X5YWI5by556qXXHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzMW9yMiA9IDFcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9EWUxKXCIpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEdsb2JhbC5wbGF0Zm9ybS5DTE9TRV9WSURFTyhcclxuICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBTYXZlRGF0YS5pc0F1dG8gPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgU2F2ZURhdGEuaXNBdXRvQUQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgU2F2ZURhdGEuaXNBdXRvMiA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8yL0JhY2tncm91bmQvWkQxXCIpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvQXV0bzIvQmFja2dyb3VuZC9aRDJcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICBTYXZlVXRpbHMuaW5zdC5TYXZlRGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8vQmFja2dyb3VuZC9JY29uXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8vQmFja2dyb3VuZC9aRDFcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvQXV0by9CYWNrZ3JvdW5kL1pEMlwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0RZTEpcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5UaXBzT3Blbih0cnVlLCBjYy5jb2xvcigxMjgsIDIyMywgMjM5KSwgXCLlub/lkYrmnKrmkq3mlL7lrozmiJBcIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVGlwc09wZW4odHJ1ZSwgY2MuY29sb3IoMTI4LCAyMjMsIDIzOSksIFwi5pqC5peg5bm/5ZGK77yM6K+356iN5ZCO5YaN6K+VXCIpXHJcbiAgICAgICAgICAgICAgICB9LCBcIjE4XCJcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBTYXZlRGF0YS5pc0F1dG8yID0gZmFsc2VcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8yL0JhY2tncm91bmQvWkQxXCIpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8yL0JhY2tncm91bmQvWkQyXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIGlmIChTYXZlRGF0YS5pc0F1dG8pIHtcclxuICAgICAgICAgICAgICAgIFNhdmVEYXRhLmlzQXV0byA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvQXV0by9CYWNrZ3JvdW5kL1pEMVwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvQXV0by9CYWNrZ3JvdW5kL1pEMlwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgU2F2ZURhdGEuaXNBdXRvID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8vQmFja2dyb3VuZC9aRDFcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9BdXRvL0JhY2tncm91bmQvWkQyXCIpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBTYXZlVXRpbHMuaW5zdC5TYXZlRGF0YSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaXNBdXRvUGxheTIoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzdGltbWVyQ0RhdXRvKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXN0aW1tZXJDRGF1dG8gPSB0cnVlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChTYXZlRGF0YS5pc0F1dG9BRDIgJiYgTWF0aC5yb3VuZChuZXcgRGF0ZSgpLmdldFRpbWUoKSkgLyAxMDAwIC0gU2F2ZURhdGEuTGFzdFRpbWUgPiBBRHRpbWUpIHtcclxuICAgICAgICAgICAgLy/otoXml7bkuoZcclxuICAgICAgICAgICAgU2F2ZURhdGEuaXNBdXRvQUQyID0gZmFsc2VcclxuICAgICAgICAgICAgU2F2ZURhdGEuaXNBdXRvMiA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghU2F2ZURhdGEuaXNBdXRvQUQyKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3dbXCJ0dFwiXSkge1xyXG4gICAgICAgICAgICAgICAgLy/lnoPlnL7mipbpn7PlvpflhYjlvLnnqpdcclxuICAgICAgICAgICAgICAgIHRoaXMuaXMxb3IyID0gMlxyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L2F1dG9iaW9ncmFwaHlcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgR2xvYmFsLnBsYXRmb3JtLkNMT1NFX1ZJREVPKFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFNhdmVEYXRhLkxhc3RUaW1lID0gTWF0aC5yb3VuZChuZXcgRGF0ZSgpLmdldFRpbWUoKSkgLyAxMDAwXHJcbiAgICAgICAgICAgICAgICAgICAgU2F2ZURhdGEuaXNBdXRvMiA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICBTYXZlRGF0YS5pc0F1dG9BRDIgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgU2F2ZURhdGEuaXNBdXRvID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvQXV0by9CYWNrZ3JvdW5kL1pEMVwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8vQmFja2dyb3VuZC9aRDJcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICBTYXZlVXRpbHMuaW5zdC5TYXZlRGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8yL0JhY2tncm91bmQvSWNvblwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9BdXRvMi9CYWNrZ3JvdW5kL1pEMVwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9BdXRvMi9CYWNrZ3JvdW5kL1pEMlwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0RZTEpcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5UaXBzT3Blbih0cnVlLCBjYy5jb2xvcigxMjgsIDIyMywgMjM5KSwgXCLlub/lkYrmnKrmkq3mlL7lrozmiJBcIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVGlwc09wZW4odHJ1ZSwgY2MuY29sb3IoMTI4LCAyMjMsIDIzOSksIFwi5pqC5peg5bm/5ZGK77yM6K+356iN5ZCO5YaN6K+VXCIpXHJcbiAgICAgICAgICAgICAgICB9LCAnNjInXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBTYXZlRGF0YS5pc0F1dG8gPSBmYWxzZVxyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvQXV0by9CYWNrZ3JvdW5kL1pEMVwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9BdXRvL0JhY2tncm91bmQvWkQyXCIpLmFjdGl2ZSA9IGZhbHNlXHJcblxyXG4gICAgICAgICAgICBpZiAoU2F2ZURhdGEuaXNBdXRvMikge1xyXG4gICAgICAgICAgICAgICAgU2F2ZURhdGEuaXNBdXRvMiA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvQXV0bzIvQmFja2dyb3VuZC9aRDFcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8yL0JhY2tncm91bmQvWkQyXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgU2F2ZURhdGEuaXNBdXRvMiA9IHRydWVcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9BdXRvMi9CYWNrZ3JvdW5kL1pEMVwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8yL0JhY2tncm91bmQvWkQyXCIpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBTYXZlVXRpbHMuaW5zdC5TYXZlRGF0YSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlQXV0b1BsYXkyKCkge1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9hdXRvYmlvZ3JhcGh5XCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgd2F0Y2hBdXRvUGxheTIoKSB7XHJcbiAgICAgICAgR2xvYmFsLnBsYXRmb3JtLkNMT1NFX1ZJREVPKFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvYXV0b2Jpb2dyYXBoeVwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgU2F2ZURhdGEuTGFzdFRpbWUgPSBNYXRoLnJvdW5kKG5ldyBEYXRlKCkuZ2V0VGltZSgpKSAvIDEwMDBcclxuICAgICAgICAgICAgICAgIFNhdmVEYXRhLmlzQXV0bzIgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBTYXZlRGF0YS5pc0F1dG9BRDIgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBTYXZlRGF0YS5pc0F1dG8gPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8vQmFja2dyb3VuZC9aRDFcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8vQmFja2dyb3VuZC9aRDJcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIFNhdmVVdGlscy5pbnN0LlNhdmVEYXRhKClcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9BdXRvMi9CYWNrZ3JvdW5kL0ljb25cIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9BdXRvMi9CYWNrZ3JvdW5kL1pEMVwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8yL0JhY2tncm91bmQvWkQyXCIpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9EWUxKXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVGlwc09wZW4odHJ1ZSwgY2MuY29sb3IoMTI4LCAyMjMsIDIzOSksIFwi5bm/5ZGK5pyq5pKt5pS+5a6M5oiQXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRpcHNPcGVuKHRydWUsIGNjLmNvbG9yKDEyOCwgMjIzLCAyMzkpLCBcIuaaguaXoOW5v+WRiu+8jOivt+eojeWQjuWGjeivlVwiKVxyXG4gICAgICAgICAgICB9LCAnNjInXHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIEF1dG9GdWMoKSB7XHJcbiAgICAgICAgR2xvYmFsLnBsYXRmb3JtLkNMT1NFX1ZJREVPKFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pczFvcjIpIHtcclxuICAgICAgICAgICAgICAgICAgICBTYXZlRGF0YS5pc0F1dG8gPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgU2F2ZURhdGEuaXNBdXRvQUQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIFNhdmVEYXRhLmlzQXV0bzIgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgU2F2ZURhdGEuaXNBdXRvQUQyID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgU2F2ZVV0aWxzLmluc3QuU2F2ZURhdGEoKVxyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8vQmFja2dyb3VuZC9JY29uXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvQXV0by9CYWNrZ3JvdW5kL1pEMVwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8vQmFja2dyb3VuZC9aRDJcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0RZTEpcIikuYWN0aXZlID0gZmFsc2VcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVGlwc09wZW4odHJ1ZSwgY2MuY29sb3IoMTI4LCAyMjMsIDIzOSksIFwi5bm/5ZGK5pyq5pKt5pS+5a6M5oiQXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRpcHNPcGVuKHRydWUsIGNjLmNvbG9yKDEyOCwgMjIzLCAyMzkpLCBcIuaaguaXoOW5v+WRiu+8jOivt+eojeWQjuWGjeivlVwiKVxyXG4gICAgICAgICAgICB9LCBcIjE4XCJcclxuICAgICAgICApXHJcbiAgICB9XHJcbiAgICAvL0dyb3VkXzVcclxuICAgIHJlcmVyZSgpIHtcclxuICAgICAgICBHbG9iYWwuaXNGaXJzdEVudGVyQ0ogPSB0cnVlO1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnTGlmZVJlYmlydGgnKVxyXG4gICAgfVxyXG4gICAgV1hTaGFyZSgpIHtcclxuICAgICAgICAvL+W+ruS/oeaJi+WKqOWIhuS6q1xyXG4gICAgICAgIEdsb2JhbC5wbGF0Zm9ybS5TaGFyZSgoKSA9PiB7IH0pXHJcbiAgICB9XHJcbiAgICAvL+mAieaLqei9ruWbnuWkqei1i1xyXG4gICAgU2VsZWN0THVuVGFsZW50KGV2ZW50LCBjdXN0b21FdmVudERhdGEpIHtcclxuICAgICAgICBTYXZlRGF0YS5MdW5IdWlUYWxlbnQgPSBOdW1iZXIoREVGQVVMVF9QUk9QW1wiVExUXCJdW2N1c3RvbUV2ZW50RGF0YSAtIDFdKVxyXG4gICAgICAgIFNhdmVVdGlscy5pbnN0LlNhdmVEYXRhKClcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzUvQm94L1Njcm9sbFZpZXcyL3ZpZXcvTGF5b3V0XCIpLmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoTnVtYmVyKGN1c3RvbUV2ZW50RGF0YSkgPT09IChpICsgMSkpIHtcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNS9Cb3gvU2Nyb2xsVmlldzIvdmlldy9MYXlvdXRcIikuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoXCJCb3hfU2VsZWN0ZWRcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF81L0JveC9TY3JvbGxWaWV3Mi92aWV3L0xheW91dFwiKS5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcIkJveF9TZWxlY3RlZFwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/lub/lkYrvvIjlpKnpgInkuYvkurrvvIlcclxuICAgIGFkZEF0dHJpYnV0ZShldmVudCwgY3VzdG9tRXZlbnREYXRhKSB7XHJcbiAgICAgICAgR2xvYmFsLnBsYXRmb3JtLkNMT1NFX1ZJREVPKFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtID0gTnVtYmVyKGN1c3RvbUV2ZW50RGF0YSlcclxuICAgICAgICAgICAgICAgIHRoaXMuTWF4VXNlTnVtICs9IG51bVxyXG4gICAgICAgICAgICAgICAgdGhpcy5DYW5Vc2UobnVtKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuVFhDUyA+PSAyKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfMy9BRERcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzMvUmFuZG9tXCIpLnggPSAwXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmiJDlip9cIilcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlpLHotKVcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVGlwc09wZW4odHJ1ZSwgY2MuY29sb3IoMTI4LCAyMjMsIDIzOSksIFwi5pqC5peg5bm/5ZGK77yM6K+356iN5ZCO5YaN6K+VXCIpXHJcbiAgICAgICAgICAgIH0sIFwiMTVcIlxyXG4gICAgICAgIClcclxuICAgIH1cclxuICAgIC8v5LuO5paw5oq95aSp6LWLKOmAhuWkqeaUueWRvSlcclxuICAgIFJlb3BlbihldmVudCwgY3VzdG9tRXZlbnREYXRhKSB7XHJcbiAgICAgICAgR2xvYmFsLnBsYXRmb3JtLkNMT1NFX1ZJREVPKFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL+mHjee9rumAu+i+kVxyXG4gICAgICAgICAgICAgICAgREVGQVVMVF9QUk9QW1wiVExUXCJdID0gW11cclxuICAgICAgICAgICAgICAgIHRoaXMuQWxyZWFkeVRhbGVudEJ1dHRvbiA9IFtdXHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbFNob3dUYWxlbnQgPSBbXVxyXG4gICAgICAgICAgICAgICAgdGhpcy5Ob3dTZWxlY3RUYWxlbnROdW0gPSAwXHJcblxyXG4gICAgICAgICAgICAgICAgLy/lpZblirHkuIDkuKrnqIDmnInluqbkuLoy55qE5aSp6LWLXHJcbiAgICAgICAgICAgICAgICBsZXQgdHdlID0gWzEwMDUsIDEwMTQsIDEwMTgsIDEwMTksIDEwMjQsIDEwMjUsIDEwODMsIDExMDQsIDExMTIsIDExMjgsIDExMjksIDExMzFdXHJcbiAgICAgICAgICAgICAgICBsZXQgenMgPSB0d2VbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdHdlLmxlbmd0aCldXHJcblxyXG4gICAgICAgICAgICAgICAgU2F2ZURhdGEuTHVuSHVpVGFsZW50ID0genNcclxuICAgICAgICAgICAgICAgIFNhdmVVdGlscy5pbnN0LlNhdmVEYXRhKClcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLlRlbkNQKClcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5oiQ5YqfXCIpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5aSx6LSlXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRpcHNPcGVuKHRydWUsIGNjLmNvbG9yKDEyOCwgMjIzLCAyMzkpLCBcIuaaguaXoOW5v+WRiu+8jOivt+eojeWQjuWGjeivlVwiKVxyXG4gICAgICAgICAgICB9LCBcIjEyXCJcclxuICAgICAgICApXHJcbiAgICB9XHJcbiAgICBtb3ZlU3RhcnQoZTogY2MuVG91Y2gpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0UG9zID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN0YXJ0UG9zID0gZS5nZXRMb2NhdGlvbigpXHJcbiAgICB9XHJcblxyXG4gICAgbW92ZUluZyhlOiBjYy5Ub3VjaCkge1xyXG4gICAgICAgIGlmIChlLmdldExvY2F0aW9uKCkueSAtIHRoaXMuc3RhcnRQb3MueSA+PSAxNSkge1xyXG4gICAgICAgICAgICB0aGlzLlRpcHNPcGVuKGZhbHNlLCBjYy5jb2xvcigxMjgsIDIyMywgMjM5KSlcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vR3JvdXBfNui/lOWbnuaMiemSrlxyXG4gICAgR3JvdXBfNl9SZXR1cm4oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWNoaWV2ZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5hY2hpZXZlbWVudC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWNoaWV2ZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzFcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNlwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIEdsb2JhbC5nYXBUaW1lID0gMDtcclxuICAgICAgICBHbG9iYWwuaXNTaG93ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8v5omT5byA5oiQ5bCx55WM6Z2iXHJcbiAgICBPcGVuX2NoZW5naml1KCkge1xyXG4gICAgICAgIHRoaXMuR2VudGFsZW50KClcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzFcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzZcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIEdsb2JhbC5nYXBUaW1lID0gMDtcclxuICAgICAgICBHbG9iYWwuaXNTaG93ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvL+eUn+aIkOWkqei1i1xyXG4gICAgR2VudGFsZW50KCkge1xyXG4gICAgICAgIGxldCBtYW86IGFueVtdID0gW107XHJcbiAgICAgICAgbGV0IG1hbzE6IGFueVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLkFjaGlldmVtZW50Lmpzb24pIHtcclxuICAgICAgICAgICAgaWYgKERFRkFVTFRfQ0ouQUNKLmluY2x1ZGVzKHRoaXMuQWNoaWV2ZW1lbnQuanNvbltpXS5pZCkpIHtcclxuICAgICAgICAgICAgICAgIG1hby5wdXNoKHRoaXMuQWNoaWV2ZW1lbnQuanNvbltpXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtYW8xLnB1c2godGhpcy5BY2hpZXZlbWVudC5qc29uW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYW8xLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG1hby5wdXNoKG1hbzFbaV0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbWFvMjogYW55W11bXSA9IFtdOy8vXHJcblxyXG4gICAgICAgIGxldCBudW0gPSBNYXRoLmNlaWwoT2JqZWN0LmtleXModGhpcy5BY2hpZXZlbWVudC5qc29uKS5sZW5ndGggKiAwLjUpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBrID0gMCwgaW5kZXggPSAwOyBrIDwgbnVtOyBrKyspIHtcclxuXHJcbiAgICAgICAgICAgIG1hbzIucHVzaChtYW8uc2xpY2UoaW5kZXgsIGluZGV4ICs9IDIpKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBSZXNNZ3IubG9hZFByZWZhYigncHJlZmFiL2FjaGlldmVtZW50JywgKHByZSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcHJlZmFiOiBjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUocHJlKVxyXG4gICAgICAgICAgICBwcmVmYWIucGFyZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdHcm91cF82Jyk7XHJcbiAgICAgICAgICAgIGxldCBoaWdodCA9IChjYy53aW5TaXplLmhlaWdodCAtIDEyODApIC8gMlxyXG4gICAgICAgICAgICBwcmVmYWIueSA9IC0yMjBcclxuICAgICAgICAgICAgcHJlZmFiLmdldENvbXBvbmVudChBY2hpZXZlbWVudCkuZGF0YSA9IG1hbzI7XHJcbiAgICAgICAgICAgIHByZWZhYi5nZXRDb21wb25lbnQoQWNoaWV2ZW1lbnQpLmluaXQoKVxyXG4gICAgICAgICAgICB0aGlzLmFjaGlldmVtZW50ID0gcHJlZmFiO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvL+e7n+iuoVxyXG4gICAgdG9uZ2ppKCkge1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNi9MYXlvdXQvMS9UaXRsZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwi5bey6YeN5byAXCIgKyBERUZBVUxUX0NKLlRNUyArIFwi5qyhXCJcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzYvTGF5b3V0LzIvVGl0bGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuaIkOWwsei+vuaIkFwiICsgREVGQVVMVF9DSi5BQ0oubGVuZ3RoICsgXCLkuKpcIlxyXG5cclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzYvTGF5b3V0LzEvQ29uXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCLmir3liLDntKvoibLmpoLnjodcIiArIHN1bW1hcnkoXCJDS1wiLCBERUZBVUxUX0NKLlRNUykuanVkZ2VcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzYvTGF5b3V0LzIvQ29uXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCLmir3liLDmqZnoibLmpoLnjodcIiArIHN1bW1hcnkoXCJDSlwiLCBERUZBVUxUX0NKLkFDSi5sZW5ndGgpLmp1ZGdlXHJcblxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNi9MYXlvdXQvMy9Db25cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNYXRoLmNlaWwoREVGQVVMVF9DSi5BRVZULmxlbmd0aCAqIDEwMCAvIE9iamVjdC5rZXlzKHRoaXMuRXZlbnRzLmpzb24pLmxlbmd0aCkgKyBcIiVcIlxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNi9MYXlvdXQvNC9Db25cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNYXRoLmNlaWwoREVGQVVMVF9DSi5BVExULmxlbmd0aCAqIDEwMCAvIE9iamVjdC5rZXlzKHRoaXMuVGFsZW50cy5qc29uKS5sZW5ndGgpICsgXCIlXCJcclxuICAgIH1cclxuXHJcbiAgICBncm91cDNJbigpIHtcclxuICAgICAgICAvL+WFs+mXreWkqei1i+mAieaLqemdouadv1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfMlwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfM1wiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICB9XHJcblxyXG4gICAgLy/lhbPpl63lsI/lj4tcclxuICAgIENsb3NlWFkoKSB7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF8yL0FkZFRhbGVudFwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuZ3JvdXAzSW4oKVxyXG4gICAgfVxyXG5cclxuICAgIG9wZW5WaWRlbygpIHtcclxuICAgICAgICBSZXNNZ3IubG9hZFByZWZhYigncHJlZmFiL3JhbmtpbmdMaXN0JywgKHByZSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcHJlZmFiID0gY2MuaW5zdGFudGlhdGUocHJlKVxyXG4gICAgICAgICAgICBwcmVmYWIucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBvcGVuR2FtZUJveCgpIHtcclxuICAgICAgICBSZXNNZ3IubG9hZFByZWZhYigncHJlZmFiL2dhbWVCb3gnLCAocHJlKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwcmVmYWIgPSBjYy5pbnN0YW50aWF0ZShwcmUpXHJcbiAgICAgICAgICAgIHByZWZhYi5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/AD/AD_ROOT.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5d89defUmlB6btRzoHiP5wt', 'AD_ROOT');
// Scripts/AD/AD_ROOT.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("./Global");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AD_ROOT = /** @class */ (function (_super) {
    __extends(AD_ROOT, _super);
    function AD_ROOT() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ADflag = false;
        _this.timeId = 0;
        return _this;
    }
    AD_ROOT.prototype.onLoad = function () {
        Global_1.default.AD_RootNode = this;
        this.ADflag = false;
    };
    AD_ROOT = __decorate([
        ccclass
    ], AD_ROOT);
    return AD_ROOT;
}(cc.Component));
exports.default = AD_ROOT;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQURcXEFEX1JPT1QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQThCO0FBRXhCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXFDLDJCQUFZO0lBQWpEO1FBQUEscUVBYUM7UUFYRyxZQUFNLEdBQVksS0FBSyxDQUFBO1FBRXZCLFlBQU0sR0FBVyxDQUFDLENBQUM7O0lBU3ZCLENBQUM7SUFQRyx3QkFBTSxHQUFOO1FBRUksZ0JBQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFBO1FBRXpCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO0lBQ3ZCLENBQUM7SUFYZ0IsT0FBTztRQUQzQixPQUFPO09BQ2EsT0FBTyxDQWEzQjtJQUFELGNBQUM7Q0FiRCxBQWFDLENBYm9DLEVBQUUsQ0FBQyxTQUFTLEdBYWhEO2tCQWJvQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdsb2JhbCBmcm9tIFwiLi9HbG9iYWxcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBRF9ST09UIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBBRGZsYWc6IGJvb2xlYW4gPSBmYWxzZVxyXG5cclxuICAgIHRpbWVJZDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcblxyXG4gICAgICAgIEdsb2JhbC5BRF9Sb290Tm9kZSA9IHRoaXNcclxuXHJcbiAgICAgICAgdGhpcy5BRGZsYWcgPSBmYWxzZVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Main/achievement.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '78a5dk/a3pHOIHjY7TS2VJb', 'achievement');
// Scripts/Main/achievement.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ScrollviewMgr_1 = require("../Other/ScrollviewMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Achievement = /** @class */ (function (_super) {
    __extends(Achievement, _super);
    function Achievement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Achievement.prototype.onLoad = function () {
        this.scorMgr = this.node.children[0].getComponent(ScrollviewMgr_1.default);
    };
    Achievement.prototype.init = function () {
        this.scorMgr.init(this.data);
    };
    Achievement = __decorate([
        ccclass
    ], Achievement);
    return Achievement;
}(cc.Component));
exports.default = Achievement;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWFpblxcYWNoaWV2ZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQW1EO0FBRTdDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXlDLCtCQUFZO0lBQXJEOztJQVlBLENBQUM7SUFQRyw0QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsdUJBQWEsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCwwQkFBSSxHQUFKO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2hDLENBQUM7SUFYZ0IsV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQVkvQjtJQUFELGtCQUFDO0NBWkQsQUFZQyxDQVp3QyxFQUFFLENBQUMsU0FBUyxHQVlwRDtrQkFab0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTY3JvbGx2aWV3TWdyIGZyb20gXCIuLi9PdGhlci9TY3JvbGx2aWV3TWdyXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWNoaWV2ZW1lbnQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHByaXZhdGUgc2Nvck1ncjogU2Nyb2xsdmlld01ncjtcclxuICAgIGRhdGE6IGFueTtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5zY29yTWdyID0gdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChTY3JvbGx2aWV3TWdyKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIHRoaXMuc2Nvck1nci5pbml0KHRoaXMuZGF0YSlcclxuICAgIH1cclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Main/evenList.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd5c2arTdQ5HpKCwgg9r5GJr', 'evenList');
// Scripts/Main/evenList.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ScrollviewMgr_1 = require("../Other/ScrollviewMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EvenList = /** @class */ (function (_super) {
    __extends(EvenList, _super);
    function EvenList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EvenList.prototype.onLoad = function () {
        this.scorMgr = this.node.children[0].getComponent(ScrollviewMgr_1.default);
    };
    EvenList.prototype.init = function (data) {
        this.data = data;
        this.scorMgr.init(this.data);
    };
    EvenList = __decorate([
        ccclass
    ], EvenList);
    return EvenList;
}(cc.Component));
exports.default = EvenList;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWFpblxcZXZlbkxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQW1EO0FBRTdDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXNDLDRCQUFZO0lBQWxEOztJQVVBLENBQUM7SUFQRyx5QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsdUJBQWEsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFDRCx1QkFBSSxHQUFKLFVBQUssSUFBSTtRQUNMLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBVGdCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0FVNUI7SUFBRCxlQUFDO0NBVkQsQUFVQyxDQVZxQyxFQUFFLENBQUMsU0FBUyxHQVVqRDtrQkFWb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTY3JvbGx2aWV3TWdyIGZyb20gXCIuLi9PdGhlci9TY3JvbGx2aWV3TWdyXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbkxpc3QgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgcHJpdmF0ZSBzY29yTWdyOiBTY3JvbGx2aWV3TWdyO1xyXG4gICAgZGF0YTogYW55XHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5zY29yTWdyID0gdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChTY3JvbGx2aWV3TWdyKTtcclxuICAgIH1cclxuICAgIGluaXQoZGF0YSl7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLnNjb3JNZ3IuaW5pdCh0aGlzLmRhdGEpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Main/summary.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f9a63aYQyhPP5jspil0OEIO', 'summary');
// Scripts/Main/summary.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADtime = exports.OtherGrades = exports.gradesH = exports.grades = exports.summary = void 0;
//稀有度颜色
var grade_0 = cc.color(255, 255, 255);
var grade_1 = cc.color(103, 197, 230);
var grade_2 = cc.color(237, 120, 239);
var grade_3 = cc.color(247, 140, 75);
var grades = [grade_0, grade_1, grade_2, grade_3];
exports.grades = grades;
var grade_0H = cc.color(0, 0, 0);
var grade_1H = cc.color(103, 197, 230);
var grade_2H = cc.color(237, 120, 239);
var grade_3H = cc.color(247, 140, 75);
var gradesH = [grade_0H, grade_1H, grade_2H, grade_3H];
exports.gradesH = gradesH;
//其他颜色
var OtherGrade_0 = cc.color(224, 102, 102); //按钮红
var OtherGrade_1 = cc.color(255, 255, 255); //按钮白
var OtherGrade_2 = cc.color(0, 0, 0); //按钮黑
var OtherGrades = [OtherGrade_0, OtherGrade_1, OtherGrade_2];
exports.OtherGrades = OtherGrades;
var ADtime = 86400;
exports.ADtime = ADtime;
var data = {
    "CHR": [
        { "judge": "地狱", "grade": 0, "color": grade_0 },
        { "min": 1, "judge": "折磨", "grade": 0, "color": grade_0 },
        { "min": 2, "judge": "不佳", "grade": 0, "color": grade_0 },
        { "min": 4, "judge": "普通", "grade": 0, "color": grade_0 },
        { "min": 7, "judge": "优秀", "grade": 1, "color": grade_1 },
        { "min": 9, "judge": "罕见", "grade": 2, "color": grade_2 },
        { "min": 11, "judge": "逆天", "grade": 3, "color": grade_3 },
    ],
    "MNY": [
        { "judge": "地狱", "grade": 0, "color": grade_0 },
        { "min": 1, "judge": "折磨", "grade": 0, "color": grade_0 },
        { "min": 2, "judge": "不佳", "grade": 0, "color": grade_0 },
        { "min": 4, "judge": "普通", "grade": 0, "color": grade_0 },
        { "min": 7, "judge": "优秀", "grade": 1, "color": grade_1 },
        { "min": 9, "judge": "罕见", "grade": 2, "color": grade_2 },
        { "min": 11, "judge": "逆天", "grade": 3, "color": grade_3 },
    ],
    "SPR": [
        { "judge": "地狱", "grade": 0, "color": grade_0 },
        { "min": 1, "judge": "折磨", "grade": 0, "color": grade_0 },
        { "min": 2, "judge": "不幸", "grade": 0, "color": grade_0 },
        { "min": 4, "judge": "普通", "grade": 0, "color": grade_0 },
        { "min": 7, "judge": "幸福", "grade": 1, "color": grade_1 },
        { "min": 9, "judge": "极乐", "grade": 2, "color": grade_2 },
        { "min": 11, "judge": "天命", "grade": 3, "color": grade_3 },
    ],
    "INT": [
        { "judge": "地狱", "grade": 0, "color": grade_0 },
        { "min": 1, "judge": "折磨", "grade": 0, "color": grade_0 },
        { "min": 2, "judge": "不佳", "grade": 0, "color": grade_0 },
        { "min": 4, "judge": "普通", "grade": 0, "color": grade_0 },
        { "min": 7, "judge": "优秀", "grade": 1, "color": grade_1 },
        { "min": 9, "judge": "罕见", "grade": 2, "color": grade_2 },
        { "min": 11, "judge": "逆天", "grade": 3, "color": grade_3 },
        { "min": 21, "judge": "识海", "grade": 3, "color": grade_3 },
        { "min": 131, "judge": "元神", "grade": 3, "color": grade_3 },
        { "min": 501, "judge": "仙魂", "grade": 3, "color": grade_3 },
    ],
    "STR": [
        { "judge": "地狱", "grade": 0, "color": grade_0 },
        { "min": 1, "judge": "折磨", "grade": 0, "color": grade_0 },
        { "min": 2, "judge": "不佳", "grade": 0, "color": grade_0 },
        { "min": 4, "judge": "普通", "grade": 0, "color": grade_0 },
        { "min": 7, "judge": "优秀", "grade": 1, "color": grade_1 },
        { "min": 9, "judge": "罕见", "grade": 2, "color": grade_2 },
        { "min": 11, "judge": "逆天", "grade": 3, "color": grade_3 },
        { "min": 21, "judge": "凝气", "grade": 3, "color": grade_3 },
        { "min": 101, "judge": "筑基", "grade": 3, "color": grade_3 },
        { "min": 401, "judge": "金丹", "grade": 3, "color": grade_3 },
        { "min": 1001, "judge": "元婴", "grade": 3, "color": grade_3 },
        { "min": 2001, "judge": "仙体", "grade": 3, "color": grade_3 },
    ],
    "AGE": [
        { "judge": "胎死腹中", "grade": 0, "color": grade_0 },
        { "min": 1, "judge": "早夭", "grade": 0, "color": grade_0 },
        { "min": 10, "judge": "少年", "grade": 0, "color": grade_0 },
        { "min": 18, "judge": "盛年", "grade": 0, "color": grade_0 },
        { "min": 40, "judge": "中年", "grade": 0, "color": grade_0 },
        { "min": 60, "judge": "花甲", "grade": 1, "color": grade_1 },
        { "min": 70, "judge": "古稀", "grade": 1, "color": grade_1 },
        { "min": 80, "judge": "杖朝", "grade": 2, "color": grade_2 },
        { "min": 90, "judge": "南山", "grade": 2, "color": grade_2 },
        { "min": 95, "judge": "不老", "grade": 3, "color": grade_3 },
        { "min": 100, "judge": "修仙", "grade": 3, "color": grade_3 },
        { "min": 500, "judge": "仙寿", "grade": 3, "color": grade_3 },
    ],
    "SUM": [
        { "judge": "地狱", "grade": 0, "color": grade_0 },
        { "min": 40, "judge": "折磨", "grade": 0, "color": grade_0 },
        { "min": 60, "judge": "不佳", "grade": 0, "color": grade_0 },
        { "min": 90, "judge": "普通", "grade": 0, "color": grade_0 },
        { "min": 130, "judge": "优秀", "grade": 1, "color": grade_1 },
        { "min": 180, "judge": "罕见", "grade": 2, "color": grade_2 },
        { "min": 240, "judge": "逆天", "grade": 3, "color": grade_3 },
        { "min": 310, "judge": "传说", "grade": 3, "color": grade_3 },
    ],
    "CK": [
        { "judge": "不变", "grade": 0, "color": grade_0 },
        { "min": 10, "judge": "二倍", "grade": 0, "color": grade_0 },
        { "min": 50, "judge": "三倍", "grade": 0, "color": grade_0 },
        { "min": 100, "judge": "四倍", "grade": 0, "color": grade_0 },
        { "min": 200, "judge": "五倍", "grade": 1, "color": grade_1 },
        { "min": 500, "judge": "六倍", "grade": 2, "color": grade_2 },
    ],
    "CJ": [
        { "judge": "不变", "grade": 0, "color": grade_0 },
        { "min": 20, "judge": "二倍", "grade": 0, "color": grade_0 },
        { "min": 50, "judge": "三倍", "grade": 0, "color": grade_0 },
        { "min": 100, "judge": "四倍", "grade": 0, "color": grade_0 },
        { "min": 160, "judge": "五倍", "grade": 1, "color": grade_1 },
        { "min": 500, "judge": "六倍", "grade": 2, "color": grade_2 },
    ]
};
function summary(type, value) {
    var length = data[type].length;
    while (length--) {
        var _a = data[type][length], min = _a.min, judge = _a.judge, grade = _a.grade, color = _a.color;
        if (min == void 0 || value >= min)
            return { judge: judge, grade: grade, color: color };
    }
}
exports.summary = summary;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWFpblxcc3VtbWFyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPO0FBQ1AsSUFBTSxPQUFPLEdBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQzVDLElBQU0sT0FBTyxHQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQTtBQUM1QyxJQUFNLE9BQU8sR0FBVSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUE7QUFDNUMsSUFBTSxPQUFPLEdBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQzNDLElBQU0sTUFBTSxHQUFZLENBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxDQUFDLENBQUE7QUF3SHZDLHdCQUFNO0FBdEh4QixJQUFNLFFBQVEsR0FBVSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7QUFDdkMsSUFBTSxRQUFRLEdBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQzdDLElBQU0sUUFBUSxHQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQTtBQUM3QyxJQUFNLFFBQVEsR0FBVSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLENBQUE7QUFDNUMsSUFBTSxPQUFPLEdBQVksQ0FBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxRQUFRLENBQUMsQ0FBQTtBQWtIckMsMEJBQU87QUFqSGhDLE1BQU07QUFDTixJQUFNLFlBQVksR0FBVSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQSxLQUFLO0FBQ3RELElBQU0sWUFBWSxHQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQSxDQUFBLEtBQUs7QUFDdEQsSUFBTSxZQUFZLEdBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLENBQUEsS0FBSztBQUVoRCxJQUFNLFdBQVcsR0FBWSxDQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsWUFBWSxDQUFDLENBQUE7QUE0R3BDLGtDQUFXO0FBMUc1QyxJQUFNLE1BQU0sR0FBUSxLQUFLLENBQUE7QUEwR29CLHdCQUFNO0FBeEduRCxJQUFNLElBQUksR0FBRztJQUNULEtBQUssRUFBRTtRQUNILEVBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDNUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3JELEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUNyRCxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDckQsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3JELEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUNyRCxFQUFDLEtBQUssRUFBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7S0FDekQ7SUFDRCxLQUFLLEVBQUU7UUFDSCxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQzVDLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUNyRCxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDckQsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3JELEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUNyRCxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDckQsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO0tBQ3pEO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUM1QyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDckQsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3JELEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUNyRCxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDckQsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3JELEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztLQUN6RDtJQUNELEtBQUssRUFBRTtRQUNILEVBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDNUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3JELEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUNyRCxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDckQsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3JELEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUNyRCxFQUFDLEtBQUssRUFBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDdEQsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3RELEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUN2RCxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7S0FDMUQ7SUFDRCxLQUFLLEVBQUU7UUFDSCxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQzVDLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUNyRCxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDckQsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3JELEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUNyRCxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDckQsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3RELEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUN0RCxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDdkQsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3ZELEVBQUMsS0FBSyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUN4RCxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7S0FDM0Q7SUFDRCxLQUFLLEVBQUU7UUFDSCxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQzlDLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUNyRCxFQUFDLEtBQUssRUFBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDdEQsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3RELEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUN0RCxFQUFDLEtBQUssRUFBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDdEQsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3RELEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUN0RCxFQUFDLEtBQUssRUFBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDdEQsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3RELEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUN2RCxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7S0FDMUQ7SUFDRCxLQUFLLEVBQUU7UUFDSCxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQzVDLEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUN0RCxFQUFDLEtBQUssRUFBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDdEQsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3RELEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUN2RCxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDdkQsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3ZELEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztLQUMxRDtJQUNELElBQUksRUFBRTtRQUNGLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDNUMsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3RELEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUN0RCxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDdkQsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3ZELEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztLQUMxRDtJQUNELElBQUksRUFBRTtRQUNGLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDNUMsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3RELEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUN0RCxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDdkQsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3ZELEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztLQUMxRDtDQUNKLENBQUE7QUFFRCxTQUFTLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSztJQUN4QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQy9CLE9BQU0sTUFBTSxFQUFFLEVBQUU7UUFDTixJQUFBLEtBQTRCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBN0MsR0FBRyxTQUFBLEVBQUUsS0FBSyxXQUFBLEVBQUUsS0FBSyxXQUFBLEVBQUMsS0FBSyxXQUFzQixDQUFDO1FBQ3JELElBQUcsR0FBRyxJQUFFLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxHQUFHO1lBQUUsT0FBTyxFQUFDLEtBQUssT0FBQSxFQUFFLEtBQUssT0FBQSxFQUFDLEtBQUssT0FBQSxFQUFDLENBQUM7S0FDL0Q7QUFDTCxDQUFDO0FBRVEsMEJBQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvL+eogOacieW6puminOiJslxyXG5jb25zdCBncmFkZV8wOmNjLkNvbG9yPWNjLmNvbG9yKDI1NSwyNTUsMjU1KVxyXG5jb25zdCBncmFkZV8xOmNjLkNvbG9yPWNjLmNvbG9yKDEwMywxOTcsMjMwKVxyXG5jb25zdCBncmFkZV8yOmNjLkNvbG9yPWNjLmNvbG9yKDIzNywxMjAsMjM5KVxyXG5jb25zdCBncmFkZV8zOmNjLkNvbG9yPWNjLmNvbG9yKDI0NywxNDAsNzUpXHJcbmNvbnN0IGdyYWRlczpjYy5Db2xvcltdPVtncmFkZV8wLGdyYWRlXzEsZ3JhZGVfMixncmFkZV8zXVxyXG5cclxuY29uc3QgZ3JhZGVfMEg6Y2MuQ29sb3I9Y2MuY29sb3IoMCwwLDApXHJcbmNvbnN0IGdyYWRlXzFIOmNjLkNvbG9yPWNjLmNvbG9yKDEwMywxOTcsMjMwKVxyXG5jb25zdCBncmFkZV8ySDpjYy5Db2xvcj1jYy5jb2xvcigyMzcsMTIwLDIzOSlcclxuY29uc3QgZ3JhZGVfM0g6Y2MuQ29sb3I9Y2MuY29sb3IoMjQ3LDE0MCw3NSlcclxuY29uc3QgZ3JhZGVzSDpjYy5Db2xvcltdPVtncmFkZV8wSCxncmFkZV8xSCxncmFkZV8ySCxncmFkZV8zSF1cclxuLy/lhbbku5bpopzoibJcclxuY29uc3QgT3RoZXJHcmFkZV8wOmNjLkNvbG9yPWNjLmNvbG9yKDIyNCwxMDIsMTAyKS8v5oyJ6ZKu57qiXHJcbmNvbnN0IE90aGVyR3JhZGVfMTpjYy5Db2xvcj1jYy5jb2xvcigyNTUsMjU1LDI1NSkvL+aMiemSrueZvVxyXG5jb25zdCBPdGhlckdyYWRlXzI6Y2MuQ29sb3I9Y2MuY29sb3IoMCwwLDApLy/mjInpkq7pu5FcclxuXHJcbmNvbnN0IE90aGVyR3JhZGVzOmNjLkNvbG9yW109W090aGVyR3JhZGVfMCxPdGhlckdyYWRlXzEsT3RoZXJHcmFkZV8yXVxyXG5cclxuY29uc3QgQUR0aW1lOm51bWJlcj04NjQwMFxyXG5cclxuY29uc3QgZGF0YSA9IHtcclxuICAgIFwiQ0hSXCI6IFtcclxuICAgICAgICB7XCJqdWRnZVwiOiBcIuWcsOeLsVwiLCBcImdyYWRlXCI6IDAsXCJjb2xvclwiOiBncmFkZV8wfSxcclxuICAgICAgICB7XCJtaW5cIjoxLCBcImp1ZGdlXCI6IFwi5oqY56OoXCIsIFwiZ3JhZGVcIjogMCxcImNvbG9yXCI6IGdyYWRlXzB9LFxyXG4gICAgICAgIHtcIm1pblwiOjIsIFwianVkZ2VcIjogXCLkuI3kvbNcIiwgXCJncmFkZVwiOiAwLFwiY29sb3JcIjogZ3JhZGVfMH0sXHJcbiAgICAgICAge1wibWluXCI6NCwgXCJqdWRnZVwiOiBcIuaZrumAmlwiLCBcImdyYWRlXCI6IDAsXCJjb2xvclwiOiBncmFkZV8wfSxcclxuICAgICAgICB7XCJtaW5cIjo3LCBcImp1ZGdlXCI6IFwi5LyY56eAXCIsIFwiZ3JhZGVcIjogMSxcImNvbG9yXCI6IGdyYWRlXzF9LFxyXG4gICAgICAgIHtcIm1pblwiOjksIFwianVkZ2VcIjogXCLnvZXop4FcIiwgXCJncmFkZVwiOiAyLFwiY29sb3JcIjogZ3JhZGVfMn0sXHJcbiAgICAgICAge1wibWluXCI6MTEsIFwianVkZ2VcIjogXCLpgIblpKlcIiwgXCJncmFkZVwiOiAzLFwiY29sb3JcIjogZ3JhZGVfM30sXHJcbiAgICBdLFxyXG4gICAgXCJNTllcIjogW1xyXG4gICAgICAgIHtcImp1ZGdlXCI6IFwi5Zyw54uxXCIsIFwiZ3JhZGVcIjogMCxcImNvbG9yXCI6IGdyYWRlXzB9LFxyXG4gICAgICAgIHtcIm1pblwiOjEsIFwianVkZ2VcIjogXCLmipjno6hcIiwgXCJncmFkZVwiOiAwLFwiY29sb3JcIjogZ3JhZGVfMH0sXHJcbiAgICAgICAge1wibWluXCI6MiwgXCJqdWRnZVwiOiBcIuS4jeS9s1wiLCBcImdyYWRlXCI6IDAsXCJjb2xvclwiOiBncmFkZV8wfSxcclxuICAgICAgICB7XCJtaW5cIjo0LCBcImp1ZGdlXCI6IFwi5pmu6YCaXCIsIFwiZ3JhZGVcIjogMCxcImNvbG9yXCI6IGdyYWRlXzB9LFxyXG4gICAgICAgIHtcIm1pblwiOjcsIFwianVkZ2VcIjogXCLkvJjnp4BcIiwgXCJncmFkZVwiOiAxLFwiY29sb3JcIjogZ3JhZGVfMX0sXHJcbiAgICAgICAge1wibWluXCI6OSwgXCJqdWRnZVwiOiBcIue9leingVwiLCBcImdyYWRlXCI6IDIsXCJjb2xvclwiOiBncmFkZV8yfSxcclxuICAgICAgICB7XCJtaW5cIjoxMSwgXCJqdWRnZVwiOiBcIumAhuWkqVwiLCBcImdyYWRlXCI6IDMsXCJjb2xvclwiOiBncmFkZV8zfSxcclxuICAgIF0sXHJcbiAgICBcIlNQUlwiOiBbXHJcbiAgICAgICAge1wianVkZ2VcIjogXCLlnLDni7FcIiwgXCJncmFkZVwiOiAwLFwiY29sb3JcIjogZ3JhZGVfMH0sXHJcbiAgICAgICAge1wibWluXCI6MSwgXCJqdWRnZVwiOiBcIuaKmOejqFwiLCBcImdyYWRlXCI6IDAsXCJjb2xvclwiOiBncmFkZV8wfSxcclxuICAgICAgICB7XCJtaW5cIjoyLCBcImp1ZGdlXCI6IFwi5LiN5bm4XCIsIFwiZ3JhZGVcIjogMCxcImNvbG9yXCI6IGdyYWRlXzB9LFxyXG4gICAgICAgIHtcIm1pblwiOjQsIFwianVkZ2VcIjogXCLmma7pgJpcIiwgXCJncmFkZVwiOiAwLFwiY29sb3JcIjogZ3JhZGVfMH0sXHJcbiAgICAgICAge1wibWluXCI6NywgXCJqdWRnZVwiOiBcIuW5uOemj1wiLCBcImdyYWRlXCI6IDEsXCJjb2xvclwiOiBncmFkZV8xfSxcclxuICAgICAgICB7XCJtaW5cIjo5LCBcImp1ZGdlXCI6IFwi5p6B5LmQXCIsIFwiZ3JhZGVcIjogMixcImNvbG9yXCI6IGdyYWRlXzJ9LFxyXG4gICAgICAgIHtcIm1pblwiOjExLCBcImp1ZGdlXCI6IFwi5aSp5ZG9XCIsIFwiZ3JhZGVcIjogMyxcImNvbG9yXCI6IGdyYWRlXzN9LFxyXG4gICAgXSxcclxuICAgIFwiSU5UXCI6IFtcclxuICAgICAgICB7XCJqdWRnZVwiOiBcIuWcsOeLsVwiLCBcImdyYWRlXCI6IDAsXCJjb2xvclwiOiBncmFkZV8wfSxcclxuICAgICAgICB7XCJtaW5cIjoxLCBcImp1ZGdlXCI6IFwi5oqY56OoXCIsIFwiZ3JhZGVcIjogMCxcImNvbG9yXCI6IGdyYWRlXzB9LFxyXG4gICAgICAgIHtcIm1pblwiOjIsIFwianVkZ2VcIjogXCLkuI3kvbNcIiwgXCJncmFkZVwiOiAwLFwiY29sb3JcIjogZ3JhZGVfMH0sXHJcbiAgICAgICAge1wibWluXCI6NCwgXCJqdWRnZVwiOiBcIuaZrumAmlwiLCBcImdyYWRlXCI6IDAsXCJjb2xvclwiOiBncmFkZV8wfSxcclxuICAgICAgICB7XCJtaW5cIjo3LCBcImp1ZGdlXCI6IFwi5LyY56eAXCIsIFwiZ3JhZGVcIjogMSxcImNvbG9yXCI6IGdyYWRlXzF9LFxyXG4gICAgICAgIHtcIm1pblwiOjksIFwianVkZ2VcIjogXCLnvZXop4FcIiwgXCJncmFkZVwiOiAyLFwiY29sb3JcIjogZ3JhZGVfMn0sXHJcbiAgICAgICAge1wibWluXCI6MTEsIFwianVkZ2VcIjogXCLpgIblpKlcIiwgXCJncmFkZVwiOiAzLFwiY29sb3JcIjogZ3JhZGVfM30sXHJcbiAgICAgICAge1wibWluXCI6MjEsIFwianVkZ2VcIjogXCLor4bmtbdcIiwgXCJncmFkZVwiOiAzLFwiY29sb3JcIjogZ3JhZGVfM30sXHJcbiAgICAgICAge1wibWluXCI6MTMxLCBcImp1ZGdlXCI6IFwi5YWD56WeXCIsIFwiZ3JhZGVcIjogMyxcImNvbG9yXCI6IGdyYWRlXzN9LFxyXG4gICAgICAgIHtcIm1pblwiOjUwMSwgXCJqdWRnZVwiOiBcIuS7memtglwiLCBcImdyYWRlXCI6IDMsXCJjb2xvclwiOiBncmFkZV8zfSxcclxuICAgIF0sXHJcbiAgICBcIlNUUlwiOiBbXHJcbiAgICAgICAge1wianVkZ2VcIjogXCLlnLDni7FcIiwgXCJncmFkZVwiOiAwLFwiY29sb3JcIjogZ3JhZGVfMH0sXHJcbiAgICAgICAge1wibWluXCI6MSwgXCJqdWRnZVwiOiBcIuaKmOejqFwiLCBcImdyYWRlXCI6IDAsXCJjb2xvclwiOiBncmFkZV8wfSxcclxuICAgICAgICB7XCJtaW5cIjoyLCBcImp1ZGdlXCI6IFwi5LiN5L2zXCIsIFwiZ3JhZGVcIjogMCxcImNvbG9yXCI6IGdyYWRlXzB9LFxyXG4gICAgICAgIHtcIm1pblwiOjQsIFwianVkZ2VcIjogXCLmma7pgJpcIiwgXCJncmFkZVwiOiAwLFwiY29sb3JcIjogZ3JhZGVfMH0sXHJcbiAgICAgICAge1wibWluXCI6NywgXCJqdWRnZVwiOiBcIuS8mOengFwiLCBcImdyYWRlXCI6IDEsXCJjb2xvclwiOiBncmFkZV8xfSxcclxuICAgICAgICB7XCJtaW5cIjo5LCBcImp1ZGdlXCI6IFwi572V6KeBXCIsIFwiZ3JhZGVcIjogMixcImNvbG9yXCI6IGdyYWRlXzJ9LFxyXG4gICAgICAgIHtcIm1pblwiOjExLCBcImp1ZGdlXCI6IFwi6YCG5aSpXCIsIFwiZ3JhZGVcIjogMyxcImNvbG9yXCI6IGdyYWRlXzN9LFxyXG4gICAgICAgIHtcIm1pblwiOjIxLCBcImp1ZGdlXCI6IFwi5Yed5rCUXCIsIFwiZ3JhZGVcIjogMyxcImNvbG9yXCI6IGdyYWRlXzN9LFxyXG4gICAgICAgIHtcIm1pblwiOjEwMSwgXCJqdWRnZVwiOiBcIuetkeWfulwiLCBcImdyYWRlXCI6IDMsXCJjb2xvclwiOiBncmFkZV8zfSxcclxuICAgICAgICB7XCJtaW5cIjo0MDEsIFwianVkZ2VcIjogXCLph5HkuLlcIiwgXCJncmFkZVwiOiAzLFwiY29sb3JcIjogZ3JhZGVfM30sXHJcbiAgICAgICAge1wibWluXCI6MTAwMSwgXCJqdWRnZVwiOiBcIuWFg+WptFwiLCBcImdyYWRlXCI6IDMsXCJjb2xvclwiOiBncmFkZV8zfSxcclxuICAgICAgICB7XCJtaW5cIjoyMDAxLCBcImp1ZGdlXCI6IFwi5LuZ5L2TXCIsIFwiZ3JhZGVcIjogMyxcImNvbG9yXCI6IGdyYWRlXzN9LFxyXG4gICAgXSxcclxuICAgIFwiQUdFXCI6IFtcclxuICAgICAgICB7XCJqdWRnZVwiOiBcIuiDjuatu+iFueS4rVwiLCBcImdyYWRlXCI6IDAsXCJjb2xvclwiOiBncmFkZV8wfSxcclxuICAgICAgICB7XCJtaW5cIjoxLCBcImp1ZGdlXCI6IFwi5pep5aStXCIsIFwiZ3JhZGVcIjogMCxcImNvbG9yXCI6IGdyYWRlXzB9LFxyXG4gICAgICAgIHtcIm1pblwiOjEwLCBcImp1ZGdlXCI6IFwi5bCR5bm0XCIsIFwiZ3JhZGVcIjogMCxcImNvbG9yXCI6IGdyYWRlXzB9LFxyXG4gICAgICAgIHtcIm1pblwiOjE4LCBcImp1ZGdlXCI6IFwi55ub5bm0XCIsIFwiZ3JhZGVcIjogMCxcImNvbG9yXCI6IGdyYWRlXzB9LFxyXG4gICAgICAgIHtcIm1pblwiOjQwLCBcImp1ZGdlXCI6IFwi5Lit5bm0XCIsIFwiZ3JhZGVcIjogMCxcImNvbG9yXCI6IGdyYWRlXzB9LFxyXG4gICAgICAgIHtcIm1pblwiOjYwLCBcImp1ZGdlXCI6IFwi6Iqx55SyXCIsIFwiZ3JhZGVcIjogMSxcImNvbG9yXCI6IGdyYWRlXzF9LFxyXG4gICAgICAgIHtcIm1pblwiOjcwLCBcImp1ZGdlXCI6IFwi5Y+k56iAXCIsIFwiZ3JhZGVcIjogMSxcImNvbG9yXCI6IGdyYWRlXzF9LFxyXG4gICAgICAgIHtcIm1pblwiOjgwLCBcImp1ZGdlXCI6IFwi5p2W5pydXCIsIFwiZ3JhZGVcIjogMixcImNvbG9yXCI6IGdyYWRlXzJ9LFxyXG4gICAgICAgIHtcIm1pblwiOjkwLCBcImp1ZGdlXCI6IFwi5Y2X5bGxXCIsIFwiZ3JhZGVcIjogMixcImNvbG9yXCI6IGdyYWRlXzJ9LFxyXG4gICAgICAgIHtcIm1pblwiOjk1LCBcImp1ZGdlXCI6IFwi5LiN6ICBXCIsIFwiZ3JhZGVcIjogMyxcImNvbG9yXCI6IGdyYWRlXzN9LFxyXG4gICAgICAgIHtcIm1pblwiOjEwMCwgXCJqdWRnZVwiOiBcIuS/ruS7mVwiLCBcImdyYWRlXCI6IDMsXCJjb2xvclwiOiBncmFkZV8zfSxcclxuICAgICAgICB7XCJtaW5cIjo1MDAsIFwianVkZ2VcIjogXCLku5nlr79cIiwgXCJncmFkZVwiOiAzLFwiY29sb3JcIjogZ3JhZGVfM30sXHJcbiAgICBdLFxyXG4gICAgXCJTVU1cIjogW1xyXG4gICAgICAgIHtcImp1ZGdlXCI6IFwi5Zyw54uxXCIsIFwiZ3JhZGVcIjogMCxcImNvbG9yXCI6IGdyYWRlXzB9LFxyXG4gICAgICAgIHtcIm1pblwiOjQwLCBcImp1ZGdlXCI6IFwi5oqY56OoXCIsIFwiZ3JhZGVcIjogMCxcImNvbG9yXCI6IGdyYWRlXzB9LFxyXG4gICAgICAgIHtcIm1pblwiOjYwLCBcImp1ZGdlXCI6IFwi5LiN5L2zXCIsIFwiZ3JhZGVcIjogMCxcImNvbG9yXCI6IGdyYWRlXzB9LFxyXG4gICAgICAgIHtcIm1pblwiOjkwLCBcImp1ZGdlXCI6IFwi5pmu6YCaXCIsIFwiZ3JhZGVcIjogMCxcImNvbG9yXCI6IGdyYWRlXzB9LFxyXG4gICAgICAgIHtcIm1pblwiOjEzMCwgXCJqdWRnZVwiOiBcIuS8mOengFwiLCBcImdyYWRlXCI6IDEsXCJjb2xvclwiOiBncmFkZV8xfSxcclxuICAgICAgICB7XCJtaW5cIjoxODAsIFwianVkZ2VcIjogXCLnvZXop4FcIiwgXCJncmFkZVwiOiAyLFwiY29sb3JcIjogZ3JhZGVfMn0sXHJcbiAgICAgICAge1wibWluXCI6MjQwLCBcImp1ZGdlXCI6IFwi6YCG5aSpXCIsIFwiZ3JhZGVcIjogMyxcImNvbG9yXCI6IGdyYWRlXzN9LFxyXG4gICAgICAgIHtcIm1pblwiOjMxMCwgXCJqdWRnZVwiOiBcIuS8oOivtFwiLCBcImdyYWRlXCI6IDMsXCJjb2xvclwiOiBncmFkZV8zfSxcclxuICAgIF0sXHJcbiAgICBcIkNLXCI6IFtcclxuICAgICAgICB7XCJqdWRnZVwiOiBcIuS4jeWPmFwiLCBcImdyYWRlXCI6IDAsXCJjb2xvclwiOiBncmFkZV8wfSxcclxuICAgICAgICB7XCJtaW5cIjoxMCwgXCJqdWRnZVwiOiBcIuS6jOWAjVwiLCBcImdyYWRlXCI6IDAsXCJjb2xvclwiOiBncmFkZV8wfSxcclxuICAgICAgICB7XCJtaW5cIjo1MCwgXCJqdWRnZVwiOiBcIuS4ieWAjVwiLCBcImdyYWRlXCI6IDAsXCJjb2xvclwiOiBncmFkZV8wfSxcclxuICAgICAgICB7XCJtaW5cIjoxMDAsIFwianVkZ2VcIjogXCLlm5vlgI1cIiwgXCJncmFkZVwiOiAwLFwiY29sb3JcIjogZ3JhZGVfMH0sXHJcbiAgICAgICAge1wibWluXCI6MjAwLCBcImp1ZGdlXCI6IFwi5LqU5YCNXCIsIFwiZ3JhZGVcIjogMSxcImNvbG9yXCI6IGdyYWRlXzF9LFxyXG4gICAgICAgIHtcIm1pblwiOjUwMCwgXCJqdWRnZVwiOiBcIuWFreWAjVwiLCBcImdyYWRlXCI6IDIsXCJjb2xvclwiOiBncmFkZV8yfSxcclxuICAgIF0sXHJcbiAgICBcIkNKXCI6IFtcclxuICAgICAgICB7XCJqdWRnZVwiOiBcIuS4jeWPmFwiLCBcImdyYWRlXCI6IDAsXCJjb2xvclwiOiBncmFkZV8wfSxcclxuICAgICAgICB7XCJtaW5cIjoyMCwgXCJqdWRnZVwiOiBcIuS6jOWAjVwiLCBcImdyYWRlXCI6IDAsXCJjb2xvclwiOiBncmFkZV8wfSxcclxuICAgICAgICB7XCJtaW5cIjo1MCwgXCJqdWRnZVwiOiBcIuS4ieWAjVwiLCBcImdyYWRlXCI6IDAsXCJjb2xvclwiOiBncmFkZV8wfSxcclxuICAgICAgICB7XCJtaW5cIjoxMDAsIFwianVkZ2VcIjogXCLlm5vlgI1cIiwgXCJncmFkZVwiOiAwLFwiY29sb3JcIjogZ3JhZGVfMH0sXHJcbiAgICAgICAge1wibWluXCI6MTYwLCBcImp1ZGdlXCI6IFwi5LqU5YCNXCIsIFwiZ3JhZGVcIjogMSxcImNvbG9yXCI6IGdyYWRlXzF9LFxyXG4gICAgICAgIHtcIm1pblwiOjUwMCwgXCJqdWRnZVwiOiBcIuWFreWAjVwiLCBcImdyYWRlXCI6IDIsXCJjb2xvclwiOiBncmFkZV8yfSxcclxuICAgIF1cclxufVxyXG5cclxuZnVuY3Rpb24gc3VtbWFyeSh0eXBlLCB2YWx1ZSkge1xyXG4gICAgbGV0IGxlbmd0aCA9IGRhdGFbdHlwZV0ubGVuZ3RoO1xyXG4gICAgd2hpbGUobGVuZ3RoLS0pIHtcclxuICAgICAgICBjb25zdCB7bWluLCBqdWRnZSwgZ3JhZGUsY29sb3J9ID0gZGF0YVt0eXBlXVtsZW5ndGhdO1xyXG4gICAgICAgIGlmKG1pbj09dm9pZCAwIHx8IHZhbHVlID49IG1pbikgcmV0dXJuIHtqdWRnZSwgZ3JhZGUsY29sb3J9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBzdW1tYXJ5ICxncmFkZXMsZ3JhZGVzSCxPdGhlckdyYWRlcyxBRHRpbWV9OyJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Other/GlobalDefine.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd1f23jcSZVJ7rQ2w6km/THa', 'GlobalDefine');
// Scripts/Other/GlobalDefine.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveData = void 0;
/**
 * 游戏中用来保存的数据
 */
var SaveData = /** @class */ (function () {
    function SaveData() {
    }
    SaveData.LunHuiTalent = 0; //轮回的talent
    SaveData.isAuto = false; //是否自动播放
    SaveData.isAuto2 = false; //是否自动播放2
    SaveData.isAutoAD = false; //是否自动播放的广告看了没
    SaveData.isAutoAD2 = false; //是否自动播放的广告看了没2
    SaveData.isBGMOpen = true; //BGM是否播放
    SaveData.isPPDY = false; //是否关注抖音
    SaveData.isPPDY2 = true; //是否关注抖音
    SaveData.Myzz = []; //自传解锁程度
    SaveData.LastTime = 0; //时间戳
    return SaveData;
}());
exports.SaveData = SaveData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcT3RoZXJcXEdsb2JhbERlZmluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQzs7R0FFRztBQUNIO0lBQUE7SUFpQkEsQ0FBQztJQWZnQixxQkFBWSxHQUFRLENBQUMsQ0FBQyxDQUFBLFdBQVc7SUFDakMsZUFBTSxHQUFTLEtBQUssQ0FBQSxDQUFBLFFBQVE7SUFDNUIsZ0JBQU8sR0FBUyxLQUFLLENBQUEsQ0FBQSxTQUFTO0lBQzlCLGlCQUFRLEdBQVMsS0FBSyxDQUFBLENBQUEsY0FBYztJQUNwQyxrQkFBUyxHQUFTLEtBQUssQ0FBQSxDQUFBLGVBQWU7SUFDdEMsa0JBQVMsR0FBUyxJQUFJLENBQUEsQ0FBQSxTQUFTO0lBRS9CLGVBQU0sR0FBUyxLQUFLLENBQUEsQ0FBQSxRQUFRO0lBQzVCLGdCQUFPLEdBQVMsSUFBSSxDQUFBLENBQUEsUUFBUTtJQUU1QixhQUFJLEdBQVUsRUFBRSxDQUFBLENBQUEsUUFBUTtJQUV4QixpQkFBUSxHQUFRLENBQUMsQ0FBQyxDQUFBLEtBQUs7SUFHeEMsZUFBQztDQWpCRCxBQWlCQyxJQUFBO0FBakJZLDRCQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAvKipcclxuICAqIOa4uOaIj+S4reeUqOadpeS/neWtmOeahOaVsOaNrlxyXG4gICovXHJcbiBleHBvcnQgY2xhc3MgU2F2ZURhdGFcclxuIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgTHVuSHVpVGFsZW50Om51bWJlcj0wOy8v6L2u5Zue55qEdGFsZW50XHJcbiAgICBwdWJsaWMgc3RhdGljIGlzQXV0bzpib29sZWFuPWZhbHNlLy/mmK/lkKboh6rliqjmkq3mlL5cclxuICAgIHB1YmxpYyBzdGF0aWMgaXNBdXRvMjpib29sZWFuPWZhbHNlLy/mmK/lkKboh6rliqjmkq3mlL4yXHJcbiAgICBwdWJsaWMgc3RhdGljIGlzQXV0b0FEOmJvb2xlYW49ZmFsc2UvL+aYr+WQpuiHquWKqOaSreaUvueahOW5v+WRiueci+S6huayoVxyXG4gICAgcHVibGljIHN0YXRpYyBpc0F1dG9BRDI6Ym9vbGVhbj1mYWxzZS8v5piv5ZCm6Ieq5Yqo5pKt5pS+55qE5bm/5ZGK55yL5LqG5rKhMlxyXG4gICAgcHVibGljIHN0YXRpYyBpc0JHTU9wZW46Ym9vbGVhbj10cnVlLy9CR03mmK/lkKbmkq3mlL5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGlzUFBEWTpib29sZWFuPWZhbHNlLy/mmK/lkKblhbPms6jmipbpn7NcclxuICAgIHB1YmxpYyBzdGF0aWMgaXNQUERZMjpib29sZWFuPXRydWUvL+aYr+WQpuWFs+azqOaKlumfs1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgTXl6ejpudW1iZXJbXT1bXS8v6Ieq5Lyg6Kej6ZSB56iL5bqmXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBMYXN0VGltZTpudW1iZXI9MDsvL+aXtumXtOaIs1xyXG5cclxuXHJcbiB9XHJcbiAiXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Other/SaveUtils.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fe555zvgzdMx5Jr95ER8wfi', 'SaveUtils');
// Scripts/Other/SaveUtils.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("../AD/Global");
var condition_1 = require("../Main/condition");
var GlobalDefine_1 = require("./GlobalDefine");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SaveUtils = /** @class */ (function () {
    function SaveUtils() {
    }
    SaveUtils_1 = SaveUtils;
    //读取本地数据
    SaveUtils.prototype.getLocalData = function () {
        //SaveUtils.clear()
        var userData = cc.sys.localStorage.getItem('GreenHat_userData');
        //用户数据不为空
        if (userData != null && userData != "" && userData != "undefined") {
            Global_1.default.isNewUser = false;
            userData = JSON.parse(userData);
            //SaveData.ReOpenNum=userData.ReOpenNum!=null?userData.ReOpenNum:0
            GlobalDefine_1.SaveData.LunHuiTalent = userData.LunHuiTalent != null ? userData.LunHuiTalent : 0;
            GlobalDefine_1.SaveData.isAuto = userData.isAuto != null ? userData.isAuto : false;
            GlobalDefine_1.SaveData.isAuto2 = userData.isAuto2 != null ? userData.isAuto2 : false;
            GlobalDefine_1.SaveData.isAutoAD2 = userData.isAutoAD2 != null ? userData.isAutoAD2 : false;
            GlobalDefine_1.SaveData.isAutoAD = userData.isAutoAD != null ? userData.isAutoAD : false;
            GlobalDefine_1.SaveData.isBGMOpen = userData.isBGMOpen != null ? userData.isBGMOpen : true;
            GlobalDefine_1.SaveData.isPPDY = userData.isPPDY != null ? userData.isPPDY : false;
            GlobalDefine_1.SaveData.isPPDY2 = userData.isPPDY2 != null ? userData.isPPDY2 : true;
            GlobalDefine_1.SaveData.LastTime = userData.LastTime != null ? userData.LastTime : 0;
            condition_1.DEFAULT_CJ.TMS = userData.TMS != null ? userData.TMS : 0;
            condition_1.DEFAULT_CJ.HAGE = userData.HAGE != null ? userData.HAGE : 0;
            condition_1.DEFAULT_CJ.SUM = userData.SUM != null ? userData.SUM : 0;
            condition_1.DEFAULT_CJ.HCHR = userData.HCHR != null ? userData.HCHR : 0;
            condition_1.DEFAULT_CJ.HINT = userData.HINT != null ? userData.HINT : 0;
            condition_1.DEFAULT_CJ.HSTR = userData.HSTR != null ? userData.HSTR : 0;
            condition_1.DEFAULT_CJ.HMNY = userData.HMNY != null ? userData.HMNY : 0;
            condition_1.DEFAULT_CJ.HSPR = userData.HSPR != null ? userData.HSPR : 0;
            condition_1.DEFAULT_CJ.LCHR = userData.LCHR != null ? userData.LCHR : 0;
            condition_1.DEFAULT_CJ.LINT = userData.LINT != null ? userData.LINT : 0;
            condition_1.DEFAULT_CJ.LSTR = userData.LSTR != null ? userData.LSTR : 0;
            condition_1.DEFAULT_CJ.LMNY = userData.LMNY != null ? userData.LMNY : 0;
            condition_1.DEFAULT_CJ.LSPR = userData.LSPR != null ? userData.LSPR : 0;
            condition_1.DEFAULT_CJ.AEVT = userData.AEVT != null ? userData.AEVT : [];
            condition_1.DEFAULT_CJ.ATLT = userData.ATLT != null ? userData.ATLT : [];
            condition_1.DEFAULT_CJ.ACJ = userData.ACJ != null ? userData.ACJ : [];
            GlobalDefine_1.SaveData.Myzz = userData.Myzz != null ? userData.Myzz : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        else {
            Global_1.default.isNewUser = true;
            this.createNewUser();
        }
    };
    //创建新用户
    SaveUtils.prototype.createNewUser = function () {
        console.log("创建新用户");
        //SaveData.ReOpenNum=0
        GlobalDefine_1.SaveData.LunHuiTalent = 0;
        GlobalDefine_1.SaveData.isAuto = false;
        GlobalDefine_1.SaveData.isAuto2 = false;
        GlobalDefine_1.SaveData.isAutoAD = false;
        GlobalDefine_1.SaveData.isAutoAD2 = false;
        GlobalDefine_1.SaveData.isBGMOpen = true;
        GlobalDefine_1.SaveData.isPPDY = false;
        GlobalDefine_1.SaveData.isPPDY2 = true;
        GlobalDefine_1.SaveData.LastTime = 0;
        condition_1.DEFAULT_CJ.TMS = 0;
        condition_1.DEFAULT_CJ.HAGE = 0;
        condition_1.DEFAULT_CJ.SUM = 0;
        condition_1.DEFAULT_CJ.HCHR = 0;
        condition_1.DEFAULT_CJ.HINT = 0;
        condition_1.DEFAULT_CJ.HSTR = 0;
        condition_1.DEFAULT_CJ.HMNY = 0;
        condition_1.DEFAULT_CJ.HSPR = 0;
        condition_1.DEFAULT_CJ.LCHR = 0;
        condition_1.DEFAULT_CJ.LINT = 0;
        condition_1.DEFAULT_CJ.LSTR = 0;
        condition_1.DEFAULT_CJ.LMNY = 0;
        condition_1.DEFAULT_CJ.LSPR = 0;
        condition_1.DEFAULT_CJ.AEVT = [];
        condition_1.DEFAULT_CJ.ATLT = [];
        condition_1.DEFAULT_CJ.ACJ = [];
        GlobalDefine_1.SaveData.Myzz = [];
        this.SaveData();
    };
    //保存游戏数据
    SaveUtils.prototype.SaveData = function () {
        var userData = {};
        //userData.ReOpenNum=SaveData.ReOpenNum
        userData.LunHuiTalent = GlobalDefine_1.SaveData.LunHuiTalent;
        userData.isAuto = GlobalDefine_1.SaveData.isAuto;
        userData.isAuto2 = GlobalDefine_1.SaveData.isAuto2;
        userData.isAutoAD = GlobalDefine_1.SaveData.isAutoAD;
        userData.isAutoAD2 = GlobalDefine_1.SaveData.isAutoAD2;
        userData.isBGMOpen = GlobalDefine_1.SaveData.isBGMOpen;
        userData.isPPDY = GlobalDefine_1.SaveData.isPPDY;
        userData.isPPDY2 = GlobalDefine_1.SaveData.isPPDY2;
        userData.LastTime = GlobalDefine_1.SaveData.LastTime;
        userData.TMS = condition_1.DEFAULT_CJ.TMS;
        userData.HAGE = condition_1.DEFAULT_CJ.HAGE;
        userData.SUM = condition_1.DEFAULT_CJ.SUM;
        userData.HCHR = condition_1.DEFAULT_CJ.HCHR;
        userData.HINT = condition_1.DEFAULT_CJ.HINT;
        userData.HSTR = condition_1.DEFAULT_CJ.HSTR;
        userData.HMNY = condition_1.DEFAULT_CJ.HMNY;
        userData.HSPR = condition_1.DEFAULT_CJ.HSPR;
        userData.LCHR = condition_1.DEFAULT_CJ.LCHR;
        userData.LINT = condition_1.DEFAULT_CJ.LINT;
        userData.LSTR = condition_1.DEFAULT_CJ.LSTR;
        userData.LMNY = condition_1.DEFAULT_CJ.LMNY;
        userData.LSPR = condition_1.DEFAULT_CJ.LSPR;
        userData.AEVT = condition_1.DEFAULT_CJ.AEVT;
        userData.ATLT = condition_1.DEFAULT_CJ.ATLT;
        userData.ACJ = condition_1.DEFAULT_CJ.ACJ;
        userData.Myzz = GlobalDefine_1.SaveData.Myzz;
        cc.sys.localStorage.setItem('GreenHat_userData', JSON.stringify(userData));
    };
    /**@name: 清除某一条数据 */
    SaveUtils.remove = function (key) {
        cc.sys.localStorage.removeItem(key);
    };
    /**@name: 清除所有数据 */
    SaveUtils.clear = function () {
        cc.sys.localStorage.clear();
    };
    var SaveUtils_1;
    /**
     * @zd 用户数据存储
     */
    //单例
    SaveUtils.inst = new SaveUtils_1();
    SaveUtils = SaveUtils_1 = __decorate([
        ccclass
    ], SaveUtils);
    return SaveUtils;
}());
exports.default = SaveUtils;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcT3RoZXJcXFNhdmVVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUFrQztBQUNsQywrQ0FBK0M7QUFDL0MsK0NBQTBDO0FBQ3BDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQUE7SUF5SUEsQ0FBQztrQkF6SW9CLFNBQVM7SUFRMUIsUUFBUTtJQUNSLGdDQUFZLEdBQVo7UUFDSSxtQkFBbUI7UUFDbkIsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDaEUsU0FBUztRQUNULElBQUksUUFBUSxJQUFJLElBQUksSUFBSSxRQUFRLElBQUksRUFBRSxJQUFJLFFBQVEsSUFBSSxXQUFXLEVBQUU7WUFDL0QsZ0JBQU0sQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRWhDLGtFQUFrRTtZQUNsRSx1QkFBUSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ2pGLHVCQUFRLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7WUFDbkUsdUJBQVEsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQTtZQUN0RSx1QkFBUSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO1lBQzVFLHVCQUFRLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7WUFDekUsdUJBQVEsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQTtZQUMzRSx1QkFBUSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO1lBQ25FLHVCQUFRLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7WUFDckUsdUJBQVEsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUdyRSxzQkFBVSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3hELHNCQUFVLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDM0Qsc0JBQVUsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUN4RCxzQkFBVSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzNELHNCQUFVLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDM0Qsc0JBQVUsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUMzRCxzQkFBVSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzNELHNCQUFVLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDM0Qsc0JBQVUsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUMzRCxzQkFBVSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzNELHNCQUFVLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDM0Qsc0JB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eUk3QjtJQUFELGdCQUFDO0NBeklELEFBeUlDLElBQUE7a0JBeklvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdsb2JhbCBmcm9tIFwiLi4vQUQvR2xvYmFsXCI7XHJcbmltcG9ydCB7IERFRkFVTFRfQ0ogfSBmcm9tIFwiLi4vTWFpbi9jb25kaXRpb25cIjtcclxuaW1wb3J0IHsgU2F2ZURhdGEgfSBmcm9tIFwiLi9HbG9iYWxEZWZpbmVcIjtcclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNhdmVVdGlscyB7XHJcbiAgICAvKipcclxuICAgICAqIEB6ZCDnlKjmiLfmlbDmja7lrZjlgqhcclxuICAgICAqL1xyXG5cclxuICAgIC8v5Y2V5L6LXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgaW5zdDogU2F2ZVV0aWxzID0gbmV3IFNhdmVVdGlscygpO1xyXG5cclxuICAgIC8v6K+75Y+W5pys5Zyw5pWw5o2uXHJcbiAgICBnZXRMb2NhbERhdGEoKSB7XHJcbiAgICAgICAgLy9TYXZlVXRpbHMuY2xlYXIoKVxyXG4gICAgICAgIGxldCB1c2VyRGF0YSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnR3JlZW5IYXRfdXNlckRhdGEnKTtcclxuICAgICAgICAvL+eUqOaIt+aVsOaNruS4jeS4uuepulxyXG4gICAgICAgIGlmICh1c2VyRGF0YSAhPSBudWxsICYmIHVzZXJEYXRhICE9IFwiXCIgJiYgdXNlckRhdGEgIT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBHbG9iYWwuaXNOZXdVc2VyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHVzZXJEYXRhID0gSlNPTi5wYXJzZSh1c2VyRGF0YSk7XHJcblxyXG4gICAgICAgICAgICAvL1NhdmVEYXRhLlJlT3Blbk51bT11c2VyRGF0YS5SZU9wZW5OdW0hPW51bGw/dXNlckRhdGEuUmVPcGVuTnVtOjBcclxuICAgICAgICAgICAgU2F2ZURhdGEuTHVuSHVpVGFsZW50ID0gdXNlckRhdGEuTHVuSHVpVGFsZW50ICE9IG51bGwgPyB1c2VyRGF0YS5MdW5IdWlUYWxlbnQgOiAwXHJcbiAgICAgICAgICAgIFNhdmVEYXRhLmlzQXV0byA9IHVzZXJEYXRhLmlzQXV0byAhPSBudWxsID8gdXNlckRhdGEuaXNBdXRvIDogZmFsc2VcclxuICAgICAgICAgICAgU2F2ZURhdGEuaXNBdXRvMiA9IHVzZXJEYXRhLmlzQXV0bzIgIT0gbnVsbCA/IHVzZXJEYXRhLmlzQXV0bzIgOiBmYWxzZVxyXG4gICAgICAgICAgICBTYXZlRGF0YS5pc0F1dG9BRDIgPSB1c2VyRGF0YS5pc0F1dG9BRDIgIT0gbnVsbCA/IHVzZXJEYXRhLmlzQXV0b0FEMiA6IGZhbHNlXHJcbiAgICAgICAgICAgIFNhdmVEYXRhLmlzQXV0b0FEID0gdXNlckRhdGEuaXNBdXRvQUQgIT0gbnVsbCA/IHVzZXJEYXRhLmlzQXV0b0FEIDogZmFsc2VcclxuICAgICAgICAgICAgU2F2ZURhdGEuaXNCR01PcGVuID0gdXNlckRhdGEuaXNCR01PcGVuICE9IG51bGwgPyB1c2VyRGF0YS5pc0JHTU9wZW4gOiB0cnVlXHJcbiAgICAgICAgICAgIFNhdmVEYXRhLmlzUFBEWSA9IHVzZXJEYXRhLmlzUFBEWSAhPSBudWxsID8gdXNlckRhdGEuaXNQUERZIDogZmFsc2VcclxuICAgICAgICAgICAgU2F2ZURhdGEuaXNQUERZMiA9IHVzZXJEYXRhLmlzUFBEWTIgIT0gbnVsbCA/IHVzZXJEYXRhLmlzUFBEWTIgOiB0cnVlXHJcbiAgICAgICAgICAgIFNhdmVEYXRhLkxhc3RUaW1lID0gdXNlckRhdGEuTGFzdFRpbWUgIT0gbnVsbCA/IHVzZXJEYXRhLkxhc3RUaW1lIDogMFxyXG5cclxuXHJcbiAgICAgICAgICAgIERFRkFVTFRfQ0ouVE1TID0gdXNlckRhdGEuVE1TICE9IG51bGwgPyB1c2VyRGF0YS5UTVMgOiAwXHJcbiAgICAgICAgICAgIERFRkFVTFRfQ0ouSEFHRSA9IHVzZXJEYXRhLkhBR0UgIT0gbnVsbCA/IHVzZXJEYXRhLkhBR0UgOiAwXHJcbiAgICAgICAgICAgIERFRkFVTFRfQ0ouU1VNID0gdXNlckRhdGEuU1VNICE9IG51bGwgPyB1c2VyRGF0YS5TVU0gOiAwXHJcbiAgICAgICAgICAgIERFRkFVTFRfQ0ouSENIUiA9IHVzZXJEYXRhLkhDSFIgIT0gbnVsbCA/IHVzZXJEYXRhLkhDSFIgOiAwXHJcbiAgICAgICAgICAgIERFRkFVTFRfQ0ouSElOVCA9IHVzZXJEYXRhLkhJTlQgIT0gbnVsbCA/IHVzZXJEYXRhLkhJTlQgOiAwXHJcbiAgICAgICAgICAgIERFRkFVTFRfQ0ouSFNUUiA9IHVzZXJEYXRhLkhTVFIgIT0gbnVsbCA/IHVzZXJEYXRhLkhTVFIgOiAwXHJcbiAgICAgICAgICAgIERFRkFVTFRfQ0ouSE1OWSA9IHVzZXJEYXRhLkhNTlkgIT0gbnVsbCA/IHVzZXJEYXRhLkhNTlkgOiAwXHJcbiAgICAgICAgICAgIERFRkFVTFRfQ0ouSFNQUiA9IHVzZXJEYXRhLkhTUFIgIT0gbnVsbCA/IHVzZXJEYXRhLkhTUFIgOiAwXHJcbiAgICAgICAgICAgIERFRkFVTFRfQ0ouTENIUiA9IHVzZXJEYXRhLkxDSFIgIT0gbnVsbCA/IHVzZXJEYXRhLkxDSFIgOiAwXHJcbiAgICAgICAgICAgIERFRkFVTFRfQ0ouTElOVCA9IHVzZXJEYXRhLkxJTlQgIT0gbnVsbCA/IHVzZXJEYXRhLkxJTlQgOiAwXHJcbiAgICAgICAgICAgIERFRkFVTFRfQ0ouTFNUUiA9IHVzZXJEYXRhLkxTVFIgIT0gbnVsbCA/IHVzZXJEYXRhLkxTVFIgOiAwXHJcbiAgICAgICAgICAgIERFRkFVTFRfQ0ouTE1OWSA9IHVzZXJEYXRhLkxNTlkgIT0gbnVsbCA/IHVzZXJEYXRhLkxNTlkgOiAwXHJcbiAgICAgICAgICAgIERFRkFVTFRfQ0ouTFNQUiA9IHVzZXJEYXRhLkxTUFIgIT0gbnVsbCA/IHVzZXJEYXRhLkxTUFIgOiAwXHJcbiAgICAgICAgICAgIERFRkFVTFRfQ0ouQUVWVCA9IHVzZXJEYXRhLkFFVlQgIT0gbnVsbCA/IHVzZXJEYXRhLkFFVlQgOiBbXVxyXG4gICAgICAgICAgICBERUZBVUxUX0NKLkFUTFQgPSB1c2VyRGF0YS5BVExUICE9IG51bGwgPyB1c2VyRGF0YS5BVExUIDogW11cclxuICAgICAgICAgICAgREVGQVVMVF9DSi5BQ0ogPSB1c2VyRGF0YS5BQ0ogIT0gbnVsbCA/IHVzZXJEYXRhLkFDSiA6IFtdXHJcblxyXG4gICAgICAgICAgICBTYXZlRGF0YS5NeXp6ID0gdXNlckRhdGEuTXl6eiAhPSBudWxsID8gdXNlckRhdGEuTXl6eiA6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5pc05ld1VzZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU5ld1VzZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJvlu7rmlrDnlKjmiLdcclxuICAgIGNyZWF0ZU5ld1VzZXIoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLliJvlu7rmlrDnlKjmiLdcIilcclxuICAgICAgICAvL1NhdmVEYXRhLlJlT3Blbk51bT0wXHJcbiAgICAgICAgU2F2ZURhdGEuTHVuSHVpVGFsZW50ID0gMFxyXG4gICAgICAgIFNhdmVEYXRhLmlzQXV0byA9IGZhbHNlXHJcbiAgICAgICAgU2F2ZURhdGEuaXNBdXRvMiA9IGZhbHNlXHJcbiAgICAgICAgU2F2ZURhdGEuaXNBdXRvQUQgPSBmYWxzZVxyXG4gICAgICAgIFNhdmVEYXRhLmlzQXV0b0FEMiA9IGZhbHNlXHJcbiAgICAgICAgU2F2ZURhdGEuaXNCR01PcGVuID0gdHJ1ZVxyXG4gICAgICAgIFNhdmVEYXRhLmlzUFBEWSA9IGZhbHNlXHJcbiAgICAgICAgU2F2ZURhdGEuaXNQUERZMiA9IHRydWVcclxuICAgICAgICBTYXZlRGF0YS5MYXN0VGltZSA9IDBcclxuXHJcblxyXG4gICAgICAgIERFRkFVTFRfQ0ouVE1TID0gMFxyXG4gICAgICAgIERFRkFVTFRfQ0ouSEFHRSA9IDBcclxuICAgICAgICBERUZBVUxUX0NKLlNVTSA9IDBcclxuICAgICAgICBERUZBVUxUX0NKLkhDSFIgPSAwXHJcbiAgICAgICAgREVGQVVMVF9DSi5ISU5UID0gMFxyXG4gICAgICAgIERFRkFVTFRfQ0ouSFNUUiA9IDBcclxuICAgICAgICBERUZBVUxUX0NKLkhNTlkgPSAwXHJcbiAgICAgICAgREVGQVVMVF9DSi5IU1BSID0gMFxyXG4gICAgICAgIERFRkFVTFRfQ0ouTENIUiA9IDBcclxuICAgICAgICBERUZBVUxUX0NKLkxJTlQgPSAwXHJcbiAgICAgICAgREVGQVVMVF9DSi5MU1RSID0gMFxyXG4gICAgICAgIERFRkFVTFRfQ0ouTE1OWSA9IDBcclxuICAgICAgICBERUZBVUxUX0NKLkxTUFIgPSAwXHJcbiAgICAgICAgREVGQVVMVF9DSi5BRVZUID0gW11cclxuICAgICAgICBERUZBVUxUX0NKLkFUTFQgPSBbXVxyXG4gICAgICAgIERFRkFVTFRfQ0ouQUNKID0gW11cclxuXHJcbiAgICAgICAgU2F2ZURhdGEuTXl6eiA9IFtdXHJcblxyXG5cclxuICAgICAgICB0aGlzLlNhdmVEYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/kv53lrZjmuLjmiI/mlbDmja5cclxuICAgIFNhdmVEYXRhKCkge1xyXG4gICAgICAgIGxldCB1c2VyRGF0YTogeyBbazogc3RyaW5nXTogYW55IH0gPSB7fTtcclxuICAgICAgICAvL3VzZXJEYXRhLlJlT3Blbk51bT1TYXZlRGF0YS5SZU9wZW5OdW1cclxuICAgICAgICB1c2VyRGF0YS5MdW5IdWlUYWxlbnQgPSBTYXZlRGF0YS5MdW5IdWlUYWxlbnRcclxuICAgICAgICB1c2VyRGF0YS5pc0F1dG8gPSBTYXZlRGF0YS5pc0F1dG9cclxuICAgICAgICB1c2VyRGF0YS5pc0F1dG8yID0gU2F2ZURhdGEuaXNBdXRvMlxyXG4gICAgICAgIHVzZXJEYXRhLmlzQXV0b0FEID0gU2F2ZURhdGEuaXNBdXRvQURcclxuICAgICAgICB1c2VyRGF0YS5pc0F1dG9BRDIgPSBTYXZlRGF0YS5pc0F1dG9BRDJcclxuICAgICAgICB1c2VyRGF0YS5pc0JHTU9wZW4gPSBTYXZlRGF0YS5pc0JHTU9wZW5cclxuICAgICAgICB1c2VyRGF0YS5pc1BQRFkgPSBTYXZlRGF0YS5pc1BQRFlcclxuICAgICAgICB1c2VyRGF0YS5pc1BQRFkyID0gU2F2ZURhdGEuaXNQUERZMlxyXG4gICAgICAgIHVzZXJEYXRhLkxhc3RUaW1lID0gU2F2ZURhdGEuTGFzdFRpbWVcclxuXHJcbiAgICAgICAgdXNlckRhdGEuVE1TID0gREVGQVVMVF9DSi5UTVNcclxuICAgICAgICB1c2VyRGF0YS5IQUdFID0gREVGQVVMVF9DSi5IQUdFXHJcbiAgICAgICAgdXNlckRhdGEuU1VNID0gREVGQVVMVF9DSi5TVU1cclxuICAgICAgICB1c2VyRGF0YS5IQ0hSID0gREVGQVVMVF9DSi5IQ0hSXHJcbiAgICAgICAgdXNlckRhdGEuSElOVCA9IERFRkFVTFRfQ0ouSElOVFxyXG4gICAgICAgIHVzZXJEYXRhLkhTVFIgPSBERUZBVUxUX0NKLkhTVFJcclxuICAgICAgICB1c2VyRGF0YS5ITU5ZID0gREVGQVVMVF9DSi5ITU5ZXHJcbiAgICAgICAgdXNlckRhdGEuSFNQUiA9IERFRkFVTFRfQ0ouSFNQUlxyXG4gICAgICAgIHVzZXJEYXRhLkxDSFIgPSBERUZBVUxUX0NKLkxDSFJcclxuICAgICAgICB1c2VyRGF0YS5MSU5UID0gREVGQVVMVF9DSi5MSU5UXHJcbiAgICAgICAgdXNlckRhdGEuTFNUUiA9IERFRkFVTFRfQ0ouTFNUUlxyXG4gICAgICAgIHVzZXJEYXRhLkxNTlkgPSBERUZBVUxUX0NKLkxNTllcclxuICAgICAgICB1c2VyRGF0YS5MU1BSID0gREVGQVVMVF9DSi5MU1BSXHJcbiAgICAgICAgdXNlckRhdGEuQUVWVCA9IERFRkFVTFRfQ0ouQUVWVFxyXG4gICAgICAgIHVzZXJEYXRhLkFUTFQgPSBERUZBVUxUX0NKLkFUTFRcclxuICAgICAgICB1c2VyRGF0YS5BQ0ogPSBERUZBVUxUX0NKLkFDSlxyXG5cclxuICAgICAgICB1c2VyRGF0YS5NeXp6ID0gU2F2ZURhdGEuTXl6elxyXG5cclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0dyZWVuSGF0X3VzZXJEYXRhJywgSlNPTi5zdHJpbmdpZnkodXNlckRhdGEpKTtcclxuXHJcbiAgICB9XHJcbiAgICAvKipAbmFtZTog5riF6Zmk5p+Q5LiA5p2h5pWw5o2uICovXHJcbiAgICBzdGF0aWMgcmVtb3ZlKGtleSkge1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xyXG4gICAgfVxyXG4gICAgLyoqQG5hbWU6IOa4hemZpOaJgOacieaVsOaNriAqL1xyXG4gICAgc3RhdGljIGNsZWFyKCkge1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2UuY2xlYXIoKTtcclxuICAgIH1cclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Other/UserModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '845b7aboVpJ1JS6FKVK+I63', 'UserModel');
// Scripts/Other/UserModel.ts

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
var DataBase_1 = require("./DataBase");
var UserModel = /** @class */ (function (_super) {
    __extends(UserModel, _super);
    function UserModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._using = 'skin0'; //使用哪套皮肤
        _this._choice = 'skin4'; //使用哪套皮肤
        _this._useId = 0; //使用id
        _this._autobiography = true; //是否是第一次打开自传
        _this._adCd = false; //是否有广告cd
        _this._skinData = [
            {
                name: '白',
                isUse: true,
                isUnlock: true,
                texture: 'Skin_3',
                folder: 'skin0' //文件夹
            },
            {
                name: '夜幕渐落',
                isUse: false,
                isUnlock: false,
                texture: 'Skin_2',
                folder: 'skin1' //文件夹
            },
            {
                name: '山谷悠悠',
                isUse: false,
                isUnlock: false,
                texture: 'Skin_1',
                folder: 'skin2' //文件夹
            }
        ];
        return _this;
    }
    Object.defineProperty(UserModel, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new UserModel('UserInfo' + 0);
                this._instance.decode();
            }
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "choice", {
        get: function () {
            return this._choice;
        },
        set: function (value) {
            this._choice = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "adCd", {
        get: function () {
            return this._adCd;
        },
        set: function (value) {
            this._adCd = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "useId", {
        get: function () {
            return this._useId;
        },
        set: function (value) {
            this._useId = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "autobiography", {
        get: function () {
            return this._autobiography;
        },
        set: function (value) {
            this._autobiography = value;
            this.save();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "using", {
        get: function () {
            return this._using;
        },
        set: function (value) {
            this._using = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "skinData", {
        get: function () {
            return this._skinData;
        },
        set: function (value) {
            this._skinData = value;
        },
        enumerable: false,
        configurable: true
    });
    /**
    * 时间秒  转换成字符串
    * 格式  00时00分00秒
    * @param time  秒
    */
    UserModel.prototype.timeTransitionString = function (time) {
        var sec = time % 60; //6 秒
        var min = Math.floor(time / 60) % 60; // 分
        var hour = Math.floor(time / 60 / 60) % 24; //时
        var str = "";
        if (hour > 0) {
            str += hour + "时";
        }
        if (min > 0 || hour > 0) {
            str += min + "分";
        }
        str += sec + "秒";
        ;
        return str;
    };
    /**
    * 时间秒  转换成字符串
    * 格式  00:00:00
    * @param time  秒
    */
    UserModel.timeTransitionString1 = function (time) {
        var sec = time % 60; //6 秒
        var min = Math.floor(time / 60) % 60; // 分
        var hour = Math.floor(time / 60 / 60) % 24; //时
        var str = "";
        if (hour) {
            if (hour < 10) {
                str += "0" + hour + ":";
            }
            else {
                str += hour + ":";
            }
        }
        if (min < 10) {
            str += "0" + min + ":";
        }
        else {
            str += min + ":";
        }
        if (sec < 10) {
            str += "0" + sec;
        }
        else {
            str += sec;
        }
        return str;
    };
    Object.defineProperty(UserModel.prototype, "serverTime", {
        get: function () {
            // return Math.floor(Tool.serverTime / 1000);
            return Math.floor((new Date().getTime()) / 1000);
        },
        enumerable: false,
        configurable: true
    });
    UserModel.prototype.newDate = function () {
        this.save();
    };
    return UserModel;
}(DataBase_1.default));
exports.default = UserModel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcT3RoZXJcXFVzZXJNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1Q0FBa0M7QUFFbEM7SUFBdUMsNkJBQVE7SUFBL0M7UUFBQSxxRUFpS0M7UUFySlcsWUFBTSxHQUFXLE9BQU8sQ0FBQyxDQUFPLFFBQVE7UUFDeEMsYUFBTyxHQUFXLE9BQU8sQ0FBQyxDQUFPLFFBQVE7UUFDekMsWUFBTSxHQUFXLENBQUMsQ0FBQyxDQUFPLE1BQU07UUFDaEMsb0JBQWMsR0FBWSxJQUFJLENBQUMsQ0FBTSxZQUFZO1FBQ2pELFdBQUssR0FBWSxLQUFLLENBQUEsQ0FBTyxTQUFTO1FBRXRDLGVBQVMsR0FBRztZQUNoQjtnQkFDSSxJQUFJLEVBQUUsR0FBRztnQkFDVCxLQUFLLEVBQUUsSUFBSTtnQkFDWCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUsUUFBUTtnQkFDakIsTUFBTSxFQUFFLE9BQU8sQ0FBc0IsS0FBSzthQUM3QztZQUNEO2dCQUNJLElBQUksRUFBRSxNQUFNO2dCQUNaLEtBQUssRUFBRSxLQUFLO2dCQUNaLFFBQVEsRUFBRSxLQUFLO2dCQUNmLE9BQU8sRUFBRSxRQUFRO2dCQUNqQixNQUFNLEVBQUUsT0FBTyxDQUFzQixLQUFLO2FBQzdDO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLE1BQU07Z0JBQ1osS0FBSyxFQUFFLEtBQUs7Z0JBQ1osUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsT0FBTyxFQUFFLFFBQVE7Z0JBQ2pCLE1BQU0sRUFBRSxPQUFPLENBQXNCLEtBQUs7YUFDN0M7U0FDSixDQUFBOztJQXlITCxDQUFDO0lBN0pHLHNCQUFrQixxQkFBUTthQUExQjtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFD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Q04sSUFBSSxJQUFJLEdBQUcsRUFBRSxFQUFFO2dCQUNYLEdBQUcsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQzthQUMzQjtpQkFBTTtnQkFDSCxHQUFHLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQzthQUNyQjtTQUNKO1FBQ0QsSUFBSSxHQUFHLEdBQUcsRUFBRSxFQUFFO1lBQ1YsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1NBQzFCO2FBQU07WUFDSCxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQztTQUNwQjtRQUNELElBQUksR0FBRyxHQUFHLEVBQUUsRUFBRTtZQUNWLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDO1NBQ3BCO2FBQU07WUFDSCxHQUFHLElBQUksR0FBRyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRCxzQkFBVyxpQ0FBVTthQUFyQjtZQUNJLDZDQUE2QztZQUM3QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUE7UUFDcEQsQ0FBQzs7O09BQUE7SUFFTSwyQkFBTyxHQUFkO1FBQ0ksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFDTCxnQkFBQztBQUFELENBaktBLEFBaUtDLENBaktzQyxrQkFBUSxHQWlLOUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IERhdGFCYXNlIGZyb20gXCIuL0RhdGFCYXNlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyTW9kZWwgZXh0ZW5kcyBEYXRhQmFzZSB7XHJcblxyXG4gICAgLy8g5Y2V5L6LXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFVzZXJNb2RlbDtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGluc3RhbmNlKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5faW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgVXNlck1vZGVsKCdVc2VySW5mbycgKyAwKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuZGVjb2RlKClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3VzaW5nOiBzdHJpbmcgPSAnc2tpbjAnOyAgICAgICAvL+S9v+eUqOWTquWll+earuiCpFxyXG4gICAgcHJpdmF0ZSBfY2hvaWNlOiBzdHJpbmcgPSAnc2tpbjQnOyAgICAgICAvL+S9v+eUqOWTquWll+earuiCpFxyXG4gICAgcHJpdmF0ZSBfdXNlSWQ6IG51bWJlciA9IDA7ICAgICAgIC8v5L2/55SoaWRcclxuICAgIHByaXZhdGUgX2F1dG9iaW9ncmFwaHk6IGJvb2xlYW4gPSB0cnVlOyAgICAgIC8v5piv5ZCm5piv56ys5LiA5qyh5omT5byA6Ieq5LygXHJcbiAgICBwcml2YXRlIF9hZENkOiBib29sZWFuID0gZmFsc2UgICAgICAgLy/mmK/lkKbmnInlub/lkYpjZFxyXG5cclxuICAgIHByaXZhdGUgX3NraW5EYXRhID0gWyAgICAgICAgICAgICAgIC8v55qu6IKk5pWw5o2uXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAn55m9JywgICAgICAgICAgLy/nmq7ogqTlkI3lrZdcclxuICAgICAgICAgICAgaXNVc2U6IHRydWUsICAgICAgICAgICAgICAgICAgIC8v5piv5ZCm5L2/55SoXHJcbiAgICAgICAgICAgIGlzVW5sb2NrOiB0cnVlLCAgICAgICAgICAgICAgICAvL+aYr+WQpuino+mUgVxyXG4gICAgICAgICAgICB0ZXh0dXJlOiAnU2tpbl8zJywgICAgICAgICAgICAgICAgICAgIC8v5Zu+54mHXHJcbiAgICAgICAgICAgIGZvbGRlcjogJ3NraW4wJyAgICAgICAgICAgICAgICAgICAgICAvL+aWh+S7tuWkuVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAn5aSc5bmV5riQ6JC9JywgICAgICAgICAgLy/nmq7ogqTlkI3lrZdcclxuICAgICAgICAgICAgaXNVc2U6IGZhbHNlLCAgICAgICAgICAgICAgICAgICAvL+aYr+WQpuS9v+eUqFxyXG4gICAgICAgICAgICBpc1VubG9jazogZmFsc2UsICAgICAgICAgICAgICAgIC8v5piv5ZCm6Kej6ZSBXHJcbiAgICAgICAgICAgIHRleHR1cmU6ICdTa2luXzInLCAgICAgICAgICAgICAgICAgICAgLy/lm77niYdcclxuICAgICAgICAgICAgZm9sZGVyOiAnc2tpbjEnICAgICAgICAgICAgICAgICAgICAgIC8v5paH5Lu25aS5XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICflsbHosLfmgqDmgqAnLCAgICAgICAgICAvL+earuiCpOWQjeWtl1xyXG4gICAgICAgICAgICBpc1VzZTogZmFsc2UsICAgICAgICAgICAgICAgICAgIC8v5piv5ZCm5L2/55SoXHJcbiAgICAgICAgICAgIGlzVW5sb2NrOiBmYWxzZSwgICAgICAgICAgICAgICAgLy/mmK/lkKbop6PplIFcclxuICAgICAgICAgICAgdGV4dHVyZTogJ1NraW5fMScsICAgICAgICAgICAgICAgICAgICAvL+WbvueJh1xyXG4gICAgICAgICAgICBmb2xkZXI6ICdza2luMicgICAgICAgICAgICAgICAgICAgICAgLy/mlofku7blpLlcclxuICAgICAgICB9XHJcbiAgICBdXHJcblxyXG5cclxuICAgIFxyXG4gICAgcHVibGljIGdldCBjaG9pY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nob2ljZVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY2hvaWNlKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fY2hvaWNlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgYWRDZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWRDZFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgYWRDZCh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX2FkQ2QgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldCB1c2VJZCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91c2VJZFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdXNlSWQodmFsdWUpIHtcclxuICAgICAgICB0aGlzLl91c2VJZCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgYXV0b2Jpb2dyYXBoeSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYXV0b2Jpb2dyYXBoeVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgYXV0b2Jpb2dyYXBoeSh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX2F1dG9iaW9ncmFwaHkgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNhdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHVzaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzaW5nXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB1c2luZyh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX3VzaW5nID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNraW5EYXRhKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9za2luRGF0YVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2tpbkRhdGEodmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9za2luRGF0YSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDml7bpl7Tnp5IgIOi9rOaNouaIkOWtl+espuS4slxyXG4gICAgKiDmoLzlvI8gIDAw5pe2MDDliIYwMOenklxyXG4gICAgKiBAcGFyYW0gdGltZSAg56eSXHJcbiAgICAqL1xyXG4gICAgcHVibGljIHRpbWVUcmFuc2l0aW9uU3RyaW5nKHRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBzZWMgPSB0aW1lICUgNjA7IC8vNiDnp5JcclxuICAgICAgICBsZXQgbWluID0gTWF0aC5mbG9vcih0aW1lIC8gNjApICUgNjA7Ly8g5YiGXHJcbiAgICAgICAgbGV0IGhvdXIgPSBNYXRoLmZsb29yKHRpbWUgLyA2MCAvIDYwKSAlIDI0OyAvL+aXtlxyXG4gICAgICAgIGxldCBzdHIgPSBcIlwiO1xyXG4gICAgICAgIGlmIChob3VyID4gMCkge1xyXG5cclxuICAgICAgICAgICAgc3RyICs9IGhvdXIgKyBcIuaXtlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobWluID4gMCB8fCBob3VyID4gMCkge1xyXG5cclxuICAgICAgICAgICAgc3RyICs9IG1pbiArIFwi5YiGXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdHIgKz0gc2VjICsgXCLnp5JcIjs7XHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog5pe26Ze056eSICDovazmjaLmiJDlrZfnrKbkuLJcclxuICAgICog5qC85byPICAwMDowMDowMFxyXG4gICAgKiBAcGFyYW0gdGltZSAg56eSXHJcbiAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB0aW1lVHJhbnNpdGlvblN0cmluZzEodGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHNlYyA9IHRpbWUgJSA2MDsgLy82IOenklxyXG4gICAgICAgIGxldCBtaW4gPSBNYXRoLmZsb29yKHRpbWUgLyA2MCkgJSA2MDsvLyDliIZcclxuICAgICAgICBsZXQgaG91ciA9IE1hdGguZmxvb3IodGltZSAvIDYwIC8gNjApICUgMjQ7IC8v5pe2XHJcbiAgICAgICAgbGV0IHN0ciA9IFwiXCI7XHJcbiAgICAgICAgaWYgKGhvdXIpIHtcclxuICAgICAgICAgICAgaWYgKGhvdXIgPCAxMCkge1xyXG4gICAgICAgICAgICAgICAgc3RyICs9IFwiMFwiICsgaG91ciArIFwiOlwiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3RyICs9IGhvdXIgKyBcIjpcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobWluIDwgMTApIHtcclxuICAgICAgICAgICAgc3RyICs9IFwiMFwiICsgbWluICsgXCI6XCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3RyICs9IG1pbiArIFwiOlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2VjIDwgMTApIHtcclxuICAgICAgICAgICAgc3RyICs9IFwiMFwiICsgc2VjO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN0ciArPSBzZWM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzZXJ2ZXJUaW1lKCkge1xyXG4gICAgICAgIC8vIHJldHVybiBNYXRoLmZsb29yKFRvb2wuc2VydmVyVGltZSAvIDEwMDApO1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKChuZXcgRGF0ZSgpLmdldFRpbWUoKSkgLyAxMDAwKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZXdEYXRlKCkge1xyXG4gICAgICAgIHRoaXMuc2F2ZSgpO1xyXG4gICAgfVxyXG59Il19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Main/Entry.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd2032YTVkNAwp0hnQ1iaOCp', 'Entry');
// Scripts/Main/Entry.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Entry = /** @class */ (function (_super) {
    __extends(Entry, _super);
    function Entry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sp = [];
        return _this;
    }
    Entry.prototype.start = function () {
    };
    Entry.prototype.init = function (data) {
    };
    Entry.prototype.update = function (dt) {
    };
    __decorate([
        property([cc.SpriteFrame])
    ], Entry.prototype, "sp", void 0);
    Entry = __decorate([
        ccclass
    ], Entry);
    return Entry;
}(cc.Component));
exports.default = Entry;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWFpblxcRW50cnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBbUMseUJBQVk7SUFBL0M7UUFBQSxxRUFnQkM7UUFiRyxRQUFFLEdBQW9CLEVBQUUsQ0FBQTs7SUFhNUIsQ0FBQztJQVZHLHFCQUFLLEdBQUw7SUFFQSxDQUFDO0lBRUQsb0JBQUksR0FBSixVQUFLLElBQUk7SUFDVCxDQUFDO0lBRUQsc0JBQU0sR0FBTixVQUFRLEVBQUU7SUFFVixDQUFDO0lBWkQ7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7cUNBQ0g7SUFIUCxLQUFLO1FBRHpCLE9BQU87T0FDYSxLQUFLLENBZ0J6QjtJQUFELFlBQUM7Q0FoQkQsQUFnQkMsQ0FoQmtDLEVBQUUsQ0FBQyxTQUFTLEdBZ0I5QztrQkFoQm9CLEtBQUsiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudHJ5IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcclxuICAgIHNwOmNjLlNwcml0ZUZyYW1lW10gPSBbXVxyXG5cclxuXHJcbiAgICBzdGFydCAoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGluaXQoZGF0YSl7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlIChkdCkge1xyXG5cclxuICAgIH1cclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Main/condition.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '75ba3TEUjdBPpo4CTMfmi7U', 'condition');
// Scripts/Main/condition.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_CJ = exports.DEFAULT_PROP = exports.getProp = exports.check = exports.checkParsedCondition = exports.checkLogic = exports.parseCondition = void 0;
var DEFAULT_PROP = {
    CHR: 0,
    INT: 0,
    STR: 0,
    MNY: 0,
    SPR: 0,
    LIF: 1,
    TLT: [],
    EVT: [],
    AGE: 0,
};
exports.DEFAULT_PROP = DEFAULT_PROP;
var DEFAULT_CJ = {
    TMS: 0,
    HAGE: 0,
    SUM: 0,
    HCHR: 0,
    HINT: 0,
    HSTR: 0,
    HMNY: 0,
    HSPR: 0,
    LCHR: 0,
    LINT: 0,
    LSTR: 0,
    LMNY: 0,
    LSPR: 0,
    AEVT: [],
    ATLT: [],
    ACJ: [],
};
exports.DEFAULT_CJ = DEFAULT_CJ;
function getProp(prop) {
    switch (prop) {
        case 'CHR':
        case 'INT':
        case 'STR':
        case 'MNY':
        case 'SPR':
        case 'LIF':
        case 'TLT':
        case 'AGE':
        case 'EVT': return DEFAULT_PROP[prop];
        case "TMS":
        case "HAGE":
        case "SUM":
        case "HCHR":
        case "HINT":
        case "HSTR":
        case "HMNY":
        case "HSPR":
        case "LCHR":
        case "LINT":
        case "LSTR":
        case "LMNY":
        case "LSPR":
        case "AEVT":
        case "ATLT":
        case "ACJ": return DEFAULT_CJ[prop];
        default: return null;
    }
}
exports.getProp = getProp;
function check(condition, type) {
    if (condition == undefined) {
        if (type == "include") {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        var conditions = parseCondition(condition);
        //cc.log(condition,checkParsedCondition(conditions))
        return checkParsedCondition(conditions);
    }
}
exports.check = check;
function checkParsedCondition(conditions) {
    if (!Array.isArray(conditions))
        return checkLogic(conditions);
    if (conditions.length == 0)
        return true;
    if (conditions.length == 1)
        return checkParsedCondition(conditions[0]);
    var ret = checkParsedCondition(conditions[0]);
    for (var i = 1; i < conditions.length; i += 2) {
        switch (conditions[i]) {
            case '&':
                if (ret)
                    ret = checkParsedCondition(conditions[i + 1]);
                break;
            case '|':
                if (ret)
                    return true;
                ret = checkParsedCondition(conditions[i + 1]);
                break;
            default: return false;
        }
    }
    return ret;
}
exports.checkParsedCondition = checkParsedCondition;
function checkLogic(condition) {
    var length = condition.length;
    var i = condition.search(/[><\!\?=]/);
    var prop = condition.substring(0, i);
    var symbol = condition.substring(i, i += (condition[i + 1] == '=' ? 2 : 1));
    var d = condition.substring(i, length);
    var propData = getProp(prop);
    var conditionData = d[0] == '[' ? JSON.parse(d) : Number(d);
    switch (symbol) {
        case '>': return propData > conditionData;
        case '<': return propData < conditionData;
        case '>=': return propData >= conditionData;
        case '<=': return propData <= conditionData;
        case '=':
            if (Array.isArray(propData))
                return propData.includes(conditionData);
            return propData == conditionData;
        case '!=':
            if (Array.isArray(propData))
                return !propData.includes(conditionData);
            return propData == conditionData;
        case '?':
            if (Array.isArray(propData)) {
                for (var _i = 0, propData_1 = propData; _i < propData_1.length; _i++) {
                    var p = propData_1[_i];
                    if (conditionData.includes(p))
                        return true;
                }
                return false;
            }
            return conditionData.includes(propData);
        case '!':
            if (Array.isArray(propData)) {
                for (var _a = 0, propData_2 = propData; _a < propData_2.length; _a++) {
                    var p = propData_2[_a];
                    if (conditionData.includes(p))
                        return false;
                }
                return true;
            }
            return !conditionData.includes(propData);
        default: return false;
    }
}
exports.checkLogic = checkLogic;
function parseCondition(condition) {
    var conditions = [];
    var length = condition.length;
    var stack = [];
    stack.unshift(conditions);
    var cursor = 0;
    var catchString = function (i) {
        var str = condition.substring(cursor, i).trim();
        cursor = i;
        if (str)
            stack[0].push(str);
    };
    for (var i = 0; i < length; i++) {
        switch (condition[i]) {
            case ' ': continue;
            case '(':
                catchString(i);
                cursor++;
                var sub = [];
                stack[0].push(sub);
                stack.unshift(sub);
                break;
            case ')':
                catchString(i);
                cursor++;
                stack.shift();
                break;
            case '|':
            case '&':
                catchString(i);
                catchString(i + 1);
                break;
            default: continue;
        }
    }
    catchString(length);
    return conditions;
}
exports.parseCondition = parseCondition;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWFpblxcY29uZGl0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUksWUFBWSxHQUFHO0lBQ2YsR0FBRyxFQUFFLENBQUM7SUFDTixHQUFHLEVBQUUsQ0FBQztJQUNOLEdBQUcsRUFBRSxDQUFDO0lBQ04sR0FBRyxFQUFFLENBQUM7SUFDTixHQUFHLEVBQUUsQ0FBQztJQUNOLEdBQUcsRUFBRSxDQUFDO0lBQ04sR0FBRyxFQUFFLEVBQUU7SUFDUCxHQUFHLEVBQUUsRUFBRTtJQUNQLEdBQUcsRUFBRSxDQUFDO0NBQ1QsQ0FBQztBQW9Mb0Usb0NBQVk7QUFsTGxGLElBQUksVUFBVSxHQUFHO0lBQ2IsR0FBRyxFQUFFLENBQUM7SUFDTixJQUFJLEVBQUUsQ0FBQztJQUNQLEdBQUcsRUFBRSxDQUFDO0lBRU4sSUFBSSxFQUFFLENBQUM7SUFDUCxJQUFJLEVBQUUsQ0FBQztJQUNQLElBQUksRUFBRSxDQUFDO0lBQ1AsSUFBSSxFQUFFLENBQUM7SUFDUCxJQUFJLEVBQUUsQ0FBQztJQUVQLElBQUksRUFBRSxDQUFDO0lBQ1AsSUFBSSxFQUFFLENBQUM7SUFDUCxJQUFJLEVBQUUsQ0FBQztJQUNQLElBQUksRUFBRSxDQUFDO0lBQ1AsSUFBSSxFQUFFLENBQUM7SUFFUCxJQUFJLEVBQUMsRUFBRTtJQUNQLElBQUksRUFBQyxFQUFFO0lBQ1AsR0FBRyxFQUFDLEVBQUU7Q0FDVCxDQUFDO0FBOEppRixnQ0FBVTtBQTVKN0YsU0FBUyxPQUFPLENBQUMsSUFBSTtJQUNqQixRQUFPLElBQUksRUFBRTtRQUNULEtBQUssS0FBSyxDQUFDO1FBQ1gsS0FBSyxLQUFLLENBQUM7UUFDWCxLQUFLLEtBQUssQ0FBQztRQUNYLEtBQUssS0FBSyxDQUFDO1FBQ1gsS0FBSyxLQUFLLENBQUM7UUFDWCxLQUFLLEtBQUssQ0FBQztRQUNYLEtBQUssS0FBSyxDQUFDO1FBQ1gsS0FBSyxLQUFLLENBQUM7UUFDWCxLQUFLLEtBQUssQ0FBQyxDQUFDLE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLEtBQUssS0FBSyxDQUFDO1FBQ1gsS0FBSyxNQUFNLENBQUM7UUFDWixLQUFLLEtBQUssQ0FBQztRQUNYLEtBQUssTUFBTSxDQUFDO1FBQ1osS0FBSyxNQUFNLENBQUM7UUFDWixLQUFLLE1BQU0sQ0FBQztRQUNaLEtBQUssTUFBTSxDQUFDO1FBQ1osS0FBSyxNQUFNLENBQUM7UUFDWixLQUFLLE1BQU0sQ0FBQztRQUNaLEtBQUssTUFBTSxDQUFDO1FBQ1osS0FBSyxNQUFNLENBQUM7UUFDWixLQUFLLE1BQU0sQ0FBQztRQUNaLEtBQUssTUFBTSxDQUFDO1FBQ1osS0FBSyxNQUFNLENBQUM7UUFDWixLQUFLLE1BQU0sQ0FBQztRQUNaLEtBQUssS0FBSyxDQUFDLENBQUEsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7UUFFbEMsT0FBTyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUM7S0FDeEI7QUFDTCxDQUFDO0FBOEg2RCwwQkFBTztBQTVIckUsU0FBUyxLQUFLLENBQUMsU0FBUyxFQUFDLElBQVk7SUFDakMsSUFBRyxTQUFTLElBQUUsU0FBUyxFQUFDO1FBQ3BCLElBQUcsSUFBSSxJQUFFLFNBQVMsRUFBQztZQUNmLE9BQU8sSUFBSSxDQUFBO1NBRWQ7YUFBSTtZQUNELE9BQU8sS0FBSyxDQUFBO1NBQ2Y7S0FDSjtTQUFJO1FBQ0QsSUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLG9EQUFvRDtRQUNwRCxPQUFPLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQzNDO0FBQ0wsQ0FBQztBQStHdUQsc0JBQUs7QUE3RzdELFNBQVMsb0JBQW9CLENBQUMsVUFBVTtJQUNwQyxJQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFBRSxPQUFPLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM3RCxJQUFHLFVBQVUsQ0FBQyxNQUFNLElBQUksQ0FBQztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQ3ZDLElBQUcsVUFBVSxDQUFDLE1BQU0sSUFBSSxDQUFDO1FBQUUsT0FBTyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV0RSxJQUFJLEdBQUcsR0FBRyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QyxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUUsQ0FBQyxFQUFFO1FBQ3BDLFFBQU8sVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2xCLEtBQUssR0FBRztnQkFDSixJQUFHLEdBQUc7b0JBQUUsR0FBRyxHQUFHLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEQsTUFBTTtZQUNWLEtBQUssR0FBRztnQkFDSixJQUFHLEdBQUc7b0JBQUUsT0FBTyxJQUFJLENBQUM7Z0JBQ3BCLEdBQUcsR0FBRyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLE1BQU07WUFDVixPQUFPLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQztTQUN6QjtLQUNKO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFFZixDQUFDO0FBeUZrQyxvREFBb0I7QUF2RnZELFNBQVMsVUFBVSxDQUFDLFNBQVM7SUFDekIsSUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztJQUNoQyxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRXRDLElBQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLElBQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUUsR0FBRyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEUsSUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFekMsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLElBQU0sYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRSxHQUFHLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUxRCxRQUFPLE1BQU0sRUFBRTtRQUNYLEtBQUssR0FBRyxDQUFDLENBQUUsT0FBTyxRQUFRLEdBQUksYUFBYSxDQUFDO1FBQzVDLEtBQUssR0FBRyxDQUFDLENBQUUsT0FBTyxRQUFRLEdBQUksYUFBYSxDQUFDO1FBQzVDLEtBQUssSUFBSSxDQUFDLENBQUMsT0FBTyxRQUFRLElBQUksYUFBYSxDQUFDO1FBQzVDLEtBQUssSUFBSSxDQUFDLENBQUMsT0FBTyxRQUFRLElBQUksYUFBYSxDQUFDO1FBQzVDLEtBQUssR0FBRztZQUNKLElBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7Z0JBQ3RCLE9BQU8sUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUM1QyxPQUFPLFFBQVEsSUFBSSxhQUFhLENBQUM7UUFDckMsS0FBSyxJQUFJO1lBQ0wsSUFBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztnQkFDdEIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDN0MsT0FBTyxRQUFRLElBQUksYUFBYSxDQUFDO1FBQ3JDLEtBQUssR0FBRztZQUNKLElBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDeEIsS0FBZSxVQUFRLEVBQVIscUJBQVEsRUFBUixzQkFBUSxFQUFSLElBQVE7b0JBQW5CLElBQU0sQ0FBQyxpQkFBQTtvQkFDUCxJQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO3dCQUFFLE9BQU8sSUFBSSxDQUFDO2lCQUFBO2dCQUM5QyxPQUFPLEtBQUssQ0FBQzthQUNoQjtZQUNELE9BQU8sYUFBYSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QyxLQUFLLEdBQUc7WUFDSixJQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3hCLEtBQWUsVUFBUSxFQUFSLHFCQUFRLEVBQVIsc0JBQVEsRUFBUixJQUFRO29CQUFuQixJQUFNLENBQUMsaUJBQUE7b0JBQ1AsSUFBRyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzt3QkFBRSxPQUFPLEtBQUssQ0FBQztpQkFBQTtnQkFDL0MsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUNELE9BQU8sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTdDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDO0tBQ3pCO0FBQ0wsQ0FBQztBQThDdUIsZ0NBQVU7QUE1Q2xDLFNBQVMsY0FBYyxDQUFDLFNBQVM7SUFDN0IsSUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBRXRCLElBQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7SUFDaEMsSUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsSUFBTSxXQUFXLEdBQUcsVUFBQSxDQUFDO1FBQ2pCLElBQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xELE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFHLEdBQUc7WUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQztJQUVGLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDeEIsUUFBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDakIsS0FBSyxHQUFHLENBQUMsQ0FBQyxTQUFTO1lBRW5CLEtBQUssR0FBRztnQkFDSixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsTUFBTSxFQUFHLENBQUM7Z0JBQ1YsSUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO2dCQUNmLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ25CLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ25CLE1BQU07WUFFVixLQUFLLEdBQUc7Z0JBQ0osV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNmLE1BQU0sRUFBRyxDQUFDO2dCQUNWLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDZCxNQUFNO1lBRVYsS0FBSyxHQUFHLENBQUM7WUFDVCxLQUFLLEdBQUc7Z0JBQ0osV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNmLFdBQVcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLE1BQU07WUFDVixPQUFPLENBQUMsQ0FBQyxTQUFTO1NBQ3JCO0tBQ0o7SUFFRCxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFcEIsT0FBTyxVQUFVLENBQUM7QUFDdEIsQ0FBQztBQUNRLHdDQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsibGV0IERFRkFVTFRfUFJPUCA9IHtcclxuICAgIENIUjogMCwgICAgICAvLyDpopzlgLwgY2hhcm0gQ0hSXHJcbiAgICBJTlQ6IDAsICAgICAgLy8g5pm65YqbIGludGVsbGlnZW5jZSBJTlRcclxuICAgIFNUUjogMCwgICAgICAvLyDkvZPotKggc3RyZW5ndGggU1RSXHJcbiAgICBNTlk6IDAsICAgICAgLy8g5a625aKDIG1vbmV5IE1OWVxyXG4gICAgU1BSOiAwLCAgICAgIC8vIOW/q+S5kCBzcGlyaXQgU1BSXHJcbiAgICBMSUY6IDEsICAgICAgLy8g55Sf5ZG9IGxpZmUgTElGXHJcbiAgICBUTFQ6IFtdLCAgICAvLyDlpKnotYsgdGFsZW50IFRMVFxyXG4gICAgRVZUOiBbXSwgICAgLy8g5LqL5Lu2IGV2ZW50IEVWVFxyXG4gICAgQUdFOiAwLCAgICAvLyDlubTpvoRcclxufTtcclxuXHJcbmxldCBERUZBVUxUX0NKID0ge1xyXG4gICAgVE1TOiAwLCAgICAgIC8vIOmHjeW8gOasoeaVsFxyXG4gICAgSEFHRTogMCwgICAgIC8vIOacgOWkp+W5tOm+hFxyXG4gICAgU1VNOiAwLCAgICAgICAvL+acgOWkp+aAu+ivhFxyXG5cclxuICAgIEhDSFI6IDAsICAgICAgLy8g5pyA5aSn6aKc5YC8XHJcbiAgICBISU5UOiAwLCAgICAgIC8vIOacgOWkp+aZuuWKm1xyXG4gICAgSFNUUjogMCwgICAgICAvLyDmnIDlpKfkvZPotKhcclxuICAgIEhNTlk6IDAsICAgICAgLy8g5pyA5aSn5a625aKDXHJcbiAgICBIU1BSOiAwLCAgICAgICAvLyDmnIDlpKflv6vkuZBcclxuXHJcbiAgICBMQ0hSOiAwLCAgICAgIC8vIOacgOWwj+minOWAvFxyXG4gICAgTElOVDogMCwgICAgICAvLyDmnIDlsI/mmbrliptcclxuICAgIExTVFI6IDAsICAgICAgLy8g5pyA5bCP5L2T6LSoXHJcbiAgICBMTU5ZOiAwLCAgICAgIC8vIOacgOWwj+WutuWig1xyXG4gICAgTFNQUjogMCwgICAgICAvLyDmnIDlsI/lv6vkuZBcclxuXHJcbiAgICBBRVZUOltdLCAgICAvLyDnu4/ljobov4fnmoTkuovku7ZcclxuICAgIEFUTFQ6W10sICAgIC8vIOmAieaLqei/h+eahOWkqei1i1xyXG4gICAgQUNKOltdLCAgICAgLy/lrozmiJDnmoTmiJDlsLFcclxufTtcclxuXHJcbmZ1bmN0aW9uIGdldFByb3AocHJvcCkge1xyXG4gICAgc3dpdGNoKHByb3ApIHtcclxuICAgICAgICBjYXNlICdDSFInOlxyXG4gICAgICAgIGNhc2UgJ0lOVCc6XHJcbiAgICAgICAgY2FzZSAnU1RSJzpcclxuICAgICAgICBjYXNlICdNTlknOlxyXG4gICAgICAgIGNhc2UgJ1NQUic6XHJcbiAgICAgICAgY2FzZSAnTElGJzpcclxuICAgICAgICBjYXNlICdUTFQnOlxyXG4gICAgICAgIGNhc2UgJ0FHRSc6XHJcbiAgICAgICAgY2FzZSAnRVZUJzogcmV0dXJuIERFRkFVTFRfUFJPUFtwcm9wXTtcclxuICAgICAgICBjYXNlIFwiVE1TXCI6XHJcbiAgICAgICAgY2FzZSBcIkhBR0VcIjpcclxuICAgICAgICBjYXNlIFwiU1VNXCI6XHJcbiAgICAgICAgY2FzZSBcIkhDSFJcIjpcclxuICAgICAgICBjYXNlIFwiSElOVFwiOlxyXG4gICAgICAgIGNhc2UgXCJIU1RSXCI6XHJcbiAgICAgICAgY2FzZSBcIkhNTllcIjpcclxuICAgICAgICBjYXNlIFwiSFNQUlwiOlxyXG4gICAgICAgIGNhc2UgXCJMQ0hSXCI6XHJcbiAgICAgICAgY2FzZSBcIkxJTlRcIjpcclxuICAgICAgICBjYXNlIFwiTFNUUlwiOlxyXG4gICAgICAgIGNhc2UgXCJMTU5ZXCI6XHJcbiAgICAgICAgY2FzZSBcIkxTUFJcIjpcclxuICAgICAgICBjYXNlIFwiQUVWVFwiOlxyXG4gICAgICAgIGNhc2UgXCJBVExUXCI6XHJcbiAgICAgICAgY2FzZSBcIkFDSlwiOnJldHVybiBERUZBVUxUX0NKW3Byb3BdXHJcblxyXG4gICAgICAgIGRlZmF1bHQ6IHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVjayhjb25kaXRpb24sdHlwZT86c3RyaW5nKSB7XHJcbiAgICBpZihjb25kaXRpb249PXVuZGVmaW5lZCl7XHJcbiAgICAgICAgaWYodHlwZT09XCJpbmNsdWRlXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgY29uc3QgY29uZGl0aW9ucyA9IHBhcnNlQ29uZGl0aW9uKGNvbmRpdGlvbik7XHJcbiAgICAgICAgLy9jYy5sb2coY29uZGl0aW9uLGNoZWNrUGFyc2VkQ29uZGl0aW9uKGNvbmRpdGlvbnMpKVxyXG4gICAgICAgIHJldHVybiBjaGVja1BhcnNlZENvbmRpdGlvbihjb25kaXRpb25zKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tQYXJzZWRDb25kaXRpb24oY29uZGl0aW9ucykge1xyXG4gICAgaWYoIUFycmF5LmlzQXJyYXkoY29uZGl0aW9ucykpIHJldHVybiBjaGVja0xvZ2ljKGNvbmRpdGlvbnMpO1xyXG4gICAgaWYoY29uZGl0aW9ucy5sZW5ndGggPT0gMCkgcmV0dXJuIHRydWU7XHJcbiAgICBpZihjb25kaXRpb25zLmxlbmd0aCA9PSAxKSByZXR1cm4gY2hlY2tQYXJzZWRDb25kaXRpb24oY29uZGl0aW9uc1swXSk7XHJcblxyXG4gICAgbGV0IHJldCA9IGNoZWNrUGFyc2VkQ29uZGl0aW9uKGNvbmRpdGlvbnNbMF0pO1xyXG4gICAgZm9yKGxldCBpPTE7IGk8Y29uZGl0aW9ucy5sZW5ndGg7IGkrPTIpIHtcclxuICAgICAgICBzd2l0Y2goY29uZGl0aW9uc1tpXSkge1xyXG4gICAgICAgICAgICBjYXNlICcmJzpcclxuICAgICAgICAgICAgICAgIGlmKHJldCkgcmV0ID0gY2hlY2tQYXJzZWRDb25kaXRpb24oY29uZGl0aW9uc1tpKzFdKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd8JzpcclxuICAgICAgICAgICAgICAgIGlmKHJldCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXQgPSBjaGVja1BhcnNlZENvbmRpdGlvbihjb25kaXRpb25zW2krMV0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0O1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tMb2dpYyhjb25kaXRpb24pIHtcclxuICAgIGNvbnN0IGxlbmd0aCA9IGNvbmRpdGlvbi5sZW5ndGg7XHJcbiAgICBsZXQgaSA9IGNvbmRpdGlvbi5zZWFyY2goL1s+PFxcIVxcPz1dLyk7XHJcblxyXG4gICAgY29uc3QgcHJvcCA9IGNvbmRpdGlvbi5zdWJzdHJpbmcoMCxpKTtcclxuICAgIGNvbnN0IHN5bWJvbCA9IGNvbmRpdGlvbi5zdWJzdHJpbmcoaSwgaSs9KGNvbmRpdGlvbltpKzFdPT0nPSc/MjoxKSk7XHJcbiAgICBjb25zdCBkID0gY29uZGl0aW9uLnN1YnN0cmluZyhpLCBsZW5ndGgpO1xyXG5cclxuICAgIGNvbnN0IHByb3BEYXRhID0gZ2V0UHJvcChwcm9wKTtcclxuICAgIGNvbnN0IGNvbmRpdGlvbkRhdGEgPSBkWzBdPT0nWyc/IEpTT04ucGFyc2UoZCk6IE51bWJlcihkKTtcclxuXHJcbiAgICBzd2l0Y2goc3ltYm9sKSB7XHJcbiAgICAgICAgY2FzZSAnPic6ICByZXR1cm4gcHJvcERhdGEgPiAgY29uZGl0aW9uRGF0YTtcclxuICAgICAgICBjYXNlICc8JzogIHJldHVybiBwcm9wRGF0YSA8ICBjb25kaXRpb25EYXRhO1xyXG4gICAgICAgIGNhc2UgJz49JzogcmV0dXJuIHByb3BEYXRhID49IGNvbmRpdGlvbkRhdGE7XHJcbiAgICAgICAgY2FzZSAnPD0nOiByZXR1cm4gcHJvcERhdGEgPD0gY29uZGl0aW9uRGF0YTtcclxuICAgICAgICBjYXNlICc9JzpcclxuICAgICAgICAgICAgaWYoQXJyYXkuaXNBcnJheShwcm9wRGF0YSkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcERhdGEuaW5jbHVkZXMoY29uZGl0aW9uRGF0YSk7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wRGF0YSA9PSBjb25kaXRpb25EYXRhO1xyXG4gICAgICAgIGNhc2UgJyE9JzpcclxuICAgICAgICAgICAgaWYoQXJyYXkuaXNBcnJheShwcm9wRGF0YSkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIXByb3BEYXRhLmluY2x1ZGVzKGNvbmRpdGlvbkRhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gcHJvcERhdGEgPT0gY29uZGl0aW9uRGF0YTtcclxuICAgICAgICBjYXNlICc/JzpcclxuICAgICAgICAgICAgaWYoQXJyYXkuaXNBcnJheShwcm9wRGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIGZvcihjb25zdCBwIG9mIHByb3BEYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbmRpdGlvbkRhdGEuaW5jbHVkZXMocCkpIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjb25kaXRpb25EYXRhLmluY2x1ZGVzKHByb3BEYXRhKTtcclxuICAgICAgICBjYXNlICchJzpcclxuICAgICAgICAgICAgaWYoQXJyYXkuaXNBcnJheShwcm9wRGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIGZvcihjb25zdCBwIG9mIHByb3BEYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbmRpdGlvbkRhdGEuaW5jbHVkZXMocCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAhY29uZGl0aW9uRGF0YS5pbmNsdWRlcyhwcm9wRGF0YSk7XHJcblxyXG4gICAgICAgIGRlZmF1bHQ6IHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VDb25kaXRpb24oY29uZGl0aW9uKSB7XHJcbiAgICBjb25zdCBjb25kaXRpb25zID0gW107XHJcbiAgICBcclxuICAgIGNvbnN0IGxlbmd0aCA9IGNvbmRpdGlvbi5sZW5ndGg7XHJcbiAgICBjb25zdCBzdGFjayA9IFtdO1xyXG4gICAgc3RhY2sudW5zaGlmdChjb25kaXRpb25zKTtcclxuICAgIGxldCBjdXJzb3IgPSAwO1xyXG4gICAgY29uc3QgY2F0Y2hTdHJpbmcgPSBpID0+IHtcclxuICAgICAgICBjb25zdCBzdHIgPSBjb25kaXRpb24uc3Vic3RyaW5nKGN1cnNvciwgaSkudHJpbSgpO1xyXG4gICAgICAgIGN1cnNvciA9IGk7XHJcbiAgICAgICAgaWYoc3RyKSBzdGFja1swXS5wdXNoKHN0cik7XHJcbiAgICB9O1xyXG5cclxuICAgIGZvcihsZXQgaT0wOyBpPGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgc3dpdGNoKGNvbmRpdGlvbltpXSkge1xyXG4gICAgICAgICAgICBjYXNlICcgJzogY29udGludWU7XHJcblxyXG4gICAgICAgICAgICBjYXNlICcoJzpcclxuICAgICAgICAgICAgICAgIGNhdGNoU3RyaW5nKGkpO1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yICsrO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3ViID0gW107XHJcbiAgICAgICAgICAgICAgICBzdGFja1swXS5wdXNoKHN1Yik7XHJcbiAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KHN1Yik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJyknOlxyXG4gICAgICAgICAgICAgICAgY2F0Y2hTdHJpbmcoaSk7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3IgKys7XHJcbiAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlICd8JzpcclxuICAgICAgICAgICAgY2FzZSAnJic6XHJcbiAgICAgICAgICAgICAgICBjYXRjaFN0cmluZyhpKTtcclxuICAgICAgICAgICAgICAgIGNhdGNoU3RyaW5nKGkrMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNhdGNoU3RyaW5nKGxlbmd0aCk7XHJcblxyXG4gICAgcmV0dXJuIGNvbmRpdGlvbnM7XHJcbn1cclxuZXhwb3J0IHsgcGFyc2VDb25kaXRpb24sY2hlY2tMb2dpYyxjaGVja1BhcnNlZENvbmRpdGlvbixjaGVjayxnZXRQcm9wLERFRkFVTFRfUFJPUCxERUZBVUxUX0NKfTsiXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Other/ScrollviewMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8c56duKs2ZPJ6VxBqmkAha3', 'ScrollviewMgr');
// Scripts/Other/ScrollviewMgr.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ScrollviewMgr = /** @class */ (function (_super) {
    __extends(ScrollviewMgr, _super);
    function ScrollviewMgr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.item = null;
        _this.horiNum = 1;
        _this.vertNum = 1;
        _this.horiPading = 0;
        _this.vertPading = 0;
        _this.leftSpace = 0;
        _this.rightSpace = 0;
        _this.topSpace = 0;
        _this.downSpace = 0;
        _this.mscale = 1;
        _this.mdelay = 0.02;
        _this.mirror = false;
        _this.LRSlide = false;
        _this._itemNum = 1; //item总数
        _this._lastPosY = 0; //坐标转换之后的Y值
        _this._lastPosX = 0; //坐标转换之后的X值
        _this._itemComName = ""; //预制体脚本名
        _this._itemHeight = 0; //预制体高度
        _this._extra = null;
        _this._list = [];
        _this._dataLen = 0;
        _this._needShapeChange = false;
        return _this;
    }
    ScrollviewMgr.prototype.onLoad = function () {
        this._bg = cc.find("bg", this.node);
        this._view = cc.find("view", this.node);
        this._content = cc.find("content", this._view);
        /*初始化滚动组件，默认关闭*/
        this._scrollView = this.node.getComponent(cc.ScrollView);
        this._scrollView.vertical = false;
        this._scrollView.horizontal = false;
        this._scrollView.enabled = true;
        /*获取预制长、宽、名字 */
        var item = cc.instantiate(this.item);
        this._itemComName = item.name;
        this._itemWidth = item.width;
        this._itemHeight = item.height;
        item.destroy();
        /*设置滑动方向，选择初始化函数和滚动事件函数*/
        if (this.LRSlide) {
            this._scrollView.horizontal = true;
            this._initFunc = this.initHorizontal;
            this.node.on("scrolling", this.scrollMoveHorizontal, this);
        }
        else {
            this._scrollView.vertical = true;
            this._initFunc = this.initVertical;
            this.node.on("scrolling", this.scrollMoveVertical, this);
        }
    };
    /**
     * 初始化
     * @param data 列表数据
     * @param extra 附带参数
     */
    ScrollviewMgr.prototype.init = function (data, extra) {
        var _this = this;
        if (extra)
            this._extra = extra;
        this._data = data;
        this._dataLen = this._data.length;
        this._list = [];
        this._itemNum = this.vertNum * this.horiNum;
        this._view.width = this.node.width;
        this._view.height = this.node.height;
        if (this._bg) {
            this._bg.width = this.node.width + 30;
            this._bg.height = this.node.height + 30;
        }
        this._initFunc();
        setTimeout(function () {
            if (_this.node)
                _this._scrollView.enabled = true;
        }, this._itemNum * this.mdelay);
        this._isInit = true;
    };
    /**
    * 初始化并设置起始位置
    * @param data 列表数据
    */
    ScrollviewMgr.prototype.initAndForceItem = function (data, offset) {
        this.init(data);
        this._scrollView.scrollToOffset(offset, 0.1);
    };
    /**
    * 动态刷新数据（列表回到起始点）
    * @param data 列表数据
    */
    ScrollviewMgr.prototype.dynamicRefresh = function (data) {
        this.init(data);
    };
    /**
     * 静态刷新数据
     * @param data 列表数据
     */
    ScrollviewMgr.prototype.staticRefresh = function (data, extra) {
        if (!this._isInit || this._dataLen > data.length) {
            this.init(data, extra);
            return;
        }
        ;
        if (extra)
            this._extra = extra;
        this._data = data;
        this._dataLen = this._data.length;
        if (this.LRSlide) {
            var horiNum = Math.ceil(this._dataLen / this.horiNum);
            var wid = (this._itemWidth + this.vertPading) * horiNum + this.leftSpace + this.rightSpace;
            this._content.width = wid;
        }
        else {
            var vertNum = Math.ceil(this._dataLen / this.vertNum);
            var hei = (this._itemHeight + this.horiPading) * vertNum + this.topSpace + this.downSpace;
            this._content.height = hei;
        }
        for (var i = 0; i < this.horiNum; i++) {
            for (var j = 0; j < this.vertNum; j++) {
                var item = cc.find(this._itemComName + "-" + i + "-" + j, this._content);
                var comname = item.name.split("-")[0];
                var tjCom = item.getComponent(comname);
                var index = item['m_itemId'];
                var itemData = this._data[index];
                if (itemData) {
                    item.active = true;
                    tjCom.init(itemData);
                }
                else {
                    item.active = false;
                }
            }
        }
    };
    ScrollviewMgr.prototype.move = function () {
        if (this.LRSlide) {
            var tempx = (this._itemWidth + this.vertPading);
            var x = this.mirror ? -tempx : tempx;
            cc.tween(this._content)
                .to(0.3, { x: x })
                .call(this.scrollMoveHorizontal.bind(this))
                .start();
        }
        else {
            var tempy = (this._itemHeight + this.horiPading);
            var y = this.mirror ? -tempy : tempy;
            cc.tween(this._content)
                .by(0.3, { y: y })
                .call(this.scrollMoveVertical.bind(this))
                .start();
        }
    };
    /**
     * 纵向滑动初始化函数
     */
    ScrollviewMgr.prototype.initVertical = function () {
        this._content.anchorX = 0;
        this._content.anchorY = this.mirror ? 0 : 1;
        this._content.width = this._view.width;
        this._content.x = -this._view.width / 2;
        this._content.height = (this._itemHeight + this.horiPading) * Math.ceil(this._dataLen / this.vertNum) + this.topSpace + this.downSpace;
        ;
        this._content.y = this.mirror ? -this._view.height / 2 : this._view.height / 2;
        this._lastPosY = this.mirror ? -this._content.y : this._content.y;
        this.forInitItem();
    };
    /**
     * 横向滑动初始化函数
     */
    ScrollviewMgr.prototype.initHorizontal = function () {
        this._content.anchorX = this.mirror ? 1 : 0;
        this._content.anchorY = 0;
        this._content.width = this._view.width;
        this._content.y = this._view.height / 2;
        this._content.width = (this._itemWidth + this.vertPading) * Math.ceil(this._dataLen / this.horiNum) + this.leftSpace + this.rightSpace;
        this._content.x = this.mirror ? this._view.width / 2 : -this._view.width / 2;
        this._lastPosX = this.mirror ? -this._content.x : this._content.x;
        this.forInitItem();
    };
    /**
     * 创建或者刷新列表节点
     */
    ScrollviewMgr.prototype.forInitItem = function () {
        var _this = this;
        for (var i = 0; i < this.horiNum; i++) {
            for (var j = 0; j < this.vertNum; j++) {
                var item = cc.find(this._itemComName + "-" + i + "-" + j, this._content);
                if (item)
                    item.active = false;
            }
        }
        var _loop_1 = function (i) {
            var _loop_2 = function (j) {
                if (this_1.mdelay > 0) {
                    var delay = (this_1.vertNum * i + (j)) * (this_1.mdelay);
                    setTimeout(function () {
                        if (_this.node.parent)
                            _this.initItemFunc(i, j);
                    }, delay * 1000);
                }
                else {
                    this_1.initItemFunc(i, j);
                }
            };
            for (var j = 0; j < this_1.vertNum; j++) {
                _loop_2(j);
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.horiNum; i++) {
            _loop_1(i);
        }
    };
    /**
     * 创建或者刷新列表节点
     */
    ScrollviewMgr.prototype.initItemFunc = function (i, j) {
        var index = i * this.vertNum + j;
        var item = cc.find(this._itemComName + "-" + i + "-" + j, this._content);
        if (!item) {
            item = cc.instantiate(this.item);
            this._content.addChild(item);
            item.name = this._itemComName + "-" + i + "-" + j;
            item.scale = this.mscale;
        }
        var comname = item.name.split("-")[0];
        var tjCom = item.getComponent(comname);
        var itemData = this._data[index];
        item['m_itemId'] = index;
        if (itemData) {
            item.active = true;
            tjCom.init(itemData, this._extra);
        }
        else {
            item.active = false;
        }
        if (this.LRSlide) {
            var tempx = j * (item.width + this.vertPading) + item.width / 2 + this.leftSpace;
            item.y = -(i * (item.height + this.horiPading) + item.height / 2 + this.topSpace);
            if (this.mirror) {
                item.x = -tempx;
            }
            else {
                item.x = tempx;
            }
        }
        else {
            item.x = j * (item.width + this.vertPading) + item.width / 2 + this.leftSpace;
            var tempy = (i * (item.height + this.horiPading) + item.height / 2 + this.topSpace);
            if (this.mirror) {
                item.y = tempy;
            }
            else {
                item.y = -tempy;
            }
        }
        this._list.push(item);
        if (tjCom.shapeChange) {
            tjCom.shapeChange();
            this._needShapeChange = true;
            ;
        }
    };
    /**
    * 横向滑动方向
    */
    ScrollviewMgr.prototype.scrollMoveHorizontal = function () {
        if (!this._content)
            return;
        if (this._lastPosX > this._content.x) {
            //方向往左
            this.scrollLeftHandler();
        }
        else if (this._lastPosX < this._content.x) {
            //方向往右
            this.scrollRightHandler();
        }
        this._lastPosX = this._content.x;
        if (this._needShapeChange)
            this.shapeChange();
    };
    /**
    * 纵向滑动方向
    */
    ScrollviewMgr.prototype.scrollMoveVertical = function () {
        if (!this._content)
            return;
        if (this._lastPosY > this._content.y) {
            //方向往下
            this.scrollDownHandler();
        }
        else if (this._lastPosY < this._content.y) {
            //方向往上
            this.scrollUpHandler();
        }
        this._lastPosY = this._content.y;
        if (this._needShapeChange)
            this.shapeChange();
    };
    /**
     * 向上滑
     */
    ScrollviewMgr.prototype.scrollUpHandler = function () {
        for (var i = 0, len = this._list.length; i < len; i++) {
            var item = this._list[i];
            var comname = item.name.split("-")[0];
            var tjCom = item.getComponent(comname);
            var finalY = item.y + this._content.y;
            if (finalY > (this._view.height / 2 + item.height)) {
                var m_itemId = item['m_itemId'];
                var index = m_itemId + this._itemNum;
                if (this.mirror)
                    index = m_itemId - this._itemNum;
                var itemData = this._data[index];
                item['m_itemId'] = index;
                if (itemData) {
                    item.active = true;
                    tjCom.init(itemData);
                }
                else {
                    item.active = false;
                }
                item.y -= this.horiNum * (item.height + this.horiPading);
            }
        }
    };
    /**
     * 向下滑
     */
    ScrollviewMgr.prototype.scrollDownHandler = function () {
        for (var i = 0, len = this._list.length; i < len; i++) {
            var item = this._list[i];
            var comname = item.name.split("-")[0];
            var tjCom = item.getComponent(comname);
            var finalY = item.y + this._content.y;
            if (finalY < -(this._view.height / 2 + item.height)) {
                var m_itemId = item['m_itemId'];
                var index = m_itemId - this._itemNum;
                if (this.mirror)
                    index = m_itemId + this._itemNum;
                var itemData = this._data[index];
                item['m_itemId'] = index;
                if (itemData) {
                    item.active = true;
                    tjCom.init(itemData);
                }
                else {
                    item.active = false;
                }
                item.y += this.horiNum * (item.height + this.horiPading);
            }
        }
    };
    /**
     * 向右滑
     */
    ScrollviewMgr.prototype.scrollRightHandler = function () {
        for (var i = 0, len = this._list.length; i < len; i++) {
            var item = this._list[i];
            var comname = item.name.split("-")[0];
            var tjCom = item.getComponent(comname);
            var finalX = item.x + this._content.x;
            if (finalX > (this._view.width / 2 + item.width)) {
                var m_itemId = item['m_itemId'];
                var index = m_itemId - this._itemNum;
                if (this.mirror)
                    index = m_itemId + this._itemNum;
                var itemData = this._data[index];
                item['m_itemId'] = index;
                if (itemData) {
                    item.active = true;
                    tjCom.init(itemData);
                }
                else {
                    item.active = false;
                }
                item.x -= this.vertNum * (item.width + this.vertPading);
            }
        }
    };
    /**
     * 向左滑
     */
    ScrollviewMgr.prototype.scrollLeftHandler = function () {
        for (var i = 0, len = this._list.length; i < len; i++) {
            var item = this._list[i];
            var comname = item.name.split("-")[0];
            var tjCom = item.getComponent(comname);
            var finalX = item.x + this._content.x;
            if (finalX < -(this._view.width / 2 + item.width)) {
                var m_itemId = item['m_itemId'];
                var index = m_itemId + this._itemNum;
                if (this.mirror)
                    index = m_itemId - this._itemNum;
                var itemData = this._data[index];
                item['m_itemId'] = index;
                if (itemData) {
                    item.active = true;
                    tjCom.init(itemData);
                }
                else {
                    item.active = false;
                }
                item.x += this.vertNum * (item.width + this.vertPading);
            }
        }
    };
    ScrollviewMgr.prototype.shapeChange = function () {
        for (var i = 0, len = this._list.length; i < len; i++) {
            var item = this._list[i];
            var comname = item.name.split("-")[0];
            var tjCom = item.getComponent(comname);
            tjCom.shapeChange();
        }
    };
    __decorate([
        property(cc.Prefab)
    ], ScrollviewMgr.prototype, "item", void 0);
    __decorate([
        property({ displayName: "行数", min: 1 })
    ], ScrollviewMgr.prototype, "horiNum", void 0);
    __decorate([
        property({ displayName: "列数", min: 1 })
    ], ScrollviewMgr.prototype, "vertNum", void 0);
    __decorate([
        property({ displayName: "上下间距" })
    ], ScrollviewMgr.prototype, "horiPading", void 0);
    __decorate([
        property({ displayName: "左右间距" })
    ], ScrollviewMgr.prototype, "vertPading", void 0);
    __decorate([
        property({ displayName: "左边界间距" })
    ], ScrollviewMgr.prototype, "leftSpace", void 0);
    __decorate([
        property({ displayName: "右边界间距" })
    ], ScrollviewMgr.prototype, "rightSpace", void 0);
    __decorate([
        property({ displayName: "上边界间距" })
    ], ScrollviewMgr.prototype, "topSpace", void 0);
    __decorate([
        property({ displayName: "下边界间距" })
    ], ScrollviewMgr.prototype, "downSpace", void 0);
    __decorate([
        property({ displayName: "ITEM缩放" })
    ], ScrollviewMgr.prototype, "mscale", void 0);
    __decorate([
        property({ displayName: "延时加载" })
    ], ScrollviewMgr.prototype, "mdelay", void 0);
    __decorate([
        property({ displayName: "镜像" })
    ], ScrollviewMgr.prototype, "mirror", void 0);
    __decorate([
        property({ displayName: "左右滑动" })
    ], ScrollviewMgr.prototype, "LRSlide", void 0);
    ScrollviewMgr = __decorate([
        ccclass
    ], ScrollviewMgr);
    return ScrollviewMgr;
}(cc.Component));
exports.default = ScrollviewMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcT3RoZXJcXFNjcm9sbHZpZXdNZ3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ00sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUM7SUFBMkMsaUNBQVk7SUFBdkQ7UUFBQSxxRUE0WkM7UUExWkcsVUFBSSxHQUFjLElBQUksQ0FBQztRQUV2QixhQUFPLEdBQVcsQ0FBQyxDQUFDO1FBRXBCLGFBQU8sR0FBVyxDQUFDLENBQUM7UUFFcEIsZ0JBQVUsR0FBVyxDQUFDLENBQUM7UUFFdkIsZ0JBQVUsR0FBVyxDQUFDLENBQUM7UUFFdkIsZUFBUyxHQUFXLENBQUMsQ0FBQztRQUV0QixnQkFBVSxHQUFXLENBQUMsQ0FBQztRQUV2QixjQUFRLEdBQVcsQ0FBQyxDQUFDO1FBRXJCLGVBQVMsR0FBVyxDQUFDLENBQUM7UUFFdEIsWUFBTSxHQUFXLENBQUMsQ0FBQztRQUVuQixZQUFNLEdBQVcsSUFBSSxDQUFDO1FBRXRCLFlBQU0sR0FBWSxLQUFLLENBQUM7UUFFeEIsYUFBTyxHQUFZLEtBQUssQ0FBQztRQUlqQixjQUFRLEdBQVcsQ0FBQyxDQUFDLENBQUEsUUFBUTtRQUM3QixlQUFTLEdBQVcsQ0FBQyxDQUFDLENBQUEsV0FBVztRQUNqQyxlQUFTLEdBQVcsQ0FBQyxDQUFDLENBQUEsV0FBVztRQUNqQyxrQkFBWSxHQUFXLEVBQUUsQ0FBQyxDQUFBLFFBQVE7UUFDbEMsaUJBQVcsR0FBVyxDQUFDLENBQUMsQ0FBQSxPQUFPO1FBQy9CLFlBQU0sR0FBUSxJQUFJLENBQUM7UUFDbkIsV0FBSyxHQUFVLEVBQUUsQ0FBQztRQUlsQixjQUFRLEdBQVcsQ0FBQyxDQUFDO1FBQ3JCLHNCQUFnQixHQUFZLEtBQUssQ0FBQzs7SUFtWDlDLENBQUM7SUFoWFUsOEJBQU0sR0FBYjtRQUNJLElBQUks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SSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFDRDs7T0FFRztJQUNPLHNDQUFjLEdBQXhCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3ZJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ08sbUNBQVcsR0FBckI7UUFB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QyxFQUFFLENBQUMsU0FBUyxHQTRadEQ7a0JBNVpvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcm9sbHZpZXdNZ3IgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIGl0ZW06IGNjLlByZWZhYiA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoeyBkaXNwbGF5TmFtZTogXCLooYzmlbBcIiwgbWluOiAxIH0pXHJcbiAgICBob3JpTnVtOiBudW1iZXIgPSAxO1xyXG4gICAgQHByb3BlcnR5KHsgZGlzcGxheU5hbWU6IFwi5YiX5pWwXCIsIG1pbjogMSB9KVxyXG4gICAgdmVydE51bTogbnVtYmVyID0gMTtcclxuICAgIEBwcm9wZXJ0eSh7IGRpc3BsYXlOYW1lOiBcIuS4iuS4i+mXtOi3nVwiIH0pXHJcbiAgICBob3JpUGFkaW5nOiBudW1iZXIgPSAwO1xyXG4gICAgQHByb3BlcnR5KHsgZGlzcGxheU5hbWU6IFwi5bem5Y+z6Ze06LedXCIgfSlcclxuICAgIHZlcnRQYWRpbmc6IG51bWJlciA9IDA7XHJcbiAgICBAcHJvcGVydHkoeyBkaXNwbGF5TmFtZTogXCLlt6bovrnnlYzpl7Tot51cIiB9KVxyXG4gICAgbGVmdFNwYWNlOiBudW1iZXIgPSAwO1xyXG4gICAgQHByb3BlcnR5KHsgZGlzcGxheU5hbWU6IFwi5Y+z6L6555WM6Ze06LedXCIgfSlcclxuICAgIHJpZ2h0U3BhY2U6IG51bWJlciA9IDA7XHJcbiAgICBAcHJvcGVydHkoeyBkaXNwbGF5TmFtZTogXCLkuIrovrnnlYzpl7Tot51cIiB9KVxyXG4gICAgdG9wU3BhY2U6IG51bWJlciA9IDA7XHJcbiAgICBAcHJvcGVydHkoeyBkaXNwbGF5TmFtZTogXCLkuIvovrnnlYzpl7Tot51cIiB9KVxyXG4gICAgZG93blNwYWNlOiBudW1iZXIgPSAwO1xyXG4gICAgQHByb3BlcnR5KHsgZGlzcGxheU5hbWU6IFwiSVRFTee8qeaUvlwiIH0pXHJcbiAgICBtc2NhbGU6IG51bWJlciA9IDE7XHJcbiAgICBAcHJvcGVydHkoeyBkaXNwbGF5TmFtZTogXCLlu7bml7bliqDovb1cIiB9KVxyXG4gICAgbWRlbGF5OiBudW1iZXIgPSAwLjAyO1xyXG4gICAgQHByb3BlcnR5KHsgZGlzcGxheU5hbWU6IFwi6ZWc5YOPXCIgfSlcclxuICAgIG1pcnJvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQHByb3BlcnR5KHsgZGlzcGxheU5hbWU6IFwi5bem5Y+z5ruR5YqoXCIgfSlcclxuICAgIExSU2xpZGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX3ZpZXc6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIF9jb250ZW50OiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBfZGF0YTogYW55Oy8v5YiX6KGo5pWw5o2uXHJcbiAgICBwcml2YXRlIF9pdGVtTnVtOiBudW1iZXIgPSAxOy8vaXRlbeaAu+aVsFxyXG4gICAgcHJpdmF0ZSBfbGFzdFBvc1k6IG51bWJlciA9IDA7Ly/lnZDmoIfovazmjaLkuYvlkI7nmoRZ5YC8XHJcbiAgICBwcml2YXRlIF9sYXN0UG9zWDogbnVtYmVyID0gMDsvL+WdkOagh+i9rOaNouS5i+WQjueahFjlgLxcclxuICAgIHByaXZhdGUgX2l0ZW1Db21OYW1lOiBzdHJpbmcgPSBcIlwiOy8v6aKE5Yi25L2T6ISa5pys5ZCNXHJcbiAgICBwcml2YXRlIF9pdGVtSGVpZ2h0OiBudW1iZXIgPSAwOy8v6aKE5Yi25L2T6auY5bqmXHJcbiAgICBwcml2YXRlIF9leHRyYTogYW55ID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2xpc3Q6IGFueVtdID0gW107XHJcbiAgICBwcml2YXRlIF9pdGVtV2lkdGg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3Njcm9sbFZpZXc6IGNjLlNjcm9sbFZpZXc7XHJcbiAgICBwcml2YXRlIF9pbml0RnVuYzogRnVuY3Rpb247XHJcbiAgICBwcml2YXRlIF9kYXRhTGVuOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfbmVlZFNoYXBlQ2hhbmdlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9pc0luaXQ6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9iZzogY2MuTm9kZTtcclxuICAgIHB1YmxpYyBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5fYmcgPSBjYy5maW5kKFwiYmdcIiwgdGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLl92aWV3ID0gY2MuZmluZChcInZpZXdcIiwgdGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLl9jb250ZW50ID0gY2MuZmluZChcImNvbnRlbnRcIiwgdGhpcy5fdmlldyk7XHJcbiAgICAgICAgLyrliJ3lp4vljJbmu5rliqjnu4Tku7bvvIzpu5jorqTlhbPpl60qL1xyXG4gICAgICAgIHRoaXMuX3Njcm9sbFZpZXcgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpO1xyXG4gICAgICAgIHRoaXMuX3Njcm9sbFZpZXcudmVydGljYWwgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zY3JvbGxWaWV3Lmhvcml6b250YWwgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zY3JvbGxWaWV3LmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIC8q6I635Y+W6aKE5Yi26ZW/44CB5a6944CB5ZCN5a2XICovXHJcbiAgICAgICAgbGV0IGl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLml0ZW0pO1xyXG4gICAgICAgIHRoaXMuX2l0ZW1Db21OYW1lID0gaXRlbS5uYW1lO1xyXG4gICAgICAgIHRoaXMuX2l0ZW1XaWR0aCA9IGl0ZW0ud2lkdGg7XHJcbiAgICAgICAgdGhpcy5faXRlbUhlaWdodCA9IGl0ZW0uaGVpZ2h0O1xyXG4gICAgICAgIGl0ZW0uZGVzdHJveSgpO1xyXG4gICAgICAgIC8q6K6+572u5ruR5Yqo5pa55ZCR77yM6YCJ5oup5Yid5aeL5YyW5Ye95pWw5ZKM5rua5Yqo5LqL5Lu25Ye95pWwKi9cclxuICAgICAgICBpZiAodGhpcy5MUlNsaWRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbFZpZXcuaG9yaXpvbnRhbCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX2luaXRGdW5jID0gdGhpcy5pbml0SG9yaXpvbnRhbDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLm9uKFwic2Nyb2xsaW5nXCIsIHRoaXMuc2Nyb2xsTW92ZUhvcml6b250YWwsIHRoaXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbFZpZXcudmVydGljYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9pbml0RnVuYyA9IHRoaXMuaW5pdFZlcnRpY2FsO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUub24oXCJzY3JvbGxpbmdcIiwgdGhpcy5zY3JvbGxNb3ZlVmVydGljYWwsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyWXHJcbiAgICAgKiBAcGFyYW0gZGF0YSDliJfooajmlbDmja5cclxuICAgICAqIEBwYXJhbSBleHRyYSDpmYTluKblj4LmlbBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGluaXQoZGF0YTogYW55LCBleHRyYT86IGFueSkge1xyXG4gICAgICAgIGlmIChleHRyYSkgdGhpcy5fZXh0cmEgPSBleHRyYTtcclxuICAgICAgICB0aGlzLl9kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLl9kYXRhTGVuID0gdGhpcy5fZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5fbGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2l0ZW1OdW0gPSB0aGlzLnZlcnROdW0gKiB0aGlzLmhvcmlOdW07XHJcbiAgICAgICAgdGhpcy5fdmlldy53aWR0aCA9IHRoaXMubm9kZS53aWR0aDtcclxuICAgICAgICB0aGlzLl92aWV3LmhlaWdodCA9IHRoaXMubm9kZS5oZWlnaHQ7XHJcbiAgICAgICAgaWYgKHRoaXMuX2JnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JnLndpZHRoID0gdGhpcy5ub2RlLndpZHRoICsgMzA7XHJcbiAgICAgICAgICAgIHRoaXMuX2JnLmhlaWdodCA9IHRoaXMubm9kZS5oZWlnaHQgKyAzMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5faW5pdEZ1bmMoKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubm9kZSkgdGhpcy5fc2Nyb2xsVmlldy5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB9LCB0aGlzLl9pdGVtTnVtICogdGhpcy5tZGVsYXkpO1xyXG4gICAgICAgIHRoaXMuX2lzSW5pdCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOWIneWni+WMluW5tuiuvue9rui1t+Wni+S9jee9rlxyXG4gICAgKiBAcGFyYW0gZGF0YSDliJfooajmlbDmja5cclxuICAgICovXHJcbiAgICBwdWJsaWMgaW5pdEFuZEZvcmNlSXRlbShkYXRhOiBhbnksIG9mZnNldDogY2MuVmVjMikge1xyXG4gICAgICAgIHRoaXMuaW5pdChkYXRhKTtcclxuICAgICAgICB0aGlzLl9zY3JvbGxWaWV3LnNjcm9sbFRvT2Zmc2V0KG9mZnNldCwgMC4xKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog5Yqo5oCB5Yi35paw5pWw5o2u77yI5YiX6KGo5Zue5Yiw6LW35aeL54K577yJXHJcbiAgICAqIEBwYXJhbSBkYXRhIOWIl+ihqOaVsOaNrlxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBkeW5hbWljUmVmcmVzaChkYXRhOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmluaXQoZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpnZnmgIHliLfmlrDmlbDmja5cclxuICAgICAqIEBwYXJhbSBkYXRhIOWIl+ihqOaVsOaNrlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljUmVmcmVzaChkYXRhOiBhbnksIGV4dHJhPzogYW55KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pc0luaXQgfHwgdGhpcy5fZGF0YUxlbiA+IGRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdChkYXRhLCBleHRyYSk7IHJldHVybjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChleHRyYSkgdGhpcy5fZXh0cmEgPSBleHRyYTtcclxuICAgICAgICB0aGlzLl9kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLl9kYXRhTGVuID0gdGhpcy5fZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgaWYgKHRoaXMuTFJTbGlkZSkge1xyXG4gICAgICAgICAgICBsZXQgaG9yaU51bSA9IE1hdGguY2VpbCh0aGlzLl9kYXRhTGVuIC8gdGhpcy5ob3JpTnVtKVxyXG4gICAgICAgICAgICBsZXQgd2lkID0gKHRoaXMuX2l0ZW1XaWR0aCArIHRoaXMudmVydFBhZGluZykgKiBob3JpTnVtICsgdGhpcy5sZWZ0U3BhY2UgKyB0aGlzLnJpZ2h0U3BhY2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbnRlbnQud2lkdGggPSB3aWQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHZlcnROdW0gPSBNYXRoLmNlaWwodGhpcy5fZGF0YUxlbiAvIHRoaXMudmVydE51bSlcclxuICAgICAgICAgICAgbGV0IGhlaSA9ICh0aGlzLl9pdGVtSGVpZ2h0ICsgdGhpcy5ob3JpUGFkaW5nKSAqIHZlcnROdW0gKyB0aGlzLnRvcFNwYWNlICsgdGhpcy5kb3duU3BhY2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbnRlbnQuaGVpZ2h0ID0gaGVpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaG9yaU51bTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy52ZXJ0TnVtOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gY2MuZmluZChgJHt0aGlzLl9pdGVtQ29tTmFtZX0tJHtpfS0ke2p9YCwgdGhpcy5fY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29tbmFtZSA9IGl0ZW0ubmFtZS5zcGxpdChcIi1cIilbMF07XHJcbiAgICAgICAgICAgICAgICBsZXQgdGpDb20gPSBpdGVtLmdldENvbXBvbmVudChjb21uYW1lKTtcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IGl0ZW1bJ21faXRlbUlkJ107XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbURhdGEgPSB0aGlzLl9kYXRhW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0akNvbS5pbml0KGl0ZW1EYXRhKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbW92ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5MUlNsaWRlKSB7XHJcbiAgICAgICAgICAgIGxldCB0ZW1weCA9ICh0aGlzLl9pdGVtV2lkdGggKyB0aGlzLnZlcnRQYWRpbmcpO1xyXG4gICAgICAgICAgICBsZXQgeCA9IHRoaXMubWlycm9yID8gLXRlbXB4IDogdGVtcHg7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuX2NvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAudG8oMC4zLCB7IHg6IHggfSlcclxuICAgICAgICAgICAgICAgIC5jYWxsKHRoaXMuc2Nyb2xsTW92ZUhvcml6b250YWwuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCB0ZW1weSA9ICh0aGlzLl9pdGVtSGVpZ2h0ICsgdGhpcy5ob3JpUGFkaW5nKTtcclxuICAgICAgICAgICAgbGV0IHkgPSB0aGlzLm1pcnJvciA/IC10ZW1weSA6IHRlbXB5O1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLl9jb250ZW50KVxyXG4gICAgICAgICAgICAgICAgLmJ5KDAuMywgeyB5OiB5IH0pXHJcbiAgICAgICAgICAgICAgICAuY2FsbCh0aGlzLnNjcm9sbE1vdmVWZXJ0aWNhbC5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOe6teWQkea7keWKqOWIneWni+WMluWHveaVsFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZlcnRpY2FsKCkge1xyXG4gICAgICAgIHRoaXMuX2NvbnRlbnQuYW5jaG9yWCA9IDA7XHJcbiAgICAgICAgdGhpcy5fY29udGVudC5hbmNob3JZID0gdGhpcy5taXJyb3IgPyAwIDogMTtcclxuICAgICAgICB0aGlzLl9jb250ZW50LndpZHRoID0gdGhpcy5fdmlldy53aWR0aDtcclxuICAgICAgICB0aGlzLl9jb250ZW50LnggPSAtdGhpcy5fdmlldy53aWR0aCAvIDI7XHJcbiAgICAgICAgdGhpcy5fY29udGVudC5oZWlnaHQgPSAodGhpcy5faXRlbUhlaWdodCArIHRoaXMuaG9yaVBhZGluZykgKiBNYXRoLmNlaWwodGhpcy5fZGF0YUxlbiAvIHRoaXMudmVydE51bSkgKyB0aGlzLnRvcFNwYWNlICsgdGhpcy5kb3duU3BhY2U7O1xyXG4gICAgICAgIHRoaXMuX2NvbnRlbnQueSA9IHRoaXMubWlycm9yID8gLXRoaXMuX3ZpZXcuaGVpZ2h0IC8gMiA6IHRoaXMuX3ZpZXcuaGVpZ2h0IC8gMjtcclxuICAgICAgICB0aGlzLl9sYXN0UG9zWSA9IHRoaXMubWlycm9yID8gLXRoaXMuX2NvbnRlbnQueSA6IHRoaXMuX2NvbnRlbnQueTtcclxuICAgICAgICB0aGlzLmZvckluaXRJdGVtKCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOaoquWQkea7keWKqOWIneWni+WMluWHveaVsFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgaW5pdEhvcml6b250YWwoKSB7XHJcbiAgICAgICAgdGhpcy5fY29udGVudC5hbmNob3JYID0gdGhpcy5taXJyb3IgPyAxIDogMDtcclxuICAgICAgICB0aGlzLl9jb250ZW50LmFuY2hvclkgPSAwO1xyXG4gICAgICAgIHRoaXMuX2NvbnRlbnQud2lkdGggPSB0aGlzLl92aWV3LndpZHRoO1xyXG4gICAgICAgIHRoaXMuX2NvbnRlbnQueSA9IHRoaXMuX3ZpZXcuaGVpZ2h0IC8gMjtcclxuICAgICAgICB0aGlzLl9jb250ZW50LndpZHRoID0gKHRoaXMuX2l0ZW1XaWR0aCArIHRoaXMudmVydFBhZGluZykgKiBNYXRoLmNlaWwodGhpcy5fZGF0YUxlbiAvIHRoaXMuaG9yaU51bSkgKyB0aGlzLmxlZnRTcGFjZSArIHRoaXMucmlnaHRTcGFjZTtcclxuICAgICAgICB0aGlzLl9jb250ZW50LnggPSB0aGlzLm1pcnJvciA/IHRoaXMuX3ZpZXcud2lkdGggLyAyIDogLXRoaXMuX3ZpZXcud2lkdGggLyAyO1xyXG4gICAgICAgIHRoaXMuX2xhc3RQb3NYID0gdGhpcy5taXJyb3IgPyAtdGhpcy5fY29udGVudC54IDogdGhpcy5fY29udGVudC54O1xyXG4gICAgICAgIHRoaXMuZm9ySW5pdEl0ZW0oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIm+W7uuaIluiAheWIt+aWsOWIl+ihqOiKgueCuVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZm9ySW5pdEl0ZW0oKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmhvcmlOdW07IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMudmVydE51bTsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGNjLmZpbmQoYCR7dGhpcy5faXRlbUNvbU5hbWV9LSR7aX0tJHtqfWAsIHRoaXMuX2NvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0pIGl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmhvcmlOdW07IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMudmVydE51bTsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tZGVsYXkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlbGF5ID0gKHRoaXMudmVydE51bSAqIGkgKyAoaikpICogKHRoaXMubWRlbGF5KTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZS5wYXJlbnQpIHRoaXMuaW5pdEl0ZW1GdW5jKGksIGopO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIGRlbGF5ICogMTAwMCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdEl0ZW1GdW5jKGksIGopO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yib5bu65oiW6ICF5Yi35paw5YiX6KGo6IqC54K5XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBpbml0SXRlbUZ1bmMoaTogbnVtYmVyLCBqOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgaW5kZXggPSBpICogdGhpcy52ZXJ0TnVtICsgajtcclxuICAgICAgICBsZXQgaXRlbSA9IGNjLmZpbmQoYCR7dGhpcy5faXRlbUNvbU5hbWV9LSR7aX0tJHtqfWAsIHRoaXMuX2NvbnRlbnQpO1xyXG4gICAgICAgIGlmICghaXRlbSkge1xyXG4gICAgICAgICAgICBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5pdGVtKTtcclxuICAgICAgICAgICAgdGhpcy5fY29udGVudC5hZGRDaGlsZChpdGVtKTtcclxuICAgICAgICAgICAgaXRlbS5uYW1lID0gYCR7dGhpcy5faXRlbUNvbU5hbWV9LSR7aX0tJHtqfWA7XHJcbiAgICAgICAgICAgIGl0ZW0uc2NhbGUgPSB0aGlzLm1zY2FsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNvbW5hbWUgPSBpdGVtLm5hbWUuc3BsaXQoXCItXCIpWzBdO1xyXG4gICAgICAgIGxldCB0akNvbSA9IGl0ZW0uZ2V0Q29tcG9uZW50KGNvbW5hbWUpO1xyXG4gICAgICAgIGxldCBpdGVtRGF0YSA9IHRoaXMuX2RhdGFbaW5kZXhdO1xyXG4gICAgICAgIGl0ZW1bJ21faXRlbUlkJ10gPSBpbmRleDtcclxuICAgICAgICBpZiAoaXRlbURhdGEpIHtcclxuICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0akNvbS5pbml0KGl0ZW1EYXRhLCB0aGlzLl9leHRyYSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuTFJTbGlkZSkge1xyXG4gICAgICAgICAgICBsZXQgdGVtcHggPSBqICogKGl0ZW0ud2lkdGggKyB0aGlzLnZlcnRQYWRpbmcpICsgaXRlbS53aWR0aCAvIDIgKyB0aGlzLmxlZnRTcGFjZTtcclxuICAgICAgICAgICAgaXRlbS55ID0gLShpICogKGl0ZW0uaGVpZ2h0ICsgdGhpcy5ob3JpUGFkaW5nKSArIGl0ZW0uaGVpZ2h0IC8gMiArIHRoaXMudG9wU3BhY2UpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5taXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0ueCA9IC10ZW1weDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0ueCA9IHRlbXB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaXRlbS54ID0gaiAqIChpdGVtLndpZHRoICsgdGhpcy52ZXJ0UGFkaW5nKSArIGl0ZW0ud2lkdGggLyAyICsgdGhpcy5sZWZ0U3BhY2U7XHJcbiAgICAgICAgICAgIGxldCB0ZW1weSA9IChpICogKGl0ZW0uaGVpZ2h0ICsgdGhpcy5ob3JpUGFkaW5nKSArIGl0ZW0uaGVpZ2h0IC8gMiArIHRoaXMudG9wU3BhY2UpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5taXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0ueSA9IHRlbXB5XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnkgPSAtdGVtcHk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIGlmICh0akNvbS5zaGFwZUNoYW5nZSkge1xyXG4gICAgICAgICAgICB0akNvbS5zaGFwZUNoYW5nZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9uZWVkU2hhcGVDaGFuZ2UgPSB0cnVlOztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOaoquWQkea7keWKqOaWueWQkVxyXG4gICAgKi9cclxuICAgIHByb3RlY3RlZCBzY3JvbGxNb3ZlSG9yaXpvbnRhbCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2NvbnRlbnQpIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy5fbGFzdFBvc1ggPiB0aGlzLl9jb250ZW50LngpIHtcclxuICAgICAgICAgICAgLy/mlrnlkJHlvoDlt6ZcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxMZWZ0SGFuZGxlcigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbGFzdFBvc1ggPCB0aGlzLl9jb250ZW50LngpIHtcclxuICAgICAgICAgICAgLy/mlrnlkJHlvoDlj7NcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxSaWdodEhhbmRsZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbGFzdFBvc1ggPSB0aGlzLl9jb250ZW50Lng7XHJcbiAgICAgICAgaWYgKHRoaXMuX25lZWRTaGFwZUNoYW5nZSkgdGhpcy5zaGFwZUNoYW5nZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDnurXlkJHmu5HliqjmlrnlkJFcclxuICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2Nyb2xsTW92ZVZlcnRpY2FsKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fY29udGVudCkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLl9sYXN0UG9zWSA+IHRoaXMuX2NvbnRlbnQueSkge1xyXG4gICAgICAgICAgICAvL+aWueWQkeW+gOS4i1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbERvd25IYW5kbGVyKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9sYXN0UG9zWSA8IHRoaXMuX2NvbnRlbnQueSkge1xyXG4gICAgICAgICAgICAvL+aWueWQkeW+gOS4ilxyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbFVwSGFuZGxlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sYXN0UG9zWSA9IHRoaXMuX2NvbnRlbnQueTtcclxuICAgICAgICBpZiAodGhpcy5fbmVlZFNoYXBlQ2hhbmdlKSB0aGlzLnNoYXBlQ2hhbmdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlkJHkuIrmu5FcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHNjcm9sbFVwSGFuZGxlcigpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5fbGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuX2xpc3RbaV07XHJcbiAgICAgICAgICAgIGxldCBjb21uYW1lID0gaXRlbS5uYW1lLnNwbGl0KFwiLVwiKVswXTtcclxuICAgICAgICAgICAgbGV0IHRqQ29tID0gaXRlbS5nZXRDb21wb25lbnQoY29tbmFtZSk7XHJcbiAgICAgICAgICAgIGxldCBmaW5hbFkgPSBpdGVtLnkgKyB0aGlzLl9jb250ZW50Lnk7XHJcbiAgICAgICAgICAgIGlmIChmaW5hbFkgPiAodGhpcy5fdmlldy5oZWlnaHQgLyAyICsgaXRlbS5oZWlnaHQpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbV9pdGVtSWQgPSBpdGVtWydtX2l0ZW1JZCddO1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gbV9pdGVtSWQgKyB0aGlzLl9pdGVtTnVtO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWlycm9yKSBpbmRleCA9IG1faXRlbUlkIC0gdGhpcy5faXRlbU51bTtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtRGF0YSA9IHRoaXMuX2RhdGFbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaXRlbVsnbV9pdGVtSWQnXSA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRqQ29tLmluaXQoaXRlbURhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaXRlbS55IC09IHRoaXMuaG9yaU51bSAqIChpdGVtLmhlaWdodCArIHRoaXMuaG9yaVBhZGluZyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ZCR5LiL5ruRXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzY3JvbGxEb3duSGFuZGxlcigpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5fbGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuX2xpc3RbaV07XHJcbiAgICAgICAgICAgIGxldCBjb21uYW1lID0gaXRlbS5uYW1lLnNwbGl0KFwiLVwiKVswXTtcclxuICAgICAgICAgICAgbGV0IHRqQ29tID0gaXRlbS5nZXRDb21wb25lbnQoY29tbmFtZSk7XHJcbiAgICAgICAgICAgIGxldCBmaW5hbFkgPSBpdGVtLnkgKyB0aGlzLl9jb250ZW50Lnk7XHJcbiAgICAgICAgICAgIGlmIChmaW5hbFkgPCAtKHRoaXMuX3ZpZXcuaGVpZ2h0IC8gMiArIGl0ZW0uaGVpZ2h0KSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1faXRlbUlkID0gaXRlbVsnbV9pdGVtSWQnXTtcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IG1faXRlbUlkIC0gdGhpcy5faXRlbU51bTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1pcnJvcikgaW5kZXggPSBtX2l0ZW1JZCArIHRoaXMuX2l0ZW1OdW07XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbURhdGEgPSB0aGlzLl9kYXRhW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGl0ZW1bJ21faXRlbUlkJ10gPSBpbmRleDtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0akNvbS5pbml0KGl0ZW1EYXRhKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGl0ZW0ueSArPSB0aGlzLmhvcmlOdW0gKiAoaXRlbS5oZWlnaHQgKyB0aGlzLmhvcmlQYWRpbmcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ZCR5Y+z5ruRXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzY3JvbGxSaWdodEhhbmRsZXIoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuX2xpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9saXN0W2ldO1xyXG4gICAgICAgICAgICBsZXQgY29tbmFtZSA9IGl0ZW0ubmFtZS5zcGxpdChcIi1cIilbMF07XHJcbiAgICAgICAgICAgIGxldCB0akNvbSA9IGl0ZW0uZ2V0Q29tcG9uZW50KGNvbW5hbWUpO1xyXG4gICAgICAgICAgICBsZXQgZmluYWxYID0gaXRlbS54ICsgdGhpcy5fY29udGVudC54O1xyXG4gICAgICAgICAgICBpZiAoZmluYWxYID4gKHRoaXMuX3ZpZXcud2lkdGggLyAyICsgaXRlbS53aWR0aCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtX2l0ZW1JZCA9IGl0ZW1bJ21faXRlbUlkJ107XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBtX2l0ZW1JZCAtIHRoaXMuX2l0ZW1OdW07XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5taXJyb3IpIGluZGV4ID0gbV9pdGVtSWQgKyB0aGlzLl9pdGVtTnVtO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1EYXRhID0gdGhpcy5fZGF0YVtpbmRleF07XHJcbiAgICAgICAgICAgICAgICBpdGVtWydtX2l0ZW1JZCddID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbURhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGpDb20uaW5pdChpdGVtRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpdGVtLnggLT0gdGhpcy52ZXJ0TnVtICogKGl0ZW0ud2lkdGggKyB0aGlzLnZlcnRQYWRpbmcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWQkeW3pua7kVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2Nyb2xsTGVmdEhhbmRsZXIoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuX2xpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9saXN0W2ldO1xyXG4gICAgICAgICAgICBsZXQgY29tbmFtZSA9IGl0ZW0ubmFtZS5zcGxpdChcIi1cIilbMF07XHJcbiAgICAgICAgICAgIGxldCB0akNvbSA9IGl0ZW0uZ2V0Q29tcG9uZW50KGNvbW5hbWUpO1xyXG4gICAgICAgICAgICBsZXQgZmluYWxYID0gaXRlbS54ICsgdGhpcy5fY29udGVudC54O1xyXG4gICAgICAgICAgICBpZiAoZmluYWxYIDwgLSh0aGlzLl92aWV3LndpZHRoIC8gMiArIGl0ZW0ud2lkdGgpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbV9pdGVtSWQgPSBpdGVtWydtX2l0ZW1JZCddO1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gbV9pdGVtSWQgKyB0aGlzLl9pdGVtTnVtO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWlycm9yKSBpbmRleCA9IG1faXRlbUlkIC0gdGhpcy5faXRlbU51bTtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtRGF0YSA9IHRoaXMuX2RhdGFbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaXRlbVsnbV9pdGVtSWQnXSA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRqQ29tLmluaXQoaXRlbURhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaXRlbS54ICs9IHRoaXMudmVydE51bSAqIChpdGVtLndpZHRoICsgdGhpcy52ZXJ0UGFkaW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHByaXZhdGUgc2hhcGVDaGFuZ2UoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuX2xpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9saXN0W2ldO1xyXG4gICAgICAgICAgICBsZXQgY29tbmFtZSA9IGl0ZW0ubmFtZS5zcGxpdChcIi1cIilbMF07XHJcbiAgICAgICAgICAgIGxldCB0akNvbSA9IGl0ZW0uZ2V0Q29tcG9uZW50KGNvbW5hbWUpO1xyXG4gICAgICAgICAgICB0akNvbS5zaGFwZUNoYW5nZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Other/Box.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3b824/YKCBO4oiWWSfw7Wot', 'Box');
// Scripts/Other/Box.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var condition_1 = require("../Main/condition");
var ResMgr_1 = require("../Main/ResMgr");
var summary_1 = require("../Main/summary");
var UserModel_1 = require("./UserModel");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Box = /** @class */ (function (_super) {
    __extends(Box, _super);
    function Box() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Box.prototype.init = function (data) {
        this.data = data;
        for (var i = 0; i < this.node.childrenCount; i++) {
            if (data[i]) {
                this.node.children[i].active = true;
                ResMgr_1.default.loadImage("skin/" + UserModel_1.default.instance.using + "/cj/Box_White", this.node.children[i].getComponent(cc.Sprite));
                if (condition_1.DEFAULT_CJ.ACJ.includes(data[i].id)) {
                    this.node.children[i].opacity = 255;
                    this.node.children[i].children[1].getComponent(cc.Label).string = data[i].name;
                    this.node.children[i].children[2].getComponent(cc.Label).string = data[i].description;
                }
                else {
                    this.node.children[i].opacity = 100;
                    if (data[i]["hide"] === 0) {
                        this.node.children[i].children[1].getComponent(cc.Label).string = data[i].name;
                        this.node.children[i].children[2].getComponent(cc.Label).string = data[i].description;
                    }
                    else {
                        this.node.children[i].children[1].getComponent(cc.Label).string = "？？？";
                        this.node.children[i].children[2].getComponent(cc.Label).string = "？？？";
                    }
                }
                this.node.children[i].color = summary_1.grades[data[i]["grade"]];
                if (UserModel_1.default.instance.using == 'skin0') {
                    this.node.children[i].children[1].color = cc.color(0, 0, 0);
                    this.node.children[i].children[2].color = cc.color(0, 0, 0);
                }
                else if (UserModel_1.default.instance.using == 'skin1') {
                    this.node.children[i].children[1].color = cc.color(255, 255, 255);
                    this.node.children[i].children[2].color = cc.color(255, 255, 255);
                }
                else if (UserModel_1.default.instance.using == 'skin2') {
                    this.node.children[i].children[1].color = cc.color(0, 0, 0);
                    this.node.children[i].children[2].color = cc.color(0, 0, 0);
                }
                else if (UserModel_1.default.instance.using == 'skin3') {
                    this.node.children[i].children[1].color = cc.color(0, 0, 0);
                    this.node.children[i].children[2].color = cc.color(0, 0, 0);
                }
            }
            else {
                this.node.children[i].active = false;
            }
        }
    };
    Box = __decorate([
        ccclass
    ], Box);
    return Box;
}(cc.Component));
exports.default = Box;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcT3RoZXJcXEJveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBK0M7QUFDL0MseUNBQW9DO0FBQ3BDLDJDQUF5QztBQUN6Qyx5Q0FBb0M7QUFFOUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBaUMsdUJBQVk7SUFBN0M7O0lBMkNBLENBQUM7SUF2Q0csa0JBQUksR0FBSixVQUFLLElBQUk7UUFDTCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDOUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDcEMsZ0JBQU0sQ0FBQyxTQUFTLENBQUMsVUFBUSxtQkFBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLGtCQUFlLEVBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO2dCQUNqSCxJQUFJLHNCQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUE7b0JBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEs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QUciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBERUZBVUxUX0NKIH0gZnJvbSBcIi4uL01haW4vY29uZGl0aW9uXCI7XHJcbmltcG9ydCBSZXNNZ3IgZnJvbSBcIi4uL01haW4vUmVzTWdyXCI7XHJcbmltcG9ydCB7IGdyYWRlcyB9IGZyb20gXCIuLi9NYWluL3N1bW1hcnlcIjtcclxuaW1wb3J0IFVzZXJNb2RlbCBmcm9tIFwiLi9Vc2VyTW9kZWxcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb3ggZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIGRhdGE6IGFueTtcclxuXHJcbiAgICBpbml0KGRhdGEpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ub2RlLmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZGF0YVtpXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBSZXNNZ3IubG9hZEltYWdlKGBza2luLyR7VXNlck1vZGVsLmluc3RhbmNlLnVzaW5nfS9jai9Cb3hfV2hpdGVgLCAgdGhpcy5ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpKVxyXG4gICAgICAgICAgICAgICAgaWYgKERFRkFVTFRfQ0ouQUNKLmluY2x1ZGVzKGRhdGFbaV0uaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuW2ldLm9wYWNpdHkgPSAyNTVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5baV0uY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBkYXRhW2ldLm5hbWVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5baV0uY2hpbGRyZW5bMl0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBkYXRhW2ldLmRlc2NyaXB0aW9uXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlbltpXS5vcGFjaXR5ID0gMTAwXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbaV1bXCJoaWRlXCJdID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlbltpXS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGRhdGFbaV0ubmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5baV0uY2hpbGRyZW5bMl0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBkYXRhW2ldLmRlc2NyaXB0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuW2ldLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCLvvJ/vvJ/vvJ9cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuW2ldLmNoaWxkcmVuWzJdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCLvvJ/vvJ/vvJ9cIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5baV0uY29sb3IgPSBncmFkZXNbZGF0YVtpXVtcImdyYWRlXCJdXVxyXG4gICAgICAgICAgICAgICAgaWYoVXNlck1vZGVsLmluc3RhbmNlLnVzaW5nPT0nc2tpbjAnKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5baV0uY2hpbGRyZW5bMV0uY29sb3IgPSBjYy5jb2xvcigwLDAsMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5baV0uY2hpbGRyZW5bMl0uY29sb3IgPSBjYy5jb2xvcigwLDAsMClcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKFVzZXJNb2RlbC5pbnN0YW5jZS51c2luZz09J3NraW4xJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuW2ldLmNoaWxkcmVuWzFdLmNvbG9yID0gY2MuY29sb3IoMjU1LDI1NSwyNTUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuW2ldLmNoaWxkcmVuWzJdLmNvbG9yID0gY2MuY29sb3IoMjU1LDI1NSwyNTUpXHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihVc2VyTW9kZWwuaW5zdGFuY2UudXNpbmc9PSdza2luMicpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlbltpXS5jaGlsZHJlblsxXS5jb2xvciA9IGNjLmNvbG9yKDAsMCwwKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlbltpXS5jaGlsZHJlblsyXS5jb2xvciA9IGNjLmNvbG9yKDAsMCwwKVxyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoVXNlck1vZGVsLmluc3RhbmNlLnVzaW5nPT0nc2tpbjMnKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5baV0uY2hpbGRyZW5bMV0uY29sb3IgPSBjYy5jb2xvcigwLDAsMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5baV0uY2hpbGRyZW5bMl0uY29sb3IgPSBjYy5jb2xvcigwLDAsMClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlbltpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/AD/Global.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '37ad4KqjDxBbbZvd0ixs0Fj', 'Global');
// Scripts/AD/Global.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//全局变量
var Global = /** @class */ (function () {
    function Global() {
    }
    //广告刷新的间隔时间
    Global.gapTime = 0;
    //是否有广告
    Global.isNativeAD = false;
    //是否点击到互推按钮
    Global.isTouchHuTui = false;
    //banner是打开还是关闭状态
    Global.BannerActive = false;
    //第一次进入游戏，60后开启广告刷新
    Global.firstPlayerCD = 60;
    Global.isShow = false;
    Global.isInter = false;
    Global.isStop = true;
    Global.vivoNum = 0;
    Global.cdTime = 0;
    Global.isDouyin = false;
    Global.isPause = false;
    Global.isFirstEnter = false;
    Global.isFirstEnterCJ = true;
    Global.isNewUser = true; //是否新玩家
    return Global;
}());
exports.default = Global;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQURcXEdsb2JhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLE1BQU07QUFDTjtJQUFBO0lBNkNBLENBQUM7SUExQ0ksV0FBVztJQUNHLGNBQU8sR0FBVyxDQUFDLENBQUM7SUFFbEMsT0FBTztJQUNPLGlCQUFVLEdBQVksS0FBSyxDQUFBO0lBS3pDLFdBQVc7SUFDRyxtQkFBWSxHQUFZLEtBQUssQ0FBQTtJQUUzQyxpQkFBaUI7SUFDSCxtQkFBWSxHQUFZLEtBQUssQ0FBQTtJQUUzQyxtQkFBbUI7SUFDTCxvQkFBYSxHQUFXLEVBQUUsQ0FBQTtJQUUxQixhQUFNLEdBQVksS0FBSyxDQUFDO0lBRXhCLGNBQU8sR0FBWSxLQUFLLENBQUM7SUFFekIsYUFBTSxHQUFZLElBQUksQ0FBQztJQUV2QixjQUFPLEdBQVcsQ0FBQyxDQUFDO0lBT3BCLGFBQU0sR0FBVyxDQUFDLENBQUM7SUFFbkIsZUFBUSxHQUFZLEtBQUssQ0FBQztJQUUxQixjQUFPLEdBQVksS0FBSyxDQUFBO0lBRXhCLG1CQUFZLEdBQVksS0FBSyxDQUFBO0lBQzdCLHFCQUFjLEdBQVksSUFBSSxDQUFBO0lBRTlCLGdCQUFTLEdBQVksSUFBSSxDQUFBLENBQU0sT0FBTztJQUV6RCxhQUFDO0NBN0NELEFBNkNDLElBQUE7a0JBN0NvQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFEX1JPT1QgZnJvbSBcIi4vQURfUk9PVFwiO1xyXG5pbXBvcnQgUGxhdGZvcm1CYXNlIGZyb20gXCIuL1BsYXRmb3JtQmFzZVwiO1xyXG5cclxuLy/lhajlsYDlj5jph49cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2xvYmFsIHtcclxuICAgICBwdWJsaWMgc3RhdGljIHBsYXRmb3JtOiBQbGF0Zm9ybUJhc2U7XHJcblxyXG4gICAgIC8v5bm/5ZGK5Yi35paw55qE6Ze06ZqU5pe26Ze0XHJcbiAgICAgcHVibGljIHN0YXRpYyBnYXBUaW1lOiBudW1iZXIgPSAwO1xyXG5cclxuICAgICAvL+aYr+WQpuacieW5v+WRilxyXG4gICAgIHB1YmxpYyBzdGF0aWMgaXNOYXRpdmVBRDogYm9vbGVhbiA9IGZhbHNlXHJcblxyXG4gICAgIC8v5bm/5ZGK5bi46am76IqC54K5XHJcbiAgICAgcHVibGljIHN0YXRpYyBBRF9Sb290Tm9kZTogQURfUk9PVFxyXG5cclxuICAgICAvL+aYr+WQpueCueWHu+WIsOS6kuaOqOaMiemSrlxyXG4gICAgIHB1YmxpYyBzdGF0aWMgaXNUb3VjaEh1VHVpOiBib29sZWFuID0gZmFsc2VcclxuXHJcbiAgICAgLy9iYW5uZXLmmK/miZPlvIDov5jmmK/lhbPpl63nirbmgIFcclxuICAgICBwdWJsaWMgc3RhdGljIEJhbm5lckFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlXHJcblxyXG4gICAgIC8v56ys5LiA5qyh6L+b5YWl5ri45oiP77yMNjDlkI7lvIDlkK/lub/lkYrliLfmlrBcclxuICAgICBwdWJsaWMgc3RhdGljIGZpcnN0UGxheWVyQ0Q6IG51bWJlciA9IDYwXHJcblxyXG4gICAgIHB1YmxpYyBzdGF0aWMgaXNTaG93OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgIHB1YmxpYyBzdGF0aWMgaXNJbnRlcjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICBwdWJsaWMgc3RhdGljIGlzU3RvcDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgIHB1YmxpYyBzdGF0aWMgdml2b051bTogbnVtYmVyID0gMDtcclxuXHJcbiAgICAgcHVibGljIHN0YXRpYyByYW5kb21JY29uOiBhbnk7XHJcbiAgICAgcHVibGljIHN0YXRpYyByYW5kb21JY29uMTogYW55O1xyXG5cclxuICAgICBwdWJsaWMgc3RhdGljIHRva2VuOiBhbnk7XHJcblxyXG4gICAgIHB1YmxpYyBzdGF0aWMgY2RUaW1lOiBudW1iZXIgPSAwO1xyXG5cclxuICAgICBwdWJsaWMgc3RhdGljIGlzRG91eWluOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgIHB1YmxpYyBzdGF0aWMgaXNQYXVzZTogYm9vbGVhbiA9IGZhbHNlXHJcblxyXG4gICAgIHB1YmxpYyBzdGF0aWMgaXNGaXJzdEVudGVyOiBib29sZWFuID0gZmFsc2VcclxuICAgICBwdWJsaWMgc3RhdGljIGlzRmlyc3RFbnRlckNKOiBib29sZWFuID0gdHJ1ZVxyXG5cclxuICAgICBwdWJsaWMgc3RhdGljIGlzTmV3VXNlcjogYm9vbGVhbiA9IHRydWUgICAgICAvL+aYr+WQpuaWsOeOqeWutlxyXG5cclxufVxyXG5cclxuIl19
//------QC-SOURCE-SPLIT------
