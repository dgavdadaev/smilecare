import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";
import {
  Menu, X, Phone, Calendar, Star, ShieldCheck, Sparkles, Clock, DollarSign,
  Stethoscope, Syringe, Smile, Activity, Baby, ChevronDown, ChevronLeft,
  ChevronRight, MapPin, Mail, ArrowUp, Check,
  Quote, Award, Users, Send, Wind, Sparkle, GraduationCap, Languages,
  BadgeCheck, Car, TrainFront, Loader2, CreditCard, Wallet, ArrowRight,
  CalendarCheck, Pencil
} from "lucide-react";

/* Custom Facebook icon (kept local so it never breaks if lucide-react
   changes its export list — this is a self-contained SVG, not a library import) */
function Facebook(props) {
  const { size = 24, color = "currentColor", strokeWidth = 2, className, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

/* Custom Instagram icon (self-contained SVG — same reasoning as Facebook above) */
function Instagram(props) {
  const { size = 24, color = "currentColor", strokeWidth = 2, className, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/* Custom Twitter/X icon (self-contained SVG — same reasoning as Facebook above) */
function Twitter(props) {
  const { size = 24, color = "currentColor", strokeWidth = 2, className, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5 1.5 9.9 4 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

/* ================================ tokens ================================ */
const C = { primary: "#2F80ED", secondary: "#56CCF2", ink: "#0F2540", bg: "#F8FAFC" };
const gradText = { backgroundImage: `linear-gradient(120deg, ${C.primary}, ${C.secondary})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" };
const gradBg = { backgroundImage: `linear-gradient(120deg, ${C.primary}, ${C.secondary})` };
const gradBgSoft = { backgroundImage: `linear-gradient(135deg, rgba(47,128,237,0.08), rgba(86,204,242,0.08))` };
const displayFont = { fontFamily: "'Manrope', 'Inter', sans-serif" };
const bodyFont = { fontFamily: "'Inter', sans-serif" };

/* ================================ images ================================
   Real, licensed-for-commercial-use Unsplash photography (Unsplash License —
   free for commercial use, no attribution required). Swap for your own shot
   list before a real launch. */
const IMG = {
  hero: "https://images.unsplash.com/photo-1657470179447-0f5aa16daa91?w=1400&q=80&auto=format&fit=crop",
  aboutInterior: "https://images.unsplash.com/photo-1728342057953-94bfad8f0e7e?w=1200&q=80&auto=format&fit=crop",
  contactInterior: "https://images.unsplash.com/photo-1643660526741-094639fbe53a?w=1200&q=80&auto=format&fit=crop",
  services: {
    "Teeth Cleaning": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80&auto=format&fit=crop",
    "Dental Implants": "https://images.unsplash.com/photo-1643660527076-119422ded068?w=800&q=80&auto=format&fit=crop",
    "Teeth Whitening": "https://images.unsplash.com/photo-1616391182219-e080b4d1043a?w=800&q=80&auto=format&fit=crop",
    "Orthodontics": "https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?w=800&q=80&auto=format&fit=crop",
    "Root Canal": "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80&auto=format&fit=crop",
    "Pediatric Dentistry": "https://images.unsplash.com/photo-1643660527098-559f89e45a92?w=800&q=80&auto=format&fit=crop",
  },
  doctors: {
    EM: "https://images.unsplash.com/photo-1591046637513-a7d0caa5f9c6?w=500&q=80&auto=format&fit=crop",
    JC: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&q=80&auto=format&fit=crop",
    AR: "https://images.unsplash.com/photo-1673865641073-4479f93a7776?w=500&q=80&auto=format&fit=crop",
    TK: "https://images.unsplash.com/photo-1622253694238-3b22139576c6?w=500&q=80&auto=format&fit=crop",
  },
  before: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1000&q=80&auto=format&fit=crop",
  after: "https://images.unsplash.com/photo-1770134223774-13b735e29201?w=1000&q=80&auto=format&fit=crop",
  avatars: {
    sophie: "https://images.unsplash.com/photo-1770134223774-13b735e29201?w=200&q=80&auto=format&fit=crop",
    marcus: "https://images.unsplash.com/photo-1548101307-a757d5f06d27?w=200&q=80&auto=format&fit=crop",
    priya: "https://images.unsplash.com/photo-1591046637350-5a71129db340?w=200&q=80&auto=format&fit=crop",
    david: "https://images.unsplash.com/photo-1622253694238-3b22139576c6?w=200&q=80&auto=format&fit=crop",
    hannah: "https://images.unsplash.com/photo-1591046637513-a7d0caa5f9c6?w=200&q=80&auto=format&fit=crop",
  },
};

/* ================================ image w/ fallback ================================ */
function Ph({ src, alt, className = "", imgClassName = "", style }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  if (failed) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ ...gradBgSoft, ...style }}>
        <Smile size={32} color={C.primary} strokeWidth={1.3} />
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {!loaded && <div className="absolute inset-0 animate-pulse" style={{ backgroundColor: "#E2E8F0" }} />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"} ${imgClassName}`}
      />
    </div>
  );
}

/* ================================ booking context ================================ */
const BookingContext = createContext(null);

/* ================================ hooks ================================ */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); io.unobserve(el); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function useCountUp(target, active, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null, raf;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setVal(target * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
}

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 140;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);
  return active;
}

function useParallax(factor = 0.15) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setOffset(window.scrollY * factor));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [factor]);
  return offset;
}

