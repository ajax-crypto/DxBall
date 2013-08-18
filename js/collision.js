// Handles paddle collision with canvas walls
function handlePaddle() {
	if (rightDown && (paddle.x < canvasMaxX)) 
		paddle.x += paddle.speed;
	else if (leftDown && (paddle.x > canvasMinX)) 
		paddle.x -= paddle.speed;
}

// Handles ball and brick collision
function handleBallBrick() {
	if (ball.y < NROWS*BrickDefaults.TRUE_HEIGHT) {
		var row = ~~(ball.y/BrickDefaults.TRUE_HEIGHT);
		var col = ~~(ball.x/BrickDefaults.TRUE_WIDTH);
		
		//console.log(row+","+col+" : "+ball.y+","+ball.x); 
		
		if(row >= 0 && col >= 0 && bricks[row][col].visible) {
			if(ball.x > col*BrickDefaults.HEIGHT && ball.x < (col+1)*BrickDefaults.HEIGHT)
				ball.dx = -ball.dx ; 
			else 
				ball.dy = -ball.dy;		
				
			//console.log(ball.minDistanceY() + " , " + row*BrickDefaults.WIDTH + " , " + (row+1)*BrickDefaults.WIDTH); 
			
			if(bricks[row][col].speedup) 
				ball.speedup() ;
			else
				ball.normalSpeed(); 
			
			if(bricks[row][col].destructible == 1) {
				bricks[row][col].visible = false ;
				bricks[row][col].destroyed = true ;
				
				if(bricks[row][col] > 0) 
					paddle.elongate(); 
				else if(bricks[row][col] < 0)
					paddle.shorten(); 
			}
			
			else if(bricks[row][col].destructible > 1)
				bricks[row][col].destructible-- ; 
				
			points += bricks[row][col].points ; 
		}
	}
}

// Handles ball paddle collision 
function handleBallPaddle() {
	var ballright = ball.x + ball.dx + ball.radius ; 
	var ballleft  = ball.x + ball.dx - ball.radius ; 
	var bally   = ball.y + ball.dy ;
	
    if (ballright > WIDTH || ballleft < 0)
		ball.dx = -ball.dx;
	if (bally < 0)
		ball.dy = -ball.dy;
		
	else if (bally > HEIGHT - paddle.height) {
		if(ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
		
			//move the ball according to where it hit the paddle
			ball.dx =  8*((ball.x-(paddle.x + paddle.width/2))/paddle.width);
			ball.dy = -ball.dy;
			
			if(paddle.ticks > 0)
				paddle.ticks-- ;
				
			//console.log(paddle.ticks + " , " + ball.ticks);
		}
		else if(bally > HEIGHT) {
			return false ; // ball falls here 
		}
	}
	return true ; 
}

function handleCollisions() { 
	
	handlePaddle();
	handleBallBrick();
	var temp = handleBallPaddle(); 
	ball.x += ball.dx;
	ball.y += ball.dy;
	
	return temp ; 
}
