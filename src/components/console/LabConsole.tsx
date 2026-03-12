'use client';

import { useEffect, useRef, useState } from 'react';
import { processCommand } from '@/lib/commandProcessor';

export default function LabConsole() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>(['JENISH LAB CONSOLE v1.0', 'Type "help" for commands.', '']);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newHistory = [...history, `> ${input}`];
    const result = processCommand(input);

    if (input.toLowerCase().trim() === 'clear') {
      setHistory(['JENISH LAB CONSOLE v1.0', 'Type "help" for commands.', '']);
    } else {
      setHistory([...newHistory, ...result.output, '']);
    }

    setInput('');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-30 px-4 py-2 bg-gradient-to-r from-luxury-gold to-accent-gold text-royal-dark rounded font-display text-sm font-bold hover:shadow-glow-gold transition-all"
      >
        Console (Ctrl+K)
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-royal-navy to-royal-deep border-2 border-luxury-gold/40 rounded-lg w-full max-w-3xl max-h-96 flex flex-col shadow-[0_0_30px_rgba(200,155,75,0.2)]">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-luxury-gold/30">
          <div className="font-display text-luxury-gold text-sm font-bold tracking-widest">
            JENISH LAB CONSOLE
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-luxury-gold hover:text-royal-mauve text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Terminal Output */}
        <div
          ref={terminalRef}
          className="flex-1 overflow-y-auto p-4 font-display text-sm text-frost-white space-y-0"
        >
          {history.map((line, idx) => (
            <div key={idx} className={line.startsWith('>') ? 'text-luxury-gold' : ''}>
              {line}
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleCommand} className="border-t border-luxury-gold/30 p-4">
          <div className="flex gap-2">
            <span className="text-luxury-gold">&gt;</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
              className="flex-1 bg-transparent text-frost-white font-display outline-none caret-luxury-gold"
              placeholder="Enter command..."
            />
          </div>
        </form>
      </div>
    </div>
  );
}
