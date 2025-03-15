'use client';

import { Card, CardContent } from '@/components/ui/card';
import { QRCodeSVG } from 'qrcode.react';

export default function QRTicket({ ticketId }) {
  return (
    <Card className="border-0 bg-black/40 backdrop-blur-xl overflow-hidden relative">
      <CardContent className="flex items-center justify-center p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-xl backdrop-blur-sm">
        <QRCodeSVG
          value={ticketId}
          size={200}
          level="H"
          includeMargin={true}
          className="transform hover:scale-105 transition-transform duration-300"
        />
      </CardContent>
    </Card>
  );
}