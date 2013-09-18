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
	};
	
	this.normalSpeed = function() {
		if(this.dy < 0)
			this.dy = -BallDefaults.SPEED ; 
		else 
			this.dy = BallDefaults.SPEED ; 
	};
	
	this.minDistanceX = function() { 
		return (this.dx > 0) ? this.x + this.radius : this.x - this.radius ; 
	};
	
	this.minDistanceY = function() {
		return (this.dy > 0) ? this.y + this.radius : ((this.y >= 0) ? this.y : this.y - this.radius) ; 
	};
	
	this.move = function() { 
		this.x += this.dx;
		this.y += this.dy;
	};
}

var ball = new Ball(BallDefaults.X, BallDefaults.Y, BallDefaults.RADIUS, 
				BallDefaults.DX, BallDefaults.DY, BallDefaults.COLOR); 

function initBall() {
	ball.x = BallDefaults.X ;
	ball.y = BallDefaults.Y ;
	ball.dx = BallDefaults.DX ;
	ball.dy = BallDefaults.DY ; 
}

/********************* Paddle **************************/

function Paddle(xpos, height, width, color, speed) {
	this.x = xpos ; 
	this.height = height ; 
	this.width = width ; 
	this.color = color ; 
	this.speed = speed ; 
	this.ticks = 0 ; 
	this.image = new Image();
	this.image.src = PADDLE_IMAGE_PATH ; 
	
	this.draw = function() {
		ctx.fillStyle = this.color;
		image(this.image, 0, 0, this.x, HEIGHT-this.height, this.width, this.height); 
	} ; 
	
	this.shorten = function() {
		this.ticks = 3 ; 
		if(this.width > 25 && this.ticks > 0)
			this.width -= 10 ;
		if(this.ticks == 0)
			this.width += 10 ;
	}
	
	this.elongate = function() {
		this.ticks = 3 ; 
		if(this.width < 125 && this.ticks > 0)
			this.width += 10 ;
		if(this.ticks == 0)
			this.width -= 10 ;
	}
	
	this.moveLeft = function() {
		this.x -= this.speed ; 
	}
	
	this.moveRight = function() {
		this.x += this.speed ;
	}	
}

var paddle = new Paddle(PaddleDefaults.XPOS, PaddleDefaults.HEIGHT, PaddleDefaults.WIDTH, 
					PaddleDefaults.COLOR, PaddleDefaults.SPEED); 

/***************************** Bricks ***************************/

function Brick(color, visibility) {
	this.width = BrickDefaults.WIDTH ;
	this.height = BrickDefaults.HEIGHT ;
	this.padding = BrickDefaults.PADDING ; 
	this.points = 0 ;
	this.color = color ;
	this.speedup = false ; 
	this.visible = visibility ; 
	this.destructible = 1 ; 
	this.destroyed = false ; 
	this.paddleElongate = 0 ; 
	switch(this.color) {
		case Colors.RED : 
			this.destructible = 0 ;
			this.points = 50 ;
		break;
		case Colors.GOLD : 
			this.points = 150 ;
		break ;
		case Colors.WHITE : 
			this.paddleElongate = 1 ; 
			this.points = 0 ; 
		break ;
		case Colors.FORESTGREEN : 
			this.paddleElongate = -1 ;
			this.points = 100 ; 
	    break ;
		case Colors.MAROON : 
			this.destructible = 3; 
			this.points = 60 ; 
		break ; 
		case Colors.AQUA : 
			this.speedup = true ;
			this.points = 120 ; 
		break ; 
	}
	
	this.draw = function(x, y) { 
		if(!this.visible)
			this.destroyed = true ; 
		if (this.visible) {
			ctx.fillStyle = this.color ; 
			rect((y * (this.width + this.padding)) + this.padding, (x * (this.
				height + this.padding)) + this.padding, this.width, this.height);
		}
	} ; 
	
	this.destroy = function() {
		this.destroyed = true ;
		this.visible = false ; 
	}; 
	
	this.weaken = function() {
		this.destructible-- ;
	}; 
} 

var totalBricks = 0;

function initBricks() {
    bricks = new Array(NROWS); 
	totalBricks = 0 ; 
    for (i=0; i < NROWS; i++) {
        bricks[i] = new Array(NCOLS);
        for (j=0; j < NCOLS; j++) {
            bricks[i][j] = new Brick(brick_type[GAME_LEVEL][i][j], levels[GAME_LEVEL][i][j]); 
			if(bricks[i][j].visible == true && bricks[i][j].destructible != 0)
				++totalBricks ; 
        }
    }
}

function drawbricks() {
	for (i=0; i < NROWS; i++) 
		for (j=0; j < NCOLS; j++) 
			bricks[i][j].draw(i, j); 
}

