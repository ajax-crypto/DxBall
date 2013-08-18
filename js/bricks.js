function Brick(width, height, padding, points, color, visibility) {
	this.width = width ;
	this.height = height ;
	this.padding = padding ; 
	this.points = points ;
	this.color = color ;
	this.speedup = false ; 
	this.visible = visibility ; 
	this.destructible = 1 ; 
	this.destroyed = false ; 
	this.paddleElongate = 0 ; 
	switch(this.color) {
		case "#FF1C0A" : this.destructible = 0 ;
						 break;
		case "#00A308" : this.points += 100 ;
						 break ;
		case "#EB0093" : this.paddleElongate = 1 ; 
						 break ;
		case "#8A2BE2" : this.paddleElongate = -1 ;
				         break ;
		case "#A0522D" : this.destructible = (~~(Math.random()*2) + 1); 
						 break ; 
		case "#7FFFD4" : this.speedup = true ;
		                 break ; 
	}
	
	this.draw = function(x, y) { 
		if(!this.visible)
			this.destroyed = true ; 
		if (this.visible) {
			ctx.fillStyle = this.color ; 
			rect((y * (this.width + this.padding)) + this.padding, (x * (this.
				height + this.padding)) + this.padding, this.width, this.height);
		}
	} ; 
} 

function initBricks() {
    bricks = new Array(NROWS); 
    for (i=0; i < NROWS; i++) {
        bricks[i] = new Array(NCOLS);
        for (j=0; j < NCOLS; j++) {
            bricks[i][j] = new Brick(BrickDefaults.WIDTH, BrickDefaults.HEIGHT, 
				BrickDefaults.PADDING, ~~(Math.random()*10), rowcolors[~~(Math.
				random()*10)], brickMatrix[i][j]); 
        }
    }
}

function drawbricks() {
	for (i=0; i < NROWS; i++) 
		for (j=0; j < NCOLS; j++) 
			bricks[i][j].draw(i, j); 
}