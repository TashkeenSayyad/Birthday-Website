import React, { useState, useEffect, useRef } from 'react';
import memoriesData from '../data/memories.json';
import '../styles/FavoriteMemories.css';

const FavoriteMemories = () => {
  const [memories, setMemories] = useState([]);
  const [activeMemory, setActiveMemory] = useState(0);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [modalTransform, setModalTransform] = useState(0);

  const modalRef = useRef(null);

  useEffect(() => {
    // Shuffle the memories array randomly
    const shuffled = [...memoriesData].sort(() => Math.random() - 0.5);
    setMemories(shuffled);
  }, []);

  const openModal = (memory) => {
    setSelectedMemory(memory);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
    setModalTransform(0);
    setTimeout(() => setSelectedMemory(null), 300);
  };

  // Touch gesture handlers for swipe-down-to-close
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientY);
    setTouchEnd(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientY);
    const distance = e.touches[0].clientY - touchStart;

    // Only allow downward swipe
    if (distance > 0) {
      setModalTransform(distance);
      // Add resistance effect
      const opacity = Math.max(0.3, 1 - distance / 400);
      if (modalRef.current) {
        modalRef.current.style.opacity = opacity;
      }
    }
  };

  const handleTouchEnd = () => {
    const distance = touchEnd - touchStart;

    // Close modal if swiped down more than 150px
    if (distance > 150) {
      closeModal();
    } else {
      // Spring back to original position
      setModalTransform(0);
      if (modalRef.current) {
        modalRef.current.style.opacity = 1;
      }
    }
  };


  return (
    <div className="memories-page">
      <div className="page-header">
        <h1 className="page-title">Our Favorite Memories</h1>
        <p className="page-subtitle">Moments captured in time</p>
      </div>

      <div className="memories-gallery">
        {memories.map((memory, index) => (
          <div
            key={memory.id}
            className={`memory-card ${index === activeMemory ? 'active' : ''}`}
            onClick={() => openModal(memory)}
            onMouseEnter={() => setActiveMemory(index)}
          >
            {memory.mediaType === 'video' && (
              <div className="video-indicator">🎬</div>
            )}
            <div className="memory-image-main">
              {memory.mediaType === 'video' && !memory.thumbnail ? (
                <video
                  src={memory.image}
                  className="progressive-image"
                  preload="metadata"
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={memory.thumbnail || memory.image}
                  alt={memory.title}
                  loading="lazy"
                  className="progressive-image"
                />
              )}
              <div className="memory-overlay">
                <span className="memory-date">{memory.date}</span>
                <h3 className="memory-title">{memory.title}</h3>
                <p className="memory-description">{memory.description}</p>
                <p className="memory-from">— {memory.from}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedMemory && (
        <div className={`memory-modal ${isModalOpen ? 'open' : ''}`} onClick={closeModal}>
          <div
            ref={modalRef}
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              transform: `translateY(${modalTransform}px)`,
              transition: modalTransform === 0 ? 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
            }}
          >
            <div className="modal-swipe-indicator">
              <div className="swipe-bar"></div>
            </div>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-image-container">
              {selectedMemory.mediaType === 'video' ? (
                <video
                  src={selectedMemory.media || selectedMemory.image}
                  className="progressive-image modal-video"
                  controls
                  autoPlay
                  loop
                  playsInline
                  poster={selectedMemory.thumbnail}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={selectedMemory.image}
                  alt={selectedMemory.title}
                  loading="eager"
                  className="progressive-image"
                  draggable="false"
                />
              )}
            </div>
            <div className="modal-details">
              <span className="modal-date">{selectedMemory.date}</span>
              <h2 className="modal-title">{selectedMemory.title}</h2>
              <div className="modal-description-container">
                <p className="modal-description">{selectedMemory.description}</p>
                <a
                  href={selectedMemory.media || selectedMemory.image}
                  download={`memory-${selectedMemory.id}-${selectedMemory.title.replace(/\s+/g, '-')}`}
                  className="download-button"
                  title="Download memory"
                >
                  ↓
                </a>
              </div>
              <p className="modal-from">— {selectedMemory.from}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoriteMemories;
