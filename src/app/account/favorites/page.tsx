'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useTranslation } from "@/hooks/use-translation";

export default function FavoritesPage() {
    const { t } = useTranslation();
    const favoritesIsEmpty = true;
    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('favorites_page.title')}</CardTitle>
                <CardDescription>{t('favorites_page.description')}</CardDescription>
            </CardHeader>
            <CardContent>
                {favoritesIsEmpty ? (
                    <div className="text-center border-2 border-dashed rounded-lg p-12">
                        <p className="text-muted-foreground mb-4 text-lg">{t('favorites_page.empty_message')}</p>
                        <Button asChild>
                            <Link href="/products">{t('favorites_page.discover_button')}</Link>
                        </Button>
                    </div>
                ) : (
                    <p>Liste der Favoriten hier...</p>
                )}
            </CardContent>
        </Card>
    );
}
