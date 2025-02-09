'use client';
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { Button } from "./Button";
import Link from "next/link";

function NotableAlumni() {
  const testimonials = [
    {
      quote:
        "BIT Mesra provided me with the foundation that helped me achieve success in my career at Google. The technical expertise and problem-solving skills I gained were invaluable.",
      name: "Sanjay Kumar",
      designation: "Senior Engineering Manager at Google",
      src: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=3540",
    },
    {
      quote:
        "The entrepreneurial spirit I developed during my time at BIT Mesra was crucial in building my startup. The college's ecosystem nurtures innovation.",
      name: "Priya Sharma",
      designation: "Founder & CEO, TechStart Solutions",
      src: "https://images.unsplash.com/photo-1621272036047-bb0f76bbc1ad?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dW5zcGFsc2h8ZW58MHx8MHx8fDA%3D",
    },
    {
      quote:
        "My years at BIT Mesra were transformative. The diverse exposure and quality education helped me reach where I am today.",
      name: "Rajesh Verma",
      designation: "Director of Engineering at Microsoft",
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=3540",
    },
    {
      quote:
        "The rigorous academic program and practical exposure at BIT Mesra prepared me well for my role in the industry.",
      name: "Anjali Mehta",
      designation: "VP Engineering at Amazon",
      src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=3540",
    },
  ];

  return (
    <div className="py-16 px-4 bg-gradient-to-b  ">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-400">
          Notable Alumni
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Meet some of our distinguished alumni who are making their mark globally
        </p>
        
        <AnimatedTestimonials testimonials={testimonials} />
        
        <div className="text-center mt-10">
         <Link href={"/alumni"}>
          <Button variant="secondary" size="lg">
            Show More Alumni
          </Button>
         </Link>
        </div>
      </div>
    </div>
  );
}

export { NotableAlumni };
