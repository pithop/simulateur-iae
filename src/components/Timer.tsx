import { useEffect, useState } from 'react';

interface TimerProps {
  initialMinutes: number;
  onTimeUp: () => void;
  isActive: boolean;
}

export default function Timer({ initialMinutes, onTimeUp, isActive }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (!isActive) return;

    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isActive, timeLeft, onTimeUp]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const isWarning = timeLeft <= 300; // 5 minutes remaining

  return (
    <div className={`font-mono text-xl font-bold flex items-center justify-center p-2 rounded-lg bg-gray-100 ${isWarning ? 'text-red-600 animate-pulse bg-red-50' : 'text-gray-800'}`}>
      <span>{String(hours).padStart(2, '0')}:</span>
      <span>{String(minutes).padStart(2, '0')}:</span>
      <span>{String(seconds).padStart(2, '0')}</span>
    </div>
  );
}
