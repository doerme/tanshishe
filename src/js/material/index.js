import mine from './mine.js';
import bomb from './bomb.js';
import fire from './bomb.js';

export default {
	/*地图*/
	map: {
		type: 1,
		width: 750,
		height: 750
	},
	/*自身*/
	mine: {
		type: 2,
		radius: 40,
		color: '#F00',
		yoffset: 0,
		xoffset: 0,
		x: 375,
		y: 375,
		v: 1,
		vx: 0,
		vy: 0,
		walked: 0,
		lastactiontime: 0,
		havebomb: 0,
	},
	/*炸弹资源*/
	bomb: [
		new bomb(10 + parseInt(Math.random()*700), 10 + parseInt(Math.random()*700), 1, 40)
	],
	/*炸弹*/
	realbomb: [],
	/*火焰*/
	fire: [
		
	]
}