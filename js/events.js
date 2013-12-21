
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

				SceneData.data[GameStates.PAUSED].determineRegion(mouse, 'click');
				var region = SceneData.data[GameStates.PAUSED].whichRegion();
				switch(region) {
					case SceneData.regions[GameStates.PAUSED].RESTART :
						DxBall.restart(); 
					break ;
					case SceneData.regions[GameStates.PAUSED].RESUME :
						DxBall.resume(); 
					break ;
					case SceneData.regions[GameStates.PAUSED].BACK :
						DxBall.setState(DxBall.prevstate) ;
					break ;
				}
				
			break ;
			case 'mousemove' :
				var mouse = {
					x: evt.pageX - Graphics.canvasMinX,
					y: evt.pageY - Graphics.canvasMinY
				}; 
				
				SceneData.data[GameStates.PAUSED].determineRegion(mouse, 'mouseover');
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
				SceneData.data[GameStates.SPLASH_SCREEN].determineRegion(mouse, 'click');
				var region = SceneData.data[GameStates.SPLASH_SCREEN].whichRegion();
				switch(region) {
					case SceneData.regions[GameStates.SPLASH_SCREEN].START1 :
					case SceneData.regions[GameStates.SPLASH_SCREEN].START2 :
					case SceneData.regions[GameStates.SPLASH_SCREEN].START3 :
						DxBall.setState(GameStates.START_SCREEN) ;
					break ;
					case SceneData.regions[GameStates.SPLASH_SCREEN].CREDITS :
						DxBall.setState(GameStates.CREDIT_SCENE) ;
					break ;
				}
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
					case SceneData.regions[GameStates.LEVEL_SELECT].LEVEL1 :
					case SceneData.regions[GameStates.LEVEL_SELECT].LEVEL2 :
					case SceneData.regions[GameStates.LEVEL_SELECT].LEVEL3 :
					case SceneData.regions[GameStates.LEVEL_SELECT].LEVEL4 :
					case SceneData.regions[GameStates.LEVEL_SELECT].LEVEL5 :
					case SceneData.regions[GameStates.LEVEL_SELECT].LEVEL6 :
						DxBall.startLevel(region); 
					break ;
					case SceneData.regions[GameStates.LEVEL_SELECT].BACK :
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
					case SceneData.regions[GameStates.START_SCREEN].CAMPAIGN :
						DxBall.setState(GameStates.LEVEL_SELECT); 
					break ;
					case SceneData.regions[GameStates.START_SCREEN].RANDOM :
						DxBall.startRandomLevel();
					break ;
					case SceneData.regions[GameStates.START_SCREEN].INFO :
						DxBall.setState(GameStates.INFO_SCREEN);
					break ;
					case SceneData.regions[GameStates.START_SCREEN].SETTINGS :
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
					case SceneData.regions[GameStates.SETTINGS].EASY : 
					case SceneData.regions[GameStates.SETTINGS].MEDIUM :
					case SceneData.regions[GameStates.SETTINGS].HARD :
						DrawGameScenes.makeSceneRedraw(GameStates.SETTINGS) ;
						DxBall.setDifficulty(region);
					break ;
					case SceneData.regions[GameStates.SETTINGS].BACK :
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
