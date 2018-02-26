function Fruit(x, y, size, color, bad) {

	this.position = createVector(x, y);

  this.color = color; // Color Original

  this.bad = bad; // Fruta Mala

  this.size = size; // Tamaño

	this.velocity = createVector(randomXVelocity(x), random(-7, -11));

  this.sliced = false;
	this.slicedTime = 0; // Hace un seguimiento al desvanecimiento

  this.visible = true;
}

/**
 * Maneja la posición, la velocidad, la visibilidad y el tiempo de corte
 */
Fruit.prototype.update = function() {

  this.position.add(this.velocity);

  this.velocity.x *= 0.99; // Resistencia del Aire
  this.velocity.y += GRAVITY; // Gravedad

	this.visible = (this.position.y < height); // Actualizar Visibilidad

	if (this.sliced) {

		this.slicedTime++; // Actualiza tiempo de rebanado
	}
};

/**
 * Dibuja la fruta y maneja el desvanecimiento
 */
Fruit.prototype.draw = function() {

	var fillColor = this.color;
  if (this.sliced) {

    if (this.bad) {
      /* game over */
      endGame();
    }

		var interp = constrain(this.slicedTime, 0, 15) / 15; // Cuanto se interpola

		// Asigna el color al fondo
    fillColor = lerpColor(this.color, color(51), interp);
  }

	/* Detremina el golpe basado en la fruta mala  */
  if (this.bad) {

    stroke(0);
    strokeWeight(5);
  } else {

    noStroke();
  }

	/* Dibuja */
  fill(fillColor);
  ellipse(this.position.x, this.position.y, this.size);
};

/**
 * Devuelve una fruta aleatoria
 */
function randomFruit() {

	/* randomiza la posicion */
  var x = random(width);
  var y = height;

  var size = noise(frameCount) * 20 + 20; // Randomiza el tamaño

  var bad = (random() > BAD_FRUIT_PROBABILITY); // Buena fruta o mala fruta

	/* Cambia el color a las frutas malas */
  var r = (bad) ? 225 : 0;
  var g = (bad) ? 0 : noise(frameCount * 2) * 255;
  var b = (bad) ? 0 : noise(frameCount * 3) * 255;

  var col = color(r, g, b); // Color

  return new Fruit(x, y, size, col, bad); // Retorna una fruta
}

/**
 * Devuelve la velocidad para apuntar siempre hacia el centro
 */
function randomXVelocity(x) {

  if (x > width / 2) {

    return random(-1.5, -0.5);
  } else {

    return random(0.5, 1.5);
  }
}
