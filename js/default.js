var canvas = document.getElementById('dxball'); 
var ctx = canvas.getContext('2d');

var WIDTH = 640;
var HEIGHT = 480;
var rightDown = false;
var leftDown = false;
var bricks;
var loop ; 
var points = 1 ; 

var PADDLE_IMAGE_PATH = "img/paddle.png" ; 
var SPLASH_SCREEN_PATH = "img/splash.png" ; 
var CREDIT_SCREEN_PATH  = "img/credit.png" ; 
var LEVEL_SELECT_SCREEN_PATH  = "img/lselect.png"; 
var LEVEL_UNLOCKED_ICON_PATH = "img/llevel.png"; 
var LEVEL_LOCKED_ICON_PATH = "img/ulevel.png"; 
var NEXT_LEVEL_PATH = "img/next.png"; 

var Colors = Object.freeze({ "WHITE" : "#FFFFFF",
							 "BLACK" : "#000000"
						  }); 

var BrickDefaults = Object.freeze({ "WIDTH" : 80, 
									"HEIGHT" : 25,
									"PADDING" : 1,
									"TRUE_HEIGHT" : 26,
									"TRUE_WIDTH" : 81
								 }); 
								 
var PaddleDefaults = Object.freeze({ "WIDTH" : 75,
									 "HEIGHT" : 10,
									 "SPEED" : 7,
									 "COLOR" : Colors.WHITE,
									 "XPOS" : WIDTH/2 
								  }); 
								  
var BallDefaults = Object.freeze({ "RADIUS" : 6,
								   "COLOR" : Colors.WHITE,
								   "SPEED" : 4, 
								   "DX" : 1.5,
								   "DY" : -4,
								   "X" : 25,
								   "Y" : 250, 
								   "SPEED_UP" : 2
								}); 

var rowcolors = ["#FF1C0A", 
				 "#FFFD0A", 
				 "#00A308", 
				 "#0008DB", 
				 "#EB0093", 
				 "#7FFFD4", 
				 "#8A2BE2", 
				 "#A0522D"];
				 
var GAME_LEVEL = 0 ; 

var DrawLevelIcons = new Array(6);
var LEVEL_ICON_WIDTH = 120;
var LEVEL_ICON_HEIGHT = 110;
var ICON_PADDING_WIDTH = 70;
var ICON_PADDING_HEIGHT = 86; 
for(i=0; i<6; ++i)
{
	if(i < 3)
		DrawLevelIcons[i] = { x: (i*LEVEL_ICON_WIDTH) + (i+1)*ICON_PADDING_WIDTH,
						 y: ICON_PADDING_HEIGHT, 
						 unlocked: false
					   }; 
	else
		DrawLevelIcons[i] = { x: ((i-3)*LEVEL_ICON_WIDTH) + (i-2)*ICON_PADDING_WIDTH,
		                 y: ICON_PADDING_HEIGHT*2 + LEVEL_ICON_HEIGHT,
						 unlocked: false
					   };
}

DrawLevelIcons[0].unlocked = true ; 

var FPS = 50 ; 

var AUTHOR = 'Akash Pradhan' ; 

var START = -1 ; 
var SPLASH_SCREEN = 0 ; 
var RUNNING = 1 ; 
var LEVEL_COMPLETE = 2 ;
var GAME_OVER = 3 ; 
var PAUSED = 4 ; 
var CREDIT_SCENE = 5 ; 
var LEVEL_SELECT = 6 ; 

var gameState = START ; 
var prevState = -2 ; 
var playState = true ; 
