
/******************** Game Loop ********************/ 

function isComplete() {
	//console.log(totalBricks + " left "); 
	return (totalBricks == 0) ; 
}

function gameLoop() { 
	if(prevState != gameState)
		handleGameEvents(gameState, prevState); 
	
	if(gameState == RUNNING || prevState != gameState)
		drawGameScenes(gameState); 
	
	prevState = gameState ; 

	//console.log(gameState); 
		
	if(gameState == RUNNING) {
		playState = handleCollisions(); 
		
		if(!playState) {
		    //console.log("Game over"); 
			gameState = GAME_OVER ;
		}
	
		if(isComplete()) {
			console.log("level " + GAME_LEVEL); 
			gameState = LEVEL_COMPLETE ; 
			++GAME_LEVEL ;
			licondata[GAME_LEVEL].unlocked = true ; 
		} 
	}	
	
	if(gameState != PAUSED)
		loop = setTimeout(gameLoop, 1000/FPS); 
}

function restartGame() {
	gameState = LEVEL_SELECT ; 
	clearTimeout(loop);
	startGame(); 
}

function startGame() {
	clearTimeout(loop); 
	console.log("Starting ball speed " + ball.dx + " " + ball.dy); 
	initBricks(); 
	initBall(); 
	playState = true ; 
	gameLoop(); 
}

function resumeGame() {
	gameState = RUNNING ; 
	//console.log(gameState + " " + prevState); 
	gameLoop();
}
	
