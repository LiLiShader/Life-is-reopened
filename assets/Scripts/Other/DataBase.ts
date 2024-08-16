
export default class DataBase{
    private _saveKey:string;
    private _delaytime:number=0;
    public saveDelay:number = 5000;
    constructor(saveKey:string)
    {
        this._saveKey = saveKey;
    }

    
    /**
     * 读取数据
     */
    public decode(json?)
    {
        if (!json) json = cc.sys.localStorage.getItem(this._saveKey);
        if (json)
        {
            json = JSON.parse(json)
            for(var key in json)
            {
                this[key] = json[key];
            }
        };
    }

    
    public get te():number
    {
        return 1;
    }


    /**
     * 转化
     */
    public encode():any
    {
        var data: any = {};
        
        var user = JSON.parse(JSON.stringify(this));
        for(var key in user)
        {
            if(key=="_saveKey"||key=="saveDelay"||key=="_delaytime"||key=="instance")continue;
            data[key] = user[key];
        }
        return data;
    }

    /**
     * 延时保存
     */
    public delaySave()
    {
        if(this._delaytime==0)
        {
            this._delaytime = setTimeout(this.save.bind(this),this.saveDelay);
        }
    }

    
    /**
     * 保存
     */
    public save()
    {
        this._delaytime = 0;
        let data = this.encode();
        cc.sys.localStorage.setItem(this._saveKey,JSON.stringify(data));
    }

    /**
     * 全部清除
     */
    public clear () {
        cc.sys.localStorage.clear()
    }

    /**
     * 清除一个
     */
    public removeItem () {
        cc.sys.localStorage.removeItem(this._saveKey)
    }
}