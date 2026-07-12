import { useContext, useState, useEffect } from "react";
import { Check, ArrowRight, Calendar, CalendarCheck, Pencil, Loader2 } from "lucide-react";
import { C, gradBg, displayFont } from "../theme/tokens";
import { SERVICES } from "../data/services";
import { DOCTORS } from "../data/doctors";
import { IMG } from "../data/images";
import { BookingContext } from "../context/BookingContext";
import { Reveal } from "./common/Reveal";
import { Badge } from "./common/Badge";
import { Ph } from "./common/Ph";

/* ================================ Booking ================================ */
export function Booking() {
  const { prefillDoctor } = useContext(BookingContext);
  const [step, setStep] = useState("form"); // form | review | loading | success
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", doctor: "", date: "", time: "", message: "" });
  const [errors, setErrors] = useState({});
  const TIME_SLOTS = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM"];

  useEffect(() => { if (prefillDoctor) setForm(f => ({ ...f, doctor: prefillDoctor })); }, [prefillDoctor]);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!/^[\d\s()+-]{7,}$/.test(form.phone)) e.phone = "Enter a valid phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.service) e.service = "Please select a service.";
    if (!form.date) e.date = "Please choose a preferred date.";
    if (!form.time) e.time = "Please choose a preferred time.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goReview = (ev) => { ev.preventDefault(); if (validate()) setStep("review"); };

  const confirm = () => {
    setStep("loading");
    setTimeout(() => setStep("success"), 1400);
  };

  const reset = () => {
    setForm({ name: "", phone: "", email: "", service: "", doctor: "", date: "", time: "", message: "" });
    setStep("form");
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border bg-white text-sm outline-none transition-colors focus:ring-2";
  const fieldError = (k) => errors[k] && <p className="mt-1 text-xs text-red-500">{errors[k]}</p>;
  const borderFor = (k) => errors[k] ? "border-red-300 focus:ring-red-200" : "border-slate-200 focus:ring-blue-100";

  return (
    <section id="booking" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-5 gap-0 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <Reveal className="lg:col-span-2 p-10 md:p-12 text-white flex flex-col justify-between" style={gradBg}>
          <div>
            <Badge>Book a Visit</Badge>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight" style={displayFont}>Schedule your appointment today</h2>
            <p className="mt-4 text-white/85 leading-relaxed text-sm">Fill out the form and our care team will confirm your slot within one business hour.</p>
          </div>
          <ul className="mt-10 space-y-4 text-sm">
            {["Free initial consultation", "Flexible scheduling", "Insurance accepted", "Same-day emergency slots"].map(t => (
              <li key={t} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0"><Check size={13} /></span>{t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={150} className="lg:col-span-3 p-10 md:p-12 bg-white min-h-[560px] flex flex-col justify-center">
          {step === "form" && (
            <form onSubmit={goReview} noValidate className="grid sm:grid-cols-2 gap-5 animate-[fadeIn_0.4s_ease]">
              <div>
                <label className="text-xs font-semibold text-slate-500">Full Name</label>
                <input value={form.name} onChange={e => update("name", e.target.value)} className={`${inputClass} ${borderFor("name")} mt-1.5`} placeholder="Jane Doe" />
                {fieldError("name")}
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">Phone</label>
                <input value={form.phone} onChange={e => update("phone", e.target.value)} className={`${inputClass} ${borderFor("phone")} mt-1.5`} placeholder="+1 (555) 123-4567" />
                {fieldError("phone")}
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-500">Email</label>
                <input value={form.email} onChange={e => update("email", e.target.value)} className={`${inputClass} ${borderFor("email")} mt-1.5`} placeholder="jane@email.com" />
                {fieldError("email")}
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">Service</label>
                <select value={form.service} onChange={e => update("service", e.target.value)} className={`${inputClass} ${borderFor("service")} mt-1.5`}>
                  <option value="">Select a service</option>
                  {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                </select>
                {fieldError("service")}
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">Preferred Date</label>
                <div className="relative mt-1.5">
                  <Calendar size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" color="#94A3B8" />
                  <input type="date" value={form.date} onChange={e => update("date", e.target.value)} className={`${inputClass} ${borderFor("date")} pl-10`} />
                </div>
                {fieldError("date")}
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-500">Preferred Doctor</label>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {DOCTORS.map(d => (
                    <button type="button" key={d.name} onClick={() => update("doctor", form.doctor === d.name ? "" : d.name)}
                      className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition-all text-center"
                      style={{ borderColor: form.doctor === d.name ? C.primary : "#E2E8F0", backgroundColor: form.doctor === d.name ? "rgba(47,128,237,0.06)" : "#fff" }}>
                      <Ph src={IMG.doctors[d.key]} alt={d.name} className="w-10 h-10 rounded-full" />
                      <span className="text-[10px] font-semibold leading-tight" style={{ color: C.ink }}>{d.name.split(" ")[1]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-500">Preferred Time</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {TIME_SLOTS.map(t => (
                    <button type="button" key={t} onClick={() => update("time", t)}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold border-2 transition-all"
                      style={{ borderColor: form.time === t ? C.primary : "#E2E8F0", color: form.time === t ? "#fff" : "#475569", ...(form.time === t ? gradBg : {}) }}>
                      {t}
                    </button>
                  ))}
                </div>
                {fieldError("time")}
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-500">Message (optional)</label>
                <textarea value={form.message} onChange={e => update("message", e.target.value)} rows={3} className={`${inputClass} border-slate-200 focus:ring-blue-100 mt-1.5 resize-none`} placeholder="Tell us anything we should know before your visit" />
              </div>
              <button type="submit" className="sm:col-span-2 mt-2 py-3.5 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2" style={gradBg}>
                Review Appointment <ArrowRight size={16} />
              </button>
            </form>
          )}

          {step === "review" && (
            <div className="animate-[fadeIn_0.4s_ease]">
              <h3 className="font-bold text-lg flex items-center gap-2" style={{ ...displayFont, color: C.ink }}><CalendarCheck size={20} color={C.primary} /> Review your appointment</h3>
              <div className="mt-5 rounded-2xl border border-slate-100 divide-y divide-slate-100 text-sm">
                {[["Name", form.name], ["Phone", form.phone], ["Email", form.email], ["Service", form.service], ["Doctor", form.doctor || "No preference"], ["Date", form.date], ["Time", form.time]].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between px-5 py-3">
                    <span className="text-slate-400">{k}</span>
                    <span className="font-semibold" style={{ color: C.ink }}>{v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <button onClick={() => setStep("form")} className="flex-1 py-3 rounded-xl border-2 border-slate-200 text-sm font-semibold text-slate-600 flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors">
                  <Pencil size={14} /> Edit
                </button>
                <button onClick={confirm} className="flex-1 py-3 rounded-xl text-white text-sm font-semibold shadow-lg flex items-center justify-center gap-1.5" style={gradBg}>
                  Confirm Booking <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {step === "loading" && (
            <div className="flex flex-col items-center justify-center py-16 animate-[fadeIn_0.3s_ease]">
              <Loader2 size={38} className="animate-spin" color={C.primary} />
              <p className="mt-4 text-sm font-semibold text-slate-500">Confirming your appointment…</p>
            </div>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center justify-center py-14 text-center animate-[fadeIn_0.4s_ease]">
              <div className="w-16 h-16 rounded-full flex items-center justify-center animate-[popIn_0.5s_ease]" style={gradBg}>
                <Check size={30} color="#fff" strokeWidth={3} />
              </div>
              <h3 className="mt-5 font-bold text-xl" style={{ ...displayFont, color: C.ink }}>You're all set, {form.name.split(" ")[0] || "there"}!</h3>
              <p className="mt-2 text-sm text-slate-500 max-w-xs">A confirmation has been sent to {form.email || "your email"}. Our team will reach out within one business hour.</p>
              <button onClick={reset} className="mt-6 text-sm font-semibold" style={{ color: C.primary }}>Book another appointment</button>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
