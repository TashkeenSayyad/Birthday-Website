import React from 'react';
import '../styles/DecorativeElements.css';

// Beautiful floral ornament
export const FloralOrnament = ({ className = '', size = 120, color = '#D5516B' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    className={`floral-ornament ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Center flower */}
    <circle cx="100" cy="100" r="12" fill={color} opacity="0.9">
      <animate attributeName="r" values="12;14;12" dur="3s" repeatCount="indefinite" />
    </circle>

    {/* Petals */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const x = 100 + Math.cos(rad) * 25;
      const y = 100 + Math.sin(rad) * 25;
      return (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx="15"
          ry="25"
          fill={color}
          opacity="0.7"
          transform={`rotate(${angle} ${x} ${y})`}
        >
          <animate
            attributeName="opacity"
            values="0.7;0.9;0.7"
            dur="3s"
            begin={`${i * 0.1}s`}
            repeatCount="indefinite"
          />
        </ellipse>
      );
    })}

    {/* Decorative leaves */}
    {[30, 120, 210, 300].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const x = 100 + Math.cos(rad) * 50;
      const y = 100 + Math.sin(rad) * 50;
      return (
        <path
          key={`leaf-${i}`}
          d={`M ${x} ${y} Q ${x + Math.cos(rad) * 20} ${y + Math.sin(rad) * 20} ${x + Math.cos(rad) * 15} ${y + Math.sin(rad) * 30}`}
          stroke="#9B72AA"
          strokeWidth="3"
          fill="none"
          opacity="0.6"
          strokeLinecap="round"
        />
      );
    })}
  </svg>
);

// Elegant decorative heart
export const DecorativeHeart = ({ className = '', size = 80, primaryColor = '#E8B4A0', accentColor = '#D5516B' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={`decorative-heart ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={primaryColor} stopOpacity="0.9" />
        <stop offset="100%" stopColor={accentColor} stopOpacity="0.95" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    {/* Main heart */}
    <path
      d="M50,85 C50,85 20,60 20,40 C20,25 30,20 40,25 C45,28 50,35 50,35 C50,35 55,28 60,25 C70,20 80,25 80,40 C80,60 50,85 50,85 Z"
      fill="url(#heartGradient)"
      filter="url(#glow)"
    >
      <animate
        attributeName="d"
        values="M50,85 C50,85 20,60 20,40 C20,25 30,20 40,25 C45,28 50,35 50,35 C50,35 55,28 60,25 C70,20 80,25 80,40 C80,60 50,85 50,85 Z;
                M50,87 C50,87 18,60 18,40 C18,24 29,19 40,24 C46,27 50,35 50,35 C50,35 54,27 60,24 C71,19 82,24 82,40 C82,60 50,87 50,87 Z;
                M50,85 C50,85 20,60 20,40 C20,25 30,20 40,25 C45,28 50,35 50,35 C50,35 55,28 60,25 C70,20 80,25 80,40 C80,60 50,85 50,85 Z"
        dur="2s"
        repeatCount="indefinite"
      />
    </path>

    {/* Decorative swirls */}
    <path
      d="M 35 35 Q 30 30 28 25"
      stroke={primaryColor}
      strokeWidth="2"
      fill="none"
      opacity="0.7"
      strokeLinecap="round"
    />
    <path
      d="M 65 35 Q 70 30 72 25"
      stroke={primaryColor}
      strokeWidth="2"
      fill="none"
      opacity="0.7"
      strokeLinecap="round"
    />
  </svg>
);

// Ornamental corner decoration
export const CornerOrnament = ({ className = '', size = 150, flip = false, color = '#9B72AA' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 150 150"
    className={`corner-ornament ${className}`}
    style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Main curved line */}
    <path
      d="M 10 10 Q 50 10 80 40 T 140 140"
      stroke={color}
      strokeWidth="2"
      fill="none"
      opacity="0.6"
      strokeLinecap="round"
    />

    {/* Decorative dots along the curve */}
    {[
      { cx: 10, cy: 10, r: 4 },
      { cx: 40, cy: 20, r: 3 },
      { cx: 70, cy: 35, r: 3.5 },
      { cx: 95, cy: 60, r: 3 },
      { cx: 115, cy: 90, r: 3.5 },
      { cx: 130, cy: 120, r: 3 },
      { cx: 140, cy: 140, r: 4 },
    ].map((dot, i) => (
      <circle
        key={i}
        cx={dot.cx}
        cy={dot.cy}
        r={dot.r}
        fill={color}
        opacity="0.7"
      >
        <animate
          attributeName="opacity"
          values="0.7;1;0.7"
          dur="2s"
          begin={`${i * 0.2}s`}
          repeatCount="indefinite"
        />
      </circle>
    ))}

    {/* Small leaf decorations */}
    <ellipse cx="45" cy="25" rx="8" ry="15" fill={color} opacity="0.4" transform="rotate(45 45 25)" />
    <ellipse cx="100" cy="75" rx="8" ry="15" fill={color} opacity="0.4" transform="rotate(45 100 75)" />
  </svg>
);

// Delicate butterfly
export const Butterfly = ({ className = '', size = 60, wingColor = '#C9A9E0' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={`butterfly ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={wingColor} stopOpacity="0.9" />
        <stop offset="100%" stopColor="#9B72AA" stopOpacity="0.7" />
      </linearGradient>
    </defs>

    {/* Left wing top */}
    <ellipse
      cx="35"
      cy="35"
      rx="18"
      ry="25"
      fill="url(#wingGradient)"
      transform="rotate(-20 35 35)"
    >
      <animate
        attributeName="ry"
        values="25;28;25"
        dur="1.5s"
        repeatCount="indefinite"
      />
    </ellipse>

    {/* Left wing bottom */}
    <ellipse
      cx="38"
      cy="60"
      rx="15"
      ry="20"
      fill="url(#wingGradient)"
      transform="rotate(-10 38 60)"
    >
      <animate
        attributeName="ry"
        values="20;23;20"
        dur="1.5s"
        repeatCount="indefinite"
      />
    </ellipse>

    {/* Right wing top */}
    <ellipse
      cx="65"
      cy="35"
      rx="18"
      ry="25"
      fill="url(#wingGradient)"
      transform="rotate(20 65 35)"
    >
      <animate
        attributeName="ry"
        values="25;28;25"
        dur="1.5s"
        repeatCount="indefinite"
      />
    </ellipse>

    {/* Right wing bottom */}
    <ellipse
      cx="62"
      cy="60"
      rx="15"
      ry="20"
      fill="url(#wingGradient)"
      transform="rotate(10 62 60)"
    >
      <animate
        attributeName="ry"
        values="20;23;20"
        dur="1.5s"
        repeatCount="indefinite"
      />
    </ellipse>

    {/* Body */}
    <ellipse cx="50" cy="50" rx="4" ry="30" fill="#8B4367" opacity="0.8" />

    {/* Antennae */}
    <path d="M 48 25 Q 45 15 43 10" stroke="#8B4367" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M 52 25 Q 55 15 57 10" stroke="#8B4367" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <circle cx="43" cy="10" r="2" fill="#8B4367" />
    <circle cx="57" cy="10" r="2" fill="#8B4367" />
  </svg>
);

// Elegant rose
export const Rose = ({ className = '', size = 100, color = '#D5516B' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={`rose ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="roseGradient">
        <stop offset="0%" stopColor="#FFD1DC" stopOpacity="0.9" />
        <stop offset="50%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#8B4367" stopOpacity="0.9" />
      </radialGradient>
    </defs>

    {/* Outer petals */}
    {[0, 60, 120, 180, 240, 300].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const x = 50 + Math.cos(rad) * 25;
      const y = 50 + Math.sin(rad) * 25;
      return (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx="18"
          ry="28"
          fill="url(#roseGradient)"
          opacity="0.6"
          transform={`rotate(${angle} ${x} ${y})`}
        >
          <animate
            attributeName="opacity"
            values="0.6;0.8;0.6"
            dur="4s"
            begin={`${i * 0.2}s`}
            repeatCount="indefinite"
          />
        </ellipse>
      );
    })}

    {/* Middle petals */}
    {[30, 90, 150, 210, 270, 330].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const x = 50 + Math.cos(rad) * 15;
      const y = 50 + Math.sin(rad) * 15;
      return (
        <ellipse
          key={`mid-${i}`}
          cx={x}
          cy={y}
          rx="12"
          ry="18"
          fill={color}
          opacity="0.8"
          transform={`rotate(${angle} ${x} ${y})`}
        />
      );
    })}

    {/* Center */}
    <circle cx="50" cy="50" r="8" fill="#8B4367" opacity="0.9">
      <animate attributeName="r" values="8;9;8" dur="3s" repeatCount="indefinite" />
    </circle>

    {/* Stem */}
    <path
      d="M 50 70 Q 48 85 50 95"
      stroke="#6B8E23"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />

    {/* Leaves */}
    <ellipse cx="45" cy="80" rx="8" ry="5" fill="#6B8E23" opacity="0.7" transform="rotate(-30 45 80)" />
    <ellipse cx="55" cy="85" rx="8" ry="5" fill="#6B8E23" opacity="0.7" transform="rotate(30 55 85)" />
  </svg>
);

