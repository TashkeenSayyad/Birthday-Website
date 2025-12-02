import React from 'react';
import '../styles/ElegantFrames.css';

// Ornate rectangular frame with flourishes
export const OrnateFrame = ({
  children,
  className = '',
  width = '100%',
  height = 'auto',
  borderColor = '#9B72AA',
  accentColor = '#D5516B'
}) => (
  <div className={`ornate-frame-container ${className}`} style={{ width, height }}>
    <svg
      className="ornate-frame-svg"
      width="100%"
      height="100%"
      viewBox="0 0 400 500"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={borderColor} stopOpacity="0.8" />
          <stop offset="50%" stopColor={accentColor} stopOpacity="0.6" />
          <stop offset="100%" stopColor={borderColor} stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Main border */}
      <rect
        x="10"
        y="10"
        width="380"
        height="480"
        fill="none"
        stroke="url(#frameGradient)"
        strokeWidth="3"
        rx="8"
      />

      {/* Inner decorative border */}
      <rect
        x="20"
        y="20"
        width="360"
        height="460"
        fill="none"
        stroke={borderColor}
        strokeWidth="1.5"
        strokeDasharray="8,4"
        opacity="0.5"
        rx="4"
      />

      {/* Corner flourishes - Top Left */}
      <g opacity="0.8">
        <path d="M 30 30 Q 25 25 30 20" stroke={accentColor} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 30 30 Q 25 25 20 30" stroke={accentColor} strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="30" cy="30" r="3" fill={accentColor} />
      </g>

      {/* Corner flourishes - Top Right */}
      <g opacity="0.8">
        <path d="M 370 30 Q 375 25 370 20" stroke={accentColor} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 370 30 Q 375 25 380 30" stroke={accentColor} strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="370" cy="30" r="3" fill={accentColor} />
      </g>

      {/* Corner flourishes - Bottom Left */}
      <g opacity="0.8">
        <path d="M 30 470 Q 25 475 30 480" stroke={accentColor} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 30 470 Q 25 475 20 470" stroke={accentColor} strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="30" cy="470" r="3" fill={accentColor} />
      </g>

      {/* Corner flourishes - Bottom Right */}
      <g opacity="0.8">
        <path d="M 370 470 Q 375 475 370 480" stroke={accentColor} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 370 470 Q 375 475 380 470" stroke={accentColor} strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="370" cy="470" r="3" fill={accentColor} />
      </g>

      {/* Top center ornament */}
      <g transform="translate(200, 15)">
        {[-15, -7, 0, 7, 15].map((x, i) => (
          <circle key={i} cx={x} cy="0" r="2" fill={borderColor} opacity="0.7" />
        ))}
      </g>

      {/* Bottom center ornament */}
      <g transform="translate(200, 485)">
        {[-15, -7, 0, 7, 15].map((x, i) => (
          <circle key={i} cx={x} cy="0" r="2" fill={borderColor} opacity="0.7" />
        ))}
      </g>
    </svg>

    <div className="ornate-frame-content">
      {children}
    </div>
  </div>
);

// Circular frame with floral border
export const FloralCircleFrame = ({
  children,
  className = '',
  size = 300,
  borderColor = '#E8B4A0',
  accentColor = '#D5516B'
}) => (
  <div className={`floral-circle-frame ${className}`} style={{ width: size, height: size }}>
    <svg
      width={size}
      height={size}
      viewBox="0 0 300 300"
      className="floral-circle-svg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="floralGlow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Outer circle */}
      <circle
        cx="150"
        cy="150"
        r="135"
        fill="none"
        stroke={borderColor}
        strokeWidth="3"
        opacity="0.8"
        filter="url(#floralGlow)"
      />

      {/* Inner decorative circle */}
      <circle
        cx="150"
        cy="150"
        r="125"
        fill="none"
        stroke={borderColor}
        strokeWidth="1.5"
        strokeDasharray="6,3"
        opacity="0.5"
      />

      {/* Floral decorations around the circle */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x = 150 + Math.cos(angle) * 135;
        const y = 150 + Math.sin(angle) * 135;
        return (
          <g key={i} transform={`translate(${x}, ${y})`}>
            {/* Small flower */}
            {[0, 72, 144, 216, 288].map((petalAngle, j) => {
              const rad = (petalAngle * Math.PI) / 180;
              const px = Math.cos(rad) * 6;
              const py = Math.sin(rad) * 6;
              return (
                <ellipse
                  key={j}
                  cx={px}
                  cy={py}
                  rx="3"
                  ry="5"
                  fill={i % 2 === 0 ? accentColor : borderColor}
                  opacity="0.7"
                  transform={`rotate(${petalAngle} ${px} ${py})`}
                />
              );
            })}
            <circle cx="0" cy="0" r="2" fill={accentColor} opacity="0.9" />
          </g>
        );
      })}

      {/* Corner flourishes at cardinal points */}
      {[0, 90, 180, 270].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 150 + Math.cos(rad) * 145;
        const y = 150 + Math.sin(rad) * 145;
        return (
          <g key={`flourish-${i}`}>
            <path
              d={`M ${150 + Math.cos(rad) * 140} ${150 + Math.sin(rad) * 140} Q ${x} ${y} ${150 + Math.cos(rad) * 150} ${150 + Math.sin(rad) * 150}`}
              stroke={accentColor}
              strokeWidth="2"
              fill="none"
              opacity="0.6"
            />
          </g>
        );
      })}
    </svg>

    <div className="floral-circle-content">
      {children}
    </div>
  </div>
);

