
const { ccclass, property } = cc._decorator;
@ccclass
export default class ScrollviewMgr extends cc.Component {
    @property(cc.Prefab)
    item: cc.Prefab = null;
    @property({ displayName: "行数", min: 1 })
    horiNum: number = 1;
    @property({ displayName: "列数", min: 1 })
    vertNum: number = 1;
    @property({ displayName: "上下间距" })
    horiPading: number = 0;
    @property({ displayName: "左右间距" })
    vertPading: number = 0;
    @property({ displayName: "左边界间距" })
    leftSpace: number = 0;
    @property({ displayName: "右边界间距" })
    rightSpace: number = 0;
    @property({ displayName: "上边界间距" })
    topSpace: number = 0;
    @property({ displayName: "下边界间距" })
    downSpace: number = 0;
    @property({ displayName: "ITEM缩放" })
    mscale: number = 1;
    @property({ displayName: "延时加载" })
    mdelay: number = 0.02;
    @property({ displayName: "镜像" })
    mirror: boolean = false;
    @property({ displayName: "左右滑动" })
    LRSlide: boolean = false;
    private _view: cc.Node;
    private _content: cc.Node;
    private _data: any;//列表数据
    private _itemNum: number = 1;//item总数
    private _lastPosY: number = 0;//坐标转换之后的Y值
    private _lastPosX: number = 0;//坐标转换之后的X值
    private _itemComName: string = "";//预制体脚本名
    private _itemHeight: number = 0;//预制体高度
    private _extra: any = null;
    private _list: any[] = [];
    private _itemWidth: number;
    private _scrollView: cc.ScrollView;
    private _initFunc: Function;
    private _dataLen: number = 0;
    private _needShapeChange: boolean = false;
    private _isInit: boolean;
    private _bg: cc.Node;
    public onLoad() {
        this._bg = cc.find("bg", this.node);
        this._view = cc.find("view", this.node);
        this._content = cc.find("content", this._view);
        /*初始化滚动组件，默认关闭*/
        this._scrollView = this.node.getComponent(cc.ScrollView);
        this._scrollView.vertical = false;
        this._scrollView.horizontal = false;
        this._scrollView.enabled = true;
        /*获取预制长、宽、名字 */
        let item = cc.instantiate(this.item);
        this._itemComName = item.name;
        this._itemWidth = item.width;
        this._itemHeight = item.height;
        item.destroy();
        /*设置滑动方向，选择初始化函数和滚动事件函数*/
        if (this.LRSlide) {
            this._scrollView.horizontal = true;
            this._initFunc = this.initHorizontal;
            this.node.on("scrolling", this.scrollMoveHorizontal, this);
        } else {
            this._scrollView.vertical = true;
            this._initFunc = this.initVertical;
            this.node.on("scrolling", this.scrollMoveVertical, this);
        }
    }
    /**
     * 初始化
     * @param data 列表数据
     * @param extra 附带参数
     */
    public init(data: any, extra?: any) {
        if (extra) this._extra = extra;
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
        setTimeout(() => {
            if (this.node) this._scrollView.enabled = true;
        }, this._itemNum * this.mdelay);
        this._isInit = true;
    }

    /**
    * 初始化并设置起始位置
    * @param data 列表数据
    */
    public initAndForceItem(data: any, offset: cc.Vec2) {
        this.init(data);
        this._scrollView.scrollToOffset(offset, 0.1);
    }

    /**
    * 动态刷新数据（列表回到起始点）
    * @param data 列表数据
    */
    public dynamicRefresh(data: any) {
        this.init(data);
    }

    /**
     * 静态刷新数据
     * @param data 列表数据
     */
    public staticRefresh(data: any, extra?: any) {
        if (!this._isInit || this._dataLen > data.length) {
            this.init(data, extra); return;
        };
        if (extra) this._extra = extra;
        this._data = data;
        this._dataLen = this._data.length;
        if (this.LRSlide) {
            let horiNum = Math.ceil(this._dataLen / this.horiNum)
            let wid = (this._itemWidth + this.vertPading) * horiNum + this.leftSpace + this.rightSpace;
            this._content.width = wid;
        } else {
            let vertNum = Math.ceil(this._dataLen / this.vertNum)
            let hei = (this._itemHeight + this.horiPading) * vertNum + this.topSpace + this.downSpace;
            this._content.height = hei;
        }
        for (let i = 0; i < this.horiNum; i++) {
            for (let j = 0; j < this.vertNum; j++) {
                let item = cc.find(`${this._itemComName}-${i}-${j}`, this._content);
                let comname = item.name.split("-")[0];
                let tjCom = item.getComponent(comname);
                let index = item['m_itemId'];
                let itemData = this._data[index];
                if (itemData) {
                    item.active = true;
                    tjCom.init(itemData);
                } else {
                    item.active = false;
                }
            }
        }
    }

