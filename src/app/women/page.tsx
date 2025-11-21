import { products } from "@/lib/data";
import { ProductGrid } from "@/components/products/product-grid";
import { ShopPageLayout } from "@/components/products/shop-page-layout";

export default function WomenPage() {
    const womenProducts = products.filter(p => p.gender === 'women' || p.gender === 'unisex');
    return (
        <ShopPageLayout
            title="Collection Femme"
            description="Élégance et raffinement au féminin."
        >
            <ProductGrid products={womenProducts} />
        </ShopPageLayout>
    );
}
