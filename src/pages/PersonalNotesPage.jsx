import React from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingParticles from '../components/FloatingParticles';
import FloatingHearts from '../components/FloatingHearts';
import specialNotesData from '../data/specialNotes.json';
import messagesData from '../data/messages.json';
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
          <h1 className="page-title">Special Messages & Letters</h1>
          <div className="title-decoration">
            <span className="heart-icon">💌</span>
          </div>
          <p className="page-subtitle">Heartfelt messages and letters written just for you</p>
        </header>

        {/* Birthday Messages Section */}
        {messagesData.length > 0 && (
          <section className="messages-section">
            <h2 className="section-title">Birthday Messages</h2>
            <p className="section-subtitle">Words from those who cherish you</p>

            <div className="messages-grid">
              {messagesData.map((message) => (
                <div key={message.id} className="message-card-compact">
                  <div className="message-image-wrapper">
                    <img src={message.image} alt={message.name} className="message-image" />
                  </div>
                  <div className="message-content-wrapper">
                    <div className="message-header">
                      <h3 className="message-sender">{message.name}</h3>
                      <span className="message-relationship">{message.relationship}</span>
                    </div>
                    <p className="message-text">{message.message}</p>
                    {message.hasSpecialNote && (
                      <button
                        className="read-full-letter-btn"
                        onClick={() => navigate(message.specialNotePath)}
                      >
                        Read Full Letter →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Personal Letters Section */}
        {notesArray.length > 0 && (
          <section className="letters-section">
            <h2 className="section-title">Personal Letters</h2>
            <p className="section-subtitle">Detailed letters written with love</p>

            <div className="notes-grid">
              {notesArray.map((note) => (
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
              ))}
            </div>
          </section>
        )}

        {messagesData.length === 0 && notesArray.length === 0 && (
          <div className="no-content">
            <p>No messages or letters available yet</p>
          </div>
        )}
      </div>
    </>
  );
};

export default PersonalNotesPage;
