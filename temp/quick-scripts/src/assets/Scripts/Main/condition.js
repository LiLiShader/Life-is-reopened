"use strict";
cc._RF.push(module, '75ba3TEUjdBPpo4CTMfmi7U', 'condition');
// Scripts/Main/condition.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_CJ = exports.DEFAULT_PROP = exports.getProp = exports.check = exports.checkParsedCondition = exports.checkLogic = exports.parseCondition = void 0;
var DEFAULT_PROP = {
    CHR: 0,
    INT: 0,
    STR: 0,
    MNY: 0,
    SPR: 0,
    LIF: 1,
    TLT: [],
    EVT: [],
    AGE: 0,
};
exports.DEFAULT_PROP = DEFAULT_PROP;
var DEFAULT_CJ = {
    TMS: 0,
    HAGE: 0,
    SUM: 0,
    HCHR: 0,
    HINT: 0,
    HSTR: 0,
    HMNY: 0,
    HSPR: 0,
    LCHR: 0,
    LINT: 0,
    LSTR: 0,
    LMNY: 0,
    LSPR: 0,
    AEVT: [],
    ATLT: [],
    ACJ: [],
};
exports.DEFAULT_CJ = DEFAULT_CJ;
function getProp(prop) {
    switch (prop) {
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
        case "ACJ": return DEFAULT_CJ[prop];
        default: return null;
    }
}
exports.getProp = getProp;
function check(condition, type) {
    if (condition == undefined) {
        if (type == "include") {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        var conditions = parseCondition(condition);
        //cc.log(condition,checkParsedCondition(conditions))
        return checkParsedCondition(conditions);
    }
}
exports.check = check;
function checkParsedCondition(conditions) {
    if (!Array.isArray(conditions))
        return checkLogic(conditions);
    if (conditions.length == 0)
        return true;
    if (conditions.length == 1)
        return checkParsedCondition(conditions[0]);
    var ret = checkParsedCondition(conditions[0]);
    for (var i = 1; i < conditions.length; i += 2) {
        switch (conditions[i]) {
            case '&':
                if (ret)
                    ret = checkParsedCondition(conditions[i + 1]);
                break;
            case '|':
                if (ret)
                    return true;
                ret = checkParsedCondition(conditions[i + 1]);
                break;
            default: return false;
        }
    }
    return ret;
}
exports.checkParsedCondition = checkParsedCondition;
function checkLogic(condition) {
    var length = condition.length;
    var i = condition.search(/[><\!\?=]/);
    var prop = condition.substring(0, i);
    var symbol = condition.substring(i, i += (condition[i + 1] == '=' ? 2 : 1));
    var d = condition.substring(i, length);
    var propData = getProp(prop);
    var conditionData = d[0] == '[' ? JSON.parse(d) : Number(d);
    switch (symbol) {
        case '>': return propData > conditionData;
        case '<': return propData < conditionData;
        case '>=': return propData >= conditionData;
        case '<=': return propData <= conditionData;
        case '=':
            if (Array.isArray(propData))
                return propData.includes(conditionData);
            return propData == conditionData;
        case '!=':
            if (Array.isArray(propData))
                return !propData.includes(conditionData);
            return propData == conditionData;
        case '?':
            if (Array.isArray(propData)) {
                for (var _i = 0, propData_1 = propData; _i < propData_1.length; _i++) {
                    var p = propData_1[_i];
                    if (conditionData.includes(p))
                        return true;
                }
                return false;
            }
            return conditionData.includes(propData);
        case '!':
            if (Array.isArray(propData)) {
                for (var _a = 0, propData_2 = propData; _a < propData_2.length; _a++) {
                    var p = propData_2[_a];
                    if (conditionData.includes(p))
                        return false;
                }
                return true;
            }
            return !conditionData.includes(propData);
        default: return false;
    }
}
exports.checkLogic = checkLogic;
function parseCondition(condition) {
    var conditions = [];
    var length = condition.length;
    var stack = [];
    stack.unshift(conditions);
    var cursor = 0;
    var catchString = function (i) {
        var str = condition.substring(cursor, i).trim();
        cursor = i;
        if (str)
            stack[0].push(str);
    };
    for (var i = 0; i < length; i++) {
        switch (condition[i]) {
            case ' ': continue;
            case '(':
                catchString(i);
                cursor++;
                var sub = [];
                stack[0].push(sub);
                stack.unshift(sub);
                break;
            case ')':
                catchString(i);
                cursor++;
                stack.shift();
                break;
            case '|':
            case '&':
                catchString(i);
                catchString(i + 1);
                break;
            default: continue;
        }
    }
    catchString(length);
    return conditions;
}
exports.parseCondition = parseCondition;

cc._RF.pop();