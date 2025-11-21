'use client';

import { ShopPageLayout } from "@/components/products/shop-page-layout";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useTranslation } from "@/hooks/use-translation";

export default function CartPage() {
    const { t } = useTranslation();
    const cartIsEmpty = true;

    return (
        <ShopPageLayout
            title={t('cart_page.title')}
            description={t('cart_page.description')}
        >
            {cartIsEmpty ? (
                <div className="text-center border-2 border-dashed rounded-lg p-12">
                    <p className="text-muted-foreground mb-4 text-lg">{t('cart_page.empty_message')}</p>
                    <Button asChild>
                        <Link href="/products">{t('cart_page.continue_shopping')}</Link>
                    </Button>
                </div>
            ) : (
                <div>
                    <p>{t('cart_page.items_placeholder')}</p>
                </div>
            )}
        </ShopPageLayout>
    );
}
