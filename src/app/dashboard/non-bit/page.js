'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function NonBitPage() {
  return (
    <div className="min-h-screen mt-16 bg-gradient-to-br from-black via-gray-900 to-black p-8">
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
              <div className="p-4 bg-red-900/30 border border-red-500/30 rounded-lg">
                <p className="text-red-200 font-semibold">Registration Status</p>
                <p className="text-gray-300 mt-2">Registration for non-BIT Mesra students is currently not open. Please check back later for updates.</p>
              </div>
              <div className="p-4 bg-yellow-900/30 border border-yellow-500/30 rounded-lg">
                <p className="text-yellow-200 font-semibold">Pricing Notice</p>
                <p className="text-gray-300 mt-2">The displayed ticket prices are tentative and subject to change. Final pricing will be announced when registration opens.</p>
              </div>
            </div>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-gold/20">
            <h2 className="text-2xl font-semibold text-gold mb-4">Ticket Information</h2>
            <p className="text-gray-300 mb-4">
              Experience the grandeur of Bitotsav 2025! As a non-BIT Mesra student, you can participate in this spectacular event by purchasing your tickets below.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 border border-gold/20 rounded-lg">
                <h3 className="text-xl font-semibold text-gold mb-2">Regular Pass</h3>
                <p className="text-3xl font-bold text-white mb-2">₹999</p>
                <ul className="text-gray-300 space-y-2">
                  <li>• Access to all cultural events</li>
                  <li>• Entry to workshops</li>
                  <li>• Participation certificate</li>
                </ul>
              </div>
              <div className="p-4 border border-gold/20 rounded-lg">
                <h3 className="text-xl font-semibold text-gold mb-2">Premium Pass</h3>
                <p className="text-3xl font-bold text-white mb-2">₹1499</p>
                <ul className="text-gray-300 space-y-2">
                  <li>• All Regular Pass benefits</li>
                  <li>• VIP seating at events</li>
                  <li>• Exclusive merchandise</li>
                  <li>• Priority registration</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-gold/20">
            <h2 className="text-2xl font-semibold text-gold mb-4">How to Purchase</h2>
            <div className="space-y-4 text-gray-300">
              <p>1. Select your preferred ticket type</p>
              <p>2. Complete the registration form</p>
              <p>3. Make payment through our secure gateway</p>
              <p>4. Receive your digital ticket via email</p>
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

          <div className="text-center">
            <button className="bg-gradient-to-r from-yellow-200/80 to-yellow-600/80 hover:from-yellow-200 hover:to-yellow-600 text-black font-bold py-3 px-8 rounded-full transform transition-all hover:scale-105">
              Purchase Tickets
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
