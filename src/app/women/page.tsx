'use client';

import { products } from "@/lib/data";
import { ShopPageLayout } from "@/components/products/shop-page-layout";
import { useTranslation } from "@/hooks/use-translation";

export default function WomenPage() {
    const { t } = useTranslation();
    const womenProducts = products.filter(p => (p.gender === 'women' || p.gender === 'unisex') && p.category === 'clothing');
    return (
        <ShopPageLayout
            title={t('women_page.title')}
            description={t('women_page.description')}
            products={womenProducts}
        />
    );
}
