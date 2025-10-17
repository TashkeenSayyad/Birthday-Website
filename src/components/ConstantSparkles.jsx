import React, { useEffect, useState } from 'react';
import '../styles/ConstantSparkles.css';

const ConstantSparkles = () => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    // Create initial sparkles with better distribution
    const initialSparkles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 2 + 3.5
    }));
    setSparkles(initialSparkles);

    // Add new sparkles more gradually
    const interval = setInterval(() => {
      setSparkles(prev => {
        const newSparkle = {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          top: Math.random() * 100,
          delay: 0,
          duration: Math.random() * 2 + 3.5
        };
        // Keep only last 25 sparkles for performance
        return [...prev.slice(-24), newSparkle];
      });
    }, 300); // Slower generation = smoother

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="constant-sparkles-container">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="constant-sparkle"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`
          }}
        />
      ))}
    </div>
  );
};

export default ConstantSparkles;