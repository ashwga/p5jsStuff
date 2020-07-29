let mover1, mover2;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    stroke(255);
    mover1 = new Mover(width/2, height/2, random(5, 10), 0.5);
    mover2 = new Mover(width/2, height/2, random(2.5, 5), 0.9);
}

function draw() {
    background(0);
    mover1.update();
    mover2.update();
    mover1.show();
    mover2.show();
    let gravity = createVector(0, 0.5);
    mover1.applyForce(gravity);
    mover2.applyForce(gravity);
}

function mousePressed() {
    mover1.applyForce(createVector(1, 0))
    mover2.applyForce(createVector(1, 0))
}

function keyPressed() {
    let upward = createVector(0, -15);
    mover1.applyForce(upward);
    mover2.applyForce(upward);
}

class Mover {
    constructor(x, y, mass, restitution) {
        this.pos = createVector(x, y);
        // this.vel = p5.Vector.random2D();
        this.vel = createVector(0, 0);
        this.vel.mult(random(3));
        this.acc = createVector(0, 0);
        this.restitution = restitution;
        this.mass = mass;
        this.d = this.mass*10;
    }

    applyForce(force) {
        this.acc.add(force);
    }

    edges() {
        if (this.pos.y >= height-this.d/2) {
            this.pos.y = height-this.d/2;
            this.vel.y *= -this.restitution;
        }
        if (this.pos.y <= 0+this.d/2) {
            this.pos.y = 0+this.d/2;
            this.vel.y *= -this.restitution;
        }
        if (this.pos.x >= width-this.d/2) {
            this.pos.x = width-this.d/2;
            this.vel.x *= -this.restitution;
        }
        if (this.pos.x <= 0+this.d/2) {
            this.pos.x = 0+this.d/2;
            this.vel.x *= -this.restitution;
        }
    }

    applyFriction() {
        let diff = height - (this.pos.y+this.d/2);
        if (diff < 1) {
            let friction = this.vel.copy();
            friction.normalize();
            friction.mult(-1);
            let mu = 0.01;
            let normal = this.mass;
            friction.setMag(mu * normal);
            this.applyForce(friction);

        }
    }

    update() {
        this.acc.div(this.mass);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.edges();
        this.applyFriction();
    }

    show() {
        stroke(255);
        fill(255, 127);
        ellipseMode(CENTER);
        ellipse(this.pos.x, this.pos.y, this.d);
    }
}
