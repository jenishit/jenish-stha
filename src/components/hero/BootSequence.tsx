'use client';

import { useEffect, useState } from 'react';

const bootMessages = [
  'BOOTING JENISH LAB OS...',
  'Initializing robotics systems...',
  'Loading embedded modules...',
  'Calibrating sensors...',
  'Connecting to engineer profile...',
  'SYSTEM STATUS: ONLINE',
];

export default function BootSequence() {
  const [messages, setMessages] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < bootMessages.length) {
        setMessages((prev) => [...prev, bootMessages[index]]);
        index++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, 600);

    return () => clearInterval(interval);
  }, []);

  if (!isComplete) {
    return (
      <div className="fixed inset-0 bg-[#0B0F1A] z-50 flex items-center justify-center">
        <div className="max-w-2xl w-full px-8">
          <div className="font-mono text-[#00FFD5] space-y-2">
            {messages.map((msg, idx) => (
              <div key={idx} className="text-lg">
                {msg}
                {idx === messages.length - 1 && <span className="animate-pulse">_</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
