
/**********************************
 * Res 1 : Paddle image
 * Res 2 : Splash screen
 * Res 3 : Credit screen
 * Res 4 : Level select screen
 * Res 5 : Level unlocked screen
 * Res 6 : Level locked screen
 * Res 7 : Next level screen
***********************************/ 

var resources = ['img/paddle.png', 
				 'img/splash.png', 
				 'img/credit.png', 
				 'img/lselect.png', 
				 'img/ulevel.png',
				 'img/llevel.png',
				 'img/next.png']; 

function Resource(res) {
	this.res = res ;
	this.x = 0 ;
	this.y = 0 ;
	this.height = res.height ; 
	this.width = res.width ;
}

var imgres = [] ; 

var licondata = new Array(6);
var LEVEL_ICON_WIDTH = 120;
var LEVEL_ICON_HEIGHT = 110;
var ICON_PADDING_WIDTH = 70;
var ICON_PADDING_HEIGHT = 86; 

function givePositions() {
	for(i=0; i<6; ++i)
	{
		if(i < 3)
			licondata[i] = { x: (i*imgres[4].width) + (i+1)*ICON_PADDING_WIDTH,
						          y: ICON_PADDING_HEIGHT, 
						          unlocked: false
					            }; 
		else
			licondata[i] = { x: ((i-3)*imgres[4].width) + (i-2)*ICON_PADDING_WIDTH,
		                          y: ICON_PADDING_HEIGHT*2 + imgres[4].height,
						          unlocked: false
					            };
	}
	licondata[0].unlocked = true ; 
}

function preloadimages(arr){
    var newimages = [], loadedimages = 0;
    var postaction = function(){};
    var arr = (typeof arr!="object")? [arr] : arr;
    function imageloadpost(){
        loadedimages++;
        if (loadedimages == arr.length){
            postaction(newimages) ;//call postaction and pass in newimages array as parameter
        }
    }
    for (var i=0; i<arr.length; ++i){
        newimages[i] = new Image();
        newimages[i].src = arr[i];
        newimages[i].onload = function(){
            imageloadpost();
        };
        newimages[i].onerror = function(){
            imageloadpost();
        };
    }
    return { //return blank object with done() method
        done:function(f){
            postaction = f || postaction ;//remember user defined callback functions to be called when images load
        }
    }
}
 
function loadResources(start) {
	console.log("Loading resources..."); 
	preloadimages(resources).done(function(images){
		for(i=0; i<images.length; ++i) {
			imgres[i] = new Resource(images[i]);
			console.log(imgres[i].height + "," + imgres[i].width); 
		}
		givePositions(); 
		if(start)
			startGame(); 
	});
}
