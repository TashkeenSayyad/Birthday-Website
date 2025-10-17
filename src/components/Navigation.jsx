import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navigation.css';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/messages', label: 'Birthday Messages', icon: '💌' },
    { path: '/things-we-love', label: 'Things We Love', icon: '💜' },
    { path: '/memories', label: 'Favorite Memories', icon: '📸' },
  ];
  return (
    <>
      <button 
        className={`nav-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={`navigation ${isOpen ? 'open' : ''}`}>
        <div className="nav-content">
          <h3 className="nav-title">Explore</h3>
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {isOpen && <div className="nav-overlay" onClick={() => setIsOpen(false)} />}
    </>
  );
};

export default Navigation;