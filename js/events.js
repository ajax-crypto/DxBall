
var EventUtilities = {
	rightDown : false, 
	leftDown : false,

	checkBounds : function(pos, x1, y1, x2, y2) {
		return (pos.x < x2 && pos.x > x1 && pos.y < y2 && pos.y > y1); 
	}
};

function EventHandler(handlers, state) {
	var self = this ;
	var gameState = state ; 
	var mouseMove = false ;
	
	self.customHandlers = handlers ;
	
	for(var i=0; i<self.customHandlers.length; ++i)
		if(self.customHandlers[i].eventType === 'mousemove')
				mouseMove = true ;
				
	self.handleEvent = function(event) {
		var mouse = { x: event.pageX - Graphics.canvasMinX,
					  y: event.pageY - Graphics.canvasMinY }; 
		
		for(var i=0; i<self.customHandlers.length; ++i)
			if(self.customHandlers[i].eventType === event.type)
				self.customHandlers[i].handle(event);
				
		if(!mouseMove && event.type === 'mousemove') {
			SceneData.data[gameState].determineRegion(mouse, 'mouseover');
			if(SceneData.data[gameState].whichRegion() != -1) 
				DxBall.canvas.style.cursor = 'pointer' ;
			else
				DxBall.canvas.style.cursor = 'default' ;
		}
	};
}	

var EventHandlers = new function () {

	var self = this ;

	var _handlers = [] ;
	
	_handlers[GameStates.INVALID] = new EventHandler([{
		eventType : 'invalid',
		handle : function(event) {} 
	}], GameStates.INVALID);
	
	_handlers[GameStates.PAUSED] = new EventHandler([{ 
		eventType : 'click', 
		handle : function(event) {
			var mouse = { x: event.pageX - Graphics.canvasMinX,
					      y: event.pageY - Graphics.canvasMinY }; 
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
		}
	}], GameStates.PAUSED);
				
	_handlers[GameStates.RUNNING] = new EventHandler([{ 
		eventType : 'click', 
		handle : function(event) {
			if(DxBall.isRunning())
					DxBall.pause(); 
		}
	}, {
		eventType : 'mousemove',
		handle : function(event) {
			if(event.pageX > Graphics.canvasMinX && event.pageX < Graphics.canvasMaxX) {
					GameObjects.paddle.x = Math.max(event.pageX - Graphics.canvasMinX - 
						(GameObjects.paddle.width/2), 0);
					GameObjects.paddle.x = Math.min(DxBall.WIDTH - GameObjects.paddle.width, 
						GameObjects.paddle.x);
			    }
		}
	}, {
		eventType : 'keydown',
		handle : function(event) {
			if(event.keyCode == 39) 
					EventUtilities.rightDown = true;
				else if(event.keyCode == 37) 
					EventUtilities.leftDown = true;
		}
	}, {
		eventType : 'keyup',
		handle : function(event) {
			if(event.keyCode == 39) 
					EventUtilities.rightDown = false;
				else if(event.keyCode == 37) 
					EventUtilities.leftDown = false;
		}
	}], GameStates.RUNNING);
	
	_handlers[GameStates.SPLASH_SCREEN] = new EventHandler([{ 
		eventType : 'click', 
		handle : function(event) {
			var mouse = { x: event.pageX - Graphics.canvasMinX,
					      y: event.pageY - Graphics.canvasMinY }; 
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
		}
	}], GameStates.SPLASH_SCREEN);

	_handlers[GameStates.LEVEL_SELECT] = new EventHandler([{ 
		eventType : 'click', 
		handle : function(event) {
			var mouse = { x: event.pageX - Graphics.canvasMinX,
					      y: event.pageY - Graphics.canvasMinY }; 
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
		}
	}], GameStates.LEVEL_SELECT);
	
	_handlers[GameStates.CREDIT_SCENE] = new EventHandler([{ 
		eventType : 'click', 
		handle : function(event) {
			DxBall.setState(GameStates.START_SCREEN) ; 
		}
	}], GameStates.CREDIT_SCENE);
	
	_handlers[GameStates.LEVEL_COMPLETE] = new EventHandler([{ 
		eventType : 'click', 
		handle : function(event) {
			var mouse = { x: event.pageX - Graphics.canvasMinX,
					      y: event.pageY - Graphics.canvasMinY }; 
			SceneData.data[GameStates.LEVEL_COMPLETE].determineRegion(mouse, 'click');
			var region = SceneData.data[GameStates.LEVEL_COMPLETE].whichRegion();
			if(region != -1)  
				DxBall.playRandom ? DxBall.setState(GameStates.START_SCREEN) :
					DxBall.setState(GameStates.LEVEL_SELECT) ;
		}
	}], GameStates.LEVEL_COMPLETE);

	_handlers[GameStates.GAME_OVER] = new EventHandler([{ 
		eventType : 'click', 
		handle : function(event) {
			DxBall.playRandom ? DxBall.setState(GameStates.START_SCREEN) :
					DxBall.setState(GameStates.LEVEL_SELECT) ;
		}
	}], GameStates.GAME_OVER);
	
	_handlers[GameStates.INFO_SCREEN] = new EventHandler([{ 
		eventType : 'click', 
		handle : function(event) {
			DxBall.setState(GameStates.START_SCREEN);
		}
	}], GameStates.INFO_SCREEN);
	
	_handlers[GameStates.START_SCREEN] = new EventHandler([{ 
		eventType : 'click', 
		handle : function(event) {
			var mouse = { x: event.pageX - Graphics.canvasMinX,
					      y: event.pageY - Graphics.canvasMinY }; 
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
		}
	}], GameStates.START_SCREEN);

	_handlers[GameStates.SETTINGS] = new EventHandler([{ 
		eventType : 'click', 
		handle : function(event) {
			var mouse = { x: event.pageX - Graphics.canvasMinX,
					      y: event.pageY - Graphics.canvasMinY }; 
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
		}
	}], GameStates.SETTINGS);
	
	var unregisterEvents = function(state) {
		DxBall.canvas.removeEventListener('mousemove', _handlers[state], false);
		for(var i=0; i<_handlers[state].customHandlers.length; ++i)
			DxBall.canvas.removeEventListener(_handlers[state].customHandlers[i].eventType, 
				_handlers[state], false);
	};

	self.registerGameEvents = function(currState, prevState) {
		unregisterEvents(prevState); 
		DxBall.canvas.addEventListener('mousemove', _handlers[currState], false);
		for(var i=0; i<_handlers[currState].customHandlers.length; ++i)
			DxBall.canvas.addEventListener(_handlers[currState].customHandlers[i].eventType, 
				_handlers[currState], false);
	};
};
