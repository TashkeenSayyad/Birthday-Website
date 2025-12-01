import React from 'react';
import '../styles/DecorativeElements.css';

export const FloralDivider = ({ color = '#9b59b6', className = '' }) => (
  <div className={`floral-divider ${className}`}>
    <svg viewBox="0 0 800 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="floral-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e91e8c" />
          <stop offset="50%" stopColor="#9b59b6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>

      {/* Center ornament */}
      <circle cx="400" cy="30" r="8" fill="url(#floral-gradient)" opacity="0.8" />
      <circle cx="400" cy="30" r="4" fill="#fff" />

      {/* Flowing lines */}
      <path
        d="M 100 30 Q 250 15, 390 30"
        stroke="url(#floral-gradient)"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M 410 30 Q 550 45, 700 30"
        stroke="url(#floral-gradient)"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />

      {/* Decorative dots */}
      {[150, 250, 350, 450, 550, 650].map((x, i) => (
        <circle
          key={i}
          cx={x}
          cy={30 + Math.sin(i) * 5}
          r="2"
          fill="url(#floral-gradient)"
          opacity="0.5"
        />
      ))}

      {/* Small hearts */}
      <g transform="translate(200, 30)" opacity="0.4">
        <path
          d="M 0,-3 C -2,-5 -5,-5 -5,-2 C -5,0 0,3 0,5 C 0,3 5,0 5,-2 C 5,-5 2,-5 0,-3 Z"
          fill="url(#floral-gradient)"
        />
      </g>
      <g transform="translate(600, 30)" opacity="0.4">
        <path
          d="M 0,-3 C -2,-5 -5,-5 -5,-2 C -5,0 0,3 0,5 C 0,3 5,0 5,-2 C 5,-5 2,-5 0,-3 Z"
          fill="url(#floral-gradient)"
        />
      </g>
    </svg>
  </div>
);

export const CornerDecoration = ({ position = 'top-left', size = 150 }) => {
  const rotations = {
    'top-left': 0,
    'top-right': 90,
    'bottom-right': 180,
    'bottom-left': 270
  };

  return (
    <div
      className={`corner-decoration ${position}`}
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotations[position]}deg)`
      }}
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="corner-gradient">
            <stop offset="0%" stopColor="#e91e8c" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#9b59b6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Flowing curves */}
        <path
          d="M 0,0 Q 50,50 0,100 Q 50,50 100,0"
          fill="none"
          stroke="url(#floral-gradient)"
          strokeWidth="1.5"
          opacity="0.4"
        />

        {/* Dots pattern */}
        {[10, 20, 30, 40, 50].map((dist, i) => (
          <circle
            key={i}
            cx={dist}
            cy={dist}
            r={2 - i * 0.3}
            fill="url(#floral-gradient)"
            opacity={0.6 - i * 0.1}
          />
        ))}

        {/* Decorative swirls */}
        <path
          d="M 20,10 Q 30,15 25,25 Q 20,35 15,30 Q 10,25 15,20 Q 20,15 20,10"
          fill="none"
          stroke="url(#floral-gradient)"
          strokeWidth="1"
          opacity="0.3"
        />
      </svg>
    </div>
  );
};

export const ArtisticHeader = ({ title, subtitle }) => (
  <div className="artistic-header">
    <div className="header-decorations">
      <div className="left-flourish">
        <svg viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 10,50 Q 40,30 70,50 Q 100,70 130,50"
            fill="none"
            stroke="url(#floral-gradient)"
            strokeWidth="2"
            opacity="0.5"
          />
          <circle cx="70" cy="50" r="5" fill="url(#floral-gradient)" opacity="0.6" />
        </svg>
      </div>

      <div className="header-content">
        <h1 className="artistic-title gradient-text">{title}</h1>
        {subtitle && <p className="artistic-subtitle">{subtitle}</p>}
      </div>

      <div className="right-flourish">
        <svg viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 140,50 Q 110,30 80,50 Q 50,70 20,50"
            fill="none"
            stroke="url(#floral-gradient)"
            strokeWidth="2"
            opacity="0.5"
          />
          <circle cx="80" cy="50" r="5" fill="url(#floral-gradient)" opacity="0.6" />
        </svg>
      </div>
    </div>

    <FloralDivider className="header-divider" />
  </div>
);

export const DecorativeFrame = ({ children, className = '' }) => (
  <div className={`decorative-frame ${className}`}>
    <CornerDecoration position="top-left" />
    <CornerDecoration position="top-right" />
    <CornerDecoration position="bottom-left" />
    <CornerDecoration position="bottom-right" />
    <div className="frame-content">{children}</div>
  </div>
);

export const HeartBorder = ({ children, animated = true }) => (
  <div className={`heart-border ${animated ? 'animated' : ''}`}>
    <svg className="heart-border-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="heart-border-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e91e8c" />
          <stop offset="50%" stopColor="#9b59b6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <rect
        x="1"
        y="1"
        width="98"
        height="98"
        fill="none"
        stroke="url(#heart-border-gradient)"
        strokeWidth="0.5"
        rx="5"
      />
    </svg>
    <div className="heart-border-content">{children}</div>

    {/* Decorative hearts at corners */}
    {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos) => (
      <div key={pos} className={`corner-heart ${pos}`}>
        <svg viewBox="0 0 32 32" width="20" height="20">
          <path
            d="M16,28 C16,28 4,20 4,12 C4,8 7,5 10,5 C12,5 14,6 16,8 C18,6 20,5 22,5 C25,5 28,8 28,12 C28,20 16,28 16,28 Z"
            fill="url(#floral-gradient)"
            opacity="0.6"
          />
        </svg>
      </div>
    ))}
  </div>
);

export default {
  FloralDivider,
  CornerDecoration,
  ArtisticHeader,
  DecorativeFrame,
  HeartBorder
};
