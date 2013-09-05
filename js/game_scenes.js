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
	ctx.fillStyle = '#FF0000' ;
	rect(0, 0, WIDTH, HEIGHT); 
	ctx.fillStyle = '#FFFAF0' ; 
	ctx.font = "20px Verdana" ;
	ctx.fillText("LEVEL COMPLETE", WIDTH/2-80, HEIGHT/2);
	ctx.fillStyle = '#8B0000' ; 
	rect(350, 400, WIDTH-350, HEIGHT-400); 
	ctx.fillStyle = Colors.WHITE ; 
	ctx.fillText("NEXT >>", 350 + (WIDTH-350)/2 - 40, 400 + (HEIGHT-400)/2); 
	ctx.fillText("You have scored " + points, WIDTH/2-100, HEIGHT/2 + 30);
}

function drawCreditScene() {
	credit_image = new Image(); 
	credit_image.onload = function() {
		ctx.drawImage(credit_image, 0, 0);
	};
	credit_image.src = CREDIT_SCREEN_PATH ; 
}

function drawSplashScreen() {
	splash_image = new Image();
	splash_image.onload = function() {
		ctx.drawImage(splash_image, 0, 0); 
	}; 
	splash_image.src = SPLASH_SCREEN_PATH ; 
}

function drawLevelSelectScene() {
	DrawLevelIcons[GAME_LEVEL].unlocked = true ; 
	levels_image = new Image(); 
	llevel = new Image();
	ulevel = new Image(); 
	var loaded = 0 ; 
	ulevel.onload = function() { loaded += 1 ; }; 
	llevel.onload = function() { loaded += 1 ; };  
	levels_image.onload = function() {
		ctx.drawImage(levels_image, 0, 0); 
		if(loaded > 1)
			for(i=0; i<6; ++i)
				ctx.drawImage((DrawLevelIcons[i].unlocked == true ? ulevel : llevel), 
					DrawLevelIcons[i].x, DrawLevelIcons[i].y); 
	}; 
	ulevel.src = LEVEL_UNLOCKED_ICON_PATH ; 
	llevel.src = LEVEL_LOCKED_ICON_PATH ; 
	levels_image.src = LEVEL_SELECT_SCREEN_PATH ; 
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
