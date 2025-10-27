import React, { useState, useEffect } from 'react';
import memoriesData from '../data/memories.json';
import '../styles/FavoriteMemories.css';

const FavoriteMemories = () => {
  const [memories, setMemories] = useState([]);
  const [activeMemory, setActiveMemory] = useState(0);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMemories(memoriesData);
  }, []);

  const openModal = (memory) => {
    setSelectedMemory(memory);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMemory(null), 300);
  };

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
            onClick={() => openModal(memory)}
            onMouseEnter={() => setActiveMemory(index)}
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

      {isModalOpen && selectedMemory && (
        <div className={`memory-modal ${isModalOpen ? 'open' : ''}`} onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-image-container">
              <img src={selectedMemory.image} alt={selectedMemory.title} />
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
    </div>
  );
};

export default FavoriteMemories;