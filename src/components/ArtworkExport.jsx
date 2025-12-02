import React, { useRef } from 'react';
import { FloralOrnament, DecorativeHeart, Rose, Butterfly } from './DecorativeElements';
import '../styles/ArtworkExport.css';

// Beautiful Birthday Poster
export const BirthdayPoster = () => {
  const posterRef = useRef(null);

  const exportAsPNG = () => {
    if (posterRef.current) {
      // In a real implementation, you would use html2canvas or similar library
      // For now, we'll just create a download link
      const svgElement = posterRef.current.querySelector('svg');
      if (svgElement) {
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        canvas.width = 2400;  // High resolution
        canvas.height = 3000;

        img.onload = () => {
          ctx.drawImage(img, 0, 0);
          const pngUrl = canvas.toDataURL('image/png');
          const downloadLink = document.createElement('a');
          downloadLink.href = pngUrl;
          downloadLink.download = 'birthday-poster.png';
          downloadLink.click();
        };

        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
      }
    }
  };

  return (
    <div className="artwork-export-container">
      <div ref={posterRef} className="birthday-poster">
        <svg
          width="800"
          height="1000"
          viewBox="0 0 800 1000"
          xmlns="http://www.w3.org/2000/svg"
          className="poster-svg"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="posterBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF8F0" />
              <stop offset="30%" stopColor="#FFE9E9" />
              <stop offset="60%" stopColor="#F5E6F0" />
              <stop offset="100%" stopColor="#EDE5F5" />
            </linearGradient>

            <linearGradient id="titleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D5516B" />
              <stop offset="50%" stopColor="#9B72AA" />
              <stop offset="100%" stopColor="#E8B4A0" />
            </linearGradient>

            <filter id="posterShadow">
              <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
              <feOffset dx="2" dy="4" result="offsetblur"/>
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.3"/>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Decorative pattern */}
            <pattern id="decorativePattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="#C9A9E0" opacity="0.15" />
              <circle cx="25" cy="25" r="1.5" fill="#E8B4A0" opacity="0.15" />
              <circle cx="75" cy="75" r="1.5" fill="#FFD1DC" opacity="0.15" />
            </pattern>
          </defs>

          {/* Background */}
          <rect width="800" height="1000" fill="url(#posterBg)" />
          <rect width="800" height="1000" fill="url(#decorativePattern)" opacity="0.5" />

          {/* Border frame */}
          <rect
            x="40"
            y="40"
            width="720"
            height="920"
            fill="none"
            stroke="url(#titleGradient)"
            strokeWidth="3"
            rx="20"
            opacity="0.6"
          />
          <rect
            x="50"
            y="50"
            width="700"
            height="900"
            fill="none"
            stroke="#9B72AA"
            strokeWidth="1.5"
            strokeDasharray="10,5"
            rx="15"
            opacity="0.4"
          />

          {/* Top decoration - Floral ornament */}
          <g transform="translate(400, 120)">
            {/* Center flower */}
            <circle cx="0" cy="0" r="15" fill="#D5516B" opacity="0.8" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * 35;
              const y = Math.sin(rad) * 35;
              return (
                <ellipse
                  key={i}
                  cx={x}
                  cy={y}
                  rx="20"
                  ry="30"
                  fill="#E8B4A0"
                  opacity="0.7"
                  transform={`rotate(${angle} ${x} ${y})`}
                />
              );
            })}
            {/* Leaves */}
            {[30, 120, 210, 300].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * 60;
              const y = Math.sin(rad) * 60;
              return (
                <ellipse
                  key={`leaf-${i}`}
                  cx={x}
                  cy={y}
                  rx="12"
                  ry="25"
                  fill="#9B72AA"
                  opacity="0.6"
                  transform={`rotate(${angle} ${x} ${y})`}
                />
              );
            })}
          </g>

          {/* Title */}
          <text
            x="400"
            y="250"
            textAnchor="middle"
            fontFamily="Playfair Display, serif"
            fontSize="72"
            fontWeight="700"
            fill="url(#titleGradient)"
            filter="url(#posterShadow)"
          >
            Happy Birthday
          </text>

          {/* Decorative line */}
          <line x1="200" y1="290" x2="350" y2="290" stroke="#9B72AA" strokeWidth="2" opacity="0.6" />
          <circle cx="400" cy="290" r="5" fill="#D5516B" opacity="0.8" />
          <line x1="450" y1="290" x2="600" y2="290" stroke="#9B72AA" strokeWidth="2" opacity="0.6" />

          {/* Age/Year */}
          <text
            x="400"
            y="360"
            textAnchor="middle"
            fontFamily="Cormorant Garamond, serif"
            fontSize="48"
            fill="#6B4E58"
            fontStyle="italic"
          >
            Twenty-Four Years
          </text>

          {/* Subtitle */}
          <text
            x="400"
            y="410"
            textAnchor="middle"
            fontFamily="Cormorant Garamond, serif"
            fontSize="32"
            fill="#8B4367"
          >
            of Beautiful Memories
          </text>

          {/* Center decorative hearts */}
          <g transform="translate(400, 500)">
            {/* Large center heart */}
            <path
              d="M0,80 C0,80 -40,40 -40,15 C-40,0 -30,-5 -20,0 C-10,5 0,15 0,15 C0,15 10,5 20,0 C30,-5 40,0 40,15 C40,40 0,80 0,80 Z"
              fill="url(#titleGradient)"
              opacity="0.8"
            />
            {/* Side hearts */}
            {[-120, 120].map((x, i) => (
              <g key={i} transform={`translate(${x}, 0) scale(0.6)`}>
                <path
                  d="M0,80 C0,80 -40,40 -40,15 C-40,0 -30,-5 -20,0 C-10,5 0,15 0,15 C0,15 10,5 20,0 C30,-5 40,0 40,15 C40,40 0,80 0,80 Z"
                  fill={i === 0 ? '#FFD1DC' : '#C9A9E0'}
                  opacity="0.7"
                />
              </g>
            ))}
          </g>

          {/* Decorative text */}
          <text
            x="400"
            y="640"
            textAnchor="middle"
            fontFamily="Montserrat, sans-serif"
            fontSize="24"
            fill="#6B4E58"
            letterSpacing="2"
          >
            A CELEBRATION OF YOU
          </text>

          {/* Quote/Message */}
          <text
            x="400"
            y="720"
            textAnchor="middle"
            fontFamily="Dancing Script, cursive"
            fontSize="36"
            fill="#8B4367"
            fontStyle="italic"
          >
            "May your day be filled with"
          </text>
          <text
            x="400"
            y="760"
            textAnchor="middle"
            fontFamily="Dancing Script, cursive"
            fontSize="36"
            fill="#8B4367"
            fontStyle="italic"
          >
            love, laughter, and joy"
          </text>

          {/* Bottom decoration - Butterflies and flowers */}
          <g transform="translate(200, 850)">
            {/* Butterfly */}
            <ellipse cx="0" cy="-10" rx="12" ry="18" fill="#C9A9E0" opacity="0.7" transform="rotate(-20 0 -10)" />
            <ellipse cx="0" cy="10" rx="10" ry="15" fill="#C9A9E0" opacity="0.7" transform="rotate(-10 0 10)" />
            <ellipse cx="25" cy="-10" rx="12" ry="18" fill="#C9A9E0" opacity="0.7" transform="rotate(20 25 -10)" />
            <ellipse cx="25" cy="10" rx="10" ry="15" fill="#C9A9E0" opacity="0.7" transform="rotate(10 25 10)" />
            <ellipse cx="12.5" cy="0" rx="3" ry="20" fill="#8B4367" opacity="0.8" />
          </g>

          <g transform="translate(600, 850)">
            {/* Small rose */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * 15;
              const y = Math.sin(rad) * 15;
              return (
                <ellipse
                  key={i}
                  cx={x}
                  cy={y}
                  rx="10"
                  ry="16"
                  fill="#D5516B"
                  opacity="0.7"
                  transform={`rotate(${angle} ${x} ${y})`}
                />
              );
            })}
            <circle cx="0" cy="0" r="8" fill="#8B4367" opacity="0.8" />
          </g>

          {/* Corner ornaments */}
          {[
            { x: 80, y: 80 },
            { x: 720, y: 80 },
            { x: 80, y: 920 },
            { x: 720, y: 920 }
          ].map((pos, i) => (
            <g key={i} transform={`translate(${pos.x}, ${pos.y})`}>
              <path
                d="M 0 0 Q -10 -10 0 -20"
                stroke="#9B72AA"
                strokeWidth="2"
                fill="none"
                opacity="0.6"
              />
              <path
                d="M 0 0 Q -10 -10 -20 0"
                stroke="#9B72AA"
                strokeWidth="2"
                fill="none"
                opacity="0.6"
              />
              <circle cx="0" cy="0" r="4" fill="#D5516B" opacity="0.7" />
              {i === 1 && <g transform="scale(-1, 1)" />}
              {i === 2 && <g transform="scale(1, -1)" />}
              {i === 3 && <g transform="scale(-1, -1)" />}
            </g>
          ))}

          {/* Subtle sparkles */}
          {Array.from({ length: 30 }).map((_, i) => {
            const x = 100 + Math.random() * 600;
            const y = 100 + Math.random() * 800;
            const size = 1 + Math.random() * 2;
            return (
              <circle
                key={`sparkle-${i}`}
                cx={x}
                cy={y}
                r={size}
                fill="#FFD700"
                opacity="0.4"
              />
            );
          })}
        </svg>
      </div>

      <div className="export-controls">
        <button className="export-button" onClick={exportAsPNG}>
          <span className="export-icon">📥</span>
          Download as PNG
        </button>
        <p className="export-note">
          Right-click on the poster above to save as SVG or use the button to export as PNG
        </p>
      </div>
    </div>
  );
};

