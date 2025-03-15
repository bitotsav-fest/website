"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useSession, signOut } from "next-auth/react";
import { encript } from '@/lib/security';
import { getUserUUID } from '@/app/actions/auth';
import UserProfile from '@/components/dashboard/UserProfile';
import EventDetails from '@/components/dashboard/EventDetails';
import QRTicket from '@/components/dashboard/QRTicket';
import BitMesraPopup from '@/components/dashboard/BitMesraPopup';
import { isBitEmail } from '@/lib/email';
import { redirect } from 'next/navigation';

export default function DashboardPage() {
  const { data: session } = useSession();
  const [userUUID, setUserUUID] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('-');

  useEffect(() => {
    setPurchaseDate(new Date().toLocaleDateString());
  }, []);

  useEffect(() => {
    const fetchUserUUID = async () => {
      if (session?.user?.email) {
        try {
          const uuid = await getUserUUID();
          setUserUUID(encript(uuid));
        } catch (error) {
          console.error('Error fetching UUID:', error);
        }
      }
    };
    fetchUserUUID();
  }, [session]);

  const user = {
    name: session?.user?.name || 'Guest',
    email: session?.user?.email || 'No email',
    ticketType: 'All-Access Festival Pass',
    ticketId: userUUID || 'Loading...',
    purchaseDate: purchaseDate,
    avatar: session?.user?.image || '/avatar-placeholder.png'
  };

  if(!isBitEmail(user.email))
  {
    redirect('/dashboard/non-bit')
  }

  const eventDetails = {
    date: 'March 21-23, 2025',
    venue: 'BIT Mesra Campus',
    time: '9:00 AM onwards'
  };

  return (
    <div className="min-h-screen mt-16 relative overflow-hidden bg-gradient-to-br from-[#1A1A1A] via-[#2A1B3D] to-[#382952] py-12 px-6">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none mix-blend-overlay"></div>
      <div className="absolute top-0 -left-4 w-[500px] h-[500px] bg-gradient-to-r from-amber-500/20 to-purple-500/20 rounded-full mix-blend-normal filter blur-[120px] opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 -right-4 w-[500px] h-[500px] bg-gradient-to-l from-violet-500/20 to-pink-500/20 rounded-full mix-blend-normal filter blur-[120px] opacity-30 animate-pulse animation-delay-2000"></div>
      <div className="max-w-6xl mx-auto relative">
        {/* Enhanced Logout Button */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute top-0 right-0 z-10"
        >
          <Button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="bg-white/5 hover:bg-white/10 text-white flex items-center gap-2 backdrop-blur-md border border-white/10 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-purple-500/20"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          {/* Enhanced Welcome Message */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-violet-400 to-purple-500 mb-3 tracking-tight">
              Welcome, {user.name}!
            </h1>
            <p className="text-gray-400 text-lg">Your premium festival experience awaits</p>
          </motion.div>

          {/* Enhanced Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <QRTicket ticketId={user.ticketId} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <UserProfile user={user} />
            </motion.div>
          </div>

          {/* BitMesra Popup with Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <BitMesraPopup email={user.email} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}