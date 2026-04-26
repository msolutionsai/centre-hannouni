import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dr Hannouni Youssef · Chirurgie esthétique & maxillo-faciale · Marrakech",
  description:
    "Centre du Docteur Hannouni à Guéliz, Marrakech. Vingt années dédiées à la chirurgie plastique, esthétique et réparatrice de la face. La chirurgie esthétique, un art scientifique.",
  openGraph: {
    title: "Centre du Docteur Hannouni · Marrakech",
    description:
      "La chirurgie esthétique, un art scientifique. Dr Hannouni Youssef, chirurgien esthétique et maxillo-facial à Marrakech.",
    type: "website",
    locale: "fr_FR",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
