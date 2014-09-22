var board = [];
var score = 0;
var hasConflicted = [];

var startx = 0,
	starty = 0,
	endx = 0,
	endy = 0;


//console.log('我是main函数！');

$(function() {
	prepareForMobible();
	newgame();
});

function prepareForMobible() {
	if (documentWidth > 500) {
		gridContainerWidth = 500;
		cellSpace = 20;
		cellSideLength = 100;
	}

	$('#grid-container').css({
		'width': gridContainerWidth - 2 * cellSpace,
		'height': gridContainerWidth - 2 * cellSpace,
		'padding': cellSpace,
		'boarder-radius': 0.02 * gridContainerWidth
	});
	$('.grid-cell').css({
		'width': cellSideLength,
		'height': cellSideLength,
		'border-radius': 0.02 * cellSideLength
	});
}


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
			hasConflicted[i] = [];
			for (var j = 0; j < 4; j++) {
				board[i][j] = 0;
				hasConflicted[i][j] = false;
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
				theNumberCell.css('top', getPosTop(i, j) + (cellSideLength / 2));
				theNumberCell.css('left', getPosLeft(i, j) + (cellSideLength / 2));
			} else {
				theNumberCell.css('width', cellSideLength);
				theNumberCell.css('height', cellSideLength);
				theNumberCell.css('top', getPosTop(i, j));
				theNumberCell.css('left', getPosLeft(i, j));
				theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color', getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
			hasConflicted[i][j] = false;
		}
	}
	$('.number-cell').css({
		'line-height': cellSideLength + 'px',
		'font-size': 0.6 * cellSideLength + 'px'
	});
}

function generateOneNumber() {

	//判断是否位置还能生成数字
	if (nospace(board)) {
		return false;
	}

	//随机一个位置
	var randx = parseInt(Math.floor(Math.random() * 4), 10);
	var randy = parseInt(Math.floor(Math.random() * 4), 10);
	var times = 0;
	while (times < 50) {
		if (board[randx][randy] === 0) {
			break;
		}
		randx = parseInt(Math.floor(Math.random() * 4), 10);
		randy = parseInt(Math.floor(Math.random() * 4), 10);
		times++;
	}

	if (times === 50) {
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if (board[i][j === 0]) {
					randx = parseInt(i, 10);
					randy = parseInt(j, 10);
				}
			}
		}
	}

	//随机一个数字
	var randNumber = Math.random() < 0.5 ? 2 : 4;

	//在随机的位置上显示随机的数字
	board[randx][randy] = randNumber;
	showNumberWithAnimation(randx, randy, randNumber);
	return true;

}

