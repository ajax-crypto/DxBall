function drawGameRunningScene() {
	ctx.fillStyle = Colors.BLACK ;
    clear();
	ball.draw(); 
	paddle.draw(); 
    drawbricks(); 
}

function drawGameOverScene() { 
	clear(); 
	ctx.fillStyle = '#FF0000' ;
	rect(0, 0, WIDTH, HEIGHT); 
	ctx.fillStyle = '#FFFAF0' ; 
	ctx.font = "20px Verdana" ;
	ctx.fillText("GAME OVER", WIDTH/2-50, HEIGHT/2);
	ctx.fillText("You have scored " + points, WIDTH/2-100, HEIGHT/2 + 30);
}

function drawLevelCompleteScene() {
	clear(); 
	ctx.fillStyle = '#53CF29' ;
	rect(0, 0, WIDTH, HEIGHT); 
	ctx.fillStyle = '#FFFAF0' ; 
	ctx.font = "20px Verdana" ;
	ctx.fillText("LEVEL COMPLETE", WIDTH/2-80, HEIGHT/2);
	ctx.fillStyle = Colors.WHITE ; 
	ctx.fillText("You have scored " + points, WIDTH/2-100, HEIGHT/2 + 30);
	ctx.globalCompositeOperation="source-over";
	ctx.drawImage(imgres[6].res, (WIDTH-imgres[6].width)/2, (HEIGHT-imgres[6].height)); 
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

function drawGameScenes(_gameState) {
	switch(_gameState) {
		case START :
		case SPLASH_SCREEN :
			drawSplashScreen();
			break ;
		case RUNNING : 
			drawGameRunningScene();
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
