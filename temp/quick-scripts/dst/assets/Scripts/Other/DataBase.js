
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