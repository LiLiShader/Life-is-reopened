
import DataBase from "./DataBase";

export default class UserModel extends DataBase {

    // 单例
    private static _instance: UserModel;
    public static get instance() {
        if (!this._instance) {
            this._instance = new UserModel('UserInfo' + 0);
            this._instance.decode()
        }
        return this._instance;
    }

    private _using: string = 'skin0';       //使用哪套皮肤
    private _choice: string = 'skin4';       //使用哪套皮肤
    private _useId: number = 0;       //使用id
    private _autobiography: boolean = true;      //是否是第一次打开自传
    private _adCd: boolean = false       //是否有广告cd

    private _skinData = [               //皮肤数据
        {
            name: '白',          //皮肤名字
            isUse: true,                   //是否使用
            isUnlock: true,                //是否解锁
            texture: 'Skin_3',                    //图片
            folder: 'skin0'                      //文件夹
        },
        {
            name: '夜幕渐落',          //皮肤名字
            isUse: false,                   //是否使用
            isUnlock: false,                //是否解锁
            texture: 'Skin_2',                    //图片
            folder: 'skin1'                      //文件夹
        },
        {
            name: '山谷悠悠',          //皮肤名字
            isUse: false,                   //是否使用
            isUnlock: false,                //是否解锁
            texture: 'Skin_1',                    //图片
            folder: 'skin2'                      //文件夹
        }
    ]


    
    public get choice() {
        return this._choice
    }

    public set choice(value) {
        this._choice = value;
    }


    public get adCd() {
        return this._adCd
    }

    public set adCd(value) {
        this._adCd = value;
    }


    public get useId(): number {
        return this._useId
    }

    public set useId(value) {
        this._useId = value;
    }

    public get autobiography() {
        return this._autobiography
    }

    public set autobiography(value) {
        this._autobiography = value;
        this.save();
    }

    public get using(): string {
        return this._using
    }

    public set using(value) {
        this._using = value;
    }



    public get skinData() {
        return this._skinData
    }

    public set skinData(value) {
        this._skinData = value;
    }




    /**
    * 时间秒  转换成字符串
    * 格式  00时00分00秒
    * @param time  秒
    */
    public timeTransitionString(time: number) {
        let sec = time % 60; //6 秒
        let min = Math.floor(time / 60) % 60;// 分
        let hour = Math.floor(time / 60 / 60) % 24; //时
        let str = "";
        if (hour > 0) {

            str += hour + "时";
        }
        if (min > 0 || hour > 0) {

            str += min + "分";
        }

        str += sec + "秒";;
        return str;
    }

    /**
    * 时间秒  转换成字符串
    * 格式  00:00:00
    * @param time  秒
    */
    public static timeTransitionString1(time: number) {
        let sec = time % 60; //6 秒
        let min = Math.floor(time / 60) % 60;// 分
        let hour = Math.floor(time / 60 / 60) % 24; //时
        let str = "";
        if (hour) {
            if (hour < 10) {
                str += "0" + hour + ":";
            } else {
                str += hour + ":";
            }
        }
        if (min < 10) {
            str += "0" + min + ":";
        } else {
            str += min + ":";
        }
        if (sec < 10) {
            str += "0" + sec;
        } else {
            str += sec;
        }
        return str;
    }

    public get serverTime() {
        // return Math.floor(Tool.serverTime / 1000);
        return Math.floor((new Date().getTime()) / 1000)
    }

    public newDate() {
        this.save();
    }
}