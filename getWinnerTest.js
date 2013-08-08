
function zeroArr(arr){
	for(i = 0; i < arr._board.length; i++){
		arr._board[i] = 0;	
	}
}




board = new BoardC4(); 

board._board[0] = 1; 
board._board[1] = 1; 
board._board[2] = 1; 
board._board[3] = 1; 
console.log(board.toStr()); 
console.log("row 0 =" + board.getWinner()); 

zeroArr(board); 
board._board[4] = 1; 
board._board[5] = 1; 
board._board[6] = 1; 
board._board[7] = 1; 
console.log(board.toStr()); 
console.log("row 1 =" + board.getWinner()); 

zeroArr(board); 
board._board[8] = 1; 
board._board[9] = 1; 
board._board[10] = 1; 
board._board[11] = 1; 
console.log(board.toStr()); 
console.log("row 2 =" + board.getWinner()); 

zeroArr(board); 
board._board[12] = 1; 
board._board[13] = 1; 
board._board[14] = 1; 
board._board[15] = 1; 
console.log(board.toStr()); 
console.log("row 3 =" +board.getWinner()); 

zeroArr(board); 
board._board[0] = 1; 
board._board[4] = 1; 
board._board[8] = 1; 
board._board[12] = 1; 
console.log(board.toStr()); 
console.log("col 0 =" +board.getWinner()); 

zeroArr(board); 
board._board[1] = 1; 
board._board[5] = 1; 
board._board[9] = 1; 
board._board[13] = 1; 
console.log(board.toStr()); 
console.log("col 1 =" +board.getWinner()); 

zeroArr(board); 
board._board[2] = 1; 
board._board[6] = 1; 
board._board[10] = 1; 
board._board[14] = 1; 
console.log(board.toStr()); 
console.log("col 2 = " + board.getWinner()); 

zeroArr(board); 
board._board[2] = 1; 
board._board[6] = 1; 
board._board[10] = 1; 
board._board[14] = 1; 
console.log(board.toStr()); 
console.log("col 3 =" + board.getWinner()); 


zeroArr(board); 
board._board[3] = 1; 
board._board[7] = 1; 
board._board[11] = 1; 
board._board[15] = 1; 
console.log(board.toStr()); 
console.log("col 3 =" + board.getWinner()); 


zeroArr(board); 
board._board[3] = 1; 
board._board[6] = 1; 
board._board[9] = 1; 
board._board[12] = 1; 
console.log(board.toStr()); 
console.log("col 3 =" + board.getWinner()); 

zeroArr(board); 
board._board[0] = 1; 
board._board[5] = 1; 
board._board[10] = 1; 
board._board[15] = 1; 
console.log(board.toStr()); 
console.log("diag 1 =" + board.getWinner()); 


zeroArr(board); 
board._board[3] = 1; 
board._board[6] = 1; 
board._board[9] = 1; 
board._board[12] = 1; 
console.log(board.toStr()); 
console.log("diag 2 =" + board.getWinner()); 

zeroArr(board); 
console.log(board.toStr()); 
console.log("empty = " + board.getWinner()); 

console.log(board.toStr()); 
console.log("isFull? = " + board.full()); 
var i; 
for(i = 0; i < 16; i++){
	board._board[i] = 1; 
}
console.log(board.toStr());
console.log("isFull? = " + board.full()); 
