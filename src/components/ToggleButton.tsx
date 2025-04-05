import React, { useState } from 'react';

interface ToggleButtonProps {
  is24Hour: boolean;
  setIs24Hour: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ is24Hour, setIs24Hour }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setIs24Hour(!is24Hour);
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        mt-6 px-6 py-3 rounded-full 
        bg-gradient-to-r from-blue-500 to-purple-600
        text-white font-semibold
        shadow-lg hover:shadow-xl
        transition-all duration-300
        hover:scale-105 
        active:scale-95
        relative
        overflow-hidden
        ${isAnimating ? 'animate-pulse' : ''}
      `}
    >
      <span className="relative z-10">
        {is24Hour ? 'Switch to 12-Hour' : 'Switch to 24-Hour'}
      </span>
      
      <span 
        className={`
          absolute inset-0 
          bg-gradient-to-r from-pink-500 to-purple-600
          z-0
          transition-opacity duration-300
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
      />
      
      {/* Decorative elements */}
      <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-yellow-300 animate-pulse-slow opacity-75" />
      <span className="absolute bottom-0 left-0 h-2 w-2 rounded-full bg-green-300 animate-pulse-slow opacity-75" style={{ animationDelay: '1s' }} />
    </button>
  );
};

export default ToggleButton; 