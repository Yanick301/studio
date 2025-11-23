// shop-page-layout.tsx (NOUVEAU FICHIER)
'use client';

import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export interface ShopPageLayoutProps {
    title: string;
    description: string;
    products: {
        id: string;
        name: string;
        price: number;
        image: string;
        slug: string;
    }[];
    children?: ReactNode;
}

export function ShopPageLayout({
    title,
    description,
    products,
    children
}: ShopPageLayoutProps) {
    return (
        <div className="w-full px-6 py-10">
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-gray-500 mb-6">{description}</p>

            {children}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <Link key={product.id} href={`/product/${product.slug}`}>
                        <Card className="p-4 hover:shadow-lg cursor-pointer transition">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-56 object-cover rounded mb-3"
                            />
                            <h2 className="text-lg font-semibold">{product.name}</h2>
                            <p className="text-gray-700 mt-1">{product.price} €</p>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
