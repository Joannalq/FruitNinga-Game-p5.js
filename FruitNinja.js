
const GRAVITY = 0.2;

const BLADE_SIZE = 20; // Numero de golpes antes de desaparecer
const BLADE_LENGTH = 150;  // Distancia máxima entre puntos para conectar dos golpes

const BAD_FRUIT_PROBABILITY = 0.9; // Posibilidad de que cada fruta sea mala

var sword;
var fruit = []; // Fruta en pantalla

var lives;
var score;
var img_good;
var img_bad;

function preload() {
	img = loadImage('./imgs/game.png');
	img1 = loadImage('./imgs/bubble-tea.png');
	img2 = loadImage('./imgs/slow.png');
	img3 = loadImage('./imgs/book.png');
	img_y = loadImage('./imgs/yes-1.png');

  }

function fitToContainer(canvas){
	canvas.style.width='100%';
	canvas.style.height='100%';
	canvas.width  = canvas.offsetWidth;
  	canvas.height = canvas.offsetHeight;
}

function setup() {

	// method1: position the convas
	// var axis_x = (windowWidth - width)/6;
	// var axis_y = (windowWidth - height)/6;
	// cnv.position(axis_x,axis_y);
	var parentCanvas = document.getElementById("canvasHolder");

	var cnv = createCanvas(parentCanvas.offsetWidth, parentCanvas.offsetHeight);

	cnv.parent('canvasHolder');

	sword = new Blade(color("#824859"));
	frameRate(60);

	lives = 3;
	score = 0;
}

//after draw the color
function draw() {
	// background("#b6f8f1"); //Canvas background color
	background("#f6ea8c");
	handleMouse();
	score += handleFruit();

	drawScore();
	drawLives();
}

//swings and draws the sword
function handleMouse() {

	if (mouseIsPressed) { //swinging
		sword.swing(mouseX, mouseY);
	}

  if (frameCount % 2 === 0) { // update half the time
		sword.update();
	}

  sword.draw();
}

/**
 * pushes and updates fruit
 * returns number of points scored
 */
function handleFruit() {

	/* push new fruit */
  if (frameCount % 10 === 0) {

		if (noise(frameCount) > 0.66) {

			fruit.push(randomFruit());
		}
	}

	/* handle slicing fruit  */
	var points = 0;
	for (var i = fruit.length - 1; i >= 0; i--) {

		fruit[i].update();
		fruit[i].draw();

		if (!fruit[i].visible) { // if the fruit is no longer on-screen

			if (!fruit[i].sliced && !fruit[i].bad) { // if we haven't sliced & it's not a bad
				lives--;
			}

			if (lives < 1) { //game over

				endGame();
			}

			fruit.splice(i, 1); //delete invisible fruit from array
		} else {

			points += (sword.checkForSlice(fruit[i])) ? 1 : 0; // if we sliced the fruit, add to the points
		}

	}

	return points;
}

/**
 * draws lives in the top right
 */
function drawLives() {

  stroke(255);
  strokeWeight(3);
  fill("#FF3333");
  

  for (var i = lives; i > 0; i--) {
		ellipse(width - (i * 20 + 20), 50, 20);
	}

}

/**
 * draws score in the top left
 */
function drawScore() {
  textAlign(LEFT);
  noStroke();
  fill(255);
  textSize(50);
  text(score, 10, 50);
}

/**
 * ends the loop, draws message
 */
function endGame() {

  noLoop();

  textAlign(CENTER);
  noStroke();
  fill("#888888");
  textSize(50);
  text("Game over!", width / 2, height / 2);
  textSize(25);
  text("Press f5 to restart!", width / 2, height / 2 + 60);
}
