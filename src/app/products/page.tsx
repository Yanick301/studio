import { products } from "@/lib/data";
import { ProductGrid } from "@/components/products/product-grid";
import { ShopPageLayout } from "@/components/products/shop-page-layout";

export default function ProductsPage() {
    return (
        <ShopPageLayout
            title="Alle Kollektionen"
            description="Durchsuchen Sie unseren kompletten Katalog luxuriöser Kleidung und Accessoires."
        >
            <ProductGrid products={products} />
        </ShopPageLayout>
    );
}
