import { useContext } from "react";
import { GraduationCap, Languages, BadgeCheck, Clock, CalendarCheck } from "lucide-react";
import { C, gradBg, displayFont } from "../theme/tokens";
import { IMG } from "../data/images";
import { DOCTORS } from "../data/doctors";
import { BookingContext } from "../context/BookingContext";
import { Reveal } from "./common/Reveal";
import { Badge } from "./common/Badge";
import { Ph } from "./common/Ph";
import { Stars } from "./common/Stars";
import { Facebook, Instagram, Twitter } from "./common/SocialIcons";

/* ================================ Doctors ================================ */
export function Doctors() {
  const { setPrefillDoctor } = useContext(BookingContext);
  const handleBook = (name) => {
    setPrefillDoctor(name);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section id="doctors" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="max-w-xl mx-auto text-center">
          <Badge>Our Specialists</Badge>
          <h2 className="mt-5 text-3xl md:text-4xl font-extrabold" style={{ ...displayFont, color: C.ink }}>Meet our doctors</h2>
        </Reveal>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DOCTORS.map((d, i) => (
            <Reveal key={d.name} delay={i * 100}>
              <div className="group h-full flex flex-col p-6 rounded-3xl border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <div className="relative w-24 h-24 mx-auto">
                  <Ph src={IMG.doctors[d.key]} alt={`Portrait of ${d.name}, ${d.role}`} className="w-24 h-24 rounded-full ring-4 ring-white shadow-lg" />
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full ring-2 ring-white" style={{ backgroundColor: d.availability.startsWith("Available") ? "#22C55E" : "#F59E0B" }} title={d.availability} />
                </div>
                <h3 className="mt-5 font-bold text-center" style={{ ...displayFont, color: C.ink }}>{d.name}</h3>
                <p className="text-xs mt-1 font-medium text-center" style={{ color: C.primary }}>{d.role}</p>
                <div className="mt-2 flex justify-center"><Stars rating={d.rating} /></div>

                <div className="mt-4 space-y-1.5 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5"><GraduationCap size={12} className="flex-shrink-0" /> {d.education}</div>
                  <div className="flex items-center gap-1.5"><Languages size={12} className="flex-shrink-0" /> {d.languages.join(", ")}</div>
                  <div className="flex items-center gap-1.5"><BadgeCheck size={12} className="flex-shrink-0" /> {d.certifications[0]}</div>
                  <div className="flex items-center gap-1.5"><Clock size={12} className="flex-shrink-0" /> {d.exp} experience</div>
                </div>

                <div className="mt-3 text-center">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ color: d.availability.startsWith("Available") ? "#16A34A" : "#B45309", backgroundColor: d.availability.startsWith("Available") ? "#DCFCE7" : "#FEF3C7" }}>
                    {d.availability}
                  </span>
                </div>

                <div className="mt-4 flex justify-center gap-2">
                  {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                    <span key={idx} tabIndex={0} role="link" aria-label={`${d.name} social link`}
                      className="w-8 h-8 rounded-full flex items-center justify-center border border-slate-100 text-slate-400 hover:text-white hover:border-transparent transition-all cursor-pointer"
                      onMouseEnter={e => Object.assign(e.currentTarget.style, gradBg)}
                      onMouseLeave={e => { e.currentTarget.style.backgroundImage = "none"; }}>
                      <Icon size={14} />
                    </span>
                  ))}
                </div>

                <button onClick={() => handleBook(d.name)}
                  className="mt-auto pt-5 w-full py-2.5 rounded-xl text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
                  style={gradBg}>
                  <CalendarCheck size={15} /> Book with {d.name.split(" ")[1]}
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
