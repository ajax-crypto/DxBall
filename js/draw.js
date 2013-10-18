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

/* Note : If you run into the error : "Tainted canvas/DOM exception 18", 
 * then run chromium/chrome with the option --allow-file-access-from-files
 * This happens because data is accessed which is not in the same domain as
 * in the canvas 
 */
function grayscale() {
	if(canvas.width > 0 && canvas.height > 0) {
		var imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
		for(var i = 0; i < imageData.data.length; i += 4) {
			var r = imageData.data[i];
			var g = imageData.data[i + 1];
			var b = imageData.data[i + 2];
			imageData.data[i] = imageData.data[i + 1] = 
				imageData.data[i + 2] = (r+g+b)/3;
		}
		ctx.putImageData(imageData, 0, 0);
    }
}
