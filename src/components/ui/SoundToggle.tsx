"use client";
import { useSoundStore } from "@/store/useSoundStore";
import { useEffect, useRef } from "react";

export default function SoundToggle() {
  const { isMuted, toggleMute } = useSoundStore();
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    if (!isMuted) {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(60, ctx.currentTime);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      audioCtxRef.current = ctx;
      gainRef.current = gain;
      oscillatorRef.current = osc;
    } else {
      oscillatorRef.current?.stop();
      audioCtxRef.current?.close();
      oscillatorRef.current = null;
      audioCtxRef.current = null;
    }
  }, [isMuted]);

  return (
    <button
      onClick={toggleMute}
      data-hover
      className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full glass border border-border flex items-center justify-center text-text-muted hover:text-accent-red hover:border-accent-red transition-all duration-300"
      title={isMuted ? "Unmute ambient sound" : "Mute"}
    >
      {isMuted ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )}
    </button>
  );
}
