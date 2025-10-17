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
  const BLOW_COOLDOWN = 200; // Milliseconds between blows (slower)
  const BLOW_THRESHOLD = 50; // Higher threshold = harder to blow

  useEffect(() => {
    const hasBlown = sessionStorage.getItem('candlesBlown');
    if (hasBlown) {
      onComplete();
      return;
    }

    startMicrophone();

    return () => {
      stopMicrophone();
    };
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

      // Focus on lower frequencies (where breath/wind noise is)
      const lowFreqData = dataArray.slice(0, 50);
      const average = lowFreqData.reduce((sum, value) => sum + value, 0) / lowFreqData.length;

      const now = Date.now();
      const timeSinceLastBlow = now - lastBlowTimeRef.current;

      if (average > BLOW_THRESHOLD && timeSinceLastBlow > BLOW_COOLDOWN) {
        console.log('Blow detected! Volume:', average);
        lastBlowTimeRef.current = now;
        blowCandle();
      }

      if (blownCandles.length < totalCandles) {
        requestAnimationFrame(checkAudio);
      }
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
    
    for (let i = 0; i < 12; i++) {
      positions.push({
        index: i,
        left: 15 + (i * 6),
        top: -70,
        layer: 'top'
      });
    }
    
    for (let i = 0; i < 12; i++) {
      positions.push({
        index: i + 12,
        left: 10 + (i * 6.5),
        top: 130,
        layer: 'bottom'
      });
    }
    
    return positions;
  };

  const candlePositions = getCandlePositions();

  return (
    <div className="candle-blow-screen" onClick={handleManualBlow}>
      {/* Back button - shows after all candles are blown */}
      {blownCandles.length >= totalCandles && (
        <button className="candle-back-button" onClick={handleBlowAgain}>
          ← Blow Again
        </button>
      )}
      <div className="candle-content">
        <h1 className="candle-title">Make a Wish</h1>
        <p className="candle-instruction">
          {micError ? 'Click to blow out the candles (microphone not available)' :
           blownCandles.length === 0 ? 'Blow into your microphone to blow out the candles 🎤' : 
           blownCandles.length < totalCandles ? `Keep blowing! ${totalCandles - blownCandles.length} left 💨` : 
           'Happy Birthday! 🎉'}
        </p>

        <div className="cake-container">
          <div className="cake-image-wrapper">
            {/*Image of Cake*/}
            <img 
              src="https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&h=500&fit=crop&q=80"
              alt="Birthday Cake" 
              className="cake-image"
            />
            
            <div className="candles-overlay">
              {candlePositions.map((pos) => (
                <div
                  key={pos.index}
                  className={`candle ${blownCandles.includes(pos.index) ? 'blown' : ''}`}
                  style={{
                    left: `${pos.left}%`,
                    top: `${pos.top}px`,
                    animationDelay: `${pos.index * 0.05}s`
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

        {blownCandles.length > 0 && blownCandles.length < totalCandles && (
          <div className="smoke-effects">
            {blownCandles.slice(-2).map((candleIdx, i) => {
              const pos = candlePositions[candleIdx];
              return (
                <div 
                  key={`smoke-${candleIdx}`} 
                  className="smoke" 
                  style={{ 
                    left: `${35 + (pos.left / 2)}%`,
                    top: `${40 + (pos.top / 10)}%`,
                    animationDelay: `${i * 0.3}s`
                  }} 
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CandleBlow;