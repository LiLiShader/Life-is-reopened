
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Main/Load.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWFpblxcTG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBMkM7QUFFckMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBa0Msd0JBQVk7SUFBOUM7UUFBQSxxRUE2QkM7UUExQkcsaUJBQVcsR0FBbUIsSUFBSSxDQUFDO1FBRTNCLFVBQUksR0FBVyxDQUFDLENBQUE7UUFDaEIsVUFBSSxHQUFZLElBQUksQ0FBQTs7SUF1QmhDLENBQUM7SUFwQkcscUJBQU0sR0FBTjtRQUNJLG1CQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFBO0lBQ2pDLENBQUM7SUFFRCxxQkFBTSxHQUFOLFVBQU8sRUFBRTtRQUNMLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtRQUNuQixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDN0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFO1lBRXJDLENBQUMsQ0FBQyxDQUFBO1lBQ0YsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUE7U0FDcEI7UUFDRCxJQUFJLEdBQUcsQ0FBQztRQUNSLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3BCLEdBQUcsR0FBRyxDQUFDLENBQUE7U0FDVjthQUFNO1lBQ0gsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFBO1NBQ3RCO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFBO0lBQ3ZELENBQUM7SUF6QkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzs2Q0FDVTtJQUhsQixJQUFJO1FBRHhCLE9BQU87T0FDYSxJQUFJLENBNkJ4QjtJQUFELFdBQUM7Q0E3QkQsQUE2QkMsQ0E3QmlDLEVBQUUsQ0FBQyxTQUFTLEdBNkI3QztrQkE3Qm9CLElBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2F2ZVV0aWxzIGZyb20gXCIuLi9PdGhlci9TYXZlVXRpbHNcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJvZ3Jlc3NCYXIpXHJcbiAgICBwcm9ncmVzc0JhcjogY2MuUHJvZ3Jlc3NCYXIgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgdGltZTogbnVtYmVyID0gMFxyXG4gICAgcHJpdmF0ZSBmbGFnOiBib29sZWFuID0gdHJ1ZVxyXG4gICAgcHJvdG9jb2w6IGNjLk5vZGU7XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIFNhdmVVdGlscy5pbnN0LmdldExvY2FsRGF0YSgpXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgdGhpcy50aW1lICs9IDEgLyA2MFxyXG4gICAgICAgIGlmICh0aGlzLnRpbWUgPj0gMiAmJiB0aGlzLmZsYWcpIHtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdMaWZlUmViaXJ0aCcsICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMuZmxhZyA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBudW07XHJcbiAgICAgICAgaWYgKHRoaXMudGltZSAvIDIgPj0gMSkge1xyXG4gICAgICAgICAgICBudW0gPSAxXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbnVtID0gdGhpcy50aW1lIC8gMlxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnByb2dyZXNzQmFyLm5vZGUuY2hpbGRyZW5bMF0ud2lkdGggPSA1NjIgKiBudW1cclxuICAgIH1cclxufVxyXG4iXX0=