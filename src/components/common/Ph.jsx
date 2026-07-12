import { useState } from "react";
import { Smile } from "lucide-react";
import { C, gradBgSoft } from "../../theme/tokens";

/* ================================ image w/ fallback ================================ */
export function Ph({ src, alt, className = "", imgClassName = "", style }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  if (failed) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ ...gradBgSoft, ...style }}>
        <Smile size={32} color={C.primary} strokeWidth={1.3} />
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {!loaded && <div className="absolute inset-0 animate-pulse" style={{ backgroundColor: "#E2E8F0" }} />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"} ${imgClassName}`}
      />
    </div>
  );
}
