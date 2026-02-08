import { Search, ShoppingCart } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 rounded-b-2xl flex justify-between bg-white py-3 px-6 z-10 items-center w-full max-w-7xl max-h-20 mx-auto z-50 shadow ">
            <div className={ "flex items-center gap-2"}>
            <Image
            src="/logo.svg"
            alt="Logo"
            width={30}
            height={100}
            />
            <h1 className={ "flex-1 items-center"}>
                Gauge
            </h1>
            </div>
            <div className="flex items-center gap-8 justify-between">
                <a href="#" className="text-sm font-medium text-gray-600 hover:text-black">Beranda</a>
                <a href="#" className="text-sm font-medium text-gray-600 hover:text-black">Shop</a>
                <a href="#" className="text-sm font-medium text-gray-600 hover:text-black">Blog</a>
            </div>
            <div className="flex items-center justify-between">
                <ShoppingCart className="w-5 h-5" />
            </div>
        </nav>
    );
}