import { Github, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-24 pb-12 mt-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between gap-12 mb-24">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold tracking-tight">Gauge</h3>
                        <p className="text-gray-500 leading-relaxed text-sm max-w-xs">
                            Curated tech essentials for the modern minimalist.
                            Designed to foster focus and clarity.
                        </p>
                    </div>

                    {/* Socials */}
                    <div>
                        <h4 className="font-medium mb-6">Stay Connected</h4>
                        <div className="flex gap-4">
                            <Link href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white transition-all">
                                <Twitter className="w-4 h-4" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white transition-all">
                                <Instagram className="w-4 h-4" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white transition-all">
                                <Github className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100 text-xs text-gray-400 gap-4">
                    <p>&copy; 2024 Gauge Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-black">Privacy Policy</Link>
                        <Link href="#" className="hover:text-black">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}