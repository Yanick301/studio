'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getPersonalizedOutfitRecommendations } from '@/ai/flows/personalized-outfit-recommendations';
import { Loader2, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function RecommendationsPage() {
    const [stylePreferences, setStylePreferences] = useState('');
    const [recommendations, setRecommendations] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const browsingHistory = "Angesehene Artikel: 'Elegantes Abendkleid' (Kleidung, Damen), 'Leinenhemd' (Kleidung, Herren), 'Lederhandtasche' (Accessoires, Damen). Der Benutzer scheint an eleganten und klassischen Stilen interessiert zu sein.";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setRecommendations([]);

        try {
            const result = await getPersonalizedOutfitRecommendations({
                browsingHistory,
                stylePreferences,
            });
            setRecommendations(result.recommendations);
        } catch (err) {
            setError('Beim Generieren der Empfehlungen ist ein Fehler aufgetreten.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container py-12 md:py-16">
            <Card className="max-w-3xl mx-auto shadow-lg">
                <CardHeader className="text-center">
                    <Wand2 className="mx-auto h-12 w-12 text-accent" />
                    <CardTitle className="text-3xl mt-4">Ihr Persönlicher KI-Stylist</CardTitle>
                    <CardDescription className="max-w-md mx-auto pt-2">Beschreiben Sie Ihren Stil und wir stellen Ihnen eine maßgeschneiderte Auswahl zusammen, inspiriert von Ihrem Surfverhalten.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="style-preferences" className="font-semibold">Was sind Ihre aktuellen Stilvorlieben und Wünsche?</Label>
                            <Textarea
                                id="style-preferences"
                                placeholder="z.B. Ich mag einen minimalistischen Stil, neutrale Farben und natürliche Materialien wie Leinen und Baumwolle. Ich suche ein Outfit für eine Sommerhochzeit..."
                                value={stylePreferences}
                                onChange={(e) => setStylePreferences(e.target.value)}
                                rows={5}
                                required
                                className="text-base"
                            />
                        </div>
                        <Button type="submit" disabled={isLoading} size="lg">
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Meine Empfehlungen erhalten
                        </Button>
                    </form>
                </CardContent>
                
                <CardFooter className="flex flex-col p-6">
                    {error && (
                         <Alert variant="destructive" className="w-full">
                            <AlertTitle>Fehler</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {recommendations.length > 0 && (
                        <div className="w-full rounded-lg border bg-background p-6">
                            <h3 className="font-headline text-2xl mb-4 text-center">Unsere Vorschläge für Sie</h3>
                            <ul className="list-disc pl-5 space-y-3 text-muted-foreground">
                                {recommendations.map((rec, index) => (
                                    <li key={index}>{rec}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
