import React from 'react';
import '../styles/Sparkles.css';

const Sparkles = ({ active }) => {
  if (!active) return null;

  return (
    <div className="sparkles-container">
      {[...Array(60)].map((_, i) => (
        <div
          key={i}
          className="sparkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${Math.random() * 1 + 2}s`
          }}
        />
      ))}
    </div>
  );
};

export default Sparkles;