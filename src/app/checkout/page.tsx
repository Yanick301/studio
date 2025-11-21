'use client';

import { ShopPageLayout } from "@/components/products/shop-page-layout";
import { useTranslation } from "@/hooks/use-translation";

export default function CheckoutPage() {
    const { t } = useTranslation();
    return (
        <ShopPageLayout
            title={t('checkout_page.title')}
            description={t('checkout_page.description')}
        >
            <div className="text-center border-2 border-dashed rounded-lg p-12">
                <p className="text-muted-foreground">{t('checkout_page.coming_soon')}</p>
            </div>
        </ShopPageLayout>
    );
}
