import React from 'react';
import '../styles/FloatingParticles.css';

const FloatingParticles = () => {
  return (
    <div className="floating-particles">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${Math.random() * 20 + 20}s`
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;