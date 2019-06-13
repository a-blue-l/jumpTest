class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.createGameScene();
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    // 中心点坐标
    
    private createGameScene() {
         //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.imgLoadHandler, this);
        RES.loadConfig("resource/default.res.json", "resource/");
        
    }

    private imgLoadHandler ( evt:egret.Event ) : void{
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.loadGroup("preload");

        
    }
    private onResourceLoadComplete(){
        // 添加场景
        this.addChild(sceneMange.getInstance())
    }
}