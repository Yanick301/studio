'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/product-card';
import { products } from '@/lib/data';
import { testimonials } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Lock, Feather, Gem } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

export default function Home() {
  const { t } = useTranslation();
  const trendingProducts = products.filter(p => p.isTrending).slice(0, 4);
  const newProducts = products.slice(4, 8); // Example for new arrivals
  
  const brandNames = [
    "Versace", "Gucci", "Prada", "Dior", "Chanel", "Balenciaga", "Louis Vuitton"
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] md:h-[90vh] bg-black">
        <Image
          src="https://images.unsplash.com/photo-1594385233933-25cb35ea6f3f?q=80&w=1974&auto=format&fit=crop"
          alt={t('hero.alt')}
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-50"
          data-ai-hint="fashion models couple"
          priority
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold drop-shadow-2xl font-headline">
            {t('hero.title')}
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/90">
            {t('hero.subtitle')}
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-10 py-6 text-base">
            <Link href="/products">{t('hero.button')}</Link>
          </Button>
        </div>
      </section>

      {/* Brand Names Section */}
      <div className="bg-card py-8 md:py-12">
        <div className="container">
          <div className="relative overflow-hidden group">
            <div className="flex animate-marquee-infinite group-hover:[animation-play-state:paused]">
              {[...brandNames, ...brandNames].map((name, index) => (
                <div key={index} className="flex-shrink-0 mx-8">
                  <span className="text-2xl font-headline text-muted-foreground tracking-widest">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Brand Philosophy Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <Feather className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('philosophy.materials.title')}</h3>
              <p className="text-muted-foreground">{t('philosophy.materials.description')}</p>
            </div>
            <div className="flex flex-col items-center">
              <Gem className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('philosophy.craftsmanship.title')}</h3>
              <p className="text-muted-foreground">{t('philosophy.craftsmanship.description')}</p>
            </div>
            <div className="flex flex-col items-center">
              <Lock className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('philosophy.exclusivity.title')}</h3>
              <p className="text-muted-foreground">{t('philosophy.exclusivity.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">{t('home.trending_products')}</h2>
            <p className="mt-2 text-muted-foreground text-lg">{t('home.trending_description')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/products">{t('home.view_all_products')} <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

       {/* Categories Section */}
      <section className="bg-background">
        <div className="container-fluid">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <Link href="/women" className="relative group h-96 md:h-[600px] overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1525541622-628213890526?q=80&w=1974&auto=format&fit=crop" alt={t('categories.women')} fill style={{objectFit:"cover"}} className="transition-transform duration-500 group-hover:scale-105" data-ai-hint="stylish woman"/>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300 group-hover:bg-black/50">
                        <h3 className="text-4xl text-white drop-shadow-lg font-headline">{t('categories.women')}</h3>
                    </div>
                </Link>
                <Link href="/men" className="relative group h-96 md:h-[600px] overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop" alt={t('categories.men')} fill style={{objectFit:"cover"}} className="transition-transform duration-500 group-hover:scale-105" data-ai-hint="stylish man"/>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300 group-hover:bg-black/50">
                        <h3 className="text-4xl text-white drop-shadow-lg font-headline">{t('categories.men')}</h3>
                    </div>
                </Link>
            </div>
        </div>
      </section>
      
      {/* New Arrivals Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">{t('home.new_arrivals')}</h2>
            <p className="mt-2 text-muted-foreground text-lg">{t('home.new_arrivals_description')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">{t('home.testimonials')}</h2>
            <p className="mt-2 text-muted-foreground text-lg">{t('home.testimonials_description')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-card shadow-lg border-none">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <Avatar className="w-20 h-20 mb-6 border-2 border-primary">
                    <AvatarImage src={testimonial.avatar} alt={t(testimonial.name)} />
                    <AvatarFallback>{t(testimonial.name).charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="text-muted-foreground italic text-base">&ldquo;{t(testimonial.quote)}&rdquo;</p>
                  <p className="font-semibold mt-6 font-headline text-lg">{t(testimonial.name)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
