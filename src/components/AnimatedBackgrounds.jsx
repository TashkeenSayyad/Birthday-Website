import React from 'react';
import '../styles/AnimatedBackgrounds.css';

// Floating petals background
export const FloatingPetals = ({ className = '' }) => (
  <div className={`animated-background floating-petals ${className}`}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="petalGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD1DC" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#D5516B" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="petalGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C9A9E0" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#9B72AA" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="petalGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8B4A0" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FF9A8B" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Generate multiple falling petals */}
      {Array.from({ length: 20 }).map((_, i) => {
        const gradients = ['petalGradient1', 'petalGradient2', 'petalGradient3'];
        const gradient = gradients[i % 3];
        const startX = (i * 5 + Math.random() * 10) % 100;
        const duration = 15 + Math.random() * 10;
        const delay = Math.random() * 10;

        return (
          <ellipse
            key={i}
            cx={`${startX}%`}
            cy="-5%"
            rx="8"
            ry="15"
            fill={`url(#${gradient})`}
            transform={`rotate(${Math.random() * 360} ${startX} -5)`}
            opacity="0"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values={`0 0; ${Math.sin(i) * 50} 110`}
              dur={`${duration}s`}
              begin={`${delay}s`}
              repeatCount="indefinite"
            />
            <animateTransform
              attributeName="transform"
              type="rotate"
              values={`0 ${startX} -5; 360 ${startX} -5`}
              dur={`${duration * 0.5}s`}
              begin={`${delay}s`}
              repeatCount="indefinite"
              additive="sum"
            />
            <animate
              attributeName="opacity"
              values="0;0.7;0.7;0"
              dur={`${duration}s`}
              begin={`${delay}s`}
              repeatCount="indefinite"
            />
          </ellipse>
        );
      })}
    </svg>
  </div>
);

