var bombImg = document.getElementById("bomb-image")

export default class Bomb{
	constructor(x, y, state, radius) {
		this.x = x;
		this.y = y;
		this.state = state;
		this.radius = radius;
		this.src = bombImg;
	}
}