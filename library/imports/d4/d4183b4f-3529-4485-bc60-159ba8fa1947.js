"use strict";
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