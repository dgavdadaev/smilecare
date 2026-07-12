import { useState } from "react";
import { Smile, Send, CreditCard, Wallet, ShieldCheck } from "lucide-react";
import { C, gradBg, displayFont } from "../theme/tokens";
import { NAV_LINKS } from "../data/navLinks";
import { SERVICES } from "../data/services";
import { CERTIFICATIONS } from "../data/certifications";
import { Facebook, Instagram, Twitter } from "./common/SocialIcons";

/* ================================ Footer ================================ */
export function Footer() {
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
