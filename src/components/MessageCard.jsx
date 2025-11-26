import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MessageCard.css';

const MessageCard = ({ name, title, image, isActive, letterPath }) => {
  const navigate = useNavigate();

  return (
    <div className={`message-card-container ${isActive ? 'active' : ''}`}>
      <div className="letter-card">
        {/* Letter envelope design */}
        <div className="letter-envelope">
          <div className="envelope-flap"></div>
          <div className="envelope-body">
            <div className="letter-paper">
              <div className="letter-header">
                <div className="letter-stamp">💌</div>
                <div className="letter-lines">
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                </div>
              </div>

              <div className="letter-content">
                <h2 className="letter-title">{title}</h2>
                <div className="letter-divider"></div>
                <p className="letter-from">From: {name}</p>
              </div>

              <div className="letter-footer">
                <button
                  className="open-letter-button"
                  onClick={() => navigate(letterPath)}
                >
                  <span className="envelope-icon">✉️</span>
                  Open Letter
                  <span className="button-arrow">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;