/* ================================ data ================================ */
const NAV_LINKS = [
  { label: "Services", href: "#services", id: "services" },
  { label: "About", href: "#about", id: "about" },
  { label: "Doctors", href: "#doctors", id: "doctors" },
  { label: "Reviews", href: "#testimonials", id: "testimonials" },
  { label: "FAQ", href: "#faq", id: "faq" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const STATS = [
  { label: "Years Experience", value: 10, suffix: "+" },
  { label: "Happy Patients", value: 5000, suffix: "+" },
  { label: "Average Rating", value: 4.9, suffix: "★", decimals: 1 },
];

const WHY_US = [
  { icon: Award, title: "Experienced Dentists", desc: "Board-certified specialists with a decade of combined clinical excellence." },
  { icon: Activity, title: "Modern Technology", desc: "Digital imaging, laser treatment, and precision-guided procedures." },
  { icon: ShieldCheck, title: "Emergency Care", desc: "Same-day appointments and 24/7 support for urgent dental needs." },
  { icon: DollarSign, title: "Affordable Pricing", desc: "Transparent fees, flexible plans, and direct insurance billing." },
];

const SERVICES = [
  { icon: Sparkles, title: "Teeth Cleaning", desc: "Deep, gentle cleaning that removes plaque and restores natural brightness.", duration: "45 min", price: "from $89" },
  { icon: Syringe, title: "Dental Implants", desc: "Permanent, natural-looking replacements engineered to last a lifetime.", duration: "90–120 min", price: "from $1,200" },
  { icon: Wind, title: "Teeth Whitening", desc: "Clinical-grade whitening for a noticeably brighter smile in one visit.", duration: "60 min", price: "from $249" },
  { icon: Smile, title: "Orthodontics", desc: "Modern aligners and braces tailored to your bite and lifestyle.", duration: "30 min consult", price: "from $2,900" },
  { icon: Stethoscope, title: "Root Canal", desc: "Pain-free, precision endodontic care that saves your natural tooth.", duration: "60–90 min", price: "from $650" },
  { icon: Baby, title: "Pediatric Dentistry", desc: "Gentle, friendly care that makes young patients feel at ease.", duration: "30 min", price: "from $69" },
];

const DOCTORS = [
  { key: "EM", initials: "EM", name: "Dr. Elena Marsh", role: "Cosmetic Dentistry", exp: "12 yrs", rating: 4.9, languages: ["English", "French"], education: "DDS, University of Pennsylvania", certifications: ["ABCD Certified", "Invisalign Provider"], availability: "Available Today" },
  { key: "JC", initials: "JC", name: "Dr. James Carter", role: "Orthodontics", exp: "9 yrs", rating: 4.8, languages: ["English", "Spanish"], education: "DMD, Boston University", certifications: ["Board Certified Orthodontist"], availability: "Next slot: Tomorrow" },
  { key: "AR", initials: "AR", name: "Dr. Aisha Rahman", role: "Pediatric Dentistry", exp: "8 yrs", rating: 5.0, languages: ["English", "Urdu", "Arabic"], education: "DDS, NYU College of Dentistry", certifications: ["Pediatric Dentistry Board"], availability: "Available Today" },
  { key: "TK", initials: "TK", name: "Dr. Theo Klein", role: "Oral Surgery", exp: "14 yrs", rating: 4.9, languages: ["English", "German"], education: "DMD, Columbia University", certifications: ["Oral & Maxillofacial Surgery Board"], availability: "Next slot: Thu" },
];

const TESTIMONIALS = [
  { name: "Sophie Turner", avatar: IMG.avatars.sophie, rating: 5, text: "The most comfortable dental visit I've ever had. The team explained every step and the results exceeded expectations.", verified: true },
  { name: "Marcus Lee", avatar: IMG.avatars.marcus, rating: 5, text: "Booked an emergency appointment on a Sunday and they took care of me within the hour. Genuinely grateful.", verified: true },
  { name: "Priya Nair", avatar: IMG.avatars.priya, rating: 5, text: "My kids actually look forward to their checkups now. Dr. Rahman has a wonderful way with children.", verified: true },
  { name: "David Chen", avatar: IMG.avatars.david, rating: 4, text: "Implant procedure was seamless from consultation to recovery. Clear pricing, no surprises.", verified: true },
  { name: "Hannah Wolfe", avatar: IMG.avatars.hannah, rating: 5, text: "Clean, modern, calming space. It doesn't even feel like a dental office — more like a wellness studio.", verified: true },
];

const FAQS = [
  { q: "Do you accept dental insurance?", a: "Yes, we work directly with most major insurance providers and offer transparent, itemized billing so you always know what's covered." },
  { q: "What should I expect at my first visit?", a: "Your first visit includes a full oral exam, digital X-rays if needed, and a personalized care plan reviewed with you before any treatment begins." },
  { q: "Do you offer emergency appointments?", a: "Yes, we reserve same-day slots for urgent cases and provide a 24/7 emergency contact line for existing patients." },
  { q: "How often should I get a professional cleaning?", a: "We recommend a cleaning every six months for most patients, though your dentist may suggest a different schedule based on your oral health." },
  { q: "Are your treatments safe for children?", a: "Absolutely. Our pediatric team specializes in gentle, age-appropriate care in an environment designed to keep kids relaxed." },
  { q: "What financing options are available?", a: "We offer flexible monthly payment plans with no hidden fees, available for treatments over $500." },
];

const TIMELINE = [
  { year: "2014", text: "SmileCare opens its first chair with a single founding dentist." },
  { year: "2017", text: "Expanded to a full team of specialists and digital imaging suite." },
  { year: "2020", text: "Introduced same-day emergency care and 24/7 patient support line." },
  { year: "2024", text: "Recognized as a top-rated family clinic with 5,000+ patients served." },
];

const CERTIFICATIONS = ["ADA Member Clinic", "ISO 9001 Certified", "Invisalign Gold Provider", "OSHA Compliant Facility"];
const PARTNERS = ["Global Health Assurance", "MediCare Plus", "DentalSure Network", "Wellness First Insurance", "CarePoint Benefits"];

/* ================================ primitives ================================ */
function Stars({ rating, size = 14 }) {
  const rounded = Math.round(rating);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} strokeWidth={0} style={{ fill: i < rounded ? "#FBBF24" : "#E2E8F0" }} />
      ))}
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide" style={{ ...gradBgSoft, color: C.primary }}>
      {children}
    </span>
  );
}