// Greeting Card Design
export const GreetingCard = ({ message = 'Happy Birthday!' }) => (
  <div className="greeting-card">
    <svg
      width="600"
      height="400"
      viewBox="0 0 600 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD1DC" />
          <stop offset="50%" stopColor="#C9A9E0" />
          <stop offset="100%" stopColor="#E8B4A0" />
        </linearGradient>

        <filter id="cardShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
          <feOffset dx="2" dy="3"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.4"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Card background */}
      <rect width="600" height="400" fill="url(#cardGradient)" rx="20" />

      {/* Decorative border */}
      <rect
        x="20"
        y="20"
        width="560"
        height="360"
        fill="none"
        stroke="white"
        strokeWidth="2"
        rx="15"
        opacity="0.6"
      />

      {/* Center message */}
      <text
        x="300"
        y="200"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Dancing Script, cursive"
        fontSize="48"
        fill="white"
        filter="url(#cardShadow)"
      >
        {message}
      </text>

      {/* Decorative hearts */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 360 / 8) * (Math.PI / 180);
        const radius = 120;
        const x = 300 + Math.cos(angle) * radius;
        const y = 200 + Math.sin(angle) * radius;
        const size = 15 + Math.random() * 10;

        return (
          <path
            key={i}
            d={`M ${x},${y + size * 0.7}
                C ${x},${y + size * 0.4} ${x + size * 0.4},${y} ${x + size * 0.5},${y + size * 0.3}
                C ${x + size * 0.6},${y} ${x + size},${y + size * 0.4} ${x + size},${y + size * 0.7}
                C ${x + size},${y + size * 1.2} ${x + size * 0.5},${y + size * 1.5} ${x + size * 0.5},${y + size * 1.5}
                C ${x + size * 0.5},${y + size * 1.5} ${x},${y + size * 1.2} ${x},${y + size * 0.7} Z`}
            fill="white"
            opacity="0.4"
          />
        );
      })}
    </svg>
  </div>
);

