"use client";

import { useCartStore } from "../store/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Loader2, CreditCard, Lock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";

// --- Validation Schema ---
const checkoutSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    zip: z.string().min(5, "ZIP code is required"),
    cardNumber: z.string().regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Card number must be 16 digits"),
    expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "MM/YY"),
    cvc: z.string().regex(/^\d{3,4}$/, "CVC is invalid"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
    const { cart, clearCart } = useCartStore();
    const [isSuccess, setIsSuccess] = useState(false);
    
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue
    } = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            cardNumber: "4242 4242 4242 4242", // Mock data for easier testing
            expiry: "12/28",
            cvc: "123"
        }
    });

    // Auto-format card number mock
    const handleCardInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, "");
        val = val.replace(/(\d{4})/g, "$1 ").trim();
        setValue("cardNumber", val);
    };

    const total = cart.reduce((acc, item) => {
        const price = parseFloat(item.price.replace("$", ""));
        return acc + price * item.quantity;
    }, 0);

    const onSubmit = async () => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsSuccess(true);
        clearCart();
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-6 animate-in fade-in duration-500 bg-white">
                <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-4"
                >
                    <CheckCircle2 className="w-12 h-12" />
                </motion.div>
                <div className="space-y-2">
                    <h1 className="text-4xl font-light tracking-tight">Order Confirmed</h1>
                    <p className="text-gray-500 max-w-md mx-auto">
                        Thank you for your purchase. We&apos;re getting your minimalist gear ready for shipment.
                    </p>
                </div>
                <Link href="/" className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-all hover:scale-105 active:scale-95">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center space-y-4 bg-white">
                <p className="text-gray-500">Your cart is empty.</p>
                <Link href="/" className="text-black underline underline-offset-4 hover:text-gray-600 transition-colors">
                    Go back to shop
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-screen">

                {/* LEFT COLUMN: FORM */}
                <div className="p-6 lg:p-24 pt-32 lg:pt-32 order-2 lg:order-1">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-12 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to cart
                    </Link>

                    <div className="mb-10">
                        <h2 className="text-3xl font-light tracking-tight mb-2">Checkout</h2>
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                            <Lock className="w-3 h-3" /> Secure SSL Encryption
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-lg">
                        
                        {/* Contact Info */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Contact</h3>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500 uppercase">Email</label>
                                <input 
                                    {...register("email")}
                                    type="email" 
                                    className={`w-full border-b py-2 outline-none transition-colors bg-transparent
                                        ${errors.email ? "border-red-500 placeholder:text-red-300" : "border-gray-200 focus:border-black"}`}
                                    placeholder="hello@example.com" 
                                />
                                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Shipping</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-gray-500 uppercase">First Name</label>
                                    <input {...register("firstName")} className={`w-full border-b py-2 outline-none transition-colors bg-transparent ${errors.firstName ? "border-red-500" : "border-gray-200 focus:border-black"}`} placeholder="Sarthak" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-gray-500 uppercase">Last Name</label>
                                    <input {...register("lastName")} className={`w-full border-b py-2 outline-none transition-colors bg-transparent ${errors.lastName ? "border-red-500" : "border-gray-200 focus:border-black"}`} placeholder="User" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500 uppercase">Address</label>
                                <input {...register("address")} className={`w-full border-b py-2 outline-none transition-colors bg-transparent ${errors.address ? "border-red-500" : "border-gray-200 focus:border-black"}`} placeholder="123 Minimalist St" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-gray-500 uppercase">City</label>
                                    <input {...register("city")} className={`w-full border-b py-2 outline-none transition-colors bg-transparent ${errors.city ? "border-red-500" : "border-gray-200 focus:border-black"}`} placeholder="New York" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-gray-500 uppercase">ZIP</label>
                                    <input {...register("zip")} className={`w-full border-b py-2 outline-none transition-colors bg-transparent ${errors.zip ? "border-red-500" : "border-gray-200 focus:border-black"}`} placeholder="10001" />
                                </div>
                            </div>
                        </div>

                        {/* Payment */}
                        <div className="space-y-4 pt-4">
                            <h3 className="text-lg font-medium">Payment</h3>
                            <div className="p-4 border border-gray-200 rounded-xl space-y-4 bg-gray-50/50">
                                <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                                    <CreditCard className="w-5 h-5 text-gray-900" />
                                    <span className="font-medium text-sm">Credit Card</span>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-gray-500 uppercase">Card Number</label>
                                        <input 
                                            {...register("cardNumber")}
                                            onChange={(e) => {
                                                handleCardInput(e);
                                                register("cardNumber").onChange(e);
                                            }}
                                            maxLength={19}
                                            className={`w-full bg-white border rounded-lg px-3 py-2 outline-none transition-colors ${errors.cardNumber ? "border-red-500" : "border-gray-200 focus:border-black"}`} 
                                            placeholder="0000 0000 0000 0000" 
                                        />
                                        {errors.cardNumber && <p className="text-xs text-red-500">{errors.cardNumber.message}</p>}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-gray-500 uppercase">Expiry</label>
                                            <input {...register("expiry")} className={`w-full bg-white border rounded-lg px-3 py-2 outline-none transition-colors ${errors.expiry ? "border-red-500" : "border-gray-200 focus:border-black"}`} placeholder="MM/YY" />
                                            {errors.expiry && <p className="text-xs text-red-500">{errors.expiry.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-gray-500 uppercase">CVC</label>
                                            <input {...register("cvc")} maxLength={4} className={`w-full bg-white border rounded-lg px-3 py-2 outline-none transition-colors ${errors.cvc ? "border-red-500" : "border-gray-200 focus:border-black"}`} placeholder="123" />
                                            {errors.cvc && <p className="text-xs text-red-500">{errors.cvc.message}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full bg-black text-white h-14 rounded-full font-medium hover:bg-gray-900 transition-all active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl shadow-black/5"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    `Pay $${total.toFixed(2)}`
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* RIGHT COLUMN: SUMMARY */}
                <div className="bg-gray-50/50 p-6 lg:p-24 pt-32 lg:pt-32 order-1 lg:order-2 border-l border-gray-100">
                    <div className="sticky top-32">
                        <h2 className="text-xl font-medium mb-8">Order Summary</h2>
                        <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-2 scrollbar-hide">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-4 items-center group">
                                    <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden shrink-0 border border-gray-100 group-hover:border-gray-300 transition-colors">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-medium text-gray-900">{item.price}</p>
                                </div>
                            ))}
                        </div>

                        <div className="h-px w-full bg-gray-200 my-8" />

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-gray-500">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Shipping</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Taxes (Estimated)</span>
                                <span>${(total * 0.08).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-medium text-2xl pt-6 text-gray-900 items-baseline">
                                <span className="text-lg">Total</span>
                                <span>${(total * 1.08).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}