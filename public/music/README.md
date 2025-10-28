# Music Files Directory

This folder contains the audio files for the music page.

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

## Alternative: Use Spotify Embeds

If you prefer to use Spotify instead of local files:

1. Open `src/pages/MusicPage.jsx`
2. For each song, uncomment the `spotifyUri` line and add the Spotify track URI
3. You can get the Spotify URI by:
   - Right-clicking a song in Spotify
   - Going to "Share" → "Copy Song Link"
   - The URI format is: `spotify:track:XXXXXXXXX`

## Supported Formats

- MP3 (recommended)
- WAV
- OGG
- Other HTML5 audio formats

## File Size Tips

For better performance:
- Keep file sizes under 10MB per song
- Use 192kbps or 256kbps MP3 quality
- Consider using online tools to compress files if needed

## Need Help?

If your songs aren't playing:
1. Check that the filenames match exactly (case-sensitive)
2. Ensure files are in MP3 format
3. Check browser console for any errors
4. Try with a smaller test file first
