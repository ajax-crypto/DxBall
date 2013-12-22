/***************************************
 * THE DX ENGINE :
 * It is a simple 2D engine which specifies 
 * interfaces for certain game classes and
 * provides other utilities. Doesn't include
 * physics engine.
 * *************************************/

var DX = {};

DX['EventUtilities'] = {
	rightDown : false, 
	leftDown : false,
	up : false,
	down : false,
	checkBounds : function (pos, x1, y1, x2, y2) {
		return (pos.x < x2 && pos.x > x1 && pos.y < y2 && pos.y > y1); 
	}
};

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
			if(DX.EventUtilities.checkBounds(mouse, self.regions[i].startx, 
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


