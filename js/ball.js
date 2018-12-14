const emojis = [
    '🧙‍♀️', // red 
    '🧙‍♂️',
    '🧝‍♀️',
    '🧝‍♂️',
    '🧛‍♀️',
    '🧛‍♂️',
    '🧚‍♀️',
    '🧚‍♂️',
    '🦑',
    '🦐',
    '🐡',
    '🦕',
    '🦚',
    '🐿',
    '🦄',
]
class Personaggino {
    constructor() {
        this.personaggino = random(emojis);
        this.pos = createVector(random(width), random(height));
        this.rvel = 2;
        this.vel = createVector(random(-this.rvel, this.rvel), random(-this.rvel, this.rvel));
        this.r = floor(random(15, 30));
        this.directionx = 1;
        this.directiony = 1;
        this.maxSpeed = 50;
        this.trail = [];
    }
    show(personaggini) {

        textSize(this.r);
        this.proximity(personaggini);
        noFill();
        stroke(0, 0, 255);
        push();
        translate(this.pos.x, this.pos.y)
        text(this.personaggino, 0, 0);
        pop();
        //beginShape();
        // for (const p of this.trail) {
        //     //vertex(p.x, p.y);
        // }
        //endShape();
        // noStroke();
        // fill(0, 0, 255);
        // stroke(255, 255, 0);
        // fill(this.color);
        //ellipse(this.pos.x, this.pos.y, this.r);
    }
    update() {
        this.pos.x += this.vel.x * this.directionx;
        this.pos.y += this.vel.y * this.directiony;
        // this.pos.limit(this.maxSpeed);
        // this.trail.push({x: this.pos.x, y: this.pos.y});
        // if(this.trail.length > 50)this.trail.splice(0, 1);
        this.edges();
    }
    edges() {
        if (this.pos.x > width - (this.r / 2) || this.pos.x <  this.r / 2) {
            this.directionx *= -1;

        }
        if (this.pos.y > height - (this.r / 2) || this.pos.y < this.r / 2) {
            this.directiony *= -1;
        }
    }
    proximity(personaggini) {
        for (const personaggino of personaggini) {
            if (personaggino != this) {
                if (personaggino.pos.dist(this.pos) < 50) {
                    strokeWeight(2, 50);
                    stroke(255);
                    line(personaggino.pos.x, personaggino.pos.y, this.pos.x, this.pos.y);
                    const dir = p5.Vector.sub(this.pos, personaggino.pos);
                    dir.normalize();
                    if(this.r < 50)
                        this.r += .1;
                    this.pos.add(dir);
                }
            }
        }
    }
}