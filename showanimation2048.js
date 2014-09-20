//console.log('我是动画函数！');

function showNumberWithAnimation(i, j, randNumber) {
	var numberCell = $('#number-cell-' + i + '-' + j);
	numberCell.css('background-color', getNumberBackgroundColor(randNumber));
	numberCell.css('color', getNumberColor(randNumber));
	numberCell.text(randNumber);

	//实现动画效果
	numberCell.animate({
		width:'100px',
		height: '100px',
		top: getPosTop(i, j),
		left: getPosLeft(i, j)
	},50);
}

function showMoveAnimation(fromx, fromy, tox, toy) {
	var numberCell = $('#number -cell-'+ fromx + '-' + fromy);
	numberCell.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	}, 100);
}