    public move() {
        if (this.LRSlide) {
            let tempx = (this._itemWidth + this.vertPading);
            let x = this.mirror ? -tempx : tempx;
            cc.tween(this._content)
                .to(0.3, { x: x })
                .call(this.scrollMoveHorizontal.bind(this))
                .start();
        } else {
            let tempy = (this._itemHeight + this.horiPading);
            let y = this.mirror ? -tempy : tempy;
            cc.tween(this._content)
                .by(0.3, { y: y })
                .call(this.scrollMoveVertical.bind(this))
                .start();
        }

    }

    /**
     * 纵向滑动初始化函数
     */
    protected initVertical() {
        this._content.anchorX = 0;
        this._content.anchorY = this.mirror ? 0 : 1;
        this._content.width = this._view.width;
        this._content.x = -this._view.width / 2;
        this._content.height = (this._itemHeight + this.horiPading) * Math.ceil(this._dataLen / this.vertNum) + this.topSpace + this.downSpace;;
        this._content.y = this.mirror ? -this._view.height / 2 : this._view.height / 2;
        this._lastPosY = this.mirror ? -this._content.y : this._content.y;
        this.forInitItem();
    }
    /**
     * 横向滑动初始化函数
     */
    protected initHorizontal() {
        this._content.anchorX = this.mirror ? 1 : 0;
        this._content.anchorY = 0;
        this._content.width = this._view.width;
        this._content.y = this._view.height / 2;
        this._content.width = (this._itemWidth + this.vertPading) * Math.ceil(this._dataLen / this.horiNum) + this.leftSpace + this.rightSpace;
        this._content.x = this.mirror ? this._view.width / 2 : -this._view.width / 2;
        this._lastPosX = this.mirror ? -this._content.x : this._content.x;
        this.forInitItem();
    }

    /**
     * 创建或者刷新列表节点
     */
    protected forInitItem() {
        for (let i = 0; i < this.horiNum; i++) {
            for (let j = 0; j < this.vertNum; j++) {
                let item = cc.find(`${this._itemComName}-${i}-${j}`, this._content);
                if (item) item.active = false;
            }
        }
        for (let i = 0; i < this.horiNum; i++) {
            for (let j = 0; j < this.vertNum; j++) {
                if (this.mdelay > 0) {
                    let delay = (this.vertNum * i + (j)) * (this.mdelay);
                    setTimeout(() => {
                        if (this.node.parent) this.initItemFunc(i, j);
                    }, delay * 1000);
                } else {
                    this.initItemFunc(i, j);
                }
            }
        }
    }

    /**
     * 创建或者刷新列表节点
     */
    protected initItemFunc(i: number, j: number) {
        let index = i * this.vertNum + j;
        let item = cc.find(`${this._itemComName}-${i}-${j}`, this._content);
        if (!item) {
            item = cc.instantiate(this.item);
            this._content.addChild(item);
            item.name = `${this._itemComName}-${i}-${j}`;
            item.scale = this.mscale;
        }
        let comname = item.name.split("-")[0];
        let tjCom = item.getComponent(comname);
        let itemData = this._data[index];
        item['m_itemId'] = index;
        if (itemData) {
            item.active = true;
            tjCom.init(itemData, this._extra);
        } else {
            item.active = false;
        }
        if (this.LRSlide) {
            let tempx = j * (item.width + this.vertPading) + item.width / 2 + this.leftSpace;
            item.y = -(i * (item.height + this.horiPading) + item.height / 2 + this.topSpace);
            if (this.mirror) {
                item.x = -tempx;
            } else {
                item.x = tempx;
            }
        } else {
            item.x = j * (item.width + this.vertPading) + item.width / 2 + this.leftSpace;
            let tempy = (i * (item.height + this.horiPading) + item.height / 2 + this.topSpace);
            if (this.mirror) {
                item.y = tempy
            } else {
                item.y = -tempy;
            }
        }
        this._list.push(item);
        if (tjCom.shapeChange) {
            tjCom.shapeChange();
            this._needShapeChange = true;;
        }
    }

