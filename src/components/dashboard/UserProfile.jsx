'use client';

import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getRollNoFromEmail, getYearFromEmail } from '@/lib/email';
import { getUser } from '@/app/dashboard/actions/getUser';
import { useEffect, useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { signOut } from 'next-auth/react';
import axios from 'axios';

export default  function UserProfile({ user }) {
  const rollNo = getRollNoFromEmail(user.email);
  const year = getYearFromEmail(user.email);
const [userData, setUserData] = useState(null);

useEffect(() => {
  const fetchUserData = async () => {
    const data = await getUser(user.email);
    setUserData(data);
  };
  
  fetchUserData();
}, [user.email]);
  return (
    <>
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

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="pt-4"
          >
            <div className="text-sm text-gray-400 font-medium mb-2">Ticket Usage Status</div>
            <div className="flex gap-3">
              <Badge 
                className={`px-3 py-1 ${userData?.usedOnDay1 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-gray-500/20 text-gray-400'} border-0`}
              >
                Day 1 {userData?.usedOnDay1 ? '✓' : '○'}
              </Badge>
              <Badge 
                className={`px-3 py-1 ${userData?.usedOnDay2 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-gray-500/20 text-gray-400'} border-0`}
              >
                Day 2 {userData?.usedOnDay2 ? '✓' : '○'}
              </Badge>
              <Badge 
                className={`px-3 py-1 ${userData?.usedOnDay3 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-gray-500/20 text-gray-400'} border-0`}
              >
                Day 3 {userData?.usedOnDay3 ? '✓' : '○'}
              </Badge>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>

    <div className="flex flex-col gap-4 mt-6">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => signOut({ callbackUrl: '/' })}
        className="w-full px-4 py-2 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg border border-white/10 transition-all duration-300 flex items-center justify-center gap-2"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </motion.button>

      {/* <AlertDialog>
        <AlertDialogTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-medium rounded-lg border border-red-500/20 transition-all duration-300"
          >
            Delete Account
          </motion.button>
        </AlertDialogTrigger>
      <AlertDialogContent className="bg-black/90 border border-white/10 backdrop-blur-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            This action cannot be undone. This will permanently delete your account and remove all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-white/5 hover:bg-white/10 text-white border border-white/10">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20"
            onClick={async () => {
              try {
                await axios.delete('/api/user/delete');
                signOut({ callbackUrl: '/' });
              } catch (error) {
                console.error('Error deleting account:', error);
                alert('Failed to delete account. Please try again.');
              }
            }}
          >
            Delete Account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog> */}
    </div>
    </>
  );
}

 