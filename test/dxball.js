var canvas = document.getElementById('dxball'); 
var ctx = canvas.getContext('2d');

var WIDTH = 640;
var HEIGHT = 480;
var rightDown = false;
var leftDown = false;
var bricks;
var gameLoop ; 
var points = 1 ; 

var PADDLE_IMAGE_PATH = "img/paddle.png" ; 
var SPLASH_SCREEN_PATH = "img/splash.png" ; 
CREDIT_SCREEN_PATH  = "img/credit.png" ; 

var Colors = Object.freeze({ "WHITE" : "#FFFFFF",
							 "BLACK" : "#000000"
						  }); 

var BrickDefaults = Object.freeze({ "WIDTH" : 80, 
									"HEIGHT" : 25,
									"PADDING" : 1,
									"TRUE_HEIGHT" : 26,
									"TRUE_WIDTH" : 81
								 }); 
								 
var PaddleDefaults = Object.freeze({ "WIDTH" : 75,
									 "HEIGHT" : 10,
									 "SPEED" : 7,
									 "COLOR" : Colors.WHITE,
									 "XPOS" : WIDTH/2 
								  }); 
								  
var BallDefaults = Object.freeze({ "RADIUS" : 6,
								   "COLOR" : Colors.WHITE,
								   "SPEED" : 4, 
								   "DX" : 1.5,
								   "DY" : -4,
								   "X" : 25,
								   "Y" : 250, 
								   "SPEED_UP" : 4
								}); 

var rowcolors = ["#FF1C0A", 
				 "#FFFD0A", 
				 "#00A308", 
				 "#0008DB", 
				 "#EB0093", 
				 "#7FFFD4", 
				 "#8A2BE2", 
				 "#A0522D"];
				 
var GAME_LEVEL = 0 ; 

var FPS = 100 ; 

var AUTHOR = 'Akash Pradhan' ; 

var START = -1 ; 
var SPLASH_SCREEN = 0 ; 
var RUNNING = 1 ; 
var LEVEL_COMPLETE = 2 ;
var GAME_OVER = 3 ; 
var PAUSED = 4 ; 
var CREDIT_SCENE = 5 ; 

var gameState = START ; 
var prevState = -2 ; 
var playState = true ; 
var isRunning = false ; 

function getOffset(el) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

var canvasMinX = getOffset(canvas).left;
var canvasMaxX = canvasMinX + WIDTH;
var canvasMinY = getOffset(canvas).top; 

function roundRect(x, y, width, height, radius, fill) {
    if (typeof radius === "undefined") {
		radius = 5;
	}
	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.lineTo(x + width - radius, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
	ctx.lineTo(x + width, y + height - radius);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	ctx.lineTo(x + radius, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
	ctx.lineTo(x, y + radius);
	ctx.quadraticCurveTo(x, y, x + radius, y);
	ctx.closePath();
	if (fill) 
		ctx.fill();   
	else
		ctx.stroke(); 
}

function circle(x, y, r) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
}

function rect(x, y, w, h) {
	ctx.beginPath();
	ctx.rect(x, y, w, h);
	ctx.closePath();
	ctx.fill();
}

function clear() {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	rect(0, 0, WIDTH, HEIGHT);
}

function image(img, cx, cy, x, y, w, h) {
	ctx.drawImage(img, cx, cy, img.width, img.height, x, y, w, h); 
}  

document.getElementById('start').addEventListener('click', function() { 
		pause.innerHTML = "Pause" ; 
		RunGame(); 
	}, false); 
	
document.getElementById('pause').addEventListener('click', function() {
		if(gameState == RUNNING) {
			gameState = PAUSED ; 
			pause.innerHTML = "Resume" ; 
		}
		else if(gameState == PAUSED) {
			gameState = RUNNING ; 
			pause.innerHTML = "Pause" ;
		}
	}, false); 

function checkBounds(pos) {
	if(pos.x < 402 && pos.x > 250 && pos.y < 480 && pos.y > 417)
		return true ; 
	return false ;
}

var runningGameSceneHandler = {
	handleEvent : function(evt) {
		switch(evt.type) {
			case 'keydown' : 
				if (evt.keyCode == 39) 
					rightDown = false;
				else if (evt.keyCode == 37) 
					leftDown = false;
			break ;
				 
			case 'keyup' : 
				if (evt.keyCode == 39) 
					rightDown = true;
				else if (evt.keyCode == 37) 
					leftDown = true;
			break ;
				
			case 'mousemove' : 
				//console.log("mouse moved");
				if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
					paddle.x = Math.max(evt.pageX - canvasMinX - (paddle.width/2), 0);
					paddle.x = Math.min(WIDTH - paddle.width, paddle.x);
			   }
			break ;
		}
	}
}; 

