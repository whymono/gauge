"use client";

import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CartSidebar() {
    const { cart, isOpen, closeCart, removeItem, addItem } = useCartStore();

    if (!isOpen) return null;

    // --- THIS IS THE MISSING LINE ---
    const total = cart.reduce((acc, item) => {
        const price = parseFloat(item.price.replace("$", ""));
        return acc + price * item.quantity;
    }, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                        onClick={closeCart}
                    />

                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
                    >
                        <div className="p-6 flex justify-between items-center border-b border-gray-100">
                            <h2 className="text-xl font-light">Your Cart ({cart.length})</h2>
                            <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-full">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                                    <p>Your cart is empty.</p>
                                    <button onClick={closeCart} className="text-black underline underline-offset-4 text-sm">
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative w-20 h-20 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-medium text-gray-900">{item.name}</h3>
                                                <p className="font-medium">{item.price}</p>
                                            </div>
                                            <p className="text-xs text-gray-500">{item.category}</p>

                                            <div className="flex justify-between items-center mt-2">
                                                <div className="flex items-center gap-3 bg-gray-50 rounded-full px-3 py-1">
                                                    <button className="text-gray-500 hover:text-black text-xs">
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="text-xs font-medium w-3 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => addItem(item)}
                                                        className="text-gray-500 hover:text-black text-xs"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="p-6 border-t border-gray-100 space-y-4 bg-white">
                                <div className="flex justify-between items-center text-lg font-medium">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <Link
                                    href="/checkout"
                                    onClick={closeCart}
                                    className="block w-full bg-black text-white py-4 rounded-full font-medium text-lg hover:bg-gray-800 transition-colors text-center"
                                >
                                    Checkout
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}