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
	
	this.draw = function() {
		ctx.fillStyle = this.color;
		image(imgres[0].res, 0, 0, this.x, HEIGHT-this.height, this.width, this.height); 
	} ; 
	
	this.shorten = function() {
		this.ticks = 3 ; 
		if(this.width > 25 && this.ticks > 0)
			this.width -= 10 ;
		if(this.ticks == 0)
			this.width += 10 ;
	};
	
	this.elongate = function() {
		this.ticks = 3 ; 
		if(this.width < 125 && this.ticks > 0)
			this.width += 10 ;
		if(this.ticks == 0)
			this.width -= 10 ;
	};
	
	this.moveLeft = function() {
		this.x -= this.speed ; 
	};
	
	this.moveRight = function() {
		this.x += this.speed ;
	};	
}

var paddle = new Paddle(PaddleDefaults.XPOS, PaddleDefaults.HEIGHT, PaddleDefaults.WIDTH, 
					PaddleDefaults.COLOR, PaddleDefaults.SPEED); 

/***************************** Bricks ***************************/

function Brick(type) {
	this.width = BrickDefaults.WIDTH ;
	this.height = BrickDefaults.HEIGHT ;
	this.padding = BrickDefaults.PADDING ; 
	this.points = 100 ;
	this.color = Colors.BLACK ;
	this.speedup = false ; 
	this.visible = true ; 
	this.destructible = 1 ; 
	this.destroyed = false ; 
	this.paddleElongate = 0 ; 
	this.type = type ;
	switch(this.type) {
		case 0 :
			this.visible = false ;
		break ;
		case 1 :
			this.color = Colors.AQUA ;
			this.speedup = true ;
		break ;
		case 2 :
			this.color = Colors.MAROON ;
			this.destructible = 3 ;
		break ;
		case 3 :
			this.color = Colors.GOLD ;
			this.points = 150 ;
		break ;
		case 4 :
			this.color = Colors.FORESTGREEN ;
			this.paddleElongate = -1 ;
		break ;
		case 5 :
			this.color = Colors.WHITE ;
			this.paddleElongate = 1 ;
		break ;
		case 6 :
			this.color = Colors.RED ;
			this.destructible = 0 ;
			this.points = -50 ;
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
            bricks[i][j] = new Brick(gamedata[GAME_LEVEL][i][j]); 
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

