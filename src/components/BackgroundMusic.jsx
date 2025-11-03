import React, { useState, useRef, useEffect } from 'react';
import '../styles/BackgroundMusic.css';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.log('Audio playback failed:', err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="background-music-controls">
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        {/* Using a soft ambient music - you can replace this with your preferred track */}
        <source src="https://cdn.pixabay.com/audio/2022/03/10/audio_2c87ba57ce.mp3" type="audio/mpeg" />
      </audio>

      <button
        className={`music-toggle ${isPlaying ? 'playing' : ''}`}
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        title={isPlaying ? 'Pause music' : 'Play music'}
      >
        <span className="music-icon">
          {isPlaying ? '🔊' : '🔇'}
        </span>
      </button>

      {isPlaying && (
        <div className="volume-control">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
            aria-label="Volume control"
          />
        </div>
      )}
    </div>
  );
};

export default BackgroundMusic;
