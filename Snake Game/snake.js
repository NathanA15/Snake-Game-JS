var canvas = document.getElementById('snakeboard');
// canvas.width = 600;
// canvas.height = 300;

var ctx = canvas.getContext('2d');
ctx.fillStyle = 'red';

// Creating the headd of the snake

var width = 15;
var height = 15;
ctx.fillStyle = '#4666FF';

// This variable lastMove is to remember where the user wanted to go
// last for the snake to keep going on his own
var lastMove = 'right';

// This is the list of all the snake body
// each elemnt contain a list which in it there are two elements 
// [X, Y]

var snakeBody = [[300, 150], [285, 150]];
randomApple();
displaySnakeBody();

// Apple coordinates to know where the apple is locating at anytime
var appleX;
var appleY;

var code = 39;

// This variable to know the number of apples eaten
var applesEaten = 0;


window.addEventListener('keydown', function(event) {
	code = event.keyCode;
	// console.log(code);
});


var timer = setInterval(lauchingGame, 100);


function lauchingGame() {
	erasingSnakeOnScreen();
	// console.log('round');
	// before moving the head we must move the body 
	// because each part is going to take the "place" of the part 
	// that is in front of him (closer to the head) and after that everyone has technically 
	// taken the place of the one in front of him we just need to move the head
	movingSnakeBody();
	movingHeadSnake();
	// displaySnakeBody();


	checkAppleEaten();
	checkIfDead();

	

}



function erasingSnakeOnScreen() {
	for (var i = 0; i < snakeBody.length; i++) {
		// console.log('erasing');
		ctx.clearRect(snakeBody[i][0], snakeBody[i][1], width, height);
	};
};


function checkIfDead() {
	if (snakeBody[0][0] > 585 || snakeBody[0][1] > 285 || snakeBody[0][0] < 0 || snakeBody[0][1] < 0) {
		clearInterval(timer);
		alert('Sorry you are dead\n Biatch!!!');
		return;
	} else if (checkIfHeadInBody()) {
		alert('Sorry you are dead\n Biatch!!!');
		clearInterval(timer);
		return;
	}
};


function checkIfHeadInBody() {
	for (var i = 1; i < snakeBody.length; i++) {
		snakeBody[i]
		if (snakeBody[i][0] == snakeBody[0][0]) {
			if (snakeBody[i][1] == snakeBody[0][1]) {
				return true
			};
		};
	};
	return false;
};


function randomApple() {

	do {
		appleX = Math.floor(Math.random() * 40) * 15;
		appleY = Math.floor(Math.random() * 20) * 15;
	} while (checkLocationApple())

	ctx.fillStyle = 'red';
	ctx.fillRect(appleX, appleY, 15, 15);
	// console.log('apple');
};


function checkLocationApple() {
	for (var i = 0; i < snakeBody.length; i++) {
		// console.log('#############');
		if (snakeBody[i][0] == appleX) {
			if (snakeBody[i][1] == appleY) {
				return true
			};
		};
	};

	return false;
}


function checkAppleEaten() {
	if (appleX == snakeBody[0][0] && appleY == snakeBody[0][1]) {
		applesEaten += 1;
		randomApple();
		addPartToBody();
		// console.log(applesEaten + "apples eaten");
	} else {
		displaySnakeBody();
	}

};



function displaySnakeBody() {

	ctx.fillStyle = '#4666FF';
	ctx.fillRect(snakeBody[0][0], snakeBody[0][1], 15, 15);
	ctx.beginPath();
	ctx.lineWidth = 5;
	ctx.strokeStyle = '#39FF14';
	
	if (lastMove == 'up') {
		ctx.moveTo(snakeBody[0][0] + 7.5, snakeBody[0][1]);
		ctx.lineTo(snakeBody[0][0] + 7.5, snakeBody[0][1] + 5);

	} else if (lastMove == 'down') {
		ctx.moveTo(snakeBody[0][0] + 7.5, snakeBody[0][1] + 10);
		ctx.lineTo(snakeBody[0][0] + 7.5, snakeBody[0][1] + 15);

	} else if (lastMove == 'right') {
		ctx.moveTo(snakeBody[0][0] + 15, snakeBody[0][1] + 7.5);
		ctx.lineTo(snakeBody[0][0] + 10, snakeBody[0][1] + 7.5);

	} else if (lastMove == 'left') {
		ctx.moveTo(snakeBody[0][0], snakeBody[0][1] + 7.5);
		ctx.lineTo(snakeBody[0][0] + 5 , snakeBody[0][1] + 7.5);
	}
	ctx.stroke();

	for (var i = 1; i < snakeBody.length; i++) {
		// Displaying the part of the body  
		ctx.fillStyle = '#4666FF';
		ctx.fillRect(snakeBody[i][0], snakeBody[i][1], 15, 15);
	};
};


function displaySnakeBodyExceptLast() {
	for (var i = 0; i < snakeBody.length - 1; i++) {
		// Displaying the part of the body  
		ctx.fillStyle = '#4666FF';
		ctx.fillRect(snakeBody[i][0], snakeBody[i][1], 15, 15);
	}
};


function addPartToBody() {
	// Now I add to the end of the list the same part of the body than the one that was last
	snakeBody.push(Array.from(snakeBody[snakeBody.length - 1]));
	displaySnakeBodyExceptLast();
};


function movingHeadSnake() {

	if (code == 37) { // left
		snakeBody[0][0] -= 15;
		lastMove = 'left';
		// console.log(lastMove);
	} else if (code == 39) { // right
		snakeBody[0][0] += 15;
		lastMove = 'right';
		// console.log(lastMove);
	} else if (code == 38) { // up
		snakeBody[0][1] -= 15;
		lastMove = 'up';
		// console.log(lastMove);
	} else if (code == 40) { // down
		snakeBody[0][1] += 15;
		lastMove = 'down';
		// console.log(lastMove);
	} else if (code == 81) {
		console.log('Stopping the game');
		clearInterval(timer);
	} else {
		if (lastMove == 'left') {
			snakeBody[0][0] -= 15;
			// console.log(lastMove + 'xx');
		} else if (lastMove == 'right') {
			snakeBody[0][0] += 15;
			// console.log(lastMove + 'xx');
		} else if (lastMove == 'up') {
			snakeBody[0][1] -= 15;
			// console.log(lastMove + 'xx');
		} else if (lastMove == 'down') {
			snakeBody[0][1] += 15;
			// console.log(lastMove + 'xx');
		} else {
			alert('Do not try to play with me ;)');
		}
	}
}


function movingSnakeBody() {
	for (var i = snakeBody.length - 1; i >= 1; i--) {
		snakeBody[i] = Array.from(snakeBody[i - 1]);
	}
};










