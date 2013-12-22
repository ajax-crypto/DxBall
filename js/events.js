
var _tempMouseMove = {
	eventType : 'mousemove',
	handle : function(event, state) {
		var mouse = { x: event.pageX - Graphics.canvasMinX,
					  y: event.pageY - Graphics.canvasMinY }; 
		SceneData.data[state].determineRegion(mouse, 'mouseover');
		if(SceneData.data[state].whichRegion() != -1) 
			DxBall.canvas.style.cursor = 'pointer' ;
		else
			DxBall.canvas.style.cursor = 'default' ;
	}
};

var EventHandlers = new function () {

	var self = this ;

	var _handlers = [] ;
	
	_handlers[GameStates.INVALID] = new DX.EventHandler([{
		eventType : 'invalid',
		handle : function(event, state) {} 
	}], GameStates.INVALID);
	
	_handlers[GameStates.PAUSED] = new DX.EventHandler([{ 
		eventType : 'click', 
		handle : function(event, state) {
			var mouse = { x: event.pageX - Graphics.canvasMinX,
					      y: event.pageY - Graphics.canvasMinY }; 
			SceneData.data[state].determineRegion(mouse, 'click');
			var region = SceneData.data[state].whichRegion();
			switch(region) {
				case SceneData.regions[state].RESTART :
					DxBall.restart(); 
				break ;
				case SceneData.regions[state].RESUME :
					DxBall.resume(); 
				break ;
				case SceneData.regions[state].BACK :
					DxBall.setState(DxBall.prevstate) ;
				break ;
			}
		}
	}, _tempMouseMove], GameStates.PAUSED);
				
	_handlers[GameStates.RUNNING] = new DX.EventHandler([{ 
		eventType : 'click', 
		handle : function(event, state) {
			if(DxBall.isRunning())
					DxBall.pause(); 
		}
	}, {
		eventType : 'mousemove',
		handle : function(event, state) {
			if(event.pageX > Graphics.canvasMinX && event.pageX < Graphics.canvasMaxX) {
					GameObjects.paddle.x = Math.max(event.pageX - Graphics.canvasMinX - 
						(GameObjects.paddle.width/2), 0);
					GameObjects.paddle.x = Math.min(DxBall.WIDTH - GameObjects.paddle.width, 
						GameObjects.paddle.x);
			    }
		}
	}, {
		eventType : 'keydown',
		handle : function(event, state) {
			if(event.keyCode == 39) 
					EventUtilities.rightDown = true;
				else if(event.keyCode == 37) 
					EventUtilities.leftDown = true;
		}
	}, {
		eventType : 'keyup',
		handle : function(event, state) {
			if(event.keyCode == 39) 
					EventUtilities.rightDown = false;
				else if(event.keyCode == 37) 
					EventUtilities.leftDown = false;
		}
	}], GameStates.RUNNING);
	
	_handlers[GameStates.SPLASH_SCREEN] = new DX.EventHandler([{ 
		eventType : 'click', 
		handle : function(event, state) {
			var mouse = { x: event.pageX - Graphics.canvasMinX,
					      y: event.pageY - Graphics.canvasMinY }; 
			SceneData.data[state].determineRegion(mouse, 'click');
			var region = SceneData.data[state].whichRegion();
			switch(region) {
				case SceneData.regions[state].START1 :
				case SceneData.regions[state].START2 :
				case SceneData.regions[state].START3 :
					DxBall.setState(GameStates.START_SCREEN) ;
				break ;
				case SceneData.regions[state].CREDITS :
					DxBall.setState(GameStates.CREDIT_SCENE) ;
				break ;
			}
		}
	}, _tempMouseMove], GameStates.SPLASH_SCREEN);

	_handlers[GameStates.LEVEL_SELECT] = new DX.EventHandler([{ 
		eventType : 'click', 
		handle : function(event, state) {
			var mouse = { x: event.pageX - Graphics.canvasMinX,
					      y: event.pageY - Graphics.canvasMinY }; 
			SceneData.data[state].determineRegion(mouse, 'click');
			var region = SceneData.data[state].whichRegion();
			switch(region) {
				case SceneData.regions[state].LEVEL1 :
				case SceneData.regions[state].LEVEL2 :
				case SceneData.regions[state].LEVEL3 :
				case SceneData.regions[state].LEVEL4 :
				case SceneData.regions[state].LEVEL5 :
				case SceneData.regions[state].LEVEL6 :
					DxBall.startLevel(region); 
				break ;
				case SceneData.regions[state].BACK :
					DxBall.setState(GameStates.START_SCREEN) ;
				break ;
			}
		}
	}, _tempMouseMove], GameStates.LEVEL_SELECT);
	
	_handlers[GameStates.CREDIT_SCENE] = new DX.EventHandler([{ 
		eventType : 'click', 
		handle : function(event, state) {
			DxBall.setState(GameStates.START_SCREEN) ; 
		}
	}, _tempMouseMove], GameStates.CREDIT_SCENE);
	
	_handlers[GameStates.LEVEL_COMPLETE] = new DX.EventHandler([{ 
		eventType : 'click', 
		handle : function(event, state) {
			var mouse = { x: event.pageX - Graphics.canvasMinX,
					      y: event.pageY - Graphics.canvasMinY }; 
			SceneData.data[state].determineRegion(mouse, 'click');
			var region = SceneData.data[state].whichRegion();
			if(region != -1)  
				DxBall.playRandom ? DxBall.setState(GameStates.START_SCREEN) :
					DxBall.setState(GameStates.LEVEL_SELECT) ;
		}
	}, _tempMouseMove], GameStates.LEVEL_COMPLETE);

	_handlers[GameStates.GAME_OVER] = new DX.EventHandler([{ 
		eventType : 'click', 
		handle : function(event, state) {
			DxBall.playRandom ? DxBall.setState(GameStates.START_SCREEN) :
					DxBall.setState(GameStates.LEVEL_SELECT) ;
		}
	}, _tempMouseMove], GameStates.GAME_OVER);
	
	_handlers[GameStates.INFO_SCREEN] = new DX.EventHandler([{ 
		eventType : 'click', 
		handle : function(event, state) {
			DxBall.setState(GameStates.START_SCREEN);
		}
	}, _tempMouseMove], GameStates.INFO_SCREEN);
	
	_handlers[GameStates.START_SCREEN] = new DX.EventHandler([{ 
		eventType : 'click', 
		handle : function(event, state) {
			var mouse = { x: event.pageX - Graphics.canvasMinX,
					      y: event.pageY - Graphics.canvasMinY }; 
			SceneData.data[state].determineRegion(mouse, 'click');
			var region = SceneData.data[state].whichRegion() ;
			switch(region)
			{
				case SceneData.regions[state].CAMPAIGN :
					DxBall.setState(GameStates.LEVEL_SELECT); 
				break ;
				case SceneData.regions[state].RANDOM :
					DxBall.startRandomLevel();
				break ;
				case SceneData.regions[state].INFO :
					DxBall.setState(GameStates.INFO_SCREEN);
				break ;
				case SceneData.regions[state].SETTINGS :
					DxBall.setState(GameStates.SETTINGS);
				break; 
			}
		}
	}, _tempMouseMove], GameStates.START_SCREEN);

	_handlers[GameStates.SETTINGS] = new DX.EventHandler([{ 
		eventType : 'click', 
		handle : function(event, state) {
			var mouse = { x: event.pageX - Graphics.canvasMinX,
					      y: event.pageY - Graphics.canvasMinY }; 
			SceneData.data[state].determineRegion(mouse, 'click');
			var region = SceneData.data[state].whichRegion() ;
			switch(region)
			{
				case SceneData.regions[state].EASY : 
				case SceneData.regions[state].MEDIUM :
				case SceneData.regions[state].HARD :
					DrawGameScenes.makeSceneRedraw(GameStates.SETTINGS) ;
					DxBall.setDifficulty(region);
				break ;
				case SceneData.regions[state].BACK :
					DxBall.setState(GameStates.START_SCREEN) ;
				break; 
			}
		}
	}, _tempMouseMove], GameStates.SETTINGS);
	
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
