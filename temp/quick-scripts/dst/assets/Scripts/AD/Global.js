
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