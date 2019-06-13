class beginScene extends egret.DisplayObjectContainer{
    public beginBtn: egret.TextField;
    
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
    }

    private init(){
        this.beginBtn = new egret.TextField();
        this.beginBtn.text = '开始游戏';
        this.beginBtn.size = 30;
        this.beginBtn.bold = true;
        this.beginBtn.width = 300;
        this.beginBtn.textAlign = egret.HorizontalAlign.CENTER;
        this.beginBtn.x = this.stage.stageWidth/2-150;
        this.beginBtn.y = this.stage.stageHeight/2;
        this.addChild(this.beginBtn);
        this.beginBtn.touchEnabled = true;
        this.beginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapHandler,this);
    }

    private tapHandler(){
        sceneMange.getInstance().changScene('gameScene');
    }

    // 移除事件
	public release(){
		if(this.beginBtn.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
			this.beginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.tapHandler,this);
		}
	}
}