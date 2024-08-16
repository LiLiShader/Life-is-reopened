import Global from "../AD/Global";
import { DEFAULT_CJ } from "../Main/condition";
import { SaveData } from "./GlobalDefine";
const { ccclass, property } = cc._decorator;

@ccclass
export default class SaveUtils {
    /**
     * @zd 用户数据存储
     */

    //单例
    static readonly inst: SaveUtils = new SaveUtils();

    //读取本地数据
    getLocalData() {
        //SaveUtils.clear()
        let userData = cc.sys.localStorage.getItem('GreenHat_userData');
        //用户数据不为空
        if (userData != null && userData != "" && userData != "undefined") {
            Global.isNewUser = false;
            userData = JSON.parse(userData);

            //SaveData.ReOpenNum=userData.ReOpenNum!=null?userData.ReOpenNum:0
            SaveData.LunHuiTalent = userData.LunHuiTalent != null ? userData.LunHuiTalent : 0
            SaveData.isAuto = userData.isAuto != null ? userData.isAuto : false
            SaveData.isAuto2 = userData.isAuto2 != null ? userData.isAuto2 : false
            SaveData.isAutoAD2 = userData.isAutoAD2 != null ? userData.isAutoAD2 : false
            SaveData.isAutoAD = userData.isAutoAD != null ? userData.isAutoAD : false
            SaveData.isBGMOpen = userData.isBGMOpen != null ? userData.isBGMOpen : true
            SaveData.isPPDY = userData.isPPDY != null ? userData.isPPDY : false
            SaveData.isPPDY2 = userData.isPPDY2 != null ? userData.isPPDY2 : true
            SaveData.LastTime = userData.LastTime != null ? userData.LastTime : 0


            DEFAULT_CJ.TMS = userData.TMS != null ? userData.TMS : 0
            DEFAULT_CJ.HAGE = userData.HAGE != null ? userData.HAGE : 0
            DEFAULT_CJ.SUM = userData.SUM != null ? userData.SUM : 0
            DEFAULT_CJ.HCHR = userData.HCHR != null ? userData.HCHR : 0
            DEFAULT_CJ.HINT = userData.HINT != null ? userData.HINT : 0
            DEFAULT_CJ.HSTR = userData.HSTR != null ? userData.HSTR : 0
            DEFAULT_CJ.HMNY = userData.HMNY != null ? userData.HMNY : 0
            DEFAULT_CJ.HSPR = userData.HSPR != null ? userData.HSPR : 0
            DEFAULT_CJ.LCHR = userData.LCHR != null ? userData.LCHR : 0
            DEFAULT_CJ.LINT = userData.LINT != null ? userData.LINT : 0
            DEFAULT_CJ.LSTR = userData.LSTR != null ? userData.LSTR : 0
            DEFAULT_CJ.LMNY = userData.LMNY != null ? userData.LMNY : 0
            DEFAULT_CJ.LSPR = userData.LSPR != null ? userData.LSPR : 0
            DEFAULT_CJ.AEVT = userData.AEVT != null ? userData.AEVT : []
            DEFAULT_CJ.ATLT = userData.ATLT != null ? userData.ATLT : []
            DEFAULT_CJ.ACJ = userData.ACJ != null ? userData.ACJ : []

            SaveData.Myzz = userData.Myzz != null ? userData.Myzz : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

        }
        else {
            Global.isNewUser = true;
            this.createNewUser();
        }
    }

    //创建新用户
    createNewUser() {
        console.log("创建新用户")
        //SaveData.ReOpenNum=0
        SaveData.LunHuiTalent = 0
        SaveData.isAuto = false
        SaveData.isAuto2 = false
        SaveData.isAutoAD = false
        SaveData.isAutoAD2 = false
        SaveData.isBGMOpen = true
        SaveData.isPPDY = false
        SaveData.isPPDY2 = true
        SaveData.LastTime = 0


        DEFAULT_CJ.TMS = 0
        DEFAULT_CJ.HAGE = 0
        DEFAULT_CJ.SUM = 0
        DEFAULT_CJ.HCHR = 0
        DEFAULT_CJ.HINT = 0
        DEFAULT_CJ.HSTR = 0
        DEFAULT_CJ.HMNY = 0
        DEFAULT_CJ.HSPR = 0
        DEFAULT_CJ.LCHR = 0
        DEFAULT_CJ.LINT = 0
        DEFAULT_CJ.LSTR = 0
        DEFAULT_CJ.LMNY = 0
        DEFAULT_CJ.LSPR = 0
        DEFAULT_CJ.AEVT = []
        DEFAULT_CJ.ATLT = []
        DEFAULT_CJ.ACJ = []

        SaveData.Myzz = []


        this.SaveData();
    }

    //保存游戏数据
    SaveData() {
        let userData: { [k: string]: any } = {};
        //userData.ReOpenNum=SaveData.ReOpenNum
        userData.LunHuiTalent = SaveData.LunHuiTalent
        userData.isAuto = SaveData.isAuto
        userData.isAuto2 = SaveData.isAuto2
        userData.isAutoAD = SaveData.isAutoAD
        userData.isAutoAD2 = SaveData.isAutoAD2
        userData.isBGMOpen = SaveData.isBGMOpen
        userData.isPPDY = SaveData.isPPDY
        userData.isPPDY2 = SaveData.isPPDY2
        userData.LastTime = SaveData.LastTime

        userData.TMS = DEFAULT_CJ.TMS
        userData.HAGE = DEFAULT_CJ.HAGE
        userData.SUM = DEFAULT_CJ.SUM
        userData.HCHR = DEFAULT_CJ.HCHR
        userData.HINT = DEFAULT_CJ.HINT
        userData.HSTR = DEFAULT_CJ.HSTR
        userData.HMNY = DEFAULT_CJ.HMNY
        userData.HSPR = DEFAULT_CJ.HSPR
        userData.LCHR = DEFAULT_CJ.LCHR
        userData.LINT = DEFAULT_CJ.LINT
        userData.LSTR = DEFAULT_CJ.LSTR
        userData.LMNY = DEFAULT_CJ.LMNY
        userData.LSPR = DEFAULT_CJ.LSPR
        userData.AEVT = DEFAULT_CJ.AEVT
        userData.ATLT = DEFAULT_CJ.ATLT
        userData.ACJ = DEFAULT_CJ.ACJ

        userData.Myzz = SaveData.Myzz

        cc.sys.localStorage.setItem('GreenHat_userData', JSON.stringify(userData));

    }
    /**@name: 清除某一条数据 */
    static remove(key) {
        cc.sys.localStorage.removeItem(key);
    }
    /**@name: 清除所有数据 */
    static clear() {
        cc.sys.localStorage.clear();
    }
}
