import React, { useState, useEffect } from 'react';
import Gallery from '../components/Gallery';
import FloatingParticles from '../components/FloatingParticles';
import HeartButton from '../components/HeartButton';
import Sparkles from '../components/Sparkles';
import messagesData from '../data/messages.json';
import '../styles/App.css';

const MessagesPage = () => {
  const [showSparkles, setShowSparkles] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(messagesData);
  }, []);

  const triggerSparkles = () => {
    setShowSparkles(true);
    setTimeout(() => setShowSparkles(false), 3000);
  };

  return (
    <>
      <FloatingParticles />
      <div className="app-content">
        <header className="app-header">
          <div className="header-content">
            <h1 className="main-title">Birthday Messages</h1>
            <div className="title-decoration"></div>
            <p className="subtitle-text">Words from those who cherish you</p>
          </div>
        </header>
        {messages.length > 0 && <Gallery messages={messages} />}
      </div>
      <HeartButton onClick={triggerSparkles} />
      <Sparkles active={showSparkles} />
    </>
  );
};

export default MessagesPage;