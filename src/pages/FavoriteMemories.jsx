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
        <p className="page-subtitle">Moments we'll cherish forever</p>
      </div>

      <div className="memories-timeline">
        {memories.map((memory, index) => (
          <div key={memory.id} className={`memory-item ${index === activeMemory ? 'active' : ''}`} onClick={() => setActiveMemory(index)}>
            <div className="memory-image">
              <img src={memory.image} alt={memory.title} />
              <span className="memory-date">{memory.date}</span>
            </div>
            <div className="memory-content">
              <h3>{memory.title}</h3>
              <p>{memory.description}</p>
              <p className="memory-from">— {memory.from}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteMemories;