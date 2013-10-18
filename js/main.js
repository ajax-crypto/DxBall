
/******************** Game Loop ********************/ 

function isComplete() {
	return (totalBricks == 0) ; 
}

function restartGame() {
	gameState = RUNNING ; 
	clearTimeout(loop);
	startGame(); 
}

function gameLoop() { 
	if(prevState != gameState) {
		handleGameEvents(gameState, prevState); 
		drawGameScenes(gameState) ;
	}
	prevState = gameState ; 
	if(gameState == RUNNING) {
		drawGameScenes(gameState) ;
		playState = handleCollisions(); 
		if(!playState) 
			gameState = GAME_OVER ;
		if(isComplete()) {
			gameState = LEVEL_COMPLETE ; 
			++GAME_LEVEL ;
			licondata[GAME_LEVEL].unlocked = true ; 
		} 
	}
	loop = setTimeout(gameLoop, 1000/FPS); 
}

function startGame() {
	clearTimeout(loop); 
	initBricks(); 
	initBall(); 
	playState = true ; 
	gameLoop(); 
}

function resumeGame() {
	gameState = RUNNING ;
}
	
