import { ShopPageLayout } from "@/components/products/shop-page-layout";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function CartPage() {
    // In a real app, cart items would be fetched from state/context/server
    const cartIsEmpty = true;

    return (
        <ShopPageLayout
            title="Ihr Warenkorb"
            description="Überprüfen Sie die Artikel in Ihrem Warenkorb, bevor Sie zur Kasse gehen."
        >
            {cartIsEmpty ? (
                <div className="text-center border-2 border-dashed rounded-lg p-12">
                    <p className="text-muted-foreground mb-4 text-lg">Ihr Warenkorb ist derzeit leer.</p>
                    <Button asChild>
                        <Link href="/products">Weiter einkaufen</Link>
                    </Button>
                </div>
            ) : (
                <div>
                    {/* Placeholder for cart items list and summary */}
                    <p>Liste der Warenkorbartikel hier...</p>
                </div>
            )}
        </ShopPageLayout>
    );
}
