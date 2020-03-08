function Blade(color) {

  this.swipes = []; 

  this.color = color;
}

/**
 * after cut the image
 */
Blade.prototype.update = function() {

  /* Desvanecer el Golpe */
  if (this.swipes.length > BLADE_SIZE) { //fixed length

    this.swipes.splice(0, 1);
    this.swipes.splice(0, 1);
  } else if (this.swipes.length > 0) {

    this.swipes.splice(0, 1); 
  }
};

/**
 * Prueba si la fruta pasada es cortada por el golpe de la espada
 */
Blade.prototype.checkForSlice = function(fruit) {

  if (fruit.sliced || this.swipes.length < 2)
    return false;

  var length = this.swipes.length; // Largo de la espada

	var stroke1 = this.swipes[length - 1]; // Último golpe
	var stroke2 = this.swipes[length - 2]; // Penultimo golpe

	/* Calcula la distancia de los golpes 1 & 2 de la fruta */
  var d1 = dist(stroke1.x, stroke1.y, fruit.position.x, fruit.position.y);
  var d2 = dist(stroke2.x, stroke2.y, fruit.position.x, fruit.position.y);

	/* calcular la distancia del stroke1 para stroke2 */
  var d3 = dist(stroke1.x, stroke1.y, stroke2.x, stroke2.y);

  var sliced = d1 < fruit.size || 			// Si stroke1 cae directamente sobre la fruta
							((d1 < d3 && d2 < d3) && 	// Si la fruta cae entre stroke1 y stroke2
							(d3 < BLADE_LENGTH));			// Si hay un nuevo stroke, no conecte los dos

  fruit.sliced = sliced; // Actualiza las propiedades de la fruta

  return sliced;
};

//after cut success, change the color
Blade.prototype.draw = function() {

  var length = this.swipes.length;

  for (var i = 0; i < length; i++) {

    var s = map(i, 0, length, 2, 20); // Contraccion de puntos

    noStroke();
    fill(this.color);
    ellipse(this.swipes[i].x, this.swipes[i].y, s);
  }

};

/**
 * Balanceo de la espada
 */
Blade.prototype.swing = function(x, y) {
  this.swipes.push(createVector(x, y));
};
