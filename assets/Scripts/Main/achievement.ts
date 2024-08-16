import ScrollviewMgr from "../Other/ScrollviewMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Achievement extends cc.Component {

    private scorMgr: ScrollviewMgr;
    data: any;

    onLoad() {
        this.scorMgr = this.node.children[0].getComponent(ScrollviewMgr);
    }

    init() {
        this.scorMgr.init(this.data)
    }
}
