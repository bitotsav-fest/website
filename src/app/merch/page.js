"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function TShirtPage() {
  const [selectedSize, setSelectedSize] = React.useState("S");
  const [selectedColor, setSelectedColor] = React.useState("black");

  const sizes = ["XXS", "XS", "S", "M", "L", "XL"];
  const colors = [
    { name: "black", hex: "#000000" },
    { name: "white", hex: "#EEEEEE" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0118] via-[#2D1E0F] to-[#1A0B2E] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-gray-900">
              <Image
                src="/merch.jpeg"
                alt="Bitotsav T-shirt"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-[#F6F1E2]">
                Oversized Tee
              </h1>
              <div className="mt-3">
                <p className="text-3xl tracking-tight text-[#EFCA4E]">₹399</p>
              </div>
              {/* <div className="mt-3">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(4)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5 text-[#EFCA4E]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="ml-2 text-sm text-gray-400">
                    See all 512 reviews
                  </p>
                </div>
              </div> */}
            </div>

            <div className="space-y-6 border-t border-gray-700 pt-6">
              {/* Description */}
              <div>
                <h3 className="text-base text-[#F6F1E2]">Description</h3>
                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-300">
                  Designed for ultimate style and comfort, the BITOTSAV'25 t-shirt is a must-have for every BITian! Made from premium-quality cotton, this t-shirt offers a relaxed, breathable fit perfect for casual wear. The minimalistic design makes it a versatile piece that can be styled in multiple ways. Pair it with your favorite jeans or shorts for a laid-back look that’s perfect for any occasion. Available in two classic colors- black and white.
                  </p>
                </div>
              </div>

              {/* Color picker */}
              <div>
                <h3 className="text-sm font-medium text-[#F6F1E2]">Color</h3>
                <div className="mt-4">
                  <div className="flex items-center space-x-3">
                    {colors.map((color) => (
                      <button
                        key={color.name}
                        className={`relative h-8 w-8 rounded-full border-2 ${selectedColor === color.name ? 'border-[#EFCA4E]' : 'border-gray-700'}`}
                        style={{ backgroundColor: color.hex }}
                        onClick={() => setSelectedColor(color.name)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Size picker */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-[#F6F1E2]">Size</h3>
                  <Link
                    href="#"
                    className="text-sm font-medium text-[#EFCA4E] hover:text-[#F6F1E2]"
                  >
                    See sizing chart
                  </Link>
                </div>

                <div className="mt-4 grid grid-cols-6 gap-4">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`flex items-center justify-center rounded-md border py-3 text-sm font-medium uppercase ${selectedSize === size ? 'border-[#EFCA4E] bg-[#EFCA4E]/10 text-[#EFCA4E]' : 'border-gray-700 text-gray-400 hover:bg-[#EFCA4E]/5'}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to cart */}
              <div className="mt-8 flex">
                <Button
                  className="w-full bg-[#EFCA4E] text-black hover:bg-[#F6F1E2]"
                  onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLScPIysmgSmrWLTGlKMsLROw4WsxqWC0b8YeWFZpqDWRys7CRw/viewform?usp=header', '_blank')}
                >
                  Buy Now
                </Button>
              </div>

              {/* Fabric & Care */}
              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-sm font-medium text-[#F6F1E2]">Fabric & Care</h3>
                <div className="mt-4 space-y-3">
                  <p className="text-sm text-gray-400">• Only the best materials</p>
                  <p className="text-sm text-gray-400">• Ethically and locally made</p>
                  <p className="text-sm text-gray-400">• Pre-washed and pre-shrunk</p>
                  <p className="text-sm text-gray-400">• Machine wash cold with similar colors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}