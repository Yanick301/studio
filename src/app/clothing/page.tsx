import { products } from "@/lib/data";
import { ProductGrid } from "@/components/products/product-grid";
import { ShopPageLayout } from "@/components/products/shop-page-layout";

export default function ClothingPage() {
    const clothingProducts = products.filter(p => p.category === 'clothing');
    return (
        <ShopPageLayout
            title="Kleidung"
            description="Entdecken Sie unsere Auswahl an Premium-Kleidung."
        >
            <ProductGrid products={clothingProducts} />
        </ShopPageLayout>
    );
}
