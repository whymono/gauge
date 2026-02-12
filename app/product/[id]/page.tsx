"use client";

import { use } from "react";
import { products } from "@/app/data";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ShieldCheck, Truck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import AddToCartButton from "@/app/components/AddToCartButton";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);

    const product = products.find((p) => String(p.id) === resolvedParams.id);

    if (!product) {
        notFound();
    }

    const productData = product as any;

    const allImages: string[] = productData.images?.length > 0
        ? productData.images
        : [productData.image || productData.coverImage || ""];

    const cartProduct = {
        id: product.id as number,
        name: product.name,
        price: product.price,
        image: allImages[0],
        category: product.category,
    };

    const features: string[] = productData.features || [
        "Premium build quality with aerospace-grade materials",
        "Advanced ergonomic design for all-day comfort",
        "Seamless integration with your existing workflow"
    ];

    const specs: Record<string, string> = productData.specs || {
        "Material": "Machined Aluminum",
        "Weight": "145g",
        "Dimensions": "120 x 60 x 35 mm",
        "Warranty": "1 Year Limited"
    };

    const boxContents: string[] = productData.boxContents || [
        product.name,
        "USB-C Charging Cable",
        "Quick Start Guide",
    ];

    return (
        <main className="min-h-screen bg-white pb-32 lg:pb-16">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors mb-12"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to products
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                    <div className="lg:col-span-7 flex flex-col">
                        <div className="flex overflow-x-auto lg:flex-col snap-x snap-mandatory gap-4 pb-4 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            {allImages.map((img: string, i: number) => (
                                <div
                                    key={i}
                                    className="flex-none w-[90vw] sm:w-[80vw] lg:w-full snap-center bg-neutral-100/50 rounded-3xl overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-[850px] relative"
                                >
                                    <Image
                                        src={img}
                                        alt={`${product.name} view ${i + 1}`}
                                        fill
                                        className="object-cover"
                                        priority={i === 0}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="lg:hidden mt-8 space-y-6">
                            <h1 className="text-4xl font-bold tracking-tight text-neutral-900">{product.name}</h1>
                            {/* Removed extra $ here */}
                            <p className="text-2xl font-medium text-neutral-900">{product.price}</p>
                            <p className="text-neutral-600 leading-relaxed">{product.description}</p>
                            <div className="pt-2">
                                <AddToCartButton product={cartProduct as any} />
                            </div>
                        </div>

                        <div className="mt-16 lg:mt-24 space-y-20 lg:space-y-32">
                            <section>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-8">
                                    Key Features
                                </h3>
                                <div className="grid gap-6">
                                    {features.map((feature: string, i: number) => (
                                        <div
                                            key={i}
                                            className="flex gap-6 items-start pb-6 border-b border-neutral-100 last:border-0"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-neutral-900 mt-2.5 flex-shrink-0" />
                                            <p className="text-lg lg:text-xl text-neutral-800 leading-relaxed">{feature}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-8">
                                    Specifications
                                </h3>
                                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                                    {Object.entries(specs).map(([key, value]) => (
                                        <div key={key} className="pb-4 border-b border-neutral-100">
                                            <dt className="text-sm text-neutral-500 mb-1 capitalize">
                                                {key.replace(/([A-Z])/g, " $1").trim()}
                                            </dt>
                                            <dd className="text-lg font-medium text-neutral-900">{value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </section>

                            <section>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-8">
                                    In the Box
                                </h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {boxContents.map((item: string, i: number) => (
                                        <li
                                            key={i}
                                            className="flex items-center gap-4 bg-neutral-50 px-6 py-4 rounded-2xl text-neutral-800 font-medium"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>
                    </div>

                    <div className="hidden lg:block lg:col-span-5">
                        <div className="sticky top-12 space-y-10 pr-8">
                            <div>
                                <h1 className="text-5xl font-bold tracking-tight text-neutral-900 mb-4">{product.name}</h1>
                                {/* Removed extra $ here */}
                                <p className="text-3xl text-neutral-900 mb-8">{product.price}</p>
                                <p className="text-neutral-600 text-lg leading-relaxed">{product.description}</p>
                            </div>

                            <div className="pt-8 border-t border-neutral-100">
                                <AddToCartButton product={cartProduct as any} />
                            </div>

                            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-neutral-100">
                                <div className="flex items-center gap-3 text-neutral-600">
                                    <Truck className="w-5 h-5 text-neutral-900" />
                                    <span className="text-sm font-medium">Free Worldwide Shipping</span>
                                </div>
                                <div className="flex items-center gap-3 text-neutral-600">
                                    <ShieldCheck className="w-5 h-5 text-neutral-900" />
                                    <span className="text-sm font-medium">1 Year Warranty</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-neutral-200 lg:hidden z-50 flex items-center justify-between shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.05)]">
                <div className="flex flex-col">
                    <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Total</span>
                    {/* Removed extra $ here */}
                    <span className="text-xl font-bold text-neutral-900">{product.price}</span>
                </div>
                <div className="w-[60%]">
                    <AddToCartButton product={cartProduct as any} />
                </div>
            </div>
        </main>
    );
}