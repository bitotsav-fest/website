"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const QrScanner = dynamic(() => import('@yudiel/react-qr-scanner').then(mod => mod.Scanner), {
  ssr: false
});

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import { decript } from '@/lib/security';
import { verifyTicket } from '@/app/actions/verify-ticket';
import Stats from './stats/page';

// Configure which day to verify (0 for Day Zero, 1 for Day One, 2 for Day Two, 3 for Day Three)
const VERIFY_DAY = 0;
const DAY_FIELD_MAP = {
  0: 'usedOnDay0',
  1: 'usedOnDay1',
  2: 'usedOnDay2',
  3: 'usedOnDay3'
};

export default function ScannerPage() {
  const [scanning, setScanning] = useState(true);
  const [userData, setUserData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [showPasscodeError, setShowPasscodeError] = useState(false);

  const SECURITY_PASSCODE = '192020';

  const handlePasscodeSubmit = (e) => {
    e.preventDefault();
    if (passcode === SECURITY_PASSCODE) {
      setIsAuthenticated(true);
    } else {
      setShowPasscodeError(true);
      setTimeout(() => setShowPasscodeError(false), 3000);
    }
  };

  const handleScan = async (data) => {
    if (data) {
      setScanning(false);
      try {
        const decryptedData = decript(data[0].rawValue);
        const result = await verifyTicket(decryptedData, SECURITY_PASSCODE, VERIFY_DAY);

        if (result.error) {
          setShowError(true);
          setUserData({ error: result.error });
          setTimeout(() => setShowError(false), 3000);
        } else {
          setUserData(result.user);
          const dayField = DAY_FIELD_MAP[VERIFY_DAY];
          if (!result.user[dayField]) {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
          }
        }
      } catch (error) {
        setShowError(true);
        setUserData({ error: 'Invalid QR code' });
        setTimeout(() => setShowError(false), 3000);
      }
    }
  };

  const resetScan = () => {
    setScanning(true);
    setUserData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0118] via-[#1A0B2E] to-[#1F1033] flex items-center flex-col justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card className="bg-black/20 backdrop-blur-xl border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-6">
              {!isAuthenticated ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <motion.h2 
                      className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      Enter Passcode
                    </motion.h2>
                    <p className="text-gray-400 mt-2 text-sm">Please enter the security passcode to access the scanner</p>
                  </div>
                  <form onSubmit={handlePasscodeSubmit} className="space-y-4">
                    <input
                      type="password"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-violet-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-violet-500/50 transition-colors"
                      placeholder="Enter passcode"
                      required
                    />
                    <Button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white shadow-lg shadow-violet-900/20"
                    >
                      Verify
                    </Button>
                  </form>
                  {showPasscodeError && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-400 text-center text-sm"
                    >
                      Invalid passcode. Please try again.
                    </motion.div>
                  )}
                </motion.div>
              ) : scanning ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <motion.h2 
                      className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      Scan QR Code
                    </motion.h2>
                    <p className="text-gray-400 mt-2 text-sm">Position the QR code within the frame</p>
                  </div>
                  <motion.div 
                    className="relative overflow-hidden rounded-2xl border-2 border-violet-500/20"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                  >
                    <div className="aspect-square w-full">
                      <QrScanner
                        onScan={handleScan}
                        scanDelay={500}
                        constraints={{
                          facingMode: 'environment'
                        }}
                        containerStyle={{
                          width: '100%',
                          height: '100%',
                          padding: 0,
                          border: 'none'
                        }}
                        videoStyle={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 border-2 border-violet-500/30 rounded-2xl pointer-events-none" />
                  </motion.div>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    {userData && (
                      <div className="space-y-6">
                        <div className="text-center">
                          <h3 className="text-xl font-semibold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                            Scan Result
                          </h3>
                        </div>
                        {userData.error ? (
                          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-400 text-center">
                            {userData.error}
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="bg-violet-500/10 border border-violet-500/20 p-4 rounded-xl space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-gray-400">Name</span>
                                <span className="text-white font-medium">{userData.name}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-400">Email</span>
                                <span className="text-white font-medium">{userData.email}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-400">Status</span>
                                <div className="flex items-center gap-2">
                                  {userData[DAY_FIELD_MAP[VERIFY_DAY]] ? (
                                    <span className="text-emerald-800 font-medium">✅ Already Used (valid)</span>
                                  ) : (
                                    <span className="text-emerald-400 font-medium flex items-center gap-2">
                                      Valid
                                      <Check className="w-4 h-4" />
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        <Button 
                          onClick={resetScan} 
                          className="w-full bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white shadow-lg shadow-violet-900/20"
                        >
                          Scan Another
                        </Button>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              )}
            </CardContent>
          </Card>

          {/* Success Animation */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
              >
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-full p-8 shadow-2xl shadow-emerald-900/20">
                  <Check className="w-16 h-16 text-white" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Animation */}
          <AnimatePresence>
            {showError && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
              >
                <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-full p-8 shadow-2xl shadow-red-900/20">
                  <X className="w-16 h-16 text-white" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      {/* <Stats /> */}
    </div>
  );
}
// when the qr is is used already then also show the la