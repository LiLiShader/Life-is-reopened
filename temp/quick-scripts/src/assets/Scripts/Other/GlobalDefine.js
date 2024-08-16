"use strict";
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