import React, { useEffect, useRef } from 'react';
import '../styles/LightRaysCanvas.css';

const LightRaysCanvas = () => {
  const canvasRef = useRef(null);
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

    // Light ray parameters
    const rays = [];
    const rayCount = 8;

    // Initialize light rays
    for (let i = 0; i < rayCount; i++) {
      rays.push({
        angle: (Math.PI * 2 / rayCount) * i,
        length: Math.max(width, height) * 1.5,
        width: Math.random() * 80 + 60,
        speed: Math.random() * 0.001 + 0.0005,
        opacity: Math.random() * 0.08 + 0.03,
        color: i % 2 === 0 ?
          { r: 255, g: 209, b: 220 } :
          { r: 201, g: 169, b: 224 }
      });
    }

    let rotation = 0;

    // Draw a light ray
    const drawRay = (ray, centerX, centerY) => {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(ray.angle + rotation);

      const gradient = ctx.createLinearGradient(0, -ray.width / 2, ray.length, ray.width / 2);
      gradient.addColorStop(0, `rgba(${ray.color.r}, ${ray.color.g}, ${ray.color.b}, ${ray.opacity})`);
      gradient.addColorStop(0.5, `rgba(${ray.color.r}, ${ray.color.g}, ${ray.color.b}, ${ray.opacity * 0.5})`);
      gradient.addColorStop(1, `rgba(${ray.color.r}, ${ray.color.g}, ${ray.color.b}, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(0, -ray.width / 2);
      ctx.lineTo(ray.length, -ray.width / 4);
      ctx.lineTo(ray.length, ray.width / 4);
      ctx.lineTo(0, ray.width / 2);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw all rays
      rays.forEach(ray => {
        drawRay(ray, centerX, centerY);
      });

      // Slow rotation
      rotation += 0.0003;

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      setCanvasSize();
      rays.forEach(ray => {
        ray.length = Math.max(window.innerWidth, window.innerHeight) * 1.5;
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="light-rays-canvas" />;
};

export default LightRaysCanvas;
