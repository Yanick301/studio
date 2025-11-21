import { ShopPageLayout } from "@/components/products/shop-page-layout";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function CartPage() {
    // In a real app, cart items would be fetched from state/context/server
    const cartIsEmpty = true;

    return (
        <ShopPageLayout
            title="Votre Panier"
            description="Vérifiez les articles dans votre panier avant de passer à la caisse."
        >
            {cartIsEmpty ? (
                <div className="text-center border-2 border-dashed rounded-lg p-12">
                    <p className="text-muted-foreground mb-4 text-lg">Votre panier est actuellement vide.</p>
                    <Button asChild>
                        <Link href="/products">Continuer mes achats</Link>
                    </Button>
                </div>
            ) : (
                <div>
                    {/* Placeholder for cart items list and summary */}
                    <p>Liste des articles du panier ici...</p>
                </div>
            )}
        </ShopPageLayout>
    );
}
