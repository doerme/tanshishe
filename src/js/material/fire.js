var fireImg = document.getElementById("fire-image");

export default class Fire{
	constructor(x, y, state, radius, lasttime, settime) {
		this.x = x;
		this.y = y;
		this.state = state;
		this.radius = radius;
		this.src = fireImg;
		this.lasttime = lasttime;
		this.settime = settime;
	}
}