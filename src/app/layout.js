import "./globals.css";
import { SessionProvider } from "next-auth/react";
import LayoutWrapper from "@/components/LayoutWrapper"; // Adjust the import path as needed

export const metadata = {
  title: "Bitotsav 2025 - BIT Mesra",
  description: "Bitotsav - The Annual Cultural, Sports and Technical Festival of Birla Institute of Technology, Mesra. Join us for an unforgettable celebration of talent, creativity and excellence.",
  metadataBase: new URL("https://www.bitotsav.com"),
  alternates: {
    canonical: "/",
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
      <body className="flex flex-col min-h-screen">
        <SessionProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}