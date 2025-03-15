"use client";

import React from "react";
import TiltedCard from "../../components/merch-card";
import MerchCard from "../../components/merch-card";
export default function Merch() {
  return (
    <div className="min-h-screen py-20 px-5 bg-gradient-to-br from-[#0A0118] via-[#2D1E0F] to-[#1A0B2E] text-[#F6F1E2]">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-6xl text-center font-bold tracking-normal mb-10 sm:mb-12 animate-fade-in">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#EFCA4E] via-[#F6F1E2] to-[#EFCA4E] animate-gradient-x">
            Bitotsav'25 Official Merchandise
          </span>
        </h1>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScPIysmgSmrWLTGlKMsLROw4WsxqWC0b8YeWFZpqDWRys7CRw/viewform?usp=header"
          target="blank"
          className="block"
        >
          <MerchCard
            imageSrc="/merch.jpeg"
            altText="Bitotsav'25 Merch"
            captionText="Buy Bitotsav'25 Merch"
            rotateAmplitude={12}
            scaleOnHover={1.1}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            draggable={false}
          />
        </a>
      </div>
    </div>
  );
}