var splashScreenHandler = {
	handleEvent : function(evt) {
		switch(evt.type) {
			case 'click' : 
				evt.preventDefault();
				var mouse = {
					x: evt.pageX - canvasMinX,
					y: evt.pageY - canvasMinY
				}; 
	
				if(checkBounds(mouse)) {
					clear(); 
					gameState = CREDIT_SCENE ; 
				}
			break ;
				
			case 'mousemove' : 
				//console.log("mouse moved");
				var mouse = {
					x: evt.pageX - canvasMinX,
					y: evt.pageY - canvasMinY
				}; 
	
				if(checkBounds(mouse)) 
					canvas.style.cursor = 'pointer' ;
				else
					canvas.style.cursor = 'default' ;
			break ;
		}
	}
};

function unregisterEvents(state) {
	switch(state) {
		case RUNNING : 
			canvas.removeEventListener('keydown', runningGameSceneHandler, false); 
			canvas.removeEventListener('keyup', runningGameSceneHandler, false); 
			canvas.removeEventListener('mousemove', runningGameSceneHandler, false);
		break ;
		case SPLASH_SCREEN :
			canvas.removeEventListener('click', splashScreenHandler, false); 
			canvas.removeEventListener('mousemove', splashScreenHandler, false); 
		break;
	}
}

function handleGameEvents(currState, prevState) {
	unregisterEvents(prevState); 
	switch(currState) {
		case START : 
			//console.log("start "); 
		case SPLASH_SCREEN :
			canvas.addEventListener('click', splashScreenHandler, false); 
			canvas.addEventListener('mousemove', splashScreenHandler, false); 
		break;
		case RUNNING : 
			//console.log("running... "); 
			canvas.addEventListener('keydown', runningGameSceneHandler, false); 
			canvas.addEventListener('keyup', runningGameSceneHandler, false); 
			canvas.addEventListener('mousemove', runningGameSceneHandler, false);
		break ;
	}
}

function drawGameRunningScene() {
	ctx.fillStyle = Colors.BLACK ;
    clear();
	ball.draw(); 
	paddle.draw(); 
    drawbricks(); 
}

function drawGameOverScene() { 
	clear(); 
	ctx.fillStyle = '#FF0000' ;
	rect(0, 0, WIDTH, HEIGHT); 
	ctx.fillStyle = '#FFFAF0' ; 
	ctx.font = "20px Verdana" ;
	ctx.fillText("GAME OVER", WIDTH/2-50, HEIGHT/2);
	ctx.fillText("You have scored " + points, WIDTH/2-100, HEIGHT/2 + 30);
}

function drawLevelCompleteScene() {
	clear(); 
	ctx.fillStyle = '#FF0000' ;
	rect(0, 0, WIDTH, HEIGHT); 
	ctx.fillStyle = '#FFFAF0' ; 
	ctx.font = "20px Verdana" ;
	ctx.fillText("LEVEL COMPLETE", WIDTH/2-80, HEIGHT/2);
	ctx.fillStyle = '#8B0000' ; 
	rect(350, 400, WIDTH-350, HEIGHT-400); 
	ctx.fillStyle = Colors.WHITE ; 
	ctx.fillText("NEXT >>", 350 + (WIDTH-350)/2 - 40, 400 + (HEIGHT-400)/2); 
	ctx.fillText("You have scored " + points, WIDTH/2-100, HEIGHT/2 + 30);
}

function drawCreditScene() {
	credit_image = new Image(); 
	credit_image.onload = function() {
		ctx.drawImage(credit_image, 0, 0);
	};
	credit_image.src = CREDIT_SCREEN_PATH ; 
}

function drawSplashScreen() {
	splash_image = new Image();
	splash_image.onload = function() {
		ctx.drawImage(splash_image, 0, 0); 
	}; 
	splash_image.src = SPLASH_SCREEN_PATH ; 
}

function drawGameScenes(_gameState) {
	switch(_gameState) {
		case START :
		case SPLASH_SCREEN :
			drawSplashScreen();
			break ;
		case RUNNING : 
			drawGameRunningScene();
			break ;
		case CREDIT_SCENE :
			drawCreditScene(); 
			break ;
		case GAME_OVER :
			drawGameOverScene();
			break ; 
	}
}

var NROWS = 8;
var NCOLS = 8;	

var MAX_LEVELS = 10 ;

var levels = new Array(MAX_LEVELS); 
	
var brickMatrix = new Array(NROWS); 
for(var i=0; i<NROWS-1; ++i)
	brickMatrix[i] = [false, false, false, false, false, false, false, false]; 
brickMatrix[NROWS-1] = [false, true, true, true, true, true, true, true]; 

levels[0] = brickMatrix ; 

function Brick(width, height, padding, points, color, visibility) {
	this.width = width ;
	this.height = height ;
	this.padding = padding ; 
	this.points = points ;
	this.color = color ;
	this.speedup = false ; 
	this.visible = visibility ; 
	this.destructible = 1 ; 
	this.destroyed = false ; 
	this.paddleElongate = 0 ; 
	switch(this.color) {
		case "#FF1C0A" : this.destructible = 0 ;
						 break;
		case "#00A308" : this.points += 100 ;
						 break ;
		case "#EB0093" : this.paddleElongate = 1 ; 
						 break ;
		case "#8A2BE2" : this.paddleElongate = -1 ;
				         break ;
		case "#A0522D" : this.destructible = (~~(Math.random()*2) + 1); 
						 break ; 
		case "#7FFFD4" : this.speedup = true ;
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
} 

function initBricks() {
    bricks = new Array(NROWS); 
    for (i=0; i < NROWS; i++) {
        bricks[i] = new Array(NCOLS);
        for (j=0; j < NCOLS; j++) {
            bricks[i][j] = new Brick(BrickDefaults.WIDTH, BrickDefaults.HEIGHT, 
				BrickDefaults.PADDING, ~~(Math.random()*10), rowcolors[~~(Math.
				random()*10)], levels[GAME_LEVEL][i][j]); 
        }
    }
}

function drawbricks() {
	for (i=0; i < NROWS; i++) 
		for (j=0; j < NCOLS; j++) 
			bricks[i][j].draw(i, j); 
}

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
		
}

var paddle = new Paddle(PaddleDefaults.XPOS, PaddleDefaults.HEIGHT, PaddleDefaults.WIDTH, 
					PaddleDefaults.COLOR, PaddleDefaults.SPEED); 
					
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

// Handles paddle collision with canvas walls
function handlePaddle() {
	if (rightDown && (paddle.x < canvasMaxX)) 
		paddle.x += paddle.speed;
	else if (leftDown && (paddle.x > canvasMinX)) 
		paddle.x -= paddle.speed;
}

