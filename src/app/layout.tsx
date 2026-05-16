import type { Metadata } from "next";
import Script from "next/script";
import { Sora, DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { localBusinessSchema, jsonLd } from "@/lib/schema";

// Tawk.to live chat widget
const TAWK_SRC = "https://embed.tawk.to/6823effa7c5b09190cd447fe/1ir662r4n";

const sora = Sora({ variable: "--font-sora", subsets: ["latin"] });
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });

const SITE_URL = "https://www.theroadsidehelper.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "24/7 Roadside Assistance Near Me — $100/hr Flat Rate | The Roadside Helper",
    template: "%s",
  },
  description:
    "24/7 roadside assistance at flat $100/hr — jump-starts, flat tire changes, lockouts, fuel delivery, towing, winch-outs. No membership. 1-hour minimum. Call (888) 944-3001. 900+ cities, all 50 states.",
  keywords: [
    "roadside assistance near me",
    "24/7 roadside assistance",
    "jump start service",
    "flat tire change",
    "car lockout service",
    "fuel delivery",
    "tow truck service",
    "winch out recovery",
    "battery replacement on site",
    "motorcycle roadside",
    "RV roadside",
    "diesel roadside",
    "fleet roadside",
    "pay as you go roadside",
    "$100 per hour roadside",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "The Roadside Helper",
    title: "24/7 Roadside Assistance Near Me — $100/hr Flat | (888) 944-3001",
    description: "Jump-starts, flat tires, lockouts, fuel, tow, winch. Flat $100/hr, 24/7, no membership. Nationwide.",
    locale: "en_US",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "24/7 Roadside Assistance Near Me — $100/hr Flat",
    description: "Jump-starts, flat tires, lockouts, fuel, tow. Flat $100/hr. Call (888) 944-3001.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sora.variable} ${dmSans.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(localBusinessSchema()) }}
        />
      </head>
      <body className="font-body antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <Script
          id="tawk-to"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='${TAWK_SRC}';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
            `,
          }}
        />
      </body>
    </html>
  );
}
