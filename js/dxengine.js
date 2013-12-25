/***************************************
 * THE DX ENGINE :
 * It is a simple 2D engine which specifies 
 * interfaces for certain game classes and
 * provides other utilities. Doesn't include
 * physics engine.
 * *************************************/

var DX = {};

DX['SceneDataFormat'] = function (regions, drawRegions, selectedRegion) {
	var self = this ;
	self.selectedRegion = (typeof selectedRegion === 'undefined') ? -1 : selectedRegion ;
	self.regions = regions ;
	self.drawRegion = drawRegions ;
}
		
DX.SceneDataFormat.prototype.whichRegion = function () {
		return this.selectedRegion ;
	};
	
DX.SceneDataFormat.prototype.determineRegion = function (mouse, event) {
		var self = this ;
		self.selectedRegion = -1 ;
		for(var i=0; i<self.regions.length; i++) {
			if(DX.Utilities.checkBounds(mouse, self.regions[i].startx, 
				self.regions[i].starty, self.regions[i].endx, self.regions[i].endy)) {
				self.selectedRegion = i ;
			}
		}
	};
	
DX.SceneDataFormat.prototype.getRegionData = function () {
		return this.drawRegion[this.selectedRegion] ;
	};

DX['EventHandler'] = function (handlers, state) {
	
	var self = this ;
	var gameState = state ; 
	
	self.customHandlers = handlers ;
				
	self.handleEvent = function (event) {
		for(var i=0; i<self.customHandlers.length; ++i)
			if(self.customHandlers[i].eventType === event.type)
				self.customHandlers[i].handle(event, gameState);
	};
}	

DX['getOffset'] = function (el) {
	var x = 0;
	var y = 0;
	while(el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
		x += el.offsetLeft - el.scrollLeft;
		y += el.offsetTop - el.scrollTop;
		el = el.offsetParent;
	}
	return { top: y, left: x };
};

DX['Resource'] = function (res) {
	var self = this ; 
	self.res = res ;
	self.x = 0 ;
	self.y = 0 ;
	self.height = res.height ; 
	self.width = res.width ;
}

DX['ResourceManager'] = function (resourceURLs, positionAssign) {

	var self = this ;
	
	self.resources = resourceURLs ;
	self.givePositions = positionAssign ;
	
	self.preloadImages = function (arr) {
		var newimages = [], loadedimages = 0;
		var postaction = function () {};
		var arr = (typeof arr != "object")? [arr] : arr;
		function imageloadpost(){
			loadedimages++;
			if (loadedimages == arr.length)
				//call postaction and pass in newimages array as parameter
				postaction(newimages) ;
		}
		for (var i=0; i<arr.length; ++i){
			newimages[i] = new Image();
			newimages[i].src = arr[i];
			newimages[i].onload = function(){
				imageloadpost();
			};
			newimages[i].onerror = function(){
				alert('Failed to Load Resources :(');
			};
		}
		//return blank object with done() method
		return { 
			done : function (f){
				//remember user defined callback functions to be called when images load
				postaction = f || postaction ;
			}
		}
	};
};

DX['Graphics'] = function (_Game) {
	
	var self = this ; 
	var Game = _Game ;
	
    var minmax = DX.getOffset(Game.canvas) ;
    self.canvasMinX = minmax.left;
	self.canvasMaxX = self.canvasMinX + Game.WIDTH;
	self.canvasMinY = minmax.top; 

	self.circle = function(x, y, r, color) {
		Game.ctx.fillStyle = color ;
		Game.ctx.beginPath();
		Game.ctx.arc(x, y, r, 0, Math.PI*2, true);
		Game.ctx.closePath();
		Game.ctx.fill();
	};

	self.rect = function(x, y, w, h, color) {
		Game.ctx.fillStyle = color ;
		Game.ctx.fillRect(x, y, w, h);
	};

	self.clear = function(w, h) {
		self.rect(0, 0, w, h, Colors.BLACK);
	};
	
	self.clearPortion = function(x, y, w, h) {
		self.rect(x, y, w, h, Colors.BLACK);
	};

	self.image = function(img, x, y) {
		Game.ctx.drawImage(img, x, y); 
	};
	
	self.altImage = function(img, x, y, w, h) {
		Game.ctx.drawImage(img, x, y, w, h);
	};
	
	self.text = function(str, x, y, color) {
		Game.ctx.fillStyle = color ;
		Game.ctx.fillText(str, x, y);
	};

/* Note : If you run into the error : "Tainted canvas/DOM exception 18", 
 * then run chromium/chrome with the option --allow-file-access-from-files
 * This happens because data is accessed which is not in the same domain as
 * in the canvas 
 */
	self.grayscale = function() {
		var imageData = Game.ctx.getImageData(0, 0, Game.WIDTH, Game.HEIGHT);
		for(var i = 0; i < imageData.data.length; i += 4) {
			var r = imageData.data[i];
			var g = imageData.data[i + 1];
			var b = imageData.data[i + 2];
			imageData.data[i] = imageData.data[i + 1] = 
				imageData.data[i + 2] = (r+g+b)/3;
		}
		Game.ctx.putImageData(imageData, 0, 0);
	};
};

DX['Utilities'] = {
	rightDown : false, 
	leftDown : false,
	up : false,
	down : false,
	checkBounds : function (pos, x1, y1, x2, y2) {
		return (pos.x < x2 && pos.x > x1 && pos.y < y2 && pos.y > y1); 
	},
	getEventLocation : function(event, game) {
		var offset = DX.getOffset(game.canvas) ;
		return { x: event.pageX - offset.left,
		         y: event.pageY - offset.top }; 
	}
};

/**
 * requestAnim shim layer by Paul Irish
 * Finds the first API that works to optimize the animation loop,
 * otherwise defaults to setTimeout().
 */
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame   ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function(callback, game){
        game.loop = window.setTimeout(callback, 1000 / 20);
      };
})();

