
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/AD/AD_ROOT.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5d89defUmlB6btRzoHiP5wt', 'AD_ROOT');
// Scripts/AD/AD_ROOT.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("./Global");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AD_ROOT = /** @class */ (function (_super) {
    __extends(AD_ROOT, _super);
    function AD_ROOT() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ADflag = false;
        _this.timeId = 0;
        return _this;
    }
    AD_ROOT.prototype.onLoad = function () {
        Global_1.default.AD_RootNode = this;
        this.ADflag = false;
    };
    AD_ROOT = __decorate([
        ccclass
    ], AD_ROOT);
    return AD_ROOT;
}(cc.Component));
exports.default = AD_ROOT;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQURcXEFEX1JPT1QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQThCO0FBRXhCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXFDLDJCQUFZO0lBQWpEO1FBQUEscUVBYUM7UUFYRyxZQUFNLEdBQVksS0FBSyxDQUFBO1FBRXZCLFlBQU0sR0FBVyxDQUFDLENBQUM7O0lBU3ZCLENBQUM7SUFQRyx3QkFBTSxHQUFOO1FBRUksZ0JBQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFBO1FBRXpCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO0lBQ3ZCLENBQUM7SUFYZ0IsT0FBTztRQUQzQixPQUFPO09BQ2EsT0FBTyxDQWEzQjtJQUFELGNBQUM7Q0FiRCxBQWFDLENBYm9DLEVBQUUsQ0FBQyxTQUFTLEdBYWhEO2tCQWJvQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdsb2JhbCBmcm9tIFwiLi9HbG9iYWxcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBRF9ST09UIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBBRGZsYWc6IGJvb2xlYW4gPSBmYWxzZVxyXG5cclxuICAgIHRpbWVJZDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcblxyXG4gICAgICAgIEdsb2JhbC5BRF9Sb290Tm9kZSA9IHRoaXNcclxuXHJcbiAgICAgICAgdGhpcy5BRGZsYWcgPSBmYWxzZVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=