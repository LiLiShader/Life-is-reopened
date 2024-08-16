import AD_ROOT from "./AD_ROOT";
import PlatformBase from "./PlatformBase";

//全局变量
export default class Global {
     public static platform: PlatformBase;

     //广告刷新的间隔时间
     public static gapTime: number = 0;

     //是否有广告
     public static isNativeAD: boolean = false

     //广告常驻节点
     public static AD_RootNode: AD_ROOT

     //是否点击到互推按钮
     public static isTouchHuTui: boolean = false

     //banner是打开还是关闭状态
     public static BannerActive: boolean = false

     //第一次进入游戏，60后开启广告刷新
     public static firstPlayerCD: number = 60

     public static isShow: boolean = false;

     public static isInter: boolean = false;

     public static isStop: boolean = true;

     public static vivoNum: number = 0;

     public static randomIcon: any;
     public static randomIcon1: any;

     public static token: any;

     public static cdTime: number = 0;

     public static isDouyin: boolean = false;

     public static isPause: boolean = false

     public static isFirstEnter: boolean = false
     public static isFirstEnterCJ: boolean = true

     public static isNewUser: boolean = true      //是否新玩家

}

