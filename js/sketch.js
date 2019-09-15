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
