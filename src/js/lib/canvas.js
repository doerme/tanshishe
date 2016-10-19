export default {
	drawMine: function(ctx, lastRun){
		if(material.mine.lastactiontime == 0 && lastRun == 0){
			return;
		}
		if(material.mine.lastactiontime == 0 && lastRun > 0){
			material.mine.lastactiontime = lastRun;
			return;
		}

		//console.log(material.mine.vx , material.mine.vy, material.mine.lastactiontime, lastRun);

		var _tmp_dx = material.mine.vx * (lastRun - material.mine.lastactiontime) / 1000;
        var _tmp_dy = material.mine.vy * (lastRun - material.mine.lastactiontime) / 1000;

        material.mine.x = material.mine.x + _tmp_dx;
        material.mine.y = material.mine.y + _tmp_dy;
        material.mine.lastactiontime = lastRun;
        material.mine.walked += Math.sqrt((_tmp_dx * _tmp_dx) + (_tmp_dy * _tmp_dy));

		ctx.fillStyle = material.mine.color;
        ctx.beginPath();
        ctx.arc(material.mine.x, material.mine.y,material.mine.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
	},
	animate: function(ctx, lastRun){
		//console.log(lastRun);
		this.drawMine(ctx, lastRun);
	}

}