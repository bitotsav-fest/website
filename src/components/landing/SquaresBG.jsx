"use client";

import { Squares } from "@/components/ui/squares-background";
import { Sponsors } from "./Sponsors";

export function SquaresDemo() {
  return (
    <div className="space-y-8">
      <div className="relative h-[400px] rounded-lg overflow-hidden bg-[#060606]">
        <Squares
          direction="diagonal"
          speed={0.5}
          squareSize={40}
          borderColor="#333"
          hoverFillColor="#222"
        />
        <div className=" absolute top-0 right-0 w-full">
          <Sponsors />
        </div>
      </div>
    </div>
  );
}
