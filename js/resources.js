
/**********************************
 * Res 1 : Paddle image
 * Res 2 : Splash screen
 * Res 3 : Credit screen
 * Res 4 : Level select screen
 * Res 5 : Level unlocked screen
 * Res 6 : Level locked screen
 * Res 7 : Next level screen
 * Res 8 : Paused screen
 * Res 9 : Coin Gift
 * Res 10 : Extra Life Gift
 * Res 11 : Gift : Ball passes through bricks destroying them
 * Res 12 : Info screen
 * Res 13 : Start screen
 * Res 14 : Settings screen
***********************************/ 

var ImageResource = [] ; 
var licondata = [] ;

var resources = ['img/paddle.png', 
		 'img/splash.png', 
		 'img/credit.png', 
		 'img/lselect.png', 
		 'img/ulevel.png',
		 'img/llevel.png',
		 'img/next.png',
		 'img/pause.png',
		 'img/coin.png',
		 'img/heart.png',
		 'img/multi.png',
		 'img/info.png',
		 'img/start.png',
		 'img/settings.png' ]; 

function Resource(res) {
	var self = this ; 
	self.res = res ;
	self.x = 0 ;
	self.y = 0 ;
	self.height = res.height ; 
	self.width = res.width ;
}

function givePositions() {
	var ICON_PADDING_WIDTH  = ~~((DxBall.WIDTH-(3*ImageResource[4].width))/4); 
	var ICON_PADDING_HEIGHT = ~~((DxBall.HEIGHT-(2*ImageResource[4].height))/3); 
	for(i=0; i<6; ++i)
	{
		if(i < 3)
			licondata[i] = { x: (i*ImageResource[4].width) + (i+1)*ICON_PADDING_WIDTH,
						          y: ICON_PADDING_HEIGHT, 
						          unlocked: false
					            }; 
		else
			licondata[i] = { x: ((i-3)*ImageResource[4].width) + (i-2)*ICON_PADDING_WIDTH,
		                          y: ICON_PADDING_HEIGHT*2 + ImageResource[4].height,
						          unlocked: false
					            };
	}
	licondata[0].unlocked = true ; // Start with first level
	ImageResource[6].x = ~~((DxBall.WIDTH - ImageResource[6].width)/2);
	ImageResource[6].y = ~~(DxBall.TOTAL_HEIGHT - ImageResource[6].height);
	ImageResource[7].x = ~~((DxBall.WIDTH - ImageResource[7].width)/2);
	ImageResource[7].y = ~~((DxBall.HEIGHT/2)-(ImageResource[7].height/2));
}

function preloadimages(arr){
    var newimages = [], loadedimages = 0;
    var postaction = function(){};
    var arr = (typeof arr!="object")? [arr] : arr;
    function imageloadpost(){
        loadedimages++;
        if (loadedimages == arr.length){
			//call postaction and pass in newimages array as parameter
            postaction(newimages) ;
        }
    }
    for (var i=0; i<arr.length; ++i){
        newimages[i] = new Image();
        newimages[i].src = arr[i];
        newimages[i].onload = function(){
            imageloadpost();
        };
        newimages[i].onerror = function(){
            alert('Failed to Load Resources');
        };
    }
    //return blank object with done() method
    return { 
        done:function(f){
			//remember user defined callback functions to be called when images load
            postaction = f || postaction ;
        }
    }
}
 
function loadResources(start) {
	preloadimages(resources).done(function(images){
		for(i=0; i<images.length; ++i)
			ImageResource[i] = new Resource(images[i]);
		givePositions();
		SceneData.init(); 
		if(start)
			DxBall.start(); // Start game only if resources are loaded
	});
}


/*********************************************************
 * The variable SceneData contains data in form
 * of regions, which denotes that they carry special
 * significance i.e. These regions when clicked (or
 * any other GUI events) upon will perform certain tasks.
 * *******************************************************/ 

 
function SceneDataFormat(_regions, _drawRegions) {
	var self = this ;
	var selectedRegion = -1 ;
	self.regions = _regions ;
	self.drawRegion = _drawRegions ;
}
		
SceneDataFormat.prototype.whichRegion = function() {
		return selectedRegion ;
	};
	
