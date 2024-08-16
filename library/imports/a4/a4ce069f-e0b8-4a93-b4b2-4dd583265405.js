"use strict";
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