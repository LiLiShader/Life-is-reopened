
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Main/ResMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd4183tPNSlEhbxgFZuo+hlH', 'ResMgr');
// Scripts/Main/ResMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResMgr = /** @class */ (function () {
    function ResMgr() {
    }
    /**
    * 加载预制体
    * @param url
    * @param callback
    */
    ResMgr.loadPrefab = function (url, callback) {
        cc.resources.load(url, cc.Prefab, function (err, prefab) {
            if (!err) {
                if (callback != null) {
                    callback(prefab);
                }
            }
        });
    };
    /**
     * 加载spine
     * @param url
     * @param skt
     * @param callback
     */
    ResMgr.loadSpine = function (url, skt, callback) {
        cc.resources.load(url, sp.SkeletonData, function (err, spData) {
            if (!err) {
                if (skt != null) {
                    skt.skeletonData = spData;
                }
                if (callback != null) {
                    callback(spData);
                }
            }
            else {
                console.log('报错；1', err);
            }
        });
    };
    /**
    * 加载text
    * @param url
    * @param callback
    */
    ResMgr.loadText = function (url, callback) {
        cc.resources.load(url, cc.JsonAsset, function (err, texData) {
            if (!err) {
                if (callback != null) {
                    callback(texData);
                }
            }
        });
    };
    /**
    * 加载dragon
    * @param url
    * @param skt
    * @param callback
    */
    ResMgr.loadDragon = function (url, skt, callback) {
        cc.resources.load(url, cc.Asset, function (err, spData) {
            if (!err) {
                if (skt != null) {
                    skt.dragonAsset = spData;
                }
                if (callback != null) {
                    callback(spData);
                }
            }
        });
    };
    ResMgr.getSpineAttachment = function (skinName, callback) {
        if (!callback) {
            return;
        }
        cc.resources.load('spine/hero/sp_wuqi', sp.SkeletonData, function (err, spData) {
            if (!err) {
                var skeletonData = spData.getRuntimeData();
                var slotIndex = skeletonData.findSlotIndex('knife1');
                var skin = skeletonData.findSkin(skinName);
                var atta = skin.getAttachment(slotIndex, 'knife1');
                callback(atta);
            }
        });
    };
    /**
     * 加载图集中的图片
     * @param url
     * @param sub
     * @param sp
     * @param callback
     */
    ResMgr.loadSpriteFrame = function (url, sub, sp, callback) {
        if (ResMgr.getCache(url)) {
            var sf = ResMgr.getCache(url).getSpriteFrame(sub);
            sp.spriteFrame = sf;
            if (callback) {
                callback(sp.spriteFrame);
            }
        }
        else {
            cc.resources.load(url, cc.SpriteAtlas, function (err, atlas) {
                if (err || !sp || !sp.isValid)
                    return;
                if (atlas) {
                    var sf = atlas.getSpriteFrame(sub);
                    if (sf) {
                        sp.spriteFrame = sf;
                        if (callback) {
                            callback(sp.spriteFrame);
                        }
                    }
                }
            }.bind(this));
        }
    };
    /**
     * 加载远程图片（微信头像）
     * @param url
     * @param sp
     * @param callback
     */
    ResMgr.loadUrl = function (url, sp, callback) {
        console.log("loadUrl~", url);
        cc.assetManager.loadRemote(url, function (err, data) {
            if (err || !data || !sp || !sp.isValid)
                return;
            sp.spriteFrame = new cc.SpriteFrame(data);
            if (callback) {
                callback(sp.spriteFrame);
            }
        }.bind(this));
    };
    /**
     * 加载图片
     * @param url
     * @param sp
     * @param callback
     */
    ResMgr.loadImage = function (url, sp, callback) {
        cc.resources.load(url, cc.SpriteFrame, function (err, lsp) {
            if (err || !lsp || !sp || !sp.isValid)
                return;
            sp.spriteFrame = lsp;
            if (callback) {
                callback(sp.spriteFrame);
            }
        }.bind(this));
    };
    /**
     * 加载图片并返回
     * @param url
     * @param callback
     */
    ResMgr.loadImageRet = function (url, callback) {
        cc.resources.load(url, cc.SpriteFrame, function (err, lsp) {
            if (err || !lsp)
                return;
            if (callback)
                callback(lsp);
        }.bind(this));
    };
    /**
     * 加载图片
     * @param url
     * @param sp
     * @param callback
     */
    ResMgr.loadImageArr = function (url, node) {
        cc.resources.load(url, cc.SpriteFrame, function (err, lsp) {
            if (err || !lsp || !node)
                return;
            node.children.forEach(function (element) {
                element.getComponent(cc.Sprite).spriteFrame = lsp;
            });
        }.bind(this));
    };
    /**
     * 加载Texture
     * @param url
     * @param sp
     * @param callback
     */
    ResMgr.loadTexture = function (url, sp, callback) {
        cc.resources.load(url, function (err, texture) {
            if (err || !texture || !sp || !sp.isValid)
                return;
            sp.texture = texture;
            if (callback) {
                callback(sp.texture);
            }
        }.bind(this));
    };
    ResMgr.loadRes = function (url, completeCallback) {
        cc.resources.load(url, completeCallback);
    };
    ResMgr.loadTypeRes = function (url, type, completeCallback) {
        cc.resources.load(url, type, completeCallback);
    };
    ResMgr.loadResArray = function (url, progressCallback, completeCallback) {
        cc.resources.load(url, progressCallback, completeCallback);
    };
    ResMgr.loadResArrayTypes = function (assets, progressCallback, completeCallback) {
        cc.assetManager.loadAny(assets, { bundle: 'resources' }, progressCallback, completeCallback);
    };
    ResMgr.load = function (resources, progressCallback, completeCallback) {
        cc.assetManager.loadRemote(resources, progressCallback, completeCallback);
    };
    ResMgr.getRes = function (url, type) {
        return cc.loader.getRes(url, type);
    };
    ResMgr.preloadResArray = function (url, type, completeCallback) {
        cc.resources.load(url[0], type[0], function () {
            var u = url.indexOf(url[0]);
            url.splice(u, 1);
            var t = type.indexOf(type[0]);
            type.splice(t, 1);
            if (type.length > 1 && url.length > 1) {
                ResMgr.preloadResArray(url, type, completeCallback);
            }
            else {
                completeCallback();
            }
        });
    };
    /**
     * 缓存资源，不释放，持有Asset引用
     * @param url
     * @param type
     */
    ResMgr.cacheRes = function (url, type) {
        this.loadTypeRes(url, type, function (err, res) {
            if (err)
                return;
            this._cache[url] = res;
        }.bind(this));
    };
    ResMgr.addCache = function (url, res) {
        this._cache[url] = res;
    };
    ResMgr.getCache = function (url) {
        return this._cache[url];
    };
    ResMgr.loadAssetsArray = function (urlArray, progressCallback, completeCallback) {
        cc.assetManager.loadAny(urlArray, { bundle: 'resources' }, progressCallback, completeCallback);
    };
    ResMgr._cache = {};
    return ResMgr;
}());
exports.default = ResMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWFpblxcUmVzTWdyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFBQTtJQThQQSxDQUFDO0lBN1BHOzs7O01BSUU7SUFDWSxpQkFBVSxHQUF4QixVQUF5QixHQUFXLEVBQUUsUUFBa0I7UUFDcEQsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxHQUFHLEVBQUUsTUFBTTtZQUNuRCxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNOLElBQUksUUFBUSxJQUFJLElBQUksRUFBRTtvQkFDbEIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNwQjthQUNKO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVyxnQkFBUyxHQUF2QixVQUF3QixHQUFXLEVBQUUsR0FBZ0IsRUFBRSxRQUFtQjtRQUN0RSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLEdBQVEsRUFBRSxNQUFXO1lBQ25FLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ04sSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO29CQUNiLEdBQUcsQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO2lCQUM3QjtnQkFDRCxJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUU7b0JBQ2xCLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDcEI7YUFDSjtpQkFBTTtnQkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQTthQUMzQjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUdEOzs7O01BSUU7SUFDWSxlQUFRLEdBQXRCLFVBQXVCLEdBQVcsRUFBRSxRQUFtQjtRQUNuRCxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFVLEdBQVEsRUFBRSxPQUFZO1lBQ2pFLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ04sSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFO29CQUNsQixRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3JCO2FBQ0o7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7TUFLRTtJQUNZLGlCQUFVLEdBQXhCLFVBQXlCLEdBQVcsRUFBRSxHQUFnQyxFQUFFLFFBQW1CO1FBQ3ZGLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLFVBQVUsR0FBUSxFQUFFLE1BQVc7WUFDNUQsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDTixJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUU7b0JBQ2IsR0FBRyxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7aUJBQzVCO2dCQUNELElBQUksUUFBUSxJQUFJLElBQUksRUFBRTtvQkFDbEIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNwQjthQUNKO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBR2EseUJBQWtCLEdBQWhDLFVBQWlDLFFBQWdCLEVBQUUsUUFBbUI7UUFDbEUsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNYLE9BQU87U0FDVjtRQUNELEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBVSxHQUFRLEVBQUUsTUFBVztZQUNwRixJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNOLElBQUksWUFBWSxHQUFHLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDM0MsSUFBSSxTQUFTLEdBQUcsWUFBWSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDckQsSUFBSSxJQUFJLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ25ELFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNsQjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNXLHNCQUFlLEdBQTdCLFVBQThCLEdBQVcsRUFBRSxHQUFXLEVBQUUsRUFBYSxFQUFFLFFBQW1CO1FBQ3RGLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN0QixJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsRCxFQUFFLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztZQUNwQixJQUFJLFFBQVEsRUFBRTtnQkFDVixRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQzVCO1NBQ0o7YUFBTTtZQUNILEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQVUsR0FBRyxFQUFFLEtBQUs7Z0JBQ3ZELElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU87b0JBQUUsT0FBTztnQkFDdEMsSUFBSSxLQUFLLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDbkMsSUFBSSxFQUFFLEVBQUU7d0JBQ0osRUFBRSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7d0JBQ3BCLElBQUksUUFBUSxFQUFFOzRCQUNWLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7eUJBQzVCO3FCQUNKO2lCQUNKO1lBQ0wsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ2pCO0lBQ0wsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ1csY0FBTyxHQUFyQixVQUFzQixHQUFXLEVBQUUsRUFBYSxFQUFFLFFBQW1CO1FBQ2pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQzVCLEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxVQUFVLEdBQUcsRUFBRSxJQUFJO1lBQy9DLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU87Z0JBQUUsT0FBTztZQUMvQyxFQUFFLENBQUMsV0FBVyxHQUFHLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQyxJQUFJLFFBQVEsRUFBRTtnQkFDVixRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQzVCO1FBQ0wsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNXLGdCQUFTLEdBQXZCLFVBQXdCLEdBQVcsRUFBRSxFQUFhLEVBQUUsUUFBbUI7UUFFbkUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBVSxHQUFHLEVBQUUsR0FBRztZQUNyRCxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPO2dCQUFFLE9BQU87WUFDOUMsRUFBRSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7WUFDckIsSUFBSSxRQUFRLEVBQUU7Z0JBRVYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUM1QjtRQUNMLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNXLG1CQUFZLEdBQTFCLFVBQTJCLEdBQVcsRUFBRSxRQUFrQjtRQUN0RCxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRSxVQUFVLEdBQUcsRUFBRSxHQUFHO1lBQ3JELElBQUksR0FBRyxJQUFJLENBQUMsR0FBRztnQkFBRSxPQUFPO1lBQ3hCLElBQUksUUFBUTtnQkFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNXLG1CQUFZLEdBQTFCLFVBQTJCLEdBQVcsRUFBRSxJQUFhO1FBQ2pELEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQVUsR0FBRyxFQUFFLEdBQUc7WUFDckQsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJO2dCQUFFLE9BQU87WUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO2dCQUN6QixPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1lBQ3RELENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNXLGtCQUFXLEdBQXpCLFVBQTBCLEdBQVcsRUFBRSxFQUFPLEVBQUUsUUFBbUI7UUFDL0QsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsR0FBRyxFQUFFLE9BQU87WUFDekMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTztnQkFBRSxPQUFPO1lBQ2xELEVBQUUsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3JCLElBQUksUUFBUSxFQUFFO2dCQUNWLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDeEI7UUFDTCxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUVhLGNBQU8sR0FBckIsVUFBc0IsR0FBVyxFQUFFLGdCQUF1RDtRQUN0RixFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRWEsa0JBQVcsR0FBekIsVUFBMEIsR0FBVyxFQUFFLElBQXFCLEVBQUUsZ0JBQXdEO1FBQ2xILEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRWEsbUJBQVksR0FBMUIsVUFBMkIsR0FBYSxFQUFFLGdCQUFpRixFQUFFLGdCQUFrRTtRQUMzTCxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBR2Esd0JBQWlCLEdBQS9CLFVBQWdDLE1BQVcsRUFBRSxnQkFBaUYsRUFBRSxnQkFBa0U7UUFDOUwsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDakcsQ0FBQztJQUVhLFdBQUksR0FBbEIsVUFBbUIsU0FBaUIsRUFBRSxnQkFBaUYsRUFBRSxnQkFBdUQ7UUFDNUssRUFBRSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVhLGFBQU0sR0FBcEIsVUFBcUIsR0FBVyxFQUFFLElBQWU7UUFDN0MsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVhLHNCQUFlLEdBQTdCLFVBQThCLEdBQWEsRUFBRSxJQUFnQixFQUFFLGdCQUFxQztRQUNoRyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQy9CLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNuQyxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQzthQUN2RDtpQkFBTTtnQkFDSCxnQkFBZ0IsRUFBRSxDQUFDO2FBQ3RCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBR0Q7Ozs7T0FJRztJQUNXLGVBQVEsR0FBdEIsVUFBdUIsR0FBVyxFQUFFLElBQXFCO1FBQ3JELElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxVQUFVLEdBQUcsRUFBRSxHQUFHO1lBQzFDLElBQUksR0FBRztnQkFBRSxPQUFPO1lBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBQ2EsZUFBUSxHQUF0QixVQUF1QixHQUFXLEVBQUUsR0FBRztRQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUMzQixDQUFDO0lBQ2EsZUFBUSxHQUF0QixVQUF1QixHQUFXO1FBQzlCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRWEsc0JBQWUsR0FBN0IsVUFBOEIsUUFBUSxFQUFFLGdCQUFpRixFQUFFLGdCQUFnRTtRQUN2TCxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUNuRyxDQUFDO0lBckJjLGFBQU0sR0FBVyxFQUFFLENBQUM7SUFzQnZDLGFBQUM7Q0E5UEQsQUE4UEMsSUFBQTtrQkE5UG9CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNNZ3Ige1xyXG4gICAgLyoqXHJcbiAgICAqIOWKoOi9vemihOWItuS9k1xyXG4gICAgKiBAcGFyYW0gdXJsIFxyXG4gICAgKiBAcGFyYW0gY2FsbGJhY2sgXHJcbiAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBsb2FkUHJlZmFiKHVybDogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCh1cmwsIGNjLlByZWZhYiwgZnVuY3Rpb24gKGVyciwgcHJlZmFiKSB7XHJcbiAgICAgICAgICAgIGlmICghZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHByZWZhYik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9vXNwaW5lXHJcbiAgICAgKiBAcGFyYW0gdXJsIFxyXG4gICAgICogQHBhcmFtIHNrdCBcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBsb2FkU3BpbmUodXJsOiBzdHJpbmcsIHNrdDogc3AuU2tlbGV0b24sIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCh1cmwsIHNwLlNrZWxldG9uRGF0YSwgZnVuY3Rpb24gKGVycjogYW55LCBzcERhdGE6IGFueSkge1xyXG4gICAgICAgICAgICBpZiAoIWVycikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNrdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2t0LnNrZWxldG9uRGF0YSA9IHNwRGF0YTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soc3BEYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmiqXplJnvvJsxJywgZXJyKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDliqDovb10ZXh0XHJcbiAgICAqIEBwYXJhbSB1cmwgXHJcbiAgICAqIEBwYXJhbSBjYWxsYmFjayBcclxuICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWRUZXh0KHVybDogc3RyaW5nLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQodXJsLCBjYy5Kc29uQXNzZXQsIGZ1bmN0aW9uIChlcnI6IGFueSwgdGV4RGF0YTogYW55KSB7XHJcbiAgICAgICAgICAgIGlmICghZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRleERhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOWKoOi9vWRyYWdvblxyXG4gICAgKiBAcGFyYW0gdXJsIFxyXG4gICAgKiBAcGFyYW0gc2t0IFxyXG4gICAgKiBAcGFyYW0gY2FsbGJhY2sgXHJcbiAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBsb2FkRHJhZ29uKHVybDogc3RyaW5nLCBza3Q6IGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSwgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkKHVybCwgY2MuQXNzZXQsIGZ1bmN0aW9uIChlcnI6IGFueSwgc3BEYXRhOiBhbnkpIHtcclxuICAgICAgICAgICAgaWYgKCFlcnIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChza3QgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNrdC5kcmFnb25Bc3NldCA9IHNwRGF0YTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soc3BEYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFNwaW5lQXR0YWNobWVudChza2luTmFtZTogc3RyaW5nLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKCFjYWxsYmFjaykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCdzcGluZS9oZXJvL3NwX3d1cWknLCBzcC5Ta2VsZXRvbkRhdGEsIGZ1bmN0aW9uIChlcnI6IGFueSwgc3BEYXRhOiBhbnkpIHtcclxuICAgICAgICAgICAgaWYgKCFlcnIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBza2VsZXRvbkRhdGEgPSBzcERhdGEuZ2V0UnVudGltZURhdGEoKTtcclxuICAgICAgICAgICAgICAgIGxldCBzbG90SW5kZXggPSBza2VsZXRvbkRhdGEuZmluZFNsb3RJbmRleCgna25pZmUxJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2tpbiA9IHNrZWxldG9uRGF0YS5maW5kU2tpbihza2luTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXR0YSA9IHNraW4uZ2V0QXR0YWNobWVudChzbG90SW5kZXgsICdrbmlmZTEnKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGF0dGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9veWbvumbhuS4reeahOWbvueJh1xyXG4gICAgICogQHBhcmFtIHVybCBcclxuICAgICAqIEBwYXJhbSBzdWIgXHJcbiAgICAgKiBAcGFyYW0gc3AgXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9hZFNwcml0ZUZyYW1lKHVybDogc3RyaW5nLCBzdWI6IHN0cmluZywgc3A6IGNjLlNwcml0ZSwgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmIChSZXNNZ3IuZ2V0Q2FjaGUodXJsKSkge1xyXG4gICAgICAgICAgICB2YXIgc2YgPSBSZXNNZ3IuZ2V0Q2FjaGUodXJsKS5nZXRTcHJpdGVGcmFtZShzdWIpO1xyXG4gICAgICAgICAgICBzcC5zcHJpdGVGcmFtZSA9IHNmO1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHNwLnNwcml0ZUZyYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLnJlc291cmNlcy5sb2FkKHVybCwgY2MuU3ByaXRlQXRsYXMsIGZ1bmN0aW9uIChlcnIsIGF0bGFzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyIHx8ICFzcCB8fCAhc3AuaXNWYWxpZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgaWYgKGF0bGFzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNmID0gYXRsYXMuZ2V0U3ByaXRlRnJhbWUoc3ViKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2YpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3Auc3ByaXRlRnJhbWUgPSBzZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhzcC5zcHJpdGVGcmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDliqDovb3ov5znqIvlm77niYfvvIjlvq7kv6HlpLTlg4/vvIlcclxuICAgICAqIEBwYXJhbSB1cmwgXHJcbiAgICAgKiBAcGFyYW0gc3AgXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9hZFVybCh1cmw6IHN0cmluZywgc3A6IGNjLlNwcml0ZSwgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibG9hZFVybH5cIiwgdXJsKVxyXG4gICAgICAgIGNjLmFzc2V0TWFuYWdlci5sb2FkUmVtb3RlKHVybCwgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZXJyIHx8ICFkYXRhIHx8ICFzcCB8fCAhc3AuaXNWYWxpZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBzcC5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZShkYXRhKTtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhzcC5zcHJpdGVGcmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDliqDovb3lm77niYdcclxuICAgICAqIEBwYXJhbSB1cmwgXHJcbiAgICAgKiBAcGFyYW0gc3AgXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9hZEltYWdlKHVybDogc3RyaW5nLCBzcDogY2MuU3ByaXRlLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQodXJsLCBjYy5TcHJpdGVGcmFtZSwgZnVuY3Rpb24gKGVyciwgbHNwKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIgfHwgIWxzcCB8fCAhc3AgfHwgIXNwLmlzVmFsaWQpIHJldHVybjtcclxuICAgICAgICAgICAgc3Auc3ByaXRlRnJhbWUgPSBsc3A7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhzcC5zcHJpdGVGcmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L295Zu+54mH5bm26L+U5ZueXHJcbiAgICAgKiBAcGFyYW0gdXJsIFxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWRJbWFnZVJldCh1cmw6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQodXJsLCBjYy5TcHJpdGVGcmFtZSwgZnVuY3Rpb24gKGVyciwgbHNwKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIgfHwgIWxzcCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGxzcCk7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9veWbvueJh1xyXG4gICAgICogQHBhcmFtIHVybCBcclxuICAgICAqIEBwYXJhbSBzcCBcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBsb2FkSW1hZ2VBcnIodXJsOiBzdHJpbmcsIG5vZGU6IGNjLk5vZGUpIHtcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCh1cmwsIGNjLlNwcml0ZUZyYW1lLCBmdW5jdGlvbiAoZXJyLCBsc3ApIHtcclxuICAgICAgICAgICAgaWYgKGVyciB8fCAhbHNwIHx8ICFub2RlKSByZXR1cm47XHJcbiAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBsc3A7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliqDovb1UZXh0dXJlXHJcbiAgICAgKiBAcGFyYW0gdXJsIFxyXG4gICAgICogQHBhcmFtIHNwIFxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWRUZXh0dXJlKHVybDogc3RyaW5nLCBzcDogYW55LCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQodXJsLCBmdW5jdGlvbiAoZXJyLCB0ZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIgfHwgIXRleHR1cmUgfHwgIXNwIHx8ICFzcC5pc1ZhbGlkKSByZXR1cm47XHJcbiAgICAgICAgICAgIHNwLnRleHR1cmUgPSB0ZXh0dXJlO1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHNwLnRleHR1cmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWRSZXModXJsOiBzdHJpbmcsIGNvbXBsZXRlQ2FsbGJhY2s6IChlcnJvcjogRXJyb3IsIHJlc291cmNlOiBhbnkpID0+IHZvaWQpIHtcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCh1cmwsIGNvbXBsZXRlQ2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9hZFR5cGVSZXModXJsOiBzdHJpbmcsIHR5cGU6IHR5cGVvZiBjYy5Bc3NldCwgY29tcGxldGVDYWxsYmFjaz86IChlcnJvcjogRXJyb3IsIHJlc291cmNlOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCh1cmwsIHR5cGUsIGNvbXBsZXRlQ2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9hZFJlc0FycmF5KHVybDogc3RyaW5nW10sIHByb2dyZXNzQ2FsbGJhY2s6IChjb21wbGV0ZWRDb3VudDogbnVtYmVyLCB0b3RhbENvdW50OiBudW1iZXIsIGl0ZW06IGFueSkgPT4gdm9pZCwgY29tcGxldGVDYWxsYmFjazogKChlcnJvcjogRXJyb3IsIHJlc291cmNlOiBhbnlbXSkgPT4gdm9pZCkgfCBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQodXJsLCBwcm9ncmVzc0NhbGxiYWNrLCBjb21wbGV0ZUNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBsb2FkUmVzQXJyYXlUeXBlcyhhc3NldHM6IGFueSwgcHJvZ3Jlc3NDYWxsYmFjazogKGNvbXBsZXRlZENvdW50OiBudW1iZXIsIHRvdGFsQ291bnQ6IG51bWJlciwgaXRlbTogYW55KSA9PiB2b2lkLCBjb21wbGV0ZUNhbGxiYWNrOiAoKGVycm9yOiBFcnJvciwgcmVzb3VyY2U6IGFueVtdKSA9PiB2b2lkKSB8IG51bGwpOiB2b2lkIHtcclxuICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZEFueShhc3NldHMsIHsgYnVuZGxlOiAncmVzb3VyY2VzJyB9LCBwcm9ncmVzc0NhbGxiYWNrLCBjb21wbGV0ZUNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWQocmVzb3VyY2VzOiBzdHJpbmcsIHByb2dyZXNzQ2FsbGJhY2s6IChjb21wbGV0ZWRDb3VudDogbnVtYmVyLCB0b3RhbENvdW50OiBudW1iZXIsIGl0ZW06IGFueSkgPT4gdm9pZCwgY29tcGxldGVDYWxsYmFjazogKGVycjogRXJyb3IsIGFzc2V0OiBjYy5Bc3NldCkgPT4gdm9pZCkge1xyXG4gICAgICAgIGNjLmFzc2V0TWFuYWdlci5sb2FkUmVtb3RlKHJlc291cmNlcywgcHJvZ3Jlc3NDYWxsYmFjaywgY29tcGxldGVDYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRSZXModXJsOiBzdHJpbmcsIHR5cGU/OiBGdW5jdGlvbik6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIGNjLmxvYWRlci5nZXRSZXModXJsLCB0eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHByZWxvYWRSZXNBcnJheSh1cmw6IHN0cmluZ1tdLCB0eXBlOiBBcnJheTxhbnk+LCBjb21wbGV0ZUNhbGxiYWNrOiAoKCkgPT4gdm9pZCkgfCBudWxsKSB7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQodXJsWzBdLCB0eXBlWzBdLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB1ID0gdXJsLmluZGV4T2YodXJsWzBdKTtcclxuICAgICAgICAgICAgdXJsLnNwbGljZSh1LCAxKTtcclxuICAgICAgICAgICAgbGV0IHQgPSB0eXBlLmluZGV4T2YodHlwZVswXSk7XHJcbiAgICAgICAgICAgIHR5cGUuc3BsaWNlKHQsIDEpO1xyXG4gICAgICAgICAgICBpZiAodHlwZS5sZW5ndGggPiAxICYmIHVybC5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBSZXNNZ3IucHJlbG9hZFJlc0FycmF5KHVybCwgdHlwZSwgY29tcGxldGVDYWxsYmFjayk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZUNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfY2FjaGU6IE9iamVjdCA9IHt9O1xyXG4gICAgLyoqXHJcbiAgICAgKiDnvJPlrZjotYTmupDvvIzkuI3ph4rmlL7vvIzmjIHmnIlBc3NldOW8leeUqFxyXG4gICAgICogQHBhcmFtIHVybCBcclxuICAgICAqIEBwYXJhbSB0eXBlIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNhY2hlUmVzKHVybDogc3RyaW5nLCB0eXBlOiB0eXBlb2YgY2MuQXNzZXQpIHtcclxuICAgICAgICB0aGlzLmxvYWRUeXBlUmVzKHVybCwgdHlwZSwgZnVuY3Rpb24gKGVyciwgcmVzKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5fY2FjaGVbdXJsXSA9IHJlcztcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBhZGRDYWNoZSh1cmw6IHN0cmluZywgcmVzKSB7XHJcbiAgICAgICAgdGhpcy5fY2FjaGVbdXJsXSA9IHJlcztcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q2FjaGUodXJsOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2FjaGVbdXJsXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWRBc3NldHNBcnJheSh1cmxBcnJheSwgcHJvZ3Jlc3NDYWxsYmFjazogKGNvbXBsZXRlZENvdW50OiBudW1iZXIsIHRvdGFsQ291bnQ6IG51bWJlciwgaXRlbTogYW55KSA9PiB2b2lkLCBjb21wbGV0ZUNhbGxiYWNrOiAoKGVycm9yOiBFcnJvciwgcmVzb3VyY2U6IGFueSkgPT4gdm9pZCkgfCBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRBbnkodXJsQXJyYXksIHsgYnVuZGxlOiAncmVzb3VyY2VzJyB9LCBwcm9ncmVzc0NhbGxiYWNrLCBjb21wbGV0ZUNhbGxiYWNrKTtcclxuICAgIH1cclxufVxyXG4iXX0=