"use client";
import { cn } from "@/lib/utils";

type Status = "live" | "in-progress" | "planned";

const config = {
  live: { color: "bg-red-500", text: "LIVE", textColor: "text-red-400" },
  "in-progress": { color: "bg-yellow-500", text: "IN PROGRESS", textColor: "text-yellow-400" },
  planned: { color: "bg-gray-500", text: "PLANNED", textColor: "text-gray-400" },
};

export default function LiveBadge({ status }: { status: Status }) {
  const c = config[status];
  return (
    <span className="live-badge font-mono text-xs">
      <span className={cn("dot", c.color)} />
      <span className={c.textColor}>{c.text}</span>
    </span>
  );
}
