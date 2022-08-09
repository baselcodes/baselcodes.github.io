console.log("welcome to volume 5!")

window.onblur = function () {
  noLoop()
}
window.onfocus = function () {
  loop();
}

function setup(){
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent("sketch-container");

  background(0);
	imageMode(CENTER);
  frameRate(1)

	glitch = new Glitch();
	loadImage('../../img/ethics-volume-5.jpg', function(im){
		glitch.loadImage(im);
	});
}


function draw() {
	glitch.resetBytes();

	// glitch.replaceBytes(102, 103); // swap all decimal byte 100 for 104
	glitch.randomBytes(int(random(1, 100))); // add one random byte for movement

	glitch.buildImage();
	image(glitch.image, width/2, height/2)
}

/* CUSTOM FUNCTIONS FOR P5LIVE */
// keep fullscreen if window resized
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
