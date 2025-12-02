import React, { useEffect, useRef } from 'react';
import '../styles/AnimatedGradientWaves.css';

const AnimatedGradientWaves = () => {
  const canvasRef = useRef(null);
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

    // Wave parameters
    const waves = [
      {
        y: height * 0.3,
        length: 0.015,
        amplitude: 60,
        frequency: 0.015,
        color1: 'rgba(255, 209, 220, 0.12)',
        color2: 'rgba(255, 209, 220, 0.02)',
      },
      {
        y: height * 0.5,
        length: 0.01,
        amplitude: 80,
        frequency: 0.012,
        color1: 'rgba(201, 169, 224, 0.15)',
        color2: 'rgba(201, 169, 224, 0.03)',
      },
      {
        y: height * 0.7,
        length: 0.012,
        amplitude: 70,
        frequency: 0.01,
        color1: 'rgba(232, 180, 160, 0.1)',
        color2: 'rgba(232, 180, 160, 0.02)',
      },
      {
        y: height * 0.85,
        length: 0.008,
        amplitude: 90,
        frequency: 0.008,
        color1: 'rgba(255, 154, 139, 0.08)',
        color2: 'rgba(255, 154, 139, 0.01)',
      }
    ];

    let increment = 0;

    // Draw a wave
    const drawWave = (wave, increment) => {
      ctx.beginPath();
      ctx.moveTo(0, height);

      for (let i = 0; i < width; i++) {
        const y = wave.y + Math.sin(i * wave.length + increment) * wave.amplitude;
        ctx.lineTo(i, y);
      }

      ctx.lineTo(width, height);
      ctx.closePath();

      // Create gradient
      const gradient = ctx.createLinearGradient(0, wave.y - wave.amplitude, 0, height);
      gradient.addColorStop(0, wave.color1);
      gradient.addColorStop(1, wave.color2);

      ctx.fillStyle = gradient;
      ctx.fill();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      waves.forEach((wave, index) => {
        drawWave(wave, increment + index * 0.5);
      });

      increment += 0.02;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      setCanvasSize();
      // Update wave y positions based on new height
      waves.forEach(wave => {
        const ratio = wave.y / height;
        wave.y = window.innerHeight * ratio;
      });
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

  return <canvas ref={canvasRef} className="animated-gradient-waves" />;
};

export default AnimatedGradientWaves;
