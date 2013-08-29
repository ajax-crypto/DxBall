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

function checkBounds(pos) {
	if(pos.x < 402 && pos.x > 250 && pos.y < 480 && pos.y > 417)
		return true ; 
	return false ;
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
	
				if(checkBounds(mouse)) {
					clear(); 
					gameState = CREDIT_SCENE ; 
				}
			break ;
				
			case 'mousemove' : 
				var mouse = {
					x: evt.pageX - canvasMinX,
					y: evt.pageY - canvasMinY
				}; 
	  
				if(checkBounds(mouse)) 
					canvas.style.cursor = 'pointer' ;
				else
					canvas.style.cursor = 'default' ;
			break ;
		}
	}
};

var levelSelectSceneHandler = {
	handleEvent : function(evt) {
		switch(evt) {
			case 'click' : 
				var mouse = {
					x: evt.pageX - canvasMinX,
					y: evt.pageY - canvasMinY
				}; 
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
	}
}