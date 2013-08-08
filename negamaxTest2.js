


board._board[12] = 1; 
board._board[14] = 1; 
board._board[15] = 1; 
board._board[10] = 2; 
board._board[11] = 2; 
board._board[6] = 2; 

console.log(board.toStr()); 

move = mm.buildtree(board, 2)

console.log("move = " + move); 
