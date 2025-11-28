/**
 * Parse LRC (lyrics) file format
 * LRC format: [mm:ss.xx]Lyric text
 * @param {string} text - Raw LRC file content
 * @returns {Array} Array of {time, text} objects
 */
export const parseLRC = (text) => {
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

/**
 * Load and parse LRC file from URL
 * @param {string} url - URL to LRC file
 * @returns {Promise<Array>} Parsed lyrics array
 */
export const loadLyrics = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Lyrics not found (${response.status})`);
    }
    const text = await response.text();
    const parsedLyrics = parseLRC(text);

    if (parsedLyrics.length === 0) {
      throw new Error('No valid lyrics found in LRC file');
    }

    return parsedLyrics;
  } catch (error) {
    console.error('Failed to load lyrics:', error);
    return [
      { time: 0, text: 'Lyrics not available' },
      { time: 1, text: `Error: ${error.message}` },
    ];
  }
};

/**
 * Find current lyric line index based on audio time
 * @param {Array} lyrics - Parsed lyrics array
 * @param {number} currentTime - Current audio time in seconds
 * @returns {number} Index of current lyric line
 */
export const getCurrentLyricIndex = (lyrics, currentTime) => {
  return lyrics.findIndex(
    (line, i) =>
      currentTime >= line.time &&
      (!lyrics[i + 1] || currentTime < lyrics[i + 1].time)
  );
};
