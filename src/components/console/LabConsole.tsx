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
        className="fixed bottom-4 left-4 z-30 px-4 py-2 bg-[#00FFD5] text-[#0B0F1A] rounded font-mono text-sm font-bold hover:bg-[#00FFD5] hover:shadow-[0_0_15px_rgba(0,255,213,0.5)] transition-all"
      >
        Console (Ctrl+K)
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-[#0B0F1A] border-2 border-[#00FFD5] rounded-lg w-full max-w-3xl max-h-96 flex flex-col shadow-[0_0_30px_rgba(0,255,213,0.3)]">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-[#00FFD5]">
          <div className="font-mono text-[#00FFD5] text-sm font-bold">
            JENISH LAB CONSOLE
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-[#00FFD5] hover:text-[#7C3AED] text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Terminal Output */}
        <div
          ref={terminalRef}
          className="flex-1 overflow-y-auto p-4 font-mono text-sm text-[#E5E7EB] space-y-0"
        >
          {history.map((line, idx) => (
            <div key={idx} className={line.startsWith('>') ? 'text-[#00FFD5]' : ''}>
              {line}
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleCommand} className="border-t border-[#00FFD5] p-4">
          <div className="flex gap-2">
            <span className="text-[#00FFD5]">&gt;</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
              className="flex-1 bg-transparent text-[#E5E7EB] font-mono outline-none caret-[#00FFD5]"
              placeholder="Enter command..."
            />
          </div>
        </form>
      </div>
    </div>
  );
}
