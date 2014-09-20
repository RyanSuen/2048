//console.log('我是支承函数！');

function getPosTop(i, j) {
	return 20 + i * 120;
}

function getPosLeft(i, j) {
	return 20 + j * 120;
}

function getNumberBackgroundColor(number) {
	var color = null;
	switch (number) {
		case 2:
			color = '#eee4da';
			break;
		case 4:
			color = '#ede0c8';
			break;
		case 8:
			color = '#f2b179';
			break;
		case 16:
			color = '#f59563';
			break;
		case 32:
			color = '#f67c5f';
			break;
		case 64:
			color = '#f65e3b';
			break;
		case 128:
			color = '#edcf72';
			break;
		case 256:
			color = '#edcc61';
			break;
		case 512:
			color = '#9c0';
			break;
		case 1024:
			color = '#33b5e5';
			break;
		case 2048:
			color = '#09c';
			break;
		case 4096:
			color = '#a6c';
			break;
		case 3192:
			color = '#93c';
			break;
		default:
			color = 'black';
	}
	return color;
}

function getNumberColor(number) {
	if(number <= 4) {
		return '#776e65';
	}
	return 'white';
}

function nospace(board) {
	for(var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			if(board[i][j] === 0) {
				return false;
			}
		}
	}
	return true;
}

function canMoveLeft(board) {
	for(var i = 0; i < 4; i ++) {
		for(var j = 1; j < 4; j++) {    //第一列的不用判断。
			if(board[i][j] !== 0) {
				if((board[i][j-1] === 0) || (board[i][j-1] === board[i][j]) ) {
					return true;
				}
			}
		}
	}
	return false;
}

function noBlockHorizontal(row, col1, col2, board) {
	for(var i = col1 + 1; i < col2; i++) {
		if(board[row][i] !== 0) {
			return false;
		}
	}
	return true;
}

function canMoveUp(board) {
	for(var i = 1; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			if(board[i][j] !== 0) {
				if( (board[i-1][j] === 0) || (board[i][j] === board[i-1][j])) {
					return true;
				}
			}
		}
	}
	return false;
}

function noBlockVertical(col, row1, row2, board) {
	for(var i = row1 +1; i < row2; i++) {
		if(board[i][col] !== 0) {
			return false;
		}
	}
	return true;
}

function canMoveRight(board) {
	for(var i = 0; i < 4; i++ ) {
		for(var j = 2; j >= 0; j--) {
			if(board[i][j] !== 0) {
				if( (board[i][j+1] === 0) || (board[i][j+1] === board[i][j])) {
					return true;
				}
			}
		}
	}
	return false;
}

function noBlockHorizontalRight(row, col1, col2, board) {
	for(var i = col1 + 1; i < col2; i++) {
		if(board[row][i] !== 0) {
			return false;
		}
	}
	return true;
}

function canMoveDown(board) {
	for(var i = 0; i < 3; i++) {
		for(var j = 0; j < 4; j++) {
			if(board[i][j] !== 0) {
				if( (board[i+1][j] === 0) || (board[i+1][j] === board[i][j]) ) {
					return true;
				}
			}
		}
	}
	return false;
}

function noBlockVerticalDown(col, row1, row2, board) {
	for(var i = row2 +1; i < row1 ; i++) {
		if(board[i][col] !== 0) {
			return false;
		}
	}
	return true;
}

function updateScore() {
	var score = $('.number-cell'),
		max = 0,
		l = score.length,
		temp = null;
	for(var i = 0; i < l; i++) {
		temp = score.eq(i).text();
		if(temp === '' ) {
			temp = 0;
		} else {
			temp = parseInt(temp, 10);
		}

		if(temp > max) {
			max = temp;
		}
	}
	$('#score').text(max);
	console.log(score.eq(0).text());
}