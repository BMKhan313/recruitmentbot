// import React, { Component } from "react";

// import p5 from 'p5';

// const particles = [];
// function setup() {
//         // console.log("setup")
//         p5.createCanvas(window.innerWidth,window.innerHeight);
//         // p = new Particle();
//         const particlesLength = Math.min(Math.floor(window.innerWidth / 10),100);
    
//         for(let i=0;i<particlesLength;i++){
//             particles.push(new Particle());
//         }
    
//     }

// function draw() {
//     p5.background(55, 100, 144)
//     // p.update();
//     // p.draw();

//     particles.forEach((p,index)=>{
//         p.update();
//         p.draw();
//         p.checkParticles(particles.slice(index));
//     })

//     // console.log("draw")
//     // fill(0) // black color
//     // if(mouseIsPressed){
//     // mouseX mouseY
//     // }

//     // circle(mouseX,mouseY,80);
// }

// class Particle extends Component {

//     componentDidMount() {
        
//     }
    
//     // P5 has built in width & height
//     constructor(){
//         // Position
//         this.pos = p5.createVector(Math.random(p5.width),Math.random(p5.height));
//         // Velocity
//         this.vel = p5.createVector(Math.random(-2,2), Math.random(-2,2));
//         // Size
//         this.size = 10;
//     }

//     // Update movement by adding velocity
//     update() {
//         this.pos.add(this.vel);
//         this.edges();
//     }

//     // Draw single particle
//     draw(){
//         p5.noStroke();
//         p5.fill('rgba(255,255,255,0.5)');
//         p5.circle(this.pos.x, this.pos.y, this.size);
//     }

//     // Detect Edges
//     edges(){
//         if(this.pos.x < 0 || this.pos.x > p5.width){
//             this.vel.x *= -1;
//         }

//         if(this.pos.y < 0 || this.pos.y > p5.height){
//             this.vel.y *= -1;
//         }
//     }

//     // Connect Particles
//     checkParticles(particles) {
//         particles.forEach(particle => {
//             const d = p5.dist(this.pos.x,this.pos.y,particle.pos.x,particle.pos.y);
//             if(d < 120){
//                 const alpha = p5.map(d, 0, 120, 0, 0.25)
// 				p5.stroke(`rgba(255, 255, 255, ${alpha})`);
//                 p5.line(this.pos.x,this.pos.y,particle.pos.x,particle.pos.y);
//             }
//         })
//     }

//     render(){
//         return(
//             <div className="">
//                 {this.setup()}
//             </div>
//         )
//     }
// }

// export default Particle