import { useState, useEffect } from "react";
import { Menu, X, Phone, Smile } from "lucide-react";
import { C, gradBg, displayFont } from "../theme/tokens";
import { NAV_LINKS } from "../data/navLinks";
import { useScrollSpy } from "../hooks/useScrollSpy";

/* ================================ Navbar ================================ */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(NAV_LINKS.map(l => l.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[999] focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg">Skip to content</a>
      <div className={`mx-4 md:mx-8 rounded-2xl transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}
        style={{ backgroundColor: scrolled ? "rgba(255,255,255,0.85)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none" }}>
        <nav aria-label="Primary" className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-14">
          <a href="#top" className="flex items-center gap-2 font-extrabold text-lg" style={displayFont}>
            <span className="w-9 h-9 rounded-xl flex items-center justify-center" style={gradBg}><Smile size={20} color="#fff" /></span>
            <span style={{ color: C.ink }}>SmileCare</span>
          </a>
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href}
                className="relative text-sm font-medium py-1 transition-colors"
                style={{ color: active === l.id ? C.ink : "#64748B" }}>
                {l.label}
                <span className="absolute left-0 -bottom-0.5 h-0.5 rounded-full transition-all duration-300"
                  style={{ width: active === l.id ? "100%" : "0%", ...gradBg }} />
              </a>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+15551234567" className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" style={{ outlineColor: C.primary }}>
              <Phone size={16} /> Call Now
            </a>
            <a href="#booking" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" style={{ ...gradBg, outlineColor: C.primary }}>
              Book Appointment
            </a>
          </div>
          <button className="lg:hidden p-2 rounded-lg focus-visible:outline focus-visible:outline-2" style={{ outlineColor: C.primary }}
            onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
        <div className="lg:hidden overflow-hidden transition-all duration-500 ease-out" style={{ maxHeight: open ? 420 : 0 }}>
          <div className="px-6 pb-6 flex flex-col gap-1 border-t border-slate-100 pt-4">
            {NAV_LINKS.map((l, i) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="text-sm font-medium text-slate-700 py-2.5 transition-all duration-300"
                style={{ transitionDelay: open ? `${i * 40}ms` : "0ms", opacity: open ? 1 : 0, transform: open ? "translateX(0)" : "translateX(-8px)" }}>
                {l.label}
              </a>
            ))}
            <a href="#booking" onClick={() => setOpen(false)} className="mt-3 px-5 py-3 rounded-xl text-sm font-semibold text-white text-center" style={gradBg}>
              Book Appointment
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
