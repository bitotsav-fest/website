"use client";

import Image from "next/image";
import { FaLinkedin, FaInstagram } from "react-icons/fa";


const developers = [
  { 
    name: "Manoj Kumar", 
    role: "Tech Team Lead", 
    img: "/developers/manoj.jpeg", 
    linkedin: "https://www.linkedin.com/in/manoj-kumar-1a3765254/", 
    instagram: "https://www.instagram.com/infinite_realm_?igsh=dW5jZHdsZzV0ZG12" 
  },
  { 
    name: "Venkat Saahit Kamu", 
    role: "Tech Team", 
    img: "/developers/saahit.jpeg", 
    linkedin: "https://www.linkedin.com/in/venkat-saahit-kamu-324204299", 
    instagram: "https://www.instagram.com/saahit_008" 
  },
  { 
    name: "Shaswat Raj", 
    role: "Tech Team", 
    img: "/developers/shaswat.jpeg", 
    linkedin: "https://www.linkedin.com/in/sh20raj/", 
    instagram: "https://instagram.com/sh20raj/" 
  },
  { 
    name: "Mritunjay Raj", 
    role: "Tech Team", 
    img: "/developers/mrityunjay.jpeg", 
    linkedin: "https://in.linkedin.com/in/mrityunjay-raj-75808b1b6", 
    instagram: "https://instagram.com/notmrityunjay" 
  },
  { 
    name: "Abhinav Kumar Choudhary", 
    role: "Tech Team", 
    img: "/developers/abhinav.jpeg", 
    linkedin: "https://www.linkedin.com/in/abhinav-kumar-choudhary-784062288", 
    instagram: "https://www.instagram.com/poetry_aficionado" 
  },
  { 
    name: "Raghav Bajaj", 
    role: "Tech Team", 
    img: "/developers/raghav.jpeg", 
    linkedin: "https://www.linkedin.com/in/raghavbajaj11", 
    instagram: "https://www.instagram.com/raghav.b_11" 
  },
  { 
    name: "Aniket Gupta", 
    role: "Tech Team", 
    img: "/developers/aniket.jpeg", 
    linkedin: "https://in.linkedin.com/in/aniket-gupta-726903309", 
    instagram: "https://www.instagram.com/anikett_guptaa" 
  },
  { 
    name: "Vaibhav Anand Singh", 
    role: "Tech Team", 
    img: "/developers/vaibhav.jpeg", 
    linkedin: "https://www.linkedin.com/in/vaibhav-anand-singh-412604299", 
    instagram: "https://www.instagram.com/vaibhavanand.singh" 
  },
  { 
    name: "Kunal Kashyap", 
    role: "Tech Team", 
    img: "/developers/kunal.jpeg", 
    linkedin: "https://www.linkedin.com/in/kunal-kashyap-577025256/", 
    instagram: "https://www.instagram.com/kunal_kashyap_1522" 
  },
  { 
    name: "Arya Chakraborty", 
    role: "Tech Team", 
    img: "/developers/arya.jpeg", 
    linkedin: "https://linkedin.com/in/aryachakraborty/", 
    instagram: "https://instagram.com/aryach05/" 
  },
  { 
    name: "Rishabh Anand", 
    role: "Tech Team", 
    img: "/developers/rishabh.jpeg", 
    linkedin: "https://www.linkedin.com/in/rishabh-anand-014579324", 
    instagram: "https://www.instagram.com/risha_x_102" 
  },
  { 
    name: "Sarthak Singh", 
    role: "Tech Team", 
    img: "/developers/sarthak.jpeg", 
    linkedin: "https://www.linkedin.com/in/sarthak-singh-b44466298/", 
    instagram: "https://www.instagram.com/sarthak_singh613/" 
  },
  { 
    name: "Deepak Pradhan", 
    role: "Tech Team", 
    img: "/developers/deepak.jpeg", 
    linkedin: "https://www.linkedin.com/in/deepakpradhan10242/", 
    instagram: "https://www.instagram.com/i_d_pradhan" 
  },
  { 
    name: "Priyanshu Agrahari", 
    role: "Tech Team", 
    img: "/developers/priyanshu.jpeg", 
    linkedin: "https://www.linkedin.com/in/priyanshu-agrahari-a838a024a", 
    instagram: "https://www.instagram.com/priyanshu_agrahari91" 
  }
];



export default function DevelopersPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center py-20 px-5 bg-[#0A0118] overflow-hidden">
      
      {/* Heading */}
      <h1 className="text-6xl md:text-7xl text-center font-bold tracking-tight mb-10 sm:mb-12">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-pink-500 to-orange-500">
             Developers Team
            </span>
          </h1>


      {/* Developer Cards */}
      <div className="relative z-10 max-w-7xl w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 place-items-center">
          {developers.map((dev, index) => (
            <div
            key={index}
            className="relative w-[98%] max-w-[350px] sm:max-w-none rounded-[2rem] overflow-hidden h-full flex flex-col group hover:scale-105 transition-transform duration-300 ease-in-out"
          >
          
              
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/30 via-pink-600/30 to-orange-600/30 rounded-[2rem] blur-xl transform rotate-1 pointer-events-none"></div>

              
              <div className="relative backdrop-blur-xl bg-black/40 border border-white/10 rounded-[2rem] p-8 md:p-12 overflow-hidden h-full flex flex-col justify-between shadow-[0_4px_30px_rgba(255,255,255,0.1)] group-hover:shadow-[0_8px_40px_rgba(255,255,255,0.2)] transition-shadow duration-300">
                
                {/* Profile Image */}
                <div className="w-40 h-40 sm:w-44 sm:h-44 mx-auto mb-6 relative">
                  <Image
                    src={dev.img}
                    alt={`Profile picture of ${dev.name}`}
                    layout="fill"             
                    objectFit="cover"
                    className="rounded-full border-4 border-white/30"
                  />
                </div>

                {/* Name & Role */}
                <div className="flex flex-col items-center flex-grow">
                  <h3 className="text-2xl font-semibold text-white text-center">{dev.name}</h3>
                  <p className="text-lg text-white/80 text-center">{dev.role}</p>
                </div>

                {/* Social Icons */}
                <div className="flex justify-center gap-4 mt-4 relative z-10">
                  <a href={dev.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="text-white hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-110" size={26} />
                  </a>
                  <a href={dev.instagram} target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="text-white hover:text-pink-500 transition duration-300 ease-in-out transform hover:scale-110" size={26} />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}