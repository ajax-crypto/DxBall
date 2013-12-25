﻿var gamedata = new Array(DxBall.MAX_LEVELS);

var gifts = [ { type : 3, row : 7, col : 7 },
	      { type : 1, row : 3, col : 4 },
	      { type : 2, row : 0, col : 0 },
	      { type : 1, row : 7, col : 7 },
	      { type : 3, row : 3, col : 4 },
	      { type : 2, row : 4, col : 3 } ] ; 

gamedata[0] = [ [0, 0, 0, 0, 0, 0, 0, 0 ],
		[0, 0, 0, 0, 0, 0, 0, 0 ],
		[0, 0, 0, 0, 0, 0, 0, 0 ],
		[0, 0, 0, 0, 0, 0, 0, 0 ],
		[0, 0, 0, 0, 0, 0, 0, 0 ],
		[0, 0, 0, 0, 0, 0, 0, 0 ],
		[0, 0, 0, 0, 0, 0, 0, 0 ],
		[0, 1, 2, 3, 3, 4, 5, 6 ] ] ;

gamedata[1] = [ [3, 3, 3, 3, 3, 3, 3, 3 ],
		[3, 0, 0, 0, 0, 0, 0, 3 ],
		[3, 0, 0, 0, 0, 0, 0, 3 ],
		[3, 0, 0, 4, 5, 0, 0, 3 ],
		[3, 0, 0, 4, 5, 0, 0, 3 ],
		[3, 0, 0, 0, 0, 0, 0, 3 ],
		[3, 0, 0, 0, 0, 0, 0, 3 ],
		[3, 3, 3, 3, 3, 3, 3, 3 ] ];
		
gamedata[2] = [ [3, 1, 0, 0, 0, 0, 1, 3 ],
		[3, 3, 0, 0, 0, 0, 3, 3 ],
		[0, 0, 6, 5, 5, 6, 0, 0 ],
		[0, 0, 6, 4, 4, 6, 0, 0 ],
		[0, 0, 6, 5, 5, 6, 0, 0 ],
		[3, 3, 0, 0, 0, 0, 3, 3 ],
		[3, 1, 0, 0, 0, 0, 1, 3 ],
		[0, 0, 0, 0, 0, 0, 0, 0 ] ]; 
		
gamedata[3] = [ [2, 1, 2, 3, 3, 2, 1, 2 ],
		[1, 2, 3, 3, 3, 3, 2, 1],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 0, 0, 0, 0, 1, 1],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[1, 0, 0, 4, 5, 0, 0, 1],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 6, 2, 6, 2, 6, 2, 0] ]; 
		
gamedata[4] = [ [3, 0, 0, 0, 0, 0, 0, 3],
		[0, 1, 0, 0, 0, 0, 1, 0],
		[0, 0, 2, 0, 0, 2, 0, 0],
		[0, 0, 0, 4, 4, 0, 0, 0],
		[0, 0, 0, 5, 5, 0, 0, 0],
		[0, 0, 2, 0, 0, 2, 0, 0],
		[0, 1, 0, 0, 0, 0, 1, 0],
		[3, 0, 0, 0, 0, 0, 0, 3] ];
		
gamedata[5] = [ [0, 0, 0, 3, 3, 0, 0, 0],
        [0, 0, 4, 0, 0, 4, 0, 0],
        [0, 5, 0, 0, 0, 0, 5, 0],
        [2, 0, 0, 1, 1, 0, 0, 2],
        [2, 0, 0, 6, 6, 0, 0, 2],
        [0, 5, 0, 0, 0, 0, 5, 0],
        [0, 0, 4, 0, 0, 4, 0, 0],
        [0, 0, 0, 3, 3, 0, 0, 0] ];		
