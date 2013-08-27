
/******************** Game Loop ********************/ 

function isComplete() {
	for (i=0; i < NROWS; i++) 
		for (j=0; j < NCOLS; j++) 
			if(levels[GAME_LEVEL][i][j].destroyed == false && levels[GAME_LEVEL][i][j].destructible > 0) 
				return false;
	return true ;
}

function gameLoop() { 
	
	var sceneChanged ; 
	
	if(prevState != gameState) {
		handleGameEvents(gameState, prevState); 
	}
	
	if(prevState != gameState || gameState == RUNNING)
		sceneChanged = true ; 
	
	prevState = gameState ; 
	
	if(sceneChanged)
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
	
	if(gameState != PAUSED)
		loop = setTimeout(gameLoop, 1000/FPS); 
}

function restartGame() {
	gameState = RUNNING ; 
	clearTimeout(loop);
	startGame(); 
}

function startGame() {
	initBricks(); 
	initBall(); 
	playState = true ; 
	gameLoop(); 
}

function resumeGame() {
	gameState = RUNNING ; 
	gameLoop();
}
	