let PCD
let PCD_shader
let matcap
let wave = 0

const inc = Math.PI / 100

function preload() {
  PCD = loadModel('assets/3d/Samsung Laptop obj/laptop_open.obj')
  PCD_shader = loadShader("assets/shader/shader.vert", "assets/shader/shader.frag")
  matcap = loadImage("assets/shader/matcap.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
  noStroke()
  pixelDensity(1)
}

function draw() {
  background(127.5)
  shader(PCD_shader)

  // Send the texture to the shader
  PCD_shader.setUniform("uMatcapTexture", matcap)

  let gridSize = 8;
  for (let j = 0; j <= gridSize; j++) {
    for (let i = 0; i <= gridSize; i++) {
      push()
      let x = map(i, 0, gridSize-1, -width/2, width/2)
      let y = map(j, 0, gridSize-1, -height/2, height/2)
      // translate(i * (sin(wave) * 2), 2, 0)
      translate(x, y, 0)
      scale(map(sin(frameCount*.001), -1, 1, 2, width/30))
      // translate(i * (sin(wave) * 2), 2, i * (sin(wave) * 2))
      // normalMaterial()
      rotateX(PI - PI / 6)
      let a = atan2(mouseY - height / 2, mouseX - width / 2);
      rotateX(a);
      rotateY(a);
      rotateY(PI + (i * .15 + frameCount * .01))
      // if (i == 0) rotateY(sin(wave) * PI)
      // rotateZ(frameCount * 0.01)
      model(PCD)
      pop()
    }
  }
  wave += inc
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}