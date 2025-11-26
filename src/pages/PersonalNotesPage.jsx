import React from 'react';
import FloatingParticles from '../components/FloatingParticles';
import FloatingHearts from '../components/FloatingHearts';
import Gallery from '../components/Gallery';
import specialNotesData from '../data/specialNotes.json';
import '../styles/PersonalNotesPage.css';

const PersonalNotesPage = () => {
  // Convert specialNotes to array format that Gallery expects
  const letters = Object.entries(specialNotesData).map(([key, value]) => ({
    id: key,
    name: value.name,
    title: value.title,
    image: value.image,
    letterPath: `/note/${key}`
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
          <p className="page-subtitle">Heartfelt letters written just for you</p>
        </header>

        {letters.length === 0 ? (
          <div className="no-notes">
            <p>No personal letters available yet</p>
          </div>
        ) : (
          <Gallery messages={letters} />
        )}
      </div>
    </>
  );
};

export default PersonalNotesPage;
