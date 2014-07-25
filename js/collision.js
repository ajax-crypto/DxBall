var CollisionSystem = new function () {
	
	var self = this ;
	
	// Handles paddle collision with canvas walls
	var handlePaddle = function () {
		if(DX.Utilities.rightDown && (GameObjects.paddle.x < DxBall.WIDTH - GameObjects.paddle.width)) {
			GameObjects.paddle.moveRight();
			console.log(DxBall.WIDTH - GameObjects.paddle.width + ',' + GameObjects.paddle.x);
		}
		else if(DX.Utilities.leftDown && (GameObjects.paddle.x > 0)) {
			GameObjects.paddle.moveLeft();
			console.log(GameObjects.paddle.x);
		}
	};
	
	var updateMovingObjects = function (object, i, j) {
		var self = this ;
		
		var bx = GameObjects.bricks[i][j].x ;
		var by = GameObjects.bricks[i][j].y ;
		var bheight = GameObjects.bricks[i][j].height ;
		var bwidth = GameObjects.bricks[i][j].width ;
		
		var bounds = object.getBounds();
		var direction = object.direction();
		
		var d1 = 0, d2 = 0;
		var up = false, down = false, right = false, left = false;
		
		var collideOblique = function (d1, d2, pos1, pos2) {
			if(d1 == d2) {
				if(!(pos1 ^ pos2)) {
					object.collideH();
					object.collideV();
				}
				else if(pos1 && !pos2)
					object.collideH();
				else if(!pos1 && pos2)
					object.collideV();
			}
			else if(d1 > d2)
				object.collideH();
			else
				object.collideV();
		};
		
		switch(direction) {
			case 'right' : 
				console.log('right');
				if(bounds.y > by && bounds.y < (by + bheight))
					object.collideH();
			break ;
			case 'left' :
				console.log('left');
				if(bounds.y > by && bounds.y < (by + bheight))
					object.collideH();
			break ;
			case 'up' :
				console.log('up');
				if(bounds.x > bx && bounds.x < (bx + bwidth))
					object.collideV();
			break;
			case 'down' :
				console.log('down');
				if(bounds.x > bx && bounds.x < (bx + bwidth))
					object.collideV();
			break;
			case 'leftdown' :
				d1 = (bounds.y + 2*bounds.r) - by;
				d2 = (bx + bwidth) - bounds.x;
				console.log('leftdown : ' + (bx + bwidth) + ' , ' + bounds.x);
				console.log('leftdown : ' + d1 + ' , ' + d2);
				try {
					up = GameObjects.bricks[i-1][j].visible ;
					right = GameObjects.bricks[i][j+1].visible ;
				} catch(err) { }
				collideOblique(d1, d2, up, right);
				up = false ;
				right = false;
			break;
			case 'rightdown' :
				
				d1 = (bounds.y + 2*bounds.r) - by;
				d2 = (bounds.x + 2*bounds.r) - bx;
				console.log('rightdown : ' + d1 + ' , ' + d2);
				try {
					up = GameObjects.bricks[i-1][j].visible ;
					left = GameObjects.bricks[i][j-1].visible ;
				} catch(err) { }
				collideOblique(d1, d2, up, left);
				up = false ;
				left = false ;
			break;
			case 'rightup' :
				d1 = (by + bheight) - bounds.y;
				d2 = (bounds.x + 2*bounds.r) - bx;
				console.log('rightup : ' + d1 + ' , ' + d2);
				try {
					down = GameObjects.bricks[i+1][j].visible ;
					left = GameObjects.bricks[i][j-1].visible ;
				} catch(err) { }
				collideOblique(d1, d2, down, left);
				down = false;
				left = false;
			break;
			case 'lefttup' :
				
				d1 = (by + bheight) - bounds.y;
				d2 = (bx + bwidth) - bounds.x;
				console.log('leftup : ' + d1 + ' , ' + d2);
				try {
					down = GameObjects.bricks[i+1][j].visible ;
					right = GameObjects.bricks[i][j+1].visible ;
				} catch(err) { }
				collideOblique(d1, d2, down, right);
				down = false ;
				right = false;
			break;
		}
	};

	// Handles ball and brick collision
	var handleBallBrick = function () {
	
	// Check if ball is within the region where bricks exist
		if(GameObjects.ball.y < DxBall.NROWS*BrickDefaults.TRUE_HEIGHT) {
		
			// Calculate row and col of the brick hit
			var row = ~~(GameObjects.ball.y/BrickDefaults.TRUE_HEIGHT);
			var col = ~~(GameObjects.ball.x/BrickDefaults.TRUE_WIDTH);
			if(row >= 0 && col >= 0 && GameObjects.bricks[row][col].visible) {
				GameObjects.bricks[row][col].hit() ;
				if(!GameObjects.ball.through) { 	
					updateMovingObjects(GameObjects.ball, row, col);
				}
				
				// Based on the bricks properties, change game object properties
				GameObjects.morphObjects(row, col);
				
				// If the brick has a gift associated, activate it 
				if(gifts[DxBall.level].row == row && gifts[DxBall.level].col == col)
					GameObjects.gift.activate();  
			}
		}
	};

	var handleGiftPaddle = function () {
		if(GameObjects.gift.active && (GameObjects.gift.y + GameObjects.gift.res.height) > 
			(DxBall.HEIGHT - GameObjects.paddle.height)) {
			GameObjects.gift.deactivate() ; 
			if(GameObjects.gift.x < (GameObjects.paddle.x + GameObjects.paddle.width) 
			&& GameObjects.gift.x > GameObjects.paddle.x)
				GameObjects.distributeGift();
		}
	};

	// Handles ball paddle collision 
	var handleBallPaddle = function () {
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
	};

	// Handle all collisions and move ball
	self.handleCollisions = function () { 
		handlePaddle();
		handleBallBrick();
		handleGiftPaddle(); 
		var temp = handleBallPaddle(); 
		return temp ; 
	};
};
