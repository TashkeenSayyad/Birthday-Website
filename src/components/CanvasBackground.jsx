import React, { useEffect, useRef } from 'react';
import '../styles/CanvasBackground.css';

const CanvasBackground = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const orbsRef = useRef([]);
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

    // Particle class
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;

        // Romantic color palette
        const colors = [
          { r: 232, g: 180, b: 160 }, // Rose gold
          { r: 255, g: 209, b: 220 }, // Blush
          { r: 201, g: 169, b: 224 }, // Lavender
          { r: 155, g: 114, b: 170 }, // Mauve
          { r: 213, g: 81, b: 107 },  // Deep rose
          { r: 255, g: 154, b: 139 }, // Sunset
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(ctx) {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius * 2
        );
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Orb class for larger floating gradient orbs
    class Orb {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 80 + 40;
        this.opacity = Math.random() * 0.15 + 0.05;
        this.hue = Math.random() * 60 + 300; // Pink to purple hues
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulsePhase += this.pulseSpeed;

        // Bounce off edges
        if (this.x < -this.radius || this.x > width + this.radius) this.vx *= -1;
        if (this.y < -this.radius || this.y > height + this.radius) this.vy *= -1;
      }

      draw(ctx) {
        const pulse = Math.sin(this.pulsePhase) * 0.3 + 1;
        const currentRadius = this.radius * pulse;

        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, currentRadius
        );

        // Beautiful gradient colors
        gradient.addColorStop(0, `hsla(${this.hue}, 70%, 75%, ${this.opacity * pulse})`);
        gradient.addColorStop(0.5, `hsla(${this.hue + 20}, 65%, 70%, ${this.opacity * 0.6 * pulse})`);
        gradient.addColorStop(1, `hsla(${this.hue + 40}, 60%, 65%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles and orbs
    const initParticles = () => {
      particlesRef.current = [];
      orbsRef.current = [];

      // Create particles
      const particleCount = Math.floor((width * height) / 15000);
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle());
      }

      // Create orbs
      const orbCount = Math.floor((width * height) / 100000) + 3;
      for (let i = 0; i < orbCount; i++) {
        orbsRef.current.push(new Orb());
      }
    };

    initParticles();

    // Draw connecting lines between nearby particles
    const drawConnections = () => {
      const maxDistance = 120;
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.15;
            ctx.strokeStyle = `rgba(201, 169, 224, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      // Clear canvas with slight trail effect
      ctx.fillStyle = 'rgba(255, 248, 231, 0.05)';
      ctx.fillRect(0, 0, width, height);

      // Draw and update orbs (background layer)
      orbsRef.current.forEach(orb => {
        orb.update();
        orb.draw(ctx);
      });

      // Draw connections
      drawConnections();

      // Draw and update particles
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      setCanvasSize();
      initParticles();
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

  return <canvas ref={canvasRef} className="canvas-background" />;
};

export default CanvasBackground;
