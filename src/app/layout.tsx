import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { clinic } from "@/lib/content";

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

const SITE_URL = "https://centrehannouni.com";
const SITE_TITLE =
  "Dr Hannouni Youssef · Chirurgie esthétique & maxillo-faciale · Marrakech";
const SITE_DESCRIPTION =
  "Centre du Docteur Hannouni à Guéliz, Marrakech. Vingt années dédiées à la chirurgie plastique, esthétique et réparatrice de la face. La chirurgie esthétique, un art scientifique.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s · Centre Hannouni",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Centre du Docteur Hannouni",
  authors: [{ name: "Dr Hannouni Youssef" }],
  keywords: [
    "chirurgie esthétique",
    "chirurgie maxillo-faciale",
    "rhinoplastie Marrakech",
    "lifting cervico-facial",
    "blépharoplastie",
    "génioplastie",
    "lipofilling visage",
    "acide hyaluronique",
    "botox Marrakech",
    "chirurgie orthognatique",
    "Dr Hannouni",
    "Centre Hannouni",
    "Guéliz Marrakech",
    "chirurgien esthétique Maroc",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Centre du Docteur Hannouni",
    title: "Centre du Docteur Hannouni · Marrakech",
    description:
      "La chirurgie esthétique, un art scientifique. Dr Hannouni Youssef, chirurgien esthétique et maxillo-facial à Marrakech.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Centre du Docteur Hannouni · Marrakech",
    description:
      "La chirurgie esthétique, un art scientifique. Dr Hannouni Youssef, chirurgien esthétique et maxillo-facial à Marrakech.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  icons: { icon: "/favicon.ico" },
  formatDetection: { telephone: true, email: true, address: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": `${SITE_URL}/#clinic`,
  name: clinic.name,
  alternateName: clinic.shortName,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  telephone: clinic.phoneE164,
  email: clinic.email,
  image: `${SITE_URL}/og.png`,
  priceRange: "$$$",
  medicalSpecialty: ["PlasticSurgery", "OrofacialSurgery"],
  address: {
    "@type": "PostalAddress",
    streetAddress: `${clinic.address.line1}, ${clinic.address.line2}`,
    addressLocality: "Marrakech",
    postalCode: "40000",
    addressRegion: "Marrakech-Safi",
    addressCountry: "MA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 31.6325077,
    longitude: -8.0150143,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "20:00",
      closes: "23:30",
      description: "Sur rendez-vous",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "13:00",
    },
  ],
  founder: {
    "@type": "Person",
    "@id": `${SITE_URL}/#founder`,
    name: clinic.doctor.fullName,
    jobTitle: clinic.doctor.title,
    worksFor: { "@id": `${SITE_URL}/#clinic` },
    alumniOf: [
      { "@type": "EducationalOrganization", name: "Faculté de médecine de Casablanca" },
      { "@type": "EducationalOrganization", name: "Université de Bordeaux" },
    ],
    memberOf: {
      "@type": "Organization",
      name: "Société Marocaine de Chirurgie Esthétique et Maxillo-Faciale",
    },
  },
  areaServed: {
    "@type": "City",
    name: "Marrakech",
  },
  sameAs: [
    "https://www.google.com/maps?cid=15724608745825718949",
    "https://www.google.com/maps/place/Dr+Hannouni+Youssef+-+Centre+de+chirurgie+esth%C3%A9tique+et+maxillo+faciale+Marrakech/@31.6325077,-8.0150143,17z/data=!3m1!4b1!4m6!3m5!1s0xdafef40f5970321:0xda3908577ef152a5!8m2!3d31.6325077!4d-8.0150143!16s%2Fg%2F11mk9qqf5x",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
