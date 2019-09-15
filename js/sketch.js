<<<<<<< HEAD
//const NEW_LINE = '$'
const TITLE = 'basel.codes 📆 09.02.19 🏛 @h3k && 🏫 @hgk 📣 open call for workshops and presentations 🤟'


let index = 0;
let selectedText = '';
let write = true;
selectedText = TITLE.split('');
if (selectedText != '') {
  SI = setInterval(() => {
    let myDiv = document.getElementById('title-animation');
    if (write) {
      let letter = selectedText[index];
      //if (letter === NEW_LINE) letter = '<br>'
      myDiv.innerHTML += letter;
      myDiv.scrollTop = myDiv.scrollHeight;
      index++;
    }
    if (index >= selectedText.length) {
      write = false;
      setTimeout(() => {
        clearInterval(SI);
      }, 200);
      myDiv.innerHTML = '<p>basel.codes</p><p>📆 09.02.19</p><a href="http://www.hek.ch/" target="_blank" rel="noopener noreferrer">🏛 @h3k</a><p>&&</p><a href="https://www.fhnw.ch/de/die-fhnw/hochschulen/hgk" target="_blank" rel="noopener noreferrer">🏫 @hgk</a><a href="https://docs.google.com/forms/d/e/1FAIpQLScsw6eTpP0SagAixIytgZOCWeMpwjwcjG1QJT7PN9V0kR8xIA/viewform" target="_blank" rel="noopener noreferrer">📣 open call for workshops and presentations</a><a href="mailto:helloworld@basel.codes">🤟</a>'
      //   $('#title-animation').lettering();
    }
  }, 10);

}

window.onmousemove = (event) => {
  // console.log(event.clientX, event.clientY);
  const x = ((event.clientX / innerWidth) - 0.5) * 2;
  const y = ((event.clientY / innerHeight) - 0.5) * 2;
  // console.log(x, y);
  const shadow = '#ff0 ' + x * 5 + 'px ' + y * 5 + 'px';
  // console.log(shadow);
  // document.getElementById('title-animation').style.textShadow = shadow;
  
}

let cnv;
let balls = [];
function setup() {
  cnv = createCanvas(innerWidth, innerHeight);
  cnv.parent('p5')
  for (let i = 0; i < 5; i++)balls.push(new Ball());
}

function draw() {
  background(200);
  for (const ball of balls) {
    ball.update();
    // ball.proximity(balls);
    ball.show(balls);
  }
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}
=======
let cnv;
let bball;
function setup() {
    cnv = createCanvas(innerWidth, innerHeight);
    cnv.parent('p5');
    bball = new Bounce_Ball()
}
function draw() {
    background('#eee')
    bball.update();
    bball.show();
}

function windowResized() {
    resizeCanvas(innerWidth, innerHeight);
}

class Bounce_Ball {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.speed = 0.2;
        this.vel = createVector(random(-this.speed, this.speed), random(-this.speed, this.speed));
        this.r = 175;
    }

    update() {
        this.edge();
        this.nudge();
        this.pos.add(this.vel);
        // this.pos.normalize();
        // this.pos.limit(3);
    }
    edge() {
        if (this.pos.x < 0 + (this.r / 2) || this.pos.x > width - (this.r / 2)) this.vel.x *= -1;
        if (this.pos.y < 0 + (this.r / 2) || this.pos.y > height - (this.r / 2)) this.vel.y *= -1;
    }
    nudge() {
        const x = map(mouseX, 0, width, -0.1, 0.1);
        const y = map(mouseY, 0, height, -0.1, 0.1);
        this.vel.add(createVector(x, y));
    }
    show() {
        // noFill();
        noStroke();
        fill('#fa0');
            ellipse(this.pos.x, this.pos.y, this.r);
    }
}
>>>>>>> b6a675aaff6934fa6c8bf9980d468a8329cbc73d