// Geometric pattern with waves
export const GeometricWaves = ({ className = '' }) => (
  <div className={`animated-background geometric-waves ${className}`}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFD1DC" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#C9A9E0" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#E8B4A0" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C9A9E0" stopOpacity="0.12" />
          <stop offset="50%" stopColor="#E8B4A0" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#FFD1DC" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      {/* Multiple animated wave layers */}
      <path
        d="M0 40 Q250 20, 500 40 T1000 40 T1500 40 T2000 40 V200 H0 Z"
        fill="url(#waveGradient1)"
      >
        <animate
          attributeName="d"
          values="M0 40 Q250 20, 500 40 T1000 40 T1500 40 T2000 40 V200 H0 Z;
                  M0 40 Q250 60, 500 40 T1000 40 T1500 40 T2000 40 V200 H0 Z;
                  M0 40 Q250 20, 500 40 T1000 40 T1500 40 T2000 40 V200 H0 Z"
          dur="8s"
          repeatCount="indefinite"
        />
      </path>

      <path
        d="M0 80 Q200 60, 400 80 T800 80 T1200 80 T1600 80 V200 H0 Z"
        fill="url(#waveGradient2)"
      >
        <animate
          attributeName="d"
          values="M0 80 Q200 60, 400 80 T800 80 T1200 80 T1600 80 V200 H0 Z;
                  M0 80 Q200 100, 400 80 T800 80 T1200 80 T1600 80 V200 H0 Z;
                  M0 80 Q200 60, 400 80 T800 80 T1200 80 T1600 80 V200 H0 Z"
          dur="10s"
          repeatCount="indefinite"
        />
      </path>

      {/* Floating circles */}
      {Array.from({ length: 15 }).map((_, i) => {
        const cx = (i * 7 + Math.random() * 5) % 100;
        const cy = 10 + (i * 3) % 80;
        const duration = 6 + Math.random() * 4;
        const delay = Math.random() * 5;

        return (
          <circle
            key={i}
            cx={`${cx}%`}
            cy={`${cy}%`}
            r="3"
            fill={i % 3 === 0 ? '#FFD1DC' : i % 3 === 1 ? '#C9A9E0' : '#E8B4A0'}
            opacity="0.3"
          >
            <animate
              attributeName="cy"
              values={`${cy}%;${(cy + 20) % 100}%;${cy}%`}
              dur={`${duration}s`}
              begin={`${delay}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.3;0.6;0.3"
              dur={`${duration}s`}
              begin={`${delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        );
      })}
    </svg>
  </div>
);

// Sparkle constellation
export const SparkleConstellation = ({ className = '' }) => (
  <div className={`animated-background sparkle-constellation ${className}`}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sparkleGlow">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Create a constellation of sparkles */}
      {Array.from({ length: 50 }).map((_, i) => {
        const cx = Math.random() * 100;
        const cy = Math.random() * 100;
        const size = 1 + Math.random() * 2;
        const duration = 2 + Math.random() * 3;
        const delay = Math.random() * 5;

        return (
          <g key={i}>
            <circle
              cx={`${cx}%`}
              cy={`${cy}%`}
              r={size}
              fill="url(#sparkleGlow)"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                values="0;0.8;0"
                dur={`${duration}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="r"
                values={`${size};${size * 1.5};${size}`}
                dur={`${duration}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
            </circle>

            {/* Star rays */}
            {[0, 45, 90, 135].map((angle, j) => {
              const rad = (angle * Math.PI) / 180;
              const length = size * 3;
              return (
                <line
                  key={j}
                  x1={`${cx}%`}
                  y1={`${cy}%`}
                  x2={`calc(${cx}% + ${Math.cos(rad) * length}px)`}
                  y2={`calc(${cy}% + ${Math.sin(rad) * length}px)`}
                  stroke="#FFD700"
                  strokeWidth="1"
                  opacity="0"
                >
                  <animate
                    attributeName="opacity"
                    values="0;0.6;0"
                    dur={`${duration}s`}
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                  />
                </line>
              );
            })}
          </g>
        );
      })}

      {/* Connecting lines between some sparkles */}
      {Array.from({ length: 20 }).map((_, i) => {
        const x1 = Math.random() * 100;
        const y1 = Math.random() * 100;
        const x2 = Math.random() * 100;
        const y2 = Math.random() * 100;
        const duration = 3 + Math.random() * 2;
        const delay = Math.random() * 5;

        return (
          <line
            key={`line-${i}`}
            x1={`${x1}%`}
            y1={`${y1}%`}
            x2={`${x2}%`}
            y2={`${y2}%`}
            stroke="#C9A9E0"
            strokeWidth="0.5"
            opacity="0"
          >
            <animate
              attributeName="opacity"
              values="0;0.3;0"
              dur={`${duration}s`}
              begin={`${delay}s`}
              repeatCount="indefinite"
            />
          </line>
        );
      })}
    </svg>
  </div>
);

// Heart burst pattern
export const HeartBurst = ({ className = '' }) => (
  <div className={`animated-background heart-burst ${className}`}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="heartBurstGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8B4A0" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#D5516B" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Generate hearts emanating from center */}
      {Array.from({ length: 25 }).map((_, i) => {
        const angle = (i * 360 / 25) * (Math.PI / 180);
        const distance = 30 + Math.random() * 40;
        const endX = 50 + Math.cos(angle) * distance;
        const endY = 50 + Math.sin(angle) * distance;
        const duration = 4 + Math.random() * 3;
        const delay = Math.random() * 5;
        const size = 8 + Math.random() * 6;

        return (
          <path
            key={i}
            d={`M 0,${size * 0.7}
                C 0,${size * 0.4} ${size * 0.4},0 ${size * 0.5},${size * 0.3}
                C ${size * 0.6},0 ${size},${size * 0.4} ${size},${size * 0.7}
                C ${size},${size * 1.2} ${size * 0.5},${size * 1.5} ${size * 0.5},${size * 1.5}
                C ${size * 0.5},${size * 1.5} 0,${size * 1.2} 0,${size * 0.7} Z`}
            fill="url(#heartBurstGradient)"
            opacity="0"
            transform={`translate(50%, 50%)`}
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values={`50% 50%; ${endX}% ${endY}%`}
              dur={`${duration}s`}
              begin={`${delay}s`}
              repeatCount="indefinite"
            />
            <animateTransform
              attributeName="transform"
              type="scale"
              values="0;1;0.8"
              dur={`${duration}s`}
              begin={`${delay}s`}
              repeatCount="indefinite"
              additive="sum"
            />
            <animate
              attributeName="opacity"
              values="0;0.6;0"
              dur={`${duration}s`}
              begin={`${delay}s`}
              repeatCount="indefinite"
            />
          </path>
        );
      })}
    </svg>
  </div>
);

// Gradient mesh background
export const GradientMesh = ({ className = '' }) => (
  <div className={`animated-background gradient-mesh ${className}`}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="meshGradient1" cx="30%" cy="30%">
          <stop offset="0%" stopColor="#FFD1DC" stopOpacity="0.3">
            <animate attributeName="stop-opacity" values="0.3;0.5;0.3" dur="8s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#FFD1DC" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="meshGradient2" cx="70%" cy="50%">
          <stop offset="0%" stopColor="#C9A9E0" stopOpacity="0.3">
            <animate attributeName="stop-opacity" values="0.3;0.5;0.3" dur="10s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#C9A9E0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="meshGradient3" cx="50%" cy="70%">
          <stop offset="0%" stopColor="#E8B4A0" stopOpacity="0.3">
            <animate attributeName="stop-opacity" values="0.3;0.5;0.3" dur="12s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#E8B4A0" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="100%" height="100%" fill="url(#meshGradient1)" />
      <rect width="100%" height="100%" fill="url(#meshGradient2)" />
      <rect width="100%" height="100%" fill="url(#meshGradient3)" />

      {/* Animated gradient circles */}
      <circle cx="30%" cy="30%" r="0" fill="#FFD1DC" opacity="0.1">
        <animate attributeName="r" values="0;40%;0" dur="15s" repeatCount="indefinite" />
      </circle>
      <circle cx="70%" cy="50%" r="0" fill="#C9A9E0" opacity="0.1">
        <animate attributeName="r" values="0;45%;0" dur="18s" begin="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="50%" cy="70%" r="0" fill="#E8B4A0" opacity="0.1">
        <animate attributeName="r" values="0;35%;0" dur="20s" begin="6s" repeatCount="indefinite" />
      </circle>
    </svg>
  </div>
);

// Aurora waves
export const AuroraWaves = ({ className = '' }) => (
  <div className={`animated-background aurora-waves ${className}`}>
    <svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="aurora1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD1DC" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#C9A9E0" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#E8B4A0" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="aurora2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8B4A0" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#FFD1DC" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#C9A9E0" stopOpacity="0.2" />
        </linearGradient>
        <filter id="auroraBlur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
        </filter>
      </defs>

      {/* Multiple aurora layers */}
      <path
        d="M-200 50 Q0 0, 200 50 T600 50 T1000 50 T1400 50"
        stroke="url(#aurora1)"
        strokeWidth="100"
        fill="none"
        filter="url(#auroraBlur)"
        opacity="0.6"
      >
        <animate
          attributeName="d"
          values="M-200 50 Q0 0, 200 50 T600 50 T1000 50 T1400 50;
                  M-200 50 Q0 100, 200 50 T600 50 T1000 50 T1400 50;
                  M-200 50 Q0 0, 200 50 T600 50 T1000 50 T1400 50"
          dur="12s"
          repeatCount="indefinite"
        />
      </path>

      <path
        d="M-200 150 Q0 100, 200 150 T600 150 T1000 150 T1400 150"
        stroke="url(#aurora2)"
        strokeWidth="120"
        fill="none"
        filter="url(#auroraBlur)"
        opacity="0.5"
      >
        <animate
          attributeName="d"
          values="M-200 150 Q0 100, 200 150 T600 150 T1000 150 T1400 150;
                  M-200 150 Q0 200, 200 150 T600 150 T1000 150 T1400 150;
                  M-200 150 Q0 100, 200 150 T600 150 T1000 150 T1400 150"
          dur="15s"
          repeatCount="indefinite"
        />
      </path>

      <path
        d="M-200 250 Q0 200, 200 250 T600 250 T1000 250 T1400 250"
        stroke="url(#aurora1)"
        strokeWidth="80"
        fill="none"
        filter="url(#auroraBlur)"
        opacity="0.4"
      >
        <animate
          attributeName="d"
          values="M-200 250 Q0 200, 200 250 T600 250 T1000 250 T1400 250;
                  M-200 250 Q0 300, 200 250 T600 250 T1000 250 T1400 250;
                  M-200 250 Q0 200, 200 250 T600 250 T1000 250 T1400 250"
          dur="18s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  </div>
);

export default {
  FloatingPetals,
  GeometricWaves,
  SparkleConstellation,
  HeartBurst,
  GradientMesh,
  AuroraWaves,
};
