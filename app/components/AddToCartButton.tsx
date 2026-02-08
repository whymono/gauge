"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

// Define strict props for what we need
interface Props {
    product: {
        id: number;
        name: string;
        price: string;
        image: string;
        category: string;
    }
}

export default function AddToCartButton({ product }: Props) {
    const addItem = useCartStore((state) => state.addItem);

    return (
        <button
            onClick={() => addItem(product)}
            className="w-full md:w-auto bg-black text-white px-10 py-4 rounded-full font-medium text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-3 active:scale-95 duration-200"
        >
            <ShoppingBag className="w-5 h-5" />
            Add to Cart
        </button>
    );
}