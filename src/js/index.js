import {} from './lib/jquery-3.1.1.min.js';
import tool from './lib/tool.js';
import uitouch from './lib/uitouch.js'; /*UI方向盘*/
import canvas from './lib/canvas.js'; /*绘画方法*/
import codeMaterial from './material/index.js'; /*游戏对象*/
import bomb from './material/bomb.js';

/*默认画贞方法*/
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame   || 
    window.mozRequestAnimationFrame      || 
    window.oRequestAnimationFrame        || 
    window.msRequestAnimationFrame       || 
    function(callback, element){
        window.setTimeout(function(){
           
            callback(+new Date);
        }, 1000 / 60);
    };
})();

/*全局画布对象*/
window.material = codeMaterial;
window.gameCanvas = $("#main-canvas");
var ctx = gameCanvas.get(0).getContext("2d");
var lastRun;


function App(opt){
	if (!(this instanceof App)) {
        return new App(opt);
    }
    this.init();
}

App.prototype = {
	init: function(){
		console.log('init');
		tool.adaptscreen(750);
		document.addEventListener('touchmove',function(event){ event.preventDefault(); },false);
		this.bindEvent();
		this.playCanvas(0);
	},
	bindEvent: function(){
		/*摇杆事件*/
		$('#ctrl-direction').get(0).addEventListener("touchstart", uitouch.cdTouchStart, false);
		$('#ctrl-direction').get(0).addEventListener("touchmove", uitouch.cdTouchMove, false);
		$('#ctrl-direction').get(0).addEventListener("touchend", uitouch.cdTouchEnd, false);
		$('#ctrl-direction').get(0).addEventListener("touchcancel", uitouch.cdTouchCancel, false);

		/*放炸弹*/
		$('#ctrl-skill').on('touchend', function(){
			if(material.mine.havebomb > 0){
				material.mine.havebomb --;
				material.realbomb.push(new bomb(material.mine.x, material.mine.y, 1, 40, 5000, new Date() * 1));
			}

			if(material.mine.havebomb > 0){
				$('#ctrl-skill').removeClass('hide');
                $('#ctrl-skill-num').removeClass('hide').html(material.mine.havebomb);
			}else{
				$('#ctrl-skill,#ctrl-skill-num').addClass('hide');
			}

		})

	},
	playCanvas: function(timeStamp){
		if(!lastRun) {
			/*第一次进入*/
            lastRun = new Date().getTime();
            window.requestAnimFrame(this.playCanvas.bind(this));
            return;
        }

        ctx.clearRect(0, 0, gameCanvas.width(), gameCanvas.height());
        //var delta = (new Date().getTime() - lastRun)/1000;
        lastRun = new Date().getTime();
		canvas.animate(ctx, lastRun);
		window.requestAnimFrame(this.playCanvas.bind(this));
	}
}

new App();