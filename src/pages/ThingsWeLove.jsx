import React, { useState, useEffect } from 'react';
import thingsWeLoveData from '../data/thingsWeLove.json';
import '../styles/ThingsWeLove.css';

const ThingsWeLove = () => {
  const [items, setItems] = useState([]);
  const [flippedId, setFlippedId] = useState(null);

  useEffect(() => {
    setItems(thingsWeLoveData);
  }, []);

  const handleNoteClick = (id) => {
    setFlippedId(flippedId === id ? null : id);
  };

  // Array of pastel colors for sticky notes
  const colors = [
    '#FFF9A5', // Yellow
    '#FFB3E6', // Pink
    '#B4E7CE', // Mint green
    '#B3D9FF', // Light blue
    '#FFD9B3', // Peach
    '#E6B3FF', // Lavender
    '#B3FFB3', // Light green
    '#FFCCCC', // Light coral
  ];

  // Array of random rotations for natural sticky note look
  const rotations = [2, -3, 1, -2, 3, -1, 2, -3, 1, -2];

  return (
    <div className="sticky-notes-page">
      <div className="page-header">
        <h1 className="page-title">Things We Love About You</h1>
        <p className="page-subtitle">Pull a note to see why you're amazing!</p>
      </div>

      <div className="notes-board">
        {items.length === 0 ? (
          <p style={{ color: 'white', fontSize: '1.5rem', textAlign: 'center' }}>Loading...</p>
        ) : (
          items.map((item, index) => (
            <div
              key={item.id}
              className={`sticky-note ${flippedId === item.id ? 'flipped' : ''}`}
              style={{
                '--note-color': colors[index % colors.length],
                '--note-rotation': `${rotations[index % rotations.length]}deg`,
                animationDelay: `${index * 0.1}s`
              }}
              onClick={() => handleNoteClick(item.id)}
            >
              <div className="note-inner">
                {/* Front of note */}
                <div className="note-front">
                  <div className="note-tape"></div>
                  <div className="note-content-front">
                    <h3>{item.title}</h3>
                    <div className="note-divider"></div>
                    <p className="note-from">- {item.from}</p>
                  </div>
                  <div className="note-corner-fold"></div>
                  <div className="click-hint">Click to flip!</div>
                </div>

                {/* Back of note */}
                <div className="note-back">
                  <div className="note-tape"></div>
                  <div className="note-back-content">
                    <div className="note-image-small">
                      <img src={item.image} alt={item.title} />
                    </div>
                    <p className="note-description">{item.description}</p>
                    <p className="note-signature">♥ {item.from}</p>
                  </div>
                  <div className="click-hint">Click to flip back</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ThingsWeLove;
