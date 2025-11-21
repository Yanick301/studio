import { products } from "@/lib/data";
import { ProductGrid } from "@/components/products/product-grid";
import { ShopPageLayout } from "@/components/products/shop-page-layout";

export default function MenPage() {
    const menProducts = products.filter(p => p.gender === 'men' || p.gender === 'unisex');
    return (
        <ShopPageLayout
            title="Collection Homme"
            description="Style et sophistication pour l'homme moderne."
        >
            <ProductGrid products={menProducts} />
        </ShopPageLayout>
    );
}
