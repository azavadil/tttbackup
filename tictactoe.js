function selectFrom(lowerValue, upperValue) {
	var choices = upperValue - lowerValue + 1;
	return Math.floor(Math.random() * choices + lowerValue);
}

function MinMax(maxdepth, initBoard){
	this._bestmove = -1; 
	this._maxdepth = maxdepth
	this._initBoard = initBoard; 
	
	this._buildtree_r = function(playboard, curplayer, depth) {  
		//recursively build the minmax tree
		
		if (depth > this._maxdepth) {
			return 0; 
		}
		
		var otherplayer; 
		if (curplayer == this._initBoard.X) { 
			otherplayer = this._initBoard.O; 
		} else { 
			otherplayer = this._initBoard.X; 
		}
		
		var winner = playboard.getWinner(); 
		
		if (winner === curplayer){
			return Number.POSITIVE_INFINITY; 
		} else if (winner === otherplayer){
			return Number.NEGATIVE_INFINITY; 
		} else if (playboard.full()){
			return 0; 
		}
		
		if(board.isEmpty()) { 
			this._bestmove = 4; 
			return; 
		}
		
		if(board.isCenterOnly()){ 
			this._bestmove = 0; 
			return; 
		}
		
		var movelist = playboard.successors(); 
		
		var alpha = Number.NEGATIVE_INFINITY; 
		
		var betaValList = new Array(); 
		
		var beta; 
		for (var i = 0; i < movelist.length; i++){
			board2 = playboard.copy(); 
			board2.move(curplayer, movelist[i]); 
			
			beta = -this._buildtree_r(board2,otherplayer, depth+1); 
			if (beta > alpha){ 
				alpha = beta; 
			}
			if(depth == 0){ 
				betaValList.push(beta); 
			}
		}
		
		if (depth == 0){ 
			var candidates = new Array(); 
			for (var j = 0; j < betaValList.length; j++){
				if (betaValList[j] == alpha){
					candidates.push(movelist[j]); 
				}
			}
			this._bestmove = candidates[selectFrom(0, candidates.length-1)];
		}
		return alpha; 
	}; 
	
	this.buildtree = function(board, curplayer){
		this._bestmove = -1; 
		var alp = this._buildtree_r(board, curplayer, 0); 
		return this._bestmove; 
	}
	
}

function Board(){ 
	this.NONE = 0; 
	this.X = 1; 
	this.O = 2; 
		
	this._board = new Array(); 
	
	for (var i = 0; i < 9; i++){ 
		this._board.push(this.NONE); 
	}
	
	this.copy = function(){
		var clone = new Board();  
		clone._board = this._board.concat(); 
		return clone; 
	}; 
			
	this.move = function(playerID, pos){ 
		this._board[pos] = playerID; 
	}; 
	
	this.successors = function(){
		
		var successorLst = new Array(); 
		for (var i = 0; i < 9; i++) {
			if (this._board[i] == this.NONE) { 
				successorLst.push(i); 
			}
		}
		return successorLst; 
	};
	
	this.full = function() { 
		for (var i =0; i < 9; i++){ 
			if (this._board[i] == this.NONE){
				return false; 
			}
		}
		return true; 
	};

	this._check = function(a,b,c){
		if(this._board[a] == this._board[b] && 
		   this._board[a] == this._board[c] && 
		   this._board[a] != this.NONE) { 
		   
		   return this._board[a]; 
		}
		return this.NONE; 
	};
	
	this.getWinner = function(){
		var winner = this._check(0,1,2); 
		if (winner != this.NONE) {
			return winner; 
		}
		winner = this._check(3,4,5);
		if (winner != this.NONE) {
			return winner; 
		}
		winner = this._check(6,7,8);
		if (winner != this.NONE) {
			return winner; 
		}
		winner = this._check(0,3,6); 
		if (winner != this.NONE) {
			return winner; 
		}
		winner = this._check(1,4,7);
		if (winner != this.NONE) {
			return winner; 
		}
		winner = this._check(2,5,8);
		if (winner != this.NONE) {
			return winner; 
		}
		winner = this._check(0,4,8);
		if (winner != this.NONE) {
			return winner; 
		}
		winner = this._check(2,4,6);
		if (winner != this.NONE) {
			return winner; 
		}
		return this.NONE; 
	}
	
	this.isEmpty = function(){ 
		for (var i = 0; i < this._board.length; i++){
			if (this._board[i] != this.NONE) { 
				return false; 
			}
		} 
		return true; 
	}
	
	this.isCenterOnly = function(){
		var center; 
		for (var i = 0; i < this._board.length; i++) {
			if(this._board[i] != this.NONE && i != 4){ 
				center = false; 
			}
		}
		return center != this.NONE; 
	}
	
	
	this.toStr = function(){
		var str = ""
		for (var i = 0; i < 9; i++){ 
			str += this._board[i]; 
			if(i==2 || i == 5){
				str += "\n"; 
			}
		} 
		return str; 
	}
}

board = new Board(); 
mm = new MinMax(6, board); 


var playing = true; 

var currentPlayer = 1; 

var count = 0; 

while(playing){ 

	
	if(board.full()){
		console.log("Tie game"); 
		break;
	}
	
	if(currentPlayer == 1){
		move = mm.buildtree(board, currentPlayer);
		console.log("current player = " + currentPlayer + ", move =" + move); 
	}
	
	if(currentPlayer == 2){
		move = mm.buildtree(board,currentPlayer); 
		console.log("current player = " + currentPlayer + ", move =" + move); 
	}
	
	if (move >= 0){
		board.move(currentPlayer, move); 
	
		winner = board.getWinner(); 
		
		if(winner == board.X){
			console.log("X wins"); 
			playing = false; 
		}
		else if(winner == board.O) { 
			console.log("Y wins");
			playing = false;
		}
	}
	if(currentPlayer == board.X){
		currentPlayer = board.O; 
	} else { 
		currentPlayer = board.X;
	}
	console.log(board.toStr()); 
	
}
	
		
		