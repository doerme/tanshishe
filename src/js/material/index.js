import mine from './mine.js';

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
		radius: 20,
		color: '#F00',
		x: 375,
		y: 375,
		v: 1,
		vx: 0,
		vy: 0,
		walked: 0,
		lastactiontime: 0,
	},
}