import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MessageCard.css';

const MessageCard = ({ name, title, image, isActive, letterPath }) => {
  const navigate = useNavigate();

  return (
    <div className={`message-card-container ${isActive ? 'active' : ''}`}>
      <div className="letter-card">
        <div className="vintage-letter">
          {/* Decorative corners */}
          <div className="corner corner-tl"></div>
          <div className="corner corner-tr"></div>
          <div className="corner corner-bl"></div>
          <div className="corner corner-br"></div>

          {/* Letter content */}
          <div className="letter-paper">
            {/* Center heart seal */}
            <div className="center-heart-seal">
              <div className="heart-seal-inner">♥</div>
            </div>

            {/* Ornate header */}
            <div className="ornate-header">
              <div className="flourish flourish-left"></div>
              <div className="flourish flourish-right"></div>
            </div>

            {/* Letter title and sender */}
            <div className="letter-body">
              <h2 className="letter-title">{title}</h2>

              <div className="ornate-divider">
                <span className="divider-line"></span>
                <span className="divider-ornament">❧</span>
                <span className="divider-line"></span>
              </div>

              <p className="letter-from">
                <span className="from-label">With love from</span>
                <span className="sender-name">{name}</span>
              </p>
            </div>

            {/* Classic button */}
            <div className="letter-footer">
              <button
                className="unfold-letter-button"
                onClick={() => navigate(letterPath)}
              >
                <span className="button-ornament">✦</span>
                Unfold & Read
                <span className="button-ornament">✦</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;