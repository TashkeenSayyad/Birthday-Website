import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingParticles from '../components/FloatingParticles';
import FloatingHearts from '../components/FloatingHearts';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startY, setStartY] = useState(0);
  const pageRef = useRef(null);

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
    },
    {
      id: 5,
      title: 'Music that reminds of you',
      subtitle: 'Songs that tell our story',
      icon: '🎵',
      path: '/music',
      color: '#e74c3c'
    },
    {
      id: 6,
      title: 'Journey Through Time',
      subtitle: 'A timeline of cherished moments',
      icon: '⏳',
      path: '/timeline',
      color: '#8b5cf6'
    }
  ];

  // Pull-to-refresh handlers
  const handleTouchStart = (e) => {
    // Only start if at the top of the page
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (window.scrollY === 0 && startY > 0) {
      const currentY = e.touches[0].clientY;
      const distance = currentY - startY;

      // Only pull down, with resistance
      if (distance > 0) {
        // Add resistance: the further you pull, the harder it gets
        const resistance = Math.min(distance / 3, 100);
        setPullDistance(resistance);
      }
    }
  };

  const handleTouchEnd = () => {
    if (pullDistance > 60) {
      // Trigger refresh
      setIsRefreshing(true);
      setPullDistance(80); // Lock at refresh position

      // Simulate refresh with confetti and particle effects
      setTimeout(() => {
        // Reset pull distance
        setPullDistance(0);
        setIsRefreshing(false);
        setStartY(0);

        // Add some visual celebration
        if (navigator.vibrate) {
          navigator.vibrate([50, 100, 50]);
        }
      }, 1500);
    } else {
      // Spring back
      setPullDistance(0);
      setStartY(0);
    }
  };

  return (
    <>
      <FloatingParticles />
      <FloatingHearts />

      {/* Pull-to-Refresh Indicator */}
      <div
        className={`refresh-indicator ${isRefreshing ? 'refreshing' : ''}`}
        style={{
          transform: `translateY(${Math.min(pullDistance - 40, 40)}px)`,
          opacity: Math.min(pullDistance / 60, 1)
        }}
      >
        <div className={`refresh-spinner ${isRefreshing ? 'spinning' : ''}`}>
          {isRefreshing ? '✨' : '⬇️'}
        </div>
        <span className="refresh-text">
          {isRefreshing ? 'Refreshing...' : pullDistance > 60 ? 'Release to refresh' : 'Pull to refresh'}
        </span>
      </div>

      <div
        ref={pageRef}
        className="home-page"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateY(${pullDistance}px)`,
          transition: pullDistance === 0 || isRefreshing ? 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
        }}
      >
        <header className="home-header">
          <div className="header-content">
            <h1 className="home-title">Happy Birthday</h1>
            <div className="title-decoration"></div>
            <p className="home-subtitle">Twenty-four years of your beautiful life</p>
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
          <p className="footer-text">With all our love, today and always</p>
        </footer>
      </div>
    </>
  );
};

export default Home;
