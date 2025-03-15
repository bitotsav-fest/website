'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Clock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EventDetails({ eventDetails }) {
  return (
    <div className="space-y-8">
      <Card className="border-0 bg-black/40 backdrop-blur-xl overflow-hidden relative">
        <CardContent className="pt-6">
          <div className="grid gap-4">
            <div className="flex items-center gap-3 text-gray-300 bg-white/5 rounded-lg p-3 backdrop-blur-sm">
              <Calendar className="w-5 h-5 text-violet-400" />
              <span>{eventDetails.date}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300 bg-white/5 rounded-lg p-3 backdrop-blur-sm">
              <MapPin className="w-5 h-5 text-violet-400" />
              <span>{eventDetails.venue}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300 bg-white/5 rounded-lg p-3 backdrop-blur-sm">
              <Clock className="w-5 h-5 text-violet-400" />
              <span>{eventDetails.time}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 bg-black/40 backdrop-blur-xl transform hover:scale-[1.02] transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-violet-400" />
            Your Access Includes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {[
              { icon: Sparkles, text: "VIP Access to All Events", description: "Including exclusive areas and special performances" },
              { icon: Calendar, text: "3 Days Full Access", description: "Complete festival experience from start to finish" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 bg-white/5 rounded-lg p-4 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300"
              >
                <item.icon className="w-6 h-6 text-violet-400 mt-1" />
                <div>
                  <div className="text-white font-medium">{item.text}</div>
                  <div className="text-sm text-gray-400">{item.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}