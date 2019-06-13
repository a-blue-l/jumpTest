var __reflect=this&&this.__reflect||function(e,t,n){e.__class__=t,n?n.push(t):n=[t],e.__types__=e.__types__?n.concat(e.__types__):n},__extends=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);n.prototype=t.prototype,e.prototype=new n},__awaiter=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))(function(r,o){function s(e){try{c(i.next(e))}catch(t){o(t)}}function a(e){try{c(i["throw"](e))}catch(t){o(t)}}function c(e){e.done?r(e.value):new n(function(t){t(e.value)}).then(s,a)}c((i=i.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){function n(e){return function(t){return i([e,t])}}function i(n){if(r)throw new TypeError("Generator is already executing.");for(;c;)try{if(r=1,o&&(s=o[2&n[0]?"return":n[0]?"throw":"next"])&&!(s=s.call(o,n[1])).done)return s;switch(o=0,s&&(n=[0,s.value]),n[0]){case 0:case 1:s=n;break;case 4:return c.label++,{value:n[1],done:!1};case 5:c.label++,o=n[1],n=[0];continue;case 7:n=c.ops.pop(),c.trys.pop();continue;default:if(s=c.trys,!(s=s.length>0&&s[s.length-1])&&(6===n[0]||2===n[0])){c=0;continue}if(3===n[0]&&(!s||n[1]>s[0]&&n[1]<s[3])){c.label=n[1];break}if(6===n[0]&&c.label<s[1]){c.label=s[1],s=n;break}if(s&&c.label<s[2]){c.label=s[2],c.ops.push(n);break}s[2]&&c.ops.pop(),c.trys.pop();continue}n=t.call(e,c)}catch(i){n=[6,i],o=0}finally{r=s=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var r,o,s,a,c={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return a={next:n(0),"throw":n(1),"return":n(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a},LoadingUI=function(e){function t(){var t=e.call(this)||this;return t.createView(),t}return __extends(t,e),t.prototype.createView=function(){this.textField=new egret.TextField,this.addChild(this.textField),this.textField.y=300,this.textField.width=480,this.textField.height=100,this.textField.textAlign="center"},t.prototype.onProgress=function(e,t){this.textField.text="Loading..."+e+"/"+t},t}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var Main=function(e){function t(){var t=e.call(this)||this;return t.addEventListener(egret.Event.ADDED_TO_STAGE,t.onAddToStage,t),t}return __extends(t,e),t.prototype.onAddToStage=function(e){egret.lifecycle.addLifecycleListener(function(e){e.onUpdate=function(){}}),egret.lifecycle.onPause=function(){egret.ticker.pause()},egret.lifecycle.onResume=function(){egret.ticker.resume()},this.createGameScene()},t.prototype.createGameScene=function(){RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.imgLoadHandler,this),RES.loadConfig("resource/default.res.json","resource/")},t.prototype.imgLoadHandler=function(e){RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this),RES.loadGroup("preload")},t.prototype.onResourceLoadComplete=function(){this.addChild(sceneMange.getInstance())},t}(egret.DisplayObjectContainer);__reflect(Main.prototype,"Main");var DebugPlatform=function(){function e(){}return e.prototype.getUserInfo=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2,{nickName:"username"}]})})},e.prototype.login=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2]})})},e}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);var sceneMange=function(e){function t(){var t=e.call(this)||this;return t.init(),t}return __extends(t,e),t.prototype.init=function(){this.beginScene=new beginScene,this.gameScene=new gameScene,this.addChild(this.beginScene)},t.getInstance=function(){return t.instance||(t.instance=new t),t.instance},t.prototype.changScene=function(e){"gamescene"==e&&this.beginScene.release(),this.removeChildren(),this.addChild(this[e])},t}(egret.Sprite);__reflect(sceneMange.prototype,"sceneMange");var beginScene=function(e){function t(){var t=e.call(this)||this;return t.addEventListener(egret.Event.ADDED_TO_STAGE,t.init,t),t}return __extends(t,e),t.prototype.init=function(){this.beginBtn=new egret.TextField,this.beginBtn.text="开始游戏",this.beginBtn.size=30,this.beginBtn.bold=!0,this.beginBtn.width=300,this.beginBtn.textAlign=egret.HorizontalAlign.CENTER,this.beginBtn.x=this.stage.stageWidth/2-150,this.beginBtn.y=this.stage.stageHeight/2,this.addChild(this.beginBtn),this.beginBtn.touchEnabled=!0,this.beginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapHandler,this)},t.prototype.tapHandler=function(){sceneMange.getInstance().changScene("gameScene")},t.prototype.release=function(){this.beginBtn.hasEventListener(egret.TouchEvent.TOUCH_TAP)&&this.beginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.tapHandler,this)},t}(egret.DisplayObjectContainer);__reflect(beginScene.prototype,"beginScene");var gameScene=function(e){function t(){var t=e.call(this)||this;return t.center_x=0,t.center_y=0,t.num=1,t.num_cen_x=0,t.num_cen_y=0,t.isReadyJump=!1,t.direction=1,t.jumpDistance=0,t.leftOrigin={x:180,y:350},t.rightOrigin={x:505,y:350},t.addEventListener(egret.Event.ADDED_TO_STAGE,t.init,t),t}return __extends(t,e),t.prototype.init=function(){this.leftCage=new egret.Shape,this.leftCage.graphics.beginFill(8947848+167772.15*Math.floor(100*Math.random()),1),this.leftCage.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight),this.leftCage.graphics.endFill(),this.addChild(this.leftCage),this.leftCage.touchEnabled=!0,this.blockPanel=new egret.DisplayObjectContainer,this.blockPanel.width=this.stage.stageWidth,this.blockPanel.height=this.stage.stageHeight,this.center_x=this.stage.stageWidth/2,this.center_y=this.stage.stageHeight/2,this.texture=RES.getRes("block1_png"),this.addChild(this.blockPanel),this.num_cen_x=this.center_x-100,this.num_cen_y=this.center_y+100,this.addBlock(this.num_cen_x,this.num_cen_y),this.people=new egret.Bitmap,this.people.texture=RES.getRes("piece_png"),this.people.width=80,this.people.height=130,this.people.anchorOffsetX=40,this.people.anchorOffsetY=75,this.people.x=this.num_cen_x,this.people.y=this.num_cen_y-37.5,this.score=new egret.TextField,this.score.x=30,this.score.y=30,this.score.size=40,this.score.text="0",this.addChild(this.score),this.events();var e=300;this.num_cen_x+=e,this.num_cen_y-=e/2,this.addBlock(this.num_cen_x,this.num_cen_y),this.blockPanel.addChild(this.people),this.blockPanel.setChildIndex(this.people,10)},t.prototype.addBlock=function(e,t){var n=new egret.Bitmap;n.texture=this.texture,n.anchorOffsetX=224,n.anchorOffsetY=79,n.width=358,n.height=240,n.x=e,n.y=t,this.currentBlock1=this.currentBlock,this.currentBlock=n,this.blockPanel.addChild(n),this.blockPanel.setChildIndex(n,1)},t.prototype.events=function(){this.leftCage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){egret.Tween.get(this.people).to({scaleY:.5},2e3),this.isReadyJump=!0},this),this.leftCage.addEventListener(egret.TouchEvent.TOUCH_END,function(){var e=this;this.isReadyJump&&(this.leftCage.touchEnabled=!1,this.jumpDistance=1e3*(1-this.people.scaleY),this.targetPos=new egret.Point,this.targetPos.x=this.people.x+this.jumpDistance*this.direction,this.targetPos.y=this.people.y+this.jumpDistance*(this.currentBlock.y-this.people.y-37.5)/(this.currentBlock.x-this.people.x)*this.direction,egret.Tween.removeAllTweens(),egret.Tween.get(this).to({factor:1},500).call(function(){if(e.people.scaleY=1,e.jumpDistance=0,e.isReadyJump=!1,e.leftCage.touchEnabled=!0,!(Math.pow(e.currentBlock.x-e.people.x,2)+Math.pow(e.currentBlock.y-e.people.y,2)<6400))return Math.pow(e.currentBlock1.x-e.people.x,2)+Math.pow(e.currentBlock1.y-e.people.y,2)>6400?(alert("游戏结束"),sceneMange.getInstance().changScene("beginScene"),e.num_cen_x=0,e.num_cen_y=0,e.direction=1,e.removeChildren(),!1):!1;e.direction=Math.random()<.5?1:-1,e.score.text=""+(Number(e.score.text)+1),egret.Tween.get(e.leftCage).to({alpha:0},100).call(function(){e.leftCage.graphics.beginFill(8947848+167772.15*Math.floor(100*Math.random()),1),e.leftCage.graphics.drawRect(0,0,e.stage.stageWidth,e.stage.stageHeight),e.leftCage.graphics.endFill(),egret.Tween.get(e.leftCage).to({alpha:1},100)});var t=300;e.num_cen_x=e.currentBlock.x+t*e.direction,e.num_cen_y=e.currentBlock.y-t/2,e.addBlock(e.num_cen_x,e.num_cen_y);for(var n=e.direction<0?e.currentBlock.x-e.leftOrigin.x:e.currentBlock.x-e.rightOrigin.x,i=e.direction<0?e.currentBlock.y-e.leftOrigin.y:e.currentBlock.y-e.rightOrigin.y,r=e.blockPanel.$children.length-1;r>=0;r--){var o=e.blockPanel.$children[r];egret.Tween.get(o).to({x:o.x-n,y:o.y-i},500),o.y>e.stage.stageHeight+50&&(console.log(111),e.blockPanel.removeChild(o))}}),egret.Tween.get(this.people).to({rotation:this.direction>0?360:-360},200).call(function(){e.people.rotation=0,e.people.scaleY=1}).call(function(){}))},this)},Object.defineProperty(t.prototype,"factor",{get:function(){return 0},set:function(e){this.people.x=(1-e)*(1-e)*this.people.x+2*e*(1-e)*(this.people.x+this.targetPos.x)/2+e*e*this.targetPos.x,this.people.y=(1-e)*(1-e)*this.people.y+2*e*(1-e)*(this.targetPos.y-300)+e*e*this.targetPos.y},enumerable:!0,configurable:!0}),t}(egret.DisplayObjectContainer);__reflect(gameScene.prototype,"gameScene");