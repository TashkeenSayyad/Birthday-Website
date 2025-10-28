import React, { useState, useRef, useEffect } from 'react';
import FloatingHearts from '../components/FloatingHearts';
import '../styles/MusicPage.css';

const MusicPage = () => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Songs configuration - supports both local audio files and Spotify embeds
  const songs = [
    {
      id: 1,
      title: 'Perfect',
      artist: 'Ed Sheeran',
      description: 'Your wedding entrance song',
      // For local audio: add your MP3 file to /public/music/ folder
      audioFile: '/music/perfect.mp3',
      // Alternative: Use Spotify embed (uncomment and add your Spotify URI)
      // spotifyUri: 'spotify:track:0tgVpDi06FyKpA1z0VMD4v',
      color: '#ff6b9d',
      lyrics: `[Add your own lyrics here]

This is a placeholder where you can add
the lyrics to this beautiful song.

To add lyrics, edit this section in
src/pages/MusicPage.jsx`
    },
    {
      id: 2,
      title: 'All of Me',
      artist: 'John Legend',
      description: 'Our first dance',
      audioFile: '/music/all-of-me.mp3',
      color: '#c44569',
      lyrics: `[Add your own lyrics here]

Add the meaningful lyrics that
remind you of your special moments.`
    },
    {
      id: 3,
      title: 'Thinking Out Loud',
      artist: 'Ed Sheeran',
      description: 'The song that reminds me of our late-night talks',
      audioFile: '/music/thinking-out-loud.mp3',
      color: '#f78fb3',
      lyrics: `[Add your own lyrics here]

Replace this with the lyrics
that mean the most to you both.`
    },
    {
      id: 4,
      title: 'A Thousand Years',
      artist: 'Christina Perri',
      description: 'Your favorite romantic song',
      audioFile: '/music/a-thousand-years.mp3',
      color: '#ea8685',
      lyrics: `[Add your own lyrics here]

Add the verses that capture
your feelings perfectly.`
    },
    {
      id: 5,
      title: 'Make You Feel My Love',
      artist: 'Adele',
      description: 'The song I dedicated to you',
      audioFile: '/music/make-you-feel-my-love.mp3',
      color: '#be5869',
      lyrics: `[Add your own lyrics here]

Customize with the lyrics
that touch your heart.`
    },
    {
      id: 6,
      title: 'Your Song',
      artist: 'Elton John',
      description: 'Our anniversary song',
      audioFile: '/music/your-song.mp3',
      color: '#ff8fab',
      lyrics: `[Add your own lyrics here]

Add your favorite verses
from this timeless classic.`
    }
  ];

  // Handle song selection and playback
  const handleSongClick = (song) => {
    if (selectedSong?.id === song.id) {
      // If clicking the same song, toggle play/pause
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      // New song selected
      setSelectedSong(song);
      setShowLyrics(true); // Auto-show lyrics when a song is selected
      setIsPlaying(false);
      setCurrentTime(0);

      // Wait for next render to play
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.load();
          audioRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch(err => {
            console.log('Audio play failed:', err);
            // If audio file doesn't exist, still show lyrics
          });
        }
      }, 100);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const toggleLyrics = () => {
    setShowLyrics(!showLyrics);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <>
      <FloatingHearts />
      <div className="music-page">
        <div className="music-header">
          <div className="music-header-content">
            <h1 className="music-title">Music that reminds of you</h1>
            <div className="title-decoration"></div>
            <p className="music-subtitle">
              Songs that make me think of you and our special moments together
            </p>
          </div>
        </div>

        <div className="music-content">
          {/* Audio Element */}
          {selectedSong && (
            <audio
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleEnded}
            >
              <source src={selectedSong.audioFile} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}

          {/* Audio Player Controls */}
          {selectedSong && (
            <div className="audio-player">
              <div className="player-info">
                <div className="now-playing-label">Now Playing</div>
                <h3 className="player-song-title">{selectedSong.title}</h3>
                <p className="player-artist">{selectedSong.artist}</p>
                <p className="player-description">"{selectedSong.description}"</p>
              </div>

              <div className="player-controls">
                <button className="control-btn" onClick={togglePlayPause}>
                  {isPlaying ? '⏸' : '▶'}
                </button>
                <button className="lyrics-toggle-btn" onClick={toggleLyrics}>
                  {showLyrics ? 'Hide Lyrics' : 'Show Lyrics'}
                </button>
              </div>

              <div className="player-progress">
                <span className="time-current">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="progress-bar"
                />
                <span className="time-duration">{formatTime(duration)}</span>
              </div>
            </div>
          )}

          <div className="songs-list">
            {songs.map((song, index) => (
              <div
                key={song.id}
                className={`song-card ${selectedSong?.id === song.id ? 'active' : ''}`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  borderColor: `${song.color}60`
                }}
                onClick={() => handleSongClick(song)}
              >
                <div className="song-card-content">
                  <div className="song-info">
                    <div
                      className="song-icon"
                      style={{ background: `linear-gradient(135deg, ${song.color}, ${song.color}dd)` }}
                    >
                      <span className="play-icon">
                        {selectedSong?.id === song.id && isPlaying ? '⏸' : '▶'}
                      </span>
                    </div>
                    <div className="song-details">
                      <h3 className="song-title">{song.title}</h3>
                      <p className="song-artist">{song.artist}</p>
                      <p className="song-description">{song.description}</p>
                    </div>
                  </div>
                  <div className="song-actions">
                    <span className="listen-text">
                      {selectedSong?.id === song.id ? (isPlaying ? 'Playing' : 'Paused') : 'Play'}
                    </span>
                    <span className="arrow">→</span>
                  </div>
                </div>

                <div
                  className="song-card-glow"
                  style={{ background: `radial-gradient(circle at center, ${song.color}30, transparent)` }}
                ></div>
              </div>
            ))}
          </div>

          {/* Lyrics Popup */}
          {selectedSong && showLyrics && (
            <div className="lyrics-popup" onClick={() => setShowLyrics(false)}>
              <div className="lyrics-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={() => setShowLyrics(false)}>
                  ×
                </button>
                <h2 className="lyrics-title">{selectedSong.title}</h2>
                <p className="lyrics-artist">{selectedSong.artist}</p>
                <p className="lyrics-description">"{selectedSong.description}"</p>
                <div className="lyrics-text">
                  {selectedSong.lyrics.split('\n').map((line, index) => (
                    <p key={index} className="lyrics-line">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="music-note">
          <p>Click on any song to play and see lyrics</p>
          <p className="sub-note">Each song holds a special memory of us ♥</p>
          <p className="instruction-note">
            📁 To add your music files: Place MP3 files in the <code>/public/music/</code> folder
          </p>
        </div>
      </div>
    </>
  );
};

export default MusicPage;
