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
            <div className="welcome-badge">Today's the Day!</div>
            <h1 className="home-title">Happy 24th Birthday</h1>
            <div className="title-decoration"></div>
            <p className="home-subtitle">Celebrating the amazing person you are</p>
            <p className="hero-description">
              Today we celebrate you—your kindness, your light, and all the beautiful
              moments you've given us. This special day is all about the incredible journey
              you've traveled and the wonderful adventures still to come.
            </p>
          </div>
        </header>

        {/* Why Today is Special Section */}
        <section className="special-section">
          <div className="section-header">
            <h2 className="section-title">Why Today is Extra Special</h2>
            <div className="section-underline"></div>
          </div>
          <div className="special-content">
            <div className="special-card">
              <span className="special-emoji">🎂</span>
              <h3>24 Years of Joy</h3>
              <p>Every year with you has been a gift, filled with laughter, love, and countless precious memories.</p>
            </div>
            <div className="special-card">
              <span className="special-emoji">🌟</span>
              <h3>Endless Possibilities</h3>
              <p>This year brings new dreams, new adventures, and new opportunities to shine even brighter.</p>
            </div>
            <div className="special-card">
              <span className="special-emoji">💖</span>
              <h3>Surrounded by Love</h3>
              <p>You're cherished by so many, and today we're all here to celebrate the wonderful you.</p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">24</span>
              <span className="stat-label">Amazing Years</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">∞</span>
              <span className="stat-label">Beautiful Memories</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">💯</span>
              <span className="stat-label">Reasons We Love You</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">365</span>
              <span className="stat-label">Days to Celebrate</span>
            </div>
          </div>
        </section>

        {/* Menu Grid Section */}
        <section className="explore-section">
          <div className="section-header">
            <h2 className="section-title">Explore Your Birthday Surprises</h2>
            <div className="section-underline"></div>
            <p className="section-description">
              We've prepared something special in each section—dive in and discover the love we have for you!
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

        {/* Inspirational Quote Section */}
        <section className="quote-section">
          <div className="quote-container">
            <div className="quote-mark">"</div>
            <p className="quote-text">
              The more you praise and celebrate your life, the more there is in life to celebrate.
            </p>
            <p className="quote-author">— Oprah Winfrey</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="home-footer">
          <div className="footer-content">
            <p className="footer-text">With all our love, today and always</p>
            <p className="footer-subtext">May this year bring you endless happiness and dreams come true</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;