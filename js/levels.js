var NROWS = 8;
var NCOLS = 8;	

var MAX_LEVELS = 6 ;

var levels = new Array(MAX_LEVELS); 

levels[0] = [ [false, false, false, false, false, false, false, false], 
			  [false, false, false, false, false, false, false, false],
			  [false, false, false, false, false, false, false, false],
			  [false, false, false, false, false, false, false, false],
			  [false, false, false, false, false, false, false, false],
			  [false, false, false, false, false, false, false, false],
			  [false, false, false, false, false, false, false, false],
			  [false, true, true, true, true, true, true, true] ];  

levels[1] = [ [false, true, false, true, false, true, false, true ],
              [false, true, false, true, false, true, false, true ],
              [false, true, false, true, false, true, false, true ],
              [false, true, false, true, false, true, false, true ],
              [true, true, true, false, false, false, false, true ],
              [true, true, true, false, false, false, false, true ],
              [false, false, false, false, false, false, false, false],
              [false, false, false, false, false, false, false, false] ]; 
              
levels[2] = [ [true, true, true, true, true, true, true, true], 
			  [true, false, false, false, false, false, false, true],
			  [true, false, false, false, false, false, false, true],
			  [true, false, false, true, true, false, false, true], 
			  [true, false, false, true, true, false, false, true], 
			  [true, false, false, false, false, false, false, true],
			  [true, false, false, false, false, false, false, true],
			  [true, true, true, true, true, true, true, true] ]; 
