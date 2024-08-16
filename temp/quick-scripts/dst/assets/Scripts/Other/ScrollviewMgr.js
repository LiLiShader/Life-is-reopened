
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Other/ScrollviewMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcT3RoZXJcXFNjcm9sbHZpZXdNZ3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ00sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUM7SUFBMkMsaUNBQVk7SUFBdkQ7UUFBQSxxRUE0WkM7UUExWkcsVUFBSSxHQUFjLElBQUksQ0FBQztRQUV2QixhQUFPLEdBQVcsQ0FBQyxDQUFDO1FBRXBCLGFBQU8sR0FBVyxDQUFDLENBQUM7UUFFcEIsZ0JBQVUsR0FBVyxDQUFDLENBQUM7UUFFdkIsZ0JBQVUsR0FBVyxDQUFDLENBQUM7UUFFdkIsZUFBUyxHQUFXLENBQUMsQ0FBQztRQUV0QixnQkFBVSxHQUFXLENBQUMsQ0FBQztRQUV2QixjQUFRLEdBQVcsQ0FBQyxDQUFDO1FBRXJCLGVBQVMsR0FBVyxDQUFDLENBQUM7UUFFdEIsWUFBTSxHQUFXLENBQUMsQ0FBQztRQUVuQixZQUFNLEdBQVcsSUFBSSxDQUFDO1FBRXRCLFlBQU0sR0FBWSxLQUFLLENBQUM7UUFFeEIsYUFBTyxHQUFZLEtBQUssQ0FBQztRQUlqQixjQUFRLEdBQVcsQ0FBQyxDQUFDLENBQUEsUUFBUTtRQUM3QixlQUFTLEdBQVcsQ0FBQyxDQUFDLENBQUEsV0FBVztRQUNqQyxlQUFTLEdBQVcsQ0FBQyxDQUFDLENBQUEsV0FBVztRQUNqQyxrQkFBWSxHQUFXLEVBQUUsQ0FBQyxDQUFBLFFBQVE7UUFDbEMsaUJBQVcsR0FBVyxDQUFDLENBQUMsQ0FBQSxPQUFPO1FBQy9CLFlBQU0sR0FBUSxJQUFJLENBQUM7UUFDbkIsV0FBSyxHQUFVLEVBQUUsQ0FBQztRQUlsQixjQUFRLEdBQVcsQ0FBQyxDQUFDO1FBQ3JCLHNCQUFnQixHQUFZLEtBQUssQ0FBQzs7SUFtWDlDLENBQUM7SUFoWFUsOEJBQU0sR0FBYjtRQUNJLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9DLGdCQUFnQjtRQUNoQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNoQyxlQUFlO1FBQ2YsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDL0IsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YseUJBQXlCO1FBQ3pCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM5RDthQUFNO1lBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzVEO0lBQ0wsQ0FBQztJQUNEOzs7O09BSUc7SUFDSSw0QkFBSSxHQUFYLFVBQVksSUFBUyxFQUFFLEtBQVc7UUFBbEMsaUJBaUJDO1FBaEJHLElBQUksS0FBSztZQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDNUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckMsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztTQUMzQztRQUNELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixVQUFVLENBQUM7WUFDUCxJQUFJLEtBQUksQ0FBQyxJQUFJO2dCQUFFLEtBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNuRCxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7TUFHRTtJQUNLLHdDQUFnQixHQUF2QixVQUF3QixJQUFTLEVBQUUsTUFBZTtRQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7OztNQUdFO0lBQ0ssc0NBQWMsR0FBckIsVUFBc0IsSUFBUztRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxxQ0FBYSxHQUFwQixVQUFxQixJQUFTLEVBQUUsS0FBVztRQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFBQyxPQUFPO1NBQ2xDO1FBQUEsQ0FBQztRQUNGLElBQUksS0FBSztZQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDbEMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUNyRCxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDM0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1NBQzdCO2FBQU07WUFDSCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ3JELElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUMxRixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7U0FDOUI7UUFDRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNuQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDbkMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBSSxJQUFJLENBQUMsWUFBWSxTQUFJLENBQUMsU0FBSSxDQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNwRSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLFFBQVEsRUFBRTtvQkFDVixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztvQkFDbkIsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDeEI7cUJBQU07b0JBQ0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7aUJBQ3ZCO2FBQ0o7U0FDSjtJQUNMLENBQUM7SUFFTSw0QkFBSSxHQUFYO1FBQ0ksSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ3JDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztpQkFDbEIsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztpQkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzFDLEtBQUssRUFBRSxDQUFDO1NBQ2hCO2FBQU07WUFDSCxJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDckMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2lCQUNsQixFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO2lCQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDeEMsS0FBSyxFQUFFLENBQUM7U0FDaEI7SUFFTCxDQUFDO0lBRUQ7O09BRUc7SUFDTyxvQ0FBWSxHQUF0QjtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQUEsQ0FBQztRQUN4SSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQy9FLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFDRDs7T0FFRztJQUNPLHNDQUFjLEdBQXhCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3ZJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ08sbUNBQVcsR0FBckI7UUFB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QyxFQUFFLENBQUMsU0FBUyxHQTRadEQ7a0JBNVpvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcm9sbHZpZXdNZ3IgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIGl0ZW06IGNjLlByZWZhYiA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoeyBkaXNwbGF5TmFtZTogXCLooYzmlbBcIiwgbWluOiAxIH0pXHJcbiAgICBob3JpTnVtOiBudW1iZXIgPSAxO1xyXG4gICAgQHByb3BlcnR5KHsgZGlzcGxheU5hbWU6IFwi5YiX5pWwXCIsIG1pbjogMSB9KVxyXG4gICAgdmVydE51bTogbnVtYmVyID0gMTtcclxuICAgIEBwcm9wZXJ0eSh7IGRpc3BsYXlOYW1lOiBcIuS4iuS4i+mXtOi3nVwiIH0pXHJcbiAgICBob3JpUGFkaW5nOiBudW1iZXIgPSAwO1xyXG4gICAgQHByb3BlcnR5KHsgZGlzcGxheU5hbWU6IFwi5bem5Y+z6Ze06LedXCIgfSlcclxuICAgIHZlcnRQYWRpbmc6IG51bWJlciA9IDA7XHJcbiAgICBAcHJvcGVydHkoeyBkaXNwbGF5TmFtZTogXCLlt6bovrnnlYzpl7Tot51cIiB9KVxyXG4gICAgbGVmdFNwYWNlOiBudW1iZXIgPSAwO1xyXG4gICAgQHByb3BlcnR5KHsgZGlzcGxheU5hbWU6IFwi5Y+z6L6555WM6Ze06LedXCIgfSlcclxuICAgIHJpZ2h0U3BhY2U6IG51bWJlciA9IDA7XHJcbiAgICBAcHJvcGVydHkoeyBkaXNwbGF5TmFtZTogXCLkuIrovrnnlYzpl7Tot51cIiB9KVxyXG4gICAgdG9wU3BhY2U6IG51bWJlciA9IDA7XHJcbiAgICBAcHJvcGVydHkoeyBkaXNwbGF5TmFtZTogXCLkuIvovrnnlYzpl7Tot51cIiB9KVxyXG4gICAgZG93blNwYWNlOiBudW1iZXIgPSAwO1xyXG4gICAgQHByb3BlcnR5KHsgZGlzcGxheU5hbWU6IFwiSVRFTee8qeaUvlwiIH0pXHJcbiAgICBtc2NhbGU6IG51bWJlciA9IDE7XHJcbiAgICBAcHJvcGVydHkoeyBkaXNwbGF5TmFtZTogXCLlu7bml7bliqDovb1cIiB9KVxyXG4gICAgbWRlbGF5OiBudW1iZXIgPSAwLjAyO1xyXG4gICAgQHByb3BlcnR5KHsgZGlzcGxheU5hbWU6IFwi6ZWc5YOPXCIgfSlcclxuICAgIG1pcnJvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQHByb3BlcnR5KHsgZGlzcGxheU5hbWU6IFwi5bem5Y+z5ruR5YqoXCIgfSlcclxuICAgIExSU2xpZGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX3ZpZXc6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIF9jb250ZW50OiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBfZGF0YTogYW55Oy8v5YiX6KGo5pWw5o2uXHJcbiAgICBwcml2YXRlIF9pdGVtTnVtOiBudW1iZXIgPSAxOy8vaXRlbeaAu+aVsFxyXG4gICAgcHJpdmF0ZSBfbGFzdFBvc1k6IG51bWJlciA9IDA7Ly/lnZDmoIfovazmjaLkuYvlkI7nmoRZ5YC8XHJcbiAgICBwcml2YXRlIF9sYXN0UG9zWDogbnVtYmVyID0gMDsvL+WdkOagh+i9rOaNouS5i+WQjueahFjlgLxcclxuICAgIHByaXZhdGUgX2l0ZW1Db21OYW1lOiBzdHJpbmcgPSBcIlwiOy8v6aKE5Yi25L2T6ISa5pys5ZCNXHJcbiAgICBwcml2YXRlIF9pdGVtSGVpZ2h0OiBudW1iZXIgPSAwOy8v6aKE5Yi25L2T6auY5bqmXHJcbiAgICBwcml2YXRlIF9leHRyYTogYW55ID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2xpc3Q6IGFueVtdID0gW107XHJcbiAgICBwcml2YXRlIF9pdGVtV2lkdGg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3Njcm9sbFZpZXc6IGNjLlNjcm9sbFZpZXc7XHJcbiAgICBwcml2YXRlIF9pbml0RnVuYzogRnVuY3Rpb247XHJcbiAgICBwcml2YXRlIF9kYXRhTGVuOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfbmVlZFNoYXBlQ2hhbmdlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9pc0luaXQ6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9iZzogY2MuTm9kZTtcclxuICAgIHB1YmxpYyBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5fYmcgPSBjYy5maW5kKFwiYmdcIiwgdGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLl92aWV3ID0gY2MuZmluZChcInZpZXdcIiwgdGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLl9jb250ZW50ID0gY2MuZmluZChcImNvbnRlbnRcIiwgdGhpcy5fdmlldyk7XHJcbiAgICAgICAgLyrliJ3lp4vljJbmu5rliqjnu4Tku7bvvIzpu5jorqTlhbPpl60qL1xyXG4gICAgICAgIHRoaXMuX3Njcm9sbFZpZXcgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpO1xyXG4gICAgICAgIHRoaXMuX3Njcm9sbFZpZXcudmVydGljYWwgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zY3JvbGxWaWV3Lmhvcml6b250YWwgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zY3JvbGxWaWV3LmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIC8q6I635Y+W6aKE5Yi26ZW/44CB5a6944CB5ZCN5a2XICovXHJcbiAgICAgICAgbGV0IGl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLml0ZW0pO1xyXG4gICAgICAgIHRoaXMuX2l0ZW1Db21OYW1lID0gaXRlbS5uYW1lO1xyXG4gICAgICAgIHRoaXMuX2l0ZW1XaWR0aCA9IGl0ZW0ud2lkdGg7XHJcbiAgICAgICAgdGhpcy5faXRlbUhlaWdodCA9IGl0ZW0uaGVpZ2h0O1xyXG4gICAgICAgIGl0ZW0uZGVzdHJveSgpO1xyXG4gICAgICAgIC8q6K6+572u5ruR5Yqo5pa55ZCR77yM6YCJ5oup5Yid5aeL5YyW5Ye95pWw5ZKM5rua5Yqo5LqL5Lu25Ye95pWwKi9cclxuICAgICAgICBpZiAodGhpcy5MUlNsaWRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbFZpZXcuaG9yaXpvbnRhbCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX2luaXRGdW5jID0gdGhpcy5pbml0SG9yaXpvbnRhbDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLm9uKFwic2Nyb2xsaW5nXCIsIHRoaXMuc2Nyb2xsTW92ZUhvcml6b250YWwsIHRoaXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbFZpZXcudmVydGljYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9pbml0RnVuYyA9IHRoaXMuaW5pdFZlcnRpY2FsO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUub24oXCJzY3JvbGxpbmdcIiwgdGhpcy5zY3JvbGxNb3ZlVmVydGljYWwsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyWXHJcbiAgICAgKiBAcGFyYW0gZGF0YSDliJfooajmlbDmja5cclxuICAgICAqIEBwYXJhbSBleHRyYSDpmYTluKblj4LmlbBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGluaXQoZGF0YTogYW55LCBleHRyYT86IGFueSkge1xyXG4gICAgICAgIGlmIChleHRyYSkgdGhpcy5fZXh0cmEgPSBleHRyYTtcclxuICAgICAgICB0aGlzLl9kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLl9kYXRhTGVuID0gdGhpcy5fZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5fbGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2l0ZW1OdW0gPSB0aGlzLnZlcnROdW0gKiB0aGlzLmhvcmlOdW07XHJcbiAgICAgICAgdGhpcy5fdmlldy53aWR0aCA9IHRoaXMubm9kZS53aWR0aDtcclxuICAgICAgICB0aGlzLl92aWV3LmhlaWdodCA9IHRoaXMubm9kZS5oZWlnaHQ7XHJcbiAgICAgICAgaWYgKHRoaXMuX2JnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JnLndpZHRoID0gdGhpcy5ub2RlLndpZHRoICsgMzA7XHJcbiAgICAgICAgICAgIHRoaXMuX2JnLmhlaWdodCA9IHRoaXMubm9kZS5oZWlnaHQgKyAzMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5faW5pdEZ1bmMoKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubm9kZSkgdGhpcy5fc2Nyb2xsVmlldy5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB9LCB0aGlzLl9pdGVtTnVtICogdGhpcy5tZGVsYXkpO1xyXG4gICAgICAgIHRoaXMuX2lzSW5pdCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOWIneWni+WMluW5tuiuvue9rui1t+Wni+S9jee9rlxyXG4gICAgKiBAcGFyYW0gZGF0YSDliJfooajmlbDmja5cclxuICAgICovXHJcbiAgICBwdWJsaWMgaW5pdEFuZEZvcmNlSXRlbShkYXRhOiBhbnksIG9mZnNldDogY2MuVmVjMikge1xyXG4gICAgICAgIHRoaXMuaW5pdChkYXRhKTtcclxuICAgICAgICB0aGlzLl9zY3JvbGxWaWV3LnNjcm9sbFRvT2Zmc2V0KG9mZnNldCwgMC4xKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog5Yqo5oCB5Yi35paw5pWw5o2u77yI5YiX6KGo5Zue5Yiw6LW35aeL54K577yJXHJcbiAgICAqIEBwYXJhbSBkYXRhIOWIl+ihqOaVsOaNrlxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBkeW5hbWljUmVmcmVzaChkYXRhOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmluaXQoZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpnZnmgIHliLfmlrDmlbDmja5cclxuICAgICAqIEBwYXJhbSBkYXRhIOWIl+ihqOaVsOaNrlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljUmVmcmVzaChkYXRhOiBhbnksIGV4dHJhPzogYW55KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pc0luaXQgfHwgdGhpcy5fZGF0YUxlbiA+IGRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdChkYXRhLCBleHRyYSk7IHJldHVybjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChleHRyYSkgdGhpcy5fZXh0cmEgPSBleHRyYTtcclxuICAgICAgICB0aGlzLl9kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLl9kYXRhTGVuID0gdGhpcy5fZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgaWYgKHRoaXMuTFJTbGlkZSkge1xyXG4gICAgICAgICAgICBsZXQgaG9yaU51bSA9IE1hdGguY2VpbCh0aGlzLl9kYXRhTGVuIC8gdGhpcy5ob3JpTnVtKVxyXG4gICAgICAgICAgICBsZXQgd2lkID0gKHRoaXMuX2l0ZW1XaWR0aCArIHRoaXMudmVydFBhZGluZykgKiBob3JpTnVtICsgdGhpcy5sZWZ0U3BhY2UgKyB0aGlzLnJpZ2h0U3BhY2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbnRlbnQud2lkdGggPSB3aWQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHZlcnROdW0gPSBNYXRoLmNlaWwodGhpcy5fZGF0YUxlbiAvIHRoaXMudmVydE51bSlcclxuICAgICAgICAgICAgbGV0IGhlaSA9ICh0aGlzLl9pdGVtSGVpZ2h0ICsgdGhpcy5ob3JpUGFkaW5nKSAqIHZlcnROdW0gKyB0aGlzLnRvcFNwYWNlICsgdGhpcy5kb3duU3BhY2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbnRlbnQuaGVpZ2h0ID0gaGVpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaG9yaU51bTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy52ZXJ0TnVtOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gY2MuZmluZChgJHt0aGlzLl9pdGVtQ29tTmFtZX0tJHtpfS0ke2p9YCwgdGhpcy5fY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29tbmFtZSA9IGl0ZW0ubmFtZS5zcGxpdChcIi1cIilbMF07XHJcbiAgICAgICAgICAgICAgICBsZXQgdGpDb20gPSBpdGVtLmdldENvbXBvbmVudChjb21uYW1lKTtcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IGl0ZW1bJ21faXRlbUlkJ107XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbURhdGEgPSB0aGlzLl9kYXRhW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0akNvbS5pbml0KGl0ZW1EYXRhKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbW92ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5MUlNsaWRlKSB7XHJcbiAgICAgICAgICAgIGxldCB0ZW1weCA9ICh0aGlzLl9pdGVtV2lkdGggKyB0aGlzLnZlcnRQYWRpbmcpO1xyXG4gICAgICAgICAgICBsZXQgeCA9IHRoaXMubWlycm9yID8gLXRlbXB4IDogdGVtcHg7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuX2NvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAudG8oMC4zLCB7IHg6IHggfSlcclxuICAgICAgICAgICAgICAgIC5jYWxsKHRoaXMuc2Nyb2xsTW92ZUhvcml6b250YWwuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCB0ZW1weSA9ICh0aGlzLl9pdGVtSGVpZ2h0ICsgdGhpcy5ob3JpUGFkaW5nKTtcclxuICAgICAgICAgICAgbGV0IHkgPSB0aGlzLm1pcnJvciA/IC10ZW1weSA6IHRlbXB5O1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLl9jb250ZW50KVxyXG4gICAgICAgICAgICAgICAgLmJ5KDAuMywgeyB5OiB5IH0pXHJcbiAgICAgICAgICAgICAgICAuY2FsbCh0aGlzLnNjcm9sbE1vdmVWZXJ0aWNhbC5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOe6teWQkea7keWKqOWIneWni+WMluWHveaVsFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZlcnRpY2FsKCkge1xyXG4gICAgICAgIHRoaXMuX2NvbnRlbnQuYW5jaG9yWCA9IDA7XHJcbiAgICAgICAgdGhpcy5fY29udGVudC5hbmNob3JZID0gdGhpcy5taXJyb3IgPyAwIDogMTtcclxuICAgICAgICB0aGlzLl9jb250ZW50LndpZHRoID0gdGhpcy5fdmlldy53aWR0aDtcclxuICAgICAgICB0aGlzLl9jb250ZW50LnggPSAtdGhpcy5fdmlldy53aWR0aCAvIDI7XHJcbiAgICAgICAgdGhpcy5fY29udGVudC5oZWlnaHQgPSAodGhpcy5faXRlbUhlaWdodCArIHRoaXMuaG9yaVBhZGluZykgKiBNYXRoLmNlaWwodGhpcy5fZGF0YUxlbiAvIHRoaXMudmVydE51bSkgKyB0aGlzLnRvcFNwYWNlICsgdGhpcy5kb3duU3BhY2U7O1xyXG4gICAgICAgIHRoaXMuX2NvbnRlbnQueSA9IHRoaXMubWlycm9yID8gLXRoaXMuX3ZpZXcuaGVpZ2h0IC8gMiA6IHRoaXMuX3ZpZXcuaGVpZ2h0IC8gMjtcclxuICAgICAgICB0aGlzLl9sYXN0UG9zWSA9IHRoaXMubWlycm9yID8gLXRoaXMuX2NvbnRlbnQueSA6IHRoaXMuX2NvbnRlbnQueTtcclxuICAgICAgICB0aGlzLmZvckluaXRJdGVtKCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOaoquWQkea7keWKqOWIneWni+WMluWHveaVsFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgaW5pdEhvcml6b250YWwoKSB7XHJcbiAgICAgICAgdGhpcy5fY29udGVudC5hbmNob3JYID0gdGhpcy5taXJyb3IgPyAxIDogMDtcclxuICAgICAgICB0aGlzLl9jb250ZW50LmFuY2hvclkgPSAwO1xyXG4gICAgICAgIHRoaXMuX2NvbnRlbnQud2lkdGggPSB0aGlzLl92aWV3LndpZHRoO1xyXG4gICAgICAgIHRoaXMuX2NvbnRlbnQueSA9IHRoaXMuX3ZpZXcuaGVpZ2h0IC8gMjtcclxuICAgICAgICB0aGlzLl9jb250ZW50LndpZHRoID0gKHRoaXMuX2l0ZW1XaWR0aCArIHRoaXMudmVydFBhZGluZykgKiBNYXRoLmNlaWwodGhpcy5fZGF0YUxlbiAvIHRoaXMuaG9yaU51bSkgKyB0aGlzLmxlZnRTcGFjZSArIHRoaXMucmlnaHRTcGFjZTtcclxuICAgICAgICB0aGlzLl9jb250ZW50LnggPSB0aGlzLm1pcnJvciA/IHRoaXMuX3ZpZXcud2lkdGggLyAyIDogLXRoaXMuX3ZpZXcud2lkdGggLyAyO1xyXG4gICAgICAgIHRoaXMuX2xhc3RQb3NYID0gdGhpcy5taXJyb3IgPyAtdGhpcy5fY29udGVudC54IDogdGhpcy5fY29udGVudC54O1xyXG4gICAgICAgIHRoaXMuZm9ySW5pdEl0ZW0oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIm+W7uuaIluiAheWIt+aWsOWIl+ihqOiKgueCuVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZm9ySW5pdEl0ZW0oKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmhvcmlOdW07IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMudmVydE51bTsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGNjLmZpbmQoYCR7dGhpcy5faXRlbUNvbU5hbWV9LSR7aX0tJHtqfWAsIHRoaXMuX2NvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0pIGl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmhvcmlOdW07IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMudmVydE51bTsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tZGVsYXkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlbGF5ID0gKHRoaXMudmVydE51bSAqIGkgKyAoaikpICogKHRoaXMubWRlbGF5KTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZS5wYXJlbnQpIHRoaXMuaW5pdEl0ZW1GdW5jKGksIGopO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIGRlbGF5ICogMTAwMCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdEl0ZW1GdW5jKGksIGopO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yib5bu65oiW6ICF5Yi35paw5YiX6KGo6IqC54K5XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBpbml0SXRlbUZ1bmMoaTogbnVtYmVyLCBqOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgaW5kZXggPSBpICogdGhpcy52ZXJ0TnVtICsgajtcclxuICAgICAgICBsZXQgaXRlbSA9IGNjLmZpbmQoYCR7dGhpcy5faXRlbUNvbU5hbWV9LSR7aX0tJHtqfWAsIHRoaXMuX2NvbnRlbnQpO1xyXG4gICAgICAgIGlmICghaXRlbSkge1xyXG4gICAgICAgICAgICBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5pdGVtKTtcclxuICAgICAgICAgICAgdGhpcy5fY29udGVudC5hZGRDaGlsZChpdGVtKTtcclxuICAgICAgICAgICAgaXRlbS5uYW1lID0gYCR7dGhpcy5faXRlbUNvbU5hbWV9LSR7aX0tJHtqfWA7XHJcbiAgICAgICAgICAgIGl0ZW0uc2NhbGUgPSB0aGlzLm1zY2FsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNvbW5hbWUgPSBpdGVtLm5hbWUuc3BsaXQoXCItXCIpWzBdO1xyXG4gICAgICAgIGxldCB0akNvbSA9IGl0ZW0uZ2V0Q29tcG9uZW50KGNvbW5hbWUpO1xyXG4gICAgICAgIGxldCBpdGVtRGF0YSA9IHRoaXMuX2RhdGFbaW5kZXhdO1xyXG4gICAgICAgIGl0ZW1bJ21faXRlbUlkJ10gPSBpbmRleDtcclxuICAgICAgICBpZiAoaXRlbURhdGEpIHtcclxuICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0akNvbS5pbml0KGl0ZW1EYXRhLCB0aGlzLl9leHRyYSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuTFJTbGlkZSkge1xyXG4gICAgICAgICAgICBsZXQgdGVtcHggPSBqICogKGl0ZW0ud2lkdGggKyB0aGlzLnZlcnRQYWRpbmcpICsgaXRlbS53aWR0aCAvIDIgKyB0aGlzLmxlZnRTcGFjZTtcclxuICAgICAgICAgICAgaXRlbS55ID0gLShpICogKGl0ZW0uaGVpZ2h0ICsgdGhpcy5ob3JpUGFkaW5nKSArIGl0ZW0uaGVpZ2h0IC8gMiArIHRoaXMudG9wU3BhY2UpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5taXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0ueCA9IC10ZW1weDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0ueCA9IHRlbXB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaXRlbS54ID0gaiAqIChpdGVtLndpZHRoICsgdGhpcy52ZXJ0UGFkaW5nKSArIGl0ZW0ud2lkdGggLyAyICsgdGhpcy5sZWZ0U3BhY2U7XHJcbiAgICAgICAgICAgIGxldCB0ZW1weSA9IChpICogKGl0ZW0uaGVpZ2h0ICsgdGhpcy5ob3JpUGFkaW5nKSArIGl0ZW0uaGVpZ2h0IC8gMiArIHRoaXMudG9wU3BhY2UpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5taXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0ueSA9IHRlbXB5XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnkgPSAtdGVtcHk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIGlmICh0akNvbS5zaGFwZUNoYW5nZSkge1xyXG4gICAgICAgICAgICB0akNvbS5zaGFwZUNoYW5nZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9uZWVkU2hhcGVDaGFuZ2UgPSB0cnVlOztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOaoquWQkea7keWKqOaWueWQkVxyXG4gICAgKi9cclxuICAgIHByb3RlY3RlZCBzY3JvbGxNb3ZlSG9yaXpvbnRhbCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2NvbnRlbnQpIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy5fbGFzdFBvc1ggPiB0aGlzLl9jb250ZW50LngpIHtcclxuICAgICAgICAgICAgLy/mlrnlkJHlvoDlt6ZcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxMZWZ0SGFuZGxlcigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbGFzdFBvc1ggPCB0aGlzLl9jb250ZW50LngpIHtcclxuICAgICAgICAgICAgLy/mlrnlkJHlvoDlj7NcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxSaWdodEhhbmRsZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbGFzdFBvc1ggPSB0aGlzLl9jb250ZW50Lng7XHJcbiAgICAgICAgaWYgKHRoaXMuX25lZWRTaGFwZUNoYW5nZSkgdGhpcy5zaGFwZUNoYW5nZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDnurXlkJHmu5HliqjmlrnlkJFcclxuICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2Nyb2xsTW92ZVZlcnRpY2FsKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fY29udGVudCkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLl9sYXN0UG9zWSA+IHRoaXMuX2NvbnRlbnQueSkge1xyXG4gICAgICAgICAgICAvL+aWueWQkeW+gOS4i1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbERvd25IYW5kbGVyKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9sYXN0UG9zWSA8IHRoaXMuX2NvbnRlbnQueSkge1xyXG4gICAgICAgICAgICAvL+aWueWQkeW+gOS4ilxyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbFVwSGFuZGxlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sYXN0UG9zWSA9IHRoaXMuX2NvbnRlbnQueTtcclxuICAgICAgICBpZiAodGhpcy5fbmVlZFNoYXBlQ2hhbmdlKSB0aGlzLnNoYXBlQ2hhbmdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlkJHkuIrmu5FcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHNjcm9sbFVwSGFuZGxlcigpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5fbGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuX2xpc3RbaV07XHJcbiAgICAgICAgICAgIGxldCBjb21uYW1lID0gaXRlbS5uYW1lLnNwbGl0KFwiLVwiKVswXTtcclxuICAgICAgICAgICAgbGV0IHRqQ29tID0gaXRlbS5nZXRDb21wb25lbnQoY29tbmFtZSk7XHJcbiAgICAgICAgICAgIGxldCBmaW5hbFkgPSBpdGVtLnkgKyB0aGlzLl9jb250ZW50Lnk7XHJcbiAgICAgICAgICAgIGlmIChmaW5hbFkgPiAodGhpcy5fdmlldy5oZWlnaHQgLyAyICsgaXRlbS5oZWlnaHQpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbV9pdGVtSWQgPSBpdGVtWydtX2l0ZW1JZCddO1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gbV9pdGVtSWQgKyB0aGlzLl9pdGVtTnVtO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWlycm9yKSBpbmRleCA9IG1faXRlbUlkIC0gdGhpcy5faXRlbU51bTtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtRGF0YSA9IHRoaXMuX2RhdGFbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaXRlbVsnbV9pdGVtSWQnXSA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRqQ29tLmluaXQoaXRlbURhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaXRlbS55IC09IHRoaXMuaG9yaU51bSAqIChpdGVtLmhlaWdodCArIHRoaXMuaG9yaVBhZGluZyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ZCR5LiL5ruRXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzY3JvbGxEb3duSGFuZGxlcigpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5fbGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuX2xpc3RbaV07XHJcbiAgICAgICAgICAgIGxldCBjb21uYW1lID0gaXRlbS5uYW1lLnNwbGl0KFwiLVwiKVswXTtcclxuICAgICAgICAgICAgbGV0IHRqQ29tID0gaXRlbS5nZXRDb21wb25lbnQoY29tbmFtZSk7XHJcbiAgICAgICAgICAgIGxldCBmaW5hbFkgPSBpdGVtLnkgKyB0aGlzLl9jb250ZW50Lnk7XHJcbiAgICAgICAgICAgIGlmIChmaW5hbFkgPCAtKHRoaXMuX3ZpZXcuaGVpZ2h0IC8gMiArIGl0ZW0uaGVpZ2h0KSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1faXRlbUlkID0gaXRlbVsnbV9pdGVtSWQnXTtcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IG1faXRlbUlkIC0gdGhpcy5faXRlbU51bTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1pcnJvcikgaW5kZXggPSBtX2l0ZW1JZCArIHRoaXMuX2l0ZW1OdW07XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbURhdGEgPSB0aGlzLl9kYXRhW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGl0ZW1bJ21faXRlbUlkJ10gPSBpbmRleDtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0akNvbS5pbml0KGl0ZW1EYXRhKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGl0ZW0ueSArPSB0aGlzLmhvcmlOdW0gKiAoaXRlbS5oZWlnaHQgKyB0aGlzLmhvcmlQYWRpbmcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ZCR5Y+z5ruRXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzY3JvbGxSaWdodEhhbmRsZXIoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuX2xpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9saXN0W2ldO1xyXG4gICAgICAgICAgICBsZXQgY29tbmFtZSA9IGl0ZW0ubmFtZS5zcGxpdChcIi1cIilbMF07XHJcbiAgICAgICAgICAgIGxldCB0akNvbSA9IGl0ZW0uZ2V0Q29tcG9uZW50KGNvbW5hbWUpO1xyXG4gICAgICAgICAgICBsZXQgZmluYWxYID0gaXRlbS54ICsgdGhpcy5fY29udGVudC54O1xyXG4gICAgICAgICAgICBpZiAoZmluYWxYID4gKHRoaXMuX3ZpZXcud2lkdGggLyAyICsgaXRlbS53aWR0aCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtX2l0ZW1JZCA9IGl0ZW1bJ21faXRlbUlkJ107XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBtX2l0ZW1JZCAtIHRoaXMuX2l0ZW1OdW07XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5taXJyb3IpIGluZGV4ID0gbV9pdGVtSWQgKyB0aGlzLl9pdGVtTnVtO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1EYXRhID0gdGhpcy5fZGF0YVtpbmRleF07XHJcbiAgICAgICAgICAgICAgICBpdGVtWydtX2l0ZW1JZCddID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbURhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGpDb20uaW5pdChpdGVtRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpdGVtLnggLT0gdGhpcy52ZXJ0TnVtICogKGl0ZW0ud2lkdGggKyB0aGlzLnZlcnRQYWRpbmcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWQkeW3pua7kVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2Nyb2xsTGVmdEhhbmRsZXIoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuX2xpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9saXN0W2ldO1xyXG4gICAgICAgICAgICBsZXQgY29tbmFtZSA9IGl0ZW0ubmFtZS5zcGxpdChcIi1cIilbMF07XHJcbiAgICAgICAgICAgIGxldCB0akNvbSA9IGl0ZW0uZ2V0Q29tcG9uZW50KGNvbW5hbWUpO1xyXG4gICAgICAgICAgICBsZXQgZmluYWxYID0gaXRlbS54ICsgdGhpcy5fY29udGVudC54O1xyXG4gICAgICAgICAgICBpZiAoZmluYWxYIDwgLSh0aGlzLl92aWV3LndpZHRoIC8gMiArIGl0ZW0ud2lkdGgpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbV9pdGVtSWQgPSBpdGVtWydtX2l0ZW1JZCddO1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gbV9pdGVtSWQgKyB0aGlzLl9pdGVtTnVtO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWlycm9yKSBpbmRleCA9IG1faXRlbUlkIC0gdGhpcy5faXRlbU51bTtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtRGF0YSA9IHRoaXMuX2RhdGFbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaXRlbVsnbV9pdGVtSWQnXSA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRqQ29tLmluaXQoaXRlbURhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaXRlbS54ICs9IHRoaXMudmVydE51bSAqIChpdGVtLndpZHRoICsgdGhpcy52ZXJ0UGFkaW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHByaXZhdGUgc2hhcGVDaGFuZ2UoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuX2xpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9saXN0W2ldO1xyXG4gICAgICAgICAgICBsZXQgY29tbmFtZSA9IGl0ZW0ubmFtZS5zcGxpdChcIi1cIilbMF07XHJcbiAgICAgICAgICAgIGxldCB0akNvbSA9IGl0ZW0uZ2V0Q29tcG9uZW50KGNvbW5hbWUpO1xyXG4gICAgICAgICAgICB0akNvbS5zaGFwZUNoYW5nZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=