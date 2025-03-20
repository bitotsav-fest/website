import React from "react"
import { Parallax as SpringParallax, ParallaxLayer } from "@react-spring/parallax"

const Parallax = () => {
  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-b from-blue-900 to-black">
      <SpringParallax pages={2}>
        <ParallaxLayer offset={1} speed={0.5}>
          <img src="/sky.png" alt="Sky" className="w-[430px] h-auto object-cover" />
        </ParallaxLayer>
        <ParallaxLayer offset={1.001} speed={0.8}>
          <img src="/building.png" alt="Building" className="w-[430px] h-auto object-cover" />
        </ParallaxLayer>
        <ParallaxLayer offset={1.15} speed={1}>
          <img src="/grass.png" alt="Grass" className="w-[430px] h-auto object-cover" />
        </ParallaxLayer>
      </SpringParallax>
    </div>
  )
}

export default Parallax
