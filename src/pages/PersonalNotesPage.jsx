import React from 'react';
import FloatingParticles from '../components/FloatingParticles';
import FloatingHearts from '../components/FloatingHearts';
import HeartFlowField from '../components/HeartFlowField';
import Gallery from '../components/Gallery';
import { ArtisticHeader } from '../components/DecorativeElements';
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
      <HeartFlowField seed={54321} particleCount={400} />
      <FloatingParticles />
      <FloatingHearts />

      <div className="personal-notes-page">
        <ArtisticHeader
          title="Personal Letters 💌"
          subtitle="Heartfelt letters written just for you"
        />

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
