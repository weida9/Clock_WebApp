import { useState, useEffect } from 'react';
import Clock from './components/Clock';
import ToggleButton from './components/ToggleButton';

// Simple Particle component for background effect
const Particle = ({ delay, duration, size, left, top }: { 
  delay: number;
  duration: number;
  size: number;
  left: string;
  top: string;
}) => {
  return (
    <div 
      className="absolute rounded-full bg-white opacity-20 animate-float"
      style={{ 
        width: `${size}px`,
        height: `${size}px`,
        left,
        top,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    />
  );
};

const App = () => {
  const [is24Hour, setIs24Hour] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  
  // Particles data for background effect
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 7,
    size: 3 + Math.random() * 8,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
  }));

  useEffect(() => {
    // Trigger load animation after a short delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient">
      {/* Animated particles */}
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          delay={particle.delay}
          duration={particle.duration}
          size={particle.size}
          left={particle.left}
          top={particle.top}
        />
      ))}
      
      {/* Main container with animation */}
      <div className={`
        absolute inset-0 flex items-center justify-center transition-opacity duration-1000
        ${isLoaded ? 'opacity-100' : 'opacity-0'}
      `}>
        <div className={`
          clock-container text-center text-white p-8 rounded-2xl
          bg-black bg-opacity-30 
          transition-all duration-700 transform
          ${isLoaded ? 'translate-y-0 scale-100' : 'translate-y-10 scale-95'}
          animate-float
        `}
        style={{ animationDuration: '8s' }}>
          <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-pink-300">
            Digital Clock
          </h1>
          <Clock is24Hour={is24Hour} />
          <ToggleButton is24Hour={is24Hour} setIs24Hour={setIs24Hour} />
        </div>
      </div>
    </div>
  );
};

export default App; 