import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
import { IntroMascot } from "@/components/IntroMascot";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
  display: "swap",
});

const siteUrl = "https://shantibancity.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Shantiban City | Luxury Gated Community in Tapna, Baruipur",
  description:
    "Mrityika Shantiban City is a ready-to-move, 220-plot luxury gated community in Tapna, Baruipur, 20 km from Kolkata. Residential plots from 2.5 katha and 72,000 sq ft of commercial space, set around a landscaped lake, clubhouse and 24x7 secured green campus.",
  keywords: [
    "Shantiban City",
    "Mrityika Realtrers",
    "Baruipur plots",
    "gated community Kolkata",
    "residential plots Baruipur",
    "Tapna Baruipur real estate",
  ],
  openGraph: {
    title: "Shantiban City | Luxury Gated Community in Tapna, Baruipur",
    description:
      "220 plots. One landscaped lake. Ready to move. 20 km from Kolkata. Discover Mrityika Shantiban City in Tapna, Baruipur.",
    url: siteUrl,
    siteName: "Shantiban City",
    locale: "en_IN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1f4e33",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        <CustomCursor />
        <IntroMascot />
        {children}
      </body>
    </html>
  );
}
