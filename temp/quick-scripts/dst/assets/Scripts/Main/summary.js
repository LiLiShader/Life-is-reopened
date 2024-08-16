
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Main/summary.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWFpblxcc3VtbWFyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPO0FBQ1AsSUFBTSxPQUFPLEdBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQzVDLElBQU0sT0FBTyxHQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQTtBQUM1QyxJQUFNLE9BQU8sR0FBVSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUE7QUFDNUMsSUFBTSxPQUFPLEdBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQzNDLElBQU0sTUFBTSxHQUFZLENBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxDQUFDLENBQUE7QUF3SHZDLHdCQUFNO0FBdEh4QixJQUFNLFFBQVEsR0FBVSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7QUFDdkMsSUFBTSxRQUFRLEdBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQzdDLElBQU0sUUFBUSxHQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQTtBQUM3QyxJQUFNLFFBQVEsR0FBVSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLENBQUE7QUFDNUMsSUFBTSxPQUFPLEdBQVksQ0FBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxRQUFRLENBQUMsQ0FBQTtBQWtIckMsMEJBQU87QUFqSGhDLE1BQU07QUFDTixJQUFNLFlBQVksR0FBVSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQSxLQUFLO0FBQ3RELElBQU0sWUFBWSxHQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQSxDQUFBLEtBQUs7QUFDdEQsSUFBTSxZQUFZLEdBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLENBQUEsS0FBSztBQUVoRCxJQUFNLFdBQVcsR0FBWSxDQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsWUFBWSxDQUFDLENBQUE7QUE0R3BDLGtDQUFXO0FBMUc1QyxJQUFNLE1BQU0sR0FBUSxLQUFLLENBQUE7QUEwR29CLHdCQUFNO0FBeEduRCxJQUFNLElBQUksR0FBRztJQUNULEtBQUssRUFBRTtRQUNILEVBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDNUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3JELEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUNyRCxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDckQsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3JELEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUNyRCxFQUFDLEtBQUssRUFBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7S0FDekQ7SUFDRCxLQUFLLEVBQUU7UUFDSCxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQzVDLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUNyRCxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDckQsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3JELEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUNyRCxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDckQsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO0tBQ3pEO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUM1QyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDckQsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3JELEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUNyRCxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDckQsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3JELEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztLQUN6RDtJQUNELEtBQUssRUFBRTtRQUNILEVBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDNUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3JELEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUNyRCxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDckQsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3JELEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUNyRCxFQUFDLEtBQUssRUFBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDdEQsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3RELEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUN2RCxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7S0FDMUQ7SUFDRCxLQUFLLEVBQUU7UUFDSCxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQzVDLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUNyRCxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDckQsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3JELEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUNyRCxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDckQsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3RELEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUN0RCxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDdkQsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3ZELEVBQUMsS0FBSyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUN4RCxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7S0FDM0Q7SUFDRCxLQUFLLEVBQUU7UUFDSCxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQzlDLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUNyRCxFQUFDLEtBQUssRUFBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDdEQsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3RELEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUN0RCxFQUFDLEtBQUssRUFBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDdEQsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3RELEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUN0RCxFQUFDLEtBQUssRUFBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDdEQsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3RELEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUN2RCxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7S0FDMUQ7SUFDRCxLQUFLLEVBQUU7UUFDSCxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQzVDLEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUN0RCxFQUFDLEtBQUssRUFBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDdEQsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3RELEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUN2RCxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDdkQsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3ZELEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztLQUMxRDtJQUNELElBQUksRUFBRTtRQUNGLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDNUMsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3RELEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUN0RCxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDdkQsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3ZELEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztLQUMxRDtJQUNELElBQUksRUFBRTtRQUNGLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDNUMsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3RELEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztRQUN0RCxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7UUFDdkQsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDO1FBQ3ZELEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQztLQUMxRDtDQUNKLENBQUE7QUFFRCxTQUFTLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSztJQUN4QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQy9CLE9BQU0sTUFBTSxFQUFFLEVBQUU7UUFDTixJQUFBLEtBQTRCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBN0MsR0FBRyxTQUFBLEVBQUUsS0FBSyxXQUFBLEVBQUUsS0FBSyxXQUFBLEVBQUMsS0FBSyxXQUFzQixDQUFDO1FBQ3JELElBQUcsR0FBRyxJQUFFLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxHQUFHO1lBQUUsT0FBTyxFQUFDLEtBQUssT0FBQSxFQUFFLEtBQUssT0FBQSxFQUFDLEtBQUssT0FBQSxFQUFDLENBQUM7S0FDL0Q7QUFDTCxDQUFDO0FBRVEsMEJBQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvL+eogOacieW6puminOiJslxyXG5jb25zdCBncmFkZV8wOmNjLkNvbG9yPWNjLmNvbG9yKDI1NSwyNTUsMjU1KVxyXG5jb25zdCBncmFkZV8xOmNjLkNvbG9yPWNjLmNvbG9yKDEwMywxOTcsMjMwKVxyXG5jb25zdCBncmFkZV8yOmNjLkNvbG9yPWNjLmNvbG9yKDIzNywxMjAsMjM5KVxyXG5jb25zdCBncmFkZV8zOmNjLkNvbG9yPWNjLmNvbG9yKDI0NywxNDAsNzUpXHJcbmNvbnN0IGdyYWRlczpjYy5Db2xvcltdPVtncmFkZV8wLGdyYWRlXzEsZ3JhZGVfMixncmFkZV8zXVxyXG5cclxuY29uc3QgZ3JhZGVfMEg6Y2MuQ29sb3I9Y2MuY29sb3IoMCwwLDApXHJcbmNvbnN0IGdyYWRlXzFIOmNjLkNvbG9yPWNjLmNvbG9yKDEwMywxOTcsMjMwKVxyXG5jb25zdCBncmFkZV8ySDpjYy5Db2xvcj1jYy5jb2xvcigyMzcsMTIwLDIzOSlcclxuY29uc3QgZ3JhZGVfM0g6Y2MuQ29sb3I9Y2MuY29sb3IoMjQ3LDE0MCw3NSlcclxuY29uc3QgZ3JhZGVzSDpjYy5Db2xvcltdPVtncmFkZV8wSCxncmFkZV8xSCxncmFkZV8ySCxncmFkZV8zSF1cclxuLy/lhbbku5bpopzoibJcclxuY29uc3QgT3RoZXJHcmFkZV8wOmNjLkNvbG9yPWNjLmNvbG9yKDIyNCwxMDIsMTAyKS8v5oyJ6ZKu57qiXHJcbmNvbnN0IE90aGVyR3JhZGVfMTpjYy5Db2xvcj1jYy5jb2xvcigyNTUsMjU1LDI1NSkvL+aMiemSrueZvVxyXG5jb25zdCBPdGhlckdyYWRlXzI6Y2MuQ29sb3I9Y2MuY29sb3IoMCwwLDApLy/mjInpkq7pu5FcclxuXHJcbmNvbnN0IE90aGVyR3JhZGVzOmNjLkNvbG9yW109W090aGVyR3JhZGVfMCxPdGhlckdyYWRlXzEsT3RoZXJHcmFkZV8yXVxyXG5cclxuY29uc3QgQUR0aW1lOm51bWJlcj04NjQwMFxyXG5cclxuY29uc3QgZGF0YSA9IHtcclxuICAgIFwiQ0hSXCI6IFtcclxuICAgICAgICB7XCJqdWRnZVwiOiBcIuWcsOeLsVwiLCBcImdyYWRlXCI6IDAsXCJjb2xvclwiOiBncmFkZV8wfSxcclxuICAgICAgICB7XCJtaW5cIjoxLCBcImp1ZGdlXCI6IFwi5oqY56OoXCIsIFwiZ3JhZGVcIjogMCxcImNvbG9yXCI6IGdyYWRlXzB9LFxyXG4gICAgICAgIHtcIm1pblwiOjIsIFwianVkZ2VcIjogXCLkuI3kvbNcIiwgXCJncmFkZVwiOiAwLFwiY29sb3JcIjogZ3JhZGVfMH0sXHJcbiAgICAgICAge1wibWluXCI6NCwgXCJqdWRnZVwiOiBcIuaZrumAmlwiLCBcImdyYWRlXCI6IDAsXCJjb2xvclwiOiBncmFkZV8wfSxcclxuICAgICAgICB7XCJtaW5cIjo3LCBcImp1ZGdlXCI6IFwi5LyY56eAXCIsIFwiZ3JhZGVcIjogMSxcImNvbG9yXCI6IGdyYWRlXzF9LFxyXG4gICAgICAgIHtcIm1pblwiOjksIFwianVkZ2VcIjogXCLnvZXop4FcIiwgXCJncmFkZVwiOiAyLFwiY29sb3JcIjogZ3JhZGVfMn0sXHJcbiAgICAgICAge1wibWluXCI6MTEsIFwianVkZ2VcIjogXCLpgIblpKlcIiwgXCJncmFkZVwiOiAzLFwiY29sb3JcIjogZ3JhZGVfM30sXHJcbiAgICBdLFxyXG4gICAgXCJNTllcIjogW1xyXG4gICAgICAgIHtcImp1ZGdlXCI6IFwi5Zyw54uxXCIsIFwiZ3JhZGVcIjogMCxcImNvbG9yXCI6IGdyYWRlXzB9LFxyXG4gICAgICAgIHtcIm1pblwiOjEsIFwianVkZ2VcIjogXCLmipjno6hcIiwgXCJncmFkZVwiOiAwLFwiY29sb3JcIjogZ3JhZGVfMH0sXHJcbiAgICAgICAge1wibWluXCI6MiwgXCJqdWRnZVwiOiBcIuS4jeS9s1wiLCBcImdyYWRlXCI6IDAsXCJjb2xvclwiOiBncmFkZV8wfSxcclxuICAgICAgICB7XCJtaW5cIjo0LCBcImp1ZGdlXCI6IFwi5pmu6YCaXCIsIFwiZ3JhZGVcIjogMCxcImNvbG9yXCI6IGdyYWRlXzB9LFxyXG4gICAgICAgIHtcIm1pblwiOjcsIFwianVkZ2VcIjogXCLkvJjnp4BcIiwgXCJncmFkZVwiOiAxLFwiY29sb3JcIjogZ3JhZGVfMX0sXHJcbiAgICAgICAge1wibWluXCI6OSwgXCJqdWRnZVwiOiBcIue9leingVwiLCBcImdyYWRlXCI6IDIsXCJjb2xvclwiOiBncmFkZV8yfSxcclxuICAgICAgICB7XCJtaW5cIjoxMSwgXCJqdWRnZVwiOiBcIumAhuWkqVwiLCBcImdyYWRlXCI6IDMsXCJjb2xvclwiOiBncmFkZV8zfSxcclxuICAgIF0sXHJcbiAgICBcIlNQUlwiOiBbXHJcbiAgICAgICAge1wianVkZ2VcIjogXCLlnLDni7FcIiwgXCJncmFkZVwiOiAwLFwiY29sb3JcIjogZ3JhZGVfMH0sXHJcbiAgICAgICAge1wibWluXCI6MSwgXCJqdWRnZVwiOiBcIuaKmOejqFwiLCBcImdyYWRlXCI6IDAsXCJjb2xvclwiOiBncmFkZV8wfSxcclxuICAgICAgICB7XCJtaW5cIjoyLCBcImp1ZGdlXCI6IFwi5LiN5bm4XCIsIFwiZ3JhZGVcIjogMCxcImNvbG9yXCI6IGdyYWRlXzB9LFxyXG4gICAgICAgIHtcIm1pblwiOjQsIFwianVkZ2VcIjogXCLmma7pgJpcIiwgXCJncmFkZVwiOiAwLFwiY29sb3JcIjogZ3JhZGVfMH0sXHJcbiAgICAgICAge1wibWluXCI6NywgXCJqdWRnZVwiOiBcIuW5uOemj1wiLCBcImdyYWRlXCI6IDEsXCJjb2xvclwiOiBncmFkZV8xfSxcclxuICAgICAgICB7XCJtaW5cIjo5LCBcImp1ZGdlXCI6IFwi5p6B5LmQXCIsIFwiZ3JhZGVcIjogMixcImNvbG9yXCI6IGdyYWRlXzJ9LFxyXG4gICAgICAgIHtcIm1pblwiOjExLCBcImp1ZGdlXCI6IFwi5aSp5ZG9XCIsIFwiZ3JhZGVcIjogMyxcImNvbG9yXCI6IGdyYWRlXzN9LFxyXG4gICAgXSxcclxuICAgIFwiSU5UXCI6IFtcclxuICAgICAgICB7XCJqdWRnZVwiOiBcIuWcsOeLsVwiLCBcImdyYWRlXCI6IDAsXCJjb2xvclwiOiBncmFkZV8wfSxcclxuICAgICAgICB7XCJtaW5cIjoxLCBcImp1ZGdlXCI6IFwi5oqY56OoXCIsIFwiZ3JhZGVcIjogMCxcImNvbG9yXCI6IGdyYWRlXzB9LFxyXG4gICAgICAgIHtcIm1pblwiOjIsIFwianVkZ2VcIjogXCLkuI3kvbNcIiwgXCJncmFkZVwiOiAwLFwiY29sb3JcIjogZ3JhZGVfMH0sXHJcbiAgICAgICAge1wibWluXCI6NCwgXCJqdWRnZVwiOiBcIuaZrumAmlwiLCBcImdyYWRlXCI6IDAsXCJjb2xvclwiOiBncmFkZV8wfSxcclxuICAgICAgICB7XCJtaW5cIjo3LCBcImp1ZGdlXCI6IFwi5LyY56eAXCIsIFwiZ3JhZGVcIjogMSxcImNvbG9yXCI6IGdyYWRlXzF9LFxyXG4gICAgICAgIHtcIm1pblwiOjksIFwianVkZ2VcIjogXCLnvZXop4FcIiwgXCJncmFkZVwiOiAyLFwiY29sb3JcIjogZ3JhZGVfMn0sXHJcbiAgICAgICAge1wibWluXCI6MTEsIFwianVkZ2VcIjogXCLpgIblpKlcIiwgXCJncmFkZVwiOiAzLFwiY29sb3JcIjogZ3JhZGVfM30sXHJcbiAgICAgICAge1wibWluXCI6MjEsIFwianVkZ2VcIjogXCLor4bmtbdcIiwgXCJncmFkZVwiOiAzLFwiY29sb3JcIjogZ3JhZGVfM30sXHJcbiAgICAgICAge1wibWluXCI6MTMxLCBcImp1ZGdlXCI6IFwi5YWD56WeXCIsIFwiZ3JhZGVcIjogMyxcImNvbG9yXCI6IGdyYWRlXzN9LFxyXG4gICAgICAgIHtcIm1pblwiOjUwMSwgXCJqdWRnZVwiOiBcIuS7memtglwiLCBcImdyYWRlXCI6IDMsXCJjb2xvclwiOiBncmFkZV8zfSxcclxuICAgIF0sXHJcbiAgICBcIlNUUlwiOiBbXHJcbiAgICAgICAge1wianVkZ2VcIjogXCLlnLDni7FcIiwgXCJncmFkZVwiOiAwLFwiY29sb3JcIjogZ3JhZGVfMH0sXHJcbiAgICAgICAge1wibWluXCI6MSwgXCJqdWRnZVwiOiBcIuaKmOejqFwiLCBcImdyYWRlXCI6IDAsXCJjb2xvclwiOiBncmFkZV8wfSxcclxuICAgICAgICB7XCJtaW5cIjoyLCBcImp1ZGdlXCI6IFwi5LiN5L2zXCIsIFwiZ3JhZGVcIjogMCxcImNvbG9yXCI6IGdyYWRlXzB9LFxyXG4gICAgICAgIHtcIm1pblwiOjQsIFwianVkZ2VcIjogXCLmma7pgJpcIiwgXCJncmFkZVwiOiAwLFwiY29sb3JcIjogZ3JhZGVfMH0sXHJcbiAgICAgICAge1wibWluXCI6NywgXCJqdWRnZVwiOiBcIuS8mOengFwiLCBcImdyYWRlXCI6IDEsXCJjb2xvclwiOiBncmFkZV8xfSxcclxuICAgICAgICB7XCJtaW5cIjo5LCBcImp1ZGdlXCI6IFwi572V6KeBXCIsIFwiZ3JhZGVcIjogMixcImNvbG9yXCI6IGdyYWRlXzJ9LFxyXG4gICAgICAgIHtcIm1pblwiOjExLCBcImp1ZGdlXCI6IFwi6YCG5aSpXCIsIFwiZ3JhZGVcIjogMyxcImNvbG9yXCI6IGdyYWRlXzN9LFxyXG4gICAgICAgIHtcIm1pblwiOjIxLCBcImp1ZGdlXCI6IFwi5Yed5rCUXCIsIFwiZ3JhZGVcIjogMyxcImNvbG9yXCI6IGdyYWRlXzN9LFxyXG4gICAgICAgIHtcIm1pblwiOjEwMSwgXCJqdWRnZVwiOiBcIuetkeWfulwiLCBcImdyYWRlXCI6IDMsXCJjb2xvclwiOiBncmFkZV8zfSxcclxuICAgICAgICB7XCJtaW5cIjo0MDEsIFwianVkZ2VcIjogXCLph5HkuLlcIiwgXCJncmFkZVwiOiAzLFwiY29sb3JcIjogZ3JhZGVfM30sXHJcbiAgICAgICAge1wibWluXCI6MTAwMSwgXCJqdWRnZVwiOiBcIuWFg+WptFwiLCBcImdyYWRlXCI6IDMsXCJjb2xvclwiOiBncmFkZV8zfSxcclxuICAgICAgICB7XCJtaW5cIjoyMDAxLCBcImp1ZGdlXCI6IFwi5LuZ5L2TXCIsIFwiZ3JhZGVcIjogMyxcImNvbG9yXCI6IGdyYWRlXzN9LFxyXG4gICAgXSxcclxuICAgIFwiQUdFXCI6IFtcclxuICAgICAgICB7XCJqdWRnZVwiOiBcIuiDjuatu+iFueS4rVwiLCBcImdyYWRlXCI6IDAsXCJjb2xvclwiOiBncmFkZV8wfSxcclxuICAgICAgICB7XCJtaW5cIjoxLCBcImp1ZGdlXCI6IFwi5pep5aStXCIsIFwiZ3JhZGVcIjogMCxcImNvbG9yXCI6IGdyYWRlXzB9LFxyXG4gICAgICAgIHtcIm1pblwiOjEwLCBcImp1ZGdlXCI6IFwi5bCR5bm0XCIsIFwiZ3JhZGVcIjogMCxcImNvbG9yXCI6IGdyYWRlXzB9LFxyXG4gICAgICAgIHtcIm1pblwiOjE4LCBcImp1ZGdlXCI6IFwi55ub5bm0XCIsIFwiZ3JhZGVcIjogMCxcImNvbG9yXCI6IGdyYWRlXzB9LFxyXG4gICAgICAgIHtcIm1pblwiOjQwLCBcImp1ZGdlXCI6IFwi5Lit5bm0XCIsIFwiZ3JhZGVcIjogMCxcImNvbG9yXCI6IGdyYWRlXzB9LFxyXG4gICAgICAgIHtcIm1pblwiOjYwLCBcImp1ZGdlXCI6IFwi6Iqx55SyXCIsIFwiZ3JhZGVcIjogMSxcImNvbG9yXCI6IGdyYWRlXzF9LFxyXG4gICAgICAgIHtcIm1pblwiOjcwLCBcImp1ZGdlXCI6IFwi5Y+k56iAXCIsIFwiZ3JhZGVcIjogMSxcImNvbG9yXCI6IGdyYWRlXzF9LFxyXG4gICAgICAgIHtcIm1pblwiOjgwLCBcImp1ZGdlXCI6IFwi5p2W5pydXCIsIFwiZ3JhZGVcIjogMixcImNvbG9yXCI6IGdyYWRlXzJ9LFxyXG4gICAgICAgIHtcIm1pblwiOjkwLCBcImp1ZGdlXCI6IFwi5Y2X5bGxXCIsIFwiZ3JhZGVcIjogMixcImNvbG9yXCI6IGdyYWRlXzJ9LFxyXG4gICAgICAgIHtcIm1pblwiOjk1LCBcImp1ZGdlXCI6IFwi5LiN6ICBXCIsIFwiZ3JhZGVcIjogMyxcImNvbG9yXCI6IGdyYWRlXzN9LFxyXG4gICAgICAgIHtcIm1pblwiOjEwMCwgXCJqdWRnZVwiOiBcIuS/ruS7mVwiLCBcImdyYWRlXCI6IDMsXCJjb2xvclwiOiBncmFkZV8zfSxcclxuICAgICAgICB7XCJtaW5cIjo1MDAsIFwianVkZ2VcIjogXCLku5nlr79cIiwgXCJncmFkZVwiOiAzLFwiY29sb3JcIjogZ3JhZGVfM30sXHJcbiAgICBdLFxyXG4gICAgXCJTVU1cIjogW1xyXG4gICAgICAgIHtcImp1ZGdlXCI6IFwi5Zyw54uxXCIsIFwiZ3JhZGVcIjogMCxcImNvbG9yXCI6IGdyYWRlXzB9LFxyXG4gICAgICAgIHtcIm1pblwiOjQwLCBcImp1ZGdlXCI6IFwi5oqY56OoXCIsIFwiZ3JhZGVcIjogMCxcImNvbG9yXCI6IGdyYWRlXzB9LFxyXG4gICAgICAgIHtcIm1pblwiOjYwLCBcImp1ZGdlXCI6IFwi5LiN5L2zXCIsIFwiZ3JhZGVcIjogMCxcImNvbG9yXCI6IGdyYWRlXzB9LFxyXG4gICAgICAgIHtcIm1pblwiOjkwLCBcImp1ZGdlXCI6IFwi5pmu6YCaXCIsIFwiZ3JhZGVcIjogMCxcImNvbG9yXCI6IGdyYWRlXzB9LFxyXG4gICAgICAgIHtcIm1pblwiOjEzMCwgXCJqdWRnZVwiOiBcIuS8mOengFwiLCBcImdyYWRlXCI6IDEsXCJjb2xvclwiOiBncmFkZV8xfSxcclxuICAgICAgICB7XCJtaW5cIjoxODAsIFwianVkZ2VcIjogXCLnvZXop4FcIiwgXCJncmFkZVwiOiAyLFwiY29sb3JcIjogZ3JhZGVfMn0sXHJcbiAgICAgICAge1wibWluXCI6MjQwLCBcImp1ZGdlXCI6IFwi6YCG5aSpXCIsIFwiZ3JhZGVcIjogMyxcImNvbG9yXCI6IGdyYWRlXzN9LFxyXG4gICAgICAgIHtcIm1pblwiOjMxMCwgXCJqdWRnZVwiOiBcIuS8oOivtFwiLCBcImdyYWRlXCI6IDMsXCJjb2xvclwiOiBncmFkZV8zfSxcclxuICAgIF0sXHJcbiAgICBcIkNLXCI6IFtcclxuICAgICAgICB7XCJqdWRnZVwiOiBcIuS4jeWPmFwiLCBcImdyYWRlXCI6IDAsXCJjb2xvclwiOiBncmFkZV8wfSxcclxuICAgICAgICB7XCJtaW5cIjoxMCwgXCJqdWRnZVwiOiBcIuS6jOWAjVwiLCBcImdyYWRlXCI6IDAsXCJjb2xvclwiOiBncmFkZV8wfSxcclxuICAgICAgICB7XCJtaW5cIjo1MCwgXCJqdWRnZVwiOiBcIuS4ieWAjVwiLCBcImdyYWRlXCI6IDAsXCJjb2xvclwiOiBncmFkZV8wfSxcclxuICAgICAgICB7XCJtaW5cIjoxMDAsIFwianVkZ2VcIjogXCLlm5vlgI1cIiwgXCJncmFkZVwiOiAwLFwiY29sb3JcIjogZ3JhZGVfMH0sXHJcbiAgICAgICAge1wibWluXCI6MjAwLCBcImp1ZGdlXCI6IFwi5LqU5YCNXCIsIFwiZ3JhZGVcIjogMSxcImNvbG9yXCI6IGdyYWRlXzF9LFxyXG4gICAgICAgIHtcIm1pblwiOjUwMCwgXCJqdWRnZVwiOiBcIuWFreWAjVwiLCBcImdyYWRlXCI6IDIsXCJjb2xvclwiOiBncmFkZV8yfSxcclxuICAgIF0sXHJcbiAgICBcIkNKXCI6IFtcclxuICAgICAgICB7XCJqdWRnZVwiOiBcIuS4jeWPmFwiLCBcImdyYWRlXCI6IDAsXCJjb2xvclwiOiBncmFkZV8wfSxcclxuICAgICAgICB7XCJtaW5cIjoyMCwgXCJqdWRnZVwiOiBcIuS6jOWAjVwiLCBcImdyYWRlXCI6IDAsXCJjb2xvclwiOiBncmFkZV8wfSxcclxuICAgICAgICB7XCJtaW5cIjo1MCwgXCJqdWRnZVwiOiBcIuS4ieWAjVwiLCBcImdyYWRlXCI6IDAsXCJjb2xvclwiOiBncmFkZV8wfSxcclxuICAgICAgICB7XCJtaW5cIjoxMDAsIFwianVkZ2VcIjogXCLlm5vlgI1cIiwgXCJncmFkZVwiOiAwLFwiY29sb3JcIjogZ3JhZGVfMH0sXHJcbiAgICAgICAge1wibWluXCI6MTYwLCBcImp1ZGdlXCI6IFwi5LqU5YCNXCIsIFwiZ3JhZGVcIjogMSxcImNvbG9yXCI6IGdyYWRlXzF9LFxyXG4gICAgICAgIHtcIm1pblwiOjUwMCwgXCJqdWRnZVwiOiBcIuWFreWAjVwiLCBcImdyYWRlXCI6IDIsXCJjb2xvclwiOiBncmFkZV8yfSxcclxuICAgIF1cclxufVxyXG5cclxuZnVuY3Rpb24gc3VtbWFyeSh0eXBlLCB2YWx1ZSkge1xyXG4gICAgbGV0IGxlbmd0aCA9IGRhdGFbdHlwZV0ubGVuZ3RoO1xyXG4gICAgd2hpbGUobGVuZ3RoLS0pIHtcclxuICAgICAgICBjb25zdCB7bWluLCBqdWRnZSwgZ3JhZGUsY29sb3J9ID0gZGF0YVt0eXBlXVtsZW5ndGhdO1xyXG4gICAgICAgIGlmKG1pbj09dm9pZCAwIHx8IHZhbHVlID49IG1pbikgcmV0dXJuIHtqdWRnZSwgZ3JhZGUsY29sb3J9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBzdW1tYXJ5ICxncmFkZXMsZ3JhZGVzSCxPdGhlckdyYWRlcyxBRHRpbWV9OyJdfQ==