import Global from "../AD/Global";
import weChatPlatform from "../AD/weChatPlatform";
import { SaveData } from "../Other/GlobalDefine";
import SaveUtils from "../Other/SaveUtils";
import UserModel from "../Other/UserModel";
import Achievement from "./achievement";
import { check, DEFAULT_CJ, DEFAULT_PROP } from "./condition";
import Entry from "./Entry";
import ResMgr from "./ResMgr";
import { ADtime, grades, gradesH, OtherGrades, summary } from "./summary";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    wgnb: boolean = false
    @property(cc.JsonAsset)
    branchline: cc.JsonAsset = null

    @property(cc.JsonAsset)
    Age: cc.JsonAsset = null
    @property(cc.JsonAsset)
    Events: cc.JsonAsset = null
    @property(cc.JsonAsset)
    Talents: cc.JsonAsset = null
    @property(cc.JsonAsset)
    Achievement: cc.JsonAsset = null

    IndexOfEvent: number = 0

    AgeJson: cc.JsonAsset = null//当前的age表
    EventsJson: cc.JsonAsset = null//当前的event表
    //UI
    @property(cc.Node)
    TenCPShow: cc.Node = null
    @property(cc.Node)
    TenCPButton: cc.Node = null
    @property(cc.Node)
    Tips: cc.Node = null
    @property(cc.Prefab)
    Entry: cc.Prefab = null
    @property(cc.Prefab)
    Box: cc.Prefab = null
    @property(cc.Prefab)
    normalLabel: cc.Prefab = null

    @property(cc.Prefab)
    MyzzBox: cc.Prefab = null


    //选择天赋判断
    NowSelectTalentNum: number = 0;//当前选择天赋数量
    MaxSelectTalentNum: number = 150;//最大选择天赋数量
    AlreadyTalentButton: string[] = []//已经选择的天赋按钮
    AllShowTalent: number[] = []//所有可以选择的天赋，index就是按钮的顺序（从上到下）
    ConTalent: number[] = []//每年检测的天赋
    //计时器
    TipsIsOpen: boolean = false//tips面板是否打开
    TipsTimer: number = 0;//tips计时器
    //数值
    MaxpropertyNum: number = 10//各个属性最大值
    MaxUseNum: number = 20//最大可用点数
    StarUseNum: number = this.MaxUseNum//初始可用点数
    NowAge: number = 0;//当前年龄

    isDeath: boolean = false

    isBool: boolean = false

    achievement: cc.Node;//成就列表父节点
    evenListMgr: cc.Node;
    _content: cc.Node;
    listArr: Array<any> = []     //事件列表数据

    adTime: number = 0
    startPos: cc.Vec2;
    timmerCDauto: number = 0//自动播放按钮广告CD
    istimmerCDauto: boolean = false//自动播放按钮广告CD
    completely: number = 0//加载完全
    TXCS: number = 0//天选次数

    eventScrollView: cc.Node;
    private _lastPosX: number = 0;//坐标转换之后的X值

    cont: string = ""
    contZhujia: string = ""
    tichu: number[] = []
    isOpenXY: boolean = false
    group_4_lal: string = '#000000'
    group_4_lal1: string = '#000000'
    tex_4_lal: string = '#000000'
    tex_4_lal1: string = '#000000'
    isMyzzShow: boolean = false;//是否是主线剧情
    customData: any;
    skinPrefab: cc.Node = null;

    is1or2: number = 1
    //背景图颜色
    quality: cc.SpriteFrame = null;
    quality1: cc.SpriteFrame = null;
    quality2: cc.SpriteFrame = null;
    quality3: cc.SpriteFrame = null;

    //存储自传图片按钮
    experienceSp: cc.SpriteFrame = null;

    RamTF: number = 10//天赋数量
    isWUDI: boolean = true//是否是无敌模式

    choice: boolean = false//仙人指路选择完成

    skinCd: boolean = false;

    maozizizi: boolean = false;//第几次开始人生

    rebuild: boolean = false;//是否转世重修

    rebuildAge: number = 0;//从多少岁转世重修
    onLoad() {
        Global.platform=new weChatPlatform()
        this.replaceAll()

        //测试
        DEFAULT_PROP["CHR"] = 0
        DEFAULT_PROP["INT"] = 0
        DEFAULT_PROP["LIF"] = 1
        DEFAULT_PROP["MNY"] = 0
        DEFAULT_PROP["SPR"] = 0
        DEFAULT_PROP["STR"] = 0
        DEFAULT_PROP["TLT"] = []
        DEFAULT_PROP["EVT"] = []
        this.Tips.on(cc.Node.EventType.TOUCH_START, this.moveStart, this)
        this.Tips.on(cc.Node.EventType.TOUCH_MOVE, this.moveIng, this)
        //读表

        ResMgr.loadText("Json/branchline", (branchline: cc.JsonAsset) => { this.branchline = branchline })
        ResMgr.loadText("Json/0/age", (age: cc.JsonAsset) => { this.Age = age, this.Onloadtimer() })
        ResMgr.loadText("Json/0/events", (events: cc.JsonAsset) => { this.Events = events, this.Onloadtimer() })
        ResMgr.loadText("Json/0/talents", (talents: cc.JsonAsset) => { this.Talents = talents, this.Onloadtimer() })
        ResMgr.loadText("Json/0/achievement", (achievement: cc.JsonAsset) => { this.Achievement = achievement, this.Onloadtimer() })
        if (!SaveData.isAutoAD) {
            cc.find("Canvas/Group_4/Auto/Background/Icon").active = true
        }
        if (!SaveData.isAutoAD2) {
            cc.find("Canvas/Group_4/Auto2/Background/Icon").active = true
        }

        if (SaveData.isAuto) {
            cc.find("Canvas/Group_4/Auto/Background/ZD1").active = false
            cc.find("Canvas/Group_4/Auto/Background/ZD2").active = true
        } else {
            cc.find("Canvas/Group_4/Auto/Background/ZD1").active = true
            cc.find("Canvas/Group_4/Auto/Background/ZD2").active = false
        }

        if (SaveData.isAuto2) {
            cc.find("Canvas/Group_4/Auto2/Background/ZD1").active = false
            cc.find("Canvas/Group_4/Auto2/Background/ZD2").active = true
        } else {
            cc.find("Canvas/Group_4/Auto2/Background/ZD1").active = true
            cc.find("Canvas/Group_4/Auto2/Background/ZD2").active = false
        }
        //数据应用
        this.CanUse(0)

        if (DEFAULT_CJ.TMS < 1) {
            cc.find("Canvas/Group_1/achievement").active = false
        }
        this.eventScrollView = cc.find("Canvas/Group_4/ScrollView")
        this._content = cc.find("Canvas/Group_4/ScrollView/view/Layout")
        this.tongji()
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onNeiGua, this);
        
    }
    onNeiGua(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.MaxUseNum += 20
                this.CanUse(20)
                break;
            case cc.macro.KEY.b:
                this.wgnb = true
                break;
        }
    }
    Onloadtimer() {
        this.completely++;
        if (this.completely == 4) {
            this.tongji()
            cc.find('Group_1/achievement', this.node).active = true;
        }
    }
    //主线选择
    SelectStory(event, customEventData) {
        this.AgeJson = this.Age; this.EventsJson = this.Events;this.IndexOfEvent = 0;
    }
    //不选天赋直接进入下一级
    EnterNext(event, customEventData) {
        if (SaveData.Myzz[Number(customEventData) - 1] == 1) {
            cc.find("Canvas/Group_2").active = false
            cc.find("Canvas/Group_7").active = false
            cc.find("Canvas/BG").active = true
            cc.find("Canvas/Group_3").active = true
        } else {
            for (let p = 0; p < Object.keys(this.branchline.json).length; p++) {
                if (this.branchline.json[p + 1]["id"] == customEventData) {

                    this.TipsOpen(true, cc.color(128, 223, 239), "完成成就 【" + this.Achievement.json[this.branchline.json[p + 1]["achievementID"]]["name"] + "】 解锁")
                }
            }
        }
    }
    update(dt) {
        if (this.TipsIsOpen) {
            this.TipsTimer += dt
            if (this.TipsTimer >= 1.5) {
                this.TipsOpen(false, cc.color(128, 223, 239))
            }
        }

        if (this.istimmerCDauto) {
            this.timmerCDauto += 1
            if (this.timmerCDauto >= 15) {
                this.timmerCDauto = 0
                this.istimmerCDauto = false
            }
        }
        if (SaveData.isAuto && this.isBool) {
            this.adTime += dt
            if (this.adTime >= 1.5) {
                this.adTime = 0
                this.Continue()
            }
        }
        if (SaveData.isAuto2 && this.isBool) {
            this.adTime += dt
            if (this.adTime >= 0.75) {
                this.adTime = 0
                this.Continue()
            }
        }
        //广告倒计时
        if (SaveData.isAutoAD2) {
            let all = Math.round(new Date().getTime()) / 1000 - SaveData.LastTime
            let have = ADtime - all
            if (all > ADtime) {
                //超时了
                SaveData.isAutoAD2 = false
                SaveData.isAuto2 = false
                cc.find("Canvas/Group_4/Auto2/Background/Icon").active = true
                cc.find("Canvas/Group_4/Auto2/Background/Label").getComponent(cc.Label).string = "观看广告即可立即使用24小时"
            } else {
                //没超时
                let shi
                let fen
                shi = Math.floor(have / 3600)
                fen = Math.floor((have - shi * 3600) / 60)
                if (fen < 1) { fen = 1 }
                cc.find("Canvas/Group_4/Auto2/Background/Label").getComponent(cc.Label).string = '剩余 ' + shi + " 小时 " + fen + " 分钟"
            }
        }
    }
    startGame() {

        cc.find("Canvas/Group_1").active = false
        cc.find("Canvas/BG").active = true

        cc.find("Canvas/Group_2").active = true

        cc.find("Canvas/Group_1/Num_Reopen_Box/Label_1").getComponent(cc.Label).string = "已重开" + DEFAULT_CJ.TMS + "次"
        if (cc.sys.platform == cc.sys.VIVO_GAME || cc.sys.platform == cc.sys.XIAOMI_GAME || window['uc']) {
            Global.platform.SHOW_TITIALAD1()
        }
        //成就检查
        this.check_cj("opportunity")
    }

    //替换所有皮肤
    replaceAll() {
        //天赋选择背景图颜色
        ResMgr.loadImageRet(`skin/${UserModel.instance.using}/tfxz/Box_White_f9fcff`, (sp: cc.SpriteFrame) => {
            this.quality = null;
            this.quality = sp;
        })
        ResMgr.loadImageRet(`skin/${UserModel.instance.using}/tfxz/Box_Blue_67cfff`, (sp: cc.SpriteFrame) => {
            this.quality1 = null;
            this.quality1 = sp;
        })
        ResMgr.loadImageRet(`skin/${UserModel.instance.using}/tfxz/Box_Purple_c67cff`, (sp: cc.SpriteFrame) => {
            this.quality2 = null;
            this.quality2 = sp;
        })
        ResMgr.loadImageRet(`skin/${UserModel.instance.using}/tfxz/Box_Orange_ff8e49`, (sp: cc.SpriteFrame) => {
            this.quality3 = null;
            this.quality3 = sp;
        })
        ResMgr.loadImageRet(`skin/${UserModel.instance.using}/wdzz/Btn_EXP`, (sp) => {
            this.experienceSp = null;
            this.experienceSp = sp;
        })
        this.group_4_lal = '#000000'
        this.group_4_lal1 = '#000000'
        this.tex_4_lal = '#000000'
        this.tex_4_lal1 = '#FFB859'
    }

    Rank() {
        this.TipsOpen(true, cc.color(128, 223, 239), "还没有")
    }

    returnGroup1() {
        cc.find("Canvas/Group_1").active = true
        cc.find("Canvas/BG").active = false
        cc.find("Canvas/Group_2").active = false
    }

    JudgeColor(node: cc.Node, color: any) {
        if (color.toString() == cc.color(255, 255, 255).toString()) {
            node.getChildByName('Sp').getComponent(cc.Sprite).spriteFrame = this.quality;
        } else if (color.toString() == cc.color(103, 197, 230).toString()) {
            node.getChildByName('Sp').getComponent(cc.Sprite).spriteFrame = this.quality1;
        } else if (color.toString() == cc.color(237, 120, 239).toString()) {
            node.getChildByName('Sp').getComponent(cc.Sprite).spriteFrame = this.quality2;
        } else if (color.toString() == cc.color(247, 140, 75).toString()) {
            node.getChildByName('Sp').getComponent(cc.Sprite).spriteFrame = this.quality3;
        }

    }


    updateNromalLable(j: cc.Node, color?: any) {
        if (UserModel.instance.using == 'skin0') {
            j.getChildByName('Label').color = cc.color(0, 0, 0)
        }
        ResMgr.loadImage(`skin/${UserModel.instance.using}/tfxz/Hook`, j.getChildByName('Box_Selected').children[0].getComponent(cc.Sprite))
        if (color) {
            this.JudgeColor(j, color)
        }
    }
    //十连抽
    TenCP() {
        //定义剔除数组（由已选天赋和互斥天赋组成）
        this.tichu = []
        let index = 0
        let islun = false
        let tianfu = [];
        //轮回天赋
        // SaveData.LunHuiTalent = 1134
        if (SaveData.LunHuiTalent != 0) {
            index = SaveData.LunHuiTalent
            islun = true
            SaveData.LunHuiTalent = 0
            SaveUtils.inst.SaveData()
        }

        if (islun) {
            this.tichu.push(index)
            tianfu.push(index)
            islun = false
        }

        let len = Object.keys(this.Talents.json).length
        for (let s = 0; s < len; s++) {
            //判断有没有轮回天赋需要先生成
            if (1001 + s == index) continue;
            tianfu.push(1001 + s)
        }

        tianfu.sort((x, y) => {
            return this.Talents.json[y]['grade'] - this.Talents.json[x]['grade']
        })
        //生成/销毁节点
        let c = this.TenCPShow.childrenCount
        for (let i = 0; i < len - c; i++) {
            let j = cc.instantiate(this.normalLabel)
            j.parent = this.TenCPShow
            this.AutoAddClickEvent(this.node, "Main", "SelectTalent", (i + 1).toString(), j)
        }
        //UI交互
        this.TenCPButton.active = false
        this.TenCPShow.active = true
        cc.find("Canvas/Group_2/Select_2").active = true
        cc.find("Canvas/Group_2/Reopen").active = true
        let index1;
        for (let m = 0; m < len; m++) {
            index1 = tianfu[m]
            //拿到不重复不互斥的天赋ID：index，表现出来
            this.TenCPShow.children[m].getChildByName("Label").getComponent(cc.Label).string = this.Talents.json[index1]["name"] + "(" + this.Talents.json[index1]["description"] + ")"
            //稀有度UI表现
            this.updateNromalLable(this.TenCPShow.children[m], grades[this.Talents.json[index1]["grade"]])
            //放到所有可以选择的天赋数组里
            this.AllShowTalent.push(index1)
            //重置表现
            this.TenCPShow.children[m].getChildByName("Box_Selected").active = false
            //判断这个天赋有没有互斥天赋并且删除所有互斥天赋
        }
        cc.find("Canvas/Group_2/ScrollView").getComponent(cc.ScrollView).scrollToTop(0)
    }
    TenCP_digui(_index: number, _tichu: number[]) {
        //从Talents随机出一个天赋ID
        _index = 1000 + Math.ceil(Math.random() * Object.keys(this.Talents.json).length)
        //判断a是否在剔除数组，在就递归
        const sjs = Math.random(); let grade = 0
        //if(sjs>0.111){grade=0}else if(sjs>0.011){grade=1}else if(sjs>0.001){grade=2}else{grade=3}
        let ram = 0.2 * (DEFAULT_CJ.AEVT.length / Object.keys(this.Events.json).length) + 0.2 * (DEFAULT_CJ.ATLT.length / Object.keys(this.Talents.json).length)
        if (sjs > 0.4 + ram) { grade = 0 } else if (sjs > 0.3 + ram) { grade = 1 } else if (sjs > 0.2 + ram) { grade = 2 } else { grade = 3 }
        if (_tichu.includes(_index) || this.Talents.json[_index]["grade"] != grade) {
            return this.TenCP_digui(_index, _tichu)
        } else {
            //本天赋加入剔除数组,并返回
            _tichu.push(_index)
            return _index
        }
    }

    SelectTalent(event, customEventData) {
        let bool = this.mutex(this.AllShowTalent[Number(customEventData) - 1])
        
        if (bool[0]) {
            this.TipsOpen(true, cc.color(128, 223, 239), "与已选择的天赋【" + bool[1].name + "】冲突")
            return;
        }

        if (this.NowSelectTalentNum < this.MaxSelectTalentNum && !this.AlreadyTalentButton.includes(customEventData)) {
            this.NowSelectTalentNum += 1
            if (this.NowSelectTalentNum == this.MaxSelectTalentNum) {
                // cc.find("Canvas/Group_2/Select_2/Background/Label").getComponent(cc.Label).string = "开始新人生"
                // cc.find("Canvas/Group_2/Select_2/Background/Label").color = OtherGrades[1]
                // cc.find("Canvas/Group_2/Select_2/Background/OKBG").color = OtherGrades[0]
            }
            this.AlreadyTalentButton.push(customEventData)
            this.TenCPShow.children[Number(customEventData) - 1].getChildByName("Box_Selected").active = true
        } else if (this.NowSelectTalentNum >= this.MaxSelectTalentNum && !this.AlreadyTalentButton.includes(customEventData)) {
            //已经选够了
            this.TipsOpen(true, cc.color(128, 223, 239), "只能选" + this.MaxSelectTalentNum + "个天赋")
        } else if (this.AlreadyTalentButton.includes(customEventData)) {
            //取消选择
            this.NowSelectTalentNum -= 1
            let index = this.AlreadyTalentButton.indexOf(customEventData);
            if (index > -1) { this.AlreadyTalentButton.splice(index, 1); }
            this.TenCPShow.children[Number(customEventData) - 1].getChildByName("Box_Selected").active = false
        }
    }

    mutex(id): any[] {
        let bool = [false];
        for (let i = 0; i < this.AlreadyTalentButton.length; i++) {
            let id1 = this.AllShowTalent[Number(this.AlreadyTalentButton[i]) - 1]
            if (!this.Talents.json[id1].exclusive) continue;
            for (let y = 0; y < this.Talents.json[id1]["exclusive"].length; y++) {
                // console.log('表格', Number(this.Talents.json[id1]["exclusive"][y]), id)
                if (Number(this.Talents.json[id1]["exclusive"][y]) == id) {
                    bool = [true, this.Talents.json[id1]];
                }
            }
        }

        return bool
    }


    road(): boolean {

        let bool = false;

        if (!this.isOpenXY) {
            this.group3In()
            bool = true;
        }
        return bool;
    }

    //天赋选完了进入下一级
    TalentSelectOver() {
        if (this.NowSelectTalentNum <= this.MaxSelectTalentNum) {
            if (this.choice) {
                this.group3In()
            } else {
                if (!this.maozizizi) {
                    let bool = this.road();
                    this.maozizizi = true
                    if (!bool) return;
                }
            }
        } else if (this.NowSelectTalentNum < this.MaxSelectTalentNum) {
            this.TipsOpen(true, cc.color(128, 223, 239), "请选择" + this.MaxSelectTalentNum + "个天赋")
            return
        }

        let allttalent = []
        for (let i = 0; i < this.AlreadyTalentButton.length; i++) {
            //实装天赋
            allttalent.push(this.AllShowTalent[Number(this.AlreadyTalentButton[i]) - 1])
            
        }
        if (allttalent.includes(1019)) { this.MaxUseNum += 4; this.StarUseNum = this.MaxUseNum }
        if (allttalent.includes(1064)) { this.MaxUseNum += 8; this.StarUseNum = this.MaxUseNum }
        if (allttalent.includes(1007)) { this.MaxUseNum += 2; this.StarUseNum = this.MaxUseNum }
        if (allttalent.includes(1122)) { this.MaxUseNum = 0; this.StarUseNum = this.MaxUseNum }
        if (allttalent.includes(1086)) { this.MaxUseNum -= 10; this.StarUseNum = this.MaxUseNum }
        if (allttalent.includes(1085)) { this.MaxUseNum -= 3; this.StarUseNum = this.MaxUseNum }
        if (allttalent.includes(1084)) { this.MaxUseNum -= 2; this.StarUseNum = this.MaxUseNum }
        if (allttalent.includes(1063)) { this.MaxUseNum += 1; this.StarUseNum = this.MaxUseNum }
        if (this.MaxUseNum < 0) { this.MaxUseNum = 0; this.StarUseNum = this.MaxUseNum }
        if (SaveData.isPPDY && SaveData.isPPDY2) {
            SaveData.isPPDY2 = false
            SaveUtils.inst.SaveData()
            DEFAULT_PROP["CHR"] += 1; cc.find("Canvas/Group_3/Layout/CHR/Sprite/Label").getComponent(cc.Label).string = "1"
            DEFAULT_PROP["INT"] += 1; cc.find("Canvas/Group_3/Layout/INT/Sprite/Label").getComponent(cc.Label).string = "1"
            DEFAULT_PROP["STR"] += 1; cc.find("Canvas/Group_3/Layout/STR/Sprite/Label").getComponent(cc.Label).string = "1"
            DEFAULT_PROP["MNY"] += 1; cc.find("Canvas/Group_3/Layout/MNY/Sprite/Label").getComponent(cc.Label).string = "1"
            this.MaxUseNum += 4
        }
        this.CanUse(0)


        //下辈子三选一天赋
        for (let i = 0; i < this.AlreadyTalentButton.length; i++) {
            console.log("打开label")
            //打开label
            cc.find("Canvas/Group_3/ScrollView2/Label").active = true
            let index = this.AllShowTalent[Number(this.AlreadyTalentButton[i]) - 1]
            let j = cc.instantiate(this.normalLabel)
            this.updateNromalLable(j, grades[this.Talents.json[index]["grade"]])
            // setTimeout(() => {
            j.parent = cc.find("Canvas/Group_3/ScrollView2/view/Layout")
            // }, 0);
            j.getComponent(cc.Button).enabled = false

            DEFAULT_PROP["TLT"].push(index)
            if (this.Talents.json[index]["show"] != 0) { this.ConTalent.push(index) }
            if (!DEFAULT_CJ["ATLT"].includes(index)) { DEFAULT_CJ["ATLT"].push(index) }

            //重置表现
            j.getChildByName("Box_Selected").active = true
            //天赋确定成功增加天赋
            j.getChildByName("Label").getComponent(cc.Label).string = this.Talents.json[index]["name"] + "(" + this.Talents.json[index]["description"] + ")"
            // j.getChildByName("grade").color = grades[this.Talents.json[index]["grade"]]
            // j.getChildByName("grade").active = true
        }
        SaveUtils.inst.SaveData()
    }
    //144 238 144
    TipsOpen(isOpen: boolean, color: cc.Color, content?: string) {
        this.Tips.color = color
        //分辨率获取
        // let h = cc.winSize.height;
        if (isOpen) {
            this.Tips.getChildByName("Label").getComponent(cc.Label).string = content
            cc.tween(this.Tips).to(0.12, { position: cc.v3(0, (cc.winSize.height / 2)) }).to(0.06, { position: cc.v3(0, (cc.winSize.height / 2) - 50) }).to(0.06, { position: cc.v3(0, (cc.winSize.height / 2)) }).start()
            this.Tips.active = true
            this.TipsTimer = 0
            this.TipsIsOpen = true
        } else {
            this.Tips.setPosition(0, (cc.winSize.height + this.Tips.getContentSize().height) / 2)//tips归位
            this.Tips.active = false
            this.TipsTimer = 0
            this.TipsIsOpen = false
        }

    }
    //Group_3
    Add(event, customEventData) {
        if (this.StarUseNum >= 1) {
            switch (customEventData) {
                case "CHR":
                    if (DEFAULT_PROP["CHR"] < this.MaxpropertyNum || this.MaxUseNum > 0) {
                        DEFAULT_PROP["CHR"] += 1;
                        this.CanUse(-1)
                        cc.find("Canvas/Group_3/Layout/CHR/Sprite/Label").getComponent(cc.Label).string = DEFAULT_PROP["CHR"].toString()
                    }
                    break;
                case "INT":
                    if (DEFAULT_PROP["INT"] < this.MaxpropertyNum || this.MaxUseNum > 0) {
                        DEFAULT_PROP["INT"] += 1;
                        this.CanUse(-1)
                        cc.find("Canvas/Group_3/Layout/INT/Sprite/Label").getComponent(cc.Label).string = DEFAULT_PROP["INT"].toString()
                    }
                    break;
                case "STR":
                    if (DEFAULT_PROP["STR"] < this.MaxpropertyNum || this.MaxUseNum > 0) {
                        DEFAULT_PROP["STR"] += 1;
                        this.CanUse(-1)
                        cc.find("Canvas/Group_3/Layout/STR/Sprite/Label").getComponent(cc.Label).string = DEFAULT_PROP["STR"].toString()
                    }
                    break;
                case "MNY":
                    if (DEFAULT_PROP["MNY"] < this.MaxpropertyNum || this.MaxUseNum > 0) {
                        DEFAULT_PROP["MNY"] += 1;
                        this.CanUse(-1)
                        cc.find("Canvas/Group_3/Layout/MNY/Sprite/Label").getComponent(cc.Label).string = DEFAULT_PROP["MNY"].toString()
                    }
                    break;
                default:
                    break;
            }
        } else {
            this.TipsOpen(true, cc.color(128, 223, 239), "没有可分配的点数了")
        }
    }
    Reduce(event, customEventData) {
        switch (customEventData) {
            case "CHR":
                if (DEFAULT_PROP["CHR"] > 0) {
                    DEFAULT_PROP["CHR"] -= 1;
                    this.CanUse(1)
                    cc.find("Canvas/Group_3/Layout/CHR/Sprite/Label").getComponent(cc.Label).string = DEFAULT_PROP["CHR"].toString()
                }
                break;
            case "INT":
                if (DEFAULT_PROP["INT"] > 0) {
                    DEFAULT_PROP["INT"] -= 1;
                    this.CanUse(1)
                    cc.find("Canvas/Group_3/Layout/INT/Sprite/Label").getComponent(cc.Label).string = DEFAULT_PROP["INT"].toString()
                }
                break;
            case "STR":
                if (DEFAULT_PROP["STR"] > 0) {
                    DEFAULT_PROP["STR"] -= 1;
                    this.CanUse(1)
                    cc.find("Canvas/Group_3/Layout/STR/Sprite/Label").getComponent(cc.Label).string = DEFAULT_PROP["STR"].toString()
                }
                break;
            case "MNY":
                if (DEFAULT_PROP["MNY"] > 0) {
                    DEFAULT_PROP["MNY"] -= 1;
                    this.CanUse(1)
                    cc.find("Canvas/Group_3/Layout/MNY/Sprite/Label").getComponent(cc.Label).string = DEFAULT_PROP["MNY"].toString()
                }
                break;
            default:
                break;
        }
    }
    CanUse(trans: number) {
        let a = this.StarUseNum + trans
        this.StarUseNum = a
        cc.find("Canvas/Group_3/Label_2").getComponent(cc.Label).string = "可用属性点:" + this.StarUseNum
    }
    Random() {
        this.StarUseNum = this.MaxUseNum
        DEFAULT_PROP["CHR"] = 0; DEFAULT_PROP["INT"] = 0; DEFAULT_PROP["STR"] = 0; DEFAULT_PROP["MNY"] = 0;
        let a
        for (a = 0; a < this.MaxUseNum; a++) {
            let b = Math.ceil(Math.random() * 4)
            switch (b) {
                case 1:
                    if (DEFAULT_PROP["CHR"] < this.MaxpropertyNum || this.MaxUseNum > 40) {
                        DEFAULT_PROP["CHR"] += 1; cc.find("Canvas/Group_3/Layout/CHR/Sprite/Label").getComponent(cc.Label).string = DEFAULT_PROP["CHR"].toString(); this.CanUse(-1)
                    } else { a -= 1 }
                    break;
                case 2:
                    if (DEFAULT_PROP["INT"] < this.MaxpropertyNum || this.MaxUseNum > 40) {
                        DEFAULT_PROP["INT"] += 1; cc.find("Canvas/Group_3/Layout/INT/Sprite/Label").getComponent(cc.Label).string = DEFAULT_PROP["INT"].toString(); this.CanUse(-1)
                    } else { a -= 1 }
                    break
                case 3:
                    if (DEFAULT_PROP["STR"] < this.MaxpropertyNum || this.MaxUseNum > 40) {
                        DEFAULT_PROP["STR"] += 1; cc.find("Canvas/Group_3/Layout/STR/Sprite/Label").getComponent(cc.Label).string = DEFAULT_PROP["STR"].toString(); this.CanUse(-1)
                    } else { a -= 1 }
                    break
                case 4:
                    if (DEFAULT_PROP["MNY"] < this.MaxpropertyNum || this.MaxUseNum > 40) {
                        DEFAULT_PROP["MNY"] += 1; cc.find("Canvas/Group_3/Layout/MNY/Sprite/Label").getComponent(cc.Label).string = DEFAULT_PROP["MNY"].toString(); this.CanUse(-1)
                    } else { a -= 1 }
                    break
                default:
                    break;
            }
        }
    }
    //方向往下
    scrollDownHandler() {
        for (let i = 0, len = this._content.childrenCount; i < len; i++) {

        }
    }
    //方向往上
    scrollUpHandler() {
        for (let i = 0, len = this._content.childrenCount; i < len; i++) {
            let item = this._content.children[i];
            let finalY = item.y + this._content.y;
            if (finalY < (this._content.parent.height / 2 + item.height) && finalY > -(this._content.parent.height / 2 + item.height)) {
                item.opacity = 255
            } else {
                item.opacity = 0
            }
        }
    }




    starnewlife() {
        //外挂
        if (this.wgnb || (DEFAULT_PROP["CHR"] == 7 && DEFAULT_PROP["INT"] == 3 && DEFAULT_PROP["STR"] == 9 && DEFAULT_PROP["MNY"] == 1)) {
            if (this.isWUDI) {
                this.NowAge = 99
                DEFAULT_PROP["TLT"].push(1048)
                DEFAULT_PROP["TLT"].push(1065)
                DEFAULT_PROP["TLT"].push(1135)
            }
        }
        if (this.StarUseNum == 0) {
            cc.find("Canvas/Group_3").active = false
            cc.find("Canvas/Group_4").active = true
            this._lastPosX = this.eventScrollView.children[0].children[0].y
            cc.find("Canvas/Group_4/ScrollView/view/Layout").on("position-changed", this.scrollUpHandler, this);
            this.Continue()
            //关闭天赋选择面板
            this.isBool = true;
            // })
        } else {
            this.TipsOpen(true, cc.color(128, 223, 239), "你还有" + this.StarUseNum + "属性点没有分配")
        }
        //属性变化
        cc.find("Canvas/Group_4/Layout/CHR/Background/Label").getComponent(cc.RichText).string = `<color=${this.group_4_lal}>颜值 </c><color=${this.group_4_lal1}>` + DEFAULT_PROP["CHR"] + "</color>"
        cc.find("Canvas/Group_4/Layout/INT/Background/Label").getComponent(cc.RichText).string = `<color=${this.group_4_lal}>智力 </c><color=${this.group_4_lal1}>` + DEFAULT_PROP["INT"] + "</color>"
        cc.find("Canvas/Group_4/Layout/STR/Background/Label").getComponent(cc.RichText).string = `<color=${this.group_4_lal}>体质 </c><color=${this.group_4_lal1}>` + DEFAULT_PROP["STR"] + "</color>"
        cc.find("Canvas/Group_4/Layout/MNY/Background/Label").getComponent(cc.RichText).string = `<color=${this.group_4_lal}>家境 </c><color=${this.group_4_lal1}>` + DEFAULT_PROP["MNY"] + "</color>"
        cc.find("Canvas/Group_4/Layout/SPR/Background/Label").getComponent(cc.RichText).string = `<color=${this.group_4_lal}>快乐 </c><color=${this.group_4_lal1}>` + DEFAULT_PROP["SPR"] + "</color>"

        //成就检查
        this.check_cj("START")
    }
    //成就检查
    check_cj(index: string) {
        //成就检查
        for (let i = 0; i < Object.keys(this.Achievement.json).length; i++) {
            if (!DEFAULT_CJ.ACJ.includes(101 + i) && this.Achievement.json[101 + i]["opportunity"] == index && check(this.Achievement.json[101 + i]["condition"]) && (this.Achievement.json[101 + i]["evtlimit"] == -1 || this.Achievement.json[101 + i]["evtlimit"] == this.IndexOfEvent)) {
                this.TipsOpen(true, cc.color(144, 238, 144), "解锁成就【" + this.Achievement.json[101 + i]["name"] + "】")
                //完成的成就添加本地
                DEFAULT_CJ.ACJ.push(101 + i)
                //自传解锁检查
                for (let j = 0; j < Object.keys(this.branchline.json).length; j++) {
                    if (this.branchline.json[j + 1]["achievementID"] == (101 + i)) {
                        //解锁
                        SaveData.Myzz[this.branchline.json[j + 1]["id"] - 1] = 1
                    }
                }
            }
        }
        SaveUtils.inst.SaveData()
    }
    //Group_4
    Continue() {
        if (this.isDeath) return
        let baba = cc.find("Canvas/Group_4/ScrollView/view/Layout")
        let entry = cc.instantiate(this.Entry)
        entry.on(cc.Node.EventType.TOUCH_END, this.Continue, this)
        let node = entry.getComponent(Entry);
        entry.getChildByName('Sprite').getComponent(cc.Sprite).spriteFrame = node.sp[UserModel.instance.useId]

        if (UserModel.instance.using == 'skin0') {
            entry.getChildByName("LabelAge").color = cc.color(0, 0, 0)
            entry.getChildByName("LabelAge").children[0].color = cc.color(0, 0, 0)
        } else if (UserModel.instance.using == 'skin1') {
            entry.getChildByName("LabelAge").color = cc.color(255, 255, 255)
            entry.getChildByName("LabelAge").children[0].color = cc.color(255, 255, 255)
        } else if (UserModel.instance.using == 'skin2') {
            entry.getChildByName("LabelAge").color = cc.color(0, 0, 0)
            entry.getChildByName("LabelAge").children[0].color = cc.color(0, 0, 0)
        } else if (UserModel.instance.using == 'skin3') {
            entry.getChildByName("LabelAge").color = cc.color(41, 40, 61)
            entry.getChildByName("LabelAge").children[0].color = cc.color(41, 40, 61)
        } else if (UserModel.instance.using == 'skin4') {
            entry.getChildByName("LabelAge").color = cc.color(255, 255, 255)
            entry.getChildByName("LabelAge").children[0].color = cc.color(255, 255, 255)
        }

        //检查天赋
        let tfcon: string = ""
        for (let i = 0; i < this.ConTalent.length; i++) {
            if (this.ConTalent[i] != 0 && check(this.Talents.json[this.ConTalent[i]]["condition"], "include")) {

                // let str: string = "<color=#fff1aa>"+ this.attributeTrans(this.Talents.json[this.ConTalent[i]], this.ConTalent[i])+"</c>"
                let str: string = this.attributeTrans(this.Talents.json[this.ConTalent[i]], entry, this.ConTalent[i])
                if (str != "") {
                    tfcon = str + "\n"
                } else {
                    tfcon += "天赋【" + this.Talents.json[this.ConTalent[i]]["name"] + "】发动成功！" + this.Talents.json[this.ConTalent[i]]["description"] + "!\n"
                }
                let index = this.ConTalent.indexOf(this.ConTalent[i]);
                if (index > -1) {
                    //this.ConTalent.splice(index, 1);
                    this.ConTalent[index] = 0
                }
            }
        }

        //内容：

        //所有当前年龄包含的事件拿出来
        let AllEvents = []
        for (let i = 0; i < this.AgeJson.json[this.NowAge]["event"].length; i++) {
            AllEvents.push(this.AgeJson.json[this.NowAge]["event"][i].toString().split("*"))
        }

        let CanEvents = []//从Events选择能发生的事情
        let CanEventsweight = []//所有能发生的事情的权重
        //cc.log(AllEvents)

        for (let i = 0; i < AllEvents.length; i++) {
            if (!check(this.EventsJson.json[AllEvents[i][0]]["exclude"], "exclude") && check(this.EventsJson.json[AllEvents[i][0]]["include"], "include")) {
                //!exclude有某事件时一定随机不到为true&&有某事件时才能被随机到为true
                CanEvents.push(AllEvents[i][0])
                if (AllEvents[i].length > 1) { CanEventsweight.push(AllEvents[i][1]) } else { CanEventsweight.push("1") }
            }
        }
        //cc.log(CanEvents)
        //cc.log(CanEventsweight)
        let Maxweight = 0//最大权重
        let CanEventsweight2 = []//所有能发生的事情的权重2
        for (let i = 0; i < CanEventsweight.length; i++) {
            Maxweight += Number(CanEventsweight[i])
            CanEventsweight2.push(Maxweight)
        }
        //cc.log(CanEventsweight2)
        let targetWeight = Math.random() * Maxweight
        //cc.log(targetWeight)
        //最终通关谁大于targetWeight确定事件
        let index
        for (index = 0; index < CanEventsweight2.length; index++) {
            if (CanEventsweight2[index] > targetWeight) {
                break
            }
        }
        //cc.log(index)
        //cc.log(CanEvents[index])
        //加入事件池
        DEFAULT_PROP["EVT"].push(Number(CanEvents[index]))
        if (!DEFAULT_CJ["AEVT"].includes(Number(CanEvents[index]))) { DEFAULT_CJ["AEVT"].push(Number(CanEvents[index])) }
        //cc.log(DEFAULT_PROP["EVT"])

        let e = this.EventsJson.json[Number(CanEvents[index])]
        if (e == undefined) { e = this.EventsJson.json["10000"] }
        //追加事件
        this.cont = e["event"]
        this.contZhujia = ""

        if (this.NowAge == 500) console.log('数据111', e)

        if (e["branch"]) {
            if (this.NowAge == 500) {
                entry.getChildByName("Label").getComponent(cc.RichText).string = "<color=" + this.tex_4_lal + ">" + this.cont + "</c>"
                this.Brach(e, this.contZhujia, entry)
            } else {
                let isHave = false
                for (let i = 0; i < e["branch"].length; i++) {
                    if (check(e["branch"][i].split(":")[0])) {
                        //加入事件池
                        DEFAULT_PROP["EVT"].push(Number(e["branch"][i].split(":")[1]))
                        let dx = this.EventsJson.json[Number(e["branch"][i].split(":")[1])]
                        //属性变化
                        this.attributeTrans(dx, entry)
                        //追加描述
                        this.contZhujia += "\n" + dx["event"]//内容
                        isHave = true
                        if (dx["postEvent"]) {
                            this.contZhujia += "\n" + dx["postEvent"]
                        }

                        if (dx["effect"]) {
                            if (dx["effect"]["CHR"]) { let num: string = dx["effect"]["CHR"] > 0 ? "+" + dx["effect"]["CHR"] : dx["effect"]["CHR"]; this.contZhujia += "\n<color=" + this.tex_4_lal1 + ">颜值" + num + "</color>" }
                            if (dx["effect"]["INT"]) { let num: string = dx["effect"]["INT"] > 0 ? "+" + dx["effect"]["INT"] : dx["effect"]["INT"]; this.contZhujia += "\n<color=" + this.tex_4_lal1 + ">智力" + num + "</color>" }
                            if (dx["effect"]["STR"]) { let num: string = dx["effect"]["STR"] > 0 ? "+" + dx["effect"]["STR"] : dx["effect"]["STR"]; this.contZhujia += "\n<color=" + this.tex_4_lal1 + ">体质" + num + "</color>" }
                            if (dx["effect"]["MNY"]) { let num: string = dx["effect"]["MNY"] > 0 ? "+" + dx["effect"]["MNY"] : dx["effect"]["MNY"]; this.contZhujia += "\n<color=" + this.tex_4_lal1 + ">家境" + num + "</color>" }
                            if (dx["effect"]["SPR"]) { let num: string = dx["effect"]["SPR"] > 0 ? "+" + dx["effect"]["SPR"] : dx["effect"]["SPR"]; this.contZhujia += "\n<color=" + this.tex_4_lal1 + ">快乐" + num + "</color>" }
                        }

                        break;
                    }
                }
                //追加描述
                if (!isHave) {
                    if (e["postEvent"]) { this.contZhujia = "\n" + e["postEvent"] }
                }
            }
        } else {
            //追加描述
            if (e["postEvent"]) { this.contZhujia = "\n" + e["postEvent"] }
        }
        //let str;

        if (this.NowAge != 500) {

            if (this.contZhujia != "") {
                entry.getChildByName("Label").getComponent(cc.RichText).string =
                    "<color=" + this.tex_4_lal1 + ">" + tfcon + "</c>" +
                    "<color=" + this.tex_4_lal + ">" + this.cont + "</c>" +
                    "<color=" + this.tex_4_lal1 + ">" + this.contZhujia + "</c>"

                //str = this.cont + '\n' + this.contZhujia
            } else {
                entry.getChildByName("Label").getComponent(cc.RichText).string =
                    "<color=" + this.tex_4_lal1 + ">" + tfcon + "</c>" +
                    "<color=" + this.tex_4_lal + ">" + this.cont + "</c>"

                //str = this.cont
            }
        }
        // if (this.NowAge == 500) console.log('500岁年龄', this.NowAge)
        entry.getChildByName("LabelAge").getComponent(cc.Label).string = this.NowAge.toString()


        //属性变化
        this.attributeTrans(e, entry)

        //判断死亡
        if (DEFAULT_PROP["LIF"] <= 0) {
            this.isDeath = true;
            cc.find("Canvas/Group_4/Start").active = true
            cc.find("Canvas/Group_4/Auto").active = false
            cc.find("Canvas/Group_4/Auto2").active = false
        }

        entry.parent = cc.find("Canvas")
        let duh = entry.getChildByName("Label").getContentSize().height - 50.4
        //entry.parent = baba
        let bs = Math.floor(duh / 39)//多行倍率

        // if(this.NowAge==500){bs+=19}
        entry.setContentSize(cc.size(780, 65 + 40 * bs))
        entry.getChildByName("LabelAge").y += 20 * bs
        entry.getChildByName("Sprite").setContentSize(cc.size(780, 52 + 40 * bs))
        entry.getChildByName("BG").setContentSize(cc.size(600, 80 + 40 * bs))
        //排版
        let pb = entry.getContentSize().height
        //cc.log(entry.getChildByName("Label").getContentSize().height)
        entry.parent = baba
        // if (this.NowAge == 500) console.log('500岁年龄', entry.getChildByName("LabelAge").getComponent(cc.Label).string, entry.getChildByName("Label").getComponent(cc.RichText).string)

        cc.find("Canvas/Group_4/ScrollView").getComponent(cc.ScrollView).scrollToBottom(0.1)

        //年龄加一

        if (this.rebuild) {
            this.NowAge += this.rebuildAge;
            this.rebuild = false;
        } else {
            this.NowAge += 1
        }
        DEFAULT_PROP.AGE = this.NowAge
        //成就检查
        this.check_cj("TRAJECTORY")
    }

    Brach(e: any, contZhujia: any, entry: any) {
        let isHave = false
        for (let i = 0; i < e["branch"].length; i++) {
            // cc.log(i)
            if (check(e["branch"][i].split(":")[0])) {
                // cc.log(Number(e["branch"][i].split(":")[1]))
                let dx = this.EventsJson.json[Number(e["branch"][i].split(":")[1])]
                //追加描述
                contZhujia = '\n' + dx["event"]//内容
                // console.log('内容', contZhujia)
                isHave = true
                entry.getChildByName("Label").getComponent(cc.RichText).string += "<color=" + this.tex_4_lal + ">" + contZhujia + "</c>"

                if (dx["postEvent"]) {
                    entry.getChildByName("Label").getComponent(cc.RichText).string += "<color=" + this.tex_4_lal1 + ">" + '\n' + dx["postEvent"] + "</c>"
                }
                //属性变化
                this.attributeTrans(dx, entry)
                if (dx["branch"]) { this.Brach(dx, contZhujia, entry) }
                break
            }
        }
        //追加描述
        if (isHave) {
            if (e["postEvent"]) { contZhujia += e["postEvent"] }
            return contZhujia
        }
    }
    STRadd(event, customEventData) {
        // {
        DEFAULT_PROP["STR"] += Number(customEventData);
        cc.find("Canvas/Group_4/Layout/STR/Background/Label").getComponent(cc.RichText).string = `<color=${this.group_4_lal}>体质 </c><color=${this.group_4_lal1}>` + DEFAULT_PROP["STR"] + "</color>"; DEFAULT_CJ["HSTR"] = DEFAULT_PROP["STR"] > DEFAULT_CJ["HSTR"] ? DEFAULT_PROP["STR"] : DEFAULT_CJ["HSTR"]; DEFAULT_CJ["LSTR"] = DEFAULT_PROP["STR"] < DEFAULT_CJ["LSTR"] ? DEFAULT_PROP["STR"] : DEFAULT_CJ["LSTR"];
        // }
    }
    //属性变化
    attributeTrans(e: any, entry: cc.Node, index?: number) {
        //DEFAULT_PROP["STR"] +=100
        if (e["effect"]) {
            if (e["effect"]["CHR"]) { DEFAULT_PROP["CHR"] += e["effect"]["CHR"]; cc.find("Canvas/Group_4/Layout/CHR/Background/Label").getComponent(cc.RichText).string = `<color=${this.group_4_lal}>颜值 </c><color=${this.group_4_lal1}>` + DEFAULT_PROP["CHR"] + "</color>"; DEFAULT_CJ["HCHR"] = DEFAULT_PROP["CHR"] > DEFAULT_CJ["HCHR"] ? DEFAULT_PROP["CHR"] : DEFAULT_CJ["HCHR"]; DEFAULT_CJ["LCHR"] = DEFAULT_PROP["CHR"] < DEFAULT_CJ["LCHR"] ? DEFAULT_PROP["CHR"] : DEFAULT_CJ["LCHR"]; let num: string = e["effect"]["CHR"] > 0 ? "+" + e["effect"]["CHR"] : e["effect"]["CHR"]; entry.getChildByName("Label").getComponent(cc.RichText).string += "\n<color=" + this.tex_4_lal1 + ">颜值" + num + "</color>" }
            if (e["effect"]["INT"]) { DEFAULT_PROP["INT"] += e["effect"]["INT"]; cc.find("Canvas/Group_4/Layout/INT/Background/Label").getComponent(cc.RichText).string = `<color=${this.group_4_lal}>智力 </c><color=${this.group_4_lal1}>` + DEFAULT_PROP["INT"] + "</color>"; DEFAULT_CJ["HINT"] = DEFAULT_PROP["INT"] > DEFAULT_CJ["HINT"] ? DEFAULT_PROP["INT"] : DEFAULT_CJ["HINT"]; DEFAULT_CJ["LINT"] = DEFAULT_PROP["INT"] < DEFAULT_CJ["LINT"] ? DEFAULT_PROP["INT"] : DEFAULT_CJ["LINT"]; let num: string = e["effect"]["INT"] > 0 ? "+" + e["effect"]["INT"] : e["effect"]["INT"]; entry.getChildByName("Label").getComponent(cc.RichText).string += "\n<color=" + this.tex_4_lal1 + ">智力" + num + "</color>" }
            if (e["effect"]["STR"]) { DEFAULT_PROP["STR"] += e["effect"]["STR"]; cc.find("Canvas/Group_4/Layout/STR/Background/Label").getComponent(cc.RichText).string = `<color=${this.group_4_lal}>体质 </c><color=${this.group_4_lal1}>` + DEFAULT_PROP["STR"] + "</color>"; DEFAULT_CJ["HSTR"] = DEFAULT_PROP["STR"] > DEFAULT_CJ["HSTR"] ? DEFAULT_PROP["STR"] : DEFAULT_CJ["HSTR"]; DEFAULT_CJ["LSTR"] = DEFAULT_PROP["STR"] < DEFAULT_CJ["LSTR"] ? DEFAULT_PROP["STR"] : DEFAULT_CJ["LSTR"]; let num: string = e["effect"]["STR"] > 0 ? "+" + e["effect"]["STR"] : e["effect"]["STR"]; entry.getChildByName("Label").getComponent(cc.RichText).string += "\n<color=" + this.tex_4_lal1 + ">体质" + num + "</color>" }
            if (e["effect"]["MNY"]) { DEFAULT_PROP["MNY"] += e["effect"]["MNY"]; cc.find("Canvas/Group_4/Layout/MNY/Background/Label").getComponent(cc.RichText).string = `<color=${this.group_4_lal}>家境 </c><color=${this.group_4_lal1}>` + DEFAULT_PROP["MNY"] + "</color>"; DEFAULT_CJ["HMNY"] = DEFAULT_PROP["MNY"] > DEFAULT_CJ["HMNY"] ? DEFAULT_PROP["MNY"] : DEFAULT_CJ["HMNY"]; DEFAULT_CJ["LMNY"] = DEFAULT_PROP["MNY"] < DEFAULT_CJ["LMNY"] ? DEFAULT_PROP["MNY"] : DEFAULT_CJ["LMNY"]; let num: string = e["effect"]["MNY"] > 0 ? "+" + e["effect"]["MNY"] : e["effect"]["MNY"]; entry.getChildByName("Label").getComponent(cc.RichText).string += "\n<color=" + this.tex_4_lal1 + ">家境" + num + "</color>" }
            if (e["effect"]["SPR"]) { DEFAULT_PROP["SPR"] += e["effect"]["SPR"]; cc.find("Canvas/Group_4/Layout/SPR/Background/Label").getComponent(cc.RichText).string = `<color=${this.group_4_lal}>快乐 </c><color=${this.group_4_lal1}>` + DEFAULT_PROP["SPR"] + "</color>"; DEFAULT_CJ["HSPR"] = DEFAULT_PROP["SPR"] > DEFAULT_CJ["HSPR"] ? DEFAULT_PROP["SPR"] : DEFAULT_CJ["HSPR"]; DEFAULT_CJ["LSPR"] = DEFAULT_PROP["SPR"] < DEFAULT_CJ["LSPR"] ? DEFAULT_PROP["SPR"] : DEFAULT_CJ["LSPR"]; let num: string = e["effect"]["SPR"] > 0 ? "+" + e["effect"]["SPR"] : e["effect"]["SPR"]; entry.getChildByName("Label").getComponent(cc.RichText).string += "\n<color=" + this.tex_4_lal1 + ">快乐" + num + "</color>" }
            if (e["effect"]["LIF"]) { DEFAULT_PROP["LIF"] += e["effect"]["LIF"]; }
            if (e["effect"]["AGE"]) {
                if (e['id'] == 20409) {
                    this.rebuild = true;
                    this.rebuildAge = Number(e["effect"]["AGE"])
                } else {
                    this.NowAge += Number(e["effect"]["AGE"]);
                }
                DEFAULT_CJ["HAGE"] = this.NowAge > DEFAULT_CJ["HAGE"] ? this.NowAge : DEFAULT_CJ["HAGE"]
            }
            if (e["effect"]["RDM"]) {
                //随机属性增加
                let i: number = e["effect"]["RDM"]
                for (let a = 0; a < i; a++) {
                    switch (Math.ceil(Math.random() * 5)) {
                        case 1: DEFAULT_PROP["CHR"] += 1; cc.find("Canvas/Group_4/Layout/CHR/Background/Label").getComponent(cc.RichText).string = `<color=${this.group_4_lal}>颜值 </c><color=${this.group_4_lal1}>` + DEFAULT_PROP["CHR"] + "</color>"; break;
                        case 2: DEFAULT_PROP["INT"] += 1; cc.find("Canvas/Group_4/Layout/INT/Background/Label").getComponent(cc.RichText).string = `<color=${this.group_4_lal}>智力 </c><color=${this.group_4_lal1}>` + DEFAULT_PROP["INT"] + "</color>"; break;
                        case 3: DEFAULT_PROP["STR"] += 1; cc.find("Canvas/Group_4/Layout/STR/Background/Label").getComponent(cc.RichText).string = `<color=${this.group_4_lal}>体质 </c><color=${this.group_4_lal1}>` + DEFAULT_PROP["STR"] + "</color>"; break;
                        case 4: DEFAULT_PROP["MNY"] += 1; cc.find("Canvas/Group_4/Layout/MNY/Background/Label").getComponent(cc.RichText).string = `<color=${this.group_4_lal}>家境 </c><color=${this.group_4_lal1}>` + DEFAULT_PROP["MNY"] + "</color>"; break;
                        case 5: DEFAULT_PROP["SPR"] += 1; cc.find("Canvas/Group_4/Layout/SPR/Background/Label").getComponent(cc.RichText).string = `<color=${this.group_4_lal}>快乐 </c><color=${this.group_4_lal1}>` + DEFAULT_PROP["SPR"] + "</color>"; break;
                    }
                }
            }
        }
        SaveUtils.inst.SaveData()
        if (e["replacement"]) {
            if (e["replacement"]["grade"]) {
                console.log('数据', e["replacement"]["grade"], e)
                let grade = e["replacement"]["grade"][0]//稀有度
                let grades = []
                // console.log('数组',grades)
                for (let i = 0; i < Object.keys(this.Talents.json).length; i++) {
                    // console.log('条件', !this.tichu.includes(1001 + i), this.Talents.json[1001 + i]["show"], this.Talents.json[1001 + i]["grade"], grade)
                    if (!this.tichu.includes(1001 + i) && this.Talents.json[1001 + i]["show"] != 0 && this.Talents.json[1001 + i]["grade"] == grade) {//剔除数组里没有，并且稀有度符合
                        grades.push(1001 + i)
                    }
                }
                // console.log('数组',grades)
                let j = Math.floor(Math.random() * grades.length)
                grades[j]//最终随出来的
                let h = DEFAULT_PROP.TLT.indexOf(index)//要被替换的天赋的角标
                DEFAULT_PROP.TLT[h] = grades[j]//替换
                this.ConTalent.push(grades[j])//替换
                //this.TipsOpen(true, "天赋【" + this.Talents.json[index]["name"] + "】发动成功！替换成【" + this.Talents.json[grades[j]]["name"] + "】")
                return "天赋【" + this.Talents.json[index]["name"] + "】发动成功！替换成【" + this.Talents.json[grades[j]]["name"] + "】"
            } else if (e["replacement"]["talent"]) {
                //console.log('数据1', e["replacement"]["talent"], e)
                let grades = []
                for (let i = 0; i < e["replacement"]["talent"].length; i++) {
                    grades.push(e["replacement"]["talent"][i].toString().split('*')[0])
                }
                let j = Math.floor(Math.random() * grades.length)
                grades[j]//最终随出来的
                let h = DEFAULT_PROP.TLT.indexOf(index)//要被替换的天赋的角标
                DEFAULT_PROP.TLT[h] = grades[j]//替换
                this.ConTalent.push(grades[j])//替换
                //this.TipsOpen(true, "天赋【" + this.Talents.json[index]["name"] + "】发动成功！替换成【" + this.Talents.json[grades[j]]["name"] + "】")
                return "天赋【" + this.Talents.json[index]["name"] + "】发动成功！替换成【" + this.Talents.json[grades[j]]["name"] + "】"
            }
        } else {
            return ""
        }
    }
    //自动添加点击事件
    AutoAddClickEvent(node: cc.Node, componentName: string, handlerName: string, parameter: string, button: cc.Node) {
        let clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = componentName;
        clickEventHandler.handler = handlerName;
        clickEventHandler.customEventData = parameter;
        button.getComponent(cc.Button).clickEvents.push(clickEventHandler);
    }


    Zongjie() {
        //数据持久化
        DEFAULT_CJ.TMS += 1
        SaveUtils.inst.SaveData()
        if (UserModel.instance.adCd) {
            UserModel.instance.adCd = false;
            UserModel.instance.save();
        }
        //界面切换
        cc.find("Canvas/Group_4").active = false
        cc.find("Canvas/Group_5").active = true
        //评分
        cc.find("Canvas/Group_5/Box/Layout/CHR/Label").getComponent(cc.RichText).string = `<color=${this.group_4_lal}>颜值 </c><color=${this.group_4_lal1}>` + DEFAULT_PROP["CHR"] + "</color>"
        cc.find("Canvas/Group_5/Box/Layout/INT/Label").getComponent(cc.RichText).string = `<color=${this.group_4_lal}>智力 </c><color=${this.group_4_lal1}>` + DEFAULT_PROP["INT"] + "</color>"
        cc.find("Canvas/Group_5/Box/Layout/STR/Label").getComponent(cc.RichText).string = `<color=${this.group_4_lal}>体质 </c><color=${this.group_4_lal1}>` + DEFAULT_PROP["STR"] + "</color>"
        cc.find("Canvas/Group_5/Box/Layout/MNY/Label").getComponent(cc.RichText).string = `<color=${this.group_4_lal}>家境 </c><color=${this.group_4_lal1}>` + DEFAULT_PROP["MNY"] + "</color>"
        cc.find("Canvas/Group_5/Box/Layout/SPR/Label").getComponent(cc.RichText).string = `<color=${this.group_4_lal}>快乐 </c><color=${this.group_4_lal1}>` + DEFAULT_PROP["SPR"] + "</color>"
        cc.find("Canvas/Group_5/Box/AGE/Label").getComponent(cc.Label).string = "第" + DEFAULT_CJ["TMS"] + "世，享年" + this.NowAge + "岁"
        let sum = DEFAULT_PROP["CHR"] + DEFAULT_PROP["INT"] + DEFAULT_PROP["STR"] + DEFAULT_PROP["MNY"] + DEFAULT_PROP["SPR"] + this.NowAge//总分计算公式
        DEFAULT_CJ["SUM"] = sum > DEFAULT_CJ["SUM"] ? sum : DEFAULT_CJ["SUM"];
        cc.find("Canvas/Group_5/Box/SUM/Label").getComponent(cc.Label).string = sum.toString()
        cc.find("Canvas/Group_5/Box/Legend/" + summary("SUM", sum)["judge"]).active = true
        //下辈子三选一天赋
        for (let i = 0; i < DEFAULT_PROP["TLT"].length; i++) {
            //打开label
            cc.find("Canvas/Group_5/Box/Label2").active = true
            let index = DEFAULT_PROP["TLT"][i]
            let j = cc.instantiate(this.normalLabel)
            this.updateNromalLable(j, grades[this.Talents.json[index]["grade"]])
            j.parent = cc.find("Canvas/Group_5/Box/ScrollView2/view/Layout")
            this.AutoAddClickEvent(this.node, "Main", "SelectLunTalent", (i + 1).toString(), j)
            j.getChildByName("Label").getComponent(cc.Label).string = this.Talents.json[index]["name"] + "(" + this.Talents.json[index]["description"] + ")"
        }
        //插屏


        if (cc.sys.platform == cc.sys.VIVO_GAME || cc.sys.platform == cc.sys.XIAOMI_GAME || window['uc']) {
            // console.log('请选择')
            Global.platform.SHOW_TITIALAD1()
        }

        //特效销毁
        this.scheduleOnce(() => {

            cc.find("Canvas/Group_5/Box/Anim").active = false
            cc.find("Canvas/Group_5/Box/Legend").active = true
        }, 1.5)


        //成就检查
        this.check_cj("SUMMARY")

    }

    isAutoPlay() {

        if (!this.istimmerCDauto) {
            this.istimmerCDauto = true

        } else {
            return
        }

        if (!SaveData.isAutoAD) {
            if (window["tt"]) {
                //垃圾抖音得先弹窗
                this.is1or2 = 1
                cc.find("Canvas/Group_4/DYLJ").active = true
                return
            }
            Global.platform.CLOSE_VIDEO(
                () => {
                    SaveData.isAuto = true
                    SaveData.isAutoAD = true
                    SaveData.isAuto2 = false
                    cc.find("Canvas/Group_4/Auto2/Background/ZD1").active = true
                    cc.find("Canvas/Group_4/Auto2/Background/ZD2").active = false
                    SaveUtils.inst.SaveData()
                    cc.find("Canvas/Group_4/Auto/Background/Icon").active = false
                    cc.find("Canvas/Group_4/Auto/Background/ZD1").active = false
                    cc.find("Canvas/Group_4/Auto/Background/ZD2").active = true
                    cc.find("Canvas/Group_4/DYLJ").active = false
                },
                () => {
                    this.TipsOpen(true, cc.color(128, 223, 239), "广告未播放完成")
                }
                , () => {
                    this.TipsOpen(true, cc.color(128, 223, 239), "暂无广告，请稍后再试")
                }, "18"
            )
        } else {

            SaveData.isAuto2 = false
            cc.find("Canvas/Group_4/Auto2/Background/ZD1").active = true
            cc.find("Canvas/Group_4/Auto2/Background/ZD2").active = false
            if (SaveData.isAuto) {
                SaveData.isAuto = false
                cc.find("Canvas/Group_4/Auto/Background/ZD1").active = true
                cc.find("Canvas/Group_4/Auto/Background/ZD2").active = false
            } else {
                SaveData.isAuto = true
                cc.find("Canvas/Group_4/Auto/Background/ZD1").active = false
                cc.find("Canvas/Group_4/Auto/Background/ZD2").active = true
            }
            SaveUtils.inst.SaveData()
        }
    }
    isAutoPlay2() {
        if (!this.istimmerCDauto) {
            this.istimmerCDauto = true
        } else {
            return
        }
        if (SaveData.isAutoAD2 && Math.round(new Date().getTime()) / 1000 - SaveData.LastTime > ADtime) {
            //超时了
            SaveData.isAutoAD2 = false
            SaveData.isAuto2 = false
        }
        if (!SaveData.isAutoAD2) {
            if (window["tt"]) {
                //垃圾抖音得先弹窗
                this.is1or2 = 2
                cc.find("Canvas/Group_4/autobiography").active = true
                return
            }
            Global.platform.CLOSE_VIDEO(
                () => {
                    SaveData.LastTime = Math.round(new Date().getTime()) / 1000
                    SaveData.isAuto2 = true
                    SaveData.isAutoAD2 = true
                    SaveData.isAuto = false
                    cc.find("Canvas/Group_4/Auto/Background/ZD1").active = true
                    cc.find("Canvas/Group_4/Auto/Background/ZD2").active = false
                    SaveUtils.inst.SaveData()
                    cc.find("Canvas/Group_4/Auto2/Background/Icon").active = false
                    cc.find("Canvas/Group_4/Auto2/Background/ZD1").active = false
                    cc.find("Canvas/Group_4/Auto2/Background/ZD2").active = true
                    cc.find("Canvas/Group_4/DYLJ").active = false
                },
                () => {
                    this.TipsOpen(true, cc.color(128, 223, 239), "广告未播放完成")
                }
                , () => {
                    this.TipsOpen(true, cc.color(128, 223, 239), "暂无广告，请稍后再试")
                }, '62'
            )
        } else {
            SaveData.isAuto = false
            cc.find("Canvas/Group_4/Auto/Background/ZD1").active = true
            cc.find("Canvas/Group_4/Auto/Background/ZD2").active = false

            if (SaveData.isAuto2) {
                SaveData.isAuto2 = false
                cc.find("Canvas/Group_4/Auto2/Background/ZD1").active = true
                cc.find("Canvas/Group_4/Auto2/Background/ZD2").active = false
            } else {

                SaveData.isAuto2 = true
                cc.find("Canvas/Group_4/Auto2/Background/ZD1").active = false
                cc.find("Canvas/Group_4/Auto2/Background/ZD2").active = true
            }
            SaveUtils.inst.SaveData()
        }
    }

    closeAutoPlay2() {
        cc.find("Canvas/Group_4/autobiography").active = false
    }

    watchAutoPlay2() {
        Global.platform.CLOSE_VIDEO(
            () => {
                cc.find("Canvas/Group_4/autobiography").active = false
                SaveData.LastTime = Math.round(new Date().getTime()) / 1000
                SaveData.isAuto2 = true
                SaveData.isAutoAD2 = true
                SaveData.isAuto = false
                cc.find("Canvas/Group_4/Auto/Background/ZD1").active = true
                cc.find("Canvas/Group_4/Auto/Background/ZD2").active = false
                SaveUtils.inst.SaveData()
                cc.find("Canvas/Group_4/Auto2/Background/Icon").active = false
                cc.find("Canvas/Group_4/Auto2/Background/ZD1").active = false
                cc.find("Canvas/Group_4/Auto2/Background/ZD2").active = true
                cc.find("Canvas/Group_4/DYLJ").active = false
            },
            () => {
                this.TipsOpen(true, cc.color(128, 223, 239), "广告未播放完成")
            }
            , () => {
                this.TipsOpen(true, cc.color(128, 223, 239), "暂无广告，请稍后再试")
            }, '62'
        )
    }

    AutoFuc() {
        Global.platform.CLOSE_VIDEO(
            () => {
                if (this.is1or2) {
                    SaveData.isAuto = true
                    SaveData.isAutoAD = true
                } else {
                    SaveData.isAuto2 = true
                    SaveData.isAutoAD2 = true
                }
                SaveUtils.inst.SaveData()
                cc.find("Canvas/Group_4/Auto/Background/Icon").active = false
                cc.find("Canvas/Group_4/Auto/Background/ZD1").active = false
                cc.find("Canvas/Group_4/Auto/Background/ZD2").active = true
                cc.find("Canvas/Group_4/DYLJ").active = false

            },
            () => {
                this.TipsOpen(true, cc.color(128, 223, 239), "广告未播放完成")
            }
            ,
            () => {
                this.TipsOpen(true, cc.color(128, 223, 239), "暂无广告，请稍后再试")
            }, "18"
        )
    }
    //Groud_5
    rerere() {
        Global.isFirstEnterCJ = true;
        cc.director.loadScene('LifeRebirth')
    }
    WXShare() {
        //微信手动分享
        Global.platform.Share(() => { })
    }
    //选择轮回天赋
    SelectLunTalent(event, customEventData) {
        SaveData.LunHuiTalent = Number(DEFAULT_PROP["TLT"][customEventData - 1])
        SaveUtils.inst.SaveData()

        for (let i = 0; i < cc.find("Canvas/Group_5/Box/ScrollView2/view/Layout").childrenCount; i++) {
            if (Number(customEventData) === (i + 1)) {
                cc.find("Canvas/Group_5/Box/ScrollView2/view/Layout").children[i].getChildByName("Box_Selected").active = true
            } else {
                cc.find("Canvas/Group_5/Box/ScrollView2/view/Layout").children[i].getChildByName("Box_Selected").active = false
            }
        }
    }
    //广告（天选之人）
    addAttribute(event, customEventData) {
        Global.platform.CLOSE_VIDEO(
            () => {
                let num = Number(customEventData)
                this.MaxUseNum += num
                this.CanUse(num)
                if (this.TXCS >= 2) {

                    cc.find("Canvas/Group_3/ADD").active = false
                    cc.find("Canvas/Group_3/Random").x = 0

                }
                console.log("成功")
            },
            () => {
                console.log("失败")
            }
            , () => {
                this.TipsOpen(true, cc.color(128, 223, 239), "暂无广告，请稍后再试")
            }, "15"
        )
    }
    //从新抽天赋(逆天改命)
    Reopen(event, customEventData) {
        Global.platform.CLOSE_VIDEO(
            () => {
                //重置逻辑
                DEFAULT_PROP["TLT"] = []
                this.AlreadyTalentButton = []
                this.AllShowTalent = []
                this.NowSelectTalentNum = 0

                //奖励一个稀有度为2的天赋
                let twe = [1005, 1014, 1018, 1019, 1024, 1025, 1083, 1104, 1112, 1128, 1129, 1131]
                let zs = twe[Math.floor(Math.random() * twe.length)]

                SaveData.LunHuiTalent = zs
                SaveUtils.inst.SaveData()

                this.TenCP()
                console.log("成功")
            },
            () => {
                console.log("失败")
            }
            , () => {
                this.TipsOpen(true, cc.color(128, 223, 239), "暂无广告，请稍后再试")
            }, "12"
        )
    }
    moveStart(e: cc.Touch) {
        this.startPos = null;
        this.startPos = e.getLocation()
    }

    moveIng(e: cc.Touch) {
        if (e.getLocation().y - this.startPos.y >= 15) {
            this.TipsOpen(false, cc.color(128, 223, 239))
        }

    }

    //Group_6返回按钮
    Group_6_Return() {
        if (this.achievement) {
            this.achievement.destroy();
            this.achievement = null;
        }
        cc.find("Canvas/Group_1").active = true
        cc.find("Canvas/Group_6").active = false
        Global.gapTime = 0;
        Global.isShow = true;
    }
    //打开成就界面
    Open_chengjiu() {
        this.Gentalent()
        cc.find("Canvas/Group_1").active = false
        cc.find("Canvas/Group_6").active = true
        Global.gapTime = 0;
        Global.isShow = false;
    }
    //生成天赋
    Gentalent() {
        let mao: any[] = [];
        let mao1: any[] = [];
        for (let i in this.Achievement.json) {
            if (DEFAULT_CJ.ACJ.includes(this.Achievement.json[i].id)) {
                mao.push(this.Achievement.json[i]);
            } else {
                mao1.push(this.Achievement.json[i]);
            }
        }

        for (let i = 0; i < mao1.length; i++) {
            mao.push(mao1[i])
        }

        let mao2: any[][] = [];//

        let num = Math.ceil(Object.keys(this.Achievement.json).length * 0.5);

        for (let k = 0, index = 0; k < num; k++) {

            mao2.push(mao.slice(index, index += 2));

        }

        ResMgr.loadPrefab('prefab/achievement', (pre) => {
            let prefab: cc.Node = cc.instantiate(pre)
            prefab.parent = this.node.getChildByName('Group_6');
            let hight = (cc.winSize.height - 1280) / 2
            prefab.y = -220
            prefab.getComponent(Achievement).data = mao2;
            prefab.getComponent(Achievement).init()
            this.achievement = prefab;
        })
    }
    //统计
    tongji() {
        cc.find("Canvas/Group_6/Layout/1/Title").getComponent(cc.Label).string = "已重开" + DEFAULT_CJ.TMS + "次"
        cc.find("Canvas/Group_6/Layout/2/Title").getComponent(cc.Label).string = "成就达成" + DEFAULT_CJ.ACJ.length + "个"

        cc.find("Canvas/Group_6/Layout/1/Con").getComponent(cc.Label).string = "抽到紫色概率" + summary("CK", DEFAULT_CJ.TMS).judge
        cc.find("Canvas/Group_6/Layout/2/Con").getComponent(cc.Label).string = "抽到橙色概率" + summary("CJ", DEFAULT_CJ.ACJ.length).judge

        cc.find("Canvas/Group_6/Layout/3/Con").getComponent(cc.Label).string = Math.ceil(DEFAULT_CJ.AEVT.length * 100 / Object.keys(this.Events.json).length) + "%"
        cc.find("Canvas/Group_6/Layout/4/Con").getComponent(cc.Label).string = Math.ceil(DEFAULT_CJ.ATLT.length * 100 / Object.keys(this.Talents.json).length) + "%"
    }

    group3In() {
        //关闭天赋选择面板
        cc.find("Canvas/Group_2").active = false
        cc.find("Canvas/Group_3").active = true
    }

    //关闭小友
    CloseXY() {
        cc.find("Canvas/Group_2/AddTalent").active = false
        this.group3In()
    }

    openVideo() {
        ResMgr.loadPrefab('prefab/rankingList', (pre) => {
            let prefab = cc.instantiate(pre)
            prefab.parent = this.node;
        })
    }
    openGameBox() {
        ResMgr.loadPrefab('prefab/gameBox', (pre) => {
            let prefab = cc.instantiate(pre)
            prefab.parent = this.node;
        })
    }
}
