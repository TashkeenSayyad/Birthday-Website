import React from 'react';
import { FloralOrnament, DecorativeHeart, CornerOrnament, Rose, DecorativeDivider } from './DecorativeElements';
import '../styles/EnhancedHero.css';

// Elegant hero section with ornamental decorations
export const ElegantHero = ({
  title,
  subtitle,
  description,
  className = ''
}) => (
  <div className={`elegant-hero ${className}`}>
    {/* Corner decorations */}
    <div className="hero-corner hero-corner-tl">
      <CornerOrnament size={120} color="#9B72AA" />
    </div>
    <div className="hero-corner hero-corner-tr">
      <CornerOrnament size={120} flip={true} color="#D5516B" />
    </div>

    {/* Floating decorative elements */}
    <div className="hero-decoration hero-decoration-left">
      <Rose size={80} />
    </div>
    <div className="hero-decoration hero-decoration-right">
      <FloralOrnament size={100} />
    </div>

    <div className="elegant-hero-content">
      {/* Decorative top hearts */}
      <div className="hero-hearts-top">
        <DecorativeHeart size={50} />
        <DecorativeHeart size={60} primaryColor="#C9A9E0" accentColor="#9B72AA" />
        <DecorativeHeart size={50} primaryColor="#FFD1DC" accentColor="#E8B4A0" />
      </div>

      <h1 className="elegant-hero-title">{title}</h1>

      {/* Decorative divider */}
      <DecorativeDivider width={400} />

      <p className="elegant-hero-subtitle">{subtitle}</p>

      {description && (
        <p className="elegant-hero-description">{description}</p>
      )}

      {/* Bottom ornament */}
      <div className="hero-bottom-ornament">
        <FloralOrnament size={80} color="#E8B4A0" />
      </div>
    </div>

    {/* Animated background gradient */}
    <div className="hero-gradient-overlay"></div>
  </div>
);

