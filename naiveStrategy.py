def naiveStrategy(board): 
	
	boardLen = len(board)
	indices = range(boardLen)
	
	for r in indices: 
		for c in indices:
			if board[r][c] == '_': 
				return (r,c)