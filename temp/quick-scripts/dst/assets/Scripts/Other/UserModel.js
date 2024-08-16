
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