import React from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingParticles from '../components/FloatingParticles';
import FloatingHearts from '../components/FloatingHearts';
import specialNotesData from '../data/specialNotes.json';
import '../styles/PersonalNotesPage.css';

const PersonalNotesPage = () => {
  const navigate = useNavigate();

  // Convert the object to an array for easier mapping
  const notesArray = Object.entries(specialNotesData).map(([key, value]) => ({
    id: key,
    ...value
  }));

  return (
    <>
      <FloatingParticles />
      <FloatingHearts />

      <div className="personal-notes-page">
        <header className="page-header">
          <h1 className="page-title">Personal Letters</h1>
          <div className="title-decoration">
            <span className="heart-icon">💌</span>
          </div>
          <p className="page-subtitle">Heartfelt messages written just for you</p>
        </header>

        <div className="notes-grid">
          {notesArray.length === 0 ? (
            <div className="no-notes">
              <p>No personal letters available yet</p>
            </div>
          ) : (
            notesArray.map((note) => (
              <div
                key={note.id}
                className="note-card"
                onClick={() => navigate(`/note/${note.id}`)}
              >
                <div className="note-image-wrapper">
                  <img src={note.image} alt={note.title} className="note-image" />
                  <div className="note-overlay">
                    <span className="read-button">Read Letter →</span>
                  </div>
                </div>

                <div className="note-card-content">
                  <div className="note-from-badge">From: {note.name}</div>
                  <h2 className="note-card-title">{note.title}</h2>
                  <p className="note-preview">
                    {note.content[0].substring(0, 120)}...
                  </p>
                </div>

                <div className="note-card-footer">
                  <span className="envelope-icon">✉️</span>
                  <span className="click-hint">Click to open</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default PersonalNotesPage;
