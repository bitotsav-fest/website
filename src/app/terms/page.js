'use client'
import { motion } from 'framer-motion'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A1A] via-[#2A1B3D] to-[#382952] py-20 px-6">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none mix-blend-overlay"></div>
      <div className="absolute top-0 -left-4 w-[500px] h-[500px] bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-full mix-blend-normal filter blur-[120px] opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 -right-4 w-[500px] h-[500px] bg-gradient-to-l from-yellow-500/20 to-amber-500/20 rounded-full mix-blend-normal filter blur-[120px] opacity-30 animate-pulse animation-delay-2000"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto relative bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-amber-500/10 shadow-xl"
      >
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-yellow-400 to-yellow-500 mb-8">Terms of Service</h1>
        
        <div className="space-y-6 text-amber-100/80">
          <section>
            <h2 className="text-2xl font-semibold text-amber-400 mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using Bitotsav&apos;s website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-400 mb-4">2. Event Registration</h2>
            <p>Registration for Bitotsav events is subject to availability and eligibility requirements. All registrations must be completed through the official website or authorized channels.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-400 mb-4">3. User Accounts</h2>
            <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-400 mb-4">4. Code of Conduct</h2>
            <p>Participants must conduct themselves in a respectful and professional manner. Any form of harassment, discrimination, or disruptive behavior will not be tolerated.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-400 mb-4">5. Intellectual Property</h2>
            <p>All content, logos, and materials on the Bitotsav website are protected by intellectual property rights. You may not use, reproduce, or distribute these materials without authorization.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-400 mb-4">6. Limitation of Liability</h2>
            <p>Bitotsav and its organizers are not liable for any direct, indirect, incidental, or consequential damages arising from your use of our services or participation in events.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-400 mb-4">7. Modifications</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-400 mb-4">8. Contact</h2>
            <p>For questions about these terms, please contact us through our official channels.</p>
          </section>
        </div>
      </motion.div>
    </div>
  )
}