export function GlassCard({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-white/40 shadow-xl ${className}`}
      style={{ backgroundColor: "rgba(255,255,255,0.7)", backdropFilter: "blur(16px)" }}>
      {children}
    </div>
  );
}
