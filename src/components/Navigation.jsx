import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navigation.css';

const Navigation = ({ onBackToCandles }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/messages', label: 'Special Messages for your Birthday', icon: '💌' },
    { path: '/things-we-love', label: 'Things We Love About You', icon: '💜' },
    { path: '/memories', label: 'Our Favorite Memories', icon: '📸' },
    { path: '/notes', label: 'Letters for you', icon: '📝' },
    { path: '/music', label: 'Music', icon: '🎵' },
    { path: '/timeline', label: 'Journey Through Time', icon: '⏳' },
  ];

  const handleBackToCandles = () => {
    setIsOpen(false);
    onBackToCandles();
  };

  return (
    <>
      <button 
        className={`nav-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={`navigation ${isOpen ? 'open' : ''}`}>
        <div className="nav-content">
          <h3 className="nav-title">Explore</h3>
          <ul className="nav-list">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </Link>
                </li>
              );
            })}
            
            {/* Divider */}
            <li className="nav-divider"></li>
            
            {/* Back to Candles Button */}
            <li>
              <button
                className="nav-link nav-link-special"
                onClick={handleBackToCandles}
              >
                <span className="nav-icon">🎂</span>
                <span className="nav-label">Blow Candles Again</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {isOpen && <div className="nav-overlay" onClick={() => setIsOpen(false)} />}
    </>
  );
};

export default Navigation;