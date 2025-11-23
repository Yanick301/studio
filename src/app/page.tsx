'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/product-card';
import { products } from '@/lib/data';
import { testimonials } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Lock, Feather, Gem, Snowflake } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Product } from '@/lib/definitions';


export default function Home() {
  const { t } = useTranslation();
  
  const winterKeywords = ['coat', 'sweater', 'parka', 'hoodie', 'turtleneck', 'cardigan', 'down jacket'];
    
  const winterProducts = products.filter(p => 
      p.category === 'clothing' && (
        p.tags?.includes('winter') ||
        winterKeywords.some(keyword => 
            t(p.name).toLowerCase().includes(keyword) || 
            t(p.description).toLowerCase().includes(keyword) ||
            p.imageHint.toLowerCase().includes(keyword)
        )
      )
  ).slice(0, 8);
  
  const maisonCategories = [
    {
      href: "/men",
      image: "/homepage/maisontail.jpg",
      imageHint: "man white t-shirt",
      subtitle: 'home.maison_menu.tailoring.subtitle',
      title: 'home.maison_menu.tailoring.title',
      description: 'home.maison_menu.tailoring.description',
      cta: 'home.maison_menu.tailoring.cta'
    },
    {
      href: "/women",
      image: "/homepage/maison-couture.jpg",
      imageHint: "woman fashion pose",
      subtitle: 'home.maison_menu.couture.subtitle',
      title: 'home.maison_menu.couture.title',
      description: 'home.maison_menu.couture.description',
      cta: 'home.maison_menu.couture.cta'
    },
    {
      href: "/accessories",
      image: "/homepage/maison-accessories.jpg",
      imageHint: "luxury watch",
      subtitle: 'home.maison_menu.accessories.subtitle',
      title: 'home.maison_menu.accessories.title',
      description: 'home.maison_menu.accessories.description',
      cta: 'home.maison_menu.accessories.cta'
    },
    {
      href: "/winter",
      image: "/homepage/maison-winter.jpg",
      imageHint: "winter fashion",
      subtitle: 'home.maison_menu.winter.subtitle',
      title: 'home.maison_menu.winter.title',
      description: 'home.maison_menu.winter.description',
      cta: 'home.maison_menu.winter.cta'
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] md:h-[90vh] bg-black">
        <Image
          src="/homepage/hero-background.jpg"
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
      
       {/* Maison Categories Section */}
       <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">{t('home.maison_menu.title')}</h2>
          </div>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {maisonCategories.map((category, index) => (
                <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                        <Link href={category.href} className="relative block group h-[500px] overflow-hidden rounded-lg shadow-lg">
                            <Image src={category.image} alt={t(category.title)} fill style={{objectFit:"cover"}} className="transition-transform duration-500 group-hover:scale-105" data-ai-hint={category.imageHint}/>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8 text-white">
                                <p className="text-sm uppercase tracking-widest">{t(category.subtitle)}</p>
                                <h3 className="text-3xl font-headline mt-2">{t(category.title)}</h3>
                                <p className="mt-2 text-white/90 max-w-xs">{t(category.description)}</p>
                                <div className="mt-4 font-semibold flex items-center group-hover:underline">
                                {t(category.cta)} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex" />
            <CarouselNext className="hidden lg:flex" />
          </Carousel>
        </div>
      </section>

      {/* Winter Products Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">{t('winter_page.title')}</h2>
            <p className="mt-2 text-muted-foreground text-lg">{t('winter_page.description')}</p>
          </div>

          <div className="mb-12 bg-gradient-to-r from-primary/80 to-primary rounded-lg p-8 text-center text-primary-foreground shadow-lg">
              <Snowflake className="mx-auto h-12 w-12 mb-4 animate-pulse" />
              <h3 className="text-3xl font-bold font-headline">{t('home.winter_offers_title')}</h3>
              <p className="mt-2 max-w-2xl mx-auto">{t('home.winter_offers_desc')}</p>
              <Button asChild variant="secondary" className="mt-6">
                <Link href="/winter">{t('home.winter_offers_cta')}</Link>
              </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {winterProducts.map((product, index) => (
              <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms`}}>
                 <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/winter">{t('home.view_all_products')} <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
      
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

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">{t('home.testimonials')}</h2>
            <p className="mt-2 text-muted-foreground text-lg">{t('home.testimonials_description')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-background shadow-lg border-none">
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
