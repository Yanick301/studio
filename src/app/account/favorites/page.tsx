import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function FavoritesPage() {
    const favoritesIsEmpty = true;
    return (
        <Card>
            <CardHeader>
                <CardTitle>Meine Favoriten</CardTitle>
                <CardDescription>Ihre persönliche Auswahl an Artikeln.</CardDescription>
            </CardHeader>
            <CardContent>
                {favoritesIsEmpty ? (
                    <div className="text-center border-2 border-dashed rounded-lg p-12">
                        <p className="text-muted-foreground mb-4 text-lg">Sie haben keine Artikel in Ihren Favoriten.</p>
                        <Button asChild>
                            <Link href="/products">Unsere Produkte entdecken</Link>
                        </Button>
                    </div>
                ) : (
                    <p>Liste der Favoriten hier...</p>
                )}
            </CardContent>
        </Card>
    );
}
