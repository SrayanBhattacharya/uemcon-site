import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import { Calendar, Ticket, Search, MapPin, Clock, Landmark } from "lucide-react";
import Link from "next/link";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://uemcon.org"
  ),
  title: {
    template: "%s | UEMCON — Premium Model United Nations",
    default: "UEMCON — Premium Model United Nations Experience",
  },
  description: "Experience global governance history and modern diplomacy. Join the official MUN conference of the University of Engineering & Management.",
  openGraph: {
    title: "UEMCON — Model United Nations Conference",
    description: "International diplomacy meets timeless history at the UEM Model United Nations conference.",
    url: "https://uemcon.org",
    siteName: "UEMCON",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UEMCON — Model United Nations",
    description: "International diplomacy meets timeless history.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} h-full antialiasedScroll scroll-smooth`}
    >
      <body className="min-h-full flex relative bg-paper text-ink selection:bg-warm-tan/30 selection:text-ink">
        {/* Custom Premium Eased Cursor */}
        <CustomCursor />

        {/* Subtle global parchment paper texture overlay */}
        <div className="parchment-overlay" />

        {/* Main Content Area */}
        <div className="flex-grow flex flex-col min-h-screen w-full">
          {/* Navigation header */}
          <Header />
          
          {/* Main page content area */}
          <main className="flex-grow flex flex-col pt-[71px] md:pt-[81px]">
            {children}
          </main>
          
          {/* General footer */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
