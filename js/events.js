
var EventUtilities = {
	rightDown : false, 
	leftDown : false,

	checkBounds : function(pos, x1, y1, x2, y2) {
		return (pos.x < x2 && pos.x > x1 && pos.y < y2 && pos.y > y1); 
	}
};

var EventHandlers = new function() {

	var self = this ;

	var pausedGameSceneHandler = {
	handleEvent : function(evt) {
		switch(evt.type) {
			case 'click' :
				var mouse = {
					x: evt.pageX - Graphics.canvasMinX,
					y: evt.pageY - Graphics.canvasMinY
				}; 
				/*
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
						DxBall.setState(DxBall.prevstate) ;  
				}*/
				
				SceneData.data[GameStates.PAUSED].determineRegion(mouse, 'click');
				var region = SceneData.data[GameStates.PAUSED].whichRegion();
				switch(region) {
					case SceneData.data[GameStates.PAUSED].RESTART :
						DxBall.restart(); 
					break ;
					case SceneData.data[GameStates.PAUSED].RESUME :
						DxBall.resume(); 
					break ;
					case SceneData.data[GameStates.PAUSED].BACK :
						DxBall.setState(DxBall.prevstate) ;
					break ;
				}
				
			break ;
			case 'mousemove' :
				var mouse = {
					x: evt.pageX - Graphics.canvasMinX,
					y: evt.pageY - Graphics.canvasMinY
				}; 
				
				SceneData.data[GameStates.PAUSED].determineRegion(mouse, 'click');
				if(SceneData.data[GameStates.PAUSED].whichRegion() != -1) 
					DxBall.canvas.style.cursor = 'pointer' ;
				else
					DxBall.canvas.style.cursor = 'default' ;
			break ;
		}
	}
	};

	var runningGameSceneHandler = {
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
	
	var splashScreenHandler = {
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
					DxBall.setState(GameStates.START_SCREEN) ;
			break ;
				
			case 'mousemove' : 
				DxBall.canvas.style.cursor = 'pointer' ;
			break ;
		}
	}
	};

	var levelSelectSceneHandler = {
	handleEvent : function(evt) {
		switch(evt.type) {
			case 'click' : 
				var mouse = {
					x: evt.pageX - Graphics.canvasMinX,
					y: evt.pageY - Graphics.canvasMinY
				}; 

				SceneData.data[GameStates.LEVEL_SELECT].determineRegion(mouse, 'click');
				var region = SceneData.data[GameStates.LEVEL_SELECT].whichRegion();
				switch(region) {
					case SceneData.data[GameStates.LEVEL_SELECT].LEVEL1 :
					case SceneData.data[GameStates.LEVEL_SELECT].LEVEL2 :
					case SceneData.data[GameStates.LEVEL_SELECT].LEVEL3 :
					case SceneData.data[GameStates.LEVEL_SELECT].LEVEL4 :
					case SceneData.data[GameStates.LEVEL_SELECT].LEVEL5 :
					case SceneData.data[GameStates.LEVEL_SELECT].LEVEL6 :
						DxBall.startLevel(region); 
					break ;
					case SceneData.data[GameStates.LEVEL_SELECT].BACK :
						DxBall.setState(GameStates.START_SCREEN) ;
					break ;
				}
			break; 
			
			case 'mousemove':
				var mouse = {
					x: evt.pageX - Graphics.canvasMinX,
					y: evt.pageY - Graphics.canvasMinY
				}; 
				SceneData.data[GameStates.LEVEL_SELECT].determineRegion(mouse, 'mousemove');
				if(SceneData.data[GameStates.LEVEL_SELECT].whichRegion() != -1)
					DxBall.canvas.style.cursor = 'pointer' ;
				else
					DxBall.canvas.style.cursor = 'default' ;
				
			break;
		}
	}
	};

	var creditSceneHandler = {
	handleEvent : function(evt) {
		switch(evt.type) {
			case 'click' : 
				DxBall.setState(GameStates.START_SCREEN) ; 
			break ; 
			case 'mousemove' : 
				DxBall.canvas.style.cursor = 'pointer' ; 
			break ; 
		}
	}
	};

	var levelCompleteSceneHandler = {
	handleEvent : function(evt) {
		switch(evt.type) {
			case 'click' : 
				var mouse = {
					x: evt.pageX - Graphics.canvasMinX,
					y: evt.pageY - Graphics.canvasMinY
				}; 
				SceneData.data[GameStates.LEVEL_COMPLETE].determineRegion(mouse, 'click');
				var region = SceneData.data[GameStates.LEVEL_COMPLETE].whichRegion();
				if(region != -1)  
					DxBall.playRandom ? DxBall.setState(GameStates.START_SCREEN) :
					DxBall.setState(GameStates.LEVEL_SELECT) ;
			break ; 
			case 'mousemove' : 
				var mouse = {
					x: evt.pageX - Graphics.canvasMinX,
					y: evt.pageY - Graphics.canvasMinY
				}; 
				SceneData.data[GameStates.LEVEL_COMPLETE].determineRegion(mouse, 'click');
				if(SceneData.data[GameStates.LEVEL_COMPLETE].whichRegion() != -1)
					DxBall.canvas.style.cursor = 'pointer' ; 
				else
					DxBall.canvas.style.cursor = 'default' ; 
			break; 
		}
	}
	}; 

	var gameOverSceneHandler = {
	handleEvent : function(evt) {
		switch(evt.type) {
			case 'click' : 
				DxBall.playRandom ? DxBall.setState(GameStates.START_SCREEN) :
					DxBall.setState(GameStates.LEVEL_SELECT) ;
			break ;
			case 'mousemove' : 
				DxBall.canvas.style.cursor = 'pointer' ; 
			break ; 
		}
	}
	};
	
	var infoSceneHandler = {
	handleEvent : function(evt) {
		switch(evt.type) {
			case 'click' :
				DxBall.setState(GameStates.START_SCREEN);
			break ;
			case 'mousemove' : 
				DxBall.canvas.style.cursor = 'pointer' ; 
			break ; 
		}
	}
	};
	
	var startSceneHandler = {
	handleEvent : function(evt) {
		switch(evt.type) {
			case 'click' :
				var mouse = {
					x: evt.pageX - Graphics.canvasMinX,
					y: evt.pageY - Graphics.canvasMinY
				}; 	
				SceneData.data[GameStates.START_SCREEN].determineRegion(mouse, 'click');
				var region = SceneData.data[GameStates.START_SCREEN].whichRegion() ;
				switch(region)
				{
					case SceneData.data[GameStates.START_SCREEN].CAMPAIGN :
						DxBall.setState(GameStates.LEVEL_SELECT); 
					break ;
					case SceneData.data[GameStates.START_SCREEN].RANDOM :
						DxBall.startRandomLevel();
					break ;
					case SceneData.data[GameStates.START_SCREEN].INFO :
						DxBall.setState(GameStates.INFO_SCREEN);
					break ;
					case SceneData.data[GameStates.START_SCREEN].SETTINGS :
						DxBall.setState(GameStates.SETTINGS);
					break; 
				}
			break ;
			
			case 'mousemove' :
				var mouse = {
					x: evt.pageX - Graphics.canvasMinX,
					y: evt.pageY - Graphics.canvasMinY
				}; 
				SceneData.data[GameStates.START_SCREEN].determineRegion(mouse, 'mousemove');
				if(SceneData.data[GameStates.START_SCREEN].whichRegion() != -1)
					DxBall.canvas.style.cursor = 'pointer' ;
				else
					DxBall.canvas.style.cursor = 'default' ;
			break ;
		}
	}
	};	
	
	var settingsSceneHandler = {
	handleEvent : function(evt) {
		switch(evt.type) {
			case 'click' : 
				var mouse = {
					x: evt.pageX - Graphics.canvasMinX,
					y: evt.pageY - Graphics.canvasMinY
				}; 	
				SceneData.data[GameStates.SETTINGS].determineRegion(mouse, 'click');
				var region = SceneData.data[GameStates.SETTINGS].whichRegion() ;
				switch(region)
				{
					case SceneData.data[GameStates.SETTINGS].EASY :
						GameObjects.ball.life = 2 ;
					break ;
					case SceneData.data[GameStates.SETTINGS].MEDIUM :
						GameObjects.ball.life = 1 ;
					break ;
					case SceneData.data[GameStates.SETTINGS].HARD :
						GameObjects.ball.life = 0 ;
					break ;
					case SceneData.data[GameStates.SETTINGS].BACK :
						DxBall.setState(GameStates.START_SCREEN) ;
					break; 
				}
			break ;
			
			case 'mousemove':
				var mouse = {
					x: evt.pageX - Graphics.canvasMinX,
					y: evt.pageY - Graphics.canvasMinY
				}; 
				SceneData.data[GameStates.SETTINGS].determineRegion(mouse, 'mousemove');
				if(SceneData.data[GameStates.SETTINGS].whichRegion() != -1)
					DxBall.canvas.style.cursor = 'pointer' ;
				else
					DxBall.canvas.style.cursor = 'default' ;
			break;
		}
	}
	};
				
	var unregisterEvents = function(state) {
		switch(state) {
			case GameStates.START_SCREEN :
				DxBall.canvas.removeEventListener('click', startSceneHandler, false);
				DxBall.canvas.removeEventListener('mousemove', startSceneHandler, false);
			break ;
			case GameStates.INFO_SCREEN :
				DxBall.canvas.removeEventListener('click', infoSceneHandler, false);
				DxBall.canvas.removeEventListener('mousemove', infoSceneHandler, false);
			break ;
			case GameStates.RUNNING : 
				DxBall.canvas.removeEventListener('keydown', runningGameSceneHandler, false); 
				DxBall.canvas.removeEventListener('keyup', runningGameSceneHandler, false); 
				DxBall.canvas.removeEventListener('mousemove', runningGameSceneHandler, false); 
				DxBall.canvas.removeEventListener('click', runningGameSceneHandler, false);
			break ;
			case GameStates.PAUSED : 
				DxBall.canvas.removeEventListener('click', pausedGameSceneHandler, false); 
				DxBall.canvas.removeEventListener('mousemove', pausedGameSceneHandler, false); 
			break ;
			case GameStates.SPLASH_SCREEN :
				DxBall.canvas.removeEventListener('click', splashScreenHandler, false); 
				DxBall.canvas.removeEventListener('mousemove', splashScreenHandler, false); 
			break;
			case GameStates.LEVEL_SELECT :
				DxBall.canvas.removeEventListener('click', levelSelectSceneHandler, false); 
				DxBall.canvas.removeEventListener('mousemove', levelSelectSceneHandler, false);
			break ; 
			case GameStates.CREDIT_SCENE :
				DxBall.canvas.removeEventListener('click', creditSceneHandler, false); 
				DxBall.canvas.removeEventListener('mousemove', creditSceneHandler, false); 
			break ; 
			case GameStates.LEVEL_COMPLETE : 
				DxBall.canvas.removeEventListener('click', levelCompleteSceneHandler, false);
				DxBall.canvas.removeEventListener('mousemove', levelCompleteSceneHandler, false);
			break ;
			case GameStates.GAME_OVER :
				DxBall.canvas.removeEventListener('click', gameOverSceneHandler, false);
				DxBall.canvas.removeEventListener('mousemove', gameOverSceneHandler, false);
			break ; 
			case GameStates.SETTINGS :
				DxBall.canvas.removeEventListener('click', settingsSceneHandler, false);
				DxBall.canvas.removeEventListener('mousemove', settingsSceneHandler, false);
			break ;
		}
	};

	self.registerGameEvents = function(currState, prevState) {
		unregisterEvents(prevState); 
		switch(currState) {
			case GameStates.SPLASH_SCREEN :
				DxBall.canvas.addEventListener('click', splashScreenHandler, false); 
				DxBall.canvas.addEventListener('mousemove', splashScreenHandler, false); 
			break;
			case GameStates.START_SCREEN :
				DxBall.canvas.addEventListener('click', startSceneHandler, false);
				DxBall.canvas.addEventListener('mousemove', startSceneHandler, false);
			break ;
			case GameStates.INFO_SCREEN :
				DxBall.canvas.addEventListener('click', infoSceneHandler, false);
				DxBall.canvas.addEventListener('mousemove', infoSceneHandler, false);
			break ;
			case GameStates.RUNNING : 
				DxBall.canvas.addEventListener('keydown', runningGameSceneHandler, false); 
				DxBall.canvas.addEventListener('keyup', runningGameSceneHandler, false); 
				DxBall.canvas.addEventListener('mousemove', runningGameSceneHandler, false);
				DxBall.canvas.addEventListener('click', runningGameSceneHandler, false);
			break ;
			case GameStates.PAUSED : 
				DxBall.canvas.addEventListener('click', pausedGameSceneHandler, false); 
				DxBall.canvas.addEventListener('mousemove', pausedGameSceneHandler, false); 
			break ;
			case GameStates.LEVEL_COMPLETE : 
				DxBall.canvas.addEventListener('click', levelCompleteSceneHandler, false);
				DxBall.canvas.addEventListener('mousemove', levelCompleteSceneHandler, false);
			break ; 
			case GameStates.LEVEL_SELECT :
				DxBall.canvas.addEventListener('click', levelSelectSceneHandler, false); 
				DxBall.canvas.addEventListener('mousemove', levelSelectSceneHandler, false);
			break ; 
			case GameStates.CREDIT_SCENE : 
				DxBall.canvas.addEventListener('click', creditSceneHandler, false); 
				DxBall.canvas.addEventListener('mousemove', creditSceneHandler, false); 
			break ; 
			case GameStates.GAME_OVER :
				DxBall.canvas.addEventListener('click', gameOverSceneHandler, false);
				DxBall.canvas.addEventListener('mousemove', gameOverSceneHandler, false);
			break ;
			case GameStates.SETTINGS :
				DxBall.canvas.addEventListener('click', settingsSceneHandler, false);
				DxBall.canvas.addEventListener('mousemove', settingsSceneHandler, false);
			break ; 
		}
	};
};
