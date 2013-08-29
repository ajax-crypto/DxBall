﻿
/******************** Game Loop ********************/ 

function isComplete() {
	return (totalBricks == 0) ; 
}

function gameLoop() { 
	if(prevState != gameState)
		handleGameEvents(gameState, prevState); 
	
	if(prevState != gameState || gameState == RUNNING)
		drawGameScenes(gameState); 
	
	prevState = gameState ; 

	console.log(gameState); 
		
	if(gameState == RUNNING) {
		playState = handleCollisions(); 
		
		if(!playState) {
		    //console.log("Game over"); 
			gameState = GAME_OVER ;
		}
	
		if(isComplete()) {
			//console.log("level " + GAME_LEVEL); 
			gameState = LEVEL_COMPLETE ; 
			++GAME_LEVEL ;
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
	