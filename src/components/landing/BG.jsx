'use client'
import { useTheme } from "next-themes"
import { Waves } from "@/components/ui/waves-background"
import { Button } from "@/components/ui/button"

function BitotsavHero() {
  const { theme } = useTheme()
  
  return (
    <div className="relative w-full h-screen bg-background/80 overflow-hidden">
      <div className="absolute inset-0">
        <Waves
          lineColor={theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"}
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
        <h1 className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Bitotsav 2024
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-8">
          Experience the fusion of technology and creativity at BIT Mesra's premier techno-cultural festival.
        </p>
        <div className="space-x-4">
          <Button size="lg" variant="default">Register Now</Button>
          <Button size="lg" variant="outline">Learn More</Button>
        </div>
      </div>
    </div>
  )
}

export { BitotsavHero }