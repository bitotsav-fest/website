import React from 'react';

export default function AlumniPage() {
    const alumniList = [
        {
            id: 1,
            name: "John Doe",
            batch: "2018",
            company: "Google",
            image: "/alumni/john.jpg"
        },
        {
            id: 2,
            name: "Jane Smith",
            batch: "2019",
            company: "Microsoft",
            image: "/alumni/jane.jpg"
        },
        // Add more alumni data as needed
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Our Distinguished Alumni</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {alumniList.map((alumni) => (
                    <div key={alumni.id} className=" shadow-lg rounded-lg p-6">
                        <img 
                            src={alumni.image} 
                            alt={alumni.name}
                            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                        />
                        <h2 className="text-xl font-semibold text-center">{alumni.name}</h2>
                        <p className="text-gray-600 text-center">Batch of {alumni.batch}</p>
                        <p className="text-gray-600 text-center">{alumni.company}</p>
                    </div>
                ))}
            </div>
        </div>
    );
} 
