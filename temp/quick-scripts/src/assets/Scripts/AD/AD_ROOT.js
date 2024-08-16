"use strict";
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