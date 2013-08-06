/** 
 * Function: assert
 * ----------------
 * custom assertion function
 */ 


function assert(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}


/**
 * Function: isSquare
 * ------------------
 * takes a number as input and returns true if the number is a perfect square, 
 * false otherwise
 */ 

function isSquare(integer){
    root = Math.sqrt(integer)
    if (Math.pow(parseInt(root + 0.5),2) == integer){ return true;} 
    else {return false;}
}


/**
 * Implementation note
 * -------------------
 * creates the board for a tic tac toe game
 */ 

function createTTTBoard(){

	var board = "<table class='tttBoard' id='tictactoe'><tr><td id='00' style='border-right:1px solid; border-bottom:1px solid;'>&nbsp</td><td id='01' style='border-right:1px solid; border-bottom:1px solid;'>&nbsp</td><td id='02' style='border-bottom:1px solid'>&nbsp</td></tr><tr><td id='10' style='border-right:1px solid; border-bottom:1px solid;'>&nbsp</td><td id='11' style='border-right:1px solid; border-bottom:1px solid;'>&nbsp</td><td id='12' style='border-bottom:1px solid;'>&nbsp</td></tr><tr><td id='20' style='border-right:1px solid'>&nbsp</td>			<td id='21' style='border-right:1px solid'>&nbsp</td><td id='22' >&nbsp</td></tr></table>"
	
	return board; 
}



/** 
 * Function: mkcols
 * ---------------_
 * mkcols takes an array as input and returns an array of arrays. 
 * we're using an array to represent our board. mkcols takes that 
 * array and returns the columns of the board
 * 
 * @param1: 		an array that is assumed to be a square
 * return value:	an array of arrays representing the columns
 */ 
 
function mkcols(board){ 
	assert(isSquare(board.length), "Board was not a perfect square"); 
	var sideLen = Math.sqrt(board.length); 
	
	var i;
	var cols = new Array(); 
	for(i = 0; i < sideLen; i++){
		var col = board.filter(function(item,index,array){ return i == index%sideLen; }); 
		cols.push(col); 
	}
	return cols
}


/** 
 * Function: mkrows
 * ----------------
 * mkrows takes an array as input and returns an array of arrays 
 * representing the rows. 
 *
 * @param1: 		an array that is assumed to be a square
 * return value: 	an array of arrays representing the rows
 */ 
 
 function mkrows(board){ 
	assert(isSquare(board.length), "Board was not a perfect square"); 
	var sideLen = Math.sqrt(board.length);
	
	var i;
	var rows = new Array(); 
	for(i = 0; i < sideLen; i++){
		var row = board.slice(i*sideLen, i*sideLen+sideLen); 
		rows.push(row); 
	}
	return rows; 
}
 
/** 
 * Function: mkdiags
 * -----------------
 * mkdiags takes an array as input and returns an array of arrays 
 * representing the diagonals.
 *
 * @param1: 		an array that is assumed to be a square
 * return value: 	an array of arrays representing the diagonals
 */
 
 function mkdiags(board){ 
	assert(isSquare(board.length), "Board was not a perfect square"); 
	var sideLen = Math.sqrt(board.length);
	
	var i;
	var diags = new Array(); 
	var diag1 = new Array(); 
	var diag2 = new Array(); 
	for(i = 0; i < sideLen; i++){
		diag1.push(board[i*sideLen + i]); 
		diag2.push(board[(i+1)*sideLen - 1 - i]); 
		
	}
	diags.push(diag1,diag2); 
	return diags; 
}

 

/**
 * Function: createC4Board
 * -----------------------
 * createC4Board creates the board for a game of connect four. 
 */ 


function createC4Board(){ 


	var board = '<table class="tttBoard" id="tictactoe"><tr class="topRow"><td id="00">&nbsp</td><td id="01">&nbsp</td><td id="02">&nbsp</td><td id="03">&nbsp</td></tr><tr class="bottomRow"><td id="10">&nbsp</td><td id="11">&nbsp</td><td id="12">&nbsp</td><td id="13">&nbsp</td></tr><tr class="bottomRow"><td id="20">&nbsp</td><td id="21">&nbsp</td><td id="22">&nbsp</td><td id="23">&nbsp</td></tr><tr class="bottomRow"><td id="30">&nbsp</td><td id="31">&nbsp</td><td id="32">&nbsp</td><td id="33">&nbsp</td></tr></table>'
	
	return board; 
}

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
		
		
		if(gameSelected == "ticTacToe" && board.isEmpty()) { 
			this._bestmove = 4; 
			return; 
		}
		
		if(gameSelected == "ticTacToe" && board.isCenterOnly()){ 
			this._bestmove = 0; 
			return; 
		}
		
		var movelist = playboard.successors(); 
		
		if(depth == 0) {console.log("movelist = " + movelist); }
		
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
		
		if(depth == 0 ){ console.log("betaVal = " + betaValList); } 
		
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
	
	for (var i = 0; i < this.size; i++){ 
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
	for (var i = 0; i < this.size; i++) {
		if (this._board[i] == this.NONE) { 
			successorLst.push(i); 
		}
	}
	return successorLst; 
};
	
