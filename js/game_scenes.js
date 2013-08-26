﻿function drawSplashScreen() {
	splash_image = new Image();
	splash_image.onload = function() {
		ctx.drawImage(splash_image, 0, 0); 
	}; 
	splash_image.src = SPLASH_SCREEN_PATH ; 
}

function drawScene() {
	ctx.fillStyle = Colors.BLACK ;
    clear();
	
	ball.draw(); 
	paddle.draw(); 
    drawbricks(); 
}

function drawEndScene(isComplete) { 
	clear(); 
	ctx.fillStyle = '#FF0000' ;
	rect(0, 0, WIDTH, HEIGHT); 
	ctx.fillStyle = '#FFFAF0' ; 
	ctx.font = "20px Verdana" ;
	if(isComplete == true)
		ctx.fillText("LEVEL COMPLETE", WIDTH/2-70, HEIGHT/2);
	else
		ctx.fillText("GAME OVER", WIDTH/2-50, HEIGHT/2);
	ctx.fillText("You have scored " + points, WIDTH/2-100, HEIGHT/2 + 30);
}

function end(isComplete) {
	drawEndScene(isComplete); 
}	

function drawCreditScene() {
	clear(); 
	ctx.fillStyle = '#FF0000' ; 
	rect(0, 0, WIDTH, HEIGHT); 
	ctx.fillStyle = '#FFFAF0' ;
	ctx.font = "20px Verdana" ;
	ctx.fillText(AUTHOR, WIDTH/2-70, HEIGHT/2);
}