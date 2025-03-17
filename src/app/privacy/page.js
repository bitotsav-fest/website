'use client'
import { motion } from 'framer-motion'

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-yellow-400 to-yellow-500 mb-8">Privacy Policy</h1>
        
        <div className="space-y-6 text-amber-100/80">
          <section>
            <h2 className="text-2xl font-semibold text-amber-400 mb-4">1. Information We Collect</h2>
            <p>We collect information that you provide directly to us, including but not limited to:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Name and contact information</li>
              <li>Educational institution details</li>
              <li>Event registration data</li>
              <li>Payment information (if applicable)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-400 mb-4">2. How We Use Your Information</h2>
            <p>We use the collected information for:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Processing event registrations</li>
              <li>Communicating about event updates</li>
              <li>Providing customer support</li>
              <li>Improving our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-400 mb-4">3. Information Sharing</h2>
            <p>We do not sell or rent your personal information to third parties. We may share your information with:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Event organizers and partners</li>
              <li>Service providers assisting with our operations</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-400 mb-4">4. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-400 mb-4">5. Cookies and Tracking</h2>
            <p>We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-400 mb-4">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Access your personal information</li>
              <li>Request corrections to your data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-400 mb-4">7. Updates to Privacy Policy</h2>
            <p>We may update this privacy policy periodically. We will notify you of any material changes by posting the new policy on this page.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-400 mb-4">8. Contact Us</h2>
            <p>If you have questions about this privacy policy or our practices, please contact us through our official channels.</p>
          </section>
        </div>
      </motion.div>
    </div>
  )
}