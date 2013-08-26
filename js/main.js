
/******************** Game Loop ********************/ 

function isComplete() {
	for (i=0; i < NROWS; i++) 
		for (j=0; j < NCOLS; j++) 
			if(bricks[i][j].destroyed == false && bricks[i][j].destructible > 0) 
				return false;
	return true ;
}

function GameLoop() {
	drawScene(); 
	var gameState = handleCollisions(); 
	if(gameState == false) {
		clearTimeout(gameLoop); 
		end(false); 
	}
	else if(isComplete()) {
		clearTimeout(gameLoop); 
		end(true); 
	}
	else {
		if(run)
			gameLoop = setTimeout(GameLoop, 1000/FPS); 	
	}
}; 

function RunGame() {
	if(state == false) 
		state = true ;
	//console.log("Defaults : bw ="+BrickDefaults.TRUE_WIDTH+
	//	", bh="+BrickDefaults.TRUE_HEIGHT); 
	clearTimeout(gameLoop); 
	GameLoop(); 
}

	