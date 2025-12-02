import React, { useEffect, useRef } from 'react';
import '../styles/GentleSparklesCanvas.css';

const GentleSparklesCanvas = () => {
  const canvasRef = useRef(null);
  const sparklesRef = useRef([]);
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

    // Gentle sparkle class
    class GentleSparkle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.life = Math.random() * 200 + 100;
        this.maxLife = this.life;
        this.twinkleSpeed = Math.random() * 0.02 + 0.01;
        this.phase = Math.random() * Math.PI * 2;

        // Soft pastel colors
        const colors = [
          { r: 255, g: 240, b: 245 }, // Very light pink
          { r: 255, g: 250, b: 240 }, // Cream
          { r: 245, g: 240, b: 255 }, // Very light lavender
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.life -= 0.5;
        this.phase += this.twinkleSpeed;

        if (this.life <= 0) {
          this.reset();
        }
      }

      draw(ctx) {
        const lifeRatio = this.life / this.maxLife;
        const twinkle = (Math.sin(this.phase) + 1) / 2; // 0 to 1
        const opacity = lifeRatio * twinkle * 0.3;

        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${opacity * 0.5})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Initialize sparkles
    const initSparkles = () => {
      sparklesRef.current = [];
      const sparkleCount = Math.floor((width * height) / 50000) + 10;

      for (let i = 0; i < sparkleCount; i++) {
        sparklesRef.current.push(new GentleSparkle());
      }
    };

    initSparkles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      sparklesRef.current.forEach(sparkle => {
        sparkle.update();
        sparkle.draw(ctx);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      setCanvasSize();
      initSparkles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="gentle-sparkles-canvas" />;
};

export default GentleSparklesCanvas;