function GlassCard({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-white/40 shadow-xl ${className}`}
      style={{ backgroundColor: "rgba(255,255,255,0.7)", backdropFilter: "blur(16px)" }}>
      {children}
    </div>
  );
}

/* ================================ Navbar ================================ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(NAV_LINKS.map(l => l.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[999] focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg">Skip to content</a>
      <div className={`mx-4 md:mx-8 rounded-2xl transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}
        style={{ backgroundColor: scrolled ? "rgba(255,255,255,0.85)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none" }}>
        <nav aria-label="Primary" className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-14">
          <a href="#top" className="flex items-center gap-2 font-extrabold text-lg" style={displayFont}>
            <span className="w-9 h-9 rounded-xl flex items-center justify-center" style={gradBg}><Smile size={20} color="#fff" /></span>
            <span style={{ color: C.ink }}>SmileCare</span>
          </a>
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href}
                className="relative text-sm font-medium py-1 transition-colors"
                style={{ color: active === l.id ? C.ink : "#64748B" }}>
                {l.label}
                <span className="absolute left-0 -bottom-0.5 h-0.5 rounded-full transition-all duration-300"
                  style={{ width: active === l.id ? "100%" : "0%", ...gradBg }} />
              </a>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+15551234567" className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" style={{ outlineColor: C.primary }}>
              <Phone size={16} /> Call Now
            </a>
            <a href="#booking" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" style={{ ...gradBg, outlineColor: C.primary }}>
              Book Appointment
            </a>
          </div>
          <button className="lg:hidden p-2 rounded-lg focus-visible:outline focus-visible:outline-2" style={{ outlineColor: C.primary }}
            onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
        <div className="lg:hidden overflow-hidden transition-all duration-500 ease-out" style={{ maxHeight: open ? 420 : 0 }}>
          <div className="px-6 pb-6 flex flex-col gap-1 border-t border-slate-100 pt-4">
            {NAV_LINKS.map((l, i) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="text-sm font-medium text-slate-700 py-2.5 transition-all duration-300"
                style={{ transitionDelay: open ? `${i * 40}ms` : "0ms", opacity: open ? 1 : 0, transform: open ? "translateX(0)" : "translateX(-8px)" }}>
                {l.label}
              </a>
            ))}
            <a href="#booking" onClick={() => setOpen(false)} className="mt-3 px-5 py-3 rounded-xl text-sm font-semibold text-white text-center" style={gradBg}>
              Book Appointment
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ================================ Hero ================================ */
function Hero() {
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

/* ================================ Why Choose Us ================================ */
function WhyChooseUs() {
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

/* ================================ Services ================================ */
function Services() {
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

/* ================================ About ================================ */
function About() {
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

/* ================================ Before & After ================================ */
function BeforeAfter() {
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

/* ================================ Doctors ================================ */
function Doctors() {
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

/* ================================ Testimonials ================================ */
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

function Testimonials() {
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

/* ================================ Booking ================================ */
function Booking() {
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

/* ================================ FAQ ================================ */
function FAQ() {
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

/* ================================ Contact ================================ */
function Contact() {
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

/* ================================ Footer ================================ */
function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  return (
    <footer className="pt-20 pb-8" style={{ backgroundColor: C.ink }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 font-extrabold text-lg text-white" style={displayFont}>
              <span className="w-9 h-9 rounded-xl flex items-center justify-center" style={gradBg}><Smile size={20} color="#fff" /></span>
              SmileCare
            </div>
            <p className="mt-4 text-sm text-white/50 leading-relaxed">Premium family &amp; cosmetic dentistry, built on trust and modern care.</p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {CERTIFICATIONS.map(c => (
                <span key={c} className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/10 text-white/60">{c}</span>
              ))}
            </div>
            <div className="mt-5 flex gap-2">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <span key={i} tabIndex={0} role="link" aria-label="Social link" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-colors">
                  <Icon size={15} />
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm">Quick Links</h4>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map(l => <li key={l.href}><a href={l.href} className="text-sm text-white/50 hover:text-white transition-colors">{l.label}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm">Services</h4>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.slice(0, 5).map(s => <li key={s.title}><a href="#services" className="text-sm text-white/50 hover:text-white transition-colors">{s.title}</a></li>)}
            </ul>
            <div className="mt-6">
              <h4 className="text-white font-semibold text-sm">Awards</h4>
              <p className="mt-2 text-xs text-white/40 leading-relaxed">Best Family Dental Practice 2023 · Patient Choice Award 2022–2024</p>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm">Newsletter</h4>
            <p className="mt-4 text-sm text-white/50">Tips for healthier smiles, straight to your inbox.</p>
            <form onSubmit={(e) => { e.preventDefault(); if (email) { setSubscribed(true); setEmail(""); } }} className="mt-4 flex gap-2">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input id="newsletter-email" value={email} onChange={e => setEmail(e.target.value)} type="email" required placeholder="Your email"
                className="min-w-0 flex-1 px-4 py-2.5 rounded-xl bg-white/10 text-white placeholder-white/40 text-sm outline-none focus:bg-white/15 transition-colors" />
              <button className="px-4 py-2.5 rounded-xl flex-shrink-0" style={gradBg} aria-label="Subscribe"><Send size={15} color="#fff" /></button>
            </form>
            {subscribed && <p className="mt-2 text-xs text-emerald-400">Subscribed — welcome aboard!</p>}

            <div className="mt-6 flex items-center gap-2 text-white/40">
              <CreditCard size={15} /><Wallet size={15} />
              <span className="text-xs">Visa · Mastercard · Amex · PayPal accepted</span>
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-white/70"><ShieldCheck size={13} /> 24/7 Emergency: +1 (555) 999-0000</p>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} SmileCare Dental Clinic. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ================================ Scroll To Top ================================ */
function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-7 right-7 z-40 w-12 h-12 rounded-full shadow-xl flex items-center justify-center text-white transition-all duration-300 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      style={gradBg} aria-label="Scroll to top">
      <ArrowUp size={18} />
    </button>
  );
}

/* ================================ Loader ================================ */
function Loader({ hidden }) {
  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-500 ${hidden ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center animate-[pulseScale_1.1s_ease-in-out_infinite]" style={gradBg}>
          <Smile size={30} color="#fff" />
        </div>
        <div className="mt-5 w-32 h-1 rounded-full bg-slate-100 overflow-hidden">
          <div className="h-full rounded-full animate-[loaderBar_0.9s_ease-in-out_infinite]" style={gradBg} />
        </div>
      </div>
    </div>
  );
}

/* ================================ SEO (see note below) ================================
   This project runs as a client-only React artifact, so there's no Next.js
   <Head> / generateMetadata to hook into here. The block below is written so
   you can paste it directly into a Next.js app/layout.tsx (App Router):

   export const metadata = {
     title: "SmileCare Dental Clinic — Healthy Smiles Start Here",
     description: "Professional family & cosmetic dental care. Same-day emergency visits, insurance accepted, 10+ years of experience.",
     openGraph: {
       title: "SmileCare Dental Clinic",
       description: "Healthy Smiles Start Here — book your appointment today.",
       url: "https://www.smilecaredental.com",
       siteName: "SmileCare Dental Clinic",
       images: ["/og-image.jpg"],
       type: "website",
     },
     twitter: { card: "summary_large_image", title: "SmileCare Dental Clinic", description: "Healthy Smiles Start Here." },
     alternates: { canonical: "https://www.smilecaredental.com" },
   };

   robots.txt:
     User-agent: *
     Allow: /
     Sitemap: https://www.smilecaredental.com/sitemap.xml

   The JSON-LD below IS wired up for real — it's injected into <head> at
   runtime so this preview also carries valid Dentist/LocalBusiness schema. */
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "SmileCare Dental Clinic",
  image: IMG.hero,
  telephone: "+1-555-123-4567",
  email: "hello@smilecaredental.com",
  address: { "@type": "PostalAddress", streetAddress: "128 Willow Grove Ave", addressLocality: "Springfield", addressRegion: "IL", postalCode: "62704", addressCountry: "US" },
  openingHours: "Mo-Sa 08:00-19:00",
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1200" },
  priceRange: "$$",
};

function useInjectJsonLd() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(JSON_LD);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);
}

/* ================================ App ================================ */
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [prefillDoctor, setPrefillDoctor] = useState("");
  useInjectJsonLd();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <BookingContext.Provider value={{ prefillDoctor, setPrefillDoctor }}>
      <div style={{ ...bodyFont, backgroundColor: "#fff" }} className="min-h-screen scroll-smooth">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&family=Inter:wght@400;500;600&display=swap');
          html { scroll-behavior: smooth; }
          ::selection { background: ${C.secondary}; color: white; }
          @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
          @keyframes blob { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(20px,-15px) scale(1.05); } 66% { transform: translate(-15px,10px) scale(0.97); } }
          @keyframes floatParticle { 0%,100% { transform: translateY(0) translateX(0); opacity: 0.35; } 50% { transform: translateY(-24px) translateX(8px); opacity: 0.7; } }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(6px);} to { opacity: 1; transform: translateY(0);} }
          @keyframes pulseScale { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(0.85); opacity: 0.7; } }
          @keyframes loaderBar { 0% { transform: translateX(-100%); } 50% { transform: translateX(0%); } 100% { transform: translateX(100%); } }
          @keyframes borderShift { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
          @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          @keyframes popIn { 0% { transform: scale(0); opacity: 0; } 70% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
          }
          select { -webkit-appearance: none; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; }
          .noise-overlay { position: fixed; inset: 0; pointer-events: none; z-index: 60; opacity: 0.025; mix-blend-mode: overlay; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
        `}</style>

        <div className="noise-overlay" aria-hidden="true" />
        <Loader hidden={loaded} />
        <Navbar />
        <main id="main">
          <Hero />
          <WhyChooseUs />
          <Services />
          <About />
          <BeforeAfter />
          <Doctors />
          <Testimonials />
          <Booking />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <ScrollTop />
      </div>
    </BookingContext.Provider>
  );
}
