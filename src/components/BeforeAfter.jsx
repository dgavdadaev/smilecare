import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, Quote } from "lucide-react";
import { C, displayFont } from "../theme/tokens";
import { IMG } from "../data/images";
import { Reveal } from "./common/Reveal";
import { Badge } from "./common/Badge";
import { Ph } from "./common/Ph";

/* ================================ Before & After ================================ */
export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const trackRef = useRef(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  useEffect(() => {
    const onMove = (e) => { if (dragging.current) updateFromClientX(e.touches ? e.touches[0].clientX : e.clientX); };
    const onUp = () => (dragging.current = false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [updateFromClientX]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") setPos(p => Math.max(0, p - 5));
    if (e.key === "ArrowRight") setPos(p => Math.min(100, p + 5));
  };

  return (
    <section className="py-28" style={{ backgroundColor: C.bg }}>
      <div className="max-w-5xl mx-auto px-6">
        <Reveal className="max-w-xl mx-auto text-center">
          <Badge>Real Results</Badge>
          <h2 className="mt-5 text-3xl md:text-4xl font-extrabold" style={{ ...displayFont, color: C.ink }}>See the transformation</h2>
          <p className="mt-4 text-slate-500">Drag the slider — or use arrow keys — to compare a whitening &amp; alignment treatment.</p>
        </Reveal>

        <Reveal delay={150}>
          <div
            ref={trackRef}
            role="slider"
            tabIndex={0}
            aria-label="Before and after comparison slider"
            aria-valuenow={Math.round(pos)}
            aria-valuemin={0}
            aria-valuemax={100}
            onKeyDown={onKeyDown}
            className="relative mt-14 aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl select-none cursor-ew-resize focus-visible:outline focus-visible:outline-4"
            style={{ outlineColor: C.secondary }}
            onMouseDown={(e) => { dragging.current = true; updateFromClientX(e.clientX); }}
            onTouchStart={(e) => { dragging.current = true; updateFromClientX(e.touches[0].clientX); }}
          >
            <Ph src={IMG.before} alt="Patient smile before treatment" className="absolute inset-0" />
            <span className="absolute top-4 left-4 text-[11px] font-bold tracking-wide text-white bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">BEFORE</span>

            <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
              <Ph src={IMG.after} alt="Patient smile after treatment" className="absolute inset-0" style={{ width: trackRef.current ? trackRef.current.offsetWidth : "100%" }} />
              <span className="absolute top-4 right-4 text-[11px] font-bold tracking-wide text-white bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">AFTER</span>
            </div>

            <div className="absolute top-0 bottom-0 w-1 bg-white shadow-lg" style={{ left: `${pos}%` }}>
              <div className="absolute top-1/2 -translate-y-1/2 -left-5 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
                <ChevronLeft size={14} color={C.primary} className="-mr-1" />
                <ChevronRight size={14} color={C.primary} className="-ml-1" />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={250} className="mt-8 grid sm:grid-cols-2 gap-5">
          <div className="flex items-center gap-3 p-5 rounded-2xl bg-white shadow-sm">
            <Clock size={18} color={C.primary} />
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">Treatment Duration</div>
              <div className="text-sm font-semibold" style={{ color: C.ink }}>3 visits over 6 weeks</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-5 rounded-2xl bg-white shadow-sm">
            <Quote size={16} color={C.secondary} className="mt-0.5 flex-shrink-0" />
            <p className="text-sm text-slate-500 italic">"I finally feel confident smiling in photos again." — Real SmileCare patient</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
