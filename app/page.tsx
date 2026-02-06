import Image from "next/image";
import { Plus } from "lucide-react";
import Link from "next/link"; // Import Link
import { products } from "./data"; // Import shared data

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ searchParams }: Props) {
    const resolvedSearchParams = await searchParams;
    const category = resolvedSearchParams.category;

    const filteredProducts = category
        ? products.filter((p) => p.category === category)
        : products;

    return (
        <div className="space-y-24 mt-8">
            <section className="flex justify-between items-end">
                <h2 className="text-4xl font-light tracking-tight text-gray-900 max-w-md">
                    {category ? `${category} Collection` : "Curated essentials for the modern workspace."}
                </h2>
                <a href="#" className="text-sm font-medium underline underline-offset-4 hover:text-gray-600 transition-colors">
                    View all collection
                </a>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 pb-24">
                {filteredProducts.map((product) => (
                    // Wrap the card in a Link
                    <Link href={`/product/${product.id}`} key={product.id} className="group cursor-pointer">
                        <div className="relative aspect-square bg-gray-100 rounded-3xl overflow-hidden mb-4">
                            <div className="absolute inset-0 bg-gray-200" />
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out z-10"
                            />
                            {/* Changed button to div to avoid nested interactive elements */}
                            <div className="absolute bottom-4 right-4 z-20 bg-white p-3 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg group-hover:bg-black group-hover:text-white">
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
            </section>
        </div>
    );
}