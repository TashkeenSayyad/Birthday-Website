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
        <header className="home-header">
          <div className="header-content">
            <h1 className="home-title">Happy Birthday</h1>
            <div className="title-decoration"></div>
            <p className="home-subtitle">Twenty-four years of grace, beauty, and light</p>
          </div>
        </header>

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

        <footer className="home-footer">
          <p className="footer-text">With all my love, today and always</p>
        </footer>
      </div>
    </>
  );
};

export default Home;