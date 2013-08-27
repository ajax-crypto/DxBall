﻿document.getElementById('start').addEventListener('click', function() { 
		pause.innerHTML = "Pause" ; 
		RunGame(); 
	}, false); 
	
document.getElementById('pause').addEventListener('click', function() {
		if(gameState == RUNNING) {
			gameState = PAUSED ; 
			pause.innerHTML = "Resume" ; 
		}
		else if(gameState == PAUSED) {
			gameState = RUNNING ; 
			pause.innerHTML = "Pause" ;
		}
	}, false); 

function checkBounds(pos) {
	if(pos.x < 402 && pos.x > 250 && pos.y < 480 && pos.y > 417)
		return true ; 
	return false ;
}

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
				//console.log("mouse moved");
				if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
					paddle.x = Math.max(evt.pageX - canvasMinX - (paddle.width/2), 0);
					paddle.x = Math.min(WIDTH - paddle.width, paddle.x);
			   }
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
					x: evt.pageX - canvasMinX,
					y: evt.pageY - canvasMinY
				}; 
	
				if(checkBounds(mouse)) {
					clear(); 
					gameState = CREDIT_SCENE ; 
				}
			break ;
				
			case 'mousemove' : 
				//console.log("mouse moved");
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

function unregisterEvents(_gameState) {
	switch(_gameState) {
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

function handleGameEvents(_gameState, prevState) {
	unregisterEvents(prevState); 
	switch(_gameState) {
		case START : 
			//console.log("start "); 
		case SPLASH_SCREEN :
			canvas.addEventListener('click', splashScreenHandler, false); 
			canvas.addEventListener('mousemove', splashScreenHandler, false); 
		break;
		case RUNNING : 
			//console.log("running... "); 
			canvas.addEventListener('keydown', runningGameSceneHandler, false); 
			canvas.addEventListener('keyup', runningGameSceneHandler, false); 
			canvas.addEventListener('mousemove', runningGameSceneHandler, false);
		break ;
	}
}