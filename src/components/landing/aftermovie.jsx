"use client";
import React, { useEffect, useRef, useState } from "react";

export default function AfterMovie() {
  const videoRef = useRef(null);
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlayVideo(true);
        } else {
          setPlayVideo(false);
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={videoRef} className="text-[#F6F1E2] px-6 pt-16 pb-24">
      <div className="max-w-5xl mx-auto">
      <h2 className="text-4xl font-extrabold uppercase mb-4">Bitotsav'24 : Official Aftermovie</h2>
      <div className="w-16 h-2 bg-[#EFCA4E] mb-8"></div>
        <div className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-lg">
          {playVideo && (
            <iframe
              className="w-full aspect-video"
              src="https://www.youtube.com/embed/e_BtgfaWTNs?start=2&autoplay=1&mute=1"
              title="Bitotsav '24 After Movie"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </section>
  );
}
