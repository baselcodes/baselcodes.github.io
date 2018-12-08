const colors = [
    '#f00', // red 
    '#0f0',
    '#00f',
    '#ff0',
    '#f0f',
    '#0ff',
    '#000',
]
class Ball {
    constructor() {
        this.color = random(colors);
        console.log(this.color);
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(-3, 3), random(-3, 3));
        this.r = random(2, 5);
        this.directionx = 1;
        this.directiony = 1;
    }
    show() {
        noStroke();
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.r);
    }
    update() {
        this.pos.x += this.vel.x * this.directionx;
        this.pos.y += this.vel.y * this.directiony;
        this.edges();
    }
    edges() {
        if (this.pos.x > width || this.pos.x < 0) {
            this.directionx *= -1;

        }
        if (this.pos.y > height || this.pos.y < 0) {
            this.directiony *= -1;
        }
    }
    proximity(balls) {
        for (const ball of balls) {
            if (ball != this) {
                if (ball.pos.dist(this.pos) < 50) {
                    stroke(this.color);
                    line(ball.pos.x, ball.pos.y, this.pos.x, this.pos.y);
                }
            }
        }
    }
}