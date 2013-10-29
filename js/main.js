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
 
var DrawGameScenes = new function() {
	
	var self = this ; 
	
	self.drawScene = [];
	
	self.drawScene[GameStates.SPLASH_SCREEN] = function() {
		Graphics.image(ImageResource[1].res, ImageResource[1].x, ImageResource[1].y); 
	};
	
	self.drawScene[GameStates.LEVEL_SELECT] = function() {
		Graphics.clear(DxBall.WIDTH, DxBall.TOTAL_HEIGHT);
		Graphics.image(ImageResource[3].res, ImageResource[3].x, ImageResource[3].y); 
		for(i=0; i<6; ++i)
			Graphics.image((licondata[i].unlocked == true ? ImageResource[5].res : ImageResource[4].res), 
				licondata[i].x, licondata[i].y); 
		self.drawHUD();
	};
	
	self.drawScene[GameStates.RUNNING] = function() {
		Graphics.clear(DxBall.WIDTH, DxBall.TOTAL_HEIGHT);
		GameObjects.draw(); 
		self.drawHUDinGame();
	};
	
	self.drawScene[GameStates.PAUSED] = function() {
		Graphics.grayscale() ; 
		Graphics.image(ImageResource[7].res, ImageResource[7].x, ImageResource[7].y); 
		self.drawHUDinGame();
	};
	
	self.drawScene[GameStates.LEVEL_COMPLETE] = function() {
		Graphics.clear(DxBall.WIDTH, DxBall.TOTAL_HEIGHT);
		Graphics.rect(0, 0, DxBall.WIDTH, DxBall.TOTAL_HEIGHT, Colors.FORESTGREEN); 
		Graphics.text('LEVEL COMPLETE', DxBall.WIDTH/2, DxBall.TOTAL_HEIGHT/2, Colors.WHITE);
		Graphics.text('You have scored ' + DxBall.points, DxBall.WIDTH/2, 
			DxBall.TOTAL_HEIGHT/2 + 20, Colors.WHITE);
		Graphics.image(ImageResource[6].res, ImageResource[6].x, ImageResource[6].y); 
	};
	
	self.drawScene[GameStates.GAME_OVER] = function() { 
		Graphics.clear(DxBall.WIDTH, DxBall.TOTAL_HEIGHT);
		Graphics.rect(0, 0, DxBall.WIDTH, DxBall.TOTAL_HEIGHT, Colors.RED); 
		Graphics.text('GAME OVER', DxBall.WIDTH/2, DxBall.TOTAL_HEIGHT/2, Colors.GOLD);
		Graphics.text('You have scored ' + DxBall.temp_points, DxBall.WIDTH/2, 
			DxBall.TOTAL_HEIGHT/2 + 20, Colors.GOLD); 
	};

	self.drawScene[GameStates.CREDIT_SCENE] = function() {
		Graphics.image(ImageResource[2].res, ImageResource[2].x, ImageResource[2].y); 
	};
	
	self.drawHUDinGame = function() {
		if(GameObjects.giftCollected && DxBall.state == GameStates.RUNNING)
			Graphics.text('Current Points : ' + DxBall.temp_points + ' | ' + DxBall.getElapsedTime()
				+ ' | Gift collected !', DxBall.WIDTH/2, (DxBall.HEIGHT+30), Colors.WHITE);
		else
			Graphics.text('Current Points : ' + DxBall.temp_points + ' | ' + DxBall.getElapsedTime()
				, DxBall.WIDTH/2, (DxBall.HEIGHT+30), Colors.WHITE);
	};
	
	self.drawHUD = function() {
		Graphics.text('Total Points : ' + DxBall.points + ' | Level : ' + (DxBall.level+1)
				, DxBall.WIDTH/2, (DxBall.HEIGHT+30), Colors.WHITE);
	};
	
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
	//self.ctx.fillStyle = '#000000' ; 
	
	self.WIDTH = self.canvas.width;
	self.HEIGHT = self.canvas.height-50;
	self.TOTAL_HEIGHT = self.canvas.height;
	self.NROWS = 8;
	self.NCOLS = 8;	
	self.MAX_LEVELS = 6 ;
	
	self.state = GameStates.SPLASH_SCREEN ; 
	self.pstate = GameStates.INVALID ; 
	self.playstate = true ; 
	self.points = 0 ; 
	self.loop = 0 ; 
	self.level = 0 ; 
	self.bricks = 0 ; 
	self.FPS = 60 ; 
	self.temp_points = 0 ;
	self.millisecond = 0;
	self.second = 0 ;
	self.minute = 0 ;
	
	self.elapseTime = function() {
		if(self.millisecond >= 60) {
			self.millisecond = 0 ;
			self.second += 1 ;
			if(self.second >= 60) {
				self.minute += 1 ;
				self.second = 0 ;
			}
		}
		++self.millisecond ;
	};
	
	self.getElapsedTime = function() {
		return self.minute + ((self.second < 10) ? ": 0" : ' : ') + self.second ;
	};
	
	self.initTimer = function() {
		self.millisecond = 0 ;
		self.second = 0 ;
		self.minute = 0 ;
	};
	
	self.setState = function(state) {
		self.pstate = self.state ; 
		self.state = state ; 
	};
	
	self.addPoints = function(val) {
		if(self.temp_points + val >= 0)
			self.temp_points += val ;
	};
	
	self.setBricks = function(val) {
		self.bricks = val ;
	};
	
	self.setLevel = function(val) {
		self.level = val ;
	};
	
	self.resetPoints = function() {
		self.temp_points = 0 ;
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
		self.points += self.temp_points ; 
		self.temp_points = 0 ;
	};

	self.restart = function() {
		self.state = GameStates.RUNNING ; 
		clearTimeout(self.loop);
		self.start(); 
	};
	
	self.start = function() {
		clearTimeout(self.loop); 
		GameObjects.init();
		self.playState = true ; 
		self.initTimer() ;
		DxBallGameLoop(); 
	};

	self.resume = function() {
		self.state = GameStates.RUNNING ;
	};
	
	self.pause = function() {
		self.state = GameStates.PAUSED ;
	}
};

function DxBallGameLoop() {
	DxBall.elapseTime(); 
	if(DxBall.pstate != DxBall.state) {
		EventHandlers.handleGameEvents(DxBall.state, DxBall.pstate); 
		DrawGameScenes.draw(DxBall.state) ;
	}
	DxBall.pstate = DxBall.state ; 
	if(DxBall.isRunning()) {
		DrawGameScenes.draw(DxBall.state) ;
		DxBall.playState = CollisionSystem.handleCollisions(); 
		if(!DxBall.playState) 
			DxBall.state = GameStates.GAME_OVER ;
		if(DxBall.isComplete()) {
			DxBall.state = GameStates.LEVEL_COMPLETE ; 
			DxBall.nextLevel() ;
			licondata[DxBall.level].unlocked = true ; 
		} 
	}
	DxBall.loop = setTimeout(DxBallGameLoop, 1000/DxBall.FPS); 
}
