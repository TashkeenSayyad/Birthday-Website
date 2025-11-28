import React, { useState, useEffect } from 'react';
import memoriesData from '../data/memories.json';
import { useModal } from '../hooks/useModal';
import { useSwipeToClose } from '../hooks/useSwipeToClose';
import { ANIMATION_CONSTANTS } from '../constants/animations';
import '../styles/FavoriteMemories.css';

const FavoriteMemories = () => {
  const [memories, setMemories] = useState([]);
  const [activeMemory, setActiveMemory] = useState(0);

  const { selectedItem: selectedMemory, isOpen: isModalOpen, openModal, closeModal } = useModal(
    ANIMATION_CONSTANTS.MODAL_CLOSE_DELAY
  );

  const {
    elementRef: modalRef,
    transform: modalTransform,
    handlers: swipeHandlers,
  } = useSwipeToClose(closeModal, ANIMATION_CONSTANTS.SWIPE_THRESHOLD);

  useEffect(() => {
    // Shuffle the memories array randomly
    const shuffled = [...memoriesData].sort(() => Math.random() - 0.5);
    setMemories(shuffled);
  }, []);


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
            className={`memory-card ${memory.size ? `size-${memory.size}` : 'size-medium'} ${index === activeMemory ? 'active' : ''}`}
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
            {...swipeHandlers}
            style={{
              transform: `translateY(${modalTransform}px)`,
              transition:
                modalTransform === 0
                  ? `transform ${ANIMATION_CONSTANTS.MODAL_TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`
                  : 'none',
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
