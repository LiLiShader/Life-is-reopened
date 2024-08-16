"use strict";
cc._RF.push(module, '8c56duKs2ZPJ6VxBqmkAha3', 'ScrollviewMgr');
// Scripts/Other/ScrollviewMgr.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ScrollviewMgr = /** @class */ (function (_super) {
    __extends(ScrollviewMgr, _super);
    function ScrollviewMgr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.item = null;
        _this.horiNum = 1;
        _this.vertNum = 1;
        _this.horiPading = 0;
        _this.vertPading = 0;
        _this.leftSpace = 0;
        _this.rightSpace = 0;
        _this.topSpace = 0;
        _this.downSpace = 0;
        _this.mscale = 1;
        _this.mdelay = 0.02;
        _this.mirror = false;
        _this.LRSlide = false;
        _this._itemNum = 1; //item总数
        _this._lastPosY = 0; //坐标转换之后的Y值
        _this._lastPosX = 0; //坐标转换之后的X值
        _this._itemComName = ""; //预制体脚本名
        _this._itemHeight = 0; //预制体高度
        _this._extra = null;
        _this._list = [];
        _this._dataLen = 0;
        _this._needShapeChange = false;
        return _this;
    }
    ScrollviewMgr.prototype.onLoad = function () {
        this._bg = cc.find("bg", this.node);
        this._view = cc.find("view", this.node);
        this._content = cc.find("content", this._view);
        /*初始化滚动组件，默认关闭*/
        this._scrollView = this.node.getComponent(cc.ScrollView);
        this._scrollView.vertical = false;
        this._scrollView.horizontal = false;
        this._scrollView.enabled = true;
        /*获取预制长、宽、名字 */
        var item = cc.instantiate(this.item);
        this._itemComName = item.name;
        this._itemWidth = item.width;
        this._itemHeight = item.height;
        item.destroy();
        /*设置滑动方向，选择初始化函数和滚动事件函数*/
        if (this.LRSlide) {
            this._scrollView.horizontal = true;
            this._initFunc = this.initHorizontal;
            this.node.on("scrolling", this.scrollMoveHorizontal, this);
        }
        else {
            this._scrollView.vertical = true;
            this._initFunc = this.initVertical;
            this.node.on("scrolling", this.scrollMoveVertical, this);
        }
    };
    /**
     * 初始化
     * @param data 列表数据
     * @param extra 附带参数
     */
    ScrollviewMgr.prototype.init = function (data, extra) {
        var _this = this;
        if (extra)
            this._extra = extra;
        this._data = data;
        this._dataLen = this._data.length;
        this._list = [];
        this._itemNum = this.vertNum * this.horiNum;
        this._view.width = this.node.width;
        this._view.height = this.node.height;
        if (this._bg) {
            this._bg.width = this.node.width + 30;
            this._bg.height = this.node.height + 30;
        }
        this._initFunc();
        setTimeout(function () {
            if (_this.node)
                _this._scrollView.enabled = true;
        }, this._itemNum * this.mdelay);
        this._isInit = true;
    };
    /**
    * 初始化并设置起始位置
    * @param data 列表数据
    */
    ScrollviewMgr.prototype.initAndForceItem = function (data, offset) {
        this.init(data);
        this._scrollView.scrollToOffset(offset, 0.1);
    };
    /**
    * 动态刷新数据（列表回到起始点）
    * @param data 列表数据
    */
    ScrollviewMgr.prototype.dynamicRefresh = function (data) {
        this.init(data);
    };
    /**
     * 静态刷新数据
     * @param data 列表数据
     */
    ScrollviewMgr.prototype.staticRefresh = function (data, extra) {
        if (!this._isInit || this._dataLen > data.length) {
            this.init(data, extra);
            return;
        }
        ;
        if (extra)
            this._extra = extra;
        this._data = data;
        this._dataLen = this._data.length;
        if (this.LRSlide) {
            var horiNum = Math.ceil(this._dataLen / this.horiNum);
            var wid = (this._itemWidth + this.vertPading) * horiNum + this.leftSpace + this.rightSpace;
            this._content.width = wid;
        }
        else {
            var vertNum = Math.ceil(this._dataLen / this.vertNum);
            var hei = (this._itemHeight + this.horiPading) * vertNum + this.topSpace + this.downSpace;
            this._content.height = hei;
        }
        for (var i = 0; i < this.horiNum; i++) {
            for (var j = 0; j < this.vertNum; j++) {
                var item = cc.find(this._itemComName + "-" + i + "-" + j, this._content);
                var comname = item.name.split("-")[0];
                var tjCom = item.getComponent(comname);
                var index = item['m_itemId'];
                var itemData = this._data[index];
                if (itemData) {
                    item.active = true;
                    tjCom.init(itemData);
                }
                else {
                    item.active = false;
                }
            }
        }
    };
    ScrollviewMgr.prototype.move = function () {
        if (this.LRSlide) {
            var tempx = (this._itemWidth + this.vertPading);
            var x = this.mirror ? -tempx : tempx;
            cc.tween(this._content)
                .to(0.3, { x: x })
                .call(this.scrollMoveHorizontal.bind(this))
                .start();
        }
        else {
            var tempy = (this._itemHeight + this.horiPading);
            var y = this.mirror ? -tempy : tempy;
            cc.tween(this._content)
                .by(0.3, { y: y })
                .call(this.scrollMoveVertical.bind(this))
                .start();
        }
    };
    /**
     * 纵向滑动初始化函数
     */
    ScrollviewMgr.prototype.initVertical = function () {
        this._content.anchorX = 0;
        this._content.anchorY = this.mirror ? 0 : 1;
        this._content.width = this._view.width;
        this._content.x = -this._view.width / 2;
        this._content.height = (this._itemHeight + this.horiPading) * Math.ceil(this._dataLen / this.vertNum) + this.topSpace + this.downSpace;
        ;
        this._content.y = this.mirror ? -this._view.height / 2 : this._view.height / 2;
        this._lastPosY = this.mirror ? -this._content.y : this._content.y;
        this.forInitItem();
    };
    /**
     * 横向滑动初始化函数
     */
    ScrollviewMgr.prototype.initHorizontal = function () {
        this._content.anchorX = this.mirror ? 1 : 0;
        this._content.anchorY = 0;
        this._content.width = this._view.width;
        this._content.y = this._view.height / 2;
        this._content.width = (this._itemWidth + this.vertPading) * Math.ceil(this._dataLen / this.horiNum) + this.leftSpace + this.rightSpace;
        this._content.x = this.mirror ? this._view.width / 2 : -this._view.width / 2;
        this._lastPosX = this.mirror ? -this._content.x : this._content.x;
        this.forInitItem();
    };
    /**
     * 创建或者刷新列表节点
     */
    ScrollviewMgr.prototype.forInitItem = function () {
        var _this = this;
        for (var i = 0; i < this.horiNum; i++) {
            for (var j = 0; j < this.vertNum; j++) {
                var item = cc.find(this._itemComName + "-" + i + "-" + j, this._content);
                if (item)
                    item.active = false;
            }
        }
        var _loop_1 = function (i) {
            var _loop_2 = function (j) {
                if (this_1.mdelay > 0) {
                    var delay = (this_1.vertNum * i + (j)) * (this_1.mdelay);
                    setTimeout(function () {
                        if (_this.node.parent)
                            _this.initItemFunc(i, j);
                    }, delay * 1000);
                }
                else {
                    this_1.initItemFunc(i, j);
                }
            };
            for (var j = 0; j < this_1.vertNum; j++) {
                _loop_2(j);
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.horiNum; i++) {
            _loop_1(i);
        }
    };
    /**
     * 创建或者刷新列表节点
     */
    ScrollviewMgr.prototype.initItemFunc = function (i, j) {
        var index = i * this.vertNum + j;
        var item = cc.find(this._itemComName + "-" + i + "-" + j, this._content);
        if (!item) {
            item = cc.instantiate(this.item);
            this._content.addChild(item);
            item.name = this._itemComName + "-" + i + "-" + j;
            item.scale = this.mscale;
        }
        var comname = item.name.split("-")[0];
        var tjCom = item.getComponent(comname);
        var itemData = this._data[index];
        item['m_itemId'] = index;
        if (itemData) {
            item.active = true;
            tjCom.init(itemData, this._extra);
        }
        else {
            item.active = false;
        }
        if (this.LRSlide) {
            var tempx = j * (item.width + this.vertPading) + item.width / 2 + this.leftSpace;
            item.y = -(i * (item.height + this.horiPading) + item.height / 2 + this.topSpace);
            if (this.mirror) {
                item.x = -tempx;
            }
            else {
                item.x = tempx;
            }
        }
        else {
            item.x = j * (item.width + this.vertPading) + item.width / 2 + this.leftSpace;
            var tempy = (i * (item.height + this.horiPading) + item.height / 2 + this.topSpace);
            if (this.mirror) {
                item.y = tempy;
            }
            else {
                item.y = -tempy;
            }
        }
        this._list.push(item);
        if (tjCom.shapeChange) {
            tjCom.shapeChange();
            this._needShapeChange = true;
            ;
        }
    };
    /**
    * 横向滑动方向
    */
    ScrollviewMgr.prototype.scrollMoveHorizontal = function () {
        if (!this._content)
            return;
        if (this._lastPosX > this._content.x) {
            //方向往左
            this.scrollLeftHandler();
        }
        else if (this._lastPosX < this._content.x) {
            //方向往右
            this.scrollRightHandler();
        }
        this._lastPosX = this._content.x;
        if (this._needShapeChange)
            this.shapeChange();
    };
    /**
    * 纵向滑动方向
    */
    ScrollviewMgr.prototype.scrollMoveVertical = function () {
        if (!this._content)
            return;
        if (this._lastPosY > this._content.y) {
            //方向往下
            this.scrollDownHandler();
        }
        else if (this._lastPosY < this._content.y) {
            //方向往上
            this.scrollUpHandler();
        }
        this._lastPosY = this._content.y;
        if (this._needShapeChange)
            this.shapeChange();
    };
    /**
     * 向上滑
     */
    ScrollviewMgr.prototype.scrollUpHandler = function () {
        for (var i = 0, len = this._list.length; i < len; i++) {
            var item = this._list[i];
            var comname = item.name.split("-")[0];
            var tjCom = item.getComponent(comname);
            var finalY = item.y + this._content.y;
            if (finalY > (this._view.height / 2 + item.height)) {
                var m_itemId = item['m_itemId'];
                var index = m_itemId + this._itemNum;
                if (this.mirror)
                    index = m_itemId - this._itemNum;
                var itemData = this._data[index];
                item['m_itemId'] = index;
                if (itemData) {
                    item.active = true;
                    tjCom.init(itemData);
                }
                else {
                    item.active = false;
                }
                item.y -= this.horiNum * (item.height + this.horiPading);
            }
        }
    };
    /**
     * 向下滑
     */
    ScrollviewMgr.prototype.scrollDownHandler = function () {
        for (var i = 0, len = this._list.length; i < len; i++) {
            var item = this._list[i];
            var comname = item.name.split("-")[0];
            var tjCom = item.getComponent(comname);
            var finalY = item.y + this._content.y;
            if (finalY < -(this._view.height / 2 + item.height)) {
                var m_itemId = item['m_itemId'];
                var index = m_itemId - this._itemNum;
                if (this.mirror)
                    index = m_itemId + this._itemNum;
                var itemData = this._data[index];
                item['m_itemId'] = index;
                if (itemData) {
                    item.active = true;
                    tjCom.init(itemData);
                }
                else {
                    item.active = false;
                }
                item.y += this.horiNum * (item.height + this.horiPading);
            }
        }
    };
    /**
     * 向右滑
     */
    ScrollviewMgr.prototype.scrollRightHandler = function () {
        for (var i = 0, len = this._list.length; i < len; i++) {
            var item = this._list[i];
            var comname = item.name.split("-")[0];
            var tjCom = item.getComponent(comname);
            var finalX = item.x + this._content.x;
            if (finalX > (this._view.width / 2 + item.width)) {
                var m_itemId = item['m_itemId'];
                var index = m_itemId - this._itemNum;
                if (this.mirror)
                    index = m_itemId + this._itemNum;
                var itemData = this._data[index];
                item['m_itemId'] = index;
                if (itemData) {
                    item.active = true;
                    tjCom.init(itemData);
                }
                else {
                    item.active = false;
                }
                item.x -= this.vertNum * (item.width + this.vertPading);
            }
        }
    };
    /**
     * 向左滑
     */
    ScrollviewMgr.prototype.scrollLeftHandler = function () {
        for (var i = 0, len = this._list.length; i < len; i++) {
            var item = this._list[i];
            var comname = item.name.split("-")[0];
            var tjCom = item.getComponent(comname);
            var finalX = item.x + this._content.x;
            if (finalX < -(this._view.width / 2 + item.width)) {
                var m_itemId = item['m_itemId'];
                var index = m_itemId + this._itemNum;
                if (this.mirror)
                    index = m_itemId - this._itemNum;
                var itemData = this._data[index];
                item['m_itemId'] = index;
                if (itemData) {
                    item.active = true;
                    tjCom.init(itemData);
                }
                else {
                    item.active = false;
                }
                item.x += this.vertNum * (item.width + this.vertPading);
            }
        }
    };
    ScrollviewMgr.prototype.shapeChange = function () {
        for (var i = 0, len = this._list.length; i < len; i++) {
            var item = this._list[i];
            var comname = item.name.split("-")[0];
            var tjCom = item.getComponent(comname);
            tjCom.shapeChange();
        }
    };
    __decorate([
        property(cc.Prefab)
    ], ScrollviewMgr.prototype, "item", void 0);
    __decorate([
        property({ displayName: "行数", min: 1 })
    ], ScrollviewMgr.prototype, "horiNum", void 0);
    __decorate([
        property({ displayName: "列数", min: 1 })
    ], ScrollviewMgr.prototype, "vertNum", void 0);
    __decorate([
        property({ displayName: "上下间距" })
    ], ScrollviewMgr.prototype, "horiPading", void 0);
    __decorate([
        property({ displayName: "左右间距" })
    ], ScrollviewMgr.prototype, "vertPading", void 0);
    __decorate([
        property({ displayName: "左边界间距" })
    ], ScrollviewMgr.prototype, "leftSpace", void 0);
    __decorate([
        property({ displayName: "右边界间距" })
    ], ScrollviewMgr.prototype, "rightSpace", void 0);
    __decorate([
        property({ displayName: "上边界间距" })
    ], ScrollviewMgr.prototype, "topSpace", void 0);
    __decorate([
        property({ displayName: "下边界间距" })
    ], ScrollviewMgr.prototype, "downSpace", void 0);
    __decorate([
        property({ displayName: "ITEM缩放" })
    ], ScrollviewMgr.prototype, "mscale", void 0);
    __decorate([
        property({ displayName: "延时加载" })
    ], ScrollviewMgr.prototype, "mdelay", void 0);
    __decorate([
        property({ displayName: "镜像" })
    ], ScrollviewMgr.prototype, "mirror", void 0);
    __decorate([
        property({ displayName: "左右滑动" })
    ], ScrollviewMgr.prototype, "LRSlide", void 0);
    ScrollviewMgr = __decorate([
        ccclass
    ], ScrollviewMgr);
    return ScrollviewMgr;
}(cc.Component));
exports.default = ScrollviewMgr;

cc._RF.pop();