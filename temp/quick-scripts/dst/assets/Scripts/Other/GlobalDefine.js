
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