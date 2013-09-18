var canvas = document.getElementById('dxball'); 
var ctx = canvas.getContext('2d');

var WIDTH = 640;
var HEIGHT = 480;
var rightDown = false;
var leftDown = false;
var bricks;
var loop ; 
var points = 0 ; 

var PADDLE_IMAGE_PATH = "img/paddle.png" ; 
var SPLASH_SCREEN_PATH = "img/splash.png" ; 
var CREDIT_SCREEN_PATH  = "img/credit.png" ; 
var LEVEL_SELECT_SCREEN_PATH  = "img/lselect.png"; 
var LEVEL_UNLOCKED_ICON_PATH = "img/llevel.png"; 
var LEVEL_LOCKED_ICON_PATH = "img/ulevel.png"; 
var NEXT_LEVEL_PATH = "img/next.png"; 

var Colors = Object.freeze({ WHITE : "#FFFFFF",
							 BLACK : "#000000",
							 RED : "FF0000", 
							 ROYALBLUE : "4169E1",
							 PURPLE : "800080",
							 ORANGERED : "FF4500",
							 NAVYBLUE : "000080",
							 MAROON : "800000",
							 FORESTGREEN : "228B22",
							 DODGERBLUE : "1E90FF",
							 DARKGREEN : "006400",
							 CRIMSON : "DC143C",
							 SEAGREEN : "2E8B57",
							 TEAL : "008080",
							 TORQUIOSE : "40E0D0",
							 MAGENTA : "FF00FF",
							 AQUA : "00FFFF",
							 GOLD : "FFD700"
						  }); 

var BrickDefaults = Object.freeze({ WIDTH : 80, 
									HEIGHT : 25,
									PADDING : 1,
									TRUE_HEIGHT : 26,
									TRUE_WIDTH : 81
								 }); 
								 
var PaddleDefaults = Object.freeze({ WIDTH : 75,
									 HEIGHT : 10,
									 SPEED : 7,
									 XPOS : WIDTH/2 
								  }); 
								  
var BallDefaults = Object.freeze({ RADIUS : 6,
								   COLOR : Colors.WHITE,
								   SPEED : 4, 
								   DX : 1.5,
								   DY : -4,
								   X : 25,
								   Y : 250, 
								   SPEED_UP : 2
								}); 
				 
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

var FPS = 60 ; 

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
