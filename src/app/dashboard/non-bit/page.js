'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/landing/Button';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function NonBitPage() {
  return (
    <div className="min-h-screen mt-16 bg-gradient-to-br from-black via-gray-900 to-black p-0">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto bg-black/50 backdrop-blur-lg rounded-xl p-8 border border-gold/30"
      >
        <h1 className="text-4xl font-bold text-gold mb-6 text-center">Welcome to Bitotsav 2025</h1>
        
        <div className="space-y-6">
          <section className="bg-black/30 p-6 rounded-lg border border-gold/20">
            <h2 className="text-2xl font-semibold text-gold mb-4">Important Announcements</h2>
            <div className="space-y-4">
              
              <div className="p-4 bg-green-900/30 border border-green-500/30 rounded-lg">
                <p className="text-green-200 font-semibold">External College Registration</p>
                <p className="text-gray-300 mt-2">To register for Bitotsav 2025, please fill out our registration form. You will receive payment details after form submission.</p>
                <a href="https://forms.gle/vrGVevEJKeDMRW4k7" target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-green-200 hover:text-green-400 underline">Register Here →</a>
              </div>
            </div>
          </section>
          
          <section className="bg-black/30 p-6 rounded-lg border border-gold/20 mb-6">
            <h2 className="text-2xl font-semibold text-gold mb-4">BIT Mesra Students (Without Webmail)</h2>
            <div className="space-y-4">
              <p className="text-gray-300">If you are a current BIT Mesra student but don&apos;t have access to your institutional webmail, you have two options:</p>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gold mb-2">Option 1: Create Your Institutional Email</h3>
                  <p className="text-gray-300 mb-2">Create your institutional email account through the official BIT Mesra portal:</p>
                  <a href="https://bitmesra.ac.in/Email_Application/index.html" target="_blank" rel="noopener noreferrer" className="inline-block text-blue-400 hover:text-blue-300 underline">Create Email Account →</a>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gold mb-2">Option 2: Manual Verification</h3>
                  <p className="text-gray-300 mb-2">If you cannot create an email account, submit our manual verification form:</p>
                  <a href="https://forms.gle/C5d1riuSV8jEsPHm9" target="_blank" rel="noopener noreferrer" className="inline-block text-purple-400 hover:text-purple-300 underline">Submit Verification Form →</a>
                </div>
              </div>
              <div className="mt-4 p-4 bg-yellow-900/30 border border-yellow-500/30 rounded-lg">
                <p className="text-yellow-200 font-semibold">Important Note</p>
                <p className="text-gray-300 mt-2">Registration for BIT Mesra students requires valid student ID verification. Please ensure you complete the verification process before the event.</p>
              </div>
              <div className="mt-4 p-4 bg-red-900/30 border border-red-500/30 rounded-lg">
                <p className="text-red-200 font-semibold">Day Scholar Notice</p>
                <p className="text-gray-300 mt-2">Please note that day scholars are not eligible for free pass access. Standard registration fees apply.</p>
              </div>
            </div>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-gold/20 mb-6">
            <h2 className="text-2xl font-semibold text-gold mb-4">External College Students</h2>
            <div className="space-y-4">
              <p className="text-gray-300">For students from other institutions, here&apos;s what you need to know:</p>
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-purple-900/30 border border-purple-500/30 rounded-lg">
                  <h3 className="text-xl font-semibold text-purple-200 mb-2">Festival Pass Benefits</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Access to all cultural events</li>
                    <li>Entry to general performances</li>
                    <li>Participation in workshops</li>
                    <li>Exclusive merchandise (Premium pass holders)</li>
                    <li>VIP access and premium seating (Premium pass holders)</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-4 bg-emerald-900/30 border border-emerald-500/30 rounded-lg">
                <p className="text-emerald-200 font-semibold">Registration Requirements</p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 mt-2">
                  <li>Valid college ID card</li>
                  <li>Recent passport-size photograph</li>
                  <li>Government-issued ID proof</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-gold/20">
            <h2 className="text-2xl font-semibold text-gold mb-4">Important Notes</h2>
            <ul className="space-y-3 text-gray-300">
              <li>• Valid college ID is mandatory for entry</li>
              <li>• Tickets are non-refundable and non-transferable</li>
              <li>• Limited seats available, book early to avoid disappointment</li>
            </ul>
          </section>

          <div className="text-center space-y-6 mt-8">
            <motion.a 
              href="https://forms.gle/aJ8PMAAra996TXxf6" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gradient-to-r from-yellow-300/90 to-yellow-600/90 hover:from-yellow-300 hover:to-yellow-600 text-black font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-yellow-500/20"
            >
              Register Now
            </motion.a>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex justify-center mt-4"
            >
              <Button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-white/5 hover:bg-white/10 text-white font-medium py-3 px-6 rounded-lg border border-white/20 transition-all duration-300 flex items-center gap-3 hover:border-white/30 hover:shadow-lg hover:shadow-white/5"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
