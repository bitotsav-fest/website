"use client";

import Image from "next/image";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { useState } from "react";

const developers = [
  { 
    name: "Manoj Kumar", 
    role: "Tech Team Lead", 
    img: "/developers/manoj.jpeg", 
    linkedin: "https://www.linkedin.com/in/manoj-kumar-1a3765254/", 
    instagram: "https://www.instagram.com/infinite_realm_?igsh=dW5jZHdsZzV0ZG12", 
    description: "I’m Manoj Kumar, a passionate software developer with a deep interest in AI and Machine Learning. I constantly learn and innovate, exploring diverse projects to harness technology for meaningful impact."
  },
  { 
    name: "Venkat Saahit Kamu", 
    role: "Tech Team", 
    img: "/developers/saahit.jpeg", 
    linkedin: "https://www.linkedin.com/in/venkat-saahit-kamu-324204299", 
    instagram: "https://www.instagram.com/saahit_008", 
    description: "Techy interested in development and innovation constantly improving my skills to stand out among the best. Lazy but gets the job done kinda guy."
  },
  { 
    name: "Mritunjay Raj", 
    role: "Tech Team", 
    img: "/developers/mrityunjay.jpeg", 
    linkedin: "https://in.linkedin.com/in/mrityunjay-raj-75808b1b6", 
    instagram: "https://instagram.com/notmrityunjay", 
    description: "Passionate about innovation, I enjoy building impactful projects, exploring new ideas, and taking on challenges in development, cybersecurity, and AI."
  },
  { 
    name: "Shaswat Raj", 
    role: "Tech Team", 
    img: "/developers/shaswat.jpeg", 
    linkedin: "https://www.linkedin.com/in/sh20raj/", 
    instagram: "https://instagram.com/sh20raj/", 
    description: "I am Shaswat Raj, a first-year student passionate about web development, open-source contributions, and creating impactful projects. With proficiency in JavaScript and frameworks like Next.js, I enjoy turning ideas into user-friendly digital experiences."
  },
  { 
    name: "Abhinav Kumar Choudhary", 
    role: "Tech Team", 
    img: "/developers/abhinav.jpeg", 
    linkedin: "https://www.linkedin.com/in/abhinav-kumar-choudhary-784062288", 
    instagram: "https://www.instagram.com/poetry_aficionado", 
    description: "I’m a web developer passionate about crafting intuitive user interfaces. I specialize in UI design and development, ensuring seamless user experiences with clean, responsive, and visually appealing designs."
  },
  { 
    name: "Raghav Bajaj", 
    role: "Tech Team", 
    img: "/developers/raghav.jpeg", 
    linkedin: "https://www.linkedin.com/in/raghavbajaj11", 
    instagram: "https://www.instagram.com/raghav.b_11", 
    description: "I’m an AI/ML student passionate about web development and DSA, currently exploring the MERN stack. Beyond tech, I love swimming, traveling, and adventure. Always eager to learn and explore new things."
  },
  { 
    name: "Aniket Gupta", 
    role: "Tech Team", 
    img: "/developers/aniket.jpeg", 
    linkedin: "https://in.linkedin.com/in/aniket-gupta-726903309", 
    instagram: "https://www.instagram.com/anikett_guptaa", 
    description: "Hey, it’s Aniket Gupta! I’m passionate about developing intuitive applications. With expertise in AI, ML, and web development, I create smart solutions that blend innovation with seamless user experiences."
  },
  { 
    name: "Vaibhav Anand Singh", 
    role: "Tech Team", 
    img: "/developers/vaibhav.jpeg", 
    linkedin: "https://www.linkedin.com/in/vaibhav-anand-singh-412604299", 
    instagram: "https://www.instagram.com/vaibhavanand.singh", 
    description: "I am Vaibhav Anand Singh, a 2nd-year CSE student at BIT Mesra, passionate about full-stack development, blockchain, AI, cybersecurity, and robotics, constantly exploring innovative projects and expanding my technical skills."
  },
  { 
    name: "Kunal Kashyap", 
    role: "Tech Team", 
    img: "/developers/kunal.jpeg", 
    linkedin: "https://www.linkedin.com/in/kunal-kashyap-577025256/", 
    instagram: "https://www.instagram.com/kunal_kashyap_1522", 
    description: "Tech-savvy builder with a passion for problem-solving and clean code. From competitive programming to web dev and deep-tech dreams—always working on ideas that matter and exploring new possibilities."
  },
  { 
    name: "Arya Chakraborty", 
    role: "Tech Team", 
    img: "/developers/arya.jpeg", 
    linkedin: "https://linkedin.com/in/aryachakraborty/", 
    instagram: "https://instagram.com/aryach05/", 
    description: "Hi! I'm Arya, a MERN Stack and AI/ML developer. Looking forward to collaborating on amazing projects and creating something meaningful."
  },
  { 
    name: "Rishabh Anand", 
    role: "Tech Team", 
    img: "/developers/rishabh.jpeg", 
    linkedin: "https://www.linkedin.com/in/rishabh-anand-014579324", 
    instagram: "https://www.instagram.com/risha_x_102", 
    description: "This is Rishabh Anand (aka KittyLee102). I'm a 19-year-old guitarist and a 3D designer."
  },
  { 
    name: "Sarthak Singh", 
    role: "Tech Team", 
    img: "/developers/sarthak.jpeg", 
    linkedin: "https://www.linkedin.com/in/sarthak-singh-b44466298/", 
    instagram: "https://www.instagram.com/sarthak_singh613/", 
    description: "I’m Sarthak Singh, a 2nd-year CSE student at BIT Mesra. I’m a skilled full-stack developer specializing in the MERN stack, and I collaborate effectively with teams on projects."
  },
  { 
    name: "Deepak Pradhan", 
    role: "Tech Team", 
    img: "/developers/deepak.jpeg", 
    linkedin: "https://www.linkedin.com/in/deepakpradhan10242/", 
    instagram: "https://www.instagram.com/i_d_pradhan", 
    description: "I am a pre-final year Electrical & Electronics Engineering student passionate about web development, specialising in the MERN stack, and problem-solving. I enjoy building efficient and scalable applications while applying my analytical skills to tackle complex challenges."
  },
  { 
    name: "Priyanshu Agrahari", 
    role: "Tech Team", 
    img: "/developers/priyanshu.jpeg", 
    linkedin: "https://www.linkedin.com/in/priyanshu-agrahari-a838a024a", 
    instagram: "https://www.instagram.com/priyanshu_agrahari91", 
    description: "Hi, I am Priyanshu Agrahari, a B.Tech Electrical and Electronics student, skilled and passionate in the software domain, always eager to innovate."
  }
];


