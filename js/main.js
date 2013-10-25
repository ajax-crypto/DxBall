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
				 
var DrawGameScenes = new function() {
	
	var self = this ; 
	
	self.gameRunningScene = function() {
		DxBall.ctx.fillStyle = Colors.BLACK ;
		Graphics.clear(DxBall.WIDTH, DxBall.HEIGHT);
		ball.draw(); 
		paddle.draw(); 
		drawbricks(); 
		gift.draw(); 
	};

	self.gameOverScene = function() { 
		Graphics.clear(DxBall.WIDTH, DxBall.HEIGHT);
		Graphics.rect(0, 0, DxBall.WIDTH, DxBall.HEIGHT, Colors.RED); 
		DxBall.ctx.fillStyle = Colors.GOLD ; 
		DxBall.ctx.fillText('GAME OVER', DxBall.WIDTH/2, DxBall.HEIGHT/2);
		DxBall.ctx.fillText('You have scored ' + DxBall.points, DxBall.WIDTH/2, 
			DxBall.HEIGHT/2 + 20); 
	};

	self.levelCompleteScene = function() {
		Graphics.clear(DxBall.WIDTH, DxBall.HEIGHT);
		Graphics.rect(0, 0, DxBall.WIDTH, DxBall.HEIGHT, Colors.FORESTGREEN); 
		DxBall.ctx.fillStyle = Colors.WHITE ; 
		DxBall.ctx.fillText('LEVEL COMPLETE', DxBall.WIDTH/2, DxBall.HEIGHT/2);
		DxBall.ctx.fillText('You have scored ' + DxBall.points, DxBall.WIDTH/2, 
			DxBall.HEIGHT/2 + 20);
		Graphics.image(imgres[6].res, imgres[6].x, imgres[6].y); 
	};

	self.creditScene = function() {
		Graphics.image(imgres[2].res, imgres[2].x, imgres[2].y); 
	};

	self.splashScreen = function() {
		Graphics.image(imgres[1].res, imgres[1].x, imgres[1].y); 
	};

	self.levelSelectScene = function() {
		Graphics.image(imgres[3].res, imgres[3].x, imgres[3].y); 
		for(i=0; i<6; ++i)
			Graphics.image((licondata[i].unlocked == true ? imgres[5].res : imgres[4].res), 
				licondata[i].x, licondata[i].y); 
	};

	self.gamePausedScene = function() {
		Graphics.grayscale() ; 
		Graphics.image(imgres[7].res, imgres[7].x, imgres[7].y); 
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
	
	self.canvas = document.getElementById('dxball'); 
	self.ctx = self.canvas.getContext('2d');
	self.ctx.font = '20px Verdana' ;
	self.ctx.textAlign = 'center' ;
	self.WIDTH = 640;
	self.HEIGHT = 480;
	
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
