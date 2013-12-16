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
	
	temp_points = 0 ;
	prev_points = 0 ;
	points = 0 ; 
	
	unit_t = 0;
	second = 0 ;
	minute = 0 ;
	
	self.tick = function() {
		++unit_t ;
		if(unit_t == self.FPS)
		{
			++second ;
			unit_t %= self.FPS ;
			if(second == 60)
			{
				++minute ;
				second %= 60 ;
			}
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
		licondata[DxBall.level].unlocked = true ;
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
		clearTimeout(self.loop);
		self.start(); 
	};
	
	self.start = function() {
		clearTimeout(self.loop); 
		self.playRandom ? GameObjects.generateRandomLevel() : GameObjects.init();
		self.playState = true ; 
		self.initTimer() ;
		DxBallGameLoop(); 
	};

	self.resume = function() {
		self.state = GameStates.RUNNING ;
	};
	
	self.pause = function() {
		self.state = GameStates.PAUSED ;
	};
	
	self.updateData = function() {
		this.pstate = this.state ; 
		if(this.isRunning()) {
			GameObjects.ball.move(); 
			GameObjects.gift.move();
			this.playState = CollisionSystem.handleCollisions(); 
			if(!this.playState) 
				this.setState(GameStates.GAME_OVER) ;
			if(this.isComplete()) {
				this.setState(GameStates.LEVEL_COMPLETE) ; 
				this.nextLevel() ; 
			} 
		}
	};
	
	self.render = function() {
		if(DrawGameScenes.shouldDrawAgain(this.state))
			DrawGameScenes.draw(this.state) ;
	};
	
	self.updateScene = function() {
		if(this.pstate != this.state) {
			EventHandlers.registerGameEvents(this.state, this.pstate); 
			DrawGameScenes.draw(this.state) ;
		}
	};

};

function DxBallGameLoop() {
	DxBall.tick(); 
	DxBall.updateScene() ;
	DxBall.updateData();
	DxBall.render() ;
	DxBall.loop = setTimeout(DxBallGameLoop, 1000/DxBall.FPS); 
}
