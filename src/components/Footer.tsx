import { Link } from "react-router-dom";
import { Linkedin, Mail } from "lucide-react";

import { CONTACT_INFO } from "../constants";

export function Footer() {
  return (
    <footer className="bg-surface-soft border-t border-surface-border py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex flex-col group mb-6">
            <span className="text-2xl font-display font-black tracking-tighter group-hover:text-brand transition-colors leading-none">
              JAYAKUMAR
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 group-hover:text-brand/60 transition-colors">
              PORTFOLIO
            </span>
          </Link>
          <p className="text-white/60 text-lg max-w-md leading-relaxed">
            Product marketer fuelled to drive real-world impact :)
          </p>
        </div>

        <div>
          <h4 className="font-display font-bold text-lg mb-6">Quick Links</h4>
          <ul className="space-y-4 text-white/60">
            <li><Link to="/" className="hover:text-brand transition-colors">Home</Link></li>
            <li><Link to="/case-studies" className="hover:text-brand transition-colors">Case Studies</Link></li>
            <li><Link to="/story" className="hover:text-brand transition-colors">Story</Link></li>
            <li><Link to="/contact" className="hover:text-brand transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-lg mb-6">Connect</h4>
          <div className="flex gap-4 mb-8">
            <a href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="w-10 h-10 rounded-full bg-surface-border flex items-center justify-center hover:bg-brand transition-all">
              <Linkedin size={20} />
            </a>
            <a href={`mailto:${CONTACT_INFO.email}`} aria-label="Send Email" className="w-10 h-10 rounded-full bg-surface-border flex items-center justify-center hover:bg-brand transition-all">
              <Mail size={20} />
            </a>
          </div>
          <p className="text-sm text-white/40">© 2026 Jayakumar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
