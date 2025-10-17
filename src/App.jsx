import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ConstantSparkles from './components/ConstantSparkles';
import CandleBlow from './components/CandleBlow';
import Home from './pages/Home';
import MessagesPage from './pages/MessagesPage';
import ThingsWeLove from './pages/ThingsWeLove';
import FavoriteMemories from './pages/FavoriteMemories';
import PersonalNote from './components/PersonalNote';
import 'bulma/css/bulma.min.css';
import './styles/App.css';

function App() {
  const [showCandleScreen, setShowCandleScreen] = useState(true);

  const handleCandlesBlown = () => {
    setShowCandleScreen(false);
  };

  const handleBackToCandles = () => {
    sessionStorage.removeItem('candlesBlown');
    setShowCandleScreen(true);
  };

  if (showCandleScreen) {
    return <CandleBlow onComplete={handleCandlesBlown} />;
  }

  return (
    <Router>
      <div className="app">
        <ConstantSparkles />
        <Navigation onBackToCandles={handleBackToCandles} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/things-we-love" element={<ThingsWeLove />} />
          <Route path="/memories" element={<FavoriteMemories />} />
          <Route path="/note/:person" element={<PersonalNote />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;