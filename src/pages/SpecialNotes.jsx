import React, { useState, useEffect } from 'react';
import notesData from '../data/notes.json';
import '../styles/NotesTimeline.css';

const SpecialNotes = () => {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(0);

  useEffect(() => {
    setNotes(notesData);
  }, []);

  return (
    <div className="notes-page">
      <div className="page-header">
        <h1 className="page-title">Special Notes</h1>
        <p className="page-subtitle">Heartfelt words written just for you</p>
      </div>

      <div className="notes-timeline">
        {notes.map((note, index) => (
          <div
            key={note.id}
            className={`note-item ${index === activeNote ? 'active' : ''}`}
            onClick={() => setActiveNote(index)}
          >
            <div className="note-content-main">
              <div className="note-header">
                <h3>{note.title}</h3>
                <span className="note-date">{note.date}</span>
              </div>
              <div className="note-text">
                <p>{note.text}</p>
              </div>
              <p className="note-from">— {note.from}</p>
            </div>
            {note.image && (
              <div className="note-image-small">
                <img src={note.image} alt={note.title} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialNotes;
