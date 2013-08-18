function Paddle(xpos, height, width, color, speed) {
	this.x = xpos ; 
	this.height = height ; 
	this.width = width ; 
	this.color = color ; 
	this.speed = speed ; 
	this.ticks = 0 ; 
	this.image = new Image();
	this.image.src = PADDLE_IMAGE_PATH ; 
	
	this.draw = function() {
		ctx.fillStyle = this.color;
		image(this.image, 0, 0, this.x, HEIGHT-this.height, this.width, this.height); 
	} ; 
	
	this.shorten = function() {
		this.ticks = 3 ; 
		if(this.width > 25 && this.ticks > 0)
			this.width -= 10 ;
		if(this.ticks == 0)
			this.width += 10 ;
	}
	
	this.elongate = function() {
		this.ticks = 3 ; 
		if(this.width < 125 && this.ticks > 0)
			this.width += 10 ;
		if(this.ticks == 0)
			this.width -= 10 ;
	}
		
}

var paddle = new Paddle(PaddleDefaults.XPOS, PaddleDefaults.HEIGHT, PaddleDefaults.WIDTH, 
					PaddleDefaults.COLOR, PaddleDefaults.SPEED); 