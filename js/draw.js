var Graphics = new function() {
	
	var self = this ; 
	
	self.getOffset = function(el) {
		var _x = 0;
		var _y = 0;
		while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
			_x += el.offsetLeft - el.scrollLeft;
			_y += el.offsetTop - el.scrollTop;
			el = el.offsetParent;
		}
		return { top: _y, left: _x };
	};

    self.canvasMinX = self.getOffset(DxBall.canvas).left;
	self.canvasMaxX = self.canvasMinX + DxBall.WIDTH;
	self.canvasMinY = self.getOffset(DxBall.canvas).top; 

	self.circle = function(x, y, r, color) {
		DxBall.ctx.fillStyle = color ;
		DxBall.ctx.beginPath();
		DxBall.ctx.arc(x, y, r, 0, Math.PI*2, true);
		DxBall.ctx.closePath();
		DxBall.ctx.fill();
	};

	self.rect = function(x, y, w, h, color) {
		DxBall.ctx.fillStyle = color ;
		DxBall.ctx.beginPath();
		DxBall.ctx.rect(x, y, w, h);
		DxBall.ctx.closePath();
		DxBall.ctx.fill();
	};

	self.clear = function(w, h) {
		DxBall.ctx.clearRect(0, 0, w, h);
		this.rect(0, 0, w, h);
	};

	self.image = function(img, x, y) {
		DxBall.ctx.drawImage(img, x, y); 
	};
	
	self.altImage = function(img, w, h, x, y, xpos, ypos) {
		DxBall.ctx.drawImage(img, w, h, x, y, xpos, ypos);
	};

/* Note : If you run into the error : "Tainted canvas/DOM exception 18", 
 * then run chromium/chrome with the option --allow-file-access-from-files
 * This happens because data is accessed which is not in the same domain as
 * in the canvas 
 */
	self.grayscale = function() {
		var imageData = DxBall.ctx.getImageData(0, 0, DxBall.WIDTH, DxBall.HEIGHT);
		for(var i = 0; i < imageData.data.length; i += 4) {
			var r = imageData.data[i];
			var g = imageData.data[i + 1];
			var b = imageData.data[i + 2];
			imageData.data[i] = imageData.data[i + 1] = 
				imageData.data[i + 2] = (r+g+b)/3;
		}
		DxBall.ctx.putImageData(imageData, 0, 0);
	};
};
