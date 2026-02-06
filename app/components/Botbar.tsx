import { Keyboard, Mouse, Headphones, LayoutGrid } from "lucide-react";

export default function Botbar() {
    const filters = [
        { label: "All", icon: LayoutGrid },
        { label: "Keyboards", icon: Keyboard },
        { label: "Mice", icon: Mouse },
        { label: "Audio", icon: Headphones },
    ];

    return (
        <div className="absolute bottom-0 w-full z-10 translate-y-1/2 flex justify-center px-4">
            <div className="bg-white p-2 rounded-full flex gap-1 overflow-x-auto">
                {filters.map((item) => (
                    <button
                        key={item.label}
                        className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-gray-600 hover:bg-black hover:text-white transition-all whitespace-nowrap"
                    >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}