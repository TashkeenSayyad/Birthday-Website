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
  const [favorites, setFavorites] = useState([]);
  const [longPressTimer, setLongPressTimer] = useState(null);
  const [showFavoriteToast, setShowFavoriteToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Pinch-to-zoom state
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [initialDistance, setInitialDistance] = useState(0);
  const [isPinching, setIsPinching] = useState(false);
  const [lastPanX, setLastPanX] = useState(0);
  const [lastPanY, setLastPanY] = useState(0);

  const modalRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    setMemories(memoriesData);
    // Load favorites from localStorage
    const saved = localStorage.getItem('favoriteMemories');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const openModal = (memory) => {
    setSelectedMemory(memory);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
    // Reset zoom and pan
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
    setModalTransform(0);
    setZoom(1);
    setPanX(0);
    setPanY(0);
    setTimeout(() => setSelectedMemory(null), 300);
  };

  // Touch gesture handlers for swipe-down-to-close
  const handleTouchStart = (e) => {
    // Only handle swipe if not zoomed in
    if (zoom <= 1) {
      setTouchStart(e.touches[0].clientY);
      setTouchEnd(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e) => {
    // Only handle swipe if not zoomed in
    if (zoom <= 1) {
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
    }
  };

  const handleTouchEnd = () => {
    if (zoom <= 1) {
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
    }
  };

  // Pinch-to-zoom handlers
  const getDistance = (touch1, touch2) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleImageTouchStart = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      setIsPinching(true);
      const distance = getDistance(e.touches[0], e.touches[1]);
      setInitialDistance(distance);
      setLastPanX(panX);
      setLastPanY(panY);
    } else if (e.touches.length === 1 && zoom > 1) {
      // Single touch for panning when zoomed
      setLastPanX(e.touches[0].clientX);
      setLastPanY(e.touches[0].clientY);
    }
  };

  const handleImageTouchMove = (e) => {
    if (e.touches.length === 2 && isPinching) {
      e.preventDefault();
      const distance = getDistance(e.touches[0], e.touches[1]);
      const scale = (distance / initialDistance) * zoom;

      // Limit zoom between 1x and 4x
      const newZoom = Math.min(Math.max(scale, 1), 4);
      setZoom(newZoom);
    } else if (e.touches.length === 1 && zoom > 1) {
      // Pan when zoomed
      e.preventDefault();
      const deltaX = e.touches[0].clientX - lastPanX;
      const deltaY = e.touches[0].clientY - lastPanY;

      setPanX(panX + deltaX);
      setPanY(panY + deltaY);
      setLastPanX(e.touches[0].clientX);
      setLastPanY(e.touches[0].clientY);
    }
  };

  const handleImageTouchEnd = (e) => {
    if (e.touches.length < 2) {
      setIsPinching(false);
      setInitialDistance(0);
    }

    // Reset zoom and pan if zoomed out completely
    if (zoom <= 1) {
      setZoom(1);
      setPanX(0);
      setPanY(0);
    }
  };

  // Double-tap to zoom
  const handleDoubleTap = (e) => {
    if (zoom === 1) {
      setZoom(2);
      setPanX(0);
      setPanY(0);
    } else {
      setZoom(1);
      setPanX(0);
      setPanY(0);
    }
  };

  // Long-press to favorite
  const handleLongPressStart = (e, memory) => {
    const timer = setTimeout(() => {
      toggleFavorite(memory);
    }, 800); // 800ms long press
    setLongPressTimer(timer);
  };

  const handleLongPressEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const toggleFavorite = (memory) => {
    const isFavorited = favorites.includes(memory.id);
    let newFavorites;

    if (isFavorited) {
      newFavorites = favorites.filter(id => id !== memory.id);
      setToastMessage('Removed from favorites');
    } else {
      newFavorites = [...favorites, memory.id];
      setToastMessage('Added to favorites! ❤️');
    }

    setFavorites(newFavorites);
    localStorage.setItem('favoriteMemories', JSON.stringify(newFavorites));

    // Show toast
    setShowFavoriteToast(true);
    setTimeout(() => setShowFavoriteToast(false), 2000);

    // Haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const isFavorited = (memoryId) => favorites.includes(memoryId);

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
            className={`memory-card ${index === activeMemory ? 'active' : ''} ${isFavorited(memory.id) ? 'favorited' : ''}`}
            onClick={() => openModal(memory)}
            onMouseEnter={() => setActiveMemory(index)}
            onTouchStart={(e) => handleLongPressStart(e, memory)}
            onTouchEnd={handleLongPressEnd}
            onTouchMove={handleLongPressEnd}
            onMouseDown={(e) => handleLongPressStart(e, memory)}
            onMouseUp={handleLongPressEnd}
            onMouseLeave={handleLongPressEnd}
          >
            {isFavorited(memory.id) && (
              <div className="favorite-badge">❤️</div>
            )}
            <div className="memory-image-main">
              <img
                src={memory.image}
                alt={memory.title}
                loading="lazy"
                className="progressive-image"
              />
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
            <button
              className={`modal-favorite-btn ${isFavorited(selectedMemory.id) ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(selectedMemory);
              }}
            >
              {isFavorited(selectedMemory.id) ? '❤️' : '🤍'}
            </button>
            <div
              className="modal-image-container"
              ref={imageRef}
              onTouchStart={handleImageTouchStart}
              onTouchMove={handleImageTouchMove}
              onTouchEnd={handleImageTouchEnd}
              onDoubleClick={handleDoubleTap}
            >
              <img
                src={selectedMemory.image}
                alt={selectedMemory.title}
                loading="eager"
                className="progressive-image"
                style={{
                  transform: `scale(${zoom}) translate(${panX / zoom}px, ${panY / zoom}px)`,
                  transition: isPinching ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: zoom > 1 ? 'grab' : 'zoom-in'
                }}
                draggable="false"
              />
              {zoom === 1 && (
                <div className="zoom-hint">Pinch to zoom or double-tap</div>
              )}
            </div>
            <div className="modal-details">
              <span className="modal-date">{selectedMemory.date}</span>
              <h2 className="modal-title">{selectedMemory.title}</h2>
              <p className="modal-description">{selectedMemory.description}</p>
              <p className="modal-from">— {selectedMemory.from}</p>
            </div>
          </div>
        </div>
      )}

      {/* Favorite Toast Notification */}
      <div className={`favorite-toast ${showFavoriteToast ? 'show' : ''}`}>
        {toastMessage}
      </div>
    </div>
  );
};

export default FavoriteMemories;
