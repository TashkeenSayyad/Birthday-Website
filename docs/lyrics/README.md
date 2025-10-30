# Lyrics Folder (LRC Format)

Place your LRC lyric files in this directory.

## What is LRC Format?

LRC (Lyric) is a simple text format for synchronized lyrics. Each line has a timestamp showing when it should be displayed.

## LRC File Format

```
[mm:ss.xx]Lyric text here
```

- `mm` = minutes (2 digits)
- `ss` = seconds (2 digits)
- `xx` = hundredths of a second (2 digits)

## Example LRC File

See `example.lrc` in this folder for a complete example.

```lrc
[00:00.00]Song Title
[00:03.50]Artist Name
[00:05.00]
[00:12.50]First line of the song starts here
[00:18.30]Second line comes after five seconds
[00:24.80]And so on...
```

## Creating LRC Files

### Method 1: Online Tools
- **LRC Maker**: Search for "LRC editor online"
- Upload your MP3 file
- Type lyrics and tap along with the music to set timestamps
- Download the LRC file

### Method 2: Manual Creation
1. Play the song
2. Note the timestamp when each line starts
3. Create a text file with `.lrc` extension
4. Format each line as: `[mm:ss.xx]Lyric text`

### Method 3: Download Existing LRC Files
- Search for "[Song Name] [Artist] LRC file"
- Many websites provide pre-made LRC files
- Download and save to this folder

## Naming Convention

LRC files must match the MP3 filename:
- MP3: `perfect.mp3` → LRC: `perfect.lrc`
- MP3: `all-of-me.mp3` → LRC: `all-of-me.lrc`

Use lowercase with hyphens instead of spaces.

## Tips for Good Synchronization

1. **Start times**: Set the timestamp to when the vocalist starts singing the line
2. **Blank lines**: Use empty timestamps `[mm:ss.xx]` for instrumental breaks
3. **Accuracy**: Timestamps should be accurate to within 0.5 seconds
4. **Testing**: Play the song and verify the lyrics sync correctly

## Troubleshooting

**Lyrics not appearing?**
- Check that the LRC filename matches the MP3 filename exactly
- Verify the LRC file is in the `/public/lyrics/` folder
- Make sure timestamps are in the correct format `[mm:ss.xx]`

**Lyrics out of sync?**
- Adjust the timestamps in the LRC file
- Open the LRC file in a text editor
- Fine-tune the seconds/hundredths values

**Example of fixing timing:**
```lrc
[00:12.50]Too early? Increase the seconds → [00:13.50]
[00:18.30]Too late? Decrease the seconds → [00:17.30]
```

## Copyright Notice

LRC files contain song lyrics which are copyrighted material. Ensure you have the right to use any lyrics files you add. This is intended for personal use only.
