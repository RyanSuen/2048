var board = [];
var score = 0;


//console.log('我是main函数！');

$(function() {
	//console.log('我来验证jQuer是否添加成功！');
	newgame();
});


function newgame() {

	//初始化棋盘格
	init();

	//在随机两个小格子生成数字
	generateOneNumber();
	generateOneNumber();
}

function init() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var gridCell = $('#grid-cell-' + i + '-' + j);
			gridCell.css('top', getPosTop(i, j));
			gridCell.css('left', getPosLeft(i, j));
		}
	}
	(function() {
		for (var i = 0; i < 4; i++) {
			board[i] = [];
			for (var j = 0; j < 4; j++) {
				board[i][j] = 0;
			}
		}
	})();
	updateBoardView();
}

function updateBoardView() {
	$('.number-cell').remove();
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$('#grid-container').append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
			var theNumberCell = $('#number-cell-' + i + '-' + j);
			if (board[i][j] === 0) {
				theNumberCell.css('width', '0px');
				theNumberCell.css('height', '0px');
				theNumberCell.css('top', getPosTop(i, j) + 50);
				theNumberCell.css('left', getPosLeft(i, j) + 50);
			} else {
				theNumberCell.css('width', '100px');
				theNumberCell.css('height', '100px');
				theNumberCell.css('top', getPosTop(i, j));
				theNumberCell.css('left', getPosLeft(i, j));
				theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color', getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
		}
	}
}

function generateOneNumber() {

	//判断是否位置还能生成数字
	if (nospace(board)) {
		return false;
	}

	//随机一个位置
	var randx = parseInt(Math.floor(Math.random() * 4),10);
	var randy = parseInt(Math.floor(Math.random() * 4),10);
	while (true) {
		if (board[randx][randy] === 0) {
			break;
		}
		randx = parseInt(Math.floor(Math.random() * 4),10);
		randy = parseInt(Math.floor(Math.random() * 4),10);
	}

	//随机一个数字
	var randNumber = Math.random() < 0.5 ? 2: 4;

	//在随机的位置上显示随机的数字
	board[randx][randy] = randNumber;
	showNumberWithAnimation(randx, randy, randNumber);
	return true;

}

$(document).keydown(function(e) {
	switch(e.keyCode) {
		case 37:    //left  所有的数字能向左移动，就向左移动
		{
			if(moveLeft()) {    //moveLeft先要判断能否向左移动,能就返回true,不能就返回false;其它同理。
				setTimeout(function() {
					generateOneNumber();
				},150);
				setTimeout(function() {
					isGameOver();
				},200);
				setTimeout(function() {
					updateScore();
				}, 250);
			}
		}
		break;
		case 38:    //up
		{
			if(moveUp()) {    //先要判断能否向左移动
				setTimeout(function() {
					generateOneNumber();
				},150);
				setTimeout(function() {
					isGameOver();
				},200);
				setTimeout(function() {
					updateScore();
				}, 250);
			}
		}
		break;
		case 39:    //right
		{
			if(moveRight()) {    //先要判断能否向左移动
				setTimeout(function() {
					generateOneNumber();
				},150);
				setTimeout(function() {
					isGameOver();
				},200);
				setTimeout(function() {
					updateScore();
				}, 250);
			}
		}
		break;
		case 40:    //down
		{
			if(moveDown()) {    //先要判断能否向左移动
				setTimeout(function() {
					generateOneNumber();
				},150);
				setTimeout(function() {
					isGameOver();
				},200);
				setTimeout(function() {
					updateScore();
				}, 250);
			}
		}
		break;
		default:
		break;

	}
});

function gameover() {
	alert('oops ! Game Over');
}

function isGameOver() {
	if( (nospace(board)) && (nomove(board)) ) {
		gameover();
	}
}

function moveLeft() {
	if(!canMoveLeft(board)) {
		return false;
	}

	//moveLeft
	for(var i = 0; i < 4; i++) {
		for(var j = 1; j < 4; j++) {
			if(board[i][j] !== 0) {  //有数字，说明可能可以向左移动

				//对它左侧的所有数字进行考查
				for(var k = 0; k < j ; k++) {
					if((board[i][k] === 0) && noBlockHorizontal(i, k, j, board)) {

						//move
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if((board[i][k] === board[i][j]) && noBlockHorizontal(i, k, j, board)) {

						//move
						showMoveAnimation(i, j, i, k);
						board[i][k] += board[i][j];//board[i][k]这个位置产生一次叠加
						board[i][j] = 0;
						continue;
					}
				}
			}
		}
	}
	setTimeout(function() {
		updateBoardView();
	},100);
	return true;
}

function moveUp() {
	if(!canMoveUp(board)) {
		return false;
	}

	//moveUp
	for(var i = 1; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			if(board[i][j] !== 0) {    //有数字说明，可能可以向上移动

				//对上方的所有数字进行考查
				for(var k = 0; k < i; k++) {
					if( (board[k][j] === 0) && (noBlockVertical(j, k, i, board))) {    //第j列的每k行到每第i行
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if( (board[k][j] === board[i][j]) && (noBlockVertical(j, k, i, board))) {
						showMoveAnimation(k, j, i, j);
						board[k][j] += board[i][j];//board[i][k]这个位置产生一次叠加
						board[i][j] = 0;
						continue;
					}
				}
			}
		}

	}
	setTimeout(function() {
		updateBoardView();
	},100);
	return true;
}

function moveRight() {
	if(!canMoveRight(board)) {
		return false;
	}

	//moveRight
	for(var i = 0; i < 4; i++) {
		for(var j = 2; j >= 0; j--) {
			if(board[i][j] !== 0) {    //说明可能可以向上移动。

				//对右边的所有数字进行考查
				for(var k = 3; k > j; k--) {
					if((board[i][k] === 0) && (noBlockHorizontalRight(i, j, k, board))) {
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if((board[i][k] === board[i][j]) && (noBlockHorizontalRight(i, j, k, board))) {
						showMoveAnimation(i, j, i, k);
						board[i][k] += board[i][j];//board[i][k]这个位置产生一次叠加
						board[i][j] = 0;
						continue;
					}
				}
			}
		}
	}
	setTimeout(function() {
		updateBoardView();
	},100);
	return true;
}

function moveDown() {
	if(!canMoveDown(board)) {
		return false;
	}
	for(var i = 0; i < 3; i++) {
		for(var j = 0; j < 4; j++) {
			if(board[i][j] !== 0) {
				for(var k = 3; k > i; k--) {
					if( (board[k][j] === 0) && (noBlockVerticalDown(j, k, i, board)) ) {
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if( (board[k][j] === board[i][j]) && (noBlockVerticalDown(j, k, i, board))) {
						showMoveAnimation(k, j, i, j);
						board[k][j] += board[i][j];//board[i][k]这个位置产生一次叠加
						board[i][j] = 0;
						continue;
					}
				}

			}
		}
	}
	setTimeout(function() {
		updateBoardView();
	},100);
	return true;
}

function nomove() {
	if(canMoveDown(board) || canMoveRight(board) || canMoveUp(board) || canMoveLeft(board)) {
		return false;
	}
	return true;
}

