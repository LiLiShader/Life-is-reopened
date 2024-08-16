
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