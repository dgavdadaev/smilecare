import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { gradBg } from "../theme/tokens";

/* ================================ Scroll To Top ================================ */
export function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-7 right-7 z-40 w-12 h-12 rounded-full shadow-xl flex items-center justify-center text-white transition-all duration-300 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      style={gradBg} aria-label="Scroll to top">
      <ArrowUp size={18} />
    </button>
  );
}
