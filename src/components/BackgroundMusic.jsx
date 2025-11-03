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
        {/* Birthday song - soft instrumental version

            To use your own custom birthday song:
            1. Add your audio file to src/assets/ folder (e.g., birthday-song.mp3)
            2. Import it at the top: import birthdaySong from '../assets/birthday-song.mp3';
            3. Replace the src below with: src={birthdaySong}

            Or use a URL to an online audio file as shown below.
        */}
        <source src="https://cdn.pixabay.com/audio/2022/08/02/audio_31c2fdb8b3.mp3" type="audio/mpeg" />
      </audio>

      <button
        className={`music-toggle ${isPlaying ? 'playing' : ''}`}
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause birthday music' : 'Play birthday music'}
        title={isPlaying ? 'Pause birthday music' : 'Play birthday music 🎂'}
      >
        <span className="music-icon">
          {isPlaying ? '🎵' : '🎂'}
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
