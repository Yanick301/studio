import { ShopPageLayout } from "@/components/products/shop-page-layout";

export default function CheckoutPage() {
    return (
        <ShopPageLayout
            title="Paiement"
            description="Finalisez votre commande en toute sécurité."
        >
            <div className="text-center border-2 border-dashed rounded-lg p-12">
                <p className="text-muted-foreground">Le processus de paiement est en cours de construction.</p>
            </div>
        </ShopPageLayout>
    );
}
