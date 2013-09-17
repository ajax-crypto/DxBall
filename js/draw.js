function getOffset(el) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

var canvasMinX = getOffset(canvas).left;
var canvasMaxX = canvasMinX + WIDTH;
var canvasMinY = getOffset(canvas).top; 

function roundRect(x, y, width, height, radius, fill) {
	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.lineTo(x + width - radius, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
	ctx.lineTo(x + width, y + height - radius);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	ctx.lineTo(x + radius, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
	ctx.lineTo(x, y + radius);
	ctx.quadraticCurveTo(x, y, x + radius, y);
	ctx.closePath();
	if (fill) 
		ctx.fill();   
	else
		ctx.stroke(); 
}

function circle(x, y, r) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
}

function rect(x, y, w, h) {
	ctx.beginPath();
	ctx.rect(x, y, w, h);
	ctx.closePath();
	ctx.fill();
}

function clear() {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	rect(0, 0, WIDTH, HEIGHT);
}

function image(img, cx, cy, x, y, w, h) {
	ctx.drawImage(img, cx, cy, img.width, img.height, x, y, w, h); 
}  
