import React, { useState, useEffect } from 'react';
import thingsWeLoveData from '../data/thingsWeLove.json';
import '../styles/ThingsWeLove.css';

const ThingsWeLove = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setItems(thingsWeLoveData);
  }, []);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 350);
  };

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
    <div className="sticky-notes-page">
      <div className="page-header">
        <h1 className="page-title">Things We Love About You</h1>
        <p className="page-subtitle">Click a note to discover more</p>
      </div>

      <div className="notes-board">
        {items.length === 0 ? (
          <p style={{ color: 'white', fontSize: '1.5rem', textAlign: 'center' }}>Loading...</p>
        ) : (
          items.map((item, index) => (
            <div
              key={item.id}
              className="sticky-note"
              style={{
                '--note-color': colors[index % colors.length],
                '--note-rotation': `${rotations[index % rotations.length]}deg`,
                animationDelay: `${index * 0.1}s`
              }}
              onClick={() => openModal(item)}
            >
              <div className="note-front">
                <div className="note-content-front">
                  <h3>{item.title}</h3>
                  <div className="note-divider"></div>
                  <p className="note-from">From {item.from}</p>
                </div>
                <div className="note-corner-fold"></div>
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
