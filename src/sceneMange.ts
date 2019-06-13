class sceneMange extends egret.Sprite{
    // 场景控制
    private static instance: sceneMange;
    // 开始场景
    private beginScene: beginScene;
    // 游戏场景
    private gameScene: gameScene;

    public constructor() {
        super();
        this.init();
    }

    private init () {
        // 实例化场景
        this.beginScene = new beginScene();
        this.gameScene = new gameScene();

        // 默认开始场景
        this.addChild(this.beginScene);
    }

    // 获取方法
    public static getInstance(): sceneMange{
        if(!sceneMange.instance){
            sceneMange.instance = new sceneMange();
        }
        return sceneMange.instance;
    }

    // 切换场景
    public changScene(type){
        if(type == 'gamescene'){
            this.beginScene.release();
        }
        this.removeChildren();
        this.addChild(this[type]);
    }
}