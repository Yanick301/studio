import { products } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12 md:py-16">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <div className="flex justify-center items-start">
            <div className="sticky top-24 w-full max-w-md rounded-lg overflow-hidden shadow-lg bg-card">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={product.width}
                    height={product.height}
                    className="w-full h-auto object-cover aspect-[3/4]"
                    data-ai-hint={product.imageHint}
                    priority
                />
            </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => <Star key={i} className={`w-5 h-5 ${i < 4 ? 'text-accent fill-accent' : 'text-muted-foreground'}`}/>)}
            </div>
            <span className="text-sm text-muted-foreground">(12 avis)</span>
          </div>
          <p className="text-3xl font-bold text-primary mt-4">{product.price.toFixed(2)} €</p>
          <p className="mt-4 text-muted-foreground leading-relaxed">{product.description}</p>
          
          <Separator className="my-8" />

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="w-full sm:w-auto flex-grow">
              <ShoppingCart className="mr-2 h-5 w-5" /> Ajouter au panier
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" aria-label="Ajouter aux favoris">
              <Heart className="mr-2 h-5 w-5" /> Favoris
            </Button>
          </div>

          <Accordion type="single" collapsible className="w-full mt-8">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-semibold">Détails & Entretien</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">Composition: 80% Satin, 20% Soie. Lavage à la main uniquement. Ne pas sécher en machine.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-semibold">Livraison & Retours</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">Livraison standard offerte sous 3-5 jours ouvrés. Retours gratuits sous 30 jours.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      
      <div className="mt-16 md:mt-24">
        <h2 className="text-2xl font-bold mb-6">Avis des clients</h2>
        <div className="border rounded-lg p-8 text-center bg-card">
            <h3 className="font-semibold">Pas encore d'avis</h3>
            <p className="text-muted-foreground mt-2">Soyez le premier à laisser un avis sur ce produit !</p>
            <Button variant="outline" className="mt-4">Laisser un avis</Button>
        </div>
      </div>
    </div>
  );
}
