'use client';

import React from 'react';
import useSWR from 'swr';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const fetcher = url => fetch(url).then(r => r.json());

export default function StatsPage() {
  const { data: stats, error, isLoading } = useSWR('/api/stats', fetcher, {
    refreshInterval: 5000
  });

  if (error) return (
    <div className="min-h-screen flex items-center justify-center   from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <p className="text-red-400">Failed to load stats</p>
    </div>
  );

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
    </div>
  );

  const defaultStats = {
    totalUsers: 0,
    bitianCount: 0,
    outsiderCount: 0,
    paidUsersCount: 0,
    dayWiseUsage: { day1: 0, day2: 0, day3: 0 }
  };

  const currentStats = stats || defaultStats;

  return (
    <div className="min-h-screen p-4   from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        <h1 className="text-3xl font-bold text-purple-600 dark:text-purple-400 text-center mb-8">
          Bitotsav Stats
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-sm"
          >
            <p className="text-sm text-purple-600 dark:text-purple-400 mb-1">Total Users</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentStats.totalUsers}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-sm"
          >
            <p className="text-sm text-purple-600 dark:text-purple-400 mb-1">BIT Students</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentStats.bitianCount}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-sm"
          >
            <p className="text-sm text-purple-600 dark:text-purple-400 mb-1">Outsiders</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentStats.outsiderCount}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-sm"
          >
            <p className="text-sm text-purple-600 dark:text-purple-400 mb-1">Paid Users</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentStats.paidUsersCount}</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">Daily Usage</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((day) => (
              <div key={day} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Day {day}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {currentStats.dayWiseUsage[`day${day}`]}
                  </span>
                </div>
                <div className="h-2 bg-purple-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(currentStats.dayWiseUsage[`day${day}`] / currentStats.totalUsers) * 100}%`
                    }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
