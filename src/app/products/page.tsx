import { products } from "@/lib/data";
import { ProductGrid } from "@/components/products/product-grid";
import { ShopPageLayout } from "@/components/products/shop-page-layout";

export default function ProductsPage() {
    return (
        <ShopPageLayout
            title="Toute la collection"
            description="Parcourez notre catalogue complet de vêtements et accessoires de luxe."
        >
            <ProductGrid products={products} />
        </ShopPageLayout>
    );
}
