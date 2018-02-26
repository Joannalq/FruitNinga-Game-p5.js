
const GRAVITY = 0.2;

const BLADE_SIZE = 20; // Numero de golpes antes de desaparecer
const BLADE_LENGTH = 150;  // Distancia máxima entre puntos para conectar dos golpes

const BAD_FRUIT_PROBABILITY = 0.9; // Posibilidad de que cada fruta sea mala

var sword;
var fruit = []; // Fruta en pantalla

var lives;
var score;

function setup() {
  createCanvas(600, 400);

  sword = new Blade(color("#FFF0EE"));
  frameRate(60);

  lives = 3;
  score = 0;
}

function draw() {
  background(51);

	handleMouse();
  score += handleFruit();

  drawScore();
  drawLives();
}

/**
 * Balanceo y dibujo de la espada
 */
function handleMouse() {

	if (mouseIsPressed) { // Balanceo
		sword.swing(mouseX, mouseY);
	}

  if (frameCount % 2 === 0) { // Actualizar en la mitad de tiempo

		sword.update();
	}

  sword.draw();
}

/**
 * Empuja y actualiza la fruta
 * Devuelve el número de puntos conseguidos
 */
function handleFruit() {

	/* Empuja una nueva fruta */
  if (frameCount % 10 === 0) {

		if (noise(frameCount) > 0.66) {

			fruit.push(randomFruit());
		}
	}

	/* Manejo de corte de la fruta */
	var points = 0;
	for (var i = fruit.length - 1; i >= 0; i--) {

		fruit[i].update();
		fruit[i].draw();

		if (!fruit[i].visible) { // Si la fruta ya no está en pantalla

			if (!fruit[i].sliced && !fruit[i].bad) { // Si no hemos cortado y no es una mala fruta

				lives--;
			}

			if (lives < 1) { // Este es el fin del juego

				endGame();
			}

			fruit.splice(i, 1); // Elimina la fruta invisible del array
		} else {

			points += (sword.checkForSlice(fruit[i])) ? 1 : 0; // Si cortamos la fruta, agreguemos los puntos
		}

	}

	return points;
}

/**
 * Dibujamos las vidas en la parte superior derecha
 */
function drawLives() {

  stroke(255);
  strokeWeight(3);
  fill("#FF00EE");

  for (var i = lives; i > 0; i--) {

		ellipse(width - (i * 20 + 20), 50, 20);
	}

}

/**
 * Dibujamos los puntos en la parte superior izquierda
 */
function drawScore() {

  textAlign(LEFT);
  noStroke();
  fill(255);
  textSize(50);
  text(score, 10, 50);
}

/**
 * Termina el ciclo y escribe el mensaje
 */
function endGame() {

  noLoop();

  textAlign(CENTER);
  noStroke();
  fill("#888888");
  textSize(100);
  text("Game over!", width / 2, height / 2);
  textSize(50);
  text("Press f5 to restart!", width / 2, height / 2 + 60);
}
