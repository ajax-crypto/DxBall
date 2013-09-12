var NROWS = 8;
var NCOLS = 8;	

var MAX_LEVELS = 6 ;

var levels = new Array(MAX_LEVELS); 
	
var brickMatrix = new Array(NROWS); 
for(var i=0; i<NROWS-1; ++i)
	brickMatrix[i] = [false, false, false, false, false, false, false, false]; 
brickMatrix[NROWS-1] = [false, true, true, true, true, true, true, true]; 

levels[0] = brickMatrix ; 

for(var i=0; i<NROWS-1; ++i)
	brickMatrix[i] = [false, true, false, true, false, true, false, true ]; 
brickMatrix[NROWS-1] = [true, true, true, false, false, false, false, true ];

levels[1] = brickMatrix ;  