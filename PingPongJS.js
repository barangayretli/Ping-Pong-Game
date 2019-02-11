var pong;
var lost = false;
var ball;
var point = 0;
var screenWidth = 350;
var barLength = 60;
var screenHeight = 510;
var pongPosX = 170;
var pongPosY = 480;
var scorePosX = 150;
var scorePosY = 25;
var chance = 3;
var temp = Math.floor(Math.random() * 10) + 1;

function startGame() {
	myGameArea.start();
	pong = new component(barLength, 8, "purple", pongPosX, pongPosY);
	ball = new component(7, 7, 'yellow', 200, 50);
	myScore = new component("16px", "Consolas", "green", scorePosX, 25, "text");
	remainingLife = new component("16px", "Consolas", "white", scorePosX, 70, "text");
	flag = true;
	temp = Math.floor(Math.random() * 10) + 1;
	document.getElementById("but7").hidden = true;
	document.getElementById("text3").hidden = true;
	document.getElementById("text4").hidden = false;
	document.getElementById("but8").hidden = false;
	document.getElementById("text5").hidden = false;
	document.getElementById("but9").hidden = false;
}
function tryAgaindef() {
	
	pong = new component(barLength, 8, "purple", pongPosX, pongPosY);
	ball = new component(7, 7, 'yellow', 200, 50);
	myScore = new component("16px", "Consolas", "green", scorePosX, 25, "text");
	chance = 3;
	remainingLife = new component("64px", "Consolas", "white", scorePosX, 70, "text");
	flag = true;
	temp = Math.floor(Math.random() * 10) + 1;
	document.getElementById("but7").hidden = true;
	document.getElementById("text3").hidden = true;
	document.getElementById("text4").hidden = false;
	document.getElementById("but8").hidden = false;
}
function tryAgain() {
	pong = new component(barLength, 8, "purple", pongPosX, pongPosY);
	ball = new component(7, 7, 'yellow', 200, 50);
	myScore = new component("16px", "Consolas", "green", scorePosX, 25, "text");
	remainingLife = new component("64px", "Consolas", "white", scorePosX, 70, "text");
	flag = true;
	temp = Math.floor(Math.random() * 10) + 1;
	document.getElementById("but7").hidden = true;
	document.getElementById("text3").hidden = true;
	document.getElementById("text4").hidden = false;
	document.getElementById("but8").hidden = false;
}
function hideFirst() {
	document.getElementById("but1").style.display = "none"; 
	document.getElementById("but2").style.display = "none"; 
	document.getElementById("but3").style.display = "none";
	document.getElementById("but4").hidden = false;
	document.getElementById("but5").hidden = false;
	document.getElementById("but6").hidden = false;
	document.getElementById("text2").hidden = false;
}
function hideSecond() {
	document.getElementById("but4").style.display = "none";
	document.getElementById("but5").style.display = "none";
	document.getElementById("but6").style.display = "none";
	document.getElementById("text2").hidden = true;
	document.getElementById("text3").hidden = false;
	document.getElementById("but7").hidden = false;
	


}
function die() {	
	alert("You have lost the game. Your Score is: " + point + "\nYou can do better than that!\nClick on Try Again Button");
}
function easy() {
	barLength = 120;
	hideFirst();
	 document.getElementById("text1").style.display = "none"; 
}
function medium() {
	 barLength = 60;
	hideFirst();
	document.getElementById("text1").style.display = "none"; 
}
function hard() {
	barLength = 30;
	hideFirst();
	document.getElementById("text1").style.display = "none"; 
}

