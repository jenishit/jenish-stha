import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrambleText(
  target: string,
  onUpdate: (val: string) => void,
  duration = 800
): () => void {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*";
  const steps = 20;
  const stepDuration = duration / steps;
  let step = 0;
  let interval: ReturnType<typeof setInterval>;

  interval = setInterval(() => {
    step++;
    const progress = step / steps;
    const resolvedCount = Math.floor(progress * target.length);

    const scrambled = target
      .split("")
      .map((char, i) => {
        if (char === " ") return " ";
        if (i < resolvedCount) return char;
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");

    onUpdate(scrambled);

    if (step >= steps) {
      clearInterval(interval);
      onUpdate(target);
    }
  }, stepDuration);

  return () => clearInterval(interval);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
