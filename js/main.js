
/******************** Game Loop ********************/ 

function isComplete() {
	for (i=0; i < NROWS; i++) 
		for (j=0; j < NCOLS; j++) 
			if(levels[GAME_LEVEL][i][j].destroyed == false && levels[GAME_LEVEL][i][j].destructible > 0) 
				return false;
	return true ;
}

function GameLoop() { 
	if(prevState != gameState)
		handleGameEvents(gameState, prevState); 
	prevState = gameState ; 
	drawGameScenes(gameState); 
	if(playState)
		playState = handleCollisions(); 
	else if(!playState) {
		console.log("Game over"); 
		gameState = GAME_OVER ;
	}
	else if(isComplete()) {
		gameState = LEVEL_COMPLETE ; 
		++GAME_LEVEL ;
	}
	if(gameState == PAUSED)
		toggleRunningState(); 
}

function toggleRunningState() {
	if(isRunning) {
		clearInterval(gameLoop);
		isRunning = false ;
	}
	else {
		isRunning = true ; 
		gameLoop = setInterval(GameLoop, 1000/FPS); 
	}
}

function RunGame() {
	gameState = RUNNING ; 
	isRunning = true ; 
	clearInterval(gameLoop);
	gameLoop = setInterval(GameLoop, 1000/FPS); 
	initBricks(); 
	initBall(); 
	GameLoop(); 
}

initBricks(); 
initBall(); 
toggleRunningState();
	