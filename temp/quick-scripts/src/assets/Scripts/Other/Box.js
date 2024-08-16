"use strict";
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