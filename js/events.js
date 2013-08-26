
canvas.addEventListener('click', function(evt) {
	evt.preventDefault();
	
	var mouse = {
        x: evt.pageX - canvasMinX,
        y: evt.pageY - canvasMinY
    }; 
	
	if(checkBounds(mouse)) {
		clear(); 
		drawCreditScene(); 
	}
	
}, false); 

function checkBounds(pos) {
	if(pos.x < 402 && pos.x > 250 && pos.y < 480 && pos.y > 417)
		return true ; 
	return false ;
}

document.addEventListener('keydown', function (evt) {
		if (evt.keyCode == 39) 
			rightDown = true;
		else if (evt.keyCode == 37) 
			leftDown = true;
	}, false); 
	
document.addEventListener('keyup', function (evt) {
		if (evt.keyCode == 39) 
			rightDown = false;
		else if (evt.keyCode == 37) 
			leftDown = false;
	}, false); 

document.addEventListener('mousemove', function (evt) {
		if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
			paddle.x = Math.max(evt.pageX - canvasMinX - (paddle.width/2), 0);
			paddle.x = Math.min(WIDTH - paddle.width, paddle.x);
		}
	}, false); 
	
document.getElementById('start').addEventListener('click', function() {
		run = true ; 
		pause.innerHTML = "Pause" ; 
		initBricks(); 
		initBall(); 
		RunGame(); 
	}, false); 
	
document.getElementById('pause').addEventListener('click', function() {
		if(run == true) {
			run = false ; 
			pause.innerHTML = "Resume" ; 
		}
		else {
			run = true ;
			pause.innerHTML = "Pause" ;
			RunGame() ;
		}
	}, false); 
	