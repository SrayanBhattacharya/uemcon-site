import {
  Phone,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Container from "./Container";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light-beige/25 border-t border-warm-tan/30 py-12 mt-auto relative z-10 text-ink">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-8 pb-8 border-b border-warm-tan/20">
          {/* Left: Big UEMCON Logo & Socials */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/" className="flex items-center gap-4 group">
              <Image
                src="/logo.svg"
                alt="UEMCON Logo"
                width={96}
                height={96}
                style={{ width: "auto" }}
                className="h-20 md:h-24 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="font-serif text-2xl md:text-3xl tracking-[0.2em] text-primary-blue uppercase font-bold">UEMCON</span>
                <span className="font-sans text-[10px] md:text-xs tracking-[0.1em] text-ink/50 uppercase">Model United Nations</span>
              </div>
            </Link>
            
            <a
              href="https://www.instagram.com/uemcon?igsh=ZTZldzJpdno2Z2Uz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink/75 hover:text-primary-blue transition-colors duration-300 mt-2 px-3 py-1.5 border border-warm-tan/20 rounded-full hover:border-primary-blue"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span className="font-semibold text-[10px] tracking-wider">Follow @uemcon</span>
            </a>
          </div>

          {/* Middle: Contact Info */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h4 className="font-serif text-sm md:text-base tracking-[0.2em] text-primary-blue uppercase font-bold">
              Contact Secretariat
            </h4>
            <div className="flex flex-col gap-3 text-sm tracking-wide text-ink/80">
              <a href="tel:+916290492942" className="flex items-center gap-2.5 hover:text-primary-blue transition-colors duration-300 group">
                <Phone className="h-4 w-4 text-primary-blue/80 group-hover:scale-110 transition-transform duration-300" />
                <span>Sayan: <strong className="font-semibold text-ink">+91 62904 92942</strong></span>
              </a>
              <a href="tel:+918906075640" className="flex items-center gap-2.5 hover:text-primary-blue transition-colors duration-300 group">
                <Phone className="h-4 w-4 text-primary-blue/80 group-hover:scale-110 transition-transform duration-300" />
                <span>Poushali: <strong className="font-semibold text-ink">+91 89060 75640</strong></span>
              </a>
              <a href="tel:+919836825552" className="flex items-center gap-2.5 hover:text-primary-blue transition-colors duration-300 group">
                <Phone className="h-4 w-4 text-primary-blue/80 group-hover:scale-110 transition-transform duration-300" />
                <span>Ishika: <strong className="font-semibold text-ink">+91 98368 25552</strong></span>
              </a>
            </div>
          </div>

          {/* Right: Embedded Google Map */}
          <div className="w-full md:w-auto flex justify-center md:justify-end">
            <div className="overflow-hidden border border-warm-tan/30 shadow-md group rounded-sm bg-paper/50 p-1">
              <div className="overflow-hidden rounded-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.5126958615797!2d88.48732647520922!3d22.559920179500793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a020b267a3cdc13%3A0xb3b21d652126f40!2sUniversity%20of%20Engineering%20%26%20Management%2C%20Kolkata%20(UEM)!5e0!3m2!1sen!2sin!4v1780498847483!5m2!1sen!2sin"
                  width="240"
                  height="120"
                  style={{ 
                    border: 0, 
                    filter: "grayscale(1) contrast(1.1) sepia(0.2) opacity(0.8)",
                  }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="UEM Kolkata Map Location"
                  className="transition-all duration-700 ease-in-out group-hover:filter-none group-hover:opacity-100"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Part */}
        <div className="text-center text-[10px] text-ink/50 uppercase tracking-widest font-semibold">
          © {currentYear} UEM Model United Nations. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
