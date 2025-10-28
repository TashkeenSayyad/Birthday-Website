import React from 'react';
import { useNavigate } from 'react-router-dom';
import BirthdayCake from '../components/BirthdayCake';

const CandlePage = () => {
  const navigate = useNavigate();

  const handleComplete = () => {
    // After candles are blown, redirect to home menu
    navigate('/');
  };

  return <BirthdayCake onComplete={handleComplete} />;
};

export default CandlePage;
