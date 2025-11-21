'use client';

import { ShopPageLayout } from "@/components/products/shop-page-layout";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useTranslation } from "@/hooks/use-translation";
import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function CartPage() {
    const { t } = useTranslation();
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const cartIsEmpty = true; // Replace with actual cart logic

    const handleCheckout = () => {
        if (!user) {
            router.push('/login?redirect=/checkout');
        } else {
            router.push('/checkout');
        }
    };


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
                <div className="max-w-4xl mx-auto">
                    {/* Placeholder for cart items */}
                    <div className="border rounded-lg p-6 mb-8">
                        <p>{t('cart_page.items_placeholder')}</p>
                    </div>

                    {!user && !isUserLoading && (
                        <Alert className="mb-8">
                            <Terminal className="h-4 w-4" />
                            <AlertTitle>{t('cart_page.login_prompt_title')}</AlertTitle>
                            <AlertDescription>
                               {t('cart_page.login_prompt_desc_1')} <Link href="/login" className="font-bold underline">{t('cart_page.login_prompt_link')}</Link> {t('cart_page.login_prompt_desc_2')}
                            </AlertDescription>
                        </Alert>
                    )}
                    
                    <div className="flex justify-end">
                         <Button onClick={handleCheckout} disabled={isUserLoading} size="lg">
                            {t('cart_page.proceed_to_checkout')}
                        </Button>
                    </div>
                </div>
            )}
        </ShopPageLayout>
    );
}
