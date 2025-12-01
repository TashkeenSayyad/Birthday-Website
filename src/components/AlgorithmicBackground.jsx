import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const AlgorithmicBackground = ({ seed = 12345, intensity = 0.5 }) => {
  const canvasRef = useRef(null);
  const p5InstanceRef = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      let particles = [];
      let flowField = [];
      let cols, rows;
      let scl = 30;
      let zoff = 0;
      let time = 0;

      class Particle {
        constructor() {
          this.pos = p.createVector(p.random(p.width), p.random(p.height));
          this.vel = p.createVector(0, 0);
          this.acc = p.createVector(0, 0);
          this.maxSpeed = 2;
          this.h = p.random(280, 340); // Purple to pink hue range
          this.alpha = p.random(30, 80) * intensity;
          this.size = p.random(1, 3);
          this.life = p.random(100, 255);
        }

        update() {
          this.vel.add(this.acc);
          this.vel.limit(this.maxSpeed);
          this.pos.add(this.vel);
          this.acc.mult(0);

          // Fade out slowly
          this.life -= 0.2;

          // Wrap around edges
          if (this.pos.x > p.width) this.pos.x = 0;
          if (this.pos.x < 0) this.pos.x = p.width;
          if (this.pos.y > p.height) this.pos.y = 0;
          if (this.pos.y < 0) this.pos.y = p.height;

          // Reset if life is over
          if (this.life <= 0) {
            this.pos = p.createVector(p.random(p.width), p.random(p.height));
            this.life = p.random(100, 255);
          }
        }

        follow(vectors) {
          let x = Math.floor(this.pos.x / scl);
          let y = Math.floor(this.pos.y / scl);
          let index = x + y * cols;
          let force = vectors[index];
          if (force) {
            this.applyForce(force);
          }
        }

        applyForce(force) {
          this.acc.add(force);
        }

        show() {
          p.stroke(this.h, 80, 100, this.alpha * (this.life / 255));
          p.strokeWeight(this.size);
          p.point(this.pos.x, this.pos.y);
        }

        edges() {
          if (this.pos.x > p.width) {
            this.pos.x = 0;
            this.updatePrev();
          }
          if (this.pos.x < 0) {
            this.pos.x = p.width;
            this.updatePrev();
          }
          if (this.pos.y > p.height) {
            this.pos.y = 0;
            this.updatePrev();
          }
          if (this.pos.y < 0) {
            this.pos.y = p.height;
            this.updatePrev();
          }
        }
      }

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent(canvasRef.current);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.background(0, 0, 100, 0);

        // Seed random for reproducibility
        p.randomSeed(seed);
        p.noiseSeed(seed);

        cols = Math.floor(p.width / scl);
        rows = Math.floor(p.height / scl);

        // Initialize particles
        for (let i = 0; i < 800 * intensity; i++) {
          particles.push(new Particle());
        }

        // Initialize flow field
        flowField = new Array(cols * rows);
      };

      p.draw = () => {
        // Semi-transparent background for trail effect
        p.background(0, 0, 100, 3);

        let yoff = 0;
        for (let y = 0; y < rows; y++) {
          let xoff = 0;
          for (let x = 0; x < cols; x++) {
            let index = x + y * cols;

            // Create flowing pattern using Perlin noise
            let angle = p.noise(xoff, yoff, zoff) * p.TWO_PI * 4;
            let v = p5.Vector.fromAngle(angle);
            v.setMag(0.5);
            flowField[index] = v;

            xoff += 0.1;
          }
          yoff += 0.1;
        }
        zoff += 0.003;

        // Update and display particles
        for (let particle of particles) {
          particle.follow(flowField);
          particle.update();
          particle.show();
          particle.edges();
        }

        // Add subtle wave patterns
        drawWaves();

        time += 0.01;
      };

      const drawWaves = () => {
        p.noFill();
        for (let i = 0; i < 3; i++) {
          p.stroke(300 + i * 20, 70, 90, 5);
          p.strokeWeight(2);
          p.beginShape();
          for (let x = 0; x < p.width; x += 10) {
            let y = p.height / 2 +
                    p.sin(x * 0.01 + time + i * 2) * 50 * (i + 1) +
                    p.sin(x * 0.02 + time * 2 + i) * 30;
            p.vertex(x, y);
          }
          p.endShape();
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        cols = Math.floor(p.width / scl);
        rows = Math.floor(p.height / scl);
        flowField = new Array(cols * rows);
      };
    };

    p5InstanceRef.current = new p5(sketch);

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
      }
    };
  }, [seed, intensity]);

  return (
    <div
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.6
      }}
    />
  );
};

export default AlgorithmicBackground;
