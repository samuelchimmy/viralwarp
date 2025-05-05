
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Help: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the Warpcast profile
    window.location.href = "https://warpcast.com/508";
  }, []);
  
  return (
    <div className="flex items-center justify-center h-screen">
      <p>Redirecting to help...</p>
    </div>
  );
};

export default Help;
