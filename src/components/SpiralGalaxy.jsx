import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const SpiralGalaxy = ({ seed = 99999, interactive = true }) => {
  const canvasRef = useRef(null);
  const p5InstanceRef = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      let particles = [];
      let spirals = [];
      let time = 0;
      let mouseInfluence = { x: 0, y: 0 };

      class SpiralParticle {
        constructor(spiralIndex) {
          this.spiralIndex = spiralIndex;
          this.angle = p.random(p.TWO_PI);
          this.radius = p.random(10, 300);
          this.speed = p.random(0.001, 0.003);
          this.size = p.random(1, 4);
          this.hue = p.map(this.radius, 10, 300, 280, 340);
          this.saturation = p.random(70, 100);
          this.brightness = p.random(80, 100);
          this.alpha = p.map(this.radius, 10, 300, 80, 30);
          this.z = p.random(-50, 50);
        }

        update(centerX, centerY) {
          this.angle += this.speed;
          this.radius += p.sin(time + this.angle) * 0.1;

          // Add mouse interaction
          if (interactive) {
            let dx = mouseInfluence.x - centerX;
            let dy = mouseInfluence.y - centerY;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200) {
              let force = p.map(dist, 0, 200, 0.02, 0);
              this.angle += force;
            }
          }

          // Keep radius in bounds
          if (this.radius < 10) this.radius = 10;
          if (this.radius > 300) this.radius = 300;
        }

        show(centerX, centerY) {
          let x = centerX + p.cos(this.angle) * this.radius;
          let y = centerY + p.sin(this.angle) * this.radius;

          // Add perspective
          let scale = p.map(this.z, -50, 50, 0.5, 1.5);

          p.noStroke();

          // Draw glow
          for (let i = 3; i > 0; i--) {
            let alpha = (this.alpha / (i * 2)) * scale;
            p.fill(this.hue, this.saturation, this.brightness, alpha);
            p.circle(x, y, this.size * i * scale);
          }
        }
      }

      class Spiral {
        constructor(x, y) {
          this.x = x;
          this.y = y;
          this.rotation = 0;
          this.rotationSpeed = p.random(-0.002, 0.002);
        }

        update() {
          this.rotation += this.rotationSpeed;

          // Gentle floating motion
          this.x += p.sin(time * 0.5) * 0.5;
          this.y += p.cos(time * 0.3) * 0.5;

          // Keep spirals on screen
          if (this.x < 0) this.x = p.width;
          if (this.x > p.width) this.x = 0;
          if (this.y < 0) this.y = p.height;
          if (this.y > p.height) this.y = 0;
        }
      }

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent(canvasRef.current);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.background(0, 0, 100, 0);

        p.randomSeed(seed);
        p.noiseSeed(seed);

        // Create spirals
        let spiralCount = p.width > 768 ? 3 : 2;
        for (let i = 0; i < spiralCount; i++) {
          spirals.push(
            new Spiral(
              p.random(p.width * 0.2, p.width * 0.8),
              p.random(p.height * 0.2, p.height * 0.8)
            )
          );
        }

        // Create particles for each spiral
        let particlesPerSpiral = p.width > 768 ? 200 : 150;
        for (let i = 0; i < spirals.length; i++) {
          for (let j = 0; j < particlesPerSpiral; j++) {
            particles.push(new SpiralParticle(i));
          }
        }
      };

      p.draw = () => {
        // Clear background with transparency for trail effect
        p.background(0, 0, 100, 8);

        // Update mouse influence
        if (interactive && p.mouseX > 0 && p.mouseY > 0) {
          mouseInfluence.x = p.lerp(mouseInfluence.x, p.mouseX, 0.1);
          mouseInfluence.y = p.lerp(mouseInfluence.y, p.mouseY, 0.1);
        }

        // Update and draw spirals with particles
        spirals.forEach((spiral, index) => {
          spiral.update();

          // Draw connecting lines between nearby particles
          p.stroke(300, 50, 90, 3);
          p.strokeWeight(0.5);

          particles
            .filter(p => p.spiralIndex === index)
            .forEach(particle => {
              particle.update(spiral.x, spiral.y);
              particle.show(spiral.x, spiral.y);
            });
        });

        // Draw connecting energy between spirals
        if (spirals.length > 1) {
          p.stroke(320, 60, 90, 10);
          p.strokeWeight(2);
          for (let i = 0; i < spirals.length - 1; i++) {
            let s1 = spirals[i];
            let s2 = spirals[i + 1];
            p.line(s1.x, s1.y, s2.x, s2.y);
          }
        }

        time += 0.01;
      };

      if (interactive) {
        p.mouseMoved = () => {
          mouseInfluence.x = p.mouseX;
          mouseInfluence.y = p.mouseY;
          return false;
        };
      }

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
  }, [seed, interactive]);

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
        pointerEvents: interactive ? 'auto' : 'none',
        opacity: 0.5
      }}
    />
  );
};

export default SpiralGalaxy;
