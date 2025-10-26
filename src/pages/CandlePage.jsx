import React from 'react';
import { useNavigate } from 'react-router-dom';
import CandleBlow from '../components/CandleBlow';

const CandlePage = () => {
  const navigate = useNavigate();

  const handleComplete = () => {
    // After candles are blown, redirect to home menu
    navigate('/');
  };

  return <CandleBlow onComplete={handleComplete} />;
};

export default CandlePage;
