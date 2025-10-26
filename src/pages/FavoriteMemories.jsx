import React, { useState, useEffect } from 'react';
import memoriesData from '../data/memories.json';
import '../styles/FavoriteMemories.css';

const FavoriteMemories = () => {
  const [memories, setMemories] = useState([]);
  const [activeMemory, setActiveMemory] = useState(0);

  useEffect(() => {
    setMemories(memoriesData);
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
            className={`memory-card ${index === activeMemory ? 'active' : ''}`}
            onClick={() => setActiveMemory(index)}
          >
            <div className="memory-image-main">
              <img src={memory.image} alt={memory.title} />
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
    </div>
  );
};

export default FavoriteMemories;