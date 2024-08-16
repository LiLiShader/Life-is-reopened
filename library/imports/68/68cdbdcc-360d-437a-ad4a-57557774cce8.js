"use strict";
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