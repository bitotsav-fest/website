"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Trophy, Sparkles } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { icon: Calendar, value: '50+', label: 'Years of Legacy' },
    { icon: Users, value: '10K+', label: 'Annual Participants' },
    { icon: Trophy, value: '100+', label: 'Events & Competitions' },
    { icon: Sparkles, value: '₹5L+', label: 'Prize Pool' },
  ];

  const milestones = [
    { year: '1975', title: 'The Beginning', description: 'First edition of Bitotsav was organized' },
    { year: '1995', title: 'National Recognition', description: 'Expanded to welcome participants from across India' },
    { year: '2010', title: 'Digital Evolution', description: 'Introduced technical events and hackathons' },
    { year: '2025', title: 'Golden Jubilee', description: 'Celebrating 50 years of excellence' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0A0118]">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative pt-24 px-4 pb-16 max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-pink-500 to-orange-500">
              About Bitotsav
            </span>
          </h1>
          <p className="text-2xl text-gray-400 max-w-3xl mx-auto">
            A legacy of excellence, innovation, and cultural celebration at BIT Mesra
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-4 text-violet-400" />
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-pink-500">
                {stat.value}
              </div>
              <div className="text-gray-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-4xl mx-auto mb-24"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/30 via-pink-600/30 to-orange-600/30 rounded-[2rem] blur-xl transform rotate-1"></div>
          <div className="relative backdrop-blur-xl bg-black/40 border border-white/10 rounded-[2rem] p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-pink-500">
              Our Mission
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Bitotsav strives to create a platform where talent meets opportunity, fostering innovation,
              creativity, and cultural exchange among students from across the nation.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              We aim to provide an unforgettable experience that celebrates the diverse talents of our
              participants while upholding the rich legacy of BIT Mesra.
            </p>
          </div>
        </motion.div>

        {/* Timeline Section */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-pink-500">
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-violet-500/50 to-pink-500/50"></div>
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
              >
                <div className={`${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="text-4xl font-bold text-violet-400 mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">{milestone.title}</h3>
                    <p className="text-gray-400">{milestone.description}</p>
                  </div>
                </div>
                <div className={`hidden md:block ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-6">Be Part of the Legacy</h2>
          <p className="text-xl text-gray-400 leading-relaxed mb-12">
            Join us in celebrating talent, innovation, and culture at BIT Mesra's flagship festival.
            Create memories that will last a lifetime.
          </p>
          <a
            href="/tickets"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 text-white font-medium text-lg hover:from-violet-600 hover:to-pink-600 transition-all duration-200"
          >
            Get Your Pass Now
          </a>
        </motion.div>
      </div>
    </div>
  );
}
