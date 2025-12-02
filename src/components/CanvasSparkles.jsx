import React, { useEffect, useRef } from 'react';
import '../styles/CanvasSparkles.css';

const CanvasSparkles = () => {
  const canvasRef = useRef(null);
  const sparklesRef = useRef([]);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Set canvas size
    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    setCanvasSize();

    // Sparkle class
    class Sparkle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.life = Math.random() * 100 + 50;
        this.maxLife = this.life;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.05;

        // Sparkle colors
        const colors = [
          { r: 255, g: 255, b: 255 }, // White
          { r: 255, g: 240, b: 200 }, // Warm white
          { r: 255, g: 209, b: 220 }, // Blush
          { r: 255, g: 255, b: 230 }, // Light yellow
          { r: 240, g: 230, b: 255 }, // Light purple
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        this.life -= 1;

        if (this.life <= 0) {
          this.reset();
        }
      }

      draw(ctx) {
        const opacity = this.life / this.maxLife;
        const currentSize = this.size * (0.5 + opacity * 0.5);

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Draw sparkle as a four-pointed star
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${opacity * 0.8})`;

        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          const angle = (Math.PI / 2) * i;
          const x1 = Math.cos(angle) * currentSize;
          const y1 = Math.sin(angle) * currentSize;
          const x2 = Math.cos(angle + Math.PI / 4) * (currentSize * 0.3);
          const y2 = Math.sin(angle + Math.PI / 4) * (currentSize * 0.3);

          if (i === 0) {
            ctx.moveTo(x1, y1);
          } else {
            ctx.lineTo(x1, y1);
          }
          ctx.lineTo(x2, y2);
        }
        ctx.closePath();
        ctx.fill();

        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${opacity * 0.6})`;
        ctx.fill();

        ctx.restore();
      }
    }

    // Initialize sparkles
    const initSparkles = () => {
      sparklesRef.current = [];
      const sparkleCount = Math.floor((width * height) / 30000) + 15;

      for (let i = 0; i < sparkleCount; i++) {
        sparklesRef.current.push(new Sparkle());
      }
    };

    initSparkles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw sparkles
      sparklesRef.current.forEach(sparkle => {
        sparkle.update();
        sparkle.draw(ctx);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      setCanvasSize();
      initSparkles();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="canvas-sparkles" />;
};

export default CanvasSparkles;
