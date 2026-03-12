"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { scrambleText } from "@/lib/utils";

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  triggerOnce?: boolean;
}

export default function ScrambleText({
  text,
  className = "",
  delay = 0,
  as: Tag = "span",
  triggerOnce = true,
}: ScrambleTextProps) {
  const [displayed, setDisplayed] = useState(text);
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce });
  const hasAnimated = useRef(false);
  const cleanup = useRef<() => void>(() => {});

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;
      const timeoutId = setTimeout(() => {
        cleanup.current = scrambleText(text, setDisplayed, 900);
      }, delay);
      return () => clearTimeout(timeoutId);
    }
  }, [inView, text, delay]);

  useEffect(() => () => cleanup.current(), []);

  return (
    <Tag ref={ref} className={className}>
      {displayed}
    </Tag>
  );
}
