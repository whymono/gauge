import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Botbar from "./components/Botbar";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Gauge",
    description: "Minimalist Tech Store",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <Navbar />

        {/* HERO SECTION - Placed here so it stays at the top */}
        <div className="relative w-full h-[600px]">
            <Image
                src="/Hero_Img.png"
                alt="Background image"
                fill
                className="object-cover"
                priority
            />
            <Botbar />
        </div>

        {/* CONTENT AREA - This is where page.tsx is rendered */}
        <main className="max-w-7xl mx-auto px-6 py-16">
            {children}
        </main>
        </body>
        </html>
    );
}