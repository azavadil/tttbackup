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
	
	this.size = 9; 
	
	for (var i = 0; i < 9; i++){ 
		this._board.push(this.NONE); 
	}
}

Board.prototype.copy = function(){
	var clone = new Board();  
	clone._board = this._board.concat(); 
	return clone; 
}; 
			
Board.prototype.move = function(playerID, pos){ 
	this._board[pos] = playerID; 
}; 
	
Board.prototype.successors = function(){
		
	var successorLst = new Array(); 
	for (var i = 0; i < 9; i++) {
		if (this._board[i] == this.NONE) { 
			successorLst.push(i); 
		}
	}
	return successorLst; 
};
	
Board.prototype.full = function() { 
	for (var i =0; i < 9; i++){ 
		if (this._board[i] == this.NONE){
			return false; 
		}
	}
	return true; 
};

Board.prototype._check = function(a,b,c){
	if(this._board[a] == this._board[b] && 
	   this._board[a] == this._board[c] && 
	   this._board[a] != this.NONE) { 
	   
	   return this._board[a]; 
	}
	return this.NONE; 
};
	
Board.prototype.getWinner = function(){
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
	
Board.prototype.isEmpty = function(){ 
	for (var i = 0; i < this._board.length; i++){
		if (this._board[i] != this.NONE) { 
			return false; 
		}
	} 
	return true; 
}
	
Board.prototype.isCenterOnly = function(){
	var center; 
	for (var i = 0; i < this._board.length; i++) {
		if(this._board[i] != this.NONE && i != 4){ 
			center = false; 
		}
	}
	return center != this.NONE; 
}
	
	
Board.prototype.toStr = function(){
	var str = ""
	for (var i = 0; i < 9; i++){ 
		str += this._board[i]; 
		if(i==2 || i == 5){
			str += "\n"; 
		}
	} 
	return str; 
}


function reportID(){
	console.log(this.id); 
};

function nextPlayer(playerID){
	if(playerID == 1) return 2; 
	else return 1; 
}


function cellID2index(cellID){ 
	console.log("cellID2index called with " + cellID); 
	var id2index = {"00":0,"01":1,"02":2,"10":3,"11":4,"12":5,"20":6,"21":7,"22":8}; 
	return id2index[cellID]; 
}

function index2CellID(index){ 
	var index2id = {0:"00",1:"01",2:"02",3:"10",4:"11",5:"12",6:"20",7:"21",8:"22"}; 
	return index2id[index]; 
}

function playerIcon(numberID){ 
	var playerIcon = {1:"X", 2:"O"}; 
	return playerIcon[numberID]; 
}

function playTurn(){ 
		
	if(activePlayer == null){ 
		activePlayer = 1; 
	}
	var selectedCell;
	if(activePlayer == 1){ 
		
		//human turn
		selectedCell = this.id;
		var res = cellID2index(selectedCell); 
		board.move(activePlayer, cellID2index(selectedCell)); 
		this.firstChild.nodeValue = playerIcon(activePlayer); 
	
		//computer goes
		activePlayer = nextPlayer(activePlayer); 
		move = mm.buildtree(board, activePlayer);
	
		board.move(activePlayer,move);
		var secondSelectedCell = document.getElementById(index2CellID(move)); 
		secondSelectedCell.firstChild.nodeValue = playerIcon(activePlayer);
		
		//set back to the human 
		activePlayer = nextPlayer(activePlayer); 
	}
	
}


/**
 * Note: 
 * -----
 * we'll have to get the board type as the first action and then build out the board
 * we'll also have to modify the board to be a tic tac toe board or a connect4 board
 */ 

activePlayer = null; 
board = new Board(); 
mm = new MinMax(6, board); 

function computerOpens(){
	activePlayer = 2;
	var mainTitle = document.getElementById("mainTitle"); 
	mainTitle.removeEventListener("click", computerOpens, false); 
	
	//computer goes first
	move = mm.buildtree(board, activePlayer);
	board.move(activePlayer,move);
	var computerSelectedCell = document.getElementById(index2CellID(move)); 
	computerSelectedCell.firstChild.nodeValue = playerIcon(activePlayer);
	activePlayer = nextPlayer(activePlayer); 	
}


var sideLen = Math.sqrt(board.size); 

var cells = new Array(); 
var id; 

for (var i = 0; i < sideLen; i++){ 
	for(var j = 0; j< sideLen; j++) {
		id = String(i) + String(j);
		cells.push(document.getElementById(id)); 
	}
}

//add event listeners
cells.map(function(item,index,array){item.addEventListener("click", reportID, false);}); 
cells.map(function(item,index,array){item.addEventListener("click", playTurn, false);}); 
cells.map(function(item,index,array){item.firstChild.nodeValue = '\u00A0\u00A0';}); 
var mainTitle = document.getElementById("mainTitle"); 
mainTitle.addEventListener("click",computerOpens, false); 



var playing = true; 

var currentPlayer = 1; 

var count = 0; 

var test = "11"; 

console.log(cellID2index(test)); 

