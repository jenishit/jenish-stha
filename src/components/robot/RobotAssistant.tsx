'use client';

import { useEffect, useState } from 'react';

export default function RobotAssistant() {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show bot after boot sequence completes
    const timer = setTimeout(() => {
      setIsVisible(true);
      setMessage('Hello visitor.\nI am J-Bot, the digital assistant of engineer Jenish.\n\nJenish designs robots, sensor systems, and intelligent embedded technologies.\n\nWould you like a tour of the lab?');
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-40 max-w-xs">
      {/* Robot Message Bubble */}
      <div className="bg-[#1a1f3a] border-2 border-[#00FFD5] rounded-lg p-4 mb-4 font-mono text-sm text-[#E5E7EB] whitespace-pre-line">
        {message}
      </div>

      {/* Robot Indicator */}
      <div className="flex items-center gap-2 text-[#00FFD5] font-mono text-xs">
        <div className="w-2 h-2 rounded-full bg-[#00FFD5] animate-pulse" />
        J-Bot Online
      </div>
    </div>
  );
}
