"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Calendar, MapPin, Clock, LogOut } from 'lucide-react';
import { useSession, signOut } from "next-auth/react";
import { Button } from '@/components/ui/button';
import { encript } from '@/lib/security';
import { getUserUUID } from '@/app/actions/auth';

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
    date: 'March 15-17, 2025',
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

          {/* Ticket Card */}
          <Card className="border-0 bg-black/40 backdrop-blur-xl overflow-hidden relative transform hover:scale-[1.02] transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-pink-600/20 to-orange-600/20"></div>
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 border-2 border-violet-500/20 ring-2 ring-violet-500/10 ring-offset-2 ring-offset-black/40">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl text-white">{user.name}</CardTitle>
                    <CardDescription className="text-gray-400">{user.email}</CardDescription>
                  </div>
                </div>
                <Badge className="bg-gradient-to-r from-violet-500 to-pink-500 text-white border-0 shadow-lg shadow-violet-500/20">
                  VIP Access
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">{user.ticketType}</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center gap-3 text-gray-300 bg-white/5 rounded-lg p-3 backdrop-blur-sm">
                      <Calendar className="w-5 h-5 text-violet-400" />
                      <span>{eventDetails.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300 bg-white/5 rounded-lg p-3 backdrop-blur-sm">
                      <MapPin className="w-5 h-5 text-violet-400" />
                      <span>{eventDetails.venue}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300 bg-white/5 rounded-lg p-3 backdrop-blur-sm">
                      <Clock className="w-5 h-5 text-violet-400" />
                      <span>{eventDetails.time}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-sm text-gray-400 mb-2">Ticket ID</div>
                  <div className="font-mono text-white text-lg">
                    {user.ticketId}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-xl backdrop-blur-sm">
                <QRCodeSVG
                  value={user.ticketId}
                  size={200}
                  level="H"
                  includeMargin={true}
                  className="transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </CardContent>
          </Card>

          {/* Event Access Card */}
          <Card className="border-0 bg-black/40 backdrop-blur-xl transform hover:scale-[1.02] transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-violet-400" />
                Your Access Includes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {[
                  { icon: Sparkles, text: "VIP Access to All Events", description: "Including exclusive areas and special performances" },
                  { icon: Calendar, text: "3 Days Full Access", description: "Complete festival experience from start to finish" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 bg-white/5 rounded-lg p-4 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300"
                  >
                    <item.icon className="w-6 h-6 text-violet-400 mt-1" />
                    <div>
                      <div className="text-white font-medium">{item.text}</div>
                      <div className="text-sm text-gray-400">{item.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}