'use client';

import { Card, CardContent } from '@/components/ui/card';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import Image from 'next/image';

export default function QRTicket({ ticketId }) {
  const downloadTicket = async () => {
    const ticketElement = document.getElementById('event-ticket');
    if (!ticketElement) return;

    try {
      const canvas = await html2canvas(ticketElement);
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'bitotsav-ticket.png';
      link.click();
    } catch (error) {
      console.error('Error downloading ticket:', error);
    }
  };

  return (
    <Card className="border-0 bg-black/40 backdrop-blur-xl overflow-hidden relative group hover:bg-black/50 transition-all duration-500 shadow-[0_0_50px_rgba(251,191,36,0.3)]">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardContent 
        id="event-ticket"
        className="flex flex-col items-center justify-between p-8 rounded-xl backdrop-blur-sm min-h-[500px] relative z-10"
      >
        {/* Event Title */}
        <div className="text-center mb-6 transform transition-all duration-300 hover:scale-105">
          <div className="relative w-80 h-32 mb-2">
            <img
              src="/logo.png"
              alt="BITOTSAV'25"
              className="object-contain brightness-150 contrast-150 animate-pulse"
            />
          </div>
          <p className="text-amber-400 font-medium tracking-wider mt-4">ALL ACCESS PASS</p>
        </div>

        {/* QR Code */}
        <div className="flex-grow flex items-center justify-center my-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 blur-3xl transform group-hover:scale-110 transition-transform duration-500" />
          <QRCodeSVG
            value={ticketId}
            size={200}
            level="H"
            includeMargin={true}
            className="transform hover:scale-105 transition-transform duration-300 p-2 bg-white rounded-lg shadow-[0_0_30px_rgba(251,191,36,0.5)] relative z-10"
          />
        </div>

        {/* Event Details */}
        <div className="text-center mb-6 transform transition-all duration-300 hover:scale-105">
          <h3 className="text-2xl font-bold text-amber-400 mb-2">HASTAKSHAR</h3>
          <p className="text-amber-300 font-medium tracking-wide">March 21-23, 2025</p>
          <p className="text-amber-300">BIT Mesra, Ranchi</p>
        </div>

      </CardContent>
      {/* Download Button - Hidden when printing */}
      <Button
        onClick={downloadTicket}
        className="
          my-6 mx-auto 
          bg-gradient-to-r from-amber-400 to-yellow-500 
          hover:from-amber-500 hover:to-yellow-600 
          text-white font-semibold
          flex items-center gap-3 
          px-6 py-3
          rounded-full
          print:hidden 
          transform hover:scale-105 
          transition-all duration-300 
          shadow-[0_0_20px_rgba(251,191,36,0.3)]
          hover:shadow-[0_0_30px_rgba(251,191,36,0.5)]
          backdrop-blur-sm
          border border-amber-400/30
          group
        "
      >
        <Download className="w-5 h-5 group-hover:animate-bounce" />
        <span className="tracking-wide">Download Ticket</span>
      </Button>
    </Card>
  );
}