"use client"; // Required for interactivity

import { Keyboard, MousePointer2, Headphones, LayoutGrid } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Botbar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get the current category from the URL (e.g. ?category=Mice)
    const currentCategory = searchParams.get("category");

    const filters = [
        { label: "All", icon: LayoutGrid, value: null },
        { label: "Keyboards", icon: Keyboard, value: "Keyboards" },
        { label: "Mice", icon: MousePointer2, value: "Mice" },
        { label: "Audio", icon: Headphones, value: "Audio" },
    ];

    const handleFilter = (category: string | null) => {
        if (category) {
            router.push(`/?category=${category}`);
        } else {
            router.push("/");
        }
    };

    return (
        <div className="absolute bottom-0 w-full z-10 translate-y-1/2 flex justify-center px-4">
            <div className="bg-white p-2 rounded-full flex gap-1 overflow-x-auto ">
                {filters.map((item) => {
                    // Check if this button is active
                    const isActive = item.value === currentCategory || (item.value === null && !currentCategory);

                    return (
                        <button
                            key={item.label}
                            onClick={() => handleFilter(item.value)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all whitespace-nowrap
                                ${isActive
                                ? "bg-black text-white"
                                : "text-gray-600 hover:bg-gray-100 hover:text-black"
                            }`}
                        >
                            <item.icon className="w-4 h-4" />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}