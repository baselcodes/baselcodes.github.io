const colors = [
    '#f00', // red 
    '#0f0',
    '#00f',
    '#ff0',
    '#f0f',
    '#0ff',
    '#fff',
]
class Ball {
    constructor() {
        this.color = random(colors);
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(-3, 3), random(-3, 3));
        this.r = random(6, 12);
        this.directionx = 1;
        this.directiony = 1;
        this.maxSpeed = 50;
        this.trail = [];
    }
    show(balls) {

        this.proximity(balls);
        noFill();
        stroke(0, 0, 255);
        beginShape();
        for (const p of this.trail) {
            vertex(p.x, p.y);
        }
        endShape();
        noStroke();
        fill(0, 0, 255);
        // stroke(255, 255, 0);
        // fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.r);
    }
    update() {
        this.pos.x += this.vel.x * this.directionx;
        this.pos.y += this.vel.y * this.directiony;
        // this.pos.limit(this.maxSpeed);
        this.trail.push({ x: this.pos.x, y: this.pos.y });
        if (this.trail.length > 50) this.trail.splice(0, 1);
        this.edges();
    }
    edges() {
        // ADD edges of the div
        // const div_bbox = document.getElementById('title-animation').children;
        // for (const child of div_bbox) {
        //     const x = child.getBoundingClientRect().x
        //     const y = child.getBoundingClientRect().y
        //     const w = child.getBoundingClientRect().width;
        //     const h = child.getBoundingClientRect().height;
        //     // child.style.position = 'fixed';
        //     // child.style.float = 'left';
        //     child.style.top = y + 'px';
        //     child.style.left = x + 'px';
        // }
        const div_bbox = document.getElementById('title-animation').getBoundingClientRect();
        const x = div_bbox.x
        const y = div_bbox.y
        const w = div_bbox.width;
        const h = div_bbox.height;
        noFill();
        stroke(0);
        // if(this.pos.x > x && this.pos.y > y && this.pos.y < y + h)this.directionx *= -1;
        // if(this.pos.x < x + w && this.pos.y > y && this.pos.y < y + h)this.directionx *= -1
        // if(this.pos.y > y && this.pos.x > x && this.pos.x < x + w)this.directiony *= -1;
        // if(this.pos.y < y + h && this.pos.x > x && this.pos.x < x + w)this.directiony *= -1;

        if (this.pos.x + this.r / 2 > x &&
            this.pos.y + this.r / 2 > y &&
            this.pos.x - this.r / 2 < x + w &&
            this.pos.y - this.r / 2 < y + h) {
            fill(255, 0, 0, 130);
            // if (this.pos.x < (x + w) || this.pos.x > x) {
            //     this.directiony *= -1;
            // }
            // if (this.pos.y < (y + h) || this.pos.y > y) {
            //     this.directionx *= -1;
            // }
        } else {
            fill(0, 255, 0, 130);
        }

        rect(x, y, w, h);
        if (this.pos.x > width - (this.r / 2) || this.pos.x < this.r / 2) {
            this.directionx *= -1;
        }
        if (this.pos.y > height - (this.r / 2) || this.pos.y < this.r / 2) {
            this.directiony *= -1;
        }
        if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
            this.pos.x = 10;
            this.pos.y = 10;
        }
    }
    proximity(balls) {
        for (const ball of balls) {
            if (ball != this) {
                if (ball.pos.dist(this.pos) < 50) {
                    strokeWeight(2, 50);
                    stroke(255);
                    line(ball.pos.x, ball.pos.y, this.pos.x, this.pos.y);
                    const dir = p5.Vector.sub(this.pos, ball.pos);
                    dir.normalize();

                    this.pos.add(dir);
                }
            }
        }
    }
}