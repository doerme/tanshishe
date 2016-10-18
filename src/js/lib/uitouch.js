export default {
	cdLeftOffset: 0,
	cdTopOffset: 0,
	cdTouchStart: function(event){
		var touch = event.touches[0];
		console.log(touch);
		var startY = touch.pageY;
		var startX = touch.pageX;
		this.cdLeftOffset = startX-$(this).offset().left;
		this.cdTopOffset = startY-$(this).offset().top;
	},
	cdTouchMove: function(event){
		var touch = event.touches[0];
		var endX = touch.pageX;
		var endY = touch.pageY;
		/*显示圆半径*/
		var showRoundR = 50;

		/*圆心*/
		var roundX = parseInt($('#ctrl-direction').offset().left) + parseInt($('#ctrl-direction').width()) / 2;
		var roundY = parseInt($('#ctrl-direction').offset().top) + parseInt($('#ctrl-direction').height()) / 2;
		/*半径*/
		var roundR = 100;
		/*外点*/
		var rsX = endX;
		var rsY = endY;

		
		/*两点之间的距离*/
		var distance = Math.sqrt(Math.pow((roundX-rsX),2) + Math.pow((roundY-rsY),2))
		

		var anX = endX;
		var anY = endY;
		/*触点在圆心之外*/
		console.log(distance, roundR, rsX ,rsY);
		if(distance > roundR){
			/*第一象限*/
			if(rsX > roundX && rsY < roundY){
				anX = roundX + (rsX - roundX) * 100 / distance; 
				anY = roundY + (rsY - roundY) * 100 / distance;
			}
			/*第二象限*/
			if(rsX < roundX && rsY < roundY){
				anX = roundX - (roundX - rsX) * 100 / distance; 
				anY = roundY + (rsY - roundY) * 100 / distance;
			}
			/*第三象限*/
			if(rsX < roundX && rsY > roundY){
				anX = roundX - (roundX - rsX) * 100 / distance; 
				anY = roundY + (rsY - roundY) * 100 / distance;
			}
			/*第四象限*/
			if(rsX > roundX && rsY > roundY){
				anX = roundX + (rsX - roundX) * 100 / distance; 
				anY = roundY + (rsY - roundY) * 100 / distance;
			}
				
		}

		$('#cd-main').css({"left": anX - showRoundR ,"top": anY - showRoundR}).removeClass('hide');;
	},
	cdTouchEnd: function(event){
		$('#cd-main').addClass('hide');
	},
	cdTouchCancel: function(event){

	}
}