function small() {
	screenWidth = 195;
	screenHeight = 300;
	pongPosX = 85;
	pongPosY = 270;
	scorePosX = 50;
	hideSecond();
}
function middle() {
	screenWidth = 350;
	screenHeight = 510;
	hideSecond();
}
function big() {
	screenWidth = 450;
	screenHeight = 620;
	pongPosX = 200;
	pongPosY = 580;
	scorePosX = 200;
	hideSecond();
}
var myGameArea = {
	canvas: document.createElement("canvas"),
	start: function () {
		this.canvas.width = screenWidth;
		this.canvas.height = screenHeight;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.interval = setInterval(updateGameArea, 30);
		window.addEventListener('keydown', function (e) {//KEY CONTROLS
			myGameArea.keys = (myGameArea.keys || []);
			myGameArea.keys[e.keyCode] = true;
		})
		window.addEventListener('keyup', function (e) {
			myGameArea.keys[e.keyCode] = false;
		})
	},
	clear: function () {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	stop: function () {
		clearInterval(this.interval);
	}
}
//CONSTRUCTOR
function component(width, height, color, x, y, type) {
	this.type = type;
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.speedX = 0;
	this.speedY = 0;
	this.update = function () {
		ctx = myGameArea.context;
		if (this.type == "text") {
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle = color;
			ctx.fillText(this.text, this.x, this.y);
		} else {
			ctx.fillStyle = color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}
	this.newPos = function () {
		this.x += this.speedX;
		this.y += this.speedY;
	}
	this.crashWith = function (otherobj) {//CRASH CASE
		var myleft = this.x;
		var myright = this.x + (this.width);
		var mytop = this.y;
		var mybottom = this.y + (this.height);
		var otherleft = otherobj.x;
		var otherright = otherobj.x + (otherobj.width);
		var othertop = otherobj.y;
		var otherbottom = otherobj.y + (otherobj.height);
		var crash = true;
		if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
			crash = false;
		}
		return crash;
	}
}
function updateGameArea() {
	//PONG CONTROL
	if (pong.x <= 0) {
		pong.x = 0;
	}
	if (pong.x >= screenWidth - barLength) {
		pong.x = screenWidth - barLength;
	}


	//KEYBOARD (RIGHT-LEFT ARROW)
	if (myGameArea.keys && myGameArea.keys[37]) {
		pong.x -= 10;
		if (ball.crashWith(pong)) {
			ball.speedY = -13;
			ball.speedX = -4;
		}
	}
	if (myGameArea.keys && myGameArea.keys[39]) {
		pong.x += 10;
		if (ball.crashWith(pong)) {
			ball.speedY = -13;
			ball.speedX = 4;
		}
	}

	//BALL MOVE
	ball.newPos();
	if (ball.crashWith(pong)) {
		if (ball.speedX > 0) {
			ball.speedY = -13;
			ball.speedX = 4;
		}
		else if (ball.speedX < 0) {
			ball.speedY = -13;
			ball.speedX = -4;
		}
		else {
			ball.speedY = -13;
			ball.speedX = 0;
		}
	} else {
		ball.y += 4;
		if (temp % 2 == 0 && flag) {//START RANDOMLY
			ball.speedX = -4;
			flag = false;
		} else if (temp % 2 == 1 && flag) {
			ball.speedX = +4;
			flag = false;
		}
	}
	if (point <= 10) {

		if (ball.x <= 0) {//BOUNCE CONDITIONS EASY
			ball.speedX = 4;
		}
		if (ball.x >= screenWidth) {
			ball.speedX = -4;
		}
		if (ball.y <= 0) {
			ball.speedY = 5;
			point++;
		}
		if (ball.y >= screenHeight) {
			ball.speedX = 0;
			ball.speedY = 0;
			if (chance == 3) {
				chance = 2;
				tryAgain();
			}
			else if (chance == 2) {
				chance =1;
				tryAgain();
			}
			else if (chance == 1) {
				chance = 0;
				die();
			}
		}
	}
	else if (point <= 20) {
		if (ball.x <= 0) {//BOUNCE CONDITIONS MEDIUM
			ball.speedX = 5;
		}
		if (ball.x >= screenWidth) {
			ball.speedX = -5;
		}
		if (ball.y <= 0) {
			ball.speedY = 7;
			point++;
		}
		if (ball.y >= screenHeight) {
			ball.speedX = 0;
			ball.speedY = 0;
			if (chance == "3/3") {
				chance = "2/3";
				tryAgain();
			}
			else if (chance == "2/3") {
				chance = "1/3";
				tryAgain();
			}
			else if (chance == "1/3") {
				chance = "0/3";
				die();
			}

		}
	}
	else if (point > 20) {
		if (ball.x <= 0) {//BOUNCE CONDITIONS HARD
			ball.speedX = 6;
		}
		if (ball.x >= screenWidth) {
			ball.speedX = -6;
		}
		if (ball.y <= 0) {
			ball.speedY = 9;
			point++;
		}
		if (ball.y >= screenHeight) {
			ball.speedX = 0;
			ball.speedY = 0;
			if (chance == "3/3") {
				chance = "2/3";
				tryAgain();
			}
			else if (chance == "2/3") {
				chance = "1/3";
				tryAgain();
			}
			else if (chance == "1/3") {
				chance = "0/3";
				die();
			}
		}
	}


	remainingLife.text = chance;
	remainingLife.update();
	myGameArea.clear();
	pong.update();
	ball.update();
	myScore.text = "SCORE: " + point;
	myScore.update();
}