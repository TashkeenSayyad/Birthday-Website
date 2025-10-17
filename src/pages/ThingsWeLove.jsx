import React, { useState, useEffect } from 'react';
import thingsWeLoveData from '../data/thingsWeLove.json';
import '../styles/ThingsWeLove.css';

const ThingsWeLove = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setItems(thingsWeLoveData);
  }, []);

  return (
    <div className="things-page">
      <div className="page-header">
        <h1 className="page-title">Things We Love About You</h1>
        <p className="page-subtitle">Every quality makes you extraordinary</p>
      </div>

      <div className="things-grid">
        {items.map((item, index) => (
          <div key={item.id} className="thing-card" style={{ animationDelay: `${index * 0.1}s` }} onClick={() => setSelectedItem(item)}>
            <div className="thing-image">
              <img src={item.image} alt={item.title} />
              <span className="from-label">From: {item.from}</span>
            </div>
            <div className="thing-content">
              <h3>{item.title}</h3>
              <p>{item.description.substring(0, 80)}...</p>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="modal" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedItem(null)}>×</button>
            <img src={selectedItem.image} alt={selectedItem.title} />
            <p className="modal-from">From: {selectedItem.from}</p>
            <h2>{selectedItem.title}</h2>
            <p>{selectedItem.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThingsWeLove;
