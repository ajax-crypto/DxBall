
var ctx = document.getElementById('canvas').getContext('2d');
var WIDTH = 640;
var HEIGHT = 480;
var rightDown = false;
var leftDown = false;
var bricks;
var gameLoop ; 
var run = true ; 
var state = true ; 
var points = 1 ; 

var PADDLE_IMAGE_PATH = "img/paddle.png" ; 
var SPLASH_SCREEN_PATH = "img/splash.png" ; 

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
								   "SPEED_UP" : 4
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

var FPS = 100 ; 