"use client";

import { useCartStore } from "../store/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function CheckoutPage() {
    const { cart } = useCartStore();
    const [isSuccess, setIsSuccess] = useState(false);

    // Calculate Total
    const total = cart.reduce((acc, item) => {
        const price = parseFloat(item.price.replace("$", ""));
        return acc + price * item.quantity;
    }, 0);

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate processing
        setIsSuccess(true);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-6 animate-in fade-in duration-500 bg-white">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                </div>
                <h1 className="text-4xl font-light">Order Confirmed</h1>
                <p className="text-gray-500 max-w-md">
                    Thank you for your purchase. We&apos;re getting your minimalist gear ready for shipment.
                </p>
                <Link href="/" className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center space-y-4 bg-white">
                <p className="text-gray-500">Your cart is empty.</p>
                <Link href="/" className="text-black underline underline-offset-4">
                    Go back to shop
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-screen">

                {/* LEFT: Shipping Form */}
                <div className="p-6 lg:p-24 pt-32 lg:pt-32 order-2 lg:order-1">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-8">
                        <ArrowLeft className="w-4 h-4" /> Back to cart
                    </Link>

                    <h2 className="text-3xl font-light mb-8">Shipping Details</h2>

                    <form onSubmit={handlePayment} className="space-y-6 max-w-lg">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500 uppercase">First Name</label>
                                <input required type="text" className="w-full border-b border-gray-200 py-2 outline-none focus:border-black transition-colors" placeholder="Sarthak" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500 uppercase">Last Name</label>
                                <input required type="text" className="w-full border-b border-gray-200 py-2 outline-none focus:border-black transition-colors" placeholder="User" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-500 uppercase">Email</label>
                            <input required type="email" className="w-full border-b border-gray-200 py-2 outline-none focus:border-black transition-colors" placeholder="hello@example.com" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-500 uppercase">Address</label>
                            <input required type="text" className="w-full border-b border-gray-200 py-2 outline-none focus:border-black transition-colors" placeholder="123 Minimalist St" />
                        </div>

                        <div className="pt-8">
                            <button type="submit" className="w-full bg-black text-white h-14 rounded-full font-medium hover:bg-gray-900 transition-transform active:scale-[0.99]">
                                Pay ${total.toFixed(2)}
                            </button>
                        </div>
                    </form>
                </div>

                {/* RIGHT: Order Summary */}
                <div className="bg-gray-50 p-6 lg:p-24 pt-32 lg:pt-32 order-1 lg:order-2">
                    <h2 className="text-xl font-medium mb-8">Order Summary</h2>
                    <div className="space-y-6">
                        {cart.map((item) => (
                            <div key={item.id} className="flex gap-4 items-center">
                                <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden shrink-0 border border-gray-100">
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                </div>
                                <p className="font-medium">{item.price}</p>
                            </div>
                        ))}
                    </div>

                    <div className="h-px w-full bg-gray-200 my-8" />

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-500">
                            <span>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="flex justify-between font-medium text-lg pt-4 text-gray-900">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}