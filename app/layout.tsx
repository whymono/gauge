import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import CartSidebar from "./components/CartSidebar";
import Footer from "./components/Footer"; // Import Footer

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
        <CartSidebar />
        <main className="w-full min-h-screen bg-white">
            {children}
        </main>
        <Footer /> {/* Add Footer here */}
        </body>
        </html>
    );
}