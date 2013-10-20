﻿// Handles paddle collision with canvas walls
function handlePaddle() {
	if(rightDown && (paddle.x < canvasMaxX)) {
		paddle.moveRight();
	}
	else if(leftDown && (paddle.x > canvasMinX)) {
		paddle.moveLeft();
	}
}

// Handles ball and brick collision
function handleBallBrick() {
	
	// Check if ball is within the region where bricks exist
	if (ball.y < NROWS*BrickDefaults.TRUE_HEIGHT) {
		
		// Calculate row and col of the brick hit
		var row = ~~(ball.y/BrickDefaults.TRUE_HEIGHT);
		var col = ~~(ball.x/BrickDefaults.TRUE_WIDTH);
		if(row >= 0 && col >= 0 && bricks[row][col].visible) {
			bricks[row][col].hit() ; 	
			if(ball.x > (col)*BrickDefaults.HEIGHT && ball.x < (col+1)*BrickDefaults.HEIGHT)
				ball.collideH() ; 
			//else
				ball.collideV() ;	
			
			// If the brick has a gift associated, activate it 
			if(gifts[GAME_LEVEL].row == row && gifts[GAME_LEVEL].col == col)
				gift.activate(); 
			
			// Change game object properties based on brick type the ball hit
			switch(bricks[row][col].type) {
				case 1 : 
					ball.speedup() ;
				break ;
				case 2 :
					bricks[row][col].weaken() ; 
					ball.normalSpeed(); 
				break ;
				case 4 :
					paddle.shorten();
					ball.normalSpeed(); 
				break ;
				case 5 :
					paddle.elongate();
					ball.normalSpeed(); 
				break ;
			}
			// Add to points tally
			points += bricks[row][col].points ;  
		}
	}
}

function handleGiftPaddle() {
	if(gift.active && gift.y > (HEIGHT - paddle.height) && gift.x < 
	(paddle.x + paddle.width) && gift.x > paddle.x) {
		gift.deactivate() ; 
		switch(gift.type) {
			case 1 : 
				points += gift.points ; 
			break ;
			case 2 : 
				ball.anotherLife() ;
			break ; 
		}
	}
}

// Handles ball paddle collision 
function handleBallPaddle() {
	var ballright = ball.x + ball.dx + ball.radius ; 
	var ballleft  = ball.x + ball.dx - ball.radius ; 
	var bally     = ball.y + ball.dy ;
	
    if(ballright > WIDTH || ballleft < 0)
		ball.collideH() ; 
	if(bally < 0)
		ball.collideV();
		
	else if(bally > HEIGHT - paddle.height) {
		if(ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
		
			//move the ball according to where it hit the paddle
			ball.dx =  8*((ball.x-(paddle.x + paddle.width/2))/paddle.width);
			ball.collideV();
		}
		else if(bally > HEIGHT) {
			
			// If player has extra life, the ball bounces off
			if(ball.life > 0) {
				ball.collideV(); 
				ball.usedOneLife();
			}
			else
				return false ; // ball falls here 
		}
	}
	return true ; 
}

// Handle all collisions and move ball
function handleCollisions() { 
	handlePaddle();
	handleBallBrick();
	handleGiftPaddle(); 
	var temp = handleBallPaddle(); 
	ball.move(); 
	gift.move();
	return temp ; 
}
