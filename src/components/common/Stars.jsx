import { Star } from "lucide-react";

export function Stars({ rating, size = 14 }) {
  const rounded = Math.round(rating);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} strokeWidth={0} style={{ fill: i < rounded ? "#FBBF24" : "#E2E8F0" }} />
      ))}
    </div>
  );
}
