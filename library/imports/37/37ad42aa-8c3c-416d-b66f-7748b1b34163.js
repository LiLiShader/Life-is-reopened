"use strict";
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