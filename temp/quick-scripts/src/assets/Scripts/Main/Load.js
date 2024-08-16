"use strict";
cc._RF.push(module, 'a2584wLSlJFirFj84oKYr4L', 'Load');
// Scripts/Main/Load.ts

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
var SaveUtils_1 = require("../Other/SaveUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Load = /** @class */ (function (_super) {
    __extends(Load, _super);
    function Load() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.progressBar = null;
        _this.time = 0;
        _this.flag = true;
        return _this;
    }
    Load.prototype.onLoad = function () {
        SaveUtils_1.default.inst.getLocalData();
    };
    Load.prototype.update = function (dt) {
        this.time += 1 / 60;
        if (this.time >= 2 && this.flag) {
            cc.director.loadScene('LifeRebirth', function () {
            });
            this.flag = false;
        }
        var num;
        if (this.time / 2 >= 1) {
            num = 1;
        }
        else {
            num = this.time / 2;
        }
        this.progressBar.node.children[0].width = 562 * num;
    };
    __decorate([
        property(cc.ProgressBar)
    ], Load.prototype, "progressBar", void 0);
    Load = __decorate([
        ccclass
    ], Load);
    return Load;
}(cc.Component));
exports.default = Load;

cc._RF.pop();