$(document).keydown(function(e) {
	
	switch (e.keyCode) {
		case 37: //left  所有的数字能向左移动，就向左移动
			{
				event.preventDefault();
				if (moveLeft()) { //moveLeft先要判断能否向左移动,能就返回true,不能就返回false;其它同理。
					setTimeout(function() {
						generateOneNumber();
					}, 150);
					setTimeout(function() {
						isGameOver();
					}, 200);
					setTimeout(function() {
						updateScore();
					}, 250);
				}
			}
			break;
		case 38: //up
			{
				if (moveUp()) { //先要判断能否向左移动
					setTimeout(function() {
						generateOneNumber();
					}, 150);
					setTimeout(function() {
						isGameOver();
					}, 200);
					setTimeout(function() {
						updateScore();
					}, 250);
				}
			}
			break;
		case 39: //right
			{
				if (moveRight()) { //先要判断能否向左移动
					setTimeout(function() {
						generateOneNumber();
					}, 150);
					setTimeout(function() {
						isGameOver();
					}, 200);
					setTimeout(function() {
						updateScore();
					}, 250);
				}
			}
			break;
		case 40: //down
			{
				if (moveDown()) { //先要判断能否向左移动
					setTimeout(function() {
						generateOneNumber();
					}, 150);
					setTimeout(function() {
						isGameOver();
					}, 200);
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

document.addEventListener('touchstart', function(event) {
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY;
	console.log('start:', startx, starty);
});

document.addEventListener('touchend', function(event) {
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;
	console.log('end:', endx, endy);

	//判断滑动方向
	var deltax = endx - startx,
		deltay = endy - starty;
	if((Math.abs(deltax) < documentWidth*0.3) && (Math.abs(deltay) < documentWidth*0.3)) {
		return false;
	}
	if (Math.abs(deltax) >= Math.abs(deltay)) {
		//说明在x轴上滑动，
		if (deltax > 0) {
			//move right
			if (moveRight()) { //先要判断能否向左移动
				setTimeout(function() {
					generateOneNumber();
				}, 150);
				setTimeout(function() {
					isGameOver();
				}, 200);
				setTimeout(function() {
					updateScore();
				}, 250);
			}
		} else {
			//mvoe left
			if (moveLeft()) { //moveLeft先要判断能否向左移动,能就返回true,不能就返回false;其它同理。
				setTimeout(function() {
					generateOneNumber();
				}, 150);
				setTimeout(function() {
					isGameOver();
				}, 200);
				setTimeout(function() {
					updateScore();
				}, 250);
			}
		}

	} else {
		//说明在y轴上滑动
		if (deltay > 0) {
			//向下
			if (moveDown()) { //先要判断能否向左移动
				setTimeout(function() {
					generateOneNumber();
				}, 150);
				setTimeout(function() {
					isGameOver();
				}, 200);
				setTimeout(function() {
					updateScore();
				}, 250);
			}
		} else {
			//向上
			if (moveUp()) { //先要判断能否向左移动
				setTimeout(function() {
					generateOneNumber();
				}, 150);
				setTimeout(function() {
					isGameOver();
				}, 200);
				setTimeout(function() {
					updateScore();
				}, 250);
			}
		}
	}
});

document.addEventListener('touchmove', function(event) {
	event.preventDefault();
});

function gameover() {
	alert('oops ! Game Over');
}

function isGameOver() {
	if ((nospace(board)) && (nomove(board))) {
		gameover();
	}
}

function moveLeft() {
	if (!canMoveLeft(board)) {
		return false;
	}

	//moveLeft
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if (board[i][j] !== 0) { //有数字，说明可能可以向左移动

				//对它左侧的所有数字进行考查
				for (var k = 0; k < j; k++) {
					if ((board[i][k] === 0) && noBlockHorizontal(i, k, j, board)) {

						//move
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if ((board[i][k] === board[i][j]) && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {

						//move
						showMoveAnimation(i, j, i, k);
						board[i][k] += board[i][j]; //board[i][k]这个位置产生一次叠加
						board[i][j] = 0;
						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout(function() {
		updateBoardView();
	}, 100);
	return true;
}

function moveUp() {
	if (!canMoveUp(board)) {
		return false;
	}

	//moveUp
	for (var i = 1; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] !== 0) { //有数字说明，可能可以向上移动

				//对上方的所有数字进行考查
				for (var k = 0; k < i; k++) {
					if ((board[k][j] === 0) && (noBlockVertical(j, k, i, board))) { //第j列的每k行到每第i行
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if ((board[k][j] === board[i][j]) && (noBlockVertical(j, k, i, board)) && !hasConflicted[k][j]) {
						showMoveAnimation(k, j, i, j);
						board[k][j] += board[i][j]; //board[i][k]这个位置产生一次叠加
						board[i][j] = 0;
						hasConflicted[k][j] = true;
						continue;
					}
				}
			}
		}

	}
	setTimeout(function() {
		updateBoardView();
	}, 100);
	return true;
}

function moveRight() {
	if (!canMoveRight(board)) {
		return false;
	}

	//moveRight
	for (var i = 0; i < 4; i++) {
		for (var j = 2; j >= 0; j--) {
			if (board[i][j] !== 0) { //说明可能可以向上移动。

				//对右边的所有数字进行考查
				for (var k = 3; k > j; k--) {
					if ((board[i][k] === 0) && (noBlockHorizontalRight(i, j, k, board))) {
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if ((board[i][k] === board[i][j]) && (noBlockHorizontalRight(i, j, k, board)) && !hasConflicted[i][k]) {
						showMoveAnimation(i, j, i, k);
						board[i][k] += board[i][j]; //board[i][k]这个位置产生一次叠加
						board[i][j] = 0;
						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout(function() {
		updateBoardView();
	}, 100);
	return true;
}

function moveDown() {
	if (!canMoveDown(board)) {
		return false;
	}
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] !== 0) {
				for (var k = 3; k > i; k--) {
					if ((board[k][j] === 0) && (noBlockVerticalDown(j, k, i, board))) {
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if ((board[k][j] === board[i][j]) && (noBlockVerticalDown(j, k, i, board)) && !hasConflicted[k][j]) {
						showMoveAnimation(k, j, i, j);
						board[k][j] += board[i][j]; //board[i][k]这个位置产生一次叠加
						board[i][j] = 0;
						hasConflicted[k][j] = true;
						continue;
					}
				}

			}
		}
	}
	setTimeout(function() {
		updateBoardView();
	}, 100);
	return true;
}

function nomove() {
	if (canMoveDown(board) || canMoveRight(board) || canMoveUp(board) || canMoveLeft(board)) {
		return false;
	}
	return true;
}