import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const HeartFlowField = ({ seed = 54321, particleCount = 500 }) => {
  const canvasRef = useRef(null);
  const p5InstanceRef = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      let particles = [];
      let time = 0;

      class HeartParticle {
        constructor() {
          // Start particles from the center
          this.reset();
          this.hue = p.random(280, 340); // Purple to pink
          this.saturation = p.random(60, 100);
          this.brightness = p.random(80, 100);
          this.alpha = p.random(40, 100);
          this.size = p.random(2, 6);
          this.speed = p.random(0.5, 2);
        }

        reset() {
          let angle = p.random(p.TWO_PI);
          let radius = p.random(0, 50);
          this.pos = p.createVector(
            p.width / 2 + p.cos(angle) * radius,
            p.height / 2 + p.sin(angle) * radius
          );
          this.vel = p.createVector(0, 0);
          this.acc = p.createVector(0, 0);
          this.life = 255;
        }

        update() {
          // Move towards heart shape
          let target = this.getHeartTarget();
          let force = p5.Vector.sub(target, this.pos);
          force.setMag(0.1);
          this.acc.add(force);

          // Add some organic movement
          let noise = p.createVector(
            p.noise(this.pos.x * 0.01, this.pos.y * 0.01, time) - 0.5,
            p.noise(this.pos.x * 0.01 + 100, this.pos.y * 0.01, time) - 0.5
          );
          noise.mult(0.5);
          this.acc.add(noise);

          this.vel.add(this.acc);
          this.vel.limit(this.speed);
          this.pos.add(this.vel);
          this.acc.mult(0);

          this.life -= 0.3;

          // Reset if life is over or out of bounds
          if (this.life <= 0 || this.isOutOfBounds()) {
            this.reset();
          }
        }

        getHeartTarget() {
          // Heart shape parametric equation
          let t = p.noise(this.pos.x * 0.001, this.pos.y * 0.001, time * 0.5) * p.TWO_PI;
          let scale = 15;

          let x = scale * (16 * Math.pow(p.sin(t), 3));
          let y = -scale * (13 * p.cos(t) - 5 * p.cos(2 * t) - 2 * p.cos(3 * t) - p.cos(4 * t));

          return p.createVector(
            p.width / 2 + x + p.noise(time) * 20,
            p.height / 2 + y + p.noise(time + 100) * 20
          );
        }

        isOutOfBounds() {
          return (
            this.pos.x < -100 ||
            this.pos.x > p.width + 100 ||
            this.pos.y < -100 ||
            this.pos.y > p.height + 100
          );
        }

        show() {
          let alpha = this.alpha * (this.life / 255);
          p.noStroke();
          p.fill(this.hue, this.saturation, this.brightness, alpha);

          // Draw glowing particle
          for (let i = 3; i > 0; i--) {
            p.fill(this.hue, this.saturation, this.brightness, alpha / (i * 2));
            p.circle(this.pos.x, this.pos.y, this.size * i);
          }
        }
      }

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent(canvasRef.current);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.background(0, 0, 0, 0);

        p.randomSeed(seed);
        p.noiseSeed(seed);

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
          particles.push(new HeartParticle());
        }
      };

      p.draw = () => {
        // Clear with slight transparency for trails
        p.background(0, 0, 100, 5);

        // Draw subtle heart outline
        drawHeartOutline();

        // Update and display particles
        for (let particle of particles) {
          particle.update();
          particle.show();
        }

        time += 0.01;
      };

      const drawHeartOutline = () => {
        p.noFill();
        p.stroke(320, 80, 90, 15);
        p.strokeWeight(3);
        p.beginShape();

        for (let a = 0; a < p.TWO_PI; a += 0.01) {
          let scale = 15 + p.sin(time * 2) * 2;
          let x = scale * (16 * Math.pow(p.sin(a), 3));
          let y = -scale * (13 * p.cos(a) - 5 * p.cos(2 * a) - 2 * p.cos(3 * a) - p.cos(4 * a));

          p.vertex(p.width / 2 + x, p.height / 2 + y);
        }

        p.endShape(p.CLOSE);
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    };

    p5InstanceRef.current = new p5(sketch);

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
      }
    };
  }, [seed, particleCount]);

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
        opacity: 0.4
      }}
    />
  );
};

export default HeartFlowField;
