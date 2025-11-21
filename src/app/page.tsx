import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/product-card';
import { products } from '@/lib/data';
import { testimonials } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const trendingProducts = products.filter(p => p.isTrending).slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] md:h-[90vh]">
        <Image
          src="https://picsum.photos/seed/hero-bg/1800/1200"
          alt="Model in luxuriöser Kleidung"
          fill
          objectFit="cover"
          className="brightness-50"
          data-ai-hint="fashion model"
          priority
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-primary-foreground px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold drop-shadow-2xl">
            Eleganz Neu Definiert
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/90">
            Entdecken Sie exklusive Kollektionen, die zeitlosen Stil mit modernen Trends verbinden.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
            <Link href="/products">Kollektion entdecken</Link>
          </Button>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold">Trend-Produkte</h2>
            <p className="mt-2 text-muted-foreground">Die begehrtesten Stücke der Saison.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/products">Alle Produkte ansehen <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-semibold">Unsere Welten</h2>
                <p className="mt-2 text-muted-foreground">Entdecken Sie unsere Auswahl für Damen und Herren.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Link href="/women" className="relative group overflow-hidden rounded-lg aspect-video md:aspect-[4/3] shadow-lg">
                    <Image src="https://picsum.photos/seed/cat-women/800/600" alt="Damen" fill objectFit="cover" className="transition-transform duration-500 group-hover:scale-105" data-ai-hint="stylish woman"/>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300 group-hover:bg-black/50">
                        <h3 className="text-4xl text-white drop-shadow-lg">Damen</h3>
                    </div>
                </Link>
                <Link href="/men" className="relative group overflow-hidden rounded-lg aspect-video md:aspect-[4/3] shadow-lg">
                    <Image src="https://picsum.photos/seed/cat-men/800/600" alt="Herren" fill objectFit="cover" className="transition-transform duration-500 group-hover:scale-105" data-ai-hint="stylish man"/>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300 group-hover:bg-black/50">
                        <h3 className="text-4xl text-white drop-shadow-lg">Herren</h3>
                    </div>
                </Link>
            </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold">Kundenstimmen</h2>
            <p className="mt-2 text-muted-foreground">Was unsere Kunden über uns sagen.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-card shadow-lg border-none">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <Avatar className="w-20 h-20 mb-6 border-2 border-accent">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="text-muted-foreground italic text-base">&ldquo;{testimonial.quote}&rdquo;</p>
                  <p className="font-semibold mt-6 font-headline text-lg">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
