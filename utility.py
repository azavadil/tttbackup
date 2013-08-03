import math

million = 1000000

def Q_ttt(state, action, U):
    """the expected value of taking action in state
	
	   @param1: 	a state
	   @param2: 	an action
	   @param3:		utility function
	   return val: 	the utility of the action in the state
	"""
    if action == '11':
		Pwin(makeMove
    if action == '12':
        return U(state) 
	if action == '13':
        return U(state) 
	if action == '22':
        return U(state )
	if action == '22':
        return U(state) 
	if action == '23':
        return U(state) 
	if action == '31':
        return U(state) 
	if action == '32':
        return U(state) 
	if action == '33':
        return U(state) 
		
def Q_ttt(state,move,Pwin):
    """the expected value of choosing action in state"""
    Pwin(makeMove(state,move))
    
def Pwin(state):

    if checkWinner(state[0]) != None:
        return 1
    else:
        return max(Q_ttt(state, action, Pwin) for action in tttActions(state))

		
def tttActions(state):
	
	board,player = state
	indices = range(len(board))
	res = []
	for row in indices: 
		for col in indices: 
			if board[row][col] == '_': 
				res.append((row,col))
			

def identity(x): return x

oldU = identity
U = math.log10

def best_action(state, actions, Q, U):
    """return the optimal action for state, given U"""
    def ExpectedUtility(action): return Q(state, action,U)
    return max(actions(state), key=ExpectedUtility)


def test():

    for i in range(1,10):
        print i, best_action(i*million,actions,Q,U)
        
