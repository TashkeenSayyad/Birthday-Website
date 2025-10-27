import React, { useState, useEffect, useRef } from 'react';
import '../styles/BirthdayCake.css';

const BirthdayCake = ({ onComplete }) => {
  const [candlesBlown, setCandlesBlown] = useState([false, false, false]);
  const [showMessage, setShowMessage] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [micError, setMicError] = useState(false);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const micStreamRef = useRef(null);
  const lastBlowTimeRef = useRef(0);

  const BLOW_COOLDOWN = 300;
  const BLOW_THRESHOLD = 40;
  const allCandlesBlown = candlesBlown.every(blown => blown);

  useEffect(() => {
    const hasBlown = sessionStorage.getItem('candlesBlown');
    if (hasBlown) {
      onComplete();
      return;
    }
    startMicrophone();
    return () => stopMicrophone();
  }, [onComplete]);

  useEffect(() => {
    if (allCandlesBlown) {
      setShowMessage(true);
      setTimeout(() => {
        sessionStorage.setItem('candlesBlown', 'true');
        stopMicrophone();
        onComplete();
      }, 3000);
    }
  }, [allCandlesBlown, onComplete]);

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

      if (!allCandlesBlown) requestAnimationFrame(checkAudio);
    };

    checkAudio();
  };

  const blowCandle = () => {
    setCandlesBlown(prev => {
      const firstUnblown = prev.findIndex(blown => !blown);
      if (firstUnblown === -1) return prev;

      const newBlown = [...prev];
      newBlown[firstUnblown] = true;
      return newBlown;
    });
  };

  const handleManualBlow = () => {
    if (micError && !allCandlesBlown) {
      const now = Date.now();
      if (now - lastBlowTimeRef.current > BLOW_COOLDOWN) {
        lastBlowTimeRef.current = now;
        blowCandle();
      }
    }
  };

  return (
    <div className="birthday-cake-screen" onClick={handleManualBlow}>
      {/* Sparkles Background */}
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

      <div className="birthday-cake-content">
        <h1 className="cake-title">Make a Wish</h1>
        <p className="cake-instruction">
          {micError
            ? 'Click anywhere to blow out the candles (microphone not available)'
            : candlesBlown.filter(b => b).length === 0
            ? 'Blow into your microphone to blow out the candles 🎤'
            : !allCandlesBlown
            ? `Keep blowing! ${candlesBlown.filter(b => !b).length} left 💨`
            : 'Happy Birthday! 🎉'}
        </p>

        <div id="birthday-cake">
          <div className="cake">
            <div className="middle"></div>
            <div className="chocs"></div>
            <div className="top"></div>
          </div>
          <div className="candles-group">
            <div className={`flame flame1 ${candlesBlown[0] ? 'blown' : ''}`}></div>
            <div className={`flame flame2 ${candlesBlown[1] ? 'blown' : ''}`}></div>
            <div className={`flame flame3 ${candlesBlown[2] ? 'blown' : ''}`}></div>
            <div className={`text ${showMessage ? 'show' : ''}`}>Happy Birthday!</div>
            <div className="shadows"></div>
          </div>
        </div>

        <div className="candles-counter">
          {candlesBlown.filter(b => b).length} / 3 candles blown
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

export default BirthdayCake;
