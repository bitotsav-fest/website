import { BackgroundPaths } from "@/components/ui/background-paths";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React from "react";

export default function AlumniPage() {
  const alumniList = [
    {
      id: 1,
      name: "John Doe",
      batch: "2018",
      company: "Google",
      image: "/images/alumni/john_doe.jpg",
    },
    // ... rest of the alumniList array stays the same
  ];

  return (
    <div className="relative min-h-screen text-white py-16 px-6 flex flex-col items-center">
      <BackgroundPaths title="Notable Alumni" />
      <h1 className="text-5xl font-extrabold text-center mb-16 animate-fade-in">
        Our Notable Alumni
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl w-full px-6">
        {alumniList.map((alumni) => (
          <Card 
            key={alumni.id} 
            className="bg-card/30 backdrop-blur-sm border border-white/10 hover:border-white/30 
            transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20
            rounded-xl overflow-hidden group animate-fade-up"
          >
            <CardHeader>
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl 
                  transition-all duration-300 opacity-70 group-hover:opacity-100"></div>
                  <img
                    src={alumni.image}
                    alt={alumni.name}
                    className="w-36 h-36 rounded-full object-cover mb-4 relative z-10 
                    ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300"
                  />
                </div>
                <CardTitle className="text-2xl font-bold mt-4 group-hover:text-primary transition-colors duration-300">
                  {alumni.name}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <p className="text-muted-foreground/80 group-hover:text-white/90 transition-colors duration-300">
                  Batch of {alumni.batch}
                </p>
                <p className="text-muted-foreground/80 group-hover:text-white/90 transition-colors duration-300">
                  {alumni.company}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  ); 
}