// Art Print Collection
export const ArtPrintGallery = () => {
  return (
    <div className="art-print-gallery">
      <h2 className="gallery-title">Downloadable Art Prints</h2>

      <div className="print-grid">
        {/* Print 1: Floral */}
        <div className="art-print">
          <svg width="300" height="400" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="floralPrint" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE9E9" />
                <stop offset="100%" stopColor="#F5E6F0" />
              </linearGradient>
            </defs>
            <rect width="300" height="400" fill="url(#floralPrint)" />

            {/* Large central rose */}
            <g transform="translate(150, 200)">
              {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * 50;
                const y = Math.sin(rad) * 50;
                return (
                  <ellipse
                    key={i}
                    cx={x}
                    cy={y}
                    rx="30"
                    ry="45"
                    fill={i % 2 === 0 ? '#D5516B' : '#E8B4A0'}
                    opacity="0.7"
                    transform={`rotate(${angle} ${x} ${y})`}
                  />
                );
              })}
              <circle cx="0" cy="0" r="20" fill="#8B4367" />
            </g>

            <text
              x="150"
              y="350"
              textAnchor="middle"
              fontFamily="Playfair Display, serif"
              fontSize="24"
              fill="#4A3642"
            >
              Bloom
            </text>
          </svg>
          <p className="print-label">Floral Art Print</p>
        </div>

        {/* Print 2: Hearts */}
        <div className="art-print">
          <svg width="300" height="400" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="heartPrint" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFF8F0" />
                <stop offset="100%" stopColor="#FFE9E9" />
              </linearGradient>
            </defs>
            <rect width="300" height="400" fill="url(#heartPrint)" />

            {/* Multiple hearts */}
            {Array.from({ length: 7 }).map((_, i) => {
              const y = 80 + i * 45;
              const size = 30 + (3 - Math.abs(i - 3)) * 8;
              const opacity = 0.4 + (3 - Math.abs(i - 3)) * 0.15;

              return (
                <path
                  key={i}
                  d={`M 150,${y + size * 0.7}
                      C 150,${y + size * 0.4} ${150 + size * 0.4},${y} ${150 + size * 0.5},${y + size * 0.3}
                      C ${150 + size * 0.6},${y} ${150 + size},${y + size * 0.4} ${150 + size},${y + size * 0.7}
                      C ${150 + size},${y + size * 1.2} ${150 + size * 0.5},${y + size * 1.5} ${150 + size * 0.5},${y + size * 1.5}
                      C ${150 + size * 0.5},${y + size * 1.5} 150,${y + size * 1.2} 150,${y + size * 0.7} Z`}
                  fill="#D5516B"
                  opacity={opacity}
                />
              );
            })}

            <text
              x="150"
              y="370"
              textAnchor="middle"
              fontFamily="Dancing Script, cursive"
              fontSize="28"
              fill="#8B4367"
            >
              Love
            </text>
          </svg>
          <p className="print-label">Love Art Print</p>
        </div>

        {/* Print 3: Abstract */}
        <div className="art-print">
          <svg width="300" height="400" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="abstractPrint" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EDE5F5" />
                <stop offset="100%" stopColor="#E8E0F5" />
              </linearGradient>
            </defs>
            <rect width="300" height="400" fill="url(#abstractPrint)" />

            {/* Circles */}
            {Array.from({ length: 12 }).map((_, i) => {
              const x = 75 + (i % 3) * 75;
              const y = 80 + Math.floor(i / 3) * 80;
              const r = 20 + Math.random() * 15;
              const colors = ['#FFD1DC', '#C9A9E0', '#E8B4A0', '#9B72AA'];

              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={r}
                  fill={colors[i % colors.length]}
                  opacity="0.6"
                />
              );
            })}

            <text
              x="150"
              y="370"
              textAnchor="middle"
              fontFamily="Montserrat, sans-serif"
              fontSize="22"
              fill="#4A3642"
              letterSpacing="3"
            >
              CELEBRATE
            </text>
          </svg>
          <p className="print-label">Abstract Art Print</p>
        </div>
      </div>
    </div>
  );
};

export default {
  BirthdayPoster,
  GreetingCard,
  ArtPrintGallery,
};
