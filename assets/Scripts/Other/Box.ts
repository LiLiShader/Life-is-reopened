import { DEFAULT_CJ } from "../Main/condition";
import ResMgr from "../Main/ResMgr";
import { grades } from "../Main/summary";
import UserModel from "./UserModel";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Box extends cc.Component {

    data: any;

    init(data) {
        this.data = data;
        for (let i = 0; i < this.node.childrenCount; i++) {
            if (data[i]) {
                this.node.children[i].active = true;
                ResMgr.loadImage(`skin/${UserModel.instance.using}/cj/Box_White`,  this.node.children[i].getComponent(cc.Sprite))
                if (DEFAULT_CJ.ACJ.includes(data[i].id)) {
                    this.node.children[i].opacity = 255
                    this.node.children[i].children[1].getComponent(cc.Label).string = data[i].name
                    this.node.children[i].children[2].getComponent(cc.Label).string = data[i].description
                } else {
                    this.node.children[i].opacity = 100
                    if (data[i]["hide"] === 0) {
                        this.node.children[i].children[1].getComponent(cc.Label).string = data[i].name
                        this.node.children[i].children[2].getComponent(cc.Label).string = data[i].description
                    } else {
                        this.node.children[i].children[1].getComponent(cc.Label).string = "？？？";
                        this.node.children[i].children[2].getComponent(cc.Label).string = "？？？";
                    }
                }
                this.node.children[i].color = grades[data[i]["grade"]]
                if(UserModel.instance.using=='skin0'){
                    this.node.children[i].children[1].color = cc.color(0,0,0)
                    this.node.children[i].children[2].color = cc.color(0,0,0)
                }else if(UserModel.instance.using=='skin1'){
                    this.node.children[i].children[1].color = cc.color(255,255,255)
                    this.node.children[i].children[2].color = cc.color(255,255,255)
                }else if(UserModel.instance.using=='skin2'){
                    this.node.children[i].children[1].color = cc.color(0,0,0)
                    this.node.children[i].children[2].color = cc.color(0,0,0)
                }else if(UserModel.instance.using=='skin3'){
                    this.node.children[i].children[1].color = cc.color(0,0,0)
                    this.node.children[i].children[2].color = cc.color(0,0,0)
                }
            } else {
                this.node.children[i].active = false;
            }
        }
    }
}
