import React, { useState, useEffect, useRef } from 'react';
import FloatingParticles from '../components/FloatingParticles';
import timelineData from '../data/timeline.json';
import '../styles/TimelinePage.css';

const TimelinePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [timeline, setTimeline] = useState([]);
  const autoPlayRef = useRef(null);

  useEffect(() => {
    setTimeline(timelineData);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && timeline.length > 0) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % timeline.length);
      }, 4000); // Change slide every 4 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, timeline.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false); // Pause auto-play when manually navigating

    // Resume auto-play after 10 seconds
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? timeline.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % timeline.length;
    goToSlide(newIndex);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  if (timeline.length === 0) {
    return (
      <>
        <FloatingParticles />
        <div className="app-content">
          <div className="timeline-loading">Loading timeline...</div>
        </div>
      </>
    );
  }

  const currentEvent = timeline[currentIndex];

  return (
    <>
      <FloatingParticles />
      <div className="app-content timeline-content">
        <header className="app-header">
          <h1 className="main-title">Journey Through Time</h1>
          <div className="title-decoration"></div>
          <p className="subtitle-text">A beautiful timeline of cherished moments</p>
        </header>

        <div className="timeline-container">
          {/* Timeline slider */}
          <div className="timeline-slider">
            <button
              className="timeline-nav-button prev"
              onClick={goToPrevious}
              aria-label="Previous slide"
            >
              ‹
            </button>

            <div className="timeline-track">
              {timeline.map((event, index) => {
                const offset = index - currentIndex;
                const isActive = index === currentIndex;

                return (
                  <div
                    key={event.id}
                    className={`timeline-item ${isActive ? 'active' : ''}`}
                    style={{
                      transform: `translateX(${offset * 100}%) scale(${isActive ? 1 : 0.7})`,
                      opacity: Math.abs(offset) > 2 ? 0 : 1,
                      zIndex: isActive ? 10 : 1,
                    }}
                    onClick={() => goToSlide(index)}
                  >
                    <div className="timeline-image-wrapper">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="timeline-image"
                      />
                      <div className="timeline-overlay">
                        <div className="timeline-year">{event.year}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              className="timeline-nav-button next"
              onClick={goToNext}
              aria-label="Next slide"
            >
              ›
            </button>
          </div>

          {/* Event details */}
          <div className="timeline-details">
            <div className="timeline-date">{currentEvent.date}</div>
            <h2 className="timeline-title">{currentEvent.title}</h2>
            <p className="timeline-description">{currentEvent.description}</p>
          </div>

          {/* Controls */}
          <div className="timeline-controls">
            <button
              className={`autoplay-button ${isAutoPlaying ? 'playing' : 'paused'}`}
              onClick={toggleAutoPlay}
              aria-label={isAutoPlaying ? 'Pause' : 'Play'}
            >
              {isAutoPlaying ? '⏸' : '▶'}
            </button>

            <div className="timeline-dots">
              {timeline.map((event, index) => (
                <button
                  key={event.id}
                  className={`timeline-dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to ${event.year}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimelinePage;
