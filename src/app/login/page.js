"use client"
import { signIn, useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { IconBrandGoogle } from "@tabler/icons-react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push("/dashboard")
    }
  }, [session, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1A1A1A] via-[#2A1B3D] to-[#382952] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#1A1A1A] via-[#2A1B3D] to-[#382952] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none mix-blend-overlay"></div>
      <div className="absolute top-0 -left-4 w-[500px] h-[500px] bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-full mix-blend-normal filter blur-[120px] opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 -right-4 w-[500px] h-[500px] bg-gradient-to-l from-yellow-500/20 to-amber-500/20 rounded-full mix-blend-normal filter blur-[120px] opacity-30 animate-pulse animation-delay-2000"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full relative bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-amber-500/10 shadow-xl"
      >
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-yellow-400 to-yellow-500"
          >
            Welcome to Bitotsav
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-amber-100/60 mt-2">
            Sign in to continue to Bitotsav
          </motion.p>
        </div>

        {/* Login Button */}
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 backdrop-blur-sm text-white py-4 px-6 rounded-xl transition-all duration-300 border border-amber-500/20 hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/20"
        >
          <IconBrandGoogle size="1.5rem" className="text-amber-400" />
          <span className="text-amber-100">Continue with Google</span>
        </motion.button>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-6 p-4 rounded-xl bg-gradient-to-r from-amber-500/5 to-yellow-500/5 backdrop-blur-sm border border-amber-500/10"
        >
          <span className="text-amber-400 font-medium">BIT Mesra Students</span>
          <span className="text-amber-100/60 ml-1">- Free Access using your institutional email </span>
          <></>
          <span className="text-amber-100/60 ml-1">
            If BIT Webmail is not configured, please{" "}
            <a href="https://bitmesra.ac.in/Email_Application/index.html" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 transition-colors">
              Configure email
            </a>
          </span>
        </motion.div>

        {/* Terms and Privacy */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center text-sm text-amber-100/40 mt-8">
          By continuing, you agree to our{" "}
          <a href="/terms" className="text-amber-400 hover:text-amber-300 transition-colors">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-amber-400 hover:text-amber-300 transition-colors">
            Privacy Policy
          </a>
        </motion.p>
      </motion.div>
    </div>
  )
}
