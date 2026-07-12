import { C, gradBgSoft } from "../../theme/tokens";

export function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide" style={{ ...gradBgSoft, color: C.primary }}>
      {children}
    </span>
  );
}
