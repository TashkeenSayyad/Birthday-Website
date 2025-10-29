# Music Files Directory

This folder contains the audio files for the music page with synchronized lyrics.

## How to Add Your Music Files

1. **Download your songs** as MP3 files
2. **Rename them** to match the filenames in `src/pages/MusicPage.jsx`:
   - `perfect.mp3`
   - `all-of-me.mp3`
   - `thinking-out-loud.mp3`
   - `a-thousand-years.mp3`
   - `make-you-feel-my-love.mp3`
   - `your-song.mp3`

3. **Place the files** in this `/public/music/` folder

4. **Create matching LRC files** in `/public/lyrics/` folder:
   - `perfect.lrc`
   - `all-of-me.lrc`
   - etc.

See `/public/lyrics/README.md` for instructions on creating LRC lyric files.

## Synchronized Lyrics Feature

The music page now supports auto-synchronized lyrics using LRC format!

- **LRC files** contain timestamped lyrics that sync with the music
- Each song needs a matching `.lrc` file in `/public/lyrics/`
- Lyrics will highlight in real-time as the song plays
- See `/public/lyrics/example.lrc` for the format

## Supported Audio Formats

- MP3 (recommended)
- WAV
- OGG
- M4A
- Other HTML5 audio formats

## File Size Tips

For better performance:
- Keep file sizes under 10MB per song
- Use 128-192kbps MP3 quality for good balance
- Consider using online tools to compress files if needed

## Adding New Songs

To add a completely new song (not in the list):

1. Place the MP3 file here: `/public/music/new-song.mp3`
2. Create an LRC file: `/public/lyrics/new-song.lrc`
3. Open `src/pages/MusicPage.jsx` and add to the songs array:

```javascript
{
  id: 7,
  title: 'Your Song Title',
  artist: 'Artist Name',
  description: 'Why this song is special',
  file: '/music/new-song.mp3',
  lyricsFile: '/lyrics/new-song.lrc',
  color: '#ff6b9d', // Pick from existing color palette
}
```

## Need Help?

If your songs aren't playing:
1. Check that the filenames match exactly (case-sensitive)
2. Ensure files are in MP3 format
3. Check browser console for any errors
4. Try with a smaller test file first

If lyrics aren't syncing:
1. Verify the LRC file exists with matching filename
2. Check LRC format (see `/public/lyrics/example.lrc`)
3. Test timestamps are in `[mm:ss.xx]` format

## Copyright Notice

Ensure you have the right to use any music files you add. This is intended for personal use only.
