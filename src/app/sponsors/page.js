"use client";

import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Sponsors = () => {
  const sponsorRef = useRef(null);

  useEffect(() => {
    AOS.init({
      once: false,
      duration: 500,
      easing: "ease-in-out",
    });

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("aos-animate");
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    if (sponsorRef.current) {
      observer.observe(sponsorRef.current);
    }

    return () => {
      if (sponsorRef.current) {
        observer.unobserve(sponsorRef.current);
      }
    };
  }, []);

  const sponsors = [
    {
      name: "Jharkhand Tourism - Title Sponsor",
      image: "/sponsors/JharkhandTourism.png",
    },
    {
      name: "CMPDI",
      image: "/sponsors/Cmpdi.png",
    },
    {
      name: "SBI - Banking Partner",
      image: "/sponsors/SBI.png",
    },
    {
      name: "RedBull",
      image: "/sponsors/Red-Bull.png",
    },
    {
      name: "Nestle",
      image: "/sponsors/Nestle.png",
    },
    {
      name: "Frostive",
      image: "/sponsors/Frostive.png",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen text-white pb-4 mt-6 sm:mt-12 mb-4 px-6 sm:px-4"
      style={{ backgroundColor: "#0A0118" }}
      ref={sponsorRef}
    >
      <div className="container mx-auto pt-6 sm:pt-10 md:pt-10">
        {/* Heading */}
        <h1 className="text-6xl md:text-7xl text-center font-bold tracking-tight mb-10 sm:mb-12">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-pink-500 to-orange-500">
             Past Sponsors
            </span>
          </h1>


        {/* Sponsor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 sm:gap-12 lg:gap-14">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className="sponsor relative flex flex-col items-center justify-center group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              style={{
                animation: `slide-in 0.5s ease-out ${index * 0.2}s forwards`,
                opacity: 0,
                transform: "translateY(-50px)",
              }}
            >
              {/* Sponsor Image */}
              <div className="rounded-[16px] sm:rounded-[20px] mb-5 overflow-hidden relative transition-all duration-300 hover:shadow-glow w-[82%] sm:w-[78%] lg:w-[88%] xl:w-[92%]">
                <img
                  src={sponsor.image}
                  alt={sponsor.name}
                  className="rounded-[16px] sm:rounded-[20px] hover:scale-105 transition-transform duration-300 w-full h-auto"
                />
              </div>
              <p className="text-white font-semibold text-center text-base sm:text-lg md:text-xl mt-2 sm:mt-3">
                {sponsor.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS for Gradient */}
      <style jsx>{`
        .hover\:shadow-glow:hover {
          box-shadow: 0 0 20px 5px rgba(124, 58, 237, 0.2), /* Violet */
                      0 0 20px 10px rgba(236, 72, 153, 0.2), /* Pink */
                      0 0 20px 15px rgba(249, 115, 22, 0.2); /* Orange */
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Sponsors;
