
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Main/Main.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWFpblxcTWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBa0M7QUFDbEMsdURBQWtEO0FBQ2xELHNEQUFpRDtBQUNqRCxnREFBMkM7QUFDM0MsZ0RBQTJDO0FBQzNDLDZDQUF3QztBQUN4Qyx5Q0FBOEQ7QUFDOUQsaUNBQTRCO0FBQzVCLG1DQUE4QjtBQUM5QixxQ0FBMEU7QUFFcEUsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBa0Msd0JBQVk7SUFBOUM7UUFBQSxxRUF1NkNDO1FBcjZDRyxVQUFJLEdBQVksS0FBSyxDQUFBO1FBRXJCLGdCQUFVLEdBQWlCLElBQUksQ0FBQTtRQUcvQixTQUFHLEdBQWlCLElBQUksQ0FBQTtRQUV4QixZQUFNLEdBQWlCLElBQUksQ0FBQTtRQUUzQixhQUFPLEdBQWlCLElBQUksQ0FBQTtRQUU1QixpQkFBVyxHQUFpQixJQUFJLENBQUE7UUFFaEMsa0JBQVksR0FBVyxDQUFDLENBQUE7UUFFeEIsYUFBTyxHQUFpQixJQUFJLENBQUEsQ0FBQSxTQUFTO1FBQ3JDLGdCQUFVLEdBQWlCLElBQUksQ0FBQSxDQUFBLFdBQVc7UUFDMUMsSUFBSTtRQUVKLGVBQVMsR0FBWSxJQUFJLENBQUE7UUFFekIsaUJBQVcsR0FBWSxJQUFJLENBQUE7UUFFM0IsVUFBSSxHQUFZLElBQUksQ0FBQTtRQUVwQixXQUFLLEdBQWMsSUFBSSxDQUFBO1FBRXZCLFNBQUcsR0FBYyxJQUFJLENBQUE7UUFFckIsaUJBQVcsR0FBYyxJQUFJLENBQUE7UUFHN0IsYUFBTyxHQUFjLElBQUksQ0FBQTtRQUd6QixRQUFRO1FBQ1Isd0JBQWtCLEdBQVcsQ0FBQyxDQUFDLENBQUEsVUFBVTtRQUN6Qyx3QkFBa0IsR0FBVyxHQUFHLENBQUMsQ0FBQSxVQUFVO1FB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RTtZQUNyQyxLQUFLLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDMUQsS0FBSyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtTQUN6RTthQUFNLElBQUksbUJBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLE9BQU8sRUFBRTtZQUM1QyxLQUFLLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUE7WUFDaEUsS0FBSyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtTQUMvRTthQUFNLElBQUksbUJBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLE9BQU8sRUFBRTtZQUM1QyxLQUFLLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDMUQsS0FBSyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtTQUN6RTthQUFNLElBQUksbUJBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLE9BQU8sRUFBRTtZQUM1QyxLQUFLLENBQUMs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LENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Z0NBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBQTs2QkFBRTs0QkFDck0sSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0NBQUUsSUFBSSxHQUFHLEdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxVQUFVLENBQUE7NkJBQUU7NEJBQ3JNLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dDQUFFLElBQUksR0FBRyxHQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsVUFBVSxDQUFBOzZCQUFFOzRC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QyxDQUFDLHdCQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLHNCQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQUMsc0JBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyx3QkFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLHNCQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLHdCQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLHNCQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQUMsSUFBSSxHQUFHLEdBQVcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxVQUFVLENBQUE7YUFBRTtZQUM3cUIsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQUUsd0JBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxHQUFHLFlBQVUsSUFBSSxDQUFDLFdBQVcsaUNBQWtCLElBQUksQ0FBQyxZQUFZLE1BQUcsR0FBRyx3QkFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLFVBQVUsQ0FBQztnQkFBQyxzQkFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLHdCQUFZLENBQUMs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QUFJLENBQUMsQ0FBQzs0QkFBQyxFQUFFLENBQUMsSUFBSSxDQUFDLDRDQUE0QyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUcsWUFBVSxJQUFJLENBQUMsV0FBVyxpQ0FBa0IsSUFBSSxDQUFDLFlBQVksTUFBRyxHQUFHLHdCQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsVUFBVSxDQUFDOzRCQUFDLE1BQU07d0JBQ3RPLEtBQUssQ0FBQzs0QkFBRSx3QkFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFBQyxFQUFFLENBQUMsSUFBSSxDQUFDLDRDQUE0QyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUcsWUFBVSxJQUFJLENBQUMsV0FBVyxpQ0FBa0IsSUFBSSxDQUFDLFlBQVksTUFBRyxHQUFHLHdCQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsVUFBVSxDQUFDOzRCQUFDLE1BQU07d0JBQ3RPLEtBQUssQ0FBQzs0QkFBRSx3QkFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFBQyxFQUFFLENBQUMsSUFBSSxDQUFDLDRDQUE0QyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUcsWUFBVSxJQUFJLENBQUMsV0FBVyxpQ0FBa0IsSUFBSSxDQUFDLFlBQVksTUFBRyxHQUFHLHdCQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsVUFBVSxDQUFDOzRCQUFDLE1BQU07d0JBQ3RPLEtBQUssQ0FBQzs0QkFBRSx3QkFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFBQyxFQUFFLENBQUMsSUFBSSxDQUFDLDRDQUE0QyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUcsWUFBVSxJQUFJLENBQUMsV0FBVyxpQ0FBa0IsSUFBSSxDQUFDLFlBQVksTUFBRyxHQUFHLHdCQUFZLENB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RUFBRSxDQUFDLE1BQU0sQ0FBQzt1Q0FDRztJQUV2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3FDQUNDO0lBRXJCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7NkNBQ1M7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt5Q0FDSztJQWxDUixJQUFJO1FBRHhCLE9BQU87T0FDYSxJQUFJLENBdTZDeEI7SUFBRCxXQUFDO0NBdjZDRCxBQXU2Q0MsQ0F2NkNpQyxFQUFFLENBQUMsU0FBUyxHQXU2QzdDO2tCQXY2Q29CLElBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2xvYmFsIGZyb20gXCIuLi9BRC9HbG9iYWxcIjtcclxuaW1wb3J0IHdlQ2hhdFBsYXRmb3JtIGZyb20gXCIuLi9BRC93ZUNoYXRQbGF0Zm9ybVwiO1xyXG5pbXBvcnQgeyBTYXZlRGF0YSB9IGZyb20gXCIuLi9PdGhlci9HbG9iYWxEZWZpbmVcIjtcclxuaW1wb3J0IFNhdmVVdGlscyBmcm9tIFwiLi4vT3RoZXIvU2F2ZVV0aWxzXCI7XHJcbmltcG9ydCBVc2VyTW9kZWwgZnJvbSBcIi4uL090aGVyL1VzZXJNb2RlbFwiO1xyXG5pbXBvcnQgQWNoaWV2ZW1lbnQgZnJvbSBcIi4vYWNoaWV2ZW1lbnRcIjtcclxuaW1wb3J0IHsgY2hlY2ssIERFRkFVTFRfQ0osIERFRkFVTFRfUFJPUCB9IGZyb20gXCIuL2NvbmRpdGlvblwiO1xyXG5pbXBvcnQgRW50cnkgZnJvbSBcIi4vRW50cnlcIjtcclxuaW1wb3J0IFJlc01nciBmcm9tIFwiLi9SZXNNZ3JcIjtcclxuaW1wb3J0IHsgQUR0aW1lLCBncmFkZXMsIGdyYWRlc0gsIE90aGVyR3JhZGVzLCBzdW1tYXJ5IH0gZnJvbSBcIi4vc3VtbWFyeVwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW4gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHdnbmI6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICAgQHByb3BlcnR5KGNjLkpzb25Bc3NldClcclxuICAgIGJyYW5jaGxpbmU6IGNjLkpzb25Bc3NldCA9IG51bGxcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuSnNvbkFzc2V0KVxyXG4gICAgQWdlOiBjYy5Kc29uQXNzZXQgPSBudWxsXHJcbiAgICBAcHJvcGVydHkoY2MuSnNvbkFzc2V0KVxyXG4gICAgRXZlbnRzOiBjYy5Kc29uQXNzZXQgPSBudWxsXHJcbiAgICBAcHJvcGVydHkoY2MuSnNvbkFzc2V0KVxyXG4gICAgVGFsZW50czogY2MuSnNvbkFzc2V0ID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLkpzb25Bc3NldClcclxuICAgIEFjaGlldmVtZW50OiBjYy5Kc29uQXNzZXQgPSBudWxsXHJcblxyXG4gICAgSW5kZXhPZkV2ZW50OiBudW1iZXIgPSAwXHJcblxyXG4gICAgQWdlSnNvbjogY2MuSnNvbkFzc2V0ID0gbnVsbC8v5b2T5YmN55qEYWdl6KGoXHJcbiAgICBFdmVudHNKc29uOiBjYy5Kc29uQXNzZXQgPSBudWxsLy/lvZPliY3nmoRldmVudOihqFxyXG4gICAgLy9VSVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBUZW5DUFNob3c6IGNjLk5vZGUgPSBudWxsXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFRlbkNQQnV0dG9uOiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBUaXBzOiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIEVudHJ5OiBjYy5QcmVmYWIgPSBudWxsXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgQm94OiBjYy5QcmVmYWIgPSBudWxsXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgbm9ybWFsTGFiZWw6IGNjLlByZWZhYiA9IG51bGxcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgTXl6ekJveDogY2MuUHJlZmFiID0gbnVsbFxyXG5cclxuXHJcbiAgICAvL+mAieaLqeWkqei1i+WIpOaWrVxyXG4gICAgTm93U2VsZWN0VGFsZW50TnVtOiBudW1iZXIgPSAwOy8v5b2T5YmN6YCJ5oup5aSp6LWL5pWw6YePXHJcbiAgICBNYXhTZWxlY3RUYWxlbnROdW06IG51bWJlciA9IDE1MDsvL+acgOWkp+mAieaLqeWkqei1i+aVsOmHj1xyXG4gICAgQWxyZWFkeVRhbGVudEJ1dHRvbjogc3RyaW5nW10gPSBbXS8v5bey57uP6YCJ5oup55qE5aSp6LWL5oyJ6ZKuXHJcbiAgICBBbGxTaG93VGFsZW50OiBudW1iZXJbXSA9IFtdLy/miYDmnInlj6/ku6XpgInmi6nnmoTlpKnotYvvvIxpbmRleOWwseaYr+aMiemSrueahOmhuuW6j++8iOS7juS4iuWIsOS4i++8iVxyXG4gICAgQ29uVGFsZW50OiBudW1iZXJbXSA9IFtdLy/mr4/lubTmo4DmtYvnmoTlpKnotYtcclxuICAgIC8v6K6h5pe25ZmoXHJcbiAgICBUaXBzSXNPcGVuOiBib29sZWFuID0gZmFsc2UvL3RpcHPpnaLmnb/mmK/lkKbmiZPlvIBcclxuICAgIFRpcHNUaW1lcjogbnVtYmVyID0gMDsvL3RpcHPorqHml7blmahcclxuICAgIC8v5pWw5YC8XHJcbiAgICBNYXhwcm9wZXJ0eU51bTogbnVtYmVyID0gMTAvL+WQhOS4quWxnuaAp+acgOWkp+WAvFxyXG4gICAgTWF4VXNlTnVtOiBudW1iZXIgPSAyMC8v5pyA5aSn5Y+v55So54K55pWwXHJcbiAgICBTdGFyVXNlTnVtOiBudW1iZXIgPSB0aGlzLk1heFVzZU51bS8v5Yid5aeL5Y+v55So54K55pWwXHJcbiAgICBOb3dBZ2U6IG51bWJlciA9IDA7Ly/lvZPliY3lubTpvoRcclxuXHJcbiAgICBpc0RlYXRoOiBib29sZWFuID0gZmFsc2VcclxuXHJcbiAgICBpc0Jvb2w6IGJvb2xlYW4gPSBmYWxzZVxyXG5cclxuICAgIGFjaGlldmVtZW50OiBjYy5Ob2RlOy8v5oiQ5bCx5YiX6KGo54i26IqC54K5XHJcbiAgICBldmVuTGlzdE1ncjogY2MuTm9kZTtcclxuICAgIF9jb250ZW50OiBjYy5Ob2RlO1xyXG4gICAgbGlzdEFycjogQXJyYXk8YW55PiA9IFtdICAgICAvL+S6i+S7tuWIl+ihqOaVsOaNrlxyXG5cclxuICAgIGFkVGltZTogbnVtYmVyID0gMFxyXG4gICAgc3RhcnRQb3M6IGNjLlZlYzI7XHJcbiAgICB0aW1tZXJDRGF1dG86IG51bWJlciA9IDAvL+iHquWKqOaSreaUvuaMiemSruW5v+WRikNEXHJcbiAgICBpc3RpbW1lckNEYXV0bzogYm9vbGVhbiA9IGZhbHNlLy/oh6rliqjmkq3mlL7mjInpkq7lub/lkYpDRFxyXG4gICAgY29tcGxldGVseTogbnVtYmVyID0gMC8v5Yqg6L295a6M5YWoXHJcbiAgICBUWENTOiBudW1iZXIgPSAwLy/lpKnpgInmrKHmlbBcclxuXHJcbiAgICBldmVudFNjcm9sbFZpZXc6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIF9sYXN0UG9zWDogbnVtYmVyID0gMDsvL+WdkOagh+i9rOaNouS5i+WQjueahFjlgLxcclxuXHJcbiAgICBjb250OiBzdHJpbmcgPSBcIlwiXHJcbiAgICBjb250Wmh1amlhOiBzdHJpbmcgPSBcIlwiXHJcbiAgICB0aWNodTogbnVtYmVyW10gPSBbXVxyXG4gICAgaXNPcGVuWFk6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICAgZ3JvdXBfNF9sYWw6IHN0cmluZyA9ICcjMDAwMDAwJ1xyXG4gICAgZ3JvdXBfNF9sYWwxOiBzdHJpbmcgPSAnIzAwMDAwMCdcclxuICAgIHRleF80X2xhbDogc3RyaW5nID0gJyMwMDAwMDAnXHJcbiAgICB0ZXhfNF9sYWwxOiBzdHJpbmcgPSAnIzAwMDAwMCdcclxuICAgIGlzTXl6elNob3c6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuaYr+S4u+e6v+WJp+aDhVxyXG4gICAgY3VzdG9tRGF0YTogYW55O1xyXG4gICAgc2tpblByZWZhYjogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgaXMxb3IyOiBudW1iZXIgPSAxXHJcbiAgICAvL+iDjOaZr+WbvuminOiJslxyXG4gICAgcXVhbGl0eTogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgcXVhbGl0eTE6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcclxuICAgIHF1YWxpdHkyOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XHJcbiAgICBxdWFsaXR5MzogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xyXG5cclxuICAgIC8v5a2Y5YKo6Ieq5Lyg5Zu+54mH5oyJ6ZKuXHJcbiAgICBleHBlcmllbmNlU3A6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcclxuXHJcbiAgICBSYW1URjogbnVtYmVyID0gMTAvL+Wkqei1i+aVsOmHj1xyXG4gICAgaXNXVURJOiBib29sZWFuID0gdHJ1ZS8v5piv5ZCm5piv5peg5pWM5qih5byPXHJcblxyXG4gICAgY2hvaWNlOiBib29sZWFuID0gZmFsc2UvL+S7meS6uuaMh+i3r+mAieaLqeWujOaIkFxyXG5cclxuICAgIHNraW5DZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIG1hb3ppeml6aTogYm9vbGVhbiA9IGZhbHNlOy8v56ys5Yeg5qyh5byA5aeL5Lq655SfXHJcblxyXG4gICAgcmVidWlsZDogYm9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm6L2s5LiW6YeN5L+uXHJcblxyXG4gICAgcmVidWlsZEFnZTogbnVtYmVyID0gMDsvL+S7juWkmuWwkeWygei9rOS4lumHjeS/rlxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIEdsb2JhbC5wbGF0Zm9ybT1uZXcgd2VDaGF0UGxhdGZvcm0oKVxyXG4gICAgICAgIHRoaXMucmVwbGFjZUFsbCgpXHJcblxyXG4gICAgICAgIC8v5rWL6K+VXHJcbiAgICAgICAgREVGQVVMVF9QUk9QW1wiQ0hSXCJdID0gMFxyXG4gICAgICAgIERFRkFVTFRfUFJPUFtcIklOVFwiXSA9IDBcclxuICAgICAgICBERUZBVUxUX1BST1BbXCJMSUZcIl0gPSAxXHJcbiAgICAgICAgREVGQVVMVF9QUk9QW1wiTU5ZXCJdID0gMFxyXG4gICAgICAgIERFRkFVTFRfUFJPUFtcIlNQUlwiXSA9IDBcclxuICAgICAgICBERUZBVUxUX1BST1BbXCJTVFJcIl0gPSAwXHJcbiAgICAgICAgREVGQVVMVF9QUk9QW1wiVExUXCJdID0gW11cclxuICAgICAgICBERUZBVUxUX1BST1BbXCJFVlRcIl0gPSBbXVxyXG4gICAgICAgIHRoaXMuVGlwcy5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5tb3ZlU3RhcnQsIHRoaXMpXHJcbiAgICAgICAgdGhpcy5UaXBzLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMubW92ZUluZywgdGhpcylcclxuICAgICAgICAvL+ivu+ihqFxyXG5cclxuICAgICAgICBSZXNNZ3IubG9hZFRleHQoXCJKc29uL2JyYW5jaGxpbmVcIiwgKGJyYW5jaGxpbmU6IGNjLkpzb25Bc3NldCkgPT4geyB0aGlzLmJyYW5jaGxpbmUgPSBicmFuY2hsaW5lIH0pXHJcbiAgICAgICAgUmVzTWdyLmxvYWRUZXh0KFwiSnNvbi8wL2FnZVwiLCAoYWdlOiBjYy5Kc29uQXNzZXQpID0+IHsgdGhpcy5BZ2UgPSBhZ2UsIHRoaXMuT25sb2FkdGltZXIoKSB9KVxyXG4gICAgICAgIFJlc01nci5sb2FkVGV4dChcIkpzb24vMC9ldmVudHNcIiwgKGV2ZW50czogY2MuSnNvbkFzc2V0KSA9PiB7IHRoaXMuRXZlbnRzID0gZXZlbnRzLCB0aGlzLk9ubG9hZHRpbWVyKCkgfSlcclxuICAgICAgICBSZXNNZ3IubG9hZFRleHQoXCJKc29uLzAvdGFsZW50c1wiLCAodGFsZW50czogY2MuSnNvbkFzc2V0KSA9PiB7IHRoaXMuVGFsZW50cyA9IHRhbGVudHMsIHRoaXMuT25sb2FkdGltZXIoKSB9KVxyXG4gICAgICAgIFJlc01nci5sb2FkVGV4dChcIkpzb24vMC9hY2hpZXZlbWVudFwiLCAoYWNoaWV2ZW1lbnQ6IGNjLkpzb25Bc3NldCkgPT4geyB0aGlzLkFjaGlldmVtZW50ID0gYWNoaWV2ZW1lbnQsIHRoaXMuT25sb2FkdGltZXIoKSB9KVxyXG4gICAgICAgIGlmICghU2F2ZURhdGEuaXNBdXRvQUQpIHtcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8vQmFja2dyb3VuZC9JY29uXCIpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFTYXZlRGF0YS5pc0F1dG9BRDIpIHtcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8yL0JhY2tncm91bmQvSWNvblwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoU2F2ZURhdGEuaXNBdXRvKSB7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9BdXRvL0JhY2tncm91bmQvWkQxXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9BdXRvL0JhY2tncm91bmQvWkQyXCIpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvQXV0by9CYWNrZ3JvdW5kL1pEMVwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9BdXRvL0JhY2tncm91bmQvWkQyXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoU2F2ZURhdGEuaXNBdXRvMikge1xyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvQXV0bzIvQmFja2dyb3VuZC9aRDFcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8yL0JhY2tncm91bmQvWkQyXCIpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvQXV0bzIvQmFja2dyb3VuZC9aRDFcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvQXV0bzIvQmFja2dyb3VuZC9aRDJcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mlbDmja7lupTnlKhcclxuICAgICAgICB0aGlzLkNhblVzZSgwKVxyXG5cclxuICAgICAgICBpZiAoREVGQVVMVF9DSi5UTVMgPCAxKSB7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfMS9hY2hpZXZlbWVudFwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmV2ZW50U2Nyb2xsVmlldyA9IGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9TY3JvbGxWaWV3XCIpXHJcbiAgICAgICAgdGhpcy5fY29udGVudCA9IGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9TY3JvbGxWaWV3L3ZpZXcvTGF5b3V0XCIpXHJcbiAgICAgICAgdGhpcy50b25namkoKVxyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9uKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5LRVlfRE9XTiwgdGhpcy5vbk5laUd1YSwgdGhpcyk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBvbk5laUd1YShldmVudCkge1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xyXG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5hOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5NYXhVc2VOdW0gKz0gMjBcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2FuVXNlKDIwKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLndnbmIgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBPbmxvYWR0aW1lcigpIHtcclxuICAgICAgICB0aGlzLmNvbXBsZXRlbHkrKztcclxuICAgICAgICBpZiAodGhpcy5jb21wbGV0ZWx5ID09IDQpIHtcclxuICAgICAgICAgICAgdGhpcy50b25namkoKVxyXG4gICAgICAgICAgICBjYy5maW5kKCdHcm91cF8xL2FjaGlldmVtZW50JywgdGhpcy5ub2RlKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Li757q/6YCJ5oupXHJcbiAgICBTZWxlY3RTdG9yeShldmVudCwgY3VzdG9tRXZlbnREYXRhKSB7XHJcbiAgICAgICAgdGhpcy5BZ2VKc29uID0gdGhpcy5BZ2U7IHRoaXMuRXZlbnRzSnNvbiA9IHRoaXMuRXZlbnRzO3RoaXMuSW5kZXhPZkV2ZW50ID0gMDtcclxuICAgIH1cclxuICAgIC8v5LiN6YCJ5aSp6LWL55u05o6l6L+b5YWl5LiL5LiA57qnXHJcbiAgICBFbnRlck5leHQoZXZlbnQsIGN1c3RvbUV2ZW50RGF0YSkge1xyXG4gICAgICAgIGlmIChTYXZlRGF0YS5NeXp6W051bWJlcihjdXN0b21FdmVudERhdGEpIC0gMV0gPT0gMSkge1xyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzJcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF83XCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvQkdcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzNcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHAgPSAwOyBwIDwgT2JqZWN0LmtleXModGhpcy5icmFuY2hsaW5lLmpzb24pLmxlbmd0aDsgcCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5icmFuY2hsaW5lLmpzb25bcCArIDFdW1wiaWRcIl0gPT0gY3VzdG9tRXZlbnREYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVGlwc09wZW4odHJ1ZSwgY2MuY29sb3IoMTI4LCAyMjMsIDIzOSksIFwi5a6M5oiQ5oiQ5bCxIOOAkFwiICsgdGhpcy5BY2hpZXZlbWVudC5qc29uW3RoaXMuYnJhbmNobGluZS5qc29uW3AgKyAxXVtcImFjaGlldmVtZW50SURcIl1dW1wibmFtZVwiXSArIFwi44CRIOino+mUgVwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuVGlwc0lzT3Blbikge1xyXG4gICAgICAgICAgICB0aGlzLlRpcHNUaW1lciArPSBkdFxyXG4gICAgICAgICAgICBpZiAodGhpcy5UaXBzVGltZXIgPj0gMS41KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRpcHNPcGVuKGZhbHNlLCBjYy5jb2xvcigxMjgsIDIyMywgMjM5KSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXN0aW1tZXJDRGF1dG8pIHtcclxuICAgICAgICAgICAgdGhpcy50aW1tZXJDRGF1dG8gKz0gMVxyXG4gICAgICAgICAgICBpZiAodGhpcy50aW1tZXJDRGF1dG8gPj0gMTUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGltbWVyQ0RhdXRvID0gMFxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc3RpbW1lckNEYXV0byA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKFNhdmVEYXRhLmlzQXV0byAmJiB0aGlzLmlzQm9vbCkge1xyXG4gICAgICAgICAgICB0aGlzLmFkVGltZSArPSBkdFxyXG4gICAgICAgICAgICBpZiAodGhpcy5hZFRpbWUgPj0gMS41KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkVGltZSA9IDBcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29udGludWUoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChTYXZlRGF0YS5pc0F1dG8yICYmIHRoaXMuaXNCb29sKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRUaW1lICs9IGR0XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFkVGltZSA+PSAwLjc1KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkVGltZSA9IDBcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29udGludWUoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5bm/5ZGK5YCS6K6h5pe2XHJcbiAgICAgICAgaWYgKFNhdmVEYXRhLmlzQXV0b0FEMikge1xyXG4gICAgICAgICAgICBsZXQgYWxsID0gTWF0aC5yb3VuZChuZXcgRGF0ZSgpLmdldFRpbWUoKSkgLyAxMDAwIC0gU2F2ZURhdGEuTGFzdFRpbWVcclxuICAgICAgICAgICAgbGV0IGhhdmUgPSBBRHRpbWUgLSBhbGxcclxuICAgICAgICAgICAgaWYgKGFsbCA+IEFEdGltZSkge1xyXG4gICAgICAgICAgICAgICAgLy/otoXml7bkuoZcclxuICAgICAgICAgICAgICAgIFNhdmVEYXRhLmlzQXV0b0FEMiA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBTYXZlRGF0YS5pc0F1dG8yID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9BdXRvMi9CYWNrZ3JvdW5kL0ljb25cIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8yL0JhY2tncm91bmQvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuingueci+W5v+WRiuWNs+WPr+eri+WNs+S9v+eUqDI05bCP5pe2XCJcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8v5rKh6LaF5pe2XHJcbiAgICAgICAgICAgICAgICBsZXQgc2hpXHJcbiAgICAgICAgICAgICAgICBsZXQgZmVuXHJcbiAgICAgICAgICAgICAgICBzaGkgPSBNYXRoLmZsb29yKGhhdmUgLyAzNjAwKVxyXG4gICAgICAgICAgICAgICAgZmVuID0gTWF0aC5mbG9vcigoaGF2ZSAtIHNoaSAqIDM2MDApIC8gNjApXHJcbiAgICAgICAgICAgICAgICBpZiAoZmVuIDwgMSkgeyBmZW4gPSAxIH1cclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9BdXRvMi9CYWNrZ3JvdW5kL0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gJ+WJqeS9mSAnICsgc2hpICsgXCIg5bCP5pe2IFwiICsgZmVuICsgXCIg5YiG6ZKfXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHN0YXJ0R2FtZSgpIHtcclxuXHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF8xXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9CR1wiKS5hY3RpdmUgPSB0cnVlXHJcblxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfMlwiKS5hY3RpdmUgPSB0cnVlXHJcblxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfMS9OdW1fUmVvcGVuX0JveC9MYWJlbF8xXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCLlt7Lph43lvIBcIiArIERFRkFVTFRfQ0ouVE1TICsgXCLmrKFcIlxyXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLlZJVk9fR0FNRSB8fCBjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLlhJQU9NSV9HQU1FIHx8IHdpbmRvd1sndWMnXSkge1xyXG4gICAgICAgICAgICBHbG9iYWwucGxhdGZvcm0uU0hPV19USVRJQUxBRDEoKVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aIkOWwseajgOafpVxyXG4gICAgICAgIHRoaXMuY2hlY2tfY2ooXCJvcHBvcnR1bml0eVwiKVxyXG4gICAgfVxyXG5cclxuICAgIC8v5pu/5o2i5omA5pyJ55qu6IKkXHJcbiAgICByZXBsYWNlQWxsKCkge1xyXG4gICAgICAgIC8v5aSp6LWL6YCJ5oup6IOM5pmv5Zu+6aKc6ImyXHJcbiAgICAgICAgUmVzTWdyLmxvYWRJbWFnZVJldChgc2tpbi8ke1VzZXJNb2RlbC5pbnN0YW5jZS51c2luZ30vdGZ4ei9Cb3hfV2hpdGVfZjlmY2ZmYCwgKHNwOiBjYy5TcHJpdGVGcmFtZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnF1YWxpdHkgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnF1YWxpdHkgPSBzcDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIFJlc01nci5sb2FkSW1hZ2VSZXQoYHNraW4vJHtVc2VyTW9kZWwuaW5zdGFuY2UudXNpbmd9L3RmeHovQm94X0JsdWVfNjdjZmZmYCwgKHNwOiBjYy5TcHJpdGVGcmFtZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnF1YWxpdHkxID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5xdWFsaXR5MSA9IHNwO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgUmVzTWdyLmxvYWRJbWFnZVJldChgc2tpbi8ke1VzZXJNb2RlbC5pbnN0YW5jZS51c2luZ30vdGZ4ei9Cb3hfUHVycGxlX2M2N2NmZmAsIChzcDogY2MuU3ByaXRlRnJhbWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5xdWFsaXR5MiA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMucXVhbGl0eTIgPSBzcDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIFJlc01nci5sb2FkSW1hZ2VSZXQoYHNraW4vJHtVc2VyTW9kZWwuaW5zdGFuY2UudXNpbmd9L3RmeHovQm94X09yYW5nZV9mZjhlNDlgLCAoc3A6IGNjLlNwcml0ZUZyYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucXVhbGl0eTMgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnF1YWxpdHkzID0gc3A7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBSZXNNZ3IubG9hZEltYWdlUmV0KGBza2luLyR7VXNlck1vZGVsLmluc3RhbmNlLnVzaW5nfS93ZHp6L0J0bl9FWFBgLCAoc3ApID0+IHtcclxuICAgICAgICAgICAgdGhpcy5leHBlcmllbmNlU3AgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmV4cGVyaWVuY2VTcCA9IHNwO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5ncm91cF80X2xhbCA9ICcjMDAwMDAwJ1xyXG4gICAgICAgIHRoaXMuZ3JvdXBfNF9sYWwxID0gJyMwMDAwMDAnXHJcbiAgICAgICAgdGhpcy50ZXhfNF9sYWwgPSAnIzAwMDAwMCdcclxuICAgICAgICB0aGlzLnRleF80X2xhbDEgPSAnI0ZGQjg1OSdcclxuICAgIH1cclxuXHJcbiAgICBSYW5rKCkge1xyXG4gICAgICAgIHRoaXMuVGlwc09wZW4odHJ1ZSwgY2MuY29sb3IoMTI4LCAyMjMsIDIzOSksIFwi6L+Y5rKh5pyJXCIpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuR3JvdXAxKCkge1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfMVwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9CR1wiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfMlwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIEp1ZGdlQ29sb3Iobm9kZTogY2MuTm9kZSwgY29sb3I6IGFueSkge1xyXG4gICAgICAgIGlmIChjb2xvci50b1N0cmluZygpID09IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUpLnRvU3RyaW5nKCkpIHtcclxuICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnU3AnKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucXVhbGl0eTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNvbG9yLnRvU3RyaW5nKCkgPT0gY2MuY29sb3IoMTAzLCAxOTcsIDIzMCkudG9TdHJpbmcoKSkge1xyXG4gICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdTcCcpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5xdWFsaXR5MTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNvbG9yLnRvU3RyaW5nKCkgPT0gY2MuY29sb3IoMjM3LCAxMjAsIDIzOSkudG9TdHJpbmcoKSkge1xyXG4gICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdTcCcpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5xdWFsaXR5MjtcclxuICAgICAgICB9IGVsc2UgaWYgKGNvbG9yLnRvU3RyaW5nKCkgPT0gY2MuY29sb3IoMjQ3LCAxNDAsIDc1KS50b1N0cmluZygpKSB7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ1NwJykuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnF1YWxpdHkzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHVwZGF0ZU5yb21hbExhYmxlKGo6IGNjLk5vZGUsIGNvbG9yPzogYW55KSB7XHJcbiAgICAgICAgaWYgKFVzZXJNb2RlbC5pbnN0YW5jZS51c2luZyA9PSAnc2tpbjAnKSB7XHJcbiAgICAgICAgICAgIGouZ2V0Q2hpbGRCeU5hbWUoJ0xhYmVsJykuY29sb3IgPSBjYy5jb2xvcigwLCAwLCAwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBSZXNNZ3IubG9hZEltYWdlKGBza2luLyR7VXNlck1vZGVsLmluc3RhbmNlLnVzaW5nfS90Znh6L0hvb2tgLCBqLmdldENoaWxkQnlOYW1lKCdCb3hfU2VsZWN0ZWQnKS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKSlcclxuICAgICAgICBpZiAoY29sb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5KdWRnZUNvbG9yKGosIGNvbG9yKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Y2B6L+e5oq9XHJcbiAgICBUZW5DUCgpIHtcclxuICAgICAgICAvL+WumuS5ieWJlOmZpOaVsOe7hO+8iOeUseW3sumAieWkqei1i+WSjOS6kuaWpeWkqei1i+e7hOaIkO+8iVxyXG4gICAgICAgIHRoaXMudGljaHUgPSBbXVxyXG4gICAgICAgIGxldCBpbmRleCA9IDBcclxuICAgICAgICBsZXQgaXNsdW4gPSBmYWxzZVxyXG4gICAgICAgIGxldCB0aWFuZnUgPSBbXTtcclxuICAgICAgICAvL+i9ruWbnuWkqei1i1xyXG4gICAgICAgIC8vIFNhdmVEYXRhLkx1bkh1aVRhbGVudCA9IDExMzRcclxuICAgICAgICBpZiAoU2F2ZURhdGEuTHVuSHVpVGFsZW50ICE9IDApIHtcclxuICAgICAgICAgICAgaW5kZXggPSBTYXZlRGF0YS5MdW5IdWlUYWxlbnRcclxuICAgICAgICAgICAgaXNsdW4gPSB0cnVlXHJcbiAgICAgICAgICAgIFNhdmVEYXRhLkx1bkh1aVRhbGVudCA9IDBcclxuICAgICAgICAgICAgU2F2ZVV0aWxzLmluc3QuU2F2ZURhdGEoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlzbHVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGljaHUucHVzaChpbmRleClcclxuICAgICAgICAgICAgdGlhbmZ1LnB1c2goaW5kZXgpXHJcbiAgICAgICAgICAgIGlzbHVuID0gZmFsc2VcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBsZW4gPSBPYmplY3Qua2V5cyh0aGlzLlRhbGVudHMuanNvbikubGVuZ3RoXHJcbiAgICAgICAgZm9yIChsZXQgcyA9IDA7IHMgPCBsZW47IHMrKykge1xyXG4gICAgICAgICAgICAvL+WIpOaWreacieayoeaciei9ruWbnuWkqei1i+mcgOimgeWFiOeUn+aIkFxyXG4gICAgICAgICAgICBpZiAoMTAwMSArIHMgPT0gaW5kZXgpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB0aWFuZnUucHVzaCgxMDAxICsgcylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRpYW5mdS5zb3J0KCh4LCB5KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLlRhbGVudHMuanNvblt5XVsnZ3JhZGUnXSAtIHRoaXMuVGFsZW50cy5qc29uW3hdWydncmFkZSddXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvL+eUn+aIkC/plIDmr4HoioLngrlcclxuICAgICAgICBsZXQgYyA9IHRoaXMuVGVuQ1BTaG93LmNoaWxkcmVuQ291bnRcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbiAtIGM7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaiA9IGNjLmluc3RhbnRpYXRlKHRoaXMubm9ybWFsTGFiZWwpXHJcbiAgICAgICAgICAgIGoucGFyZW50ID0gdGhpcy5UZW5DUFNob3dcclxuICAgICAgICAgICAgdGhpcy5BdXRvQWRkQ2xpY2tFdmVudCh0aGlzLm5vZGUsIFwiTWFpblwiLCBcIlNlbGVjdFRhbGVudFwiLCAoaSArIDEpLnRvU3RyaW5nKCksIGopXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vVUnkuqTkupJcclxuICAgICAgICB0aGlzLlRlbkNQQnV0dG9uLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5UZW5DUFNob3cuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfMi9TZWxlY3RfMlwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF8yL1Jlb3BlblwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgbGV0IGluZGV4MTtcclxuICAgICAgICBmb3IgKGxldCBtID0gMDsgbSA8IGxlbjsgbSsrKSB7XHJcbiAgICAgICAgICAgIGluZGV4MSA9IHRpYW5mdVttXVxyXG4gICAgICAgICAgICAvL+aLv+WIsOS4jemHjeWkjeS4jeS6kuaWpeeahOWkqei1i0lE77yaaW5kZXjvvIzooajnjrDlh7rmnaVcclxuICAgICAgICAgICAgdGhpcy5UZW5DUFNob3cuY2hpbGRyZW5bbV0uZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuVGFsZW50cy5qc29uW2luZGV4MV1bXCJuYW1lXCJdICsgXCIoXCIgKyB0aGlzLlRhbGVudHMuanNvbltpbmRleDFdW1wiZGVzY3JpcHRpb25cIl0gKyBcIilcIlxyXG4gICAgICAgICAgICAvL+eogOacieW6plVJ6KGo546wXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTnJvbWFsTGFibGUodGhpcy5UZW5DUFNob3cuY2hpbGRyZW5bbV0sIGdyYWRlc1t0aGlzLlRhbGVudHMuanNvbltpbmRleDFdW1wiZ3JhZGVcIl1dKVxyXG4gICAgICAgICAgICAvL+aUvuWIsOaJgOacieWPr+S7pemAieaLqeeahOWkqei1i+aVsOe7hOmHjFxyXG4gICAgICAgICAgICB0aGlzLkFsbFNob3dUYWxlbnQucHVzaChpbmRleDEpXHJcbiAgICAgICAgICAgIC8v6YeN572u6KGo546wXHJcbiAgICAgICAgICAgIHRoaXMuVGVuQ1BTaG93LmNoaWxkcmVuW21dLmdldENoaWxkQnlOYW1lKFwiQm94X1NlbGVjdGVkXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIC8v5Yik5pat6L+Z5Liq5aSp6LWL5pyJ5rKh5pyJ5LqS5pal5aSp6LWL5bm25LiU5Yig6Zmk5omA5pyJ5LqS5pal5aSp6LWLXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfMi9TY3JvbGxWaWV3XCIpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5zY3JvbGxUb1RvcCgwKVxyXG4gICAgfVxyXG4gICAgVGVuQ1BfZGlndWkoX2luZGV4OiBudW1iZXIsIF90aWNodTogbnVtYmVyW10pIHtcclxuICAgICAgICAvL+S7jlRhbGVudHPpmo/mnLrlh7rkuIDkuKrlpKnotYtJRFxyXG4gICAgICAgIF9pbmRleCA9IDEwMDAgKyBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIE9iamVjdC5rZXlzKHRoaXMuVGFsZW50cy5qc29uKS5sZW5ndGgpXHJcbiAgICAgICAgLy/liKTmlq1h5piv5ZCm5Zyo5YmU6Zmk5pWw57uE77yM5Zyo5bCx6YCS5b2SXHJcbiAgICAgICAgY29uc3Qgc2pzID0gTWF0aC5yYW5kb20oKTsgbGV0IGdyYWRlID0gMFxyXG4gICAgICAgIC8vaWYoc2pzPjAuMTExKXtncmFkZT0wfWVsc2UgaWYoc2pzPjAuMDExKXtncmFkZT0xfWVsc2UgaWYoc2pzPjAuMDAxKXtncmFkZT0yfWVsc2V7Z3JhZGU9M31cclxuICAgICAgICBsZXQgcmFtID0gMC4yICogKERFRkFVTFRfQ0ouQUVWVC5sZW5ndGggLyBPYmplY3Qua2V5cyh0aGlzLkV2ZW50cy5qc29uKS5sZW5ndGgpICsgMC4yICogKERFRkFVTFRfQ0ouQVRMVC5sZW5ndGggLyBPYmplY3Qua2V5cyh0aGlzLlRhbGVudHMuanNvbikubGVuZ3RoKVxyXG4gICAgICAgIGlmIChzanMgPiAwLjQgKyByYW0pIHsgZ3JhZGUgPSAwIH0gZWxzZSBpZiAoc2pzID4gMC4zICsgcmFtKSB7IGdyYWRlID0gMSB9IGVsc2UgaWYgKHNqcyA+IDAuMiArIHJhbSkgeyBncmFkZSA9IDIgfSBlbHNlIHsgZ3JhZGUgPSAzIH1cclxuICAgICAgICBpZiAoX3RpY2h1LmluY2x1ZGVzKF9pbmRleCkgfHwgdGhpcy5UYWxlbnRzLmpzb25bX2luZGV4XVtcImdyYWRlXCJdICE9IGdyYWRlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLlRlbkNQX2RpZ3VpKF9pbmRleCwgX3RpY2h1KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8v5pys5aSp6LWL5Yqg5YWl5YmU6Zmk5pWw57uELOW5tui/lOWbnlxyXG4gICAgICAgICAgICBfdGljaHUucHVzaChfaW5kZXgpXHJcbiAgICAgICAgICAgIHJldHVybiBfaW5kZXhcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgU2VsZWN0VGFsZW50KGV2ZW50LCBjdXN0b21FdmVudERhdGEpIHtcclxuICAgICAgICBsZXQgYm9vbCA9IHRoaXMubXV0ZXgodGhpcy5BbGxTaG93VGFsZW50W051bWJlcihjdXN0b21FdmVudERhdGEpIC0gMV0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGJvb2xbMF0pIHtcclxuICAgICAgICAgICAgdGhpcy5UaXBzT3Blbih0cnVlLCBjYy5jb2xvcigxMjgsIDIyMywgMjM5KSwgXCLkuI7lt7LpgInmi6nnmoTlpKnotYvjgJBcIiArIGJvb2xbMV0ubmFtZSArIFwi44CR5Yay56qBXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLk5vd1NlbGVjdFRhbGVudE51bSA8IHRoaXMuTWF4U2VsZWN0VGFsZW50TnVtICYmICF0aGlzLkFscmVhZHlUYWxlbnRCdXR0b24uaW5jbHVkZXMoY3VzdG9tRXZlbnREYXRhKSkge1xyXG4gICAgICAgICAgICB0aGlzLk5vd1NlbGVjdFRhbGVudE51bSArPSAxXHJcbiAgICAgICAgICAgIGlmICh0aGlzLk5vd1NlbGVjdFRhbGVudE51bSA9PSB0aGlzLk1heFNlbGVjdFRhbGVudE51bSkge1xyXG4gICAgICAgICAgICAgICAgLy8gY2MuZmluZChcIkNhbnZhcy9Hcm91cF8yL1NlbGVjdF8yL0JhY2tncm91bmQvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuW8gOWni+aWsOS6uueUn1wiXHJcbiAgICAgICAgICAgICAgICAvLyBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzIvU2VsZWN0XzIvQmFja2dyb3VuZC9MYWJlbFwiKS5jb2xvciA9IE90aGVyR3JhZGVzWzFdXHJcbiAgICAgICAgICAgICAgICAvLyBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzIvU2VsZWN0XzIvQmFja2dyb3VuZC9PS0JHXCIpLmNvbG9yID0gT3RoZXJHcmFkZXNbMF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLkFscmVhZHlUYWxlbnRCdXR0b24ucHVzaChjdXN0b21FdmVudERhdGEpXHJcbiAgICAgICAgICAgIHRoaXMuVGVuQ1BTaG93LmNoaWxkcmVuW051bWJlcihjdXN0b21FdmVudERhdGEpIC0gMV0uZ2V0Q2hpbGRCeU5hbWUoXCJCb3hfU2VsZWN0ZWRcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5Ob3dTZWxlY3RUYWxlbnROdW0gPj0gdGhpcy5NYXhTZWxlY3RUYWxlbnROdW0gJiYgIXRoaXMuQWxyZWFkeVRhbGVudEJ1dHRvbi5pbmNsdWRlcyhjdXN0b21FdmVudERhdGEpKSB7XHJcbiAgICAgICAgICAgIC8v5bey57uP6YCJ5aSf5LqGXHJcbiAgICAgICAgICAgIHRoaXMuVGlwc09wZW4odHJ1ZSwgY2MuY29sb3IoMTI4LCAyMjMsIDIzOSksIFwi5Y+q6IO96YCJXCIgKyB0aGlzLk1heFNlbGVjdFRhbGVudE51bSArIFwi5Liq5aSp6LWLXCIpXHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLkFscmVhZHlUYWxlbnRCdXR0b24uaW5jbHVkZXMoY3VzdG9tRXZlbnREYXRhKSkge1xyXG4gICAgICAgICAgICAvL+WPlua2iOmAieaLqVxyXG4gICAgICAgICAgICB0aGlzLk5vd1NlbGVjdFRhbGVudE51bSAtPSAxXHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuQWxyZWFkeVRhbGVudEJ1dHRvbi5pbmRleE9mKGN1c3RvbUV2ZW50RGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7IHRoaXMuQWxyZWFkeVRhbGVudEJ1dHRvbi5zcGxpY2UoaW5kZXgsIDEpOyB9XHJcbiAgICAgICAgICAgIHRoaXMuVGVuQ1BTaG93LmNoaWxkcmVuW051bWJlcihjdXN0b21FdmVudERhdGEpIC0gMV0uZ2V0Q2hpbGRCeU5hbWUoXCJCb3hfU2VsZWN0ZWRcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbXV0ZXgoaWQpOiBhbnlbXSB7XHJcbiAgICAgICAgbGV0IGJvb2wgPSBbZmFsc2VdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5BbHJlYWR5VGFsZW50QnV0dG9uLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpZDEgPSB0aGlzLkFsbFNob3dUYWxlbnRbTnVtYmVyKHRoaXMuQWxyZWFkeVRhbGVudEJ1dHRvbltpXSkgLSAxXVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuVGFsZW50cy5qc29uW2lkMV0uZXhjbHVzaXZlKSBjb250aW51ZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLlRhbGVudHMuanNvbltpZDFdW1wiZXhjbHVzaXZlXCJdLmxlbmd0aDsgeSsrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygn6KGo5qC8JywgTnVtYmVyKHRoaXMuVGFsZW50cy5qc29uW2lkMV1bXCJleGNsdXNpdmVcIl1beV0pLCBpZClcclxuICAgICAgICAgICAgICAgIGlmIChOdW1iZXIodGhpcy5UYWxlbnRzLmpzb25baWQxXVtcImV4Y2x1c2l2ZVwiXVt5XSkgPT0gaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBib29sID0gW3RydWUsIHRoaXMuVGFsZW50cy5qc29uW2lkMV1dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYm9vbFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICByb2FkKCk6IGJvb2xlYW4ge1xyXG5cclxuICAgICAgICBsZXQgYm9vbCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaXNPcGVuWFkpIHtcclxuICAgICAgICAgICAgdGhpcy5ncm91cDNJbigpXHJcbiAgICAgICAgICAgIGJvb2wgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYm9vbDtcclxuICAgIH1cclxuXHJcbiAgICAvL+Wkqei1i+mAieWujOS6hui/m+WFpeS4i+S4gOe6p1xyXG4gICAgVGFsZW50U2VsZWN0T3ZlcigpIHtcclxuICAgICAgICBpZiAodGhpcy5Ob3dTZWxlY3RUYWxlbnROdW0gPD0gdGhpcy5NYXhTZWxlY3RUYWxlbnROdW0pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2hvaWNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwM0luKClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tYW96aXppemkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYm9vbCA9IHRoaXMucm9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFveml6aXppID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYm9vbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLk5vd1NlbGVjdFRhbGVudE51bSA8IHRoaXMuTWF4U2VsZWN0VGFsZW50TnVtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVGlwc09wZW4odHJ1ZSwgY2MuY29sb3IoMTI4LCAyMjMsIDIzOSksIFwi6K+36YCJ5oupXCIgKyB0aGlzLk1heFNlbGVjdFRhbGVudE51bSArIFwi5Liq5aSp6LWLXCIpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFsbHR0YWxlbnQgPSBbXVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5BbHJlYWR5VGFsZW50QnV0dG9uLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8v5a6e6KOF5aSp6LWLXHJcbiAgICAgICAgICAgIGFsbHR0YWxlbnQucHVzaCh0aGlzLkFsbFNob3dUYWxlbnRbTnVtYmVyKHRoaXMuQWxyZWFkeVRhbGVudEJ1dHRvbltpXSkgLSAxXSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhbGx0dGFsZW50LmluY2x1ZGVzKDEwMTkpKSB7IHRoaXMuTWF4VXNlTnVtICs9IDQ7IHRoaXMuU3RhclVzZU51bSA9IHRoaXMuTWF4VXNlTnVtIH1cclxuICAgICAgICBpZiAoYWxsdHRhbGVudC5pbmNsdWRlcygxMDY0KSkgeyB0aGlzLk1heFVzZU51bSArPSA4OyB0aGlzLlN0YXJVc2VOdW0gPSB0aGlzLk1heFVzZU51bSB9XHJcbiAgICAgICAgaWYgKGFsbHR0YWxlbnQuaW5jbHVkZXMoMTAwNykpIHsgdGhpcy5NYXhVc2VOdW0gKz0gMjsgdGhpcy5TdGFyVXNlTnVtID0gdGhpcy5NYXhVc2VOdW0gfVxyXG4gICAgICAgIGlmIChhbGx0dGFsZW50LmluY2x1ZGVzKDExMjIpKSB7IHRoaXMuTWF4VXNlTnVtID0gMDsgdGhpcy5TdGFyVXNlTnVtID0gdGhpcy5NYXhVc2VOdW0gfVxyXG4gICAgICAgIGlmIChhbGx0dGFsZW50LmluY2x1ZGVzKDEwODYpKSB7IHRoaXMuTWF4VXNlTnVtIC09IDEwOyB0aGlzLlN0YXJVc2VOdW0gPSB0aGlzLk1heFVzZU51bSB9XHJcbiAgICAgICAgaWYgKGFsbHR0YWxlbnQuaW5jbHVkZXMoMTA4NSkpIHsgdGhpcy5NYXhVc2VOdW0gLT0gMzsgdGhpcy5TdGFyVXNlTnVtID0gdGhpcy5NYXhVc2VOdW0gfVxyXG4gICAgICAgIGlmIChhbGx0dGFsZW50LmluY2x1ZGVzKDEwODQpKSB7IHRoaXMuTWF4VXNlTnVtIC09IDI7IHRoaXMuU3RhclVzZU51bSA9IHRoaXMuTWF4VXNlTnVtIH1cclxuICAgICAgICBpZiAoYWxsdHRhbGVudC5pbmNsdWRlcygxMDYzKSkgeyB0aGlzLk1heFVzZU51bSArPSAxOyB0aGlzLlN0YXJVc2VOdW0gPSB0aGlzLk1heFVzZU51bSB9XHJcbiAgICAgICAgaWYgKHRoaXMuTWF4VXNlTnVtIDwgMCkgeyB0aGlzLk1heFVzZU51bSA9IDA7IHRoaXMuU3RhclVzZU51bSA9IHRoaXMuTWF4VXNlTnVtIH1cclxuICAgICAgICBpZiAoU2F2ZURhdGEuaXNQUERZICYmIFNhdmVEYXRhLmlzUFBEWTIpIHtcclxuICAgICAgICAgICAgU2F2ZURhdGEuaXNQUERZMiA9IGZhbHNlXHJcbiAgICAgICAgICAgIFNhdmVVdGlscy5pbnN0LlNhdmVEYXRhKClcclxuICAgICAgICAgICAgREVGQVVMVF9QUk9QW1wiQ0hSXCJdICs9IDE7IGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfMy9MYXlvdXQvQ0hSL1Nwcml0ZS9MYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiMVwiXHJcbiAgICAgICAgICAgIERFRkFVTFRfUFJPUFtcIklOVFwiXSArPSAxOyBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzMvTGF5b3V0L0lOVC9TcHJpdGUvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIjFcIlxyXG4gICAgICAgICAgICBERUZBVUxUX1BST1BbXCJTVFJcIl0gKz0gMTsgY2MuZmluZChcIkNhbnZhcy9Hcm91cF8zL0xheW91dC9TVFIvU3ByaXRlL0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCIxXCJcclxuICAgICAgICAgICAgREVGQVVMVF9QUk9QW1wiTU5ZXCJdICs9IDE7IGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfMy9MYXlvdXQvTU5ZL1Nwcml0ZS9MYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiMVwiXHJcbiAgICAgICAgICAgIHRoaXMuTWF4VXNlTnVtICs9IDRcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5DYW5Vc2UoMClcclxuXHJcblxyXG4gICAgICAgIC8v5LiL6L6I5a2Q5LiJ6YCJ5LiA5aSp6LWLXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLkFscmVhZHlUYWxlbnRCdXR0b24ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmiZPlvIBsYWJlbFwiKVxyXG4gICAgICAgICAgICAvL+aJk+W8gGxhYmVsXHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfMy9TY3JvbGxWaWV3Mi9MYWJlbFwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuQWxsU2hvd1RhbGVudFtOdW1iZXIodGhpcy5BbHJlYWR5VGFsZW50QnV0dG9uW2ldKSAtIDFdXHJcbiAgICAgICAgICAgIGxldCBqID0gY2MuaW5zdGFudGlhdGUodGhpcy5ub3JtYWxMYWJlbClcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVOcm9tYWxMYWJsZShqLCBncmFkZXNbdGhpcy5UYWxlbnRzLmpzb25baW5kZXhdW1wiZ3JhZGVcIl1dKVxyXG4gICAgICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgai5wYXJlbnQgPSBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzMvU2Nyb2xsVmlldzIvdmlldy9MYXlvdXRcIilcclxuICAgICAgICAgICAgLy8gfSwgMCk7XHJcbiAgICAgICAgICAgIGouZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuZW5hYmxlZCA9IGZhbHNlXHJcblxyXG4gICAgICAgICAgICBERUZBVUxUX1BST1BbXCJUTFRcIl0ucHVzaChpbmRleClcclxuICAgICAgICAgICAgaWYgKHRoaXMuVGFsZW50cy5qc29uW2luZGV4XVtcInNob3dcIl0gIT0gMCkgeyB0aGlzLkNvblRhbGVudC5wdXNoKGluZGV4KSB9XHJcbiAgICAgICAgICAgIGlmICghREVGQVVMVF9DSltcIkFUTFRcIl0uaW5jbHVkZXMoaW5kZXgpKSB7IERFRkFVTFRfQ0pbXCJBVExUXCJdLnB1c2goaW5kZXgpIH1cclxuXHJcbiAgICAgICAgICAgIC8v6YeN572u6KGo546wXHJcbiAgICAgICAgICAgIGouZ2V0Q2hpbGRCeU5hbWUoXCJCb3hfU2VsZWN0ZWRcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAvL+Wkqei1i+ehruWumuaIkOWKn+WinuWKoOWkqei1i1xyXG4gICAgICAgICAgICBqLmdldENoaWxkQnlOYW1lKFwiTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLlRhbGVudHMuanNvbltpbmRleF1bXCJuYW1lXCJdICsgXCIoXCIgKyB0aGlzLlRhbGVudHMuanNvbltpbmRleF1bXCJkZXNjcmlwdGlvblwiXSArIFwiKVwiXHJcbiAgICAgICAgICAgIC8vIGouZ2V0Q2hpbGRCeU5hbWUoXCJncmFkZVwiKS5jb2xvciA9IGdyYWRlc1t0aGlzLlRhbGVudHMuanNvbltpbmRleF1bXCJncmFkZVwiXV1cclxuICAgICAgICAgICAgLy8gai5nZXRDaGlsZEJ5TmFtZShcImdyYWRlXCIpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgU2F2ZVV0aWxzLmluc3QuU2F2ZURhdGEoKVxyXG4gICAgfVxyXG4gICAgLy8xNDQgMjM4IDE0NFxyXG4gICAgVGlwc09wZW4oaXNPcGVuOiBib29sZWFuLCBjb2xvcjogY2MuQ29sb3IsIGNvbnRlbnQ/OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLlRpcHMuY29sb3IgPSBjb2xvclxyXG4gICAgICAgIC8v5YiG6L6o546H6I635Y+WXHJcbiAgICAgICAgLy8gbGV0IGggPSBjYy53aW5TaXplLmhlaWdodDtcclxuICAgICAgICBpZiAoaXNPcGVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVGlwcy5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gY29udGVudFxyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLlRpcHMpLnRvKDAuMTIsIHsgcG9zaXRpb246IGNjLnYzKDAsIChjYy53aW5TaXplLmhlaWdodCAvIDIpKSB9KS50bygwLjA2LCB7IHBvc2l0aW9uOiBjYy52MygwLCAoY2Mud2luU2l6ZS5oZWlnaHQgLyAyKSAtIDUwKSB9KS50bygwLjA2LCB7IHBvc2l0aW9uOiBjYy52MygwLCAoY2Mud2luU2l6ZS5oZWlnaHQgLyAyKSkgfSkuc3RhcnQoKVxyXG4gICAgICAgICAgICB0aGlzLlRpcHMuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLlRpcHNUaW1lciA9IDBcclxuICAgICAgICAgICAgdGhpcy5UaXBzSXNPcGVuID0gdHJ1ZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuVGlwcy5zZXRQb3NpdGlvbigwLCAoY2Mud2luU2l6ZS5oZWlnaHQgKyB0aGlzLlRpcHMuZ2V0Q29udGVudFNpemUoKS5oZWlnaHQpIC8gMikvL3RpcHPlvZLkvY1cclxuICAgICAgICAgICAgdGhpcy5UaXBzLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuVGlwc1RpbWVyID0gMFxyXG4gICAgICAgICAgICB0aGlzLlRpcHNJc09wZW4gPSBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICAvL0dyb3VwXzNcclxuICAgIEFkZChldmVudCwgY3VzdG9tRXZlbnREYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuU3RhclVzZU51bSA+PSAxKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoY3VzdG9tRXZlbnREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiQ0hSXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKERFRkFVTFRfUFJPUFtcIkNIUlwiXSA8IHRoaXMuTWF4cHJvcGVydHlOdW0gfHwgdGhpcy5NYXhVc2VOdW0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERFRkFVTFRfUFJPUFtcIkNIUlwiXSArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNhblVzZSgtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF8zL0xheW91dC9DSFIvU3ByaXRlL0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gREVGQVVMVF9QUk9QW1wiQ0hSXCJdLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiSU5UXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKERFRkFVTFRfUFJPUFtcIklOVFwiXSA8IHRoaXMuTWF4cHJvcGVydHlOdW0gfHwgdGhpcy5NYXhVc2VOdW0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERFRkFVTFRfUFJPUFtcIklOVFwiXSArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNhblVzZSgtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF8zL0xheW91dC9JTlQvU3ByaXRlL0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gREVGQVVMVF9QUk9QW1wiSU5UXCJdLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiU1RSXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKERFRkFVTFRfUFJPUFtcIlNUUlwiXSA8IHRoaXMuTWF4cHJvcGVydHlOdW0gfHwgdGhpcy5NYXhVc2VOdW0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERFRkFVTFRfUFJPUFtcIlNUUlwiXSArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNhblVzZSgtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF8zL0xheW91dC9TVFIvU3ByaXRlL0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gREVGQVVMVF9QUk9QW1wiU1RSXCJdLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiTU5ZXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKERFRkFVTFRfUFJPUFtcIk1OWVwiXSA8IHRoaXMuTWF4cHJvcGVydHlOdW0gfHwgdGhpcy5NYXhVc2VOdW0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERFRkFVTFRfUFJPUFtcIk1OWVwiXSArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNhblVzZSgtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF8zL0xheW91dC9NTlkvU3ByaXRlL0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gREVGQVVMVF9QUk9QW1wiTU5ZXCJdLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5UaXBzT3Blbih0cnVlLCBjYy5jb2xvcigxMjgsIDIyMywgMjM5KSwgXCLmsqHmnInlj6/liIbphY3nmoTngrnmlbDkuoZcIilcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSZWR1Y2UoZXZlbnQsIGN1c3RvbUV2ZW50RGF0YSkge1xyXG4gICAgICAgIHN3aXRjaCAoY3VzdG9tRXZlbnREYXRhKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJDSFJcIjpcclxuICAgICAgICAgICAgICAgIGlmIChERUZBVUxUX1BST1BbXCJDSFJcIl0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgREVGQVVMVF9QUk9QW1wiQ0hSXCJdIC09IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DYW5Vc2UoMSlcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzMvTGF5b3V0L0NIUi9TcHJpdGUvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBERUZBVUxUX1BST1BbXCJDSFJcIl0udG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJJTlRcIjpcclxuICAgICAgICAgICAgICAgIGlmIChERUZBVUxUX1BST1BbXCJJTlRcIl0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgREVGQVVMVF9QUk9QW1wiSU5UXCJdIC09IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DYW5Vc2UoMSlcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzMvTGF5b3V0L0lOVC9TcHJpdGUvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBERUZBVUxUX1BST1BbXCJJTlRcIl0udG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJTVFJcIjpcclxuICAgICAgICAgICAgICAgIGlmIChERUZBVUxUX1BST1BbXCJTVFJcIl0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgREVGQVVMVF9QUk9QW1wiU1RSXCJdIC09IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DYW5Vc2UoMSlcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzMvTGF5b3V0L1NUUi9TcHJpdGUvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBERUZBVUxUX1BST1BbXCJTVFJcIl0udG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNTllcIjpcclxuICAgICAgICAgICAgICAgIGlmIChERUZBVUxUX1BST1BbXCJNTllcIl0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgREVGQVVMVF9QUk9QW1wiTU5ZXCJdIC09IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DYW5Vc2UoMSlcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzMvTGF5b3V0L01OWS9TcHJpdGUvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBERUZBVUxUX1BST1BbXCJNTllcIl0udG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBDYW5Vc2UodHJhbnM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBhID0gdGhpcy5TdGFyVXNlTnVtICsgdHJhbnNcclxuICAgICAgICB0aGlzLlN0YXJVc2VOdW0gPSBhXHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF8zL0xhYmVsXzJcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuWPr+eUqOWxnuaAp+eCuTpcIiArIHRoaXMuU3RhclVzZU51bVxyXG4gICAgfVxyXG4gICAgUmFuZG9tKCkge1xyXG4gICAgICAgIHRoaXMuU3RhclVzZU51bSA9IHRoaXMuTWF4VXNlTnVtXHJcbiAgICAgICAgREVGQVVMVF9QUk9QW1wiQ0hSXCJdID0gMDsgREVGQVVMVF9QUk9QW1wiSU5UXCJdID0gMDsgREVGQVVMVF9QUk9QW1wiU1RSXCJdID0gMDsgREVGQVVMVF9QUk9QW1wiTU5ZXCJdID0gMDtcclxuICAgICAgICBsZXQgYVxyXG4gICAgICAgIGZvciAoYSA9IDA7IGEgPCB0aGlzLk1heFVzZU51bTsgYSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBiID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiA0KVxyXG4gICAgICAgICAgICBzd2l0Y2ggKGIpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoREVGQVVMVF9QUk9QW1wiQ0hSXCJdIDwgdGhpcy5NYXhwcm9wZXJ0eU51bSB8fCB0aGlzLk1heFVzZU51bSA+IDQwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERFRkFVTFRfUFJPUFtcIkNIUlwiXSArPSAxOyBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzMvTGF5b3V0L0NIUi9TcHJpdGUvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBERUZBVUxUX1BST1BbXCJDSFJcIl0udG9TdHJpbmcoKTsgdGhpcy5DYW5Vc2UoLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgYSAtPSAxIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoREVGQVVMVF9QUk9QW1wiSU5UXCJdIDwgdGhpcy5NYXhwcm9wZXJ0eU51bSB8fCB0aGlzLk1heFVzZU51bSA+IDQwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERFRkFVTFRfUFJPUFtcIklOVFwiXSArPSAxOyBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzMvTGF5b3V0L0lOVC9TcHJpdGUvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBERUZBVUxUX1BST1BbXCJJTlRcIl0udG9TdHJpbmcoKTsgdGhpcy5DYW5Vc2UoLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgYSAtPSAxIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChERUZBVUxUX1BST1BbXCJTVFJcIl0gPCB0aGlzLk1heHByb3BlcnR5TnVtIHx8IHRoaXMuTWF4VXNlTnVtID4gNDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgREVGQVVMVF9QUk9QW1wiU1RSXCJdICs9IDE7IGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfMy9MYXlvdXQvU1RSL1Nwcml0ZS9MYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IERFRkFVTFRfUFJPUFtcIlNUUlwiXS50b1N0cmluZygpOyB0aGlzLkNhblVzZSgtMSlcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgeyBhIC09IDEgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKERFRkFVTFRfUFJPUFtcIk1OWVwiXSA8IHRoaXMuTWF4cHJvcGVydHlOdW0gfHwgdGhpcy5NYXhVc2VOdW0gPiA0MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBERUZBVUxUX1BST1BbXCJNTllcIl0gKz0gMTsgY2MuZmluZChcIkNhbnZhcy9Hcm91cF8zL0xheW91dC9NTlkvU3ByaXRlL0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gREVGQVVMVF9QUk9QW1wiTU5ZXCJdLnRvU3RyaW5nKCk7IHRoaXMuQ2FuVXNlKC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7IGEgLT0gMSB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+aWueWQkeW+gOS4i1xyXG4gICAgc2Nyb2xsRG93bkhhbmRsZXIoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuX2NvbnRlbnQuY2hpbGRyZW5Db3VudDsgaSA8IGxlbjsgaSsrKSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5pa55ZCR5b6A5LiKXHJcbiAgICBzY3JvbGxVcEhhbmRsZXIoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuX2NvbnRlbnQuY2hpbGRyZW5Db3VudDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5fY29udGVudC5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgbGV0IGZpbmFsWSA9IGl0ZW0ueSArIHRoaXMuX2NvbnRlbnQueTtcclxuICAgICAgICAgICAgaWYgKGZpbmFsWSA8ICh0aGlzLl9jb250ZW50LnBhcmVudC5oZWlnaHQgLyAyICsgaXRlbS5oZWlnaHQpICYmIGZpbmFsWSA+IC0odGhpcy5fY29udGVudC5wYXJlbnQuaGVpZ2h0IC8gMiArIGl0ZW0uaGVpZ2h0KSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5vcGFjaXR5ID0gMjU1XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLm9wYWNpdHkgPSAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgc3Rhcm5ld2xpZmUoKSB7XHJcbiAgICAgICAgLy/lpJbmjIJcclxuICAgICAgICBpZiAodGhpcy53Z25iIHx8IChERUZBVUxUX1BST1BbXCJDSFJcIl0gPT0gNyAmJiBERUZBVUxUX1BST1BbXCJJTlRcIl0gPT0gMyAmJiBERUZBVUxUX1BST1BbXCJTVFJcIl0gPT0gOSAmJiBERUZBVUxUX1BST1BbXCJNTllcIl0gPT0gMSkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNXVURJKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk5vd0FnZSA9IDk5XHJcbiAgICAgICAgICAgICAgICBERUZBVUxUX1BST1BbXCJUTFRcIl0ucHVzaCgxMDQ4KVxyXG4gICAgICAgICAgICAgICAgREVGQVVMVF9QUk9QW1wiVExUXCJdLnB1c2goMTA2NSlcclxuICAgICAgICAgICAgICAgIERFRkFVTFRfUFJPUFtcIlRMVFwiXS5wdXNoKDExMzUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuU3RhclVzZU51bSA9PSAwKSB7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfM1wiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzRcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLl9sYXN0UG9zWCA9IHRoaXMuZXZlbnRTY3JvbGxWaWV3LmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLnlcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L1Njcm9sbFZpZXcvdmlldy9MYXlvdXRcIikub24oXCJwb3NpdGlvbi1jaGFuZ2VkXCIsIHRoaXMuc2Nyb2xsVXBIYW5kbGVyLCB0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5Db250aW51ZSgpXHJcbiAgICAgICAgICAgIC8v5YWz6Zet5aSp6LWL6YCJ5oup6Z2i5p2/XHJcbiAgICAgICAgICAgIHRoaXMuaXNCb29sID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLlRpcHNPcGVuKHRydWUsIGNjLmNvbG9yKDEyOCwgMjIzLCAyMzkpLCBcIuS9oOi/mOaciVwiICsgdGhpcy5TdGFyVXNlTnVtICsgXCLlsZ7mgKfngrnmsqHmnInliIbphY1cIilcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lsZ7mgKflj5jljJZcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvTGF5b3V0L0NIUi9CYWNrZ3JvdW5kL0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gYDxjb2xvcj0ke3RoaXMuZ3JvdXBfNF9sYWx9PuminOWAvCA8L2M+PGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbDF9PmAgKyBERUZBVUxUX1BST1BbXCJDSFJcIl0gKyBcIjwvY29sb3I+XCJcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvTGF5b3V0L0lOVC9CYWNrZ3JvdW5kL0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gYDxjb2xvcj0ke3RoaXMuZ3JvdXBfNF9sYWx9PuaZuuWKmyA8L2M+PGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbDF9PmAgKyBERUZBVUxUX1BST1BbXCJJTlRcIl0gKyBcIjwvY29sb3I+XCJcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvTGF5b3V0L1NUUi9CYWNrZ3JvdW5kL0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gYDxjb2xvcj0ke3RoaXMuZ3JvdXBfNF9sYWx9PuS9k+i0qCA8L2M+PGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbDF9PmAgKyBERUZBVUxUX1BST1BbXCJTVFJcIl0gKyBcIjwvY29sb3I+XCJcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvTGF5b3V0L01OWS9CYWNrZ3JvdW5kL0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gYDxjb2xvcj0ke3RoaXMuZ3JvdXBfNF9sYWx9PuWutuWigyA8L2M+PGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbDF9PmAgKyBERUZBVUxUX1BST1BbXCJNTllcIl0gKyBcIjwvY29sb3I+XCJcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvTGF5b3V0L1NQUi9CYWNrZ3JvdW5kL0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gYDxjb2xvcj0ke3RoaXMuZ3JvdXBfNF9sYWx9PuW/q+S5kCA8L2M+PGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbDF9PmAgKyBERUZBVUxUX1BST1BbXCJTUFJcIl0gKyBcIjwvY29sb3I+XCJcclxuXHJcbiAgICAgICAgLy/miJDlsLHmo4Dmn6VcclxuICAgICAgICB0aGlzLmNoZWNrX2NqKFwiU1RBUlRcIilcclxuICAgIH1cclxuICAgIC8v5oiQ5bCx5qOA5p+lXHJcbiAgICBjaGVja19jaihpbmRleDogc3RyaW5nKSB7XHJcbiAgICAgICAgLy/miJDlsLHmo4Dmn6VcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE9iamVjdC5rZXlzKHRoaXMuQWNoaWV2ZW1lbnQuanNvbikubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCFERUZBVUxUX0NKLkFDSi5pbmNsdWRlcygxMDEgKyBpKSAmJiB0aGlzLkFjaGlldmVtZW50Lmpzb25bMTAxICsgaV1bXCJvcHBvcnR1bml0eVwiXSA9PSBpbmRleCAmJiBjaGVjayh0aGlzLkFjaGlldmVtZW50Lmpzb25bMTAxICsgaV1bXCJjb25kaXRpb25cIl0pICYmICh0aGlzLkFjaGlldmVtZW50Lmpzb25bMTAxICsgaV1bXCJldnRsaW1pdFwiXSA9PSAtMSB8fCB0aGlzLkFjaGlldmVtZW50Lmpzb25bMTAxICsgaV1bXCJldnRsaW1pdFwiXSA9PSB0aGlzLkluZGV4T2ZFdmVudCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVGlwc09wZW4odHJ1ZSwgY2MuY29sb3IoMTQ0LCAyMzgsIDE0NCksIFwi6Kej6ZSB5oiQ5bCx44CQXCIgKyB0aGlzLkFjaGlldmVtZW50Lmpzb25bMTAxICsgaV1bXCJuYW1lXCJdICsgXCLjgJFcIilcclxuICAgICAgICAgICAgICAgIC8v5a6M5oiQ55qE5oiQ5bCx5re75Yqg5pys5ZywXHJcbiAgICAgICAgICAgICAgICBERUZBVUxUX0NKLkFDSi5wdXNoKDEwMSArIGkpXHJcbiAgICAgICAgICAgICAgICAvL+iHquS8oOino+mUgeajgOafpVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBPYmplY3Qua2V5cyh0aGlzLmJyYW5jaGxpbmUuanNvbikubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5icmFuY2hsaW5lLmpzb25baiArIDFdW1wiYWNoaWV2ZW1lbnRJRFwiXSA9PSAoMTAxICsgaSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/op6PplIFcclxuICAgICAgICAgICAgICAgICAgICAgICAgU2F2ZURhdGEuTXl6elt0aGlzLmJyYW5jaGxpbmUuanNvbltqICsgMV1bXCJpZFwiXSAtIDFdID0gMVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBTYXZlVXRpbHMuaW5zdC5TYXZlRGF0YSgpXHJcbiAgICB9XHJcbiAgICAvL0dyb3VwXzRcclxuICAgIENvbnRpbnVlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRGVhdGgpIHJldHVyblxyXG4gICAgICAgIGxldCBiYWJhID0gY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L1Njcm9sbFZpZXcvdmlldy9MYXlvdXRcIilcclxuICAgICAgICBsZXQgZW50cnkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLkVudHJ5KVxyXG4gICAgICAgIGVudHJ5Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5Db250aW51ZSwgdGhpcylcclxuICAgICAgICBsZXQgbm9kZSA9IGVudHJ5LmdldENvbXBvbmVudChFbnRyeSk7XHJcbiAgICAgICAgZW50cnkuZ2V0Q2hpbGRCeU5hbWUoJ1Nwcml0ZScpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gbm9kZS5zcFtVc2VyTW9kZWwuaW5zdGFuY2UudXNlSWRdXHJcblxyXG4gICAgICAgIGlmIChVc2VyTW9kZWwuaW5zdGFuY2UudXNpbmcgPT0gJ3NraW4wJykge1xyXG4gICAgICAgICAgICBlbnRyeS5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsQWdlXCIpLmNvbG9yID0gY2MuY29sb3IoMCwgMCwgMClcclxuICAgICAgICAgICAgZW50cnkuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbEFnZVwiKS5jaGlsZHJlblswXS5jb2xvciA9IGNjLmNvbG9yKDAsIDAsIDApXHJcbiAgICAgICAgfSBlbHNlIGlmIChVc2VyTW9kZWwuaW5zdGFuY2UudXNpbmcgPT0gJ3NraW4xJykge1xyXG4gICAgICAgICAgICBlbnRyeS5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsQWdlXCIpLmNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSlcclxuICAgICAgICAgICAgZW50cnkuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbEFnZVwiKS5jaGlsZHJlblswXS5jb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUpXHJcbiAgICAgICAgfSBlbHNlIGlmIChVc2VyTW9kZWwuaW5zdGFuY2UudXNpbmcgPT0gJ3NraW4yJykge1xyXG4gICAgICAgICAgICBlbnRyeS5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsQWdlXCIpLmNvbG9yID0gY2MuY29sb3IoMCwgMCwgMClcclxuICAgICAgICAgICAgZW50cnkuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbEFnZVwiKS5jaGlsZHJlblswXS5jb2xvciA9IGNjLmNvbG9yKDAsIDAsIDApXHJcbiAgICAgICAgfSBlbHNlIGlmIChVc2VyTW9kZWwuaW5zdGFuY2UudXNpbmcgPT0gJ3NraW4zJykge1xyXG4gICAgICAgICAgICBlbnRyeS5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsQWdlXCIpLmNvbG9yID0gY2MuY29sb3IoNDEsIDQwLCA2MSlcclxuICAgICAgICAgICAgZW50cnkuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbEFnZVwiKS5jaGlsZHJlblswXS5jb2xvciA9IGNjLmNvbG9yKDQxLCA0MCwgNjEpXHJcbiAgICAgICAgfSBlbHNlIGlmIChVc2VyTW9kZWwuaW5zdGFuY2UudXNpbmcgPT0gJ3NraW40Jykge1xyXG4gICAgICAgICAgICBlbnRyeS5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsQWdlXCIpLmNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSlcclxuICAgICAgICAgICAgZW50cnkuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbEFnZVwiKS5jaGlsZHJlblswXS5jb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+ajgOafpeWkqei1i1xyXG4gICAgICAgIGxldCB0ZmNvbjogc3RyaW5nID0gXCJcIlxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5Db25UYWxlbnQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuQ29uVGFsZW50W2ldICE9IDAgJiYgY2hlY2sodGhpcy5UYWxlbnRzLmpzb25bdGhpcy5Db25UYWxlbnRbaV1dW1wiY29uZGl0aW9uXCJdLCBcImluY2x1ZGVcIikpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgc3RyOiBzdHJpbmcgPSBcIjxjb2xvcj0jZmZmMWFhPlwiKyB0aGlzLmF0dHJpYnV0ZVRyYW5zKHRoaXMuVGFsZW50cy5qc29uW3RoaXMuQ29uVGFsZW50W2ldXSwgdGhpcy5Db25UYWxlbnRbaV0pK1wiPC9jPlwiXHJcbiAgICAgICAgICAgICAgICBsZXQgc3RyOiBzdHJpbmcgPSB0aGlzLmF0dHJpYnV0ZVRyYW5zKHRoaXMuVGFsZW50cy5qc29uW3RoaXMuQ29uVGFsZW50W2ldXSwgZW50cnksIHRoaXMuQ29uVGFsZW50W2ldKVxyXG4gICAgICAgICAgICAgICAgaWYgKHN0ciAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGZjb24gPSBzdHIgKyBcIlxcblwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRmY29uICs9IFwi5aSp6LWL44CQXCIgKyB0aGlzLlRhbGVudHMuanNvblt0aGlzLkNvblRhbGVudFtpXV1bXCJuYW1lXCJdICsgXCLjgJHlj5HliqjmiJDlip/vvIFcIiArIHRoaXMuVGFsZW50cy5qc29uW3RoaXMuQ29uVGFsZW50W2ldXVtcImRlc2NyaXB0aW9uXCJdICsgXCIhXFxuXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuQ29uVGFsZW50LmluZGV4T2YodGhpcy5Db25UYWxlbnRbaV0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuQ29uVGFsZW50LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db25UYWxlbnRbaW5kZXhdID0gMFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WGheWuue+8mlxyXG5cclxuICAgICAgICAvL+aJgOacieW9k+WJjeW5tOm+hOWMheWQq+eahOS6i+S7tuaLv+WHuuadpVxyXG4gICAgICAgIGxldCBBbGxFdmVudHMgPSBbXVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5BZ2VKc29uLmpzb25bdGhpcy5Ob3dBZ2VdW1wiZXZlbnRcIl0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgQWxsRXZlbnRzLnB1c2godGhpcy5BZ2VKc29uLmpzb25bdGhpcy5Ob3dBZ2VdW1wiZXZlbnRcIl1baV0udG9TdHJpbmcoKS5zcGxpdChcIipcIikpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgQ2FuRXZlbnRzID0gW10vL+S7jkV2ZW50c+mAieaLqeiDveWPkeeUn+eahOS6i+aDhVxyXG4gICAgICAgIGxldCBDYW5FdmVudHN3ZWlnaHQgPSBbXS8v5omA5pyJ6IO95Y+R55Sf55qE5LqL5oOF55qE5p2D6YeNXHJcbiAgICAgICAgLy9jYy5sb2coQWxsRXZlbnRzKVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEFsbEV2ZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIWNoZWNrKHRoaXMuRXZlbnRzSnNvbi5qc29uW0FsbEV2ZW50c1tpXVswXV1bXCJleGNsdWRlXCJdLCBcImV4Y2x1ZGVcIikgJiYgY2hlY2sodGhpcy5FdmVudHNKc29uLmpzb25bQWxsRXZlbnRzW2ldWzBdXVtcImluY2x1ZGVcIl0sIFwiaW5jbHVkZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgLy8hZXhjbHVkZeacieafkOS6i+S7tuaXtuS4gOWumumaj+acuuS4jeWIsOS4unRydWUmJuacieafkOS6i+S7tuaXtuaJjeiDveiiq+maj+acuuWIsOS4unRydWVcclxuICAgICAgICAgICAgICAgIENhbkV2ZW50cy5wdXNoKEFsbEV2ZW50c1tpXVswXSlcclxuICAgICAgICAgICAgICAgIGlmIChBbGxFdmVudHNbaV0ubGVuZ3RoID4gMSkgeyBDYW5FdmVudHN3ZWlnaHQucHVzaChBbGxFdmVudHNbaV1bMV0pIH0gZWxzZSB7IENhbkV2ZW50c3dlaWdodC5wdXNoKFwiMVwiKSB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jYy5sb2coQ2FuRXZlbnRzKVxyXG4gICAgICAgIC8vY2MubG9nKENhbkV2ZW50c3dlaWdodClcclxuICAgICAgICBsZXQgTWF4d2VpZ2h0ID0gMC8v5pyA5aSn5p2D6YeNXHJcbiAgICAgICAgbGV0IENhbkV2ZW50c3dlaWdodDIgPSBbXS8v5omA5pyJ6IO95Y+R55Sf55qE5LqL5oOF55qE5p2D6YeNMlxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgQ2FuRXZlbnRzd2VpZ2h0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIE1heHdlaWdodCArPSBOdW1iZXIoQ2FuRXZlbnRzd2VpZ2h0W2ldKVxyXG4gICAgICAgICAgICBDYW5FdmVudHN3ZWlnaHQyLnB1c2goTWF4d2VpZ2h0KVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NjLmxvZyhDYW5FdmVudHN3ZWlnaHQyKVxyXG4gICAgICAgIGxldCB0YXJnZXRXZWlnaHQgPSBNYXRoLnJhbmRvbSgpICogTWF4d2VpZ2h0XHJcbiAgICAgICAgLy9jYy5sb2codGFyZ2V0V2VpZ2h0KVxyXG4gICAgICAgIC8v5pyA57uI6YCa5YWz6LCB5aSn5LqOdGFyZ2V0V2VpZ2h056Gu5a6a5LqL5Lu2XHJcbiAgICAgICAgbGV0IGluZGV4XHJcbiAgICAgICAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgQ2FuRXZlbnRzd2VpZ2h0Mi5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKENhbkV2ZW50c3dlaWdodDJbaW5kZXhdID4gdGFyZ2V0V2VpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY2MubG9nKGluZGV4KVxyXG4gICAgICAgIC8vY2MubG9nKENhbkV2ZW50c1tpbmRleF0pXHJcbiAgICAgICAgLy/liqDlhaXkuovku7bmsaBcclxuICAgICAgICBERUZBVUxUX1BST1BbXCJFVlRcIl0ucHVzaChOdW1iZXIoQ2FuRXZlbnRzW2luZGV4XSkpXHJcbiAgICAgICAgaWYgKCFERUZBVUxUX0NKW1wiQUVWVFwiXS5pbmNsdWRlcyhOdW1iZXIoQ2FuRXZlbnRzW2luZGV4XSkpKSB7IERFRkFVTFRfQ0pbXCJBRVZUXCJdLnB1c2goTnVtYmVyKENhbkV2ZW50c1tpbmRleF0pKSB9XHJcbiAgICAgICAgLy9jYy5sb2coREVGQVVMVF9QUk9QW1wiRVZUXCJdKVxyXG5cclxuICAgICAgICBsZXQgZSA9IHRoaXMuRXZlbnRzSnNvbi5qc29uW051bWJlcihDYW5FdmVudHNbaW5kZXhdKV1cclxuICAgICAgICBpZiAoZSA9PSB1bmRlZmluZWQpIHsgZSA9IHRoaXMuRXZlbnRzSnNvbi5qc29uW1wiMTAwMDBcIl0gfVxyXG4gICAgICAgIC8v6L+95Yqg5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5jb250ID0gZVtcImV2ZW50XCJdXHJcbiAgICAgICAgdGhpcy5jb250Wmh1amlhID0gXCJcIlxyXG5cclxuICAgICAgICBpZiAodGhpcy5Ob3dBZ2UgPT0gNTAwKSBjb25zb2xlLmxvZygn5pWw5o2uMTExJywgZSlcclxuXHJcbiAgICAgICAgaWYgKGVbXCJicmFuY2hcIl0pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuTm93QWdlID09IDUwMCkge1xyXG4gICAgICAgICAgICAgICAgZW50cnkuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IFwiPGNvbG9yPVwiICsgdGhpcy50ZXhfNF9sYWwgKyBcIj5cIiArIHRoaXMuY29udCArIFwiPC9jPlwiXHJcbiAgICAgICAgICAgICAgICB0aGlzLkJyYWNoKGUsIHRoaXMuY29udFpodWppYSwgZW50cnkpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXNIYXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZVtcImJyYW5jaFwiXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGVjayhlW1wiYnJhbmNoXCJdW2ldLnNwbGl0KFwiOlwiKVswXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/liqDlhaXkuovku7bmsaBcclxuICAgICAgICAgICAgICAgICAgICAgICAgREVGQVVMVF9QUk9QW1wiRVZUXCJdLnB1c2goTnVtYmVyKGVbXCJicmFuY2hcIl1baV0uc3BsaXQoXCI6XCIpWzFdKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGR4ID0gdGhpcy5FdmVudHNKc29uLmpzb25bTnVtYmVyKGVbXCJicmFuY2hcIl1baV0uc3BsaXQoXCI6XCIpWzFdKV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/lsZ7mgKflj5jljJZcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRyaWJ1dGVUcmFucyhkeCwgZW50cnkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6L+95Yqg5o+P6L+wXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udFpodWppYSArPSBcIlxcblwiICsgZHhbXCJldmVudFwiXS8v5YaF5a65XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzSGF2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGR4W1wicG9zdEV2ZW50XCJdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRaaHVqaWEgKz0gXCJcXG5cIiArIGR4W1wicG9zdEV2ZW50XCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkeFtcImVmZmVjdFwiXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGR4W1wiZWZmZWN0XCJdW1wiQ0hSXCJdKSB7IGxldCBudW06IHN0cmluZyA9IGR4W1wiZWZmZWN0XCJdW1wiQ0hSXCJdID4gMCA/IFwiK1wiICsgZHhbXCJlZmZlY3RcIl1bXCJDSFJcIl0gOiBkeFtcImVmZmVjdFwiXVtcIkNIUlwiXTsgdGhpcy5jb250Wmh1amlhICs9IFwiXFxuPGNvbG9yPVwiICsgdGhpcy50ZXhfNF9sYWwxICsgXCI+6aKc5YC8XCIgKyBudW0gKyBcIjwvY29sb3I+XCIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGR4W1wiZWZmZWN0XCJdW1wiSU5UXCJdKSB7IGxldCBudW06IHN0cmluZyA9IGR4W1wiZWZmZWN0XCJdW1wiSU5UXCJdID4gMCA/IFwiK1wiICsgZHhbXCJlZmZlY3RcIl1bXCJJTlRcIl0gOiBkeFtcImVmZmVjdFwiXVtcIklOVFwiXTsgdGhpcy5jb250Wmh1amlhICs9IFwiXFxuPGNvbG9yPVwiICsgdGhpcy50ZXhfNF9sYWwxICsgXCI+5pm65YqbXCIgKyBudW0gKyBcIjwvY29sb3I+XCIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGR4W1wiZWZmZWN0XCJdW1wiU1RSXCJdKSB7IGxldCBudW06IHN0cmluZyA9IGR4W1wiZWZmZWN0XCJdW1wiU1RSXCJdID4gMCA/IFwiK1wiICsgZHhbXCJlZmZlY3RcIl1bXCJTVFJcIl0gOiBkeFtcImVmZmVjdFwiXVtcIlNUUlwiXTsgdGhpcy5jb250Wmh1amlhICs9IFwiXFxuPGNvbG9yPVwiICsgdGhpcy50ZXhfNF9sYWwxICsgXCI+5L2T6LSoXCIgKyBudW0gKyBcIjwvY29sb3I+XCIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGR4W1wiZWZmZWN0XCJdW1wiTU5ZXCJdKSB7IGxldCBudW06IHN0cmluZyA9IGR4W1wiZWZmZWN0XCJdW1wiTU5ZXCJdID4gMCA/IFwiK1wiICsgZHhbXCJlZmZlY3RcIl1bXCJNTllcIl0gOiBkeFtcImVmZmVjdFwiXVtcIk1OWVwiXTsgdGhpcy5jb250Wmh1amlhICs9IFwiXFxuPGNvbG9yPVwiICsgdGhpcy50ZXhfNF9sYWwxICsgXCI+5a625aKDXCIgKyBudW0gKyBcIjwvY29sb3I+XCIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGR4W1wiZWZmZWN0XCJdW1wiU1BSXCJdKSB7IGxldCBudW06IHN0cmluZyA9IGR4W1wiZWZmZWN0XCJdW1wiU1BSXCJdID4gMCA/IFwiK1wiICsgZHhbXCJlZmZlY3RcIl1bXCJTUFJcIl0gOiBkeFtcImVmZmVjdFwiXVtcIlNQUlwiXTsgdGhpcy5jb250Wmh1amlhICs9IFwiXFxuPGNvbG9yPVwiICsgdGhpcy50ZXhfNF9sYWwxICsgXCI+5b+r5LmQXCIgKyBudW0gKyBcIjwvY29sb3I+XCIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL+i/veWKoOaPj+i/sFxyXG4gICAgICAgICAgICAgICAgaWYgKCFpc0hhdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZVtcInBvc3RFdmVudFwiXSkgeyB0aGlzLmNvbnRaaHVqaWEgPSBcIlxcblwiICsgZVtcInBvc3RFdmVudFwiXSB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL+i/veWKoOaPj+i/sFxyXG4gICAgICAgICAgICBpZiAoZVtcInBvc3RFdmVudFwiXSkgeyB0aGlzLmNvbnRaaHVqaWEgPSBcIlxcblwiICsgZVtcInBvc3RFdmVudFwiXSB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vbGV0IHN0cjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuTm93QWdlICE9IDUwMCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udFpodWppYSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBlbnRyeS5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID1cclxuICAgICAgICAgICAgICAgICAgICBcIjxjb2xvcj1cIiArIHRoaXMudGV4XzRfbGFsMSArIFwiPlwiICsgdGZjb24gKyBcIjwvYz5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgXCI8Y29sb3I9XCIgKyB0aGlzLnRleF80X2xhbCArIFwiPlwiICsgdGhpcy5jb250ICsgXCI8L2M+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiPGNvbG9yPVwiICsgdGhpcy50ZXhfNF9sYWwxICsgXCI+XCIgKyB0aGlzLmNvbnRaaHVqaWEgKyBcIjwvYz5cIlxyXG5cclxuICAgICAgICAgICAgICAgIC8vc3RyID0gdGhpcy5jb250ICsgJ1xcbicgKyB0aGlzLmNvbnRaaHVqaWFcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGVudHJ5LmdldENoaWxkQnlOYW1lKFwiTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPVxyXG4gICAgICAgICAgICAgICAgICAgIFwiPGNvbG9yPVwiICsgdGhpcy50ZXhfNF9sYWwxICsgXCI+XCIgKyB0ZmNvbiArIFwiPC9jPlwiICtcclxuICAgICAgICAgICAgICAgICAgICBcIjxjb2xvcj1cIiArIHRoaXMudGV4XzRfbGFsICsgXCI+XCIgKyB0aGlzLmNvbnQgKyBcIjwvYz5cIlxyXG5cclxuICAgICAgICAgICAgICAgIC8vc3RyID0gdGhpcy5jb250XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuTm93QWdlID09IDUwMCkgY29uc29sZS5sb2coJzUwMOWygeW5tOm+hCcsIHRoaXMuTm93QWdlKVxyXG4gICAgICAgIGVudHJ5LmdldENoaWxkQnlOYW1lKFwiTGFiZWxBZ2VcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLk5vd0FnZS50b1N0cmluZygpXHJcblxyXG5cclxuICAgICAgICAvL+WxnuaAp+WPmOWMllxyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVHJhbnMoZSwgZW50cnkpXHJcblxyXG4gICAgICAgIC8v5Yik5pat5q275LqhXHJcbiAgICAgICAgaWYgKERFRkFVTFRfUFJPUFtcIkxJRlwiXSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNEZWF0aCA9IHRydWU7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9TdGFydFwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9BdXRvXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9BdXRvMlwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZW50cnkucGFyZW50ID0gY2MuZmluZChcIkNhbnZhc1wiKVxyXG4gICAgICAgIGxldCBkdWggPSBlbnRyeS5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsXCIpLmdldENvbnRlbnRTaXplKCkuaGVpZ2h0IC0gNTAuNFxyXG4gICAgICAgIC8vZW50cnkucGFyZW50ID0gYmFiYVxyXG4gICAgICAgIGxldCBicyA9IE1hdGguZmxvb3IoZHVoIC8gMzkpLy/lpJrooYzlgI3njodcclxuXHJcbiAgICAgICAgLy8gaWYodGhpcy5Ob3dBZ2U9PTUwMCl7YnMrPTE5fVxyXG4gICAgICAgIGVudHJ5LnNldENvbnRlbnRTaXplKGNjLnNpemUoNzgwLCA2NSArIDQwICogYnMpKVxyXG4gICAgICAgIGVudHJ5LmdldENoaWxkQnlOYW1lKFwiTGFiZWxBZ2VcIikueSArPSAyMCAqIGJzXHJcbiAgICAgICAgZW50cnkuZ2V0Q2hpbGRCeU5hbWUoXCJTcHJpdGVcIikuc2V0Q29udGVudFNpemUoY2Muc2l6ZSg3ODAsIDUyICsgNDAgKiBicykpXHJcbiAgICAgICAgZW50cnkuZ2V0Q2hpbGRCeU5hbWUoXCJCR1wiKS5zZXRDb250ZW50U2l6ZShjYy5zaXplKDYwMCwgODAgKyA0MCAqIGJzKSlcclxuICAgICAgICAvL+aOkueJiFxyXG4gICAgICAgIGxldCBwYiA9IGVudHJ5LmdldENvbnRlbnRTaXplKCkuaGVpZ2h0XHJcbiAgICAgICAgLy9jYy5sb2coZW50cnkuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbFwiKS5nZXRDb250ZW50U2l6ZSgpLmhlaWdodClcclxuICAgICAgICBlbnRyeS5wYXJlbnQgPSBiYWJhXHJcbiAgICAgICAgLy8gaWYgKHRoaXMuTm93QWdlID09IDUwMCkgY29uc29sZS5sb2coJzUwMOWygeW5tOm+hCcsIGVudHJ5LmdldENoaWxkQnlOYW1lKFwiTGFiZWxBZ2VcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcsIGVudHJ5LmdldENoaWxkQnlOYW1lKFwiTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcpXHJcblxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9TY3JvbGxWaWV3XCIpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5zY3JvbGxUb0JvdHRvbSgwLjEpXHJcblxyXG4gICAgICAgIC8v5bm06b6E5Yqg5LiAXHJcblxyXG4gICAgICAgIGlmICh0aGlzLnJlYnVpbGQpIHtcclxuICAgICAgICAgICAgdGhpcy5Ob3dBZ2UgKz0gdGhpcy5yZWJ1aWxkQWdlO1xyXG4gICAgICAgICAgICB0aGlzLnJlYnVpbGQgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLk5vd0FnZSArPSAxXHJcbiAgICAgICAgfVxyXG4gICAgICAgIERFRkFVTFRfUFJPUC5BR0UgPSB0aGlzLk5vd0FnZVxyXG4gICAgICAgIC8v5oiQ5bCx5qOA5p+lXHJcbiAgICAgICAgdGhpcy5jaGVja19jaihcIlRSQUpFQ1RPUllcIilcclxuICAgIH1cclxuXHJcbiAgICBCcmFjaChlOiBhbnksIGNvbnRaaHVqaWE6IGFueSwgZW50cnk6IGFueSkge1xyXG4gICAgICAgIGxldCBpc0hhdmUgPSBmYWxzZVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZVtcImJyYW5jaFwiXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBjYy5sb2coaSlcclxuICAgICAgICAgICAgaWYgKGNoZWNrKGVbXCJicmFuY2hcIl1baV0uc3BsaXQoXCI6XCIpWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gY2MubG9nKE51bWJlcihlW1wiYnJhbmNoXCJdW2ldLnNwbGl0KFwiOlwiKVsxXSkpXHJcbiAgICAgICAgICAgICAgICBsZXQgZHggPSB0aGlzLkV2ZW50c0pzb24uanNvbltOdW1iZXIoZVtcImJyYW5jaFwiXVtpXS5zcGxpdChcIjpcIilbMV0pXVxyXG4gICAgICAgICAgICAgICAgLy/ov73liqDmj4/ov7BcclxuICAgICAgICAgICAgICAgIGNvbnRaaHVqaWEgPSAnXFxuJyArIGR4W1wiZXZlbnRcIl0vL+WGheWuuVxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ+WGheWuuScsIGNvbnRaaHVqaWEpXHJcbiAgICAgICAgICAgICAgICBpc0hhdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBlbnRyeS5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nICs9IFwiPGNvbG9yPVwiICsgdGhpcy50ZXhfNF9sYWwgKyBcIj5cIiArIGNvbnRaaHVqaWEgKyBcIjwvYz5cIlxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkeFtcInBvc3RFdmVudFwiXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVudHJ5LmdldENoaWxkQnlOYW1lKFwiTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgKz0gXCI8Y29sb3I9XCIgKyB0aGlzLnRleF80X2xhbDEgKyBcIj5cIiArICdcXG4nICsgZHhbXCJwb3N0RXZlbnRcIl0gKyBcIjwvYz5cIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy/lsZ7mgKflj5jljJZcclxuICAgICAgICAgICAgICAgIHRoaXMuYXR0cmlidXRlVHJhbnMoZHgsIGVudHJ5KVxyXG4gICAgICAgICAgICAgICAgaWYgKGR4W1wiYnJhbmNoXCJdKSB7IHRoaXMuQnJhY2goZHgsIGNvbnRaaHVqaWEsIGVudHJ5KSB9XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6L+95Yqg5o+P6L+wXHJcbiAgICAgICAgaWYgKGlzSGF2ZSkge1xyXG4gICAgICAgICAgICBpZiAoZVtcInBvc3RFdmVudFwiXSkgeyBjb250Wmh1amlhICs9IGVbXCJwb3N0RXZlbnRcIl0gfVxyXG4gICAgICAgICAgICByZXR1cm4gY29udFpodWppYVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFNUUmFkZChldmVudCwgY3VzdG9tRXZlbnREYXRhKSB7XHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIERFRkFVTFRfUFJPUFtcIlNUUlwiXSArPSBOdW1iZXIoY3VzdG9tRXZlbnREYXRhKTtcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvTGF5b3V0L1NUUi9CYWNrZ3JvdW5kL0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gYDxjb2xvcj0ke3RoaXMuZ3JvdXBfNF9sYWx9PuS9k+i0qCA8L2M+PGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbDF9PmAgKyBERUZBVUxUX1BST1BbXCJTVFJcIl0gKyBcIjwvY29sb3I+XCI7IERFRkFVTFRfQ0pbXCJIU1RSXCJdID0gREVGQVVMVF9QUk9QW1wiU1RSXCJdID4gREVGQVVMVF9DSltcIkhTVFJcIl0gPyBERUZBVUxUX1BST1BbXCJTVFJcIl0gOiBERUZBVUxUX0NKW1wiSFNUUlwiXTsgREVGQVVMVF9DSltcIkxTVFJcIl0gPSBERUZBVUxUX1BST1BbXCJTVFJcIl0gPCBERUZBVUxUX0NKW1wiTFNUUlwiXSA/IERFRkFVTFRfUFJPUFtcIlNUUlwiXSA6IERFRkFVTFRfQ0pbXCJMU1RSXCJdO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuICAgIC8v5bGe5oCn5Y+Y5YyWXHJcbiAgICBhdHRyaWJ1dGVUcmFucyhlOiBhbnksIGVudHJ5OiBjYy5Ob2RlLCBpbmRleD86IG51bWJlcikge1xyXG4gICAgICAgIC8vREVGQVVMVF9QUk9QW1wiU1RSXCJdICs9MTAwXHJcbiAgICAgICAgaWYgKGVbXCJlZmZlY3RcIl0pIHtcclxuICAgICAgICAgICAgaWYgKGVbXCJlZmZlY3RcIl1bXCJDSFJcIl0pIHsgREVGQVVMVF9QUk9QW1wiQ0hSXCJdICs9IGVbXCJlZmZlY3RcIl1bXCJDSFJcIl07IGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9MYXlvdXQvQ0hSL0JhY2tncm91bmQvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBgPGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbH0+6aKc5YC8IDwvYz48Y29sb3I9JHt0aGlzLmdyb3VwXzRfbGFsMX0+YCArIERFRkFVTFRfUFJPUFtcIkNIUlwiXSArIFwiPC9jb2xvcj5cIjsgREVGQVVMVF9DSltcIkhDSFJcIl0gPSBERUZBVUxUX1BST1BbXCJDSFJcIl0gPiBERUZBVUxUX0NKW1wiSENIUlwiXSA/IERFRkFVTFRfUFJPUFtcIkNIUlwiXSA6IERFRkFVTFRfQ0pbXCJIQ0hSXCJdOyBERUZBVUxUX0NKW1wiTENIUlwiXSA9IERFRkFVTFRfUFJPUFtcIkNIUlwiXSA8IERFRkFVTFRfQ0pbXCJMQ0hSXCJdID8gREVGQVVMVF9QUk9QW1wiQ0hSXCJdIDogREVGQVVMVF9DSltcIkxDSFJcIl07IGxldCBudW06IHN0cmluZyA9IGVbXCJlZmZlY3RcIl1bXCJDSFJcIl0gPiAwID8gXCIrXCIgKyBlW1wiZWZmZWN0XCJdW1wiQ0hSXCJdIDogZVtcImVmZmVjdFwiXVtcIkNIUlwiXTsgZW50cnkuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyArPSBcIlxcbjxjb2xvcj1cIiArIHRoaXMudGV4XzRfbGFsMSArIFwiPuminOWAvFwiICsgbnVtICsgXCI8L2NvbG9yPlwiIH1cclxuICAgICAgICAgICAgaWYgKGVbXCJlZmZlY3RcIl1bXCJJTlRcIl0pIHsgREVGQVVMVF9QUk9QW1wiSU5UXCJdICs9IGVbXCJlZmZlY3RcIl1bXCJJTlRcIl07IGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9MYXlvdXQvSU5UL0JhY2tncm91bmQvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBgPGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbH0+5pm65YqbIDwvYz48Y29sb3I9JHt0aGlzLmdyb3VwXzRfbGFsMX0+YCArIERFRkFVTFRfUFJPUFtcIklOVFwiXSArIFwiPC9jb2xvcj5cIjsgREVGQVVMVF9DSltcIkhJTlRcIl0gPSBERUZBVUxUX1BST1BbXCJJTlRcIl0gPiBERUZBVUxUX0NKW1wiSElOVFwiXSA/IERFRkFVTFRfUFJPUFtcIklOVFwiXSA6IERFRkFVTFRfQ0pbXCJISU5UXCJdOyBERUZBVUxUX0NKW1wiTElOVFwiXSA9IERFRkFVTFRfUFJPUFtcIklOVFwiXSA8IERFRkFVTFRfQ0pbXCJMSU5UXCJdID8gREVGQVVMVF9QUk9QW1wiSU5UXCJdIDogREVGQVVMVF9DSltcIkxJTlRcIl07IGxldCBudW06IHN0cmluZyA9IGVbXCJlZmZlY3RcIl1bXCJJTlRcIl0gPiAwID8gXCIrXCIgKyBlW1wiZWZmZWN0XCJdW1wiSU5UXCJdIDogZVtcImVmZmVjdFwiXVtcIklOVFwiXTsgZW50cnkuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyArPSBcIlxcbjxjb2xvcj1cIiArIHRoaXMudGV4XzRfbGFsMSArIFwiPuaZuuWKm1wiICsgbnVtICsgXCI8L2NvbG9yPlwiIH1cclxuICAgICAgICAgICAgaWYgKGVbXCJlZmZlY3RcIl1bXCJTVFJcIl0pIHsgREVGQVVMVF9QUk9QW1wiU1RSXCJdICs9IGVbXCJlZmZlY3RcIl1bXCJTVFJcIl07IGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9MYXlvdXQvU1RSL0JhY2tncm91bmQvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBgPGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbH0+5L2T6LSoIDwvYz48Y29sb3I9JHt0aGlzLmdyb3VwXzRfbGFsMX0+YCArIERFRkFVTFRfUFJPUFtcIlNUUlwiXSArIFwiPC9jb2xvcj5cIjsgREVGQVVMVF9DSltcIkhTVFJcIl0gPSBERUZBVUxUX1BST1BbXCJTVFJcIl0gPiBERUZBVUxUX0NKW1wiSFNUUlwiXSA/IERFRkFVTFRfUFJPUFtcIlNUUlwiXSA6IERFRkFVTFRfQ0pbXCJIU1RSXCJdOyBERUZBVUxUX0NKW1wiTFNUUlwiXSA9IERFRkFVTFRfUFJPUFtcIlNUUlwiXSA8IERFRkFVTFRfQ0pbXCJMU1RSXCJdID8gREVGQVVMVF9QUk9QW1wiU1RSXCJdIDogREVGQVVMVF9DSltcIkxTVFJcIl07IGxldCBudW06IHN0cmluZyA9IGVbXCJlZmZlY3RcIl1bXCJTVFJcIl0gPiAwID8gXCIrXCIgKyBlW1wiZWZmZWN0XCJdW1wiU1RSXCJdIDogZVtcImVmZmVjdFwiXVtcIlNUUlwiXTsgZW50cnkuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyArPSBcIlxcbjxjb2xvcj1cIiArIHRoaXMudGV4XzRfbGFsMSArIFwiPuS9k+i0qFwiICsgbnVtICsgXCI8L2NvbG9yPlwiIH1cclxuICAgICAgICAgICAgaWYgKGVbXCJlZmZlY3RcIl1bXCJNTllcIl0pIHsgREVGQVVMVF9QUk9QW1wiTU5ZXCJdICs9IGVbXCJlZmZlY3RcIl1bXCJNTllcIl07IGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9MYXlvdXQvTU5ZL0JhY2tncm91bmQvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBgPGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbH0+5a625aKDIDwvYz48Y29sb3I9JHt0aGlzLmdyb3VwXzRfbGFsMX0+YCArIERFRkFVTFRfUFJPUFtcIk1OWVwiXSArIFwiPC9jb2xvcj5cIjsgREVGQVVMVF9DSltcIkhNTllcIl0gPSBERUZBVUxUX1BST1BbXCJNTllcIl0gPiBERUZBVUxUX0NKW1wiSE1OWVwiXSA/IERFRkFVTFRfUFJPUFtcIk1OWVwiXSA6IERFRkFVTFRfQ0pbXCJITU5ZXCJdOyBERUZBVUxUX0NKW1wiTE1OWVwiXSA9IERFRkFVTFRfUFJPUFtcIk1OWVwiXSA8IERFRkFVTFRfQ0pbXCJMTU5ZXCJdID8gREVGQVVMVF9QUk9QW1wiTU5ZXCJdIDogREVGQVVMVF9DSltcIkxNTllcIl07IGxldCBudW06IHN0cmluZyA9IGVbXCJlZmZlY3RcIl1bXCJNTllcIl0gPiAwID8gXCIrXCIgKyBlW1wiZWZmZWN0XCJdW1wiTU5ZXCJdIDogZVtcImVmZmVjdFwiXVtcIk1OWVwiXTsgZW50cnkuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyArPSBcIlxcbjxjb2xvcj1cIiArIHRoaXMudGV4XzRfbGFsMSArIFwiPuWutuWig1wiICsgbnVtICsgXCI8L2NvbG9yPlwiIH1cclxuICAgICAgICAgICAgaWYgKGVbXCJlZmZlY3RcIl1bXCJTUFJcIl0pIHsgREVGQVVMVF9QUk9QW1wiU1BSXCJdICs9IGVbXCJlZmZlY3RcIl1bXCJTUFJcIl07IGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9MYXlvdXQvU1BSL0JhY2tncm91bmQvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBgPGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbH0+5b+r5LmQIDwvYz48Y29sb3I9JHt0aGlzLmdyb3VwXzRfbGFsMX0+YCArIERFRkFVTFRfUFJPUFtcIlNQUlwiXSArIFwiPC9jb2xvcj5cIjsgREVGQVVMVF9DSltcIkhTUFJcIl0gPSBERUZBVUxUX1BST1BbXCJTUFJcIl0gPiBERUZBVUxUX0NKW1wiSFNQUlwiXSA/IERFRkFVTFRfUFJPUFtcIlNQUlwiXSA6IERFRkFVTFRfQ0pbXCJIU1BSXCJdOyBERUZBVUxUX0NKW1wiTFNQUlwiXSA9IERFRkFVTFRfUFJPUFtcIlNQUlwiXSA8IERFRkFVTFRfQ0pbXCJMU1BSXCJdID8gREVGQVVMVF9QUk9QW1wiU1BSXCJdIDogREVGQVVMVF9DSltcIkxTUFJcIl07IGxldCBudW06IHN0cmluZyA9IGVbXCJlZmZlY3RcIl1bXCJTUFJcIl0gPiAwID8gXCIrXCIgKyBlW1wiZWZmZWN0XCJdW1wiU1BSXCJdIDogZVtcImVmZmVjdFwiXVtcIlNQUlwiXTsgZW50cnkuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyArPSBcIlxcbjxjb2xvcj1cIiArIHRoaXMudGV4XzRfbGFsMSArIFwiPuW/q+S5kFwiICsgbnVtICsgXCI8L2NvbG9yPlwiIH1cclxuICAgICAgICAgICAgaWYgKGVbXCJlZmZlY3RcIl1bXCJMSUZcIl0pIHsgREVGQVVMVF9QUk9QW1wiTElGXCJdICs9IGVbXCJlZmZlY3RcIl1bXCJMSUZcIl07IH1cclxuICAgICAgICAgICAgaWYgKGVbXCJlZmZlY3RcIl1bXCJBR0VcIl0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChlWydpZCddID09IDIwNDA5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWJ1aWxkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlYnVpbGRBZ2UgPSBOdW1iZXIoZVtcImVmZmVjdFwiXVtcIkFHRVwiXSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Ob3dBZ2UgKz0gTnVtYmVyKGVbXCJlZmZlY3RcIl1bXCJBR0VcIl0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgREVGQVVMVF9DSltcIkhBR0VcIl0gPSB0aGlzLk5vd0FnZSA+IERFRkFVTFRfQ0pbXCJIQUdFXCJdID8gdGhpcy5Ob3dBZ2UgOiBERUZBVUxUX0NKW1wiSEFHRVwiXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlW1wiZWZmZWN0XCJdW1wiUkRNXCJdKSB7XHJcbiAgICAgICAgICAgICAgICAvL+maj+acuuWxnuaAp+WinuWKoFxyXG4gICAgICAgICAgICAgICAgbGV0IGk6IG51bWJlciA9IGVbXCJlZmZlY3RcIl1bXCJSRE1cIl1cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGEgPSAwOyBhIDwgaTsgYSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTogREVGQVVMVF9QUk9QW1wiQ0hSXCJdICs9IDE7IGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9MYXlvdXQvQ0hSL0JhY2tncm91bmQvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBgPGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbH0+6aKc5YC8IDwvYz48Y29sb3I9JHt0aGlzLmdyb3VwXzRfbGFsMX0+YCArIERFRkFVTFRfUFJPUFtcIkNIUlwiXSArIFwiPC9jb2xvcj5cIjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjogREVGQVVMVF9QUk9QW1wiSU5UXCJdICs9IDE7IGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9MYXlvdXQvSU5UL0JhY2tncm91bmQvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBgPGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbH0+5pm65YqbIDwvYz48Y29sb3I9JHt0aGlzLmdyb3VwXzRfbGFsMX0+YCArIERFRkFVTFRfUFJPUFtcIklOVFwiXSArIFwiPC9jb2xvcj5cIjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzogREVGQVVMVF9QUk9QW1wiU1RSXCJdICs9IDE7IGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9MYXlvdXQvU1RSL0JhY2tncm91bmQvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBgPGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbH0+5L2T6LSoIDwvYz48Y29sb3I9JHt0aGlzLmdyb3VwXzRfbGFsMX0+YCArIERFRkFVTFRfUFJPUFtcIlNUUlwiXSArIFwiPC9jb2xvcj5cIjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDogREVGQVVMVF9QUk9QW1wiTU5ZXCJdICs9IDE7IGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9MYXlvdXQvTU5ZL0JhY2tncm91bmQvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBgPGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbH0+5a625aKDIDwvYz48Y29sb3I9JHt0aGlzLmdyb3VwXzRfbGFsMX0+YCArIERFRkFVTFRfUFJPUFtcIk1OWVwiXSArIFwiPC9jb2xvcj5cIjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTogREVGQVVMVF9QUk9QW1wiU1BSXCJdICs9IDE7IGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9MYXlvdXQvU1BSL0JhY2tncm91bmQvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBgPGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbH0+5b+r5LmQIDwvYz48Y29sb3I9JHt0aGlzLmdyb3VwXzRfbGFsMX0+YCArIERFRkFVTFRfUFJPUFtcIlNQUlwiXSArIFwiPC9jb2xvcj5cIjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFNhdmVVdGlscy5pbnN0LlNhdmVEYXRhKClcclxuICAgICAgICBpZiAoZVtcInJlcGxhY2VtZW50XCJdKSB7XHJcbiAgICAgICAgICAgIGlmIChlW1wicmVwbGFjZW1lbnRcIl1bXCJncmFkZVwiXSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+aVsOaNricsIGVbXCJyZXBsYWNlbWVudFwiXVtcImdyYWRlXCJdLCBlKVxyXG4gICAgICAgICAgICAgICAgbGV0IGdyYWRlID0gZVtcInJlcGxhY2VtZW50XCJdW1wiZ3JhZGVcIl1bMF0vL+eogOacieW6plxyXG4gICAgICAgICAgICAgICAgbGV0IGdyYWRlcyA9IFtdXHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygn5pWw57uEJyxncmFkZXMpXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE9iamVjdC5rZXlzKHRoaXMuVGFsZW50cy5qc29uKS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfmnaHku7YnLCAhdGhpcy50aWNodS5pbmNsdWRlcygxMDAxICsgaSksIHRoaXMuVGFsZW50cy5qc29uWzEwMDEgKyBpXVtcInNob3dcIl0sIHRoaXMuVGFsZW50cy5qc29uWzEwMDEgKyBpXVtcImdyYWRlXCJdLCBncmFkZSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMudGljaHUuaW5jbHVkZXMoMTAwMSArIGkpICYmIHRoaXMuVGFsZW50cy5qc29uWzEwMDEgKyBpXVtcInNob3dcIl0gIT0gMCAmJiB0aGlzLlRhbGVudHMuanNvblsxMDAxICsgaV1bXCJncmFkZVwiXSA9PSBncmFkZSkgey8v5YmU6Zmk5pWw57uE6YeM5rKh5pyJ77yM5bm25LiU56iA5pyJ5bqm56ym5ZCIXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyYWRlcy5wdXNoKDEwMDEgKyBpKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfmlbDnu4QnLGdyYWRlcylcclxuICAgICAgICAgICAgICAgIGxldCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZ3JhZGVzLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIGdyYWRlc1tqXS8v5pyA57uI6ZqP5Ye65p2l55qEXHJcbiAgICAgICAgICAgICAgICBsZXQgaCA9IERFRkFVTFRfUFJPUC5UTFQuaW5kZXhPZihpbmRleCkvL+imgeiiq+abv+aNoueahOWkqei1i+eahOinkuagh1xyXG4gICAgICAgICAgICAgICAgREVGQVVMVF9QUk9QLlRMVFtoXSA9IGdyYWRlc1tqXS8v5pu/5o2iXHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvblRhbGVudC5wdXNoKGdyYWRlc1tqXSkvL+abv+aNolxyXG4gICAgICAgICAgICAgICAgLy90aGlzLlRpcHNPcGVuKHRydWUsIFwi5aSp6LWL44CQXCIgKyB0aGlzLlRhbGVudHMuanNvbltpbmRleF1bXCJuYW1lXCJdICsgXCLjgJHlj5HliqjmiJDlip/vvIHmm7/mjaLmiJDjgJBcIiArIHRoaXMuVGFsZW50cy5qc29uW2dyYWRlc1tqXV1bXCJuYW1lXCJdICsgXCLjgJFcIilcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIuWkqei1i+OAkFwiICsgdGhpcy5UYWxlbnRzLmpzb25baW5kZXhdW1wibmFtZVwiXSArIFwi44CR5Y+R5Yqo5oiQ5Yqf77yB5pu/5o2i5oiQ44CQXCIgKyB0aGlzLlRhbGVudHMuanNvbltncmFkZXNbal1dW1wibmFtZVwiXSArIFwi44CRXCJcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlW1wicmVwbGFjZW1lbnRcIl1bXCJ0YWxlbnRcIl0pIHtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ+aVsOaNrjEnLCBlW1wicmVwbGFjZW1lbnRcIl1bXCJ0YWxlbnRcIl0sIGUpXHJcbiAgICAgICAgICAgICAgICBsZXQgZ3JhZGVzID0gW11cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZVtcInJlcGxhY2VtZW50XCJdW1widGFsZW50XCJdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JhZGVzLnB1c2goZVtcInJlcGxhY2VtZW50XCJdW1widGFsZW50XCJdW2ldLnRvU3RyaW5nKCkuc3BsaXQoJyonKVswXSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZ3JhZGVzLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIGdyYWRlc1tqXS8v5pyA57uI6ZqP5Ye65p2l55qEXHJcbiAgICAgICAgICAgICAgICBsZXQgaCA9IERFRkFVTFRfUFJPUC5UTFQuaW5kZXhPZihpbmRleCkvL+imgeiiq+abv+aNoueahOWkqei1i+eahOinkuagh1xyXG4gICAgICAgICAgICAgICAgREVGQVVMVF9QUk9QLlRMVFtoXSA9IGdyYWRlc1tqXS8v5pu/5o2iXHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvblRhbGVudC5wdXNoKGdyYWRlc1tqXSkvL+abv+aNolxyXG4gICAgICAgICAgICAgICAgLy90aGlzLlRpcHNPcGVuKHRydWUsIFwi5aSp6LWL44CQXCIgKyB0aGlzLlRhbGVudHMuanNvbltpbmRleF1bXCJuYW1lXCJdICsgXCLjgJHlj5HliqjmiJDlip/vvIHmm7/mjaLmiJDjgJBcIiArIHRoaXMuVGFsZW50cy5qc29uW2dyYWRlc1tqXV1bXCJuYW1lXCJdICsgXCLjgJFcIilcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIuWkqei1i+OAkFwiICsgdGhpcy5UYWxlbnRzLmpzb25baW5kZXhdW1wibmFtZVwiXSArIFwi44CR5Y+R5Yqo5oiQ5Yqf77yB5pu/5o2i5oiQ44CQXCIgKyB0aGlzLlRhbGVudHMuanNvbltncmFkZXNbal1dW1wibmFtZVwiXSArIFwi44CRXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/oh6rliqjmt7vliqDngrnlh7vkuovku7ZcclxuICAgIEF1dG9BZGRDbGlja0V2ZW50KG5vZGU6IGNjLk5vZGUsIGNvbXBvbmVudE5hbWU6IHN0cmluZywgaGFuZGxlck5hbWU6IHN0cmluZywgcGFyYW1ldGVyOiBzdHJpbmcsIGJ1dHRvbjogY2MuTm9kZSkge1xyXG4gICAgICAgIGxldCBjbGlja0V2ZW50SGFuZGxlciA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgICAgY2xpY2tFdmVudEhhbmRsZXIudGFyZ2V0ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGNsaWNrRXZlbnRIYW5kbGVyLmNvbXBvbmVudCA9IGNvbXBvbmVudE5hbWU7XHJcbiAgICAgICAgY2xpY2tFdmVudEhhbmRsZXIuaGFuZGxlciA9IGhhbmRsZXJOYW1lO1xyXG4gICAgICAgIGNsaWNrRXZlbnRIYW5kbGVyLmN1c3RvbUV2ZW50RGF0YSA9IHBhcmFtZXRlcjtcclxuICAgICAgICBidXR0b24uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuY2xpY2tFdmVudHMucHVzaChjbGlja0V2ZW50SGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIFpvbmdqaWUoKSB7XHJcbiAgICAgICAgLy/mlbDmja7mjIHkuYXljJZcclxuICAgICAgICBERUZBVUxUX0NKLlRNUyArPSAxXHJcbiAgICAgICAgU2F2ZVV0aWxzLmluc3QuU2F2ZURhdGEoKVxyXG4gICAgICAgIGlmIChVc2VyTW9kZWwuaW5zdGFuY2UuYWRDZCkge1xyXG4gICAgICAgICAgICBVc2VyTW9kZWwuaW5zdGFuY2UuYWRDZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBVc2VyTW9kZWwuaW5zdGFuY2Uuc2F2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eVjOmdouWIh+aNolxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNFwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNVwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgLy/or4TliIZcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzUvQm94L0xheW91dC9DSFIvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBgPGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbH0+6aKc5YC8IDwvYz48Y29sb3I9JHt0aGlzLmdyb3VwXzRfbGFsMX0+YCArIERFRkFVTFRfUFJPUFtcIkNIUlwiXSArIFwiPC9jb2xvcj5cIlxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNS9Cb3gvTGF5b3V0L0lOVC9MYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IGA8Y29sb3I9JHt0aGlzLmdyb3VwXzRfbGFsfT7mmbrlipsgPC9jPjxjb2xvcj0ke3RoaXMuZ3JvdXBfNF9sYWwxfT5gICsgREVGQVVMVF9QUk9QW1wiSU5UXCJdICsgXCI8L2NvbG9yPlwiXHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF81L0JveC9MYXlvdXQvU1RSL0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gYDxjb2xvcj0ke3RoaXMuZ3JvdXBfNF9sYWx9PuS9k+i0qCA8L2M+PGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbDF9PmAgKyBERUZBVUxUX1BST1BbXCJTVFJcIl0gKyBcIjwvY29sb3I+XCJcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzUvQm94L0xheW91dC9NTlkvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBgPGNvbG9yPSR7dGhpcy5ncm91cF80X2xhbH0+5a625aKDIDwvYz48Y29sb3I9JHt0aGlzLmdyb3VwXzRfbGFsMX0+YCArIERFRkFVTFRfUFJPUFtcIk1OWVwiXSArIFwiPC9jb2xvcj5cIlxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNS9Cb3gvTGF5b3V0L1NQUi9MYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IGA8Y29sb3I9JHt0aGlzLmdyb3VwXzRfbGFsfT7lv6vkuZAgPC9jPjxjb2xvcj0ke3RoaXMuZ3JvdXBfNF9sYWwxfT5gICsgREVGQVVMVF9QUk9QW1wiU1BSXCJdICsgXCI8L2NvbG9yPlwiXHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF81L0JveC9BR0UvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuesrFwiICsgREVGQVVMVF9DSltcIlRNU1wiXSArIFwi5LiW77yM5Lqr5bm0XCIgKyB0aGlzLk5vd0FnZSArIFwi5bKBXCJcclxuICAgICAgICBsZXQgc3VtID0gREVGQVVMVF9QUk9QW1wiQ0hSXCJdICsgREVGQVVMVF9QUk9QW1wiSU5UXCJdICsgREVGQVVMVF9QUk9QW1wiU1RSXCJdICsgREVGQVVMVF9QUk9QW1wiTU5ZXCJdICsgREVGQVVMVF9QUk9QW1wiU1BSXCJdICsgdGhpcy5Ob3dBZ2UvL+aAu+WIhuiuoeeul+WFrOW8j1xyXG4gICAgICAgIERFRkFVTFRfQ0pbXCJTVU1cIl0gPSBzdW0gPiBERUZBVUxUX0NKW1wiU1VNXCJdID8gc3VtIDogREVGQVVMVF9DSltcIlNVTVwiXTtcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzUvQm94L1NVTS9MYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHN1bS50b1N0cmluZygpXHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF81L0JveC9MZWdlbmQvXCIgKyBzdW1tYXJ5KFwiU1VNXCIsIHN1bSlbXCJqdWRnZVwiXSkuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIC8v5LiL6L6I5a2Q5LiJ6YCJ5LiA5aSp6LWLXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBERUZBVUxUX1BST1BbXCJUTFRcIl0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy/miZPlvIBsYWJlbFxyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzUvQm94L0xhYmVsMlwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IERFRkFVTFRfUFJPUFtcIlRMVFwiXVtpXVxyXG4gICAgICAgICAgICBsZXQgaiA9IGNjLmluc3RhbnRpYXRlKHRoaXMubm9ybWFsTGFiZWwpXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTnJvbWFsTGFibGUoaiwgZ3JhZGVzW3RoaXMuVGFsZW50cy5qc29uW2luZGV4XVtcImdyYWRlXCJdXSlcclxuICAgICAgICAgICAgai5wYXJlbnQgPSBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzUvQm94L1Njcm9sbFZpZXcyL3ZpZXcvTGF5b3V0XCIpXHJcbiAgICAgICAgICAgIHRoaXMuQXV0b0FkZENsaWNrRXZlbnQodGhpcy5ub2RlLCBcIk1haW5cIiwgXCJTZWxlY3RMdW5UYWxlbnRcIiwgKGkgKyAxKS50b1N0cmluZygpLCBqKVxyXG4gICAgICAgICAgICBqLmdldENoaWxkQnlOYW1lKFwiTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLlRhbGVudHMuanNvbltpbmRleF1bXCJuYW1lXCJdICsgXCIoXCIgKyB0aGlzLlRhbGVudHMuanNvbltpbmRleF1bXCJkZXNjcmlwdGlvblwiXSArIFwiKVwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5o+S5bGPXHJcblxyXG5cclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5WSVZPX0dBTUUgfHwgY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5YSUFPTUlfR0FNRSB8fCB3aW5kb3dbJ3VjJ10pIHtcclxuICAgICAgICAgICAgLy/CoGNvbnNvbGUubG9nKCfor7fpgInmi6knKVxyXG4gICAgICAgICAgICBHbG9iYWwucGxhdGZvcm0uU0hPV19USVRJQUxBRDEoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/nibnmlYjplIDmr4FcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzUvQm94L0FuaW1cIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF81L0JveC9MZWdlbmRcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIH0sIDEuNSlcclxuXHJcblxyXG4gICAgICAgIC8v5oiQ5bCx5qOA5p+lXHJcbiAgICAgICAgdGhpcy5jaGVja19jaihcIlNVTU1BUllcIilcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaXNBdXRvUGxheSgpIHtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzdGltbWVyQ0RhdXRvKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXN0aW1tZXJDRGF1dG8gPSB0cnVlXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFTYXZlRGF0YS5pc0F1dG9BRCkge1xyXG4gICAgICAgICAgICBpZiAod2luZG93W1widHRcIl0pIHtcclxuICAgICAgICAgICAgICAgIC8v5Z6D5Zy+5oqW6Z+z5b6X5YWI5by556qXXHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzMW9yMiA9IDFcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9EWUxKXCIpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEdsb2JhbC5wbGF0Zm9ybS5DTE9TRV9WSURFTyhcclxuICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBTYXZlRGF0YS5pc0F1dG8gPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgU2F2ZURhdGEuaXNBdXRvQUQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgU2F2ZURhdGEuaXNBdXRvMiA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8yL0JhY2tncm91bmQvWkQxXCIpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvQXV0bzIvQmFja2dyb3VuZC9aRDJcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICBTYXZlVXRpbHMuaW5zdC5TYXZlRGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8vQmFja2dyb3VuZC9JY29uXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8vQmFja2dyb3VuZC9aRDFcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvQXV0by9CYWNrZ3JvdW5kL1pEMlwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0RZTEpcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5UaXBzT3Blbih0cnVlLCBjYy5jb2xvcigxMjgsIDIyMywgMjM5KSwgXCLlub/lkYrmnKrmkq3mlL7lrozmiJBcIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVGlwc09wZW4odHJ1ZSwgY2MuY29sb3IoMTI4LCAyMjMsIDIzOSksIFwi5pqC5peg5bm/5ZGK77yM6K+356iN5ZCO5YaN6K+VXCIpXHJcbiAgICAgICAgICAgICAgICB9LCBcIjE4XCJcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBTYXZlRGF0YS5pc0F1dG8yID0gZmFsc2VcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8yL0JhY2tncm91bmQvWkQxXCIpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8yL0JhY2tncm91bmQvWkQyXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIGlmIChTYXZlRGF0YS5pc0F1dG8pIHtcclxuICAgICAgICAgICAgICAgIFNhdmVEYXRhLmlzQXV0byA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvQXV0by9CYWNrZ3JvdW5kL1pEMVwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvQXV0by9CYWNrZ3JvdW5kL1pEMlwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgU2F2ZURhdGEuaXNBdXRvID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8vQmFja2dyb3VuZC9aRDFcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9BdXRvL0JhY2tncm91bmQvWkQyXCIpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBTYXZlVXRpbHMuaW5zdC5TYXZlRGF0YSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaXNBdXRvUGxheTIoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzdGltbWVyQ0RhdXRvKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXN0aW1tZXJDRGF1dG8gPSB0cnVlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChTYXZlRGF0YS5pc0F1dG9BRDIgJiYgTWF0aC5yb3VuZChuZXcgRGF0ZSgpLmdldFRpbWUoKSkgLyAxMDAwIC0gU2F2ZURhdGEuTGFzdFRpbWUgPiBBRHRpbWUpIHtcclxuICAgICAgICAgICAgLy/otoXml7bkuoZcclxuICAgICAgICAgICAgU2F2ZURhdGEuaXNBdXRvQUQyID0gZmFsc2VcclxuICAgICAgICAgICAgU2F2ZURhdGEuaXNBdXRvMiA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghU2F2ZURhdGEuaXNBdXRvQUQyKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3dbXCJ0dFwiXSkge1xyXG4gICAgICAgICAgICAgICAgLy/lnoPlnL7mipbpn7PlvpflhYjlvLnnqpdcclxuICAgICAgICAgICAgICAgIHRoaXMuaXMxb3IyID0gMlxyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L2F1dG9iaW9ncmFwaHlcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgR2xvYmFsLnBsYXRmb3JtLkNMT1NFX1ZJREVPKFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFNhdmVEYXRhLkxhc3RUaW1lID0gTWF0aC5yb3VuZChuZXcgRGF0ZSgpLmdldFRpbWUoKSkgLyAxMDAwXHJcbiAgICAgICAgICAgICAgICAgICAgU2F2ZURhdGEuaXNBdXRvMiA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICBTYXZlRGF0YS5pc0F1dG9BRDIgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgU2F2ZURhdGEuaXNBdXRvID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvQXV0by9CYWNrZ3JvdW5kL1pEMVwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8vQmFja2dyb3VuZC9aRDJcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICBTYXZlVXRpbHMuaW5zdC5TYXZlRGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8yL0JhY2tncm91bmQvSWNvblwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9BdXRvMi9CYWNrZ3JvdW5kL1pEMVwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9BdXRvMi9CYWNrZ3JvdW5kL1pEMlwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0RZTEpcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5UaXBzT3Blbih0cnVlLCBjYy5jb2xvcigxMjgsIDIyMywgMjM5KSwgXCLlub/lkYrmnKrmkq3mlL7lrozmiJBcIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVGlwc09wZW4odHJ1ZSwgY2MuY29sb3IoMTI4LCAyMjMsIDIzOSksIFwi5pqC5peg5bm/5ZGK77yM6K+356iN5ZCO5YaN6K+VXCIpXHJcbiAgICAgICAgICAgICAgICB9LCAnNjInXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBTYXZlRGF0YS5pc0F1dG8gPSBmYWxzZVxyXG4gICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvQXV0by9CYWNrZ3JvdW5kL1pEMVwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9BdXRvL0JhY2tncm91bmQvWkQyXCIpLmFjdGl2ZSA9IGZhbHNlXHJcblxyXG4gICAgICAgICAgICBpZiAoU2F2ZURhdGEuaXNBdXRvMikge1xyXG4gICAgICAgICAgICAgICAgU2F2ZURhdGEuaXNBdXRvMiA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvQXV0bzIvQmFja2dyb3VuZC9aRDFcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8yL0JhY2tncm91bmQvWkQyXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgU2F2ZURhdGEuaXNBdXRvMiA9IHRydWVcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9BdXRvMi9CYWNrZ3JvdW5kL1pEMVwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8yL0JhY2tncm91bmQvWkQyXCIpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBTYXZlVXRpbHMuaW5zdC5TYXZlRGF0YSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlQXV0b1BsYXkyKCkge1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9hdXRvYmlvZ3JhcGh5XCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgd2F0Y2hBdXRvUGxheTIoKSB7XHJcbiAgICAgICAgR2xvYmFsLnBsYXRmb3JtLkNMT1NFX1ZJREVPKFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvYXV0b2Jpb2dyYXBoeVwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgU2F2ZURhdGEuTGFzdFRpbWUgPSBNYXRoLnJvdW5kKG5ldyBEYXRlKCkuZ2V0VGltZSgpKSAvIDEwMDBcclxuICAgICAgICAgICAgICAgIFNhdmVEYXRhLmlzQXV0bzIgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBTYXZlRGF0YS5pc0F1dG9BRDIgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBTYXZlRGF0YS5pc0F1dG8gPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8vQmFja2dyb3VuZC9aRDFcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8vQmFja2dyb3VuZC9aRDJcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIFNhdmVVdGlscy5pbnN0LlNhdmVEYXRhKClcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9BdXRvMi9CYWNrZ3JvdW5kL0ljb25cIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9BdXRvMi9CYWNrZ3JvdW5kL1pEMVwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8yL0JhY2tncm91bmQvWkQyXCIpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNC9EWUxKXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVGlwc09wZW4odHJ1ZSwgY2MuY29sb3IoMTI4LCAyMjMsIDIzOSksIFwi5bm/5ZGK5pyq5pKt5pS+5a6M5oiQXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRpcHNPcGVuKHRydWUsIGNjLmNvbG9yKDEyOCwgMjIzLCAyMzkpLCBcIuaaguaXoOW5v+WRiu+8jOivt+eojeWQjuWGjeivlVwiKVxyXG4gICAgICAgICAgICB9LCAnNjInXHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIEF1dG9GdWMoKSB7XHJcbiAgICAgICAgR2xvYmFsLnBsYXRmb3JtLkNMT1NFX1ZJREVPKFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pczFvcjIpIHtcclxuICAgICAgICAgICAgICAgICAgICBTYXZlRGF0YS5pc0F1dG8gPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgU2F2ZURhdGEuaXNBdXRvQUQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIFNhdmVEYXRhLmlzQXV0bzIgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgU2F2ZURhdGEuaXNBdXRvQUQyID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgU2F2ZVV0aWxzLmluc3QuU2F2ZURhdGEoKVxyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8vQmFja2dyb3VuZC9JY29uXCIpLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzQvQXV0by9CYWNrZ3JvdW5kL1pEMVwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0F1dG8vQmFja2dyb3VuZC9aRDJcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF80L0RZTEpcIikuYWN0aXZlID0gZmFsc2VcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVGlwc09wZW4odHJ1ZSwgY2MuY29sb3IoMTI4LCAyMjMsIDIzOSksIFwi5bm/5ZGK5pyq5pKt5pS+5a6M5oiQXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRpcHNPcGVuKHRydWUsIGNjLmNvbG9yKDEyOCwgMjIzLCAyMzkpLCBcIuaaguaXoOW5v+WRiu+8jOivt+eojeWQjuWGjeivlVwiKVxyXG4gICAgICAgICAgICB9LCBcIjE4XCJcclxuICAgICAgICApXHJcbiAgICB9XHJcbiAgICAvL0dyb3VkXzVcclxuICAgIHJlcmVyZSgpIHtcclxuICAgICAgICBHbG9iYWwuaXNGaXJzdEVudGVyQ0ogPSB0cnVlO1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnTGlmZVJlYmlydGgnKVxyXG4gICAgfVxyXG4gICAgV1hTaGFyZSgpIHtcclxuICAgICAgICAvL+W+ruS/oeaJi+WKqOWIhuS6q1xyXG4gICAgICAgIEdsb2JhbC5wbGF0Zm9ybS5TaGFyZSgoKSA9PiB7IH0pXHJcbiAgICB9XHJcbiAgICAvL+mAieaLqei9ruWbnuWkqei1i1xyXG4gICAgU2VsZWN0THVuVGFsZW50KGV2ZW50LCBjdXN0b21FdmVudERhdGEpIHtcclxuICAgICAgICBTYXZlRGF0YS5MdW5IdWlUYWxlbnQgPSBOdW1iZXIoREVGQVVMVF9QUk9QW1wiVExUXCJdW2N1c3RvbUV2ZW50RGF0YSAtIDFdKVxyXG4gICAgICAgIFNhdmVVdGlscy5pbnN0LlNhdmVEYXRhKClcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzUvQm94L1Njcm9sbFZpZXcyL3ZpZXcvTGF5b3V0XCIpLmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoTnVtYmVyKGN1c3RvbUV2ZW50RGF0YSkgPT09IChpICsgMSkpIHtcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNS9Cb3gvU2Nyb2xsVmlldzIvdmlldy9MYXlvdXRcIikuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoXCJCb3hfU2VsZWN0ZWRcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF81L0JveC9TY3JvbGxWaWV3Mi92aWV3L0xheW91dFwiKS5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcIkJveF9TZWxlY3RlZFwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/lub/lkYrvvIjlpKnpgInkuYvkurrvvIlcclxuICAgIGFkZEF0dHJpYnV0ZShldmVudCwgY3VzdG9tRXZlbnREYXRhKSB7XHJcbiAgICAgICAgR2xvYmFsLnBsYXRmb3JtLkNMT1NFX1ZJREVPKFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtID0gTnVtYmVyKGN1c3RvbUV2ZW50RGF0YSlcclxuICAgICAgICAgICAgICAgIHRoaXMuTWF4VXNlTnVtICs9IG51bVxyXG4gICAgICAgICAgICAgICAgdGhpcy5DYW5Vc2UobnVtKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuVFhDUyA+PSAyKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfMy9BRERcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzMvUmFuZG9tXCIpLnggPSAwXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmiJDlip9cIilcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlpLHotKVcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVGlwc09wZW4odHJ1ZSwgY2MuY29sb3IoMTI4LCAyMjMsIDIzOSksIFwi5pqC5peg5bm/5ZGK77yM6K+356iN5ZCO5YaN6K+VXCIpXHJcbiAgICAgICAgICAgIH0sIFwiMTVcIlxyXG4gICAgICAgIClcclxuICAgIH1cclxuICAgIC8v5LuO5paw5oq95aSp6LWLKOmAhuWkqeaUueWRvSlcclxuICAgIFJlb3BlbihldmVudCwgY3VzdG9tRXZlbnREYXRhKSB7XHJcbiAgICAgICAgR2xvYmFsLnBsYXRmb3JtLkNMT1NFX1ZJREVPKFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL+mHjee9rumAu+i+kVxyXG4gICAgICAgICAgICAgICAgREVGQVVMVF9QUk9QW1wiVExUXCJdID0gW11cclxuICAgICAgICAgICAgICAgIHRoaXMuQWxyZWFkeVRhbGVudEJ1dHRvbiA9IFtdXHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbFNob3dUYWxlbnQgPSBbXVxyXG4gICAgICAgICAgICAgICAgdGhpcy5Ob3dTZWxlY3RUYWxlbnROdW0gPSAwXHJcblxyXG4gICAgICAgICAgICAgICAgLy/lpZblirHkuIDkuKrnqIDmnInluqbkuLoy55qE5aSp6LWLXHJcbiAgICAgICAgICAgICAgICBsZXQgdHdlID0gWzEwMDUsIDEwMTQsIDEwMTgsIDEwMTksIDEwMjQsIDEwMjUsIDEwODMsIDExMDQsIDExMTIsIDExMjgsIDExMjksIDExMzFdXHJcbiAgICAgICAgICAgICAgICBsZXQgenMgPSB0d2VbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdHdlLmxlbmd0aCldXHJcblxyXG4gICAgICAgICAgICAgICAgU2F2ZURhdGEuTHVuSHVpVGFsZW50ID0genNcclxuICAgICAgICAgICAgICAgIFNhdmVVdGlscy5pbnN0LlNhdmVEYXRhKClcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLlRlbkNQKClcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5oiQ5YqfXCIpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5aSx6LSlXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRpcHNPcGVuKHRydWUsIGNjLmNvbG9yKDEyOCwgMjIzLCAyMzkpLCBcIuaaguaXoOW5v+WRiu+8jOivt+eojeWQjuWGjeivlVwiKVxyXG4gICAgICAgICAgICB9LCBcIjEyXCJcclxuICAgICAgICApXHJcbiAgICB9XHJcbiAgICBtb3ZlU3RhcnQoZTogY2MuVG91Y2gpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0UG9zID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN0YXJ0UG9zID0gZS5nZXRMb2NhdGlvbigpXHJcbiAgICB9XHJcblxyXG4gICAgbW92ZUluZyhlOiBjYy5Ub3VjaCkge1xyXG4gICAgICAgIGlmIChlLmdldExvY2F0aW9uKCkueSAtIHRoaXMuc3RhcnRQb3MueSA+PSAxNSkge1xyXG4gICAgICAgICAgICB0aGlzLlRpcHNPcGVuKGZhbHNlLCBjYy5jb2xvcigxMjgsIDIyMywgMjM5KSlcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vR3JvdXBfNui/lOWbnuaMiemSrlxyXG4gICAgR3JvdXBfNl9SZXR1cm4oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWNoaWV2ZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5hY2hpZXZlbWVudC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWNoaWV2ZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzFcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNlwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIEdsb2JhbC5nYXBUaW1lID0gMDtcclxuICAgICAgICBHbG9iYWwuaXNTaG93ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8v5omT5byA5oiQ5bCx55WM6Z2iXHJcbiAgICBPcGVuX2NoZW5naml1KCkge1xyXG4gICAgICAgIHRoaXMuR2VudGFsZW50KClcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzFcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzZcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIEdsb2JhbC5nYXBUaW1lID0gMDtcclxuICAgICAgICBHbG9iYWwuaXNTaG93ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvL+eUn+aIkOWkqei1i1xyXG4gICAgR2VudGFsZW50KCkge1xyXG4gICAgICAgIGxldCBtYW86IGFueVtdID0gW107XHJcbiAgICAgICAgbGV0IG1hbzE6IGFueVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLkFjaGlldmVtZW50Lmpzb24pIHtcclxuICAgICAgICAgICAgaWYgKERFRkFVTFRfQ0ouQUNKLmluY2x1ZGVzKHRoaXMuQWNoaWV2ZW1lbnQuanNvbltpXS5pZCkpIHtcclxuICAgICAgICAgICAgICAgIG1hby5wdXNoKHRoaXMuQWNoaWV2ZW1lbnQuanNvbltpXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtYW8xLnB1c2godGhpcy5BY2hpZXZlbWVudC5qc29uW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYW8xLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG1hby5wdXNoKG1hbzFbaV0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbWFvMjogYW55W11bXSA9IFtdOy8vXHJcblxyXG4gICAgICAgIGxldCBudW0gPSBNYXRoLmNlaWwoT2JqZWN0LmtleXModGhpcy5BY2hpZXZlbWVudC5qc29uKS5sZW5ndGggKiAwLjUpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBrID0gMCwgaW5kZXggPSAwOyBrIDwgbnVtOyBrKyspIHtcclxuXHJcbiAgICAgICAgICAgIG1hbzIucHVzaChtYW8uc2xpY2UoaW5kZXgsIGluZGV4ICs9IDIpKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBSZXNNZ3IubG9hZFByZWZhYigncHJlZmFiL2FjaGlldmVtZW50JywgKHByZSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcHJlZmFiOiBjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUocHJlKVxyXG4gICAgICAgICAgICBwcmVmYWIucGFyZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdHcm91cF82Jyk7XHJcbiAgICAgICAgICAgIGxldCBoaWdodCA9IChjYy53aW5TaXplLmhlaWdodCAtIDEyODApIC8gMlxyXG4gICAgICAgICAgICBwcmVmYWIueSA9IC0yMjBcclxuICAgICAgICAgICAgcHJlZmFiLmdldENvbXBvbmVudChBY2hpZXZlbWVudCkuZGF0YSA9IG1hbzI7XHJcbiAgICAgICAgICAgIHByZWZhYi5nZXRDb21wb25lbnQoQWNoaWV2ZW1lbnQpLmluaXQoKVxyXG4gICAgICAgICAgICB0aGlzLmFjaGlldmVtZW50ID0gcHJlZmFiO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvL+e7n+iuoVxyXG4gICAgdG9uZ2ppKCkge1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNi9MYXlvdXQvMS9UaXRsZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwi5bey6YeN5byAXCIgKyBERUZBVUxUX0NKLlRNUyArIFwi5qyhXCJcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzYvTGF5b3V0LzIvVGl0bGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuaIkOWwsei+vuaIkFwiICsgREVGQVVMVF9DSi5BQ0oubGVuZ3RoICsgXCLkuKpcIlxyXG5cclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzYvTGF5b3V0LzEvQ29uXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCLmir3liLDntKvoibLmpoLnjodcIiArIHN1bW1hcnkoXCJDS1wiLCBERUZBVUxUX0NKLlRNUykuanVkZ2VcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0dyb3VwXzYvTGF5b3V0LzIvQ29uXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCLmir3liLDmqZnoibLmpoLnjodcIiArIHN1bW1hcnkoXCJDSlwiLCBERUZBVUxUX0NKLkFDSi5sZW5ndGgpLmp1ZGdlXHJcblxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNi9MYXlvdXQvMy9Db25cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNYXRoLmNlaWwoREVGQVVMVF9DSi5BRVZULmxlbmd0aCAqIDEwMCAvIE9iamVjdC5rZXlzKHRoaXMuRXZlbnRzLmpzb24pLmxlbmd0aCkgKyBcIiVcIlxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfNi9MYXlvdXQvNC9Db25cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNYXRoLmNlaWwoREVGQVVMVF9DSi5BVExULmxlbmd0aCAqIDEwMCAvIE9iamVjdC5rZXlzKHRoaXMuVGFsZW50cy5qc29uKS5sZW5ndGgpICsgXCIlXCJcclxuICAgIH1cclxuXHJcbiAgICBncm91cDNJbigpIHtcclxuICAgICAgICAvL+WFs+mXreWkqei1i+mAieaLqemdouadv1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfMlwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvR3JvdXBfM1wiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICB9XHJcblxyXG4gICAgLy/lhbPpl63lsI/lj4tcclxuICAgIENsb3NlWFkoKSB7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9Hcm91cF8yL0FkZFRhbGVudFwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuZ3JvdXAzSW4oKVxyXG4gICAgfVxyXG5cclxuICAgIG9wZW5WaWRlbygpIHtcclxuICAgICAgICBSZXNNZ3IubG9hZFByZWZhYigncHJlZmFiL3JhbmtpbmdMaXN0JywgKHByZSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcHJlZmFiID0gY2MuaW5zdGFudGlhdGUocHJlKVxyXG4gICAgICAgICAgICBwcmVmYWIucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBvcGVuR2FtZUJveCgpIHtcclxuICAgICAgICBSZXNNZ3IubG9hZFByZWZhYigncHJlZmFiL2dhbWVCb3gnLCAocHJlKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwcmVmYWIgPSBjYy5pbnN0YW50aWF0ZShwcmUpXHJcbiAgICAgICAgICAgIHByZWZhYi5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=