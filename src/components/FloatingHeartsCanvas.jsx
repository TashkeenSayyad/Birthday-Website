import React, { useEffect, useRef } from 'react';
import '../styles/FloatingHeartsCanvas.css';

const FloatingHeartsCanvas = () => {
  const canvasRef = useRef(null);
  const heartsRef = useRef([]);
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

    // Heart class with beautiful animation
    class Heart {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100;
        this.size = Math.random() * 30 + 15;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = -(Math.random() * 2 + 1.5);
        this.opacity = Math.random() * 0.6 + 0.2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.03;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.05 + 0.02;

        // Beautiful pink and rose colors
        const colors = [
          { r: 255, g: 182, b: 193 }, // Light pink
          { r: 255, g: 105, b: 180 }, // Hot pink
          { r: 219, g: 112, b: 147 }, // Pale violet red
          { r: 255, g: 192, b: 203 }, // Pink
          { r: 233, g: 30, b: 140 },  // Deep pink
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        this.pulsePhase += this.pulseSpeed;

        // Slight sideways drift
        this.x += Math.sin(this.y / 50) * 0.5;

        // Reset if off screen
        if (this.y < -this.size * 2 || this.x < -this.size || this.x > width + this.size) {
          this.reset();
        }
      }

      draw(ctx) {
        const pulse = Math.sin(this.pulsePhase) * 0.2 + 1;
        const currentSize = this.size * pulse;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.scale(currentSize / 40, currentSize / 40);

        // Draw heart shape
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;

        ctx.beginPath();
        ctx.moveTo(0, 10);
        ctx.bezierCurveTo(-20, -10, -40, 0, -20, 20);
        ctx.bezierCurveTo(-20, 30, 0, 40, 0, 40);
        ctx.bezierCurveTo(0, 40, 20, 30, 20, 20);
        ctx.bezierCurveTo(40, 0, 20, -10, 0, 10);
        ctx.closePath();
        ctx.fill();

        // Add glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 0.8})`;
        ctx.fill();

        ctx.restore();
      }
    }

    // Initialize hearts
    const initHearts = () => {
      heartsRef.current = [];
      const heartCount = Math.floor((width * height) / 50000) + 8;

      for (let i = 0; i < heartCount; i++) {
        heartsRef.current.push(new Heart());
      }
    };

    initHearts();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      heartsRef.current.forEach(heart => {
        heart.update();
        heart.draw(ctx);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      setCanvasSize();
      initHearts();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="floating-hearts-canvas" />;
};

export default FloatingHeartsCanvas;
