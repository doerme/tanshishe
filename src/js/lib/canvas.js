import canvasfun from './canvasfun.js';
import bomb from '../material/bomb.js';
import fire from '../material/fire.js';

export default {
	pumpkinImg: document.getElementById("pumpkin-image"),
        fireImg: document.getElementById("fire-image"),
        explosionImg: document.getElementById("big-fire-image"),
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
                canvasfun.paramEllipse(ctx, material.mine.x, material.mine.y + 43, 20 + material.mine.yoffset, 5);
                material.mine.lastactiontime = lastRun;
        },
        /*画炸弹资源*/
        drawBomb: function(ctx, lastRun){
                //console.log(material.bomb);
                for(var n in material.bomb){
                        ctx.beginPath();
                        ctx.drawImage(material.bomb[n].src, material.bomb[n].x - material.bomb[n].radius*3/2, material.bomb[n].y - material.bomb[n].radius*3/2, material.bomb[n].radius*3, material.bomb[n].radius*3);
                        ctx.closePath();
                        ctx.stroke();
                }
        },
        /*吃炸弹*/
        mineCrashBomb: function(){
                var _tmp_dx = 0;
                var _tmp_dy = 0;
                var distance = 0;
                for(var n in material.bomb){
                        _tmp_dx = material.mine.x - material.bomb[n].x;
                        _tmp_dy = material.mine.y - material.bomb[n].y;
                        distance = Math.sqrt((_tmp_dx * _tmp_dx) + (_tmp_dy * _tmp_dy));
                        if (distance < material.mine.radius +material.bomb[n].radius) {
                                console.log('bomb!!');
                                material.bomb.splice(n, 1);
                                material.mine.havebomb ++;
                                if(material.mine.havebomb > 0){
                                        $('#ctrl-skill').removeClass('hide');
                                        $('#ctrl-skill-num').removeClass('hide').html(material.mine.havebomb);
                                }
                        }
                }
        },
        /*要爆炸的炸弹*/
        drawRealBomb: function(ctx, lastRun){
                //console.log(material.bomb);
                for(var n in material.realbomb){
                        if(lastRun - material.realbomb[n].settime > material.realbomb[n].lasttime){
                                console.log('real bomb');
                                
                                material.bomb.push(new bomb(10 + parseInt(Math.random()*700), 10 + parseInt(Math.random()*700), 1, 40));
                                this.explosion(material.realbomb[n]);
                                material.realbomb.splice(n, 1);
                                continue;
                        }
                        ctx.font = "bold 24px Microsoft Yahei";
                        ctx.fillStyle = "#F00";
                        ctx.fillText(material.realbomb[n].lasttime - (lastRun - material.realbomb[n].settime), material.realbomb[n].x - material.realbomb[n].radius*1.5, material.realbomb[n].y - material.realbomb[n].radius*1.5);
                        ctx.beginPath();
                        ctx.drawImage(material.realbomb[n].src, material.realbomb[n].x - material.realbomb[n].radius*3/2, material.realbomb[n].y - material.realbomb[n].radius*3/2, material.realbomb[n].radius*3, material.realbomb[n].radius*3);
                        ctx.drawImage(this.fireImg, material.realbomb[n].x - material.realbomb[n].radius*2.5, material.realbomb[n].y - material.realbomb[n].radius*4.5, 250 + (Math.random()*50), 250 + (Math.random()*50));  
                        ctx.closePath();
                        ctx.stroke();
                }
        },
        /*要爆炸的火焰*/
        drawFire: function(ctx, lastRun){
                for(var n in material.fire){
                        if(lastRun - material.fire[n].settime > material.fire[n].lasttime){
                                material.fire.splice(n, 1);
                                continue;
                        }
                        ctx.beginPath();
                        ctx.arc(material.fire[n].x, material.fire[n].y,material.fire[n].radius, 0, Math.PI * 2, true);
                        ctx.drawImage(this.explosionImg, material.fire[n].x - material.fire[n].radius, material.fire[n].y - material.fire[n].radius, material.fire[n].radius + (Math.random()*20), material.fire[n].radius + (Math.random()*20));  
                        ctx.closePath();
                        ctx.stroke();
                }

        },
        /*爆炸*/
        explosion: function(bombobj){
                /*left*/
                material.fire.push(new fire(bombobj.x - bombobj.radius, bombobj.y + 2 * bombobj.radius , 1, 20, 1000, new Date() * 1));
                /*right*/
                material.fire.push(new fire(bombobj.x + 2 * bombobj.radius, bombobj.y + 2 * bombobj.radius, 1, 20, 1000, new Date() * 1));
                /*top*/
                material.fire.push(new fire(bombobj.x + bombobj.radius, bombobj.y , 1, 20, 1000, new Date() * 1));
                /*bottom*/
                material.fire.push(new fire(bombobj.x + bombobj.radius, bombobj.y + 3 * bombobj.radius, 1, 20, 1000, new Date() * 1));
        },
        animate: function(ctx, lastRun){
		//console.log(lastRun);
		this.drawMine(ctx, lastRun);
                this.drawBomb(ctx, lastRun);
                this.drawRealBomb(ctx, lastRun);
                this.drawFire(ctx, lastRun);
                this.mineCrashBomb();
        }

}