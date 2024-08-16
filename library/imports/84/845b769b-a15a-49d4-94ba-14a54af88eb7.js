"use strict";
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