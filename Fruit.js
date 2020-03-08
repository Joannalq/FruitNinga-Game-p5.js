function Fruit(x, y, image_s, size, color, bad) {

	this.position = createVector(x, y);

  this.bad = bad; // bad fruit

  this.image_s = image_s; 
  this.size = size;
  this.color=color;

	this.velocity = createVector(randomXVelocity(x), random(-7, -11));

  this.sliced = false;
	this.slicedTime = 0; // keep track of fade

  this.visible = true;
}

/**
 * handles position, velocity, visibility, and slice time
 */
Fruit.prototype.update = function() {

  this.position.add(this.velocity);

  this.velocity.x *= 0.99; // air resistance
  this.velocity.y += GRAVITY; // gravity

	this.visible = (this.position.y < height); // update visibility

	if (this.sliced) {

		this.slicedTime++; // update sliced time
	}
};

/**
 * draw and fade the image color
 */
Fruit.prototype.draw = function() {
  var fillColor = this.color;
  if (this.sliced) {

    if (this.bad) {
      /* game over */
      endGame();
    }

    var interp = constrain(this.slicedTime, 0, 15) / 15; // how much to interpolate
    
    // let c = color(0, 204, 0);
    // fillColor = lerpColor(this.color, c, interp);
    
    tint(0, 153, 204); // Tint blue and set transparency
    image(this.image_s, this.position.x, this.position.y,40,40);
  }else{
    noTint();
  }

  /*  determine stroke based upon bad */
  if (this.bad) {
    // stroke(51);
    // strokeWeight(5);
    tint(100, 153, 204);
    image(this.image_s, this.position.x, this.position.y,40,40);
  } else {
    //noStroke();
    noTint();
  }

  // let images = [img, img1,img2];
  // let img_random = random(images); 
  fill(fillColor);
  noTint();
  image(this.image_s, this.position.x, this.position.y);
 
};

/**
 * returns a random fruit
 */
function randomFruit() {

	/* randomize position */
  var x = random(width);
  var y = height;

  var size = noise(frameCount) * 20 + 20; // random size
  var images_sliced = [img, img1,img2, img3];
  var image_s =  random(images_sliced);
 
  //var size = noise(frameCount) * 20 + 20; // Randomiza el tamaño
  var bad = (random() > BAD_FRUIT_PROBABILITY); // Buena fruta o mala fruta
  var r = (bad) ? 225 : 0;
  var g = (bad) ? 0 : noise(frameCount * 2) * 255;
  var b = (bad) ? 0 : noise(frameCount * 3) * 255;

  var col = color(r, g, b); // color
  print(bad);
  return new Fruit(x, y, image_s,size,col, bad);
}

/**
 * returns velocity to always point toward center
 */
function randomXVelocity(x) {

  if (x > width / 2) {

    return random(-1.5, -0.5);
  } else {

    return random(0.5, 1.5);
  }
}
