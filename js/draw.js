
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

var Graphics = new function() {
	
	var self = this ; 
	
	self.getOffset = function(el) {
		var _x = 0;
		var _y = 0;
		while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
			_x += el.offsetLeft - el.scrollLeft;
			_y += el.offsetTop - el.scrollTop;
			el = el.offsetParent;
		}
		return { top: _y, left: _x };
	};

    self.canvasMinX = self.getOffset(DxBall.canvas).left;
	self.canvasMaxX = self.canvasMinX + DxBall.WIDTH;
	self.canvasMinY = self.getOffset(DxBall.canvas).top; 

	self.circle = function(x, y, r, color) {
		DxBall.ctx.fillStyle = color ;
		DxBall.ctx.beginPath();
		DxBall.ctx.arc(x, y, r, 0, Math.PI*2, true);
		DxBall.ctx.closePath();
		DxBall.ctx.fill();
	};

	self.rect = function(x, y, w, h, color) {
		DxBall.ctx.fillStyle = color ;
		DxBall.ctx.fillRect(x, y, w, h);
	};

	self.clear = function(w, h) {
		self.rect(0, 0, w, h, Colors.BLACK);
	};
	
	self.clearPortion = function(x, y, w, h) {
		self.rect(x, y, w, h, Colors.BLACK);
	};

	self.image = function(img, x, y) {
		DxBall.ctx.drawImage(img, x, y); 
	};
	
	self.altImage = function(img, x, y, w, h) {
		DxBall.ctx.drawImage(img, x, y, w, h);
	};
	
	self.text = function(str, x, y, color) {
		DxBall.ctx.fillStyle = color ;
		DxBall.ctx.fillText(str, x, y);
	};

/* Note : If you run into the error : "Tainted canvas/DOM exception 18", 
 * then run chromium/chrome with the option --allow-file-access-from-files
 * This happens because data is accessed which is not in the same domain as
 * in the canvas 
 */
	self.grayscale = function() {
		var imageData = DxBall.ctx.getImageData(0, 0, DxBall.WIDTH, DxBall.HEIGHT);
		for(var i = 0; i < imageData.data.length; i += 4) {
			var r = imageData.data[i];
			var g = imageData.data[i + 1];
			var b = imageData.data[i + 2];
			imageData.data[i] = imageData.data[i + 1] = 
				imageData.data[i + 2] = (r+g+b)/3;
		}
		DxBall.ctx.putImageData(imageData, 0, 0);
	};
};

var DrawGameScenes = new function() {
	
	var self = this ; 
	
	var drawScene = [];
	
	// Note :
	// This array maps the index with whether the scene should be redrawn or not.
	// Mapping is with Game States.
	var shouldRedraw = [ false, false, false, true, false, false, false, false, false, false, false ] ;
	
	drawScene[GameStates.SPLASH_SCREEN] = function() {
		Graphics.image(ImageResource[1].res, ImageResource[1].x, ImageResource[1].y); 
	};
	
	drawScene[GameStates.LEVEL_SELECT] = function() {
		Graphics.clear(DxBall.WIDTH, DxBall.TOTAL_HEIGHT);
		Graphics.image(ImageResource[3].res, ImageResource[3].x, ImageResource[3].y); 
		for(i=0; i<6; ++i)
			Graphics.image((licondata[i].unlocked == true ? ImageResource[5].res : ImageResource[4].res), 
				licondata[i].x, licondata[i].y); 
		drawHUD();
	};
	
	drawScene[GameStates.RUNNING] = function() {
		Graphics.clear(DxBall.WIDTH, DxBall.HEIGHT);
		GameObjects.draw(); 
		drawHUDinGame();
	};
	
	drawScene[GameStates.PAUSED] = function() {
		Graphics.grayscale() ; 
		Graphics.image(ImageResource[7].res, ImageResource[7].x, ImageResource[7].y); 
		drawHUDinGame();
	};
	
	drawScene[GameStates.LEVEL_COMPLETE] = function() {
		Graphics.clear(DxBall.WIDTH, DxBall.TOTAL_HEIGHT);
		Graphics.rect(0, 0, DxBall.WIDTH, DxBall.TOTAL_HEIGHT, Colors.FORESTGREEN); 
		Graphics.text('LEVEL COMPLETE', DxBall.WIDTH/2, DxBall.TOTAL_HEIGHT/2, Colors.WHITE);
		Graphics.text('You have scored ' + DxBall.getPointsScored() + ' in ' + 
			DxBall.getElapsedTime(), DxBall.WIDTH/2, DxBall.TOTAL_HEIGHT/2 + 30, Colors.WHITE);
		Graphics.image(ImageResource[6].res, ImageResource[6].x, ImageResource[6].y); 
	};
	
	drawScene[GameStates.GAME_OVER] = function() { 
		Graphics.clear(DxBall.WIDTH, DxBall.TOTAL_HEIGHT);
		Graphics.rect(0, 0, DxBall.WIDTH, DxBall.TOTAL_HEIGHT, Colors.RED); 
		Graphics.text('GAME OVER', DxBall.WIDTH/2, DxBall.TOTAL_HEIGHT/2, Colors.GOLD);
		Graphics.text('You lost ' + DxBall.getCurrentPoints(), DxBall.WIDTH/2, 
			DxBall.TOTAL_HEIGHT/2 + 20, Colors.GOLD); 
	};

	drawScene[GameStates.CREDIT_SCENE] = function() {
		Graphics.image(ImageResource[2].res, ImageResource[2].x, ImageResource[2].y); 
	};
	
	drawScene[GameStates.INFO_SCREEN] = function() {
		Graphics.image(ImageResource[11].res, ImageResource[11].x, ImageResource[11].y); 
	};
	
	drawScene[GameStates.START_SCREEN] = function() {
		Graphics.image(ImageResource[12].res, ImageResource[12].x, ImageResource[12].y); 
	};
	
	drawScene[GameStates.SETTINGS] = function() {
		Graphics.image(ImageResource[13].res, ImageResource[13].x, ImageResource[13].y); 
		if(shouldRedraw[GameStates.SETTINGS]) {
			var rdata = SceneData.data[GameStates.SETTINGS].getRegionData();
			Graphics.circle(rdata.x, rdata.y, rdata.r, Colors.MAROON);
		}
		shouldRedraw[GameStates.SETTINGS] = false ;
	};
	
	var drawHUDinGame = function() {
		if(DxBall.shouldDrawHUDinGame) {
			Graphics.clearPortion(0, DxBall.HEIGHT, DxBall.WIDTH, 50);
			if(GameObjects.giftCollected)
				Graphics.text('Current Points : ' + DxBall.getCurrentPoints() + 
				' | Gift collected !', DxBall.WIDTH/2, (DxBall.HEIGHT+30), Colors.WHITE);
			else
				Graphics.text('Current Points : ' + DxBall.getCurrentPoints(), 
					DxBall.WIDTH/2, (DxBall.HEIGHT+30), Colors.WHITE);
			DxBall.shouldDrawHUDinGame = false ;
		}
	};
	
	var drawHUD = function() {
		Graphics.text('Total Points : ' + DxBall.getPointsScored() + ' | Level : ' + (DxBall.level+1)
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


