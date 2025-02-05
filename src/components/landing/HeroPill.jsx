"use client";
import { HeroPill } from "@/components/ui/hero-pill";

export function HeroPillFirst() {
  return (
    <HeroPill
      href="https://www.linkedin.com/company/bitotsavbitmesra"
      label="Bitotsav 2025 Announced"
      announcement="📣 Announcement"
      isExternal
      className="my-4 bg-[hsl(187,80.8%,34.7%)]/20 ring-[hsl(210,40%,96.1%)] [&_div]:bg-[hsl(210,40%,96.1%)] [&_div]:text-[hsl(187,80.8%,34.7%)] [&_p]:text-[hsl(187,80.8%,34.7%)] [&_svg_path]:fill-[hsl(187,80.8%,34.7%)]"
    />
  );
}

export function HeroPillSecond() {
  return (
    <HeroPill
      href="https://www.linkedin.com/company/bitotsavbitmesra"
      label="Early Bird Registration Open"
      announcement="🎟️ New"
      isExternal
    />
  );
}
