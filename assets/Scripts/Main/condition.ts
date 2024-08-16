let DEFAULT_PROP = {
    CHR: 0,      // 颜值 charm CHR
    INT: 0,      // 智力 intelligence INT
    STR: 0,      // 体质 strength STR
    MNY: 0,      // 家境 money MNY
    SPR: 0,      // 快乐 spirit SPR
    LIF: 1,      // 生命 life LIF
    TLT: [],    // 天赋 talent TLT
    EVT: [],    // 事件 event EVT
    AGE: 0,    // 年龄
};

let DEFAULT_CJ = {
    TMS: 0,      // 重开次数
    HAGE: 0,     // 最大年龄
    SUM: 0,       //最大总评

    HCHR: 0,      // 最大颜值
    HINT: 0,      // 最大智力
    HSTR: 0,      // 最大体质
    HMNY: 0,      // 最大家境
    HSPR: 0,       // 最大快乐

    LCHR: 0,      // 最小颜值
    LINT: 0,      // 最小智力
    LSTR: 0,      // 最小体质
    LMNY: 0,      // 最小家境
    LSPR: 0,      // 最小快乐

    AEVT:[],    // 经历过的事件
    ATLT:[],    // 选择过的天赋
    ACJ:[],     //完成的成就
};

function getProp(prop) {
    switch(prop) {
        case 'CHR':
        case 'INT':
        case 'STR':
        case 'MNY':
        case 'SPR':
        case 'LIF':
        case 'TLT':
        case 'AGE':
        case 'EVT': return DEFAULT_PROP[prop];
        case "TMS":
        case "HAGE":
        case "SUM":
        case "HCHR":
        case "HINT":
        case "HSTR":
        case "HMNY":
        case "HSPR":
        case "LCHR":
        case "LINT":
        case "LSTR":
        case "LMNY":
        case "LSPR":
        case "AEVT":
        case "ATLT":
        case "ACJ":return DEFAULT_CJ[prop]

        default: return null;
    }
}

function check(condition,type?:string) {
    if(condition==undefined){
        if(type=="include"){
            return true
            
        }else{
            return false
        }
    }else{
        const conditions = parseCondition(condition);
        //cc.log(condition,checkParsedCondition(conditions))
        return checkParsedCondition(conditions);
    }
}

function checkParsedCondition(conditions) {
    if(!Array.isArray(conditions)) return checkLogic(conditions);
    if(conditions.length == 0) return true;
    if(conditions.length == 1) return checkParsedCondition(conditions[0]);

    let ret = checkParsedCondition(conditions[0]);
    for(let i=1; i<conditions.length; i+=2) {
        switch(conditions[i]) {
            case '&':
                if(ret) ret = checkParsedCondition(conditions[i+1]);
                break;
            case '|':
                if(ret) return true;
                ret = checkParsedCondition(conditions[i+1]);
                break;
            default: return false;
        }
    }
    return ret;

}

function checkLogic(condition) {
    const length = condition.length;
    let i = condition.search(/[><\!\?=]/);

    const prop = condition.substring(0,i);
    const symbol = condition.substring(i, i+=(condition[i+1]=='='?2:1));
    const d = condition.substring(i, length);

    const propData = getProp(prop);
    const conditionData = d[0]=='['? JSON.parse(d): Number(d);

    switch(symbol) {
        case '>':  return propData >  conditionData;
        case '<':  return propData <  conditionData;
        case '>=': return propData >= conditionData;
        case '<=': return propData <= conditionData;
        case '=':
            if(Array.isArray(propData))
                return propData.includes(conditionData);
            return propData == conditionData;
        case '!=':
            if(Array.isArray(propData))
                return !propData.includes(conditionData);
            return propData == conditionData;
        case '?':
            if(Array.isArray(propData)) {
                for(const p of propData)
                    if(conditionData.includes(p)) return true;
                return false;
            }
            return conditionData.includes(propData);
        case '!':
            if(Array.isArray(propData)) {
                for(const p of propData)
                    if(conditionData.includes(p)) return false;
                return true;
            }
            return !conditionData.includes(propData);

        default: return false;
    }
}

function parseCondition(condition) {
    const conditions = [];
    
    const length = condition.length;
    const stack = [];
    stack.unshift(conditions);
    let cursor = 0;
    const catchString = i => {
        const str = condition.substring(cursor, i).trim();
        cursor = i;
        if(str) stack[0].push(str);
    };

    for(let i=0; i<length; i++) {
        switch(condition[i]) {
            case ' ': continue;

            case '(':
                catchString(i);
                cursor ++;
                const sub = [];
                stack[0].push(sub);
                stack.unshift(sub);
                break;

            case ')':
                catchString(i);
                cursor ++;
                stack.shift();
                break;

            case '|':
            case '&':
                catchString(i);
                catchString(i+1);
                break;
            default: continue;
        }
    }

    catchString(length);

    return conditions;
}
export { parseCondition,checkLogic,checkParsedCondition,check,getProp,DEFAULT_PROP,DEFAULT_CJ};