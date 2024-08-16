"use strict";
cc._RF.push(module, '36179zc4vZH4IduzVoqkCLS', 'Main');
// Scripts/Main/Main.ts

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
var Global_1 = require("../AD/Global");
var weChatPlatform_1 = require("../AD/weChatPlatform");
var GlobalDefine_1 = require("../Other/GlobalDefine");
var SaveUtils_1 = require("../Other/SaveUtils");
var UserModel_1 = require("../Other/UserModel");
var achievement_1 = require("./achievement");
var condition_1 = require("./condition");
var Entry_1 = require("./Entry");
var ResMgr_1 = require("./ResMgr");
var summary_1 = require("./summary");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.wgnb = false;
        _this.branchline = null;
        _this.Age = null;
        _this.Events = null;
        _this.Talents = null;
        _this.Achievement = null;
        _this.IndexOfEvent = 0;
        _this.AgeJson = null; //当前的age表
        _this.EventsJson = null; //当前的event表
        //UI
        _this.TenCPShow = null;
        _this.TenCPButton = null;
        _this.Tips = null;
        _this.Entry = null;
        _this.Box = null;
        _this.normalLabel = null;
        _this.MyzzBox = null;
        //选择天赋判断
        _this.NowSelectTalentNum = 0; //当前选择天赋数量
        _this.MaxSelectTalentNum = 150; //最大选择天赋数量
        _this.AlreadyTalentButton = []; //已经选择的天赋按钮
        _this.AllShowTalent = []; //所有可以选择的天赋，index就是按钮的顺序（从上到下）
        _this.ConTalent = []; //每年检测的天赋
        //计时器
        _this.TipsIsOpen = false; //tips面板是否打开
        _this.TipsTimer = 0; //tips计时器
        //数值
        _this.MaxpropertyNum = 10; //各个属性最大值
        _this.MaxUseNum = 20; //最大可用点数
        _this.StarUseNum = _this.MaxUseNum; //初始可用点数
        _this.NowAge = 0; //当前年龄
        _this.isDeath = false;
        _this.isBool = false;
        _this.listArr = []; //事件列表数据
        _this.adTime = 0;
        _this.timmerCDauto = 0; //自动播放按钮广告CD
        _this.istimmerCDauto = false; //自动播放按钮广告CD
        _this.completely = 0; //加载完全
        _this.TXCS = 0; //天选次数
        _this._lastPosX = 0; //坐标转换之后的X值
        _this.cont = "";
        _this.contZhujia = "";
        _this.tichu = [];
        _this.isOpenXY = false;
        _this.group_4_lal = '#000000';
        _this.group_4_lal1 = '#000000';
        _this.tex_4_lal = '#000000';
        _this.tex_4_lal1 = '#000000';
        _this.isMyzzShow = false; //是否是主线剧情
        _this.skinPrefab = null;
        _this.is1or2 = 1;
        //背景图颜色
        _this.quality = null;
        _this.quality1 = null;
        _this.quality2 = null;
        _this.quality3 = null;
        //存储自传图片按钮
        _this.experienceSp = null;
        _this.RamTF = 10; //天赋数量
        _this.isWUDI = true; //是否是无敌模式
        _this.choice = false; //仙人指路选择完成
        _this.skinCd = false;
        _this.maozizizi = false; //第几次开始人生
        _this.rebuild = false; //是否转世重修
        _this.rebuildAge = 0; //从多少岁转世重修
        return _this;
    }
    Main.prototype.onLoad = function () {
        var _this = this;
        Global_1.default.platform = new weChatPlatform_1.default();
        this.replaceAll();
        //测试
        condition_1.DEFAULT_PROP["CHR"] = 0;
        condition_1.DEFAULT_PROP["INT"] = 0;
        condition_1.DEFAULT_PROP["LIF"] = 1;
        condition_1.DEFAULT_PROP["MNY"] = 0;
        condition_1.DEFAULT_PROP["SPR"] = 0;
        condition_1.DEFAULT_PROP["STR"] = 0;
        condition_1.DEFAULT_PROP["TLT"] = [];
        condition_1.DEFAULT_PROP["EVT"] = [];
        this.Tips.on(cc.Node.EventType.TOUCH_START, this.moveStart, this);
        this.Tips.on(cc.Node.EventType.TOUCH_MOVE, this.moveIng, this);
        //读表
        ResMgr_1.default.loadText("Json/branchline", function (branchline) { _this.branchline = branchline; });
        ResMgr_1.default.loadText("Json/0/age", function (age) { _this.Age = age, _this.Onloadtimer(); });
        ResMgr_1.default.loadText("Json/0/events", function (events) { _this.Events = events, _this.Onloadtimer(); });
        ResMgr_1.default.loadText("Json/0/talents", function (talents) { _this.Talents = talents, _this.Onloadtimer(); });
        ResMgr_1.default.loadText("Json/0/achievement", function (achievement) { _this.Achievement = achievement, _this.Onloadtimer(); });
        if (!GlobalDefine_1.SaveData.isAutoAD) {
            cc.find("Canvas/Group_4/Auto/Background/Icon").active = true;
        }
        if (!GlobalDefine_1.SaveData.isAutoAD2) {
            cc.find("Canvas/Group_4/Auto2/Background/Icon").active = true;
        }
        if (GlobalDefine_1.SaveData.isAuto) {
            cc.find("Canvas/Group_4/Auto/Background/ZD1").active = false;
            cc.find("Canvas/Group_4/Auto/Background/ZD2").active = true;
        }
        else {
            cc.find("Canvas/Group_4/Auto/Background/ZD1").active = true;
            cc.find("Canvas/Group_4/Auto/Background/ZD2").active = false;
        }
        if (GlobalDefine_1.SaveData.isAuto2) {
            cc.find("Canvas/Group_4/Auto2/Background/ZD1").active = false;
            cc.find("Canvas/Group_4/Auto2/Background/ZD2").active = true;
        }
        else {
            cc.find("Canvas/Group_4/Auto2/Background/ZD1").active = true;
            cc.find("Canvas/Group_4/Auto2/Background/ZD2").active = false;
        }
        //数据应用
        this.CanUse(0);
        if (condition_1.DEFAULT_CJ.TMS < 1) {
            cc.find("Canvas/Group_1/achievement").active = false;
        }
        this.eventScrollView = cc.find("Canvas/Group_4/ScrollView");
        this._content = cc.find("Canvas/Group_4/ScrollView/view/Layout");
        this.tongji();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onNeiGua, this);
    };
    Main.prototype.onNeiGua = function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.MaxUseNum += 20;
                this.CanUse(20);
                break;
            case cc.macro.KEY.b:
                this.wgnb = true;
                break;
        }
    };
    Main.prototype.Onloadtimer = function () {
        this.completely++;
        if (this.completely == 4) {
            this.tongji();
            cc.find('Group_1/achievement', this.node).active = true;
        }
    };
    //主线选择
    Main.prototype.SelectStory = function (event, customEventData) {
        this.AgeJson = this.Age;
        this.EventsJson = this.Events;
        this.IndexOfEvent = 0;
    };
    //不选天赋直接进入下一级
    Main.prototype.EnterNext = function (event, customEventData) {
        if (GlobalDefine_1.SaveData.Myzz[Number(customEventData) - 1] == 1) {
            cc.find("Canvas/Group_2").active = false;
            cc.find("Canvas/Group_7").active = false;
            cc.find("Canvas/BG").active = true;
            cc.find("Canvas/Group_3").active = true;
        }
        else {
            for (var p = 0; p < Object.keys(this.branchline.json).length; p++) {
                if (this.branchline.json[p + 1]["id"] == customEventData) {
                    this.TipsOpen(true, cc.color(128, 223, 239), "完成成就 【" + this.Achievement.json[this.branchline.json[p + 1]["achievementID"]]["name"] + "】 解锁");
                }
            }
        }
    };
    Main.prototype.update = function (dt) {
        if (this.TipsIsOpen) {
            this.TipsTimer += dt;
            if (this.TipsTimer >= 1.5) {
                this.TipsOpen(false, cc.color(128, 223, 239));
            }
        }
        if (this.istimmerCDauto) {
            this.timmerCDauto += 1;
            if (this.timmerCDauto >= 15) {
                this.timmerCDauto = 0;
                this.istimmerCDauto = false;
            }
        }
        if (GlobalDefine_1.SaveData.isAuto && this.isBool) {
            this.adTime += dt;
            if (this.adTime >= 1.5) {
                this.adTime = 0;
                this.Continue();
            }
        }
        if (GlobalDefine_1.SaveData.isAuto2 && this.isBool) {
            this.adTime += dt;
            if (this.adTime >= 0.75) {
                this.adTime = 0;
                this.Continue();
            }
        }
        //广告倒计时
        if (GlobalDefine_1.SaveData.isAutoAD2) {
            var all = Math.round(new Date().getTime()) / 1000 - GlobalDefine_1.SaveData.LastTime;
            var have = summary_1.ADtime - all;
            if (all > summary_1.ADtime) {
                //超时了
                GlobalDefine_1.SaveData.isAutoAD2 = false;
                GlobalDefine_1.SaveData.isAuto2 = false;
                cc.find("Canvas/Group_4/Auto2/Background/Icon").active = true;
                cc.find("Canvas/Group_4/Auto2/Background/Label").getComponent(cc.Label).string = "观看广告即可立即使用24小时";
            }
            else {
                //没超时
                var shi = void 0;
                var fen = void 0;
                shi = Math.floor(have / 3600);
                fen = Math.floor((have - shi * 3600) / 60);
                if (fen < 1) {
                    fen = 1;
                }
                cc.find("Canvas/Group_4/Auto2/Background/Label").getComponent(cc.Label).string = '剩余 ' + shi + " 小时 " + fen + " 分钟";
            }
        }
    };
    Main.prototype.startGame = function () {
        cc.find("Canvas/Group_1").active = false;
        cc.find("Canvas/BG").active = true;
        cc.find("Canvas/Group_2").active = true;
        cc.find("Canvas/Group_1/Num_Reopen_Box/Label_1").getComponent(cc.Label).string = "已重开" + condition_1.DEFAULT_CJ.TMS + "次";
        if (cc.sys.platform == cc.sys.VIVO_GAME || cc.sys.platform == cc.sys.XIAOMI_GAME || window['uc']) {
            Global_1.default.platform.SHOW_TITIALAD1();
        }
        //成就检查
        this.check_cj("opportunity");
    };
    //替换所有皮肤
    Main.prototype.replaceAll = function () {
        var _this = this;
        //天赋选择背景图颜色
        ResMgr_1.default.loadImageRet("skin/" + UserModel_1.default.instance.using + "/tfxz/Box_White_f9fcff", function (sp) {
            _this.quality = null;
            _this.quality = sp;
        });
        ResMgr_1.default.loadImageRet("skin/" + UserModel_1.default.instance.using + "/tfxz/Box_Blue_67cfff", function (sp) {
            _this.quality1 = null;
            _this.quality1 = sp;
        });
        ResMgr_1.default.loadImageRet("skin/" + UserModel_1.default.instance.using + "/tfxz/Box_Purple_c67cff", function (sp) {
            _this.quality2 = null;
            _this.quality2 = sp;
        });
        ResMgr_1.default.loadImageRet("skin/" + UserModel_1.default.instance.using + "/tfxz/Box_Orange_ff8e49", function (sp) {
            _this.quality3 = null;
            _this.quality3 = sp;
        });
        ResMgr_1.default.loadImageRet("skin/" + UserModel_1.default.instance.using + "/wdzz/Btn_EXP", function (sp) {
            _this.experienceSp = null;
            _this.experienceSp = sp;
        });
        this.group_4_lal = '#000000';
        this.group_4_lal1 = '#000000';
        this.tex_4_lal = '#000000';
        this.tex_4_lal1 = '#FFB859';
    };
    Main.prototype.Rank = function () {
        this.TipsOpen(true, cc.color(128, 223, 239), "还没有");
    };
    Main.prototype.returnGroup1 = function () {
        cc.find("Canvas/Group_1").active = true;
        cc.find("Canvas/BG").active = false;
        cc.find("Canvas/Group_2").active = false;
    };
    Main.prototype.JudgeColor = function (node, color) {
        if (color.toString() == cc.color(255, 255, 255).toString()) {
            node.getChildByName('Sp').getComponent(cc.Sprite).spriteFrame = this.quality;
        }
        else if (color.toString() == cc.color(103, 197, 230).toString()) {
            node.getChildByName('Sp').getComponent(cc.Sprite).spriteFrame = this.quality1;
        }
        else if (color.toString() == cc.color(237, 120, 239).toString()) {
            node.getChildByName('Sp').getComponent(cc.Sprite).spriteFrame = this.quality2;
        }
        else if (color.toString() == cc.color(247, 140, 75).toString()) {
            node.getChildByName('Sp').getComponent(cc.Sprite).spriteFrame = this.quality3;
        }
    };
    Main.prototype.updateNromalLable = function (j, color) {
        if (UserModel_1.default.instance.using == 'skin0') {
            j.getChildByName('Label').color = cc.color(0, 0, 0);
        }
        ResMgr_1.default.loadImage("skin/" + UserModel_1.default.instance.using + "/tfxz/Hook", j.getChildByName('Box_Selected').children[0].getComponent(cc.Sprite));
        if (color) {
            this.JudgeColor(j, color);
        }
    };
    //十连抽
    Main.prototype.TenCP = function () {
        var _this = this;
        //定义剔除数组（由已选天赋和互斥天赋组成）
        this.tichu = [];
        var index = 0;
        var islun = false;
        var tianfu = [];
        //轮回天赋
        // SaveData.LunHuiTalent = 1134
        if (GlobalDefine_1.SaveData.LunHuiTalent != 0) {
            index = GlobalDefine_1.SaveData.LunHuiTalent;
            islun = true;
            GlobalDefine_1.SaveData.LunHuiTalent = 0;
            SaveUtils_1.default.inst.SaveData();
        }
        if (islun) {
            this.tichu.push(index);
            tianfu.push(index);
            islun = false;
        }
        var len = Object.keys(this.Talents.json).length;
        for (var s = 0; s < len; s++) {
            //判断有没有轮回天赋需要先生成
            if (1001 + s == index)
                continue;
            tianfu.push(1001 + s);
        }
        tianfu.sort(function (x, y) {
            return _this.Talents.json[y]['grade'] - _this.Talents.json[x]['grade'];
        });
        //生成/销毁节点
        var c = this.TenCPShow.childrenCount;
        for (var i = 0; i < len - c; i++) {
            var j = cc.instantiate(this.normalLabel);
            j.parent = this.TenCPShow;
            this.AutoAddClickEvent(this.node, "Main", "SelectTalent", (i + 1).toString(), j);
        }
        //UI交互
        this.TenCPButton.active = false;
        this.TenCPShow.active = true;
        cc.find("Canvas/Group_2/Select_2").active = true;
        cc.find("Canvas/Group_2/Reopen").active = true;
        var index1;
        for (var m = 0; m < len; m++) {
            index1 = tianfu[m];
            //拿到不重复不互斥的天赋ID：index，表现出来
            this.TenCPShow.children[m].getChildByName("Label").getComponent(cc.Label).string = this.Talents.json[index1]["name"] + "(" + this.Talents.json[index1]["description"] + ")";
            //稀有度UI表现
            this.updateNromalLable(this.TenCPShow.children[m], summary_1.grades[this.Talents.json[index1]["grade"]]);
            //放到所有可以选择的天赋数组里
            this.AllShowTalent.push(index1);
            //重置表现
            this.TenCPShow.children[m].getChildByName("Box_Selected").active = false;
            //判断这个天赋有没有互斥天赋并且删除所有互斥天赋
        }
        cc.find("Canvas/Group_2/ScrollView").getComponent(cc.ScrollView).scrollToTop(0);
    };
    Main.prototype.TenCP_digui = function (_index, _tichu) {
        //从Talents随机出一个天赋ID
        _index = 1000 + Math.ceil(Math.random() * Object.keys(this.Talents.json).length);
        //判断a是否在剔除数组，在就递归
        var sjs = Math.random();
        var grade = 0;
        //if(sjs>0.111){grade=0}else if(sjs>0.011){grade=1}else if(sjs>0.001){grade=2}else{grade=3}
        var ram = 0.2 * (condition_1.DEFAULT_CJ.AEVT.length / Object.keys(this.Events.json).length) + 0.2 * (condition_1.DEFAULT_CJ.ATLT.length / Object.keys(this.Talents.json).length);
        if (sjs > 0.4 + ram) {
            grade = 0;
        }
        else if (sjs > 0.3 + ram) {
            grade = 1;
        }
        else if (sjs > 0.2 + ram) {
            grade = 2;
        }
        else {
            grade = 3;
        }
        if (_tichu.includes(_index) || this.Talents.json[_index]["grade"] != grade) {
            return this.TenCP_digui(_index, _tichu);
        }
        else {
            //本天赋加入剔除数组,并返回
            _tichu.push(_index);
            return _index;
        }
    };
    Main.prototype.SelectTalent = function (event, customEventData) {
        var bool = this.mutex(this.AllShowTalent[Number(customEventData) - 1]);
        if (bool[0]) {
            this.TipsOpen(true, cc.color(128, 223, 239), "与已选择的天赋【" + bool[1].name + "】冲突");
            return;
        }
        if (this.NowSelectTalentNum < this.MaxSelectTalentNum && !this.AlreadyTalentButton.includes(customEventData)) {
            this.NowSelectTalentNum += 1;
            if (this.NowSelectTalentNum == this.MaxSelectTalentNum) {
                // cc.find("Canvas/Group_2/Select_2/Background/Label").getComponent(cc.Label).string = "开始新人生"
                // cc.find("Canvas/Group_2/Select_2/Background/Label").color = OtherGrades[1]
                // cc.find("Canvas/Group_2/Select_2/Background/OKBG").color = OtherGrades[0]
            }
            this.AlreadyTalentButton.push(customEventData);
            this.TenCPShow.children[Number(customEventData) - 1].getChildByName("Box_Selected").active = true;
        }
        else if (this.NowSelectTalentNum >= this.MaxSelectTalentNum && !this.AlreadyTalentButton.includes(customEventData)) {
            //已经选够了
            this.TipsOpen(true, cc.color(128, 223, 239), "只能选" + this.MaxSelectTalentNum + "个天赋");
        }
        else if (this.AlreadyTalentButton.includes(customEventData)) {
            //取消选择
            this.NowSelectTalentNum -= 1;
            var index = this.AlreadyTalentButton.indexOf(customEventData);
            if (index > -1) {
                this.AlreadyTalentButton.splice(index, 1);
            }
            this.TenCPShow.children[Number(customEventData) - 1].getChildByName("Box_Selected").active = false;
        }
    };
    Main.prototype.mutex = function (id) {
        var bool = [false];
        for (var i = 0; i < this.AlreadyTalentButton.length; i++) {
            var id1 = this.AllShowTalent[Number(this.AlreadyTalentButton[i]) - 1];
            if (!this.Talents.json[id1].exclusive)
                continue;
            for (var y = 0; y < this.Talents.json[id1]["exclusive"].length; y++) {
                // console.log('表格', Number(this.Talents.json[id1]["exclusive"][y]), id)
                if (Number(this.Talents.json[id1]["exclusive"][y]) == id) {
                    bool = [true, this.Talents.json[id1]];
                }
            }
        }
        return bool;
    };
    Main.prototype.road = function () {
        var bool = false;
        if (!this.isOpenXY) {
            this.group3In();
            bool = true;
        }
        return bool;
    };
    //天赋选完了进入下一级
    Main.prototype.TalentSelectOver = function () {
        if (this.NowSelectTalentNum <= this.MaxSelectTalentNum) {
            if (this.choice) {
                this.group3In();
            }
            else {
                if (!this.maozizizi) {
                    var bool = this.road();
                    this.maozizizi = true;
                    if (!bool)
                        return;
                }
            }
        }
        else if (this.NowSelectTalentNum < this.MaxSelectTalentNum) {
            this.TipsOpen(true, cc.color(128, 223, 239), "请选择" + this.MaxSelectTalentNum + "个天赋");
            return;
        }
        var allttalent = [];
        for (var i = 0; i < this.AlreadyTalentButton.length; i++) {
            //实装天赋
            allttalent.push(this.AllShowTalent[Number(this.AlreadyTalentButton[i]) - 1]);
        }
        if (allttalent.includes(1019)) {
            this.MaxUseNum += 4;
            this.StarUseNum = this.MaxUseNum;
        }
        if (allttalent.includes(1064)) {
            this.MaxUseNum += 8;
            this.StarUseNum = this.MaxUseNum;
        }
        if (allttalent.includes(1007)) {
            this.MaxUseNum += 2;
            this.StarUseNum = this.MaxUseNum;
        }
        if (allttalent.includes(1122)) {
            this.MaxUseNum = 0;
            this.StarUseNum = this.MaxUseNum;
        }
        if (allttalent.includes(1086)) {
            this.MaxUseNum -= 10;
            this.StarUseNum = this.MaxUseNum;
        }
        if (allttalent.includes(1085)) {
            this.MaxUseNum -= 3;
            this.StarUseNum = this.MaxUseNum;
        }
        if (allttalent.includes(1084)) {
            this.MaxUseNum -= 2;
            this.StarUseNum = this.MaxUseNum;
        }
        if (allttalent.includes(1063)) {
            this.MaxUseNum += 1;
            this.StarUseNum = this.MaxUseNum;
        }
        if (this.MaxUseNum < 0) {
            this.MaxUseNum = 0;
            this.StarUseNum = this.MaxUseNum;
        }
        if (GlobalDefine_1.SaveData.isPPDY && GlobalDefine_1.SaveData.isPPDY2) {
            GlobalDefine_1.SaveData.isPPDY2 = false;
            SaveUtils_1.default.inst.SaveData();
            condition_1.DEFAULT_PROP["CHR"] += 1;
            cc.find("Canvas/Group_3/Layout/CHR/Sprite/Label").getComponent(cc.Label).string = "1";
            condition_1.DEFAULT_PROP["INT"] += 1;
            cc.find("Canvas/Group_3/Layout/INT/Sprite/Label").getComponent(cc.Label).string = "1";
            condition_1.DEFAULT_PROP["STR"] += 1;
            cc.find("Canvas/Group_3/Layout/STR/Sprite/Label").getComponent(cc.Label).string = "1";
            condition_1.DEFAULT_PROP["MNY"] += 1;
            cc.find("Canvas/Group_3/Layout/MNY/Sprite/Label").getComponent(cc.Label).string = "1";
            this.MaxUseNum += 4;
        }
        this.CanUse(0);
        //下辈子三选一天赋
        for (var i = 0; i < this.AlreadyTalentButton.length; i++) {
            console.log("打开label");
            //打开label
            cc.find("Canvas/Group_3/ScrollView2/Label").active = true;
            var index = this.AllShowTalent[Number(this.AlreadyTalentButton[i]) - 1];
            var j = cc.instantiate(this.normalLabel);
            this.updateNromalLable(j, summary_1.grades[this.Talents.json[index]["grade"]]);
            // setTimeout(() => {
            j.parent = cc.find("Canvas/Group_3/ScrollView2/view/Layout");
            // }, 0);
            j.getComponent(cc.Button).enabled = false;
            condition_1.DEFAULT_PROP["TLT"].push(index);
            if (this.Talents.json[index]["show"] != 0) {
                this.ConTalent.push(index);
            }
            if (!condition_1.DEFAULT_CJ["ATLT"].includes(index)) {
                condition_1.DEFAULT_CJ["ATLT"].push(index);
            }
            //重置表现
            j.getChildByName("Box_Selected").active = true;
            //天赋确定成功增加天赋
            j.getChildByName("Label").getComponent(cc.Label).string = this.Talents.json[index]["name"] + "(" + this.Talents.json[index]["description"] + ")";
            // j.getChildByName("grade").color = grades[this.Talents.json[index]["grade"]]
            // j.getChildByName("grade").active = true
        }
        SaveUtils_1.default.inst.SaveData();
    };
    //144 238 144
    Main.prototype.TipsOpen = function (isOpen, color, content) {
        this.Tips.color = color;
        //分辨率获取
        // let h = cc.winSize.height;
        if (isOpen) {
            this.Tips.getChildByName("Label").getComponent(cc.Label).string = content;
            cc.tween(this.Tips).to(0.12, { position: cc.v3(0, (cc.winSize.height / 2)) }).to(0.06, { position: cc.v3(0, (cc.winSize.height / 2) - 50) }).to(0.06, { position: cc.v3(0, (cc.winSize.height / 2)) }).start();
            this.Tips.active = true;
            this.TipsTimer = 0;
            this.TipsIsOpen = true;
        }
        else {
            this.Tips.setPosition(0, (cc.winSize.height + this.Tips.getContentSize().height) / 2); //tips归位
            this.Tips.active = false;
            this.TipsTimer = 0;
            this.TipsIsOpen = false;
        }
    };
    //Group_3
    Main.prototype.Add = function (event, customEventData) {
        if (this.StarUseNum >= 1) {
            switch (customEventData) {
                case "CHR":
                    if (condition_1.DEFAULT_PROP["CHR"] < this.MaxpropertyNum || this.MaxUseNum > 0) {
                        condition_1.DEFAULT_PROP["CHR"] += 1;
                        this.CanUse(-1);
                        cc.find("Canvas/Group_3/Layout/CHR/Sprite/Label").getComponent(cc.Label).string = condition_1.DEFAULT_PROP["CHR"].toString();
                    }
                    break;
                case "INT":
                    if (condition_1.DEFAULT_PROP["INT"] < this.MaxpropertyNum || this.MaxUseNum > 0) {
                        condition_1.DEFAULT_PROP["INT"] += 1;
                        this.CanUse(-1);
                        cc.find("Canvas/Group_3/Layout/INT/Sprite/Label").getComponent(cc.Label).string = condition_1.DEFAULT_PROP["INT"].toString();
                    }
                    break;
                case "STR":
                    if (condition_1.DEFAULT_PROP["STR"] < this.MaxpropertyNum || this.MaxUseNum > 0) {
                        condition_1.DEFAULT_PROP["STR"] += 1;
                        this.CanUse(-1);
                        cc.find("Canvas/Group_3/Layout/STR/Sprite/Label").getComponent(cc.Label).string = condition_1.DEFAULT_PROP["STR"].toString();
                    }
                    break;
                case "MNY":
                    if (condition_1.DEFAULT_PROP["MNY"] < this.MaxpropertyNum || this.MaxUseNum > 0) {
                        condition_1.DEFAULT_PROP["MNY"] += 1;
                        this.CanUse(-1);
                        cc.find("Canvas/Group_3/Layout/MNY/Sprite/Label").getComponent(cc.Label).string = condition_1.DEFAULT_PROP["MNY"].toString();
                    }
                    break;
                default:
                    break;
            }
        }
        else {
            this.TipsOpen(true, cc.color(128, 223, 239), "没有可分配的点数了");
        }
    };
    Main.prototype.Reduce = function (event, customEventData) {
        switch (customEventData) {
            case "CHR":
                if (condition_1.DEFAULT_PROP["CHR"] > 0) {
                    condition_1.DEFAULT_PROP["CHR"] -= 1;
                    this.CanUse(1);
                    cc.find("Canvas/Group_3/Layout/CHR/Sprite/Label").getComponent(cc.Label).string = condition_1.DEFAULT_PROP["CHR"].toString();
                }
                break;
            case "INT":
                if (condition_1.DEFAULT_PROP["INT"] > 0) {
                    condition_1.DEFAULT_PROP["INT"] -= 1;
                    this.CanUse(1);
                    cc.find("Canvas/Group_3/Layout/INT/Sprite/Label").getComponent(cc.Label).string = condition_1.DEFAULT_PROP["INT"].toString();
                }
                break;
            case "STR":
                if (condition_1.DEFAULT_PROP["STR"] > 0) {
                    condition_1.DEFAULT_PROP["STR"] -= 1;
                    this.CanUse(1);
                    cc.find("Canvas/Group_3/Layout/STR/Sprite/Label").getComponent(cc.Label).string = condition_1.DEFAULT_PROP["STR"].toString();
                }
                break;
            case "MNY":
                if (condition_1.DEFAULT_PROP["MNY"] > 0) {
                    condition_1.DEFAULT_PROP["MNY"] -= 1;
                    this.CanUse(1);
                    cc.find("Canvas/Group_3/Layout/MNY/Sprite/Label").getComponent(cc.Label).string = condition_1.DEFAULT_PROP["MNY"].toString();
                }
                break;
            default:
                break;
        }
    };
    Main.prototype.CanUse = function (trans) {
        var a = this.StarUseNum + trans;
        this.StarUseNum = a;
        cc.find("Canvas/Group_3/Label_2").getComponent(cc.Label).string = "可用属性点:" + this.StarUseNum;
    };
    Main.prototype.Random = function () {
        this.StarUseNum = this.MaxUseNum;
        condition_1.DEFAULT_PROP["CHR"] = 0;
        condition_1.DEFAULT_PROP["INT"] = 0;
        condition_1.DEFAULT_PROP["STR"] = 0;
        condition_1.DEFAULT_PROP["MNY"] = 0;
        var a;
        for (a = 0; a < this.MaxUseNum; a++) {
            var b = Math.ceil(Math.random() * 4);
            switch (b) {
                case 1:
                    if (condition_1.DEFAULT_PROP["CHR"] < this.MaxpropertyNum || this.MaxUseNum > 40) {
                        condition_1.DEFAULT_PROP["CHR"] += 1;
                        cc.find("Canvas/Group_3/Layout/CHR/Sprite/Label").getComponent(cc.Label).string = condition_1.DEFAULT_PROP["CHR"].toString();
                        this.CanUse(-1);
                    }
                    else {
                        a -= 1;
                    }
                    break;
                case 2:
                    if (condition_1.DEFAULT_PROP["INT"] < this.MaxpropertyNum || this.MaxUseNum > 40) {
                        condition_1.DEFAULT_PROP["INT"] += 1;
                        cc.find("Canvas/Group_3/Layout/INT/Sprite/Label").getComponent(cc.Label).string = condition_1.DEFAULT_PROP["INT"].toString();
                        this.CanUse(-1);
                    }
                    else {
                        a -= 1;
                    }
                    break;
                case 3:
                    if (condition_1.DEFAULT_PROP["STR"] < this.MaxpropertyNum || this.MaxUseNum > 40) {
                        condition_1.DEFAULT_PROP["STR"] += 1;
                        cc.find("Canvas/Group_3/Layout/STR/Sprite/Label").getComponent(cc.Label).string = condition_1.DEFAULT_PROP["STR"].toString();
                        this.CanUse(-1);
                    }
                    else {
                        a -= 1;
                    }
                    break;
                case 4:
                    if (condition_1.DEFAULT_PROP["MNY"] < this.MaxpropertyNum || this.MaxUseNum > 40) {
                        condition_1.DEFAULT_PROP["MNY"] += 1;
                        cc.find("Canvas/Group_3/Layout/MNY/Sprite/Label").getComponent(cc.Label).string = condition_1.DEFAULT_PROP["MNY"].toString();
                        this.CanUse(-1);
                    }
                    else {
                        a -= 1;
                    }
                    break;
                default:
                    break;
            }
        }
    };
    //方向往下
    Main.prototype.scrollDownHandler = function () {
        for (var i = 0, len = this._content.childrenCount; i < len; i++) {
        }
    };
    //方向往上
    Main.prototype.scrollUpHandler = function () {
        for (var i = 0, len = this._content.childrenCount; i < len; i++) {
            var item = this._content.children[i];
            var finalY = item.y + this._content.y;
            if (finalY < (this._content.parent.height / 2 + item.height) && finalY > -(this._content.parent.height / 2 + item.height)) {
                item.opacity = 255;
            }
            else {
                item.opacity = 0;
            }
        }
    };
    Main.prototype.starnewlife = function () {
        //外挂
        if (this.wgnb || (condition_1.DEFAULT_PROP["CHR"] == 7 && condition_1.DEFAULT_PROP["INT"] == 3 && condition_1.DEFAULT_PROP["STR"] == 9 && condition_1.DEFAULT_PROP["MNY"] == 1)) {
            if (this.isWUDI) {
                this.NowAge = 99;
                condition_1.DEFAULT_PROP["TLT"].push(1048);
                condition_1.DEFAULT_PROP["TLT"].push(1065);
                condition_1.DEFAULT_PROP["TLT"].push(1135);
            }
        }
        if (this.StarUseNum == 0) {
            cc.find("Canvas/Group_3").active = false;
            cc.find("Canvas/Group_4").active = true;
            this._lastPosX = this.eventScrollView.children[0].children[0].y;
            cc.find("Canvas/Group_4/ScrollView/view/Layout").on("position-changed", this.scrollUpHandler, this);
            this.Continue();
            //关闭天赋选择面板
            this.isBool = true;
            // })
        }
        else {
            this.TipsOpen(true, cc.color(128, 223, 239), "你还有" + this.StarUseNum + "属性点没有分配");
        }
        //属性变化
        cc.find("Canvas/Group_4/Layout/CHR/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u989C\u503C </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["CHR"] + "</color>";
        cc.find("Canvas/Group_4/Layout/INT/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u667A\u529B </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["INT"] + "</color>";
        cc.find("Canvas/Group_4/Layout/STR/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u4F53\u8D28 </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["STR"] + "</color>";
        cc.find("Canvas/Group_4/Layout/MNY/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u5BB6\u5883 </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["MNY"] + "</color>";
        cc.find("Canvas/Group_4/Layout/SPR/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u5FEB\u4E50 </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["SPR"] + "</color>";
        //成就检查
        this.check_cj("START");
    };
    //成就检查
    Main.prototype.check_cj = function (index) {
        //成就检查
        for (var i = 0; i < Object.keys(this.Achievement.json).length; i++) {
            if (!condition_1.DEFAULT_CJ.ACJ.includes(101 + i) && this.Achievement.json[101 + i]["opportunity"] == index && condition_1.check(this.Achievement.json[101 + i]["condition"]) && (this.Achievement.json[101 + i]["evtlimit"] == -1 || this.Achievement.json[101 + i]["evtlimit"] == this.IndexOfEvent)) {
                this.TipsOpen(true, cc.color(144, 238, 144), "解锁成就【" + this.Achievement.json[101 + i]["name"] + "】");
                //完成的成就添加本地
                condition_1.DEFAULT_CJ.ACJ.push(101 + i);
                //自传解锁检查
                for (var j = 0; j < Object.keys(this.branchline.json).length; j++) {
                    if (this.branchline.json[j + 1]["achievementID"] == (101 + i)) {
                        //解锁
                        GlobalDefine_1.SaveData.Myzz[this.branchline.json[j + 1]["id"] - 1] = 1;
                    }
                }
            }
        }
        SaveUtils_1.default.inst.SaveData();
    };
    //Group_4
    Main.prototype.Continue = function () {
        if (this.isDeath)
            return;
        var baba = cc.find("Canvas/Group_4/ScrollView/view/Layout");
        var entry = cc.instantiate(this.Entry);
        entry.on(cc.Node.EventType.TOUCH_END, this.Continue, this);
        var node = entry.getComponent(Entry_1.default);
        entry.getChildByName('Sprite').getComponent(cc.Sprite).spriteFrame = node.sp[UserModel_1.default.instance.useId];
        if (UserModel_1.default.instance.using == 'skin0') {
            entry.getChildByName("LabelAge").color = cc.color(0, 0, 0);
            entry.getChildByName("LabelAge").children[0].color = cc.color(0, 0, 0);
        }
        else if (UserModel_1.default.instance.using == 'skin1') {
            entry.getChildByName("LabelAge").color = cc.color(255, 255, 255);
            entry.getChildByName("LabelAge").children[0].color = cc.color(255, 255, 255);
        }
        else if (UserModel_1.default.instance.using == 'skin2') {
            entry.getChildByName("LabelAge").color = cc.color(0, 0, 0);
            entry.getChildByName("LabelAge").children[0].color = cc.color(0, 0, 0);
        }
        else if (UserModel_1.default.instance.using == 'skin3') {
            entry.getChildByName("LabelAge").color = cc.color(41, 40, 61);
            entry.getChildByName("LabelAge").children[0].color = cc.color(41, 40, 61);
        }
        else if (UserModel_1.default.instance.using == 'skin4') {
            entry.getChildByName("LabelAge").color = cc.color(255, 255, 255);
            entry.getChildByName("LabelAge").children[0].color = cc.color(255, 255, 255);
        }
        //检查天赋
        var tfcon = "";
        for (var i = 0; i < this.ConTalent.length; i++) {
            if (this.ConTalent[i] != 0 && condition_1.check(this.Talents.json[this.ConTalent[i]]["condition"], "include")) {
                // let str: string = "<color=#fff1aa>"+ this.attributeTrans(this.Talents.json[this.ConTalent[i]], this.ConTalent[i])+"</c>"
                var str = this.attributeTrans(this.Talents.json[this.ConTalent[i]], entry, this.ConTalent[i]);
                if (str != "") {
                    tfcon = str + "\n";
                }
                else {
                    tfcon += "天赋【" + this.Talents.json[this.ConTalent[i]]["name"] + "】发动成功！" + this.Talents.json[this.ConTalent[i]]["description"] + "!\n";
                }
                var index_1 = this.ConTalent.indexOf(this.ConTalent[i]);
                if (index_1 > -1) {
                    //this.ConTalent.splice(index, 1);
                    this.ConTalent[index_1] = 0;
                }
            }
        }
        //内容：
        //所有当前年龄包含的事件拿出来
        var AllEvents = [];
        for (var i = 0; i < this.AgeJson.json[this.NowAge]["event"].length; i++) {
            AllEvents.push(this.AgeJson.json[this.NowAge]["event"][i].toString().split("*"));
        }
        var CanEvents = []; //从Events选择能发生的事情
        var CanEventsweight = []; //所有能发生的事情的权重
        //cc.log(AllEvents)
        for (var i = 0; i < AllEvents.length; i++) {
            if (!condition_1.check(this.EventsJson.json[AllEvents[i][0]]["exclude"], "exclude") && condition_1.check(this.EventsJson.json[AllEvents[i][0]]["include"], "include")) {
                //!exclude有某事件时一定随机不到为true&&有某事件时才能被随机到为true
                CanEvents.push(AllEvents[i][0]);
                if (AllEvents[i].length > 1) {
                    CanEventsweight.push(AllEvents[i][1]);
                }
                else {
                    CanEventsweight.push("1");
                }
            }
        }
        //cc.log(CanEvents)
        //cc.log(CanEventsweight)
        var Maxweight = 0; //最大权重
        var CanEventsweight2 = []; //所有能发生的事情的权重2
        for (var i = 0; i < CanEventsweight.length; i++) {
            Maxweight += Number(CanEventsweight[i]);
            CanEventsweight2.push(Maxweight);
        }
        //cc.log(CanEventsweight2)
        var targetWeight = Math.random() * Maxweight;
        //cc.log(targetWeight)
        //最终通关谁大于targetWeight确定事件
        var index;
        for (index = 0; index < CanEventsweight2.length; index++) {
            if (CanEventsweight2[index] > targetWeight) {
                break;
            }
        }
        //cc.log(index)
        //cc.log(CanEvents[index])
        //加入事件池
        condition_1.DEFAULT_PROP["EVT"].push(Number(CanEvents[index]));
        if (!condition_1.DEFAULT_CJ["AEVT"].includes(Number(CanEvents[index]))) {
            condition_1.DEFAULT_CJ["AEVT"].push(Number(CanEvents[index]));
        }
        //cc.log(DEFAULT_PROP["EVT"])
        var e = this.EventsJson.json[Number(CanEvents[index])];
        if (e == undefined) {
            e = this.EventsJson.json["10000"];
        }
        //追加事件
        this.cont = e["event"];
        this.contZhujia = "";
        if (this.NowAge == 500)
            console.log('数据111', e);
        if (e["branch"]) {
            if (this.NowAge == 500) {
                entry.getChildByName("Label").getComponent(cc.RichText).string = "<color=" + this.tex_4_lal + ">" + this.cont + "</c>";
                this.Brach(e, this.contZhujia, entry);
            }
            else {
                var isHave = false;
                for (var i = 0; i < e["branch"].length; i++) {
                    if (condition_1.check(e["branch"][i].split(":")[0])) {
                        //加入事件池
                        condition_1.DEFAULT_PROP["EVT"].push(Number(e["branch"][i].split(":")[1]));
                        var dx = this.EventsJson.json[Number(e["branch"][i].split(":")[1])];
                        //属性变化
                        this.attributeTrans(dx, entry);
                        //追加描述
                        this.contZhujia += "\n" + dx["event"]; //内容
                        isHave = true;
                        if (dx["postEvent"]) {
                            this.contZhujia += "\n" + dx["postEvent"];
                        }
                        if (dx["effect"]) {
                            if (dx["effect"]["CHR"]) {
                                var num = dx["effect"]["CHR"] > 0 ? "+" + dx["effect"]["CHR"] : dx["effect"]["CHR"];
                                this.contZhujia += "\n<color=" + this.tex_4_lal1 + ">颜值" + num + "</color>";
                            }
                            if (dx["effect"]["INT"]) {
                                var num = dx["effect"]["INT"] > 0 ? "+" + dx["effect"]["INT"] : dx["effect"]["INT"];
                                this.contZhujia += "\n<color=" + this.tex_4_lal1 + ">智力" + num + "</color>";
                            }
                            if (dx["effect"]["STR"]) {
                                var num = dx["effect"]["STR"] > 0 ? "+" + dx["effect"]["STR"] : dx["effect"]["STR"];
                                this.contZhujia += "\n<color=" + this.tex_4_lal1 + ">体质" + num + "</color>";
                            }
                            if (dx["effect"]["MNY"]) {
                                var num = dx["effect"]["MNY"] > 0 ? "+" + dx["effect"]["MNY"] : dx["effect"]["MNY"];
                                this.contZhujia += "\n<color=" + this.tex_4_lal1 + ">家境" + num + "</color>";
                            }
                            if (dx["effect"]["SPR"]) {
                                var num = dx["effect"]["SPR"] > 0 ? "+" + dx["effect"]["SPR"] : dx["effect"]["SPR"];
                                this.contZhujia += "\n<color=" + this.tex_4_lal1 + ">快乐" + num + "</color>";
                            }
                        }
                        break;
                    }
                }
                //追加描述
                if (!isHave) {
                    if (e["postEvent"]) {
                        this.contZhujia = "\n" + e["postEvent"];
                    }
                }
            }
        }
        else {
            //追加描述
            if (e["postEvent"]) {
                this.contZhujia = "\n" + e["postEvent"];
            }
        }
        //let str;
        if (this.NowAge != 500) {
            if (this.contZhujia != "") {
                entry.getChildByName("Label").getComponent(cc.RichText).string =
                    "<color=" + this.tex_4_lal1 + ">" + tfcon + "</c>" +
                        "<color=" + this.tex_4_lal + ">" + this.cont + "</c>" +
                        "<color=" + this.tex_4_lal1 + ">" + this.contZhujia + "</c>";
                //str = this.cont + '\n' + this.contZhujia
            }
            else {
                entry.getChildByName("Label").getComponent(cc.RichText).string =
                    "<color=" + this.tex_4_lal1 + ">" + tfcon + "</c>" +
                        "<color=" + this.tex_4_lal + ">" + this.cont + "</c>";
                //str = this.cont
            }
        }
        // if (this.NowAge == 500) console.log('500岁年龄', this.NowAge)
        entry.getChildByName("LabelAge").getComponent(cc.Label).string = this.NowAge.toString();
        //属性变化
        this.attributeTrans(e, entry);
        //判断死亡
        if (condition_1.DEFAULT_PROP["LIF"] <= 0) {
            this.isDeath = true;
            cc.find("Canvas/Group_4/Start").active = true;
            cc.find("Canvas/Group_4/Auto").active = false;
            cc.find("Canvas/Group_4/Auto2").active = false;
        }
        entry.parent = cc.find("Canvas");
        var duh = entry.getChildByName("Label").getContentSize().height - 50.4;
        //entry.parent = baba
        var bs = Math.floor(duh / 39); //多行倍率
        // if(this.NowAge==500){bs+=19}
        entry.setContentSize(cc.size(780, 65 + 40 * bs));
        entry.getChildByName("LabelAge").y += 20 * bs;
        entry.getChildByName("Sprite").setContentSize(cc.size(780, 52 + 40 * bs));
        entry.getChildByName("BG").setContentSize(cc.size(600, 80 + 40 * bs));
        //排版
        var pb = entry.getContentSize().height;
        //cc.log(entry.getChildByName("Label").getContentSize().height)
        entry.parent = baba;
        // if (this.NowAge == 500) console.log('500岁年龄', entry.getChildByName("LabelAge").getComponent(cc.Label).string, entry.getChildByName("Label").getComponent(cc.RichText).string)
        cc.find("Canvas/Group_4/ScrollView").getComponent(cc.ScrollView).scrollToBottom(0.1);
        //年龄加一
        if (this.rebuild) {
            this.NowAge += this.rebuildAge;
            this.rebuild = false;
        }
        else {
            this.NowAge += 1;
        }
        condition_1.DEFAULT_PROP.AGE = this.NowAge;
        //成就检查
        this.check_cj("TRAJECTORY");
    };
    Main.prototype.Brach = function (e, contZhujia, entry) {
        var isHave = false;
        for (var i = 0; i < e["branch"].length; i++) {
            // cc.log(i)
            if (condition_1.check(e["branch"][i].split(":")[0])) {
                // cc.log(Number(e["branch"][i].split(":")[1]))
                var dx = this.EventsJson.json[Number(e["branch"][i].split(":")[1])];
                //追加描述
                contZhujia = '\n' + dx["event"]; //内容
                // console.log('内容', contZhujia)
                isHave = true;
                entry.getChildByName("Label").getComponent(cc.RichText).string += "<color=" + this.tex_4_lal + ">" + contZhujia + "</c>";
                if (dx["postEvent"]) {
                    entry.getChildByName("Label").getComponent(cc.RichText).string += "<color=" + this.tex_4_lal1 + ">" + '\n' + dx["postEvent"] + "</c>";
                }
                //属性变化
                this.attributeTrans(dx, entry);
                if (dx["branch"]) {
                    this.Brach(dx, contZhujia, entry);
                }
                break;
            }
        }
        //追加描述
        if (isHave) {
            if (e["postEvent"]) {
                contZhujia += e["postEvent"];
            }
            return contZhujia;
        }
    };
    Main.prototype.STRadd = function (event, customEventData) {
        // {
        condition_1.DEFAULT_PROP["STR"] += Number(customEventData);
        cc.find("Canvas/Group_4/Layout/STR/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u4F53\u8D28 </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["STR"] + "</color>";
        condition_1.DEFAULT_CJ["HSTR"] = condition_1.DEFAULT_PROP["STR"] > condition_1.DEFAULT_CJ["HSTR"] ? condition_1.DEFAULT_PROP["STR"] : condition_1.DEFAULT_CJ["HSTR"];
        condition_1.DEFAULT_CJ["LSTR"] = condition_1.DEFAULT_PROP["STR"] < condition_1.DEFAULT_CJ["LSTR"] ? condition_1.DEFAULT_PROP["STR"] : condition_1.DEFAULT_CJ["LSTR"];
        // }
    };
    //属性变化
    Main.prototype.attributeTrans = function (e, entry, index) {
        //DEFAULT_PROP["STR"] +=100
        if (e["effect"]) {
            if (e["effect"]["CHR"]) {
                condition_1.DEFAULT_PROP["CHR"] += e["effect"]["CHR"];
                cc.find("Canvas/Group_4/Layout/CHR/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u989C\u503C </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["CHR"] + "</color>";
                condition_1.DEFAULT_CJ["HCHR"] = condition_1.DEFAULT_PROP["CHR"] > condition_1.DEFAULT_CJ["HCHR"] ? condition_1.DEFAULT_PROP["CHR"] : condition_1.DEFAULT_CJ["HCHR"];
                condition_1.DEFAULT_CJ["LCHR"] = condition_1.DEFAULT_PROP["CHR"] < condition_1.DEFAULT_CJ["LCHR"] ? condition_1.DEFAULT_PROP["CHR"] : condition_1.DEFAULT_CJ["LCHR"];
                var num = e["effect"]["CHR"] > 0 ? "+" + e["effect"]["CHR"] : e["effect"]["CHR"];
                entry.getChildByName("Label").getComponent(cc.RichText).string += "\n<color=" + this.tex_4_lal1 + ">颜值" + num + "</color>";
            }
            if (e["effect"]["INT"]) {
                condition_1.DEFAULT_PROP["INT"] += e["effect"]["INT"];
                cc.find("Canvas/Group_4/Layout/INT/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u667A\u529B </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["INT"] + "</color>";
                condition_1.DEFAULT_CJ["HINT"] = condition_1.DEFAULT_PROP["INT"] > condition_1.DEFAULT_CJ["HINT"] ? condition_1.DEFAULT_PROP["INT"] : condition_1.DEFAULT_CJ["HINT"];
                condition_1.DEFAULT_CJ["LINT"] = condition_1.DEFAULT_PROP["INT"] < condition_1.DEFAULT_CJ["LINT"] ? condition_1.DEFAULT_PROP["INT"] : condition_1.DEFAULT_CJ["LINT"];
                var num = e["effect"]["INT"] > 0 ? "+" + e["effect"]["INT"] : e["effect"]["INT"];
                entry.getChildByName("Label").getComponent(cc.RichText).string += "\n<color=" + this.tex_4_lal1 + ">智力" + num + "</color>";
            }
            if (e["effect"]["STR"]) {
                condition_1.DEFAULT_PROP["STR"] += e["effect"]["STR"];
                cc.find("Canvas/Group_4/Layout/STR/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u4F53\u8D28 </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["STR"] + "</color>";
                condition_1.DEFAULT_CJ["HSTR"] = condition_1.DEFAULT_PROP["STR"] > condition_1.DEFAULT_CJ["HSTR"] ? condition_1.DEFAULT_PROP["STR"] : condition_1.DEFAULT_CJ["HSTR"];
                condition_1.DEFAULT_CJ["LSTR"] = condition_1.DEFAULT_PROP["STR"] < condition_1.DEFAULT_CJ["LSTR"] ? condition_1.DEFAULT_PROP["STR"] : condition_1.DEFAULT_CJ["LSTR"];
                var num = e["effect"]["STR"] > 0 ? "+" + e["effect"]["STR"] : e["effect"]["STR"];
                entry.getChildByName("Label").getComponent(cc.RichText).string += "\n<color=" + this.tex_4_lal1 + ">体质" + num + "</color>";
            }
            if (e["effect"]["MNY"]) {
                condition_1.DEFAULT_PROP["MNY"] += e["effect"]["MNY"];
                cc.find("Canvas/Group_4/Layout/MNY/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u5BB6\u5883 </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["MNY"] + "</color>";
                condition_1.DEFAULT_CJ["HMNY"] = condition_1.DEFAULT_PROP["MNY"] > condition_1.DEFAULT_CJ["HMNY"] ? condition_1.DEFAULT_PROP["MNY"] : condition_1.DEFAULT_CJ["HMNY"];
                condition_1.DEFAULT_CJ["LMNY"] = condition_1.DEFAULT_PROP["MNY"] < condition_1.DEFAULT_CJ["LMNY"] ? condition_1.DEFAULT_PROP["MNY"] : condition_1.DEFAULT_CJ["LMNY"];
                var num = e["effect"]["MNY"] > 0 ? "+" + e["effect"]["MNY"] : e["effect"]["MNY"];
                entry.getChildByName("Label").getComponent(cc.RichText).string += "\n<color=" + this.tex_4_lal1 + ">家境" + num + "</color>";
            }
            if (e["effect"]["SPR"]) {
                condition_1.DEFAULT_PROP["SPR"] += e["effect"]["SPR"];
                cc.find("Canvas/Group_4/Layout/SPR/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u5FEB\u4E50 </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["SPR"] + "</color>";
                condition_1.DEFAULT_CJ["HSPR"] = condition_1.DEFAULT_PROP["SPR"] > condition_1.DEFAULT_CJ["HSPR"] ? condition_1.DEFAULT_PROP["SPR"] : condition_1.DEFAULT_CJ["HSPR"];
                condition_1.DEFAULT_CJ["LSPR"] = condition_1.DEFAULT_PROP["SPR"] < condition_1.DEFAULT_CJ["LSPR"] ? condition_1.DEFAULT_PROP["SPR"] : condition_1.DEFAULT_CJ["LSPR"];
                var num = e["effect"]["SPR"] > 0 ? "+" + e["effect"]["SPR"] : e["effect"]["SPR"];
                entry.getChildByName("Label").getComponent(cc.RichText).string += "\n<color=" + this.tex_4_lal1 + ">快乐" + num + "</color>";
            }
            if (e["effect"]["LIF"]) {
                condition_1.DEFAULT_PROP["LIF"] += e["effect"]["LIF"];
            }
            if (e["effect"]["AGE"]) {
                if (e['id'] == 20409) {
                    this.rebuild = true;
                    this.rebuildAge = Number(e["effect"]["AGE"]);
                }
                else {
                    this.NowAge += Number(e["effect"]["AGE"]);
                }
                condition_1.DEFAULT_CJ["HAGE"] = this.NowAge > condition_1.DEFAULT_CJ["HAGE"] ? this.NowAge : condition_1.DEFAULT_CJ["HAGE"];
            }
            if (e["effect"]["RDM"]) {
                //随机属性增加
                var i = e["effect"]["RDM"];
                for (var a = 0; a < i; a++) {
                    switch (Math.ceil(Math.random() * 5)) {
                        case 1:
                            condition_1.DEFAULT_PROP["CHR"] += 1;
                            cc.find("Canvas/Group_4/Layout/CHR/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u989C\u503C </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["CHR"] + "</color>";
                            break;
                        case 2:
                            condition_1.DEFAULT_PROP["INT"] += 1;
                            cc.find("Canvas/Group_4/Layout/INT/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u667A\u529B </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["INT"] + "</color>";
                            break;
                        case 3:
                            condition_1.DEFAULT_PROP["STR"] += 1;
                            cc.find("Canvas/Group_4/Layout/STR/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u4F53\u8D28 </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["STR"] + "</color>";
                            break;
                        case 4:
                            condition_1.DEFAULT_PROP["MNY"] += 1;
                            cc.find("Canvas/Group_4/Layout/MNY/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u5BB6\u5883 </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["MNY"] + "</color>";
                            break;
                        case 5:
                            condition_1.DEFAULT_PROP["SPR"] += 1;
                            cc.find("Canvas/Group_4/Layout/SPR/Background/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u5FEB\u4E50 </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["SPR"] + "</color>";
                            break;
                    }
                }
            }
        }
        SaveUtils_1.default.inst.SaveData();
        if (e["replacement"]) {
            if (e["replacement"]["grade"]) {
                console.log('数据', e["replacement"]["grade"], e);
                var grade = e["replacement"]["grade"][0]; //稀有度
                var grades_1 = [];
                // console.log('数组',grades)
                for (var i = 0; i < Object.keys(this.Talents.json).length; i++) {
                    // console.log('条件', !this.tichu.includes(1001 + i), this.Talents.json[1001 + i]["show"], this.Talents.json[1001 + i]["grade"], grade)
                    if (!this.tichu.includes(1001 + i) && this.Talents.json[1001 + i]["show"] != 0 && this.Talents.json[1001 + i]["grade"] == grade) { //剔除数组里没有，并且稀有度符合
                        grades_1.push(1001 + i);
                    }
                }
                // console.log('数组',grades)
                var j = Math.floor(Math.random() * grades_1.length);
                grades_1[j]; //最终随出来的
                var h = condition_1.DEFAULT_PROP.TLT.indexOf(index); //要被替换的天赋的角标
                condition_1.DEFAULT_PROP.TLT[h] = grades_1[j]; //替换
                this.ConTalent.push(grades_1[j]); //替换
                //this.TipsOpen(true, "天赋【" + this.Talents.json[index]["name"] + "】发动成功！替换成【" + this.Talents.json[grades[j]]["name"] + "】")
                return "天赋【" + this.Talents.json[index]["name"] + "】发动成功！替换成【" + this.Talents.json[grades_1[j]]["name"] + "】";
            }
            else if (e["replacement"]["talent"]) {
                //console.log('数据1', e["replacement"]["talent"], e)
                var grades_2 = [];
                for (var i = 0; i < e["replacement"]["talent"].length; i++) {
                    grades_2.push(e["replacement"]["talent"][i].toString().split('*')[0]);
                }
                var j = Math.floor(Math.random() * grades_2.length);
                grades_2[j]; //最终随出来的
                var h = condition_1.DEFAULT_PROP.TLT.indexOf(index); //要被替换的天赋的角标
                condition_1.DEFAULT_PROP.TLT[h] = grades_2[j]; //替换
                this.ConTalent.push(grades_2[j]); //替换
                //this.TipsOpen(true, "天赋【" + this.Talents.json[index]["name"] + "】发动成功！替换成【" + this.Talents.json[grades[j]]["name"] + "】")
                return "天赋【" + this.Talents.json[index]["name"] + "】发动成功！替换成【" + this.Talents.json[grades_2[j]]["name"] + "】";
            }
        }
        else {
            return "";
        }
    };
    //自动添加点击事件
    Main.prototype.AutoAddClickEvent = function (node, componentName, handlerName, parameter, button) {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = componentName;
        clickEventHandler.handler = handlerName;
        clickEventHandler.customEventData = parameter;
        button.getComponent(cc.Button).clickEvents.push(clickEventHandler);
    };
    Main.prototype.Zongjie = function () {
        //数据持久化
        condition_1.DEFAULT_CJ.TMS += 1;
        SaveUtils_1.default.inst.SaveData();
        if (UserModel_1.default.instance.adCd) {
            UserModel_1.default.instance.adCd = false;
            UserModel_1.default.instance.save();
        }
        //界面切换
        cc.find("Canvas/Group_4").active = false;
        cc.find("Canvas/Group_5").active = true;
        //评分
        cc.find("Canvas/Group_5/Box/Layout/CHR/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u989C\u503C </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["CHR"] + "</color>";
        cc.find("Canvas/Group_5/Box/Layout/INT/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u667A\u529B </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["INT"] + "</color>";
        cc.find("Canvas/Group_5/Box/Layout/STR/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u4F53\u8D28 </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["STR"] + "</color>";
        cc.find("Canvas/Group_5/Box/Layout/MNY/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u5BB6\u5883 </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["MNY"] + "</color>";
        cc.find("Canvas/Group_5/Box/Layout/SPR/Label").getComponent(cc.RichText).string = "<color=" + this.group_4_lal + ">\u5FEB\u4E50 </c><color=" + this.group_4_lal1 + ">" + condition_1.DEFAULT_PROP["SPR"] + "</color>";
        cc.find("Canvas/Group_5/Box/AGE/Label").getComponent(cc.Label).string = "第" + condition_1.DEFAULT_CJ["TMS"] + "世，享年" + this.NowAge + "岁";
        var sum = condition_1.DEFAULT_PROP["CHR"] + condition_1.DEFAULT_PROP["INT"] + condition_1.DEFAULT_PROP["STR"] + condition_1.DEFAULT_PROP["MNY"] + condition_1.DEFAULT_PROP["SPR"] + this.NowAge; //总分计算公式
        condition_1.DEFAULT_CJ["SUM"] = sum > condition_1.DEFAULT_CJ["SUM"] ? sum : condition_1.DEFAULT_CJ["SUM"];
        cc.find("Canvas/Group_5/Box/SUM/Label").getComponent(cc.Label).string = sum.toString();
        cc.find("Canvas/Group_5/Box/Legend/" + summary_1.summary("SUM", sum)["judge"]).active = true;
        //下辈子三选一天赋
        for (var i = 0; i < condition_1.DEFAULT_PROP["TLT"].length; i++) {
            //打开label
            cc.find("Canvas/Group_5/Box/Label2").active = true;
            var index = condition_1.DEFAULT_PROP["TLT"][i];
            var j = cc.instantiate(this.normalLabel);
            this.updateNromalLable(j, summary_1.grades[this.Talents.json[index]["grade"]]);
            j.parent = cc.find("Canvas/Group_5/Box/ScrollView2/view/Layout");
            this.AutoAddClickEvent(this.node, "Main", "SelectLunTalent", (i + 1).toString(), j);
            j.getChildByName("Label").getComponent(cc.Label).string = this.Talents.json[index]["name"] + "(" + this.Talents.json[index]["description"] + ")";
        }
        //插屏
        if (cc.sys.platform == cc.sys.VIVO_GAME || cc.sys.platform == cc.sys.XIAOMI_GAME || window['uc']) {
            // console.log('请选择')
            Global_1.default.platform.SHOW_TITIALAD1();
        }
        //特效销毁
        this.scheduleOnce(function () {
            cc.find("Canvas/Group_5/Box/Anim").active = false;
            cc.find("Canvas/Group_5/Box/Legend").active = true;
        }, 1.5);
        //成就检查
        this.check_cj("SUMMARY");
    };
    Main.prototype.isAutoPlay = function () {
        var _this = this;
        if (!this.istimmerCDauto) {
            this.istimmerCDauto = true;
        }
        else {
            return;
        }
        if (!GlobalDefine_1.SaveData.isAutoAD) {
            if (window["tt"]) {
                //垃圾抖音得先弹窗
                this.is1or2 = 1;
                cc.find("Canvas/Group_4/DYLJ").active = true;
                return;
            }
            Global_1.default.platform.CLOSE_VIDEO(function () {
                GlobalDefine_1.SaveData.isAuto = true;
                GlobalDefine_1.SaveData.isAutoAD = true;
                GlobalDefine_1.SaveData.isAuto2 = false;
                cc.find("Canvas/Group_4/Auto2/Background/ZD1").active = true;
                cc.find("Canvas/Group_4/Auto2/Background/ZD2").active = false;
                SaveUtils_1.default.inst.SaveData();
                cc.find("Canvas/Group_4/Auto/Background/Icon").active = false;
                cc.find("Canvas/Group_4/Auto/Background/ZD1").active = false;
                cc.find("Canvas/Group_4/Auto/Background/ZD2").active = true;
                cc.find("Canvas/Group_4/DYLJ").active = false;
            }, function () {
                _this.TipsOpen(true, cc.color(128, 223, 239), "广告未播放完成");
            }, function () {
                _this.TipsOpen(true, cc.color(128, 223, 239), "暂无广告，请稍后再试");
            }, "18");
        }
        else {
            GlobalDefine_1.SaveData.isAuto2 = false;
            cc.find("Canvas/Group_4/Auto2/Background/ZD1").active = true;
            cc.find("Canvas/Group_4/Auto2/Background/ZD2").active = false;
            if (GlobalDefine_1.SaveData.isAuto) {
                GlobalDefine_1.SaveData.isAuto = false;
                cc.find("Canvas/Group_4/Auto/Background/ZD1").active = true;
                cc.find("Canvas/Group_4/Auto/Background/ZD2").active = false;
            }
            else {
                GlobalDefine_1.SaveData.isAuto = true;
                cc.find("Canvas/Group_4/Auto/Background/ZD1").active = false;
                cc.find("Canvas/Group_4/Auto/Background/ZD2").active = true;
            }
            SaveUtils_1.default.inst.SaveData();
        }
    };
    Main.prototype.isAutoPlay2 = function () {
        var _this = this;
        if (!this.istimmerCDauto) {
            this.istimmerCDauto = true;
        }
        else {
            return;
        }
        if (GlobalDefine_1.SaveData.isAutoAD2 && Math.round(new Date().getTime()) / 1000 - GlobalDefine_1.SaveData.LastTime > summary_1.ADtime) {
            //超时了
            GlobalDefine_1.SaveData.isAutoAD2 = false;
            GlobalDefine_1.SaveData.isAuto2 = false;
        }
        if (!GlobalDefine_1.SaveData.isAutoAD2) {
            if (window["tt"]) {
                //垃圾抖音得先弹窗
                this.is1or2 = 2;
                cc.find("Canvas/Group_4/autobiography").active = true;
                return;
            }
            Global_1.default.platform.CLOSE_VIDEO(function () {
                GlobalDefine_1.SaveData.LastTime = Math.round(new Date().getTime()) / 1000;
                GlobalDefine_1.SaveData.isAuto2 = true;
                GlobalDefine_1.SaveData.isAutoAD2 = true;
                GlobalDefine_1.SaveData.isAuto = false;
                cc.find("Canvas/Group_4/Auto/Background/ZD1").active = true;
                cc.find("Canvas/Group_4/Auto/Background/ZD2").active = false;
                SaveUtils_1.default.inst.SaveData();
                cc.find("Canvas/Group_4/Auto2/Background/Icon").active = false;
                cc.find("Canvas/Group_4/Auto2/Background/ZD1").active = false;
                cc.find("Canvas/Group_4/Auto2/Background/ZD2").active = true;
                cc.find("Canvas/Group_4/DYLJ").active = false;
            }, function () {
                _this.TipsOpen(true, cc.color(128, 223, 239), "广告未播放完成");
            }, function () {
                _this.TipsOpen(true, cc.color(128, 223, 239), "暂无广告，请稍后再试");
            }, '62');
        }
        else {
            GlobalDefine_1.SaveData.isAuto = false;
            cc.find("Canvas/Group_4/Auto/Background/ZD1").active = true;
            cc.find("Canvas/Group_4/Auto/Background/ZD2").active = false;
            if (GlobalDefine_1.SaveData.isAuto2) {
                GlobalDefine_1.SaveData.isAuto2 = false;
                cc.find("Canvas/Group_4/Auto2/Background/ZD1").active = true;
                cc.find("Canvas/Group_4/Auto2/Background/ZD2").active = false;
            }
            else {
                GlobalDefine_1.SaveData.isAuto2 = true;
                cc.find("Canvas/Group_4/Auto2/Background/ZD1").active = false;
                cc.find("Canvas/Group_4/Auto2/Background/ZD2").active = true;
            }
            SaveUtils_1.default.inst.SaveData();
        }
    };
    Main.prototype.closeAutoPlay2 = function () {
        cc.find("Canvas/Group_4/autobiography").active = false;
    };
    Main.prototype.watchAutoPlay2 = function () {
        var _this = this;
        Global_1.default.platform.CLOSE_VIDEO(function () {
            cc.find("Canvas/Group_4/autobiography").active = false;
            GlobalDefine_1.SaveData.LastTime = Math.round(new Date().getTime()) / 1000;
            GlobalDefine_1.SaveData.isAuto2 = true;
            GlobalDefine_1.SaveData.isAutoAD2 = true;
            GlobalDefine_1.SaveData.isAuto = false;
            cc.find("Canvas/Group_4/Auto/Background/ZD1").active = true;
            cc.find("Canvas/Group_4/Auto/Background/ZD2").active = false;
            SaveUtils_1.default.inst.SaveData();
            cc.find("Canvas/Group_4/Auto2/Background/Icon").active = false;
            cc.find("Canvas/Group_4/Auto2/Background/ZD1").active = false;
            cc.find("Canvas/Group_4/Auto2/Background/ZD2").active = true;
            cc.find("Canvas/Group_4/DYLJ").active = false;
        }, function () {
            _this.TipsOpen(true, cc.color(128, 223, 239), "广告未播放完成");
        }, function () {
            _this.TipsOpen(true, cc.color(128, 223, 239), "暂无广告，请稍后再试");
        }, '62');
    };
    Main.prototype.AutoFuc = function () {
        var _this = this;
        Global_1.default.platform.CLOSE_VIDEO(function () {
            if (_this.is1or2) {
                GlobalDefine_1.SaveData.isAuto = true;
                GlobalDefine_1.SaveData.isAutoAD = true;
            }
            else {
                GlobalDefine_1.SaveData.isAuto2 = true;
                GlobalDefine_1.SaveData.isAutoAD2 = true;
            }
            SaveUtils_1.default.inst.SaveData();
            cc.find("Canvas/Group_4/Auto/Background/Icon").active = false;
            cc.find("Canvas/Group_4/Auto/Background/ZD1").active = false;
            cc.find("Canvas/Group_4/Auto/Background/ZD2").active = true;
            cc.find("Canvas/Group_4/DYLJ").active = false;
        }, function () {
            _this.TipsOpen(true, cc.color(128, 223, 239), "广告未播放完成");
        }, function () {
            _this.TipsOpen(true, cc.color(128, 223, 239), "暂无广告，请稍后再试");
        }, "18");
    };
    //Groud_5
    Main.prototype.rerere = function () {
        Global_1.default.isFirstEnterCJ = true;
        cc.director.loadScene('LifeRebirth');
    };
    Main.prototype.WXShare = function () {
        //微信手动分享
        Global_1.default.platform.Share(function () { });
    };
    //选择轮回天赋
    Main.prototype.SelectLunTalent = function (event, customEventData) {
        GlobalDefine_1.SaveData.LunHuiTalent = Number(condition_1.DEFAULT_PROP["TLT"][customEventData - 1]);
        SaveUtils_1.default.inst.SaveData();
        for (var i = 0; i < cc.find("Canvas/Group_5/Box/ScrollView2/view/Layout").childrenCount; i++) {
            if (Number(customEventData) === (i + 1)) {
                cc.find("Canvas/Group_5/Box/ScrollView2/view/Layout").children[i].getChildByName("Box_Selected").active = true;
            }
            else {
                cc.find("Canvas/Group_5/Box/ScrollView2/view/Layout").children[i].getChildByName("Box_Selected").active = false;
            }
        }
    };
    //广告（天选之人）
    Main.prototype.addAttribute = function (event, customEventData) {
        var _this = this;
        Global_1.default.platform.CLOSE_VIDEO(function () {
            var num = Number(customEventData);
            _this.MaxUseNum += num;
            _this.CanUse(num);
            if (_this.TXCS >= 2) {
                cc.find("Canvas/Group_3/ADD").active = false;
                cc.find("Canvas/Group_3/Random").x = 0;
            }
            console.log("成功");
        }, function () {
            console.log("失败");
        }, function () {
            _this.TipsOpen(true, cc.color(128, 223, 239), "暂无广告，请稍后再试");
        }, "15");
    };
    //从新抽天赋(逆天改命)
    Main.prototype.Reopen = function (event, customEventData) {
        var _this = this;
        Global_1.default.platform.CLOSE_VIDEO(function () {
            //重置逻辑
            condition_1.DEFAULT_PROP["TLT"] = [];
            _this.AlreadyTalentButton = [];
            _this.AllShowTalent = [];
            _this.NowSelectTalentNum = 0;
            //奖励一个稀有度为2的天赋
            var twe = [1005, 1014, 1018, 1019, 1024, 1025, 1083, 1104, 1112, 1128, 1129, 1131];
            var zs = twe[Math.floor(Math.random() * twe.length)];
            GlobalDefine_1.SaveData.LunHuiTalent = zs;
            SaveUtils_1.default.inst.SaveData();
            _this.TenCP();
            console.log("成功");
        }, function () {
            console.log("失败");
        }, function () {
            _this.TipsOpen(true, cc.color(128, 223, 239), "暂无广告，请稍后再试");
        }, "12");
    };
    Main.prototype.moveStart = function (e) {
        this.startPos = null;
        this.startPos = e.getLocation();
    };
    Main.prototype.moveIng = function (e) {
        if (e.getLocation().y - this.startPos.y >= 15) {
            this.TipsOpen(false, cc.color(128, 223, 239));
        }
    };
    //Group_6返回按钮
    Main.prototype.Group_6_Return = function () {
        if (this.achievement) {
            this.achievement.destroy();
            this.achievement = null;
        }
        cc.find("Canvas/Group_1").active = true;
        cc.find("Canvas/Group_6").active = false;
        Global_1.default.gapTime = 0;
        Global_1.default.isShow = true;
    };
    //打开成就界面
    Main.prototype.Open_chengjiu = function () {
        this.Gentalent();
        cc.find("Canvas/Group_1").active = false;
        cc.find("Canvas/Group_6").active = true;
        Global_1.default.gapTime = 0;
        Global_1.default.isShow = false;
    };
    //生成天赋
    Main.prototype.Gentalent = function () {
        var _this = this;
        var mao = [];
        var mao1 = [];
        for (var i in this.Achievement.json) {
            if (condition_1.DEFAULT_CJ.ACJ.includes(this.Achievement.json[i].id)) {
                mao.push(this.Achievement.json[i]);
            }
            else {
                mao1.push(this.Achievement.json[i]);
            }
        }
        for (var i = 0; i < mao1.length; i++) {
            mao.push(mao1[i]);
        }
        var mao2 = []; //
        var num = Math.ceil(Object.keys(this.Achievement.json).length * 0.5);
        for (var k = 0, index = 0; k < num; k++) {
            mao2.push(mao.slice(index, index += 2));
        }
        ResMgr_1.default.loadPrefab('prefab/achievement', function (pre) {
            var prefab = cc.instantiate(pre);
            prefab.parent = _this.node.getChildByName('Group_6');
            var hight = (cc.winSize.height - 1280) / 2;
            prefab.y = -220;
            prefab.getComponent(achievement_1.default).data = mao2;
            prefab.getComponent(achievement_1.default).init();
            _this.achievement = prefab;
        });
    };
    //统计
    Main.prototype.tongji = function () {
        cc.find("Canvas/Group_6/Layout/1/Title").getComponent(cc.Label).string = "已重开" + condition_1.DEFAULT_CJ.TMS + "次";
        cc.find("Canvas/Group_6/Layout/2/Title").getComponent(cc.Label).string = "成就达成" + condition_1.DEFAULT_CJ.ACJ.length + "个";
        cc.find("Canvas/Group_6/Layout/1/Con").getComponent(cc.Label).string = "抽到紫色概率" + summary_1.summary("CK", condition_1.DEFAULT_CJ.TMS).judge;
        cc.find("Canvas/Group_6/Layout/2/Con").getComponent(cc.Label).string = "抽到橙色概率" + summary_1.summary("CJ", condition_1.DEFAULT_CJ.ACJ.length).judge;
        cc.find("Canvas/Group_6/Layout/3/Con").getComponent(cc.Label).string = Math.ceil(condition_1.DEFAULT_CJ.AEVT.length * 100 / Object.keys(this.Events.json).length) + "%";
        cc.find("Canvas/Group_6/Layout/4/Con").getComponent(cc.Label).string = Math.ceil(condition_1.DEFAULT_CJ.ATLT.length * 100 / Object.keys(this.Talents.json).length) + "%";
    };
    Main.prototype.group3In = function () {
        //关闭天赋选择面板
        cc.find("Canvas/Group_2").active = false;
        cc.find("Canvas/Group_3").active = true;
    };
    //关闭小友
    Main.prototype.CloseXY = function () {
        cc.find("Canvas/Group_2/AddTalent").active = false;
        this.group3In();
    };
    Main.prototype.openVideo = function () {
        var _this = this;
        ResMgr_1.default.loadPrefab('prefab/rankingList', function (pre) {
            var prefab = cc.instantiate(pre);
            prefab.parent = _this.node;
        });
    };
    Main.prototype.openGameBox = function () {
        var _this = this;
        ResMgr_1.default.loadPrefab('prefab/gameBox', function (pre) {
            var prefab = cc.instantiate(pre);
            prefab.parent = _this.node;
        });
    };
    __decorate([
        property(cc.JsonAsset)
    ], Main.prototype, "branchline", void 0);
    __decorate([
        property(cc.JsonAsset)
    ], Main.prototype, "Age", void 0);
    __decorate([
        property(cc.JsonAsset)
    ], Main.prototype, "Events", void 0);
    __decorate([
        property(cc.JsonAsset)
    ], Main.prototype, "Talents", void 0);
    __decorate([
        property(cc.JsonAsset)
    ], Main.prototype, "Achievement", void 0);
    __decorate([
        property(cc.Node)
    ], Main.prototype, "TenCPShow", void 0);
    __decorate([
        property(cc.Node)
    ], Main.prototype, "TenCPButton", void 0);
    __decorate([
        property(cc.Node)
    ], Main.prototype, "Tips", void 0);
    __decorate([
        property(cc.Prefab)
    ], Main.prototype, "Entry", void 0);
    __decorate([
        property(cc.Prefab)
    ], Main.prototype, "Box", void 0);
    __decorate([
        property(cc.Prefab)
    ], Main.prototype, "normalLabel", void 0);
    __decorate([
        property(cc.Prefab)
    ], Main.prototype, "MyzzBox", void 0);
    Main = __decorate([
        ccclass
    ], Main);
    return Main;
}(cc.Component));
exports.default = Main;

cc._RF.pop();