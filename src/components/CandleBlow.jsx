import React, { useState, useEffect, useRef } from 'react';
import '../styles/CandleBlow.css';
import cakeImage from '../assets/cake.png';

const CandleBlow = ({ onComplete }) => {
  const [blownCandles, setBlownCandles] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [micError, setMicError] = useState(false);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const micStreamRef = useRef(null);
  const lastBlowTimeRef = useRef(0);

  const totalCandles = 24;
  const BLOW_COOLDOWN = 200;
  const BLOW_THRESHOLD = 40;

  useEffect(() => {
    const hasBlown = sessionStorage.getItem('candlesBlown');
    if (hasBlown) {
      onComplete();
      return;
    }
    startMicrophone();
    return () => stopMicrophone();
  }, [onComplete]);

  const startMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;

      const microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyser);

      setIsListening(true);
      detectBlow();
    } catch (error) {
      console.error('Microphone access denied:', error);
      setMicError(true);
    }
  };

  const stopMicrophone = () => {
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  const detectBlow = () => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const checkAudio = () => {
      if (!analyserRef.current) return;

      analyserRef.current.getByteFrequencyData(dataArray);
      const lowFreqData = dataArray.slice(0, 50);
      const average = lowFreqData.reduce((sum, v) => sum + v, 0) / lowFreqData.length;
      const now = Date.now();

      if (average > BLOW_THRESHOLD && now - lastBlowTimeRef.current > BLOW_COOLDOWN) {
        lastBlowTimeRef.current = now;
        blowCandle();
      }

      if (blownCandles.length < totalCandles) requestAnimationFrame(checkAudio);
    };

    checkAudio();
  };

  const blowCandle = () => {
    setBlownCandles(prev => {
      if (prev.length >= totalCandles) return prev;
      const newBlown = [...prev, prev.length];

      if (newBlown.length === totalCandles) {
        setTimeout(() => {
          sessionStorage.setItem('candlesBlown', 'true');
          stopMicrophone();
          onComplete();
        }, 2000);
      }
      return newBlown;
    });
  };

  const handleManualBlow = () => {
    if (micError) {
      const now = Date.now();
      if (now - lastBlowTimeRef.current > BLOW_COOLDOWN) {
        lastBlowTimeRef.current = now;
        blowCandle();
      }
    }
  };

  const handleBlowAgain = (e) => {
    e.stopPropagation();
    sessionStorage.removeItem('candlesBlown');
    window.location.reload();
  };

  const getCandlePositions = () => {
    const positions = [];
    const count = 24;
    const baseRadius = 34
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

      {blownCandles.length >= totalCandles && (
        <button className="candle-back-button" onClick={handleBlowAgain}>
          ← Blow Again
        </button>
      )}
      <div className="candle-content">
        <h1 className="candle-title">Make a Wish</h1>
        <p className="candle-instruction">
          {micError
            ? 'Click to blow out the candles (microphone not available)'
            : blownCandles.length === 0
            ? 'Blow into your microphone to blow out the candles 🎤'
            : blownCandles.length < totalCandles
            ? `Keep blowing! ${totalCandles - blownCandles.length} left 💨`
            : 'Happy Birthday! 🎉'}
        </p>

        <div className="cake-container">
          <div className="cake-image-wrapper">
            <img src={cakeImage} alt="Birthday Cake" className="cake-image" />
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
          {blownCandles.length} / {totalCandles} candles blown
        </div>

        {isListening && !micError && (
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