// Handles ball and brick collision
function handleBallBrick() {
	if (ball.y < NROWS*BrickDefaults.TRUE_HEIGHT) {
		var row = ~~(ball.y/BrickDefaults.TRUE_HEIGHT);
		var col = ~~(ball.x/BrickDefaults.TRUE_WIDTH);
		
		//console.log(row+","+col+" : "+ball.y+","+ball.x); 
		
		if(row >= 0 && col >= 0 && bricks[row][col].visible) {
			if(ball.x > col*BrickDefaults.HEIGHT && ball.x < (col+1)*BrickDefaults.HEIGHT)
				ball.dx = -ball.dx ; 
			else 
				ball.dy = -ball.dy;		
				
			//console.log(ball.minDistanceY() + " , " + row*BrickDefaults.WIDTH + " , " + (row+1)*BrickDefaults.WIDTH); 
			
			if(bricks[row][col].speedup) 
				ball.speedup() ;
			else
				ball.normalSpeed(); 
			
			if(bricks[row][col].destructible == 1) {
				bricks[row][col].visible = false ;
				bricks[row][col].destroyed = true ;
				
				if(bricks[row][col].paddleElongate > 0) 
					paddle.elongate(); 
				else if(bricks[row][col].paddleElongate < 0)
					paddle.shorten(); 
			}
			
			else if(bricks[row][col].destructible > 1)
				bricks[row][col].destructible-- ; 
				
			points += bricks[row][col].points ; 
		}
	}
}

// Handles ball paddle collision 
function handleBallPaddle() {
	var ballright = ball.x + ball.dx + ball.radius ; 
	var ballleft  = ball.x + ball.dx - ball.radius ; 
	var bally   = ball.y + ball.dy ;
	
    if (ballright > WIDTH || ballleft < 0)
		ball.dx = -ball.dx;
	if (bally < 0)
		ball.dy = -ball.dy;
		
	else if (bally > HEIGHT - paddle.height) {
		if(ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
		
			//move the ball according to where it hit the paddle
			ball.dx =  8*((ball.x-(paddle.x + paddle.width/2))/paddle.width);
			ball.dy = -ball.dy;
			
			if(paddle.ticks > 0)
				paddle.ticks-- ;
				
			//console.log(paddle.ticks + " , " + ball.ticks);
		}
		else if(bally > HEIGHT) {
			return false ; // ball falls here 
		}
	}
	return true ; 
}

function handleCollisions() { 
	
	handlePaddle();
	handleBallBrick();
	var temp = handleBallPaddle(); 
	ball.x += ball.dx;
	ball.y += ball.dy;
	
	return temp ; 
}


/******************** Game Loop ********************/ 

function isComplete() {
	for (i=0; i < NROWS; i++) 
		for (j=0; j < NCOLS; j++) 
			if(levels[GAME_LEVEL][i][j].destroyed == false && levels[GAME_LEVEL][i][j].destructible > 0) 
				return false;
	return true ;
}

function GameLoop() { 
	
	var sceneChanged ; 
	
	if(prevState != gameState) {
		handleGameEvents(gameState, prevState); 
	}
	
	if(prevState != gameState || gameState == RUNNING)
		sceneChanged = true ; 
	
	prevState = gameState ; 
	
	if(sceneChanged)
		drawGameScenes(gameState); 
		
	if(playState)
		playState = handleCollisions(); 
	else if(!playState) {
		console.log("Game over"); 
		gameState = GAME_OVER ;
	}
	else if(isComplete()) {
		gameState = LEVEL_COMPLETE ; 
		++GAME_LEVEL ;
	}
	
	if(gameState == PAUSED)
		toggleRunningState(); 
}

function toggleRunningState() {
	if(isRunning) {
		clearInterval(gameLoop);
		isRunning = false ;
	}
	else {
		isRunning = true ; 
		gameLoop = setInterval(GameLoop, 1000/FPS); 
	}
}

function RunGame() {
	gameState = RUNNING ; 
	isRunning = true ; 
	clearInterval(gameLoop);
	gameLoop = setInterval(GameLoop, 1000/FPS); 
	initBricks(); 
	initBall(); 
	GameLoop(); 
}

initBricks(); 
initBall(); 
toggleRunningState();
	