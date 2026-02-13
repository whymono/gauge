import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import CartSidebar from "./components/CartSidebar";
import Footer from "./components/Footer"; // Import Footer

export const metadata: Metadata = {
    title: {
        default: "Gauge | Minimalist Tech Essentials",
        template: "%s | Gauge"
    },
    description: "Curated collection of premium, minimalist mechanical keyboards, mice, and audio gear designed for focus and clarity.",
    openGraph: {
        title: "Gauge | Minimalist Tech Essentials",
        description: "Curated collection of premium, minimalist mechanical keyboards, mice, and audio gear.",
        url: "https://gauge-beryl.vercel.app",
        siteName: "Gauge",
        images: [
        {
                url: "/Hero_Img.png",
                width: 1200,
                height: 630,
                alt: "Gauge Minimalist Workspace"
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Gauge | Minimalist Tech Essentials",
        description: "Curated collection of premium, minimalist mechanical keyboards, mice, and audio gear.",
        images: ["/Hero_Img.png"],
    },
    icons: {
        icon: "/logo.svg",
    },
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
        <CartSidebar />
        <main className="w-full min-h-screen bg-white">
            {children}
        </main>
        <Footer /> {/* Add Footer here */}
        </body>
        </html>
    );
}