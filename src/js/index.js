import {} from './lib/jquery-3.1.1.min.js';
import tool from './lib/tool.js';
import uitouch from './lib/uitouch.js';

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
	},
	bindEvent: function(){
		$('#ctrl-direction').get(0).addEventListener("touchstart", uitouch.cdTouchStart, false);
		$('#ctrl-direction').get(0).addEventListener("touchmove", uitouch.cdTouchMove, false);
		$('#ctrl-direction').get(0).addEventListener("touchend", uitouch.cdTouchEnd, false);
		$('#ctrl-direction').get(0).addEventListener("touchcancel", uitouch.cdTouchCancel, false);
	}
}

new App();