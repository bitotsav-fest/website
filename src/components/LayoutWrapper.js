"use client";

import { usePathname } from 'next/navigation';
import { Nav } from "@/components/landing/NAV";
import Footer from "@/components/landing/FOOTER";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const isLandingPage = pathname === "/";

  return (
    <>
      {!isLandingPage && <Nav />}
      <main className="flex-1">{children}</main>
      {!isLandingPage && <Footer />}
    </>
  );
}