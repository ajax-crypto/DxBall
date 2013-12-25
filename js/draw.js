
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
	var drawScene = [];
	
	self.Graphics = new DX.Graphics(DxBall) ;
	
	// Note :
	// This array maps the index with whether the scene should be redrawn or not.
	// Mapping is with Game States.
	var shouldRedraw = [ false, false, false, true, false, false, false, false, false, false, true ] ;
	
	drawScene[GameStates.SPLASH_SCREEN] = function() {
		self.Graphics.image(ImageResource[1].res, ImageResource[1].x, ImageResource[1].y); 
	};
	
	drawScene[GameStates.LEVEL_SELECT] = function() {
		self.Graphics.clear(DxBall.WIDTH, DxBall.TOTAL_HEIGHT);
		self.Graphics.image(ImageResource[3].res, ImageResource[3].x, ImageResource[3].y); 
		for(i=0; i<6; ++i)
			self.Graphics.image((icondata[i].unlocked == true ? ImageResource[5].res : ImageResource[4].res), 
				icondata[i].x, icondata[i].y); 
		drawHUD();
	};
	
	drawScene[GameStates.RUNNING] = function() {
		self.Graphics.clear(DxBall.WIDTH, DxBall.HEIGHT);
		GameObjects.draw(); 
		drawHUDinGame();
	};
	
	drawScene[GameStates.PAUSED] = function() {
		self.Graphics.grayscale() ; 
		self.Graphics.image(ImageResource[7].res, ImageResource[7].x, ImageResource[7].y); 
		drawHUDinGame();
	};
	
	drawScene[GameStates.LEVEL_COMPLETE] = function() {
		self.Graphics.clear(DxBall.WIDTH, DxBall.TOTAL_HEIGHT);
		self.Graphics.rect(0, 0, DxBall.WIDTH, DxBall.TOTAL_HEIGHT, Colors.FORESTGREEN); 
		self.Graphics.text('LEVEL COMPLETE', DxBall.WIDTH/2, DxBall.TOTAL_HEIGHT/2 - 
			(ImageResource[6].height/2), Colors.WHITE);
		self.Graphics.text('You have scored ' + DxBall.getPointsScored() + ' in ' + 
			DxBall.getElapsedTime(), DxBall.WIDTH/2, DxBall.TOTAL_HEIGHT/2, Colors.WHITE);
		self.Graphics.image(ImageResource[6].res, ImageResource[6].x, ImageResource[6].y); 
	};
	
	drawScene[GameStates.GAME_OVER] = function() { 
		self.Graphics.clear(DxBall.WIDTH, DxBall.TOTAL_HEIGHT);
		self.Graphics.rect(0, 0, DxBall.WIDTH, DxBall.TOTAL_HEIGHT, Colors.RED); 
		self.Graphics.text('GAME OVER', DxBall.WIDTH/2, DxBall.TOTAL_HEIGHT/2, Colors.GOLD);
		self.Graphics.text('You lost ' + DxBall.getCurrentPoints(), DxBall.WIDTH/2, 
			DxBall.TOTAL_HEIGHT/2 + 20, Colors.GOLD); 
	};

	drawScene[GameStates.CREDIT_SCENE] = function() {
		self.Graphics.image(ImageResource[2].res, ImageResource[2].x, ImageResource[2].y); 
	};
	
	drawScene[GameStates.INFO_SCREEN] = function() {
		self.Graphics.image(ImageResource[11].res, ImageResource[11].x, ImageResource[11].y); 
	};
	
	drawScene[GameStates.START_SCREEN] = function() {
		self.Graphics.image(ImageResource[12].res, ImageResource[12].x, ImageResource[12].y); 
	};
	
	drawScene[GameStates.SETTINGS] = function() {
		self.Graphics.image(ImageResource[13].res, ImageResource[13].x, ImageResource[13].y); 
		if(shouldRedraw[GameStates.SETTINGS]) {
			var rdata = SceneData.data[GameStates.SETTINGS].getRegionData();
			self.Graphics.circle(rdata.x, rdata.y, rdata.r, Colors.MAROON);
		}
		shouldRedraw[GameStates.SETTINGS] = false ;
	};
	
	var drawHUDinGame = function() {
		if(DxBall.shouldDrawHUDinGame) {
			self.Graphics.clearPortion(0, DxBall.HEIGHT, DxBall.WIDTH, 50);
			if(GameObjects.giftCollected)
				self.Graphics.text('Current Points : ' + DxBall.getCurrentPoints() + 
				' | Gift collected !', DxBall.WIDTH/2, (DxBall.HEIGHT+30), Colors.WHITE);
			else
				self.Graphics.text('Current Points : ' + DxBall.getCurrentPoints(), 
					DxBall.WIDTH/2, (DxBall.HEIGHT+30), Colors.WHITE);
			DxBall.shouldDrawHUDinGame = false ;
		}
	};
	
	var drawHUD = function() {
		self.Graphics.text('Total Points : ' + DxBall.getPointsScored() + ' | Level : ' + (DxBall.level+1)
				, DxBall.WIDTH/2, (DxBall.HEIGHT+30), Colors.WHITE);
	};
	
	self.draw = function(state) {
		drawScene[state](); 
	};
	
	self.shouldDrawAgain = function(state) {
		return shouldRedraw[state] ;
	};
	
	self.makeSceneRedraw = function(state) {
		shouldRedraw[state] = true ;
	};
};


