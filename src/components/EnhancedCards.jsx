import React, { useState } from 'react';
import '../styles/EnhancedCards.css';

// 3D Layered Card with depth
export const LayeredCard = ({
  children,
  title,
  subtitle,
  icon,
  color = '#D5516B',
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`layered-card ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        '--card-color': color
      }}
    >
      {/* 3D layers */}
      <div className="card-layer card-layer-3"></div>
      <div className="card-layer card-layer-2"></div>
      <div className="card-layer card-layer-1">
        {icon && (
          <div className="card-icon-wrapper">
            <span className="card-icon">{icon}</span>
          </div>
        )}

        {title && <h3 className="card-title">{title}</h3>}
        {subtitle && <p className="card-subtitle">{subtitle}</p>}

        <div className="card-content">
          {children}
        </div>

        {/* Shine effect */}
        <div className={`card-shine ${isHovered ? 'active' : ''}`}></div>
      </div>
    </div>
  );
};

// Neumorphic Card with soft shadows
export const NeumorphicCard = ({
  children,
  title,
  icon,
  className = ''
}) => (
  <div className={`neumorphic-card ${className}`}>
    <div className="neumorphic-content">
      {icon && (
        <div className="neumorphic-icon">
          <span>{icon}</span>
        </div>
      )}

      {title && <h3 className="neumorphic-title">{title}</h3>}

      <div className="neumorphic-body">
        {children}
      </div>
    </div>

    {/* Decorative elements */}
    <div className="neumorphic-decoration neumorphic-decoration-1"></div>
    <div className="neumorphic-decoration neumorphic-decoration-2"></div>
  </div>
);

// Floating Card with parallax effect
export const FloatingCard = ({
  children,
  title,
  subtitle,
  image,
  className = ''
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div
      className={`floating-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateY(${mousePosition.x * 10}deg) rotateX(${-mousePosition.y * 10}deg)`
      }}
    >
      <div className="floating-card-inner">
        {image && (
          <div
            className="floating-card-image"
            style={{
              transform: `translateZ(30px) translateX(${mousePosition.x * 20}px) translateY(${mousePosition.y * 20}px)`
            }}
          >
            <img src={image} alt={title} />
          </div>
        )}

        <div
          className="floating-card-content"
          style={{
            transform: `translateZ(20px) translateX(${mousePosition.x * 10}px) translateY(${mousePosition.y * 10}px)`
          }}
        >
          {title && <h3 className="floating-card-title">{title}</h3>}
          {subtitle && <p className="floating-card-subtitle">{subtitle}</p>}
          {children}
        </div>

        {/* Gradient overlay that moves with mouse */}
        <div
          className="floating-card-gradient"
          style={{
            background: `radial-gradient(circle at ${(mousePosition.x + 0.5) * 100}% ${(mousePosition.y + 0.5) * 100}%, rgba(255, 209, 220, 0.3), transparent 50%)`
          }}
        ></div>
      </div>
    </div>
  );
};

// Glass Card with frosted effect
export const GlassCard = ({
  children,
  title,
  icon,
  accentColor = '#D5516B',
  className = ''
}) => (
  <div className={`glass-card-enhanced ${className}`}>
    <div className="glass-card-bg"></div>

    <div className="glass-card-content-wrapper">
      {icon && (
        <div
          className="glass-card-icon"
          style={{ color: accentColor }}
        >
          {icon}
        </div>
      )}

      {title && (
        <h3 className="glass-card-title">{title}</h3>
      )}

      <div className="glass-card-body">
        {children}
      </div>
    </div>

    {/* Floating particles inside card */}
    <div className="glass-particles">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="glass-particle"
          style={{
            left: `${20 + i * 15}%`,
            animationDelay: `${i * 0.3}s`
          }}
        ></div>
      ))}
    </div>

    {/* Border gradient */}
    <svg className="glass-card-border" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`glassGrad-${Math.random()}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.6" />
          <stop offset="50%" stopColor="#C9A9E0" stopOpacity="0.4" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <rect
        x="0.5"
        y="0.5"
        width="99"
        height="99"
        fill="none"
        stroke={`url(#glassGrad-${Math.random()})`}
        strokeWidth="0.5"
        rx="4"
      />
    </svg>
  </div>
);

// Embossed Card with tactile feel
export const EmbossedCard = ({
  children,
  title,
  icon,
  className = ''
}) => (
  <div className={`embossed-card ${className}`}>
    <div className="embossed-card-inner">
      {icon && (
        <div className="embossed-icon">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <defs>
              <linearGradient id="embossGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD1DC" />
                <stop offset="100%" stopColor="#D5516B" />
              </linearGradient>
            </defs>
            <circle cx="40" cy="40" r="35" fill="url(#embossGrad)" opacity="0.15" />
            <text
              x="40"
              y="50"
              textAnchor="middle"
              fontSize="36"
              fill="url(#embossGrad)"
            >
              {icon}
            </text>
          </svg>
        </div>
      )}

      {title && <h3 className="embossed-title">{title}</h3>}

      <div className="embossed-content">
        {children}
      </div>

      {/* Embossed border effect */}
      <div className="embossed-border"></div>
    </div>
  </div>
);

// Flip Card with reveal animation
export const FlipCard = ({
  frontContent,
  backContent,
  frontTitle,
  backTitle,
  icon,
  className = ''
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`flip-card ${isFlipped ? 'flipped' : ''} ${className}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="flip-card-inner">
        {/* Front */}
        <div className="flip-card-face flip-card-front">
          {icon && <div className="flip-card-icon">{icon}</div>}
          {frontTitle && <h3 className="flip-card-title">{frontTitle}</h3>}
          <div className="flip-card-content">{frontContent}</div>
          <div className="flip-indicator">Click to reveal</div>
        </div>

        {/* Back */}
        <div className="flip-card-face flip-card-back">
          {backTitle && <h3 className="flip-card-title">{backTitle}</h3>}
          <div className="flip-card-content">{backContent}</div>
          <div className="flip-indicator">Click to return</div>
        </div>
      </div>
    </div>
  );
};

// Holographic Card with rainbow shimmer
export const HolographicCard = ({
  children,
  title,
  subtitle,
  className = ''
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div
      className={`holographic-card ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Holographic effect layer */}
      <div
        className="holographic-layer"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%,
              rgba(255, 209, 220, 0.8),
              rgba(201, 169, 224, 0.6),
              rgba(232, 180, 160, 0.8)
            )
          `
        }}
      ></div>

      <div className="holographic-content">
        {title && <h3 className="holographic-title">{title}</h3>}
        {subtitle && <p className="holographic-subtitle">{subtitle}</p>}
        {children}
      </div>

      {/* Sparkle effects */}
      <svg className="holographic-sparkles" width="100%" height="100%">
        {Array.from({ length: 8 }).map((_, i) => {
          const x = (i * 12.5 + 6.25) % 100;
          const y = ((i * 7) % 3) * 30 + 15;
          return (
            <circle
              key={i}
              cx={`${x}%`}
              cy={`${y}%`}
              r="2"
              fill="white"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="2s"
                begin={`${i * 0.25}s`}
                repeatCount="indefinite"
              />
            </circle>
          );
        })}
      </svg>
    </div>
  );
};

// Raised Card with shadow depth
export const RaisedCard = ({
  children,
  title,
  subtitle,
  color = '#D5516B',
  className = ''
}) => (
  <div className={`raised-card ${className}`}>
    {/* Shadow layers for depth */}
    <div className="raised-shadow raised-shadow-3"></div>
    <div className="raised-shadow raised-shadow-2"></div>
    <div className="raised-shadow raised-shadow-1"></div>

    <div className="raised-card-main" style={{ '--raised-color': color }}>
      {/* Accent bar */}
      <div className="raised-accent" style={{ background: color }}></div>

      <div className="raised-content">
        {title && <h3 className="raised-title">{title}</h3>}
        {subtitle && <p className="raised-subtitle">{subtitle}</p>}
        {children}
      </div>

      {/* Corner decoration */}
      <svg className="raised-corner-decoration" width="60" height="60" viewBox="0 0 60 60">
        <path
          d="M 60 0 L 60 20 Q 60 0, 40 0 L 60 0 Z"
          fill={color}
          opacity="0.15"
        />
      </svg>
    </div>
  </div>
);

export default {
  LayeredCard,
  NeumorphicCard,
  FloatingCard,
  GlassCard,
  EmbossedCard,
  FlipCard,
  HolographicCard,
  RaisedCard,
};
