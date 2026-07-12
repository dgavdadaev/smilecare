import { Sparkle, Calendar, ArrowRight, Phone, Star, ShieldCheck, Clock, Users, Award } from "lucide-react";
import { C, gradText, gradBg, gradBgSoft, displayFont, bodyFont } from "../theme/tokens";
import { IMG } from "../data/images";
import { STATS } from "../data/stats";
import { useParallax } from "../hooks/useParallax";
import { useReveal } from "../hooks/useReveal";
import { useCountUp } from "../hooks/useCountUp";
import { Reveal } from "./common/Reveal";
import { Ph } from "./common/Ph";
import { Badge } from "./common/Badge";
import { GlassCard } from "./common/GlassCard";

/* ================================ Hero ================================ */
export function Hero() {
  const parallax = useParallax(0.12);
  return (
    <section id="top" className="relative overflow-hidden pt-40 pb-28 md:pt-48 md:pb-36" style={{ backgroundColor: C.bg }}>
      {/* mesh gradient */}
      <div className="absolute inset-0 opacity-70" style={{ backgroundImage: `radial-gradient(circle at 15% 20%, rgba(86,204,242,0.25), transparent 40%), radial-gradient(circle at 85% 15%, rgba(47,128,237,0.2), transparent 45%), radial-gradient(circle at 50% 90%, rgba(86,204,242,0.15), transparent 50%)` }} />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 blur-3xl animate-[blob_14s_ease-in-out_infinite]" style={{ ...gradBg, transform: `translateY(${parallax}px)` }} />
      <div className="absolute top-40 -left-32 w-72 h-72 rounded-full opacity-10 blur-3xl animate-[blob_18s_ease-in-out_infinite_reverse]" style={{ ...gradBg, transform: `translateY(${-parallax * 0.6}px)` }} />
      {/* floating particles */}
      <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden="true">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="absolute rounded-full animate-[floatParticle_10s_ease-in-out_infinite]"
            style={{ width: 4 + (i % 3) * 2, height: 4 + (i % 3) * 2, left: `${8 + i * 9}%`, top: `${15 + (i % 5) * 14}%`, backgroundColor: i % 2 ? C.primary : C.secondary, opacity: 0.35, animationDelay: `${i * 0.7}s` }} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative">
        <Reveal>
          <Badge><Sparkle size={12} /> Trusted Family &amp; Cosmetic Dentistry</Badge>
          <h1 className="mt-6 text-5xl md:text-6xl font-extrabold leading-[1.08] tracking-tight" style={{ ...displayFont, color: C.ink }}>
            Healthy Smiles<br />Start <span style={gradText}>Here</span>
          </h1>
          <p className="mt-6 text-lg text-slate-500 max-w-md leading-relaxed" style={bodyFont}>
            Professional dental care for the whole family — delivered with warmth, precision, and modern technology.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#booking" className="group px-7 py-3.5 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2" style={gradBg}>
              <Calendar size={18} /> Book Appointment <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="tel:+15551234567" className="px-7 py-3.5 rounded-xl font-semibold border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white transition-all flex items-center gap-2">
              <Phone size={18} /> Call Now
            </a>
          </div>

          {/* trust indicators */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5"><Star size={14} strokeWidth={0} style={{ fill: "#FBBF24" }} /> Google Reviews 4.9★</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} color={C.primary} /> Insurance Accepted</span>
            <span className="flex items-center gap-1.5"><Clock size={14} color={C.primary} /> Emergency Available 24/7</span>
          </div>
        </Reveal>

        <Reveal delay={150} className="relative">
          <div className="relative aspect-[4/5] max-w-md mx-auto rounded-[2rem] overflow-hidden shadow-2xl">
            <Ph src={IMG.hero} alt="Dentist treating a smiling patient at SmileCare Dental Clinic" className="absolute inset-0" />
            <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(180deg, rgba(15,37,64,0) 40%, rgba(15,37,64,0.55) 100%)" }} />
          </div>

          <GlassCard className="absolute -bottom-6 -left-4 md:-left-10 px-5 py-4 flex items-center gap-3 animate-[float_5s_ease-in-out_infinite]">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={gradBgSoft}><Users size={18} color={C.primary} /></div>
            <div>
              <div className="text-sm font-bold" style={{ color: C.ink }}>5000+</div>
              <div className="text-[11px] text-slate-400">Happy Patients</div>
            </div>
          </GlassCard>

          <GlassCard className="absolute -top-6 -right-2 md:-right-8 px-5 py-4 flex items-center gap-3 animate-[float_7s_ease-in-out_infinite]">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={gradBgSoft}><Star size={18} color={C.primary} strokeWidth={0} style={{ fill: C.primary }} /></div>
            <div>
              <div className="text-sm font-bold" style={{ color: C.ink }}>4.9★ Rating</div>
              <div className="text-[11px] text-slate-400">From 1200+ reviews</div>
            </div>
          </GlassCard>

          <GlassCard className="absolute top-1/2 -right-6 md:-right-14 -translate-y-1/2 px-5 py-4 flex items-center gap-3 animate-[float_8s_ease-in-out_infinite]">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={gradBgSoft}><Award size={18} color={C.primary} /></div>
            <div>
              <div className="text-sm font-bold" style={{ color: C.ink }}>10+ Years</div>
              <div className="text-[11px] text-slate-400">Of experience</div>
            </div>
          </GlassCard>
        </Reveal>
      </div>

      <StatsBar />
    </section>
  );
}

function StatsBar() {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className="max-w-5xl mx-auto px-6 mt-24 grid grid-cols-3 gap-6 relative">
      {STATS.map((s, i) => {
        const v = useCountUp(s.value, visible);
        const display = s.decimals ? v.toFixed(s.decimals) : Math.floor(v).toLocaleString();
        return (
          <div key={i} className="text-center">
            <div className="text-3xl md:text-4xl font-extrabold" style={{ ...displayFont, color: C.ink }}>{display}{s.suffix}</div>
            <div className="text-xs md:text-sm text-slate-400 mt-1 font-medium">{s.label}</div>
          </div>
        );
      })}
    </div>
  );
}
