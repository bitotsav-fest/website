'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { isBitEmail } from '@/lib/email';

export default function BitMesraPopup({ email }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('bitMesraPopupShown');
    if (email && isBitEmail(email) && !hasSeenPopup) {
      setIsOpen(true);
      localStorage.setItem('bitMesraPopupShown', 'true');
    }
  }, [email]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md bg-black/40 backdrop-blur-xl border-0">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="w-6 h-6 text-violet-400" />
            Special Access Granted!
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-gray-300">
            As a BIT Mesra student, you're eligible for a free festival pass! Your institutional email grants you exclusive access to all events.
          </p>
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="text-violet-400 font-semibold mb-2">Your Benefits:</h4>
            <ul className="space-y-2 text-gray-300">
              <li>• Free All-Access Festival Pass</li>
              <li>• Priority Entry to Events</li>
              <li>• Special Student Privileges</li>
            </ul>
          </div>
          <Button
            onClick={() => setIsOpen(false)}
            className="w-full bg-gradient-to-r from-violet-500 to-pink-500 text-white"
          >
            Awesome, Thanks!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}