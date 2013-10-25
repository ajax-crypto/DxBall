var canvas = document.getElementById('dxball'); 
var ctx = canvas.getContext('2d');
ctx.font = '20px Verdana' ;
ctx.textAlign = 'center' ;
var WIDTH = 640;
var HEIGHT = 480;
var rightDown = false;
var leftDown = false;

var GameStates = Object.freeze({
				 INVALID : 0,
				 SPLASH_SCREEN : 1,
				 CHAPTER_SELECT : 2,
				 RUNNING : 3,
				 LEVEL_COMPLETE : 4,
				 GAME_OVER : 5,
				 PAUSED : 6,
				 CREDIT_SCENE : 7
			 });
 
var Colors = Object.freeze({ WHITE : "#FFFFFF",
			     BLACK : "#000000",
			     RED : "#FF0000", 
			     ROYALBLUE : "#4169E1",
			     PURPLE : "#800080",
			     ORANGERED : "#FF4500",
			     NAVYBLUE : "#000080",
			     MAROON : "#800000",
			     FORESTGREEN : "#228B22",
			     DODGERBLUE : "#1E90FF",
			     DARKGREEN : "#006400",
			     CRIMSON : "#DC143C",
			     SEAGREEN : "#2E8B57",
			     TEAL : "#008080",
			     TORQUIOSE : "#40E0D0",
			     MAGENTA : "#FF00FF",
			     AQUA : "#00FFFF",
			     GOLD : "#FFD700"
			  }); 

var BrickDefaults = Object.freeze({ WIDTH : ~~(640/8), 
				    HEIGHT : 25,
				    PADDING : 1,
				    TRUE_HEIGHT : 26,
				    TRUE_WIDTH : 81
				 }); 
								 
var PaddleDefaults = Object.freeze({ WIDTH : 75,
				     HEIGHT : 10,
				     SPEED : 7,
				     XPOS : WIDTH/2 
				   }); 
								  
var BallDefaults = Object.freeze({ RADIUS : 6,
				   COLOR : Colors.WHITE,
				   SPEED : 4, 
				   DX : 1.5,
				   DY : -4,
				   X : 25,
				   Y : 250, 
				   SPEED_UP : 2
				 }); 
				 
var DrawGameScenes = new function() {
	
	var self = this ; 
	
	self.gameRunningScene = function() {
		ctx.fillStyle = Colors.BLACK ;
		clear();
		ball.draw(); 
		paddle.draw(); 
		drawbricks(); 
		gift.draw(); 
	};

	self.gameOverScene = function() { 
		clear(); 
		ctx.fillStyle = Colors.RED ;
		rect(0, 0, WIDTH, HEIGHT); 
		ctx.fillStyle = Colors.GOLD ; 
		ctx.fillText('GAME OVER', WIDTH/2, HEIGHT/2);
		ctx.fillText('You have scored ' + DxBall.points, WIDTH/2, HEIGHT/2 + 20); 
	};

	self.levelCompleteScene = function() {
		clear(); 
		ctx.fillStyle = Colors.FORESTGREEN ;
		rect(0, 0, WIDTH, HEIGHT); 
		ctx.fillStyle = Colors.WHITE ; 
		ctx.fillText('LEVEL COMPLETE', WIDTH/2, HEIGHT/2);
		ctx.fillText('You have scored ' + DxBall.points, WIDTH/2, HEIGHT/2 + 20);
		ctx.drawImage(imgres[6].res, imgres[6].x, imgres[6].y); 
	};

	self.creditScene = function() {
		ctx.drawImage(imgres[2].res, imgres[2].x, imgres[2].y); 
	};

	self.splashScreen = function() {
		ctx.drawImage(imgres[1].res, imgres[1].x, imgres[1].y); 
	};

	self.levelSelectScene = function() {
		ctx.drawImage(imgres[3].res, imgres[3].x, imgres[3].y); 
		for(i=0; i<6; ++i)
			ctx.drawImage((licondata[i].unlocked == true ? imgres[5].res : imgres[4].res), 
				licondata[i].x, licondata[i].y); 
	};

	self.gamePausedScene = function() {
		grayscale() ; 
		ctx.drawImage(imgres[7].res, imgres[7].x, imgres[7].y); 
	};
	
	self.drawScene = [];
	self.drawScene[GameStates.SPLASH_SCREEN] = self.splashScreen ; 
	self.drawScene[GameStates.LEVEL_SELECT] = self.levelSelectScene ; 
	self.drawScene[GameStates.RUNNING] = self.gameRunningScene ;
	self.drawScene[GameStates.PAUSED] = self.gamePausedScene ;
	self.drawScene[GameStates.LEVEL_COMPLETE] = self.levelCompleteScene ;
	self.drawScene[GameStates.GAME_OVER] = self.gameOverScene ;
	self.drawScene[GameStates.CREDIT_SCENE] = self.creditScene ; 
	
	self.draw = function(state) {
		self.drawScene[state](); 
	};
};

var DxBall = new function() {
	
	var self = this ; 
	
	self.state = GameStates.SPLASH_SCREEN ; 
	self.pstate = GameStates.INVALID ; 
	self.playstate = true ; 
	self.points = 0 ; 
	self.loop = 0 ; 
	self.level = 0 ; 
	self.bricks = 0 ; 
	self.FPS = 60 ; 
	
	self.setState = function(state) {
		self.pstate = self.state ; 
		self.state = state ; 
	};
	
	self.addPoints = function(val) {
		self.points += val ;
	};
	
	self.setBricks = function(val) {
		self.bricks = val ;
	};
	
	self.setLevel = function(val) {
		self.level = val ;
	};
	
	self.resetPoints = function() {
		self.points = 0 ;
	};
	
	self.reduceBrick = function() {
		--self.bricks ;
	};
	
	self.isComplete = function() {
		return (self.bricks == 0) ; 
	};
	
	self.isRunning = function() {
		return self.state == GameStates.RUNNING ;
	};
	
	self.isPaused = function() {
		return self.state == GameStates.PAUSED ;
	}
	
	self.nextLevel = function() {
		++self.level ;
	};

	self.restart = function() {
		self.state = GameStates.RUNNING ; 
		clearTimeout(self.loop);
		self.start(); 
	};
	
	self.start = function() {
		clearTimeout(self.loop); 
		initBricks(); 
		initBall(); 
		initGifts(); 
		self.playState = true ; 
		gameLoop(); 
	};

	self.resume = function() {
		self.state = GameStates.RUNNING ;
	};
	
	self.pause = function() {
		self.state = GameStates.PAUSED ;
	}
};

function gameLoop() {
	if(DxBall.pstate != DxBall.state) {
		handleGameEvents(DxBall.state, DxBall.pstate); 
		DrawGameScenes.draw(DxBall.state) ;
	}
	DxBall.pstate = DxBall.state ; 
	if(DxBall.isRunning()) {
		DrawGameScenes.draw(DxBall.state) ;
		DxBall.playState = handleCollisions(); 
		if(!DxBall.playState) 
			DxBall.state = GameStates.GAME_OVER ;
		if(DxBall.isComplete()) {
			DxBall.state = GameStates.LEVEL_COMPLETE ; 
			DxBall.nextLevel() ;
			licondata[DxBall.level].unlocked = true ; 
		} 
	}
	DxBall.loop = setTimeout(gameLoop, 1000/DxBall.FPS); 
}
