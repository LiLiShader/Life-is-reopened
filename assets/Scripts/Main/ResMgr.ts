export default class ResMgr {
    /**
    * 加载预制体
    * @param url 
    * @param callback 
    */
    public static loadPrefab(url: string, callback: Function) {
        cc.resources.load(url, cc.Prefab, function (err, prefab) {
            if (!err) {
                if (callback != null) {
                    callback(prefab);
                }
            }
        });
    }

    /**
     * 加载spine
     * @param url 
     * @param skt 
     * @param callback 
     */
    public static loadSpine(url: string, skt: sp.Skeleton, callback?: Function) {
        cc.resources.load(url, sp.SkeletonData, function (err: any, spData: any) {
            if (!err) {
                if (skt != null) {
                    skt.skeletonData = spData;
                }
                if (callback != null) {
                    callback(spData);
                }
            } else {
                console.log('报错；1', err)
            }
        });
    }


    /**
    * 加载text
    * @param url 
    * @param callback 
    */
    public static loadText(url: string, callback?: Function) {
        cc.resources.load(url, cc.JsonAsset, function (err: any, texData: any) {
            if (!err) {
                if (callback != null) {
                    callback(texData);
                }
            }
        });
    }

    /**
    * 加载dragon
    * @param url 
    * @param skt 
    * @param callback 
    */
    public static loadDragon(url: string, skt: dragonBones.ArmatureDisplay, callback?: Function) {
        cc.resources.load(url, cc.Asset, function (err: any, spData: any) {
            if (!err) {
                if (skt != null) {
                    skt.dragonAsset = spData;
                }
                if (callback != null) {
                    callback(spData);
                }
            }
        });
    }


    public static getSpineAttachment(skinName: string, callback?: Function) {
        if (!callback) {
            return;
        }
        cc.resources.load('spine/hero/sp_wuqi', sp.SkeletonData, function (err: any, spData: any) {
            if (!err) {
                let skeletonData = spData.getRuntimeData();
                let slotIndex = skeletonData.findSlotIndex('knife1');
                let skin = skeletonData.findSkin(skinName);
                let atta = skin.getAttachment(slotIndex, 'knife1');
                callback(atta);
            }
        });
    }
    /**
     * 加载图集中的图片
     * @param url 
     * @param sub 
     * @param sp 
     * @param callback 
     */
    public static loadSpriteFrame(url: string, sub: string, sp: cc.Sprite, callback?: Function) {
        if (ResMgr.getCache(url)) {
            var sf = ResMgr.getCache(url).getSpriteFrame(sub);
            sp.spriteFrame = sf;
            if (callback) {
                callback(sp.spriteFrame);
            }
        } else {
            cc.resources.load(url, cc.SpriteAtlas, function (err, atlas) {
                if (err || !sp || !sp.isValid) return;
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
    }
    /**
     * 加载远程图片（微信头像）
     * @param url 
     * @param sp 
     * @param callback 
     */
    public static loadUrl(url: string, sp: cc.Sprite, callback?: Function) {
        console.log("loadUrl~", url)
        cc.assetManager.loadRemote(url, function (err, data) {
            if (err || !data || !sp || !sp.isValid) return;
            sp.spriteFrame = new cc.SpriteFrame(data);
            if (callback) {
                callback(sp.spriteFrame);
            }
        }.bind(this));
    }
    /**
     * 加载图片
     * @param url 
     * @param sp 
     * @param callback 
     */
    public static loadImage(url: string, sp: cc.Sprite, callback?: Function) {
        
        cc.resources.load(url, cc.SpriteFrame, function (err, lsp) {
            if (err || !lsp || !sp || !sp.isValid) return;
            sp.spriteFrame = lsp;
            if (callback) {
                
                callback(sp.spriteFrame);
            }
        }.bind(this));
    }

    /**
     * 加载图片并返回
     * @param url 
     * @param callback 
     */
    public static loadImageRet(url: string, callback: Function) {
        cc.resources.load(url, cc.SpriteFrame, function (err, lsp) {
            if (err || !lsp) return;
            if (callback) callback(lsp);
        }.bind(this));
    }

    /**
     * 加载图片
     * @param url 
     * @param sp 
     * @param callback 
     */
    public static loadImageArr(url: string, node: cc.Node) {
        cc.resources.load(url, cc.SpriteFrame, function (err, lsp) {
            if (err || !lsp || !node) return;
            node.children.forEach(element => {
                element.getComponent(cc.Sprite).spriteFrame = lsp;
            });
        }.bind(this));
    }

    /**
     * 加载Texture
     * @param url 
     * @param sp 
     * @param callback 
     */
    public static loadTexture(url: string, sp: any, callback?: Function) {
        cc.resources.load(url, function (err, texture) {
            if (err || !texture || !sp || !sp.isValid) return;
            sp.texture = texture;
            if (callback) {
                callback(sp.texture);
            }
        }.bind(this));
    }

    public static loadRes(url: string, completeCallback: (error: Error, resource: any) => void) {
        cc.resources.load(url, completeCallback);
    }

    public static loadTypeRes(url: string, type: typeof cc.Asset, completeCallback?: (error: Error, resource: any) => void): void {
        cc.resources.load(url, type, completeCallback);
    }

    public static loadResArray(url: string[], progressCallback: (completedCount: number, totalCount: number, item: any) => void, completeCallback: ((error: Error, resource: any[]) => void) | null): void {
        cc.resources.load(url, progressCallback, completeCallback);
    }


    public static loadResArrayTypes(assets: any, progressCallback: (completedCount: number, totalCount: number, item: any) => void, completeCallback: ((error: Error, resource: any[]) => void) | null): void {
        cc.assetManager.loadAny(assets, { bundle: 'resources' }, progressCallback, completeCallback);
    }

    public static load(resources: string, progressCallback: (completedCount: number, totalCount: number, item: any) => void, completeCallback: (err: Error, asset: cc.Asset) => void) {
        cc.assetManager.loadRemote(resources, progressCallback, completeCallback);
    }

    public static getRes(url: string, type?: Function): any {
        return cc.loader.getRes(url, type);
    }

    public static preloadResArray(url: string[], type: Array<any>, completeCallback: (() => void) | null) {
        cc.resources.load(url[0], type[0], () => {
            let u = url.indexOf(url[0]);
            url.splice(u, 1);
            let t = type.indexOf(type[0]);
            type.splice(t, 1);
            if (type.length > 1 && url.length > 1) {
                ResMgr.preloadResArray(url, type, completeCallback);
            } else {
                completeCallback();
            }
        });
    }

    private static _cache: Object = {};
    /**
     * 缓存资源，不释放，持有Asset引用
     * @param url 
     * @param type 
     */
    public static cacheRes(url: string, type: typeof cc.Asset) {
        this.loadTypeRes(url, type, function (err, res) {
            if (err) return;
            this._cache[url] = res;
        }.bind(this));
    }
    public static addCache(url: string, res) {
        this._cache[url] = res;
    }
    public static getCache(url: string) {
        return this._cache[url];
    }

    public static loadAssetsArray(urlArray, progressCallback: (completedCount: number, totalCount: number, item: any) => void, completeCallback: ((error: Error, resource: any) => void) | null): void {
        cc.assetManager.loadAny(urlArray, { bundle: 'resources' }, progressCallback, completeCallback);
    }
}