// Cinematic hero with parallax effect
export const CinematicHero = ({
  title,
  subtitle,
  children,
  className = ''
}) => (
  <div className={`cinematic-hero ${className}`}>
    {/* Background layers for parallax */}
    <div className="cinematic-bg-layer layer-1">
      <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="cinematicGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD1DC" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#C9A9E0" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#E8B4A0" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <circle cx="20%" cy="30%" r="300" fill="url(#cinematicGrad1)">
          <animate attributeName="cx" values="20%;25%;20%" dur="20s" repeatCount="indefinite" />
          <animate attributeName="cy" values="30%;25%;30%" dur="15s" repeatCount="indefinite" />
        </circle>
        <circle cx="80%" cy="60%" r="400" fill="url(#cinematicGrad1)">
          <animate attributeName="cx" values="80%;75%;80%" dur="25s" repeatCount="indefinite" />
          <animate attributeName="cy" values="60%;65%;60%" dur="18s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>

    <div className="cinematic-bg-layer layer-2">
      <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="cinematicGrad2">
            <stop offset="0%" stopColor="#E8B4A0" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#E8B4A0" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50%" cy="50%" r="500" fill="url(#cinematicGrad2)">
          <animate attributeName="r" values="500;550;500" dur="12s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>

    {/* Content */}
    <div className="cinematic-hero-content">
      <div className="cinematic-title-wrapper">
        <h1 className="cinematic-hero-title">
          {title.split('').map((char, i) => (
            <span
              key={i}
              className="cinematic-char"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
      </div>

      {subtitle && (
        <p className="cinematic-hero-subtitle">{subtitle}</p>
      )}

      {children}
    </div>

    {/* Vignette overlay */}
    <div className="cinematic-vignette"></div>
  </div>
);

// Minimalist elegant hero
export const MinimalistHero = ({
  title,
  subtitle,
  accentText,
  className = ''
}) => (
  <div className={`minimalist-hero ${className}`}>
    <div className="minimalist-hero-content">
      {/* Accent decoration */}
      {accentText && (
        <div className="minimalist-accent">
          <span className="accent-line"></span>
          <span className="accent-text">{accentText}</span>
          <span className="accent-line"></span>
        </div>
      )}

      <h1 className="minimalist-hero-title">
        {title.split(' ').map((word, i) => (
          <span
            key={i}
            className="minimalist-word"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            {word}
          </span>
        ))}
      </h1>

      {subtitle && (
        <p className="minimalist-hero-subtitle">{subtitle}</p>
      )}

      {/* Geometric decoration */}
      <div className="minimalist-decoration">
        <svg width="120" height="4" viewBox="0 0 120 4">
          <rect x="0" y="0" width="40" height="4" fill="#D5516B" opacity="0.8">
            <animate attributeName="width" values="40;50;40" dur="2s" repeatCount="indefinite" />
          </rect>
          <circle cx="60" cy="2" r="3" fill="#E8B4A0">
            <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite" />
          </circle>
          <rect x="80" y="0" width="40" height="4" fill="#9B72AA" opacity="0.8">
            <animate attributeName="width" values="40;50;40" dur="2s" repeatCount="indefinite" />
          </rect>
        </svg>
      </div>
    </div>

    {/* Subtle animated background */}
    <div className="minimalist-bg">
      <svg width="100%" height="100%" preserveAspectRatio="none">
        <defs>
          <linearGradient id="minimalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF8F0" stopOpacity="1" />
            <stop offset="50%" stopColor="#FFE9E9" stopOpacity="1" />
            <stop offset="100%" stopColor="#F5E6F0" stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#minimalGrad)" />
      </svg>
    </div>
  </div>
);

// Romantic storybook hero
export const StorybookHero = ({
  title,
  subtitle,
  chapter,
  className = ''
}) => (
  <div className={`storybook-hero ${className}`}>
    {/* Decorative page corners */}
    <div className="page-corner page-corner-tl"></div>
    <div className="page-corner page-corner-tr"></div>
    <div className="page-corner page-corner-bl"></div>
    <div className="page-corner page-corner-br"></div>

    {/* Book texture overlay */}
    <div className="book-texture"></div>

    <div className="storybook-hero-content">
      {chapter && (
        <div className="storybook-chapter">
          <svg width="200" height="60" viewBox="0 0 200 60">
            <text
              x="100"
              y="30"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#8B4367"
              fontSize="14"
              fontFamily="Georgia, serif"
              fontStyle="italic"
            >
              {chapter}
            </text>
            <line x1="20" y1="40" x2="80" y2="40" stroke="#9B72AA" strokeWidth="1" opacity="0.6" />
            <line x1="120" y1="40" x2="180" y2="40" stroke="#9B72AA" strokeWidth="1" opacity="0.6" />
          </svg>
        </div>
      )}

      <h1 className="storybook-hero-title">
        {title}
      </h1>

      {/* Decorative initial letter effect */}
      <div className="storybook-initial-letter">
        <svg width="80" height="80" viewBox="0 0 80 80">
          <defs>
            <linearGradient id="initialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D5516B" />
              <stop offset="100%" stopColor="#9B72AA" />
            </linearGradient>
          </defs>
          <rect x="5" y="5" width="70" height="70" fill="url(#initialGrad)" opacity="0.1" rx="4" />
          <text
            x="40"
            y="55"
            textAnchor="middle"
            fill="url(#initialGrad)"
            fontSize="48"
            fontFamily="Playfair Display, serif"
            fontWeight="bold"
          >
            {title.charAt(0)}
          </text>
        </svg>
      </div>

      {subtitle && (
        <p className="storybook-hero-subtitle">{subtitle}</p>
      )}

      {/* Decorative flourish */}
      <div className="storybook-flourish">
        <svg width="300" height="40" viewBox="0 0 300 40">
          <path
            d="M 10 20 Q 75 10, 150 20 Q 225 30, 290 20"
            stroke="#9B72AA"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
          />
          {[75, 150, 225].map((x, i) => (
            <circle key={i} cx={x} cy="20" r="4" fill="#D5516B" opacity="0.7">
              <animate
                attributeName="opacity"
                values="0.7;1;0.7"
                dur="2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </svg>
      </div>
    </div>
  </div>
);

// Glass morphism hero
export const GlassMorphHero = ({
  title,
  subtitle,
  children,
  className = ''
}) => (
  <div className={`glass-morph-hero ${className}`}>
    {/* Colorful background blobs */}
    <div className="glass-blob glass-blob-1"></div>
    <div className="glass-blob glass-blob-2"></div>
    <div className="glass-blob glass-blob-3"></div>

    {/* Glass card */}
    <div className="glass-card">
      <div className="glass-card-content">
        <h1 className="glass-hero-title">{title}</h1>

        {subtitle && (
          <p className="glass-hero-subtitle">{subtitle}</p>
        )}

        {children}

        {/* Decorative glass ornament */}
        <div className="glass-ornament">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD1DC" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#C9A9E0" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#E8B4A0" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="30" fill="none" stroke="url(#glassGrad)" strokeWidth="2" opacity="0.8">
              <animate attributeName="r" values="30;35;30" dur="3s" repeatCount="indefinite" />
            </circle>
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = 50 + Math.cos(rad) * 20;
              const y = 50 + Math.sin(rad) * 20;
              return (
                <circle key={i} cx={x} cy={y} r="4" fill="url(#glassGrad)" opacity="0.7">
                  <animate
                    attributeName="opacity"
                    values="0.7;1;0.7"
                    dur="2s"
                    begin={`${i * 0.2}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Shimmer effect */}
      <div className="glass-shimmer"></div>
    </div>
  </div>
);

export default {
  ElegantHero,
  CinematicHero,
  MinimalistHero,
  StorybookHero,
  GlassMorphHero,
};
