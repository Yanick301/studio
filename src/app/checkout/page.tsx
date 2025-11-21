import { ShopPageLayout } from "@/components/products/shop-page-layout";

export default function CheckoutPage() {
    return (
        <ShopPageLayout
            title="Kasse"
            description="Schließen Sie Ihre Bestellung sicher ab."
        >
            <div className="text-center border-2 border-dashed rounded-lg p-12">
                <p className="text-muted-foreground">Der Bezahlvorgang wird derzeit erstellt.</p>
            </div>
        </ShopPageLayout>
    );
}
