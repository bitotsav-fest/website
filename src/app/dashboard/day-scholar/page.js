'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DayScholarPage() {
    return (
        <div className="container mx-auto py-8 px-4 mt-16">
            <Card className="max-w-3xl mx-auto bg-black/60 border-gold-500">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-gold-500 text-center">
                        Day Scholar Registration
                    </CardTitle>
                    <CardDescription className="text-center text-gray-300">
                        Register for Bitotsav 2025 as a Day Scholar
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gold-500">Important Information</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-300">
                            <li>Registration is mandatory for all day scholars attending Bitotsav 2025</li>
                            <li>Please keep your College ID and a valid Government ID ready for verification</li>
                            <li>Day pass access will be restricted to registered participants only</li>
                            <li>Registration fee details will be communicated after form submission</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gold-500">Required Documents</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-300">
                            <li>College ID Card</li>
                            <li>Government ID (Aadhaar/PAN/Driving License/Passport)</li>
                            <li>Recent Passport Size Photograph</li>
                        </ul>
                    </div>

                    <div className="pt-6 text-center">
                        <Button
                            className="bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-black font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-gold-500/50 border-2 border-gold-300"
                            onClick={() => window.open('https://forms.gle/xyoDNBkvgqhUfdfq6', '_blank')}
                        >
                            Register Now
                        </Button>
                        <p className="mt-4 text-sm text-gray-400">
                            For any queries, please contact our support team through the virtual helpdesk
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}