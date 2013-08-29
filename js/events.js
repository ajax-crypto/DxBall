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
					rightDown = false;
				else if (evt.keyCode == 37) 
					leftDown = false;
			break ;
				 
			case 'keyup' : 
				if (evt.keyCode == 39) 
					rightDown = true;
				else if (evt.keyCode == 37) 
					leftDown = true;
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
				
				if(checkBounds(mouse, 65, 56, 202, 195)) {
					clear();
					gameState = RUNNING ;
				}
				//console.log("clicked !" + gameState); 
			break; 
			
			case 'mouseover':
				var mouse = {
					x: evt.pageX - canvasMinX,
					y: evt.pageY - canvasMinY
				}; 
				
				if(checkBounds(mouse, 65, 56, 202, 195))
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
		case LEVEL_COMPLETE : break ; 
		case LEVEL_SELECT :
			canvas.addEventListener('click', levelSelectSceneHandler, false); 
			canvas.addEventListener('mousemove', levelSelectSceneHandler, false); 
		break ; 
	}
}