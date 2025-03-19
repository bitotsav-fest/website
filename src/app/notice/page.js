'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function NoticePage() {
  return (
    <div className="min-h-screen mt-16 bg-gradient-to-br from-black via-gray-900 to-black p-0">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto bg-black/50 backdrop-blur-lg rounded-xl p-8 border border-gold/30"
      >
        <h1 className="text-4xl font-bold text-gold mb-6 text-center">Important Notices</h1>
        
        <div className="space-y-6">
          <section className="bg-black/30 p-6 rounded-lg border border-gold/20">
            <h2 className="text-2xl font-semibold text-gold mb-4">Event Access Restrictions</h2>
            <div className="space-y-4">
              <div className="p-4 bg-red-900/30 border border-red-500/30 rounded-lg">
                <p className="text-red-200 font-semibold">Night Events - External Participants</p>
                <p className="text-gray-300 mt-2">External participants are not permitted to attend night events. This policy is strictly enforced for security reasons.</p>
              </div>
            </div>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-gold/20">
            <h2 className="text-2xl font-semibold text-gold mb-4">Day Scholar Information</h2>
            <div className="p-4 bg-yellow-900/30 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-200 font-semibold">Night Event Access</p>
              <p className="text-gray-300 mt-2">Day scholars are required to purchase passes to attend night events. Standard event fees apply.</p>
            </div>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-gold/20">
            <h2 className="text-2xl font-semibold text-gold mb-4">Accommodation Policy</h2>
            <div className="p-4 bg-blue-900/30 border border-blue-500/30 rounded-lg">
              <p className="text-blue-200 font-semibold">No Accommodation Provided</p>
              <p className="text-gray-300 mt-2">Please note that accommodation facilities will not be provided during the event. Participants are advised to make their own arrangements.</p>
            </div>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-gold/20">
            <h2 className="text-2xl font-semibold text-gold mb-4">Free Pass Eligibility</h2>
            <div className="p-4 bg-green-900/30 border border-green-500/30 rounded-lg">
              <p className="text-green-200 font-semibold">BIT Mesra Hostelers (Main Campus)</p>
              <p className="text-gray-300 mt-2">Free passes are exclusively available for BIT Mesra hostelers from the main campus. Valid hostel ID must be presented for verification.</p>
            </div>
          </section>

          <section className="bg-black/30 p-6 rounded-lg border border-gold/20">
            <h2 className="text-2xl font-semibold text-gold mb-4">Additional Information</h2>
            <ul className="space-y-3 text-gray-300 list-disc list-inside">
              <li>All participants must carry valid ID cards at all times</li>
              <li>Event timings and schedules must be strictly followed</li>
              <li>The organizing committee&apos;s decisions are final and binding</li>
            </ul>
          </section>
        </div><div className="flex justify-center mt-8">
        <a 
          href="/virtual-helpdesk" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-gold/20 hover:bg-gold/30 text-gold border border-gold/50 rounded-lg transition-all duration-300"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" />
          </svg>
          Virtual Helpdesk
        </a>
      </div>
      </motion.div>
      
    </div>
  );
}
