from copy import deepcopy
from collections import namedtuple
from functools import update_wrapper

def decorator(d):
    "Make function d a decorator: d wraps a function fn."
    def _d(fn):
        return update_wrapper(d(fn), fn)
    update_wrapper(_d, d)
    return _d

@decorator
def memo(f):
    """Decorator that caches the return value for each call to f(args).
    Then when called again with same args, we can just look it up."""
    cache = {}
    def _f(*args):
        try:
            return cache[args]
        except KeyError:
            cache[args] = result = f(*args)
            return result
        except TypeError:
            # some element of args can't be a dict key
            return f(*args)
    _f.cache = cache
    return _f

def checkWinner(board): 
	"""takes as input a board and returns	
	   the winner
	"""
	
	boardLen = len(board)
	indices = range(boardLen)
	  
	def mkcol(board, col): return [row[col] for row in board] 
	
	cols = [mkcol(board, i) for i in indices] 
	
	diagonals = [[board[i][i] for i in indices], [board[i][boardLen-1-i] for i in indices]]
	
	
	## check rows
	for row in board: 
		if all(map(lambda x: x!='_' and x==row[0], row)): 
			return row[0] 
	
	## check cols
	for col in cols: 
		if all(map(lambda x: x!='_' and x==col[0], col)):  
			return col[0] 
	
	## check diagonals
	for diag in diagonals:
		if all(map(lambda x: x!='_' and x==diag[0], diag)): 
			return diag[0]


def makeMove(state, move): 
	"""
		makeMove takes a state consisting of a board and a move and
		returns the updated state. 
		
		@param1: 	state is a tuple consisting of the board and 
					the player who's turn it is to move 
		@param2: 	the board position the player is making
	"""
	
	
	playerID = {0:"X",1:"O"}
	other = {0:1,1:0}
	
	board, me, opponent = state
	row, col = move
	copy = deepcopy(board)
	copy[row][col] = playerID[me]
	
	return (copy, opponent, me) 
	

	
def isBoardFull(board): 
	boardLen = len(board)
	indices = range(boardLen)
	
	isFull = True
	for r in indices: 
		for c in indices: 
			if board[r][c] == '_': 
				isFull = False
	return isFull

def best_action(state, actions, Quality, Utility): 
	def ExpectedUtility(action): return Quality(state, action, Utility)
	return max(actions_ttt(state), key = ExpectedUtility)
	
def actions_ttt(state):
	
	board,_,_ = state
	indices = range(len(board))
	res = []
	for row in indices: 
		for col in indices: 
			if board[row][col] == '_': 
				res.append((row,col))
	return res

@memo
def Pwin(state):
	""" probability of a player winning from the current state"""
	playerID = {0:"X",1:"O"}	
	other = {0:1,1:0}
	
	board, me, opponent = state
	
	if playerID[me] == checkWinner(board):
		return 1
	elif playerID[opponent] == checkWinner(board): 
		return 0
	elif isBoardFull(board): 
		return 0.5
	else:
		return max(Quality_ttt(state, action, Pwin) for action in actions_ttt(state))
	
def Quality_ttt(state, action, Pwin):
	"""the expected value of taking action in a state
	
	   @param1: 	a state
	   @param2: 	an action
	   return val: 	the utility of the action in the state
	"""
	## probability that current player wins based on the action
	playerID = {0:"X",1:"O"} 
	board, me, you = state
	
	
	newState = makeMove(state, action)
	
	if playerID[me] == checkWinner(newState[0]): 
		return 1
	else: 
		return 1-Pwin(newState)
				
def playGame(A,B): 
	"""	
		playTTT
		-manage state
		-call strategy => action 
		-do action => state
	"""
	
	board = [list('___'),list('___'),list('___')]
	state = (board, 0,1)
	
	no_winner = True
	
	while True:
		isFull = isBoardFull(state[0])
		hasWinner = checkWinner(state[0])
		
		if hasWinner != None: 
			return hasWinner
		elif isFull: 
			return "Tie" 
		else: 
			if state[1] == 0: 
				row = int(raw_input())
				col = int(raw_input())
				move = (row,col)
			else: 
				move = best_action(state, actions_ttt, Quality_ttt, Pwin)
			state = makeMove(state, move)
			print(state[1])
			for r in state[0]: 
				print(r)
			print(' ')
			

		