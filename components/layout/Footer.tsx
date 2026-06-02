import {
  Camera,
  Globe,
  Landmark,
  Mail,
  MessageSquare,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import Container from "./Container";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light-beige/25 border-t border-warm-tan/30 py-16 mt-auto relative z-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-ink">
          {/* Brand Panel */}
          <div className="md:col-span-2 space-y-6">
            <Link
              href="/"
              className="flex items-center gap-3 font-serif text-lg tracking-widest text-primary-blue uppercase font-medium"
            >
              <img src="/logo.svg" alt="UEMCON Logo" className="h-12 w-auto" />
              <span>UEMCON</span>
            </Link>
            <p className="font-sans text-xs text-ink/70 leading-relaxed max-w-sm">
              The official Model United Nations conference of the University of
              Engineering & Management. Blending modern diplomatic
              problem-solving with timeless global governance storytelling.
            </p>
            <div className="flex items-center gap-4 text-ink/60">
              <a
                href="#"
                className="hover:text-primary-blue transition-colors"
                aria-label="Website"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="hover:text-primary-blue transition-colors"
                aria-label="Twitter"
              >
                <MessageSquare className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="hover:text-primary-blue transition-colors"
                aria-label="Instagram"
              >
                <Camera className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="hover:text-primary-blue transition-colors"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-xs tracking-wider uppercase text-primary-blue font-semibold">
              Conference
            </h4>
            <ul className="space-y-2.5 text-xs text-ink/75">
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary-blue transition-colors"
                >
                  Society & History
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="hover:text-primary-blue transition-colors"
                >
                  Committees & Agendas
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary-blue transition-colors"
                >
                  Delegate Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Diplomatic Statement */}
          <div className="space-y-4">
            <h4 className="font-serif text-xs tracking-wider uppercase text-primary-blue font-semibold">
              Diplomacy
            </h4>
            <p className="font-sans text-[11px] leading-relaxed text-ink/60">
              "To coordinate cooperation, debate with intelligence, and craft
              treaties that stand the test of time."
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-warm-tan uppercase tracking-widest font-bold">
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>Official MUN Society</span>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="border-t border-warm-tan/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-ink/50 uppercase tracking-widest font-semibold">
          <div>
            © {currentYear} UEM Model United Nations. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-blue transition-colors">
              Code of Conduct
            </a>
            <a href="#" className="hover:text-primary-blue transition-colors">
              Rules of Procedure
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
