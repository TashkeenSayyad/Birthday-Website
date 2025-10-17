import React, { useState, useEffect, useRef } from 'react';
import '../styles/CandleBlow.css';

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
  const BLOW_THRESHOLD = 50;

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
    const radius = 28; // tighter around the cake edge
    const offsetY = -5; // move slightly up to rest on the icing

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle) * 0.75 + offsetY;
      positions.push({ index: i, left: `${x}%`, top: `${y}%` });
    }
    return positions;
  };

  const candlePositions = getCandlePositions();

  return (
    <div className="candle-blow-screen" onClick={handleManualBlow}>
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
            <img src="src/assets/cake.png" alt="Birthday Cake" className="cake-image" />
            <div className="candles-overlay">
              {candlePositions.map((pos) => (
                <div
                  key={pos.index}
                  className={`candle ${blownCandles.includes(pos.index) ? 'blown' : ''}`}
                  style={{
                    left: pos.left,
                    top: pos.top,
                    transform: 'translate(-50%, -100%)',
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