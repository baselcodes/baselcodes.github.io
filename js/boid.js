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
// Flocking
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://youtu.be/mhjuuHl6qHM
// https://editor.p5js.org/codingtrain/sketches/ry4XZ8OkN

class Boid {
    constructor() {
        this.boid = random(emojis);
        this.r = floor(random(height / 20, height / 15));
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 4));
        this.acceleration = createVector();
        this.maxForce = 1   ;
        this.maxSpeed = 4;
        this.perceptionRadius = 50;
    }

    edges() {
        if (this.position.x > width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = width;
        }
        if (this.position.y > height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = height;
        }
    }

    align(boids) {
        this.perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && d < this.perceptionRadius) {
                steering.add(other.velocity);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    separation(boids) {
        // this.perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && d < this.perceptionRadius) {
                let diff = p5.Vector.sub(this.position, other.position);
                diff.div(d * d);
                steering.add(diff);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    cohesion(boids) {
        // this.perceptionRadius = 100;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && d < this.perceptionRadius) {
                steering.add(other.position);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.sub(this.position);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    flock(boids) {
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);

        const p1 = {
            x: width * 0.25,
            y: height * 0.5
        }

        const p2 = {
            x: width * 0.5,
            y: height * 0.5
        }

        const p3 = {
            x: width * 0.75,
            y: height * 0.5
        }

        const d1 = dist(mouseX, mouseY, p1.x, p1.y);
        const d2 = dist(mouseX, mouseY, p2.x, p2.y);
        const d3 = dist(mouseX, mouseY, p3.x, p3.y);

        // const user_alig = constrain(map(d1, 0, height / 2, 0, .75), 0, 0.75);
        const user_alig = map(mouseX, 0, width, 0, 2);
        // const user_cohe = constrain(map(d2, 0, height / 2, 0, .75), 0, 0.75);
        const user_cohe = map(mouseY, 0, height, 0, 0.3);
        const user_sep = map(mouseY, 0, height, .5, 2);
        alignment.mult(user_alig);
        // cohesion.mult(1.5);
        separation.mult(user_sep);

        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.mult(0);
    }

    show() {
        textSize(this.r)
        // strokeWeight(this.r);
        // point(this.position.x, this.position.y);
        const angle = this.velocity.heading()
        push();
        translate(this.position.x, this.position.y);
        // rotate(angle + PI/2)
        text(this.boid, 0, 0);
        pop();
    }
}