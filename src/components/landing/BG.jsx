'use client'
import { Waves } from "@/components/ui/waves-background"
import { Button } from "@/components/ui/button"

function BitotsavHero() {

  
  return (
    <div className="relative w-full h-screen bg-background/80 overflow-hidden">
      <div className="absolute inset-0">
        <Waves
          lineColor={"rgba(255, 255, 255, 0.2)"}
          backgroundColor="transparent"
          waveSpeedX={0.015}
          waveSpeedY={0.008}
          waveAmpX={50}
          waveAmpY={25}
          friction={0.95}
          tension={0.008}
          maxCursorMove={150}
          xGap={15}
          yGap={40}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-7xl font-black mb-6 animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
          Bitotsav'25
        </h1>
        <p className="text-2xl font-medium text-gray-300 max-w-3xl mb-10  ">
          🚀 Where tech meets culture in an epic showdown of creativity! 🎭
        </p>
        <div className="space-x-6">
          <Button size="lg" variant="default" className="animate-bounce">
            Join the Party! 🎉
          </Button>
          <Button size="lg" variant="outline" className="animate-pulse">
            Sneak a Peek 👀
          </Button>
        </div>
         <div className="mt-12 flex space-x-8">
          <div className="text-center">
            <p className="text-4xl font-bold text-white">50+</p>
            <p className="text-sm text-gray-400">Events</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-white">5000+</p>
            <p className="text-sm text-gray-400">Participants</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-white">₹5L+</p>
            <p className="text-sm text-gray-400">Prize Pool</p>
          </div>
        </div>
      </div>
      </div>
   )
}

export { BitotsavHero }