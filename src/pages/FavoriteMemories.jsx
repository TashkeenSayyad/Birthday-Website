import React, { useState, useEffect, useMemo } from 'react';
import memoriesData from '../data/memories.json';
import { useModal } from '../hooks/useModal';
import { useSwipeToClose } from '../hooks/useSwipeToClose';
import { ANIMATION_CONSTANTS } from '../constants/animations';
import LightRaysCanvas from '../components/LightRaysCanvas';
import CursorTrailCanvas from '../components/CursorTrailCanvas';
import FloatingHeartsCanvas from '../components/FloatingHeartsCanvas';
import '../styles/FavoriteMemories.css';

const FavoriteMemories = () => {
  const [memories, setMemories] = useState([]);
  const [activeMemory, setActiveMemory] = useState(0);
  const [selectedSender, setSelectedSender] = useState('all');
  const [selectedMediaType, setSelectedMediaType] = useState('all');
  const [viewMode, setViewMode] = useState('masonry'); // masonry, grid

  const { selectedItem: selectedMemory, isOpen: isModalOpen, openModal, closeModal } = useModal(
    ANIMATION_CONSTANTS.MODAL_CLOSE_DELAY
  );

  const {
    elementRef: modalRef,
    transform: modalTransform,
    handlers: swipeHandlers,
  } = useSwipeToClose(closeModal, ANIMATION_CONSTANTS.SWIPE_THRESHOLD);

  useEffect(() => {
    // Load memories in the order defined in JSON
    setMemories(memoriesData);
  }, []);

  // Get unique senders for filter dropdown
  const senders = useMemo(() => {
    const uniqueSenders = [...new Set(memoriesData.map(m => m.from))];
    return uniqueSenders.sort();
  }, []);

  // Filter memories
  const filteredAndSortedMemories = useMemo(() => {
    let result = [...memories];

    // Apply sender filter
    if (selectedSender !== 'all') {
      result = result.filter(memory => memory.from === selectedSender);
    }

    // Apply media type filter
    if (selectedMediaType !== 'all') {
      result = result.filter(memory => {
        const type = memory.mediaType || 'image';
        return type === selectedMediaType;
      });
    }

    return result;
  }, [memories, selectedSender, selectedMediaType]);

  // Reset active memory when filters change
  useEffect(() => {
    setActiveMemory(0);
  }, [selectedSender, selectedMediaType, viewMode]);

  // Keyboard navigation for modal
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e) => {
      const currentIndex = filteredAndSortedMemories.findIndex(m => m.id === selectedMemory.id);

      switch (e.key) {
        case 'ArrowLeft':
          if (currentIndex > 0) {
            openModal(filteredAndSortedMemories[currentIndex - 1]);
          }
          break;
        case 'ArrowRight':
          if (currentIndex < filteredAndSortedMemories.length - 1) {
            openModal(filteredAndSortedMemories[currentIndex + 1]);
          }
          break;
        case 'Escape':
          closeModal();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, selectedMemory, filteredAndSortedMemories, openModal, closeModal]);


  return (
    <div className="memories-page">
      <LightRaysCanvas />
      <CursorTrailCanvas />
      <FloatingHeartsCanvas />

      <div className="page-header">
        <h1 className="page-title">Our Favorite Memories</h1>
        <p className="page-subtitle">Moments captured in time</p>
      </div>

      {/* Controls Section */}
      <div className="memories-controls">
        {/* View Mode Toggle */}
        <div className="view-mode-section">
          <button
            className={`view-mode-btn ${viewMode === 'masonry' ? 'active' : ''}`}
            onClick={() => setViewMode('masonry')}
          >
            <span className="view-icon">⊞</span>
            <span className="view-label">Masonry</span>
          </button>
          <button
            className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <span className="view-icon">▦</span>
            <span className="view-label">Grid</span>
          </button>
        </div>

        {/* Filter Chips Section */}
        <div className="filter-chips-section">
          <div className="filter-group">
            <span className="filter-group-label">👤</span>
            <div className="filter-chips">
              <button
                className={`filter-chip ${selectedSender === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedSender('all')}
              >
                All
              </button>
              {senders.map(sender => (
                <button
                  key={sender}
                  className={`filter-chip ${selectedSender === sender ? 'active' : ''}`}
                  onClick={() => setSelectedSender(sender)}
                >
                  {sender}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-group-label">📁</span>
            <div className="filter-chips">
              <button
                className={`filter-chip ${selectedMediaType === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedMediaType('all')}
              >
                All
              </button>
              <button
                className={`filter-chip ${selectedMediaType === 'image' ? 'active' : ''}`}
                onClick={() => setSelectedMediaType('image')}
              >
                📸 Photos
              </button>
              <button
                className={`filter-chip ${selectedMediaType === 'video' ? 'active' : ''}`}
                onClick={() => setSelectedMediaType('video')}
              >
                🎬 Videos
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Memories Gallery */}
      <div className={`memories-gallery view-${viewMode}`}>
        {filteredAndSortedMemories.length === 0 ? (
          <div className="no-results">
            <p className="no-results-icon">🔍</p>
            <p className="no-results-text">No memories found</p>
            <p className="no-results-hint">Try adjusting your filters or search query</p>
          </div>
        ) : (
          filteredAndSortedMemories.map((memory, index) => (
          <div
            key={memory.id}
            className={`polaroid-card memory-card ${memory.size ? `size-${memory.size}` : 'size-medium'} ${index === activeMemory ? 'active' : ''}`}
            onClick={() => openModal(memory)}
            onMouseEnter={() => setActiveMemory(index)}
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <div className="card-inner">
              <div className="washi-tape"></div>
              <div className="card-shine"></div>
              {memory.mediaType === 'video' && (
                <div className="video-play-overlay">
                  <div className="play-icon">▶</div>
                </div>
              )}
              <div className="card-image-container">
                {memory.mediaType === 'video' && !memory.thumbnail ? (
                  <video
                    src={memory.image}
                    className="card-image"
                    preload="metadata"
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={memory.thumbnail || memory.image}
                    alt={memory.title}
                    loading="lazy"
                    className="card-image"
                  />
                )}
              </div>
              <div className="card-caption">
                <span className="card-date">{memory.date}</span>
                <h3 className="card-title">{memory.title}</h3>
                <p className="card-from">— {memory.from}</p>
              </div>
            </div>
          </div>
        ))
        )}
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

            {/* Navigation Arrows */}
            {(() => {
              const currentIndex = filteredAndSortedMemories.findIndex(m => m.id === selectedMemory.id);
              const hasPrev = currentIndex > 0;
              const hasNext = currentIndex < filteredAndSortedMemories.length - 1;

              return (
                <>
                  {hasPrev && (
                    <button
                      className="modal-nav modal-nav-prev"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(filteredAndSortedMemories[currentIndex - 1]);
                      }}
                      title="Previous memory"
                    >
                      ‹
                    </button>
                  )}
                  {hasNext && (
                    <button
                      className="modal-nav modal-nav-next"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(filteredAndSortedMemories[currentIndex + 1]);
                      }}
                      title="Next memory"
                    >
                      ›
                    </button>
                  )}
                </>
              );
            })()}
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
