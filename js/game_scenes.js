function drawScene() {
	ctx.fillStyle = Colors.BLACK ;
    clear();
	
	ball.draw(); 
	paddle.draw(); 
    drawbricks(); 
}

function drawEndScene() { 
	clear(); 
	ctx.fillStyle = "White" ;
	ctx.font = "20px Verdana" ;
	ctx.fillText("GAME OVER", HEIGHT/2-140, WIDTH/2-80); 
	ctx.fillText("You have scored " + points, HEIGHT/2-160, WIDTH/2-50);
}

function end() {
	drawEndScene(); 
	setTimeout('end', 1000);
}	