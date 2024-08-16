"use strict";
cc._RF.push(module, 'fe555zvgzdMx5Jr95ER8wfi', 'SaveUtils');
// Scripts/Other/SaveUtils.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("../AD/Global");
var condition_1 = require("../Main/condition");
var GlobalDefine_1 = require("./GlobalDefine");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SaveUtils = /** @class */ (function () {
    function SaveUtils() {
    }
    SaveUtils_1 = SaveUtils;
    //读取本地数据
    SaveUtils.prototype.getLocalData = function () {
        //SaveUtils.clear()
        var userData = cc.sys.localStorage.getItem('GreenHat_userData');
        //用户数据不为空
        if (userData != null && userData != "" && userData != "undefined") {
            Global_1.default.isNewUser = false;
            userData = JSON.parse(userData);
            //SaveData.ReOpenNum=userData.ReOpenNum!=null?userData.ReOpenNum:0
            GlobalDefine_1.SaveData.LunHuiTalent = userData.LunHuiTalent != null ? userData.LunHuiTalent : 0;
            GlobalDefine_1.SaveData.isAuto = userData.isAuto != null ? userData.isAuto : false;
            GlobalDefine_1.SaveData.isAuto2 = userData.isAuto2 != null ? userData.isAuto2 : false;
            GlobalDefine_1.SaveData.isAutoAD2 = userData.isAutoAD2 != null ? userData.isAutoAD2 : false;
            GlobalDefine_1.SaveData.isAutoAD = userData.isAutoAD != null ? userData.isAutoAD : false;
            GlobalDefine_1.SaveData.isBGMOpen = userData.isBGMOpen != null ? userData.isBGMOpen : true;
            GlobalDefine_1.SaveData.isPPDY = userData.isPPDY != null ? userData.isPPDY : false;
            GlobalDefine_1.SaveData.isPPDY2 = userData.isPPDY2 != null ? userData.isPPDY2 : true;
            GlobalDefine_1.SaveData.LastTime = userData.LastTime != null ? userData.LastTime : 0;
            condition_1.DEFAULT_CJ.TMS = userData.TMS != null ? userData.TMS : 0;
            condition_1.DEFAULT_CJ.HAGE = userData.HAGE != null ? userData.HAGE : 0;
            condition_1.DEFAULT_CJ.SUM = userData.SUM != null ? userData.SUM : 0;
            condition_1.DEFAULT_CJ.HCHR = userData.HCHR != null ? userData.HCHR : 0;
            condition_1.DEFAULT_CJ.HINT = userData.HINT != null ? userData.HINT : 0;
            condition_1.DEFAULT_CJ.HSTR = userData.HSTR != null ? userData.HSTR : 0;
            condition_1.DEFAULT_CJ.HMNY = userData.HMNY != null ? userData.HMNY : 0;
            condition_1.DEFAULT_CJ.HSPR = userData.HSPR != null ? userData.HSPR : 0;
            condition_1.DEFAULT_CJ.LCHR = userData.LCHR != null ? userData.LCHR : 0;
            condition_1.DEFAULT_CJ.LINT = userData.LINT != null ? userData.LINT : 0;
            condition_1.DEFAULT_CJ.LSTR = userData.LSTR != null ? userData.LSTR : 0;
            condition_1.DEFAULT_CJ.LMNY = userData.LMNY != null ? userData.LMNY : 0;
            condition_1.DEFAULT_CJ.LSPR = userData.LSPR != null ? userData.LSPR : 0;
            condition_1.DEFAULT_CJ.AEVT = userData.AEVT != null ? userData.AEVT : [];
            condition_1.DEFAULT_CJ.ATLT = userData.ATLT != null ? userData.ATLT : [];
            condition_1.DEFAULT_CJ.ACJ = userData.ACJ != null ? userData.ACJ : [];
            GlobalDefine_1.SaveData.Myzz = userData.Myzz != null ? userData.Myzz : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        else {
            Global_1.default.isNewUser = true;
            this.createNewUser();
        }
    };
    //创建新用户
    SaveUtils.prototype.createNewUser = function () {
        console.log("创建新用户");
        //SaveData.ReOpenNum=0
        GlobalDefine_1.SaveData.LunHuiTalent = 0;
        GlobalDefine_1.SaveData.isAuto = false;
        GlobalDefine_1.SaveData.isAuto2 = false;
        GlobalDefine_1.SaveData.isAutoAD = false;
        GlobalDefine_1.SaveData.isAutoAD2 = false;
        GlobalDefine_1.SaveData.isBGMOpen = true;
        GlobalDefine_1.SaveData.isPPDY = false;
        GlobalDefine_1.SaveData.isPPDY2 = true;
        GlobalDefine_1.SaveData.LastTime = 0;
        condition_1.DEFAULT_CJ.TMS = 0;
        condition_1.DEFAULT_CJ.HAGE = 0;
        condition_1.DEFAULT_CJ.SUM = 0;
        condition_1.DEFAULT_CJ.HCHR = 0;
        condition_1.DEFAULT_CJ.HINT = 0;
        condition_1.DEFAULT_CJ.HSTR = 0;
        condition_1.DEFAULT_CJ.HMNY = 0;
        condition_1.DEFAULT_CJ.HSPR = 0;
        condition_1.DEFAULT_CJ.LCHR = 0;
        condition_1.DEFAULT_CJ.LINT = 0;
        condition_1.DEFAULT_CJ.LSTR = 0;
        condition_1.DEFAULT_CJ.LMNY = 0;
        condition_1.DEFAULT_CJ.LSPR = 0;
        condition_1.DEFAULT_CJ.AEVT = [];
        condition_1.DEFAULT_CJ.ATLT = [];
        condition_1.DEFAULT_CJ.ACJ = [];
        GlobalDefine_1.SaveData.Myzz = [];
        this.SaveData();
    };
    //保存游戏数据
    SaveUtils.prototype.SaveData = function () {
        var userData = {};
        //userData.ReOpenNum=SaveData.ReOpenNum
        userData.LunHuiTalent = GlobalDefine_1.SaveData.LunHuiTalent;
        userData.isAuto = GlobalDefine_1.SaveData.isAuto;
        userData.isAuto2 = GlobalDefine_1.SaveData.isAuto2;
        userData.isAutoAD = GlobalDefine_1.SaveData.isAutoAD;
        userData.isAutoAD2 = GlobalDefine_1.SaveData.isAutoAD2;
        userData.isBGMOpen = GlobalDefine_1.SaveData.isBGMOpen;
        userData.isPPDY = GlobalDefine_1.SaveData.isPPDY;
        userData.isPPDY2 = GlobalDefine_1.SaveData.isPPDY2;
        userData.LastTime = GlobalDefine_1.SaveData.LastTime;
        userData.TMS = condition_1.DEFAULT_CJ.TMS;
        userData.HAGE = condition_1.DEFAULT_CJ.HAGE;
        userData.SUM = condition_1.DEFAULT_CJ.SUM;
        userData.HCHR = condition_1.DEFAULT_CJ.HCHR;
        userData.HINT = condition_1.DEFAULT_CJ.HINT;
        userData.HSTR = condition_1.DEFAULT_CJ.HSTR;
        userData.HMNY = condition_1.DEFAULT_CJ.HMNY;
        userData.HSPR = condition_1.DEFAULT_CJ.HSPR;
        userData.LCHR = condition_1.DEFAULT_CJ.LCHR;
        userData.LINT = condition_1.DEFAULT_CJ.LINT;
        userData.LSTR = condition_1.DEFAULT_CJ.LSTR;
        userData.LMNY = condition_1.DEFAULT_CJ.LMNY;
        userData.LSPR = condition_1.DEFAULT_CJ.LSPR;
        userData.AEVT = condition_1.DEFAULT_CJ.AEVT;
        userData.ATLT = condition_1.DEFAULT_CJ.ATLT;
        userData.ACJ = condition_1.DEFAULT_CJ.ACJ;
        userData.Myzz = GlobalDefine_1.SaveData.Myzz;
        cc.sys.localStorage.setItem('GreenHat_userData', JSON.stringify(userData));
    };
    /**@name: 清除某一条数据 */
    SaveUtils.remove = function (key) {
        cc.sys.localStorage.removeItem(key);
    };
    /**@name: 清除所有数据 */
    SaveUtils.clear = function () {
        cc.sys.localStorage.clear();
    };
    var SaveUtils_1;
    /**
     * @zd 用户数据存储
     */
    //单例
    SaveUtils.inst = new SaveUtils_1();
    SaveUtils = SaveUtils_1 = __decorate([
        ccclass
    ], SaveUtils);
    return SaveUtils;
}());
exports.default = SaveUtils;

cc._RF.pop();