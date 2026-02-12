"use client";

import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "../store/useCartStore";
import { useEffect, useState } from "react";

export default function Navbar() {
    const { openCart, cart } = useCartStore();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch by waiting for mount
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <nav className="fixed top-0 left-0 right-0 flex justify-between bg-white/80 backdrop-blur-md py-4 px-6 z-50 items-center w-full border-b border-gray-100">
            <Link href="/" className="flex items-center gap-3 group">
                <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={24}
                    height={24}
                    className="group-hover:rotate-12 transition-transform duration-300"
                />
                <h1 className="text-xl font-bold tracking-tight">Gauge</h1>
            </Link>

            <div className="flex items-center gap-4">
                <button
                    onClick={openCart}
                    className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ShoppingCart className="w-5 h-5" />
                    {mounted && cart.length > 0 && (
                        <span className="absolute top-0 right-0 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                            {cart.length}
                        </span>
                    )}
                </button>
            </div>
        </nav>
    );
}