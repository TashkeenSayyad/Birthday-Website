import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import ConstantSparkles from './components/ConstantSparkles';
import CandlePage from './pages/CandlePage';
import Home from './pages/Home';
import MessagesPage from './pages/MessagesPage';
import ThingsWeLove from './pages/ThingsWeLove';
import FavoriteMemories from './pages/FavoriteMemories';
import PersonalNotesPage from './pages/PersonalNotesPage';
import PersonalNote from './components/PersonalNote';
import 'bulma/css/bulma.min.css';
import './styles/App.css';

// Component to handle initial redirect to candle page
const InitialRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [checking, setChecking] = React.useState(true);

  const base = import.meta.env.BASE_URL;

  useEffect(() => {
    const hasBlown = sessionStorage.getItem('candlesBlown');

    if (!hasBlown && location.pathname === base) {
      navigate(`${base}candle`, { replace: true });
    }

    setChecking(false);
  }, [navigate, location, base]);

  if (checking) return null;

  const hasBlown = sessionStorage.getItem('candlesBlown');

  if (!hasBlown && location.pathname === base) {
    return <Navigate to={`${base}candle`} replace />;
  }

  return <Home />;
};

function App() {
  const handleBackToCandles = () => {
    sessionStorage.removeItem('candlesBlown');
    // Use dynamic base path for GitHub Pages and local dev
    window.location.href = `${import.meta.env.BASE_URL}candle`;
  };

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="app">
        <ConstantSparkles />
        <Navigation onBackToCandles={handleBackToCandles} />
        <Routes>
          <Route path="/" element={<InitialRedirect />} />
          <Route path="/candle" element={<CandlePage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/things-we-love" element={<ThingsWeLove />} />
          <Route path="/memories" element={<FavoriteMemories />} />
          <Route path="/notes" element={<PersonalNotesPage />} />
          <Route path="/note/:person" element={<PersonalNote />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;