// Art Deco inspired frame
export const ArtDecoFrame = ({
  children,
  className = '',
  borderColor = '#9B72AA',
  accentColor = '#E8B4A0'
}) => (
  <div className={`art-deco-frame ${className}`}>
    <svg
      className="art-deco-svg"
      width="100%"
      height="100%"
      viewBox="0 0 400 300"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main border with geometric pattern */}
      <rect
        x="15"
        y="15"
        width="370"
        height="270"
        fill="none"
        stroke={borderColor}
        strokeWidth="2"
      />

      {/* Geometric corner decorations - Top Left */}
      <g stroke={accentColor} strokeWidth="2" fill="none" opacity="0.8">
        <line x1="15" y1="15" x2="40" y2="15" />
        <line x1="15" y1="15" x2="15" y2="40" />
        <polyline points="30,15 30,30 15,30" />
      </g>

      {/* Top Right */}
      <g stroke={accentColor} strokeWidth="2" fill="none" opacity="0.8">
        <line x1="385" y1="15" x2="360" y2="15" />
        <line x1="385" y1="15" x2="385" y2="40" />
        <polyline points="370,15 370,30 385,30" />
      </g>

      {/* Bottom Left */}
      <g stroke={accentColor} strokeWidth="2" fill="none" opacity="0.8">
        <line x1="15" y1="285" x2="40" y2="285" />
        <line x1="15" y1="285" x2="15" y2="260" />
        <polyline points="30,285 30,270 15,270" />
      </g>

      {/* Bottom Right */}
      <g stroke={accentColor} strokeWidth="2" fill="none" opacity="0.8">
        <line x1="385" y1="285" x2="360" y2="285" />
        <line x1="385" y1="285" x2="385" y2="260" />
        <polyline points="370,285 370,270 385,270" />
      </g>

      {/* Decorative rays at top center */}
      <g transform="translate(200, 20)" opacity="0.6">
        {[-30, -20, -10, 0, 10, 20, 30].map((x, i) => (
          <line
            key={i}
            x1={x}
            y1="0"
            x2={x}
            y2="-10"
            stroke={borderColor}
            strokeWidth="1.5"
          >
            <animate
              attributeName="y2"
              values="-10;-12;-10"
              dur="2s"
              begin={`${i * 0.1}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}
      </g>

      {/* Geometric pattern at bottom */}
      <g transform="translate(200, 280)" opacity="0.6">
        {[-20, -10, 0, 10, 20].map((x, i) => (
          <circle
            key={i}
            cx={x}
            cy="0"
            r="2"
            fill={accentColor}
          >
            <animate
              attributeName="opacity"
              values="0.6;1;0.6"
              dur="2s"
              begin={`${i * 0.15}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>
    </svg>

    <div className="art-deco-content">
      {children}
    </div>
  </div>
);

// Vintage photo frame
export const VintagePhotoFrame = ({
  children,
  className = '',
  borderColor = '#A67C89',
  matteColor = '#FFF8E7'
}) => (
  <div className={`vintage-photo-frame ${className}`}>
    <svg
      className="vintage-frame-svg"
      width="100%"
      height="100%"
      viewBox="0 0 400 500"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="vintage-shadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
          <feOffset dx="2" dy="4" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Outer wooden frame */}
      <rect
        x="5"
        y="5"
        width="390"
        height="490"
        fill={borderColor}
        rx="4"
        filter="url(#vintage-shadow)"
      />

      {/* Inner wooden frame edge (lighter) */}
      <rect
        x="12"
        y="12"
        width="376"
        height="476"
        fill="#C9A9A0"
        rx="3"
      />

      {/* Matte */}
      <rect
        x="25"
        y="25"
        width="350"
        height="450"
        fill={matteColor}
        rx="2"
      />

      {/* Matte inner bevel */}
      <rect
        x="30"
        y="30"
        width="340"
        height="440"
        fill="none"
        stroke="#D4C4B0"
        strokeWidth="1"
        opacity="0.6"
      />

      {/* Corner decorative elements */}
      {[
        { x: 30, y: 30 },
        { x: 370, y: 30 },
        { x: 30, y: 470 },
        { x: 370, y: 470 }
      ].map((pos, i) => (
        <g key={i} transform={`translate(${pos.x}, ${pos.y})`}>
          <circle cx="0" cy="0" r="4" fill={borderColor} opacity="0.7" />
        </g>
      ))}
    </svg>

    <div className="vintage-frame-content">
      {children}
    </div>
  </div>
);

// Whimsical wavy border
export const WhimsicalBorder = ({
  children,
  className = '',
  primaryColor = '#FFD1DC',
  secondaryColor = '#C9A9E0'
}) => (
  <div className={`whimsical-border ${className}`}>
    <svg
      className="whimsical-border-svg"
      width="100%"
      height="100%"
      viewBox="0 0 400 300"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="whimsicalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="100%" stopColor={secondaryColor} />
        </linearGradient>
      </defs>

      {/* Wavy top border */}
      <path
        d="M 0 20 Q 50 10, 100 20 T 200 20 T 300 20 T 400 20"
        stroke="url(#whimsicalGradient)"
        strokeWidth="3"
        fill="none"
      >
        <animate
          attributeName="d"
          values="M 0 20 Q 50 10, 100 20 T 200 20 T 300 20 T 400 20;
                  M 0 20 Q 50 30, 100 20 T 200 20 T 300 20 T 400 20;
                  M 0 20 Q 50 10, 100 20 T 200 20 T 300 20 T 400 20"
          dur="4s"
          repeatCount="indefinite"
        />
      </path>

      {/* Wavy bottom border */}
      <path
        d="M 0 280 Q 50 290, 100 280 T 200 280 T 300 280 T 400 280"
        stroke="url(#whimsicalGradient)"
        strokeWidth="3"
        fill="none"
      >
        <animate
          attributeName="d"
          values="M 0 280 Q 50 290, 100 280 T 200 280 T 300 280 T 400 280;
                  M 0 280 Q 50 270, 100 280 T 200 280 T 300 280 T 400 280;
                  M 0 280 Q 50 290, 100 280 T 200 280 T 300 280 T 400 280"
          dur="4s"
          repeatCount="indefinite"
        />
      </path>

      {/* Wavy left border */}
      <path
        d="M 20 0 Q 10 50, 20 100 T 20 200 T 20 300"
        stroke="url(#whimsicalGradient)"
        strokeWidth="3"
        fill="none"
      >
        <animate
          attributeName="d"
          values="M 20 0 Q 10 50, 20 100 T 20 200 T 20 300;
                  M 20 0 Q 30 50, 20 100 T 20 200 T 20 300;
                  M 20 0 Q 10 50, 20 100 T 20 200 T 20 300"
          dur="4s"
          repeatCount="indefinite"
        />
      </path>

      {/* Wavy right border */}
      <path
        d="M 380 0 Q 390 50, 380 100 T 380 200 T 380 300"
        stroke="url(#whimsicalGradient)"
        strokeWidth="3"
        fill="none"
      >
        <animate
          attributeName="d"
          values="M 380 0 Q 390 50, 380 100 T 380 200 T 380 300;
                  M 380 0 Q 370 50, 380 100 T 380 200 T 380 300;
                  M 380 0 Q 390 50, 380 100 T 380 200 T 380 300"
          dur="4s"
          repeatCount="indefinite"
        />
      </path>

      {/* Decorative stars at corners */}
      {[
        { x: 20, y: 20 },
        { x: 380, y: 20 },
        { x: 20, y: 280 },
        { x: 380, y: 280 }
      ].map((pos, i) => (
        <g key={i}>
          <circle cx={pos.x} cy={pos.y} r="5" fill={primaryColor} opacity="0.8">
            <animate
              attributeName="r"
              values="5;7;5"
              dur="2s"
              begin={`${i * 0.5}s`}
              repeatCount="indefinite"
            />
          </circle>
          {[0, 90, 180, 270].map((angle, j) => {
            const rad = (angle * Math.PI) / 180;
            const x = pos.x + Math.cos(rad) * 8;
            const y = pos.y + Math.sin(rad) * 8;
            return (
              <line
                key={j}
                x1={pos.x}
                y1={pos.y}
                x2={x}
                y2={y}
                stroke={secondaryColor}
                strokeWidth="2"
                opacity="0.6"
              />
            );
          })}
        </g>
      ))}
    </svg>

    <div className="whimsical-border-content">
      {children}
    </div>
  </div>
);

export default {
  OrnateFrame,
  FloralCircleFrame,
  ArtDecoFrame,
  VintagePhotoFrame,
  WhimsicalBorder,
};
