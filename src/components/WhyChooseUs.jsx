import { C, gradBg, displayFont } from "../theme/tokens";
import { WHY_US } from "../data/whyUs";
import { Reveal } from "./common/Reveal";
import { Badge } from "./common/Badge";

/* ================================ Why Choose Us ================================ */
export function WhyChooseUs() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="max-w-xl mx-auto text-center">
          <Badge>Why Patients Choose Us</Badge>
          <h2 className="mt-5 text-3xl md:text-4xl font-extrabold" style={{ ...displayFont, color: C.ink }}>Care built around your comfort</h2>
        </Reveal>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_US.map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <div className="group h-full p-7 rounded-3xl border border-slate-100 bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" style={gradBg}>
                  <item.icon size={26} color="#fff" strokeWidth={1.8} />
                </div>
                <h3 className="mt-6 font-bold text-lg" style={{ ...displayFont, color: C.ink }}>{item.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
