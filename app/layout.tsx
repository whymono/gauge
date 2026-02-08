import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import CartSidebar from "./components/CartSidebar";

export const metadata: Metadata = {
    title: "Gauge",
    description: "Minimalist Tech Store",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <Navbar />
        <CartSidebar />  {/* <--- Add this line here */}
        <main className="w-full min-h-screen bg-white">
            {children}
        </main>
        </body>
        </html>
    );
}