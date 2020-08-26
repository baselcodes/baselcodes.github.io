//draw a spinning octahedron
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
  createCanvas(innerWidth, innerHeight, WEBGL)
  noStroke()
}

function draw() {
  scale(10)
  // ortho(-1500, 1500, -1500, 1500, -1500, 1500)
  // ortho()
  // background(random(255))
  background(255)
  shader(PCD_shader)

  // Send the texture to the shader
  PCD_shader.setUniform("uMatcapTexture", matcap)
  for (let j = -3; j <= 3; j++) {
    for (let i = -6; i <= 6; i++) {
      push()
      // translate(i * (sin(wave) * 2), 2, 0)
      translate(i * 10, 2 + (j * 10), 0)
      // translate(i * (sin(wave) * 2), 2, i * (sin(wave) * 2))
      // normalMaterial()
      rotateX(PI - PI / 6)
      rotateY(PI)
      rotateY(PI + (frameCount * 0.01 * i))
      if (i == 0) rotateY(sin(wave) * PI)
      // rotateZ(frameCount * 0.1)
      // if(i !== 0)model(PCD)
      model(PCD)
      pop()
    }
  }
  wave += inc
}