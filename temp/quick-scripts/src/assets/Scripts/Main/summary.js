"use strict";
cc._RF.push(module, 'f9a63aYQyhPP5jspil0OEIO', 'summary');
// Scripts/Main/summary.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADtime = exports.OtherGrades = exports.gradesH = exports.grades = exports.summary = void 0;
//稀有度颜色
var grade_0 = cc.color(255, 255, 255);
var grade_1 = cc.color(103, 197, 230);
var grade_2 = cc.color(237, 120, 239);
var grade_3 = cc.color(247, 140, 75);
var grades = [grade_0, grade_1, grade_2, grade_3];
exports.grades = grades;
var grade_0H = cc.color(0, 0, 0);
var grade_1H = cc.color(103, 197, 230);
var grade_2H = cc.color(237, 120, 239);
var grade_3H = cc.color(247, 140, 75);
var gradesH = [grade_0H, grade_1H, grade_2H, grade_3H];
exports.gradesH = gradesH;
//其他颜色
var OtherGrade_0 = cc.color(224, 102, 102); //按钮红
var OtherGrade_1 = cc.color(255, 255, 255); //按钮白
var OtherGrade_2 = cc.color(0, 0, 0); //按钮黑
var OtherGrades = [OtherGrade_0, OtherGrade_1, OtherGrade_2];
exports.OtherGrades = OtherGrades;
var ADtime = 86400;
exports.ADtime = ADtime;
var data = {
    "CHR": [
        { "judge": "地狱", "grade": 0, "color": grade_0 },
        { "min": 1, "judge": "折磨", "grade": 0, "color": grade_0 },
        { "min": 2, "judge": "不佳", "grade": 0, "color": grade_0 },
        { "min": 4, "judge": "普通", "grade": 0, "color": grade_0 },
        { "min": 7, "judge": "优秀", "grade": 1, "color": grade_1 },
        { "min": 9, "judge": "罕见", "grade": 2, "color": grade_2 },
        { "min": 11, "judge": "逆天", "grade": 3, "color": grade_3 },
    ],
    "MNY": [
        { "judge": "地狱", "grade": 0, "color": grade_0 },
        { "min": 1, "judge": "折磨", "grade": 0, "color": grade_0 },
        { "min": 2, "judge": "不佳", "grade": 0, "color": grade_0 },
        { "min": 4, "judge": "普通", "grade": 0, "color": grade_0 },
        { "min": 7, "judge": "优秀", "grade": 1, "color": grade_1 },
        { "min": 9, "judge": "罕见", "grade": 2, "color": grade_2 },
        { "min": 11, "judge": "逆天", "grade": 3, "color": grade_3 },
    ],
    "SPR": [
        { "judge": "地狱", "grade": 0, "color": grade_0 },
        { "min": 1, "judge": "折磨", "grade": 0, "color": grade_0 },
        { "min": 2, "judge": "不幸", "grade": 0, "color": grade_0 },
        { "min": 4, "judge": "普通", "grade": 0, "color": grade_0 },
        { "min": 7, "judge": "幸福", "grade": 1, "color": grade_1 },
        { "min": 9, "judge": "极乐", "grade": 2, "color": grade_2 },
        { "min": 11, "judge": "天命", "grade": 3, "color": grade_3 },
    ],
    "INT": [
        { "judge": "地狱", "grade": 0, "color": grade_0 },
        { "min": 1, "judge": "折磨", "grade": 0, "color": grade_0 },
        { "min": 2, "judge": "不佳", "grade": 0, "color": grade_0 },
        { "min": 4, "judge": "普通", "grade": 0, "color": grade_0 },
        { "min": 7, "judge": "优秀", "grade": 1, "color": grade_1 },
        { "min": 9, "judge": "罕见", "grade": 2, "color": grade_2 },
        { "min": 11, "judge": "逆天", "grade": 3, "color": grade_3 },
        { "min": 21, "judge": "识海", "grade": 3, "color": grade_3 },
        { "min": 131, "judge": "元神", "grade": 3, "color": grade_3 },
        { "min": 501, "judge": "仙魂", "grade": 3, "color": grade_3 },
    ],
    "STR": [
        { "judge": "地狱", "grade": 0, "color": grade_0 },
        { "min": 1, "judge": "折磨", "grade": 0, "color": grade_0 },
        { "min": 2, "judge": "不佳", "grade": 0, "color": grade_0 },
        { "min": 4, "judge": "普通", "grade": 0, "color": grade_0 },
        { "min": 7, "judge": "优秀", "grade": 1, "color": grade_1 },
        { "min": 9, "judge": "罕见", "grade": 2, "color": grade_2 },
        { "min": 11, "judge": "逆天", "grade": 3, "color": grade_3 },
        { "min": 21, "judge": "凝气", "grade": 3, "color": grade_3 },
        { "min": 101, "judge": "筑基", "grade": 3, "color": grade_3 },
        { "min": 401, "judge": "金丹", "grade": 3, "color": grade_3 },
        { "min": 1001, "judge": "元婴", "grade": 3, "color": grade_3 },
        { "min": 2001, "judge": "仙体", "grade": 3, "color": grade_3 },
    ],
    "AGE": [
        { "judge": "胎死腹中", "grade": 0, "color": grade_0 },
        { "min": 1, "judge": "早夭", "grade": 0, "color": grade_0 },
        { "min": 10, "judge": "少年", "grade": 0, "color": grade_0 },
        { "min": 18, "judge": "盛年", "grade": 0, "color": grade_0 },
        { "min": 40, "judge": "中年", "grade": 0, "color": grade_0 },
        { "min": 60, "judge": "花甲", "grade": 1, "color": grade_1 },
        { "min": 70, "judge": "古稀", "grade": 1, "color": grade_1 },
        { "min": 80, "judge": "杖朝", "grade": 2, "color": grade_2 },
        { "min": 90, "judge": "南山", "grade": 2, "color": grade_2 },
        { "min": 95, "judge": "不老", "grade": 3, "color": grade_3 },
        { "min": 100, "judge": "修仙", "grade": 3, "color": grade_3 },
        { "min": 500, "judge": "仙寿", "grade": 3, "color": grade_3 },
    ],
    "SUM": [
        { "judge": "地狱", "grade": 0, "color": grade_0 },
        { "min": 40, "judge": "折磨", "grade": 0, "color": grade_0 },
        { "min": 60, "judge": "不佳", "grade": 0, "color": grade_0 },
        { "min": 90, "judge": "普通", "grade": 0, "color": grade_0 },
        { "min": 130, "judge": "优秀", "grade": 1, "color": grade_1 },
        { "min": 180, "judge": "罕见", "grade": 2, "color": grade_2 },
        { "min": 240, "judge": "逆天", "grade": 3, "color": grade_3 },
        { "min": 310, "judge": "传说", "grade": 3, "color": grade_3 },
    ],
    "CK": [
        { "judge": "不变", "grade": 0, "color": grade_0 },
        { "min": 10, "judge": "二倍", "grade": 0, "color": grade_0 },
        { "min": 50, "judge": "三倍", "grade": 0, "color": grade_0 },
        { "min": 100, "judge": "四倍", "grade": 0, "color": grade_0 },
        { "min": 200, "judge": "五倍", "grade": 1, "color": grade_1 },
        { "min": 500, "judge": "六倍", "grade": 2, "color": grade_2 },
    ],
    "CJ": [
        { "judge": "不变", "grade": 0, "color": grade_0 },
        { "min": 20, "judge": "二倍", "grade": 0, "color": grade_0 },
        { "min": 50, "judge": "三倍", "grade": 0, "color": grade_0 },
        { "min": 100, "judge": "四倍", "grade": 0, "color": grade_0 },
        { "min": 160, "judge": "五倍", "grade": 1, "color": grade_1 },
        { "min": 500, "judge": "六倍", "grade": 2, "color": grade_2 },
    ]
};
function summary(type, value) {
    var length = data[type].length;
    while (length--) {
        var _a = data[type][length], min = _a.min, judge = _a.judge, grade = _a.grade, color = _a.color;
        if (min == void 0 || value >= min)
            return { judge: judge, grade: grade, color: color };
    }
}
exports.summary = summary;

cc._RF.pop();