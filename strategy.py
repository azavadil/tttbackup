
def Q_pig(state,action,Pwin):
    """the expected value of choosing action in state"""
    return 1 - Pwin(play(state))
    
def pig_actions(state):
    """the legal actions from a state"""
	
	## this needs to be any open square on the board
    _,_,_, pending = state
    return ['roll','hold'] if pending else ['roll']

##@memo
def Pwin(state):
	if checkWinner(state[0]) != None:
        return 1
    else:
        return max(Q_ttt(state, action, Pwin) for action in tttActions(state))
				   
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
		if all(map(lambda x: x!=0 and x==row[0], row)): 
			return row[0] 
	
	## check cols
	for col in cols: 
		if all(map(lambda x: x!=0 and x==col[0], col)):  
			return col[0] 
	
	## check diagonals
	for diag in diagonals:
		if all(map(lambda x: x!=0 and x==diag[0], diag)): 
			return diag[0]
			
			