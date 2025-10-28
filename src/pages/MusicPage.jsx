import React, { useState, useRef } from 'react';
import FloatingHearts from '../components/FloatingHearts';
import '../styles/MusicPage.css';

const MusicPage = () => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const audioRef = useRef(null);

  const songs = [
    {
      id: 1,
      title: 'Perfect',
      artist: 'Ed Sheeran',
      url: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g',
      color: '#ff6b9d',
      lyrics: `[Add your own lyrics here]

This is a placeholder where you can add
the lyrics to this beautiful song that
reminds you of her.

Each line will appear beautifully formatted
when the song is playing.`
    },
    {
      id: 2,
      title: 'All of Me',
      artist: 'John Legend',
      url: 'https://www.youtube.com/watch?v=450p7goxZqg',
      color: '#c44569',
      lyrics: `[Add your own lyrics here]

This is a placeholder where you can add
the lyrics to this beautiful song.

Feel free to customize with your
favorite verses!`
    },
    {
      id: 3,
      title: 'Thinking Out Loud',
      artist: 'Ed Sheeran',
      url: 'https://www.youtube.com/watch?v=lp-EO5I60KA',
      color: '#f78fb3',
      lyrics: `[Add your own lyrics here]

Another beautiful song that
reminds you of special moments.

Add the lyrics that mean
the most to both of you.`
    },
    {
      id: 4,
      title: 'A Thousand Years',
      artist: 'Christina Perri',
      url: 'https://www.youtube.com/watch?v=rtOvBOTyX00',
      color: '#ea8685',
      lyrics: `[Add your own lyrics here]

A timeless classic that speaks
of eternal love.

Add the most meaningful
lyrics here.`
    },
    {
      id: 5,
      title: 'Make You Feel My Love',
      artist: 'Adele',
      url: 'https://www.youtube.com/watch?v=0put0_a--Ng',
      color: '#be5869',
      lyrics: `[Add your own lyrics here]

A heartfelt song that captures
deep emotions.

Customize with the verses that
touch your heart.`
    },
    {
      id: 6,
      title: 'Your Song',
      artist: 'Elton John',
      url: 'https://www.youtube.com/watch?v=mTa8U0Wa0q8',
      color: '#ff8fab',
      lyrics: `[Add your own lyrics here]

A classic love song that
stands the test of time.

Add your favorite lyrics
from this beautiful piece.`
    }
  ];

  const handleSongClick = (song) => {
    setSelectedSong(song);
    setShowLyrics(false);
    // Open the song URL in a new tab
    window.open(song.url, '_blank');
  };

  const toggleLyrics = () => {
    setShowLyrics(!showLyrics);
  };

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
          <div className="songs-list">
            {songs.map((song, index) => (
              <div
                key={song.id}
                className={`song-card ${selectedSong?.id === song.id ? 'active' : ''}`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  borderColor: `${song.color}60`
                }}
              >
                <div className="song-card-content" onClick={() => handleSongClick(song)}>
                  <div className="song-info">
                    <div className="song-icon">
                      <span className="play-icon">▶</span>
                    </div>
                    <div className="song-details">
                      <h3 className="song-title">{song.title}</h3>
                      <p className="song-artist">{song.artist}</p>
                    </div>
                  </div>
                  <div className="song-actions">
                    <span className="listen-text">Listen</span>
                    <span className="arrow">→</span>
                  </div>
                </div>

                {selectedSong?.id === song.id && (
                  <div className="song-card-footer">
                    <button
                      className="lyrics-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLyrics();
                      }}
                    >
                      {showLyrics ? 'Hide Lyrics' : 'Show Lyrics'}
                    </button>
                  </div>
                )}

                <div
                  className="song-card-glow"
                  style={{ background: `radial-gradient(circle at center, ${song.color}30, transparent)` }}
                ></div>
              </div>
            ))}
          </div>

          {selectedSong && showLyrics && (
            <div className="lyrics-popup" onClick={() => setShowLyrics(false)}>
              <div className="lyrics-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={() => setShowLyrics(false)}>
                  ×
                </button>
                <h2 className="lyrics-title">{selectedSong.title}</h2>
                <p className="lyrics-artist">{selectedSong.artist}</p>
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
          <p>Click on any song to listen on YouTube</p>
          <p className="sub-note">Each song holds a special memory of us ♥</p>
        </div>
      </div>
    </>
  );
};

export default MusicPage;
