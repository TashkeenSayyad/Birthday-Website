import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MessageCard.css';

const MessageCard = ({ name, message, image, relationship, isActive, hasSpecialNote, specialNotePath }) => {
  const navigate = useNavigate();

  return (
    <div className={`message-card-container ${isActive ? 'active' : ''}`}>
      <div className="message-card">
        <div className="card-image-side">
          <div className="image-overlay"></div>
          <img src={image} alt={name} className="card-image" />
          <div className="image-gradient"></div>
        </div>
        
        <div className="card-content-side">
          <div className="content-wrapper">
            <div className="message-header">
              <h2 className="sender-name">{name}</h2>
              <p className="relationship">{relationship}</p>
            </div>
            
            <div className="divider"></div>
            
            <div className="message-content">
              <p className="message-text">{message}</p>
            </div>
            
            <div className="message-footer">
              {hasSpecialNote && (
                <button 
                  className="special-note-button"
                  onClick={() => navigate(specialNotePath)}
                >
                  Read Full Letter
                  <span className="button-arrow">→</span>
                </button>
              )}
              <div className="decorative-element">
                <span className="heart-symbol">♥</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;