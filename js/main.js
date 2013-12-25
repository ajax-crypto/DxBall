var GameStates = Object.freeze({
				 INVALID : 0,
				 SPLASH_SCREEN : 1,
				 LEVEL_SELECT : 2,
				 RUNNING : 3,
				 LEVEL_COMPLETE : 4,
				 GAME_OVER : 5,
				 PAUSED : 6,
				 CREDIT_SCENE : 7,
				 INFO_SCREEN : 8,
				 START_SCREEN : 9,
				 SETTINGS : 10
			 });

var DxBall = new function() {
	
	var self = this ; 
	
	self.canvas = document.getElementById('dxball'); 
	self.ctx = self.canvas.getContext('2d');
	self.ctx.font = '20px Verdana' ;
	self.ctx.textAlign = 'center' ;
	
	self.WIDTH = self.canvas.width;
	self.HEIGHT = self.canvas.height-50;
	self.TOTAL_HEIGHT = self.canvas.height;
	self.NROWS = 8;
	self.NCOLS = 8;	
	self.MAX_LEVELS = 6 ;
	
	self.state = GameStates.SPLASH_SCREEN ; 
	self.pstate = GameStates.INVALID ; 
	self.prevstate = GameStates.INVALID ;
	self.playstate = true ; 
	self.playRandom = false ;
	self.loop = 0 ; 
	self.level = 0 ; 
	self.bricks = 0 ; 
	self.FPS = 60 ;
	self.shouldDrawHUDinGame = false ;
	self.difficulty = 0 ;
	self.counter = 0 ;
	
	temp_points = 0 ;
	prev_points = 0 ;
	points = 0 ; 
	
	second = 0 ;
	minute = 0 ;
	prevTime = new Date();
	
	self.tick = function() {
		var d = new Date();
		if(d.getSeconds() - prevTime.getSeconds() === 1) {
			++second ;
			prevTime = d ;
		}
		if(second > 60) {
			++minute ;
			second = 0 ;
		}
	};
	
	self.getElapsedTime = function() {
		return minute + ':' + second ;
	};
	
	self.initTimer = function() {
		unit_t = 0 ;
		second = 0 ;
		minute = 0 ;
	};
	
	self.setState = function(state) {
		self.pstate = self.state ; 
		self.prevstate = self.state ;
		self.state = state ; 
		if(state == GameStates.RUNNING)
			self.shouldDrawHUDinGame = true ;
	};
	
	self.addPoints = function(val) {
		if(temp_points + val >= 0)
			temp_points += val ;
	};
	
	self.setBricks = function(val) {
		self.bricks = val ;
	};
	
	self.setLevel = function(val) {
		if(val <= self.level) {
			self.level = val ;
			return true ;
		}
		return false ;
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
		points += temp_points ; 
		prev_points = temp_points ;
		temp_points = 0 ;
		icondata[DxBall.level].unlocked = true ;
	};
	
	self.setDifficulty = function(diff) {
		self.difficulty = diff ;
	};
	
	self.getPointsScored = function() {
		return prev_points ;
	};
	
	self.getCurrentPoints = function() {
		return temp_points ;
	};
	
	self.getTotalPoints = function() {
		return points ;
	};

	self.restart = function() {
		self.state = GameStates.RUNNING ;
		self.playRandom ? GameObjects.generateRandomLevel() : GameObjects.init(self.difficulty); 
		self.start(); 
	};
	
	self.start = function() {
		clearTimeout(self.loop); 
		self.playState = true ; 
		self.initTimer() ;
		self.counter = 0 ;
		DxBallGameLoop(); 
	};
	
	self.startLevel = function(level) {
		if(self.setLevel(level)) {
			self.state = GameStates.RUNNING ;
			self.playRandom = false ;
                        self.temp_points = 0 ;
			GameObjects.init(self.difficulty);
			self.start();
		}
	};
	
	self.startRandomLevel = function() {
		self.setState(GameStates.RUNNING) ;
		self.playRandom = true ;
                self.temp_points = 0 ;
		GameObjects.generateRandomLevel(self.difficulty) ;
		self.start();
	};

	self.resume = function() {
		self.state = GameStates.RUNNING ;
	};
	
	self.pause = function() {
		self.state = GameStates.PAUSED ;
	};
	
	self.updateData = function() {
		self.pstate = self.state ; 
		if(self.isRunning()) {
			GameObjects.ball.move(); 
			GameObjects.gift.move();
			self.playState = CollisionSystem.handleCollisions(); 
			if(!self.playState) 
				self.setState(GameStates.GAME_OVER) ;
			if(self.isComplete()) {
				
				// Award bonus if completed within 1 minute
				if(minute < 1)
					prev_points += 500 ;
					
				self.setState(GameStates.LEVEL_COMPLETE) ; 
				self.nextLevel() ; 
			} 
		}
	};
	
	self.render = function() {
		if(DrawGameScenes.shouldDrawAgain(self.state))
			DrawGameScenes.draw(self.state) ;
	};
	
	self.updateScene = function() {
		if(self.pstate != self.state) {
			EventHandlers.registerGameEvents(self.state, self.pstate); 
			DrawGameScenes.draw(self.state) ;
		}
	};

};

function DxBallGameLoop() {
    DxBall.loop = setTimeout(function() {
        requestAnimationFrame(DxBallGameLoop);
    }, 1000 / DxBall.FPS);
    DxBall.tick(); 
	DxBall.updateScene() ;
	DxBall.updateData();
	DxBall.render() ;
}
