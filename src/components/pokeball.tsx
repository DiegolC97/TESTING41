import { cn } from "@/lib/utils";

export function Pokeball({ className }: { className?: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true" className={cn("shrink-0", className)}>
      <circle cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="3" />
      <path d="M3 20a17 17 0 0 1 34 0H3Z" fill="currentColor" />
      <path d="M3 20h34" stroke="currentColor" strokeWidth="3" />
      <circle cx="20" cy="20" r="6" className="fill-background" stroke="currentColor" strokeWidth="3" />
      <circle cx="20" cy="20" r="2" fill="currentColor" />
    </svg>
  );
}
