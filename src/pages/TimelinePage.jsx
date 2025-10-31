import React, { useState, useEffect, useRef } from 'react';
import FloatingParticles from '../components/FloatingParticles';
import timelineData from '../data/timeline.json';
import '../styles/TimelinePage.css';

const TimelinePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [timeline, setTimeline] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef(null);
  const filmstripRef = useRef(null);

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

  // Scroll filmstrip to keep current thumbnail visible
  useEffect(() => {
    if (filmstripRef.current) {
      const thumbnail = filmstripRef.current.children[currentIndex];
      if (thumbnail) {
        thumbnail.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [currentIndex]);

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;

    setIsTransitioning(true);
    setCurrentIndex(index);
    setIsAutoPlaying(false);

    // Resume auto-play after 10 seconds
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);

    // Reset transition lock
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
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

        <div className="timeline-carousel-container">
          {/* Main Picture Display */}
          <div className="main-picture-container">
            <button
              className="nav-arrow nav-arrow-left"
              onClick={goToPrevious}
              aria-label="Previous"
            >
              ‹
            </button>

            <div className="main-picture-wrapper">
              <div className="main-picture-frame">
                <img
                  key={currentIndex}
                  src={currentEvent.image}
                  alt={currentEvent.title}
                  className="main-picture"
                />
              </div>

              {/* Picture Details */}
              <div className="picture-details">
                <div className="picture-year">{currentEvent.year}</div>
                <h2 className="picture-title">{currentEvent.title}</h2>
                <p className="picture-description">{currentEvent.description}</p>
              </div>
            </div>

            <button
              className="nav-arrow nav-arrow-right"
              onClick={goToNext}
              aria-label="Next"
            >
              ›
            </button>
          </div>

          {/* Filmstrip Thumbnails */}
          <div className="filmstrip-container">
            <div className="filmstrip-track" ref={filmstripRef}>
              {timeline.map((event, index) => (
                <div
                  key={event.id}
                  className={`filmstrip-item ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                >
                  <div className="thumbnail-wrapper">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="thumbnail-image"
                    />
                    <div className={`thumbnail-overlay ${index === currentIndex ? 'active' : ''}`}>
                      <div className="thumbnail-play-icon">▶</div>
                    </div>
                  </div>
                  <div className="thumbnail-info">
                    <div className="thumbnail-date">{event.date}</div>
                    <div className="thumbnail-label">{event.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="timeline-controls">
            <button
              className={`autoplay-button ${isAutoPlaying ? 'playing' : 'paused'}`}
              onClick={toggleAutoPlay}
              aria-label={isAutoPlaying ? 'Pause' : 'Play'}
              title={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isAutoPlaying ? '⏸' : '▶'}
            </button>
            <span className="control-label">
              {isAutoPlaying ? 'Auto-playing' : 'Paused'}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimelinePage;
