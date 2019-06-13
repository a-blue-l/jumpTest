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
var gameScene = (function (_super) {
    __extends(gameScene, _super);
    function gameScene() {
        var _this = _super.call(this) || this;
        _this.center_x = 0;
        _this.center_y = 0;
        _this.num = 1;
        _this.num_cen_x = 0;
        _this.num_cen_y = 0;
        _this.isReadyJump = false;
        _this.direction = 1;
        _this.jumpDistance = 0;
        // 左侧跳跃点
        _this.leftOrigin = { "x": 180, "y": 350 };
        // 右侧跳跃点
        _this.rightOrigin = { "x": 505, "y": 350 };
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    // 添加初始方块 添加物体
    gameScene.prototype.init = function () {
        this.leftCage = new egret.Shape();
        this.leftCage.graphics.beginFill(0x888888 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
        this.leftCage.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this.leftCage.graphics.endFill();
        this.addChild(this.leftCage);
        this.leftCage.touchEnabled = true;
        this.blockPanel = new egret.DisplayObjectContainer();
        this.blockPanel.width = this.stage.stageWidth;
        this.blockPanel.height = this.stage.stageHeight;
        this.center_x = this.stage.stageWidth / 2;
        this.center_y = this.stage.stageHeight / 2;
        this.texture = RES.getRes('block1_png');
        // 添加容器
        this.addChild(this.blockPanel);
        this.num_cen_x = this.center_x - 100;
        this.num_cen_y = this.center_y + 100;
        this.addBlock(this.num_cen_x, this.num_cen_y);
        this.people = new egret.Bitmap();
        this.people.texture = RES.getRes('piece_png');
        this.people.width = 80;
        this.people.height = 130;
        this.people.anchorOffsetX = 40;
        this.people.anchorOffsetY = 75;
        this.people.x = this.num_cen_x;
        this.people.y = this.num_cen_y - 75 / 2;
        this.score = new egret.TextField();
        this.score.x = 30;
        this.score.y = 30;
        this.score.size = 40;
        this.score.text = '0';
        this.addChild(this.score);
        this.events();
        var lang = 300;
        this.num_cen_x += lang;
        this.num_cen_y -= lang / 2;
        this.addBlock(this.num_cen_x, this.num_cen_y);
        this.blockPanel.addChild(this.people);
        this.blockPanel.setChildIndex(this.people, 10);
    };
    // 添加方块函数
    gameScene.prototype.addBlock = function (x, y) {
        var block = new egret.Bitmap();
        block.texture = this.texture;
        block.anchorOffsetX = 224;
        block.anchorOffsetY = 79;
        block.width = 358;
        block.height = 240;
        block.x = x;
        block.y = y;
        this.currentBlock1 = this.currentBlock;
        this.currentBlock = block;
        this.blockPanel.addChild(block);
        this.blockPanel.setChildIndex(block, 1);
    };
    gameScene.prototype.events = function () {
        // 绑定事件
        this.leftCage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            // 变形
            egret.Tween.get(this.people).to({
                scaleY: 0.5
            }, 2000);
            this.isReadyJump = true;
        }, this);
        this.leftCage.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            var _this = this;
            // 判断是否是在按下状态
            if (!this.isReadyJump) {
                return;
            }
            this.leftCage.touchEnabled = false;
            this.jumpDistance = (1 - this.people.scaleY) * 1000;
            // 跳跃
            this.targetPos = new egret.Point();
            // 落点坐标
            this.targetPos.x = this.people.x + this.jumpDistance * this.direction;
            // 根据落点重新计算斜率,确保往目标中心跳跃
            this.targetPos.y = this.people.y + this.jumpDistance * (this.currentBlock.y - this.people.y - 75 / 2) / (this.currentBlock.x - this.people.x) * this.direction;
            // 获取结束位置
            egret.Tween.removeAllTweens();
            // 执行跳跃动画
            egret.Tween.get(this).to({ factor: 1 }, 500).call(function () {
                _this.people.scaleY = 1;
                _this.jumpDistance = 0;
                _this.isReadyJump = false;
                _this.leftCage.touchEnabled = true;
                // 判断是否失败
                if (Math.pow(_this.currentBlock.x - _this.people.x, 2) + Math.pow(_this.currentBlock.y - _this.people.y, 2) < 80 * 80) {
                    _this.direction = Math.random() < 0.5 ? 1 : -1;
                    _this.score.text = '' + (Number(_this.score.text) + 1) + '';
                    egret.Tween.get(_this.leftCage).to({ alpha: 0 }, 100)
                        .call(function () {
                        _this.leftCage.graphics.beginFill(0x888888 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
                        _this.leftCage.graphics.drawRect(0, 0, _this.stage.stageWidth, _this.stage.stageHeight);
                        _this.leftCage.graphics.endFill();
                        egret.Tween.get(_this.leftCage).to({ alpha: 1 }, 100);
                    });
                }
                else if (Math.pow(_this.currentBlock1.x - _this.people.x, 2) + Math.pow(_this.currentBlock1.y - _this.people.y, 2) > 80 * 80) {
                    alert('游戏结束');
                    sceneMange.getInstance().changScene('beginScene');
                    // 重置
                    _this.num_cen_x = 0;
                    _this.num_cen_y = 0;
                    _this.direction = 1;
                    _this.removeChildren();
                    return false;
                }
                else {
                    return false;
                }
                var lang = 300;
                _this.num_cen_x = _this.currentBlock.x + lang * _this.direction;
                _this.num_cen_y = _this.currentBlock.y - lang / 2;
                _this.addBlock(_this.num_cen_x, _this.num_cen_y);
                var x_c = (_this.direction < 0 ? (_this.currentBlock.x - _this.leftOrigin.x) : (_this.currentBlock.x - _this.rightOrigin.x));
                var y_c = (_this.direction < 0 ? (_this.currentBlock.y - _this.leftOrigin.y) : (_this.currentBlock.y - _this.rightOrigin.y));
                for (var i = _this.blockPanel.$children.length - 1; i >= 0; i--) {
                    var blockNode = _this.blockPanel.$children[i];
                    egret.Tween.get(blockNode).to({
                        x: blockNode.x - x_c,
                        y: blockNode.y - y_c
                    }, 500);
                    if (blockNode.y > _this.stage.stageHeight + 50) {
                        console.log(111);
                        _this.blockPanel.removeChild(blockNode);
                    }
                }
            });
            egret.Tween.get(this.people).to({ rotation: this.direction > 0 ? 360 : -360 }, 200).call(function () {
                _this.people.rotation = 0;
                _this.people.scaleY = 1;
            }).call(function () {
            });
        }, this);
    };
    Object.defineProperty(gameScene.prototype, "factor", {
        //添加factor的set,get方法,注意用public  
        get: function () {
            return 0;
        },
        //计算方法参考 二次贝塞尔公式  
        set: function (value) {
            this.people.x = (1 - value) * (1 - value) * this.people.x + 2 * value * (1 - value) * (this.people.x + this.targetPos.x) / 2 + value * value * (this.targetPos.x);
            this.people.y = (1 - value) * (1 - value) * this.people.y + 2 * value * (1 - value) * (this.targetPos.y - 300) + value * value * (this.targetPos.y);
        },
        enumerable: true,
        configurable: true
    });
    return gameScene;
}(egret.DisplayObjectContainer));
__reflect(gameScene.prototype, "gameScene");
//# sourceMappingURL=gameScene.js.map