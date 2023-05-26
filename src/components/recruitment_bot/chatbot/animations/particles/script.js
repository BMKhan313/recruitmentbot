let p;
const particles = [];

function setup() {
    // console.log("setup")
    createCanvas(window.innerWidth,window.innerHeight);
    // p = new Particle();
    const particlesLength = Math.min(Math.floor(window.innerWidth / 10),100);

    for(let i=0;i<particlesLength;i++){
        particles.push(new Particle());
    }

}

function draw() {
    background(55, 100, 144)
    // p.update();
    // p.draw();

    particles.forEach((p,index)=>{
        p.update();
        p.draw();
        p.checkParticles(particles.slice(index));
    })

    // console.log("draw")
    // fill(0) // black color
    // if(mouseIsPressed){
    // mouseX mouseY
    // }

    // circle(mouseX,mouseY,80);
}

class Particle {
    // P5 has built in width & height
    constructor(){
        // Position
        this.pos = createVector(random(width),random(height));
        // Velocity
        this.vel = createVector(random(-2,2), random(-2,2));
        // Size
        this.size = 10;
    }

    // Update movement by adding velocity
    update() {
        this.pos.add(this.vel);
        this.edges();
    }

    // Draw single particle
    draw(){
        noStroke();
        fill('rgba(255,255,255,0.5)');
        circle(this.pos.x, this.pos.y, this.size);
    }

    // Detect Edges
    edges(){
        if(this.pos.x < 0 || this.pos.x > width){
            this.vel.x *= -1;
        }

        if(this.pos.y < 0 || this.pos.y > height){
            this.vel.y *= -1;
        }
    }

    // Connect Particles
    checkParticles(particles) {
        particles.forEach(particle => {
            const d = dist(this.pos.x,this.pos.y,particle.pos.x,particle.pos.y);
            if(d < 120){
                const alpha = map(d, 0, 120, 0, 0.25)
				stroke(`rgba(255, 255, 255, ${alpha})`);
                line(this.pos.x,this.pos.y,particle.pos.x,particle.pos.y);
            }
        })
    }
}
