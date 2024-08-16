import Global from "./Global";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AD_ROOT extends cc.Component {

    ADflag: boolean = false

    timeId: number = 0;

    onLoad() {

        Global.AD_RootNode = this

        this.ADflag = false
    }

}
