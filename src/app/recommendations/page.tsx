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

    const browsingHistory = "Viewed items: 'Robe de Soirée Élégante' (clothing, women), 'Chemise en Lin' (clothing, men), 'Sac à Main en Cuir' (accessories, women). User seems interested in elegant and classic styles.";

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
            setError('Une erreur est survenue lors de la génération des recommandations.');
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
                    <CardTitle className="text-3xl mt-4">Votre Styliste Personnel AI</CardTitle>
                    <CardDescription className="max-w-md mx-auto pt-2">Décrivez votre style et nous vous proposerons une sélection sur mesure, inspirée par votre navigation.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="style-preferences" className="font-semibold">Quels sont vos styles et envies du moment?</Label>
                            <Textarea
                                id="style-preferences"
                                placeholder="Ex: J'aime le style minimaliste, les couleurs neutres, et les matières naturelles comme le lin et le coton. Je cherche une tenue pour un mariage en été..."
                                value={stylePreferences}
                                onChange={(e) => setStylePreferences(e.target.value)}
                                rows={5}
                                required
                                className="text-base"
                            />
                        </div>
                        <Button type="submit" disabled={isLoading} size="lg">
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Obtenir mes recommandations
                        </Button>
                    </form>
                </CardContent>
                
                <CardFooter className="flex flex-col p-6">
                    {error && (
                         <Alert variant="destructive" className="w-full">
                            <AlertTitle>Erreur</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {recommendations.length > 0 && (
                        <div className="w-full rounded-lg border bg-background p-6">
                            <h3 className="font-headline text-2xl mb-4 text-center">Nos suggestions pour vous</h3>
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