    /**
    * 横向滑动方向
    */
    protected scrollMoveHorizontal() {
        if (!this._content) return;
        if (this._lastPosX > this._content.x) {
            //方向往左
            this.scrollLeftHandler();
        } else if (this._lastPosX < this._content.x) {
            //方向往右
            this.scrollRightHandler();
        }
        this._lastPosX = this._content.x;
        if (this._needShapeChange) this.shapeChange();
    }

    /**
    * 纵向滑动方向
    */
    protected scrollMoveVertical() {
        if (!this._content) return;
        if (this._lastPosY > this._content.y) {
            //方向往下
            this.scrollDownHandler();
        } else if (this._lastPosY < this._content.y) {
            //方向往上
            this.scrollUpHandler();
        }
        this._lastPosY = this._content.y;
        if (this._needShapeChange) this.shapeChange();
    }

    /**
     * 向上滑
     */
    protected scrollUpHandler() {
        for (let i = 0, len = this._list.length; i < len; i++) {
            let item = this._list[i];
            let comname = item.name.split("-")[0];
            let tjCom = item.getComponent(comname);
            let finalY = item.y + this._content.y;
            if (finalY > (this._view.height / 2 + item.height)) {
                let m_itemId = item['m_itemId'];
                let index = m_itemId + this._itemNum;
                if (this.mirror) index = m_itemId - this._itemNum;
                let itemData = this._data[index];
                item['m_itemId'] = index;
                if (itemData) {
                    item.active = true;
                    tjCom.init(itemData);
                } else {
                    item.active = false;
                }
                item.y -= this.horiNum * (item.height + this.horiPading);
            }

        }
    }

    /**
     * 向下滑
     */
    protected scrollDownHandler() {
        for (let i = 0, len = this._list.length; i < len; i++) {
            let item = this._list[i];
            let comname = item.name.split("-")[0];
            let tjCom = item.getComponent(comname);
            let finalY = item.y + this._content.y;
            if (finalY < -(this._view.height / 2 + item.height)) {
                let m_itemId = item['m_itemId'];
                let index = m_itemId - this._itemNum;
                if (this.mirror) index = m_itemId + this._itemNum;
                let itemData = this._data[index];
                item['m_itemId'] = index;
                if (itemData) {
                    item.active = true;
                    tjCom.init(itemData);
                } else {
                    item.active = false;
                }
                item.y += this.horiNum * (item.height + this.horiPading);
            }
        }
    }

    /**
     * 向右滑
     */
    protected scrollRightHandler() {
        for (let i = 0, len = this._list.length; i < len; i++) {
            let item = this._list[i];
            let comname = item.name.split("-")[0];
            let tjCom = item.getComponent(comname);
            let finalX = item.x + this._content.x;
            if (finalX > (this._view.width / 2 + item.width)) {
                let m_itemId = item['m_itemId'];
                let index = m_itemId - this._itemNum;
                if (this.mirror) index = m_itemId + this._itemNum;
                let itemData = this._data[index];
                item['m_itemId'] = index;
                if (itemData) {
                    item.active = true;
                    tjCom.init(itemData);
                } else {
                    item.active = false;
                }
                item.x -= this.vertNum * (item.width + this.vertPading);
            }

        }
    }

    /**
     * 向左滑
     */
    protected scrollLeftHandler() {
        for (let i = 0, len = this._list.length; i < len; i++) {
            let item = this._list[i];
            let comname = item.name.split("-")[0];
            let tjCom = item.getComponent(comname);
            let finalX = item.x + this._content.x;
            if (finalX < -(this._view.width / 2 + item.width)) {
                let m_itemId = item['m_itemId'];
                let index = m_itemId + this._itemNum;
                if (this.mirror) index = m_itemId - this._itemNum;
                let itemData = this._data[index];
                item['m_itemId'] = index;
                if (itemData) {
                    item.active = true;
                    tjCom.init(itemData);
                } else {
                    item.active = false;
                }
                item.x += this.vertNum * (item.width + this.vertPading);
            }
        }
    }



    private shapeChange() {
        for (let i = 0, len = this._list.length; i < len; i++) {
            let item = this._list[i];
            let comname = item.name.split("-")[0];
            let tjCom = item.getComponent(comname);
            tjCom.shapeChange();
        }
    }
}
