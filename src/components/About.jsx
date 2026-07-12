import { BadgeCheck, ChevronRight } from "lucide-react";
import { C, gradBg, gradBgSoft, displayFont } from "../theme/tokens";
import { IMG } from "../data/images";
import { TIMELINE } from "../data/timeline";
import { CERTIFICATIONS, PARTNERS } from "../data/certifications";
import { Reveal } from "./common/Reveal";
import { Badge } from "./common/Badge";
import { GlassCard } from "./common/GlassCard";
import { Ph } from "./common/Ph";

/* ================================ About ================================ */
export function About() {
  return (
    <section id="about" className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal className="relative">
          <div className="aspect-square rounded-[2.5rem] relative overflow-hidden shadow-xl">
            <Ph src={IMG.aboutInterior} alt="Bright, modern interior of SmileCare Dental Clinic" className="absolute inset-0" />
          </div>
          <GlassCard className="absolute -bottom-8 -right-6 w-40 h-40 p-5 flex flex-col justify-center items-center text-center">
            <div className="text-3xl font-extrabold" style={{ ...displayFont, color: C.primary }}>15+</div>
            <div className="text-xs text-slate-400 mt-1">Awards &amp; Certifications</div>
          </GlassCard>
        </Reveal>

        <div>
          <Reveal>
            <Badge>About SmileCare</Badge>
            <h2 className="mt-5 text-3xl md:text-4xl font-extrabold leading-tight" style={{ ...displayFont, color: C.ink }}>
              A decade of trusted, gentle dental care
            </h2>
            <p className="mt-5 text-slate-500 leading-relaxed">
              Since 2014, SmileCare Dental Clinic has combined advanced technology with genuinely caring service.
              Our team of specialists treats every patient like family, guiding you through personalized care plans
              in a calm, modern environment designed to put you at ease.
            </p>
          </Reveal>

          {/* timeline */}
          <div className="mt-8 relative pl-6 border-l-2" style={{ borderColor: "#DCEBFB" }}>
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * 120} className="relative pb-6 last:pb-0">
                <span className="absolute -left-[29px] top-1 w-3.5 h-3.5 rounded-full ring-4 ring-white" style={gradBg} />
                <div className="text-xs font-bold" style={{ color: C.primary }}>{t.year}</div>
                <p className="text-sm text-slate-500 mt-0.5">{t.text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl" style={gradBgSoft}>
              <h4 className="font-bold text-sm" style={{ color: C.ink }}>Our Mission</h4>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">Deliver exceptional, accessible dental care that improves lives, one smile at a time.</p>
            </div>
            <div className="p-5 rounded-2xl" style={gradBgSoft}>
              <h4 className="font-bold text-sm" style={{ color: C.ink }}>Our Vision</h4>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">To be the region's most trusted name in family and cosmetic dentistry.</p>
            </div>
          </Reveal>

          {/* certifications */}
          <Reveal className="mt-7 flex flex-wrap gap-2">
            {CERTIFICATIONS.map(c => (
              <span key={c} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200 text-slate-600">
                <BadgeCheck size={13} color={C.primary} /> {c}
              </span>
            ))}
          </Reveal>

          <a href="#booking" className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all" style={gradBg}>
            Meet The Team <ChevronRight size={16} />
          </a>
        </div>
      </div>

      {/* partner logos */}
      <Reveal className="max-w-5xl mx-auto px-6 mt-24">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400">Trusted by leading insurance partners</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {PARTNERS.map(p => (
            <span key={p} className="text-sm font-extrabold tracking-tight text-slate-300 select-none" style={displayFont}>{p}</span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