SceneDataFormat.prototype.determineRegion = function(mouse, event) {
		var self = this ;
		selectedRegion = -1 ;
		for(var i=0; i<self.regions.length; i++) {
			if(EventUtilities.checkBounds(mouse, self.regions[i].startx, 
				self.regions[i].starty, self.regions[i].endx, self.regions[i].endy)) {
				selectedRegion = i ;
			}
		}
	};
	
SceneDataFormat.prototype.getRegionData = function() {
		return this.drawRegion[selectedRegion] ;
	};
 
var SceneData = new function() {
	var self = this ;
	var initOnce = false ;
	self.data = [] ;
	self.regions = [] ;

	self.init = function () {
		if(initOnce)
			return ;
			
		self.regions[GameStates.SETTINGS] = new function () {
			var _this = this ;
			_this.EASY = 0 ;
			_this.MEDIUM = 1 ;
			_this.HARD = 2 ;
			_this.BACK = 3 ;
		};
		
		self.regions[GameStates.START_SCREEN] = new function() {
			var _this = this ;
			_this.CAMPAIGN = 0;
			_this.RANDOM = 1 ;
			_this.INFO = 2 ;
			_this.SETTINGS = 3 ;
		};
		
		self.regions[GameStates.LEVEL_SELECT] = new function() {
			var _this = this ;
			_this.LEVEL1 = 0 ;
			_this.LEVEL2 = 1 ;
			_this.LEVEL3 = 2 ;
			_this.LEVEL4 = 3 ;
			_this.LEVEL5 = 4 ;
			_this.LEVEL6 = 5 ;
			_this.BACK = 6 ;
		};
		
		self.regions[GameStates.LEVEL_COMPLETE] = new function() {
			var _this = this ;
			_this.CONTINUE = 0 ;
		};
			
		self.regions[GameStates.PAUSED] = new function() {
			var _this = this ;
			_this.RESTART = 0;
			_this.RESUME = 1;
			_this.BACK = 2 ;
		};
			
		self.data[GameStates.SETTINGS] = new SceneDataFormat(
			[ { startx : 210, starty : 180, endx : 420, endy : 240 },
			  { startx : 210, starty : 240, endx : 420, endy : 310 },
			  { startx : 210, starty : 310, endx : 420, endy : 380 },
			  { startx : 0, starty : 430, endx : 50, endy : 480 } ], 
		    [ { x : 200, y : 205, r : 5 },
		      { x : 200, y : 280, r : 5 },
		      { x : 200, y : 345, r : 5 } ]);
	
		self.data[GameStates.START_SCREEN] = new SceneDataFormat(
			[ { startx : 170, starty : 55, endx : 437, endy : 140 },
			  { startx : 170, starty : 180, endx : 437, endy : 265 },
			  { startx : 170, starty : 322, endx : 437, endy : 392 },
		      { startx : 565, starty : 410, endx : 640, endy : 480 } ]);
	
		self.data[GameStates.LEVEL_SELECT] = new SceneDataFormat(
			(function() {
				var regions = [] ;
				var w = ImageResource[4].width, h = ImageResource[4].height ;
				for(i=0; i<licondata.length; ++i)
					regions[i] = { startx : licondata[i].x, starty : licondata[i].y,
						endx : licondata[i].x + w, endy : licondata[i].y + h } ;
						regions[i] = { startx : 0, starty : 380, endx : 50, endy : 430 } ;
				return regions; })());
	
		self.data[GameStates.LEVEL_COMPLETE] = new SceneDataFormat(
			[ { startx : 204, starty : DxBall.HEIGHT-90, endx : 435, endy : 480 } ]);
	
		self.data[GameStates.PAUSED] = new SceneDataFormat(
		(function() {
			var regions = [] ;
			var heights = ~~(ImageResource[7].height/3) ;
			for(var i=0; i<3; ++i)
				regions[i] = { startx : ImageResource[7].x, 
							starty : ImageResource[7].y + i*heights,
							endx : ImageResource[7].x + ImageResource[7].width,
							endy : ImageResource[7].y + (i+1)*heights };
			return regions; })());
		
		initOnce = true ;
	};
};

