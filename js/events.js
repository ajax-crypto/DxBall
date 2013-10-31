
var EventUtilities = {
	rightDown : false, 
	leftDown : false,

	checkBounds : function(pos, x1, y1, x2, y2) {
		return (pos.x < x2 && pos.x > x1 && pos.y < y2 && pos.y > y1); 
	}
};

var EventHandlers = new function() {

	var self = this ;

	self.pausedGameSceneHandler = {
	handleEvent : function(evt) {
		switch(evt.type) {
			case 'click' :
				var mouse = {
					x: evt.pageX - Graphics.canvasMinX,
					y: evt.pageY - Graphics.canvasMinY
				}; 
				
				var option = ~~(ImageResource[7].height/3) ; 
				
				if(EventUtilities.checkBounds(mouse, ImageResource[7].x, ImageResource[7].y, 
					ImageResource[7].x + ImageResource[7].width, ImageResource[7].y + 
					ImageResource[7].height)) {
					if(mouse.y < (option + ImageResource[7].y)) 
						DxBall.restart(); 
					else if(mouse.y > (option + ImageResource[7].y) && 
						mouse.y < (2*option + ImageResource[7].y)) 
						DxBall.resume();  
					else
						DxBall.setState(GameStates.LEVEL_SELECT) ;  
				}
			break ;
			case 'mousemove' :
				var mouse = {
					x: evt.pageX - Graphics.canvasMinX,
					y: evt.pageY - Graphics.canvasMinY
				}; 
				
				if(EventUtilities.checkBounds(mouse, ImageResource[7].x, ImageResource[7].y, 
					ImageResource[7].x + ImageResource[7].width, ImageResource[7].y + 
					ImageResource[7].height)) 
					DxBall.canvas.style.cursor = 'pointer' ;
				else
					DxBall.canvas.style.cursor = 'default' ;
			break ;
		}
	}
	};


	self.runningGameSceneHandler = {
	handleEvent : function(evt) {
		switch(evt.type) {
			case 'keydown' : 
				if(evt.keyCode == 39) 
					EventUtilities.rightDown = true;
				else if(evt.keyCode == 37) 
					EventUtilities.leftDown = true;
			break ;
				 
			case 'keyup' : 
				if(evt.keyCode == 39) 
					EventUtilities.rightDown = false;
				else if(evt.keyCode == 37) 
					EventUtilities.leftDown = false;
			break ;
				
			case 'mousemove' : 
				if(evt.pageX > Graphics.canvasMinX && evt.pageX < Graphics.canvasMaxX) {
					GameObjects.paddle.x = Math.max(evt.pageX - Graphics.canvasMinX - 
						(GameObjects.paddle.width/2), 0);
					GameObjects.paddle.x = Math.min(DxBall.WIDTH - GameObjects.paddle.width, 
						GameObjects.paddle.x);
			    }
			break ;
			
			case 'click' :
				if(DxBall.isRunning())
					DxBall.pause(); 
				else if(DxBall.isPaused()) 
					DxBall.resume(); 
			break ; 
		}
	}
	}; 
	
	self.splashScreenHandler = {
	handleEvent : function(evt) { 
		switch(evt.type) {
			case 'click' : 
				evt.preventDefault();
				var mouse = {
					x: evt.pageX - Graphics.canvasMinX,
					y: evt.pageY - Graphics.canvasMinY
				}; 
				
				/* If user clicked anywhere except for "credit", 
				 * go to level selection screen, else go to credit scene
				 */
				Graphics.clear(DxBall.WIDTH, DxBall.HEIGHT);
				if(EventUtilities.checkBounds(mouse, 250, 417, 402, 480))  
					DxBall.setState(GameStates.CREDIT_SCENE) ; 
				else 
					DxBall.setState(GameStates.LEVEL_SELECT) ;
				
			break ;
				
			case 'mousemove' : 
				DxBall.canvas.style.cursor = 'pointer' ;
			break ;
		}
	}
	};

	self.levelSelectSceneHandler = {
	handleEvent : function(evt) {
		switch(evt.type) {
			case 'click' : 
				var mouse = {
					x: evt.pageX - Graphics.canvasMinX,
					y: evt.pageY - Graphics.canvasMinY
				}; 
				
				for(i=0; i<6; ++i)
					if(EventUtilities.checkBounds(mouse, licondata[i].x, licondata[i].y, 
						licondata[i].x + ImageResource[4].width, licondata[i].y 
						+ ImageResource[4].height) && licondata[i].unlocked == true) {
						Graphics.clear();
						DxBall.setState(GameStates.RUNNING);
						DxBall.setLevel(i);
						DxBall.start(); 
					}
			break; 
			
			case 'mousemove':
				var mouse = {
					x: evt.pageX - Graphics.canvasMinX,
					y: evt.pageY - Graphics.canvasMinY
				}; 
				
				for(i=0; i<=DxBall.level; ++i)
					if(EventUtilities.checkBounds(mouse, licondata[i].x, licondata[i].y, 
						licondata[i].x + ImageResource[4].width, licondata[i].y 
						+ ImageResource[4].height)) {
						DxBall.canvas.style.cursor = 'pointer' ;
						console.log("hehe..."); }
					else
						DxBall.canvas.style.cursor = 'default' ;
			break;
		}
	}
	};

	self.creditSceneHandler = {
	handleEvent : function(evt) {
		switch(evt.type) {
			case 'click' : 
				DxBall.setState(GameStates.LEVEL_SELECT) ; 
			break ; 
			case 'mousemove' : 
				DxBall.canvas.style.cursor = 'pointer' ; 
			break ; 
		}
	}
	};

	self.levelCompleteSceneHandler = {
	handleEvent : function(evt) {
		switch(evt.type) {
			case 'click' : 
				var mouse = {
					x: evt.pageX - Graphics.canvasMinX,
					y: evt.pageY - Graphics.canvasMinY
				}; 
				
				if(EventUtilities.checkBounds(mouse, 204, DxBall.HEIGHT-90, 435, 480)) {
					Graphics.clear(); 
					DxBall.setState(GameStates.LEVEL_SELECT) ; 
				}
			break ; 
			case 'mousemove' : 
				var mouse = {
					x: evt.pageX - Graphics.canvasMinX,
					y: evt.pageY - Graphics.canvasMinY
				}; 
				
				if(EventUtilities.checkBounds(mouse, 204, DxBall.HEIGHT-90, 435, 480))
					DxBall.canvas.style.cursor = 'pointer' ; 
				else
					DxBall.canvas.style.cursor = 'default' ; 
			break; 
		}
	}
	}; 

	self.gameOverSceneHandler = {
	handleEvent : function(evt) {
		switch(evt.type) {
			case 'click' : 
				DxBall.setState(GameStates.LEVEL_SELECT) ; 
			break ;
		}
	}
	};
				
	self.unregisterEvents = function(state) {
	switch(state) {
		case GameStates.RUNNING : 
			DxBall.canvas.removeEventListener('keydown', self.runningGameSceneHandler, false); 
			DxBall.canvas.removeEventListener('keyup', self.runningGameSceneHandler, false); 
			DxBall.canvas.removeEventListener('mousemove', self.runningGameSceneHandler, false); 
			DxBall.canvas.removeEventListener('click', self.runningGameSceneHandler, false);
		break ;
		case GameStates.PAUSED : 
			DxBall.canvas.removeEventListener('click', self.pausedGameSceneHandler, false); 
			DxBall.canvas.removeEventListener('mousemove', self.pausedGameSceneHandler, false); 
		break ;
		case GameStates.SPLASH_SCREEN :
			DxBall.canvas.removeEventListener('click', self.splashScreenHandler, false); 
			DxBall.canvas.removeEventListener('mousemove', self.splashScreenHandler, false); 
		break;
		case GameStates.LEVEL_SELECT :
			DxBall.canvas.removeEventListener('click', self.levelSelectSceneHandler, false); 
			DxBall.canvas.removeEventListener('mousemove', self.levelSelectSceneHandler, false);
		break ; 
		case GameStates.CREDIT_SCENE :
			DxBall.canvas.removeEventListener('click', self.creditSceneHandler, false); 
			DxBall.canvas.removeEventListener('mousemove', self.creditSceneHandler, false); 
		break ; 
		case GameStates.LEVEL_COMPLETE : 
			DxBall.canvas.removeEventListener('click', self.levelCompleteSceneHandler, false);
			DxBall.canvas.removeEventListener('mousemove', self.levelCompleteSceneHandler, false);
		break ;
		case GameStates.GAME_OVER :
			DxBall.canvas.removeEventListener('click', self.gameOverSceneHandler, false);
		break ; 
	}
	};

	self.registerGameEvents = function(currState, prevState) {
	self.unregisterEvents(prevState); 
	switch(currState) {
		case GameStates.SPLASH_SCREEN :
			DxBall.canvas.addEventListener('click', self.splashScreenHandler, false); 
			DxBall.canvas.addEventListener('mousemove', self.splashScreenHandler, false); 
		break;
		case GameStates.RUNNING : 
			DxBall.canvas.addEventListener('keydown', self.runningGameSceneHandler, false); 
			DxBall.canvas.addEventListener('keyup', self.runningGameSceneHandler, false); 
			DxBall.canvas.addEventListener('mousemove', self.runningGameSceneHandler, false);
			DxBall.canvas.addEventListener('click', self.runningGameSceneHandler, false);
		break ;
		case GameStates.PAUSED : 
			DxBall.canvas.addEventListener('click', self.pausedGameSceneHandler, false); 
			DxBall.canvas.addEventListener('mousemove', self.pausedGameSceneHandler, false); 
		break ;
		case GameStates.LEVEL_COMPLETE : 
			DxBall.canvas.addEventListener('click', self.levelCompleteSceneHandler, false);
			DxBall.canvas.addEventListener('mousemove', self.levelCompleteSceneHandler, false);
		break ; 
		case GameStates.LEVEL_SELECT :
			DxBall.canvas.addEventListener('click', self.levelSelectSceneHandler, false); 
			DxBall.canvas.addEventListener('mousemove', self.levelSelectSceneHandler, false);
		break ; 
		case GameStates.CREDIT_SCENE : 
			DxBall.canvas.addEventListener('click', self.creditSceneHandler, false); 
			DxBall.canvas.addEventListener('mousemove', self.creditSceneHandler, false); 
		break ; 
		case GameStates.GAME_OVER :
			DxBall.canvas.addEventListener('click', self.gameOverSceneHandler, false);
		break ; 
	}
	};
};
