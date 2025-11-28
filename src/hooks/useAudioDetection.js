import { useState, useRef, useEffect } from 'react';
import { AUDIO_CONSTANTS } from '../constants/audio';

/**
 * Custom hook for microphone-based audio detection (e.g., blow detection)
 * @param {Function} onDetection - Callback when audio threshold is exceeded
 * @param {Object} options - Configuration options
 * @returns {Object} Audio detection state and controls
 */
export const useAudioDetection = (
  onDetection,
  options = {}
) => {
  const {
    threshold = AUDIO_CONSTANTS.BLOW_THRESHOLD,
    cooldown = AUDIO_CONSTANTS.BLOW_COOLDOWN,
    fftSize = AUDIO_CONSTANTS.FFT_SIZE,
    smoothing = AUDIO_CONSTANTS.SMOOTHING,
    lowFreqSlice = AUDIO_CONSTANTS.LOW_FREQ_SLICE,
  } = options;

  const [isListening, setIsListening] = useState(false);
  const [hasError, setHasError] = useState(false);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const micStreamRef = useRef(null);
  const lastDetectionTimeRef = useRef(0);
  const animationFrameRef = useRef(null);

  const startMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = fftSize;
      analyser.smoothingTimeConstant = smoothing;
      analyserRef.current = analyser;

      const microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyser);

      setIsListening(true);
      detectAudio();
    } catch (error) {
      console.error('Microphone access denied:', error);
      setHasError(true);
    }
  };

  const stopMicrophone = () => {
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setIsListening(false);
  };

  const detectAudio = () => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const checkAudio = () => {
      if (!analyserRef.current) return;

      analyserRef.current.getByteFrequencyData(dataArray);
      const lowFreqData = dataArray.slice(0, lowFreqSlice);
      const average = lowFreqData.reduce((sum, v) => sum + v, 0) / lowFreqData.length;
      const now = Date.now();

      if (average > threshold && now - lastDetectionTimeRef.current > cooldown) {
        lastDetectionTimeRef.current = now;
        onDetection();
      }

      animationFrameRef.current = requestAnimationFrame(checkAudio);
    };

    checkAudio();
  };

  useEffect(() => {
    return () => {
      stopMicrophone();
    };
  }, []);

  return {
    isListening,
    hasError,
    startMicrophone,
    stopMicrophone,
    lastDetectionTime: lastDetectionTimeRef,
  };
};