// Sparkle burst
export const SparkleBurst = ({ className = '', size = 40, color = '#FFD700' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    className={`sparkle-burst ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="sparkleGradient">
        <stop offset="0%" stopColor={color} stopOpacity="1" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Center star */}
    <circle cx="20" cy="20" r="3" fill={color}>
      <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="1;0.6;1" dur="1.5s" repeatCount="indefinite" />
    </circle>

    {/* Rays */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const x1 = 20 + Math.cos(rad) * 4;
      const y1 = 20 + Math.sin(rad) * 4;
      const x2 = 20 + Math.cos(rad) * 15;
      const y2 = 20 + Math.sin(rad) * 15;
      return (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.8"
        >
          <animate
            attributeName="opacity"
            values="0.8;0.3;0.8"
            dur="1.5s"
            begin={`${i * 0.1}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="x2"
            values={`${x2};${20 + Math.cos(rad) * 18};${x2}`}
            dur="1.5s"
            begin={`${i * 0.1}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="y2"
            values={`${y2};${20 + Math.sin(rad) * 18};${y2}`}
            dur="1.5s"
            begin={`${i * 0.1}s`}
            repeatCount="indefinite"
          />
        </line>
      );
    })}
  </svg>
);

// Decorative divider
export const DecorativeDivider = ({ className = '', width = 300, color = '#9B72AA' }) => (
  <svg
    width={width}
    height="60"
    viewBox="0 0 300 60"
    className={`decorative-divider ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Center ornament */}
    <circle cx="150" cy="30" r="6" fill={color} opacity="0.8">
      <animate attributeName="r" values="6;7;6" dur="2s" repeatCount="indefinite" />
    </circle>

    {/* Curved lines */}
    <path
      d="M 150 30 Q 120 25 90 30"
      stroke={color}
      strokeWidth="2"
      fill="none"
      opacity="0.7"
      strokeLinecap="round"
    />
    <path
      d="M 150 30 Q 180 25 210 30"
      stroke={color}
      strokeWidth="2"
      fill="none"
      opacity="0.7"
      strokeLinecap="round"
    />

    {/* Decorative dots */}
    {[90, 110, 130, 170, 190, 210].map((x, i) => (
      <circle
        key={i}
        cx={x}
        cy="30"
        r="3"
        fill={color}
        opacity="0.6"
      >
        <animate
          attributeName="opacity"
          values="0.6;1;0.6"
          dur="2s"
          begin={`${i * 0.2}s`}
          repeatCount="indefinite"
        />
      </circle>
    ))}

    {/* Small flowers at ends */}
    {[70, 230].map((cx, i) => (
      <g key={i}>
        {[0, 72, 144, 216, 288].map((angle, j) => {
          const rad = (angle * Math.PI) / 180;
          const x = cx + Math.cos(rad) * 8;
          const y = 30 + Math.sin(rad) * 8;
          return (
            <circle
              key={j}
              cx={x}
              cy={y}
              r="4"
              fill={color}
              opacity="0.5"
            />
          );
        })}
        <circle cx={cx} cy="30" r="3" fill="#D5516B" opacity="0.7" />
      </g>
    ))}
  </svg>
);

export default {
  FloralOrnament,
  DecorativeHeart,
  CornerOrnament,
  Butterfly,
  Rose,
  SparkleBurst,
  DecorativeDivider,
};
