import Image from "next/image";
import { Plus } from "lucide-react";
import Link from "next/link";
import Botbar from "./components/Botbar";
import { products } from "./data";

export default async function Page({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
    const category = (await searchParams).category;

    const filteredProducts = category
        ? products.filter(p => p.category === category)
        : products;

    return (
        <div>
            {/* HERO SECTION - This was likely where the error was */}
            <div className="relative w-full h-[600px]">
                <Image
                    src="/Hero_Img.png" // Fixed: This must remain static
                    alt="Background image"
                    fill
                    className="object-cover"
                    priority
                />
                <Botbar />
            </div>

            {/* CONTENT */}
            <div className="max-w-7xl mx-auto px-6 py-16 space-y-24">

                <section className="flex justify-between items-end">
                    <h2 className="text-4xl font-light tracking-tight text-gray-900 max-w-md block">
                        {category ? `${category} Collection` : "Curated essentials for the modern workspace."}
                    </h2>
                    <Link href="/" className="text-sm font-medium underline underline-offset-4 hover:text-gray-600 transition-colors">
                        View all collection
                    </Link>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 pb-24">
                    {filteredProducts.map((product) => (
                        <Link href={`/product/${product.id}`} key={product.id} className="group cursor-pointer block">
                            <div className="relative aspect-square bg-gray-100 rounded-3xl overflow-hidden mb-4">
                                <Image
                                    // THIS is where the fix belongs (inside the loop)
                                    src={product.images?.[0] || "/placeholder.png"}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                />
                                <div className="absolute bottom-4 right-4 bg-white p-3 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                                    <Plus className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-medium text-lg text-gray-900">{product.name}</h3>
                                    <p className="text-sm text-gray-500">{product.category}</p>
                                </div>
                                <span className="font-medium text-gray-900">{product.price}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}