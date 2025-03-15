'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function UserProfile({ user }) {
  return (
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
      <CardContent>
        <div className="text-sm text-gray-400 mb-2">Ticket ID</div>
        <div className="font-mono text-white text-lg">{user.ticketId}</div>
      </CardContent>
    </Card>
  );
}