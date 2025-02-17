import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/landing/FOOTER";
import { Nav } from "@/components/landing/NAV";
import AuthProvider from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bitotsav - BIT Mesra Fest",
  description: "BIT Mesra",
  metadataBase: new URL("https://bitotsav.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bitotsav",
    description: "BIT Mesra",
    url: "https://bitotsav.com",
    siteName: "Bitotsav",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
      },
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
    apple: "/apple-touch-icon.png",
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
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Nav />
          <main className="">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
