import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import specialNotesData from '../data/specialNotes.json';
import '../styles/SpecialNotes.css';

const PersonalNote = () => {
  const { person } = useParams();
  const navigate = useNavigate();
  const note = specialNotesData[person];

  if (!note) {
    return (
      <div className="note-error">
        <h2>Note not found</h2>
        <button onClick={() => navigate('/')}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="personal-note-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="note-container">
        <div className="note-header">
          <img src={note.image} alt={note.name} />
          <p className="note-from">From: {note.name}</p>
          <h1 className="note-title">{note.title}</h1>
        </div>

        <div className="note-content">
          {note.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {note.additionalImages && (
          <div className="note-gallery">
            {note.additionalImages.map((img, index) => (
              <img key={index} src={img} alt={`Memory ${index + 1}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalNote;