import Image from 'next/image';
import Link from 'next/link';
import { type Product } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="w-full max-w-sm group rounded-lg overflow-hidden border-none shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/products/${product.slug}`} className="block overflow-hidden aspect-[3/4]">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={product.width}
          height={product.height}
          className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
          data-ai-hint={product.imageHint}
        />
      </Link>
      <div className="p-4 bg-card">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-base font-medium text-foreground truncate" title={product.name}>{product.name}</h3>
        </Link>
        <p className="text-lg font-bold text-primary mt-1">{product.price.toFixed(2)} €</p>
        <div className="mt-4 flex gap-2">
          <Button size="sm" className="w-full">
            <ShoppingCart className="mr-2 h-4 w-4" /> Ajouter
          </Button>
          <Button variant="outline" size="icon" aria-label="Ajouter aux favoris">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
