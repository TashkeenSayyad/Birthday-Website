import React, { useState } from 'react';
import FloatingHearts from '../components/FloatingHearts';
import '../styles/MusicPage.css';

const MusicPage = () => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [showLyrics, setShowLyrics] = useState(false);

  // Songs configuration using Spotify embeds
  // To get Spotify track IDs (choose either method):
  //
  // Method 1: Share Link
  //   - Open Spotify > Right-click song > Share > Copy Song Link
  //   - Extract ID from URL: https://open.spotify.com/track/[TRACK_ID]
  //
  // Method 2: Embed Code (easier!)
  //   - Open Spotify > Right-click song > Share > Embed track
  //   - Copy the iframe code, it will look like:
  //     <iframe src="https://open.spotify.com/embed/track/[TRACK_ID]?utm_source=generator" ...>
  //   - Just copy the TRACK_ID from the URL (the long string of letters/numbers)
  //   - Example: 4lDmFJg35YoU7GDDRMSHdA
  const songs = [
    {
      id: 1,
      title: 'Perfect',
      artist: 'Ed Sheeran',
      description: 'Your wedding entrance song',
      spotifyTrackId: '0tgVpDi06FyKpA1z0VMD4v', // Ed Sheeran - Perfect
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
      spotifyTrackId: '3U4isOIWM3VvDubwSI3y7a', // John Legend - All of Me
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
      spotifyTrackId: '5MfJQeoFjzDYH0gW71br6r', // Ed Sheeran - Thinking Out Loud
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
      spotifyTrackId: '6U0FIYXCQ3TGrk4tFpLrEA', // Christina Perri - A Thousand Years
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
      spotifyTrackId: '7qEUFOVcxRI19tbT68JcYK', // Adele - Make You Feel My Love
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
      spotifyTrackId: '3gdewACMIVMEWVbyb8O9sY', // Elton John - Your Song
      color: '#ff8fab',
      lyrics: `[Add your own lyrics here]

Add your favorite verses
from this timeless classic.`
    }
  ];

  // Handle song selection
  const handleSongClick = (song) => {
    setSelectedSong(song);
    setShowLyrics(true); // Auto-show lyrics when a song is selected
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
          {/* Spotify Player */}
          {selectedSong && (
            <div className="spotify-player-container">
              <div className="player-info">
                <div className="now-playing-label">Now Playing</div>
                <h3 className="player-song-title">{selectedSong.title}</h3>
                <p className="player-artist">{selectedSong.artist}</p>
                <p className="player-description">"{selectedSong.description}"</p>
              </div>

              <iframe
                className="spotify-embed"
                src={`https://open.spotify.com/embed/track/${selectedSong.spotifyTrackId}?utm_source=generator`}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={`Spotify player for ${selectedSong.title}`}
              ></iframe>

              <div className="player-actions">
                <button className="lyrics-toggle-btn" onClick={toggleLyrics}>
                  {showLyrics ? 'Hide Lyrics' : 'Show Lyrics'}
                </button>
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
                      <span className="play-icon">▶</span>
                    </div>
                    <div className="song-details">
                      <h3 className="song-title">{song.title}</h3>
                      <p className="song-artist">{song.artist}</p>
                      <p className="song-description">{song.description}</p>
                    </div>
                  </div>
                  <div className="song-actions">
                    <span className="listen-text">
                      {selectedSong?.id === song.id ? 'Now Playing' : 'Play'}
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
          <p>Click on any song to play with Spotify and see lyrics</p>
          <p className="sub-note">Each song holds a special memory of us ♥</p>
          <p className="instruction-note">
            🎵 <strong>To add your own songs:</strong>
            <br />
            1. Open Spotify → Right-click a song → Share → Embed track
            <br />
            2. Copy the track ID from the iframe URL (the long code after /track/)
            <br />
            3. Paste it in <code>src/pages/MusicPage.jsx</code> as the <code>spotifyTrackId</code>
          </p>
        </div>
      </div>
    </>
  );
};

export default MusicPage;
