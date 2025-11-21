import { products } from "@/lib/data";
import { ProductGrid } from "@/components/products/product-grid";
import { ShopPageLayout } from "@/components/products/shop-page-layout";

export default function AccessoriesPage() {
    const accessoryProducts = products.filter(p => p.category === 'accessories');
    return (
        <ShopPageLayout
            title="Accessoires"
            description="La touche finale pour un style parfait."
        >
            <ProductGrid products={accessoryProducts} />
        </ShopPageLayout>
    );
}
