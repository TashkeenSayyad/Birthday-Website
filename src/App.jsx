import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ConstantSparkles from './components/ConstantSparkles';
import Home from './pages/Home';
import MessagesPage from './pages/MessagesPage';
import ThingsWeLove from './pages/ThingsWeLove';
import FavoriteMemories from './pages/FavoriteMemories';
import PersonalNote from './components/PersonalNote';
import 'bulma/css/bulma.min.css';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <ConstantSparkles/>
        <Navigation/>
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