import { products } from "@/lib/data";
import { ProductGrid } from "@/components/products/product-grid";
import { ShopPageLayout } from "@/components/products/shop-page-layout";

export default function MenPage() {
    const menProducts = products.filter(p => p.gender === 'men' || p.gender === 'unisex');
    return (
        <ShopPageLayout
            title="Herrenkollektion"
            description="Stil und Eleganz für den modernen Mann."
        >
            <ProductGrid products={menProducts} />
        </ShopPageLayout>
    );
}
