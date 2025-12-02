import React, { useState, useEffect } from 'react';
import thingsWeLoveData from '../data/thingsWeLove.json';
import { useModal } from '../hooks/useModal';
import { ANIMATION_CONSTANTS } from '../constants/animations';
import GentleSparklesCanvas from '../components/GentleSparklesCanvas';
import '../styles/ThingsWeLove.css';

const ThingsWeLove = () => {
  const [items, setItems] = useState([]);

  const { selectedItem, isOpen: isModalOpen, openModal, closeModal } = useModal(350);

  useEffect(() => {
    setItems(thingsWeLoveData);
  }, []);

  // Array of pink/purple themed colors for sticky notes
  const colors = [
    '#FFE0F0', // Pale pink
    '#F0D0FF', // Light lavender
    '#FFD0E8', // Light rose
    '#E8D0FF', // Soft purple
    '#FFDDF4', // Blush pink
    '#D8C0E8', // Light mauve
    '#FFE8F5', // Baby pink
    '#E0C8F0', // Pale purple
  ];

  // Array of random rotations for natural sticky note look
  const rotations = [2, -2, 1, -1, 2, -2, 1, -1, 2, -1];

  return (
    <div className="things-we-love-page">
      <GentleSparklesCanvas />

      <div className="page-header">
        <h1 className="page-title">Things We Love About You</h1>
        <div className="title-decoration">
          <div className="decoration-line"></div>
          <span className="decoration-heart">♥</span>
          <div className="decoration-line"></div>
          <span className="decoration-star">✨</span>
          <div className="decoration-line"></div>
        </div>
        <p className="page-subtitle">Click a card to discover more</p>
      </div>

      <div className="things-grid">
        {items.length === 0 ? (
          <p className="loading-text">Loading...</p>
        ) : (
          items.map((item, index) => (
            <div
              key={item.id}
              className="polaroid-card"
              style={{
                animationDelay: `${index * ANIMATION_CONSTANTS.CARD_STAGGER_DELAY}ms`,
              }}
              onClick={() => openModal(item)}
            >
              <div className="card-inner">
                <div className="washi-tape"></div>
                <div className="card-shine"></div>
                <div className="card-image-container">
                  <img src={item.image} alt={item.title} className="card-image" />
                </div>
                <div className="card-caption">
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-from">From {item.from}</p>
                </div>
                <div className="corner-decoration">
                  <span className="corner-emoji">✨</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && selectedItem && (
        <div className={`love-modal ${isModalOpen ? 'open' : ''}`} onClick={closeModal}>
          <div className="love-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="love-modal-card">
              <div className="love-modal-image">
                <img src={selectedItem.image} alt={selectedItem.title} />
              </div>
              <div className="love-modal-details">
                <h2 className="love-modal-title">{selectedItem.title}</h2>
                <p className="love-modal-description">{selectedItem.description}</p>
                <p className="love-modal-from">♥ {selectedItem.from}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThingsWeLove;
