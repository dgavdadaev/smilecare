import { Star, Quote, BadgeCheck } from "lucide-react";
import { C, displayFont } from "../theme/tokens";
import { TESTIMONIALS } from "../data/testimonials";
import { Reveal } from "./common/Reveal";
import { Badge } from "./common/Badge";
import { Ph } from "./common/Ph";
import { Stars } from "./common/Stars";

function TestimonialCard({ t }) {
  return (
    <div className="w-[320px] md:w-[360px] flex-shrink-0 bg-white rounded-3xl shadow-lg p-7 mx-3 flex flex-col">
      <div className="flex items-center justify-between">
        <Stars rating={t.rating} />
        <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400"><Star size={11} strokeWidth={0} style={{ fill: "#FBBF24" }} /> Google Reviews</span>
      </div>
      <Quote size={22} style={{ color: C.secondary }} className="mt-4 opacity-60" />
      <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">"{t.text}"</p>
      <div className="mt-5 flex items-center gap-3">
        <Ph src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full flex-shrink-0" />
        <div>
          <div className="text-sm font-bold flex items-center gap-1" style={{ color: C.ink }}>
            {t.name} {t.verified && <BadgeCheck size={13} color={C.primary} />}
          </div>
          <div className="text-[11px] text-slate-400">Verified Patient</div>
        </div>
      </div>
    </div>
  );
}

/* ================================ Testimonials ================================ */
export function Testimonials() {
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section id="testimonials" className="py-28" style={{ backgroundColor: C.bg }}>
      <div className="max-w-7xl mx-auto px-6 text-center">
        <Reveal>
          <Badge>Patient Stories</Badge>
          <h2 className="mt-5 text-3xl md:text-4xl font-extrabold" style={{ ...displayFont, color: C.ink }}>Loved by thousands of smiles</h2>
        </Reveal>
      </div>

      <Reveal delay={150} className="mt-14 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-[marquee_38s_linear_infinite] hover:[animation-play-state:paused]">
          {loop.map((t, i) => <TestimonialCard key={i} t={t} />)}
        </div>
      </Reveal>
    </section>
  );
}
