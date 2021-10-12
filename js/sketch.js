let cnv;
let bballs = [];
function setup() {
  cnv = createCanvas(innerWidth, innerHeight);
  cnv.parent('p5');
  bballs = [new Bounce_Ball(50, 50, 100, '#f00'), new Bounce_Ball(200, 200, 100, '#f00')]
}
function draw() {
  background('#eee')
  for (const bball of bballs) {
    bball.update();
    // bball.collide(bballs)
    bball.show();
  }
  resolve_collision_2(bballs[0], bballs[1]);
}

function resolve_collision_2(a, b) {
  // Check whether there actually was a collision
  if (a == b) return;

  let collision = p5.Vector.sub(a.pos, b.pos);
  let distance = collision.mag();
  console.log(distance);
  if (distance == 0.0) {              // hack to avoid div by zero
    collision = createVector(1.0, 0.0);
    distance = 1.0;
  }

  const d = p5.Vector.dist(a.pos, b.pos)
  if (d >= (a.r / 2) + (b.r / 2)) {
      console.log('no collision');
      return;
    }

    // Get the components of the velocity vectors which are parallel to the collision.
    // The perpendicular component remains the same for both fish
    collision = collision.div(distance);
    console.log(collision);
    const aci = a.vel.dot(collision);
    const bci = b.vel.dot(collision);
    console.log(aci, bci);
    // Solve for the new velocities using the 1-dimensional elastic collision equations.
    // Turns out it's really simple when the masses are the same.
    const acf = bci;
    const bcf = aci;

    // Replace the collision velocity components with the new ones
    a.vel += (acf - aci) * collision;
    b.vel += (bcf - bci) * collision;
  }

  function windowResized() {
    resizeCanvas(innerWidth, innerHeight);
  }

  class Bounce_Ball {
    constructor(x, y, _r, col) {
      this.pos = createVector(x, y);
      this.speed = 7;
      this.vel = createVector(random(-this.speed, this.speed), random(-this.speed, this.speed));
      this.r = _r;
      this.col = col;
    }

    update() {
      this.edge();
      // this.nudge();
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
    collide(bballs) {
      for (const bball of bballs) {
        if (bball !== this) {
          const d = p5.Vector.dist(bball.pos, this.pos)
          if (d <= (this.r / 2) + (bball.r / 2)) {
            this.resolve_collision(bball);
            // // console.log('collision');
            // const angle_1 = this.pos.angleBetween(bball.pos);
            // // console.log(angle_1);
            // const v1 = p5.Vector.fromAngle(angle_1);
            // this.vel.x = v1.x * -1;
            // this.vel.y = v1.y * -1;
            // const angle_2 = bball.pos.angleBetween(this.pos);
            // // console.log(angle_2);
            // const v2 = p5.Vector.fromAngle(angle_2);
            // bball.vel.x = v2.x * -1;
            // bball.vel.y = v2.y * -1;
            // // this.vel.x *= -1;
            // // this.vel.y *= -1;
          }

        }
      }
    }

    resolve_collision(ball) {
      // get the mtd
      const delta = (this.pos.sub(ball.pos));
      const d = delta.mag();
      // minimum translation distance to push balls apart after intersecting
      const mtd = delta.mult(((this.r + ball.r) - d) / d);


      // resolve intersection --
      // inverse mass quantities
      const im1 = 1;/// (this.r / 3); 
      const im2 = 1;/// (ball.r / 3);

      // push-pull them apart based off their mass
      this.pos = this.pos.add(mtd.mult(im1 / (im1 + im2)));
      ball.pos = ball.pos.sub(mtd.mult(im2 / (im1 + im2)));

      // impact speed
      const v = (this.vel.sub(ball.vel));
      const vn = v.dot(mtd.normalize());

      // sphere intersecting but moving away from each other already
      if (vn > 0.0) return;

      // collision impulse
      const i = -(vn) / (im1 + im2);
      const impulse = mtd.normalize().mult(i);

      // change in momentum
      this.vel = this.vel.add(impulse.mult(im1));
      ball.vel = ball.vel.sub(impulse.mult(im2));

    }



    show() {
      // noFill();
      noStroke();
      fill(this.col);
      ellipse(this.pos.x, this.pos.y, this.r);
    }
}
