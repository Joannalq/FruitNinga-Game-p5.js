function Fruit(x, y, image_s, bad) {

	this.position = createVector(x, y);

  this.bad = bad; // bad fruit

  this.image_s = image_s; 
  // this.size = size;
  // this.color=color;

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
  //var fillColor = this.color;
  if (this.sliced) {

    if (this.bad) {
      /* game over */
      endGame();
    }else{
      image(img_y, this.position.x, this.position.y);
    }
    
  }else{
    noTint();
  }

  /*  determine stroke based upon bad */
  if (this.bad) {
    if(this.image_s==img2){
      image(this.image_s, this.position.x, this.position.y);
    }else{
      tint(249,23,7);
      image(this.image_s, this.position.x, this.position.y,40,40);
    }
    
  } else {
    noTint();
    image(this.image_s, this.position.x, this.position.y);
  }

  // let images = [img, img1,img2];
  // let img_random = random(images); 
  //fill(fillColor);
  noTint();
  // image(this.image_s, this.position.x, this.position.y);
 
};

/**
 * returns a random fruit
 */
function randomFruit() {

	/* randomize position */
  var x = random(width);
  var y = height;

  //var size = noise(frameCount) * 20 + 20; // random size
  var images_sliced = [img,img1,img3];
  var image_s =  random(images_sliced);
  var image_bad = [img,img1,img2];
  var image_b = random(image_bad);
 
  //var size = noise(frameCount) * 20 + 20; // Randomiza el tamaño
  var bad = (random() > BAD_FRUIT_PROBABILITY); // good or bad
  
  print(bad);
  if(bad){
    return new Fruit(x, y, image_b, bad);
  }else{
    return new Fruit(x, y, image_s, bad);
  }
  
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
