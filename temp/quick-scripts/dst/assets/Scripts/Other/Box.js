
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Other/Box.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3b824/YKCBO4oiWWSfw7Wot', 'Box');
// Scripts/Other/Box.ts

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
var condition_1 = require("../Main/condition");
var ResMgr_1 = require("../Main/ResMgr");
var summary_1 = require("../Main/summary");
var UserModel_1 = require("./UserModel");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Box = /** @class */ (function (_super) {
    __extends(Box, _super);
    function Box() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Box.prototype.init = function (data) {
        this.data = data;
        for (var i = 0; i < this.node.childrenCount; i++) {
            if (data[i]) {
                this.node.children[i].active = true;
                ResMgr_1.default.loadImage("skin/" + UserModel_1.default.instance.using + "/cj/Box_White", this.node.children[i].getComponent(cc.Sprite));
                if (condition_1.DEFAULT_CJ.ACJ.includes(data[i].id)) {
                    this.node.children[i].opacity = 255;
                    this.node.children[i].children[1].getComponent(cc.Label).string = data[i].name;
                    this.node.children[i].children[2].getComponent(cc.Label).string = data[i].description;
                }
                else {
                    this.node.children[i].opacity = 100;
                    if (data[i]["hide"] === 0) {
                        this.node.children[i].children[1].getComponent(cc.Label).string = data[i].name;
                        this.node.children[i].children[2].getComponent(cc.Label).string = data[i].description;
                    }
                    else {
                        this.node.children[i].children[1].getComponent(cc.Label).string = "？？？";
                        this.node.children[i].children[2].getComponent(cc.Label).string = "？？？";
                    }
                }
                this.node.children[i].color = summary_1.grades[data[i]["grade"]];
                if (UserModel_1.default.instance.using == 'skin0') {
                    this.node.children[i].children[1].color = cc.color(0, 0, 0);
                    this.node.children[i].children[2].color = cc.color(0, 0, 0);
                }
                else if (UserModel_1.default.instance.using == 'skin1') {
                    this.node.children[i].children[1].color = cc.color(255, 255, 255);
                    this.node.children[i].children[2].color = cc.color(255, 255, 255);
                }
                else if (UserModel_1.default.instance.using == 'skin2') {
                    this.node.children[i].children[1].color = cc.color(0, 0, 0);
                    this.node.children[i].children[2].color = cc.color(0, 0, 0);
                }
                else if (UserModel_1.default.instance.using == 'skin3') {
                    this.node.children[i].children[1].color = cc.color(0, 0, 0);
                    this.node.children[i].children[2].color = cc.color(0, 0, 0);
                }
            }
            else {
                this.node.children[i].active = false;
            }
        }
    };
    Box = __decorate([
        ccclass
    ], Box);
    return Box;
}(cc.Component));
exports.default = Box;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcT3RoZXJcXEJveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBK0M7QUFDL0MseUNBQW9DO0FBQ3BDLDJDQUF5QztBQUN6Qyx5Q0FBb0M7QUFFOUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBaUMsdUJBQVk7SUFBN0M7O0lBMkNBLENBQUM7SUF2Q0csa0JBQUksR0FBSixVQUFLLElBQUk7UUFDTCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDOUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDcEMsZ0JBQU0sQ0FBQyxTQUFTLENBQUMsVUFBUSxtQkFBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLGtCQUFlLEVBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO2dCQUNqSCxJQUFJLHNCQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUE7b0JBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEs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QUciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBERUZBVUxUX0NKIH0gZnJvbSBcIi4uL01haW4vY29uZGl0aW9uXCI7XHJcbmltcG9ydCBSZXNNZ3IgZnJvbSBcIi4uL01haW4vUmVzTWdyXCI7XHJcbmltcG9ydCB7IGdyYWRlcyB9IGZyb20gXCIuLi9NYWluL3N1bW1hcnlcIjtcclxuaW1wb3J0IFVzZXJNb2RlbCBmcm9tIFwiLi9Vc2VyTW9kZWxcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb3ggZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIGRhdGE6IGFueTtcclxuXHJcbiAgICBpbml0KGRhdGEpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ub2RlLmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZGF0YVtpXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBSZXNNZ3IubG9hZEltYWdlKGBza2luLyR7VXNlck1vZGVsLmluc3RhbmNlLnVzaW5nfS9jai9Cb3hfV2hpdGVgLCAgdGhpcy5ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpKVxyXG4gICAgICAgICAgICAgICAgaWYgKERFRkFVTFRfQ0ouQUNKLmluY2x1ZGVzKGRhdGFbaV0uaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuW2ldLm9wYWNpdHkgPSAyNTVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5baV0uY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBkYXRhW2ldLm5hbWVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5baV0uY2hpbGRyZW5bMl0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBkYXRhW2ldLmRlc2NyaXB0aW9uXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlbltpXS5vcGFjaXR5ID0gMTAwXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbaV1bXCJoaWRlXCJdID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlbltpXS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGRhdGFbaV0ubmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5baV0uY2hpbGRyZW5bMl0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBkYXRhW2ldLmRlc2NyaXB0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuW2ldLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCLvvJ/vvJ/vvJ9cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuW2ldLmNoaWxkcmVuWzJdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCLvvJ/vvJ/vvJ9cIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5baV0uY29sb3IgPSBncmFkZXNbZGF0YVtpXVtcImdyYWRlXCJdXVxyXG4gICAgICAgICAgICAgICAgaWYoVXNlck1vZGVsLmluc3RhbmNlLnVzaW5nPT0nc2tpbjAnKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5baV0uY2hpbGRyZW5bMV0uY29sb3IgPSBjYy5jb2xvcigwLDAsMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5baV0uY2hpbGRyZW5bMl0uY29sb3IgPSBjYy5jb2xvcigwLDAsMClcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKFVzZXJNb2RlbC5pbnN0YW5jZS51c2luZz09J3NraW4xJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuW2ldLmNoaWxkcmVuWzFdLmNvbG9yID0gY2MuY29sb3IoMjU1LDI1NSwyNTUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuW2ldLmNoaWxkcmVuWzJdLmNvbG9yID0gY2MuY29sb3IoMjU1LDI1NSwyNTUpXHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihVc2VyTW9kZWwuaW5zdGFuY2UudXNpbmc9PSdza2luMicpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlbltpXS5jaGlsZHJlblsxXS5jb2xvciA9IGNjLmNvbG9yKDAsMCwwKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlbltpXS5jaGlsZHJlblsyXS5jb2xvciA9IGNjLmNvbG9yKDAsMCwwKVxyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoVXNlck1vZGVsLmluc3RhbmNlLnVzaW5nPT0nc2tpbjMnKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5baV0uY2hpbGRyZW5bMV0uY29sb3IgPSBjYy5jb2xvcigwLDAsMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5baV0uY2hpbGRyZW5bMl0uY29sb3IgPSBjYy5jb2xvcigwLDAsMClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlbltpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=