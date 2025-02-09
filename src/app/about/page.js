import React from 'react'

export default function AboutPage() {
    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">About Bitotsav</h1>
                <div className="space-y-6">
                    <p className="text-lg">
                        Bitotsav is the annual cultural festival of Birla Institute of Technology, Mesra. 
                        It brings together students from across the country to celebrate art, culture, and creativity.
                    </p>
                    
                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
                        <p className="text-lg">
                            To create a vibrant platform that nurtures talent, promotes cultural exchange, 
                            and provides unforgettable experiences for all participants.
                        </p>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
                        <ul className="list-disc list-inside text-lg space-y-2">
                            <li>Cultural Performances</li>
                            <li>Technical Events</li>
                            <li>Art Exhibitions</li>
                            <li>Workshops</li>
                            <li>Competitions</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    )
}
