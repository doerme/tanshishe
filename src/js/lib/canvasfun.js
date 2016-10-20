export default {
	paramEllipse: function(context, x, y, a, b){
	   //max是等于1除以长轴值a和b中的较大者
	   //i每次循环增加1/max，表示度数的增加
	   //这样可以使得每次循环所绘制的路径（弧线）接近1像素
	   var step = (a > b) ? 1 / a : 1 / b;
	   context.beginPath();
	   context.moveTo(x + a, y); //从椭圆的左端点开始绘制
	   for (var i = 0; i < 2 * Math.PI; i += step)
	   {
	      //参数方程为x = a * cos(i), y = b * sin(i)，
	      //参数为i，表示度数（弧度）
	      context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
	   }
	   context.closePath();
	   context.fillStyle="#333";
	   context.fill();
	},
	circle: function(context, x, y, a) { // x,y是坐标;a是半径
	    var r = 1/a; // ①注意：此处r可以写死，不过不同情况下写死的值不同
	    context.beginPath();
	    context.moveTo(x + a, y);
	    for(var i = 0; i < 2 * Math.PI; i += r) {
	        context.lineTo(x + a * Math.cos(i), y + a * Math.sin(i));
	    }
	    context.closePath();
	    context.fill();
	}
}