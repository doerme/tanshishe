import canvasfun from './canvasfun.js'

export default {
	pumpkinImg: document.getElementById("pumpkin-image"),
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

        /*防撞墙*/
        if(material.mine.x < material.mine.radius){
        	material.mine.x = material.mine.radius;
        }

        if(material.mine.y < material.mine.radius){
        	material.mine.y = material.mine.radius;
        }

        if(material.mine.x > gameCanvas.width() - material.mine.radius){
        	material.mine.x = gameCanvas.width() - material.mine.radius;
        }

        if(material.mine.y > gameCanvas.height() - material.mine.radius){
        	material.mine.y = gameCanvas.height() - material.mine.radius;
        }

        /*防撞墙end*/
        
        material.mine.walked += Math.sqrt((_tmp_dx * _tmp_dx) + (_tmp_dy * _tmp_dy));
        

        if(material.mine.vx != 0 || material.mine.vy != 0){
        	if(parseInt(material.mine.walked) % 50 > 25){
        		material.mine.yoffset = 0;
        	}else{
        		material.mine.yoffset = 10;
        	}
        }else{
        	material.mine.yoffset = 10;
        }

        //console.log(material.mine.walked, material.mine.yoffset, parseInt(material.mine.walked) % 50 > 25);
        var pumpkinImgRadius = material.mine.radius * 3;
		ctx.fillStyle = material.mine.color;
        ctx.beginPath();
        //ctx.arc(material.mine.x, material.mine.y,material.mine.radius, 0, Math.PI * 2, true);
        ctx.drawImage(this.pumpkinImg, material.mine.x - pumpkinImgRadius/2, material.mine.y - pumpkinImgRadius/2 - 10 + material.mine.yoffset, pumpkinImgRadius, pumpkinImgRadius);
        ctx.closePath();
        ctx.fill();
        canvasfun.paramEllipse(ctx, material.mine.x, material.mine.y + 48, 20 + material.mine.yoffset, 5);
        material.mine.lastactiontime = lastRun;
	},
	animate: function(ctx, lastRun){
		//console.log(lastRun);
		this.drawMine(ctx, lastRun);
	}

}