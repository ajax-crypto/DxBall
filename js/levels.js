var NROWS = 8;
var NCOLS = 8;	

var MAX_LEVELS = 6 ;

var levels = new Array(MAX_LEVELS); 
var brick_type = new Array(MAX_LEVELS); 

levels[0] = [ [false, false, false, false, false, false, false, false], 
			  [false, false, false, false, false, false, false, false],
			  [false, false, false, false, false, false, false, false],
			  [false, false, false, false, false, false, false, false],
			  [false, false, false, false, false, false, false, false],
			  [false, false, false, false, false, false, false, false],
			  [false, false, false, false, false, false, false, false],
			  [false, true, true, true, true, true, true, true] ];  

brick_type[0] = [ [Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK],
				  [Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK],
				  [Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK],
				  [Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK],
				  [Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK],
				  [Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK],
				  [Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK],
				  [Colors.BLACK, Colors.AQUA, Colors.MAROON, Colors.GOLD, Colors.GOLD, Colors.FORESTGREEN, Colors.WHITE, Colors.RED] ]; 

levels[2] = [ [false, true, false, true, false, true, false, true ],
              [false, true, false, true, false, true, false, true ],
              [false, true, false, true, false, true, false, true ],
              [false, true, false, true, false, true, false, true ],
              [true, true, true, false, false, false, false, true ],
              [true, true, true, false, false, false, false, true ],
              [false, false, false, false, false, false, false, false],
              [false, false, false, false, false, false, false, false] ]; 
              
brick_type[1] = [ [Colors.GOLD, Colors.GOLD, Colors.GOLD, Colors.GOLD, Colors.GOLD, Colors.GOLD, Colors.GOLD, Colors.GOLD],
				  [Colors.GOLD, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.GOLD],
				  [Colors.GOLD, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.GOLD],
				  [Colors.GOLD, Colors.BLACK, Colors.BLACK, Colors.FORESTGREEN, Colors.WHITE, Colors.BLACK, Colors.BLACK, Colors.GOLD],
				  [Colors.GOLD, Colors.BLACK, Colors.BLACK, Colors.FORESTGREEN, Colors.WHITE, Colors.BLACK, Colors.BLACK, Colors.GOLD],
				  [Colors.GOLD, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.GOLD],
				  [Colors.GOLD, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.BLACK, Colors.GOLD],
				  [Colors.GOLD, Colors.AQUA, Colors.MAROON, Colors.RED, Colors.RED, Colors.MAROON, Colors.AQUA, Colors.GOLD] ]; 
              
levels[1] = [ [true, true, true, true, true, true, true, true], 
			  [true, false, false, false, false, false, false, true],
			  [true, false, false, false, false, false, false, true],
			  [true, false, false, true, true, false, false, true], 
			  [true, false, false, true, true, false, false, true], 
			  [true, false, false, false, false, false, false, true],
			  [true, false, false, false, false, false, false, true],
			  [true, true, true, true, true, true, true, true] ]; 
