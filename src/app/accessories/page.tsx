import { products } from "@/lib/data";
import { ProductGrid } from "@/components/products/product-grid";
import { ShopPageLayout } from "@/components/products/shop-page-layout";

export default function AccessoriesPage() {
    const accessoryProducts = products.filter(p => p.category === 'accessories');
    return (
        <ShopPageLayout
            title="Accessoires"
            description="Der letzte Schliff für einen perfekten Stil."
        >
            <ProductGrid products={accessoryProducts} />
        </ShopPageLayout>
    );
}