Board.prototype.full = function() { 
	for (var i =0; i < this.size; i++){ 
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
	for (var i = 0; i < this.size; i++){ 
		str += this._board[i]; 
		if((i+1) % Math.sqrt(this.size) == 0){
			str += "\n"; 
		}
	} 
	return str; 
}

/** 
 * Constructor for BoardC4
 * -----------------------
 */ 

function BoardC4(){ 
	this.NONE = 0; 
	this.X = 1; 
	this.O = 2; 
		
	this._board = new Array(); 
	
	this.size = 16; 
	
	for (var i = 0; i < 16; i++){ 
		this._board.push(this.NONE); 
	}
}

BoardC4.prototype.copy = function(){
	var clone = new Board();  
	clone._board = this._board.concat(); 
	return clone; 
}; 
			
BoardC4.prototype.move = function(playerID, pos){ 
	this._board[pos] = playerID; 
}; 
	
BoardC4.prototype.successors = function(){
		
	var successorLst = new Array(); 
	for (var i = 0; i < 16; i++) {
		//there has to be a token beneath the cell
		if (i+4 < this.size && this._board[i+4] != this.NONE && this._board[i] == this.NONE) { 
			successorLst.push(i); 
		}
		if (i >= 12 && this._board[i] == this.NONE) { 
			successorLst.push(i); 
		}
	}
	return successorLst; 
};
	
BoardC4.prototype.full = function() { 
	for (var i =0; i < 16; i++){ 
		if (this._board[i] == this.NONE){
			return false; 
		}
	}
	return true; 
};

BoardC4.prototype._check = function(a,b,c,d){
	if(this._board[a] == this._board[b] && 
	   this._board[a] == this._board[c] && 
	   this._board[a] == this._board[d] && 
	   this._board[a] != this.NONE) { 
		return this._board[a]; 
	}
	return this.NONE; 
};
	
BoardC4.prototype.getWinner = function(){
	var winner = this._check(0,1,2,3); 
	if (winner != this.NONE) {
		return winner; 
	}
	winner = this._check(4,5,6,7);
	if (winner != this.NONE) {
		return winner; 
	}
	winner = this._check(8,9,10,11);
	if (winner != this.NONE) {
		return winner; 
	}
	winner = this._check(12,13,14,15); 
	if (winner != this.NONE) {
		return winner; 
	}
	winner = this._check(0,4,8,12);
	if (winner != this.NONE) {
		return winner; 
	}
	winner = this._check(1,5,9,13);
	if (winner != this.NONE) {
		return winner; 
	}
	winner = this._check(2,6,10,14);
	if (winner != this.NONE) {
		return winner; 
	}
	winner = this._check(3,7,11,15);
	if (winner != this.NONE) {
		return winner; 
	}
	winner = this._check(3,7,11,15);
	if (winner != this.NONE) {
		return winner; 
	}
	winner = this._check(0,5,10,15);
	if (winner != this.NONE) {
		return winner; 
	}
	winner = this._check(3,6,9,12);
	if (winner != this.NONE) {
		return winner; 
	}
	return this.NONE; 
}
		
	
BoardC4.prototype.toStr = function(){
	var str = ""
	for (var i = 0; i < this.size; i++){ 
		str += this._board[i]; 
		if((i+1) % Math.sqrt(this.size) == 0){
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


function cellID2index_ttt(cellID){ 
	console.log("cellID2index called with " + cellID); 
	var id2index = {"00":0,"01":1,"02":2,"10":3,"11":4,"12":5,"20":6,"21":7,"22":8}; 
	return id2index[cellID]; 
}

function index2CellID_ttt(index){ 
	var index2id = {0:"00",1:"01",2:"02",3:"10",4:"11",5:"12",6:"20",7:"21",8:"22"}; 
	return index2id[index]; 
}

function cellID2index_C4(cellID){ 
	console.log("cellID2index called with " + cellID); 
	var id2index = {"00":0,"01":1,"02":2,"03":3,"10":4,"11":5,"12":6,"13":7,"20":8,"21":9,"22":10,"23":11,"30":12,"31":13,"32":14,"33":15}; 
	return id2index[cellID]; 
}

function index2CellID_C4(index){ 
	var index2id = {0:"00",1:"01",2:"02",3:"03",4:"10",5:"11",6:"12",7:"13",8:"20",9:"21",10:"22",11:"23",12:"30",13:"31",14:"32",15:"33"}; 
	return index2id[index]; 
}


function playerIcon(numberID){ 
	var playerIcon = {1:"X", 2:"O"}; 
	return playerIcon[numberID]; 
}

function playTurn(){ 
		
	var cellID2index = cellID2index_ttt; 
	var index2CellID  = index2CellID_ttt;  	
	
	if(gameSelected == "connectFour") { 
		var cellID2index = cellID2index_C4;  	
		var index2CellID = index2CellID_C4; 
	} 	
	
	if(activePlayer == null){ 
		activePlayer = 1; 
	}
	var selectedCell;
	if(activePlayer == 1){ 
		
		//human turn
		selectedCell = this.id;
		var res = cellID2index(selectedCell); 
		board.move(activePlayer, cellID2index(selectedCell)); 
		console.log("board to computer \n" + board.toStr());
		this.firstChild.nodeValue = playerIcon(activePlayer); 
	
		//computer turn, switch players
		activePlayer = nextPlayer(activePlayer); 
		console.log("active player (should be computer) = ", activePlayer); 
		console.log("board to computer \n" + board.toStr());
		move = mm.buildtree(board, activePlayer);	
		console.log("computer move: " + move); 
		board.move(activePlayer,move);
		console.log(board.toStr()); 
		
		var secondSelectedCell = document.getElementById(index2CellID(move)); 
		secondSelectedCell.firstChild.nodeValue = playerIcon(activePlayer);
		
		//set back to the human 
		activePlayer = nextPlayer(activePlayer); 
	}
	
}

function computerOpens(){
	
	var cellID2index = cellID2index_ttt; 
	var index2CellID  = index2CellID_ttt;  	
	
	if(gameSelected == "connectFour") { 
		var cellID2index = cellID2index_C4;  	
		var index2CellID = index2CellID_C4; 
	}

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


/**
 * Note: 
 * -----
 * we'll have to get the board type as the first action and then build out the board
 * we'll also have to modify the board to be a tic tac toe board or a connect4 board
 */ 

 /** 
  * Main routine starts here
  * ------------------------
  * 
  */ 
  
var testing = true; 

if(testing){
	gameSelected = "connectFour"; 
}
 
  

if(!testing && gameSelected == "ticTacToe"){
	var cssLink = document.getElementById("cssLink"); 
	cssLink.href = "F:/Tictactoe/mainttt.css"; 
	var boardContainer = document.getElementById("boardContainer"); 
	boardContainer.innerHTML = createTTTBoard(); 
	board = new Board(); 

}


if(!testing && gameSelected == "connectFour"){ 
	var cssLink = document.getElementById("cssLink"); 
	cssLink.href = "F:/Tictactoe/mainC4.css"; 
	var boardContainer = document.getElementById("boardContainer"); 
	boardContainer.innerHTML = createC4Board();
	board = new BoardC4(); 
}
  
activePlayer = null; 

if(testing){ 
	board = new BoardC4(); 
}

mm = new MinMax(6, board); 



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
if(!testing){ 
	cells.map(function(item,index,array){item.addEventListener("click", reportID, false);}); 
	cells.map(function(item,index,array){item.addEventListener("click", playTurn, false);}); 
	cells.map(function(item,index,array){item.firstChild.nodeValue = '\u00A0\u00A0';}); 
	var mainTitle = document.getElementById("mainTitle"); 
	mainTitle.addEventListener("click",computerOpens, false); 
}



var playing = true; 
activePlayer = 1; 

var move; 
var winner; 
while(testing && playing && false){ 
	
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
	
console.log(board.toStr()); 

board.move(1,13); 
board.move(1,9);
board.move(1,5); 
board.move(2,14); 
board.move(2,10); 
board.move(2,6);

console.log("winner  = " + board.getWinner());  
console.log(board.toStr()); 
var testMove = mm.buildtree(board,2); 
console.log(board.successors()); 
console.log("testmove = " + testMove);  
	
	