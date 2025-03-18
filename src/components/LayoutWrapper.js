"use client"

import { usePathname } from "next/navigation"
import { Nav } from "@/components/landing/NAV"
import Footer from "@/components/landing/FOOTER"
import { Toaster } from "react-hot-toast"

// Toaster
const toastConfig = (
  <Toaster
    position="top-center"
    toastOptions={{
      style: {
        background: "rgba(255, 255, 255, 0.1)", // Transparent background
        color: "#fff",
        backdropFilter: "blur(10px)", // Glass effect
        borderRadius: "10px",
        padding: "12px 16px",
        border: "1px solid rgba(255, 255, 255, 0.3)",
      },
      success: {
        style: {
          background: "rgba(34, 197, 94, 0.2)", // Green for success
        },
      },
      error: {
        style: {
          background: "rgba(239, 68, 68, 0.2)", // Red for error
        },
      },
      duration: 2000, // Toast duration in milliseconds
    }}
  />
)

export default function LayoutWrapper({ children }) {
  const pathname = usePathname()

  const isLandingPage = pathname === "/"
  const isScanner = pathname === "/scanner"

  return (
    <>
      {!isLandingPage && !isScanner && <Nav />}
      <main className="flex-1">{children}</main>
      {!isLandingPage && !isScanner && <Footer />}
      {/* Toaster */}
      {toastConfig}
    </>
  )
}
