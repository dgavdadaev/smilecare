import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { C, displayFont } from "../theme/tokens";
import { FAQS } from "../data/faqs";
import { Reveal } from "./common/Reveal";
import { Badge } from "./common/Badge";

/* ================================ FAQ ================================ */
export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="py-28" style={{ backgroundColor: C.bg }}>
      <div className="max-w-3xl mx-auto px-6">
        <Reveal className="text-center">
          <Badge>Good to Know</Badge>
          <h2 className="mt-5 text-3xl md:text-4xl font-extrabold" style={{ ...displayFont, color: C.ink }}>Frequently asked questions</h2>
        </Reveal>
        <div className="mt-14 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 60}>
                <div className={`rounded-2xl border bg-white overflow-hidden transition-colors ${isOpen ? "border-blue-200" : "border-slate-100"}`}>
                  <button onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline focus-visible:outline-2" style={{ outlineColor: C.primary }}>
                    <span className="font-semibold text-sm md:text-base" style={{ color: C.ink }}>{f.q}</span>
                    <ChevronDown size={18} className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} style={{ color: C.primary }} />
                  </button>
                  <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                    <div className="overflow-hidden"><p className="px-6 pb-5 text-sm text-slate-500 leading-relaxed">{f.a}</p></div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
