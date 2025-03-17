import "./globals.css";
import { SessionProvider } from "next-auth/react";
import LayoutWrapper from "@/components/LayoutWrapper"; // Adjust the import path as needed
import Script from 'next/script';
export const metadata = {
  title: "Bitotsav 2025 - BIT Mesra's Premier Cultural, Sports & Technical Festival",
  description: "Experience Bitotsav - The Annual Cultural, Sports and Technical Festival of BIT Mesra. Featuring competitions, concerts, exhibitions, workshops and more. Join us for an unforgettable celebration of talent, creativity and excellence.",
  metadataBase: new URL("https://www.bitotsav.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en"
    }
  },
  other: {
    "google-site-verification": "your-verification-code",
    "structured-data": [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Bitotsav",
        "url": "https://www.bitotsav.com",
        "logo": "https://www.bitotsav.com/logo.png",
        "description": "Bitotsav is BIT Mesra's annual techno-cultural festival featuring competitions, concerts, exhibitions and workshops",
        "sameAs": [
          "https://www.facebook.com/bitotsav",
          "https://www.instagram.com/bitotsav",
          "https://twitter.com/bitotsav"
        ],
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://www.bitotsav.com"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Ranchi",
          "addressRegion": "Jharkhand",
          "addressCountry": "IN",
          "streetAddress": "Birla Institute of Technology, Mesra"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Bitotsav",
        "url": "https://www.bitotsav.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.bitotsav.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        },
        "hasPart": [
          {
            "@type": "WebPage",
            "@id": "https://www.bitotsav.com/events",
            "name": "Events",
            "description": "Explore our diverse range of cultural, technical and sports events"
          },
          {
            "@type": "WebPage",
            "@id": "https://www.bitotsav.com/about",
            "name": "About",
            "description": "Learn about Bitotsav's history, mission and impact"
          },
          {
            "@type": "WebPage",
            "@id": "https://www.bitotsav.com/tickets",
            "name": "Tickets",
            "description": "Book your tickets for Bitotsav events and concerts"
          },
          {
            "@type": "WebPage",
            "@id": "https://www.bitotsav.com/gallery",
            "name": "Gallery",
            "description": "View photos and videos from previous Bitotsav editions"
          },
          {
            "@type": "WebPage",
            "@id": "https://www.bitotsav.com/sponsors",
            "name": "Sponsors",
            "description": "Meet our valued partners and sponsors"
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": "Bitotsav 2025",
        "startDate": "2025-03-01",
        "endDate": "2025-03-04",
        "location": {
          "@type": "Place",
          "name": "Birla Institute of Technology, Mesra",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Ranchi",
            "addressRegion": "Jharkhand",
            "addressCountry": "IN"
          }
        },
        "description": "Annual Cultural, Sports and Technical Festival",
        "offers": {
          "@type": "Offer",
          "url": "https://www.bitotsav.com/tickets"
        }
      }
    ]
  },
  openGraph: {
    title: "Bitotsav",
    description: "BIT Mesra",
    url: "https://www.bitotsav.com",
    siteName: "Bitotsav",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
      },
      {
        url : "day2/p7.webp"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bitotsav",
    description: "BIT Mesra",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark h-full">
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-PC52W2PLKC"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-PC52W2PLKC', {
                page_path: window.location.pathname,
                cookie_domain: 'www.bitotsav.com'
              });
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(metadata.other['structured-data'])
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <SessionProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}