import { MapPin, Clock, Phone, Mail, ShieldCheck, Car, TrainFront } from "lucide-react";
import { C, gradBg, gradBgSoft, displayFont } from "../theme/tokens";
import { IMG } from "../data/images";
import { Reveal } from "./common/Reveal";
import { Badge } from "./common/Badge";
import { Ph } from "./common/Ph";

/* ================================ Contact ================================ */
export function Contact() {
  const info = [
    { icon: MapPin, label: "Address", value: "128 Willow Grove Ave, Springfield, IL 62704" },
    { icon: Clock, label: "Working Hours", value: "Mon–Sat: 8:00 AM – 7:00 PM" },
    { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
    { icon: Mail, label: "Email", value: "hello@smilecaredental.com" },
    { icon: ShieldCheck, label: "Emergency Contact", value: "+1 (555) 999-0000 · 24/7" },
    { icon: Car, label: "Parking", value: "Free on-site parking, 20 spaces" },
    { icon: TrainFront, label: "Public Transport", value: "Willow Grove Station — 4 min walk" },
  ];
  return (
    <section id="contact" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="max-w-xl mx-auto text-center">
          <Badge>Visit Us</Badge>
          <h2 className="mt-5 text-3xl md:text-4xl font-extrabold" style={{ ...displayFont, color: C.ink }}>Get in touch</h2>
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-2 gap-10 items-stretch">
          <Reveal className="flex flex-col gap-5">
            <div className="rounded-3xl overflow-hidden shadow-xl flex-1 min-h-[260px] relative">
              <iframe title="SmileCare Dental Clinic Location" className="w-full h-full min-h-[260px] border-0" loading="lazy"
                src="https://maps.google.com/maps?q=Springfield%20IL&t=&z=13&ie=UTF8&iwloc=&output=embed" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl h-40 relative">
              <Ph src={IMG.contactInterior} alt="SmileCare Dental Clinic reception area" className="absolute inset-0" />
              <span className="absolute bottom-3 left-3 text-[11px] font-bold text-white bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">Our Reception</span>
            </div>
          </Reveal>

          <Reveal delay={150} className="grid sm:grid-cols-2 gap-5" as="address">
            {info.map(item => (
              <div key={item.label} className="p-6 rounded-2xl not-italic" style={gradBgSoft}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={gradBg}><item.icon size={18} color="#fff" /></div>
                <h4 className="mt-4 text-xs font-bold uppercase tracking-wide text-slate-400">{item.label}</h4>
                <p className="mt-1 text-sm font-medium" style={{ color: C.ink }}>{item.value}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
