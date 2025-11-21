import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function FavoritesPage() {
    const favoritesIsEmpty = true;
    return (
        <Card>
            <CardHeader>
                <CardTitle>Mes Favoris</CardTitle>
                <CardDescription>Votre sélection personnelle d'articles.</CardDescription>
            </CardHeader>
            <CardContent>
                {favoritesIsEmpty ? (
                    <div className="text-center border-2 border-dashed rounded-lg p-12">
                        <p className="text-muted-foreground mb-4 text-lg">Vous n'avez aucun article en favori.</p>
                        <Button asChild>
                            <Link href="/products">Découvrir nos produits</Link>
                        </Button>
                    </div>
                ) : (
                    <p>Liste de favoris ici...</p>
                )}
            </CardContent>
        </Card>
    );
}
