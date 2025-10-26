import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import ConstantSparkles from './components/ConstantSparkles';
import CandlePage from './pages/CandlePage';
import Home from './pages/Home';
import MessagesPage from './pages/MessagesPage';
import ThingsWeLove from './pages/ThingsWeLove';
import FavoriteMemories from './pages/FavoriteMemories';
import SpecialNotes from './pages/SpecialNotes';
import PersonalNotesPage from './pages/PersonalNotesPage';
import PersonalNote from './components/PersonalNote';
import 'bulma/css/bulma.min.css';
import './styles/App.css';

// Component to handle initial redirect to candle page
const InitialRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hasBlown = sessionStorage.getItem('candlesBlown');

    // If candles haven't been blown and we're on the home page, redirect to candle page
    if (!hasBlown && location.pathname === '/') {
      navigate('/candle');
    }
  }, [navigate, location]);

  const hasBlown = sessionStorage.getItem('candlesBlown');

  // If candles haven't been blown, redirect to candle page
  if (!hasBlown && location.pathname === '/') {
    return <Navigate to="/candle" replace />;
  }

  return <Home />;
};

function App() {
  const handleBackToCandles = () => {
    sessionStorage.removeItem('candlesBlown');
    window.location.href = '/candle';
  };

  return (
    <Router>
      <div className="app">
        <ConstantSparkles />
        <Navigation onBackToCandles={handleBackToCandles} />
        <Routes>
          <Route path="/" element={<InitialRedirect />} />
          <Route path="/candle" element={<CandlePage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/things-we-love" element={<ThingsWeLove />} />
          <Route path="/memories" element={<FavoriteMemories />} />
          <Route path="/special-notes" element={<SpecialNotes />} />
          <Route path="/notes" element={<PersonalNotesPage />} />
          <Route path="/note/:person" element={<PersonalNote />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;