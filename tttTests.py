from playTTT import checkWinner
from playTTT import isBoardFull
from playTTT import makeMove
from playTTT import playGame
from playTTT import Pwin
from playTTT import actions_ttt
from playTTT import best_action
from playTTT import Quality_ttt

def test1(): 
	a = list('xxx')
	board = [a, [0,0,0],[0,0,0]]
	print(checkWinner(board))
	
	
	b = list('xyx')
	c = list('yyx') 
	d = [0,'y',0]
	print(checkWinner([b,c,d]))

	e = ['x', 0,0]
	f = [0,'x',0]
	g = [0,0,'x']
	print(checkWinner([e,f,g]))
	
	h = [0,0,'x']
	i = [0,'x',0]
	j = ['x',0,0]
	print(checkWinner([h,i,j]))

def test2(): 
	
	a = list('xxx')
	b = list('ooo')
	c = list('xxx')
	d = [0,0,0]
	e = list('ab') + [0]
	
	
	b1 = [a,b,c]
	b2 = [a,b,d]
	b3 = [a,b,e]
	
	print(isBoardFull(b1), isBoardFull(b2), isBoardFull(b3))

def test3(): 
	h = list('__x')
	i = list('_x_')
	j = list('x__')
	
	b = [h,i,j] 
		
	s = (b,0)
	s2 = (b,1)
	mv = (0,0)
	
	
	print(playGame(0,0))
	
	
def test4():
	h = list('__x')
	i = list('_x_')
	j = list('___')
	
	b = [h,i,j] 
	
	print(Pwin((b,0)))

def test5(): 
	h = list('OX_')
	i = list('XX_')
	j = list('_O_')
	
	h1 = list('OXO')
	i1 = list('XX_')
	j1 = list('_O_')
	
	h2 = list('OX_')
	i2 = list('XXO')
	j2 = list('_O_')
	
	h3 = list('OX_')
	i3 = list('XX_')
	j3 = list('_OO')
	
	h4 = list('OX_')
	i4 = list('XX_')
	j4 = list('OO_')
	
	
	b = [h,i,j] 
	b1 = [h1,i1,j1]
	b2 = [h2,i2,j2]
	b3 = [h3,i3,j3]
	b4 = [h4,i4,j4]
	
	
	## computer saying O can win
	h5 = list('OX_')
	i5 = list('XXO')
	j5 = list('XO_')
	b5 = [h5,i5,j5]
	
	h6 = list('OXO')
	i6 = list('XXO')
	j6 = list('XO_')
	b6 = [h6,i6,j6]
	
	h7 = list('OX_')
	i7 = list('XXO')
	j7 = list('XOO')
	b7 = [h7,i7,j7]
	
	h8 = list('_O_')
	i8 = list('_X_')
	j8 = list('___')
	b8 = [h8,i8,j8]
	
	
	
	## it's O's turn
	state = (b8,0,1)
	
	
	print(Pwin(state))
	
	
def test():
	playGame(0,0)
test()