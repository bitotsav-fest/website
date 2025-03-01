"use client";
import { useEffect, useState, useRef } from "react";

export default function About() {
  const stats = [
    { value: 20, label: "Years of Legacy" },
    { value: 10000, label: "Footfall" },
    { value: 5000, label: "Registrations" },
    { value: 100000, label: "Social Media Impressions" },
  ];

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); 
        }
      },
      { threshold: 0.3 } 
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-black text-white px-6 py-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Left Text Section */}
        <div>
          <h2 className="text-4xl font-extrabold uppercase mb-4">About Bitotsav</h2>
          <div className="w-16 h-2 bg-[#EFCA4E] mb-6"></div>
          <p className="text-lg leading-relaxed">
            BITOTSAV offers a plethora of events that not only entertain but also promote meaningful societal causes. 
            As the festival continues to grow in scale and impact, BITOTSAV 2025 is set to be bigger and more spectacular than ever!
          </p>
          <p className="text-lg leading-relaxed mt-4">
            With electrifying performances, thrilling competitions, mesmerizing celebrity nights, and an unforgettable fusion 
            of music, dance, and entertainment, we invite you to be part of BITOTSAV 2025 – where culture meets celebration.
          </p>
        </div>

        {/* Right Stats Section */}
        <div className="grid grid-cols-2 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-[#F6F1E2] text-black p-6 rounded-lg border-2 border-[#EFCA4E] shadow-lg flex flex-col items-center justify-center text-center"
            >
              
              <h3 className="text-3xl font-bold">
                {isVisible ? <Counter target={stat.value} /> : "0"}+
              </h3>
              <p className="text-lg font-medium mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}


function Counter({ target }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= target) {
          clearInterval(interval);
          return target;
        }
        return prev + Math.ceil(target / 100); 
      });
    }, 20); 

    return () => clearInterval(interval);
  }, [target]);

  return <span>{count.toLocaleString()}</span>;
}