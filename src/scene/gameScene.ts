class gameScene extends egret.DisplayObjectContainer{

    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
    }
    private blockPanel:egret.DisplayObjectContainer;
    private center_x : number = 0;
    private center_y : number = 0;
    private imgLoader : egret.ImageLoader;
    private texture : egret.Texture;
    private people : egret.Bitmap;
    private num : number = 1;
    private num_cen_x: number = 0;
    private num_cen_y: number = 0;
    private isReadyJump: Boolean = false;
    private direction: number = 1;
    private currentBlock: egret.Bitmap;
    private currentBlock1: egret.Bitmap;
    private jumpDistance: number = 0;
    private score :egret.TextField;
    private leftCage : egret.Shape;
    // 左侧跳跃点
	private leftOrigin = { "x": 180, "y": 350 };
	// 右侧跳跃点
	private rightOrigin = { "x": 505, "y": 350 };
    // 落脚点
	private targetPos: egret.Point;
    // 添加初始方块 添加物体
    private init () {
        this.leftCage = new egret.Shape();
        this.leftCage.graphics.beginFill(0x888888 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
        this.leftCage.graphics.drawRect(0, 0,this.stage.stageWidth, this.stage.stageHeight);
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

        
        this.num_cen_x = this.center_x-100;
        this.num_cen_y = this.center_y+100;
        this.addBlock(this.num_cen_x, this.num_cen_y);
        this.people = new egret.Bitmap();
        this.people.texture = RES.getRes('piece_png');

        this.people.width = 80;
        this.people.height = 130;
        this.people.anchorOffsetX = 40;
        this.people.anchorOffsetY = 75;
        this.people.x = this.num_cen_x;
        this.people.y = this.num_cen_y-75/2;

        this.score = new egret.TextField();
        this.score.x = 30;
        this.score.y = 30;
        this.score.size = 40;
        this.score.text= '0';
        this.addChild(this.score);

        this.events();
        
        let lang = 300;
        this.num_cen_x += lang;
        this.num_cen_y -= lang/2;
        this.addBlock(this.num_cen_x, this.num_cen_y);

        
        this.blockPanel.addChild(this.people);
        
        this.blockPanel.setChildIndex(this.people, 10);
    }

    // 添加方块函数
    private addBlock ( x:number, y:number ) {
        var block = new egret.Bitmap();
        block.texture = this.texture;
        block.anchorOffsetX =224;
        block.anchorOffsetY = 79;
        block.width = 358;
        block.height = 240;

        block.x = x;
        block.y = y;
        this.currentBlock1 = this.currentBlock;
        this.currentBlock = block;
        this.blockPanel.addChild(block);
        this.blockPanel.setChildIndex(block, 1);
        
        
    }

    private events () {
        // 绑定事件
        this.leftCage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function(){
            // 变形
            egret.Tween.get(this.people).to({
                scaleY: 0.5
            }, 2000) 
            this.isReadyJump = true;
        }, this)
        this.leftCage.addEventListener(egret.TouchEvent.TOUCH_END, function(){
            // 判断是否是在按下状态
            if (!this.isReadyJump) {
                return;
            }
            this.leftCage.touchEnabled = false;
            this.jumpDistance = (1-this.people.scaleY) * 1000; 
            // 跳跃
            this.targetPos = new egret.Point();
            // 落点坐标
            this.targetPos.x = this.people.x + this.jumpDistance * this.direction;
            // 根据落点重新计算斜率,确保往目标中心跳跃
        this.targetPos.y = this.people.y + this.jumpDistance * (this.currentBlock.y - this.people.y-75/2) / (this.currentBlock.x - this.people.x) * this.direction;
            
            // 获取结束位置
            egret.Tween.removeAllTweens();
            // 执行跳跃动画
            egret.Tween.get(this).to({ factor: 1 }, 500).call(() => {
                this.people.scaleY = 1;
                this.jumpDistance = 0;
                this.isReadyJump = false;
                this.leftCage.touchEnabled = true;

                // 判断是否失败
                if( Math.pow(this.currentBlock.x-this.people.x, 2) + Math.pow(this.currentBlock.y-this.people.y, 2) < 80*80 ){
                    this.direction = Math.random()<0.5?1:-1;
                    this.score.text = '' + (Number(this.score.text) + 1) + '';
                    egret.Tween.get(this.leftCage).to({alpha:0}, 100)
                    .call(() => {
                         this.leftCage.graphics.beginFill(0x888888 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
                        this.leftCage.graphics.drawRect(0, 0,this.stage.stageWidth, this.stage.stageHeight);
                        this.leftCage.graphics.endFill();
                        egret.Tween.get(this.leftCage).to({alpha:1}, 100)
                    })
                } else if( Math.pow(this.currentBlock1.x-this.people.x, 2) + Math.pow(this.currentBlock1.y-this.people.y, 2) > 80*80 ) {
                    alert('游戏结束');
                    sceneMange.getInstance().changScene('beginScene');
                    // 重置
                    this.num_cen_x = 0;
                    this.num_cen_y = 0;
                    this.direction = 1;
                    this.removeChildren();
                    return false; 
                } else {
                    return false;
                }

                let lang = 300;
                this.num_cen_x = this.currentBlock.x + lang*this.direction;
                this.num_cen_y = this.currentBlock.y - lang/2;
                this.addBlock(this.num_cen_x, this.num_cen_y);
                var x_c = ( this.direction<0?(this.currentBlock.x - this.leftOrigin.x):(this.currentBlock.x - this.rightOrigin.x) );
                var y_c = ( this.direction<0?(this.currentBlock.y - this.leftOrigin.y):(this.currentBlock.y - this.rightOrigin.y) );
                for (var i: number = this.blockPanel.$children.length - 1; i >= 0; i--) {
                    var blockNode = this.blockPanel.$children[i];
                    egret.Tween.get(blockNode).to({
                        x: blockNode.x - x_c,
                        y: blockNode.y - y_c
                    }, 500)
                    if(blockNode.y > this.stage.stageHeight +50){
                        console.log(111)
                        this.blockPanel.removeChild(blockNode);
                    }
                }
            });
            egret.Tween.get(this.people).to({ rotation: this.direction > 0 ? 360 : -360 }, 200).call(() => {
                this.people.rotation = 0;
                this.people.scaleY = 1;
            }).call(() => {
                
            });
        }, this)
    }

    //添加factor的set,get方法,注意用public  
	public get factor(): number {
		return 0;
	}
	//计算方法参考 二次贝塞尔公式  
	public set factor(value: number) {
		this.people.x = (1 - value) * (1 - value) * this.people.x + 2 * value * (1 - value) * (this.people.x + this.targetPos.x) / 2 + value * value * (this.targetPos.x);
		this.people.y = (1 - value) * (1 - value) * this.people.y + 2 * value * (1 - value) * (this.targetPos.y - 300) + value * value * (this.targetPos.y);
	}
}