import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import CustomCursor from "@/components/ui/CustomCursor";
import ComingSoon from "@/components/sections/ComingSoon";
import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

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
      : "https://uemcon.org",
  ),
  title: {
    template: "%s | UEMCON",
    default: "UEMCON",
  },
  description:
    "Experience global governance history and modern diplomacy. Join the official MUN conference of the University of Engineering & Management.",
  openGraph: {
    title: "UEMCON — Model United Nations Conference",
    description:
      "International diplomacy meets timeless history at the UEM Model United Nations conference.",
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
  const isComingSoon = process.env.COMING_SOON === "true";

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} h-full antialiasedScroll scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col relative bg-paper text-ink selection:bg-warm-tan/30 selection:text-ink">
        {/* Custom Premium Eased Cursor */}
        <CustomCursor />

        {/* Subtle global parchment paper texture overlay */}
        <div className="parchment-overlay" />

        {isComingSoon ? (
          <ComingSoon />
        ) : (
          /* Main Content Area */
          <div className="flex-grow flex flex-col min-h-screen w-full overflow-x-hidden">
            {/* Navigation header */}
            <Header />

            {/* Main page content area */}
            <main className="flex-grow flex flex-col pt-[71px] md:pt-[81px] overflow-x-hidden">
              {children}
            </main>

            {/* General footer */}
            <Footer />
          </div>
        )}
      </body>
    </html>
  );
}
