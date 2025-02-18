"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Calendar, MapPin, Clock } from 'lucide-react';

export default function DashboardPage() {
  // Mock user data - replace with actual user data from Clerk
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    ticketType: 'All-Access Festival Pass',
    ticketId: 'BIT2025-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    purchaseDate: new Date().toLocaleDateString(),
    avatar: '/avatar-placeholder.png'
  };

  const eventDetails = {
    date: 'March 15-17, 2025',
    venue: 'BIT Mesra Campus',
    time: '9:00 AM onwards'
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0A0118] py-20 px-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-pink-500 to-orange-500">
            Your Festival Pass
          </h1>
          <p className="text-gray-400">Get ready for an amazing experience!</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid gap-8"
        >
          {/* Ticket Card */}
          <Card className="border-0 bg-black/40 backdrop-blur-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-pink-600/10 to-orange-600/10"></div>
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-violet-500/20">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl text-white">{user.name}</CardTitle>
                    <CardDescription className="text-gray-400">{user.email}</CardDescription>
                  </div>
                </div>
                <Badge className="bg-gradient-to-r from-violet-500 to-pink-500 text-white border-0">
                  VIP Access
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">{user.ticketType}</h3>
                  <div className="grid gap-3">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar className="w-4 h-4 text-violet-400" />
                      <span>{eventDetails.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin className="w-4 h-4 text-violet-400" />
                      <span>{eventDetails.venue}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="w-4 h-4 text-violet-400" />
                      <span>{eventDetails.time}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Ticket ID</div>
                  <div className="font-mono text-white bg-white/5 rounded-lg px-3 py-2">
                    {user.ticketId}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center p-4 bg-white rounded-xl">
                <QRCodeSVG
                  value={user.ticketId}
                  size={180}
                  level="H"
                  includeMargin={true}
                />
              </div>
            </CardContent>
          </Card>

          {/* Event Access Card */}
          <Card className="border-0 bg-black/40 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg text-white">Your Access Includes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {[
                  { icon: Sparkles, text: "VIP Access to All Events" },
                  { icon: Calendar, text: "3 Days Full Access" },
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
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}