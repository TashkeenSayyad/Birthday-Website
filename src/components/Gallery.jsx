import React, { useState, useEffect } from 'react';
import MessageCard from './MessageCard';
import '../styles/Gallery.css';

const Gallery = ({ messages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState('next');

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      handleNext();
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex, messages.length]);

  const handleNext = () => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % messages.length);
  };

  const handlePrevious = () => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + messages.length) % messages.length);
  };

  const goToIndex = (index) => {
    setDirection(index > currentIndex ? 'next' : 'prev');
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="gallery-container">
      <div className="gallery-wrapper">
        <button 
          className="nav-arrow nav-arrow-left" 
          onClick={handlePrevious}
          aria-label="Previous message"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        <div className={`cards-container direction-${direction}`}>
          {messages.map((msg, index) => (
            <MessageCard
            key={msg.id}
            name={msg.name}
            message={msg.message}
            image={msg.image}
            relationship={msg.relationship}
            isActive={index === currentIndex}
            hasSpecialNote={msg.hasSpecialNote}
            specialNotePath={msg.specialNotePath}
          />
          ))}
        </div>

        <button 
          className="nav-arrow nav-arrow-right" 
          onClick={handleNext}
          aria-label="Next message"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      <div className="gallery-progress">
        <div className="progress-info">
          <span className="progress-text">
            Message {currentIndex + 1} of {messages.length}
          </span>
        </div>
        
        <div className="progress-dots">
          {messages.map((_, index) => (
            <button
              key={index}
              className={`progress-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToIndex(index)}
              aria-label={`Go to message ${index + 1}`}
            />
          ))}
        </div>

        <button 
          className="pause-button"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        >
          {isAutoPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16"/>
              <rect x="14" y="4" width="4" height="16"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default Gallery;