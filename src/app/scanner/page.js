"use client";

import React, { useState } from 'react';
import { Scanner as QrScanner } from '@yudiel/react-qr-scanner';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import { decript } from '@/lib/security';
import { verifyTicket } from '@/app/actions/verify-ticket';

export default function ScannerPage() {
  const [error, setError] = useState('');
  const [scanning, setScanning] = useState(true);
  const [scanResult, setScanResult] = useState(null);
  const [userData, setUserData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const SECURITY_PASSCODE = '192020';

  const handleScan = async (data) => {
    if (data) {
      setScanning(false);
      try {
        const decryptedData = decript(data);
        const result = await verifyTicket(decryptedData, SECURITY_PASSCODE);

        if (result.error) {
          setShowError(true);
          setUserData({ error: result.error });
          setTimeout(() => setShowError(false), 3000);
        } else {
          setUserData(result.user);
          if (!result.user.usedOnDay2) {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
          }
        }
      } catch (error) {
        console.error('Error processing QR code:', error);
        setShowError(true);
        setUserData({ error: 'Invalid QR code' });
        setTimeout(() => setShowError(false), 3000);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError('Error accessing camera');
  };

  const resetScan = () => {
    setScanning(true);
    setScanResult(null);
    setUserData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0118] via-[#1A0B2E] to-[#1F1033] p-4">
      <div className="max-w-md mx-auto pt-20">
        <div className="space-y-4">
            <Card className="bg-black/40 backdrop-blur-xl border-0">
              <CardContent className="p-6">
                {scanning ? (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white text-center mb-6">Scan QR Code</h2>
                    <QrScanner
                      onDecode={handleScan}
                      onError={handleError}
                      containerStyle={{ borderRadius: '0.5rem', overflow: 'hidden' }}
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userData && (
                      <AnimatePresence>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="space-y-4"
                        >
                          <h3 className="text-xl font-semibold text-white">Scan Result</h3>
                          {userData.error ? (
                            <div className="bg-red-500/20 p-4 rounded-lg text-white">
                              {userData.error}
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <p className="text-white">Name: {userData.name}</p>
                              <p className="text-white">Email: {userData.email}</p>
                              <p className="text-white">Status: {userData.usedOnDay2 ? 'Already Used' : 'Valid'}</p>
                            </div>
                          )}
                          <Button onClick={resetScan} className="w-full bg-violet-600 hover:bg-violet-700">
                            Scan Another
                          </Button>
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </div>
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
                  className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="bg-green-500 rounded-full p-8">
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
                  className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="bg-red-500 rounded-full p-8">
                    <X className="w-16 h-16 text-white" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
       </div>
    </div>
  );
}
