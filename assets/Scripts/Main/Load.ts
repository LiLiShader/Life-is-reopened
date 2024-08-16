import SaveUtils from "../Other/SaveUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Load extends cc.Component {

    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null;

    private time: number = 0
    private flag: boolean = true
    protocol: cc.Node;

    onLoad() {
        SaveUtils.inst.getLocalData()
    }

    update(dt) {
        this.time += 1 / 60
        if (this.time >= 2 && this.flag) {
            cc.director.loadScene('LifeRebirth', () => {

            })
            this.flag = false
        }
        let num;
        if (this.time / 2 >= 1) {
            num = 1
        } else {
            num = this.time / 2
        }
        this.progressBar.node.children[0].width = 562 * num
    }
}
