//稀有度颜色
const grade_0:cc.Color=cc.color(255,255,255)
const grade_1:cc.Color=cc.color(103,197,230)
const grade_2:cc.Color=cc.color(237,120,239)
const grade_3:cc.Color=cc.color(247,140,75)
const grades:cc.Color[]=[grade_0,grade_1,grade_2,grade_3]

const grade_0H:cc.Color=cc.color(0,0,0)
const grade_1H:cc.Color=cc.color(103,197,230)
const grade_2H:cc.Color=cc.color(237,120,239)
const grade_3H:cc.Color=cc.color(247,140,75)
const gradesH:cc.Color[]=[grade_0H,grade_1H,grade_2H,grade_3H]
//其他颜色
const OtherGrade_0:cc.Color=cc.color(224,102,102)//按钮红
const OtherGrade_1:cc.Color=cc.color(255,255,255)//按钮白
const OtherGrade_2:cc.Color=cc.color(0,0,0)//按钮黑

const OtherGrades:cc.Color[]=[OtherGrade_0,OtherGrade_1,OtherGrade_2]

const ADtime:number=86400

const data = {
    "CHR": [
        {"judge": "地狱", "grade": 0,"color": grade_0},
        {"min":1, "judge": "折磨", "grade": 0,"color": grade_0},
        {"min":2, "judge": "不佳", "grade": 0,"color": grade_0},
        {"min":4, "judge": "普通", "grade": 0,"color": grade_0},
        {"min":7, "judge": "优秀", "grade": 1,"color": grade_1},
        {"min":9, "judge": "罕见", "grade": 2,"color": grade_2},
        {"min":11, "judge": "逆天", "grade": 3,"color": grade_3},
    ],
    "MNY": [
        {"judge": "地狱", "grade": 0,"color": grade_0},
        {"min":1, "judge": "折磨", "grade": 0,"color": grade_0},
        {"min":2, "judge": "不佳", "grade": 0,"color": grade_0},
        {"min":4, "judge": "普通", "grade": 0,"color": grade_0},
        {"min":7, "judge": "优秀", "grade": 1,"color": grade_1},
        {"min":9, "judge": "罕见", "grade": 2,"color": grade_2},
        {"min":11, "judge": "逆天", "grade": 3,"color": grade_3},
    ],
    "SPR": [
        {"judge": "地狱", "grade": 0,"color": grade_0},
        {"min":1, "judge": "折磨", "grade": 0,"color": grade_0},
        {"min":2, "judge": "不幸", "grade": 0,"color": grade_0},
        {"min":4, "judge": "普通", "grade": 0,"color": grade_0},
        {"min":7, "judge": "幸福", "grade": 1,"color": grade_1},
        {"min":9, "judge": "极乐", "grade": 2,"color": grade_2},
        {"min":11, "judge": "天命", "grade": 3,"color": grade_3},
    ],
    "INT": [
        {"judge": "地狱", "grade": 0,"color": grade_0},
        {"min":1, "judge": "折磨", "grade": 0,"color": grade_0},
        {"min":2, "judge": "不佳", "grade": 0,"color": grade_0},
        {"min":4, "judge": "普通", "grade": 0,"color": grade_0},
        {"min":7, "judge": "优秀", "grade": 1,"color": grade_1},
        {"min":9, "judge": "罕见", "grade": 2,"color": grade_2},
        {"min":11, "judge": "逆天", "grade": 3,"color": grade_3},
        {"min":21, "judge": "识海", "grade": 3,"color": grade_3},
        {"min":131, "judge": "元神", "grade": 3,"color": grade_3},
        {"min":501, "judge": "仙魂", "grade": 3,"color": grade_3},
    ],
    "STR": [
        {"judge": "地狱", "grade": 0,"color": grade_0},
        {"min":1, "judge": "折磨", "grade": 0,"color": grade_0},
        {"min":2, "judge": "不佳", "grade": 0,"color": grade_0},
        {"min":4, "judge": "普通", "grade": 0,"color": grade_0},
        {"min":7, "judge": "优秀", "grade": 1,"color": grade_1},
        {"min":9, "judge": "罕见", "grade": 2,"color": grade_2},
        {"min":11, "judge": "逆天", "grade": 3,"color": grade_3},
        {"min":21, "judge": "凝气", "grade": 3,"color": grade_3},
        {"min":101, "judge": "筑基", "grade": 3,"color": grade_3},
        {"min":401, "judge": "金丹", "grade": 3,"color": grade_3},
        {"min":1001, "judge": "元婴", "grade": 3,"color": grade_3},
        {"min":2001, "judge": "仙体", "grade": 3,"color": grade_3},
    ],
    "AGE": [
        {"judge": "胎死腹中", "grade": 0,"color": grade_0},
        {"min":1, "judge": "早夭", "grade": 0,"color": grade_0},
        {"min":10, "judge": "少年", "grade": 0,"color": grade_0},
        {"min":18, "judge": "盛年", "grade": 0,"color": grade_0},
        {"min":40, "judge": "中年", "grade": 0,"color": grade_0},
        {"min":60, "judge": "花甲", "grade": 1,"color": grade_1},
        {"min":70, "judge": "古稀", "grade": 1,"color": grade_1},
        {"min":80, "judge": "杖朝", "grade": 2,"color": grade_2},
        {"min":90, "judge": "南山", "grade": 2,"color": grade_2},
        {"min":95, "judge": "不老", "grade": 3,"color": grade_3},
        {"min":100, "judge": "修仙", "grade": 3,"color": grade_3},
        {"min":500, "judge": "仙寿", "grade": 3,"color": grade_3},
    ],
    "SUM": [
        {"judge": "地狱", "grade": 0,"color": grade_0},
        {"min":40, "judge": "折磨", "grade": 0,"color": grade_0},
        {"min":60, "judge": "不佳", "grade": 0,"color": grade_0},
        {"min":90, "judge": "普通", "grade": 0,"color": grade_0},
        {"min":130, "judge": "优秀", "grade": 1,"color": grade_1},
        {"min":180, "judge": "罕见", "grade": 2,"color": grade_2},
        {"min":240, "judge": "逆天", "grade": 3,"color": grade_3},
        {"min":310, "judge": "传说", "grade": 3,"color": grade_3},
    ],
    "CK": [
        {"judge": "不变", "grade": 0,"color": grade_0},
        {"min":10, "judge": "二倍", "grade": 0,"color": grade_0},
        {"min":50, "judge": "三倍", "grade": 0,"color": grade_0},
        {"min":100, "judge": "四倍", "grade": 0,"color": grade_0},
        {"min":200, "judge": "五倍", "grade": 1,"color": grade_1},
        {"min":500, "judge": "六倍", "grade": 2,"color": grade_2},
    ],
    "CJ": [
        {"judge": "不变", "grade": 0,"color": grade_0},
        {"min":20, "judge": "二倍", "grade": 0,"color": grade_0},
        {"min":50, "judge": "三倍", "grade": 0,"color": grade_0},
        {"min":100, "judge": "四倍", "grade": 0,"color": grade_0},
        {"min":160, "judge": "五倍", "grade": 1,"color": grade_1},
        {"min":500, "judge": "六倍", "grade": 2,"color": grade_2},
    ]
}

function summary(type, value) {
    let length = data[type].length;
    while(length--) {
        const {min, judge, grade,color} = data[type][length];
        if(min==void 0 || value >= min) return {judge, grade,color};
    }
}

export { summary ,grades,gradesH,OtherGrades,ADtime};