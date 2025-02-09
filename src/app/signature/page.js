"use client";
import dynamic from "next/dynamic";
import 'tldraw/tldraw.css';

const Tldraw = dynamic(
    () => import('tldraw').then((mod) => mod.Tldraw),
    {
        ssr: false,
        loading: () => <p>Loading...</p>
    }
);

export default function Page() {
    return (
        <div className="h-screen">
            <Tldraw />
        </div>
    );
}
