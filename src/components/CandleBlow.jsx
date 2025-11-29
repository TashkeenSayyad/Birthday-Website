import React, { useState, useEffect, useRef } from 'react';
import { useAudioDetection } from '../hooks/useAudioDetection';
import { AUDIO_CONSTANTS } from '../constants/audio';
import '../styles/CandleBlow.css';
import cakeImage from '../assets/cake.png';

const CandleBlow = ({ onComplete }) => {
  const [blownCandles, setBlownCandles] = useState([]);

  const blowCandle = () => {
    setBlownCandles((prev) => {
      if (prev.length >= AUDIO_CONSTANTS.TOTAL_CANDLES) return prev;
      const newBlown = [...prev, prev.length];

      if (newBlown.length === AUDIO_CONSTANTS.TOTAL_CANDLES) {
        setTimeout(() => {
          sessionStorage.setItem('candlesBlown', 'true');
          stopMicrophone();
          onComplete();
        }, AUDIO_CONSTANTS.COMPLETION_DELAY);
      }
      return newBlown;
    });
  };

  const { isListening, hasError, startMicrophone, stopMicrophone, lastDetectionTime } =
    useAudioDetection(blowCandle);

  useEffect(() => {
    const hasBlown = sessionStorage.getItem('candlesBlown');
    if (hasBlown) {
      onComplete();
      return;
    }
    startMicrophone();
    return () => stopMicrophone();
  }, [onComplete, startMicrophone, stopMicrophone]);

  const handleManualBlow = () => {
    if (hasError) {
      const now = Date.now();
      if (now - lastDetectionTime.current > AUDIO_CONSTANTS.BLOW_COOLDOWN) {
        lastDetectionTime.current = now;
        blowCandle();
      }
    }
  };

  const getCandlePositions = () => {
    const positions = [];
    const count = AUDIO_CONSTANTS.TOTAL_CANDLES;
    const baseRadius = 34;
    const offsetY = -7; // Move candles UP slightly
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
      
      // Minimal variation to keep candles safely inside
      const radiusVariation = (Math.sin(i * 2.3) * 0.8) + (Math.cos(i * 3.7) * 0.5);
      const radius = baseRadius + radiusVariation;
      
      // Slight angle variation
      const angleVariation = (Math.sin(i * 1.2) * 0.06);
      const finalAngle = angle + angleVariation;
      
      // Calculate position with ellipse compression
      const x = 50 + radius * Math.cos(finalAngle);
      const y = 50 + (radius * Math.sin(finalAngle) * 0.85) + offsetY;
      
      positions.push({ 
        index: i, 
        left: `${x}%`, 
        top: `${y}%`,
        rotation: (Math.random() - 0.5) * 5
      });
    }
    return positions;
  };

  const candlePositions = getCandlePositions();

  return (
    <div className="candle-blow-screen" onClick={handleManualBlow}>
      {/* Floating Sparkles */}
      <div className="sparkles-container">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="candle-content">
        <h1 className="candle-title">Make a Wish</h1>
        <p className="candle-instruction">
          {hasError
            ? 'Click to blow out the candles (microphone not available)'
            : blownCandles.length === 0
            ? 'Blow into your microphone to blow out the candles 🎤'
            : blownCandles.length < AUDIO_CONSTANTS.TOTAL_CANDLES
            ? `Keep blowing! ${AUDIO_CONSTANTS.TOTAL_CANDLES - blownCandles.length} left 💨`
            : 'Happy Birthday! 🎉'}
        </p>

        <div className="cake-container">
          <div className="cake-image-wrapper">
            <img src={cakeImage} alt="Birthday Cake" className="cake-image" loading="eager" />
            <div className="candles-overlay">
              {candlePositions.map((pos) => (
              <div
                key={pos.index}
                className={`candle ${blownCandles.includes(pos.index) ? 'blown' : ''}`}
                style={{
                  left: pos.left,
                  top: pos.top,
                  transform: `translate(-50%, -100%) rotate(${pos.rotation}deg)`,
                  animationDelay: `${pos.index * 0.05}s`,
                }}
              >
                <div className="flame">
                  <div className="flame-inner"></div>
                </div>
                <div className="wick"></div>
                <div className="candle-stick"></div>
              </div>
              ))}
            </div>
          </div>
        </div>

        <div className="candles-counter">
          {blownCandles.length} / {AUDIO_CONSTANTS.TOTAL_CANDLES} candles blown
        </div>

        {isListening && !hasError && (
          <div className="mic-indicator">
            <div className="mic-wave"></div>
            <span>🎤 Listening... (Blow steadily)</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandleBlow;