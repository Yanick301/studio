'use client';

import { products } from "@/lib/data";
import { ProductGrid } from "@/components/products/product-grid";
import { ShopPageLayout } from "@/components/products/shop-page-layout";
import { useTranslation } from "@/hooks/use-translation";
import { Product } from "@/lib/definitions";

export default function WinterPage() {
    const { t } = useTranslation();

    const winterKeywords = ['coat', 'sweater', 'gloves', 'scarf', 'parka', 'hoodie', 'turtleneck', 'cardigan', 'down jacket'];
    
    const winterProducts = products.filter(p => 
        p.tags?.includes('winter') ||
        winterKeywords.some(keyword => 
            t(p.name).toLowerCase().includes(keyword) || 
            t(p.description).toLowerCase().includes(keyword) ||
            p.imageHint.toLowerCase().includes(keyword)
        )
    );
    
    return (
        <ShopPageLayout
            title={t('winter_page.title')}
            description={t('winter_page.description')}
        >
            <ProductGrid products={winterProducts} />
        </ShopPageLayout>
    );
}
