'use client';

import { ReactNode, useState, useMemo } from "react";
import { useTranslation } from "@/hooks/use-translation";
import { Product } from "@/lib/definitions";
import { ProductGrid } from "./product-grid";
import { ProductFilters, Filters, SortOption } from "./product-filters";

interface ShopPageLayoutProps {
    title: string;
    description: string;
    products: Product[];
}

export function ShopPageLayout({ title, description, products }: ShopPageLayoutProps) {
    const { t } = useTranslation();
    const [filters, setFilters] = useState<Filters>({
        categories: [],
        sizes: [],
        colors: [],
        priceRange: [0, 3500],
    });
    const [sortOption, setSortOption] = useState<SortOption>('newest');

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = [...products];

        // Apply filters
        if (filters.categories.length > 0) {
            filtered = filtered.filter(p => filters.categories.includes(p.category));
        }
        if (filters.sizes.length > 0) {
            filtered = filtered.filter(p => p.options?.sizes?.some(s => filters.sizes.includes(s)));
        }
        if (filters.colors.length > 0) {
            filtered = filtered.filter(p => p.options?.colors?.some(c => filters.colors.includes(c)));
        }
        filtered = filtered.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

        // Apply sorting
        switch (sortOption) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
            default:
                 // Assuming 'id' can be used for sorting by newest. A real app might have a 'createdAt' date.
                filtered.sort((a, b) => (b.id > a.id ? 1 : -1));
                break;
        }

        return filtered;
    }, [products, filters, sortOption]);

    return (
        <div className="container py-12 md:py-16">
            <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold">{t(title)}</h1>
                <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">{t(description)}</p>
            </div>
            <div className="grid lg:grid-cols-[280px_1fr] gap-8">
                <aside className="hidden lg:block">
                     <ProductFilters 
                        products={products}
                        filters={filters} 
                        setFilters={setFilters}
                        sortOption={sortOption}
                        setSortOption={setSortOption}
                     />
                </aside>
                <main>
                    <ProductGrid products={filteredAndSortedProducts} />
                </main>
            </div>
        </div>
    );
}
