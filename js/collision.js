// Handles paddle collision with canvas walls
function handlePaddle() {
	if(EventUtilities.rightDown && (GameObjects.paddle.x < Graphics.canvasMaxX)) {
		GameObjects.paddle.moveRight();
	}
	else if(EventUtilities.leftDown && (GameObjects.paddle.x > Graphics.canvasMinX)) {
		GameObjects.paddle.moveLeft();
	}
}

// Handles ball and brick collision
function handleBallBrick() {
	
	// Check if ball is within the region where bricks exist
	if(GameObjects.ball.y < NROWS*BrickDefaults.TRUE_HEIGHT) {
		
		// Calculate row and col of the brick hit
		var row = ~~(GameObjects.ball.y/BrickDefaults.TRUE_HEIGHT);
		var col = ~~(GameObjects.ball.x/BrickDefaults.TRUE_WIDTH);
		if(row >= 0 && col >= 0 && GameObjects.bricks[row][col].visible) {
			GameObjects.bricks[row][col].hit() ;
			if(!GameObjects.ball.through) { 	
				//if(ball.x > (row)*BrickDefaults.HEIGHT && ball.x < (row+1)*BrickDefaults.HEIGHT)
					//ball.collideH() ; 
				GameObjects.ball.collideV() ;	
				
				// Change game object properties based on brick type the ball hit
				switch(GameObjects.bricks[row][col].type) {
					case 1 : 
						GameObjects.ball.speedup() ;
					break ;
					case 2 :
						GameObjects.ball.normalSpeed(); 
					break ;
					case 4 :
						GameObjects.paddle.shorten();
						GameObjects.ball.normalSpeed(); 
					break ;
					case 5 :
						GameObjects.paddle.elongate();
						GameObjects.ball.normalSpeed(); 
					break ;
				}
			}
			
			// If the brick has a gift associated, activate it 
			if(gifts[DxBall.level].row == row && gifts[DxBall.level].col == col)
				GameObjects.gift.activate(); 
			
			// Add to points tally
			DxBall.addPoints(GameObjects.bricks[row][col].points) ;  
		}
	}
}

function handleGiftPaddle() {
	if(GameObjects.gift.active && (GameObjects.gift.y + GameObjects.gift.res.height) 
		> (DxBall.HEIGHT - GameObjects.paddle.height) && GameObjects.gift.x < 
		(GameObjects.paddle.x + GameObjects.paddle.width) && GameObjects.gift.x > 
		GameObjects.paddle.x) {
		GameObjects.gift.deactivate() ; 
		switch(GameObjects.gift.type) {
			case 1 : 
				DxBall.addPoints(GameObjects.gift.points) ; 
			break ;
			case 2 : 
				GameObjects.ball.anotherLife() ;
			break ; 
			case 3 :
				GameObjects.ball.passThrough() ;
			break ; 
		}
	}
}

// Handles ball paddle collision 
function handleBallPaddle() {
	var ballright = GameObjects.ball.x + GameObjects.ball.dx + GameObjects.ball.radius ; 
	var ballleft  = GameObjects.ball.x + GameObjects.ball.dx - GameObjects.ball.radius ; 
	var bally     = GameObjects.ball.y + GameObjects.ball.dy ;
	
    if(ballright > DxBall.WIDTH || ballleft < 0)
		GameObjects.ball.collideH() ; 
	if(bally < 0)
		GameObjects.ball.collideV();
		
	else if(bally > DxBall.HEIGHT - GameObjects.paddle.height) {
		if(GameObjects.ball.x > GameObjects.paddle.x && GameObjects.ball.x < 
			GameObjects.paddle.x + GameObjects.paddle.width) {
		
			//move the ball according to where it hit the paddle
			GameObjects.ball.dx =  8*((GameObjects.ball.x-(GameObjects.paddle.x + 
				GameObjects.paddle.width/2))/GameObjects.paddle.width);
			GameObjects.ball.collideV();
		}
		else if(bally > DxBall.HEIGHT) {
			
			// If player has extra life, the ball bounces off
			if(GameObjects.ball.life > 0) {
				GameObjects.ball.collideV(); 
				GameObjects.ball.usedOneLife();
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
	GameObjects.ball.move(); 
	GameObjects.gift.move();
	return temp ; 
}
