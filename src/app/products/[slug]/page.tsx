'use client';

import { products } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Star, CheckCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

// This function can be uncommented if you switch to a static generation approach
// export async function generateStaticParams() {
//   return products.map((product) => ({
//     slug: product.slug,
//   }));
// }

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState<string | null>(product?.options?.sizes?.[0] || null);
  const [selectedColor, setSelectedColor] = useState<string | null>(product?.options?.colors?.[0] || null);
  const [isFavorite, setIsFavorite] = useState(false);

  const [reviews, setReviews] = useState([
    { id: 1, author: "Marie L.", rating: 5, comment: "Qualité exceptionnelle et coupe parfaite. Je recommande vivement !" },
    { id: 2, author: "Jean D.", rating: 4, comment: "Très beau produit, conforme à la description. La livraison a été rapide." },
  ]);
  const [newReview, setNewReview] = useState({ author: '', comment: '', rating: 5 });
  const [showReviewForm, setShowReviewForm] = useState(false);


  if (!product) {
    notFound();
  }

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Retiré des favoris" : "Ajouté aux favoris",
      description: `${product.name} a été ${isFavorite ? 'retiré de' : 'ajouté à'} votre liste de favoris.`,
    });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.author && newReview.comment) {
      setReviews(prev => [...prev, { ...newReview, id: Date.now() }]);
      setNewReview({ author: '', comment: '', rating: 5 });
      setShowReviewForm(false);
      toast({
        title: "Avis soumis",
        description: "Merci d'avoir partagé votre expérience.",
      });
    }
  };


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
            <span className="text-sm text-muted-foreground">({reviews.length} Bewertungen)</span>
          </div>
          <p className="text-3xl font-bold text-primary mt-4">{product.price.toFixed(2)} €</p>
          <p className="mt-4 text-muted-foreground leading-relaxed">{product.description}</p>
          
          <Separator className="my-8" />

          {product.options?.colors && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">Couleur: <span className="font-bold text-foreground">{selectedColor}</span></h3>
              <div className="flex items-center gap-3">
                {product.options.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "w-8 h-8 rounded-full border-2 transition-transform duration-200",
                      selectedColor === color ? 'border-primary scale-110' : 'border-border'
                    )}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>
          )}

          {product.options?.sizes && (
             <div className="mb-6">
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">Taille</h3>
                <div className="flex flex-wrap items-center gap-2">
                  {product.options.sizes.map(size => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'default' : 'outline'}
                      onClick={() => setSelectedSize(size)}
                      className="min-w-[40px]"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="w-full sm:w-auto flex-grow">
              <ShoppingCart className="mr-2 h-5 w-5" /> In den Warenkorb
            </Button>
            <Button variant={isFavorite ? "secondary" : "outline"} size="lg" className="w-full sm:w-auto" aria-label="Zu Favoriten hinzufügen" onClick={handleFavoriteClick}>
              {isFavorite ? <CheckCircle className="mr-2 h-5 w-5 text-green-500"/> : <Heart className="mr-2 h-5 w-5" />}
              {isFavorite ? "Favorit" : "Favoriten"}
            </Button>
          </div>

          <Accordion type="single" collapsible className="w-full mt-8">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-semibold">Details & Pflege</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{product.details || 'Zusammensetzung: 80% Satin, 20% Seide. Nur Handwäsche. Nicht im Trockner trocknen.'}</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-semibold">Versand & Rückgabe</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">Kostenloser Standardversand innerhalb von 3-5 Werktagen. Kostenlose Rücksendung innerhalb von 30 Tagen.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      
      <div className="mt-16 md:mt-24">
        <h2 className="text-2xl font-bold mb-6">Kundenbewertungen</h2>
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Was unsere Kunden sagen</CardTitle>
                    <Button variant="outline" onClick={() => setShowReviewForm(!showReviewForm)}>
                        {showReviewForm ? 'Annuler' : 'Bewertung abgeben'}
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {showReviewForm && (
                    <form onSubmit={handleReviewSubmit} className="p-6 border rounded-lg bg-muted/50 space-y-4">
                         <h3 className="font-semibold text-lg">Teilen Sie Ihre Meinung</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="author">Ihr Name</Label>
                                <Input id="author" value={newReview.author} onChange={e => setNewReview({...newReview, author: e.target.value})} placeholder="z.B. Jean Dupont" required/>
                            </div>
                            <div>
                                <Label htmlFor="rating">Ihre Note</Label>
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} onClick={() => setNewReview({...newReview, rating: i + 1})} className={cn("w-6 h-6 cursor-pointer", i < newReview.rating ? 'text-accent fill-accent' : 'text-muted-foreground')}/>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="comment">Ihr Kommentar</Label>
                            <Textarea id="comment" value={newReview.comment} onChange={e => setNewReview({...newReview, comment: e.target.value})} placeholder="Beschreiben Sie Ihre Erfahrungen..." required />
                        </div>
                        <Button type="submit">Avis abschicken</Button>
                    </form>
                )}

                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review.id} className="border-t pt-6">
                            <div className="flex items-center mb-2">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-accent fill-accent' : 'text-muted-foreground'}`}/>)}
                                </div>
                                <p className="ml-4 font-bold">{review.author}</p>
                            </div>
                            <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                    ))
                ) : (
                    !showReviewForm && <p className="text-muted-foreground text-center py-8">Seien Sie der Erste, der eine Bewertung für dieses Produkt hinterlässt!</p>
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}