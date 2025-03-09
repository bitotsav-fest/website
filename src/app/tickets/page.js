"use client";
import React from 'react';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Star, Gift, Music } from 'lucide-react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
 
export default function TicketPage() {

  const handleGetPass = async () => {
    redirect('/login');
  };

  const [timeLeft, setTimeLeft] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const artistRevealDate = new Date('2025-03-15'); // Example date for artist reveal
      const difference = artistRevealDate - new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0A0118]">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative pt-24 px-4 pb-16 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#EFCA4E] via-[#F6F1E2] to-[#EFCA4E]">
              Bitotsav <span className="dw decoration-fuchsia-500">2025</span>
            </span>
          </h1>
          <p className="text-2xl text-gray-400 max-w-2xl mx-auto">
            Where Technology Meets Culture
          </p>
        </motion.div>

        {/* Premium Ticket Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-4xl mx-auto mb-24"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#EFCA4E]/30 via-[#F6F1E2]/30 to-[#EFCA4E]/30 rounded-[2rem] blur-xl transform rotate-1"></div>
          <div className="relative backdrop-blur-xl bg-black/40 border border-white/10 rounded-[2rem] p-8 md:p-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-[url('/ticket-pattern.svg')] opacity-[0.03]"></div>
            
            <div className="flex flex-col md:flex-row gap-12">
              <div className="flex-1 space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4">All-Access Festival Pass</h2>
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#EFCA4E]/10 to-[#F6F1E2]/10 border border-[#EFCA4E]/20">
                    <Sparkles className="w-4 h-4 mr-2 text-[#EFCA4E]" />
                    <span className="text-[#F6F1E2] text-sm font-medium">Premium Experience</span>
                  </div>
                </div>

                <div className="grid gap-4">
                  {[
                    { icon: Star, text: "VIP Access to All Events" },
                    { icon: Music, text: "Exclusive Night Concerts" },
                    { icon: Calendar, text: "3 Days Full Access" },
                    { icon: Gift, text: "Limited Edition Merch Pack" },
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <item.icon className="w-5 h-5 text-violet-400" />
                      <span>{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-[#EFCA4E]/10 to-transparent border border-[#EFCA4E]/20">
                    <div className="text-sm text-[#EFCA4E] mb-2">Outside Students</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-[#F6F1E2]">₹1500</span>
                      <span className="text-[#EFCA4E]">early bird</span>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-gradient-to-br from-[#F6F1E2]/10 to-transparent border border-[#F6F1E2]/20">
                    <div className="text-sm text-[#F6F1E2] mb-2">BIT Mesra Students</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-[#F6F1E2]">FREE</span>
                      <span className="text-[#F6F1E2]">with ID</span>
                    </div>
                  </div>
                  
                  <RainbowButton 
                    className="w-full py-4 text-lg font-medium"
                    onClick={handleGetPass}
                  >
                    Get Your Pass Now
                  </RainbowButton>

                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Artist Reveal Countdown */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#EFCA4E] via-[#F6F1E2] to-[#EFCA4E]">
            Artist Lineup Reveal
          </h2>
          
          <div className="flex justify-center gap-6">
            {Object.entries(timeLeft).map(([unit, value], index) => (
              <motion.div
                key={unit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-24 h-24 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center"
              >
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                  {value}
                </div>
                <div className="text-sm text-gray-400 capitalize">{unit}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Event Schedule */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-center mb-12">Event Schedule</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {['Cultural Extravaganza', 'Art & Innovation', 'Grand Finale'].map((day, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-6 text-violet-300">Day {i + 1} - {day}</h3>
                <ul className="space-y-4">
                  {/* ... existing schedule items ... */}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why Choose Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-6">Why Choose Bitotsav?</h2>
          <p className="text-xl text-gray-400 leading-relaxed mb-12">
            Join us for an unforgettable celebration of talent, technology, and culture. 
            Create memories that will last a lifetime at BIT Mesra&nbsp;s flagship festival.
          </p>
          <RainbowButton className="px-12 py-4 text-lg">
            Secure Your Spot Now
          </RainbowButton>
        </motion.div>
      </div>
    </div>
  );
}
