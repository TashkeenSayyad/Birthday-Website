import React, { useEffect, useRef } from 'react';
import '../styles/CursorTrailCanvas.css';

const CursorTrailCanvas = () => {
  const canvasRef = useRef(null);
  const trailsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    setCanvasSize();

    // Trail particle class
    class TrailParticle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 8 + 4;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.01;

        // Rainbow gradient colors
        const colors = [
          { r: 255, g: 182, b: 193 },
          { r: 201, g: 169, b: 224 },
          { r: 155, g: 114, b: 170 },
          { r: 255, g: 209, b: 220 },
          { r: 232, g: 180, b: 160 },
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.95;
        this.vy *= 0.95;
        this.life -= this.decay;
      }

      draw(ctx) {
        if (this.life <= 0) return;

        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );

        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.life * 0.8})`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Add sparkle effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.life * 0.5})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      isDead() {
        return this.life <= 0;
      }
    }

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };

      // Create new trail particles
      for (let i = 0; i < 3; i++) {
        trailsRef.current.push(new TrailParticle(e.clientX, e.clientY));
      }
    };

    // Touch move handler for mobile
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseRef.current = {
          x: touch.clientX,
          y: touch.clientY
        };

        for (let i = 0; i < 2; i++) {
          trailsRef.current.push(new TrailParticle(touch.clientX, touch.clientY));
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw trails
      trailsRef.current = trailsRef.current.filter(trail => {
        trail.update();
        trail.draw(ctx);
        return !trail.isDead();
      });

      // Limit max particles for performance
      if (trailsRef.current.length > 200) {
        trailsRef.current = trailsRef.current.slice(-200);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-trail-canvas" />;
};

export default CursorTrailCanvas;
