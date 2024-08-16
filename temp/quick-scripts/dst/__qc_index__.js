
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/Scripts/AD/AD_ROOT');
require('./assets/Scripts/AD/Global');
require('./assets/Scripts/AD/PlatformBase');
require('./assets/Scripts/AD/weChatPlatform');
require('./assets/Scripts/Main/Entry');
require('./assets/Scripts/Main/Load');
require('./assets/Scripts/Main/Main');
require('./assets/Scripts/Main/ResMgr');
require('./assets/Scripts/Main/achievement');
require('./assets/Scripts/Main/condition');
require('./assets/Scripts/Main/evenList');
require('./assets/Scripts/Main/summary');
require('./assets/Scripts/Other/Box');
require('./assets/Scripts/Other/DataBase');
require('./assets/Scripts/Other/GlobalDefine');
require('./assets/Scripts/Other/SaveUtils');
require('./assets/Scripts/Other/ScrollviewMgr');
require('./assets/Scripts/Other/UserModel');

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