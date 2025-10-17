import React from 'react';
import '../styles/Confetti.css';

const Confetti = ({ active }) => {
  if (!active) return null;

  const colors = ['#9b59b6', '#8e44ad', '#e74c3c', '#f39c12', '#3498db', '#e84393'];

  return (
    <div className="confetti-container">
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            animationDuration: `${Math.random() * 2 + 3}s`
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;