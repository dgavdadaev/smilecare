import { useEffect } from "react";
import { JSON_LD } from "../data/jsonLd";

export function useInjectJsonLd() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(JSON_LD);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);
}
