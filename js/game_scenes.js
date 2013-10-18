function drawGameRunningScene() {
	ctx.fillStyle = Colors.BLACK ;
    clear();
	ball.draw(); 
	paddle.draw(); 
    drawbricks(); 
}

function drawGameOverScene() { 
	clear(); 
	ctx.fillStyle = Colors.RED ;
	rect(0, 0, WIDTH, HEIGHT); 
	ctx.fillStyle = Colors.GOLD ; 
	ctx.fillText('GAME OVER', WIDTH/2, HEIGHT/2);
	ctx.fillText('You have scored ' + points, WIDTH/2, HEIGHT/2 + 20); 
}

function drawLevelCompleteScene() {
	clear(); 
	ctx.fillStyle = Colors.FORESTGREEN ;
	rect(0, 0, WIDTH, HEIGHT); 
	ctx.fillStyle = Colors.WHITE ; 
	ctx.fillText('LEVEL COMPLETE', WIDTH/2, HEIGHT/2);
	ctx.fillText('You have scored ' + points, WIDTH/2, HEIGHT/2 + 20);
	ctx.drawImage(imgres[6].res, imgres[6].x, imgres[6].y); 
}

function drawCreditScene() {
	ctx.drawImage(imgres[2].res, imgres[2].x, imgres[2].y); 
}

function drawSplashScreen() {
	ctx.drawImage(imgres[1].res, imgres[1].x, imgres[1].y); 
}

function drawLevelSelectScene() {
	ctx.drawImage(imgres[3].res, imgres[3].x, imgres[3].y); 
	for(i=0; i<6; ++i)
		ctx.drawImage((licondata[i].unlocked == true ? imgres[5].res : imgres[4].res), 
			licondata[i].x, licondata[i].y); 
}

function drawPausedGameScene() {
	grayscale() ; 
	ctx.drawImage(imgres[7].res, imgres[7].x, imgres[7].y); 
}

function drawGameScenes(_gameState) {
	switch(_gameState) {
		case SPLASH_SCREEN :
			drawSplashScreen();
			break ;
		case RUNNING : 
			drawGameRunningScene();
			break ;
		case PAUSED :
			drawPausedGameScene() ;
			break ; 
		case CREDIT_SCENE :
			drawCreditScene(); 
			break ;
		case GAME_OVER :
			drawGameOverScene();
			break ; 
		case LEVEL_COMPLETE :
			drawLevelCompleteScene();
			break ;
		case LEVEL_SELECT :
			drawLevelSelectScene();
			break ;
	}
}
