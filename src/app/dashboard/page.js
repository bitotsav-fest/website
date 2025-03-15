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

export default function DashboardPage() {
  const { data: session } = useSession();
  const [userUUID, setUserUUID] = useState('');

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
    purchaseDate: new Date().toLocaleDateString(),
    avatar: session?.user?.image || '/avatar-placeholder.png'
  };

  const eventDetails = {
    date: 'March 21-23, 2025',
    venue: 'BIT Mesra Campus',
    time: '9:00 AM onwards'
  };

  return (
    <div className="min-h-screen mt-20 relative overflow-hidden bg-gradient-to-br from-[#0A0118] via-[#1A0B2E] to-[#1F1033] py-8 px-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>

      <div className="max-w-5xl mx-auto relative">
        {/* Logout Button */}
        <div className="absolute top-0 right-0 z-10">
          <Button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="bg-white/10 hover:bg-white/20 text-white flex items-center gap-2 backdrop-blur-sm border border-white/10 shadow-lg"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Welcome Message */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-pink-500 to-orange-500 mb-2"
            >
              Welcome, {user.name}!
            </motion.h1>
            <p className="text-gray-400">Your festival journey begins here</p>
          </div>

          {/* User Profile */}
          <UserProfile user={user} />

          {/* Event Details and QR Ticket Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <EventDetails eventDetails={eventDetails} />
            <QRTicket ticketId={user.ticketId} />
          </div>

          {/* BIT Mesra Student Popup */}
          <BitMesraPopup email={user.email} />
        </motion.div>
      </div>
    </div>
  );
}