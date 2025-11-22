'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getPersonalizedOutfitRecommendations, PersonalizedOutfitRecommendationsOutput } from '@/ai/flows/personalized-outfit-recommendations';
import { Loader2, Wand2, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useTranslation } from '@/hooks/use-translation';
import { Separator } from '@/components/ui/separator';
import { useUser, useFirestore, useCollection, useDoc } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { Product, Favorite, UserProfile } from '@/lib/definitions';
import { products as allProducts } from '@/lib/data';

// A simple hook to get previously viewed products from localStorage
const useViewHistory = () => {
    const [history, setHistory] = useState<Product[]>([]);

    useEffect(() => {
        const storedHistory = localStorage.getItem('productViewHistory');
        if (storedHistory) {
            const productSlugs: string[] = JSON.parse(storedHistory);
            const viewedProducts = productSlugs.map(slug => allProducts.find(p => p.slug === slug)).filter(Boolean) as Product[];
            setHistory(viewedProducts);
        }
    }, []);

    return history;
};

export default function RecommendationsPage() {
    const { t } = useTranslation();
    const { user } = useUser();
    const firestore = useFirestore();

    const [stylePreferences, setStylePreferences] = useState('');
    const [recommendations, setRecommendations] = useState<PersonalizedOutfitRecommendationsOutput['recommendations']>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Get user's favorites
    const favoritesRef = user ? collection(firestore, `users/${user.uid}/favorites`) : null;
    const { data: userFavorites } = useCollection<Favorite>(favoritesRef);
    const favoriteProducts = userFavorites?.map(fav => allProducts.find(p => p.id === fav.productId)).filter(Boolean) as Product[] || [];

    // Get user's recent view history
    const viewedProducts = useViewHistory();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setRecommendations([]);

        let browsingHistory = t('ai_stylist.browsing_history_default');
        
        const viewedProductNames = viewedProducts.slice(0, 5).map(p => t(p.name)).join(', ');
        if(viewedProductNames) {
            browsingHistory += ` ${t('ai_stylist.browsing_history_viewed', { products: viewedProductNames })}`;
        }

        const favoriteProductNames = favoriteProducts.slice(0, 5).map(p => t(p.name)).join(', ');
        if(favoriteProductNames) {
            browsingHistory += ` ${t('ai_stylist.browsing_history_favorites', { products: favoriteProductNames })}`;
        }

        try {
            const result = await getPersonalizedOutfitRecommendations({
                browsingHistory,
                stylePreferences,
            });
            setRecommendations(result.recommendations);
        } catch (err) {
            setError(t('ai_stylist.error_message'));
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container py-12 md:py-16">
            <Card className="max-w-3xl mx-auto shadow-lg border">
                <CardHeader className="text-center">
                    <Wand2 className="mx-auto h-12 w-12 text-primary" />
                    <CardTitle className="text-3xl mt-4 font-headline">{t('ai_stylist.title')}</CardTitle>
                    <CardDescription className="max-w-md mx-auto pt-2 text-muted-foreground">{t('ai_stylist.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="style-preferences" className="font-semibold text-base">{t('ai_stylist.form_label')}</Label>
                            <Textarea
                                id="style-preferences"
                                placeholder={t('ai_stylist.form_placeholder')}
                                value={stylePreferences}
                                onChange={(e) => setStylePreferences(e.target.value)}
                                rows={5}
                                required
                                className="text-base"
                            />
                        </div>
                        <Button type="submit" disabled={isLoading} size="lg" className="font-semibold">
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                            {t('ai_stylist.button_text')}
                        </Button>
                    </form>
                </CardContent>
                
                {(isLoading || error || recommendations.length > 0) && (
                    <CardFooter className="flex flex-col p-6">
                         {error && (
                            <Alert variant="destructive" className="w-full">
                                <AlertTitle>{t('ai_stylist.error_title')}</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {recommendations.length > 0 && (
                            <div className="w-full rounded-lg border bg-background p-6 space-y-6">
                                <h3 className="font-headline text-2xl mb-4 text-center">{t('ai_stylist.results_title')}</h3>
                                {recommendations.map((rec, index) => (
                                    <div key={index}>
                                        <h4 className="font-bold text-lg text-primary">{t(rec.productName)}</h4>
                                        <p className="text-muted-foreground text-sm italic mt-1">&ldquo;{rec.reasoning}&rdquo;</p>
                                        {index < recommendations.length - 1 && <Separator className="mt-6" />}
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardFooter>
                )}
            </Card>
        </div>
    );
}
