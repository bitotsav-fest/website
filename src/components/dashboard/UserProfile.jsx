'use client';

import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getRollNoFromEmail, getYearFromEmail } from '@/lib/email';

export default function UserProfile({ user }) {
  const rollNo = getRollNoFromEmail(user.email);
  const year = getYearFromEmail(user.email);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden relative">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-pink-600/10 to-orange-600/10 animate-gradient-x"></div>
        
        {/* Glowing border effect */}
        <div className="absolute inset-0 border border-white/20 rounded-lg shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]"></div>
        
        <CardHeader className="relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 ring-2 ring-violet-500/20 ring-offset-2 ring-offset-black/40 transition-all duration-300 hover:ring-violet-500/40">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-violet-500 to-pink-500 text-white text-lg">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-violet-400">
                  {user.name}
                </CardTitle>
                <CardDescription className="text-gray-400 font-medium">
                  {user.email}
                </CardDescription>
                <div className="flex gap-3">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="text-sm font-medium"
                  >
                    <span className="text-gray-500">Roll No:</span>
                    <span className="ml-1 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">{rollNo}</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="text-sm font-medium"
                  >
                    <span className="text-gray-500">Year:</span>
                    <span className="ml-1 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">20{year}</span>
                  </motion.div>
                </div>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-violet-900 to-pink-500 text-white border-0 shadow-lg shadow-violet-500/20 px-4 py-1.5 text-sm font-semibold tracking-wide animate-pulse relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent before:animate-[shine_1.5s_ease-in-out_infinite]">
              VIP Access
            </Badge>
          </motion.div>
        </CardHeader>
        
        <CardContent className="relative space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <div className="text-sm text-gray-400 font-medium mb-1.5">Ticket ID</div>
            <div className="font-mono text-lg text-white bg-white/5 p-3 rounded-lg border border-white/10 backdrop-blur-sm break-all">
              {user.ticketId}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="pt-2"
          >
            <div className="text-sm text-gray-400 font-medium mb-1.5">Ticket Type</div>
            <div className="text-white font-medium">{user.ticketType}</div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}