
/**
 * 广告接口类
 */
export interface IBannerAd {
  show: Function
  hide: Function
  offResize: Function
  style: object
  onLoad: Function
  offLoad: Function
  offClose: Function
  onError: Function
  offError: Function
  onResize: Function
  destroy: Function

  /**
   * 手动关闭广告
   */
  onHide: Function
  onClose: Function
}

export interface IRewardVideoAd {
  load: Function
  show: Function
  hide: Function
  offResize: Function
  style: object
  onLoad: Function
  offLoad: Function
  onError: Function
  offError: Function
  onResize: Function
  destroy: Function
  onClose: Function
  offClose: Function
  onShow: Function
  offShow: Function
}


export interface INativeAd {

  load: Function
  show: Function
  hide: Function
  offResize: Function
  style: object
  onLoad: Function
  offLoad: Function
  onError: Function
  offError: Function
  onResize: Function
  destroy: Function
  onClose: Function
  offClose: Function
  onShow: Function
  offShow: Function
  reportAdShow: Function
  reportAdClick: Function
}


/**
 * 广告类基类
 */

export default class PlatformBase extends cc.Component {

  protected _audioIDs: any = {};
  protected _bgmaudioID: number;
  protected _bgm: string;
  protected _enabledBgm: boolean = true;
  protected _enabledShock: boolean = true;
  protected _enableMusic: boolean = true;
  public platformName = 'H'
  protected innerAudioContext;
  public adTime: number = 0;
  public shareCallback: Function;
  public shareCallback1: Function;
  constructor() {
    super();
    var sound = cc.sys.localStorage.getItem("escapesoundset");
    // var shock = cc.sys.localStorage.getItem('escapeshockset');
    if (sound && sound.length > 0) {
      sound = sound.split(":");
      this.enabledBgm = sound[0] == "1";
      this.enabledShock = sound[1] == "1";
    }
    // this.innerAudioContext = wx.createInnerAudioContext();
  }

  protected saveSetting() {
    try {
      cc.sys.localStorage.setItem("escapesoundset", (this.enabledBgm ? 1 : 0) + ":" + (this.enabledShock ? 1 : 0));
      // cc.sys.localStorage.setItem("escapeshockset",(this.enableMusic?1:0));
    } catch (err) {

    }
  }


  public setupDB() {

  }

  /**
* 登录
* @param callback  回调
*/
  public login(callback: (data: any) => void): void {

  }
  /**
   * 分享
   * @param callback 分享回调 返回是否成功
   */
  public Share(callback: (success: boolean) => void): void {

  }
  // /**
  //  * 看广告
  //  * @param callback 回调 返回是否成功
  //  */
  // public watchAd(callback: Function, errorVideo: Function): void {

  // }
  /**
   * 广告优先于分享
   * @param callback 回调 返回是否成功
   */
  public adShare(callback: (success: boolean) => void): void {

  }

  public showBannerad(id?: string) {
    // MsgMgr.emit(MsgEnums.UPDATE_ICON, true)
  }

  public hideBanner() {
    // MsgMgr.emit(MsgEnums.UPDATE_ICON, false)
  }

  public showBannerad1() {

  }

  public gameClubHiding() {

  }

  /**
   * 检查是否关注抖音号
   */
  checkFollowAwemeState(callback: Function) {

  }


  /**
   * 创建抖音桌面快捷方式
   */
  addShortcut() {

  }



  /**
   * 播放背景音乐
   */
  public playBGM(url: string) {
    this._bgm = url;
    // console.log("playBGM", url, this._bgmaudioID)
    if (this._bgmaudioID != undefined) {
      cc.audioEngine.stop(this._bgmaudioID);
    }
    cc.resources.load("sounds/" + url, cc.AudioClip, function (err, clip) {
      if (err || this._bgm != url) {
        return;
      }
      if (this._enabledBgm) {
        this._bgmaudioID = cc.audioEngine.play(clip, true, 1);
      }
    }.bind(this));
  }

  public set enabledBgm(value: boolean) {
    this._enabledBgm = value;
    this.saveSetting();
    if (this._enabledBgm) {
      this.playBGM(this._bgm)
    } else {
      if (this._bgmaudioID != undefined) {
        cc.audioEngine.stop(this._bgmaudioID);
      }
      this._bgmaudioID = undefined;
    }
  }

  public get enabledBgm(): boolean {
    return this._enabledBgm;
  }


  public set enabledShock(value: boolean) {
    this._enabledShock = value;
    this.saveSetting();
  }

