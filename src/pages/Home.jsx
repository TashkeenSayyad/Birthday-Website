import React from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingParticles from '../components/FloatingParticles';
import FloatingHearts from '../components/FloatingHearts';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 1,
      title: 'Birthday Messages',
      subtitle: 'From your loved ones',
      icon: '💌',
      path: '/messages',
      color: '#e91e8c'
    },
    {
      id: 2,
      title: 'Things We Love About You',
      subtitle: 'Everything that makes you, you',
      icon: '✨',
      path: '/things-we-love',
      color: '#9b59b6'
    },
    {
      id: 3,
      title: 'Favorite Memories',
      subtitle: 'Pictures worth a thousand words',
      icon: '📸',
      path: '/memories',
      color: '#3498db'
    },
    {
      id: 4,
      title: 'Personal Letters',
      subtitle: 'Private messages just for you',
      icon: '💝',
      path: '/notes',
      color: '#d4a5d8'
    }
  ];

  return (
    <>
      <FloatingParticles />
      <FloatingHearts />

      <div className="home-page">
        {/* Hero Section */}
        <header className="home-header">
          <div className="header-content">
            <div className="birthday-balloons">🎈🎈🎈</div>
            <h1 className="home-title">Happy 24th Birthday!</h1>
            <div className="title-decoration"></div>
            <p className="home-subtitle">This day is all about YOU</p>
            <p className="hero-description">
              We've been counting down to this moment! Today, we're celebrating the incredible person
              you are, the joy you bring to our lives, and all the amazing memories we've shared together.
              Get ready for some surprises... 💝
            </p>
          </div>
        </header>

        {/* Celebration Message */}
        <section className="celebration-message">
          <div className="message-bubble">
            <p className="bubble-text">
              You make the world brighter just by being in it. Your laugh is contagious,
              your heart is pure gold, and your friendship means everything to us.
              We hope today is filled with as much happiness as you give to everyone around you!
            </p>
          </div>
        </section>

        {/* Menu Grid Section */}
        <section className="explore-section">
          <div className="section-header">
            <h2 className="section-title">Your Birthday Surprises Await!</h2>
            <div className="section-underline"></div>
            <p className="section-description">
              We've put together some special things just for you. Click on any card to see what's inside!
            </p>
          </div>

          <div className="menu-grid">
            {menuItems.map((item, index) => (
              <div
                key={item.id}
                className="menu-card"
                onClick={() => navigate(item.path)}
                style={{
                  animationDelay: `${index * 0.15}s`,
                  borderColor: `${item.color}40`
                }}
              >
                <div className="menu-card-content">
                  <span className="menu-icon">{item.icon}</span>
                  <h2 className="menu-title">{item.title}</h2>
                  <p className="menu-subtitle">{item.subtitle}</p>
                  <div className="menu-arrow">→</div>
                </div>
                <div
                  className="menu-card-glow"
                  style={{ background: `radial-gradient(circle at center, ${item.color}20, transparent)` }}
                ></div>
              </div>
            ))}
          </div>
        </section>

        {/* Birthday Wish */}
        <section className="wish-section">
          <div className="wish-container">
            <div className="cake-emoji">🎂</div>
            <h3 className="wish-title">Make a Wish!</h3>
            <p className="wish-text">
              Here's to another year of adventures, laughter, and making incredible memories together.
              May all your dreams take flight this year!
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="home-footer">
          <div className="footer-content">
            <p className="footer-text">Happy Birthday! 🎉</p>
            <p className="footer-subtext">Made with love, just for you ❤️</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;