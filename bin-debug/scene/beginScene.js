var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var beginScene = (function (_super) {
    __extends(beginScene, _super);
    function beginScene() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    beginScene.prototype.init = function () {
        this.beginBtn = new egret.TextField();
        this.beginBtn.text = '开始游戏';
        this.beginBtn.size = 30;
        this.beginBtn.bold = true;
        this.beginBtn.width = 300;
        this.beginBtn.textAlign = egret.HorizontalAlign.CENTER;
        this.beginBtn.x = this.stage.stageWidth / 2 - 150;
        this.beginBtn.y = this.stage.stageHeight / 2;
        this.addChild(this.beginBtn);
        this.beginBtn.touchEnabled = true;
        this.beginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
    };
    beginScene.prototype.tapHandler = function () {
        sceneMange.getInstance().changScene('gameScene');
    };
    // 移除事件
    beginScene.prototype.release = function () {
        if (this.beginBtn.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.beginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
        }
    };
    return beginScene;
}(egret.DisplayObjectContainer));
__reflect(beginScene.prototype, "beginScene");
//# sourceMappingURL=beginScene.js.map