import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

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
        {/* CHANGED: Removed max-w-7xl and padding. Now it's just full width. */}
        <main className="w-full min-h-screen bg-white">
            {children}
        </main>
        </body>
        </html>
    );
}