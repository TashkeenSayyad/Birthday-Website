import React, { useEffect, useState } from 'react';
import '../styles/FloatingHearts.css';

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💝', '💞', '💓'];
    const initialHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      symbol: heartSymbols[Math.floor(Math.random() * heartSymbols.length)],
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 10,
      size: 0.8 + Math.random() * 0.7
    }));

    setHearts(initialHearts);
  }, []);

  return (
    <div className="floating-hearts-container">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            fontSize: `${heart.size}rem`,
            opacity: 0.3 + Math.random() * 0.3
          }}
        >
          {heart.symbol}
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
