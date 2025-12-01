import React, { useState, useEffect, useMemo } from 'react';
import memoriesData from '../data/memories.json';
import { useModal } from '../hooks/useModal';
import { useSwipeToClose } from '../hooks/useSwipeToClose';
import { ANIMATION_CONSTANTS } from '../constants/animations';
import '../styles/FavoriteMemories.css';

const FavoriteMemories = () => {
  const [memories, setMemories] = useState([]);
  const [activeMemory, setActiveMemory] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSender, setSelectedSender] = useState('all');
  const [selectedMediaType, setSelectedMediaType] = useState('all');
  const [viewMode, setViewMode] = useState('masonry'); // masonry, grid, list
  const [sortBy, setSortBy] = useState('default'); // default, date-desc, date-asc, sender, title

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

  // Filter and sort memories
  const filteredAndSortedMemories = useMemo(() => {
    let result = [...memories];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(memory =>
        memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        memory.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        memory.from.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

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

    // Apply sorting
    switch (sortBy) {
      case 'date-desc':
        result.sort((a, b) => {
          const dateA = a.date || '';
          const dateB = b.date || '';
          return dateB.localeCompare(dateA);
        });
        break;
      case 'date-asc':
        result.sort((a, b) => {
          const dateA = a.date || '';
          const dateB = b.date || '';
          return dateA.localeCompare(dateB);
        });
        break;
      case 'sender':
        result.sort((a, b) => a.from.localeCompare(b.from));
        break;
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // Keep original order
        break;
    }

    return result;
  }, [memories, searchQuery, selectedSender, selectedMediaType, sortBy]);

  // Statistics
  const stats = useMemo(() => ({
    total: memories.length,
    images: memories.filter(m => (m.mediaType || 'image') === 'image').length,
    videos: memories.filter(m => m.mediaType === 'video').length,
    senders: new Set(memories.map(m => m.from)).size,
    filtered: filteredAndSortedMemories.length
  }), [memories, filteredAndSortedMemories]);

  // Reset active memory when filters change
  useEffect(() => {
    setActiveMemory(0);
  }, [searchQuery, selectedSender, selectedMediaType, sortBy, viewMode]);

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
      <div className="page-header">
        <h1 className="page-title">Our Favorite Memories</h1>
        <p className="page-subtitle">Moments captured in time</p>

        {/* Statistics Section */}
        <div className="memories-stats">
          <div className="stat-item">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.images}</span>
            <span className="stat-label">Photos</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.videos}</span>
            <span className="stat-label">Videos</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.senders}</span>
            <span className="stat-label">Contributors</span>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="memories-controls">
        <div className="controls-row">
          {/* Search Bar */}
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search memories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery('')}>×</button>
            )}
          </div>

          {/* Filters */}
          <div className="filters-container">
            <select
              className="filter-select"
              value={selectedSender}
              onChange={(e) => setSelectedSender(e.target.value)}
            >
              <option value="all">All Contributors</option>
              {senders.map(sender => (
                <option key={sender} value={sender}>{sender}</option>
              ))}
            </select>

            <select
              className="filter-select"
              value={selectedMediaType}
              onChange={(e) => setSelectedMediaType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="image">Photos Only</option>
              <option value="video">Videos Only</option>
            </select>

            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Default Order</option>
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="sender">By Contributor</option>
              <option value="title">By Title</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="view-mode-toggle">
            <button
              className={`view-btn ${viewMode === 'masonry' ? 'active' : ''}`}
              onClick={() => setViewMode('masonry')}
              title="Masonry View"
            >
              ⊞
            </button>
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              ▦
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchQuery || selectedSender !== 'all' || selectedMediaType !== 'all') && (
          <div className="active-filters">
            <span className="filter-label">Active filters:</span>
            {searchQuery && (
              <span className="filter-tag">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery('')}>×</button>
              </span>
            )}
            {selectedSender !== 'all' && (
              <span className="filter-tag">
                Contributor: {selectedSender}
                <button onClick={() => setSelectedSender('all')}>×</button>
              </span>
            )}
            {selectedMediaType !== 'all' && (
              <span className="filter-tag">
                Type: {selectedMediaType === 'image' ? 'Photos' : 'Videos'}
                <button onClick={() => setSelectedMediaType('all')}>×</button>
              </span>
            )}
            <button className="clear-all-filters" onClick={() => {
              setSearchQuery('');
              setSelectedSender('all');
              setSelectedMediaType('all');
            }}>
              Clear All
            </button>
          </div>
        )}

        {/* Results Count */}
        <div className="results-count">
          Showing {stats.filtered} of {stats.total} memories
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
