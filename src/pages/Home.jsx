import React, { useState, useEffect } from 'react';
import Gallery from '../components/Gallery';
import FloatingParticles from '../components/FloatingParticles';
import HeartButton from '../components/HeartButton';
import Sparkles from '../components/Sparkles';
import messagesData from '../data/messages.json';

const Home = () => {
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
            <h1 className="main-title">Happy Birthday</h1>
            <div className="title-decoration"></div>
            <p className="subtitle-text">Twenty-four years of grace, beauty, and light</p>
          </div>
        </header>
        {messages.length > 0 && <Gallery messages={messages} />}
        <footer className="app-footer">
          <p className="footer-text">With all my love, today and always</p>
        </footer>
      </div>
      <HeartButton onClick={triggerSparkles} />
      <Sparkles active={showSparkles} />
    </>
  );
};

export default Home;