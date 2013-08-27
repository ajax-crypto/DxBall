function Ball(x, y, radius, movex, movey, color) {
	this.x = x ; 
	this.y = y ;
	this.radius = radius ;
	this.dx = movex ;
	this.dy = movey ;
	this.color = color ;
	this.ticks = 0 ; 
	
	this.draw = function() {
		ctx.fillStyle = this.color;
		circle(this.x, this.y, this.radius);
	} ;
	
	this.speedup = function() {
		if(this.dy < 0)
			this.dy -= BallDefaults.SPEED_UP ; 
		else 
			this.dy += BallDefaults.SPEED_UP ; 
	}
	
	this.normalSpeed = function() {
		if(this.dy < 0)
			this.dy = -BallDefaults.SPEED ; 
		else 
			this.dy = BallDefaults.SPEED ; 
	}
	
	this.minDistanceX = function() { 
		return (this.dx > 0) ? this.x + this.radius : this.x - this.radius ; 
	}
	
	this.minDistanceY = function() {
		return (this.dy > 0) ? this.y + this.radius : ((this.y >= 0) ? this.y : this.y - this.radius) ; 
	}
}

var ball = new Ball(BallDefaults.X, BallDefaults.Y, BallDefaults.RADIUS, 
				BallDefaults.DX, BallDefaults.DY, BallDefaults.COLOR); 

function initBall() {
	ball.x = BallDefaults.X ;
	ball.y = BallDefaults.Y ;
	ball.dx = BallDefaults.DX ;
	ball.dy = BallDefaults.DY ; 
}