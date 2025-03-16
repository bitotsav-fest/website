"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Bug, Phone, Home, Calendar, Ticket, Music, Info, Images, Star, SquareUser, Shirt, UsersRound } from 'lucide-react';
import Link from 'next/link';

export default function VirtualHelpdesk() {
  const supportCategories = [
    {
      title: 'Technical Queries',
      icon: <Bug className="w-6 h-6" />,
      contacts: [
        { name: 'Shaswat Raj', role: 'Tech Team', phone: '+91 9508846600' },
        { name: 'Abhinav Kumar Choudhary', role: 'Tech Team', phone: '+91 9939110848' },
        { name: 'Mrityunjay Raj', role: 'Tech Team', phone: '+91 9471828932' }
      ]
    }
  ];

  return (
    <div className="min-h-screen mt-20 bg-[#0A0118] relative overflow-hidden p-8">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>

      <div className="text-center mb-16 relative z-10">
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#EFCA4E] via-[#F6F1E2] to-[#EFCA4E]">
          Virtual Helpdesk
        </h1>
        <p className="text-xl text-gray-400">
          Get support from our dedicated team of developers
        </p>
      </div>

      {/* Cards */}
      <div className="flex justify-center gap-8 max-w-7xl mx-auto relative z-10 flex-wrap">
        {supportCategories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 w-[400px]"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-gradient-to-r from-[#EFCA4E]/20 to-[#F6F1E2]/20 border border-[#EFCA4E]/20">
                {category.icon}
              </div>
              <h2 className="text-2xl font-semibold text-white">{category.title}</h2>
            </div>

            <div className="space-y-6">
              {category.contacts.map((contact, contactIndex) => (
                <div key={contactIndex} className="space-y-2">
                  <h3 className="text-lg font-medium text-[#EFCA4E]">{contact.name}</h3>
                  <p className="text-gray-400">{contact.role}</p>
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center gap-2 text-sm text-gray-300 hover:text-[#EFCA4E] transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {contact.phone}
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* WhatsApp Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 w-[400px] flex flex-col items-center justify-center text-center"
        >
          <h2 className="text-2xl font-semibold text-[#EFCA4E] mb-2">Looking for assistance?</h2>
          <p className="text-gray-400 mb-4">For any queries, feedbacks get in touch with our dedicated team on WhatsApp.</p>
          <a
           href="https://chat.whatsapp.com/KOqn2PWDhQ1LGlGqSMU4SK"
           target="_blank"
           rel="noopener noreferrer"
           className="px-6 py-2.5 bg-gradient-to-r from-[#EFCA4E] to-[#2D1E0F] text-[#F6F1E2] font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#EFCA4E]/20 hover:scale-105 border border-[#EFCA4E]/20 text-center"
           >
           Join Now
          </a>
        </motion.div>
      </div>

      {/* Quick Navigation */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto mt-16 relative z-10">
        <h2 className="text-3xl font-semibold mb-8 text-center text-[#EFCA4E]">Quick Navigation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { name: 'Home', icon: Home, href: '/' },
            { name: 'Events', icon: Calendar, href: '/events' },
            { name: 'Tickets', icon: Ticket, href: '/tickets' },
            { name: 'Concerts', icon: Music, href: '/concerts' },
            { name: 'Team', icon: UsersRound, href: '/team' },
            { name: 'Merch', icon: Shirt, href: '/merch' },
            { name: 'About', icon: Info, href: '/about' },
            { name: 'Gallery', icon: Images, href: '/gallery' },
            { name: 'Sponsors', icon: Star, href: '/sponsors' },
            { name: 'Developers', icon: SquareUser, href: '/developers' }
          ].map((item, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <Link
                href={item.href}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:bg-white/10 hover:border-[#EFCA4E]/30 transition-all duration-300 group h-full"
              >
                <item.icon className="w-6 h-6 text-[#EFCA4E] group-hover:scale-110 transition-transform duration-300" />
                <span className="text-gray-300 group-hover:text-[#EFCA4E] transition-colors duration-300">{item.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
