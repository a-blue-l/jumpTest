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
var sceneMange = (function (_super) {
    __extends(sceneMange, _super);
    function sceneMange() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    sceneMange.prototype.init = function () {
        // 实例化场景
        this.beginScene = new beginScene();
        this.gameScene = new gameScene();
        // 默认开始场景
        this.addChild(this.beginScene);
    };
    // 获取方法
    sceneMange.getInstance = function () {
        if (!sceneMange.instance) {
            sceneMange.instance = new sceneMange();
        }
        return sceneMange.instance;
    };
    // 切换场景
    sceneMange.prototype.changScene = function (type) {
        if (type == 'gamescene') {
            this.beginScene.release();
        }
        this.removeChildren();
        this.addChild(this[type]);
    };
    return sceneMange;
}(egret.Sprite));
__reflect(sceneMange.prototype, "sceneMange");
//# sourceMappingURL=sceneMange.js.map