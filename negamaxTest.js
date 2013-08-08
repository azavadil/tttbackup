

var playing = true; 

var move; 
var winner; 
var activePlayer = 1; 

while(playing){ 
	
	console.log("initial board = \n" + board.toStr()); 
	move = mm.buildtree(board, activePlayer);
	if(move == -1){ 
		break;
	}
	console.log("move = " + move); 
	board.move(activePlayer, move); 
	winner = board.getWinner(); 
	if(winner != 0){ 
		console.log("winner = " + winner);
		playing = false; 
		break; 
	}
	
	activePlayer = nextPlayer(activePlayer); 
	
}
	
