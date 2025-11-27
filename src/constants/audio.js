/**
 * Audio-related constants for Web Audio API
 */
export const AUDIO_CONSTANTS = {
  // Blow detection thresholds
  BLOW_THRESHOLD: 40,
  BLOW_COOLDOWN: 200, // milliseconds

  // Web Audio API settings
  FFT_SIZE: 512,
  SMOOTHING: 0.8,
  LOW_FREQ_SLICE: 50, // Analyze first 50 frequency bins for blow detection

  // Candle configuration
  TOTAL_CANDLES: 24,

  // Timing
  COMPLETION_DELAY: 2000, // milliseconds before triggering completion
};
