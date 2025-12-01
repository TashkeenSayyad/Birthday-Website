import React, { useState, useEffect, useRef } from 'react';
import FloatingParticles from '../components/FloatingParticles';
import AlgorithmicBackground from '../components/AlgorithmicBackground';
import { FloralDivider } from '../components/DecorativeElements';
import timelineData from '../data/timeline.json';
import memoriesData from '../data/memories.json';
import { getBaseUrl } from '../utils/baseUrl';
import '../styles/TimelinePage.css';

const TimelinePage = () => {
  const [timeline, setTimeline] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);
  const baseUrl = getBaseUrl();

  // One picture (not video) from each sender
  const bonusMemories = React.useMemo(() => {
    const senderMap = new Map();
    memoriesData.forEach(memory => {
      if (memory.from && !senderMap.has(memory.from) && memory.mediaType !== 'video') {
        senderMap.set(memory.from, memory);
      }
    });
    return Array.from(senderMap.values());
  }, []);

  useEffect(() => {
    setTimeline(timelineData);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.dataset.index;
            setVisibleCards((prev) => new Set([...prev, parseInt(index)]));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [timeline]);

  // Group timeline by sections
  const groupedTimeline = timeline.reduce((acc, event) => {
    const section = event.year;
    if (!acc[section]) acc[section] = [];
    acc[section].push(event);
    return acc;
  }, {});

  const openModal = (event) => {
    setSelectedEvent(event);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedEvent(null);
    document.body.style.overflow = 'auto';
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape' && selectedEvent) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedEvent]);

  if (timeline.length === 0) {
    return (
      <>
        <AlgorithmicBackground seed={33333} intensity={0.5} />
        <FloatingParticles />
        <div className="app-content">
          <div className="timeline-loading">Loading timeline...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <AlgorithmicBackground seed={33333} intensity={0.5} />
      <FloatingParticles />
      <div className="app-content timeline-content">
        <header className="app-header timeline-header">
          <h1 className="main-title timeline-main-title gradient-text">Journey Through Time ⏳</h1>
          <FloralDivider />
          <div className="title-decoration">
            <span className="decoration-heart">♥</span>
            <span className="decoration-line"></span>
            <span className="decoration-star">✦</span>
            <span className="decoration-line"></span>
            <span className="decoration-heart">♥</span>
          </div>
          <p className="subtitle-text">A beautiful collection of cherished memories</p>
        </header>

        <div className="timeline-wrapper">
          <div className="timeline-line"></div>

          {Object.keys(groupedTimeline).map((section, sectionIndex) => (
            <div key={section} className="timeline-section">
              {/* Section Header */}
              <div className="section-header-container">
                <div className="timeline-dot timeline-dot-section"></div>
                <div className="section-header">
                  <h2 className="section-title">{section}</h2>
                  <div className="section-subtitle">{groupedTimeline[section][0].date}</div>
                </div>
              </div>

              {/* Timeline Cards */}
              {groupedTimeline[section].map((event, index) => {
                const globalIndex = timeline.indexOf(event);
                const isLeft = globalIndex % 2 === 0;
                const isVisible = visibleCards.has(globalIndex);

                return (
                  <div
                    key={event.id}
                    ref={(el) => (cardRefs.current[globalIndex] = el)}
                    data-index={globalIndex}
                    className={`timeline-item ${isLeft ? 'left' : 'right'} ${
                      isVisible ? 'visible' : ''
                    }`}
                  >
                    {/* Connector Line */}
                    <div className="timeline-connector"></div>

                    {/* Timeline Dot */}
                    <div className="timeline-dot">
                      <div className="dot-inner"></div>
                      <div className="dot-ring"></div>
                    </div>

                    {/* Polaroid Card */}
                    <div
                      className="timeline-card polaroid-card"
                      onClick={() => openModal(event)}
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') openModal(event);
                      }}
                    >
                      <div className="card-inner">
                        {/* Decorative Tape */}
                        <div className="washi-tape"></div>

                        {/* Image Container */}
                        <div className="card-image-container">
                          {event.mediaType === 'video' ? (
                            <div className="video-preview">
                              <img
                                src={`${baseUrl}${event.thumbnail || event.media}`}
                                alt={event.title}
                                className="card-image"
                              />
                              <div className="video-play-overlay">
                                <div className="play-icon">▶</div>
                              </div>
                            </div>
                          ) : (
                            <img
                              src={`${baseUrl}${event.media || event.image}`}
                              alt={event.title}
                              className="card-image"
                            />
                          )}
                        </div>

                        {/* Polaroid Caption */}
                        <div className="card-caption">
                          <h3 className="card-title">{event.title}</h3>
                          <p className="card-description">{event.description}</p>
                        </div>

                        {/* Corner Decoration */}
                        <div className="corner-decoration">
                          {index % 3 === 0 && <span className="corner-emoji">✨</span>}
                          {index % 3 === 1 && <span className="corner-emoji">💫</span>}
                          {index % 3 === 2 && <span className="corner-emoji">🌸</span>}
                        </div>
                      </div>

                      {/* Hover Shine Effect */}
                      <div className="card-shine"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

          {/* End of Timeline */}
          <div className="timeline-end">
            <div className="timeline-dot timeline-dot-end">
            </div>
            <p className="end-message"> ♥ We loved to see you grow into who you are, and we will always stand behind you, to see who you will become. ♥ </p>
          </div>

          {/* Bonus Memories Section */}
          <div className="bonus-memories-section">
            <h2 className="bonus-memories-title">Special Memories from Friends</h2>
            <p className="bonus-memories-subtitle">Beautiful moments shared by those who love you</p>

            <div className="bonus-memories-grid">
              {bonusMemories.map((memory, index) => (
                <div
                  key={memory.id}
                  className="bonus-memory-card polaroid-card"
                  onClick={() => openModal({
                    ...memory,
                    year: memory.date || 'Special Memory',
                    date: '',
                    title: memory.title,
                    description: memory.description,
                    media: memory.image,
                    mediaType: memory.mediaType || 'image'
                  })}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') openModal({
                      ...memory,
                      year: memory.date || 'Special Memory',
                      date: '',
                      title: memory.title,
                      description: memory.description,
                      media: memory.image,
                      mediaType: memory.mediaType || 'image'
                    });
                  }}
                >
                  <div className="card-inner">
                    {/* Decorative Tape */}
                    <div className="washi-tape"></div>

                    {/* Image Container */}
                    <div className="card-image-container">
                      {memory.mediaType === 'video' ? (
                        <div className="video-preview">
                          <img
                            src={`${baseUrl}${memory.image}`}
                            alt={memory.title}
                            className="card-image"
                          />
                          <div className="video-play-overlay">
                            <div className="play-icon">▶</div>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={`${baseUrl}${memory.image}`}
                          alt={memory.title}
                          className="card-image"
                        />
                      )}
                    </div>

                    {/* Polaroid Caption */}
                    <div className="card-caption">
                      <h3 className="card-title">{memory.title}</h3>
                      <p className="card-from">From: {memory.from}</p>
                      {memory.description && (
                        <p className="card-description">{memory.description}</p>
                      )}
                    </div>

                    {/* Corner Decoration */}
                    <div className="corner-decoration">
                      {index % 3 === 0 && <span className="corner-emoji">✨</span>}
                      {index % 3 === 1 && <span className="corner-emoji">💫</span>}
                      {index % 3 === 2 && <span className="corner-emoji">🌸</span>}
                    </div>
                  </div>

                  {/* Hover Shine Effect */}
                  <div className="card-shine"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal for Full-Size View */}
        {selectedEvent && (
          <div className="timeline-modal" onClick={closeModal}>
            <div className="modal-overlay"></div>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal} aria-label="Close">
                ✕
              </button>

              <div className="modal-card">
                <div className="modal-image-container">
                  {selectedEvent.mediaType === 'video' ? (
                    <video
                      src={`${baseUrl}${selectedEvent.media || selectedEvent.image}`}
                      className="modal-media"
                      controls
                      autoPlay
                      loop
                      playsInline
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={`${baseUrl}${selectedEvent.media || selectedEvent.image}`}
                      alt={selectedEvent.title}
                      className="modal-media"
                    />
                  )}
                </div>

                <div className="modal-details">
                  <div className="modal-header">
                    <span className="modal-year">{selectedEvent.year}</span>
                    <span className="modal-date">{selectedEvent.date}</span>
                  </div>
                  <h2 className="modal-title">{selectedEvent.title}</h2>
                  <p className="modal-description">{selectedEvent.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TimelinePage;
