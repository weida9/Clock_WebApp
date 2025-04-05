import { useState, useEffect } from 'react';

interface ClockProps {
  is24Hour: boolean;
}

const Clock = ({ is24Hour }: ClockProps) => {
  const [time, setTime] = useState<Date>(new Date());
  const [prevTime, setPrevTime] = useState<string>('');
  const [animatingDigits, setAnimatingDigits] = useState<Set<number>>(new Set());

  useEffect(() => {
    const timer = setInterval(() => {
      const newDate = new Date();
      setTime(newDate);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    const hours = is24Hour ? time.getHours() : time.getHours() % 12 || 12;
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');
    const period = is24Hour ? '' : time.getHours() >= 12 ? ' PM' : ' AM';
    return `${String(hours).padStart(2, '0')}:${minutes}:${seconds}${period}`;
  };

  useEffect(() => {
    const currentTimeStr = formatTime();
    
    if (prevTime) {
      // Find which digits changed
      const changedIndices = new Set<number>();
      for (let i = 0; i < currentTimeStr.length; i++) {
        if (i >= prevTime.length || currentTimeStr[i] !== prevTime[i]) {
          changedIndices.add(i);
        }
      }
      
      setAnimatingDigits(changedIndices);
      
      // Reset animation after it completes
      const timer = setTimeout(() => {
        setAnimatingDigits(new Set());
      }, 500);
      
      return () => clearTimeout(timer);
    }
    
    setPrevTime(currentTimeStr);
  }, [time, is24Hour]);

  const renderTimeWithAnimation = () => {
    const timeStr = formatTime();
    return (
      <div className="flex justify-center">
        {timeStr.split('').map((char, index) => (
          <div 
            key={`${index}-${char}`} 
            className={`digit-wrapper ${animatingDigits.has(index) ? 'animate-clock-digit' : ''}`}
          >
            {char}
          </div>
        ))}
      </div>
    );
  };

  const formatDate = () => {
    return time.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-6xl md:text-8xl font-bold">
        {renderTimeWithAnimation()}
      </h1>
      <p className="text-xl md:text-2xl mt-2 animate-pulse-slow">
        {formatDate()}
      </p>
    </div>
  );
};

export default Clock; 