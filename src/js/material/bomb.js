var bombImg = document.getElementById("bomb-image");

export default class Bomb{
	constructor(x, y, state, radius, lasttime, settime) {
		this.x = x;
		this.y = y;
		this.state = state;
		this.radius = radius;
		this.src = bombImg;
		this.lasttime = lasttime;
		this.settime = settime;
	}
}