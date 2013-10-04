document.getElementById('start').addEventListener('click', function() { 
		pause.innerHTML = "Pause" ; 
		restartGame(); 
	}, false); 
	
document.getElementById('pause').addEventListener('click', function() {
		if(gameState == RUNNING) {
			gameState = PAUSED ; 
			pause.innerHTML = "Resume" ; 
		}
		else if(gameState == PAUSED) {
			resumeGame(); 
			pause.innerHTML = "Pause" ;
		}
	}, false); 


var runningGameSceneHandler = {
	handleEvent : function(evt) {
		switch(evt.type) {
			case 'keydown' : 
				if (evt.keyCode == 39) 
					rightDown = true;
				else if (evt.keyCode == 37) 
					leftDown = true;
			break ;
				 
			case 'keyup' : 
				if (evt.keyCode == 39) 
					rightDown = false;
				else if (evt.keyCode == 37) 
					leftDown = false;
			break ;
				
			case 'mousemove' : 
				if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
					paddle.x = Math.max(evt.pageX - canvasMinX - (paddle.width/2), 0);
					paddle.x = Math.min(WIDTH - paddle.width, paddle.x);
			    }
			break ;
		}
	}
}; 

function checkBounds(pos, x1, y1, x2, y2) {
	return (pos.x < x2 && pos.x > x1 && pos.y < y2 && pos.y > y1); 
}

var splashScreenHandler = {
	handleEvent : function(evt) { 
		switch(evt.type) {
			case 'click' : 
				evt.preventDefault();
				var mouse = {
					x: evt.pageX - canvasMinX,
					y: evt.pageY - canvasMinY
				}; 
	
				if(checkBounds(mouse, 250, 417, 402, 480)) {
					clear(); 
					gameState = CREDIT_SCENE ; 
				}
			break ;
				
			case 'mousemove' : 
				var mouse = {
					x: evt.pageX - canvasMinX,
					y: evt.pageY - canvasMinY
				}; 
	  
				if(checkBounds(mouse, 250, 417, 402, 480)) 
					canvas.style.cursor = 'pointer' ;
				else
					canvas.style.cursor = 'default' ;
			break ;
		}
	}
};

var levelSelectSceneHandler = {
	handleEvent : function(evt) {
		switch(evt.type) {
			case 'click' : 
				var mouse = {
					x: evt.pageX - canvasMinX,
					y: evt.pageY - canvasMinY
				}; 
				
				//console.log(mouse.x + "," + mouse.y); 
				
				for(i=0; i<6; ++i)
					if(checkBounds(mouse, DrawLevelIcons[i].x, DrawLevelIcons[i].y, 
						DrawLevelIcons[i].x + LEVEL_ICON_WIDTH, DrawLevelIcons[i].y 
						+ LEVEL_ICON_HEIGHT) && DrawLevelIcons[i].unlocked == true) {
						clear();
						gameState = RUNNING ; 
						GAME_LEVEL = i ; 
						startGame(); 
					}
			break; 
			
			case 'mousemove':
				var mouse = {
					x: evt.pageX - canvasMinX,
					y: evt.pageY - canvasMinY
				}; 
				
				for(i=0; i<=GAME_LEVEL; ++i)
					if(checkBounds(mouse, DrawLevelIcons[i].x, DrawLevelIcons[i].y, 
						DrawLevelIcons[i].x + LEVEL_ICON_WIDTH, DrawLevelIcons[i].y 
						+ LEVEL_ICON_HEIGHT)) 
						canvas.style.cursor = 'pointer' ;
					else
						canvas.style.cursor = 'default' ;
			break;
		}
	}
};

var creditSceneHandler = {
	handleEvent : function(evt) {
		switch(evt.type) {
			case 'click' : gameState = LEVEL_SELECT ; 
			break ; 
			case 'mousemove' : canvas.style.cursor = 'pointer' ; 
			break ; 
		}
	}
};

var levelCompleteSceneHandler = {
	handleEvent : function(evt) {
		switch(evt.type) {
			case 'click' : 
				var mouse = {
					x: evt.pageX - canvasMinX,
					y: evt.pageY - canvasMinY
				}; 
				
				if(checkBounds(mouse, 204, HEIGHT-90, 435, 480)) {
					clear(); 
					gameState = LEVEL_SELECT ; 
				}
			break ; 
			case 'mousemove' : 
			var mouse = {
					x: evt.pageX - canvasMinX,
					y: evt.pageY - canvasMinY
				}; 
				
				if(checkBounds(mouse, 204, HEIGHT-90, 435, 480))
					canvas.style.cursor = 'pointer' ; 
				else
					canvas.style.cursor = 'default' ; 
			break; 
		}
	}
}; 
				
function unregisterEvents(state) {
	switch(state) {
		case RUNNING : 
			canvas.removeEventListener('keydown', runningGameSceneHandler, false); 
			canvas.removeEventListener('keyup', runningGameSceneHandler, false); 
			canvas.removeEventListener('mousemove', runningGameSceneHandler, false); 
		break ;
		case SPLASH_SCREEN :
			canvas.removeEventListener('click', splashScreenHandler, false); 
			canvas.removeEventListener('mousemove', splashScreenHandler, false); 
		break;
		case LEVEL_SELECT :
			canvas.removeEventListener('click', levelSelectSceneHandler, false); 
			canvas.removeEventListener('mousemove', levelSelectSceneHandler, false); 
		break ; 
		case CREDIT_SCENE :
			canvas.removeEventListener('click', creditSceneHandler, false); 
			canvas.removeEventListener('mousemove', creditSceneHandler, false); 
		break ; 
		case LEVEL_COMPLETE : 
			canvas.removeEventListener('click', levelCompleteSceneHandler, false);
			canvas.removeEventListener('mousemove', levelCompleteSceneHandler, false);
		break ;
	}
}

function handleGameEvents(currState, prevState) {
	unregisterEvents(prevState); 
	switch(currState) {
		case START : 
		case SPLASH_SCREEN :
			canvas.addEventListener('click', splashScreenHandler, false); 
			canvas.addEventListener('mousemove', splashScreenHandler, false); 
		break;
		case RUNNING : 
			canvas.addEventListener('keydown', runningGameSceneHandler, false); 
			canvas.addEventListener('keyup', runningGameSceneHandler, false); 
			canvas.addEventListener('mousemove', runningGameSceneHandler, false);
		break ;
		case LEVEL_COMPLETE : 
			canvas.addEventListener('click', levelCompleteSceneHandler, false);
			canvas.addEventListener('mousemove', levelCompleteSceneHandler, false);
		break ; 
		case LEVEL_SELECT :
			canvas.addEventListener('click', levelSelectSceneHandler, false); 
			canvas.addEventListener('mousemove', levelSelectSceneHandler, false);
		break ; 
		case CREDIT_SCENE : 
			canvas.addEventListener('click', creditSceneHandler, false); 
			canvas.addEventListener('mousemove', creditSceneHandler, false); 
		break ; 
	}
}
