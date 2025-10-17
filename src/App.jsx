import React, { useState, useEffect } from 'react';
import Gallery from './components/Gallery';
import StarryBackground from './components/StarryBackground';
import PawButton from './components/PawButton';
import Confetti from './components/Confetti';
import messagesData from './data/messages.json';
import 'bulma/css/bulma.min.css';
import './styles/App.css';

function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(messagesData);
  }, []);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  return (
    <div className="app">
      <StarryBackground />
      
      <div className="app-content">
        <header className="app-header">
          <div className="header-decoration">🎂</div>
          <h1 className="app-title">Happy Birthday!</h1>
          <p className="app-tagline">Your friends have something special to say...</p>
          <div className="header-decoration">🎉</div>
        </header>

        {messages.length > 0 && <Gallery messages={messages} />}
      </div>

      <PawButton onClick={triggerConfetti} />
      <Confetti active={showConfetti} />
    </div>
  );
}

export default App;