import React, { useState, useEffect } from 'react';
import thingsWeLoveData from '../data/thingsWeLove.json';
import '../styles/ThingsWeLove.css';

const ThingsWeLove = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setItems(thingsWeLoveData);
  }, []);

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="things-page">
      <div className="page-header">
        <h1 className="page-title">Things We Love About You</h1>
        <p className="page-subtitle">Every quality makes you extraordinary</p>
      </div>

      <div className="things-grid">
        {items.length === 0 ? (
          <p style={{ color: 'white', fontSize: '1.5rem', textAlign: 'center' }}>Loading...</p>
        ) : (
          items.map((item, index) => (
            <div
              key={item.id}
              className="thing-card"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleCardClick(item)}
            >
              <div className="thing-image">
                <img src={item.image} alt={item.title} />
                <span className="from-label">From: {item.from}</span>
              </div>
              <div className="thing-content">
                <h3>{item.title}</h3>
                <p>{item.description.substring(0, 100)}...</p>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedItem && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseModal}>×</button>
            <div className="modal-img-wrapper">
              <img src={selectedItem.image} alt={selectedItem.title} />
            </div>
            <p className="modal-from-text">From: {selectedItem.from}</p>
            <h2 className="modal-title-text">{selectedItem.title}</h2>
            <p className="modal-desc-text">{selectedItem.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThingsWeLove;