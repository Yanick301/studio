
'use client';
import { products } from "@/lib/data";
import { ShopPageLayout } from "@/components/products/shop-page-layout";
import { useTranslation } from "@/hooks/use-translation";

export default function ShoesPage() {
    const { t } = useTranslation();
    const shoeProducts = products.filter(p => p.category === 'shoes');
    return (
        <ShopPageLayout
            title={t('shoes_page.title')}
            description={t('shoes_page.description')}
            products={shoeProducts}
        />
    );
}
