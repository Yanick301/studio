'use client';

import products from "@/lib/placeholder-images.json";
import { ShopPageLayout } from "@/components/products/shop-page-layout";
import { useTranslation } from "@/hooks/use-translation";

export default function ProductsPage() {
    const { t } = useTranslation();
    return (
        <ShopPageLayout
            title={t('products_page.title')}
            description={t('products_page.description')}
            products={products}
        />
    );
}