export default function DevelopersPage() {
  const [flippedIndex, setFlippedIndex] = useState(null);

  const handleFlip = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 place-items-center">
          {developers.map((dev, index) => (
            <div
              key={index}
              className="group h-[380px] sm:h-[420px] w-80 [perspective:1000px]"
              onClick={() => handleFlip(index)}
            >
              {/* Inner Card (Rotates on Hover or Tap) */}
              <div
                className={`relative w-[95%] max-w-[350px] sm:max-w-none rounded-[2rem] h-full transition-all duration-500 [transform-style:preserve-3d] ${
                  flippedIndex === index ? "[transform:rotateY(180deg)]" : "group-hover:[transform:rotateY(180deg)]"
                }`}
              >
                {/* Front Side */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600/30 via-pink-600/30 to-orange-600/30 rounded-xl transform rotate-1 pointer-events-none"></div>
                  <div className="relative bg-black/40 border border-white/10 rounded-xl p-8 md:p-12 overflow-hidden h-full flex flex-col justify-between">
                    {/* Profile Image */}
                    <div className="w-40 h-40 sm:w-44 sm:h-44 mx-auto mb-6 relative flex-shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={dev.img}
                        alt={`Profile picture of ${dev.name}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full border-4 border-white/30"
                      />
                    </div>
                    {/* Name & Role (Centered Relative to Image) */}
                    <div className="flex flex-col items-center justify-center flex-grow">
                      <h3 className="text-2xl font-semibold text-white text-center">{dev.name}</h3>
                      <p className="text-lg text-white/80 text-center">{dev.role}</p>
                    </div>
                    {/* Social Icons (Below Name & Role) */}
                    <div className="flex justify-center gap-4 mt-4">
                      <a href={dev.linkedin} target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="text-white hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-110" size={26} />
                      </a>
                      <a href={dev.instagram} target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="text-white hover:text-pink-500 transition duration-300 ease-in-out transform hover:scale-110" size={26} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 h-full w-full rounded-xl bg-black px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <div className="flex min-h-full flex-col items-center justify-center">
                    {/* Developer Description */}
                    <p className="text-lg text-white/80 text-center">
                      {dev.description}
                    </p>
                    {/* Social Icons (Back Side) */}
                    <div className="flex justify-center gap-4 mt-4">
                      <a href={dev.linkedin} target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="text-white hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-110" size={26} />
                      </a>
                      <a href={dev.instagram} target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="text-white hover:text-pink-500 transition duration-300 ease-in-out transform hover:scale-110" size={26} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}