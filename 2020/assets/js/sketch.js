//draw a spinning octahedron
let PCD
let PCD_shader
let matcap

function preload() {
  PCD = loadModel('assets/3d/Samsung Laptop obj/laptop_open.obj')

  PCD_shader = loadShader("assets/shader/shader.vert", "assets/shader/shader.frag")

  matcap = loadImage("assets/shader/matcap.png")
}

function setup() {
  createCanvas(innerWidth, innerHeight, WEBGL)
  noStroke()
}

function draw() {
  scale(50)
  // ortho(-1500, 1500, -1500, 1500, -1500, 1500)
  // ortho()
  background(random(255))
  shader(PCD_shader)

  // Send the texture to the shader
  PCD_shader.setUniform("uMatcapTexture", matcap)
  for (let i = -1; i <= 1; i++) {
    push()
    translate(i * 10, 2, 0)
    // normalMaterial()
    rotateX(PI - PI / 6)
    rotateY(PI + (frameCount * 0.1 * i))
    if(i == 0)rotateX(frameCount * 0.1)
    // rotateZ(frameCount * 0.1)
    model(PCD)
    pop()
  }
}