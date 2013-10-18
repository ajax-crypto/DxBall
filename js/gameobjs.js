function Ball(x, y, radius, movex, movey, color) {
	this.x = x ; 
	this.y = y ;
	this.radius = radius ;
	this.dx = movex ;
	this.dy = movey ;
	this.color = color ;
	this.ticks = 0 ; 
}

Ball.prototype.speedup = function() {
		if(this.dy < 0)
			this.dy -= BallDefaults.SPEED_UP ; 
		else 
			this.dy += BallDefaults.SPEED_UP ; 
	};
	
Ball.prototype.normalSpeed = function() {
		if(this.dy < 0)
			this.dy = -BallDefaults.SPEED ; 
		else 
			this.dy = BallDefaults.SPEED ; 
	};
	
Ball.prototype.move = function() { 
		this.x += this.dx;
		this.y += this.dy;
	};
	
Ball.prototype.draw = function() {
		ctx.fillStyle = this.color;
		circle(this.x, this.y, this.radius);
	};
	
Ball.prototype.collideH = function() {
		this.dx = -this.dx ;
	};

Ball.prototype.collideV = function() {
		this.dy = -this.dy ;
	};

var ball = new Ball(BallDefaults.X, BallDefaults.Y, BallDefaults.RADIUS, 
				BallDefaults.DX, BallDefaults.DY, BallDefaults.COLOR); 

function initBall() {
	ball.x = BallDefaults.X ;
	ball.y = BallDefaults.Y ;
	ball.dx = BallDefaults.DX ;
	ball.dy = BallDefaults.DY ; 
}

/********************* Paddle **************************
 * Its a singleton !
 * *****************************************************/

var paddle = new function () {
	this.x = PaddleDefaults.XPOS ; 
	this.height = PaddleDefaults.HEIGHT ; 
	this.width = PaddleDefaults.WIDTH ; 
	this.color = PaddleDefaults.COLOR ; 
	this.speed = PaddleDefaults.SPEED ; 
	
	this.draw = function() {
		ctx.fillStyle = this.color;
		image(imgres[0].res, 0, 0, this.x, HEIGHT-this.height, this.width, this.height); 
	} ; 
	
	this.shorten = function() {
		if(this.width > 25)
			this.width -= 10 ;
	};
	
	this.elongate = function() {
		if(this.width < 125)
			this.width += 10 ;
	};
	
	this.moveLeft = function() {
		this.x -= this.speed ; 
	};
	
	this.moveRight = function() {
		this.x += this.speed ;
	};	
}; 

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
} 

Brick.prototype.draw = function(x, y) { 
		if(!this.visible)
			this.destroyed = true ; 
		if (this.visible) {
			ctx.fillStyle = this.color ; 
			rect((y * (this.width + this.padding)) + this.padding, (x * (this.
				height + this.padding)) + this.padding, this.width, this.height);
		}
	};
	
Brick.prototype.destroy = function() {
		this.destroyed = true ;
		this.visible = false ; 
	}; 

Brick.prototype.weaken = function() {
		if(this.destructible > 1)
			this.destructible-- ; 
		else {
			this.destroyed = true ;
			this.visible = false ; 
		}
	}; 
	
Brick.prototype.hit = function() {
		if(this.destructible == 1) {
			this.destroyed = true ;
			this.visible = false ; 
			--totalBricks ; 
		}
	}; 

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