  public get enabledShock(): boolean {
    return this._enabledShock;
  }


  public pause() {
    if (this._bgmaudioID != undefined) {
      cc.audioEngine.pause(this._bgmaudioID);
    }
  }

  public debugOn() {

  }

  showCreateCustomAd() {
  }

  hideCreateCustomAd() {
  }
  /**
   * 关注抖音号
   */
  public awemeUser() {

  }

  public LOAD_BANNER1() {

  }
  /**
   * 游戏圈
   */
  GameClubButton() {

  }
  /**
   * 跳转视频播放页
   */
  public navigateToVideoView(id) {

  }

  gameClubSHow() {

  }

  gameClubHide() {

  }

  public LOAD_BANNER2() {

  }

  public goto(appId: string, path: string, id: string, num: number, callback: () => void) {
    // var names = {};
    // let ss = id.name
    // names['ss'] = 1
    // console.log(names)
  }

  public subscribe(callback: () => void) {

  }

  public resume() {
    if (this._bgmaudioID != undefined) {
      cc.audioEngine.resume(this._bgmaudioID);
    }
  }


  public ShowWechatAppBox() {

  }


  public SHOW_NATIVE_BANNER(loadImage: Function) {

  }

  public CLICK_NATIVE_INTER() {

  }

  public showInterstitialAd() {

  }

  public hideInterstitialAd() {

  }

  public CLICK_NATIVE_BANNER() {

  }

  public LOAD_BANNER() {

  }

  /**
   * @param  callback 录屏回调 返回是否成功 
  */
  public shareViode(callback: (success: boolean) => void) {

  }

  /**
   * 开始录屏
   */
  public StartRecorder() {

  }
  /**
   * 停止录屏
   */
  public stopRecorder() {

  }
  /**
   * 安卓接口调用
   */
  public AndroidAPK(index?: string) {
  }


  /*******************************广告********************************** */


  /**
   * 创建banner
   */
  public CREATE_BANNER() {

  }
  /**
    * 加载banner
    */
  public ONLOAD_BANNER() {

  }
  /**
    * 展示banner
    */
  public SHOW_BANNER() {

  }
  /**
    * 隐藏banner
    */
  public HIDE_BANNER() {

  }
  /**
    * 销毁banner
    */
  public DESTROY_BANNER() {

  }
  /**
    * 创建激励视频
    */
  public CREATE_VIDEO(uuId: string) {

  }
  /**
   * 加载激励视频
   */
  public LOAD_VIDEO() {

  }
  /**
   * 展示激励视频
   */
  public SHOW_VIDEO(index?: string) {

  }
  /**
     * 看广告
     * @param goodVideo 回调 返回成功
     * @param errorVideo 回调 返回失败
     * @param unLoadVideo 回调 无法加载视频
  */
  public CLOSE_VIDEO(goodVideo: Function, errorVideo?: Function, unLoadVideo?: Function, ID?: string) {

  }
  /**
   * 销毁广告
   */
  public DESTROY_VIDEO() {

  }
  /**
     * 创建插屏
  */
  public CREATE_TITIALAD(uuId: string) {

  }
  /**
     * 加载插屏
  */
  public LOAD_TITIALAD() {

  }
  /**
   * 展示插屏
  */
  public SHOW_TITIALAD() {

  }

  public SHOW_TITIALAD1() {

  }

  /**
  * 关闭插屏
  */
  public CLOSE_TITIALAD() {

  }

  public SHOW_NATIVE_INTER(image: Function) {

  }

  /**
   * 展示原生
   * @param loadImage 
   */
  public SHOW_NATIVE(loadImage: Function) {

  }

  /**
   * 点击原生
   */
  public CLICK_NATIVE(adId: string) {

  }

  /**
   * 销毁原生
   */
  public DESTROY_NATIVE() {

  }

  /**
  * 微信点击曝光
  */
  public reportUserBehaviorBranchAnalytics(uid, Type) {

  }

  /**
   * 友盟自定义事件上报
   * @param type 事件id
   * @param param 属性
   */
  public trackEvent(type: string, param?: object) {

  }

  /**
   * 手机短震动
   */
  public VibrateShort(type: string, success?: Function, fail?: Function, complete?: Function) {

  }

  /**
   * 手机长震动
   */
  public VibrateLong(success?: Function, fail?: Function, complete?: Function) {

  }

  /**
   * 渠道名字
   */
  public PlatformName(): string {
    return "PlatformBase"
  }
}