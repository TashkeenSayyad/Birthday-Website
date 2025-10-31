import React from 'react';
import '../styles/LoadingAnimation.css';

const LoadingAnimation = () => {
  return (
    <div className="loading-animation-container">
      <div className="loading-content">
        {/* Animated gift box */}
        <div className="gift-box">
          <div className="gift-lid">
            <div className="ribbon-bow">🎀</div>
          </div>
          <div className="gift-body"></div>
          <div className="sparkle sparkle-1">✨</div>
          <div className="sparkle sparkle-2">✨</div>
          <div className="sparkle sparkle-3">✨</div>
          <div className="sparkle sparkle-4">✨</div>
        </div>

        {/* Loading text */}
        <div className="loading-text">
          <span className="text-word">Preparing</span>
          <span className="text-word">Something</span>
          <span className="text-word">Special</span>
          <span className="dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </div>

        {/* Floating hearts */}
        <div className="loading-hearts">
          <span className="heart">♥</span>
          <span className="heart">♥</span>
          <span className="heart">♥</span>
          <span className="heart">♥</span>
          <span className="heart">♥</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
