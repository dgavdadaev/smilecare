import { Clock, DollarSign, ChevronRight } from "lucide-react";
import { C, gradBg, displayFont } from "../theme/tokens";
import { IMG } from "../data/images";
import { SERVICES } from "../data/services";
import { Reveal } from "./common/Reveal";
import { Badge } from "./common/Badge";
import { Ph } from "./common/Ph";

/* ================================ Services ================================ */
export function Services() {
  return (
    <section id="services" className="py-28" style={{ backgroundColor: C.bg }}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="max-w-xl mx-auto text-center">
          <Badge>Our Services</Badge>
          <h2 className="mt-5 text-3xl md:text-4xl font-extrabold" style={{ ...displayFont, color: C.ink }}>Comprehensive dental care</h2>
          <p className="mt-4 text-slate-500">From routine cleanings to advanced restorative work, all under one roof.</p>
        </Reveal>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 100}>
              <div className="group relative rounded-3xl bg-white overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl">
                <div className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" style={{ ...gradBg, backgroundSize: "200% 200%", animation: "borderShift 3s linear infinite" }} />
                <div className="absolute inset-[1px] rounded-[calc(1.5rem-1px)] bg-white -z-10" />
                <div className="h-44 relative overflow-hidden">
                  <Ph src={IMG.services[s.title]} alt={`${s.title} at SmileCare Dental Clinic`} className="absolute inset-0" imgClassName="transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 transition-opacity duration-500 opacity-40 group-hover:opacity-70" style={{ backgroundImage: "linear-gradient(180deg, rgba(15,37,64,0) 30%, rgba(15,37,64,0.75) 100%)" }} />
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg" style={gradBg}>
                    <s.icon size={17} color="#fff" strokeWidth={1.8} />
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-semibold">
                    <span className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full"><Clock size={11} /> {s.duration}</span>
                    <span className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full"><DollarSign size={11} /> {s.price}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg" style={{ ...displayFont, color: C.ink }}>{s.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                  <a href="#booking" className="mt-5 w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all" style={gradBg}>
                    Learn More <ChevronRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
