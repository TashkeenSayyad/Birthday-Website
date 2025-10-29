import React, { useState, useRef, useEffect } from 'react';
import FloatingHearts from '../components/FloatingHearts';
import '../styles/MusicPage.css';

const MusicPage = () => {
  // Get the base URL from Vite config (e.g., '/Birthday-Website/' or '/')
  const baseUrl = import.meta.env.BASE_URL;

  const [songs] = useState([
    {
      id: 1,
      title: 'Pal Pal',
      artist: 'Afusic prod. by AliSoomroMusic ',
      description: 'The song that we kept on repeat this whole year.',
      file: `${baseUrl}music/palpal.mp3`,
      lyricsFile: `${baseUrl}lyrics/palpal.lrc`,
      color: '#ff6b9d',
    },
    {
      id: 2,
      title: 'All of Me',
      artist: 'John Legend',
      description: 'Our first dance',
      file: `${baseUrl}music/all-of-me.mp3`,
      lyricsFile: `${baseUrl}lyrics/all-of-me.lrc`,
      color: '#c44569',
    },
    {
      id: 3,
      title: 'Thinking Out Loud',
      artist: 'Ed Sheeran',
      description: 'The song that reminds me of our late-night talks',
      file: `${baseUrl}music/thinking-out-loud.mp3`,
      lyricsFile: `${baseUrl}lyrics/thinking-out-loud.lrc`,
      color: '#f78fb3',
    },
    {
      id: 4,
      title: 'A Thousand Years',
      artist: 'Christina Perri',
      description: 'Your favorite romantic song',
      file: `${baseUrl}music/a-thousand-years.mp3`,
      lyricsFile: `${baseUrl}lyrics/a-thousand-years.lrc`,
      color: '#ea8685',
    },
    {
      id: 5,
      title: 'Make You Feel My Love',
      artist: 'Adele',
      description: 'The song I dedicated to you',
      file: `${baseUrl}music/make-you-feel-my-love.mp3`,
      lyricsFile: `${baseUrl}lyrics/make-you-feel-my-love.lrc`,
      color: '#be5869',
    },
    {
      id: 6,
      title: 'Your Song',
      artist: 'Elton John',
      description: 'Our anniversary song',
      file: `${baseUrl}music/your-song.mp3`,
      lyricsFile: `${baseUrl}lyrics/your-song.lrc`,
      color: '#ff8fab',
    },
  ]);

  const [selectedSong, setSelectedSong] = useState(null);
  const [lyrics, setLyrics] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Parse LRC file format
  // LRC format: [mm:ss.xx]Lyric text
  const parseLRC = (text) => {
    return text
      .split('\n')
      .map((line) => {
        const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
        if (!match) return null;
        const [, min, sec, lyric] = match;
        return {
          time: parseInt(min) * 60 + parseFloat(sec),
          text: lyric.trim(),
        };
      })
      .filter(Boolean);
  };

  // Load LRC file when song is selected
  useEffect(() => {
    if (!selectedSong) return;

    setLyrics([]);
    setCurrentLine(0);

    console.log('Attempting to load lyrics from:', selectedSong.lyricsFile);

    fetch(selectedSong.lyricsFile)
      .then((res) => {
        console.log('Lyrics fetch response:', res.status, res.statusText);
        if (!res.ok) throw new Error(`Lyrics not found (${res.status})`);
        return res.text();
      })
      .then((text) => {
        console.log('Lyrics loaded, length:', text.length);
        const parsedLyrics = parseLRC(text);
        console.log('Parsed lyrics lines:', parsedLyrics.length);
        if (parsedLyrics.length === 0) {
          throw new Error('No valid lyrics found in LRC file');
        }
        setLyrics(parsedLyrics);
      })
      .catch((error) => {
        console.error('Failed to load lyrics:', error);
        setLyrics([
          { time: 0, text: 'Lyrics not available' },
          { time: 1, text: `Error: ${error.message}` },
          { time: 2, text: 'Check browser console for details' },
        ]);
      });
  }, [selectedSong]);

  // Sync lyrics with audio playback
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || lyrics.length === 0) return;

    const updateLyrics = () => {
      const currentTime = audio.currentTime;
      const lineIndex = lyrics.findIndex(
        (line, i) =>
          currentTime >= line.time &&
          (!lyrics[i + 1] || currentTime < lyrics[i + 1].time)
      );

      if (lineIndex !== -1 && lineIndex !== currentLine) {
        setCurrentLine(lineIndex);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateLyrics);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('timeupdate', updateLyrics);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [lyrics, currentLine]);

  const handleSelectSong = (song) => {
    setSelectedSong(song);
    setCurrentLine(0);
    setLyrics([]);
    setIsPlaying(false);
  };

  return (
    <>
      <FloatingHearts />
      <div className="music-page">
        <div className="music-header">
          <div className="music-header-content">
            <h1 className="music-title">Music that reminds me of you</h1>
            <div className="title-decoration"></div>
            <p className="music-subtitle">
              Songs that make me think of you and our special moments together
            </p>
          </div>
        </div>

        <div className="music-content">
          {/* Audio Player */}
          {selectedSong && (
            <div className="audio-player-container">
              <div className="player-info">
                <div className="now-playing-label">Now Playing</div>
                <h3 className="player-song-title">{selectedSong.title}</h3>
                <p className="player-artist">{selectedSong.artist}</p>
                <p className="player-description">"{selectedSong.description}"</p>
              </div>

              <audio
                ref={audioRef}
                key={selectedSong.file}
                src={selectedSong.file}
                controls
                autoPlay
                className="audio-player"
              />

              {/* Lyrics Display */}
              {lyrics.length > 0 && (
                <div className="lyrics-box">
                  {lyrics.map((line, i) => (
                    <p
                      key={i}
                      className={`lyrics-line ${i === currentLine ? 'active' : ''} ${
                        i < currentLine ? 'passed' : ''
                      }`}
                    >
                      {line.text}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Song List */}
          <div className="songs-list">
            {songs.map((song, index) => (
              <div
                key={song.id}
                className={`song-card ${selectedSong?.id === song.id ? 'active' : ''}`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  borderColor: `${song.color}60`,
                }}
                onClick={() => handleSelectSong(song)}
              >
                <div className="song-card-content">
                  <div className="song-info">
                    <div
                      className="song-icon"
                      style={{
                        background: `linear-gradient(135deg, ${song.color}, ${song.color}dd)`,
                      }}
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
                      {selectedSong?.id === song.id ? 'Now Playing' : 'Play'}
                    </span>
                    <span className="arrow">→</span>
                  </div>
                </div>

                <div
                  className="song-card-glow"
                  style={{
                    background: `radial-gradient(circle at center, ${song.color}30, transparent)`,
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        <div className="music-note">
          <p>Click on any song to play and see synchronized lyrics</p>
          <p className="sub-note">Each song holds a special memory of us</p>
          <p className="instruction-note">
            <strong>To add your own songs:</strong>
            <br />
            1. Place MP3 files in <code>/public/music/</code>
            <br />
            2. Create LRC lyric files in <code>/public/lyrics/</code>
            <br />
            3. Update the songs array in <code>src/pages/MusicPage.jsx</code>
            <br />
            See <code>/public/lyrics/example.lrc</code> for LRC format reference
          </p>
        </div>
      </div>
    </>
  );
};

export default MusicPage;
